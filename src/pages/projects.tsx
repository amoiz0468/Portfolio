import Seo from '../components/Seo';
import { buildProjectsJsonLd } from '../lib/seo';
import { useState } from 'react';
import { FiLayers } from 'react-icons/fi';
import ProjectModal from '../components/ProjectModal';
import Reveal from '../components/Reveal';
import SectionTitle from '../components/SectionTitle';
import AppleProjectCard from '../components/AppleProjectCard';
import { useLanguage } from '../context/LanguageContext';

export default function ProjectsPage() {
  const { lang, t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const projectsList = t.projectsSection.projects;

  return (
    <>
      <Seo
        title={`${lang === 'fr' ? 'Projets' : 'Projects'} | Muhammad Abdul Moiz`}
        description={
          lang === 'fr'
            ? "Projets majeurs de Muhammad Abdul Moiz couvrant l'intelligence artificielle, les systèmes distribués et le cloud."
            : "Selected work by Muhammad Abdul Moiz spanning AI systems, full-stack products, and cloud-native software engineering."
        }
        path="/projects"
        jsonLd={buildProjectsJsonLd(lang)}
      />

      <main id="main-content" role="main">
        <section className="mx-auto max-w-6xl px-4 py-8 sm:py-12 md:py-14 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              as="h1"
              eyebrow={t.projectsSection.eyebrow}
              eyebrowIcon={<FiLayers />}
              title={t.projectsSection.title}
              subtitle={t.projectsSection.subtitle}
            />
          </Reveal>

          <div className="mt-8 sm:mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3 items-stretch">
            {projectsList.map((project, index) => (
              <AppleProjectCard
                key={project.title}
                project={project}
                index={index}
                onSelect={() => setSelectedProject(index)}
              />
            ))}
          </div>
        </section>
      </main>

      {selectedProject !== null && projectsList[selectedProject] ? (
        <ProjectModal
          open={selectedProject !== null}
          title={projectsList[selectedProject].title}
          description={projectsList[selectedProject].description}
          stack={projectsList[selectedProject].stack}
          onClose={() => setSelectedProject(null)}
        />
      ) : null}
    </>
  );
}
