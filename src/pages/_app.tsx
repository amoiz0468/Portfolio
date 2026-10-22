import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import Lenis from 'lenis';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PortfolioChat from '../components/PortfolioChat';
import MobileBottomNav from '../components/MobileBottomNav';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';

export default function App({ Component, pageProps, router }: AppProps & { router: { route: string } }) {
  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // On mobile touch devices, bypass virtual scrolling so the OS handles 100% native 120Hz momentum scrolling
    const isMobileTouch = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth < 768;
    if (isMobileTouch) return;

    // Initialize Lenis smooth scroll tuned for 120Hz ProMotion (MacBook Pro M4)
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
    });

    // Attach to window for global access
    (window as any).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Intercept anchor clicks for smooth scrolling with offset
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;

      // Special handling for chat triggers
      if (href === '#chat' || href === '/#chat') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('open-chat'));
        return;
      }

      if (href.startsWith('/#')) {
        const id = href.replace('/#', '#');
        const targetEl = document.querySelector(id);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl as HTMLElement, { offset: -80 });
        }
      } else if (href.startsWith('#') && href.length > 1) {
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl as HTMLElement, { offset: -80 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        </Head>
        <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500/25 selection:text-indigo-900 dark:bg-[#090d16] dark:text-slate-100 dark:selection:bg-indigo-500/30 dark:selection:text-white pb-16 md:pb-0 transition-colors duration-200">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-indigo-600 focus:px-4 focus:py-2.5 focus:text-xs focus:font-bold focus:text-white focus:shadow-2xl focus:ring-2 focus:ring-white focus:outline-none"
          >
            Skip to main content
          </a>
          <Navbar />
          <div className="flex-1 flex flex-col">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={router.route}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 flex flex-col"
              >
                <Component {...pageProps} />
              </motion.div>
            </AnimatePresence>
          </div>
          <Footer />
          {/* Native Mobile Bottom Navigation Bar */}
          <MobileBottomNav />
          {/* Global Floating Chat Bubble */}
          <PortfolioChat />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
