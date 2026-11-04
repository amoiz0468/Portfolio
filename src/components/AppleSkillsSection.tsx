import { motion } from 'framer-motion';
import { FiTerminal } from 'react-icons/fi';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';
import SpotlightCard from './SpotlightCard';
import { useLanguage } from '../context/LanguageContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function AppleSkillsSection() {
  const { t } = useLanguage();
  const { eyebrow, title, subtitle, domainLabel, productionVetted, spokenLanguagesTitle, engineeringValuesTitle, skillGroups, languages, values } = t.skillsSection;

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-28 sm:px-6 lg:px-8">
      <Reveal>
        <SectionTitle
          eyebrow={eyebrow}
          eyebrowIcon={<FiTerminal />}
          title={title}
          subtitle={subtitle}
        />
      </Reveal>

      {/* 4 Core Domain Cards */}
      <div className="mt-14 grid auto-rows-fr items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((group, groupIdx) => (
          <Reveal key={group.title} delay={groupIdx * 0.08} className="h-full">
            <SpotlightCard className="group flex h-full flex-col justify-between transition-all duration-300 hover:-translate-y-1.5">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">
                    {domainLabel} {groupIdx + 1}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-indigo-500 dark:bg-indigo-400 transition group-hover:scale-125" />
                </div>
                <h3 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">{group.title}</h3>

                {/* Staggered Pills */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {group.items.map((item) => (
                    <motion.span
                      key={item}
                      variants={itemVariants}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors duration-200 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-indigo-400/40 dark:hover:bg-indigo-500/15 dark:hover:text-white"
                    >
                      {item}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              <div className="mt-6 border-t border-slate-200/80 dark:border-white/10 pt-4 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {productionVetted}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      {/* Languages & Values Mini-Bento */}
      <div className="mt-8 grid items-stretch gap-6 md:grid-cols-2 md:auto-rows-fr">
        <Reveal delay={0.1} className="h-full">
          <SpotlightCard className="h-full">
            <div className="flex h-full flex-col">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">
                {spokenLanguagesTitle}
              </span>
              <div className="mt-5 grid flex-1 auto-rows-fr items-stretch gap-3 sm:grid-cols-3">
                {languages.map((l) => (
                  <div
                    key={l.language}
                    className="flex h-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-center transition hover:border-indigo-400 dark:border-white/10 dark:bg-slate-950/40 dark:hover:border-indigo-400/30"
                  >
                    <p className="text-base font-bold text-slate-900 dark:text-white">{l.language}</p>
                    <p className="mt-1 text-xs font-semibold text-indigo-600 dark:text-indigo-300">{l.level}</p>
                    <p className="mt-1.5 flex min-h-[2.75rem] items-start justify-center text-[11px] leading-snug text-slate-500 dark:text-slate-400">
                      {l.proficiency}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={0.16} className="h-full">
          <SpotlightCard className="h-full">
            <div className="flex h-full flex-col">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">
                {engineeringValuesTitle}
              </span>
              <div className="mt-5 flex flex-1 flex-wrap content-start gap-2">
                {values.map((v) => (
                  <span
                    key={v}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-medium text-slate-700 transition-colors duration-200 hover:border-indigo-400 hover:text-indigo-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-indigo-400/30 dark:hover:text-white"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
