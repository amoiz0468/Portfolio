import { Html, Head, Main, NextScript } from 'next/document';

const themeInitializerScript = `
(function() {
  try {
    var theme = localStorage.getItem('moiz_portfolio_theme');
    var isDark = theme === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
    var lang = localStorage.getItem('moiz_portfolio_lang');
    if (lang === 'fr' || lang === 'en') {
      document.documentElement.lang = lang;
    }
  } catch (e) {}
})();
`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializerScript }} />
        {/* Browser Tab Favicons & Logo */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/logo.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="image_src" href="/logo.png" />

        {/* Progressive Web App (PWA) & Mobile Meta */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="application-name" content="Muhammad Abdul Moiz" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Moiz Portfolio" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f8fafc" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#090d16" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Muhammad Abdul Moiz" />
        <meta property="og:title" content="Muhammad Abdul Moiz — Web, DevOps & AI Engineer" />
        <meta
          property="og:description"
          content="Portfolio of Muhammad Abdul Moiz — Web, DevOps and AI Engineer based in Paris."
        />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Muhammad Abdul Moiz" />
        <meta property="og:logo" content="/logo.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Muhammad Abdul Moiz — Web, DevOps & AI Engineer" />
        <meta
          name="twitter:description"
          content="Portfolio of Muhammad Abdul Moiz — Web, DevOps and AI Engineer based in Paris."
        />
        <meta name="twitter:image" content="/og-image.png" />
      </Head>
      <body className="bg-slate-50 text-slate-900 dark:bg-[#090d16] dark:text-slate-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-white transition-colors duration-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
