import type { NextApiRequest, NextApiResponse } from 'next';
import {
  ChatMessage,
  buildSystemPrompt,
  callGeminiApi,
  callOpenAICompatibleApi,
  generateHumanFallbackReply,
} from '../../lib/chatbot';
import { profile } from '../../data/portfolio';

// In-memory sliding window rate limiter for defensive DDoS and brute-force mitigation
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
export const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
export const MAX_REQUESTS_PER_WINDOW = 30; // Max 30 messages per minute per IP

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Clean up stale entries periodically
  if (rateLimitMap.size > 5000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  record.count += 1;
  return record.count > MAX_REQUESTS_PER_WINDOW;
}

export function resetRateLimitsForTesting(): void {
  rateLimitMap.clear();
}

// Input sanitizer to prevent prompt injection bombs, HTML/SVG XSS payloads, and null bytes
export function sanitizeText(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .slice(0, 2000) // Limit max message length to 2000 chars
    .replace(/\0/g, '') // Strip null byte injection vectors
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Strip script tags and their content
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '') // Strip style tags and their content
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Strip iframe tags and their content
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '') // Strip object tags
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '') // Strip embed tags
    .replace(/<[^>]*>/g, '') // Strip all other HTML/XML tags cleanly
    .replace(/javascript\s*:/gi, '') // Strip dangerous javascript pseudo-protocol schemes
    .replace(/data\s*:\s*text\/html/gi, '') // Strip data: URI schemes
    .replace(/vbscript\s*:/gi, '') // Strip vbscript pseudo-protocol
    .trim();
}

/**
 * Strips any suggested inquiries, question lists, or trailing prompt chips.
 * Defensively restricts extensive code blocks, multi-file boilerplates,
 * and ASCII directory trees so the chatbot does not generate entire codebases.
 */
export function cleanReplyText(text: string): string {
  if (!text) return '';

  let cleaned = text
    .replace(/\n*###\s*(?:Suggested Inquiries|Questions Recommand[ée]es|Suggestions de questions)[\s\S]*$/i, '')
    .replace(/^[-*]?\s*[?~]\s+.*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // 1. Remove ASCII directory trees (lines with ├──, └──, │, ├─, └─)
  cleaned = cleaned.replace(/```[a-z0-9_-]*\n[\s\S]*?[│├└─][\s\S]*?```/gi, () => {
    return `*(Architecture note: Moiz structures applications with modular service boundaries, clean schemas, and Docker packaging.)*`;
  });

  // 2. Process fenced code blocks: allow at most 1 concise snippet (max 5 lines)
  let codeBlockCount = 0;
  cleaned = cleaned.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, codeContent) => {
    codeBlockCount++;

    // If more than 1 code block was output (e.g. multi-file boilerplate)
    if (codeBlockCount > 1) {
      return `*(Additional file implementations omitted — Moiz provides full production codebases upon project engagement. Reach out at [${profile.email}](mailto:${profile.email}))*`;
    }

    const lines = codeContent.split('\n');
    // If a single code block is excessively long (> 5 non-empty lines)
    if (lines.filter((l: string) => l.trim().length > 0).length > 5) {
      const truncatedLines = lines.slice(0, 4);
      return `\`\`\`${lang}\n${truncatedLines.join('\n')}\n# ... (connect with Moiz at ${profile.email} for complete implementation)\n\`\`\``;
    }

    return match;
  });

  return cleaned.trim();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Defensive Security Headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  // 1. Strict HTTP Method validation
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed. Only POST is accepted.' });
  }

  // 2. Client IP Rate Limiting (Defensive Cybersecurity)
  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    (req.socket.remoteAddress as string) ||
    '127.0.0.1';

  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      error: 'Too many requests. Please wait a moment before sending another message.',
      reply: 'You are sending messages very quickly! Please wait a few seconds and try again.',
    });
  }

  // 3. Strict Payload validation & prototype safety
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Invalid payload: JSON object expected.' });
  }

  const { messages, lang } = req.body;
  const activeLang: 'en' | 'fr' = lang === 'fr' ? 'fr' : 'en';

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid payload: messages array is required.' });
  }

  // Limit conversation history depth to 20 messages to prevent payload memory exhaustion
  const trimmedMessages = messages.slice(-20);

  // Sanitize and validate every message
  const validMessages: ChatMessage[] = [];
  for (const m of trimmedMessages) {
    if (!m || typeof m !== 'object') continue;
    const role = m.role === 'assistant' ? 'assistant' : 'user';
    const content = sanitizeText(String(m.content || ''));
    if (content) {
      validMessages.push({ role, content });
    }
  }

  if (validMessages.length === 0) {
    return res.status(400).json({ error: 'No valid message content provided.' });
  }

  // 4. Check available AI API providers (Domain-adaptive, token-optimized context)
  const systemPrompt = buildSystemPrompt(validMessages, activeLang);
  const geminiKey = process.env.GEMINI_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const togetherKey = process.env.TOGETHER_API_KEY;

  // 1. Try Groq API as primary provider (Ultra-fast, human-like responses)
  if (groqKey) {
    try {
      const groqModel = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';
      const reply = await callOpenAICompatibleApi({
        endpoint: 'https://api.groq.com/openai/v1/chat/completions',
        apiKey: groqKey,
        model: groqModel,
        messages: [{ role: 'system', content: systemPrompt }, ...validMessages],
        maxTokens: 450,
        temperature: 0.3,
      });
      if (reply) {
        return res.status(200).json({ reply: cleanReplyText(reply), provider: 'groq' });
      }
    } catch (err: any) {
      console.warn('Groq provider skipped:', err?.message || err);
    }
  }

  // 2. Try Gemini API if configured
  if (geminiKey) {
    try {
      const geminiModel = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
      const conversationText = [
        systemPrompt,
        ...validMessages.map((m) => `${m.role === 'assistant' ? 'Assistant' : 'User'}: ${m.content}`),
      ].join('\n\n');

      const reply = await callGeminiApi(geminiKey, geminiModel, conversationText);
      if (reply) {
        return res.status(200).json({ reply: cleanReplyText(reply), provider: 'gemini' });
      }
    } catch (err: any) {
      console.warn('Gemini provider skipped:', err?.message || err);
    }
  }

  // Try OpenAI API if configured
  if (openaiKey) {
    try {
      const openaiModel = process.env.OPENAI_MODEL || 'gpt-4o-mini';
      const reply = await callOpenAICompatibleApi({
        endpoint: 'https://api.openai.com/v1/chat/completions',
        apiKey: openaiKey,
        model: openaiModel,
        messages: [{ role: 'system', content: systemPrompt }, ...validMessages],
      });
      if (reply) {
        return res.status(200).json({ reply: cleanReplyText(reply), provider: 'openai' });
      }
    } catch (err: any) {
      console.warn('OpenAI provider skipped:', err?.message || err);
    }
  }

  // Try Together AI if configured
  if (togetherKey) {
    try {
      const togetherModel = process.env.TOGETHER_MODEL || 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo';
      const reply = await callOpenAICompatibleApi({
        endpoint: 'https://api.together.ai/v1/chat/completions',
        apiKey: togetherKey,
        model: togetherModel,
        messages: [{ role: 'system', content: systemPrompt }, ...validMessages],
      });
      if (reply) {
        return res.status(200).json({ reply: cleanReplyText(reply), provider: 'together' });
      }
    } catch (err: any) {
      console.warn('Together AI provider skipped:', err?.message || err);
    }
  }

  // 5. Intelligent, zero-dependency Human Fallback Engine
  try {
    const fallbackReply = generateHumanFallbackReply(validMessages, activeLang);
    return res.status(200).json({ reply: cleanReplyText(fallbackReply), provider: 'intelligent-engine' });
  } catch (fallbackErr: any) {
    console.error('Fallback generation error:', fallbackErr);
    return res.status(200).json({
      reply:
        "Hello! I'm Muhammad Abdul Moiz's AI representative. Feel free to ask about my experience at EPITECH Paris & Brackets, my GenAI projects like DoctorIQ, or reach me directly at amoiz0468@gmail.com.",
      provider: 'default',
    });
  }
}
