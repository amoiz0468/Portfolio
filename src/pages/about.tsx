import Seo from '../components/Seo';
import { buildAboutJsonLd } from '../lib/seo';
import { FiBookOpen, FiCompass, FiGlobe, FiHeart } from 'react-icons/fi';
import Reveal from '../components/Reveal';
import SectionTitle from '../components/SectionTitle';
import SpotlightCard from '../components/SpotlightCard';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { lang, t } = useLanguage();
  const { aboutPage, educationSection, skillsSection, passionsSection } = t;

  return (
    <>
      <Seo
        title={aboutPage.headTitle}
        description={aboutPage.headDesc}
        path="/about"
        jsonLd={buildAboutJsonLd(lang)}
      />

      <main id="main-content" role="main">
        <section className="mx-auto max-w-5xl px-4 py-8 sm:py-12 md:py-14 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              as="h1"
              eyebrow={aboutPage.eyebrow}
              eyebrowIcon={<FiCompass />}
              title={aboutPage.title}
              subtitle={aboutPage.subtitle}
            />
          </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 sm:mt-10 rounded-[2.5rem] border border-slate-200/90 bg-white/90 p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md transform-gpu dark:border-white/10 dark:bg-slate-900/80 dark:shadow-2xl">
            <p className="text-lg leading-relaxed text-slate-900 dark:text-slate-200 sm:text-xl font-medium">
              {aboutPage.summary}
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {aboutPage.p2}
            </p>
          </div>
        </Reveal>

        <div className="mt-8 sm:mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-[2.5rem] border border-slate-200/90 bg-white/90 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md transform-gpu dark:border-white/10 dark:bg-slate-900/80 dark:shadow-xl">
              <div>
                <SectionTitle
                  eyebrow={aboutPage.academicEyebrow}
                  eyebrowIcon={<FiBookOpen />}
                  title={aboutPage.academicTitle}
                />
                <div className="mt-8 space-y-4">
                  {educationSection.items.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 transition hover:border-indigo-400 dark:border-white/10 dark:bg-slate-950/40 dark:hover:border-indigo-400/40"
                    >
                      <p className="font-bold text-slate-900 dark:text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.school}</p>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
                        {item.period}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col justify-between rounded-[2.5rem] border border-slate-200/90 bg-white/90 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md transform-gpu dark:border-white/10 dark:bg-slate-900/80 dark:shadow-xl">
              <div>
                <SectionTitle
                  eyebrow={aboutPage.valuesEyebrow}
                  eyebrowIcon={<FiGlobe />}
                  title={aboutPage.valuesTitle}
                />
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {skillsSection.values.map((value) => (
                    <div
                      key={value}
                      className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-medium text-slate-700 transition hover:border-indigo-400 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-200 dark:hover:border-indigo-400/40"
                    >
                      {value}
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-indigo-200/80 bg-indigo-50/50 p-5 dark:border-white/10 dark:bg-slate-900/60">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700 dark:text-indigo-300">
                    {aboutPage.languagesTitle}
                  </p>
                  <ul className="mt-3 space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {skillsSection.languages.map((l) => (
                      <li key={l.language}>
                        <span className="font-semibold text-slate-900 dark:text-white">{l.language}</span>: {l.level} ({l.proficiency})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Passions, Hobbies & Life Beyond Code */}
        <div className="mt-12 sm:mt-16">
          <Reveal>
            <SectionTitle
              eyebrow={aboutPage.passionsEyebrow}
              eyebrowIcon={<FiHeart />}
              title={aboutPage.passionsTitle}
              subtitle={aboutPage.passionsSubtitle}
            />
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {passionsSection.passions.map((passion, pIdx) => (
              <Reveal key={passion.title} delay={pIdx * 0.06}>
                <SpotlightCard className="flex h-full flex-col justify-between transition hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-700 dark:border-indigo-400/30 dark:bg-indigo-500/10 dark:text-indigo-300">
                        {passion.tag}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
                        0{pIdx + 1}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                      {passion.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-indigo-600 dark:text-indigo-200/80">
                      {passion.subtitle}
                    </p>

                    <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      {passion.description}
                    </p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
