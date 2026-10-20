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
export function buildPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profilepage`,
        url: absoluteUrl('/'),
        name: `${profile.name} — ${profile.title}`,
        inLanguage: 'en',
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
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Paris',
          addressCountry: 'FR',
        },
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'EPITECH Paris' },
        sameAs: [profile.linkedin, profile.github],
        knowsAbout: [
          'Web Development',
          'DevOps',
          'Artificial Intelligence',
          'Machine Learning',
          'Cloud Computing',
          'Python',
          'TypeScript',
          'Docker',
          'AWS',
          'LangChain',
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
