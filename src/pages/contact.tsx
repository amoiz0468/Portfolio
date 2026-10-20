import { useState, useRef, useEffect, FormEvent } from 'react';
import Seo from '../components/Seo';
import {
  FiAlertCircle,
  FiCheck,
  FiCheckCircle,
  FiCopy,
  FiExternalLink,
  FiGithub,
  FiLinkedin,
  FiLoader,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiShield,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import SectionTitle from '../components/SectionTitle';
import { profile } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';
import {
  validateContact,
  sanitizeInput,
  sanitizeSingleLine,
  checkClientRateLimit,
  recordClientSubmission,
} from '../lib/contact-guard';

export default function ContactPage() {
  const { lang, t } = useLanguage();
  const { contactPage } = t;
  const isFrench = lang === 'fr';

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [messageLength, setMessageLength] = useState<number>(0);

  // Time-to-fill velocity tracking for anti-bot / anti-speed troll interception
  const mountTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    mountTimeRef.current = Date.now();
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API restricted
      const textarea = document.createElement('textarea');
      textarea.value = profile.email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // 1. Client-side rate limiting and spam burst throttle
    const rateCheck = checkClientRateLimit(isFrench);
    if (!rateCheck.allowed) {
      setStatus('error');
      setErrorMessage(rateCheck.message || contactPage.formError);
      return;
    }

    const form = event.currentTarget;
    const rawData = new FormData(form);

    const rawName = (rawData.get('name') as string) || '';
    const rawEmail = (rawData.get('email') as string) || '';
    const rawMessage = (rawData.get('message') as string) || '';
    const botcheck = (rawData.get('botcheck') as string) || '';

    const elapsedMs = Date.now() - mountTimeRef.current;

    // 2. Validate, sanitize and intercept bots/trolls
    const validation = validateContact(
      {
        name: rawName,
        email: rawEmail,
        message: rawMessage,
        botcheck,
        elapsedMs,
      },
      isFrench
    );

    // Silent trap for bots and speed trolls: pretend success so they do not retry or spam
    if (validation.isBotOrTrollSilent) {
      setTimeout(() => {
        setStatus('success');
        form.reset();
        setMessageLength(0);
      }, 700);
      return;
    }

    if (!validation.valid) {
      setStatus('error');
      setErrorMessage(validation.errorReason || contactPage.formError);
      return;
    }

    // 3. Clean sanitized parameters
    const cleanName = sanitizeSingleLine(rawName, 100);
    const cleanEmail = sanitizeSingleLine(rawEmail, 254);
    const cleanMessage = sanitizeInput(rawMessage, 4000);

    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'c0135e83-c85d-4c24-a75b-fc100a23e5bb';

    const submitData = new FormData();
    submitData.append('access_key', accessKey);
    submitData.append('name', cleanName);
    submitData.append('email', cleanEmail);
    submitData.append('message', cleanMessage);
    submitData.append('subject', `New Portfolio Inquiry from ${cleanName}`);
    submitData.append('from_name', 'Muhammad Abdul Moiz Portfolio');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: submitData,
      });

      const data = await response.json();

      if (data.success) {
        recordClientSubmission();
        setStatus('success');
        form.reset();
        setMessageLength(0);
      } else {
        setStatus('error');
        setErrorMessage(data.message || contactPage.formError);
      }
    } catch {
      setStatus('error');
      setErrorMessage(contactPage.formError);
    }
  };

  return (
    <>
      <Seo title={contactPage.headTitle} description={contactPage.headDesc} path="/contact" />

      <section className="flex-1 flex flex-col justify-center mx-auto max-w-5xl w-full px-4 py-6 sm:py-8 md:py-10 lg:px-8">
        <Reveal>
          <SectionTitle
            eyebrow={contactPage.eyebrow}
            eyebrowIcon={<FiMail />}
            title={contactPage.title}
            subtitle={contactPage.subtitle}
          />
        </Reveal>

        <div className="mt-8 sm:mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] items-stretch">
          {/* Left Column: Direct Links, Instant Copy & Fallbacks */}
          <Reveal delay={0.05}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-slate-200/90 bg-white/90 p-6 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-md transform-gpu dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                    {contactPage.reachOutDirectly}
                  </p>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Paris • Active</span>
                  </span>
                </div>

                <div className="mt-6 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                  {/* Copyable & Clickable Primary Email */}
                  <div className="group relative flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 transition hover:border-indigo-400 hover:bg-white dark:border-white/5 dark:bg-white/[0.03] dark:hover:border-indigo-400/40 dark:hover:bg-white/10">
                    <a
                      href={`mailto:${profile.email}`}
                      className="flex items-center gap-3 overflow-hidden text-slate-900 transition hover:text-indigo-600 dark:text-slate-100 dark:hover:text-indigo-300"
                    >
                      <FiMail className="shrink-0 text-indigo-600 dark:text-indigo-400" size={17} />
                      <span className="truncate font-medium text-xs sm:text-sm">{profile.email}</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Copy Email"
                      className="ml-2 inline-flex items-center gap-1 rounded-xl border border-slate-200/80 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 transition hover:border-indigo-500 hover:text-indigo-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                      {copied ? (
                        <>
                          <FiCheck className="text-emerald-500" size={12} />
                          <span>{contactPage.emailCopied}</span>
                        </>
                      ) : (
                        <>
                          <FiCopy size={12} />
                          <span>{contactPage.copyEmail}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Phone */}
                  <a
                    href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 text-xs sm:text-sm font-medium transition hover:border-indigo-400 hover:bg-white hover:text-slate-900 dark:border-white/5 dark:bg-white/[0.03] dark:hover:border-indigo-400/40 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    <FiPhone className="text-indigo-600 dark:text-indigo-400" size={17} />
                    <span>{profile.phone}</span>
                  </a>

                  {/* Location */}
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 text-xs sm:text-sm">
                    <FiMapPin className="text-indigo-600 dark:text-indigo-400" size={17} />
                    <span>{profile.location}</span>
                  </div>

                  {/* LinkedIn */}
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 text-xs sm:text-sm font-medium transition hover:border-indigo-400 hover:bg-white hover:text-slate-900 dark:border-white/5 dark:bg-white/[0.03] dark:hover:border-indigo-400/40 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    <div className="flex items-center gap-3">
                      <FiLinkedin className="text-indigo-600 dark:text-indigo-400" size={17} />
                      <span>{contactPage.linkedinLabel}</span>
                    </div>
                    <FiExternalLink className="text-slate-400 dark:text-slate-500" size={14} />
                  </a>

                  {/* GitHub */}
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 text-xs sm:text-sm font-medium transition hover:border-indigo-400 hover:bg-white hover:text-slate-900 dark:border-white/5 dark:bg-white/[0.03] dark:hover:border-indigo-400/40 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    <div className="flex items-center gap-3">
                      <FiGithub className="text-indigo-600 dark:text-indigo-400" size={17} />
                      <span>{contactPage.githubLabel}</span>
                    </div>
                    <FiExternalLink className="text-slate-400 dark:text-slate-500" size={14} />
                  </a>
                </div>
              </div>

              {/* Direct Mail Client Fallback Card */}
              <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 dark:border-indigo-500/20 dark:bg-indigo-950/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-indigo-900 dark:text-indigo-200">
                    <FiShield size={14} />
                    <span>{contactPage.directFallbackNote}</span>
                  </div>
                  <a
                    href={`mailto:${profile.email}?subject=Project%20Inquiry%20-%20Muhammad%20Abdul%20Moiz`}
                    className="text-[11px] font-bold text-indigo-600 underline hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    {contactPage.openMailApp}
                  </a>
                </div>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  {contactPage.availabilityNote}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Web3Forms Secured Form */}
          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-slate-200/90 bg-white/90 p-6 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-md transform-gpu dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot anti-bot protection input (invisible to humans) */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {/* Name */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {contactPage.formName}
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    placeholder={contactPage.formNamePlaceholder}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400/60 dark:focus:bg-white/[0.08]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {contactPage.formEmail}
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    placeholder={contactPage.formEmailPlaceholder}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400/60 dark:focus:bg-white/[0.08]"
                  />
                </div>

                {/* Message */}
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      {contactPage.formMessage}
                    </label>
                    <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                      {messageLength} / 4000 {contactPage.charactersRemaining}
                    </span>
                  </div>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    maxLength={4000}
                    onChange={(e) => setMessageLength(e.target.value.length)}
                    placeholder={contactPage.formMessagePlaceholder}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400/60 dark:focus:bg-white/[0.08]"
                  />
                </div>

                {/* Success Banner */}
                {status === 'success' && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-300"
                  >
                    <FiCheckCircle className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" size={18} />
                    <div className="flex-1">
                      <p className="font-semibold">{contactPage.formSuccess}</p>
                    </div>
                  </div>
                )}

                {/* Error Banner with Interactive Fallback */}
                {status === 'error' && (
                  <div
                    role="alert"
                    className="space-y-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-800 dark:border-rose-400/30 dark:bg-rose-500/15 dark:text-rose-300"
                  >
                    <div className="flex items-start gap-2.5">
                      <FiAlertCircle className="mt-0.5 shrink-0 text-rose-600 dark:text-rose-400" size={18} />
                      <p className="font-medium">{errorMessage || contactPage.formError}</p>
                    </div>
                    {/* Fallback Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-rose-200/50 dark:border-rose-500/20">
                      <a
                        href={`mailto:${profile.email}?subject=Portfolio%20Inquiry`}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-rose-300 bg-white/90 px-3 py-1.5 text-xs font-semibold text-rose-800 shadow-sm transition hover:bg-white dark:border-rose-500/30 dark:bg-rose-950/40 dark:text-rose-200 dark:hover:bg-rose-900/60"
                      >
                        <FiMail size={13} />
                        <span>{contactPage.openMailApp}</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-rose-300 bg-white/90 px-3 py-1.5 text-xs font-semibold text-rose-800 shadow-sm transition hover:bg-white dark:border-rose-500/30 dark:bg-rose-950/40 dark:text-rose-200 dark:hover:bg-rose-900/60"
                      >
                        {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
                        <span>{copied ? contactPage.emailCopied : contactPage.copyEmail}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <motion.button
                  whileHover={status !== 'loading' ? { scale: 1.015 } : undefined}
                  whileTap={status !== 'loading' ? { scale: 0.985 } : undefined}
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 py-3.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(79,70,229,0.3)] transition hover:shadow-[0_0_35px_rgba(79,70,229,0.5)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <>
                      <FiLoader className="animate-spin" size={16} />
                      <span>{contactPage.formSubmitting}</span>
                    </>
                  ) : (
                    <>
                      <span>{contactPage.formSubmit}</span>
                      <FiSend size={15} />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
