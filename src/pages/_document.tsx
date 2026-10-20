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
        {/* Page-level SEO (title, description, canonical, Open Graph, Twitter, JSON-LD) lives in components/Seo.tsx */}
      </Head>
      <body className="bg-slate-50 text-slate-900 dark:bg-[#090d16] dark:text-slate-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-white transition-colors duration-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
