import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiGlobe,
} from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const router = useRouter();
  const { lang, toggleLang, t } = useLanguage();
  const { theme, toggleTheme, mounted } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  type NavItem = { href: string; label: string };
  const navItems: NavItem[] = [
    { href: '/#overview', label: t.nav.overview },
    { href: '/#projects', label: t.nav.projects },
    { href: '/#experience', label: t.nav.experience },
    { href: '/#skills', label: t.nav.skills },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scroll through Lenis & chat triggers
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '/#chat' || href === '#chat') {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('open-chat'));
      setMobileMenuOpen(false);
      return;
    }

    if (href.startsWith('/#') || href.startsWith('#')) {
      const id = href.replace('/#', '#');
      if (router.pathname === '/') {
        e.preventDefault();
        const el = document.querySelector(id);
        if (el) {
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(el as HTMLElement, { offset: -80 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Apple-style Scroll Progress Indicator */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-[2.5px] origin-left bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 shadow-[0_0_12px_rgba(99,102,241,0.8)]"
        style={{ scaleX }}
      />

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'border-b border-slate-200/80 bg-white/85 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-[#090d16]/90 dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-[20px]'
            : 'border-b border-slate-200/50 bg-white/60 dark:border-white/[0.04] dark:bg-[#090d16]/75 backdrop-blur-[16px]'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo / Brand */}
          <Link href="/" className="group flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-indigo-400/40 shadow-[0_0_16px_rgba(99,102,241,0.35)]"
            >
              <Image
                src="https://portfolio-image-moiz.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-09-25+at+5.49.35+PM.jpeg"
                alt="Muhammad Abdul Moiz"
                fill
                priority
                sizes="36px"
                className="object-cover"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white transition-colors duration-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-200">
                Muhammad Abdul Moiz
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                {t.nav.roleParis}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav aria-label="Main navigation" className="hidden items-center gap-1 rounded-full border border-slate-200/90 bg-slate-100/70 p-1.5 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.03] lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative rounded-full px-3.5 py-1.5 text-xs font-medium text-slate-700 transition-all duration-200 hover:bg-slate-200/70 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-white"
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Social Icons, Language & Theme Toggles + Contact CTA */}
          <div className="hidden items-center gap-2 sm:flex">
            {/* Language Switcher Pill */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLang}
              aria-label={t.nav.toggleLangAria}
              title={t.nav.toggleLangAria}
              className="flex h-9 items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white/80 px-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:border-indigo-400/40 hover:bg-indigo-50 hover:text-indigo-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <FiGlobe size={13} className="text-indigo-500 dark:text-indigo-400" />
              <span className="uppercase tracking-wider">{lang === 'en' ? 'FR' : 'EN'}</span>
            </motion.button>

            {/* Theme Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              aria-label={t.nav.toggleThemeAria}
              title={t.nav.toggleThemeAria}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/90 bg-white/80 text-slate-700 shadow-sm transition hover:border-indigo-400/40 hover:bg-indigo-50 hover:text-indigo-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {mounted && theme === 'dark' ? (
                <FiSun size={15} className="text-amber-400" />
              ) : (
                <FiMoon size={15} className="text-indigo-600 dark:text-slate-300" />
              )}
            </motion.button>

            <motion.a
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              href="https://github.com/amoiz0468"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/90 bg-white/80 text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <FiGithub size={15} />
            </motion.a>
            <motion.a
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              href="https://linkedin.com/in/moizghauri"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/90 bg-white/80 text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <FiLinkedin size={15} />
            </motion.a>
            <motion.a
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              href="mailto:amoiz0468@gmail.com"
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/90 bg-white/80 text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <FiMail size={15} />
            </motion.a>

            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="ml-1 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all duration-200 hover:from-indigo-500 hover:to-indigo-600 hover:shadow-[0_0_30px_rgba(79,70,229,0.45)]"
              >
                {t.nav.hireMe}
              </motion.button>
            </Link>
          </div>

          {/* Mobile Action Controls & Menu Button */}
          <div className="flex items-center gap-1.5 sm:hidden">
            {/* Mobile Lang Button */}
            <button
              onClick={toggleLang}
              aria-label={t.nav.toggleLangAria}
              className="flex h-8 items-center gap-1 rounded-lg border border-slate-200 bg-white/90 px-2 text-[11px] font-bold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            >
              <FiGlobe size={11} className="text-indigo-500" />
              <span>{lang === 'en' ? 'FR' : 'EN'}</span>
            </button>

            {/* Mobile Theme Button */}
            <button
              onClick={toggleTheme}
              aria-label={t.nav.toggleThemeAria}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white/90 text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            >
              {mounted && theme === 'dark' ? (
                <FiSun size={13} className="text-amber-400" />
              ) : (
                <FiMoon size={13} className="text-indigo-600 dark:text-slate-300" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white/90 text-slate-700 shadow-sm transition dark:border-white/10 dark:bg-white/5 dark:text-slate-200 active:scale-95"
            >
              {mobileMenuOpen ? <FiX size={16} /> : <FiMenu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-b border-slate-200 bg-white/98 px-4 pb-6 pt-3 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-[#090d16]/95 sm:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white"
                >
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-white/10">
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/amoiz0468"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:text-slate-900 dark:border-white/10 dark:text-slate-300 dark:hover:text-white"
                >
                  <FiGithub size={15} />
                </a>
                <a
                  href="https://linkedin.com/in/moizghauri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:text-slate-900 dark:border-white/10 dark:text-slate-300 dark:hover:text-white"
                >
                  <FiLinkedin size={15} />
                </a>
                <a
                  href="mailto:amoiz0468@gmail.com"
                  className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:text-slate-900 dark:border-white/10 dark:text-slate-300 dark:hover:text-white"
                >
                  <FiMail size={15} />
                </a>
              </div>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <button className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white">
                  {t.nav.hireMe}
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </header>
    </>
  );
}
