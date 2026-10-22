import Image from 'next/image';
import Link from 'next/link';
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiArrowUp, FiSun, FiMoon, FiGlobe } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { lang, toggleLang, t } = useLanguage();
  const { theme, toggleTheme, mounted } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer role="contentinfo" className="mt-28 border-t border-slate-200/90 bg-white/85 text-slate-800 backdrop-blur-2xl dark:border-white/[0.08] dark:bg-[#090d16]/90 dark:text-slate-100 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr_1fr]">
          {/* Brand & Summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-indigo-400/40 shadow-[0_0_15px_rgba(99,102,241,0.35)]">
                <Image
                  src="https://portfolio-image-moiz.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-09-25+at+5.49.35+PM.jpeg"
                  alt="Muhammad Abdul Moiz"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <span className="text-base font-bold text-slate-900 dark:text-white">Muhammad Abdul Moiz</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {t.footer.brandBio}
            </p>

            {/* Language & Theme Controls */}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={toggleLang}
                aria-label={lang === 'en' ? 'Basculer en français' : 'Switch to English'}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <FiGlobe size={13} className="text-indigo-500" />
                <span>{lang === 'en' ? 'Version Française' : 'English Version'}</span>
              </button>

              <button
                onClick={toggleTheme}
                aria-label={t.nav.toggleThemeAria}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              >
                {mounted && theme === 'dark' ? (
                  <>
                    <FiSun size={13} className="text-amber-400" />
                    <span>{t.nav.themeLight}</span>
                  </>
                ) : (
                  <>
                    <FiMoon size={13} className="text-indigo-600 dark:text-slate-300" />
                    <span>{t.nav.themeDark}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              {t.footer.navHeading}
            </p>
            <div className="mt-4 flex flex-col gap-2.5 text-sm text-slate-600 dark:text-slate-300">
              <Link href="/#overview" className="transition hover:text-indigo-600 dark:hover:text-white">{t.footer.overview}</Link>
              <Link href="/#projects" className="transition hover:text-indigo-600 dark:hover:text-white">{t.footer.selectedProjects}</Link>
              <Link href="/#experience" className="transition hover:text-indigo-600 dark:hover:text-white">{t.footer.experienceTimeline}</Link>
              <Link href="/#skills" className="transition hover:text-indigo-600 dark:hover:text-white">{t.footer.technicalEcosystem}</Link>
              <Link
                href="/#chat"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('open-chat'));
                  }
                }}
                className="text-indigo-600 font-semibold transition hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                {t.footer.aiAssistant}
              </Link>
              <Link href="/about" className="transition hover:text-indigo-600 dark:hover:text-white">{t.footer.aboutMoiz}</Link>
              <Link href="/contact" className="transition hover:text-indigo-600 dark:hover:text-white">{t.footer.contact}</Link>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              {t.footer.contactHeading}
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <a
                href="mailto:amoiz0468@gmail.com"
                className="flex items-center gap-2.5 transition hover:text-indigo-600 dark:hover:text-white"
              >
                <FiMail className="text-indigo-500 dark:text-indigo-400" size={15} /> amoiz0468@gmail.com
              </a>
              <a
                href="tel:+33759247911"
                className="flex items-center gap-2.5 transition hover:text-indigo-600 dark:hover:text-white"
              >
                <FiPhone className="text-indigo-500 dark:text-indigo-400" size={15} /> +33 7 59 24 79 11
              </a>
              <a
                href="https://linkedin.com/in/moizghauri"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 transition hover:text-indigo-600 dark:hover:text-white"
              >
                <FiLinkedin className="text-indigo-500 dark:text-indigo-400" size={15} /> linkedin.com/in/moizghauri
              </a>
              <a
                href="https://github.com/amoiz0468"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 transition hover:text-indigo-600 dark:hover:text-white"
              >
                <FiGithub className="text-indigo-500 dark:text-indigo-400" size={15} /> github.com/amoiz0468
              </a>
            </div>

            {/* Back to top button */}
            <div className="mt-6">
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={scrollToTop}
                aria-label={t.footer.backToTop}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-200 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <FiArrowUp size={13} /> {t.footer.backToTop}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
