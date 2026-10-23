import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FiTerminal,
  FiActivity,
  FiCornerDownLeft,
  FiGithub,
  FiLinkedin,
  FiExternalLink,
  FiSun,
  FiMoon,
} from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { profile } from '../data/portfolio';

type HistoryItem = {
  command: string;
  output: React.ReactNode;
  time: string;
  dir?: string;
};

const FORTUNES = [
  'A good programmer looks both ways before crossing a one-way street.',
  'There are two hard things in Computer Science: cache invalidation and naming things.',
  'Simplicity is prerequisite for reliability. — Edsger W. Dijkstra',
  'Walking on water and developing software from a specification are easy if both are frozen. — Edward V. Berard',
  'First, solve the problem. Then, write the code. — John Johnson',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand. — Martin Fowler',
];

const JOKES = [
  'Why do programmers prefer dark mode? Because light attracts bugs!',
  'There are 10 types of people in the world: those who understand binary, and those who do not.',
  'A SQL query walks into a bar, walks up to two tables and asks: "Can I join you?"',
  'Why was the JavaScript developer sad? Because he did not Node how to Express himself!',
  'A programmer\'s wife asks: "Could you go to the store and get a carton of milk? And if they have eggs, get 12." The programmer returns with 12 cartons of milk.',
  'How many developers does it take to change a lightbulb? None, that is a hardware issue.',
  'There are two hard problems in computer science: cache invalidation, naming things, and off-by-one errors.',
  'A QA engineer walks into a bar. Orders a beer. Orders 0 beers. Orders 999999999 beers. Orders a lizard. Orders -1 beers. First real customer asks where the restroom is. The bar bursts into flames.',
  'Why do Java developers wear glasses? Because they don\'t C#.',
  'Why did the developer go broke? Because he used up all his cache.',
  'An optimist says the glass is half full. A pessimist says the glass is half empty. An engineer says the glass is twice as large as necessary.',
  'To understand recursion, you must first understand recursion.',
  'There is no place like 127.0.0.1.',
  'Why was the Docker container lonely? Because it had no peers.',
  'How do you comfort a JavaScript bug? You console it.',
  'Git commit: "fixed bug". Commit 2 minutes later: "really fixed bug". Commit 5 minutes later: "reverted everything".',
  'Real programmers count from 0.',
  'Why did the database administrator leave his wife? She had one-to-many relationships.',
  'Linux user: "My system has an uptime of 432 days." Also Linux user: "Please don\'t touch the audio device, it will crash everything."',
  'Hardware is the part of a computer that you can kick; software is the part you can only curse at.',
  'A Kubernetes cluster walks into a clinic. Doctor: "Where does it hurt?" Cluster: "Every pod has a different symptom."',
  'Two bytes meet in memory. One says: "Are you feeling okay?" The other responds: "No, I feel a bit off."',
];

const QUOTES = [
  'Make it work, make it right, make it fast. — Kent Beck',
  'Measuring programming progress by lines of code is like measuring aircraft building progress by weight. — Bill Gates',
  'Premature optimization is the root of all evil. — Donald Knuth',
  'The most important property of a program is whether it accomplishes the intention of its user. — C.A.R. Hoare',
];

const INITIAL_VIRTUAL_FILES: Record<string, string> = {
  'README.md': `# Muhammad Abdul Moiz — Engineering Portfolio
Welcome to my terminal environment. I am a Web, DevOps, and AI Engineer based in Paris.
• Master of Science in IT @ EPITECH Paris (2025–2027)
• Bachelor of Science in CS @ FAST-NUCES (2020–2024)
• Pedagogical Assistant (Alternance) @ EPITECH Paris (Sept 2026 – Sept 2027)
Run 'projects' or 'tree' to explore my production engineering work.`,

  'skills.txt': `[CORE_TECHNICAL_MATRIX]
Backend: FastAPI, Django REST, Elixir/Phoenix, Node.js, Celery, PostgreSQL, Redis
DevOps: Docker, Docker Compose, GitLab CI, GitHub Actions, AWS (EC2/S3/Lambda), SonarQube
AI/ML: LangGraph, LangChain, Multi-Agent Systems, Anthropic/OpenAI APIs, PyTorch, OCR
Frontend: React 18, Next.js, React Native, TypeScript, TailwindCSS`,

  'notes.txt': `Welcome to MoizOS editor!
Feel free to write notes, edit code, or test bash commands.
Save your changes with :wq (Vim), ^X (Nano), or C-x C-c (Emacs).`,

  'contact.json': `{
  "name": "Muhammad Abdul Moiz",
  "email": "amoiz0468@gmail.com",
  "phone": "+33 7 45 53 43 01",
  "location": "Paris, France",
  "github": "https://github.com/amoiz0468",
  "linkedin": "https://www.linkedin.com/in/muhammad-abdul-moiz/",
  "status": "Open for CDI / Hybrid / Remote in Paris"
}`,

  'experience.log': `[2026-2027] Pedagogical Assistant (Alternance) @ EPITECH Paris
  Mentored students across systems, Docker, modern backend architecture & algorithms.
[2024-2025] Associate Software Engineer @ Brackets Pvt Ltd
  High-throughput APIs (FastAPI/Django), CI/CD pipelines, and LangGraph OCR agents.
[2020-2024] BS Computer Science @ FAST-NUCES
  Core CS foundation, distributed systems, machine learning & databases.`,

  'package.json': `{
  "name": "moiz-engineering-portfolio",
  "version": "2.4.0",
  "author": "Muhammad Abdul Moiz <amoiz0468@gmail.com>",
  "license": "MIT",
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "framer-motion": "^11.2.0",
    "tailwindcss": "^3.4.0",
    "lenis": "^1.1.0",
    "typescript": "^5.4.0"
  }
}`,

  'Dockerfile': `# Production Multi-Stage Container
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
ENV NODE_ENV=production PORT=3000
EXPOSE 3000
CMD ["npm", "start"]`,

  'Makefile': `# Moiz Engineering Build Automation
dev:
\tnpm run dev
test:
\tnpm test
build:
\tnpm run build
deploy:
\tgit push origin main && vercel --prod`,

  '.env': `NODE_ENV=production
LOCATION=Paris_France
PREFERRED_ROLE=FullStack_DevOps_AI_Engineer
SECRET_KEY=hire_moiz_immediately_2026`,

  'id_rsa.pub': `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIHmoizGhauriParisDevOpsKey2026 moiz@paris`,

  '.bashrc': `# Shell configuration & aliases
alias ll='ls -la'
alias gs='git status'
alias dc='docker compose'
alias k='kubectl'
export PATH="$HOME/.local/bin:$PATH"`
};

function RealPingOutput({ targetHost }: { targetHost: string }) {
  const [pings, setPings] = useState<{ seq: number; time: number; ip: string; ttl: number }[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const isLocal = targetHost === '127.0.0.1' || targetHost === 'localhost' || targetHost === '::1';
    const targetIp = isLocal
      ? '127.0.0.1'
      : targetHost.includes('google')
      ? '142.250.74.206'
      : targetHost === 'moiz.paris'
      ? '76.76.21.21'
      : '104.21.48.91';
    const ttl = isLocal ? 64 : 56;

    const runPings = async () => {
      const results: { seq: number; time: number; ip: string; ttl: number }[] = [];
      for (let i = 0; i < 4; i++) {
        if (cancelled) return;
        const start = performance.now();
        try {
          await fetch(`/favicon.ico?probe=${Date.now()}_${i}`, { method: 'HEAD', cache: 'no-store' });
        } catch {
          // Fallback if offline
        }
        const elapsed = +(performance.now() - start).toFixed(2);
        const realTime = isLocal
          ? +(Math.random() * 0.02 + 0.025).toFixed(3)
          : elapsed > 0.8
          ? elapsed
          : +(Math.random() * 4.2 + 11.5).toFixed(2);
        results.push({ seq: i, time: realTime, ip: targetIp, ttl });
        if (!cancelled) setPings([...results]);
        await new Promise((r) => setTimeout(r, 260));
      }
      if (!cancelled) setDone(true);
    };

    runPings();
    return () => {
      cancelled = true;
    };
  }, [targetHost]);

  const times = pings.map((p) => p.time);
  const min = times.length ? Math.min(...times).toFixed(2) : '0.00';
  const max = times.length ? Math.max(...times).toFixed(2) : '0.00';
  const avg = times.length ? (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2) : '0.00';

  return (
    <div className="space-y-1 font-mono text-[11px]">
      <p className="font-semibold text-slate-500 dark:text-slate-400">
        PING {targetHost} ({targetHost === '127.0.0.1' ? '127.0.0.1' : '76.76.21.21'}): 56 data bytes (live network probe)
      </p>
      {pings.map((p) => (
        <p key={p.seq} className="text-emerald-500">
          64 bytes from {p.ip}: icmp_seq={p.seq} ttl={p.ttl} time={p.time} ms <span className="font-bold">[PONG!]</span>
        </p>
      ))}
      {!done && <p className="text-indigo-400 animate-pulse text-[10px]">probing packet {pings.length}...</p>}
      {done && (
        <div className="pt-0.5 text-slate-400 text-[10px]">
          <p>--- {targetHost} ping statistics ---</p>
          <p>4 packets transmitted, {pings.length} packets received, 0.0% packet loss</p>
          <p>round-trip min/avg/max = {min}/{avg}/{max} ms</p>
        </div>
      )}
    </div>
  );
}

export default function InteractiveTerminal() {
  const [activeTab, setActiveTab] = useState<'telemetry' | 'shell'>('telemetry');
  const [activeLine, setActiveLine] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentDir, setCurrentDir] = useState('~');
  const [commandHistoryList, setCommandHistoryList] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const shellContainerRef = useRef<HTMLDivElement>(null);
  const { lang, setLang, toggleLang, t } = useLanguage();
  const { theme, setTheme, toggleTheme } = useTheme();
  const logs = t.telemetry.logs;

  // In-memory virtual filesystem (restarts on page reload)
  const [virtualFiles, setVirtualFiles] = useState<Record<string, string>>(INITIAL_VIRTUAL_FILES);

  const [activeEditor, setActiveEditor] = useState<'vim' | 'nano' | 'emacs' | null>(null);
  const [editorFile, setEditorFile] = useState<string>('');
  const [editorBuffer, setEditorBuffer] = useState<string>('');
  const [vimMode, setVimMode] = useState<'NORMAL' | 'INSERT'>('NORMAL');
  const [editorStatusMsg, setEditorStatusMsg] = useState<string>('');
  const editorTextareaRef = useRef<HTMLTextAreaElement>(null);

  const closeEditor = (save: boolean) => {
    const now = new Date().toLocaleTimeString('en-GB', { hour12: false });
    const lines = editorBuffer.split('\n').length;
    const bytes = editorBuffer.length;

    const targetFile = editorFile.trim() || 'untitled.txt';
    if (save && targetFile) {
      setVirtualFiles((prev) => ({ ...prev, [targetFile]: editorBuffer }));
    }

    const editorName = activeEditor === 'vim' ? 'vim' : activeEditor === 'nano' ? 'nano' : 'emacs';
    const exitMsg = save
      ? `[${editorName}] "${targetFile}" ${lines}L, ${bytes}B written to virtual filesystem.`
      : `[${editorName}] Buffer closed. Changes discarded.`;

    setHistory((prev) => [
      ...prev,
      {
        command: `${editorName} ${targetFile}`,
        output: <p className="text-[11px] font-mono text-emerald-400">{exitMsg}</p>,
        time: now,
        dir: currentDir,
      },
    ]);

    setActiveEditor(null);
    setEditorFile('');
    setEditorBuffer('');
    setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 60);
  };

  // Focus editor textarea when vim/nano/emacs is launched
  useEffect(() => {
    if (activeEditor) {
      setTimeout(() => editorTextareaRef.current?.focus({ preventScroll: true }), 50);
    }
  }, [activeEditor]);

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
                Type <span className="font-semibold text-indigo-500">help</span>, explore <span className="font-semibold text-emerald-500">skills</span>, <span className="font-semibold text-emerald-500">projects</span>, or tap any quick chip below.
              </p>
            </div>
          ),
        },
      ]);
    }
  }, [history.length]);

  // Auto-scroll ONLY internal shell container to bottom on new output (prevents page jumping)
  useEffect(() => {
    if (activeTab === 'shell' && shellContainerRef.current) {
      shellContainerRef.current.scrollTop = shellContainerRef.current.scrollHeight;
    }
  }, [history.length, activeTab]);

  const executeCommand = (cmdText: string) => {
    const raw = cmdText.trim();
    if (!raw) return;

    setCommandHistoryList((prev) => [...prev, raw]);
    setHistoryIndex(null);
    const now = new Date().toLocaleTimeString('en-GB', { hour12: false });

    const parts = raw.split(/\s+/);
    const base = parts[0].toLowerCase();
    const arg1 = parts[1] ? parts[1].toLowerCase() : '';
    const arg2 = parts[2] ? parts[2].toLowerCase() : '';
    const fullArg = parts.slice(1).join(' ');

    let output: React.ReactNode = null;

    switch (base) {
      case 'help':
        output = (
          <div className="space-y-1.5 text-[11px]">
            <p className="font-semibold text-slate-500 dark:text-slate-400">Available commands &amp; tools:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1 font-mono">
              <div><span className="font-bold text-indigo-500">ls [-la]</span> — list files &amp; directories</div>
              <div><span className="font-bold text-indigo-500">cat &lt;file&gt;</span> — view file contents</div>
              <div><span className="font-bold text-indigo-500">tree</span> — visualize portfolio directory tree</div>
              <div><span className="font-bold text-indigo-500">cd &lt;dir&gt;</span> — change virtual directory</div>
              <div><span className="font-bold text-indigo-500">nano / vim / emacs</span> — interactive text editors</div>
              <div><span className="font-bold text-indigo-500">cp &lt;src&gt; &lt;dst&gt;</span> — copy file in virtual FS</div>
              <div><span className="font-bold text-indigo-500">mv &lt;src&gt; &lt;dst&gt;</span> — rename / move virtual file</div>
              <div><span className="font-bold text-indigo-500">rm &lt;file&gt;</span> — remove file from virtual FS</div>
              <div><span className="font-bold text-indigo-500">touch &lt;file&gt;</span> — create or update virtual file</div>
              <div><span className="font-bold text-indigo-500">grep / wc</span> — search text &amp; count lines/words</div>
              <div><span className="font-bold text-indigo-500">ping &lt;host&gt;</span> — real network round-trip probe</div>
              <div><span className="font-bold text-indigo-500">bc &lt;expr&gt;</span> — calculate math expression</div>
              <div><span className="font-bold text-indigo-500">cal / df / du</span> — terminal calendar &amp; disk usage</div>
              <div><span className="font-bold text-indigo-500">whoami / neofetch</span> — bio, specs &amp; background</div>
              <div><span className="font-bold text-indigo-500">skills / projects</span> — stack, apps &amp; systems</div>
              <div><span className="font-bold text-indigo-500">github / linkedin</span> — direct external links</div>
              <div><span className="font-bold text-indigo-500">day / dark</span> — toggle day / night mode</div>
              <div><span className="font-bold text-indigo-500">docker ps / git status</span> — DevOps status</div>
              <div><span className="font-bold text-indigo-500">top / htop</span> — live process &amp; CPU stats</div>
              <div><span className="font-bold text-indigo-500">curl &lt;url&gt;</span> — simulated HTTP request</div>
              <div><span className="font-bold text-indigo-500">status / hire</span> — live health &amp; contract availability</div>
              <div><span className="font-bold text-indigo-500">clear</span> — clear the console screen</div>
            </div>
            <p className="text-[10px] text-slate-400 pt-1.5 border-t border-slate-200/50 dark:border-white/5">
              Easter eggs &amp; utilities: <span className="text-slate-500 dark:text-slate-400">joke, fortune, quote, base64, ssh, env, weather, cowsay, sl, matrix, sudo, man moiz</span>
            </p>
          </div>
        );
        break;

      case 'ls': {
        const isLong = parts.some((p) => /^-.*l/.test(p));
        const isAll = parts.some((p) => /^-.*a/.test(p));

        if (currentDir === '~/projects' || arg1 === 'projects' || arg1 === 'projects/') {
          output = (
            <div className="space-y-1 text-[11px]">
              {isLong ? (
                <div className="font-mono text-slate-600 dark:text-slate-300 space-y-0.5">
                  <p className="text-slate-400">total 8</p>
                  <p>-rwxr-xr-x 1 moiz staff 4096 Oct 22 14:00 <span className="font-semibold text-emerald-500">doctor-iq</span></p>
                  <p>-rwxr-xr-x 1 moiz staff 4096 Oct 22 14:00 <span className="font-semibold text-emerald-500">brackets-genie</span></p>
                  <p>-rwxr-xr-x 1 moiz staff 4096 Oct 22 14:00 <span className="font-semibold text-emerald-500">vif-food-solidarity</span></p>
                  <p>-rwxr-xr-x 1 moiz staff 4096 Oct 22 14:00 <span className="font-semibold text-emerald-500">ledgeroo-fintech</span></p>
                  <p>-rwxr-xr-x 1 moiz staff 4096 Oct 22 14:00 <span className="font-semibold text-emerald-500">trinity-suite</span></p>
                  <p>-rwxr-xr-x 1 moiz staff 4096 Oct 22 14:00 <span className="font-semibold text-emerald-500">time-manager</span></p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono">
                  <span className="text-emerald-500 font-semibold cursor-pointer hover:underline" onClick={() => executeCommand('cat doctor-iq')}>doctor-iq</span>
                  <span className="text-emerald-500 font-semibold cursor-pointer hover:underline" onClick={() => executeCommand('cat brackets-genie')}>brackets-genie</span>
                  <span className="text-emerald-500 font-semibold cursor-pointer hover:underline" onClick={() => executeCommand('cat vif')}>vif-food-solidarity</span>
                  <span className="text-emerald-500 font-semibold cursor-pointer hover:underline" onClick={() => executeCommand('cat ledgeroo')}>ledgeroo-fintech</span>
                  <span className="text-emerald-500 font-semibold cursor-pointer hover:underline" onClick={() => executeCommand('cat trinity')}>trinity-suite</span>
                  <span className="text-emerald-500 font-semibold cursor-pointer hover:underline" onClick={() => executeCommand('cat time-manager')}>time-manager</span>
                </div>
              )}
            </div>
          );
        } else {
          const files = Object.keys(virtualFiles).filter((f) => {
            if (f.startsWith('.') && !isAll) return false;
            return true;
          });

          if (isLong) {
            output = (
              <div className="space-y-1 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                <p className="text-slate-400">total {files.length * 4}</p>
                {isAll && (
                  <>
                    <p>drwxr-xr-x 8 moiz staff 256 Oct 23 14:00 <span className="text-indigo-400 font-bold">.</span></p>
                    <p>drwxr-xr-x 5 root staff 160 Oct 23 14:00 <span className="text-indigo-400 font-bold">..</span></p>
                  </>
                )}
                {files.map((fname) => {
                  const content = virtualFiles[fname] || '';
                  const bytes = content.length;
                  const isHidden = fname.startsWith('.');
                  const isMd = fname.endsWith('.md');
                  return (
                    <p key={fname}>
                      -rw-r--r-- 1 moiz staff {bytes.toString().padStart(5, ' ')} Oct 23 14:00{' '}
                      <span
                        className={`cursor-pointer hover:underline ${
                          isHidden
                            ? 'text-slate-400'
                            : isMd
                            ? 'text-slate-900 dark:text-white font-semibold'
                            : 'text-slate-900 dark:text-white'
                        }`}
                        onClick={() => executeCommand(`cat ${fname}`)}
                      >
                        {fname}
                      </span>
                    </p>
                  );
                })}
                <p>drwxr-xr-x 6 moiz staff  192 Oct 23 14:00 <span className="text-indigo-500 font-bold cursor-pointer hover:underline" onClick={() => executeCommand('cd projects')}>projects/</span></p>
              </div>
            );
          } else {
            output = (
              <div className="space-y-1 text-[11px]">
                <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono">
                  {files.map((fname) => (
                    <span
                      key={fname}
                      className={`cursor-pointer hover:underline ${
                        fname.startsWith('.')
                          ? 'text-slate-400'
                          : fname === 'README.md'
                          ? 'text-slate-900 dark:text-white font-semibold'
                          : 'text-slate-900 dark:text-white'
                      }`}
                      onClick={() => executeCommand(`cat ${fname}`)}
                    >
                      {fname}
                    </span>
                  ))}
                  <span
                    className="text-indigo-500 font-bold cursor-pointer hover:underline"
                    onClick={() => executeCommand('cd projects')}
                  >
                    projects/
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 pt-0.5">Tip: use &apos;cat &lt;file&gt;&apos;, &apos;nano &lt;file&gt;&apos;, or &apos;cd projects&apos;</p>
              </div>
            );
          }
        }
        break;
      }

      case 'cat': {
        const target = arg1.replace(/^\.\//, '');
        if (!target) {
          output = (
            <p className="text-[11px] text-amber-500 font-mono">
              usage: cat &lt;filename&gt; (try &apos;cat README.md&apos;, &apos;cat skills.txt&apos;, &apos;cat package.json&apos;, or &apos;cat Dockerfile&apos;)
            </p>
          );
        } else if (['doctor-iq', 'brackets-genie', 'vif', 'ledgeroo', 'trinity', 'time-manager'].includes(target)) {
          output = (
            <div className="space-y-1 text-[11px] font-mono">
              <p className="font-bold text-slate-900 dark:text-white">Project: {target.toUpperCase()}</p>
              <p className="text-slate-600 dark:text-slate-300">Run &apos;projects&apos; command or click the project card to inspect the full architecture stack.</p>
            </div>
          );
        } else {
          const matchKey = Object.keys(virtualFiles).find(
            (k) => k.toLowerCase() === target.toLowerCase()
          );
          if (matchKey && virtualFiles[matchKey] !== undefined) {
            output = (
              <div className="rounded-lg bg-slate-100 p-2.5 font-mono text-[11px] text-slate-800 dark:bg-white/5 dark:text-slate-200 whitespace-pre-wrap select-text">
                {virtualFiles[matchKey] || <span className="text-slate-400 italic">[empty file]</span>}
              </div>
            );
          } else {
            output = (
              <p className="text-[11px] text-rose-500 dark:text-rose-400 font-mono">
                cat: {target}: No such file or directory. Try &apos;ls&apos; to view files.
              </p>
            );
          }
        }
        break;
      }

      case 'tree':
        output = (
          <div className="font-mono text-[11px] space-y-0.5 text-slate-700 dark:text-slate-300">
            <p className="font-bold text-indigo-500">.</p>
            <p>├── <span className="text-slate-900 dark:text-white">README.md</span></p>
            <p>├── <span className="text-slate-900 dark:text-white">skills.txt</span></p>
            <p>├── <span className="text-slate-900 dark:text-white">contact.json</span></p>
            <p>├── <span className="text-slate-900 dark:text-white">experience.log</span></p>
            <p>├── <span className="text-slate-900 dark:text-white">package.json</span></p>
            <p>├── <span className="text-slate-900 dark:text-white">Dockerfile</span></p>
            <p>├── <span className="text-slate-900 dark:text-white">Makefile</span></p>
            <p>├── <span className="text-amber-500">id_rsa.pub</span></p>
            <p>├── <span className="text-slate-500">.env</span></p>
            <p>└── <span className="text-indigo-400 font-bold">projects/</span></p>
            <p className="pl-4">├── <span className="text-emerald-500">doctor-iq/</span> (Medical OCR + LLM Pipeline)</p>
            <p className="pl-4">├── <span className="text-emerald-500">brackets-genie/</span> (LangGraph Streaming Agents)</p>
            <p className="pl-4">├── <span className="text-emerald-500">vif/</span> (Food Solidarity Full-Stack)</p>
            <p className="pl-4">├── <span className="text-emerald-500">ledgeroo/</span> (FinTech Backend + Stripe)</p>
            <p className="pl-4">├── <span className="text-emerald-500">trinity-suite/</span> (Software Factory + SonarQube)</p>
            <p className="pl-4">└── <span className="text-emerald-500">time-manager/</span> (Elixir Phoenix + Vue 3)</p>
            <p className="text-slate-400 pt-1 text-[10px]">2 directories, 14 files</p>
          </div>
        );
        break;

      case 'cd': {
        const dest = arg1.replace(/\/+$/, '');
        if (!dest || dest === '~' || dest === 'root' || dest === '/home/moiz') {
          setCurrentDir('~');
          output = <p className="text-[11px] text-slate-400">Switched directory to ~</p>;
        } else if (dest === 'projects' || dest === '~/projects') {
          setCurrentDir('~/projects');
          output = (
            <p className="text-[11px] text-slate-400">
              Switched directory to ~/projects. Type <span className="text-emerald-400 font-bold cursor-pointer" onClick={() => executeCommand('ls')}>ls</span> to view projects.
            </p>
          );
        } else if (dest === '..' || dest === '../') {
          if (currentDir === '~/projects') {
            setCurrentDir('~');
            output = <p className="text-[11px] text-slate-400">Switched directory to ~</p>;
          } else {
            output = <p className="text-[11px] text-slate-400">Already in root home directory (~)</p>;
          }
        } else if (dest === '/') {
          output = <p className="text-[11px] text-amber-500">Access restricted: / is managed by MoizOS kernel.</p>;
        } else {
          output = <p className="text-[11px] text-rose-500">cd: {dest}: No such file or directory</p>;
        }
        break;
      }

      case 'pwd':
        output = (
          <p className="text-[11px] font-mono text-slate-700 dark:text-slate-300">
            /home/moiz{currentDir === '~/projects' ? '/projects' : ''}
          </p>
        );
        break;

      case 'whoami':
        output = (
          <div className="space-y-1 text-[11px]">
            <p className="font-bold text-slate-900 dark:text-white">{profile.name}</p>
            <p className="text-slate-600 dark:text-slate-300">
              Web, DevOps &amp; AI Engineer. Born October 16, 2002 (23 years old). Born and raised in Pakistan, now living and working in Paris, France.
            </p>
            <p className="text-slate-500">MSc IT @ EPITECH Paris (2025–2027) • BSCS @ FAST-NUCES (2020–2024).</p>
          </div>
        );
        break;

      case 'id':
        output = (
          <p className="text-[11px] font-mono text-slate-700 dark:text-slate-300">
            uid=1000(moiz) gid=1000(moiz) groups=1000(moiz),4(adm),24(cdrom),27(sudo),100(users),999(docker)
          </p>
        );
        break;

      case 'hostname':
        output = (
          <p className="text-[11px] font-mono text-emerald-500">
            moiz-macbook-pro.paris.local
          </p>
        );
        break;

      case 'uname':
        output = (
          <p className="text-[11px] font-mono text-slate-700 dark:text-slate-300">
            Darwin moiz-macbook-m4.paris 24.3.0 Darwin Kernel Version 24.3.0 arm64 (Apple M4 Pro)
          </p>
        );
        break;

      case 'uptime':
        output = (
          <p className="text-[11px] font-mono text-slate-700 dark:text-slate-300">
            {new Date().toLocaleTimeString('fr-FR', { timeZone: 'Europe/Paris' })} up 23 years, 6 days, 1 user, load average: 0.08, 0.05, 0.02 (100% SLA)
          </p>
        );
        break;

      case 'date':
      case 'time':
        output = (
          <p className="text-[11px] font-mono text-slate-600 dark:text-slate-300">
            {new Date().toLocaleString('en-GB', { timeZone: 'Europe/Paris' })} (Europe/Paris CET)
          </p>
        );
        break;

      case 'echo':
        if (arg1 === '$user') {
          output = <p className="text-[11px] font-mono text-emerald-400">moiz</p>;
        } else if (arg1 === '$location') {
          output = <p className="text-[11px] font-mono text-emerald-400">Paris, France</p>;
        } else if (arg1 === '$status') {
          output = <p className="text-[11px] font-mono text-emerald-400">Ready for CDI / Hybrid / Remote</p>;
        } else if (arg1 === '$shell') {
          output = <p className="text-[11px] font-mono text-emerald-400">/bin/zsh</p>;
        } else if (arg1 === '$path') {
          output = <p className="text-[11px] font-mono text-slate-400">/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/home/moiz/.cargo/bin</p>;
        } else if (arg1 === '$lang') {
          output = <p className="text-[11px] font-mono text-emerald-400">{lang}</p>;
        } else {
          output = <p className="text-[11px] font-mono text-slate-700 dark:text-slate-300">{fullArg || ''}</p>;
        }
        break;

      case 'ps':
        output = (
          <div className="space-y-0.5 font-mono text-[11px] overflow-x-auto text-slate-700 dark:text-slate-300">
            <p className="font-bold text-slate-500 dark:text-slate-400">USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND</p>
            <p className="text-emerald-500">moiz         1  0.0  0.1  22588  3412 ?        Ss   09:00   0:01 /bin/init (MoizOS)</p>
            <p className="text-emerald-500">moiz       101  0.4  1.2 412900 38410 ?        S    09:01   0:42 uvicorn main:app --workers 4</p>
            <p className="text-emerald-500">moiz       102  0.2  0.8 198400 24190 ?        S    09:01   0:18 celery -A tasks worker -l info</p>
            <p className="text-emerald-500">moiz       103  0.1  0.4  54200 12040 ?        S    09:01   0:09 redis-server *:6379</p>
            <p className="text-emerald-500">moiz       104  0.0  0.2  89100  8120 pts/0    Ss   14:00   0:00 /bin/zsh</p>
          </div>
        );
        break;

      case 'top':
      case 'htop': {
        const cpuUs = (Math.random() * 2.2 + 1.2).toFixed(1);
        const cpuSy = (Math.random() * 0.5 + 0.3).toFixed(1);
        const cpuId = (100 - parseFloat(cpuUs) - parseFloat(cpuSy)).toFixed(1);
        const cpuFastAPI = (Math.random() * 1.5 + 1.6).toFixed(1);
        const cpuAgent = (Math.random() * 1.2 + 1.0).toFixed(1);
        const cpuRedis = (Math.random() * 0.4 + 0.3).toFixed(1);
        const cpuCelery = (Math.random() * 0.2 + 0.1).toFixed(1);
        output = (
          <div className="space-y-1 font-mono text-[11px]">
            <p className="text-slate-400">Tasks: 4 total, 0 running, 4 sleeping, 0 stopped | %Cpu: {cpuUs} us, {cpuSy} sy, {cpuId} id</p>
            <p className="font-bold text-slate-500 dark:text-slate-400">PID   USER  %CPU  %MEM     TIME+ COMMAND</p>
            <p className="text-emerald-500">1001  moiz   {cpuFastAPI}   0.8   1:24.02 uvicorn-fastapi</p>
            <p className="text-emerald-500">1002  moiz   {cpuAgent}   1.2   0:58.33 langgraph-orchestrator</p>
            <p className="text-emerald-500">1003  moiz   {cpuRedis}   0.4   4:12.18 redis-server</p>
            <p className="text-emerald-500">1004  moiz   {cpuCelery}   0.2   0:15.40 celery-worker</p>
          </div>
        );
        break;
      }

      case 'df':
        output = (
          <div className="space-y-0.5 font-mono text-[11px] overflow-x-auto text-slate-700 dark:text-slate-300">
            <p className="font-bold text-slate-500 dark:text-slate-400">Filesystem      Size  Used Avail Use% Mounted on</p>
            <p className="text-emerald-500">/dev/nvme0n1p2  994G  142G  802G  15% /</p>
            <p className="text-emerald-500">tmpfs            16G  1.2G   15G   8% /run</p>
            <p className="text-emerald-500">moiz-brain       10T  8.4T  1.6T  84% /mnt/knowledge</p>
          </div>
        );
        break;

      case 'free':
      case 'memory':
        output = (
          <div className="space-y-0.5 font-mono text-[11px] overflow-x-auto text-slate-700 dark:text-slate-300">
            <p className="font-bold text-slate-500 dark:text-slate-400">              total        used        free      shared  buff/cache   available</p>
            <p className="text-emerald-500">Mem:           32Gi       8.4Gi        18Gi       1.2Gi       5.6Gi        22Gi</p>
            <p className="text-emerald-500">Swap:         8.0Gi       256Mi       7.7Gi</p>
          </div>
        );
        break;

      case 'touch': {
        const newFile = arg1 || 'newfile.txt';
        setVirtualFiles((prev) => ({ ...prev, [newFile]: prev[newFile] ?? '' }));
        output = <p className="text-[11px] font-mono text-emerald-500">touch: created &apos;{newFile}&apos; in virtual filesystem</p>;
        break;
      }

      case 'mkdir':
        output = <p className="text-[11px] font-mono text-emerald-500">mkdir: created directory &apos;{arg1 || 'new-dir'}&apos;</p>;
        break;

      case 'rm': {
        if (fullArg.includes('-rf /') || fullArg.includes('-fr /') || fullArg === '-rf *') {
          output = <p className="text-[11px] font-mono text-rose-500">rm: cannot remove &apos;/&apos;: Permission denied. Nice try! MoizOS integrity protected.</p>;
        } else {
          const target = (arg1.startsWith('-') ? arg2 : arg1).replace(/^\.\//, '');
          if (!target) {
            output = <p className="text-[11px] font-mono text-amber-500">usage: rm [-rf] &lt;file&gt;</p>;
          } else if (virtualFiles[target] !== undefined) {
            setVirtualFiles((prev) => {
              const nextFiles = { ...prev };
              delete nextFiles[target];
              return nextFiles;
            });
            output = <p className="text-[11px] font-mono text-slate-400">rm: removed &apos;{target}&apos; from virtual filesystem</p>;
          } else {
            output = <p className="text-[11px] font-mono text-rose-500">rm: cannot remove &apos;{target}&apos;: No such file or directory</p>;
          }
        }
        break;
      }

      case 'cp': {
        const src = arg1.replace(/^\.\//, '');
        const dest = arg2.replace(/^\.\//, '');
        if (!src || !dest) {
          output = <p className="text-[11px] font-mono text-amber-500">usage: cp &lt;source&gt; &lt;destination&gt;</p>;
        } else if (virtualFiles[src] === undefined) {
          output = <p className="text-[11px] font-mono text-rose-500">cp: cannot stat &apos;{src}&apos;: No such file or directory</p>;
        } else {
          setVirtualFiles((prev) => ({ ...prev, [dest]: prev[src] }));
          output = <p className="text-[11px] font-mono text-emerald-500">cp: copied &apos;{src}&apos; -&gt; &apos;{dest}&apos; [OK]</p>;
        }
        break;
      }

      case 'mv': {
        const src = arg1.replace(/^\.\//, '');
        const dest = arg2.replace(/^\.\//, '');
        if (!src || !dest) {
          output = <p className="text-[11px] font-mono text-amber-500">usage: mv &lt;source&gt; &lt;destination&gt;</p>;
        } else if (virtualFiles[src] === undefined) {
          output = <p className="text-[11px] font-mono text-rose-500">mv: cannot stat &apos;{src}&apos;: No such file or directory</p>;
        } else {
          setVirtualFiles((prev) => {
            const next = { ...prev, [dest]: prev[src] };
            delete next[src];
            return next;
          });
          output = <p className="text-[11px] font-mono text-emerald-500">mv: renamed &apos;{src}&apos; -&gt; &apos;{dest}&apos; [OK]</p>;
        }
        break;
      }

      case 'chmod':
        output = <p className="text-[11px] font-mono text-emerald-500">chmod: mode of &apos;{arg2 || arg1 || 'file'}&apos; changed to {arg2 ? arg1 : '755'}</p>;
        break;

      case 'chown':
        output = <p className="text-[11px] font-mono text-emerald-500">chown: changed ownership of &apos;{arg2 || arg1 || 'file'}&apos; to moiz:staff</p>;
        break;

      case 'find':
        output = (
          <div className="space-y-0.5 font-mono text-[11px] text-slate-600 dark:text-slate-300">
            <p className="text-slate-400">find: query &apos;{arg1 || '.'}&apos; matches:</p>
            {Object.keys(virtualFiles).map((f) => (
              <p key={f}>/home/moiz/{f}</p>
            ))}
          </div>
        );
        break;

      case 'grep': {
        const pattern = arg1.toLowerCase();
        const targetFile = arg2.replace(/^\.\//, '');
        if (!pattern) {
          output = <p className="text-[11px] font-mono text-amber-500">usage: grep &lt;pattern&gt; [filename]</p>;
        } else if (targetFile && virtualFiles[targetFile] !== undefined) {
          const lines = virtualFiles[targetFile].split('\n');
          const matches = lines
            .map((lineText, idx) => ({ lineText, lineNum: idx + 1 }))
            .filter((item) => item.lineText.toLowerCase().includes(pattern));
          output = (
            <div className="space-y-0.5 font-mono text-[11px] text-slate-600 dark:text-slate-300">
              {matches.length > 0 ? (
                matches.map((m) => (
                  <p key={m.lineNum} className="text-emerald-500">
                    {targetFile}:{m.lineNum}: {m.lineText}
                  </p>
                ))
              ) : (
                <p className="text-slate-400">grep: pattern &apos;{arg1}&apos; not found in {targetFile}</p>
              )}
            </div>
          );
        } else {
          const hits: { file: string; lineNum: number; lineText: string }[] = [];
          Object.entries(virtualFiles).forEach(([f, content]) => {
            content.split('\n').forEach((lineText, idx) => {
              if (lineText.toLowerCase().includes(pattern)) {
                hits.push({ file: f, lineNum: idx + 1, lineText });
              }
            });
          });
          output = (
            <div className="space-y-0.5 font-mono text-[11px] text-slate-600 dark:text-slate-300">
              {hits.slice(0, 8).map((h, i) => (
                <p key={i} className="text-emerald-500">
                  {h.file}:{h.lineNum}: {h.lineText}
                </p>
              ))}
              {hits.length === 0 && <p className="text-slate-400">grep: pattern &apos;{arg1}&apos; not found</p>}
            </div>
          );
        }
        break;
      }

      case 'which':
      case 'whereis':
      case 'type':
        output = <p className="text-[11px] font-mono text-emerald-500">/usr/local/bin/{arg1 || 'moiz'}</p>;
        break;

      case 'head': {
        const target = (arg1.startsWith('-') ? arg2 : arg1 || 'README.md').replace(/^\.\//, '');
        if (virtualFiles[target] !== undefined) {
          const lines = virtualFiles[target].split('\n').slice(0, 6);
          output = (
            <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              {lines.map((l, i) => (
                <p key={i}>{l}</p>
              ))}
            </div>
          );
        } else {
          output = <p className="text-[11px] font-mono text-rose-500">head: cannot open &apos;{target}&apos;: No such file</p>;
        }
        break;
      }

      case 'tail': {
        const target = (arg1.startsWith('-') ? arg2 : arg1 || 'README.md').replace(/^\.\//, '');
        if (virtualFiles[target] !== undefined) {
          const lines = virtualFiles[target].split('\n').slice(-6);
          output = (
            <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              {lines.map((l, i) => (
                <p key={i}>{l}</p>
              ))}
            </div>
          );
        } else {
          output = <p className="text-[11px] font-mono text-rose-500">tail: cannot open &apos;{target}&apos;: No such file</p>;
        }
        break;
      }

      case 'wc': {
        const target = arg1.replace(/^\.\//, '') || 'skills.txt';
        if (virtualFiles[target] !== undefined) {
          const content = virtualFiles[target];
          const lines = content.split('\n').length;
          const words = content.trim().split(/\s+/).filter(Boolean).length;
          const bytes = content.length;
          output = <p className="text-[11px] font-mono text-slate-700 dark:text-slate-300">{lines} {words} {bytes} {target}</p>;
        } else {
          output = <p className="text-[11px] font-mono text-rose-500">wc: {target}: No such file or directory</p>;
        }
        break;
      }

      case 'diff':
        output = <p className="text-[11px] font-mono text-emerald-500">diff: working tree is cleanly synced with upstream origin/main</p>;
        break;

      case 'tar':
      case 'zip':
      case 'unzip':
        output = <p className="text-[11px] font-mono text-emerald-500">{base}: archive moiz-portfolio-bundle.tar.gz created [OK]</p>;
        break;

      case 'history':
        output = (
          <div className="space-y-0.5 font-mono text-[11px] text-slate-600 dark:text-slate-400">
            {commandHistoryList.slice(-15).map((cmdItem, i) => (
              <p key={i}>{i + 1}  {cmdItem}</p>
            ))}
          </div>
        );
        break;

      case 'ping': {
        const targetHost = arg1 || 'moiz.paris';
        output = <RealPingOutput targetHost={targetHost} />;
        break;
      }

      case 'pong': {
        const delay = (Math.random() * 0.02 + 0.012).toFixed(3);
        output = (
          <p className="text-[11px] text-emerald-400 font-mono font-bold">
            PING! (Round-trip delay: {delay} ms)
          </p>
        );
        break;
      }

      case 'curl':
        if (arg1.includes('wttr') || fullArg.includes('wttr')) {
          output = (
            <div className="font-mono text-[11px] text-slate-700 dark:text-slate-300 space-y-1">
              <p className="font-bold text-indigo-500">Weather report: Paris, France (wttr.in)</p>
              <pre className="text-amber-500 dark:text-amber-400 leading-tight select-none">{`     \\   /     Sunny / Mild
      .-.      +18°C (feels like 19°C)
   ― (   ) ―   Wind: 11 km/h WNW
      \`-’      Humidity: 52%
     /   \\     UV Index: 3 (Moderate)`}</pre>
              <p className="text-[10px] text-slate-400">wttr.in/Paris • HTTP/2 200 OK</p>
            </div>
          );
        } else if (arg1.includes('profile') || arg1.includes('api')) {
          output = (
            <div className="rounded-lg bg-slate-100 p-2 font-mono text-[11px] text-slate-800 dark:bg-white/5 dark:text-slate-200">
              <pre>{JSON.stringify({
                status: 'success',
                code: 200,
                candidate: profile.name,
                role: profile.title,
                location: profile.location,
                availability: 'Immediate / Alternance / CDI',
              }, null, 2)}</pre>
            </div>
          );
        } else {
          output = (
            <div className="space-y-1 font-mono text-[11px] text-slate-600 dark:text-slate-400">
              <p>HTTP/2 200 OK</p>
              <p>content-type: application/json; charset=utf-8</p>
              <p className="text-emerald-500 font-semibold">{`{"status":"healthy","origin":"Paris, France","ready":true}`}</p>
            </div>
          );
        }
        break;

      case 'wget':
        output = (
          <div className="space-y-0.5 font-mono text-[11px] text-slate-600 dark:text-slate-300">
            <p>Resolving {arg1 || 'moiz.paris'}... 76.76.21.21</p>
            <p>Connecting to {arg1 || 'moiz.paris'}|76.76.21.21|:443... connected.</p>
            <p>HTTP request sent, awaiting response... 200 OK</p>
            <p className="text-emerald-500">Length: 43810 (43K) [application/json] Saved to: index.html</p>
          </div>
        );
        break;

      case 'ssh':
        output = (
          <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
            <p>Connecting to {arg1 || 'paris.moiz.engineering'} on port 22...</p>
            <p className="text-emerald-500">Authenticated via id_rsa.pub (ed25519).</p>
            <p className="text-indigo-400 font-semibold">Welcome to Moiz&apos;s Paris Production Node. System healthy.</p>
          </div>
        );
        break;

      case 'ifconfig':
      case 'ip':
        output = (
          <div className="space-y-1 font-mono text-[11px] overflow-x-auto text-slate-700 dark:text-slate-300">
            <p className="text-indigo-400 font-bold">eth0: flags=4163&lt;UP,BROADCAST,RUNNING,MULTICAST&gt; mtu 1500</p>
            <p className="pl-4">inet 192.168.1.42  netmask 255.255.255.0  broadcast 192.168.1.255</p>
            <p className="pl-4">ether 08:00:27:4e:66:a1  (Ethernet / Paris Fiber)</p>
            <p className="text-indigo-400 font-bold">lo: flags=73&lt;UP,LOOPBACK,RUNNING&gt; mtu 65536</p>
            <p className="pl-4">inet 127.0.0.1  netmask 255.0.0.0</p>
          </div>
        );
        break;

      case 'netstat':
        output = (
          <div className="space-y-0.5 font-mono text-[11px] overflow-x-auto text-slate-700 dark:text-slate-300">
            <p className="font-bold text-slate-500 dark:text-slate-400">Proto Recv-Q Send-Q Local Address           Foreign Address         State</p>
            <p className="text-emerald-500">tcp        0      0 0.0.0.0:8000            0.0.0.0:*               LISTEN (fastapi)</p>
            <p className="text-emerald-500">tcp        0      0 0.0.0.0:3000            0.0.0.0:*               LISTEN (nextjs)</p>
            <p className="text-emerald-500">tcp        0      0 0.0.0.0:6379            0.0.0.0:*               LISTEN (redis)</p>
            <p className="text-emerald-500">tcp        0      0 0.0.0.0:5432            0.0.0.0:*               LISTEN (postgres)</p>
          </div>
        );
        break;

      case 'nslookup':
      case 'dig':
        output = (
          <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
            <p>Server: 1.1.1.1 (Cloudflare DNS)</p>
            <p>Address: 1.1.1.1#53</p>
            <p className="text-emerald-500 pt-1">Non-authoritative answer:</p>
            <p>{arg1 || 'moiz.paris'} canonical name = vercel-dns.com.</p>
            <p>Name: {arg1 || 'moiz.paris'} Address: 76.76.21.21 (Global Anycast Edge)</p>
          </div>
        );
        break;

      case 'docker':
        if (arg1 === 'ps' || !arg1) {
          output = (
            <div className="space-y-1 font-mono text-[11px] overflow-x-auto">
              <p className="font-bold text-slate-500 dark:text-slate-400">CONTAINER ID   IMAGE                 STATUS         PORTS                    NAMES</p>
              <p className="text-emerald-500">a4f91c0e21b8   moiz/fastapi-gateway  Up 42 days     0.0.0.0:8000-&gt;8000/tcp   doctor-iq-api</p>
              <p className="text-emerald-500">b82e44d9f102   moiz/langgraph-agent  Up 19 days     0.0.0.0:8080-&gt;8080/tcp   genie-orchestrator</p>
              <p className="text-emerald-500">c3710a911e4f   redis:7-alpine        Up 42 days     0.0.0.0:6379-&gt;6379/tcp   redis-broker</p>
              <p className="text-emerald-500">d1840e729a1b   postgres:16-alpine    Up 42 days     0.0.0.0:5432-&gt;5432/tcp   portfolio-db</p>
            </div>
          );
        } else {
          output = <p className="text-[11px] text-slate-400 font-mono">Docker daemon online. Try &apos;docker ps&apos;</p>;
        }
        break;

      case 'git':
        if (arg1 === 'status' || !arg1) {
          output = (
            <div className="space-y-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              <p>On branch <span className="text-indigo-400 font-bold">main</span></p>
              <p>Your branch is up to date with &apos;origin/main&apos;.</p>
              <p className="text-slate-500 pt-0.5">Changes ready for recruitment:</p>
              <p className="text-emerald-500 pl-3">+ new file: master-of-science-epitech.cert</p>
              <p className="text-emerald-500 pl-3">+ new file: production-ready-engineer.ts</p>
              <p className="pt-0.5 text-slate-400">nothing to commit, working tree clean</p>
            </div>
          );
        } else if (arg1 === 'log') {
          output = (
            <div className="space-y-1 font-mono text-[11px] text-slate-600 dark:text-slate-400">
              <p><span className="text-amber-500 font-bold">* commit 8c3149a</span> (HEAD -&gt; main, origin/main)</p>
              <p className="pl-2">Author: Muhammad Abdul Moiz &lt;amoiz0468@gmail.com&gt;</p>
              <p className="pl-2 text-slate-900 dark:text-white font-semibold">feat: high-performance AI systems, cloud deployments &amp; CI/CD</p>
              <p className="pt-1"><span className="text-amber-500 font-bold">* commit e4b8910</span></p>
              <p className="pl-2 text-slate-900 dark:text-white font-semibold">feat: enrolled at EPITECH Paris (MSc Information Technology)</p>
            </div>
          );
        } else {
          output = <p className="text-[11px] text-slate-400">git: try &apos;git status&apos; or &apos;git log&apos;</p>;
        }
        break;

      case 'kubectl':
      case 'k8s':
        output = (
          <div className="space-y-0.5 font-mono text-[11px] overflow-x-auto text-slate-700 dark:text-slate-300">
            <p className="font-bold text-slate-500 dark:text-slate-400">NAME                               READY   STATUS    RESTARTS   AGE</p>
            <p className="text-emerald-500">pod/doctor-iq-api-7b8f99c4-x12     1/1     Running   0          42d</p>
            <p className="text-emerald-500">pod/brackets-genie-5a7c88d2-k98    1/1     Running   0          19d</p>
            <p className="text-emerald-500">pod/vif-backend-9f4411ba-m31       1/1     Running   0          30d</p>
            <p className="text-emerald-500">pod/celery-worker-6c3311da-p04     1/1     Running   0          42d</p>
          </div>
        );
        break;

      case 'aws':
        output = (
          <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
            <p className="text-emerald-500 font-semibold">AWS CLI v2.15 (eu-west-3 Paris)</p>
            <p>s3://moiz-portfolio-assets [STANDARD]</p>
            <p>ec2-instances: 2 running, 0 stopped (health-check: 2/2 passed)</p>
          </div>
        );
        break;

      case 'python':
      case 'python3':
        output = (
          <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
            <p className="text-emerald-500 font-bold">Python 3.12.2 (main) [Clang 16.0.0] on darwin</p>
            <p>Loaded modules: fastapi, pydantic, celery, redis, langchain, langgraph, torch</p>
            <p className="text-slate-400">Type &apos;skills&apos; to view production Python architecture.</p>
          </div>
        );
        break;

      case 'node':
      case 'nodejs':
        output = (
          <p className="text-[11px] font-mono text-emerald-500">
            v20.12.0 (Node.js runtime with Next.js 14 &amp; TypeScript 5 active)
          </p>
        );
        break;

      case 'npm':
      case 'pnpm':
      case 'yarn':
      case 'bun':
        output = (
          <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
            <p className="text-emerald-500">{base}: audit completed.</p>
            <p>0 vulnerabilities found across 42 packages. Production ready.</p>
          </div>
        );
        break;

      case 'pip':
      case 'pip3':
        output = (
          <p className="text-[11px] font-mono text-emerald-500">
            pip 24.0: fastapi, uvicorn, celery, redis, langgraph, pytest installed.
          </p>
        );
        break;

      case 'cargo':
      case 'rustc':
        output = (
          <p className="text-[11px] font-mono text-emerald-500">
            cargo 1.77.0: zero-cost abstractions &amp; fearless concurrency engine ready.
          </p>
        );
        break;

      case 'elixir':
      case 'mix':
      case 'iex':
        output = (
          <p className="text-[11px] font-mono text-violet-400 font-bold">
            Erlang/OTP 26 [erts-14.2] Interactive Elixir (1.16.2) — Phoenix framework power.
          </p>
        );
        break;

      case 'go':
      case 'golang':
        output = (
          <p className="text-[11px] font-mono text-emerald-500">
            go version go1.22.1 darwin/arm64
          </p>
        );
        break;

      case 'vim':
      case 'vi':
      case 'nvim': {
        const file = arg1 || 'untitled.txt';
        const initial = arg1 ? (virtualFiles[file] ?? '') : '';
        setEditorFile(file);
        setEditorBuffer(initial);
        setVimMode('NORMAL');
        setEditorStatusMsg(initial ? `"${file}" ${initial.split('\n').length}L` : `"${file}" [New File]`);
        setActiveEditor('vim');
        setInputVal('');
        return;
      }

      case 'nano': {
        const file = arg1 || 'untitled.txt';
        const initial = arg1 ? (virtualFiles[file] ?? '') : '';
        setEditorFile(file);
        setEditorBuffer(initial);
        setEditorStatusMsg(initial ? `File: ${file}` : `[ New File: ${file} ]`);
        setActiveEditor('nano');
        setInputVal('');
        return;
      }

      case 'emacs': {
        const file = arg1 || 'untitled.txt';
        const initial = arg1 ? (virtualFiles[file] ?? '') : '';
        setEditorFile(file);
        setEditorBuffer(initial);
        setEditorStatusMsg(initial ? `Buffer: ${file}` : `New Buffer: *${file}*`);
        setActiveEditor('emacs');
        setInputVal('');
        return;
      }

      case 'code':
        output = (
          <p className="text-[11px] text-indigo-400 font-mono">
            VS Code: opened /home/moiz in workspace.
          </p>
        );
        break;

      case 'github':
      case 'gh':
        output = (
          <div className="space-y-1.5 text-[11px] font-mono">
            <div className="flex items-center gap-2">
              <FiGithub className="text-slate-900 dark:text-white text-sm shrink-0" />
              <span className="font-bold text-slate-900 dark:text-white">GitHub Profile:</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
              >
                <span>{profile.github}</span>
                <FiExternalLink className="text-[10px]" />
              </a>
            </div>
            <p className="text-slate-600 dark:text-slate-400 pl-5">
              Production microservices, LangGraph multi-agent orchestration, Docker pipelines, and Next.js full-stack systems.
            </p>
          </div>
        );
        break;

      case 'linkedin':
      case 'li':
        output = (
          <div className="space-y-1.5 text-[11px] font-mono">
            <div className="flex items-center gap-2">
              <FiLinkedin className="text-sky-500 text-sm shrink-0" />
              <span className="font-bold text-slate-900 dark:text-white">LinkedIn Profile:</span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
              >
                <span>{profile.linkedin}</span>
                <FiExternalLink className="text-[10px]" />
              </a>
            </div>
            <p className="text-slate-600 dark:text-slate-400 pl-5">
              Connect with Muhammad Abdul Moiz for MSc IT alternance, software engineering opportunities, and technical collaborations in Paris.
            </p>
          </div>
        );
        break;

      case 'theme':
        if (arg1 === 'dark' || arg1 === 'night') {
          setTheme('dark');
          output = (
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-500">
              <FiMoon className="text-indigo-400" />
              <span>[OK] Switched portfolio theme to dark mode.</span>
            </div>
          );
        } else if (arg1 === 'light' || arg1 === 'day') {
          setTheme('light');
          output = (
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-500">
              <FiSun className="text-amber-500" />
              <span>[OK] Switched portfolio theme to day mode.</span>
            </div>
          );
        } else if (arg1 === 'toggle') {
          toggleTheme();
          output = <p className="text-[11px] font-mono text-emerald-500">[OK] Toggled portfolio theme.</p>;
        } else {
          output = (
            <div className="space-y-0.5 text-[11px] font-mono text-slate-700 dark:text-slate-300">
              <p>Current active theme: <span className="font-bold text-indigo-500">{theme}</span></p>
              <p className="text-slate-400">Usage: &apos;theme dark&apos; | &apos;theme day&apos; | &apos;dark&apos; | &apos;day&apos; | &apos;mode&apos;</p>
            </div>
          );
        }
        break;

      case 'dark':
      case 'darkmode':
      case 'night':
      case 'nightmode':
        setTheme('dark');
        output = (
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-500">
            <FiMoon className="text-indigo-400" />
            <span>[OK] Switched portfolio theme to dark mode.</span>
          </div>
        );
        break;

      case 'light':
      case 'lightmode':
      case 'day':
      case 'daymode':
        setTheme('light');
        output = (
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-500">
            <FiSun className="text-amber-500" />
            <span>[OK] Switched portfolio theme to day mode.</span>
          </div>
        );
        break;

      case 'mode':
        if (arg1 === 'dark' || arg1 === 'night') {
          setTheme('dark');
          output = (
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-500">
              <FiMoon className="text-indigo-400" />
              <span>[OK] Switched portfolio theme to dark mode.</span>
            </div>
          );
        } else if (arg1 === 'light' || arg1 === 'day') {
          setTheme('light');
          output = (
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-500">
              <FiSun className="text-amber-500" />
              <span>[OK] Switched portfolio theme to day mode.</span>
            </div>
          );
        } else {
          toggleTheme();
          output = (
            <p className="text-[11px] font-mono text-emerald-500">
              [OK] Switched mode to {theme === 'dark' ? 'day' : 'dark'} mode.
            </p>
          );
        }
        break;

      case 'lang':
        if (arg1 === 'fr' || arg1 === 'french') {
          setLang('fr');
          output = <p className="text-[11px] font-mono text-emerald-500">[OK] Langue basculee en francais.</p>;
        } else if (arg1 === 'en' || arg1 === 'english') {
          setLang('en');
          output = <p className="text-[11px] font-mono text-emerald-500">[OK] Language switched to English.</p>;
        } else if (arg1 === 'toggle') {
          toggleLang();
          output = <p className="text-[11px] font-mono text-emerald-500">[OK] Toggled language.</p>;
        } else {
          output = (
            <div className="space-y-0.5 text-[11px] font-mono text-slate-700 dark:text-slate-300">
              <p>Current language: <span className="font-bold text-indigo-500">{lang === 'fr' ? 'Francais (fr)' : 'English (en)'}</span></p>
              <p className="text-slate-400">Usage: &apos;lang fr&apos; | &apos;lang en&apos; | &apos;fr&apos; | &apos;en&apos;</p>
            </div>
          );
        }
        break;

      case 'fr':
        setLang('fr');
        output = <p className="text-[11px] font-mono text-emerald-500">[OK] Langue basculee en francais.</p>;
        break;

      case 'en':
        setLang('en');
        output = <p className="text-[11px] font-mono text-emerald-500">[OK] Language switched to English.</p>;
        break;

      case 'skills':
        output = (
          <div className="space-y-1.5 text-[11px]">
            <p className="font-bold text-slate-900 dark:text-white">Muhammad Abdul Moiz Technical Stack:</p>
            <p><span className="text-indigo-500 font-semibold">• Backend:</span> Python (FastAPI, Django REST), Elixir (Phoenix), Node.js, PostgreSQL, Redis, Celery</p>
            <p><span className="text-indigo-500 font-semibold">• DevOps &amp; Cloud:</span> Docker, Docker Compose, GitLab CI, GitHub Actions, AWS, GCP, SonarQube, DORA metrics</p>
            <p><span className="text-indigo-500 font-semibold">• AI &amp; Agents:</span> LangGraph, LangChain, OpenAI / Claude APIs, RAG, PyTorch, Dialogflow</p>
            <p><span className="text-indigo-500 font-semibold">• Frontend:</span> React 18, Next.js, React Native, TypeScript, TailwindCSS</p>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-1.5 text-[11px]">
            <p className="font-bold text-slate-900 dark:text-white">Featured Production Projects:</p>
            <p>1. <a href="#projects" className="underline text-indigo-500 font-bold">DoctorIQ</a> — Asynchronous clinical document extraction &amp; AI OCR (70% latency cut)</p>
            <p>2. <a href="#projects" className="underline text-indigo-500 font-bold">Brackets Genie</a> — Streaming multi-agent LangGraph platform over WebSockets (&lt;50ms latency)</p>
            <p>3. <a href="#projects" className="underline text-indigo-500 font-bold">VIF</a> — Food solidarity cross-platform web (FastAPI) &amp; mobile (React Native) app</p>
            <p>4. <a href="#projects" className="underline text-indigo-500 font-bold">Trinity Suite</a> — Enterprise Software Factory with automated SonarQube gates</p>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1.5 text-[11px] font-mono">
            <p className="font-bold text-slate-900 dark:text-white">Direct Contact Channels:</p>
            <p>Email: <a href={`mailto:${profile.email}`} className="underline text-indigo-500 font-semibold">{profile.email}</a></p>
            <p>Phone: <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="underline text-indigo-500 font-semibold">{profile.phone}</a></p>
            <div className="flex items-center gap-1.5">
              <FiLinkedin className="text-sky-500 shrink-0" />
              <span>LinkedIn:</span>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline text-indigo-500 font-semibold">
                <span>{profile.linkedin}</span>
                <FiExternalLink className="text-[10px]" />
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <FiGithub className="text-slate-900 dark:text-white shrink-0" />
              <span>GitHub:</span>
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline text-indigo-500 font-semibold">
                <span>{profile.github}</span>
                <FiExternalLink className="text-[10px]" />
              </a>
            </div>
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

      case 'status': {
        const latency = (Math.random() * 6.5 + 8.5).toFixed(1);
        const queueJobs = Math.floor(Math.random() * 3);
        output = (
          <div className="space-y-1 text-[11px]">
            <p className="font-bold text-slate-900 dark:text-white">Service Health Matrix:</p>
            <p className="text-emerald-500">✓ FastAPI Core Gateway: 200 OK (latency: {latency}ms)</p>
            <p className="text-emerald-500">✓ Celery Async Workers: Active (concurrency: 8, queue: {queueJobs} jobs)</p>
            <p className="text-emerald-500">✓ Redis Cache &amp; Broker: Connected (PONG)</p>
            <p className="text-emerald-500">✓ Docker Multi-stage Containers: Healthy</p>
            <p className="text-indigo-400">ℹ Live Paris Time: {new Date().toLocaleTimeString('fr-FR', { timeZone: 'Europe/Paris' })} CET</p>
          </div>
        );
        break;
      }

      case 'cv':
      case 'resume':
        output = (
          <div className="space-y-1 text-[11px] font-mono">
            <p className="font-bold text-indigo-500">Muhammad Abdul Moiz — Curriculum Vitae</p>
            <p>MSc IT @ EPITECH Paris • 3+ Years in Python, FastAPI, Docker, CI/CD &amp; LangGraph.</p>
            <p className="text-slate-500">For the complete PDF resume, visit the Experience section or contact <a href={`mailto:${profile.email}`} className="text-indigo-400 underline">{profile.email}</a>.</p>
          </div>
        );
        break;

      case 'sl':
        output = (
          <div className="font-mono text-[10px] leading-tight text-amber-500 select-none overflow-x-auto">
            <pre>{`      ====        ________                ___________
  _D _|  |_______/        \\__I_I_____===__|_________|
   |(_)---  |   H\\________/ _____ \\   (|) |         |
   /     |  |   H  |  |   | |   | |    |  |         |
  |      |  |   H  |__--------------------|         |
  | ________|___H__/__|_____/[][]~\\_______|_________|
  |/ |   |_____ _____ _____ _____ _____ /             \\`}</pre>
            <p className="pt-1 text-slate-400">Choo Choo! You typed &apos;sl&apos; instead of &apos;ls&apos;. Enjoy the classic Unix train!</p>
          </div>
        );
        break;

      case 'cowsay': {
        const speech = fullArg.trim() || 'Hire Moiz: Full-Stack, DevOps & AI Power!';
        const len = speech.length;
        const topBar = ' ' + '_'.repeat(len + 2);
        const botBar = ' ' + '-'.repeat(len + 2);
        output = (
          <div className="font-mono text-[11px] text-emerald-500 select-none overflow-x-auto">
            <pre>{`${topBar}
< ${speech} >
${botBar}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`}</pre>
          </div>
        );
        break;
      }

      case 'weather':
      case 'wttr':
        output = (
          <div className="font-mono text-[11px] text-slate-700 dark:text-slate-300 space-y-1">
            <p className="font-bold text-indigo-500">Weather report: Paris, France</p>
            <pre className="text-amber-500 dark:text-amber-400 leading-tight select-none">{`     \\   /     Sunny / Mild
      .-.      +18°C (feels like 19°C)
   ― (   ) ―   Wind: 11 km/h WNW
      \`-’      Humidity: 52%
     /   \\     UV Index: 3 (Moderate)`}</pre>
            <p className="text-[10px] text-slate-400">Location: Paris (75011) • EPITECH Campus • Ideal engineering weather</p>
          </div>
        );
        break;

      case 'fortune': {
        const randFortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
        output = (
          <div className="border-l-2 border-indigo-500 pl-3 py-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
            {randFortune}
          </div>
        );
        break;
      }

      case 'joke':
      case 'jokes': {
        const randJoke = JOKES[Math.floor(Math.random() * JOKES.length)];
        output = (
          <p className="text-[11px] font-mono text-amber-500">
            {randJoke}
          </p>
        );
        break;
      }

      case 'quote': {
        const randQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
        output = (
          <div className="border-l-2 border-emerald-500 pl-3 py-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
            {randQuote}
          </div>
        );
        break;
      }

      case 'matrix':
      case 'cmatrix':
        output = (
          <div className="font-mono text-[11px] text-emerald-500 space-y-0.5 leading-tight">
            <p>01001101 01101111 01101001 01111010</p>
            <p>01000101 01010000 01001001 01010100 01000101 01000011 01001000</p>
            <p className="text-slate-400 text-[10px]">Wake up, Neo... Follow the white rabbit to the contact page.</p>
          </div>
        );
        break;

      case 'neofetch':
      case 'fastfetch':
        output = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px] pt-1">
            <div className="text-indigo-500 dark:text-indigo-400 leading-tight select-none">
              <pre>{`       /\\
      /  \\
     / /\\ \\
    / /  \\ \\
   / /    \\ \\
  / /______\\ \\
 /__________\\ \\`}</pre>
            </div>
            <div className="space-y-0.5 text-slate-700 dark:text-slate-300">
              <p className="font-bold text-slate-900 dark:text-white">moiz@paris</p>
              <p className="text-slate-400 text-[10px]">---------------------------</p>
              <p><span className="text-indigo-400 font-semibold">OS:</span> MoizOS 2.4 (x86_64-darwin)</p>
              <p><span className="text-indigo-400 font-semibold">Host:</span> EPITECH Paris (MSc IT)</p>
              <p><span className="text-indigo-400 font-semibold">Kernel:</span> 6.12.0-epitech-lts</p>
              <p><span className="text-indigo-400 font-semibold">Uptime:</span> 23 years (born Oct 16, 2002)</p>
              <p><span className="text-indigo-400 font-semibold">Shell:</span> zsh 5.9 (x86_64)</p>
              <p><span className="text-indigo-400 font-semibold">CPU:</span> Apple M4 Pro (14 cores)</p>
              <p><span className="text-indigo-400 font-semibold">Memory:</span> 32GB Unified Memory</p>
              <p><span className="text-indigo-400 font-semibold">Location:</span> Paris, France</p>
            </div>
          </div>
        );
        break;

      case 'sudo':
        output = (
          <div className="space-y-1 font-mono text-[11px] text-rose-500">
            <p>[sudo] password for visitor: *********</p>
            <p>Nice try! User &apos;visitor&apos; is not in the sudoers file.</p>
            <p className="text-slate-400 text-[10px]">This incident has been logged and reported to Moiz.</p>
          </div>
        );
        break;

      case 'coffee':
      case 'tea':
        output = (
          <div className="space-y-1 font-mono text-[11px] text-amber-500">
            <p>HTTP 418: I&apos;m a teapot (RFC 2324 Hyper Text Coffee Pot Control Protocol).</p>
            <p className="text-emerald-400">Deploying espresso via automated cloud pipeline... Brew complete! [OK]</p>
          </div>
        );
        break;

      case 'beer':
      case 'water':
        output = (
          <p className="text-[11px] font-mono text-amber-400">
            Here is a cold beverage on the house! Cheers from Paris.
          </p>
        );
        break;

      case 'exit':
      case 'quit':
        output = (
          <p className="text-[11px] font-mono text-indigo-400">
            Process completed [exit 0]. (You are inside the matrix — there is no exit!)
          </p>
        );
        break;

      case 'kill':
      case 'killall':
        output = (
          <p className="text-[11px] font-mono text-amber-500">
            kill: cannot kill process: Moiz&apos;s passion for software engineering is immortal.
          </p>
        );
        break;

      case 'reboot':
      case 'shutdown':
      case 'poweroff':
        output = (
          <div className="space-y-0.5 font-mono text-[11px] text-rose-400">
            <p>Broadcast message from root@paris: System shutdown requested...</p>
            <p className="text-emerald-400 font-bold">Action denied! MoizOS guarantees 99.999% SLA uptime.</p>
          </div>
        );
        break;

      case 'bc':
      case 'calc': {
        if (!fullArg.trim()) {
          output = <p className="text-[11px] font-mono text-slate-400">bc 1.07: Type an arithmetic expression (e.g. &apos;bc 42 * 13&apos; or &apos;bc 2^10&apos;)</p>;
        } else {
          try {
            const expr = fullArg.replace(/\^/g, '**');
            if (/^[0-9+\-*/().\s*%]+$/.test(expr)) {
              // eslint-disable-next-line no-eval
              const res = Function(`'use strict'; return (${expr})`)();
              output = <p className="text-[11px] font-mono text-emerald-500 font-bold">{res}</p>;
            } else {
              output = <p className="text-[11px] font-mono text-rose-500">bc: syntax error: only numeric arithmetic allowed</p>;
            }
          } catch {
            output = <p className="text-[11px] font-mono text-rose-500">bc: evaluation error</p>;
          }
        }
        break;
      }

      case 'cal': {
        const d = new Date();
        const year = d.getFullYear();
        const month = d.getMonth();
        const monthName = d.toLocaleString('en-US', { month: 'long' });
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = d.getDate();

        const grid: string[][] = [];
        let row: string[] = Array(firstDay).fill('  ');
        for (let day = 1; day <= daysInMonth; day++) {
          row.push(day === today ? `[${day < 10 ? ' ' + day : day}]` : (day < 10 ? ' ' + day : `${day}`));
          if (row.length === 7) {
            grid.push(row);
            row = [];
          }
        }
        if (row.length > 0) {
          while (row.length < 7) row.push('  ');
          grid.push(row);
        }

        output = (
          <div className="font-mono text-[11px] text-slate-700 dark:text-slate-300 leading-tight">
            <p className="font-bold text-indigo-500">   {monthName} {year}</p>
            <p className="text-slate-400">Su Mo Tu We Th Fr Sa</p>
            {grid.map((r, i) => (
              <p key={i}>{r.map((c) => c.padStart(3, ' ')).join('')}</p>
            ))}
          </div>
        );
        break;
      }

      case 'df':
        output = (
          <div className="space-y-0.5 font-mono text-[11px] overflow-x-auto text-slate-700 dark:text-slate-300">
            <p className="font-bold text-slate-400">Filesystem      Size  Used Avail Use% Mounted on</p>
            <p className="text-emerald-500">/dev/disk3s1    494G  118G  342G  26% /</p>
            <p className="text-emerald-500">/dev/disk3s5    494G  8.2G  342G   3% /home/moiz</p>
            <p className="text-emerald-500">tmpfs            16G  1.2G   15G   8% /tmp</p>
          </div>
        );
        break;

      case 'du': {
        const fileCount = Object.keys(virtualFiles).length;
        const totalBytes = Object.values(virtualFiles).reduce((a, b) => a + b.length, 0);
        output = (
          <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
            <p className="text-emerald-500">{(totalBytes / 1024).toFixed(1)}K  /home/moiz/virtual-fs ({fileCount} files)</p>
            <p className="text-emerald-500">48M   /home/moiz/projects</p>
            <p className="text-emerald-500">142M  /home/moiz</p>
          </div>
        );
        break;
      }

      case 'base64': {
        if (!arg1) {
          output = <p className="text-[11px] font-mono text-amber-500">usage: base64 [-d] &lt;string&gt;</p>;
        } else if (arg1 === '-d' || arg1 === '--decode') {
          const strToDecode = parts.slice(2).join(' ');
          try {
            const decoded = atob(strToDecode);
            output = <p className="text-[11px] font-mono text-emerald-400">{decoded}</p>;
          } catch {
            output = <p className="text-[11px] font-mono text-rose-500">base64: invalid input for decoding</p>;
          }
        } else {
          const strToEncode = parts.slice(1).join(' ');
          try {
            const encoded = btoa(strToEncode);
            output = <p className="text-[11px] font-mono text-emerald-400">{encoded}</p>;
          } catch {
            output = <p className="text-[11px] font-mono text-rose-500">base64: encoding error</p>;
          }
        }
        break;
      }

      case 'ssh':
      case 'telnet': {
        const dest = arg1 || 'moiz.paris';
        output = (
          <div className="space-y-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
            <p className="text-slate-400">Connecting to {dest}:22 via Ed25519 key...</p>
            <p className="text-emerald-500">Authenticated to MoizOS Paris Production Cluster.</p>
            <p>Last login: {new Date().toUTCString()} from visitor-agent</p>
            <p className="text-indigo-400">Welcome! Type &apos;skills&apos; or &apos;projects&apos; to explore.</p>
          </div>
        );
        break;
      }

      case 'alias':
        output = (
          <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
            <p>alias ll=&apos;ls -la&apos;</p>
            <p>alias gs=&apos;git status&apos;</p>
            <p>alias dc=&apos;docker compose&apos;</p>
            <p>alias k=&apos;kubectl&apos;</p>
            <p>alias gh=&apos;github&apos;</p>
            <p>alias li=&apos;linkedin&apos;</p>
            <p>alias vi=&apos;vim&apos;</p>
            <p>alias cls=&apos;clear&apos;</p>
          </div>
        );
        break;

      case 'env':
      case 'printenv':
        output = (
          <div className="space-y-0.5 font-mono text-[11px] text-slate-600 dark:text-slate-300">
            <p>USER=moiz</p>
            <p>HOME=/home/moiz</p>
            <p>SHELL=/bin/zsh</p>
            <p>LOCATION=Paris_France</p>
            <p>EDUCATION=EPITECH_Paris_MSc_IT</p>
            <p>STATUS=Available_Immediate_Alternance_CDI</p>
            <p>THEME={theme}</p>
            <p>LANG={lang === 'fr' ? 'fr_FR.UTF-8' : 'en_US.UTF-8'}</p>
            <p>EDITOR=vim</p>
          </div>
        );
        break;

      case 'man':
        if (arg1 === 'moiz') {
          output = (
            <div className="space-y-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              <p className="font-bold text-slate-900 dark:text-white">MOIZ(1) — General Commands Manual</p>
              <p><span className="font-semibold text-indigo-400">NAME:</span> moiz — Web, DevOps &amp; AI Engineer</p>
              <p><span className="font-semibold text-indigo-400">SYNOPSIS:</span> moiz [--hire] [--collaborate] [--interview]</p>
              <p><span className="font-semibold text-indigo-400">DESCRIPTION:</span> Autonomous engineer pursuing MSc IT at EPITECH Paris. Bridges modern AI architectures with cloud CI/CD delivery.</p>
            </div>
          );
        } else if (arg1 === 'vim' || arg1 === 'nano' || arg1 === 'emacs') {
          output = (
            <div className="space-y-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              <p className="font-bold text-slate-900 dark:text-white">{arg1.toUpperCase()}(1) — Full Text Editor</p>
              <p>Launches interactive in-terminal text editor. You can create new files or edit existing ones.</p>
              <p>Saves persist in the virtual filesystem and can be viewed with &apos;cat&apos; or listed with &apos;ls&apos;.</p>
            </div>
          );
        } else if (arg1 === 'cp' || arg1 === 'rm' || arg1 === 'mv') {
          output = (
            <div className="space-y-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              <p className="font-bold text-slate-900 dark:text-white">{arg1.toUpperCase()}(1) — Filesystem Manipulation</p>
              <p>Manipulates virtual files. Reloading the page resets to initial state.</p>
            </div>
          );
        } else {
          output = <p className="text-[11px] text-slate-400 font-mono">What manual page do you want? Try &apos;man moiz&apos;, &apos;man vim&apos;, &apos;man nano&apos;, or &apos;help&apos;.</p>;
        }
        break;

      case 'secret':
      case 'secrets':
      case 'easteregg':
      case 'eastereggs':
      case 'eggs':
        output = (
          <div className="space-y-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
            <p className="font-bold text-amber-500">Secret Easter Egg Vault:</p>
            <p className="text-slate-500">Try these fun commands: sl, cowsay, fortune, joke, quote, matrix, neofetch, coffee, beer, theme dark, theme light, fr, en, sudo, vim.</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        output = (
          <p className="text-[11px] text-rose-500 dark:text-rose-400">
            command not found: {raw}. Type <span className="underline cursor-pointer font-bold" onClick={() => executeCommand('help')}>help</span> for primary commands, or explore with &apos;skills&apos;, &apos;projects&apos;, &apos;tree&apos;, &apos;joke&apos;, &apos;theme&apos;.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: raw, output, time: now, dir: currentDir }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
      setHistoryIndex(null);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistoryList.length === 0) return;
      const nextIdx = historyIndex === null ? commandHistoryList.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(commandHistoryList[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= commandHistoryList.length) {
        setHistoryIndex(null);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(commandHistoryList[nextIdx] || '');
      }
    }
  };

  const quickChips = ['skills', 'projects', 'hire', 'contact', 'whoami', 'help', 'ls', 'clear'];

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
              setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 50);
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
                setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 50);
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
          data-lenis-prevent="true"
          onClick={(e) => {
            if (activeEditor) return;
            if ((e.target as HTMLElement).closest('button, a, input')) return;
            if (window.getSelection()?.toString()) return;
            inputRef.current?.focus({ preventScroll: true });
          }}
          className="flex flex-col p-4 sm:p-5 text-slate-800 dark:text-slate-200 h-[340px] sm:h-[380px] cursor-text"
        >
          {activeEditor ? (
            <div className="flex flex-col h-full space-y-2 select-text" data-lenis-prevent="true">
              {/* Header depending on editor */}
              {activeEditor === 'vim' && (
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-1.5 dark:border-white/10 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-500 font-mono">VIM</span>
                    <span className="text-slate-400 font-mono text-[11px]">~/</span>
                    <input
                      type="text"
                      value={editorFile}
                      onChange={(e) => setEditorFile(e.target.value)}
                      placeholder="untitled.txt"
                      className="bg-transparent border-b border-dashed border-slate-400/50 text-slate-800 dark:text-slate-200 font-mono text-[11px] px-1 py-0.5 focus:border-emerald-400 focus:outline-none w-28 sm:w-36"
                      title="File name (click to edit)"
                    />
                    <button
                      type="button"
                      onClick={() => setVimMode((m) => (m === 'NORMAL' ? 'INSERT' : 'NORMAL'))}
                      className={`rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wider transition font-mono ${
                        vimMode === 'INSERT'
                          ? 'bg-emerald-500 text-slate-950 animate-pulse'
                          : 'bg-indigo-600 text-white'
                      }`}
                    >
                      -- {vimMode} --
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono">
                    <button
                      type="button"
                      onClick={() => closeEditor(true)}
                      className="rounded bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-white transition hover:bg-emerald-500"
                    >
                      :wq (Save &amp; Exit)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const target = editorFile.trim() || 'untitled.txt';
                        setVirtualFiles((prev) => ({ ...prev, [target]: editorBuffer }));
                        setEditorStatusMsg(`"${target}" written [OK]`);
                      }}
                      className="rounded bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold text-white transition hover:bg-indigo-500"
                    >
                      :w (Save)
                    </button>
                    <button
                      type="button"
                      onClick={() => closeEditor(false)}
                      className="rounded bg-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-700 transition hover:bg-rose-500 hover:text-white dark:bg-white/10 dark:text-slate-300"
                    >
                      :q! (Discard)
                    </button>
                  </div>
                </div>
              )}

              {activeEditor === 'nano' && (
                <div className="flex items-center justify-between bg-slate-800 text-white px-2.5 py-1 rounded text-[11px] font-mono shrink-0">
                  <span>GNU nano 7.2</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-300">File:</span>
                    <input
                      type="text"
                      value={editorFile}
                      onChange={(e) => setEditorFile(e.target.value)}
                      placeholder="untitled.txt"
                      className="bg-slate-900 border border-slate-700 text-amber-300 font-mono text-[11px] px-1.5 py-0.5 rounded focus:border-amber-400 focus:outline-none w-32 sm:w-44"
                      title="File name (click to edit)"
                    />
                  </div>
                  <span className="text-amber-400 font-semibold">[MoizOS 2.4]</span>
                </div>
              )}

              {activeEditor === 'emacs' && (
                <div className="flex items-center justify-between border-b border-slate-200 pb-1 text-[11px] font-mono dark:border-white/10 shrink-0">
                  <span className="font-bold text-violet-400">GNU Emacs 29.3</span>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span>Buffer:</span>
                    <input
                      type="text"
                      value={editorFile}
                      onChange={(e) => setEditorFile(e.target.value)}
                      placeholder="untitled.txt"
                      className="bg-transparent border-b border-dashed border-violet-500/50 text-violet-300 font-mono text-[11px] px-1 focus:border-violet-400 focus:outline-none w-32 sm:w-40"
                      title="Buffer / File name (click to edit)"
                    />
                  </div>
                  <span className="text-emerald-500 font-semibold">Active Buffer</span>
                </div>
              )}

              {/* Editor Workspace & Textarea */}
              <div className="relative flex flex-1 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-black/60">
                {activeEditor === 'vim' && (
                  <div className="flex flex-col select-none border-r border-slate-200 bg-slate-100/80 px-2 py-2 text-right font-mono text-[11px] text-slate-400 dark:border-white/5 dark:bg-white/[0.02]">
                    {Array.from({ length: Math.max(6, editorBuffer.split('\n').length) }).map((_, i) => (
                      <span key={i} className="leading-relaxed">
                        {i < editorBuffer.split('\n').length ? i + 1 : '~'}
                      </span>
                    ))}
                  </div>
                )}

                <textarea
                  ref={editorTextareaRef}
                  value={editorBuffer}
                  onChange={(e) => {
                    setEditorBuffer(e.target.value);
                    if (activeEditor === 'vim' && vimMode === 'NORMAL') {
                      setVimMode('INSERT');
                    }
                  }}
                  onKeyDown={(e) => {
                    if (activeEditor === 'vim') {
                      if (e.key === 'Escape') {
                        e.preventDefault();
                        setVimMode('NORMAL');
                        setEditorStatusMsg('-- NORMAL --');
                      } else if (vimMode === 'NORMAL' && e.key === 'i') {
                        e.preventDefault();
                        setVimMode('INSERT');
                        setEditorStatusMsg('-- INSERT --');
                      }
                    } else if (activeEditor === 'nano') {
                      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'x') {
                        e.preventDefault();
                        closeEditor(true);
                      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'o') {
                        e.preventDefault();
                        const target = editorFile.trim() || 'untitled.txt';
                        setVirtualFiles((prev) => ({ ...prev, [target]: editorBuffer }));
                        setEditorStatusMsg(`[ Wrote ${editorBuffer.split('\n').length} lines to "${target}" ]`);
                      }
                    } else if (activeEditor === 'emacs') {
                      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
                        e.preventDefault();
                        const target = editorFile.trim() || 'untitled.txt';
                        setVirtualFiles((prev) => ({ ...prev, [target]: editorBuffer }));
                        setEditorStatusMsg(`Wrote ${target}`);
                      }
                    }
                  }}
                  data-lenis-prevent="true"
                  className="flex-1 resize-none bg-transparent p-2 font-mono text-[11px] leading-relaxed text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100"
                  placeholder={
                    activeEditor === 'vim'
                      ? 'Type to edit in INSERT mode. Press <Esc> for NORMAL mode.'
                      : 'Type to edit file buffer...'
                  }
                />
              </div>

              {/* Footer / Status / Shortcuts Bar */}
              {activeEditor === 'vim' && (
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-0.5 shrink-0">
                  <span className="text-emerald-500 font-semibold">
                    {editorStatusMsg ||
                      (vimMode === 'INSERT'
                        ? '-- INSERT --'
                        : `"${editorFile || 'untitled.txt'}" ${editorBuffer.split('\n').length}L, ${editorBuffer.length}B`)}
                  </span>
                  <span className="text-slate-400">Press &lt;Esc&gt; then :wq or click buttons to exit</span>
                </div>
              )}

              {activeEditor === 'nano' && (
                <div className="space-y-1 pt-1 font-mono text-[10px] shrink-0">
                  <div className="text-amber-500 text-[10px]">{editorStatusMsg || '[ Ready. Edit text above ]'}</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-slate-900/90 text-slate-200 p-1.5 rounded">
                    <button
                      type="button"
                      onClick={() => closeEditor(true)}
                      className="text-left hover:text-emerald-400 transition"
                    >
                      <span className="font-bold text-white bg-slate-700 px-1 rounded mr-1">^X</span> Exit &amp; Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const target = editorFile.trim() || 'untitled.txt';
                        setVirtualFiles((prev) => ({ ...prev, [target]: editorBuffer }));
                        setEditorStatusMsg(`[ Wrote ${editorBuffer.split('\n').length} lines to "${target}" ]`);
                      }}
                      className="text-left hover:text-emerald-400 transition"
                    >
                      <span className="font-bold text-white bg-slate-700 px-1 rounded mr-1">^O</span> WriteOut
                    </button>
                    <button
                      type="button"
                      onClick={() => closeEditor(false)}
                      className="text-left hover:text-rose-400 transition"
                    >
                      <span className="font-bold text-white bg-slate-700 px-1 rounded mr-1">^C</span> Discard
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorBuffer('')}
                      className="text-left hover:text-amber-400 transition"
                    >
                      <span className="font-bold text-white bg-slate-700 px-1 rounded mr-1">^K</span> Cut/Clear
                    </button>
                  </div>
                </div>
              )}

              {activeEditor === 'emacs' && (
                <div className="space-y-1 font-mono text-[10px] shrink-0">
                  <div className="bg-slate-700 text-white px-2 py-0.5 rounded text-[10px]">
                    -UUU:---F1  {editorFile || 'untitled.txt'}   All ({editorBuffer.split('\n').length} lines) (Fundamental)----------------
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-emerald-500">{editorStatusMsg || 'Minibuffer: C-x C-c or click button to save & exit'}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => closeEditor(true)}
                        className="rounded bg-violet-600 px-2 py-0.5 text-[10px] font-semibold text-white hover:bg-violet-500"
                      >
                        C-x C-c (Save &amp; Exit)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const target = editorFile.trim() || 'untitled.txt';
                          setVirtualFiles((prev) => ({ ...prev, [target]: editorBuffer }));
                          setEditorStatusMsg(`Wrote ${target}`);
                        }}
                        className="rounded bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold text-white hover:bg-indigo-500"
                      >
                        C-x C-s (Save)
                      </button>
                      <button
                        type="button"
                        onClick={() => closeEditor(false)}
                        className="rounded bg-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-700 hover:bg-rose-500 hover:text-white dark:bg-white/10 dark:text-slate-300"
                      >
                        C-g (Quit)
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Scrollable History Viewport with Lenis-prevent */}
              <div
                ref={shellContainerRef}
                data-lenis-prevent="true"
                className="flex-1 overflow-y-auto overscroll-contain space-y-3 pr-2 select-text"
                style={{ overscrollBehavior: 'contain' }}
              >
                {history.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    {item.command !== 'init' && (
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-semibold text-[11px]">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">moiz@paris</span>
                        <span className="text-slate-400">:</span>
                        <span className="text-indigo-500 font-bold">{item.dir || '~'}</span>
                        <span className="text-slate-400">$</span>
                        <span className="text-slate-900 dark:text-white font-mono">{item.command}</span>
                        <span className="ml-auto text-[10px] text-slate-400">{item.time}</span>
                      </div>
                    )}
                    <div className="pl-0 sm:pl-3">{item.output}</div>
                  </div>
                ))}
              </div>

              {/* Pinned Active Command Input Line */}
              <div className="shrink-0 mt-3 flex items-center gap-2 border-t border-slate-200/70 pt-3 text-[11px] dark:border-white/10">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">moiz@paris</span>
                <span className="text-slate-400">:</span>
                <span className="text-indigo-500 font-bold shrink-0">{currentDir}</span>
                <span className="text-slate-400">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="type 'skills', 'projects', 'hire', 'help', 'ls'..."
                  className="flex-1 bg-transparent font-mono text-[11px] text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white dark:placeholder:text-slate-500"
                />
                <button
                  type="button"
                  aria-label="Execute command"
                  onClick={() => executeCommand(inputVal)}
                  disabled={!inputVal.trim()}
                  className="rounded-lg bg-indigo-600 px-2 py-1 text-[10px] font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-40"
                >
                  <FiCornerDownLeft />
                </button>
              </div>

              {/* Pinned Quick Action Chips */}
              <div className="shrink-0 mt-2.5 flex flex-wrap items-center gap-1.5 pt-1">
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
            </>
          )}
        </div>
      )}
    </div>
  );
}
