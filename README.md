# Muhammad Abdul Moiz — Portfolio

Source code of my personal portfolio: **[muhammad-abdul-moiz.vercel.app](https://muhammad-abdul-moiz.vercel.app)**

I'm a Web, DevOps & AI Engineer based in Paris, pursuing an MSc in Information Technology at EPITECH Paris.

[![CI](https://github.com/amoiz0468/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/amoiz0468/Portfolio/actions/workflows/ci.yml)
![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

---

## Features

- **Next.js & React 18**: Static pre-rendering with serverless API routes.
- **AI Twin Chatbot (`/api/chat`)**: Multi-provider LLM support (Google Gemini, Groq, OpenAI, Together AI) with a local fallback engine when no API key is available.
- **Bilingual**: English and French, with light and dark themes.
- **Security**:
  - Sliding-window IP rate limiting (30 requests/minute).
  - Input sanitization (XSS, script injection, pseudo-protocols, null bytes).
  - Strict security headers (`HSTS`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).
- **Design**: Smooth scrolling with Lenis, Framer Motion animations, mobile bottom navigation, bento grids and an interactive terminal.
- **SEO**: Canonical URLs, Open Graph and Twitter cards, `ProfilePage` / `Person` JSON-LD, dynamic `sitemap.xml` and `robots.txt`.
- **Testing**: Node test runner (`tsx --test`) covering intent routing, sanitization, rate limiting and project data.

## Tech Stack

| Area | Tools |
| :-- | :-- |
| Framework | Next.js 14 (Pages Router), React 18, TypeScript |
| Styling | Tailwind CSS, Framer Motion, Lenis |
| AI | Gemini, Groq, OpenAI, Together AI |
| Quality | ESLint, `tsx --test`, GitHub Actions CI |
| Hosting | Vercel |

## Project Structure

```
src/
├── components/   UI components (hero, project cards, chat, navbar, Seo)
├── context/      Theme and language providers
├── data/         Portfolio content (profile, projects, experience)
├── lib/          Chatbot logic and SEO config
└── pages/        Routes, API, sitemap.xml and robots.txt
public/           Images, icons, manifest
tests/            Automated tests
```

## Getting Started

```bash
git clone https://github.com/amoiz0468/Portfolio.git
cd Portfolio
npm install
cp .env.example .env.local   # optional: add an LLM API key
npm run dev
```

Open `http://localhost:3000`. If no API key is set, the chatbot uses the local fallback engine.

## Scripts

```bash
npm run dev         # development server
npm test            # test suite
npx tsc --noEmit    # type checking
npm run lint        # linting
npm run build       # production build
```

## Environment Variables

| Variable | Description |
| :-- | :-- |
| `GEMINI_API_KEY` | Google Gemini API key (optional) |
| `GEMINI_MODEL` | Gemini model, e.g. `gemini-2.5-flash` |
| `NEXT_PUBLIC_SITE_URL` | Production URL used for canonical links and the sitemap |

See `.env.example` for all supported providers.

## Deployment

The project is configured for [Vercel](https://vercel.com). Import the repository, keep the auto-detected Next.js settings, add the environment variables and deploy. Every push to `main` triggers a new deployment.

## Contact

- Portfolio: [muhammad-abdul-moiz.vercel.app](https://muhammad-abdul-moiz.vercel.app)
- LinkedIn: [linkedin.com/in/moizghauri](https://linkedin.com/in/moizghauri)
- Email: [amoiz0468@gmail.com](mailto:amoiz0468@gmail.com)

## License

Personal portfolio repository. All rights reserved.
