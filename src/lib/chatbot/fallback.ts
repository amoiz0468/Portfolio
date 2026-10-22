import { profile } from '../../data/portfolio';
import { ChatMessage } from './types';
import { generateFrenchFallbackReply } from './fallback-fr';

function isFrenchQuery(q: string): boolean {
  // If the query contains English question starters, keep in English unless lang === 'fr'
  if (/\b(are\s+you|what\s+is|tell\s+me|why\s+should|do\s+you|how\s+can|can\s+you|who\s+are)\b/i.test(q)) {
    return false;
  }
  return /\b(bonjour|salut|coucou|parle[rz]?|quelles?|comment|pourquoi|competences?|centres?\s*d'int[eé]r[eê]t|disponibilit[eé]|recherchez-vous|qui\s*es-tu|pr[eé]sente[rz]?)\b/i.test(q);
}

/**
 * Computes a variation index based on conversation turns.
 * Turn 1 (initial user question) uses the primary response (index 0).
 * Turn 2, Turn 3, etc. automatically cycle through distinct, natural phrasing variants
 * so asking questions repeatedly feels human and conversational rather than like an algorithm.
 */
function getVariationIndex(messages: ChatMessage[], variantsCount: number): number {
  if (variantsCount <= 1) return 0;
  const userMessages = messages.filter((m) => m.role === 'user');
  if (userMessages.length <= 1) return 0;
  return (userMessages.length - 1) % variantsCount;
}

export function generateHumanFallbackReply(messages: ChatMessage[], lang: 'en' | 'fr' = 'en'): string {
  const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user')?.content || '';
  const q = lastUserMsg.trim().toLowerCase();
  const varIdx = getVariationIndex(messages, 3);

  // If page language is French, or user wrote in French, delegate to dedicated French engine
  if (lang === 'fr' || isFrenchQuery(q)) {
    return generateFrenchFallbackReply(q, messages);
  }

  // 1. GREETINGS & CASUAL HELLOS
  if (
    /^(hi|hello|hey|salam|hola|good morning|good afternoon|good evening|yo|wassup|greetings|howdy)\b/i.test(q) ||
    q === 'hi' ||
    q === 'hello' ||
    q === 'hey'
  ) {
    const greetingVariants = [
      `Hello! Great to connect with you.

I'm **Muhammad Abdul Moiz**'s AI twin. You can explore:
- **DevOps & Cloud Software Factory**: CI/CD automation, Docker containerization, AWS/GCP deployments, SonarQube & DORA metrics
- **Why Hire Moiz**: High-throughput microservices, GenAI pipelines, multi-step agents & mentoring leadership
- **Studies & Roles**: MSc at **EPITECH Paris** (Pedagogical Assistant) & BSCS at **FAST-NUCES** (Pakistan)
- **Status & Opportunity**: Alternance at **EPITECH Paris** (Sept 2026 – Sept 2027), seeking future CDI/CDD in Paris/Remote

### Suggested Inquiries:
? Do you have experiences of DevOps and what services do you offer as DevOps?
~ Alternance at EPITECH (Sept 2026 – Sept 2027) • Future CDI/CDD
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?
~ Master of Science at EPITECH Paris & BSCS from FAST-NUCES`,

      `Hello! Welcome to Muhammad Abdul Moiz's portfolio.

I'm his AI representative, ready to answer questions concisely:
- **Production Systems**: Python (FastAPI/Django) backends, Docker CI/CD, and LangGraph agents.
- **Background**: Born October 16, 2002 (23 years old), born & raised in Pakistan, currently based in Paris.
- **Next Step**: Completing alternance at EPITECH Paris (Sept 2026 – Sept 2027), open to future CDI/CDD roles.

### Suggested Inquiries:
? Tell me about your featured projects (DoctorIQ, Brackets Genie, Ledgeroo, VIF).
~ Alternance at EPITECH Paris • Seeking future CDI/CDD
? How old are you and what is your academic background?
~ English C1 fluent, French B1 working, native Urdu`,

      `Hi there! Great to meet you.

Feel free to ask me anything about Moiz's engineering career, tech stack, or availability:
- **Core Engineering**: Scalable APIs, Dockerized workflows, and automated release gates.
- **Academic Track**: MSc in Information Technology at EPITECH Paris & BSCS at FAST-NUCES (Pakistan).
- **Status**: Born October 16, 2002 (23 years old), born and raised in Pakistan, now living in Paris.

### Suggested Inquiries:
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?
~ 23 years old, based in Paris with full working rights in France
? What are your passions and hobbies outside of work?
~ Specialized in Python, FastAPI, Docker, and LangGraph agent pipelines`,
    ];
    return greetingVariants[varIdx];
  }

  // 1b. HELP & ASSISTANCE INQUIRIES ("help me", "can you help", "what can you do")
  if (
    /^(help(\s+me)?|can\s+you\s+help(\s+me)?|how\s+can\s+you\s+help|what\s+can\s+you\s+do|what\s+can\s+i\s+ask|guide\s+me|how\s+does\s+this\s+work)\b/i.test(q) &&
    !/\b(code|app|build|develop|create|program|debug|script)\b/i.test(q)
  ) {
    const helpVariants = [
      `I'm here to help you navigate **Muhammad Abdul Moiz**'s portfolio and professional work!

Here are key areas you can ask about:
- **Featured Projects**: *DoctorIQ* (healthcare OCR & LLM extraction), *Brackets Genie* (real-time WebSockets & LangGraph agents), and *VIF* (food solidarity web & mobile platform).
- **Engineering Stack**: Backend (FastAPI, Django REST, Node.js), DevOps (Docker, GitLab CI, GitHub Actions, AWS/GCP, SonarQube, DORA metrics), and AI (LangGraph, LangChain, PyTorch).
- **Experience & Education**: MSc at **EPITECH Paris** (Pedagogical Assistant) & Associate Software Engineer at **Brackets Private Limited**.
- **Opportunities & Contact**: In alternance at EPITECH Paris (Sept 2026 – Sept 2027), open to future CDI/CDD roles or project collaborations at \`${profile.email}\`.

### Suggested Inquiries:
? Tell me about your featured projects (DoctorIQ, Brackets Genie, VIF).
? Do you have experiences of DevOps and what services do you offer as DevOps?
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?`,

      `Welcome! As Moiz's AI twin, I can help you explore his software engineering background, projects, and collaboration opportunities:
- **Explore Projects**: Ask about *DoctorIQ*, *Brackets Genie*, *Ledgeroo*, or *Trinity Suite*.
- **Technical Capabilities**: Inquire about backend microservices, cloud deployments, CI/CD pipelines, or agentic GenAI.
- **Background & Availability**: Learn about his studies at EPITECH Paris and how to connect for engineering roles.

Feel free to ask a specific question or pick one of the suggestions below!

### Suggested Inquiries:
? What is your core tech stack and backend engineering experience?
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?
? How can I get in touch with Muhammad Abdul Moiz?`,

      `I am ready to assist! You can ask me anything about Muhammad Abdul Moiz's professional profile:
- **Work Experience**: Associate Software Engineer at Brackets and Pedagogical Assistant at EPITECH Paris.
- **Key Skills**: Python, FastAPI, Django, Docker, AWS, GCP, LangGraph, and automated CI/CD software factories.
- **Project Demonstrations**: Deep-dives into his 8 featured systems spanning AI, cloud, and full-stack development.

What topic would you like to dive into?

### Suggested Inquiries:
? Tell me about DoctorIQ and clinical document extraction.
? Do you have experiences of DevOps and what services do you offer as DevOps?
? What are your passions and hobbies outside of work?`,
    ];
    return helpVariants[varIdx];
  }

  // 1c. APP DEVELOPMENT, CODING & PROJECT COLLABORATION ("help me code an app", "build an app", "can you code")
  if (
    /\b(code\s+(an?\s+)?app|build\s+(an?\s+)?(app|application|website|system|project|platform)|develop\s+(an?\s+)?(app|application|website)|create\s+(an?\s+)?(app|application|website)|make\s+(an?\s+)?(app|application|website)|help\s+(me\s+)?(code|build|develop|program)|hire\s+(you|moiz)\s+(to\s+build|for\s+a\s+project)|freelance|consulting|need\s+an?\s+app)\b/i.test(q)
  ) {
    const appVariants = [
      `Moiz specializes in architecting and building production web, mobile, and AI-powered applications from the ground up!

Here is how he approaches application development:
- **Full-Stack & Mobile Systems**: High-performance backends in **Python (FastAPI, Django)** paired with modern frontends in **React**, **Next.js**, or cross-platform mobile apps in **React Native** (like *[VIF](#projects)*).
- **Applied AI & Agents**: Integrating multimodal OCR, RAG knowledge bases, and multi-step agents using **LangGraph**, **LangChain**, and **Claude/OpenAI** APIs (like *[DoctorIQ](#projects)* and *[Brackets Genie](#projects)*).
- **Cloud & DevOps**: Automated CI/CD pipelines (GitLab CI, GitHub Actions), multi-stage Docker containerization, and deployment on **AWS** or **GCP**.

While I am his portfolio AI twin and cannot write production code on the fly in this chat, Moiz is available to build, architect, or collaborate on your software applications!

Feel free to connect directly at [${profile.email}](mailto:${profile.email}) or on [LinkedIn](${profile.linkedin}) to discuss your app.

### Suggested Inquiries:
? Tell me about your featured projects (DoctorIQ, Brackets Genie, VIF).
? What DevOps and cloud services do you offer?
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?`,

      `If you are looking to build or code an application, you are in the right place! Muhammad Abdul Moiz has a proven track record delivering end-to-end systems:
- **Production APIs & Microservices**: Scalable asynchronous backends with FastAPI and Django REST, connected to PostgreSQL and Redis.
- **Mobile & Web Interfaces**: Cross-platform React Native and React 18 interfaces with real-time WebSocket capabilities.
- **Cloud Infrastructure**: Robust Docker packaging, CI/CD pipelines with SonarQube quality gates, and scalable AWS/GCP deployments.

Although this chat window is an interactive portfolio guide rather than an IDE sandbox, Moiz is eager to discuss software engineering roles, project development, and consulting collaborations.

Reach out via [${profile.email}](mailto:${profile.email}) or connect on [LinkedIn](${profile.linkedin}) to discuss your application!

### Suggested Inquiries:
? Tell me about VIF and leading a full-stack project from specs to release.
? What is your experience with LangGraph and conversational AI?
? How can I get in touch with Muhammad Abdul Moiz?`,

      `Moiz has extensive experience designing and shipping full-stack applications and automated cloud infrastructure:
- **Healthcare & AI**: Built *DoctorIQ*, an automated clinical extraction platform cutting document turnaround by 70%.
- **Real-Time Platforms**: Engineered *Brackets Genie*, streaming multi-agent telemetry with sub-50ms latency over WebSockets.
- **Solidarity & Mobile**: Led *VIF*, a cross-functional web (FastAPI) and mobile (React Native) food solidarity platform.

As an AI representative, I don't generate custom codebases directly in this chat, but Moiz is available for engineering roles and development collaborations.

Drop him a line at [${profile.email}](mailto:${profile.email}) to talk through your project requirements!

### Suggested Inquiries:
? Tell me about your featured projects (DoctorIQ, Brackets Genie, VIF).
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?
? Do you have experiences of DevOps and what services do you offer as DevOps?`,
    ];
    return appVariants[varIdx];
  }

  // 2. AGE, BIRTHDATE, HOMETOWN, ORIGIN & BIRTHPLACE (Born October 16, 2002, 23 years old, Pakistan -> Paris)
  if (
    /\b(age|how\s+old|birthday|birth\s*date|date\s+of\s+birth|birth\s*year|year\s+of\s+birth|born|birth\s*place|hometown|home\s*town|where\s+(are\s+you|is\s+moiz)\s+from|from\s+where|nationality|country\s+of\s+origin|origin|where\s+did\s+(you|he)\s+grow\s+up|raised\s+in|raised)\b/i.test(q) ||
    /\b(moiz('s)?\s+age|his\s+age|your\s+age)\b/i.test(q)
  ) {
    const ageVariants = [
      `I was born on **October 16, 2002**, which makes me **23 years old**.

Here is a quick snapshot:
- **Origin & Location**: Born and raised in **Pakistan** (hometown: Pakistan), and currently living in **Paris, France**.
- **Academic Foundation**: Completed my Bachelor of Science in Computer Science (BSCS) at **FAST-NUCES** in Pakistan (2020–2024), now pursuing an MSc in IT at **EPITECH Paris** (2025–2027).
- **Engineering & Mentorship**: Pedagogical Assistant at EPITECH Paris and former Software Engineer at Brackets, building high-throughput microservices and OCR-to-LLM pipelines (*DoctorIQ*).
- **Target**: Currently completing an alternance at EPITECH Paris (Sept 2026 – Sept 2027), seeking future CDI/CDD opportunities after September 2027.

### Suggested Inquiries:
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?
~ Born and raised in Pakistan • Based in Paris (23 years old)
? Tell me about your featured projects (DoctorIQ, Brackets Genie, VIF).
~ Full working authorization in France with fluent English and working French`,

      `Muhammad Abdul Moiz was born on **October 16, 2002** and is currently **23 years old**. He was **born and raised in Pakistan** and is currently living in **Paris, France**.

He balances graduate studies at **EPITECH Paris** (MSc IT) with mentoring engineering cohorts as a Pedagogical Assistant. He holds a BSCS from **FAST-NUCES** in Pakistan and has 2+ years of production experience in Python backends, Docker, and GenAI agent systems.

### Suggested Inquiries:
? Tell me about your role as Pedagogical Assistant at EPITECH Paris.
~ Born and raised in Pakistan (23 years old), currently in Paris
? Do you have experiences of DevOps and what services do you offer as DevOps?
~ Alternance at EPITECH (Sept 2026 – Sept 2027) • Future CDI/CDD`,

      `Moiz was born on **October 16, 2002** (he is **23 years old**). He was **born and raised in Pakistan** and is currently based in **Paris, France**.

He brings solid production engineering experience alongside academic foundations:
- **Origin & Location**: Hometown is in Pakistan; currently residing and working in Paris, France.
- **Education**: BSCS from FAST-NUCES in Pakistan (2020–2024) and MSc in IT at EPITECH Paris (2025–2027).
- **Focus**: Python (FastAPI/Django), Docker CI/CD, Celery/Redis queues, and LangGraph agents.
- **Current Milestone**: In alternance as Pedagogical Assistant at EPITECH Paris (Sept 2026 – Sept 2027), seeking future CDI/CDD roles after Sept 2027.

### Suggested Inquiries:
? What is your full backend and database tech stack?
~ Born and raised in Pakistan • Residing in Paris, France
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?
~ Looking for CDI/CDD opportunities after September 2027`,
    ];
    return ageVariants[varIdx];
  }

  // 3. DEVOPS EXPERIENCE & DEVOPS SERVICES (HIGH PRIORITY: Matched before generic experience)
  if (
    /\b(devops|ci[\s/-]?cd|docker|container(ization)?|aws|gcp|cloud infrastructure|reverse proxy|nginx|apache reverse|kubernetes)\b/i.test(q)
  ) {
    return `### DevOps Experience & Cloud Capabilities

I have hands-on production DevOps experience building reliable infrastructure, containerized environments, and automated delivery pipelines:

- **CI/CD & DevSecOps**: Automated release gates using **GitLab CI** and **GitHub Actions YAML** with **SonarQube** code quality gates, **gitStream** rules, and **DORA metrics** tracking.
- **Containerization & Cloud Infrastructure**: Multi-stage **Docker** builds and production deployments across **AWS** (EC2, S3, Lambda) and **GCP**.
- **Reverse Proxies & Asynchronous Queues**: Deploying services behind **Nginx** and **Apache Reverse Proxy** with SSL/TLS, paired with **Celery** and **Redis** worker pools for distributed tasks.

### DevOps Services Offered:
1. **Software Factory & CI/CD Pipeline Setup**: GitLab CI / GitHub Actions workflows with SonarQube quality gates, gitStream auto-merge, and Docker image publishing.
2. **DORA Metrics Dashboard & Delivery Velocity**: Tracking deployment frequency, lead time, and MTTR.
3. **Dockerization & Reverse Proxy Hardening**: Clean multi-stage Dockerfiles, Docker Compose, Nginx reverse proxies, and Let's Encrypt HTTPS.

### Featured DevOps Projects:
- **Trinity DevOps Software Factory**: Automated multi-stage Docker builds, SonarQube gates (70%-90%+ coverage), and Nginx reverse proxy delivery on Linux.
- **DoctorIQ Cloud Architecture**: High-throughput distributed Celery and Redis worker cluster on AWS (EC2, S3, Lambda).
- **DORA Metrics & gitStream Delivery**: Automated PR merge policies and release velocity tracking.

### Suggested Inquiries:
? Tell me about DoctorIQ's cloud & Celery architecture.
~ Proven DORA metrics, SonarQube quality gates, and multi-stage Docker builds
? What is your full backend and database tech stack?
? What roles and contracts are you available for in Paris?`;
  }

  // 2. SPECIFIC PROJECTS & SPECIALIZED CAPABILITIES (High Priority)
  // 2a. DOCTOR IQ PROJECT
  if (/doctoriq|doctor\s*iq|medical|clinical\s*document|healthcare\s*backend/i.test(q)) {
    return `### DoctorIQ — AI Healthcare & Medical Extraction Platform

**DoctorIQ** is a production clinical document extraction system that solved healthcare extraction bottlenecks:
- **70% Latency Reduction**: Combined high-accuracy OCR with iterative prompt engineering across **OpenAI API** and **Anthropic Claude API** to slash document processing turnaround time by 70%.
- **High-Throughput Asynchronous Workers**: Architected with **Python (Django REST)**, **Celery**, and **Redis** to ingest and process large batches of clinical records without blocking client APIs.
- **Automated Document Deliverables**: Automated extraction of structured medical data, diagnostic validation, and automated PDF report compilation.
- **Cloud Infrastructure**: Containerized with **Docker** and deployed on **AWS (EC2, S3, Lambda)** with HIPAA-compliant data policies.

### Suggested Inquiries:
? Tell me about Brackets Genie and agentic WebSockets.
? Tell me about Ledgeroo and FinTech Stripe integration.
? What DevOps experience do you have with AWS and Docker?`;
  }

  // 2b. BRACKETS GENIE & AGENTIC ORCHESTRATION / LANGGRAPH
  if (/genie|agentic|langgraph|websocket|voice\s*call|multi[\s-]*step\s*agent|anthropic|claude api/i.test(q)) {
    return `### Brackets Genie — Real-Time Conversational AI & Agentic Orchestration

**Brackets Genie** is an interactive multi-agent platform for voice calls, data rectification, and real-time meeting intelligence:
- **Sub-50ms Streaming Latency**: Built with bidirectional **WebSockets** and **FastAPI** to stream token-by-token responses and call telemetry with instantaneous user feedback.
- **Multi-Agent Orchestration**: Implemented multi-step agent workflows using **LangGraph** and **LangChain**, dynamically routing tasks between **Anthropic Claude API** and **OpenAI API**.
- **Dynamic Frontend Architecture**: Engineered responsive telemetry dashboards in **React 18** and **TypeScript** with performance-tuned hooks and Context state loops.
- **Automated CI/CD**: Enforced automated testing gates and containerized delivery with **Docker** and GitHub Actions.

### Suggested Inquiries:
? Tell me about DoctorIQ and clinical document extraction.
? Tell me about Time Manager and high-concurrency Elixir.
? Do you have experiences of DevOps and what services do you offer as DevOps?`;
  }

  // 2c. TAMIAMI FITNESS & BOOKING AUTOMATION (DIALOGFLOW / OCR)
  if (/tamiami|lead\s*engine|n8n|selenium|scraper/i.test(q) || (/fitness/i.test(q) && /booking|dialogflow|tamiami|bot/i.test(q)) || /tamiami fitness/i.test(q)) {
    return `### Tamiami Fitness & Intelligent Automation Systems

- **Tamiami Fitness AI Booking Hub**: Built a customer acquisition and booking agent using **Node.js**, **Express**, and **Dialogflow NLP**, integrated with custom document OCR models on **AWS Lambda**, **DynamoDB**, and **GCP** — automating 90% of member bookings.
- **Automated Scrapers & Bots**: Engineered high-throughput Python **Selenium bots**, LinkedIn automation flows, and low-code **n8n** automation pipelines for asynchronous data harvesting and CSV validation.

### Suggested Inquiries:
? Tell me about DoctorIQ and clinical document extraction.
? Tell me about Brackets Genie and real-time WebSockets.
? What DevOps and cloud services do you offer?`;
  }

  // 2d. VIF (VEOLIA / ENGIE IT ECOSYSTEM & FOOD SOLIDARITY)
  if (/vif\b|solidarity|food\s*solidarity|food\s*waste|lead\s*on\s*vif/i.test(q)) {
    return `### VIF — Real-Time Food Solidarity Platform & Project Leadership

On **VIF**, I served as **Project Lead** managing the full web and mobile product lifecycle:
- **End-to-End Ownership**: Scoped stakeholder requirements, authored functional specifications, coordinated cross-functional squads (backend, mobile, DevOps), and oversaw iterative sprint delivery.
- **Full-Stack Architecture**: **FastAPI** backend microservices, **React Native (TypeScript)** mobile application, **PostgreSQL**, and containerized tiers.
- **Delivery Velocity & DORA Metrics**: Configured GitLab CI pipelines, branch protection, and tracked **DORA Metrics** (Deployment Frequency, Lead Time, MTTR) to ensure zero-regression releases.
- **Agile Coordination**: Facilitated standups, sprint planning, retrospectives, and backlog prioritization using **Jira** and **ClickUp**.

### Suggested Inquiries:
? Tell me about your Trinity Suite and Software Factory pipeline.
? Tell me about Ledgeroo and FinTech Stripe architecture.
? What DevOps and cloud services do you offer?`;
  }

  // 2e. LEDGEROO & FINTECH
  if (/ledgeroo|fintech|stripe|payment\s*gateway|financial\s*backend/i.test(q)) {
    return `### Ledgeroo — Secure FinTech Backend & Learning Hub

**Ledgeroo** is a production financial web platform engineered for secure transaction management and accounting workflows:
- **Encrypted Transaction Handling**: Designed resilient transaction processing with strict database locking in **Django 4.2** and **PostgreSQL**.
- **Payment Gateway Integration**: Integrated automated **Stripe API** webhooks for billing, payment validation, and automated PDF invoice generation.
- **Automated Cloud Delivery**: Automated CI/CD deployment on **AWS** with Docker containerization and pre-production validation workflows.

### Suggested Inquiries:
? Tell me about DoctorIQ and clinical document extraction.
? Tell me about Time Manager and real-time Elixir tracking.
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?`;
  }

  // 2f. TRINITY SUITE (DEV-WEB, DEV-APP, DEVOPS)
  if (/trinity|software\s*factory|sonarqube|paypal|open\s*food\s*facts|grocery/i.test(q)) {
    return `### Trinity Suite — Dev-Web, Dev-App & DevOps Software Factory

The **Trinity Suite** represents a complete multi-tier enterprise supply chain ecosystem built at EPITECH:
- **Trinity Dev-Web (Management Portal)**: Full-stack platform built with **Django REST** and **React 18 TypeScript**. Maintained **70%+ to 90%+ pytest test coverage**, Postman API collections, and **SonarQube** code quality gates.
- **Trinity Dev-App (Grocery Mobile Client)**: Mobile client built with **React Native**, Django REST, JWT authentication, **PayPal checkout integration**, and barcode scanning via **Open Food Facts API**.
- **Trinity DevOps (Software Factory Pipeline)**: Automated builds, SonarQube quality gates, multi-environment deployment, health checks, and containerized delivery via **Nginx** reverse proxy and **Docker Compose** on Linux.

### Suggested Inquiries:
? Tell me about your DevOps experience and CI/CD pipelines.
? Tell me about VIF and project management leadership.
? What is your full backend and database tech stack?`;
  }

  // 2g. TIME MANAGER & HIGH CONCURRENCY (ELIXIR / VUE 3)
  if (/time\s*manager|elixir|phoenix|functional\s*programming/i.test(q)) {
    return `### Time Manager — High-Concurrency Real-Time Tracking Tool

**Time Manager** is an enterprise tracking application designed for concurrent live event streams:
- **Functional Concurrency in Elixir**: Architected the backend using **Elixir** and the **Phoenix framework**, leveraging BEAM processes for lightweight concurrency, fault tolerance, and sub-millisecond socket events.
- **Reactive Frontends (Vue 3 & React)**: Designed responsive client dashboards in **Vue 3** (Composition API, Pinia state management) and **React** with real-time WebSocket state synchronization.
- **Security & Authorization**: Implemented JSON Web Token (JWT) authentication, Role-Based Access Control (RBAC), and relational tracking in **PostgreSQL**.

### Suggested Inquiries:
? Tell me about Brackets Genie and agentic WebSockets.
? Tell me about DoctorIQ and medical document processing.
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?`;
  }

  // 2h. DEVSECOPS, DORA METRICS & GITSTREAM
  if (/dora|gitstream|devsecops|sast|delivery\s*velocity|mttr|release\s*gate/i.test(q)) {
    return `### DevSecOps, DORA Metrics & Modern Software Delivery

I specialize in establishing modern software delivery standards and metrics-driven development:
- **DORA Metrics Visibility Dashboard**: Tracking the 4 key metrics of delivery maturity: **Deployment Frequency**, **Lead Time for Changes**, **Change Failure Rate**, and **Mean Time to Recovery (MTTR)**.
- **Automated Git Workflows (gitStream)**: Configured auto-merge rules for safe PRs, automated reviewer routing based on changed files, and branch protection policies.
- **Static Quality & Security Gates**: Integrated **SonarQube** code scanning, automated linting, vulnerability screening (SAST), and mandatory test coverage thresholds (70%+ to 90%+).
- **Zero-Downtime Releases**: Multi-stage Docker optimization, blue/green deployments, and Nginx reverse proxy health checks.

### Suggested Inquiries:
? Tell me about your Trinity DevOps Software Factory pipeline.
? What DevOps services do you offer for high-growth teams?
? Tell me about your cloud infrastructure on AWS and GCP.`;
  }

  // 2i. ZOIDBERG 2.0 / COMPUTER VISION / MACHINE LEARNING
  if (/zoidberg|benchmarking|computer vision|deep learning|densenet|cnn|pytorch|tensorflow|pca/i.test(q)) {
    return `### Zoidberg 2.0 & Computer Vision Engineering

- **Zoidberg 2.0**: End-to-end medical image benchmarking pipeline comparing 6 supervised architectures: **DenseNet121**, custom **CNNs**, **SVM**, **Random Forest**, **KNN**, and **Logistic Regression**.
- **Rigorous Validation**: Implemented PCA feature reduction, 5-fold stratified cross-validation to prevent dataset bias, and systematic **ROC-AUC** / **F1-score** metric reporting.
- **Production CV Endpoint**: Deployed real-time computer vision inference on **AWS LightSail** behind an Apache reverse proxy managing SSL routes for a mobile client.

### Suggested Inquiries:
? Tell me about DoctorIQ and multimodal document processing.
? What are your core machine learning frameworks and tools?
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?`;
  }

  // 2j. FRONTEND & MOBILE CAPABILITIES (DOMAIN-ADAPTIVE)
  if (
    /front[\s-]*end|react|vue|react[\s-]*native|mobile\s*(development|app|client)|ui[\s/-]?ux|pinia|frontend\s*capabilities/i.test(q)
  ) {
    return `### Frontend & Mobile Architecture Capabilities

I build high-performance, responsive web and mobile interfaces focused on sub-second rendering, dynamic state management, and ergonomic UX:

- **Modern Web Interfaces (React 18 & TypeScript)**: Architecting modular component systems, custom hooks, and streaming state synchronization.
- **Reactive State & Dashboards (Vue 3 & Pinia)**: Utilizing the Vue 3 Composition API and Pinia store architecture for clean, reactive, and maintainable client code.
- **Cross-Platform Mobile (React Native)**: Developing native iOS and Android experiences with JWT authentication, hardware camera barcode scanning, and external payment SDKs.
- **Real-Time Data Streaming**: Integrating bidirectional WebSockets for low-latency voice telemetry, live collaboration, and instant updates.

### Featured Frontend & Mobile Projects:
- **Brackets Genie**: Built responsive telemetry dashboards in **React 18** and **TypeScript** with real-time **WebSocket** streams connecting users to multi-step AI agents.
- **Time Manager**: Designed dual reactive frontends in **Vue 3** (Composition API, Pinia) and **React** with live synchronization against an Elixir backend.
- **Trinity Dev-App**: Engineered a cross-platform mobile client with **React Native**, **Open Food Facts API** camera barcode scanning, and **PayPal** checkout.

### Suggested Inquiries:
? Tell me about Brackets Genie and agentic WebSockets.
? What backend architectures and frameworks do you build with?
? What DevOps services do you offer for frontend deployments?`;
  }

  // 2k. BACKEND & MICROSERVICES CAPABILITIES (DOMAIN-ADAPTIVE)
  if (
    /back[\s-]*end|microservice|distributed\s*system|api\s*design|rest\s*api|fastapi|django|celery|redis|elixir|phoenix|backend\s*capabilities/i.test(q)
  ) {
    return `### Backend & Distributed Microservices Capabilities

I design resilient, high-throughput backend services and asynchronous distributed pipelines:

- **Asynchronous Python Backends**: Building high-speed RESTful microservices with **FastAPI** and **Django REST Framework**, leveraging async event loops and Pydantic validation.
- **High-Concurrency Systems (Elixir & Phoenix)**: Utilizing the Erlang BEAM runtime for fault-tolerant, concurrent process execution and lightweight socket channels.
- **Distributed Worker Pools (Celery & Redis)**: Offloading heavy, long-running computational jobs (such as document OCR, LLM inference, and report compilation) to asynchronous background workers.
- **Relational & Document Databases**: Designing normalized schemas, connection pooling, and ACID-compliant transactional flows with **PostgreSQL**, **SQLite**, and **DynamoDB**.
- **Robust Security**: Enforcing JSON Web Tokens (JWT), Role-Based Access Control (RBAC), and automated SonarQube quality gates.

### Featured Backend Projects:
- **DoctorIQ**: Built asynchronous clinical ingestion microservices with **Python (Django REST)**, **Celery**, and **Redis**, slashing processing latency by 70%.
- **Ledgeroo**: Engineered a secure FinTech backend with strict database locking in **Django 4.2**, **PostgreSQL**, and automated **Stripe API** webhook billing.
- **Time Manager**: Architected an enterprise live tracking backend in **Elixir** and **Phoenix**, achieving sub-millisecond socket concurrency.

### Suggested Inquiries:
? Tell me about DoctorIQ's cloud & Celery architecture.
? What are your DevOps capabilities with Docker and CI/CD?
? Tell me about your machine learning and GenAI capabilities.`;
  }

  // 2l. APPLIED GENAI & MACHINE LEARNING CAPABILITIES (DOMAIN-ADAPTIVE)
  if (
    /ai\b|genai|generative\s*ai|llm|agentic|langgraph|langchain|rag|computer\s*vision|machine\s*learning|deep\s*learning|ai\s*capabilities/i.test(q)
  ) {
    return `### Applied Generative AI & Machine Learning Capabilities

I combine deep machine learning foundations with applied agentic engineering for enterprise automation:

- **Agentic Multi-Step Systems**: Building cyclic graph workflows using **LangGraph** and **LangChain** with tool invocation, state preservation, and fallback routing.
- **Model Orchestration & Prompt Optimization**: Integrating **Anthropic Claude API** and **OpenAI API** models with structured outputs, prompt caching, and cost-efficient token utilization.
- **Empirical Machine Learning & CV**: Deep experience training, tuning, and evaluating models with **PyTorch**, **TensorFlow**, and **Scikit-learn**, applying stratified cross-validation and ROC-AUC metrics.
- **Multimodal Document Processing**: Combining optical character recognition (OCR) with LLM parsing to transform unstructured visual documents into validated JSON schemas.

### Featured AI & Machine Learning Projects:
- **Brackets Genie**: Multi-agent conversational system using **LangGraph**, **Claude API**, and **FastAPI WebSockets** with sub-50ms token streaming.
- **DoctorIQ**: Multimodal clinical document extraction system reducing turnaround time by 70% with OCR and LLM synthesis.
- **Zoidberg 2.0**: Empirical medical imaging benchmark evaluating **DenseNet121**, custom **CNNs**, and ensemble classifiers with 5-fold cross-validation.
- **Tamiami Fitness**: NLP booking assistant using **Dialogflow** and custom OCR models on **AWS Lambda** automating 90% of bookings.

### Suggested Inquiries:
? Tell me about Brackets Genie and LangGraph agent orchestration.
? Tell me about DoctorIQ and clinical document extraction.
? What backend architectures do you use to serve ML models?`;
  }

  // 2m. PROJECT MANAGEMENT & AGILE LEADERSHIP CAPABILITIES (DOMAIN-ADAPTIVE)
  if (
    /project\s*management|agile|scrum|product\s*owner|sprint|leadership|jira|clickup|team\s*lead|pm\s*capabilities/i.test(q)
  ) {
    return `### Project Management & Agile Technical Leadership

I lead engineering teams by combining technical clarity, transparent sprint communication, and delivery metrics:

- **Agile Scrum Methodology**: Facilitating sprint planning, backlog grooming, daily standups, and retrospectives to maintain steady velocity and team alignment.
- **Task Management & Tooling**: Utilizing **Jira**, **ClickUp**, and GitHub Projects with clear acceptance criteria and issue tracking.
- **Metrics-Driven Delivery (DORA)**: Tracking Deployment Frequency, Lead Time, Change Failure Rate, and MTTR to systematically identify and eliminate bottlenecks.
- **Pedagogical Mentoring & Growth**: Mentoring junior developers and student cohorts, running architecture workshops, and establishing high standards through constructive code reviews.

### Featured Leadership Experience:
- **VIF Project Lead**: Led a cross-functional team of 4 software engineers in delivering an enterprise sports platform on schedule through 2-week Agile sprints and PR reviews.
- **EPITECH Paris Pedagogical Assistant**: Guided engineering student cohorts through complex systems programming, Docker containerization, and clean code practices.
- **Trinity DevOps Software Factory**: Implemented automated SonarQube quality gates and gitStream workflows to safeguard team release cadence.

### Suggested Inquiries:
? Tell me about your role as Pedagogical Assistant at EPITECH Paris.
? Tell me about VIF and your project leadership experience.
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?`;
  }

  // 3. PASSIONS & HOBBIES (Cooking, Traveling, Poetry, Photography, Fitness, Tech Deep Dives)
  if (
    /passion|hobb(y|ies)|loisir|free time|outside of work|life beyond code|cooking|cook|food|travel|travelling|traveling|poesie|poetry|photograph(y|ie)|\b(sport|sports|gym)\b/i.test(q) ||
    (/\bfitness\b/i.test(q) && !/tamiami/i.test(q))
  ) {
    return `### Passions & Life Beyond Code

Beyond software engineering and deep learning, I invest my energy in creative, exploratory, and disciplined pursuits:

- **Cooking & Gastronomy**: Passionate about culinary creation, blending authentic heritage spices with French bistro techniques. I love hosting meals that bring friends and team members together.
- **Traveling & Cultural Exploration**: Visiting historical European cities, architectural landmarks, museums, and distinct regional cultures across France and internationally.
- **Poésie / Poetry**: Deep appreciation for classical and modern poetry and creative writing that sharpens clarity of language, metaphor, and mindful thought.
- **Photographie / Photography**: Capturing urban geometry, Parisian street life, and the interplay between architecture and natural lighting.
- **Sport & Fitness**: Consistent strength conditioning, calisthenics, and cardiovascular conditioning. Builds mental discipline, physical resilience, and daily focus.
- **Tech Deep Dives & ArXiv**: Reading foundational machine learning preprints, distributed system post-mortems, and experimenting with agentic frameworks.

### Suggested Inquiries:
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?
? Tell me about your featured projects (DoctorIQ, Brackets Genie, Zoidberg 2.0).
? What is your current availability, working status, and location preference in Paris?`;
  }

  // 4. RECRUITER SPECIFIC: WHY HIRE MOIZ & KEY STRENGTHS
  if (
    /why hire|why should we hire|recruiter|notice period|when can you start|visa|work permit|sponsorship|contract type|why moiz|candidate/i.test(q)
  ) {
    const whyHireVariants = [
      `### Why Hire Muhammad Abdul Moiz?

Here are the top 4 value drivers I bring to engineering teams:

1. **Dual Engineering Depth**: Real production experience across asynchronous microservices (Python, FastAPI, Django, Celery, Docker, AWS) paired with applied GenAI agent systems (LangGraph).
2. **Pedagogical Mentorship & Leadership**: As Pedagogical Assistant at **EPITECH Paris**, I mentor engineering cohorts daily. Proven cross-functional delivery leadership on *VIF*.
3. **End-to-End Ownership**: From schema design, database optimization, and Dockerization to CI/CD release gates (SonarQube, DORA metrics) and reverse proxies.
4. **Immediate Fit in Paris**: Fluent English (C1 - client-facing) and working French (B1.1). Currently in alternance at EPITECH Paris (Sept 2026 – Sept 2027), seeking future CDI/CDD opportunities with full French working rights.

### Suggested Inquiries:
? Do you have experiences of DevOps and what services do you offer as DevOps?
~ Full working authorization in France | English C1 & French B1.1
? Tell me about your featured projects (DoctorIQ, Brackets Genie, Zoidberg 2.0).
? What is your current availability, working status, and location preference in Paris?`,

      `### Key Strengths & Technical Profile

If you are looking for an engineer who delivers business value from day one:

- **Production-Ready & Reliable**: Built *DoctorIQ* cutting clinical turnaround by 70%, engineered real-time WebSockets with sub-50ms latency in *Brackets Genie*, and maintained 90%+ test coverage on *Trinity*.
- **Versatile Across 5 Roles**: DevOps/Cloud Engineer, Backend Engineer, AI/GenAI Specialist, Full-Stack Developer, or Junior Web Project Manager.
- **Academic Rigor**: Bachelor in Computer Science from FAST-NUCES (Pakistan, 2024) + Master of Science in IT at EPITECH Paris (2025–2027).
- **Status & Next Step**: Alternance at EPITECH Paris (Sept 2026 – Sept 2027), open to future CDI/CDD opportunities in Paris or remote.

### Suggested Inquiries:
? What roles and contracts are you available for in Paris?
~ Born October 16, 2002 (23 years old) with 2+ years of production experience
? Tell me about your role as Pedagogical Assistant at EPITECH Paris.
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?`,
    ];
    return whyHireVariants[varIdx % whyHireVariants.length];
  }

  // 5. SPECIFIC: WHAT IS EPITECH?
  if (
    /what is epitech|about epitech|tell me about epitech|epitech school|epitech paris|what is epitech paris/i.test(q)
  ) {
    return `### EPITECH Paris (European Institute of Information Technology)

**EPITECH** is a renowned French computer science and software engineering Grande École founded in Paris in 1999, famous for its hands-on, project-based peer-learning model that mirrors real-world production environments.

**My dual connection to EPITECH Paris:**
- **Master of Science in Information Technology (2025–2027)**: I am actively pursuing my advanced graduate degree here, specializing in distributed systems, software architecture, and technical leadership.
- **Pedagogical Assistant (September 2026 – September 2027)**: Employed by EPITECH Paris in an alternance to train and mentor engineering student cohorts in Linux internals, Docker containerization, backend architectures, and algorithmic problem-solving.

### Suggested Inquiries:
? Tell me about your role as Pedagogical Assistant at EPITECH Paris.
? What did you study at FAST-NUCES?
? Do you have experiences of DevOps and what services do you offer as DevOps?`;
  }

  // 6. SPECIFIC: WHAT SCHOOLS HAVE YOU BEEN PART OF? / EDUCATION / STUDIES
  if (
    /(what|which)\s*(school|university|college|institution)|where did you (study|go to school)|what is your education|education|academic background|studies|study history|universit(y|ies)|degrees?/i.test(q)
  ) {
    return `### Academic Foundation & Schools

I have been part of two leading engineering institutions:

1. **EPITECH Paris** *(Paris, France | 2025 – 2027)*
   - **Degree**: Master of Science in Information Technology (MSc IT)
   - **Focus**: Advanced software architectures, distributed cloud systems, and technical leadership.
   - **Role**: Simultaneously serving as **Pedagogical Assistant**, mentoring student cohorts in modern Linux systems, Docker, and algorithms.

2. **FAST-NUCES** *(2020 – 2024)*
   - **Degree**: Bachelor of Science in Computer Science (BSCS)
   - **Focus**: Rigorous computer science foundations including data structures, algorithmic complexity, operating systems, and machine learning.

### Suggested Inquiries:
? Tell me about your role as Pedagogical Assistant at EPITECH Paris.
? What was your focus at FAST-NUCES?
? Do you have experiences of DevOps and what services do you offer as DevOps?`;
  }

  // 7. SPECIFIC: WHAT IS FAST-NUCES?
  if (/fast[\s-]*nuces|fast university|national university of computer/i.test(q)) {
    return `### FAST-NUCES (National University of Computer & Emerging Sciences)

**FAST-NUCES** is widely recognized as one of the premier computer science universities in Pakistan, known for its intense mathematical rigor, operating systems focus, and competitive programming culture.

- **My Degree**: Bachelor of Science in Computer Science (BSCS, 2020–2024).
- **Core Focus**: Algorithms, data structures, distributed computing, database internals, and computer vision.
- **Outcome**: Built the deep computer science foundation that powers my current machine learning and backend engineering work at EPITECH and in industry.

### Suggested Inquiries:
? Tell me about your Master of Science program at EPITECH Paris.
? Tell me about your featured machine learning projects (Zoidberg 2.0).
? Do you have experiences of DevOps and what services do you offer as DevOps?`;
  }

  // 8. PEDAGOGICAL ASSISTANT / TEACHING / MENTORING
  if (/pedagogical|assistant|mentor|teaching|teach|students|workshops|vulgarization/i.test(q)) {
    return `### Pedagogical Assistant @ EPITECH Paris
*September 2026 – September 2027 (Alternance) | Paris, France*

In my role as Pedagogical Assistant, I bridge advanced engineering theory with hands-on practice for engineering cohorts:
- **Cohort Mentoring**: Guiding engineering students through Linux internals, multi-stage Docker containerization, low-level systems, and algorithmic problem-solving.
- **Technical Workshops**: Designing and facilitating interactive modules translating abstract concepts (such as distributed backends and AI architectures) into working code.
- **Technical Vulgarization**: Cultivating the ability to explain complex technical designs clearly to diverse teams and stakeholders.

### Suggested Inquiries:
? Tell me about your engineering work at Brackets Private Limited.
? Do you have experiences of DevOps and what services do you offer as DevOps?
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?`;
  }

  // 9. BRACKETS PRIVATE LIMITED / INDUSTRY EXPERIENCE
  if (/brackets|associate software engineer|previous job|industry experience/i.test(q)) {
    return `### Associate Software Engineer @ Brackets Private Limited
*July 2024 – August 2025 | International / Remote*

At Brackets, I worked in cross-functional Agile/Scrum sprints delivering production software:
- **Backend & APIs**: Developed high-throughput REST APIs and modular microservices using **Python (FastAPI, Django)** and **Node.js**.
- **DevOps & Cloud**: Standardized containerization with **Docker** and built automated **CI/CD pipelines** deploying workloads onto **AWS and GCP**.
- **Applied GenAI**: Engineered multimodal OCR-to-LLM pipelines using **OpenAI API** and **LangChain** for enterprise document processing.

### Suggested Inquiries:
? Tell me about DoctorIQ and clinical document extraction.
? Tell me about Brackets Genie and real-time WebSockets.
? Do you have experiences of DevOps and what services do you offer as DevOps?`;
  }

  // 10. GENERAL EXPERIENCE / WORK HISTORY
  if (/experience|career|work history|where have you worked|jobs|compan(y|ies)|which company/i.test(q)) {
    return `### Professional Experience Overview

1. **Pedagogical Assistant @ EPITECH Paris** *(Sept 2024 – Present | Paris, France)*
   - Mentoring engineering cohorts in modern software architecture, Linux, Docker, and algorithms.
   - Designing hands-on instructional workshops and technical challenges.

2. **Associate Software Engineer @ Brackets Private Limited** *(July 2024 – Aug 2025 | Remote)*
   - High-throughput REST APIs & microservices with Python (FastAPI/Django) and Node.js.
   - Multi-cloud CI/CD automation and containerized deployments across AWS and GCP.
   - Enterprise OCR-to-LLM document processing pipelines with OpenAI and LangChain.

### Suggested Inquiries:
? Tell me about DoctorIQ and clinical document extraction.
? Do you have experiences of DevOps and what services do you offer as DevOps?
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?`;
  }

  // 17. ALL PROJECTS / PORTFOLIO SHOWCASE
  if (/projects?|portfolio|what have you built|inventions|showcase/i.test(q)) {
    return `### Featured Engineering Portfolio (8 Key Projects)

1. **DoctorIQ**: Multimodal healthcare document platform cutting turnaround time by 70% with OCR, Claude/OpenAI APIs, Celery, and AWS.
2. **Brackets Genie**: Real-time multi-agent conversational platform with LangGraph, LangChain, sub-50ms WebSockets, and Claude/OpenAI.
3. **VIF**: Food solidarity web & mobile platform led from functional specs to production delivery with FastAPI, React Native, and DORA tracking.
4. **Ledgeroo**: Secure FinTech backend with encrypted transactions, automated Stripe API billing, and AWS CI/CD.
5. **Trinity Suite (Dev-Web, Dev-App, DevOps)**: Complete Software Factory pipeline with SonarQube quality gates, 90%+ test coverage, Django REST, React 18, and React Native PayPal checkout.
6. **Time Manager**: High-concurrency real-time tracking tool in Elixir (Phoenix), Vue 3 & React, PostgreSQL, and WebSockets.
7. **Tamiami Fitness**: AI booking automation and OCR pipeline on AWS Lambda and DynamoDB, automating 90% of bookings.
8. **Zoidberg 2.0**: Medical image deep learning benchmarking pipeline evaluating 6 CNN/DenseNet121 models with stratified CV and ROC-AUC.

Which project would you like to explore in detail?

### Suggested Inquiries:
? Tell me about DoctorIQ and clinical document extraction.
? Tell me about Brackets Genie and agentic WebSockets.
? Tell me about Ledgeroo and FinTech Stripe integration.`;
  }

  // 18. TECH STACK & SKILLS
  if (/skills?|tech\s*stack|technologies|tools|what do you use|languages\s*do\s*you\s*code/i.test(q)) {
    return `### Core Technical Stack & Capabilities

- **Backend & Microservices**: Python (FastAPI, Django), TypeScript, Node.js, Elixir (Phoenix), PostgreSQL, Redis, Celery, WebSockets.
- **Frontend & Mobile**: React 18, Vue 3, React Native (TypeScript), Tailwind CSS, State Synchronization, Performance-tuned Hooks.
- **DevOps, DevSecOps & Cloud**: Docker & Compose, GitLab CI, GitHub Actions YAML, AWS (EC2, S3, Lambda, Bedrock, SageMaker), GCP, SonarQube, DORA Metrics, gitStream, Nginx.
- **Generative AI & Agentic Systems**: LangGraph (multi-step agents), LangChain, Anthropic Claude API, OpenAI API, Gemini Pro, RAG pipelines, Prompt Engineering.
- **Data Science & ML**: PyTorch, TensorFlow, scikit-learn, DenseNet121, CNNs, PCA, OpenCV, Pandas.

### Suggested Inquiries:
? Do you have experiences of DevOps and what services do you offer as DevOps?
? Tell me about DoctorIQ's cloud & Celery architecture.
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?`;
  }

  // 19. SPECIFIC TECH: PYTHON / DOCKER / AWS / FASTAPI / ELIXIR / VUE
  if (/\b(python|fastapi|django)\b/i.test(q)) {
    return `**Python** is my core language for both high-concurrency backends and machine learning:
- **FastAPI**: Used for asynchronous microservices in platforms like *VIF* and *Brackets Genie*.
- **Django**: Paired with Celery, Redis, and PostgreSQL for robust enterprise systems like *DoctorIQ*, *Ledgeroo*, and *Trinity Dev-Web*.
- **ML & GenAI**: Daily production use with PyTorch, TensorFlow, LangGraph, LangChain, and Anthropic/OpenAI APIs.

### Suggested Inquiries:
? Tell me about DoctorIQ's cloud & Celery architecture.
? Do you have experiences of DevOps and what services do you offer as DevOps?
? What is your full backend and database tech stack?`;
  }

  if (/\b(docker|aws|gcp|devops|cloud|ci\/cd|kubernetes)\b/i.test(q)) {
    return `### Cloud & DevOps Engineering
- **Containerization**: Standardizing local and cloud setups with multi-stage **Docker** and Docker Compose.
- **CI/CD & DevSecOps**: Automated release gates with **GitLab CI**, **GitHub Actions**, **gitStream**, and **SonarQube** code quality scans.
- **Cloud Deployments**: 20+ production deployments across **AWS (EC2, S3, Lambda, LightSail)** and **GCP**, with DORA metrics tracking.

### Suggested Inquiries:
? Tell me about DoctorIQ's cloud & Celery architecture.
? What is your full backend and database tech stack?
? What roles and contracts are you available for in Paris?`;
  }

  // 20. SPOKEN LANGUAGES
  if (/language|speak|fluent|french|english|urdu/i.test(q)) {
    return `### Spoken Languages

- **English**: **C1** — Full professional, technical, and client-facing fluency.
- **French**: **B1.1** — Working proficiency, actively communicating and studying in Paris.
- **Urdu**: **Native** speaker.

### Suggested Inquiries:
? What is your current availability, working status, and location preference in Paris?
~ Fluent English C1, working French B1.1, native Urdu
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?
~ Alternance at EPITECH (Sept 2026 – Sept 2027) • Open to future CDI/CDD`;
  }

  // 21. LOCATION / RESIDENCE
  if (/location|paris|france|where (do you live|are you based|are you located)\b/i.test(q)) {
    return `I am currently living and working in **Paris, France** (born and raised in Pakistan).

I study and mentor at EPITECH Paris and am available for opportunities in Paris/Île-de-France (on-site or hybrid) as well as remote roles.

### Suggested Inquiries:
? What is your current availability, working status, and location preference in Paris?
~ Born in Pakistan, currently living in Paris, France
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?
~ Alternance at EPITECH Paris • Future CDI/CDD`;
  }

  // 22. AVAILABILITY, ALTERNANCE & TARGET OPPORTUNITY
  if (/hire|available|availability|opportunity|job|contract|internship|roles|work together|alternan|apprenti|work[\s-]*study|contrat de pro|september 2026|septembre 2026|cdi|cdd/i.test(q)) {
    const alternanceVariants = [
      `### Current Status & Future Opportunities (CDI / CDD)

**Current Status**: Alternance started in **September 2026** and ends in **September 2027** as **Pedagogical Assistant at EPITECH Paris**.
**Target Opportunity**: Looking for full-time **CDI or CDD opportunities in the future after September 2027**.

**Target Roles**:
- **Software Engineer (Backend / Full-Stack)**: Python (FastAPI, Django), TypeScript, React 18, Vue 3, Node.js
- **DevOps & Cloud Engineer / DevSecOps**: CI/CD pipelines, Docker, AWS/GCP, SonarQube, DORA metrics, Nginx
- **AI & Data Engineer / GenAI Specialist**: LangGraph, LangChain, Claude API, OpenAI, RAG, PyTorch
- **Junior Web Project Manager**: Agile/Scrum sprint coordination, specifications, delivery ownership

**Key Details**:
- **Location**: Paris, France (on-site, hybrid, or remote)
- **Work Authorization**: Full working rights in France
- **Languages**: English C1 (fluent), French B1.1 (working), Urdu (native)

Reach Moiz directly at **${profile.email}** or on [LinkedIn](${profile.linkedin}).

### Suggested Inquiries:
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?
~ Alternance at EPITECH (Sept 2026 – Sept 2027) • Future CDI/CDD
? Do you have experiences of DevOps and what services do you offer as DevOps?
~ Full working authorization in France with C1 English & B1.1 French`,

      `### Recruitment & Career Status

Moiz started his alternance as **Pedagogical Assistant at EPITECH Paris** in **September 2026** (ending **September 2027**) while completing his MSc in Information Technology, and is looking for **future CDI or CDD opportunities** after September 2027.

- **Focus Areas**: Backend Engineering (Python/FastAPI/Django), Cloud Infrastructure (Docker/AWS/GCP), and Agentic AI (LangGraph).
- **Location & Work Rights**: Paris, France (on-site, hybrid, remote) with full French working authorization.
- **Direct Reach**: [${profile.email}](mailto:${profile.email}) or [${profile.phone}](tel:${profile.phone.replace(/\\s+/g, '')}).

### Suggested Inquiries:
? Tell me about your featured projects (DoctorIQ, Brackets Genie, Ledgeroo, VIF).
~ Currently in alternance at EPITECH • Open to future CDI/CDD
? What is your full backend and database tech stack?
~ Contact directly: ${profile.email}`,
    ];
    return alternanceVariants[varIdx % alternanceVariants.length];
  }

  // 18. CONTACT DETAILS
  if (/contact|email|phone|reach|message|linkedin|github/i.test(q)) {
    return `### Direct Contact Details

- **Email**: [${profile.email}](mailto:${profile.email})
- **Phone**: [${profile.phone}](tel:${profile.phone.replace(/\s+/g, '')})
- **LinkedIn**: [linkedin.com/in/moizghauri](${profile.linkedin})
- **GitHub**: [github.com/amoiz0468](${profile.github})
- **Location**: ${profile.location} (Paris, France)

### Suggested Inquiries:
? What roles and contract types are you open to?
~ Response typically within 24 business hours
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?
~ Direct reach: ${profile.email}`;
  }

  // 19. WHO ARE YOU / BIO
  if (/(who are you|about you|tell me about yourself|introduce yourself|bio|summary)/i.test(q)) {
    const bioVariants = [
      `I'm **Muhammad Abdul Moiz**, a Software & Machine Learning Engineer based in Paris (born October 16, 2002, 23 years old). I was **born and raised in Pakistan** and currently reside in **Paris, France**.

Currently pursuing an **MSc in IT at EPITECH Paris** while mentoring student cohorts as a **Pedagogical Assistant**. Previously, I was an **Associate Software Engineer at Brackets**, building high-throughput microservices, Dockerized pipelines, and multimodal OCR-to-LLM systems (*DoctorIQ*).

### Suggested Inquiries:
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?
~ Born & raised in Pakistan (23 years old), based in Paris
? Do you have experiences of DevOps and what services do you offer as DevOps?
~ Full working authorization in France with fluent English and working French`,

      `I represent Muhammad Abdul Moiz, a Software & ML Engineer based in Paris (born October 16, 2002, 23 years old; born and raised in Pakistan).

He combines theoretical depth (BSCS from FAST-NUCES in Pakistan) with hands-on systems architecture at EPITECH Paris and industry experience at Brackets. He specializes in Python backends (FastAPI/Django), automated CI/CD, and agentic workflows.

### Suggested Inquiries:
? Tell me about your featured projects (DoctorIQ, Brackets Genie, Ledgeroo, VIF).
~ In alternance at EPITECH (Sept 2026 – Sept 2027) • Future CDI/CDD
? What is your full backend and database tech stack?
~ Contact directly: ${profile.email}`,
    ];
    return bioVariants[varIdx % bioVariants.length];
  }

  // 20. THANKS & HUMOR
  if (/thank|thanks|merci|cool|awesome|great|good job|nice/i.test(q)) {
    return `You're very welcome! Let me know if there's anything else about my projects, tech stack, or experience at EPITECH and Brackets that you'd like to explore.

### Suggested Inquiries:
? Tell me about your featured projects (DoctorIQ, Brackets Genie, Zoidberg 2.0).
~ Always happy to help recruiters and engineering leads
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?
~ Fast contact: ${profile.email}`;
  }

  // 21. OFF-TOPIC & UNRELATED QUERIES GUARD
  if (
    /^(what is the (capital|weather|meaning of life|president)|who is (elon|donald|joe|obama|messi|ronaldo|bill gates)|solve|calculate|\d+\s*[\+\-\*\/]\s*\d+|how to (cook|bake|make|fix|build a house)|tell me a (joke|riddle|story)|write (me )?(a )?(poem|song|story|essay|script|code for|program for|function to))\b/i.test(q)
  ) {
    return `I am exclusively dedicated to representing **Muhammad Abdul Moiz**.

I only answer questions regarding Moiz's professional engineering background, projects, technical skills (DevOps, Cloud, AI, Full-Stack), education, and work availability.

Please feel free to ask about his featured projects (DoctorIQ, Brackets Genie), his experience at [Brackets Private Limited](https://www.bracketsltd.com/) and [EPITECH Paris](https://www.epitech.eu/en/), or his technical stack!`;
  }

  // 23. INTELLIGENT COMPREHENSIVE DEFAULT (3 Dynamic Variants, never rigid or repetitive)
  const defaultVariants = [
    `I'm here to help as Muhammad Abdul Moiz's AI twin. You can explore:

- **DevOps & Cloud**: GitLab CI, GitHub Actions, Docker, AWS & GCP deployments, SonarQube, and DORA metrics
- **Experience**: Teaching at **EPITECH Paris** & backend engineering at **Brackets Private Limited**
- **Featured Projects**: *DoctorIQ* (healthcare OCR), *Brackets Genie* (real-time WebSockets), and *Ledgeroo*
- **Status & Opportunity**: In alternance at EPITECH Paris (Sept 2026 – Sept 2027), open to future CDI/CDD roles
- **Direct Contact**: Reach me directly at \`${profile.email}\`

### Suggested Inquiries:
? Do you have experiences of DevOps and what services do you offer as DevOps?
~ Alternance at EPITECH Paris • Future CDI/CDD
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?
~ Master of Science at EPITECH Paris & BSCS from FAST-NUCES (Pakistan)`,

    `I represent Muhammad Abdul Moiz, a Software & Machine Learning Engineer based in Paris (born October 16, 2002, 23 years old; born and raised in Pakistan).

Feel free to ask me about:
- **Core Engineering**: Python (FastAPI/Django) backends, Docker automation, and LangGraph agent pipelines.
- **Key Projects**: *DoctorIQ* (asynchronous clinical extraction), *Brackets Genie* (sub-50ms WebSockets), and *Trinity Suite*.
- **Direct Contact**: Reach Moiz directly at \`${profile.email}\`.

### Suggested Inquiries:
? Tell me about your featured projects (DoctorIQ, Brackets Genie, Ledgeroo, VIF).
~ Specializing in Python backends, Docker automation, and agentic workflows
? How old are you and what is your academic background?
~ Direct contact: ${profile.email}`,

    `I'm here as Moiz's AI representative to give you a concise view of his work, engineering background, and experience.

Key areas you can explore:
- **Cloud & DevOps**: Multi-stage Docker builds, automated CI/CD pipelines, and AWS/GCP deployments.
- **Leadership & Teaching**: Mentoring engineering cohorts at EPITECH Paris and tracking DORA metrics.
- **Opportunity**: Alternance at EPITECH Paris (Sept 2026 – Sept 2027), seeking future CDI/CDD in Paris/Remote with full French work rights.

### Suggested Inquiries:
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?
~ English C1 fluent, French B1 working, native Urdu
? What are your passions and hobbies outside of work?
~ Looking for future CDI/CDD opportunities after September 2027`,
  ];

  return defaultVariants[varIdx];
}
