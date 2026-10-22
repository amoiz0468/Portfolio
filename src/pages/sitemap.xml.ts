import type { GetServerSideProps } from 'next';
import { SITE_ROUTES, absoluteUrl } from '../lib/seo';

function buildSitemap(): string {
  const lastmod = new Date().toISOString().split('T')[0];
  const urls = SITE_ROUTES.map(({ path, priority, changefreq }) => {
    const loc = absoluteUrl(path);
    return `  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${loc}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${loc}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}"/>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=3600');
  res.write(buildSitemap());
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
