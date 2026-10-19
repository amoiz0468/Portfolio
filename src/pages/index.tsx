import Head from 'next/head';
import { useState } from 'react';
import {
  FiClock,
  FiCpu,
  FiCloud,
  FiCode,
  FiLayers,
  FiAward,
  FiBookOpen,
  FiTrendingUp,
  FiHeart,
} from 'react-icons/fi';
import ProjectModal from '../components/ProjectModal';
import Reveal from '../components/Reveal';
import SectionTitle from '../components/SectionTitle';
import SpotlightCard from '../components/SpotlightCard';
import AppleHero from '../components/AppleHero';
import AppleStickyStory from '../components/AppleStickyStory';
import AppleProjectCard from '../components/AppleProjectCard';
import AppleSkillsSection from '../components/AppleSkillsSection';
import InteractiveTerminal from '../components/InteractiveTerminal';
import { useLanguage } from '../context/LanguageContext';
import { profile } from '../data/portfolio';

export default function Home() {
  const { lang, t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    { id: 'All', label: t.projectsSection.filterAll },
    { id: 'AI & ML', label: t.projectsSection.filterAi },
    { id: 'DevOps & Cloud', label: t.projectsSection.filterDevops },
    { id: 'Full-Stack', label: t.projectsSection.filterFullstack },
  ];

  const projectsList = t.projectsSection.projects;

  const filteredProjects = projectsList.filter((p) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'AI & ML') return /medical|ai|ml|cv|benchmarking|santé|deep learning/i.test(p.category + p.title + p.stack.join(' '));
    if (activeCategory === 'DevOps & Cloud') return /devops|infrastructure|cloud|deployment|déploiement/i.test(p.category + p.title + p.stack.join(' '));
    if (activeCategory === 'Full-Stack') return /platform|web|solidarity|conversational|solidarité|conversationnelle/i.test(p.category + p.title + p.stack.join(' '));
    return true;
  });

  const statsList = [
    t.stats.years,
    t.stats.aiProjects,
    t.stats.cloudDeployments,
    t.stats.techStacks,
  ];

  const getStatIcon = (index: number) => {
    switch (index) {
      case 0:
        return <FiClock className="text-indigo-600 dark:text-indigo-400" size={20} />;
      case 1:
        return <FiCpu className="text-violet-600 dark:text-violet-400" size={20} />;
      case 2:
        return <FiCloud className="text-emerald-600 dark:text-emerald-400" size={20} />;
      case 3:
        return <FiCode className="text-amber-600 dark:text-amber-400" size={20} />;
      default:
        return <FiLayers className="text-indigo-600 dark:text-indigo-400" size={20} />;
    }
  };

  return (
    <>
      <Head>
        <title>{`${profile.name} | ${lang === 'fr' ? 'Ingénieur Web, DevOps & IA' : 'Web, DevOps & AI Engineer'}`}</title>
        <meta
          name="description"
          content={
            lang === 'fr'
              ? "Portfolio de Muhammad Abdul Moiz — Ingénieur Web, DevOps et IA basé à Paris."
              : "Portfolio of Muhammad Abdul Moiz — Web, DevOps and AI Engineer based in Paris."
          }
        />
      </Head>

      {/* Global Background Ambient Glow Lights */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden transform-gpu">
        <div className="absolute -left-[10%] top-[5%] h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.08)_0%,rgba(99,102,241,0.01)_50%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(99,102,241,0.12)_0%,rgba(99,102,241,0.02)_50%,transparent_70%)]" />
        <div className="absolute right-[5%] top-[25%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.07)_0%,rgba(139,92,246,0.01)_50%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(139,92,246,0.11)_0%,rgba(139,92,246,0.02)_50%,transparent_70%)]" />
        <div className="absolute bottom-[15%] left-[20%] h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.05)_0%,rgba(245,158,11,0.01)_50%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(245,158,11,0.08)_0%,rgba(245,158,11,0.01)_50%,transparent_70%)]" />
      </div>

      <main className="relative z-10">
        {/* 1. HERO SECTION */}
        <AppleHero />

        {/* 2. STATS & METRICS */}
        <section id="stats" className="content-auto border-y border-slate-200/90 bg-white/70 py-6 sm:py-20 backdrop-blur-md dark:border-white/[0.08] dark:bg-white/[0.02] transition-colors duration-200">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:grid-cols-4">
              {statsList.map((stat, index) => (
                <Reveal key={stat.label} delay={index * 0.08}>
                  <SpotlightCard className="text-left sm:text-center transition-all duration-300 hover:-translate-y-1.5 p-3 sm:p-7 rounded-[1.25rem] sm:rounded-[2rem] active:scale-[0.98]">
                    <div className="flex items-center justify-between">
                      <span className="flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center rounded-xl sm:rounded-2xl bg-indigo-50 ring-1 ring-indigo-200 text-xs sm:text-base text-indigo-600 dark:bg-white/5 dark:ring-white/10 dark:text-indigo-400">
                        {getStatIcon(index)}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="mt-2 sm:mt-5 text-xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 sm:mt-2 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 line-clamp-1 sm:line-clamp-none">
                      {stat.label}
                    </p>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 3. SCROLL-DRIVEN STICKY KEYNOTE STORY */}
        <AppleStickyStory />

        {/* 4. LIVE SYSTEM TELEMETRY */}
        <section className="content-auto mx-auto max-w-5xl px-4 py-10 sm:py-16 sm:px-6 lg:px-8">
          <Reveal>
            <InteractiveTerminal />
          </Reveal>
        </section>

        {/* 5. SELECTED PROJECTS */}
        <section id="projects" className="content-auto mx-auto max-w-6xl px-4 py-12 sm:py-20 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              align="center"
              eyebrow={t.projectsSection.eyebrow}
              eyebrowIcon={<FiLayers />}
              title={t.projectsSection.title}
              subtitle={t.projectsSection.subtitle}
            />
          </Reveal>

          {/* Interactive Category Filter Pills */}
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                      isActive
                        ? 'border border-indigo-500 bg-indigo-600 text-white shadow-md dark:border-indigo-400/40 dark:bg-indigo-500/25 dark:shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                        : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Staggered & Scroll-Linked Project Cards */}
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3 items-stretch">
            {filteredProjects.map((project, index) => (
              <AppleProjectCard
                key={project.title}
                project={project}
                index={index}
                onSelect={() => {
                  const idx = projectsList.findIndex((p) => p.title === project.title);
                  setSelectedProject(idx >= 0 ? idx : index);
                }}
              />
            ))}
          </div>
        </section>

        {/* 6. SKILLS ECOSYSTEM */}
        <AppleSkillsSection />

        {/* 7. CAREER TIMELINE */}
        <section
          id="experience"
          className="content-auto border-y border-slate-200/80 bg-white/70 py-14 sm:py-20 text-slate-900 backdrop-blur-md dark:border-white/[0.06] dark:bg-[#070b14] dark:text-white transition-colors duration-200"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionTitle
                eyebrow={t.experienceSection.eyebrow}
                eyebrowIcon={<FiTrendingUp />}
                title={t.experienceSection.title}
                subtitle={t.experienceSection.subtitle}
              />
            </Reveal>

            <div className="mt-16 space-y-8">
              {t.experienceSection.experiences.map((item, index) => (
                <Reveal key={item.role} delay={index * 0.1}>
                  <SpotlightCard className="transition-all duration-300 hover:-translate-y-1">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">
                          {item.company === 'Brackets Private Limited' ? (
                            <a
                              href="https://www.bracketsltd.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline inline-flex items-center gap-1 group/comp"
                            >
                              {item.company}
                              <span className="text-[10px] opacity-70 group-hover/comp:opacity-100">&nearr;</span>
                            </a>
                          ) : (
                            item.company
                          )}
                        </span>
                        <h3 className="mt-1 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
                          {item.role}
                        </h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                          {item.period}
                        </span>
                        <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:border-indigo-400/30 dark:bg-indigo-500/10 dark:text-indigo-200">
                          {item.location}
                        </span>
                      </div>
                    </div>

                    <ul className="mt-6 space-y-3.5 text-sm leading-relaxed text-slate-700 dark:text-slate-200 sm:text-base">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 8. EDUCATION & HIGHLIGHTS */}
        <section className="content-auto mx-auto max-w-6xl px-4 py-14 sm:py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <SpotlightCard className="flex h-full flex-col justify-between">
                <div>
                  <SectionTitle
                    eyebrow={t.educationSection.educationEyebrow}
                    eyebrowIcon={<FiBookOpen />}
                    title={t.educationSection.educationTitle}
                  />
                  <div className="mt-8 space-y-4">
                    {t.educationSection.items.map((edu) => (
                      <div
                        key={edu.title}
                        className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 transition hover:border-indigo-400 dark:border-white/10 dark:bg-slate-950/40 dark:hover:border-indigo-400/40"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-bold text-slate-900 dark:text-white leading-snug">{edu.title}</p>
                          <span className="shrink-0 whitespace-nowrap rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 shadow-sm dark:border-indigo-400/30 dark:bg-indigo-500/15 dark:text-indigo-300">
                            {edu.period}
                          </span>
                        </div>
                        <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">{edu.school}</p>
                        <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{edu.focus}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>

            <Reveal delay={0.1}>
              <SpotlightCard className="flex h-full flex-col justify-between">
                <div>
                  <SectionTitle
                    eyebrow={t.educationSection.highlightsEyebrow}
                    eyebrowIcon={<FiAward />}
                    title={t.educationSection.highlightsTitle}
                  />
                  <div className="mt-8 grid gap-4">
                    {t.educationSection.achievements.map((item, idx) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm leading-relaxed text-slate-700 transition hover:border-indigo-400 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-200 dark:hover:border-indigo-400/40"
                      >
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-500/20 font-mono text-xs font-bold dark:text-indigo-300">
                          {idx + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </section>

        {/* 9. PASSIONS & LIFE BEYOND CODE */}
        <section id="passions" className="content-auto border-t border-slate-200/90 bg-white/70 py-14 sm:py-20 backdrop-blur-md dark:border-white/[0.08] dark:bg-white/[0.02] transition-colors duration-200">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionTitle
                align="center"
                eyebrow={t.passionsSection.eyebrow}
                eyebrowIcon={<FiHeart />}
                title={t.passionsSection.title}
                subtitle={t.passionsSection.subtitle}
              />
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {t.passionsSection.passions.map((passion, pIdx) => (
                <Reveal key={passion.title} delay={pIdx * 0.06}>
                  <SpotlightCard className="flex h-full flex-col justify-between transition-all duration-300 hover:-translate-y-1.5">
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

        {/* Project Inspection Modal */}
        {selectedProject !== null && projectsList[selectedProject] ? (
          <ProjectModal
            open={selectedProject !== null}
            title={projectsList[selectedProject].title}
            description={projectsList[selectedProject].description}
            stack={projectsList[selectedProject].stack}
            onClose={() => setSelectedProject(null)}
          />
        ) : null}
      </main>
    </>
  );
}
