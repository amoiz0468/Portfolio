import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { generateHumanFallbackReply, buildSystemPrompt, detectDomainTopic } from '../src/lib/chatbot';
import { isRateLimited, sanitizeText, resetRateLimitsForTesting } from '../src/pages/api/chat';
import { profile, projects } from '../src/data/portfolio';
import { STORIES } from '../src/data/stories';

// Comprehensive regex for emoji detection (Unicode emoji ranges)
const EMOJI_REGEX = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/u;

test('Chatbot Engine: DevOps & Cloud Services Intent', async (t) => {
  await t.test('accurately answers DevOps experience & services without schooling diversion', () => {
    const reply = generateHumanFallbackReply([
      { role: 'user', content: 'Do you have experiences of Devops and what services do you offer as devops' },
    ]);

    // Must address DevOps specifically
    assert.match(reply, /DevOps Experience/i);
    assert.match(reply, /CI\/CD/i);
    assert.match(reply, /Docker/i);
    assert.match(reply, /AWS|GCP/i);
    assert.match(reply, /Nginx|Reverse Proxy/i);
    assert.match(reply, /Celery|Redis/i);
    assert.match(reply, /DevOps Services Offered/i);

    // Must NOT divert to unrelated school degrees or generic career overview
    assert.doesNotMatch(reply, /FAST-NUCES/);
    assert.doesNotMatch(reply, /Bachelor of Science/);
    assert.doesNotMatch(reply, /Would you like to hear more about my pedagogical/);
    assert.doesNotMatch(reply, /Would you like more details on either of these roles\?/);

    // Strictly NO emojis
    assert.equal(EMOJI_REGEX.test(reply), false, 'DevOps reply must contain zero emojis');
  });

  await t.test('handles short DevOps keywords like "ci/cd" or "docker"', () => {
    const reply = generateHumanFallbackReply([{ role: 'user', content: 'Can you set up CI/CD pipelines?' }]);
    assert.match(reply, /CI\/CD/i);
    assert.match(reply, /GitHub Actions/i);
    assert.equal(EMOJI_REGEX.test(reply), false);
  });
});

test('Chatbot Engine: Intent Routing & Persona Accuracy', async (t) => {
  await t.test('handles greetings naturally and gives topics overview', () => {
    const reply = generateHumanFallbackReply([{ role: 'user', content: 'Hello' }]);
    assert.match(reply, /Hello! Great to connect with you/i);
    assert.match(reply, /DevOps & Cloud/i);
    assert.match(reply, /Why Hire Moiz/i);
    assert.equal(EMOJI_REGEX.test(reply), false);
  });

  await t.test('answers EPITECH Paris queries accurately with intelligent follow-up inquiries', () => {
    const reply = generateHumanFallbackReply([{ role: 'user', content: 'What is EPITECH Paris?' }]);
    assert.match(reply, /EPITECH Paris/i);
    assert.match(reply, /Pedagogical Assistant/i);
    assert.match(reply, /Master of Science in Information Technology/i);
    assert.match(reply, /### Suggested Inquiries:/i);
    assert.match(reply, /\?\s+Tell me about your role as Pedagogical Assistant/i);
    assert.equal(EMOJI_REGEX.test(reply), false);
  });

  await t.test('answers academic background queries with both universities', () => {
    const reply = generateHumanFallbackReply([{ role: 'user', content: 'What schools did you study at?' }]);
    assert.match(reply, /EPITECH Paris/i);
    assert.match(reply, /FAST-NUCES/i);
    assert.match(reply, /### Suggested Inquiries:/i);
    assert.equal(EMOJI_REGEX.test(reply), false);
  });

  await t.test('answers passions and hobbies with relevant follow-up inquiries', () => {
    const reply = generateHumanFallbackReply([{ role: 'user', content: 'What are your passions and hobbies outside of work?' }]);
    assert.match(reply, /Cooking/i);
    assert.match(reply, /Traveling/i);
    assert.match(reply, /Poésie|Poetry/i);
    assert.match(reply, /Photography/i);
    assert.match(reply, /Sport & Fitness/i);
    assert.match(reply, /Tech Deep Dives|ArXiv/i);
    assert.doesNotMatch(reply, /Chess/i);
    assert.match(reply, /### Suggested Inquiries:/i);
    assert.match(reply, /\?\s+Why should a recruiter hire Muhammad Abdul Moiz/i);
    assert.equal(EMOJI_REGEX.test(reply), false);
  });

  await t.test('answers DoctorIQ project details with non-looping follow-ups', () => {
    const reply = generateHumanFallbackReply([{ role: 'user', content: 'Tell me about DoctorIQ' }]);
    assert.match(reply, /DoctorIQ/i);
    assert.match(reply, /70% Latency Reduction/i);
    assert.match(reply, /Celery/i);
    assert.match(reply, /Redis/i);
    assert.match(reply, /### Suggested Inquiries:/i);
    assert.match(reply, /\?\s+Tell me about Brackets Genie/i);
    assert.equal(EMOJI_REGEX.test(reply), false);
  });
});

test('Chatbot Engine: Clickable Intelligent Follow-up Questions', async (t) => {
  await t.test('DevOps response includes logical, non-looping follow-up question chips', () => {
    const reply = generateHumanFallbackReply([
      { role: 'user', content: 'Do you have experiences of Devops and what services do you offer as devops' },
    ]);
    assert.match(reply, /### Suggested Inquiries:/);
    assert.match(reply, /\?\s+Tell me about DoctorIQ's cloud & Celery architecture/);
    assert.match(reply, /\?\s+What is your full backend and database tech stack\?/);
    assert.match(reply, /\?\s+What roles and contracts are you available for in Paris\?/);
    // Does NOT loop back to "what is devops"
    assert.doesNotMatch(reply, /\?\s+What is DevOps\?/i);
  });

  await t.test('Contact response provides direct links and does NOT format email as a question', () => {
    const reply = generateHumanFallbackReply([{ role: 'user', content: 'How do I contact you?' }]);
    assert.match(reply, /mailto:/);
    assert.match(reply, /tel:/);
    assert.doesNotMatch(reply, /\?\s+.*email/i, 'Email should not be suggested as a clickable question');
    assert.doesNotMatch(reply, /\?\s+.*phone/i, 'Phone should not be suggested as a clickable question');
    assert.match(reply, /### Suggested Inquiries:/);
    assert.match(reply, /\?\s+What roles and contract types are you open to\?/);
  });
});

test('Chatbot Engine: System Prompt Guidelines', async (t) => {
  await t.test('system prompt explicitly forbids emojis and guides intelligent clickable questions', () => {
    const prompt = buildSystemPrompt();
    assert.match(prompt, /CRITICAL RULE: NEVER USE EMOJIS/);
    assert.match(prompt, /DevOps & Infrastructure Focus/);
    assert.match(prompt, /CI\/CD Automation/);
    assert.match(prompt, /STRICT SCOPE & TOPIC RESTRICTION/);
    assert.equal(EMOJI_REGEX.test(prompt), false);
  });

  await t.test('politely declines off-topic and unrelated inquiries in fallback mode', () => {
    const replyEn = generateHumanFallbackReply([{ role: 'user', content: 'What is the capital of Australia?' }]);
    assert.match(replyEn, /exclusively dedicated to representing/i);
    assert.equal(EMOJI_REGEX.test(replyEn), false);

    const replyFr = generateHumanFallbackReply([{ role: 'user', content: 'Quelle est la capitale de la France ?' }], 'fr');
    assert.match(replyFr, /exclusivement aux questions concernant son profil/i);
    assert.equal(EMOJI_REGEX.test(replyFr), false);
  });

  await t.test('intelligently answers general help inquiries without refusing', () => {
    const reply = generateHumanFallbackReply([{ role: 'user', content: 'help me' }]);
    assert.match(reply, /help you navigate/i);
    assert.doesNotMatch(reply, /I only answer questions regarding/i);
    assert.equal(EMOJI_REGEX.test(reply), false);

    const replyFr = generateHumanFallbackReply([{ role: 'user', content: 'aide-moi' }], 'fr');
    assert.match(replyFr, /faire découvrir le travail/i);
    assert.doesNotMatch(replyFr, /je réponds exclusivement/i);
    assert.equal(EMOJI_REGEX.test(replyFr), false);
  });

  await t.test('intelligently handles app development & coding requests as project opportunities', () => {
    const reply = generateHumanFallbackReply([{ role: 'user', content: 'help me code an app' }]);
    assert.match(reply, /architecting and building production web, mobile/i);
    assert.match(reply, /FastAPI/);
    assert.match(reply, /DoctorIQ/);
    assert.doesNotMatch(reply, /I only answer questions regarding/i);
    assert.equal(EMOJI_REGEX.test(reply), false);

    const replyFr = generateHumanFallbackReply([{ role: 'user', content: 'aide-moi à coder une application' }], 'fr');
    assert.match(replyFr, /conçoit et développe des applications web/i);
    assert.match(replyFr, /FastAPI/);
    assert.doesNotMatch(replyFr, /je réponds exclusivement/i);
    assert.equal(EMOJI_REGEX.test(replyFr), false);
  });
});

test('Security & Optimization: Input Sanitization (XSS & Injection)', async (t) => {
  await t.test('strips HTML script tags', () => {
    const sanitized = sanitizeText('<script>alert("xss")</script>Hello world');
    assert.equal(sanitized, 'Hello world');
  });

  await t.test('strips HTML event handlers and tags', () => {
    const sanitized = sanitizeText('<img src="x" onerror="alert(1)">What is your stack?');
    assert.equal(sanitized, 'What is your stack?');
  });

  await t.test('strips javascript pseudo-protocol schemes', () => {
    const sanitized = sanitizeText('javascript:alert(1)');
    assert.equal(sanitized, 'alert(1)');
  });

  await t.test('removes null bytes', () => {
    const sanitized = sanitizeText('devops\0infrastructure');
    assert.equal(sanitized, 'devopsinfrastructure');
  });

  await t.test('strips iframe, object, and embed injection vectors', () => {
    const sanitized = sanitizeText('<iframe src="https://evil.com"></iframe><object data="evil.swf"></object><embed src="evil.pdf">Hello');
    assert.equal(sanitized, 'Hello');
  });

  await t.test('strips data: URI and vbscript pseudo-protocols', () => {
    const sanitized = sanitizeText('data:text/html,<script>alert(1)</script>vbscript:msgbox(1)Check stack');
    assert.doesNotMatch(sanitized, /data\s*:\s*text\/html/i);
    assert.doesNotMatch(sanitized, /script/i);
    assert.doesNotMatch(sanitized, /vbscript/i);
  });

  await t.test('truncates strings longer than 2000 characters', () => {
    const longString = 'a'.repeat(3000);
    const sanitized = sanitizeText(longString);
    assert.equal(sanitized.length, 2000);
  });

  await t.test('handles non-string or empty inputs safely', () => {
    assert.equal(sanitizeText(''), '');
    // @ts-expect-error test invalid type safety
    assert.equal(sanitizeText(null), '');
    // @ts-expect-error test invalid type safety
    assert.equal(sanitizeText(undefined), '');
  });
});

test('Security & Optimization: Sliding Window Rate Limiting', async (t) => {
  resetRateLimitsForTesting();
  const testIp = '192.168.1.100';

  await t.test('allows initial 30 requests within 1 minute window', () => {
    for (let i = 0; i < 30; i++) {
      const blocked = isRateLimited(testIp);
      assert.equal(blocked, false, `Request ${i + 1} should be permitted`);
    }
  });

  await t.test('blocks the 31st request as rate limited', () => {
    const blocked = isRateLimited(testIp);
    assert.equal(blocked, true, 'Request 31 must be blocked');
  });

  await t.test('isolated per IP address', () => {
    const anotherIp = '10.0.0.1';
    assert.equal(isRateLimited(anotherIp), false, 'Different IP should not be blocked');
  });

  resetRateLimitsForTesting();
});

test('Chatbot Engine: CV Projects, Capabilities & Alternance', async (t) => {
  await t.test('answers Ledgeroo FinTech queries with Stripe and encrypted transactions', () => {
    const reply = generateHumanFallbackReply([{ role: 'user', content: 'Tell me about Ledgeroo and FinTech' }]);
    assert.match(reply, /Ledgeroo/i);
    assert.match(reply, /Stripe/i);
    assert.match(reply, /Encrypted Transaction/i);
    assert.match(reply, /### Suggested Inquiries:/);
    assert.equal(EMOJI_REGEX.test(reply), false);
  });

  await t.test('answers Time Manager queries with Elixir, Phoenix, and Vue 3', () => {
    const reply = generateHumanFallbackReply([{ role: 'user', content: 'What is Time Manager?' }]);
    assert.match(reply, /Time Manager/i);
    assert.match(reply, /Elixir/i);
    assert.match(reply, /Phoenix/i);
    assert.match(reply, /Vue 3/i);
    assert.match(reply, /### Suggested Inquiries:/);
    assert.equal(EMOJI_REGEX.test(reply), false);
  });

  await t.test('answers Tamiami Fitness queries with Dialogflow NLP and OCR automation', () => {
    const reply = generateHumanFallbackReply([{ role: 'user', content: 'Tell me about Tamiami Fitness' }]);
    assert.match(reply, /Tamiami Fitness/i);
    assert.match(reply, /Dialogflow/i);
    assert.match(reply, /90% of member bookings|90%/i);
    assert.match(reply, /OCR/i);
    assert.match(reply, /### Suggested Inquiries:/);
    assert.equal(EMOJI_REGEX.test(reply), false);
  });

  await t.test('answers VIF queries with Project Lead role and DORA metrics', () => {
    const reply = generateHumanFallbackReply([{ role: 'user', content: 'What was your role on VIF?' }]);
    assert.match(reply, /VIF/i);
    assert.match(reply, /Project Lead/i);
    assert.match(reply, /DORA Metrics/i);
    assert.match(reply, /FastAPI/i);
    assert.match(reply, /### Suggested Inquiries:/);
    assert.equal(EMOJI_REGEX.test(reply), false);
  });

  await t.test('answers Trinity Suite queries with Software Factory and SonarQube', () => {
    const reply = generateHumanFallbackReply([{ role: 'user', content: 'Tell me about Trinity Suite' }]);
    assert.match(reply, /Trinity Suite/i);
    assert.match(reply, /Software Factory/i);
    assert.match(reply, /SonarQube/i);
    assert.match(reply, /### Suggested Inquiries:/);
    assert.equal(EMOJI_REGEX.test(reply), false);
  });

  await t.test('answers LangGraph and agentic queries with multi-step orchestration', () => {
    const reply = generateHumanFallbackReply([{ role: 'user', content: 'Do you have experience with LangGraph and agentic AI?' }]);
    assert.match(reply, /LangGraph/i);
    assert.match(reply, /Brackets Genie/i);
    assert.match(reply, /Claude API|OpenAI API/i);
    assert.match(reply, /### Suggested Inquiries:/);
    assert.equal(EMOJI_REGEX.test(reply), false);
  });

  await t.test('answers Alternance status and future CDI/CDD queries precisely', () => {
    const reply = generateHumanFallbackReply([{ role: 'user', content: 'What is your availability and alternance status?' }]);
    assert.match(reply, /EPITECH Paris/i);
    assert.match(reply, /CDI|CDD/i);
    assert.match(reply, /Paris/i);
    assert.match(reply, /### Suggested Inquiries:/);
    assert.equal(EMOJI_REGEX.test(reply), false);
  });

  await t.test('all projects overview showcases all 8 key projects', () => {
    const reply = generateHumanFallbackReply([{ role: 'user', content: 'Show me all your projects' }]);
    assert.match(reply, /DoctorIQ/i);
    assert.match(reply, /Brackets Genie/i);
    assert.match(reply, /VIF/i);
    assert.match(reply, /Ledgeroo/i);
    assert.match(reply, /Trinity Suite/i);
    assert.match(reply, /Time Manager/i);
    assert.match(reply, /Tamiami Fitness/i);
    assert.match(reply, /Zoidberg 2.0/i);
    assert.match(reply, /### Suggested Inquiries:/);
    assert.equal(EMOJI_REGEX.test(reply), false);
  });
});

test('Chatbot Engine: Domain Topic Detection & Adaptive Token Optimization', async (t) => {
  await t.test('detects devops domain from various keywords', () => {
    assert.equal(detectDomainTopic([{ role: 'user', content: 'What are your devops capabilities?' }]), 'devops');
    assert.equal(detectDomainTopic([{ role: 'user', content: 'Tell me about your CI/CD and Docker experience' }]), 'devops');
    assert.equal(detectDomainTopic([{ role: 'user', content: 'How do you configure Kubernetes and AWS infrastructure?' }]), 'devops');
  });

  await t.test('detects frontend domain and injects targeted context', () => {
    const topic = detectDomainTopic([{ role: 'user', content: 'What front-end frameworks and React skills do you have?' }]);
    assert.equal(topic, 'frontend');

    const prompt = buildSystemPrompt([{ role: 'user', content: 'What are your front-end capabilities?' }]);
    assert.match(prompt, /Active Domain Context: Front-End Architecture/i);
    assert.match(prompt, /React 18/);
    assert.match(prompt, /Vue 3/);
    assert.match(prompt, /React Native/);
    assert.match(prompt, /Brackets Genie/);
    assert.equal(EMOJI_REGEX.test(prompt), false);
  });

  await t.test('detects backend domain and injects targeted context', () => {
    const topic = detectDomainTopic([{ role: 'user', content: 'Tell me about your backend and microservices stack' }]);
    assert.equal(topic, 'backend');

    const prompt = buildSystemPrompt([{ role: 'user', content: 'Tell me about your backend capabilities' }]);
    assert.match(prompt, /Active Domain Context: Backend Engineering/i);
    assert.match(prompt, /FastAPI/);
    assert.match(prompt, /Django/);
    assert.match(prompt, /Elixir/);
    assert.match(prompt, /DoctorIQ/);
    assert.match(prompt, /Ledgeroo/);
    assert.equal(EMOJI_REGEX.test(prompt), false);
  });

  await t.test('detects AI / machine learning domain and injects targeted context', () => {
    const topic = detectDomainTopic([{ role: 'user', content: 'What is your experience with LangGraph, LLMs and GenAI?' }]);
    assert.equal(topic, 'ai');

    const prompt = buildSystemPrompt([{ role: 'user', content: 'What are your AI capabilities?' }]);
    assert.match(prompt, /Active Domain Context: Applied Generative AI/i);
    assert.match(prompt, /LangGraph/);
    assert.match(prompt, /DenseNet121/);
    assert.match(prompt, /Zoidberg 2.0/);
    assert.match(prompt, /Brackets Genie/);
    assert.equal(EMOJI_REGEX.test(prompt), false);
  });

  await t.test('detects project management domain and injects targeted context', () => {
    const topic = detectDomainTopic([{ role: 'user', content: 'How do you handle Agile scrum and project management?' }]);
    assert.equal(topic, 'pm');

    const prompt = buildSystemPrompt([{ role: 'user', content: 'What are your project management capabilities?' }]);
    assert.match(prompt, /Active Domain Context: Technical Project Management/i);
    assert.match(prompt, /VIF/);
    assert.match(prompt, /DORA metrics/);
    assert.equal(EMOJI_REGEX.test(prompt), false);
  });

  await t.test('token optimization: dynamic prompt is significantly smaller than monolithic prompt', () => {
    const targetedPrompt = buildSystemPrompt([{ role: 'user', content: 'What are your devops capabilities?' }]);
    // Targeted prompt length should be compact (< 4500 characters, ~800 tokens vs previous ~2500+ tokens)
    assert.ok(targetedPrompt.length < 5000, `Targeted prompt should be compact, was ${targetedPrompt.length} chars`);
    assert.match(targetedPrompt, /Active Domain Context: DevOps/i);
    assert.equal(EMOJI_REGEX.test(targetedPrompt), false);
  });
});

test('Chatbot Engine: Domain Capability Fallbacks with Project Explanations', async (t) => {
  await t.test('frontend capabilities fallback includes projects with small explanations', () => {
    const reply = generateHumanFallbackReply([{ role: 'user', content: 'What are your frontend capabilities?' }]);
    assert.match(reply, /Frontend & Mobile Architecture Capabilities/i);
    assert.match(reply, /Brackets Genie/i);
    assert.match(reply, /Time Manager/i);
    assert.match(reply, /Trinity Dev-App/i);
    assert.match(reply, /React 18/i);
    assert.match(reply, /Vue 3/i);
    assert.match(reply, /### Suggested Inquiries:/);
    assert.equal(EMOJI_REGEX.test(reply), false);
  });

  await t.test('backend capabilities fallback includes projects with small explanations', () => {
    const reply = generateHumanFallbackReply([{ role: 'user', content: 'What are your backend capabilities?' }]);
    assert.match(reply, /Backend & Distributed Microservices Capabilities/i);
    assert.match(reply, /DoctorIQ/i);
    assert.match(reply, /Ledgeroo/i);
    assert.match(reply, /Time Manager/i);
    assert.match(reply, /FastAPI/i);
    assert.match(reply, /Elixir/i);
    assert.match(reply, /### Suggested Inquiries:/);
    assert.equal(EMOJI_REGEX.test(reply), false);
  });

  await t.test('AI/ML capabilities fallback includes projects with small explanations', () => {
    const reply = generateHumanFallbackReply([{ role: 'user', content: 'What are your AI capabilities?' }]);
    assert.match(reply, /Applied Generative AI & Machine Learning Capabilities/i);
    assert.match(reply, /Brackets Genie/i);
    assert.match(reply, /DoctorIQ/i);
    assert.match(reply, /Zoidberg 2.0/i);
    assert.match(reply, /LangGraph/i);
    assert.match(reply, /### Suggested Inquiries:/);
    assert.equal(EMOJI_REGEX.test(reply), false);
  });

  await t.test('project management fallback includes projects with small explanations', () => {
    const reply = generateHumanFallbackReply([{ role: 'user', content: 'What are your project management capabilities?' }]);
    assert.match(reply, /Project Management & Agile Technical Leadership/i);
    assert.match(reply, /VIF Project Lead/i);
    assert.match(reply, /EPITECH Paris Pedagogical Assistant/i);
    assert.match(reply, /Agile Scrum/i);
    assert.match(reply, /### Suggested Inquiries:/);
    assert.equal(EMOJI_REGEX.test(reply), false);
  });

  await t.test('devops fallback includes featured projects with small explanations', () => {
    const reply = generateHumanFallbackReply([{ role: 'user', content: 'What are your devops capabilities?' }]);
    assert.match(reply, /Featured DevOps Projects/i);
    assert.match(reply, /Trinity DevOps Software Factory/i);
    assert.match(reply, /DoctorIQ Cloud Architecture/i);
    assert.match(reply, /DORA Metrics & gitStream Delivery/i);
    assert.match(reply, /### Suggested Inquiries:/);
    assert.equal(EMOJI_REGEX.test(reply), false);
  });
});

test('Security & Data Integrity: Non-Monolithic Data & Route Verification', async (t) => {
  await t.test('all portfolio projects have valid metadata, category, and stack without emojis', () => {
    assert.ok(projects.length >= 8, `Expected at least 8 projects, found ${projects.length}`);

    for (const proj of projects) {
      assert.ok(proj.title && proj.title.trim().length > 0, `Project missing title: ${JSON.stringify(proj)}`);
      assert.ok(proj.category && proj.category.trim().length > 0, `Project ${proj.title} missing category`);
      assert.ok(proj.description && proj.description.trim().length > 0, `Project ${proj.title} missing description`);
      assert.ok(Array.isArray(proj.stack) && proj.stack.length > 0, `Project ${proj.title} missing stack`);

      // Strictly zero emojis in project titles and descriptions
      assert.equal(EMOJI_REGEX.test(proj.title), false, `Project ${proj.title} title contains emoji`);
      assert.equal(EMOJI_REGEX.test(proj.description), false, `Project ${proj.title} description contains emoji`);
    }
  });

  await t.test('all storytelling chapters have valid metrics and non-empty stacks without emojis', () => {
    assert.ok(STORIES.length === 5, `Expected 5 chapters in STORIES, got ${STORIES.length}`);

    for (const story of STORIES) {
      assert.ok(story.step && story.step.length === 2, `Story missing 2-digit step: ${story.step}`);
      assert.ok(story.title && story.title.length > 0, `Story missing title`);
      assert.ok(story.metric && story.metric.length > 0, `Story ${story.title} missing metric`);
      assert.ok(Array.isArray(story.stack) && story.stack.length > 0, `Story ${story.title} missing stack`);

      // Strictly zero emojis in story texts
      assert.equal(EMOJI_REGEX.test(story.title), false, `Story ${story.title} title contains emoji`);
      assert.equal(EMOJI_REGEX.test(story.description), false, `Story ${story.title} description contains emoji`);
    }
  });

  await t.test('profile contact links are valid and active', () => {
    assert.match(profile.email, /^[\w.-]+@[\w.-]+\.\w+$/);
    assert.match(profile.linkedin, /^https:\/\/linkedin\.com\/in\//);
    assert.match(profile.github, /^https:\/\/github\.com\//);
    assert.match(profile.phone, /^\+33/);
  });

  await t.test('favicon and chrome tab assets exist with non-zero size', () => {
    const requiredAssets = [
      'public/favicon.ico',
      'public/favicon-32x32.png',
      'public/favicon-16x16.png',
      'public/apple-touch-icon.png',
      'public/icons/icon-192.png',
      'public/icons/icon-512.png',
      'public/manifest.webmanifest',
    ];

    for (const relPath of requiredAssets) {
      const fullPath = path.join(process.cwd(), relPath);
      assert.ok(fs.existsSync(fullPath), `Asset ${relPath} must exist`);
      const stat = fs.statSync(fullPath);
      assert.ok(stat.size > 0, `Asset ${relPath} must not be empty`);
    }
  });
});

test('Architecture & Modularity: Chatbot Sub-Module Exports Verification', async (t) => {
  await t.test('modular barrel export matches individual sub-module contracts', async () => {
    const barrel = await import('../src/lib/chatbot/index');
    const proxy = await import('../src/lib/chatbot');

    assert.equal(typeof barrel.detectDomainTopic, 'function');
    assert.equal(typeof barrel.buildSystemPrompt, 'function');
    assert.equal(typeof barrel.generateHumanFallbackReply, 'function');
    assert.equal(typeof barrel.callGeminiApi, 'function');
    assert.equal(typeof barrel.callOpenAICompatibleApi, 'function');

    // Proxy must maintain exact parity
    assert.equal(typeof proxy.detectDomainTopic, 'function');
    assert.equal(typeof proxy.buildSystemPrompt, 'function');
    assert.equal(typeof proxy.generateHumanFallbackReply, 'function');
  });
});

test('Chatbot Engine: Age, Birth Queries & Dynamic Response Variation', async (t) => {
  await t.test('answers English age and birthdate inquiries with 2002 and 23 years old', () => {
    const queries = [
      'when was moiz born',
      'his age',
      'how old are you',
      'what is his age',
      'what is your date of birth',
      'when were you born',
      'when is your birthday',
    ];

    for (const q of queries) {
      const reply = generateHumanFallbackReply([{ role: 'user', content: q }]);
      assert.match(reply, /2002/, `Query "${q}" should mention birth year 2002`);
      assert.match(reply, /23\s+years\s+old/, `Query "${q}" should mention 23 years old`);
      assert.match(reply, /FAST-NUCES|EPITECH Paris/);
      assert.equal(EMOJI_REGEX.test(reply), false, 'Must contain zero emojis');

      // Verify mixed inquiries (contains both clickable '?' and non-clickable '~')
      assert.match(reply, /### Suggested Inquiries:/);
      assert.match(reply, /\?\s+/);
      assert.match(reply, /~\s+/);
    }
  });

  await t.test('answers French age and birthdate inquiries with 2002 and 23 ans', () => {
    const queries = [
      'quel âge a moiz',
      'quand est-il né',
      'sa date de naissance',
      'quel âge as-tu',
      'son âge',
      'date de naissance',
    ];

    for (const q of queries) {
      const reply = generateHumanFallbackReply([{ role: 'user', content: q }], 'fr');
      assert.match(reply, /2002/, `French query "${q}" should mention 2002`);
      assert.match(reply, /23\s+ans/, `French query "${q}" should mention 23 ans`);
      assert.equal(EMOJI_REGEX.test(reply), false, 'French reply must contain zero emojis');

      // Verify mixed inquiries in French
      assert.match(reply, /### Suggestions de questions :/);
      assert.match(reply, /\?\s+/);
      assert.match(reply, /~\s+/);
    }
  });

  await t.test('answers English hometown, origin & birthplace queries with Pakistan and Paris', () => {
    const queries = [
      'what is your home town',
      'what is your hometown',
      'where are you from',
      'where was moiz born',
      'where were you born',
      'where did you grow up',
    ];

    for (const q of queries) {
      const reply = generateHumanFallbackReply([{ role: 'user', content: q }]);
      assert.match(reply, /Pakistan/i, `Query "${q}" should mention Pakistan`);
      assert.match(reply, /Paris/i, `Query "${q}" should mention Paris`);
      assert.equal(EMOJI_REGEX.test(reply), false, 'Must contain zero emojis');
    }
  });

  await t.test('answers French origin & birthplace queries with Pakistan and Paris', () => {
    const queries = [
      'quelle est votre ville d’origine',
      'd’où venez-vous',
      'où êtes-vous né',
      'où as-tu grandi',
    ];

    for (const q of queries) {
      const reply = generateHumanFallbackReply([{ role: 'user', content: q }], 'fr');
      assert.match(reply, /Pakistan/i, `French query "${q}" should mention Pakistan`);
      assert.match(reply, /Paris/i, `French query "${q}" should mention Paris`);
      assert.equal(EMOJI_REGEX.test(reply), false, 'Must contain zero emojis');
    }
  });

  await t.test('dynamically varies responses when the same question is asked 2 times in a row', () => {
    // Turn 1: initial question
    const reply1 = generateHumanFallbackReply([
      { role: 'user', content: 'when was moiz born' },
    ]);

    // Turn 2: same question asked consecutively
    const reply2 = generateHumanFallbackReply([
      { role: 'user', content: 'when was moiz born' },
      { role: 'assistant', content: reply1 },
      { role: 'user', content: 'when was moiz born' },
    ]);

    // The two responses must be distinctly phrased so the bot feels human, not repetitive
    assert.notEqual(reply1, reply2, 'Turn 2 response must be different from Turn 1 response');
    assert.match(reply1, /2002/);
    assert.match(reply2, /2002/);
  });

  await t.test('dynamically varies default fallback responses on consecutive turns', () => {
    const reply1 = generateHumanFallbackReply([
      { role: 'user', content: 'can you give me general advice' },
    ]);

    const reply2 = generateHumanFallbackReply([
      { role: 'user', content: 'can you give me general advice' },
      { role: 'assistant', content: reply1 },
      { role: 'user', content: 'can you give me general advice' },
    ]);

    assert.notEqual(reply1, reply2, 'Consecutive fallback responses must be varied');
  });

  await t.test('suggested inquiries contain a thoughtful mix of clickable and non-clickable cards', () => {
    const replyGreeting = generateHumanFallbackReply([{ role: 'user', content: 'hello' }]);
    const lines = replyGreeting.split('\n').map((l) => l.trim()).filter(Boolean);
    const hasClickable = lines.some((l) => l.startsWith('? '));
    const hasInformational = lines.some((l) => l.startsWith('~ '));

    assert.equal(hasClickable, true, 'Must have at least one clickable inquiry');
    assert.equal(hasInformational, true, 'Must have at least one non-clickable informational suggestion');
  });
});

