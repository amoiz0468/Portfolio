import { profile } from '../data/portfolio';

/** Canonical production origin (no trailing slash). Override with NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://muhammad-abdul-moiz.vercel.app').replace(/\/+$/, '');

export const SITE_NAME = profile.name;
export const DEFAULT_OG_IMAGE = '/og-image.png';

export const SEO_KEYWORDS = [
  'Muhammad Abdul Moiz',
  'Moiz Ghauri',
  'Web Developer Paris',
  'DevOps Engineer',
  'AI Engineer',
  'Machine Learning Engineer',
  'Full-Stack Developer',
  'EPITECH Paris',
  'FastAPI',
  'Django',
  'React',
  'Next.js',
  'TypeScript',
  'Docker',
  'AWS',
  'LangChain',
  'LangGraph',
  'Portfolio',
];

/** Indexable routes, used by the sitemap. */
export const SITE_ROUTES: { path: string; priority: number; changefreq: string }[] = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/projects', priority: 0.9, changefreq: 'monthly' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/contact', priority: 0.7, changefreq: 'yearly' },
];

export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return clean === '/' ? `${SITE_URL}/` : `${SITE_URL}${clean}`;
}

/** schema.org ProfilePage + Person + WebSite graph for rich results / knowledge panel. */
export function buildPersonJsonLd(lang: 'en' | 'fr' = 'en') {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profilepage`,
        url: absoluteUrl('/'),
        name: `${profile.name} — ${profile.title}`,
        inLanguage: lang,
        dateCreated: '2025-09-01T00:00:00+02:00',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: { '@id': `${SITE_URL}/#person` },
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: profile.name,
        alternateName: 'Moiz Ghauri',
        jobTitle: profile.title,
        description: profile.summary,
        url: absoluteUrl('/'),
        image: absoluteUrl('/avatar.png'),
        email: `mailto:${profile.email}`,
        telephone: profile.phone,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Paris',
          addressCountry: 'FR',
        },
        alumniOf: [
          {
            '@type': 'CollegeOrUniversity',
            name: 'EPITECH Paris',
            url: 'https://www.epitech.eu/',
          },
          {
            '@type': 'CollegeOrUniversity',
            name: 'FAST-NUCES',
            url: 'https://www.nu.edu.pk/',
          },
        ],
        sameAs: [profile.linkedin, profile.github],
        knowsAbout: [
          'Web Development',
          'DevOps',
          'Artificial Intelligence',
          'Machine Learning',
          'Cloud Computing',
          'Python',
          'FastAPI',
          'Django',
          'TypeScript',
          'React',
          'Next.js',
          'Docker',
          'AWS',
          'CI/CD',
          'LangChain',
          'LangGraph',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: absoluteUrl('/'),
        name: SITE_NAME,
        inLanguage: ['en', 'fr'],
        publisher: { '@id': `${SITE_URL}/#person` },
      },
    ],
  };
}

/** schema.org CollectionPage + ItemList for projects page rich snippet indexation. */
export function buildProjectsJsonLd(lang: 'en' | 'fr' = 'en') {
  const { projects } = require('../data/portfolio');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/projects/#page`,
        url: absoluteUrl('/projects'),
        name: `${lang === 'fr' ? 'Projets' : 'Projects'} | ${profile.name}`,
        description:
          lang === 'fr'
            ? "Projets majeurs de Muhammad Abdul Moiz couvrant l'intelligence artificielle, les systemes distribues et le cloud."
            : 'Selected engineering projects by Muhammad Abdul Moiz spanning AI systems, full-stack products, and cloud infrastructure.',
        inLanguage: lang,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: absoluteUrl('/'),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: lang === 'fr' ? 'Projets' : 'Projects',
              item: absoluteUrl('/projects'),
            },
          ],
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/projects/#itemlist`,
        name: `${profile.name} — Featured Projects`,
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        numberOfItems: projects.length,
        itemListElement: projects.map((p: any, idx: number) => ({
          '@type': 'ListItem',
          position: idx + 1,
          item: {
            '@type': 'SoftwareApplication',
            name: p.title,
            applicationCategory: p.category,
            operatingSystem: 'Cross-platform, Web, Cloud',
            description: p.description,
            keywords: p.stack.join(', '),
            author: { '@id': `${SITE_URL}/#person` },
          },
        })),
      },
    ],
  };
}

/** schema.org AboutPage graph with academic background and alumni entities. */
export function buildAboutJsonLd(lang: 'en' | 'fr' = 'en') {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${SITE_URL}/about/#page`,
        url: absoluteUrl('/about'),
        name: `${lang === 'fr' ? 'A propos' : 'About'} | ${profile.name}`,
        description: profile.summary,
        inLanguage: lang,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: { '@id': `${SITE_URL}/#person` },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: absoluteUrl('/'),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: lang === 'fr' ? 'A propos' : 'About',
              item: absoluteUrl('/about'),
            },
          ],
        },
      },
    ],
  };
}

/** schema.org ContactPage with verified direct contact points. */
export function buildContactJsonLd(lang: 'en' | 'fr' = 'en') {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${SITE_URL}/contact/#page`,
        url: absoluteUrl('/contact'),
        name: `${lang === 'fr' ? 'Contactez-moi' : 'Contact'} | ${profile.name}`,
        description:
          lang === 'fr'
            ? 'Contactez Muhammad Abdul Moiz pour toute opportunite d alternance ou projet technique.'
            : 'Get in touch with Muhammad Abdul Moiz for software engineering opportunities, contracts, or technical inquiries.',
        inLanguage: lang,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: {
          '@type': 'Person',
          name: profile.name,
          email: `mailto:${profile.email}`,
          telephone: profile.phone,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Paris',
            addressCountry: 'FR',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Professional Contact',
            email: profile.email,
            telephone: profile.phone,
            availableLanguage: ['en', 'fr'],
          },
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: absoluteUrl('/'),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Contact',
              item: absoluteUrl('/contact'),
            },
          ],
        },
      },
    ],
  };
}
