import Head from 'next/head';
import { useLanguage } from '../context/LanguageContext';
import { DEFAULT_OG_IMAGE, SEO_KEYWORDS, SITE_NAME, absoluteUrl } from '../lib/seo';

type SeoProps = {
  title: string;
  description: string;
  /** Route path, e.g. "/about". Used for canonical + og:url. */
  path: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  /** Optional schema.org JSON-LD object(s). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export default function Seo({ title, description, path, image = DEFAULT_OG_IMAGE, imageAlt, noindex, jsonLd }: SeoProps) {
  const { lang } = useLanguage();
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const alt = imageAlt || `${SITE_NAME} — portfolio preview`;

  return (
    <Head>
      <title>{title}</title>
      <meta key="description" name="description" content={description} />
      <meta key="keywords" name="keywords" content={SEO_KEYWORDS.join(', ')} />
      <meta key="author" name="author" content={SITE_NAME} />
      <meta
        key="robots"
        name="robots"
        content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
      />
      <link key="canonical" rel="canonical" href={url} />

      {/* Open Graph */}
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:site_name" property="og:site_name" content={SITE_NAME} />
      <meta key="og:locale" property="og:locale" content={lang === 'fr' ? 'fr_FR' : 'en_US'} />
      <meta key="og:locale:alternate" property="og:locale:alternate" content={lang === 'fr' ? 'en_US' : 'fr_FR'} />
      <meta key="og:url" property="og:url" content={url} />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:description" property="og:description" content={description} />
      <meta key="og:image" property="og:image" content={imageUrl} />
      <meta key="og:image:secure_url" property="og:image:secure_url" content={imageUrl} />
      <meta key="og:image:type" property="og:image:type" content="image/png" />
      <meta key="og:image:width" property="og:image:width" content="1200" />
      <meta key="og:image:height" property="og:image:height" content="630" />
      <meta key="og:image:alt" property="og:image:alt" content={alt} />

      {/* Twitter */}
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="twitter:description" name="twitter:description" content={description} />
      <meta key="twitter:image" name="twitter:image" content={imageUrl} />
      <meta key="twitter:image:alt" name="twitter:image:alt" content={alt} />

      {jsonLd && (
        <script
          key="jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      )}
    </Head>
  );
}
