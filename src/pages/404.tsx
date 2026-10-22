import Link from 'next/link';
import Seo from '../components/Seo';
import SpotlightCard from '../components/SpotlightCard';
import { useLanguage } from '../context/LanguageContext';
import { FiHome, FiMail, FiAlertTriangle } from 'react-icons/fi';

export default function Custom404() {
  const { lang } = useLanguage();
  const isFrench = lang === 'fr';

  return (
    <>
      <Seo
        title={`${isFrench ? 'Page Non Trouvée (404)' : 'Page Not Found (404)'} | Muhammad Abdul Moiz`}
        description={
          isFrench
            ? "La page demandée est introuvable ou a été déplacée."
            : 'The page you requested could not be found or has been moved.'
        }
        path="/404"
        noindex={true}
      />

      <main id="main-content" role="main">
        <section className="flex-1 flex items-center justify-center min-h-[70vh] px-4 py-16">
          <SpotlightCard className="max-w-lg w-full text-center p-8 sm:p-12 rounded-[2rem] border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] backdrop-blur-xl shadow-2xl">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-white/5 ring-1 ring-indigo-200 dark:ring-white/10 text-indigo-600 dark:text-indigo-400 mb-6">
              <FiAlertTriangle size={26} />
            </div>

            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              {isFrench ? 'Erreur 404' : 'Error 404'}
            </p>

            <h1 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              {isFrench ? 'Page Introuvable' : 'Page Not Found'}
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {isFrench
                ? "L'adresse demandée n'existe pas ou a été déplacée. Vous pouvez retourner à l'accueil ou me contacter."
                : 'The requested URL does not exist or has been relocated. You can return to the home page or send an inquiry.'}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                <FiHome size={16} />
                {isFrench ? "Retour à l'accueil" : 'Back to Home'}
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full text-sm font-semibold border border-slate-300 dark:border-white/15 hover:border-slate-400 dark:hover:border-white/30 text-slate-700 dark:text-slate-300 transition-all duration-200 hover:-translate-y-0.5"
              >
                <FiMail size={16} />
                {isFrench ? 'Me contacter' : 'Contact Me'}
              </Link>
            </div>
          </SpotlightCard>
        </section>
      </main>
    </>
  );
}
