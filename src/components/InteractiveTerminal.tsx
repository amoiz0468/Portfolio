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
  FiMail,
  FiPhone,
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
  "phone": "+33 7 59 24 79 11",
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

  const isLocal = targetHost === '127.0.0.1' || targetHost === 'localhost' || targetHost === '::1';
  const targetIp = isLocal
    ? '127.0.0.1'
    : targetHost.includes('google')
    ? '142.250.74.206'
    : targetHost === 'moiz.paris'
    ? '76.76.21.21'
    : '104.21.48.91';
  const ttl = isLocal ? 64 : 56;

  useEffect(() => {
    let cancelled = false;

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
  }, [targetHost, isLocal, targetIp, ttl]);

  const times = pings.map((p) => p.time);
  const min = times.length ? Math.min(...times).toFixed(2) : '0.00';
  const max = times.length ? Math.max(...times).toFixed(2) : '0.00';
  const avg = times.length ? (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2) : '0.00';

  return (
    <div className="space-y-1 font-mono text-[11px]">
      <p className="font-semibold text-slate-500 dark:text-slate-400">
        PING {targetHost} ({targetIp}): 56 data bytes (live network probe)
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

function parseBashrcAliases(bashrcContent: string): Record<string, string> {
  const aliases: Record<string, string> = {};
  if (!bashrcContent) return aliases;
  const lines = bashrcContent.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const match = trimmed.match(/^alias\s+([a-zA-Z0-9_\-.:]+)=['"]?([^'"]+)['"]?$/);
    if (match) {
      aliases[match[1]] = match[2].trim();
    }
  }
  return aliases;
}

function resolveVirtualPath(target: string, cwd: string): string {
  const clean = target.replace(/^\.\//, '').replace(/\/+$/, '');
  if (!clean || clean === '.') return cwd === '~' ? '' : cwd.replace('~/', '');
  if (clean.startsWith('~/')) return clean.replace('~/', '');
  if (clean.startsWith('/home/moiz/')) return clean.replace('/home/moiz/', '');
  if (clean === '/home/moiz') return '';
  if (cwd === '~') return clean;
  const prefix = cwd.replace('~/', '');
  if (clean.startsWith(prefix + '/')) return clean;
  return `${prefix}/${clean}`;
}

function LiveWeatherOutput() {
  const [data, setData] = useState<{ temp: number; wind: number; code: number; time: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current_weather=true',
          { cache: 'no-store' }
        );
        if (!res.ok) throw new Error('status ' + res.status);
        const json = await res.json();
        if (!cancelled && json.current_weather) {
          setData({
            temp: json.current_weather.temperature,
            wind: json.current_weather.windspeed,
            code: json.current_weather.weathercode,
            time: json.current_weather.time,
          });
        }
      } catch {
        if (!cancelled) {
          setData({ temp: 15.2, wind: 14.8, code: 1, time: '2026-10-23' });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchWeather();
    return () => {
      cancelled = true;
    };
  }, []);

  const getWeatherDesc = (code: number) => {
    if (code === 0) return 'Clear Sky';
    if (code <= 3) return 'Partly Cloudy';
    if (code <= 48) return 'Foggy';
    if (code <= 67) return 'Rain / Drizzle';
    if (code <= 77) return 'Snow Flurries';
    if (code <= 82) return 'Showers';
    return 'Overcast';
  };

  if (loading) {
    return <p className="text-[11px] font-mono text-indigo-400 animate-pulse">probing live satellite telemetry (api.open-meteo.com)...</p>;
  }

  return (
    <div className="space-y-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
      <p className="font-bold text-indigo-500">Live Weather: Paris, France (Open-Meteo Public API)</p>
      <div className="rounded-lg bg-slate-100 p-2.5 dark:bg-white/5 space-y-1">
        <p className="text-emerald-500 font-semibold">Conditions: {getWeatherDesc(data?.code ?? 1)}</p>
        <p>Temperature: <span className="text-amber-500 font-bold">{data?.temp}&deg;C</span> (feels like {(data?.temp ? data.temp + 0.8 : 16).toFixed(1)}&deg;C)</p>
        <p>Wind Speed: {data?.wind} km/h (WNW)</p>
        <p className="text-[10px] text-slate-400">Coordinates: 48.8566 N, 2.3522 E &bull; Elevation: 35m &bull; HTTP/2 200 OK</p>
      </div>
    </div>
  );
}

function LiveJokeOutput() {
  const [joke, setJoke] = useState<{ setup: string; punchline: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchJoke = async () => {
      try {
        const res = await fetch('https://official-joke-api.appspot.com/random_joke', { cache: 'no-store' });
        if (!res.ok) throw new Error('err');
        const json = await res.json();
        if (!cancelled && json.setup) {
          setJoke({ setup: json.setup, punchline: json.punchline });
        }
      } catch {
        if (!cancelled) {
          setJoke({
            setup: 'Why do programmers prefer dark mode?',
            punchline: 'Because light attracts bugs.',
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchJoke();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <p className="text-[11px] font-mono text-indigo-400 animate-pulse">querying comedy server API (official-joke-api)...</p>;
  }

  return (
    <div className="space-y-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
      <p className="text-slate-400 text-[10px]">[public API: official-joke-api.appspot.com]</p>
      <p className="font-semibold text-slate-900 dark:text-white">&quot;{joke?.setup}&quot;</p>
      <p className="text-emerald-500 font-bold">&gt;&gt; {joke?.punchline}</p>
    </div>
  );
}

function LiveQuoteOutput() {
  const [quote, setQuote] = useState<{ quote: string; author: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchQuote = async () => {
      try {
        const res = await fetch('https://dummyjson.com/quotes/random', { cache: 'no-store' });
        if (!res.ok) throw new Error('err');
        const json = await res.json();
        if (!cancelled && json.quote) {
          setQuote({ quote: json.quote, author: json.author });
        }
      } catch {
        if (!cancelled) {
          setQuote({
            quote: 'Simplicity is prerequisite for reliability.',
            author: 'Edsger W. Dijkstra',
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchQuote();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <p className="text-[11px] font-mono text-indigo-400 animate-pulse">fetching quote from dummyjson public API...</p>;
  }

  return (
    <div className="space-y-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
      <p className="text-slate-400 text-[10px]">[public API: dummyjson.com/quotes]</p>
      <p className="italic text-slate-900 dark:text-white">&quot;{quote?.quote}&quot;</p>
      <p className="text-indigo-400 font-semibold">&mdash; {quote?.author}</p>
    </div>
  );
}

function LiveIpOutput() {
  const [ip, setIp] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchIp = async () => {
      try {
        const res = await fetch('https://api.ipify.org?format=json', { cache: 'no-store' });
        if (!res.ok) throw new Error('err');
        const json = await res.json();
        if (!cancelled && json.ip) {
          setIp(json.ip);
        }
      } catch {
        if (!cancelled) setIp('163.5.3.139');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchIp();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <p className="text-[11px] font-mono text-indigo-400 animate-pulse">resolving visitor public IP via api.ipify.org...</p>;
  }

  return (
    <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
      <p className="text-slate-400 text-[10px]">[public API: api.ipify.org]</p>
      <p>Visitor Public IP: <span className="text-emerald-500 font-bold">{ip}</span></p>
      <p>Edge Route: Anycast &bull; Port: 443 HTTPS &bull; Location: Paris Region</p>
    </div>
  );
}

function LiveCryptoOutput() {
  const [prices, setPrices] = useState<{ btc: string; eth: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchPrices = async () => {
      try {
        const [btcRes, ethRes] = await Promise.all([
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT', { cache: 'no-store' }),
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT', { cache: 'no-store' }),
        ]);
        const btcData = await btcRes.json();
        const ethData = await ethRes.json();
        if (!cancelled && btcData.price) {
          setPrices({
            btc: parseFloat(btcData.price).toLocaleString('en-US', { minimumFractionDigits: 2 }),
            eth: parseFloat(ethData.price).toLocaleString('en-US', { minimumFractionDigits: 2 }),
          });
        }
      } catch {
        if (!cancelled) setPrices({ btc: '81,458.00', eth: '2,642.00' });
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchPrices();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <p className="text-[11px] font-mono text-indigo-400 animate-pulse">querying real-time market tickers via binance public API...</p>;
  }

  return (
    <div className="space-y-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
      <p className="text-slate-400 text-[10px]">[public API: api.binance.com/api/v3/ticker]</p>
      <div className="flex flex-wrap gap-4 pt-0.5">
        <p>BTC/USDT: <span className="text-amber-500 font-bold">${prices?.btc}</span></p>
        <p>ETH/USDT: <span className="text-indigo-400 font-bold">${prices?.eth}</span></p>
      </div>
    </div>
  );
}

function LiveCurlOutput({ url }: { url: string }) {
  const [result, setResult] = useState<{ status: number; text: string; error?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    fetch(url, { signal: controller.signal })
      .then(async (res) => {
        const text = await res.text();
        if (!cancelled) {
          setResult({ status: res.status, text: text.slice(0, 1200) });
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setResult({
            status: 0,
            text: '',
            error:
              err.name === 'AbortError'
                ? 'Request timed out after 3.5s'
                : 'CORS restricted or host unreachable directly in browser context',
          });
          setLoading(false);
        }
      })
      .finally(() => clearTimeout(timeout));

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [url]);

  if (loading) {
    return <p className="text-[11px] font-mono text-indigo-400 animate-pulse">HTTP/2 GET {url}...</p>;
  }

  if (result?.error) {
    return (
      <div className="space-y-0.5 font-mono text-[11px]">
        <p className="text-slate-400">curl: connecting to {url}</p>
        <p className="text-rose-400">{result.error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
      <p className="text-slate-400">HTTP/2 {result?.status} OK</p>
      <pre className="p-2 rounded bg-slate-100 dark:bg-white/5 overflow-x-auto text-[10px] whitespace-pre-wrap select-text">
        {result?.text}
      </pre>
    </div>
  );
}

const PROJECT_KEYS = [
  'doctor-iq',
  'brackets-genie',
  'vif',
  'vif-food-solidarity',
  'ledgeroo',
  'ledgeroo-fintech',
  'trinity',
  'trinity-suite',
  'time-manager',
];

function renderProjectExecution(projKey: string, executeCmd: (c: string) => void): React.ReactNode {
  switch (projKey) {
    case 'doctor-iq':
      return (
        <div className="space-y-1.5 font-mono text-[11px] select-text">
          <div className="flex flex-wrap items-center justify-between gap-1 border-b border-slate-200/60 pb-1 dark:border-white/10">
            <span className="font-bold text-emerald-500">[DoctorIQ v2.4.0 — Medical AI OCR &amp; Clinical Analytics]</span>
            <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">STATUS: RUNNING</span>
          </div>
          <div className="space-y-0.5 text-slate-700 dark:text-slate-300">
            <p className="text-slate-500 dark:text-slate-400">&gt; Initializing Python 3.11 FastAPI microservice on 0.0.0.0:8000...</p>
            <p>&gt; Loading Tesseract OCR 5.3 + morphological denoiser... <span className="text-emerald-500 font-bold">[OK]</span></p>
            <p>&gt; Connecting to MedGemma-7B LLM engine (Ollama/vLLM backend)... <span className="text-emerald-500 font-bold">[CONNECTED]</span></p>
            <p>&gt; Running test prescription extraction on mock batch #4102... <span className="text-emerald-500 font-bold">[99.4% ACCURACY]</span></p>
            <p className="text-indigo-500 dark:text-indigo-400 font-semibold pt-0.5">
              Live API Gateway active: <span className="underline">http://localhost:8000/docs</span>
            </p>
          </div>
          <div className="rounded bg-slate-900/90 p-2 text-slate-200 text-[10px] space-y-0.5 border border-slate-800">
            <p className="text-slate-400"># Sample extraction payload:</p>
            <p className="text-emerald-400">&#123; &quot;patient_id&quot;: &quot;PX-9042&quot;, &quot;diagnosis&quot;: &quot;Acute Bronchitis&quot;, &quot;dosage_mg&quot;: 500, &quot;validated&quot;: true &#125;</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px] text-slate-400">
            <span>Inspect:</span>
            <button
              type="button"
              onClick={() => executeCmd('curl http://localhost:8000/health')}
              className="text-indigo-400 hover:underline"
            >
              curl http://localhost:8000/health
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => executeCmd('docker ps')}
              className="text-indigo-400 hover:underline"
            >
              docker ps
            </button>
          </div>
        </div>
      );

    case 'brackets-genie':
      return (
        <div className="space-y-1.5 font-mono text-[11px] select-text">
          <div className="flex flex-wrap items-center justify-between gap-1 border-b border-slate-200/60 pb-1 dark:border-white/10">
            <span className="font-bold text-emerald-500">[Brackets Genie — Autonomous LangGraph Multi-Agent Cluster]</span>
            <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">STATUS: STREAMING</span>
          </div>
          <div className="space-y-0.5 text-slate-700 dark:text-slate-300">
            <p className="text-slate-500 dark:text-slate-400">&gt; Starting LangGraph Node.js/TypeScript orchestration pipeline...</p>
            <p>&gt; Initializing agent topology: Router -&gt; Researcher -&gt; Architect -&gt; CodeGen -&gt; Tester... <span className="text-emerald-500 font-bold">[OK]</span></p>
            <p>&gt; Groq Llama-3.3-70B ultra-low latency mesh established (fallback: Claude 3.5 Sonnet)... <span className="text-emerald-500 font-bold">[ONLINE]</span></p>
            <p>&gt; WebSocket SSE channel listening at port 4000: <span className="text-emerald-500 font-bold">120 tokens/sec throughput</span></p>
          </div>
          <div className="rounded bg-slate-900/90 p-2 text-slate-200 text-[10px] space-y-0.5 border border-slate-800">
            <p className="text-slate-400"># Multi-agent consensus:</p>
            <p className="text-indigo-300">Agent-Researcher: Architecture graph compiled in 42ms with 0 cyclomatic bottlenecks.</p>
          </div>
          <p className="text-[10px] text-slate-400">Multi-agent loop active. Type &apos;status&apos; or inspect with &apos;docker ps&apos;.</p>
        </div>
      );

    case 'vif':
    case 'vif-food-solidarity':
      return (
        <div className="space-y-1.5 font-mono text-[11px] select-text">
          <div className="flex flex-wrap items-center justify-between gap-1 border-b border-slate-200/60 pb-1 dark:border-white/10">
            <span className="font-bold text-emerald-500">[VIF — Food Solidarity Logistics &amp; Volunteer Management Platform]</span>
            <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">STATUS: DEPLOYED</span>
          </div>
          <div className="space-y-0.5 text-slate-700 dark:text-slate-300">
            <p className="text-slate-500 dark:text-slate-400">&gt; Booting Django REST Framework + PostgreSQL 16 on port 8080...</p>
            <p>&gt; Celery distributed task queue active with 6 worker pools... <span className="text-emerald-500 font-bold">[READY]</span></p>
            <p>&gt; Live route optimization: 14 volunteer delivery circuits active across Paris... <span className="text-emerald-500 font-bold">[SYNCED]</span></p>
            <p>&gt; Meals dispatched today: <span className="text-emerald-500 font-bold">350+ hot meals</span> delivered to emergency shelters</p>
          </div>
          <div className="rounded bg-slate-900/90 p-2 text-slate-200 text-[10px] border border-slate-800">
            <p className="text-slate-400"># Logistics health metrics:</p>
            <p className="text-emerald-400">Lead Time: &lt; 25 mins • Inventory waste: 0.2% • DORA Metric: Elite deployment frequency</p>
          </div>
        </div>
      );

    case 'ledgeroo':
    case 'ledgeroo-fintech':
      return (
        <div className="space-y-1.5 font-mono text-[11px] select-text">
          <div className="flex flex-wrap items-center justify-between gap-1 border-b border-slate-200/60 pb-1 dark:border-white/10">
            <span className="font-bold text-emerald-500">[Ledgeroo FinTech — High-Throughput Ledger &amp; Payment Gateway]</span>
            <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">STATUS: ACTIVE</span>
          </div>
          <div className="space-y-0.5 text-slate-700 dark:text-slate-300">
            <p className="text-slate-500 dark:text-slate-400">&gt; Starting Java 21 / Spring Boot &amp; FastAPI payment orchestrator...</p>
            <p>&gt; Double-entry immutable ledger database ledger_db: <span className="text-emerald-500 font-bold">0 imbalance verified</span></p>
            <p>&gt; Stripe API idempotency webhook filters: <span className="text-emerald-500 font-bold">[ACTIVE]</span></p>
            <p>&gt; Cryptographic audit chain: SHA-256 block hash validation <span className="text-emerald-500 font-bold">[PASSED]</span></p>
            <p className="text-indigo-400 font-semibold pt-0.5">Peak throughput: 1,420 transactions/sec • PCI-DSS Level 1 compliant</p>
          </div>
        </div>
      );

    case 'trinity':
    case 'trinity-suite':
      return (
        <div className="space-y-1.5 font-mono text-[11px] select-text">
          <div className="flex flex-wrap items-center justify-between gap-1 border-b border-slate-200/60 pb-1 dark:border-white/10">
            <span className="font-bold text-emerald-500">[Trinity Suite — Enterprise Internal Software Factory &amp; CI/CD]</span>
            <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">STATUS: GREEN</span>
          </div>
          <div className="space-y-0.5 text-slate-700 dark:text-slate-300">
            <p className="text-slate-500 dark:text-slate-400">&gt; Connecting GitLab CI runner daemon to European cloud cluster...</p>
            <p>&gt; SonarQube quality gate: <span className="text-emerald-500 font-bold">0 blocker bugs, 0 vulnerabilities, 94.2% test coverage</span></p>
            <p>&gt; Automated container build farm: 18 microservice pipelines synced</p>
            <p>&gt; Deployment latency: reduced by 40% with multi-stage Docker cache</p>
          </div>
        </div>
      );

    case 'time-manager':
      return (
        <div className="space-y-1.5 font-mono text-[11px] select-text">
          <div className="flex flex-wrap items-center justify-between gap-1 border-b border-slate-200/60 pb-1 dark:border-white/10">
            <span className="font-bold text-emerald-500">[Time Manager — Distributed Workforce Scheduling &amp; Analytics]</span>
            <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">STATUS: RUNNING</span>
          </div>
          <div className="space-y-0.5 text-slate-700 dark:text-slate-300">
            <p className="text-slate-500 dark:text-slate-400">&gt; Starting Elixir 1.15 OTP system on BEAM VM (8 parallel schedulers)...</p>
            <p>&gt; Phoenix 1.7 WebSocket channels connected to Vue 3 frontend... <span className="text-emerald-500 font-bold">[OK]</span></p>
            <p>&gt; Ecto PostgreSQL connection pool latency: <span className="text-emerald-500 font-bold">&lt; 0.4ms</span></p>
            <p>&gt; Real-time clock-in / clock-out events broadcasting to dashboard</p>
            <p className="text-indigo-400 font-semibold pt-0.5">Listening at http://localhost:4000 (LiveView + REST endpoints)</p>
          </div>
        </div>
      );

    default:
      return null;
  }
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
  const [virtualDirs, setVirtualDirs] = useState<string[]>(['projects']);

  const [activeEditor, setActiveEditor] = useState<'vim' | 'nano' | 'emacs' | null>(null);
  const [editorFile, setEditorFile] = useState<string>('');
  const [editorBuffer, setEditorBuffer] = useState<string>('');
  const [vimMode, setVimMode] = useState<'NORMAL' | 'INSERT'>('NORMAL');
  const [editorStatusMsg, setEditorStatusMsg] = useState<string>('');
  const editorTextareaRef = useRef<HTMLTextAreaElement>(null);

  const saveEditorToFile = (explicitName?: string) => {
    const rawTarget = (explicitName ?? editorFile).trim() || 'untitled.txt';
    const target = resolveVirtualPath(rawTarget, currentDir);
    setVirtualFiles((prev) => ({ ...prev, [target]: editorBuffer }));
    if (target.includes('/')) {
      const segs = target.split('/');
      segs.pop();
      let cur = '';
      const dirsToAdd: string[] = [];
      for (const s of segs) {
        cur = cur ? `${cur}/${s}` : s;
        dirsToAdd.push(cur);
      }
      setVirtualDirs((prev) => Array.from(new Set([...prev, ...dirsToAdd])));
    }
    return target;
  };

  const closeEditor = (save: boolean) => {
    const now = new Date().toLocaleTimeString('en-GB', { hour12: false });
    const lines = editorBuffer.split('\n').length;
    const bytes = editorBuffer.length;

    let targetFile = editorFile.trim() || 'untitled.txt';
    if (save) {
      targetFile = saveEditorToFile();
    }

    const editorName = activeEditor === 'vim' ? 'vim' : activeEditor === 'nano' ? 'nano' : 'emacs';
    const exitMsg = save
      ? `[${editorName}] "${targetFile}" ${lines}L, ${bytes}B written to virtual filesystem.`
      : `[${editorName}] Buffer closed. Changes discarded.`;

    setHistory((prev) => [
      ...prev.slice(-80),
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

    // Command chaining with && or ;
    if (raw.includes('&&')) {
      const subCmds = raw.split('&&').map((s) => s.trim()).filter(Boolean);
      for (const sub of subCmds) {
        executeCommand(sub);
      }
      return;
    }
    if (raw.includes(';') && !raw.includes('&')) {
      const subCmds = raw.split(';').map((s) => s.trim()).filter(Boolean);
      for (const sub of subCmds) {
        executeCommand(sub);
      }
      return;
    }

    setCommandHistoryList((prev) => [...prev.slice(-80), raw]);
    setHistoryIndex(null);
    const now = new Date().toLocaleTimeString('en-GB', { hour12: false });

    // Output redirection: e.g. echo "text" > file.txt, date >> file.log, cat a > b
    const redirMatch = raw.match(/^(.*?)\s*(>>|>)\s*([a-zA-Z0-9_\-./]+)$/);
    if (redirMatch) {
      const leftCmd = redirMatch[1].trim();
      const operator = redirMatch[2];
      const rawTarget = redirMatch[3].replace(/^\.\//, '');
      const targetFile = resolveVirtualPath(rawTarget, currentDir);

      if (targetFile) {
        let contentToWrite = '';
        const leftParts = leftCmd.split(/\s+/);
        const leftBase = leftParts[0].toLowerCase();

        if (leftBase === 'echo') {
          const echoRaw = leftCmd.substring(4).trim();
          if (echoRaw === '$user' || echoRaw === '$USER') contentToWrite = 'moiz';
          else if (echoRaw === '$location' || echoRaw === '$LOCATION') contentToWrite = 'Paris, France';
          else if (echoRaw === '$status' || echoRaw === '$STATUS') contentToWrite = 'Ready for CDI / Hybrid / Remote';
          else if (echoRaw === '$shell' || echoRaw === '$SHELL') contentToWrite = '/bin/bash';
          else contentToWrite = echoRaw.replace(/^["']|["']$/g, '');
        } else if (leftBase === 'date') {
          contentToWrite = new Date().toLocaleString('en-GB', { timeZone: 'Europe/Paris' });
        } else if (leftBase === 'cat') {
          const rawSrc = (leftParts[1] || '').replace(/^\.\//, '');
          const srcFile = resolveVirtualPath(rawSrc, currentDir);
          contentToWrite = virtualFiles[srcFile] ?? '';
        } else if (leftBase === 'pwd') {
          contentToWrite = `/home/moiz${currentDir.replace('~', '')}`;
        } else if (leftBase === 'whoami') {
          contentToWrite = 'moiz (Muhammad Abdul Moiz — Full-Stack, DevOps & AI Engineer)';
        } else {
          contentToWrite = `[output of ${leftCmd}]`;
        }

        setVirtualFiles((prev) => {
          const existing = prev[targetFile] || '';
          const finalContent =
            operator === '>>'
              ? existing
                ? `${existing}\n${contentToWrite}`
                : contentToWrite
              : contentToWrite;
          return { ...prev, [targetFile]: finalContent };
        });

        if (targetFile.includes('/')) {
          const segs = targetFile.split('/');
          segs.pop();
          let cur = '';
          const dirsToAdd: string[] = [];
          for (const s of segs) {
            cur = cur ? `${cur}/${s}` : s;
            dirsToAdd.push(cur);
          }
          setVirtualDirs((prev) => Array.from(new Set([...prev, ...dirsToAdd])));
        }

        setHistory((prev) => [
          ...prev.slice(-80),
          {
            command: raw,
            output: (
              <p className="text-[11px] font-mono text-emerald-500">
                [{operator}] &apos;{targetFile}&apos; updated ({contentToWrite.length} bytes written) [OK]
              </p>
            ),
            time: now,
            dir: currentDir,
          },
        ]);
        setInputVal('');
        return;
      }
    }

    // Unix Pipe simulation: e.g. cat README.md | grep DevOps, ls | grep .md, cat README.md | wc
    if (raw.includes('|')) {
      const pipeParts = raw.split('|').map((s) => s.trim()).filter(Boolean);
      if (pipeParts.length === 2) {
        const leftCmd = pipeParts[0];
        const rightCmd = pipeParts[1];
        const rightTokens = rightCmd.split(/\s+/);
        const rightBase = rightTokens[0].toLowerCase();
        const rightArg1 = rightTokens[1] ? rightTokens[1].toLowerCase() : '';
        const cleanPattern = rightArg1.replace(/^["']|["']$/g, '');

        let sourceLines: string[] = [];
        const leftTokens = leftCmd.split(/\s+/);
        const leftBase = leftTokens[0].toLowerCase();

        if (leftBase === 'cat') {
          const src = (leftTokens[1] || '').replace(/^\.\//, '');
          if (virtualFiles[src] !== undefined) {
            sourceLines = virtualFiles[src].split('\n');
          }
        } else if (leftBase === 'ls') {
          sourceLines = [...Object.keys(virtualFiles), ...virtualDirs.map((d) => `${d}/`)];
        } else if (leftBase === 'history') {
          sourceLines = commandHistoryList.map((c, i) => `${i + 1}  ${c}`);
        } else if (leftBase === 'ps') {
          sourceLines = [
            'root         1  0.0  0.1 /sbin/init',
            'moiz       742  0.2  1.4 /usr/bin/dockerd',
            'moiz      1420  0.8  3.2 python3 main:app (DoctorIQ)',
            'moiz      1580  0.5  2.1 node server.js (Brackets Genie)',
            'moiz      2100  0.4  2.8 next-server (Portfolio)',
          ];
        } else if (leftBase === 'echo') {
          sourceLines = [leftCmd.substring(4).trim().replace(/^["']|["']$/g, '')];
        }

        let pipeOutput: React.ReactNode = null;
        if (rightBase === 'grep' && cleanPattern) {
          const filtered = sourceLines.filter((l) => l.toLowerCase().includes(cleanPattern.toLowerCase()));
          pipeOutput = (
            <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              {filtered.length > 0 ? (
                filtered.map((line, idx) => (
                  <p key={idx} className="text-emerald-500">
                    {line}
                  </p>
                ))
              ) : (
                <p className="text-slate-400">grep: pattern &apos;{cleanPattern}&apos; not found in piped stream</p>
              )}
            </div>
          );
        } else if (rightBase === 'wc') {
          const totalLines = sourceLines.length;
          const totalWords = sourceLines.join(' ').trim().split(/\s+/).filter(Boolean).length;
          const totalBytes = sourceLines.join('\n').length;
          pipeOutput = (
            <p className="text-[11px] font-mono text-slate-700 dark:text-slate-300">
              {totalLines} {totalWords} {totalBytes}
            </p>
          );
        } else if (rightBase === 'head') {
          pipeOutput = (
            <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              {sourceLines.slice(0, 6).map((l, i) => (
                <p key={i}>{l}</p>
              ))}
            </div>
          );
        } else if (rightBase === 'tail') {
          pipeOutput = (
            <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              {sourceLines.slice(-6).map((l, i) => (
                <p key={i}>{l}</p>
              ))}
            </div>
          );
        }

        if (pipeOutput) {
          setHistory((prev) => [
            ...prev.slice(-80),
            { command: raw, output: pipeOutput, time: now, dir: currentDir },
          ]);
          setInputVal('');
          return;
        }
      }
    }

    // 1. Alias Resolution from ~/.bashrc
    const activeAliases = parseBashrcAliases(virtualFiles['.bashrc'] || '');
    let resolvedCmd = raw;
    const rawTokens = raw.split(/\s+/);
    const initialCmd = rawTokens[0];
    const initialArgs = raw.substring(initialCmd.length).trim();

    if (activeAliases[initialCmd] && initialCmd !== 'alias' && initialCmd !== 'unalias') {
      resolvedCmd = initialArgs
        ? `${activeAliases[initialCmd]} ${initialArgs}`
        : activeAliases[initialCmd];
    }

    const parts = resolvedCmd.split(/\s+/);
    const base = parts[0].toLowerCase();
    const arg1 = parts[1] ? parts[1].toLowerCase() : '';
    const arg2 = parts[2] ? parts[2].toLowerCase() : '';
    const arg3 = parts[3] ? parts[3].toLowerCase() : '';
    const fullArg = parts.slice(1).join(' ');

    let output: React.ReactNode = null;

    // Check for project or script execution: e.g. ./doctor-iq, ./vif, doctor-iq in projects, python ./doctor-iq
    const isExplicitExec = base.startsWith('./') || base.startsWith('projects/');
    const isProjInDir = currentDir === '~/projects' && PROJECT_KEYS.includes(base);
    const isInterpreterExec = ['python', 'node', 'sh', 'bash'].includes(base) && Boolean(arg1);

    if (isExplicitExec || isProjInDir || isInterpreterExec) {
      const cleanTarget = (
        base.startsWith('./')
          ? base.slice(2)
          : base.startsWith('projects/')
          ? base.slice(9)
          : isInterpreterExec
          ? arg1.replace(/^\.\//, '')
          : base
      ).toLowerCase();

      if (PROJECT_KEYS.includes(cleanTarget)) {
        output = renderProjectExecution(cleanTarget, executeCommand);
      } else if (virtualFiles[cleanTarget] !== undefined) {
        output = (
          <div className="space-y-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
            <p className="text-emerald-500 font-bold">[exec] {cleanTarget}: script execution initiated ({virtualFiles[cleanTarget].length} bytes)</p>
            <pre className="p-2 rounded bg-slate-100 dark:bg-white/5 overflow-x-auto text-[10px] text-slate-600 dark:text-slate-300 select-text">
              {virtualFiles[cleanTarget]}
            </pre>
          </div>
        );
      } else if (isExplicitExec) {
        output = <p className="text-[11px] font-mono text-rose-500">bash: ./{cleanTarget}: No such file or directory</p>;
      }
    }

    if (!output) {
      switch (base) {
        case 'help':
          output = (
            <div className="space-y-2 text-[11px]">
              <p className="font-semibold text-slate-500 dark:text-slate-400">Core Commands &amp; Navigation:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 pt-0.5 font-mono">
                <div><span className="font-bold text-indigo-500">ls [-la] / ll</span> — list files &amp; details</div>
                <div><span className="font-bold text-indigo-500">cat &lt;file&gt;</span> — view file contents</div>
                <div><span className="font-bold text-indigo-500">tree</span> — dynamic filesystem tree</div>
                <div><span className="font-bold text-indigo-500">cd &lt;dir&gt;</span> — navigate (~, projects)</div>
                <div><span className="font-bold text-indigo-500">nano / vim / emacs</span> — open text editor</div>
                <div><span className="font-bold text-indigo-500">./&lt;project&gt;</span> — run interactive project demo</div>
                <div><span className="font-bold text-indigo-500">docker ps</span> — inspect running containers</div>
                <div><span className="font-bold text-indigo-500">ping &lt;host&gt;</span> — real network latency probe</div>
                <div><span className="font-bold text-indigo-500">whoami / skills</span> — bio, stack &amp; capabilities</div>
                <div><span className="font-bold text-indigo-500">email / contact</span> — email, phone, location &amp; info</div>
                <div><span className="font-bold text-indigo-500">weather / crypto</span> — live satellite &amp; market APIs</div>
                <div><span className="font-bold text-indigo-500">day / dark</span> — toggle day / night mode</div>
                <div><span className="font-bold text-indigo-500">clear</span> — clear the console</div>
              </div>
              <p className="text-[10px] text-slate-400 pt-1.5 border-t border-slate-200/50 dark:border-white/5">
                Power tools &amp; APIs: <span className="text-slate-500 dark:text-slate-400">mkdir, touch, rm, curl, ip, joke, quote, alias, cp, mv, grep, bc, cal, df, du, git, top, man</span>
              </p>
            </div>
          );
          break;

        case 'alias': {
          const currentBashrc = virtualFiles['.bashrc'] || '';
          const aliases = parseBashrcAliases(currentBashrc);
          if (!arg1) {
            output = (
              <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                {Object.keys(aliases).length > 0 ? (
                  Object.entries(aliases).map(([name, val]) => (
                    <p key={name} className="text-emerald-500">
                      alias {name}=&apos;{val}&apos;
                    </p>
                  ))
                ) : (
                  <p className="text-slate-400">No aliases defined in ~/.bashrc</p>
                )}
              </div>
            );
          } else {
            const match = fullArg.match(/^([a-zA-Z0-9_\-.:]+)=['"]?([^'"]+)['"]?$/);
            if (match) {
              const aliasKey = match[1];
              const aliasVal = match[2].trim();
              setVirtualFiles((prev) => {
                const current = prev['.bashrc'] || '';
                const regex = new RegExp(`^alias\\s+${aliasKey}=.*$`, 'm');
                const newLine = `alias ${aliasKey}='${aliasVal}'`;
                const updated = regex.test(current)
                  ? current.replace(regex, newLine)
                  : `${current}\n${newLine}`;
                return { ...prev, ['.bashrc']: updated };
              });
              output = (
                <p className="text-[11px] font-mono text-emerald-500">
                  alias: &apos;{aliasKey}&apos; registered as &apos;{aliasVal}&apos; in ~/.bashrc [OK]
                </p>
              );
            } else {
              output = <p className="text-[11px] font-mono text-amber-500">usage: alias [name=&apos;command&apos;]</p>;
            }
          }
          break;
        }

        case 'unalias': {
          if (!arg1) {
            output = <p className="text-[11px] font-mono text-amber-500">usage: unalias &lt;name&gt;</p>;
          } else {
            setVirtualFiles((prev) => {
              const current = prev['.bashrc'] || '';
              const regex = new RegExp(`^alias\\s+${arg1}=.*$\n?`, 'm');
              return { ...prev, ['.bashrc']: current.replace(regex, '') };
            });
            output = <p className="text-[11px] font-mono text-slate-400">unalias: removed &apos;{arg1}&apos; from ~/.bashrc</p>;
          }
          break;
        }

        case 'll':
        case 'ls': {
          const isLong = base === 'll' || parts.some((p) => /^-.*l/.test(p));
          const isAll = parts.some((p) => /^-.*a/.test(p));

          if (currentDir === '~/projects' || arg1 === 'projects' || arg1 === 'projects/') {
            const projectItems = [
              { name: 'doctor-iq', size: '8.4M', date: 'Oct 23 12:00', desc: 'FastAPI + MedGemma OCR Pipeline' },
              { name: 'brackets-genie', size: '4.2M', date: 'Oct 23 12:00', desc: 'LangGraph Multi-Agent Cluster' },
              { name: 'vif-food-solidarity', size: '12M', date: 'Oct 23 12:00', desc: 'Django REST + Logistics Platform' },
              { name: 'ledgeroo-fintech', size: '6.1M', date: 'Oct 23 12:00', desc: 'Payment Gateway + Double-Entry Ledger' },
              { name: 'trinity-suite', size: '5.8M', date: 'Oct 23 12:00', desc: 'Enterprise CI/CD Factory' },
              { name: 'time-manager', size: '3.9M', date: 'Oct 23 12:00', desc: 'Elixir Phoenix + Vue 3 Realtime' },
            ];

            output = (
              <div className="space-y-1 text-[11px] overflow-x-auto">
                {isLong ? (
                  <div className="font-mono text-slate-600 dark:text-slate-300 space-y-0.5">
                    <p className="text-slate-400">total 40</p>
                    {isAll && (
                      <>
                        <p>drwxr-xr-x 8 moiz staff 256 Oct 23 12:00 <span className="text-indigo-400 font-bold">.</span></p>
                        <p>drwxr-xr-x 5 root staff 160 Oct 23 12:00 <span className="text-indigo-400 font-bold cursor-pointer hover:underline" onClick={() => executeCommand('cd ~')}>..</span></p>
                      </>
                    )}
                    {projectItems.map((p) => (
                      <p key={p.name}>
                        -rwxr-xr-x 1 moiz staff {p.size.padStart(5, ' ')} {p.date}{' '}
                        <span
                          className="font-semibold text-emerald-500 cursor-pointer hover:underline"
                          onClick={() => executeCommand(`./${p.name}`)}
                          title="Click to execute"
                        >
                          {p.name}*
                        </span>{' '}
                        <span className="text-[10px] text-slate-400">({p.desc})</span>
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono">
                    {projectItems.map((p) => (
                      <span
                        key={p.name}
                        className="text-emerald-500 font-semibold cursor-pointer hover:underline"
                        onClick={() => executeCommand(`./${p.name}`)}
                        title="Click to execute demo"
                      >
                        {p.name}*
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          } else if (currentDir !== '~') {
            const curDirName = currentDir.replace('~/', '');
            const prefix = `${curDirName}/`;
            const dirFiles = Object.keys(virtualFiles).filter((f) => {
              if (!f.startsWith(prefix)) return false;
              const rest = f.slice(prefix.length);
              if (rest.startsWith('.') && !isAll) return false;
              return !rest.includes('/');
            });
            const dirSubs = virtualDirs.filter((d) => {
              if (!d.startsWith(prefix)) return false;
              const rest = d.slice(prefix.length);
              return !rest.includes('/');
            });

            if (isLong) {
              output = (
                <div className="space-y-1 text-[11px] font-mono text-slate-600 dark:text-slate-300 overflow-x-auto">
                  <p className="text-slate-400">total {(dirFiles.length + dirSubs.length) * 4}</p>
                  {isAll && (
                    <>
                      <p>drwxr-xr-x 4 moiz staff 128 Oct 23 14:00 <span className="text-indigo-400 font-bold">.</span></p>
                      <p>drwxr-xr-x 8 root staff 256 Oct 23 14:00 <span className="text-indigo-400 font-bold cursor-pointer hover:underline" onClick={() => executeCommand('cd ..')}>..</span></p>
                    </>
                  )}
                  {dirFiles.map((fullF) => {
                    const fname = fullF.slice(prefix.length);
                    const content = virtualFiles[fullF] || '';
                    const bytes = content.length;
                    return (
                      <p key={fname}>
                        -rw-r--r-- 1 moiz staff {bytes.toString().padStart(5, ' ')} Oct 23 14:00{' '}
                        <span
                          className="cursor-pointer hover:underline text-slate-900 dark:text-white"
                          onClick={() => executeCommand(`cat ${fname}`)}
                        >
                          {fname}
                        </span>
                      </p>
                    );
                  })}
                  {dirSubs.map((fullD) => {
                    const dname = fullD.slice(prefix.length);
                    return (
                      <p key={dname}>
                        drwxr-xr-x 2 moiz staff  64 Oct 23 14:00{' '}
                        <span
                          className="text-indigo-500 font-bold cursor-pointer hover:underline"
                          onClick={() => executeCommand(`cd ${dname}`)}
                        >
                          {dname}/
                        </span>
                      </p>
                    );
                  })}
                  {dirFiles.length === 0 && dirSubs.length === 0 && (
                    <p className="text-slate-500 italic">[empty directory: /home/moiz/{curDirName}]</p>
                  )}
                </div>
              );
            } else {
              output = (
                <div className="space-y-1 text-[11px]">
                  {dirFiles.length > 0 || dirSubs.length > 0 ? (
                    <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono">
                      {dirFiles.map((fullF) => {
                        const fname = fullF.slice(prefix.length);
                        return (
                          <span
                            key={fname}
                            className="cursor-pointer hover:underline text-slate-900 dark:text-white font-mono"
                            onClick={() => executeCommand(`cat ${fname}`)}
                          >
                            {fname}
                          </span>
                        );
                      })}
                      {dirSubs.map((fullD) => {
                        const dname = fullD.slice(prefix.length);
                        return (
                          <span
                            key={dname}
                            className="text-indigo-500 font-bold cursor-pointer hover:underline font-mono"
                            onClick={() => executeCommand(`cd ${dname}`)}
                          >
                            {dname}/
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-slate-500 italic font-mono">[empty directory: /home/moiz/{curDirName}]</p>
                  )}
                  <p className="text-[10px] text-slate-400 pt-0.5">Tip: use &apos;touch &lt;file&gt;&apos;, &apos;nano &lt;file&gt;&apos;, or &apos;cd ..&apos;</p>
                </div>
              );
            }
          } else {
            const files = Object.keys(virtualFiles).filter((f) => {
              if (f.includes('/')) return false;
              if (f.startsWith('.') && !isAll) return false;
              return true;
            });
            const rootDirs = virtualDirs.filter((d) => !d.includes('/'));

            if (isLong) {
              output = (
                <div className="space-y-1 text-[11px] font-mono text-slate-600 dark:text-slate-300 overflow-x-auto">
                  <p className="text-slate-400">total {(files.length + rootDirs.length) * 4}</p>
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
                  {rootDirs.map((dname) => (
                    <p key={dname}>
                      drwxr-xr-x 6 moiz staff  192 Oct 23 14:00{' '}
                      <span
                        className="text-indigo-500 font-bold cursor-pointer hover:underline"
                        onClick={() => executeCommand(`cd ${dname}`)}
                      >
                        {dname}/
                      </span>
                    </p>
                  ))}
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
                    {rootDirs.map((dname) => (
                      <span
                        key={dname}
                        className="text-indigo-500 font-bold cursor-pointer hover:underline"
                        onClick={() => executeCommand(`cd ${dname}`)}
                      >
                        {dname}/
                      </span>
                    ))}
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
          } else if (['doctor-iq', 'brackets-genie', 'vif', 'vif-food-solidarity', 'ledgeroo', 'ledgeroo-fintech', 'trinity', 'trinity-suite', 'time-manager'].includes(target)) {
            output = (
              <div className="space-y-1 text-[11px] font-mono">
                <p className="font-bold text-slate-900 dark:text-white">Project: {target.toUpperCase()}</p>
                <p className="text-slate-600 dark:text-slate-300">
                  Executable binary. Type <span className="text-emerald-400 font-bold cursor-pointer hover:underline" onClick={() => executeCommand(`./${target}`)}>./{target}</span> to run the interactive demo.
                </p>
              </div>
            );
          } else {
            const resolvedPath = resolveVirtualPath(target, currentDir);
            const matchKey = Object.keys(virtualFiles).find(
              (k) => k.toLowerCase() === resolvedPath.toLowerCase() || k.toLowerCase() === target.toLowerCase()
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

        case 'tree': {
          const fileKeys = Object.keys(virtualFiles).filter((f) => !f.startsWith('.') && !f.includes('/'));
          const hiddenKeys = Object.keys(virtualFiles).filter((f) => f.startsWith('.') && !f.includes('/'));
          const showAll = parts.includes('-a');
          const displayedFiles = (showAll ? [...fileKeys, ...hiddenKeys] : fileKeys).sort();
          const projectItems = [
            { name: 'doctor-iq', desc: 'FastAPI + MedGemma OCR Pipeline' },
            { name: 'brackets-genie', desc: 'LangGraph Streaming Multi-Agent' },
            { name: 'vif-food-solidarity', desc: 'Food Logistics & Volunteer System' },
            { name: 'ledgeroo-fintech', desc: 'FinTech Backend + Stripe' },
            { name: 'trinity-suite', desc: 'Enterprise CI/CD Factory' },
            { name: 'time-manager', desc: 'Elixir Phoenix + Vue 3 Realtime' },
          ];
          const customDirs = virtualDirs.filter((d) => d !== 'projects');

          if (currentDir === '~/projects') {
            output = (
              <div className="font-mono text-[11px] space-y-0.5 text-slate-700 dark:text-slate-300">
                <p className="font-bold text-indigo-500">projects/</p>
                {projectItems.map((proj, idx) => (
                  <p key={proj.name}>
                    {idx === projectItems.length - 1 ? '└──' : '├──'}{' '}
                    <span
                      className="text-emerald-500 font-semibold cursor-pointer hover:underline"
                      onClick={() => executeCommand(`./${proj.name}`)}
                    >
                      {proj.name}*
                    </span>{' '}
                    <span className="text-slate-400 text-[10px]">({proj.desc})</span>
                  </p>
                ))}
                <p className="text-slate-400 pt-1 text-[10px]">1 directory, 6 executable projects</p>
              </div>
            );
          } else {
            output = (
              <div className="font-mono text-[11px] space-y-0.5 text-slate-700 dark:text-slate-300">
                <p className="font-bold text-indigo-500">.</p>
                {displayedFiles.map((fname) => (
                  <p key={fname}>
                    ├──{' '}
                    <span
                      className={`cursor-pointer hover:underline ${fname.startsWith('.') ? 'text-slate-400' : 'text-slate-900 dark:text-white'}`}
                      onClick={() => executeCommand(`cat ${fname}`)}
                    >
                      {fname}
                    </span>{' '}
                    <span className="text-[10px] text-slate-400">({virtualFiles[fname]?.length || 0}B)</span>
                  </p>
                ))}
                {customDirs.map((cdir) => {
                  const cFiles = Object.keys(virtualFiles).filter((f) => f.startsWith(`${cdir}/`));
                  return (
                    <div key={cdir} className="space-y-0.5">
                      <p>
                        ├──{' '}
                        <span
                          className="text-indigo-400 font-bold cursor-pointer hover:underline"
                          onClick={() => executeCommand(`cd ${cdir}`)}
                        >
                          {cdir}/
                        </span>
                      </p>
                      {cFiles.map((cf, cIdx) => (
                        <p key={cf} className="pl-4">
                          {cIdx === cFiles.length - 1 ? '└──' : '├──'}{' '}
                          <span
                            className="cursor-pointer hover:underline text-slate-800 dark:text-slate-200"
                            onClick={() => executeCommand(`cat ${cf}`)}
                          >
                            {cf.slice(cdir.length + 1)}
                          </span>{' '}
                          <span className="text-[10px] text-slate-400">({virtualFiles[cf]?.length || 0}B)</span>
                        </p>
                      ))}
                    </div>
                  );
                })}
                <p>
                  └──{' '}
                  <span
                    className="text-indigo-400 font-bold cursor-pointer hover:underline"
                    onClick={() => executeCommand('cd projects')}
                  >
                    projects/
                  </span>
                </p>
                {projectItems.map((proj, idx) => (
                  <p key={proj.name} className="pl-4">
                    {idx === projectItems.length - 1 ? '└──' : '├──'}{' '}
                    <span
                      className="text-emerald-500 font-semibold cursor-pointer hover:underline"
                      onClick={() => executeCommand(`./${proj.name}`)}
                    >
                      {proj.name}*
                    </span>{' '}
                    <span className="text-slate-400 text-[10px]">({proj.desc})</span>
                  </p>
                ))}
                <p className="text-slate-400 pt-1 text-[10px]">
                  {1 + virtualDirs.length} directories, {Object.keys(virtualFiles).length + projectItems.length} files{' '}
                  {!showAll && '(run tree -a to see dotfiles)'}
                </p>
              </div>
            );
          }
          break;
        }

        case 'cd': {
          const dest = arg1.replace(/\/+$/, '').trim();
          if (!dest || dest === '~' || dest === 'root' || dest === '/home/moiz') {
            setCurrentDir('~');
            output = <p className="text-[11px] text-slate-400">Switched directory to ~</p>;
          } else if (dest === 'projects' || dest === '~/projects' || dest === './projects') {
            setCurrentDir('~/projects');
            output = (
              <p className="text-[11px] text-slate-400">
                Switched directory to ~/projects. Type <span className="text-emerald-400 font-bold cursor-pointer" onClick={() => executeCommand('ls')}>ls</span> to view projects.
              </p>
            );
          } else if (dest === '..' || dest === '../') {
            if (currentDir.startsWith('~/') && currentDir !== '~') {
              const rel = currentDir.replace(/^~\/?/, '');
              if (rel.includes('/')) {
                const parts = rel.split('/');
                parts.pop();
                setCurrentDir(`~/${parts.join('/')}`);
                output = <p className="text-[11px] text-slate-400">Switched directory to ~/{parts.join('/')}</p>;
              } else {
                setCurrentDir('~');
                output = <p className="text-[11px] text-slate-400">Switched directory to ~</p>;
              }
            } else {
              output = <p className="text-[11px] text-slate-400">Already in root home directory (~)</p>;
            }
          } else if (dest === '/') {
            output = <p className="text-[11px] text-amber-500">Access restricted: / is managed by MoizOS kernel.</p>;
          } else {
            const targetDir = resolveVirtualPath(dest, currentDir);
            if (virtualDirs.includes(targetDir)) {
              setCurrentDir(`~/${targetDir}`);
              output = (
                <p className="text-[11px] text-slate-400">
                  Switched directory to ~/{targetDir}. Type <span className="text-emerald-400 font-bold cursor-pointer" onClick={() => executeCommand('ls')}>ls</span> to inspect.
                </p>
              );
            } else {
              output = <p className="text-[11px] text-rose-500">cd: {dest}: No such file or directory</p>;
            }
          }
          break;
        }

      case 'pwd':
        output = (
          <p className="text-[11px] font-mono text-slate-700 dark:text-slate-300">
            /home/moiz{currentDir.replace('~', '')}
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
          output = <p className="text-[11px] font-mono text-emerald-400">/bin/bash</p>;
        } else if (arg1 === '$path') {
          output = <p className="text-[11px] font-mono text-slate-400">/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/home/moiz/.local/bin</p>;
        } else if (arg1 === '$lang') {
          output = <p className="text-[11px] font-mono text-emerald-400">{lang}</p>;
        } else {
          output = <p className="text-[11px] font-mono text-slate-700 dark:text-slate-300">{fullArg.replace(/^["']|["']$/g, '') || ''}</p>;
        }
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
        const rawFile = (arg1 || 'newfile.txt').replace(/^\.\//, '');
        const targetPath = resolveVirtualPath(rawFile, currentDir);
        if (targetPath.includes('/')) {
          const segs = targetPath.split('/');
          segs.pop();
          let cur = '';
          const dirsToAdd: string[] = [];
          for (const s of segs) {
            cur = cur ? `${cur}/${s}` : s;
            dirsToAdd.push(cur);
          }
          setVirtualDirs((prev) => Array.from(new Set([...prev, ...dirsToAdd])));
        }
        setVirtualFiles((prev) => ({ ...prev, [targetPath]: prev[targetPath] ?? '' }));
        const display = targetPath.split('/').pop() || targetPath;
        output = (
          <p className="text-[11px] font-mono text-emerald-500">
            touch: created &apos;{display}&apos; in {currentDir === '~' ? '~' : currentDir} [OK]
          </p>
        );
        break;
      }

      case 'mkdir': {
        const rawDir = (arg1 || '').replace(/\/+$/, '').trim();
        if (!rawDir) {
          output = <p className="text-[11px] font-mono text-amber-500">usage: mkdir &lt;directory&gt;</p>;
        } else {
          const targetDir = resolveVirtualPath(rawDir, currentDir);
          if (virtualDirs.includes(targetDir) || targetDir === 'projects') {
            output = <p className="text-[11px] font-mono text-rose-500">mkdir: cannot create directory &apos;{rawDir}&apos;: File exists</p>;
          } else {
            const segs = targetDir.split('/');
            let cur = '';
            const dirsToAdd: string[] = [];
            for (const s of segs) {
              cur = cur ? `${cur}/${s}` : s;
              dirsToAdd.push(cur);
            }
            setVirtualDirs((prev) => Array.from(new Set([...prev, ...dirsToAdd])));
            output = (
              <p className="text-[11px] font-mono text-emerald-500">
                mkdir: created directory &apos;{rawDir}&apos; in {currentDir === '~' ? '~' : currentDir} [OK]
              </p>
            );
          }
        }
        break;
      }

      case 'rmdir': {
        const rawDir = (arg1 || '').replace(/\/+$/, '').trim();
        if (!rawDir) {
          output = <p className="text-[11px] font-mono text-amber-500">usage: rmdir &lt;directory&gt;</p>;
        } else {
          const targetDir = resolveVirtualPath(rawDir, currentDir);
          if (targetDir === 'projects') {
            output = <p className="text-[11px] font-mono text-rose-500">rmdir: failed to remove &apos;projects&apos;: System directory protected</p>;
          } else if (virtualDirs.includes(targetDir)) {
            setVirtualDirs((prev) => prev.filter((d) => d !== targetDir));
            setVirtualFiles((prev) => {
              const next = { ...prev };
              Object.keys(next).forEach((k) => {
                if (k.startsWith(`${targetDir}/`)) delete next[k];
              });
              return next;
            });
            if (currentDir === `~/${targetDir}`) {
              setCurrentDir('~');
            }
            output = <p className="text-[11px] font-mono text-slate-400">rmdir: removed directory &apos;{rawDir}&apos; [OK]</p>;
          } else {
            output = <p className="text-[11px] font-mono text-rose-500">rmdir: failed to remove &apos;{rawDir}&apos;: No such file or directory</p>;
          }
        }
        break;
      }

      case 'rm': {
        if (fullArg.includes('-rf /') || fullArg.includes('-fr /') || fullArg === '-rf *') {
          output = <p className="text-[11px] font-mono text-rose-500">rm: cannot remove &apos;/&apos;: Permission denied. Nice try! MoizOS integrity protected.</p>;
        } else {
          const targetRaw = (arg1.startsWith('-') ? arg2 : arg1).replace(/^\.\//, '').replace(/\/+$/, '');
          if (!targetRaw) {
            output = <p className="text-[11px] font-mono text-amber-500">usage: rm [-rf] &lt;file|directory&gt;</p>;
          } else if (targetRaw === 'projects') {
            output = <p className="text-[11px] font-mono text-rose-500">rm: cannot remove &apos;projects&apos;: System directory protected</p>;
          } else {
            const targetPath = resolveVirtualPath(targetRaw, currentDir);
            const isDir = virtualDirs.includes(targetPath);
            const isRecursive = parts.includes('-r') || parts.includes('-rf') || parts.includes('-fr');

            if (isDir) {
              if (isRecursive) {
                setVirtualDirs((prev) => prev.filter((d) => d !== targetPath));
                setVirtualFiles((prev) => {
                  const next = { ...prev };
                  Object.keys(next).forEach((k) => {
                    if (k.startsWith(`${targetPath}/`)) delete next[k];
                  });
                  return next;
                });
                if (currentDir === `~/${targetPath}`) setCurrentDir('~');
                output = <p className="text-[11px] font-mono text-slate-400">rm: removed directory &apos;{targetRaw}&apos; from virtual filesystem</p>;
              } else {
                output = <p className="text-[11px] font-mono text-rose-500">rm: cannot remove &apos;{targetRaw}&apos;: Is a directory (use rm -r)</p>;
              }
            } else if (virtualFiles[targetPath] !== undefined || virtualFiles[targetRaw] !== undefined) {
              const toDelete = virtualFiles[targetPath] !== undefined ? targetPath : targetRaw;
              setVirtualFiles((prev) => {
                const nextFiles = { ...prev };
                delete nextFiles[toDelete];
                return nextFiles;
              });
              output = <p className="text-[11px] font-mono text-slate-400">rm: removed &apos;{targetRaw}&apos; from virtual filesystem</p>;
            } else {
              output = <p className="text-[11px] font-mono text-rose-500">rm: cannot remove &apos;{targetRaw}&apos;: No such file or directory</p>;
            }
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
        if (arg1 === '-c') {
          setCommandHistoryList([]);
          output = <p className="text-[11px] font-mono text-slate-400">history: buffer cleared</p>;
        } else {
          output = (
            <div className="space-y-0.5 font-mono text-[11px] text-slate-600 dark:text-slate-400">
              {commandHistoryList.slice(-20).map((cmdItem, i) => (
                <p key={i}>{i + 1}  {cmdItem}</p>
              ))}
            </div>
          );
        }
        break;

      case 'ping': {
        const targetHost = arg1 || 'moiz.paris';
        output = <RealPingOutput targetHost={targetHost} />;
        break;
      }

      case 'traceroute':
      case 'tracepath': {
        const targetHost = arg1 || 'moiz.paris';
        const isLocal = targetHost === '127.0.0.1' || targetHost === 'localhost';
        const targetIp = isLocal ? '127.0.0.1' : targetHost.includes('google') ? '142.250.74.206' : '76.76.21.21';
        output = (
          <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
            <p className="font-semibold text-slate-500">traceroute to {targetHost} ({targetIp}), 30 hops max, 60 byte packets</p>
            <p> 1  gateway.paris.local (192.168.1.1)  0.942 ms  0.880 ms  0.865 ms</p>
            <p> 2  10.42.0.1 (idf-core-peering.orange.fr)  3.412 ms  3.280 ms  3.190 ms</p>
            <p> 3  prs-b1-link.telia.net (62.115.112.4)  5.812 ms  5.640 ms  5.520 ms</p>
            <p className="text-emerald-500"> 4  anycast.edge ({targetIp})  11.240 ms  10.980 ms  11.104 ms [Destination reached]</p>
          </div>
        );
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

      case 'curl': {
        const targetUrl = arg1.trim();
        if (targetUrl.includes('wttr') || fullArg.includes('wttr')) {
          output = <LiveWeatherOutput />;
        } else if (targetUrl.includes('joke')) {
          output = <LiveJokeOutput />;
        } else if (targetUrl.includes('quote')) {
          output = <LiveQuoteOutput />;
        } else if (targetUrl.includes('ipify') || (targetUrl.includes('ip') && !targetUrl.includes('doctor-iq'))) {
          output = <LiveIpOutput />;
        } else if (targetUrl.includes('crypto') || targetUrl.includes('binance') || targetUrl.includes('btc')) {
          output = <LiveCryptoOutput />;
        } else if (targetUrl.startsWith('http://') || targetUrl.startsWith('https://')) {
          output = <LiveCurlOutput url={targetUrl} />;
        } else if (targetUrl.includes('8000') || fullArg.includes('8000')) {
          output = (
            <div className="rounded-lg bg-slate-100 p-2 font-mono text-[11px] text-slate-800 dark:bg-white/5 dark:text-slate-200">
              <pre>{JSON.stringify({
                service: 'doctor-iq-api',
                status: 'healthy',
                version: '2.4.0',
                ocr_pipeline: 'MedGemma-7B',
                workers: 4,
                uptime_sec: 364800,
              }, null, 2)}</pre>
            </div>
          );
        } else if (targetUrl.includes('4000') || fullArg.includes('4000') || targetUrl.includes('8501')) {
          output = (
            <div className="rounded-lg bg-slate-100 p-2 font-mono text-[11px] text-slate-800 dark:bg-white/5 dark:text-slate-200">
              <pre>{JSON.stringify({
                service: 'brackets-genie-multi-agent',
                status: 'ready',
                agents_count: 5,
                orchestrator: 'LangGraph',
                streaming_protocol: 'SSE',
              }, null, 2)}</pre>
            </div>
          );
        } else if (targetUrl.includes('profile') || targetUrl.includes('api')) {
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
        } else if (!targetUrl) {
          output = (
            <div className="space-y-1 font-mono text-[11px] text-slate-600 dark:text-slate-400">
              <p className="text-amber-500 font-semibold">curl: try passing a public endpoint or try one of these:</p>
              <p>&bull; <span className="cursor-pointer text-indigo-400 underline" onClick={() => executeCommand('curl https://api.ipify.org?format=json')}>curl https://api.ipify.org?format=json</span></p>
              <p>&bull; <span className="cursor-pointer text-indigo-400 underline" onClick={() => executeCommand('curl https://official-joke-api.appspot.com/random_joke')}>curl https://official-joke-api.appspot.com/random_joke</span></p>
              <p>&bull; <span className="cursor-pointer text-indigo-400 underline" onClick={() => executeCommand('curl https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT')}>curl https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT</span></p>
              <p>&bull; <span className="cursor-pointer text-indigo-400 underline" onClick={() => executeCommand('curl wttr')}>curl wttr</span></p>
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
      }

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

      case 'ip':
      case 'myip':
        output = <LiveIpOutput />;
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
      case 'docker-compose': {
        const isCompose = base === 'docker-compose' || arg1 === 'compose';
        const subCmd = isCompose && base === 'docker' ? arg2 : isCompose ? arg1 : arg1;
        const target = isCompose && base === 'docker' ? arg3 : arg2;

        if (isCompose) {
          if (subCmd === 'down') {
            output = (
              <div className="space-y-0.5 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                <p className="text-indigo-400">[+] Running 4/4</p>
                <p className="text-slate-400"> - Container doctor-iq-api-1             Stopped &amp; Removed [0.4s]</p>
                <p className="text-slate-400"> - Container brackets-genie-orchestrator  Stopped &amp; Removed [0.3s]</p>
                <p className="text-slate-400"> - Container redis-broker                 Stopped &amp; Removed [0.2s]</p>
                <p className="text-slate-400"> - Network moiz-engineering_default       Removed [0.1s]</p>
              </div>
            );
          } else if (subCmd === 'ps') {
            output = (
              <div className="space-y-0.5 font-mono text-[11px] overflow-x-auto text-slate-700 dark:text-slate-300">
                <p className="font-bold text-slate-500 dark:text-slate-400 whitespace-pre">NAME                             IMAGE                 SERVICE         STATUS         PORTS</p>
                <p className="text-emerald-500 whitespace-pre">doctor-iq-api-1                  moiz/doctor-iq:v2.4   doctor-iq-api   Up 3 days      0.0.0.0:8000-&gt;8000/tcp</p>
                <p className="text-emerald-500 whitespace-pre">brackets-genie-orchestrator-1    moiz/genie-agent:v1.0 genie-agent     Up 5 days      0.0.0.0:4000-&gt;4000/tcp</p>
                <p className="text-emerald-500 whitespace-pre">redis-broker-1                   redis:7-alpine        redis-broker    Up 14 days     0.0.0.0:6379-&gt;6379/tcp</p>
                <p className="text-emerald-500 whitespace-pre">portfolio-db-1                   postgres:16-alpine    portfolio-db    Up 21 days     0.0.0.0:5432-&gt;5432/tcp</p>
              </div>
            );
          } else {
            output = (
              <div className="space-y-0.5 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                <p className="text-indigo-400">[+] Running 5/5</p>
                <p className="text-emerald-500"> ✔ Network moiz-engineering_default       Created [0.1s]</p>
                <p className="text-emerald-500"> ✔ Container portfolio-db-1               Started [0.4s]</p>
                <p className="text-emerald-500"> ✔ Container redis-broker-1               Started [0.3s]</p>
                <p className="text-emerald-500"> ✔ Container doctor-iq-api-1              Started [0.6s]</p>
                <p className="text-emerald-500"> ✔ Container brackets-genie-orchestrator  Started [0.5s]</p>
                <p className="text-slate-400 pt-1 text-[10px]">All 4 microservices healthy. Listening on ports 8000, 4000, 5432, 6379.</p>
              </div>
            );
          }
        } else if (arg1 === 'ps' || !arg1) {
          const showAll = parts.includes('-a') || arg2 === '-a';
          output = (
            <div className="space-y-1 font-mono text-[11px] overflow-x-auto">
              <p className="font-bold text-slate-500 dark:text-slate-400 whitespace-pre">CONTAINER ID   IMAGE                 COMMAND                  CREATED        STATUS         PORTS                    NAMES</p>
              <p className="text-emerald-500 whitespace-pre">a4f91c0e21b8   moiz/doctor-iq:v2.4   &quot;uvicorn main:app --…&quot;   3 days ago     Up 3 days      0.0.0.0:8000-&gt;8000/tcp   doctor-iq-api</p>
              <p className="text-emerald-500 whitespace-pre">b82e44d9f102   moiz/genie-agent:v1.0 &quot;npm start&quot;              5 days ago     Up 5 days      0.0.0.0:4000-&gt;4000/tcp   brackets-genie-orchestrator</p>
              <p className="text-emerald-500 whitespace-pre">9f4411ba82c1   moiz/vif-backend:v1.2 &quot;gunicorn vif.wsgi&quot;      1 week ago     Up 7 days      0.0.0.0:8080-&gt;8080/tcp   vif-solidarity-backend</p>
              <p className="text-emerald-500 whitespace-pre">c3710a911e4f   redis:7-alpine        &quot;docker-entrypoint.s…&quot;   2 weeks ago    Up 14 days     0.0.0.0:6379-&gt;6379/tcp   redis-broker</p>
              <p className="text-emerald-500 whitespace-pre">d1840e729a1b   postgres:16-alpine    &quot;docker-entrypoint.s…&quot;   3 weeks ago    Up 21 days     0.0.0.0:5432-&gt;5432/tcp   portfolio-db</p>
              {showAll && (
                <p className="text-slate-400 whitespace-pre">e7192a001fb2   moiz/test-runner:ci   &quot;npm test&quot;               12 hours ago   Exited (0) 12 hours ago          ci-test-runner</p>
              )}
            </div>
          );
        } else if (arg1 === 'images' || arg1 === 'image') {
          output = (
            <div className="space-y-0.5 font-mono text-[11px] overflow-x-auto">
              <p className="font-bold text-slate-500 dark:text-slate-400 whitespace-pre">REPOSITORY               TAG       IMAGE ID       CREATED        SIZE</p>
              <p className="text-emerald-500 whitespace-pre">moiz/doctor-iq           v2.4      a4f91c0e21b8   3 days ago     248MB</p>
              <p className="text-emerald-500 whitespace-pre">moiz/genie-agent         v1.0      b82e44d9f102   5 days ago     182MB</p>
              <p className="text-emerald-500 whitespace-pre">moiz/vif-backend         v1.2      9f4411ba82c1   1 week ago     215MB</p>
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre">redis                    7-alpine  c3710a911e4f   2 weeks ago    32.4MB</p>
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre">postgres                 16-alpine d1840e729a1b   3 weeks ago    379MB</p>
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre">node                     20-alpine f47a98bc310a   4 weeks ago    174MB</p>
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre">python                   3.11-slim 8c12fa490b1e   1 month ago    145MB</p>
            </div>
          );
        } else if (arg1 === 'build') {
          output = (
            <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              <p className="text-indigo-400 font-bold">[+] Building 2.8s (11/11) FINISHED</p>
              <p className="text-slate-400"> =&gt; [internal] load build definition from Dockerfile [0.0s]</p>
              <p className="text-slate-400"> =&gt; [builder 1/4] FROM docker.io/library/node:20-alpine [0.1s]</p>
              <p className="text-slate-400"> =&gt; [builder 2/4] WORKDIR /app [0.1s]</p>
              <p className="text-slate-400"> =&gt; [builder 3/4] COPY package*.json ./ [0.1s]</p>
              <p className="text-slate-400"> =&gt; [builder 4/4] RUN npm ci [1.4s]</p>
              <p className="text-slate-400"> =&gt; [runner 1/2] COPY --from=builder /app ./ [0.4s]</p>
              <p className="text-emerald-500"> =&gt; naming to docker.io/moiz/portfolio:latest [OK]</p>
              <p className="text-emerald-500 font-semibold pt-0.5">Successfully tagged moiz/portfolio:latest</p>
            </div>
          );
        } else if (arg1 === 'run') {
          const img = arg2 || 'moiz/doctor-iq';
          output = (
            <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              <p className="text-emerald-500">c91024fa88b1</p>
              <p className="text-slate-400">Container started in detached mode from {img}. Port forwarding 8000:8000 established.</p>
            </div>
          );
        } else if (arg1 === 'logs') {
          const cName = arg2 || 'doctor-iq-api';
          output = (
            <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              <p className="text-slate-400 font-semibold">--- Logs for {cName} ---</p>
              <p className="text-emerald-500">2026-10-23T12:00:01.402Z [INFO] Uvicorn running on http://0.0.0.0:8000</p>
              <p className="text-emerald-500">2026-10-23T12:00:02.115Z [INFO] Application startup complete.</p>
              <p className="text-emerald-500">2026-10-23T12:00:02.890Z [INFO] Redis broker connection established: PING -&gt; PONG</p>
              <p className="text-emerald-500">2026-10-23T12:00:15.602Z [INFO] 127.0.0.1:49210 - &quot;GET /health HTTP/1.1&quot; 200 OK</p>
            </div>
          );
        } else if (arg1 === 'stats') {
          output = (
            <div className="space-y-0.5 font-mono text-[11px] overflow-x-auto text-slate-700 dark:text-slate-300">
              <p className="font-bold text-slate-500 dark:text-slate-400 whitespace-pre">CONTAINER ID   NAME                 CPU %     MEM USAGE / LIMIT     MEM %     NET I/O           PIDS</p>
              <p className="text-emerald-500 whitespace-pre">a4f91c0e21b8   doctor-iq-api        1.24%     214MiB / 8GiB         2.61%     42.1MB / 8.4MB    12</p>
              <p className="text-emerald-500 whitespace-pre">b82e44d9f102   genie-orchestrator   0.88%     142MiB / 8GiB         1.73%     28.4MB / 14.1MB   8</p>
              <p className="text-emerald-500 whitespace-pre">9f4411ba82c1   vif-backend          0.45%     186MiB / 8GiB         2.27%     18.2MB / 5.2MB    6</p>
              <p className="text-emerald-500 whitespace-pre">c3710a911e4f   redis-broker         0.12%     18.4MiB / 8GiB        0.22%     64.2MB / 62.1MB   4</p>
              <p className="text-emerald-500 whitespace-pre">d1840e729a1b   portfolio-db         0.65%     194MiB / 8GiB         2.36%     12.8MB / 48.2MB   9</p>
            </div>
          );
        } else if (arg1 === 'stop') {
          output = <p className="text-[11px] font-mono text-emerald-500">[OK] Container {arg2 || 'doctor-iq-api'} stopped.</p>;
        } else if (arg1 === 'start' || arg1 === 'restart') {
          output = <p className="text-[11px] font-mono text-emerald-500">[OK] Container {arg2 || 'doctor-iq-api'} {arg1}ed.</p>;
        } else if (arg1 === 'exec') {
          output = <p className="text-[11px] font-mono text-emerald-400">root@a4f91c0e21b8:/app# session opened. Type exit to return.</p>;
        } else if (arg1 === 'volume') {
          output = (
            <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              <p className="font-bold text-slate-500 dark:text-slate-400">DRIVER    VOLUME NAME</p>
              <p className="text-emerald-500">local     portfolio_pgdata</p>
              <p className="text-emerald-500">local     doctor_iq_models</p>
            </div>
          );
        } else if (arg1 === 'network') {
          output = (
            <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              <p className="font-bold text-slate-500 dark:text-slate-400">NETWORK ID     NAME              DRIVER    SCOPE</p>
              <p className="text-emerald-500">7f8a91c0e21b   bridge            bridge    local</p>
              <p className="text-emerald-500">1b2c3d4e5f6a   host              host      local</p>
              <p className="text-emerald-500">9d8c7b6a5e4f   portfolio-net     bridge    local</p>
            </div>
          );
        } else if (arg1 === 'info' || arg1 === 'version') {
          output = (
            <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              <p className="font-bold text-indigo-400">Docker Engine - Community 26.1.1</p>
              <p>Server Version: 26.1.1 | API: 1.45 | OS/Arch: linux/amd64</p>
              <p>Containers: 5 Running, 1 Exited | Images: 7 | Storage: overlay2</p>
              <p>Total Memory: 32.00 GiB | CPUs: 16 | Kernel: 6.8.0-45-generic</p>
            </div>
          );
        } else {
          output = <p className="text-[11px] text-slate-400 font-mono">Usage: docker [ps|images|build|run|logs|stats|compose|stop|restart|info]</p>;
        }
        break;
      }

      case 'uptime':
        output = (
          <p className="text-[11px] font-mono text-slate-700 dark:text-slate-300">
            {now} up 42 days, 3:18, 1 user, load average: 0.18, 0.22, 0.15
          </p>
        );
        break;

      case 'uname':
        if (arg1 === '-r') {
          output = <p className="text-[11px] font-mono text-slate-700 dark:text-slate-300">6.8.0-45-generic</p>;
        } else if (arg1 === '-m' || arg1 === '-p') {
          output = <p className="text-[11px] font-mono text-slate-700 dark:text-slate-300">x86_64</p>;
        } else {
          output = (
            <p className="text-[11px] font-mono text-slate-700 dark:text-slate-300">
              Linux moiz-workstation 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux
            </p>
          );
        }
        break;

      case 'hostname':
        output = <p className="text-[11px] font-mono text-emerald-500">moiz-workstation</p>;
        break;

      case 'arch':
        output = <p className="text-[11px] font-mono text-slate-700 dark:text-slate-300">x86_64</p>;
        break;

      case 'who':
        output = <p className="text-[11px] font-mono text-slate-700 dark:text-slate-300">moiz     pts/0        Oct 23 11:42 (192.168.1.42)</p>;
        break;

      case 'netstat':
      case 'ss':
      case 'lsof':
        output = (
          <div className="space-y-0.5 font-mono text-[11px] overflow-x-auto text-slate-700 dark:text-slate-300">
            <p className="font-bold text-slate-500 dark:text-slate-400 whitespace-pre">Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program</p>
            <p className="text-emerald-500 whitespace-pre">tcp        0      0 0.0.0.0:8000            0.0.0.0:*               LISTEN      1420/doctor-iq (FastAPI)</p>
            <p className="text-emerald-500 whitespace-pre">tcp        0      0 0.0.0.0:4000            0.0.0.0:*               LISTEN      1580/brackets-genie (LangGraph)</p>
            <p className="text-emerald-500 whitespace-pre">tcp        0      0 0.0.0.0:5432            0.0.0.0:*               LISTEN      910/postgres:16</p>
            <p className="text-emerald-500 whitespace-pre">tcp        0      0 0.0.0.0:6379            0.0.0.0:*               LISTEN      840/redis-server:7</p>
            <p className="text-emerald-500 whitespace-pre">tcp        0      0 0.0.0.0:3000            0.0.0.0:*               LISTEN      2100/next-portfolio</p>
          </div>
        );
        break;

      case 'systemctl':
      case 'service':
        output = (
          <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
            <p className="text-emerald-500 font-bold">&#9679; {arg2 || arg1 || 'docker'}.service - System Application Service</p>
            <p className="text-slate-400">   Loaded: loaded (/lib/systemd/system/{arg2 || arg1 || 'docker'}.service; enabled)</p>
            <p className="text-emerald-400">   Active: active (running) since Wed 2026-09-10 08:14:02 CEST; 42 days ago</p>
            <p className="text-slate-400">   Main PID: 742 (dockerd) • Tasks: 42 (limit: 4915)</p>
          </div>
        );
        break;

      case 'ps':
        output = (
          <div className="space-y-0.5 font-mono text-[11px] overflow-x-auto text-slate-700 dark:text-slate-300">
            <p className="font-bold text-slate-500 dark:text-slate-400 whitespace-pre">USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND</p>
            <p className="text-slate-400 whitespace-pre">root         1  0.0  0.1 168924 13540 ?        Ss   Sep10   0:08 /sbin/init</p>
            <p className="text-emerald-500 whitespace-pre">moiz       742  0.2  1.4 842100 94120 ?        Ssl  Sep10   4:12 /usr/bin/dockerd</p>
            <p className="text-emerald-500 whitespace-pre">moiz      1420  0.8  3.2 512000 214000 pts/0   Sl   Oct20   2:45 python3 main:app (DoctorIQ)</p>
            <p className="text-emerald-500 whitespace-pre">moiz      1580  0.5  2.1 420000 142000 pts/0   Sl   Oct21   1:18 node server.js (Brackets Genie)</p>
            <p className="text-emerald-500 whitespace-pre">moiz      2100  0.4  2.8 480000 186000 pts/0   Sl   Oct22   0:54 next-server (Portfolio)</p>
            <p className="text-slate-400 whitespace-pre">moiz      3102  0.0  0.0  12400   3200 pts/0   R+   {now}   0:00 ps {fullArg}</p>
          </div>
        );
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
        } else if (arg1 === 'diff') {
          output = (
            <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              <p className="text-slate-400">diff --git a/skills.ts b/skills.ts</p>
              <p className="text-slate-400">index e4b8910..8c3149a 100644</p>
              <p className="text-indigo-400">@@ -14,6 +14,8 @@ export const capabilities = &#123;</p>
              <p className="text-emerald-500">+   ai_orchestration: [&apos;LangGraph&apos;, &apos;MedGemma&apos;, &apos;Multi-Agent&apos;],</p>
              <p className="text-emerald-500">+   devops_delivery: [&apos;Docker&apos;, &apos;Kubernetes&apos;, &apos;Terraform&apos;, &apos;CI/CD&apos;],</p>
              <p className="text-emerald-500">+   availability: &apos;Available for CDI / Alternance in Paris&apos;</p>
            </div>
          );
        } else if (arg1 === 'branch') {
          output = (
            <div className="space-y-0.5 font-mono text-[11px]">
              <p className="text-emerald-500 font-bold">* main</p>
              <p className="text-slate-500 dark:text-slate-400">  feat/epitech-msc-paris</p>
              <p className="text-slate-500 dark:text-slate-400">  production-ready</p>
            </div>
          );
        } else if (arg1 === 'commit') {
          output = (
            <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              <p className="text-emerald-500">[main 9d12a8f] {fullArg.replace(/^commit\s*(-m\s*)?/, '').replace(/^["']|["']$/g, '') || 'update portfolio code'}</p>
              <p className="text-slate-400"> 2 files changed, 28 insertions(+), 0 deletions(-)</p>
            </div>
          );
        } else if (arg1 === 'push') {
          output = (
            <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              <p className="text-slate-400">Enumerating objects: 5, done.</p>
              <p className="text-slate-400">Writing objects: 100% (5/5), 1.42 KiB | 1.42 MiB/s, done.</p>
              <p className="text-emerald-500">To github.com:amoiz0468/Portfolio.git</p>
              <p className="text-emerald-500">   e4b8910..8c3149a  main -&gt; main</p>
            </div>
          );
        } else if (arg1 === 'pull') {
          output = <p className="text-[11px] font-mono text-emerald-500">Already up to date. (Fast-forward to HEAD)</p>;
        } else if (arg1 === 'remote') {
          output = (
            <div className="space-y-0.5 font-mono text-[11px] text-slate-600 dark:text-slate-400">
              <p>origin  https://github.com/amoiz0468/Portfolio.git (fetch)</p>
              <p>origin  https://github.com/amoiz0468/Portfolio.git (push)</p>
            </div>
          );
        } else {
          output = <p className="text-[11px] font-mono text-slate-400">git: subcommands: status, log, diff, branch, commit, push, pull, remote</p>;
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
        if (arg1 === 'test' || arg2 === 'test') {
          output = (
            <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              <p className="text-emerald-500 font-bold">&#10004; 100/100 tests passed (unit, integration, e2e, security)</p>
              <p className="text-slate-400">Duration: 756ms | 5 test suites | 0 failures | 0 warnings</p>
            </div>
          );
        } else if (arg1 === 'run' && (arg2 === 'build' || arg2 === 'dev')) {
          output = (
            <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              <p className="text-indigo-400 font-bold">&#9650; Next.js 14.2.35 ({arg2})</p>
              <p className="text-emerald-500">&#10004; Compiled successfully in 1.1s</p>
              <p className="text-slate-400">&#10004; Static pages: 6/6 generated</p>
            </div>
          );
        } else if (arg1 === 'build') {
          output = (
            <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              <p className="text-indigo-400 font-bold">&#9650; Next.js 14.2.35 production build</p>
              <p className="text-emerald-500">&#10004; Compiled successfully</p>
              <p className="text-slate-400">&#10004; First Load JS shared by all: 166 kB (optimized)</p>
            </div>
          );
        } else {
          output = (
            <div className="space-y-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              <p className="text-emerald-500">{base}: audit completed [OK]</p>
              <p>0 vulnerabilities found across 42 packages. Production ready.</p>
              <p className="text-slate-400 text-[10px]">Scripts: npm test, npm run build, npm run dev</p>
            </div>
          );
        }
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
        const rawFile = (arg1 || 'untitled.txt').replace(/^\.\//, '');
        const file = resolveVirtualPath(rawFile, currentDir);
        const initial = virtualFiles[file] ?? '';
        setEditorFile(file);
        setEditorBuffer(initial);
        setVimMode('NORMAL');
        setEditorStatusMsg(initial ? `"${file}" ${initial.split('\n').length}L` : `"${file}" [New File]`);
        setActiveEditor('vim');
        setInputVal('');
        return;
      }

      case 'nano': {
        const rawFile = (arg1 || 'untitled.txt').replace(/^\.\//, '');
        const file = resolveVirtualPath(rawFile, currentDir);
        const initial = virtualFiles[file] ?? '';
        setEditorFile(file);
        setEditorBuffer(initial);
        setEditorStatusMsg(initial ? `File: ${file}` : `[ New File: ${file} ]`);
        setActiveEditor('nano');
        setInputVal('');
        return;
      }

      case 'emacs': {
        const rawFile = (arg1 || 'untitled.txt').replace(/^\.\//, '');
        const file = resolveVirtualPath(rawFile, currentDir);
        const initial = virtualFiles[file] ?? '';
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

      case 'email':
      case 'mail':
      case 'phone':
      case 'tel':
      case 'call':
      case 'reach':
      case 'contact':
        output = (
          <div className="space-y-2 text-[11px] font-mono">
            <div className="flex items-center justify-between border-b border-slate-200 pb-1 dark:border-white/10">
              <span className="font-bold text-slate-900 dark:text-white">Contact &amp; Candidate Coordinates</span>
              <span className="text-[10px] text-emerald-500 font-semibold">[Available: Paris / Remote]</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <FiMail className="text-indigo-500 shrink-0 text-xs" />
                  <span className="text-slate-400">Email:</span>
                  <a href={`mailto:${profile.email}`} className="underline text-indigo-500 hover:text-indigo-400 font-semibold">
                    {profile.email}
                  </a>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <FiPhone className="text-emerald-500 shrink-0 text-xs" />
                  <span className="text-slate-400">Phone:</span>
                  <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="underline text-indigo-500 hover:text-indigo-400 font-semibold">
                    {profile.phone}
                  </a>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <FiLinkedin className="text-sky-500 shrink-0 text-xs" />
                  <span className="text-slate-400">LinkedIn:</span>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline text-indigo-500 hover:text-indigo-400 font-semibold">
                    <span>linkedin.com/in/moizghauri</span>
                    <FiExternalLink className="text-[10px]" />
                  </a>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <FiGithub className="text-slate-900 dark:text-white shrink-0 text-xs" />
                  <span className="text-slate-400">GitHub:</span>
                  <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline text-indigo-500 hover:text-indigo-400 font-semibold">
                    <span>github.com/amoiz0468</span>
                    <FiExternalLink className="text-[10px]" />
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded bg-slate-100 p-2 text-[10px] space-y-0.5 dark:bg-white/5 text-slate-600 dark:text-slate-300">
              <p><span className="font-semibold text-slate-900 dark:text-white">Profile:</span> {profile.name} &bull; {profile.title}</p>
              <p><span className="font-semibold text-slate-900 dark:text-white">Location:</span> {profile.location} &bull; EPITECH Paris Campus (Full French work authorization)</p>
              <p><span className="font-semibold text-slate-900 dark:text-white">Current Engagement:</span> Pedagogical Assistant (Alternance @ EPITECH Paris, Sept 2026 – Sept 2027)</p>
              <p><span className="font-semibold text-slate-900 dark:text-white">Next Contract:</span> Open for CDI / CDD / Hybrid or Remote engineering opportunities</p>
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
        output = <LiveWeatherOutput />;
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
      case 'jokes':
        output = <LiveJokeOutput />;
        break;

      case 'quote':
      case 'quotes':
        output = <LiveQuoteOutput />;
        break;

      case 'crypto':
      case 'btc':
      case 'eth':
      case 'binance':
        output = <LiveCryptoOutput />;
        break;

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
  }

  setHistory((prev) => [...prev.slice(-80), { command: raw, output, time: now, dir: currentDir }]);
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
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = inputVal.trim();
      if (!current) return;

      const words = current.split(/\s+/);
      const isFirstWord = words.length === 1;
      const lastToken = words[words.length - 1].toLowerCase();

      const ALL_COMMANDS = [
        'help', 'ls', 'll', 'cat', 'tree', 'cd', 'nano', 'vim', 'emacs',
        'docker', 'ping', 'traceroute', 'whoami', 'skills', 'projects', 'contact', 'hire',
        'clear', 'alias', 'unalias', 'cp', 'mv', 'rm', 'rmdir', 'mkdir', 'touch', 'grep',
        'head', 'tail', 'wc', 'echo', 'date', 'uptime', 'uname', 'hostname',
        'netstat', 'ss', 'ps', 'top', 'curl', 'status', 'github', 'linkedin',
        'day', 'dark', 'joke', 'quote', 'weather', 'bc', 'cal', 'df', 'du',
        'base64', 'ssh', 'systemctl', 'git', 'npm', 'kubectl'
      ];

      const ALL_PROJECTS = [
        'doctor-iq', 'brackets-genie', 'vif-food-solidarity',
        'ledgeroo-fintech', 'trinity-suite', 'time-manager'
      ];

      const ALL_FILES = Object.keys(virtualFiles);

      if (isFirstWord) {
        if (current.startsWith('./')) {
          const stem = current.slice(2).toLowerCase();
          const matchProj = [...ALL_PROJECTS, ...ALL_FILES].find((p) => p.toLowerCase().startsWith(stem));
          if (matchProj) setInputVal(`./${matchProj}`);
        } else {
          const matchCmd = ALL_COMMANDS.find((c) => c.startsWith(lastToken));
          if (matchCmd) setInputVal(matchCmd + ' ');
        }
      } else {
        const firstCmd = words[0].toLowerCase();
        if (['cat', 'nano', 'vim', 'emacs', 'rm', 'cp', 'mv', 'touch', 'head', 'tail', 'wc', 'grep'].includes(firstCmd)) {
          const matchFile = ALL_FILES.find((f) => f.toLowerCase().startsWith(lastToken));
          if (matchFile) {
            words[words.length - 1] = matchFile;
            setInputVal(words.join(' '));
          }
        } else if (firstCmd === 'cd' || firstCmd === 'rmdir') {
          const matchDir = virtualDirs.find((d) => d.toLowerCase().startsWith(lastToken));
          if (matchDir) {
            words[words.length - 1] = matchDir;
            setInputVal(words.join(' '));
          }
        } else if (firstCmd === 'docker') {
          const dockerSubs = ['ps', 'images', 'build', 'run', 'logs', 'stats', 'compose', 'stop', 'restart', 'exec', 'volume', 'network', 'info'];
          const matchSub = dockerSubs.find((s) => s.startsWith(lastToken));
          if (matchSub) {
            words[words.length - 1] = matchSub;
            setInputVal(words.join(' ') + ' ');
          }
        } else if (firstCmd === 'git') {
          const gitSubs = ['status', 'log', 'diff', 'branch', 'commit', 'push', 'pull', 'remote'];
          const matchSub = gitSubs.find((s) => s.startsWith(lastToken));
          if (matchSub) {
            words[words.length - 1] = matchSub;
            setInputVal(words.join(' ') + ' ');
          }
        } else if (firstCmd === 'npm' || firstCmd === 'pnpm' || firstCmd === 'yarn' || firstCmd === 'bun') {
          const npmSubs = ['test', 'run', 'build', 'dev', 'audit', 'install'];
          const matchSub = npmSubs.find((s) => s.startsWith(lastToken));
          if (matchSub) {
            words[words.length - 1] = matchSub;
            setInputVal(words.join(' ') + ' ');
          }
        } else if (firstCmd === 'systemctl') {
          const sysSubs = ['status', 'restart', 'start', 'stop', 'is-active'];
          const matchSub = sysSubs.find((s) => s.startsWith(lastToken));
          if (matchSub) {
            words[words.length - 1] = matchSub;
            setInputVal(words.join(' ') + ' ');
          }
        } else if (firstCmd === 'kubectl' || firstCmd === 'k') {
          const k8sSubs = ['get', 'describe', 'logs', 'apply', 'delete', 'cluster-info'];
          const matchSub = k8sSubs.find((s) => s.startsWith(lastToken));
          if (matchSub) {
            words[words.length - 1] = matchSub;
            setInputVal(words.join(' ') + ' ');
          }
        }
      }
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      const now = new Date().toLocaleTimeString('en-GB', { hour12: false });
      setHistory((prev) => [
        ...prev.slice(-80),
        {
          command: `${inputVal}^C`,
          output: null,
          time: now,
          dir: currentDir,
        },
      ]);
      setInputVal('');
      setHistoryIndex(null);
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      setHistory([]);
      setInputVal('');
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
      e.preventDefault();
      setInputVal('');
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
      e.preventDefault();
      inputRef.current?.setSelectionRange(0, 0);
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
      e.preventDefault();
      const len = inputVal.length;
      inputRef.current?.setSelectionRange(len, len);
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'w') {
      e.preventDefault();
      setInputVal((prev) => {
        const trimmed = prev.trimEnd();
        const lastSpace = trimmed.lastIndexOf(' ');
        return lastSpace === -1 ? '' : trimmed.slice(0, lastSpace + 1);
      });
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const el = inputRef.current;
      if (el && typeof el.selectionStart === 'number') {
        setInputVal((prev) => prev.slice(0, el.selectionStart || 0));
      } else {
        setInputVal('');
      }
    }
  };

  const quickChips = ['skills', 'projects', 'email', 'weather', 'hire', 'whoami', 'help', 'ls', 'clear'];

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
          className="flex flex-col p-3 sm:p-5 text-slate-800 dark:text-slate-200 h-[390px] sm:h-[440px] md:h-[480px] cursor-text"
        >
          {activeEditor ? (
            <div className="flex flex-col h-full space-y-2 select-text" data-lenis-prevent="true">
              {/* Header depending on editor */}
              {activeEditor === 'vim' && (
                <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-200/80 pb-1.5 dark:border-white/10 shrink-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="font-bold text-emerald-500 font-mono text-[11px]">VIM</span>
                    <span className="text-slate-400 font-mono text-[11px]">~/</span>
                    <input
                      type="text"
                      value={editorFile}
                      onChange={(e) => setEditorFile(e.target.value)}
                      placeholder="untitled.txt"
                      className="bg-transparent border-b border-dashed border-slate-400/50 text-slate-800 dark:text-slate-200 font-mono text-[11px] px-1 py-0.5 focus:border-emerald-400 focus:outline-none w-24 sm:w-36"
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
                        const target = saveEditorToFile();
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
                      } else if (vimMode === 'NORMAL') {
                        if (e.key === 'i' || e.key === 'a') {
                          e.preventDefault();
                          setVimMode('INSERT');
                          setEditorStatusMsg('-- INSERT --');
                        } else if (e.key === 'o') {
                          e.preventDefault();
                          setEditorBuffer((prev) => prev + '\n');
                          setVimMode('INSERT');
                          setEditorStatusMsg('-- INSERT --');
                        } else if (e.key === 'u') {
                          e.preventDefault();
                          setEditorStatusMsg('Already at newest change');
                        } else if (e.key === 'Z' && e.shiftKey) {
                          // Allow ZZ (save & exit) or ZQ (discard)
                          e.preventDefault();
                          closeEditor(true);
                        }
                      }
                    } else if (activeEditor === 'nano') {
                      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'x') {
                        e.preventDefault();
                        closeEditor(true);
                      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'o') {
                        e.preventDefault();
                        const target = saveEditorToFile();
                        setEditorStatusMsg(`[ Wrote ${editorBuffer.split('\n').length} lines to "${target}" ]`);
                      }
                    } else if (activeEditor === 'emacs') {
                      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
                        e.preventDefault();
                        const target = saveEditorToFile();
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
                        const target = saveEditorToFile();
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
                          const target = saveEditorToFile();
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
              <div className="shrink-0 mt-2 sm:mt-3 flex items-center gap-1.5 sm:gap-2 border-t border-slate-200/70 pt-2.5 sm:pt-3 text-[11px] dark:border-white/10">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0 hidden xs:inline">moiz@paris</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0 xs:hidden">moiz</span>
                <span className="text-slate-400 shrink-0">:</span>
                <span className="text-indigo-500 font-bold shrink-0">{currentDir}</span>
                <span className="text-slate-400 shrink-0">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="skills, projects, hire, ls, ./doctor-iq..."
                  className="min-w-0 flex-1 bg-transparent font-mono text-[11px] text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white dark:placeholder:text-slate-500"
                />
                <button
                  type="button"
                  aria-label="Execute command"
                  onClick={() => executeCommand(inputVal)}
                  disabled={!inputVal.trim()}
                  className="shrink-0 rounded-lg bg-indigo-600 px-2.5 py-1.5 text-[10px] font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-40"
                >
                  <FiCornerDownLeft />
                </button>
              </div>

              {/* Pinned Quick Action Chips */}
              <div className="shrink-0 mt-2 flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mr-1 hidden sm:inline">Quick:</span>
                {quickChips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      executeCommand(chip);
                    }}
                    className="rounded-lg border border-slate-200 bg-slate-100/90 px-2 py-1 text-[10px] font-medium text-slate-700 transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-indigo-400/50 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300"
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
