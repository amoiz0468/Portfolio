import { FormEvent, useState, useRef, useEffect, ReactNode } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMinus, FiRefreshCw, FiCopy, FiCheck, FiSend } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

// Inline lightweight SVGs (Icons & Logos)
function ChatBubbleIcon(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      width="22"
      height="22"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function BriefcaseIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} width="13" height="13">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function ActivityIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} width="13" height="13">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function TerminalIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} width="13" height="13">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function CloudIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} width="13" height="13">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function GraduationCapIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} width="13" height="13">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function TargetIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} width="13" height="13">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function HeartIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} width="13" height="13">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function AwardIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} width="13" height="13">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  );
}

const TOPIC_ICONS = [
  CloudIcon,
  AwardIcon,
  TargetIcon,
  ActivityIcon,
  HeartIcon,
  BriefcaseIcon,
  TerminalIcon,
  GraduationCapIcon,
];

type ChatMessage = {
  role: 'assistant' | 'user';
  content: string;
  timestamp?: string;
};

/**
 * Renders an intelligent interactive question card button.
 */
function renderQuestionCard(
  text: string,
  key: string | number,
  onPromptClick?: (query: string) => void
) {
  const isClickable = Boolean(onPromptClick);
  return (
    <button
      key={key}
      type="button"
      onClick={isClickable ? () => onPromptClick!(text) : undefined}
      className="group my-1 flex w-full items-center justify-between gap-3 rounded-xl border border-indigo-200 bg-indigo-50/70 p-2.5 text-left transition-all duration-200 hover:border-indigo-400 hover:bg-indigo-100 hover:shadow-sm active:scale-[0.99] cursor-pointer dark:border-indigo-500/25 dark:bg-slate-900/90 dark:bg-gradient-to-r dark:from-indigo-500/10 dark:via-slate-900/80 dark:to-purple-500/10 dark:hover:border-indigo-400/60 dark:hover:bg-indigo-500/20 dark:hover:shadow-[0_0_18px_rgba(99,102,241,0.25)]"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-[11px] font-bold text-indigo-700 ring-1 ring-indigo-300 dark:bg-indigo-500/20 dark:text-indigo-300 dark:ring-indigo-400/30">
          ?
        </span>
        <span className="text-xs font-medium text-slate-800 transition group-hover:text-slate-950 dark:text-slate-200 dark:group-hover:text-white line-clamp-2">
          {renderInlineStyles(text)}
        </span>
      </div>
      <span className="shrink-0 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 opacity-80 transition-opacity group-hover:opacity-100 flex items-center gap-0.5">
        Ask &rarr;
      </span>
    </button>
  );
}

function renderSuggestionCard(text: string, key: string | number) {
  return (
    <div
      key={key}
      className="my-1 flex w-full items-center gap-2.5 rounded-xl border border-slate-200/90 bg-slate-50/80 p-2.5 text-left dark:border-white/10 dark:bg-white/[0.03]"
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-slate-200/70 text-[11px] font-bold text-slate-600 dark:bg-white/10 dark:text-slate-300">
        &bull;
      </span>
      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
        {renderInlineStyles(text)}
      </span>
    </div>
  );
}

/**
 * Helper to render Markdown text cleanly without emojis.
 */
function FormattedText({
  content,
  onPromptClick,
}: {
  content: string;
  onPromptClick?: (query: string) => void;
}) {
  // Strip any suggested inquiries blocks from rendered messages
  const cleanedContent = content
    .replace(/\n*###\s*(?:Suggested Inquiries|Questions Recommand[ée]es|Suggestions de questions)[\s\S]*$/i, '')
    .trim();

  const rawParagraphs = cleanedContent
    .split(/\n{2,}/)
    .filter((para) => {
      const trimmed = para.trim();
      if (!trimmed) return false;
      if (/^###\s*(?:Suggested|Questions Recommand|Suggestions)/i.test(trimmed)) return false;
      const lines = trimmed.split('\n').map((l) => l.trim()).filter(Boolean);
      return !lines.every((l) => l.startsWith('? ') || l.startsWith('~ ') || /^[-*]\s+[?~]\s+/.test(l));
    });

  return (
    <div className="space-y-3 text-xs leading-relaxed text-slate-800 dark:text-slate-200">
      {rawParagraphs.map((para, pIdx) => {
        const lines = para.split('\n').map((l) => l.trim()).filter(Boolean);

        const isBulletList = lines.length > 0 && lines.every((l) => l.startsWith('- ') || l.startsWith('* '));
        if (isBulletList) {
          return (
            <div key={pIdx} className="my-1.5 space-y-1.5 pl-0.5">
              {lines.map((line, lIdx) => {
                const text = line.replace(/^[-*]\s+/, '');
                return (
                  <div key={lIdx} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                    <div className="flex-1 leading-relaxed text-slate-800 dark:text-slate-200">
                      {renderInlineStyles(text)}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }

        const isNumberedList = lines.length > 0 && lines.every((l) => /^\d+\.\s+/.test(l));
        if (isNumberedList) {
          return (
            <div key={pIdx} className="my-1.5 space-y-2 pl-0.5">
              {lines.map((line, lIdx) => {
                const match = line.match(/^(\d+)\.\s+(.*)/);
                const num = match ? match[1] : String(lIdx + 1);
                const text = match ? match[2] : line;
                return (
                  <div key={lIdx} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-indigo-100 dark:bg-indigo-500/20 font-mono text-[10px] font-bold text-indigo-700 dark:text-indigo-300">
                      {num}
                    </span>
                    <div className="flex-1 leading-relaxed text-slate-800 dark:text-slate-200">
                      {renderInlineStyles(text)}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }

        // Check for Markdown table: has a divider row like |---|---| and header/data rows with pipes
        const dividerIndex = lines.findIndex((l) => /^\|?\s*[-:]+[-| :]*\|?\s*$/.test(l));
        if (dividerIndex >= 1) {
          const introLines = lines.slice(0, dividerIndex - 1);
          const parseRow = (line: string) =>
            line
              .replace(/^\|/, '')
              .replace(/\|$/, '')
              .split('|')
              .map((c) => c.trim());

          const headerCells = parseRow(lines[dividerIndex - 1]);
          const rowLines = lines.slice(dividerIndex + 1).filter((l) => l.includes('|'));
          const rows = rowLines.map(parseRow);

          return (
            <div key={pIdx} className="my-2 space-y-2">
              {introLines.length > 0 && (
                <p className="leading-relaxed whitespace-pre-line">
                  {renderInlineStyles(introLines.join('\n'))}
                </p>
              )}
              <div className="overflow-x-auto rounded-xl border border-slate-200/90 bg-slate-50/70 p-0.5 dark:border-white/10 dark:bg-white/[0.03]">
                <table className="w-full min-w-[280px] border-collapse text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-slate-200/90 bg-slate-100/90 dark:border-white/10 dark:bg-white/[0.06]">
                      {headerCells.map((h, hIdx) => (
                        <th
                          key={hIdx}
                          className="px-2.5 py-1.5 font-bold uppercase tracking-wider text-[10px] text-slate-700 dark:text-slate-200"
                        >
                          {renderInlineStyles(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/70 dark:divide-white/5">
                    {rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className="transition-colors hover:bg-slate-100/50 dark:hover:bg-white/[0.02]"
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className="px-2.5 py-2 align-top leading-relaxed text-slate-700 dark:text-slate-300"
                          >
                            {renderInlineStyles(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        }

        if (para.trim() === '---') {
          return <hr key={pIdx} className="my-2 border-slate-200 dark:border-white/10" />;
        }

        if (para.includes('```')) {
          const segments = para.split(/(```[\s\S]*?```)/g);
          return (
            <div key={pIdx} className="space-y-2">
              {segments.map((seg, sIdx) => {
                const cbMatch = seg.match(/^```([a-zA-Z0-9_-]+)?\n?([\s\S]*?)```$/);
                if (cbMatch) {
                  const lang = cbMatch[1] || '';
                  const code = cbMatch[2].trim();
                  return (
                    <div
                      key={sIdx}
                      className="my-2 overflow-hidden rounded-xl border border-slate-200/90 bg-slate-900 text-slate-100 shadow-sm dark:border-white/10 dark:bg-black/60"
                    >
                      {lang && (
                        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/70 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                          <span>{lang}</span>
                        </div>
                      )}
                      <pre className="overflow-x-auto p-3 font-mono text-[11px] leading-relaxed text-emerald-400 dark:text-emerald-300">
                        <code>{code}</code>
                      </pre>
                    </div>
                  );
                }
                const trimmed = seg.trim();
                if (!trimmed) return null;
                return (
                  <p key={sIdx} className="leading-relaxed whitespace-pre-line">
                    {renderInlineStyles(trimmed)}
                  </p>
                );
              })}
            </div>
          );
        }

        if (para.startsWith('### ')) {
          return (
            <h4
              key={pIdx}
              className="mt-3.5 mb-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-300"
            >
              {renderInlineStyles(para.replace(/^###\s+/, ''))}
            </h4>
          );
        }

        return (
          <p key={pIdx} className="leading-relaxed whitespace-pre-line">
            {renderInlineStyles(para)}
          </p>
        );
      })}
    </div>
  );
}

function renderInlineStyles(text: string): ReactNode {
  // Normalize malformed markdown links (multiline or bold-wrapped links)
  const normalized = text
    .replace(/\[([^\]]+)\]\s*\(([^)\s]+)\)/g, '[$1]($2)')
    .replace(/\*\*\[([^\]]+)\]\(([^)]+)\)\*\*/g, '[$1]($2)')
    .replace(/\*\*\[([^\]]+)\]\*\*\(([^)]+)\)/g, '[$1]($2)');

  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`|https?:\/\/[^\s<)]+)/g;
  const parts = normalized.split(tokenRegex);

  return parts.map((part, i) => {
    if (!part) return null;

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const label = linkMatch[1];
      const href = linkMatch[2];
      const isSafe =
        /^https?:\/\//i.test(href) ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('/') ||
        href.startsWith('#');
      const safeHref = isSafe ? href : '#';
      const isExternal = /^https?:\/\//i.test(safeHref);
      const isHash = safeHref.startsWith('#');

      const handleLinkClick = isHash
        ? (e: React.MouseEvent) => {
            const targetEl = document.querySelector(safeHref);
            if (targetEl) {
              e.preventDefault();
              targetEl.scrollIntoView({ behavior: 'smooth' });
            }
          }
        : undefined;

      return (
        <a
          key={i}
          href={safeHref}
          onClick={handleLinkClick}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="font-semibold text-indigo-600 underline decoration-indigo-400/50 underline-offset-2 transition hover:text-indigo-800 dark:text-indigo-300 dark:hover:text-indigo-200"
        >
          {label}
        </a>
      );
    }

    if (/^https?:\/\//i.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-indigo-600 underline decoration-indigo-400/50 underline-offset-2 transition hover:text-indigo-800 dark:text-indigo-300 dark:hover:text-indigo-200"
        >
          {part}
        </a>
      );
    }

    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={i} className="font-bold text-slate-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code
          key={i}
          className="rounded-md border border-indigo-200 bg-indigo-50 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-indigo-800 dark:border-indigo-400/30 dark:bg-indigo-950/60 dark:text-indigo-200"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}

export default function PortfolioChat() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: t.chat.initialMessage,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update initial message when language changes if no conversation took place
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [{ role: 'assistant', content: t.chat.initialMessage }];
      }
      return prev;
    });
  }, [lang, t.chat.initialMessage]);

  const getTimeString = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading, isOpen]);

  const isFinePointer = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  };

  useEffect(() => {
    if (isOpen && isFinePointer()) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      if (isFinePointer()) {
        setTimeout(() => inputRef.current?.focus(), 120);
      }
    };

    const checkHash = () => {
      if (typeof window !== 'undefined' && window.location.hash === '#chat') {
        handleOpen();
      }
    };

    checkHash();
    window.addEventListener('open-chat', handleOpen);
    window.addEventListener('hashchange', checkHash);
    return () => {
      window.removeEventListener('open-chat', handleOpen);
      window.removeEventListener('hashchange', checkHash);
    };
  }, []);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([{ role: 'assistant', content: t.chat.initialMessage }]);
    setInput('');
  };

  const sendMessage = async (questionOverride?: string) => {
    const nextQuestion = (questionOverride ?? input).trim();
    if (!nextQuestion || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: nextQuestion,
      timestamp: getTimeString(),
    };

    const nextMessages: ChatMessage[] = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    // Only focus input if user manually typed on desktop; NEVER when clicking question chips or on mobile/touch
    if (!questionOverride && isFinePointer()) {
      inputRef.current?.focus();
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages, lang }),
      });

      const data = await response.json();
      const reply = data?.reply || (lang === 'fr' ? 'Je rencontre une petite difficulté. N hésitez pas à reformuler.' : 'I hit a small issue getting the answer. Feel free to rephrase or ask again.');

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: reply,
          timestamp: getTimeString(),
        },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: lang === 'fr' ? 'Connexion temporairement indisponible. Vous pouvez me contacter directement à **amoiz0468@gmail.com**.' : 'I am having trouble connecting right now, but feel free to explore my portfolio or reach me directly at **amoiz0468@gmail.com**.',
          timestamp: getTimeString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <>
      {/* Floating Chat Bubble Launcher: Shown on desktop; on mobile, MobileBottomNav dock handles AI interaction */}
      <AnimatePresence>
        {!isOpen && (
          <div id="chat" className="hidden md:flex fixed bottom-6 right-6 z-50 items-center gap-3">
            {/* Floating Invitation Teaser Pill */}
            <motion.button
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(true)}
              className="hidden sm:flex items-center gap-2.5 rounded-full border border-slate-200/90 bg-white/95 py-2 px-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl transition hover:border-indigo-400 hover:bg-slate-50 group dark:border-white/15 dark:bg-slate-900/90 dark:hover:border-indigo-400/50 dark:hover:bg-slate-800/90"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-white transition">
                {lang === 'fr' ? "Discuter avec l'IA" : 'Chat with Moiz AI'}
              </span>
            </motion.button>

            {/* Circular Chat Bubble Trigger */}
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setIsOpen(true)}
              aria-label={t.chat.floatingButtonLabel}
              className="group relative flex h-14 w-14 sm:h-[58px] sm:w-[58px] items-center justify-center rounded-full border border-indigo-400/50 bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 text-white shadow-[0_10px_35px_rgba(79,70,229,0.5)] backdrop-blur-xl"
            >
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white dark:border-slate-950 bg-emerald-400" />
              </span>

              <ChatBubbleIcon className="transition-transform duration-300 group-hover:scale-110" />
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Expanded Floating Glass Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Sheet Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/65 backdrop-blur-sm sm:hidden pointer-events-auto"
            />

            <div className="fixed inset-x-0 bottom-0 sm:inset-x-auto sm:right-6 sm:bottom-6 z-50 flex justify-center sm:block pointer-events-none">
              <motion.div
                data-lenis-prevent="true"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 32 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto relative flex h-[88dvh] sm:h-[590px] w-full sm:w-[420px] max-w-[420px] max-h-[calc(100dvh-1rem)] sm:max-h-[calc(100vh-5rem)] flex-col rounded-t-[2rem] sm:rounded-[2.2rem] border-t border-x sm:border border-slate-200/90 bg-white/95 p-3.5 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] dark:border-white/20 dark:bg-[#090d16] dark:shadow-[0_20px_60px_rgba(0,0,0,0.9)] ring-1 ring-slate-200/40 dark:ring-white/10 transform-gpu will-change-[transform,opacity] pb-[max(env(safe-area-inset-bottom),1rem)]"
              >
                {/* Mobile Drag Handle Bar */}
                <div
                  onClick={() => setIsOpen(false)}
                  className="mx-auto mb-2 h-1.5 w-12 rounded-full bg-slate-300 dark:bg-white/25 sm:hidden cursor-pointer active:bg-slate-400"
                  title="Close chat"
                />

                {/* Header Bar */}
                <div className="mb-3 flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-indigo-400/40">
                      <Image
                        src="https://portfolio-image-moiz.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-09-25+at+5.49.35+PM.jpeg"
                        alt="Muhammad Abdul Moiz"
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{t.chat.headerTitle}</p>
                        <span className="rounded-full bg-indigo-50 px-1.5 py-0.5 text-[9px] font-semibold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
                          AI
                        </span>
                      </div>
                      <span className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                        {t.chat.headerStatus}
                      </span>
                    </div>
                  </div>

                  {/* Header Controls (Reset & Close/Minimize) */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleResetChat}
                      title={t.chat.clearChatAria}
                      aria-label={t.chat.clearChatAria}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                      <FiRefreshCw size={13} />
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      title={t.chat.minimizeAria}
                      aria-label={t.chat.minimizeAria}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                      <FiMinus size={16} />
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      title={t.chat.closeAria}
                      aria-label={t.chat.closeAria}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                </div>

                {/* Messages Scroll Area */}
                <div
                  ref={scrollRef}
                  data-lenis-prevent="true"
                  className="flex-1 space-y-3 overflow-y-auto overscroll-contain rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 scrollbar-thin dark:border-white/10 dark:bg-black/50 touch-pan-y"
                >
                  {messages.map((message, index) => {
                    const isAssistant = message.role === 'assistant';

                    return (
                      <div
                        key={`${message.role}-${index}`}
                        className={`flex flex-col gap-1.5 ${
                          isAssistant ? 'items-start' : 'items-end'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 px-1 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                          {isAssistant && (
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,1)] animate-pulse" />
                          )}
                          <span className={isAssistant ? 'font-semibold text-slate-700 dark:text-slate-300' : 'text-slate-500 dark:text-slate-400'}>
                            {isAssistant ? 'Moiz AI Twin' : 'You'}
                          </span>
                          {message.timestamp && <span>&bull; {message.timestamp}</span>}
                        </div>

                        <div
                          className={`group relative max-w-[92%] rounded-2xl text-xs leading-relaxed transition-all ${
                            isAssistant
                              ? 'rounded-tl-sm border border-slate-200 bg-white p-3.5 text-slate-800 shadow-sm dark:border-white/15 dark:bg-slate-900 dark:bg-gradient-to-b dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-950/95 dark:text-slate-100 dark:shadow-[0_6px_25px_rgba(0,0,0,0.5)] backdrop-blur-xl'
                              : 'rounded-tr-sm bg-gradient-to-r from-indigo-600 to-violet-600 p-3 text-white shadow-md'
                          }`}
                        >
                          {isAssistant ? (
                            <FormattedText content={message.content} onPromptClick={sendMessage} />
                          ) : (
                            <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                          )}

                          {isAssistant && (
                            <button
                              onClick={() => handleCopy(message.content, index)}
                              className="absolute right-2.5 top-2.5 rounded-lg border border-slate-200 bg-slate-100 p-1.5 text-slate-500 opacity-0 transition-all group-hover:opacity-100 hover:border-indigo-400 hover:bg-slate-200 hover:text-slate-900 dark:border-white/10 dark:bg-slate-800/90 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white shadow-sm"
                              title="Copy message"
                            >
                              {copiedIndex === index ? (
                                <FiCheck size={12} className="text-emerald-500 dark:text-emerald-400" />
                              ) : (
                                <FiCopy size={12} />
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {isLoading && (
                    <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 dark:border-white/10 dark:bg-slate-900/90 dark:text-slate-300">
                      <div className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-bounce" />
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        {lang === 'fr' ? 'Rédaction en cours...' : 'Formulating response...'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Recruiter Quick Questions Bar */}
                <div className="mt-2.5 border-t border-slate-200/80 dark:border-white/[0.08] pt-2">
                  <div className="mb-1.5 flex items-center justify-between px-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-300">
                      {t.chat.suggestedTopicsTitle}
                    </span>
                    <span className="text-[9px] text-slate-400">{lang === 'fr' ? 'Cliquer pour poser' : 'Click to ask'}</span>
                  </div>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {t.chat.suggestedTopics.map((topic, idx) => {
                      const Icon = TOPIC_ICONS[idx % TOPIC_ICONS.length];
                      return (
                        <button
                          key={topic.label}
                          type="button"
                          onClick={() => sendMessage(topic.query)}
                          disabled={isLoading}
                          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-medium text-slate-700 transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-indigo-400/50 dark:hover:bg-indigo-500/15 dark:hover:text-white"
                        >
                          <Icon className="text-indigo-500 dark:text-indigo-400" />
                          <span>{topic.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Chat Input Form */}
                <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isLoading ? (lang === 'fr' ? "Réflexion en cours..." : "Moiz AI is thinking...") : t.chat.inputPlaceholder}
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none transition dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400/60 dark:focus:bg-white/[0.08]"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    aria-label={t.chat.sendButtonAria}
                    className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiSend size={13} />
                  </button>
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
