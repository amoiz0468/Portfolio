import type { GetServerSideProps } from 'next';
import { SITE_URL } from '../lib/seo';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const body = `User-agent: *
Allow: /
Disallow: /api/

Host: ${SITE_URL}
Sitemap: ${SITE_URL}/sitemap.xml
`;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=3600');
  res.write(body);
  res.end();
  return { props: {} };
};

export default function Robots() {
  return null;
}
