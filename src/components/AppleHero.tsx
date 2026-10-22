import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  FiArrowRight,
  FiChevronDown,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiMessageSquare,
} from 'react-icons/fi';
import SpotlightCard from './SpotlightCard';
import { profile } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

export default function AppleHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isFirefox, setIsFirefox] = useState(false);
  const [heroCardTab, setHeroCardTab] = useState<'specs' | 'live'>('specs');
  const [parisTime, setParisTime] = useState('');
  const { t, lang } = useLanguage();

  useEffect(() => {
    setIsFirefox(typeof navigator !== 'undefined' && /firefox/i.test(navigator.userAgent));
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);

    const updateTime = () => {
      setParisTime(
        new Date().toLocaleTimeString('fr-FR', {
          timeZone: 'Europe/Paris',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);

  // Scroll-linked scale down and fade out (applied only on desktop where columns are side-by-side)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.85], [1, 0.96]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-[95vh] w-full">
      <motion.section
        id="overview"
        style={
          shouldReduceMotion || isMobile
            ? undefined
            : isFirefox
            ? { opacity: heroOpacity }
            : { scale: heroScale, opacity: heroOpacity }
        }
        className="mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left Column: Headlines & Call to Actions */}
          <div>
            {/* Top Available Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: APPLE_EASE }}
              className="inline-flex items-center gap-2.5 rounded-full border border-slate-200/90 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>{t.hero.availableBadge}</span>
            </motion.div>

            {/* Main Fluid Tight Headline (Apple style) */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: APPLE_EASE }}
              className="mt-8 text-[clamp(2.5rem,5.8vw+1rem,5.2rem)] font-black leading-[1.08] tracking-[-0.03em] text-slate-900 dark:text-white"
            >
              {t.hero.headlinePart1}{' '}
              <span className="block py-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-amber-200">
                {t.hero.headlinePart2}
              </span>
              <span className="block pt-0.5 text-slate-500 dark:text-slate-400">{t.hero.headlinePart3}</span>
            </motion.h1>

            {/* Subtitle / Pitch */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: APPLE_EASE }}
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-700 dark:text-slate-300 sm:text-lg"
            >
              {t.hero.summary}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: APPLE_EASE }}
              className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="group flex items-center gap-2.5 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-semibold text-white shadow-[0_0_25px_rgba(79,70,229,0.35)] hover:shadow-[0_0_40px_rgba(79,70,229,0.55)] active:scale-95"
                >
                  <span>{t.hero.getInTouch}</span>
                  <FiArrowRight className="transition group-hover:translate-x-1" />
                </motion.button>
              </Link>

              <a href="#projects">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 rounded-full border border-slate-300/80 bg-white/90 px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-xl hover:border-slate-400 hover:bg-slate-100 hover:text-slate-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-white/25 dark:hover:bg-white/[0.08] dark:hover:text-white active:scale-95"
                >
                  {t.hero.viewInventions}
                </motion.button>
              </a>

              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-chat'));
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 rounded-full border border-indigo-400/40 bg-indigo-50/80 px-4 py-3 sm:px-5 sm:py-3.5 text-xs sm:text-sm font-semibold text-indigo-700 shadow-sm backdrop-blur-xl hover:bg-indigo-100 hover:text-indigo-900 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300 dark:hover:bg-indigo-500/20 dark:hover:text-white active:scale-95"
                >
                  <FiMessageSquare /> {t.hero.askAi}
                </motion.div>
              </button>
            </motion.div>

            {/* Quick Contact Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: APPLE_EASE }}
              className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-medium text-slate-600 dark:text-slate-400"
            >
              <span className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 sm:px-3.5 sm:py-1.5 shadow-sm dark:border-white/5 dark:bg-white/[0.02]">
                <FiMapPin className="text-indigo-500 dark:text-indigo-400" /> {profile.location}
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 sm:px-3.5 sm:py-1.5 shadow-sm transition hover:text-indigo-600 dark:border-white/5 dark:bg-white/[0.02] dark:hover:text-white"
              >
                <FiMail className="text-indigo-500 dark:text-indigo-400" /> {profile.email}
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 sm:px-3.5 sm:py-1.5 shadow-sm transition hover:text-indigo-600 dark:border-white/5 dark:bg-white/[0.02] dark:hover:text-white"
              >
                <FiPhone className="text-indigo-500 dark:text-indigo-400" /> {profile.phone}
              </a>
            </motion.div>
          </div>

          {/* Right Column: Apple-Style Spotlight Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: APPLE_EASE }}
          >
            <SpotlightCard className="mx-auto w-full max-w-[500px] p-4 sm:p-7">
              {/* Top Bar Indicators & Interactive Tab Switcher */}
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-3 sm:pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-500/70" />
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-amber-500/70" />
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500/70" />
                </div>
                <div className="flex items-center gap-1 rounded-full bg-slate-100/90 dark:bg-white/5 p-0.5 border border-slate-200/70 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setHeroCardTab('specs')}
                    className={`rounded-full px-2.5 py-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.15em] transition ${
                      heroCardTab === 'specs'
                        ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    {t.hero.specsTag}
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroCardTab('live')}
                    className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.15em] transition ${
                      heroCardTab === 'live'
                        ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-300 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live</span>
                  </button>
                </div>
              </div>

              {/* Profile Image & Highlights - Horizontal on mobile, Grid on desktop */}
              <div className="mt-4 sm:mt-6 flex flex-row items-center gap-4 sm:grid sm:grid-cols-[160px_1fr] sm:gap-6">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="relative h-20 w-20 sm:h-auto sm:w-full sm:aspect-[4/5] sm:max-w-[160px] shrink-0 overflow-hidden rounded-2xl sm:rounded-[1.8rem] border border-slate-200 dark:border-white/20 bg-slate-100 dark:bg-slate-900 shadow-md dark:shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
                >
                  <Image
                    src="https://portfolio-image-moiz.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-09-25+at+5.49.35+PM.jpeg"
                    alt="Muhammad Abdul Moiz"
                    fill
                    sizes="(max-width: 640px) 80px, 160px"
                    className="object-cover object-[center_18%]"
                    priority
                  />
                </motion.div>

                <div className="space-y-1.5 sm:space-y-3 min-w-0">
                  <div>
                    <h3 className="text-base sm:text-xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                      Muhammad Abdul Moiz
                    </h3>
                    <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-300">
                      {lang === 'fr' ? 'Web • DevOps • IA' : 'Web • DevOps • AI'}
                    </p>
                  </div>

                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 hidden sm:block">
                    {t.hero.summary.slice(0, 115)}...
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-0.5 sm:pt-1">
                    <span className="rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                      Paris, France
                    </span>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                      {t.hero.openToWork}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mode A: Specs Breakdown */}
              {heroCardTab === 'specs' ? (
                <div className="mt-6 space-y-2.5 rounded-2xl border border-slate-200/80 bg-slate-50/80 dark:border-white/10 dark:bg-slate-950/40 p-4 text-xs transition-all">
                  <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-white/10 pb-2">
                    <span className="text-slate-500 dark:text-slate-400">{t.hero.coreFocus}</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{t.hero.coreFocusValue}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-white/10 pb-2">
                    <span className="text-slate-500 dark:text-slate-400">{t.hero.primaryStack}</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{t.hero.primaryStackValue}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">{t.hero.currentRole}</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{t.hero.currentRoleValue}</span>
                  </div>
                </div>
              ) : (
                /* Mode B: Live Real-Time Telemetry & Status */
                <div className="mt-6 space-y-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-50/40 dark:border-emerald-500/20 dark:bg-emerald-950/20 p-4 text-xs transition-all">
                  <div className="flex items-center justify-between border-b border-emerald-200/60 dark:border-white/10 pb-2">
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                      Local Paris Time
                    </span>
                    <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">{parisTime || '15:55:00'} CET</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-emerald-200/60 dark:border-white/10 pb-2">
                    <span className="text-slate-500 dark:text-slate-400">Current Track</span>
                    <span className="font-semibold text-slate-900 dark:text-white">Alternance @ EPITECH Paris</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Next Opportunity</span>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">Future CDI / CDD (Sept 2027)</span>
                  </div>
                </div>
              )}

              {/* Social Quick Bar */}
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-200/80 dark:border-white/10 pt-4">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 dark:border-white/10 dark:bg-white/5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <FiLinkedin /> LinkedIn
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 dark:border-white/10 dark:bg-white/5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <FiGithub /> GitHub
                </a>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="mt-12 flex justify-center">
          <a
            href="#stats"
            aria-label="Scroll down to explore"
            className="flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition"
          >
            <span>{t.hero.explore}</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FiChevronDown size={18} />
            </motion.div>
          </a>
        </div>
      </motion.section>
    </div>
  );
}
