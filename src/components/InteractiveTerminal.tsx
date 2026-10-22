import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiTerminal, FiActivity, FiCornerDownLeft } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { profile } from '../data/portfolio';

type HistoryItem = {
  command: string;
  output: React.ReactNode;
  time: string;
};

export default function InteractiveTerminal() {
  const [activeTab, setActiveTab] = useState<'telemetry' | 'shell'>('telemetry');
  const [activeLine, setActiveLine] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const logs = t.telemetry.logs;

  // Auto-cycle telemetry lines in telemetry mode
  useEffect(() => {
    if (activeTab !== 'telemetry') return;
    const timer = setInterval(() => {
      setActiveLine((prev) => (prev + 1) % logs.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [logs.length, activeTab]);

  // Initial welcome message in shell mode
  useEffect(() => {
    if (history.length === 0) {
      const now = new Date().toLocaleTimeString('en-GB', { hour12: false });
      setHistory([
        {
          command: 'init',
          time: now,
          output: (
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p className="font-bold text-indigo-600 dark:text-indigo-400">
                MoizOS v2.4 (x86_64-apple-darwin) • Interactive Bash Console
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Type <span className="font-semibold text-indigo-500">help</span> or tap any quick-action chip below.
              </p>
            </div>
          ),
        },
      ]);
    }
  }, [history.length]);

  // Auto-scroll shell to bottom on new output
  useEffect(() => {
    if (activeTab === 'shell') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, activeTab]);

  const executeCommand = (cmdText: string) => {
    const raw = cmdText.trim();
    if (!raw) return;

    const cmd = raw.toLowerCase();
    const now = new Date().toLocaleTimeString('en-GB', { hour12: false });
    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-[11px]">
            <p className="text-slate-500 dark:text-slate-400">Available commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1">
              <div><span className="font-bold text-indigo-500">skills</span> — view backend, AI & DevOps stack</div>
              <div><span className="font-bold text-indigo-500">projects</span> — view featured production apps</div>
              <div><span className="font-bold text-indigo-500">contact</span> — view direct contact channels</div>
              <div><span className="font-bold text-indigo-500">hire</span> — status, alternance & CDI readiness</div>
              <div><span className="font-bold text-indigo-500">whoami</span> — bio, background & location</div>
              <div><span className="font-bold text-indigo-500">status</span> — check live system telemetry</div>
              <div><span className="font-bold text-indigo-500">clear</span> — clear the terminal screen</div>
            </div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-1.5 text-[11px]">
            <p className="font-bold text-slate-900 dark:text-white">Muhammad Abdul Moiz Technical Stack:</p>
            <p><span className="text-indigo-500 font-semibold">• Backend:</span> Python (FastAPI, Django REST), Elixir (Phoenix), Node.js, PostgreSQL, Redis, Celery</p>
            <p><span className="text-indigo-500 font-semibold">• DevOps & Cloud:</span> Docker, Docker Compose, GitLab CI, GitHub Actions, AWS, GCP, SonarQube, DORA metrics</p>
            <p><span className="text-indigo-500 font-semibold">• AI & Agents:</span> LangGraph, LangChain, OpenAI / Claude APIs, RAG, PyTorch, Dialogflow</p>
            <p><span className="text-indigo-500 font-semibold">• Frontend:</span> React 18, Next.js, React Native, TypeScript, TailwindCSS</p>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-1.5 text-[11px]">
            <p className="font-bold text-slate-900 dark:text-white">Featured Production Projects:</p>
            <p>1. <a href="#projects" className="underline text-indigo-500 font-bold">DoctorIQ</a> — Asynchronous clinical document extraction & AI OCR (70% latency cut)</p>
            <p>2. <a href="#projects" className="underline text-indigo-500 font-bold">Brackets Genie</a> — Streaming multi-agent LangGraph platform over WebSockets (&lt;50ms latency)</p>
            <p>3. <a href="#projects" className="underline text-indigo-500 font-bold">VIF</a> — Food solidarity cross-platform web (FastAPI) & mobile (React Native) app</p>
            <p>4. <a href="#projects" className="underline text-indigo-500 font-bold">Trinity Suite</a> — Enterprise Software Factory with automated SonarQube gates</p>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-[11px]">
            <p className="font-bold text-slate-900 dark:text-white">Direct Contact Channels:</p>
            <p>Email: <a href={`mailto:${profile.email}`} className="underline text-indigo-500">{profile.email}</a></p>
            <p>Phone: <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="underline text-indigo-500">{profile.phone}</a></p>
            <p>LinkedIn: <a href={profile.linkedin} target="_blank" rel="noreferrer" className="underline text-indigo-500">{profile.linkedin}</a></p>
            <p>GitHub: <a href={profile.github} target="_blank" rel="noreferrer" className="underline text-indigo-500">{profile.github}</a></p>
          </div>
        );
        break;

      case 'hire':
        output = (
          <div className="space-y-1.5 text-[11px]">
            <p className="font-bold text-emerald-600 dark:text-emerald-400">Available for Opportunities:</p>
            <p>• <span className="font-semibold">Current:</span> Alternance at EPITECH Paris (Sept 2026 – Sept 2027, Pedagogical Assistant)</p>
            <p>• <span className="font-semibold">Next:</span> Open for future CDI / CDD contracts in Paris, hybrid, or remote with full French work rights.</p>
            <p>• <span className="font-semibold">Core Value:</span> Production-tested engineering bridging AI microservices and automated DevOps CI/CD delivery.</p>
          </div>
        );
        break;

      case 'whoami':
        output = (
          <div className="space-y-1 text-[11px]">
            <p className="font-bold text-slate-900 dark:text-white">{profile.name}</p>
            <p className="text-slate-600 dark:text-slate-300">
              Web, DevOps & AI Engineer. Born October 16, 2002 (23 years old). Born and raised in Pakistan, now living and working in Paris, France.
            </p>
            <p className="text-slate-500">MSc IT @ EPITECH Paris (2025–2027) • BSCS @ FAST-NUCES (2020–2024).</p>
          </div>
        );
        break;

      case 'status':
        output = (
          <div className="space-y-1 text-[11px]">
            <p className="font-bold text-slate-900 dark:text-white">Service Health Matrix:</p>
            <p className="text-emerald-500">✓ FastAPI Core Gateway: 200 OK (latency: 12ms)</p>
            <p className="text-emerald-500">✓ Celery Async Workers: Active (concurrency: 8)</p>
            <p className="text-emerald-500">✓ Redis Cache & Broker: Connected (PONG)</p>
            <p className="text-emerald-500">✓ Docker Multi-stage Containers: Healthy</p>
            <p className="text-indigo-400">ℹ Live Paris Time: {new Date().toLocaleTimeString('fr-FR', { timeZone: 'Europe/Paris' })} CET</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'date':
        output = (
          <p className="text-[11px] text-slate-600 dark:text-slate-300">
            {new Date().toLocaleString('en-GB', { timeZone: 'Europe/Paris' })} (Europe/Paris)
          </p>
        );
        break;

      default:
        output = (
          <p className="text-[11px] text-rose-500 dark:text-rose-400">
            command not found: {raw}. Type <span className="underline cursor-pointer font-bold" onClick={() => executeCommand('help')}>help</span> for available commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: raw, output, time: now }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  const quickChips = ['help', 'skills', 'projects', 'contact', 'hire', 'clear'];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 font-mono text-xs shadow-lg shadow-slate-200/50 backdrop-blur-md transition-colors duration-200 dark:border-white/15 dark:bg-black/90 dark:shadow-2xl">
      {/* Top Console Bar with Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 bg-slate-100/90 px-4 py-3 dark:border-white/10 dark:bg-white/[0.04]">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-[10px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            system_telemetry.sh — bash
          </span>
        </div>

        {/* Interactive Mode Toggle */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-200/70 p-0.5 dark:bg-white/10">
          <button
            type="button"
            onClick={() => setActiveTab('telemetry')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-semibold transition ${
              activeTab === 'telemetry'
                ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <FiActivity className="text-[11px]" />
            <span>Live Telemetry</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('shell');
              setTimeout(() => inputRef.current?.focus(), 50);
            }}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-semibold transition ${
              activeTab === 'shell'
                ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <FiTerminal className="text-[11px]" />
            <span>Interactive Shell</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Live Telemetry View */}
      {activeTab === 'telemetry' && (
        <div className="p-5 text-slate-700 dark:text-slate-300">
          <div className="space-y-2.5">
            {logs.map((log, index) => {
              const isCurrent = index === activeLine;
              return (
                <motion.div
                  key={log.label}
                  animate={{ opacity: isCurrent ? 1 : 0.65 }}
                  onClick={() => {
                    setActiveTab('shell');
                    executeCommand(log.label.toLowerCase().includes('ai') ? 'skills' : 'status');
                  }}
                  className={`flex cursor-pointer items-start justify-between gap-3 rounded-xl border px-3 py-2 transition-all hover:bg-slate-100/60 dark:hover:bg-white/5 ${
                    isCurrent
                      ? 'border-indigo-200/80 bg-indigo-50/90 text-slate-900 shadow-sm dark:border-indigo-500/30 dark:bg-indigo-500/15 dark:text-white'
                      : 'border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px]">{log.time}</span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">[{log.label}]</span>
                    <span className="text-slate-800 dark:text-slate-200">{log.text}</span>
                  </div>
                  <span className="shrink-0 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:border-transparent dark:bg-white/10 dark:text-emerald-300">
                    {log.status}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Quick prompt invitation */}
          <div className="mt-4 flex items-center justify-between border-t border-slate-200/70 pt-3 text-[11px] text-slate-500 dark:border-white/10 dark:text-slate-400">
            <span>Tip: Click any row or switch to the interactive shell to run real commands.</span>
            <button
              type="button"
              onClick={() => {
                setActiveTab('shell');
                setTimeout(() => inputRef.current?.focus(), 50);
              }}
              className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Open Shell &gt;
            </button>
          </div>
        </div>
      )}

      {/* Mode 2: Interactive Runnable Shell */}
      {activeTab === 'shell' && (
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex flex-col p-4 sm:p-5 text-slate-800 dark:text-slate-200 min-h-[260px] max-h-[360px] overflow-y-auto cursor-text"
        >
          {/* History */}
          <div className="space-y-3 flex-1">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                {item.command !== 'init' && (
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-semibold text-[11px]">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">moiz@paris</span>
                    <span className="text-slate-400">:</span>
                    <span className="text-indigo-500">~</span>
                    <span className="text-slate-400">$</span>
                    <span className="text-slate-900 dark:text-white font-mono">{item.command}</span>
                    <span className="ml-auto text-[10px] text-slate-400">{item.time}</span>
                  </div>
                )}
                <div className="pl-0 sm:pl-3">{item.output}</div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Active Command Input Line */}
          <div className="mt-4 flex items-center gap-2 border-t border-slate-200/70 pt-3 text-[11px] dark:border-white/10">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">moiz@paris</span>
            <span className="text-slate-400">:</span>
            <span className="text-indigo-500 font-bold">~</span>
            <span className="text-slate-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'help', 'skills', 'projects', 'contact'..."
              className="flex-1 bg-transparent font-mono text-[11px] text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white dark:placeholder:text-slate-500"
              autoFocus
            />
            <button
              type="button"
              onClick={() => executeCommand(inputVal)}
              disabled={!inputVal.trim()}
              className="rounded-lg bg-indigo-600 px-2 py-1 text-[10px] font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-40"
            >
              <FiCornerDownLeft />
            </button>
          </div>

          {/* Quick Action Chips */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mr-1">Quick:</span>
            {quickChips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  executeCommand(chip);
                }}
                className="rounded-lg border border-slate-200 bg-slate-100/90 px-2 py-0.5 text-[10px] font-medium text-slate-700 transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-indigo-400/50 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300"
              >
                &gt; {chip}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
