export const profile = {
  name: 'Muhammad Abdul Moiz',
  title: 'Web, DevOps & AI Engineer',
  location: 'Paris, France',
  origin: 'Pakistan (born and raised in Pakistan, currently living in Paris, France)',
  phone: '+33 7 59 24 79 11',
  email: 'amoiz0468@gmail.com',
  linkedin: 'https://linkedin.com/in/moizghauri',
  github: 'https://github.com/amoiz0468',
  summary:
    'Software and Machine Learning Engineer pursuing a Master of Science in Information Technology at EPITECH Paris. Proven track record bridging technical engineering, modern web architectures, and automated DevOps infrastructure with operational delivery.',
};

export const stats = [
  { label: 'Years building products', value: '2+' },
  { label: 'AI & ML projects', value: '10+' },
  { label: 'Cloud / DevOps deployments', value: '20+' },
  { label: 'Tech stacks used', value: '8+' },
];

export const skillGroups = [
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
];

export const experience = [
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
];

export const education = [
  {
    title: 'Master of Science in Information Technology (MSc IT)',
    school: 'EPITECH Paris',
    period: '2025 – 2027',
  },
  {
    title: 'Bachelor of Science in Computer Science (BSCS)',
    school: 'FAST-NUCES (Pakistan)',
    period: '2020 – 2024',
  },
];

export const projects = [
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
];

export const achievements = [
  'Built production GenAI and multi-step agent systems with LangGraph, LangChain, Anthropic Claude, and OpenAI.',
  'Cut manual operational workflow effort and healthcare extraction latency by 70% with automated pipelines.',
  'Automated 90% of client bookings via NLP and OCR on AWS Lambda and DynamoDB.',
  'Delivered 20+ cloud deployments on AWS and GCP with DORA metrics tracking and SonarQube quality gates.',
  'Project Lead on VIF managing cross-functional squads (backend, mobile, DevOps) and end-to-end delivery.',
  'Mentored engineering cohorts at EPITECH Paris in Linux internals, Docker, and backend architectures.',
];

export const languages = [
  { language: 'English', level: 'C1', proficiency: 'Fluent / Professional, Technical & Client-Facing' },
  { language: 'French', level: 'B1.1', proficiency: 'Intermediate / Working Proficiency in Paris' },
  { language: 'Urdu', level: 'Native', proficiency: 'Native speaker' },
];

export const values = [
  'Rigorous engineering & clean code',
  'Problem-solving with high autonomy',
  'Technical vulgarization & cohort mentoring',
  'Cross-functional team leadership',
  'Agile/Scrum delivery & DORA metrics visibility',
  'Continuous curiosity & LLM/Agentic research',
];

export const availability = {
  status: 'Alternance at EPITECH Paris (Sept 2026 – Sept 2027) • Seeking future CDI/CDD',
  details:
    'Started alternance as Pedagogical Assistant at EPITECH Paris in September 2026, ending in September 2027. Open to full-time CDI or CDD opportunities in the future after September 2027. Full French working authorization, open to on-site, hybrid, remote, or relocation in Paris/France.',
  roles: [
    'Software Engineer (Full-Stack / Backend)',
    'DevOps & Cloud Engineer / DevSecOps',
    'AI & Data Engineer / GenAI Specialist',
    'Junior Web Project Manager',
  ],
  location: 'Paris, France (Open to On-site, Hybrid, Remote, or Relocation)',
  interests: ['Agentic AI (LangGraph/LangChain)', 'High-throughput APIs (FastAPI/Django/Elixir)', 'DevSecOps & Software Factories', 'Cloud Infrastructure (AWS/GCP)'],
};

export const passions = [
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
    title: 'Poésie / Poetry',
    subtitle: 'Creative reflection & rhythm',
    description:
      'Deep appreciation for classical and modern poetry, creative writing, and philosophical reflection that sharpens precision of language, metaphor, and mindful thought.',
    tag: 'Creative Writing',
  },
  {
    title: 'Photographie / Photography',
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
];
