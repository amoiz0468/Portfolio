export type Language = 'en' | 'fr';

export interface Translations {
  nav: {
    overview: string;
    projects: string;
    experience: string;
    skills: string;
    chat: string;
    about: string;
    contact: string;
    hireMe: string;
    roleParis: string;
    themeLight: string;
    themeDark: string;
    toggleThemeAria: string;
    toggleLangAria: string;
  };
  hero: {
    availableBadge: string;
    headlinePart1: string;
    headlinePart2: string;
    headlinePart3: string;
    summary: string;
    getInTouch: string;
    viewInventions: string;
    askAi: string;
    coreFocus: string;
    coreFocusValue: string;
    primaryStack: string;
    primaryStackValue: string;
    currentRole: string;
    currentRoleValue: string;
    openToWork: string;
    specsTag: string;
    explore: string;
  };
  stats: {
    years: { label: string; value: string };
    aiProjects: { label: string; value: string };
    cloudDeployments: { label: string; value: string };
    techStacks: { label: string; value: string };
  };
  story: {
    eyebrow: string;
    title: string;
    titleGradient: string;
    subtitleMobile: string;
    subtitleDesktop: string;
    jumpToMilestone: string;
    stories: Array<{
      step: string;
      eyebrow: string;
      title: string;
      subtitle: string;
      context: string;
      badge: string;
      description: string;
      highlights: string[];
      metric: string;
      metricLabel: string;
      tag: string;
      stack: string[];
    }>;
  };
  telemetry: {
    title: string;
    live: string;
    logs: Array<{
      time: string;
      label: string;
      text: string;
      status: string;
    }>;
  };
  projectsSection: {
    eyebrow: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterAi: string;
    filterDevops: string;
    filterFullstack: string;
    viewDetails: string;
    modalTitle: string;
    modalTechTitle: string;
    close: string;
    projects: Array<{
      title: string;
      category: string;
      description: string;
      stack: string[];
    }>;
  };
  skillsSection: {
    eyebrow: string;
    title: string;
    subtitle: string;
    domainLabel: string;
    productionVetted: string;
    spokenLanguagesTitle: string;
    engineeringValuesTitle: string;
    languages: Array<{
      language: string;
      level: string;
      proficiency: string;
    }>;
    values: string[];
    skillGroups: Array<{
      title: string;
      items: string[];
    }>;
  };
  experienceSection: {
    eyebrow: string;
    title: string;
    subtitle: string;
    experiences: Array<{
      role: string;
      company: string;
      period: string;
      location: string;
      points: string[];
    }>;
  };
  educationSection: {
    educationEyebrow: string;
    educationTitle: string;
    highlightsEyebrow: string;
    highlightsTitle: string;
    items: Array<{
      title: string;
      school: string;
      period: string;
      focus: string;
    }>;
    achievements: string[];
  };
  passionsSection: {
    eyebrow: string;
    title: string;
    subtitle: string;
    passions: Array<{
      title: string;
      subtitle: string;
      description: string;
      tag: string;
    }>;
  };
  aboutPage: {
    headTitle: string;
    headDesc: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    summary: string;
    p2: string;
    academicEyebrow: string;
    academicTitle: string;
    valuesEyebrow: string;
    valuesTitle: string;
    languagesTitle: string;
    passionsEyebrow: string;
    passionsTitle: string;
    passionsSubtitle: string;
  };
  contactPage: {
    headTitle: string;
    headDesc: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    reachOutDirectly: string;
    availabilityNote: string;
    formName: string;
    formNamePlaceholder: string;
    formEmail: string;
    formEmailPlaceholder: string;
    formMessage: string;
    formMessagePlaceholder: string;
    formSubmit: string;
    formSubmitting: string;
    formSuccess: string;
    formError: string;
    copyEmail: string;
    emailCopied: string;
    openMailApp: string;
    directFallbackNote: string;
    charactersRemaining: string;
    linkedinLabel: string;
    githubLabel: string;
  };
  chat: {
    floatingButtonLabel: string;
    headerTitle: string;
    headerSubtitle: string;
    headerStatus: string;
    initialMessage: string;
    inputPlaceholder: string;
    sendButtonAria: string;
    clearChatAria: string;
    minimizeAria: string;
    closeAria: string;
    suggestedTopicsTitle: string;
    askArrow: string;
    disclaimer: string;
    suggestedTopics: Array<{
      label: string;
      query: string;
    }>;
  };
  mobileNav: {
    home: string;
    impact: string;
    aiTwin: string;
    projects: string;
    contact: string;
  };
  footer: {
    brandBio: string;
    navHeading: string;
    contactHeading: string;
    backToTop: string;
    rights: string;
    overview: string;
    selectedProjects: string;
    experienceTimeline: string;
    technicalEcosystem: string;
    aiAssistant: string;
    aboutMoiz: string;
    contact: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      overview: 'Overview',
      projects: 'Projects',
      experience: 'Experience',
      skills: 'Skills',
      chat: 'AI Assistant',
      about: 'About',
      contact: 'Contact',
      hireMe: 'Hire Me',
      roleParis: 'Engineer • Paris',
      themeLight: 'Light',
      themeDark: 'Dark',
      toggleThemeAria: 'Toggle light and dark theme',
      toggleLangAria: 'Switch to French language',
    },
    hero: {
      availableBadge: 'Available for Web • AI • DevOps Roles',
      headlinePart1: 'Engineering',
      headlinePart2: 'Intelligence.',
      headlinePart3: 'Architecting Scale.',
      summary:
        'Software and Machine Learning Engineer pursuing an MSc in Information Technology at EPITECH Paris. Proven track record bridging technical engineering, modern web architectures, and automated DevOps infrastructure with operational delivery.',
      getInTouch: 'Get in Touch',
      viewInventions: 'View Inventions',
      askAi: 'Ask My AI',
      coreFocus: 'Core Focus',
      coreFocusValue: 'AI & SaaS Systems',
      primaryStack: 'Primary Stack',
      primaryStackValue: 'Python / Django / FastAPI / Docker / AWS',
      currentRole: 'Current Role',
      currentRoleValue: 'EPITECH Paris (Pedagogical Asst.)',
      openToWork: 'Open to Work',
      specsTag: 'EPITECH Paris MSc IT',
      explore: 'Explore',
    },
    stats: {
      years: { label: 'Years building products', value: '2+' },
      aiProjects: { label: 'AI & ML projects', value: '10+' },
      cloudDeployments: { label: 'Cloud / DevOps deployments', value: '20+' },
      techStacks: { label: 'Tech stacks used', value: '8+' },
    },
    story: {
      eyebrow: 'The Engineering Experience',
      title: 'Built for impact.',
      titleGradient: 'Proven in production.',
      subtitleMobile: 'Swipe through the 5 milestones defining systems depth, from applied GenAI to mentorship.',
      subtitleDesktop: "Scroll to experience the 5 engineering milestones that define Muhammad Abdul Moiz's capabilities, from applied GenAI to systems mentorship.",
      jumpToMilestone: 'Jump to Milestone',
      stories: [
        {
          step: '01',
          eyebrow: 'Applied Generative AI',
          title: 'Autonomous Agent Systems & Multimodal AI',
          subtitle: 'Transforming experimental LLMs into high-throughput production platforms.',
          context: 'DoctorIQ Platform & GenAI Workflows',
          badge: 'Live In Production',
          description:
            'Engineered multimodal document extraction and real-time streaming platforms. Combined high-precision OCR with LLM orchestration (OpenAI API, Google Gemini Pro, LangChain) and async Celery workers to cut document extraction time by 70%.',
          highlights: [
            'DoctorIQ Platform: OCR-to-LLM pipeline slashing document extraction time by 70% with structured JSON outputs.',
            'Real-time bidirectional token streaming using WebSockets in Python and Node.js.',
            'Autonomous multi-agent workflows, vector retrieval (RAG), and prompt engineering in Agile sprints.',
          ],
          metric: '70%',
          metricLabel: 'Extraction latency reduction in DoctorIQ medical pipeline',
          tag: 'Production GenAI',
          stack: ['Python', 'OpenAI API', 'Gemini Pro', 'LangChain', 'Celery', 'Redis', 'AWS'],
        },
        {
          step: '02',
          eyebrow: 'Backend & Microservices',
          title: 'Modular Microservices & Distributed Architecture',
          subtitle: 'High-concurrency RESTful backends engineered for zero request blocking.',
          context: 'Associate Software Engineer @ Brackets',
          badge: 'High Concurrency',
          description:
            'Architected modular backend microservices and high-concurrency REST APIs using Python (FastAPI, Django) and Node.js. Decoupled CPU-intensive workloads via Celery task queues and Redis brokers to maintain consistent sub-100ms API response latencies.',
          highlights: [
            'Engineered modular microservices and high-throughput REST APIs handling high concurrent request loads.',
            'Decoupled asynchronous worker queuing with Celery, Redis message brokers, and live WebSocket feeds.',
            'Optimized PostgreSQL schemas with connection pooling, transactional integrity, and automated migrations.',
          ],
          metric: '8+',
          metricLabel: 'Core tech stacks mastered across Python, Node.js, and Cloud backends',
          tag: 'Backend Architecture',
          stack: ['FastAPI', 'Django', 'Node.js', 'PostgreSQL', 'Redis', 'Celery', 'WebSockets'],
        },
        {
          step: '03',
          eyebrow: 'Cloud & Infrastructure',
          title: 'Resilient Cloud Deployment & Continuous Delivery',
          subtitle: 'Multi-cloud containerization on AWS and GCP with automated CI/CD gates.',
          context: 'DevOps Workflows & Cloud Infrastructure',
          badge: 'Automated CI/CD',
          description:
            'Standardized development and production execution environments using multi-stage Docker builds and Docker Compose. Constructed automated testing, linting, and deployment pipelines using GitHub Actions and GitLab CI across AWS and GCP.',
          highlights: [
            'Standardized container environments across local, staging, and production using multi-stage Dockerfiles.',
            'Automated testing and continuous delivery gates with GitHub Actions and GitLab CI ensuring zero-defect merges.',
            'Orchestrated scalable workloads across AWS (EC2, S3, LightSail) and Google Cloud Platform.',
          ],
          metric: '20+',
          metricLabel: 'Cloud and DevOps production deployments executed across AWS and GCP',
          tag: 'Cloud & CI/CD',
          stack: ['Docker', 'AWS EC2 / S3', 'GCP', 'GitHub Actions', 'GitLab CI', 'Linux'],
        },
        {
          step: '04',
          eyebrow: 'Machine Learning Research',
          title: 'Deep Learning Research & Computer Vision Inference',
          subtitle: 'Empirical benchmarking, stratified cross-validation, and production inference.',
          context: 'Zoidberg 2.0 & Freshie Deployments',
          badge: 'Empirical ML',
          description:
            'Engineered automated medical image benchmarking pipelines (Zoidberg 2.0) comparing six convolutional and transfer-learning architectures with stratified cross-validation. Deployed real-time computer vision inference endpoints behind reverse proxies.',
          highlights: [
            'Automated deep learning benchmarking pipeline evaluating DenseNet121 and custom CNN architectures.',
            'Stratified 5-fold cross-validation preventing dataset bias and ensuring clinical-grade accuracy.',
            'Production computer vision inference deployed on AWS LightSail behind Apache reverse proxy with SSL routing.',
          ],
          metric: '10+',
          metricLabel: 'AI, Deep Learning, and Computer Vision project implementations & benchmarks',
          tag: 'Deep Learning & CV',
          stack: ['PyTorch', 'TensorFlow', 'scikit-learn', 'OpenCV', 'CNN', 'DenseNet121'],
        },
        {
          step: '05',
          eyebrow: 'Mentorship & Leadership',
          title: 'Pedagogical Mentorship & Engineering Delivery',
          subtitle: 'EPITECH Paris Assistant & Brackets Engineer | MSc IT + BSCS | English C1 & French B1.',
          context: 'EPITECH Paris & Industry Experience',
          badge: 'Paris Academic Lead',
          description:
            'Serving as Pedagogical Assistant at EPITECH Paris mentoring student cohorts in Linux internals, Docker, and algorithms, following 13 months as Associate Software Engineer at Brackets. Dual-degree rigor (MSc IT at EPITECH, BSCS at FAST-NUCES) with C1 English & B1 French.',
          highlights: [
            'Mentored engineering cohorts through modern software architecture, Linux environments, and Docker setups.',
            'Designed and facilitated interactive workshops, advancing technical vulgarization for complex systems.',
            'Cross-cultural collaboration in international teams across English (C1 Fluent) and French (B1 Working).',
          ],
          metric: 'EPITECH',
          metricLabel: 'Paris Pedagogical Assistant & Engineering Cohort Mentor (2024–Present)',
          tag: 'Leadership & Delivery',
          stack: ['Systems Architecture', 'Linux Internals', 'Agile / Scrum', 'English C1', 'French B1'],
        },
      ],
    },
    telemetry: {
      title: 'system_telemetry.sh — bash',
      live: 'LIVE',
      logs: [
        { time: '12:00:01', label: 'RUNTIME', text: 'Initializing high-throughput FastAPI & Celery workers', status: 'OK' },
        { time: '12:00:02', label: 'AI_PIPELINE', text: 'DoctorIQ OCR & OpenAI LLM extraction pipeline online', status: 'READY' },
        { time: '12:00:03', label: 'WEBSOCKET', text: 'Brackets Genie bi-directional stream router connected', status: 'ACTIVE' },
        { time: '12:00:04', label: 'CONTAINER', text: 'Docker multi-stage workloads verified on AWS / GCP', status: 'HEALTHY' },
        { time: '12:00:05', label: 'AVAILABILITY', text: 'Paris, France • Open for Web, AI & DevOps opportunities', status: 'OPEN' },
      ],
    },
    projectsSection: {
      eyebrow: 'Portfolio Gallery',
      title: 'Selected Inventions & Deployments',
      subtitle: 'End-to-end architectures across Generative AI, cloud deployments, and scalable backend platforms.',
      filterAll: 'All',
      filterAi: 'AI & ML',
      filterDevops: 'DevOps & Cloud',
      filterFullstack: 'Full-Stack',
      viewDetails: 'View Details',
      modalTitle: 'Architecture & Implementation',
      modalTechTitle: 'Technologies & Architecture',
      close: 'Close',
      projects: [
        {
          title: 'DoctorIQ',
          category: 'AI Healthcare & Medical Extraction',
          description:
            'Deployed an end-to-end medical processing platform that cut document extraction turnaround time by 70% through OCR, Anthropic/OpenAI LLM pipelines, Celery task queues, and AWS cloud deployment.',
          stack: ['Django REST', 'OpenAI API', 'Claude API', 'Celery', 'Redis', 'AWS EC2/S3/Lambda', 'Docker'],
        },
        {
          title: 'Brackets Genie',
          category: 'Real-Time Conversational AI & Agentic Orchestration',
          description:
            'Architected an NLP-driven agentic platform using LangGraph and LangChain for multi-step agent orchestration, streaming live call logs and telemetry with sub-50ms latency over WebSockets.',
          stack: ['FastAPI', 'React', 'TypeScript', 'LangGraph', 'LangChain', 'Claude API', 'OpenAI API', 'WebSockets'],
        },
        {
          title: 'VIF',
          category: 'Food Solidarity Platform & Project Leadership',
          description:
            'Project Lead overseeing full web and mobile lifecycle from functional specifications to production delivery. Configured cross-functional Git flows, Docker container tiers, and tracked DORA metrics across releases.',
          stack: ['FastAPI', 'React Native (TypeScript)', 'PostgreSQL', 'Docker', 'GitLab CI', 'DORA Dashboard'],
        },
        {
          title: 'Ledgeroo',
          category: 'Secure FinTech Backend & Learning Hub',
          description:
            'Architected a resilient financial backend featuring encrypted transaction handling, automated Stripe payment integration, invoice processing, and automated CI/CD deployment on AWS.',
          stack: ['Django', 'PostgreSQL', 'Stripe API', 'AWS', 'Docker', 'CI/CD'],
        },
        {
          title: 'Trinity Suite (Dev-Web, Dev-App, DevOps)',
          category: 'Software Factory & Supply Chain Platform',
          description:
            'Built a complete Software Factory pipeline with 70%+ to 90%+ test coverage, SonarQube quality gates, Django REST backends, React 18 / React Native mobile apps, PayPal checkout, and Nginx reverse proxies.',
          stack: ['Django 4.2', 'React 18 TypeScript', 'React Native', 'SonarQube', 'GitLab CI', 'Docker Compose', 'Linux'],
        },
        {
          title: 'Time Manager',
          category: 'High-Concurrency Real-Time Tracking Tool',
          description:
            'Engineered a secure role-based resource synchronization metrics platform using Elixir (Phoenix), Vue 3 & React frontends, PostgreSQL, and real-time WebSockets for high-concurrency event loops.',
          stack: ['Elixir (Phoenix)', 'Vue 3', 'React', 'PostgreSQL', 'WebSockets', 'JWT / RBAC'],
        },
        {
          title: 'Tamiami Fitness',
          category: 'AI Booking Engine & Document OCR Hub',
          description:
            'Automated 90% of member bookings through Dialogflow conversational NLP and document OCR extraction pipelines deployed on AWS Lambda, DynamoDB, and GCP.',
          stack: ['Node.js', 'Express', 'Dialogflow', 'OCR Models', 'AWS Lambda', 'DynamoDB', 'GCP'],
        },
        {
          title: 'Zoidberg 2.0',
          category: 'Deep Learning Model Comparison Pipeline',
          description:
            'Engineered an end-to-end ML benchmarking pipeline with PCA feature reduction, 5-fold stratified cross-validation, and comparative evaluation of 6 supervised models (DenseNet121, CNN, SVM, RF) with ROC-AUC & F1 metrics.',
          stack: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'DenseNet121', 'CNN', 'PCA'],
        },
      ],
    },
    skillsSection: {
      eyebrow: 'Skill Ecosystem',
      title: 'Modern technologies, proven in production',
      subtitle: 'Specialized in asynchronous Python APIs, deep learning, containerized workflows, and cloud deployments.',
      domainLabel: 'Domain',
      productionVetted: 'Production vetted',
      spokenLanguagesTitle: 'Spoken Languages',
      engineeringValuesTitle: 'Engineering Values',
      languages: [
        { language: 'English', level: 'C1', proficiency: 'Fluent / Professional, Technical & Client-Facing' },
        { language: 'French', level: 'B1.1', proficiency: 'Intermediate / Working Proficiency in Paris' },
        { language: 'Urdu', level: 'Native', proficiency: 'Native speaker' },
      ],
      values: [
        'Rigorous engineering & clean code',
        'Problem-solving with high autonomy',
        'Technical vulgarization & cohort mentoring',
        'Cross-functional team leadership',
        'Agile/Scrum delivery & DORA metrics visibility',
        'Continuous curiosity & LLM/Agentic research',
      ],
      skillGroups: [
        {
          title: 'Web & Backend',
          items: ['Python (FastAPI, Django)', 'TypeScript / JavaScript', 'Node.js', 'React 18', 'Vue 3', 'Elixir (Phoenix)', 'PostgreSQL', 'Redis'],
        },
        {
          title: 'AI & Data Science',
          items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'DenseNet121', 'CNNs', 'PCA', 'OpenCV', 'Pandas'],
        },
        {
          title: 'DevOps & Software Factory',
          items: ['Docker & Compose', 'GitLab CI', 'GitHub Actions', 'AWS (EC2, S3, Lambda, Bedrock)', 'GCP', 'SonarQube', 'DORA Metrics', 'Nginx', 'gitStream'],
        },
        {
          title: 'Generative AI & Agents',
          items: ['LangChain', 'LangGraph (Multi-step)', 'Anthropic Claude API', 'OpenAI API', 'Gemini Pro', 'RAG Pipelines', 'Prompt Engineering', 'WebSockets'],
        },
      ],
    },
    experienceSection: {
      eyebrow: 'Career Timeline',
      title: 'Engineering depth and delivery leadership',
      subtitle: 'Hands-on experience in production environments, pedagogical training, and software architecture.',
      experiences: [
        {
          role: 'Pedagogical Assistant (Alternance)',
          company: 'EPITECH Paris',
          period: 'September 2026 – September 2027',
          location: 'Paris, France',
          points: [
            'Designed and conducted interactive technical training modules, mentoring engineering student cohorts in systems, software architecture, and development best practices.',
            'Guided students through complex Linux environments, containerization (Docker), algorithm design, and modern backend architectures.',
            'Translated abstract computer science and distributed system concepts into engaging, hands-on instructional projects.',
          ],
        },
        {
          role: 'Associate Software Engineer',
          company: 'Brackets Private Limited',
          period: 'July 2024 – August 2025',
          location: 'International / Remote',
          points: [
            'Developed modular backend services and high-throughput REST APIs using Python (FastAPI/Django), TypeScript, and Node.js.',
            'Architected automated CI/CD workflows, standardized Docker environments, and orchestrated cloud workloads across AWS (EC2, S3, Lambda) and GCP.',
            'Engineered multimodal OCR-to-LLM processing pipelines and multi-step agents leveraging LangGraph, LangChain, Anthropic Claude API, and OpenAI.',
            'Automated operational workflows with Bash and Python, reducing manual effort and improving system reliability by 70%.',
          ],
        },
      ],
    },
    educationSection: {
      educationEyebrow: 'Education',
      educationTitle: 'Academic Foundation',
      highlightsEyebrow: 'Key Highlights',
      highlightsTitle: 'What I Bring',
      items: [
        {
          title: 'Master of Science in Information Technology (MSc IT)',
          school: 'EPITECH Paris (Paris, France)',
          period: '2025 – 2027',
          focus: 'Advanced software systems, distributed architecture, and technical leadership.',
        },
        {
          title: 'Bachelor of Science in Computer Science (BSCS)',
          school: 'FAST-NUCES (Pakistan)',
          period: '2020 – 2024',
          focus: 'Data structures, algorithms, machine learning, and operating systems.',
        },
      ],
      achievements: [
        'Built production GenAI and multi-step agent systems with LangGraph, LangChain, Anthropic Claude, and OpenAI.',
        'Cut manual operational workflow effort and healthcare extraction latency by 70% with automated pipelines.',
        'Automated 90% of client bookings via NLP and OCR on AWS Lambda and DynamoDB.',
        'Delivered 20+ cloud deployments on AWS and GCP with DORA metrics tracking and SonarQube quality gates.',
        'Project Lead on VIF managing cross-functional squads (backend, mobile, DevOps) and end-to-end delivery.',
        'Mentored engineering cohorts at EPITECH Paris in Linux internals, Docker, and backend architectures.',
      ],
    },
    passionsSection: {
      eyebrow: 'Life Beyond Code',
      title: 'Passions, Disciplines & Creative Pursuits',
      subtitle: 'The activities that fuel curiosity, structured thinking, physical resilience, and well-rounded perspective.',
      passions: [
        {
          title: 'Cooking & Gastronomy',
          subtitle: 'Culinary experimentation & hosting',
          description:
            'Passionate about hands-on cooking, blending authentic heritage spices with French bistro techniques. Believes good food is the ultimate medium for hospitality and bringing teams together.',
          tag: 'Culinary Art',
        },
        {
          title: 'Traveling & Exploration',
          subtitle: 'Cultural journeys & discoveries',
          description:
            'Exploring European cities, historical landmarks, museums, and distinct regional cultures across France and beyond. Gaining new perspectives through immersive local experiences.',
          tag: 'Travel & Culture',
        },
        {
          title: 'Poetry & Creative Writing',
          subtitle: 'Creative reflection & rhythm',
          description:
            'Deep appreciation for classical and modern poetry, creative writing, and philosophical reflection that sharpens precision of language, metaphor, and mindful thought.',
          tag: 'Creative Writing',
        },
        {
          title: 'Photography',
          subtitle: 'Urban geometry & visual framing',
          description:
            'Framing Parisian street scenes, architectural symmetry, and interplay of natural light and shadows through mindful visual composition.',
          tag: 'Visual Arts',
        },
        {
          title: 'Sport & Fitness',
          subtitle: 'Strength training & endurance',
          description:
            'Dedicated to regular strength training, calisthenics, and cardiovascular conditioning. Builds mental discipline, physical resilience, and daily focus.',
          tag: 'Health & Vitality',
        },
        {
          title: 'Tech Deep Dives & ArXiv',
          subtitle: 'Continuous curiosity beyond work',
          description:
            'Reading foundational AI research papers, distributed system post-mortems, and experimenting with new agentic frameworks in personal sandboxes.',
          tag: 'Lifelong Learning',
        },
      ],
    },
    aboutPage: {
      headTitle: 'About | Muhammad Abdul Moiz',
      headDesc: 'About Muhammad Abdul Moiz — software and machine learning engineer focused on AI systems, cloud-native products, delivery leadership, and personal passions.',
      eyebrow: 'Profile Overview',
      title: 'Engineering with product, leadership, and operational depth',
      subtitle: 'Bridging high-performance machine learning models, modern web microservices, and automated cloud operations.',
      summary:
        'Software and Machine Learning Engineer pursuing a Master of Science in Information Technology at EPITECH Paris. Proven track record bridging technical engineering, modern web architectures, and automated DevOps infrastructure with operational delivery.',
      p2: 'I work at the intersection of software engineering, cloud infrastructure, and applied AI. My experience spans full-stack development, DevOps automation, containerized deployment workflows, and GenAI production systems that combine LLM reasoning with structured, real-world data pipelines.',
      academicEyebrow: 'Academic Background',
      academicTitle: 'Education',
      valuesEyebrow: 'Core Principles',
      valuesTitle: 'What I Value',
      languagesTitle: 'Spoken Languages',
      passionsEyebrow: 'Passions & Hobbies',
      passionsTitle: 'Life Beyond Code',
      passionsSubtitle: 'Personal pursuits that drive curiosity, discipline, creativity, and balanced focus.',
    },
    contactPage: {
      headTitle: 'Contact | Muhammad Abdul Moiz',
      headDesc: 'Get in touch with Muhammad Abdul Moiz for machine learning, GenAI, cloud, or software engineering opportunities.',
      eyebrow: 'Get In Touch',
      title: "Let's build something extraordinary",
      subtitle: "I'm open to full-time engineering roles, high-impact collaborations, and technical consulting.",
      reachOutDirectly: 'Reach Out Directly',
      availabilityNote: 'Based in Paris, France • Available for on-site, hybrid, or remote roles.',
      formName: 'Your Name',
      formNamePlaceholder: 'Jane Doe',
      formEmail: 'Email Address',
      formEmailPlaceholder: 'jane@company.com',
      formMessage: 'Project or Opportunity Details',
      formMessagePlaceholder: "Tell me about your team, tech stack, and what you're building...",
      formSubmit: 'Send Message',
      formSubmitting: 'Sending Message...',
      formSuccess: 'Thank you! Your message has been sent successfully. I will get back to you shortly.',
      formError: 'An error occurred while sending your message. Please try again or reach out directly by email.',
      copyEmail: 'Copy Email',
      emailCopied: 'Email Copied',
      openMailApp: 'Open Mail App',
      directFallbackNote: 'Instant Direct Channel',
      charactersRemaining: 'characters',
      linkedinLabel: 'LinkedIn Profile',
      githubLabel: 'GitHub Profile',
    },
    chat: {
      floatingButtonLabel: 'Ask AI Twin',
      headerTitle: 'Muhammad Abdul Moiz',
      headerSubtitle: 'AI Representative & Digital Twin',
      headerStatus: 'Online • Paris',
      initialMessage: `Hello! I'm **Muhammad Abdul Moiz**'s AI twin.

Feel free to ask me anything about my background, engineering work at [Brackets Private Limited](https://www.bracketsltd.com/) & [EPITECH Paris](#experience), featured [projects](#projects), or technical skills.`,
      inputPlaceholder: 'Ask about DevOps, AI projects, stack, or future CDI/CDD roles...',
      sendButtonAria: 'Send message',
      clearChatAria: 'Clear conversation history',
      minimizeAria: 'Minimize chat dialog',
      closeAria: 'Close chat dialog',
      suggestedTopicsTitle: 'Explore Core Capabilities',
      askArrow: 'Ask →',
      disclaimer: 'Powered by adaptive AI with direct project telemetry. Zero emojis.',
      suggestedTopics: [
        { label: 'DevOps & Services', query: 'Do you have experiences of DevOps and what services do you offer as DevOps?' },
        { label: 'Why Hire Moiz?', query: 'Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?' },
        { label: 'CDI/CDD & Status', query: 'What is your current status at EPITECH and availability for future CDI/CDD roles in Paris?' },
        { label: 'Featured Projects', query: 'Tell me about your featured projects (DoctorIQ, Brackets Genie, Ledgeroo, VIF).' },
        { label: 'Passions & Hobbies', query: 'What are your passions and hobbies outside of work (cooking, travel, photography, etc.)?' },
        { label: 'Experience & Roles', query: 'Tell me about your work experience and roles at Brackets and EPITECH Paris.' },
        { label: 'Core Skills & Stack', query: 'What are your core technical skills, programming languages, and tools?' },
        { label: 'EPITECH & Education', query: 'Tell me about your academic background at EPITECH Paris and FAST-NUCES.' },
      ],
    },
    mobileNav: {
      home: 'Home',
      impact: 'Impact',
      aiTwin: 'AI Twin',
      projects: 'Projects',
      contact: 'Contact',
    },
    footer: {
      brandBio:
        'Software & Machine Learning Engineer based in Paris. Focused on production GenAI pipelines, high-throughput backend services, and automated DevOps infrastructure.',
      navHeading: 'Navigation',
      contactHeading: 'Direct Contact',
      backToTop: 'Back to top',
      rights: 'All rights reserved.',
      overview: 'Overview',
      selectedProjects: 'Selected Projects',
      experienceTimeline: 'Experience Timeline',
      technicalEcosystem: 'Technical Ecosystem',
      aiAssistant: 'AI Assistant',
      aboutMoiz: 'About Moiz',
      contact: 'Contact',
    },
  },
  fr: {
    nav: {
      overview: 'Aperçu',
      projects: 'Projets',
      experience: 'Parcours',
      skills: 'Compétences',
      chat: 'Assistant IA',
      about: 'À propos',
      contact: 'Contact',
      hireMe: 'Me Recruter',
      roleParis: 'Ingénieur • Paris',
      themeLight: 'Clair',
      themeDark: 'Sombre',
      toggleThemeAria: 'Basculer entre thème clair et sombre',
      toggleLangAria: 'Passer en version anglaise',
    },
    hero: {
      availableBadge: 'Disponible pour postes Web • IA • DevOps',
      headlinePart1: 'Concevoir',
      headlinePart2: "L'Intelligence.",
      headlinePart3: "Bâtir l'Échelle.",
      summary:
        "Ingénieur Logiciel et Machine Learning en Master of Science à EPITECH Paris. Expertise éprouvée reliant l'ingénierie technique, les architectures web modernes et l'infrastructure DevOps automatisée à la livraison opérationnelle.",
      getInTouch: 'Me Contacter',
      viewInventions: 'Voir les Projets',
      askAi: "Questionner l'IA",
      coreFocus: 'Spécialisation',
      coreFocusValue: 'Systèmes IA & SaaS',
      primaryStack: 'Stack Principale',
      primaryStackValue: 'Python / Django / FastAPI / Docker / AWS',
      currentRole: 'Poste Actuel',
      currentRoleValue: 'EPITECH Paris (Assistant Pédagogique)',
      openToWork: 'Disponible',
      specsTag: 'EPITECH Paris MSc IT',
      explore: 'Explorer',
    },
    stats: {
      years: { label: 'Années de réalisation produit', value: '2+' },
      aiProjects: { label: 'Projets IA & Machine Learning', value: '10+' },
      cloudDeployments: { label: 'Déploiements Cloud / DevOps', value: '20+' },
      techStacks: { label: 'Stacks technologiques maîtrisées', value: '8+' },
    },
    story: {
      eyebrow: "L'Expérience d'Ingénierie",
      title: 'Conçu pour un impact réel.',
      titleGradient: 'Éprouvé en production.',
      subtitleMobile: "Découvrez les 5 étapes clés d'ingénierie, de l'IA générative appliquée au mentorat.",
      subtitleDesktop: "Faites défiler pour explorer les 5 étapes d'ingénierie démontrant les compétences de Muhammad Abdul Moiz, de la GenAI aux architectures distribuées.",
      jumpToMilestone: "Aller à l'étape",
      stories: [
        {
          step: '01',
          eyebrow: 'IA Générative Appliquée',
          title: 'Systèmes d’Agents Autonomes & IA Multimodale',
          subtitle: 'Transformer les LLMs expérimentaux en plateformes de production à haut débit.',
          context: 'Plateforme DoctorIQ & Workflows GenAI',
          badge: 'En Production Réelle',
          description:
            "Conception de plateformes d'extraction multimodale et de streaming en temps réel. Combinaison d'OCR haute précision et d'orchestration LLM (API OpenAI, Gemini Pro, LangChain) avec workers asynchrones Celery réduisant le temps d'extraction de 70%.",
          highlights: [
            "Plateforme DoctorIQ : Pipeline OCR-vers-LLM réduisant le temps d'extraction de documents de 70% avec sorties JSON structurées.",
            'Streaming bidirectionnel de tokens en temps réel via WebSockets en Python et Node.js.',
            'Workflows multi-agents autonomes, recherche vectorielle (RAG) et prompt engineering en cycles agiles.',
          ],
          metric: '70%',
          metricLabel: "Réduction de la latence d'extraction sur la chaîne médicale DoctorIQ",
          tag: 'GenAI en Production',
          stack: ['Python', 'OpenAI API', 'Gemini Pro', 'LangChain', 'Celery', 'Redis', 'AWS'],
        },
        {
          step: '02',
          eyebrow: 'Backend & Microservices',
          title: 'Microservices Modulaires & Architectures Distribuées',
          subtitle: 'Backends RESTful à forte concurrence conçus pour un blocage zéro requête.',
          context: 'Associate Software Engineer @ Brackets',
          badge: 'Haute Concurrence',
          description:
            'Architecture de microservices backend modulaires et d’APIs REST à haute cadence avec Python (FastAPI, Django) et Node.js. Découplage des calculs intensifs via files Celery et brokers Redis maintenant des temps de réponse sous 100ms.',
          highlights: [
            "Développement de microservices modulaires et d'APIs REST gérant d'importantes charges simultanées.",
            'Files de tâches asynchrones découplées avec Celery, brokers Redis et flux temps réel WebSockets.',
            'Optimisation des schémas PostgreSQL avec pooling de connexions, intégrité transactionnelle et migrations automatisées.',
          ],
          metric: '8+',
          metricLabel: 'Stacks logicielles majeures maîtrisées (Python, Node.js, Cloud)',
          tag: 'Architecture Backend',
          stack: ['FastAPI', 'Django', 'Node.js', 'PostgreSQL', 'Redis', 'Celery', 'WebSockets'],
        },
        {
          step: '03',
          eyebrow: 'Cloud & Infrastructure',
          title: 'Déploiement Cloud Résilient & Intégration Continue',
          subtitle: 'Conteneurisation multi-cloud sur AWS et GCP avec contrôle qualité CI/CD automatisé.',
          context: 'Workflows DevOps & Infrastructure Cloud',
          badge: 'CI/CD Automatisé',
          description:
            'Standardisation des environnements de développement et de production via builds Docker multi-étapes et Docker Compose. Construction de pipelines de tests, linting et déploiement avec GitHub Actions et GitLab CI sur AWS et GCP.',
          highlights: [
            'Environnements conteneurisés homogènes entre local, pré-production et production avec Docker.',
            'Portes de validation continue avec GitHub Actions et GitLab CI garantissant des fusions sans régression.',
            'Orchestration de charges évolutives sur AWS (EC2, S3, LightSail) et Google Cloud Platform.',
          ],
          metric: '20+',
          metricLabel: 'Déploiements de production Cloud & DevOps réalisés sur AWS et GCP',
          tag: 'Cloud & CI/CD',
          stack: ['Docker', 'AWS EC2 / S3', 'GCP', 'GitHub Actions', 'GitLab CI', 'Linux'],
        },
        {
          step: '04',
          eyebrow: 'Recherche Machine Learning',
          title: 'Recherche Deep Learning & Inférence Vision par Ordinateur',
          subtitle: 'Benchmarking empirique, validation croisée stratifiée et inférence en production.',
          context: 'Zoidberg 2.0 & Déploiements Freshie',
          badge: 'ML Empirique',
          description:
            "Création d'un banc d'essai automatisé d'imagerie médicale (Zoidberg 2.0) comparant six architectures convolutionnelles et transfer learning avec validation croisée stratifiée. Déploiement d'endpoints d'inférence en temps réel derrière reverse proxy.",
          highlights: [
            "Pipeline de benchmarking automatisé évaluant DenseNet121 et architectures CNN sur mesure.",
            'Validation croisée stratifiée à 5 plis éliminant les biais de données et assurant une fiabilité clinique.',
            "Inférence de vision par ordinateur déployée sur AWS LightSail derrière reverse proxy Apache sécurisé SSL.",
          ],
          metric: '10+',
          metricLabel: 'Réalisations et benchmarks IA, Deep Learning et Vision par Ordinateur',
          tag: 'Deep Learning & Vision',
          stack: ['PyTorch', 'TensorFlow', 'scikit-learn', 'OpenCV', 'CNN', 'DenseNet121'],
        },
        {
          step: '05',
          eyebrow: 'Mentorat & Leadership',
          title: 'Mentorat Pédagogique & Livraison Opérationnelle',
          subtitle: 'Assistant EPITECH Paris & Ingénieur Brackets | MSc IT + BSCS | Anglais C1 & Français B1.',
          context: 'EPITECH Paris & Expérience Industrielle',
          badge: 'Lead Académique Paris',
          description:
            "Assistant pédagogique à EPITECH Paris accompagnant les promotions d'ingénieurs sur les mécanismes internes Linux, Docker et les algorithmes, après 13 mois d'ingénierie logicielle chez Brackets. Double cursus d'excellence (MSc IT EPITECH, BSCS FAST-NUCES).",
          highlights: [
            "Mentorat de promotions d'ingénieurs sur les architectures modernes, environnements Linux et conteneurs Docker.",
            "Conception et animation d'ateliers interactifs, facilitant la vulgarisation technique de systèmes complexes.",
            "Collaboration multiculturelle au sein d'équipes internationales en anglais (C1 Courant) et français (B1 Professionnel).",
          ],
          metric: 'EPITECH',
          metricLabel: "Assistant Pédagogique Paris & Mentor d'Étudiants Ingénieurs (2024–Présent)",
          tag: 'Leadership & Livraison',
          stack: ['Architecture Systèmes', 'Linux Internals', 'Agile / Scrum', 'Anglais C1', 'Français B1'],
        },
      ],
    },
    telemetry: {
      title: 'telemetrie_systeme.sh — bash',
      live: 'EN DIRECT',
      logs: [
        { time: '12:00:01', label: 'RUNTIME', text: 'Initialisation des workers haute performance FastAPI & Celery', status: 'OK' },
        { time: '12:00:02', label: 'PIPELINE_IA', text: 'Pipeline d extraction OCR DoctorIQ & LLM OpenAI opérationnel', status: 'PRET' },
        { time: '12:00:03', label: 'WEBSOCKET', text: 'Routeur de flux bidirectionnel Brackets Genie connecté', status: 'ACTIF' },
        { time: '12:00:04', label: 'CONTENEURS', text: 'Charges multi-étapes Docker vérifiées sur AWS / GCP', status: 'STABLE' },
        { time: '12:00:05', label: 'DISPONIBILITE', text: 'Paris, France • À l écoute d opportunités Web, IA & DevOps', status: 'OUVERT' },
      ],
    },
    projectsSection: {
      eyebrow: 'Galerie de Projets',
      title: 'Projets Majeurs & Déploiements',
      subtitle: "Architectures complètes de l'IA générative aux plateformes cloud et backends évolutifs.",
      filterAll: 'Tous',
      filterAi: 'IA & ML',
      filterDevops: 'DevOps & Cloud',
      filterFullstack: 'Full-Stack',
      viewDetails: 'Voir Détails',
      modalTitle: 'Architecture & Implémentation',
      modalTechTitle: 'Technologies & Architecture',
      close: 'Fermer',
      projects: [
        {
          title: 'DoctorIQ',
          category: 'Santé IA & Extraction Médicale',
          description:
            "Plateforme médicale de bout en bout ayant réduit de 70% le délai d'extraction documentaire via OCR, pipelines LLM Anthropic/OpenAI, files de tâches Celery et déploiement cloud AWS.",
          stack: ['Django REST', 'OpenAI API', 'Claude API', 'Celery', 'Redis', 'AWS EC2/S3/Lambda', 'Docker'],
        },
        {
          title: 'Brackets Genie',
          category: 'IA Conversationnelle & Orchestration Multi-Agents',
          description:
            "Architecture d'une plateforme agentique pilotée par le NLP avec LangGraph et LangChain pour l'orchestration multi-agents, diffusant les télémétries d'appels avec une latence inférieure à 50ms sur WebSockets.",
          stack: ['FastAPI', 'React', 'TypeScript', 'LangGraph', 'LangChain', 'Claude API', 'OpenAI API', 'WebSockets'],
        },
        {
          title: 'VIF',
          category: 'Plateforme Solidarité Alimentaire & Lead Projet',
          description:
            "Lead projet assurant l'ensemble du cycle web et mobile, des spécifications fonctionnelles à la mise en production. Mise en place des workflows Git transversaux, conteneurs Docker et suivi des métriques DORA.",
          stack: ['FastAPI', 'React Native (TypeScript)', 'PostgreSQL', 'Docker', 'GitLab CI', 'DORA Dashboard'],
        },
        {
          title: 'Ledgeroo',
          category: 'Backend FinTech Sécurisé & Hub d Apprentissage',
          description:
            "Conception d'un backend financier résilient avec chiffrement des transactions, intégration Stripe automatisée, facturation et déploiement CI/CD continu sur AWS.",
          stack: ['Django', 'PostgreSQL', 'Stripe API', 'AWS', 'Docker', 'CI/CD'],
        },
        {
          title: 'Trinity Suite (Dev-Web, Dev-App, DevOps)',
          category: 'Software Factory & Chaîne d Approvisionnement Logicielle',
          description:
            'Pipeline complet de Software Factory avec 70% à 90%+ de couverture de tests, barrières SonarQube, backends Django REST, applications mobiles React 18 / React Native et reverse proxies Nginx.',
          stack: ['Django 4.2', 'React 18 TypeScript', 'React Native', 'SonarQube', 'GitLab CI', 'Docker Compose', 'Linux'],
        },
        {
          title: 'Time Manager',
          category: 'Outil de Suivi Temps Réel Haute Concurrence',
          description:
            'Plateforme de synchronisation et de métriques basée sur les rôles développée avec Elixir (Phoenix), frontends Vue 3 & React, PostgreSQL et WebSockets temps réel.',
          stack: ['Elixir (Phoenix)', 'Vue 3', 'React', 'PostgreSQL', 'WebSockets', 'JWT / RBAC'],
        },
        {
          title: 'Tamiami Fitness',
          category: 'Moteur de Réservation IA & Hub OCR',
          description:
            'Automatisation de 90% des réservations via traitement NLP conversationnel Dialogflow et extraction OCR déployés sur AWS Lambda, DynamoDB et GCP.',
          stack: ['Node.js', 'Express', 'Dialogflow', 'OCR Models', 'AWS Lambda', 'DynamoDB', 'GCP'],
        },
        {
          title: 'Zoidberg 2.0',
          category: 'Pipeline de Comparaison de Modèles Deep Learning',
          description:
            'Pipeline de benchmarking ML de bout en bout avec réduction PCA, validation croisée 5 plis et évaluation comparative de 6 modèles supervisés (DenseNet121, CNN, SVM, RF) avec métriques ROC-AUC et F1.',
          stack: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'DenseNet121', 'CNN', 'PCA'],
        },
      ],
    },
    skillsSection: {
      eyebrow: 'Écosystème Technique',
      title: 'Technologies modernes, validées en production',
      subtitle: 'Spécialisé dans les APIs asynchrones Python, le deep learning, les workflows conteneurisés et les déploiements cloud.',
      domainLabel: 'Domaine',
      productionVetted: 'Validé en production',
      spokenLanguagesTitle: 'Langues Pratiquées',
      engineeringValuesTitle: "Valeurs d'Ingénierie",
      languages: [
        { language: 'Anglais', level: 'C1', proficiency: 'Courant / Professionnel, Technique & Relation Client' },
        { language: 'Français', level: 'B1.1', proficiency: 'Intermédiaire / Usage Professionnel à Paris' },
        { language: 'Ourdou', level: 'Natif', proficiency: 'Langue maternelle' },
      ],
      values: [
        'Ingénierie rigoureuse et code propre',
        'Résolution de problèmes en forte autonomie',
        'Vulgarisation technique et mentorat',
        'Leadership d équipes transverses',
        'Méthodologie Agile/Scrum et suivi DORA',
        'Veille continue et recherche LLM/Agents',
      ],
      skillGroups: [
        {
          title: 'Web & Backend',
          items: ['Python (FastAPI, Django)', 'TypeScript / JavaScript', 'Node.js', 'React 18', 'Vue 3', 'Elixir (Phoenix)', 'PostgreSQL', 'Redis'],
        },
        {
          title: 'IA & Science des Données',
          items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'DenseNet121', 'CNNs', 'PCA', 'OpenCV', 'Pandas'],
        },
        {
          title: 'DevOps & Software Factory',
          items: ['Docker & Compose', 'GitLab CI', 'GitHub Actions', 'AWS (EC2, S3, Lambda, Bedrock)', 'GCP', 'SonarQube', 'Métriques DORA', 'Nginx', 'gitStream'],
        },
        {
          title: 'IA Générative & Agents',
          items: ['LangChain', 'LangGraph (Multi-étapes)', 'API Anthropic Claude', 'API OpenAI', 'Gemini Pro', 'Pipelines RAG', 'Prompt Engineering', 'WebSockets'],
        },
      ],
    },
    experienceSection: {
      eyebrow: 'Parcours Professionnel',
      title: "Rigueur d'ingénierie et leadership opérationnel",
      subtitle: "Expérience concrète en environnements de production, formation pédagogique et architecture logicielle.",
      experiences: [
        {
          role: 'Assistant Pédagogique (Alternance)',
          company: 'EPITECH Paris',
          period: 'Septembre 2026 – Septembre 2027',
          location: 'Paris, France',
          points: [
            "Conception et animation de modules techniques interactifs, accompagnant les promotions d'ingénieurs sur les systèmes, l'architecture logicielle et les bonnes pratiques.",
            "Accompagnement des étudiants sur les environnements Linux avancés, la conteneurisation Docker, l'algorithmique et les backends modernes.",
            "Traduction des concepts théoriques de systèmes distribués en projets pratiques stimulants.",
          ],
        },
        {
          role: 'Associate Software Engineer',
          company: 'Brackets Private Limited',
          period: 'Juillet 2024 – Août 2025',
          location: 'International / Télétravail',
          points: [
            "Développement de microservices modulaires et d'APIs REST à haut débit avec Python (FastAPI/Django), TypeScript et Node.js.",
            "Architecture de workflows CI/CD automatisés, standardisation des environnements Docker et orchestration cloud sur AWS (EC2, S3, Lambda) et GCP.",
            "Création de pipelines multimodaux OCR-vers-LLM et d'agents multi-étapes avec LangGraph, LangChain, l'API Claude d'Anthropic et OpenAI.",
            "Automatisation de processus opérationnels avec Bash et Python, réduisant l'effort manuel et améliorant la fiabilité de 70%.",
          ],
        },
      ],
    },
    educationSection: {
      educationEyebrow: 'Formation',
      educationTitle: 'Socle Académique',
      highlightsEyebrow: 'Atouts Clés',
      highlightsTitle: 'Ce que j apporte',
      items: [
        {
          title: "Master of Science in Information Technology (MSc IT)",
          school: 'EPITECH Paris (Paris, France)',
          period: '2025 – 2027',
          focus: "Systèmes logiciels avancés, architecture distribuée et leadership technique d'ingénierie.",
        },
        {
          title: 'Bachelor of Science in Computer Science (BSCS)',
          school: 'FAST-NUCES (Pakistan)',
          period: '2020 – 2024',
          focus: 'Structures de données, algorithmes, machine learning et systèmes d exploitation.',
        },
      ],
      achievements: [
        'Conception de systèmes GenAI et agents multi-étapes avec LangGraph, LangChain, Claude et OpenAI.',
        "Réduction de 70% de la latence d'extraction médicale et des tâches opérationnelles manuelles par automatisation.",
        'Automatisation de 90% des réservations clients via NLP et OCR sur AWS Lambda et DynamoDB.',
        'Plus de 20 déploiements cloud sur AWS et GCP avec suivi des métriques DORA et barrières qualité SonarQube.',
        "Lead projet sur VIF assurant la direction d'équipes pluridisciplinaires (backend, mobile, DevOps).",
        "Mentorat d'étudiants ingénieurs à EPITECH Paris sur les systèmes Linux, Docker et les architectures backend.",
      ],
    },
    passionsSection: {
      eyebrow: 'Au-Delà du Code',
      title: 'Passions, Disciplines & Créativité',
      subtitle: "Les activités qui cultivent la curiosité, la pensée structurée, la résilience et l'ouverture d'esprit.",
      passions: [
        {
          title: 'Cuisine & Gastronomie',
          subtitle: 'Expérimentation culinaire & partage',
          description:
            "Passionné par l'art culinaire associant épices traditionnelles et techniques de bistrot français. Convaincu qu'un bon repas est le meilleur vecteur de convivialité et de cohésion d'équipe.",
          tag: 'Art Culinaire',
        },
        {
          title: 'Voyages & Découvertes',
          subtitle: 'Exploration culturelle & patrimoine',
          description:
            "Découverte des métropoles européennes, monuments historiques, musées et terroirs régionaux à travers la France et au-delà. Enrichissement par l'immersion culturelle locale.",
          tag: 'Voyage & Culture',
        },
        {
          title: 'Poésie & Écriture Créative',
          subtitle: 'Rythme & réflexion philosophique',
          description:
            "Affection particulière pour la poésie classique et contemporaine, l'écriture créative et la pensée philosophique qui affinent la précision du langage et la nuance métaphorique.",
          tag: 'Écriture Créative',
        },
        {
          title: 'Photographie',
          subtitle: 'Géométrie urbaine & cadrage visuel',
          description:
            "Capture des scènes de rues parisiennes, symétries architecturales et jeux d'ombres et lumières naturelles par une composition visuelle soignée.",
          tag: 'Arts Visuels',
        },
        {
          title: 'Sport & Préparation Physique',
          subtitle: 'Renforcement musculaire & endurance',
          description:
            "Pratique régulière de musculation, calisthénie et travail cardio-vasculaire. Forge la discipline mentale, la résistance physique et la concentration quotidienne.",
          tag: 'Santé & Vitalité',
        },
        {
          title: 'Veille Technologique & ArXiv',
          subtitle: 'Curiosité intellectuelle continue',
          description:
            "Lecture des publications de recherche en IA, études de cas sur les pannes de systèmes distribués et prototypage régulier de nouveaux frameworks d'agents.",
          tag: 'Apprentissage Continu',
        },
      ],
    },
    aboutPage: {
      headTitle: 'À Propos | Muhammad Abdul Moiz',
      headDesc: 'À propos de Muhammad Abdul Moiz — ingénieur logiciel et machine learning spécialisé en systèmes IA, cloud, leadership opérationnel et passions personnelles.',
      eyebrow: 'Profil & Parcours',
      title: 'Ingénierie alliant produit, leadership et maîtrise opérationnelle',
      subtitle: 'Relier les modèles de machine learning performants, les microservices modernes et les opérations cloud automatisées.',
      summary:
        "Ingénieur Logiciel et Machine Learning en Master of Science à EPITECH Paris. Expérience probante reliant l'ingénierie technique, les architectures web modernes et l'infrastructure DevOps automatisée à la livraison opérationnelle.",
      p2: "J'interviens à la croisée du développement logiciel, de l'infrastructure cloud et de l'IA appliquée. Mon expérience couvre le développement full-stack, l'automatisation DevOps, les workflows conteneurisés et les systèmes GenAI alliant raisonnement de modèles de langage et pipelines de données fiables.",
      academicEyebrow: 'Parcours Académique',
      academicTitle: 'Formation',
      valuesEyebrow: 'Principes Directeurs',
      valuesTitle: 'Mes Valeurs',
      languagesTitle: 'Langues Pratiquées',
      passionsEyebrow: 'Centres d Intérêt',
      passionsTitle: 'Au-Delà du Code',
      passionsSubtitle: 'Activités personnelles stimulant la curiosité, la rigueur, la créativité et la concentration.',
    },
    contactPage: {
      headTitle: 'Contact | Muhammad Abdul Moiz',
      headDesc: "Entrer en contact avec Muhammad Abdul Moiz pour toute opportunité en machine learning, GenAI, cloud ou ingénierie logicielle.",
      eyebrow: 'Contact Direct',
      title: 'Bâtissons ensemble des projets d exception',
      subtitle: "Je suis ouvert aux opportunités d'ingénierie, aux collaborations à fort impact et au conseil technique.",
      reachOutDirectly: 'Me Joindre Directement',
      availabilityNote: 'Basé à Paris, France • Disponible sur site, en mode hybride ou en télétravail.',
      formName: 'Votre Nom',
      formNamePlaceholder: 'Jean Dupont',
      formEmail: 'Adresse Email',
      formEmailPlaceholder: 'jean@entreprise.com',
      formMessage: 'Détails du Projet ou Opportunité',
      formMessagePlaceholder: 'Présentez votre équipe, vos technologies et vos objectifs...',
      formSubmit: 'Envoyer le Message',
      formSubmitting: 'Envoi en cours...',
      formSuccess: 'Merci ! Votre message a bien ete envoye. Je vous repondrai dans les plus brefs delais.',
      formError: "Une erreur s'est produite lors de l'envoi de votre message. Veuillez reessayer ou me contacter par email.",
      copyEmail: "Copier l'Email",
      emailCopied: 'Email Copie',
      openMailApp: "Ouvrir l'application Mail",
      directFallbackNote: 'Canal Direct Alternatif',
      charactersRemaining: 'caracteres',
      linkedinLabel: 'Profil LinkedIn',
      githubLabel: 'Profil GitHub',
    },
    chat: {
      floatingButtonLabel: 'Assistant IA',
      headerTitle: 'Muhammad Abdul Moiz',
      headerSubtitle: 'Représentant IA & Double Numérique',
      headerStatus: 'En ligne • Paris',
      initialMessage: `Bonjour ! Je suis le double numérique IA de **Muhammad Abdul Moiz**.

N'hésitez pas à me poser vos questions sur mon parcours, mon expérience chez [Brackets Private Limited](https://www.bracketsltd.com/) et [EPITECH Paris](#experience), mes [projets](#projects) ou mes compétences techniques.`,
      inputPlaceholder: "Posez votre question sur DevOps, projets IA, stack ou opportunités CDI/CDD...",
      sendButtonAria: 'Envoyer le message',
      clearChatAria: 'Effacer l historique de discussion',
      minimizeAria: 'Réduire la fenêtre de dialogue',
      closeAria: 'Fermer la fenêtre de discussion',
      suggestedTopicsTitle: 'Explorer les Compétences',
      askArrow: 'Poser →',
      disclaimer: "Propulsé par une IA adaptative avec télémétrie de projet directe. Sans aucun emoji.",
      suggestedTopics: [
        { label: 'DevOps & Services', query: "Avez-vous de l'expérience en DevOps et quels services proposez-vous en DevOps ?" },
        { label: 'Pourquoi Moiz ?', query: "Pourquoi un recruteur devrait-il choisir Muhammad Abdul Moiz pour un poste d'ingénieur ?" },
        { label: 'CDI/CDD & Statut', query: 'Quel est votre statut actuel à EPITECH et vos disponibilités pour de futures opportunités CDI/CDD à Paris ?' },
        { label: 'Projets Phares', query: 'Présentez-moi vos projets majeurs (DoctorIQ, Brackets Genie, Ledgeroo, VIF).' },
        { label: 'Passions & Loisirs', query: "Quels sont vos centres d'intérêt en dehors du travail (cuisine, voyages, photographie, etc.) ?" },
        { label: 'Parcours & Expériences', query: 'Présentez-moi votre expérience professionnelle chez Brackets et EPITECH Paris.' },
        { label: 'Compétences & Stack', query: 'Quelles sont vos compétences techniques clés, langages de programmation et outils ?' },
        { label: 'EPITECH & Études', query: 'Parlez-moi de votre parcours académique à EPITECH Paris et FAST-NUCES.' },
      ],
    },
    mobileNav: {
      home: 'Accueil',
      impact: 'Impact',
      aiTwin: 'Jumeau IA',
      projects: 'Projets',
      contact: 'Contact',
    },
    footer: {
      brandBio:
        "Ingénieur Logiciel & Machine Learning basé à Paris. Spécialisé en pipelines GenAI de production, microservices haute performance et infrastructure DevOps automatisée.",
      navHeading: 'Navigation',
      contactHeading: 'Contact Direct',
      backToTop: 'Haut de page',
      rights: 'Tous droits réservés.',
      overview: 'Aperçu',
      selectedProjects: 'Projets Majeurs',
      experienceTimeline: 'Parcours Professionnel',
      technicalEcosystem: 'Écosystème Technique',
      aiAssistant: 'Assistant IA',
      aboutMoiz: 'À propos de Moiz',
      contact: 'Contact',
    },
  },
};
