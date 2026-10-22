import { ReactNode } from 'react';

type SectionTitleProps = {
  eyebrow?: string;
  eyebrowIcon?: ReactNode;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
};

export default function SectionTitle({
  eyebrow,
  eyebrowIcon,
  title,
  subtitle,
  align = 'left',
  as = 'h2',
}: SectionTitleProps) {
  const isCenter = align === 'center';
  const HeadingTag = as;

  return (
    <div className={`space-y-4 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-2xl'}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300 backdrop-blur-xl ${isCenter ? 'mx-auto' : ''}`}>
          {eyebrowIcon && <span className="text-indigo-600 dark:text-indigo-400">{eyebrowIcon}</span>}
          <span>{eyebrow}</span>
        </div>
      )}
      <HeadingTag className="text-[clamp(2rem,4vw+0.5rem,3.5rem)] font-black tracking-[-0.035em] leading-[1.05] text-slate-900 dark:text-white">
        <span className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
          {title}
        </span>
      </HeadingTag>
      {subtitle && (
        <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
