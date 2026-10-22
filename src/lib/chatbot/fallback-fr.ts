import { profile } from '../../data/portfolio';
import { ChatMessage } from './types';

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

/**
 * Intelligent French Fallback Engine for Moiz's Portfolio AI Twin
 * Strictly ZERO emojis.
 */
export function generateFrenchFallbackReply(q: string, messages: ChatMessage[] = []): string {
  const varIdx = getVariationIndex(messages, 3);

  // 1. DEVOPS & INFRASTRUCTURE CLOUD (HIGH PRIORITY: matches before simple greeting)
  if (
    /\b(devops|ci[\s/-]?cd|docker|conteneur(isation)?|aws|gcp|cloud|infrastructure|reverse proxy|nginx|apache|deploiement|dora|sonarqube)\b/i.test(q)
  ) {
    return `### Compétences DevOps & Infrastructure Cloud

J'ai une solide expérience de production en ingénierie DevOps pour concevoir des infrastructures fiables, des environnements conteneurisés et des chaînes de déploiement continu :

- **Conteneurisation & Orchestration Docker** : Conception de builds Docker multi-étapes optimisés pour des images ultra-légères. Standardisation des environnements locaux et staging avec Docker Compose.
- **CI/CD Automatisée & DevSecOps** : Mise en œuvre de pipelines automatisés de test, de linting et de livraison via **GitLab CI** et **GitHub Actions YAML**. Configuration des règles de fusion **gitStream** et des contrôles de qualité **SonarQube** (70% à 90%+ de couverture).
- **Visibilité de Livraison & Métriques DORA** : Suivi des 4 métriques clés (Fréquence de Déploiement, Lead Time, Change Failure Rate, MTTR) pour mesurer et optimiser la vélocité.
- **Plateformes Cloud (AWS & GCP)** : Déploiement et sécurisation de services sur **AWS (EC2, S3, Lambda, Bedrock, LightSail)** et **GCP**, avec gestion stricte des identités IAM et des variables d'environnement.
- **Reverse Proxies & Durcissement Sécurité** : Déploiement d'APIs derrière **Nginx** et **Apache**, automatisation des certificats SSL/TLS Let's Encrypt et routage WebSocket.
- **Files de Tâches Asynchrones** : Architecture haute concurrence avec **Celery** et **Redis** pour les traitements distribués lourds (ex: extraction OCR et LLM dans *DoctorIQ*).
- **Administration Systèmes & Linux** : Maîtrise approfondie des systèmes Linux (systemd, gestion de processus, bash). J'enseigne également Docker et Linux aux étudiants d'EPITECH Paris.

### Services DevOps Proposés :
1. **Mise en place de Software Factory & CI/CD** : Pipelines GitLab CI ou GitHub Actions avec tests automatisés, SonarQube et publication d'images Docker.
2. **Tableaux de bord DORA & Vélocité Logicielle** : Mesure continue de la fréquence et de la fiabilité des livraisons.
3. **Dockerisation & Migration de Conteneurs** : Modularisation de monolithes ou microservices via Dockerfiles multi-étapes.
4. **Architecture & Déploiements Cloud** : Mise en production résiliente d'APIs et de services ML sur AWS et GCP.
5. **Reverse Proxy, SSL & Sécurité Web** : Configuration Nginx, HTTPS automatique et limitation de débit.

### Projets DevOps Phares :
- **Trinity DevOps Software Factory** : Builds Docker multi-étapes, contrôles SonarQube stricts et livraison conteneurisée derrière Nginx.
- **DoctorIQ Cloud Architecture** : Cluster de workers asynchrones haute performance sur AWS (EC2, S3, Lambda) avec Celery et Redis.
- **Livraison DORA & gitStream** : Automatisation de la revue de code et de la fusion avec métriques de livraison en temps réel.

### Suggestions de questions :
? Parlez-moi de l'architecture cloud et Celery de DoctorIQ.
~ Mesures DORA en continu, règles gitStream et builds Docker multi-étapes
? Quelle est votre stack technique backend et bases de données ?
? Quels types de contrats et disponibilités avez-vous sur Paris ?`;
  }

  // 2. AGE, DATE DE NAISSANCE, VILLE D'ORIGINE & PAYS D'ORIGINE
  if (
    /(quel\s+[aâ]ge|quand\s+est[\s-]il\s+n[eé]|quand\s+es[\s-]tu\s+n[eé]|date\s+de\s+naissance|ann[eé]e\s+de\s+naissance|anniversaire|(?:son|ton|votre|quel)\s+[aâ]ge|[aâ]ge\s+de\s+moiz|n[eé]\s+en|date\s+d['’]anniversaire|ville\s+d['’]origine|pays\s+d['’]origine|d['’]o[uù]\s+venez[\s-]vous|d['’]o[uù]\s+vient[\s-]il|d['’]o[uù]\s+es[\s-]tu|o[uù]\s+es[\s-]tu\s+n[eé]|o[uù]\s+est[\s-]il\s+n[eé]|o[uù]\s+[eê]tes[\s-]vous\s+n[eé]|nationalit[eé]|origine|grandi)/i.test(q)
  ) {
    const ageVariants = [
      `Muhammad Abdul Moiz est né le **16 octobre 2002**, il a donc **23 ans**. Il est **né et a grandi au Pakistan**, et vit actuellement à **Paris, France**.

En résumé :
- **Origine & Résidence** : Originaire du Pakistan (né et a grandi au Pakistan), actuellement basé à Paris, France.
- **Formation** : Diplômé d'un BSCS à **FAST-NUCES** au Pakistan (2020–2024) et actuellement en MSc IT à l'**EPITECH Paris** (2025–2027).
- **Expérience** : Assistant Pédagogique à EPITECH Paris et ancien ingénieur logiciel chez Brackets Private Limited.
- **Statut & Opportunités** : Alternance débutée en septembre 2026 (fin en septembre 2027) à l'EPITECH Paris, ouvert aux opportunités futures en **CDI / CDD** après septembre 2027.

### Suggestions de questions :
? Pourquoi un recruteur devrait-il engager Muhammad Abdul Moiz ?
~ Né et a grandi au Pakistan • Basé à Paris (23 ans)
? Quels sont vos projets phares (DoctorIQ, Brackets Genie, Ledgeroo, VIF) ?
~ Master of Science à l'EPITECH Paris & BSCS à FAST-NUCES`,

      `Moiz est né le **16 octobre 2002** (il a **23 ans**). Il est **né et a grandi au Pakistan** et vit actuellement à **Paris, France**.

Il poursuit son Master of Science à l'**EPITECH Paris** tout en formant les étudiants en tant qu'Assistant Pédagogique. Il cumule 2+ années d'expérience en backends Python (FastAPI/Django), conteneurisation Docker et agents IA.

### Suggestions de questions :
? Quelles sont vos compétences et vos services en DevOps et Cloud ?
~ 23 ans, bilingue anglais C1 et français professionnel B1.1
? Parlez-moi de votre rôle d'assistant pédagogique à EPITECH Paris.
~ Alternance à EPITECH Paris (sept 2026 – sept 2027) • Futur CDI/CDD`,

      `J'ai **23 ans**, étant né le **16 octobre 2002**. J'ai **grandi au Pakistan** et je vis actuellement à **Paris, France**.

Mon profil combine :
- **Origine & Ville d'origine** : Né et élevé au Pakistan, résidant actuellement à Paris.
- **Fondations Solides** : Diplômé FAST-NUCES (Pakistan) et étudiant en MSc IT à l'EPITECH Paris.
- **Expérience Concrète** : Microservices Python, architectures Docker CI/CD et agents LangGraph.
- **Disponibilité** : Alternance en cours à EPITECH Paris (septembre 2026 – septembre 2027), à la recherche d'un **CDI ou CDD** après septembre 2027.

### Suggestions de questions :
? Pourquoi recruter Moiz pour une équipe d'ingénierie ?
~ Né le 16 octobre 2002 (23 ans), basé à Paris
? Quelles sont vos disponibilités pour un CDI ou CDD futur ?
~ Spécialisé en Python, FastAPI, Docker, CI/CD et agents LangGraph`,
    ];
    return ageVariants[varIdx];
  }

  // 3. GREETINGS & CASUAL HELLOS
  if (
    /^(bonjour|salut|coucou|hello|hi|hey|bonsoir|bienvenue|salutations|yo)\b/i.test(q) ||
    q === 'bonjour' ||
    q === 'salut' ||
    q === 'coucou'
  ) {
    const greetingVariants = [
      `Bonjour ! Ravi d'échanger avec vous.

Je suis le double numérique IA de **Muhammad Abdul Moiz**. Vous pouvez explorer :
- **DevOps & Cloud** : Automatisation CI/CD, conteneurisation Docker, AWS/GCP, SonarQube & DORA
- **Pourquoi recruter Moiz** : Microservices haute disponibilité, pipelines GenAI & mentorat
- **Formation & Rôles** : MSc à l'**EPITECH Paris** (Assistant Pédagogique) & BSCS à **FAST-NUCES** (Pakistan)
- **Statut Actuel** : Alternance à l'**EPITECH Paris** (Sept 2026 – Sept 2027), ouvert aux futurs **CDI / CDD**

### Suggestions de questions :
? Quelles sont vos compétences et vos services en DevOps et Cloud ?
~ Né et grandi au Pakistan • Basé à Paris (23 ans)
? Pourquoi un recruteur devrait-il engager Muhammad Abdul Moiz ?
~ Équipe pédagogique EPITECH Paris & ex-ingénieur chez Brackets`,

      `Bonjour ! Bienvenue sur le portfolio interactif de Muhammad Abdul Moiz.

En tant que son représentant IA, je peux vous renseigner de façon concise :
- **Systèmes & Cloud** : Microservices Python (FastAPI/Django), conteneurs Docker et déploiements cloud.
- **Formation & Origine** : Né le 16 octobre 2002 au Pakistan (23 ans), étudiant MSc IT et Assistant Pédagogique à EPITECH Paris.
- **Opportunités** : En alternance à EPITECH Paris (Sept 2026 – Sept 2027), à l'écoute d'opportunités en CDI ou CDD.

### Suggestions de questions :
? Quels sont vos projets phares (DoctorIQ, Brackets Genie, Ledgeroo, VIF) ?
~ Alternance à EPITECH • Ouvert aux opportunités CDI/CDD
? Quel âge avez-vous et quel est votre parcours académique ?
~ Contact direct : ${profile.email}`,

      `Ravi de vous accueillir ! Je suis l'assistant IA de Muhammad Abdul Moiz.

N'hésitez pas à me poser vos questions sur :
- Ses réalisations techniques (*DoctorIQ*, *Brackets Genie*, *Trinity Suite*)
- Ses compétences DevOps (GitLab CI, GitHub Actions, DORA metrics, Nginx)
- Son parcours académique (MSc IT à l'EPITECH Paris et BSCS à FAST-NUCES au Pakistan)
- Sa disponibilité pour de futures opportunités CDI ou CDD après son alternance

### Suggestions de questions :
? Pourquoi un recruteur devrait-il engager Muhammad Abdul Moiz ?
~ 23 ans, né le 16 octobre 2002, basé à Paris
? Quels sont vos centres d'intérêt et passions en dehors du travail ?
~ Autorisation de travail valide en France`,
    ];
    return greetingVariants[varIdx];
  }

  // 3b. AIDE & ASSISTANCE GÉNÉRALE ("aide-moi", "peux-tu m'aider", "que peux-tu faire")
  if (
    /^(aide([-\s]moi)?|peux[\s-]tu\s+m['’]aider|comment\s+m['’]aider|que\s+peux[\s-]tu\s+faire|que\s+puis[\s-]je\s+demander|guide([-\s]moi)?)\b/i.test(q) &&
    !/\b(code|coder|application|app|d[eé]velopper|cr[eé]er|construire)\b/i.test(q)
  ) {
    const helpFrVariants = [
      `Je suis là pour vous faire découvrir le travail et les compétences de **Muhammad Abdul Moiz** !

Voici les sujets clés que vous pouvez explorer :
- **Projets Réalisés** : *DoctorIQ* (extraction santé OCR & LLM), *Brackets Genie* (WebSockets temps réel & agents LangGraph) et *VIF* (plateforme solidaire web et mobile).
- **Stack Technique** : Backend (FastAPI, Django REST, Node.js), DevOps (Docker, GitLab CI, GitHub Actions, AWS/GCP, métriques DORA) et IA (LangGraph, PyTorch).
- **Parcours & Formation** : MSc à l'**EPITECH Paris** (Assistant Pédagogique) & ex-ingénieur logiciel chez **Brackets Private Limited**.
- **Contact & Recrutement** : En alternance jusqu'en septembre 2027, ouvert aux futurs CDI/CDD ou collaborations techniques via \`${profile.email}\`.

### Suggestions de questions :
? Parlez-moi de vos projets phares (DoctorIQ, Brackets Genie, VIF).
? Quelles sont vos compétences et vos services en DevOps et Cloud ?
? Pourquoi un recruteur devrait-il engager Muhammad Abdul Moiz ?`,

      `Bienvenue ! En tant que représentant IA de Moiz, je vous aide à explorer son profil :
- **Projets Phares** : Découvrez *DoctorIQ*, *Brackets Genie*, *Ledgeroo* ou *Trinity Suite*.
- **Services & Compétences** : Microservices backend, déploiements cloud AWS/GCP, pipelines CI/CD ou agents IA génératifs.
- **Disponibilités** : En alternance à l'EPITECH Paris, disponible pour de futurs rôles d'ingénierie logicielle.

### Suggestions de questions :
? Quelle est votre stack technique backend et bases de données ?
? Pourquoi un recruteur devrait-il engager Muhammad Abdul Moiz ?
? Comment puis-je contacter Muhammad Abdul Moiz ?`,

      `Je suis à votre service pour vous orienter sur le profil de Muhammad Abdul Moiz :
- **Expérience** : Assistant Pédagogique à EPITECH Paris et ingénieur chez Brackets.
- **Savoir-faire** : Backends Python performants, conteneurs Docker, observabilité et flux agentiques.
- **Démonstrations** : Détails sur ses 8 projets en production.

Que souhaitez-vous approfondir ?

### Suggestions de questions :
? Parlez-moi de DoctorIQ et de l'extraction de documents médicaux.
? Quelles sont vos compétences et vos services en DevOps et Cloud ?
? Quels sont vos centres d'intérêt et passions en dehors du travail ?`,
    ];
    return helpFrVariants[varIdx];
  }

  // 3c. DÉVELOPPEMENT D'APPLICATION & PROJETS ("aide-moi à coder une application", "créer une app", "développer une application")
  if (
    /\b(coder?\s+(une?\s+)?app(lication)?|construire\s+(une?\s+)?(app(lication)?|site|projet|syst[eè]me)|d[eé]velopper\s+(une?\s+)?(app(lication)?|site)|cr[eé]er\s+(une?\s+)?(app(lication)?|site)|aide([-\s]moi\s+[aà]\s+)?(coder?|d[eé]velopper|programmer)|engager\s+(pour\s+d[eé]velopper|un\s+projet)|freelance|besoin\s+d['’]une?\s+app(lication)?)\b/i.test(q)
  ) {
    const appFrVariants = [
      `Moiz conçoit et développe des applications web, mobiles et d'IA prêtes pour la production !

Voici son approche de développement logiciel :
- **Systèmes Full-Stack & Mobiles** : Backends performants en **Python (FastAPI, Django)** et interfaces modernes en **React**, **Next.js** ou mobiles en **React Native** (comme *[VIF](#projects)*).
- **IA Appliquée & Agents** : Intégration de pipelines OCR multimodaux, bases RAG et agents autonomes avec **LangGraph**, **LangChain**, et les APIs **Claude/OpenAI** (comme *[DoctorIQ](#projects)* et *[Brackets Genie](#projects)*).
- **Cloud & DevOps** : Déploiements automatisés sur **AWS** ou **GCP**, conteneurisation Docker multi-étapes et chaînes CI/CD complètes.

Bien que cet agent conversationnel ne permette pas d'exécuter du code personnalisé en direct dans le chat, Moiz est disponible pour concevoir, prototyper et développer vos applications !

Contactez-le directement à [${profile.email}](mailto:${profile.email}) ou via [LinkedIn](${profile.linkedin}) pour échanger sur votre projet.

### Suggestions de questions :
? Parlez-moi de vos projets phares (DoctorIQ, Brackets Genie, VIF).
? Quelles sont vos compétences et vos services en DevOps et Cloud ?
? Pourquoi un recruteur devrait-il engager Muhammad Abdul Moiz ?`,

      `Si vous cherchez à développer une application ou un système logiciel, vous êtes au bon endroit ! Muhammad Abdul Moiz dispose d'une solide expérience de livraison :
- **APIs & Microservices de Production** : Architectures asynchrones avec FastAPI et Django REST, reliées à PostgreSQL et Redis.
- **Interfaces Web & Mobiles** : Développements React 18 et React Native avec télémétrie temps réel via WebSockets.
- **Infrastructure Cloud** : Images Docker sécurisées, pipelines CI/CD avec contrôles SonarQube et hébergement AWS/GCP.

Moiz est ouvert aux discussions autour d'opportunités d'ingénierie et de développement de projets.

Écrivez-lui directement à [${profile.email}](mailto:${profile.email}) ou sur [LinkedIn](${profile.linkedin}) !

### Suggestions de questions :
? Parlez-moi de VIF et du pilotage d'un projet full-stack de bout en bout.
? Quelle est votre expérience avec LangGraph et l'IA conversationnelle ?
? Comment puis-je contacter Muhammad Abdul Moiz ?`,

      `Moiz possède une expertise éprouvée dans la conception d'applications complètes et d'infrastructures cloud :
- **Santé & IA** : Réalisation de *DoctorIQ*, divisant par 70% le temps de traitement de documents cliniques.
- **Systèmes Temps Réel** : Architecture de *Brackets Genie*, avec flux de télémétrie agentique sous 50ms par WebSockets.
- **Mobile & Solidarité** : Lead projet sur *VIF*, application mobile et web avec suivi des métriques DORA.

N'hésitez pas à lui envoyer un message à [${profile.email}](mailto:${profile.email}) pour discuter de votre cahier des charges !

### Suggestions de questions :
? Parlez-moi de vos projets phares (DoctorIQ, Brackets Genie, VIF).
? Pourquoi un recruteur devrait-il engager Muhammad Abdul Moiz ?
? Quelles sont vos compétences et vos services en DevOps et Cloud ?`,
    ];
    return appFrVariants[varIdx];
  }

  // 4. STATUT PROFESSIONNEL & OPPORTUNITES (CDI / CDD)
  if (/\b(alternance|contrat|stage|emploi|recrutement|disponibilit(e|é)|rythme|septembre|embauche|cdd|cdi)\b/i.test(q)) {
    return `### Statut Professionnel & Opportunités Futures (CDI / CDD)

**Statut Actuel** : Alternance débutée en **Septembre 2026** et se terminant en **Septembre 2027** en tant qu'**Assistant Pédagogique à l'EPITECH Paris**.
**Opportunités Ciblées** : À la recherche d'opportunités en **CDI ou CDD dans le futur après Septembre 2027**, à Paris ou en télétravail.

- **Statut Légal** : Autorisation complète et valide de travail en France.
- **Postes Ciblés** :
  * Ingénieur DevOps / Cloud Infrastructure / Platform Engineer
  * Ingénieur Machine Learning / GenAI Specialist
  * Ingénieur Logiciel Back-End / Full-Stack
- **Atouts Clés** : Expérience industrielle chez Brackets, autonomie sur les pipelines CI/CD, leadership technique et encadrement pédagogique à EPITECH Paris.
- **Contact Direct** : \`${profile.email}\` | \`${profile.phone}\`

### Suggestions de questions :
? Quelles sont vos compétences et vos services en DevOps et Cloud ?
~ Alternance à EPITECH Paris • Ouvert aux opportunités futures CDI/CDD
? Pourquoi un recruteur devrait-il engager Muhammad Abdul Moiz ?
~ Anglais courant C1, Français professionnel B1.1 et Urdu natif`;
  }

  // 5. PROJETS SPECIFIQUES
  // 5a. DoctorIQ
  if (/doctoriq|doctor\s*iq|medical|sante|santé|clinique/i.test(q)) {
    return `### DoctorIQ — Plateforme IA d'Extraction Médicale

**DoctorIQ** est un système en production d'extraction de données cliniques conçu pour éliminer les goulots d'étranglement administratifs :
- **Réduction de 70% de la Latence** : Combinaison d'un OCR précis et de prompt engineering itératif avec les APIs OpenAI et Anthropic Claude.
- **Workers Asynchrones Haute Performance** : Architecture développée en **Python (Django REST)**, **Celery** et **Redis** pour ingérer des lots massifs de dossiers cliniques sans bloquer les requêtes clients.
- **Rapports Automatisés** : Extraction validée et compilation instantanée de comptes-rendus médicaux structurés en PDF.
- **Infrastructure Cloud** : Conteneurisé avec **Docker** et hébergé sur **AWS (EC2, S3, Lambda)** selon les standards de conformité de données sensibles.

### Suggestions de questions :
? Parlez-moi de Brackets Genie et de son architecture temps réel.
~ Architecture AWS avec workers Celery et Redis distribués
? Quelles sont vos compétences en DevOps et Cloud ?
? Pourquoi recruter Moiz pour une équipe d'ingénierie ?`;
  }

  // 5b. Brackets Genie
  if (/genie|brackets\s*genie|copilot|assistant\s*ia/i.test(q)) {
    return `### Brackets Genie — Copilote IA Temps Réel d'Entreprise

**Brackets Genie** est un assistant conversationnel haute vitesse pour la productivité d'équipe :
- **Streaming Bidirectionnel Temps Réel** : Implémenté via **WebSockets** et **FastAPI** pour un streaming fluide de réponses sans latence.
- **Orchestration Multi-Agents** : Construit avec **LangGraph** et **LangChain** pour router dynamiquement les requêtes complexes vers des sous-agents spécialisés.
- **Mémoire Conversationnelle & Contextuelle** : Maintien de l'historique et état de dialogue avec cache **Redis** ultra-rapide.
- **Interface Réactive** : Développée avec **React 18** et **Tailwind CSS**.

### Suggestions de questions :
? Parlez-moi du projet VIF et de la solidarité alimentaire.
~ Moins de 50ms de latence de streaming sur WebSockets
? Quelles sont vos compétences et vos services en DevOps et Cloud ?`;
  }

  // 5c. VIF
  if (/vif|solidaire|solidarit(e|é)|alimentaire|bordeaux/i.test(q)) {
    return `### VIF (Vers Une Infinité De Femmes) — Plateforme Solidaire

Projet mené en tant que **Chef de Projet** et architecte technique pour optimiser la logistique de solidarité alimentaire :
- **Rôle de Leader Technique** : Coordination d'une équipe de développeurs, gestion des sprints agiles et communication avec l'association.
- **Pipeline GitLab CI & Qualité** : Déploiement continu avec tests automatisés et surveillance des métriques DORA.
- **Architecture Applicative** : Application mobile **React Native (Expo)** et console d'administration **Vue 3 / Vite** connectées à une API **Python**.
- **Impact Concret** : Plus de 10 000 repas distribués et réduction de 40% du temps de dispatch logistique.

### Suggestions de questions :
? Parlez-moi du projet FinTech Ledgeroo.
~ Pilotage de projet en méthodologie agile et suivi DORA
? Quels sont vos projets phares en DevOps et Cloud ?`;
  }

  // 5d. Ledgeroo
  if (/ledgeroo|comptabilit(e|é)|stripe|fintech|facturation/i.test(q)) {
    return `### Ledgeroo — Solution SaaS FinTech & Facturation

Plateforme de gestion financière pour les PME et indépendants :
- **Paiements & Abonnements Sécurisés** : Intégration complète de l'API **Stripe** (gestion des webhooks, abonnements récurrents et factures conformes).
- **Sécurité des Données Financières** : Chiffrement de bout en bout des transactions bancaires et conformité fiscale.
- **Backend Robuste** : Développé en **Python (FastAPI)** avec base relationnelle **PostgreSQL** et migrations automatisées.
- **Tableau de Bord Analytique** : Visualisation en temps réel des flux de trésorerie avec **React** et graphiques dynamiques.

### Suggestions de questions :
? Quelles sont vos compétences et vos services en DevOps et Cloud ?
~ Intégration Stripe API, webhooks et verrouillage transactionnel strict
? Parlez-moi de votre rôle à l'EPITECH Paris.`;
  }

  // 6. FORMATION ACADEMIQUE & EPITECH PARIS
  if (/\b(ecole|ecoles|etudes|formation|epitech|fast|diplome|universit(e|é)|scolarit(e|é))\b/i.test(q)) {
    return `### Formation Académique d'Excellence

Mon parcours combine une rigueur théorique en informatique fondamentale et une pédagogie par projets intensive :

1. **EPITECH Paris (2025 – 2027)**
   - **Diplôme** : Master of Science (MSc) in Information Technology
   - **Activités** : Assistant Pédagogique (encadrement et évaluation de promotions d'étudiants en C, C++, Linux, Docker et architecture logicielle).
   - **Projets Clés** : Conception de moteurs logiciels avancés, systèmes distribués et virtualisation.

2. **FAST-NUCES (2020 – 2024)**
   - **Diplôme** : Bachelor of Science in Computer Science (BSCS)
   - **Fondations** : Algorithmique avancée, structures de données, systèmes d'exploitation, bases de données relationnelles et intelligence artificielle.

### Suggestions de questions :
? Parlez-moi de votre rôle d'assistant pédagogique à EPITECH Paris.
~ Double cursus théorique FAST-NUCES et appliqué EPITECH Paris
? Quels sont vos projets phares en DevOps et Cloud ?
? Quelles sont vos disponibilités pour de futures opportunités CDI ou CDD ?`;
  }

  // 7. CONTACT & COORDONNEES
  if (/\b(contact(er)?|email|mail|telephone|téléphone|coordonn[eé]es|joindre|ecrire|écrire|linkedin|github)\b/i.test(q)) {
    return `### Coordonnées & Prise de Contact Directe

Vous pouvez me joindre directement via les canaux suivants :

- **Email Direct** : [${profile.email}](mailto:${profile.email})
- **Téléphone** : [${profile.phone}](tel:${profile.phone.replace(/\s+/g, '')})
- **Localisation** : ${profile.location} (disponible sur site à Paris, en hybride ou à distance)
- **LinkedIn** : [${profile.linkedin}](${profile.linkedin})
- **GitHub** : [${profile.github}](${profile.github})
- **Formulaire Web** : Vous pouvez également m'envoyer un message via le formulaire sécurisé de la page Contact.

### Suggestions de questions :
? Quel est votre statut actuel et vos disponibilités pour de futurs postes CDI ou CDD ?
~ Réponse généralement sous 24h ouvrées
? Quelles sont vos compétences principales en ingénierie logicielle ?`;
  }

  // 8. PASSIONS & CENTRES D'INTERET
  if (/\b(passion|passions|loisir|loisirs|interet|interets|sport|cuisine|voyage|poesie|photographie)\b/i.test(q)) {
    return `### Passions & Centres d'Intérêt au-delà du Code

En dehors de l'ingénierie, je cultive des disciplines qui nourrissent la créativité, la rigueur et l'équilibre :

- **Cuisine & Gastronomie** : Exploration culinaire précise, associant équilibre des saveurs, patience et sens du détail.
- **Voyages & Découvertes** : Curiosité pour les nouvelles cultures et adaptation rapide aux environnements internationaux.
- **Poésie & Écriture** : Rigueur stylistique, concision et sens de la nuance.
- **Photographie Urbaine** : Sens de la composition visuelle et de l'observation minutieuse.
- **Sport & Fitness** : Constance, discipline d'entraînement et persévérance mentale.
- **Veille Technologique & ArXiv** : Lecture de publications de recherche en IA, études de pannes distribuées et prototypage régulier.

### Suggestions de questions :
? Pourquoi un recruteur devrait-il engager Muhammad Abdul Moiz ?
~ Équilibre entre discipline intellectuelle et créativité quotidienne
? Quelles sont vos compétences et vos services en DevOps et Cloud ?`;
  }

  // 9. POURQUOI RECRUTER MOIZ
  if (/\b(pourquoi|recruter|embaucher|atouts|points forts|valeur|difference)\b/i.test(q)) {
    return `### Pourquoi recruter Muhammad Abdul Moiz ?

Voici ce que j'apporte concrètement à une équipe d'ingénierie de haut niveau :

1. **Double Compétence Production & Pédagogie** : Capacité démontrée à concevoir des architectures robustes et à transmettre les bonnes pratiques aux pairs.
2. **Excellence DevOps & DevSecOps** : Automatisation complète des chaînes CI/CD, tests systématiques, contrôles SonarQube et visibilité par métriques DORA.
3. **Maîtrise de l'IA Générative Appliquée** : Conception d'agents autonomes (LangGraph), pipelines RAG et streaming temps réel avec gains de performance mesurés.
4. **Rigueur d'Exécution & Autonomie** : Pratique éprouvée des méthodologies agiles, esprit d'initiative et orientation vers l'impact mesurable.
5. **Polyvalence Multilingue** : Évolution fluide en environnement international (Anglais courant C1, Français professionnel B1.1).

### Suggestions de questions :
? Quelles sont vos disponibilités pour de futures opportunités CDI ou CDD ?
~ Expérience prouvée sur AWS, Docker, FastAPI et Django
? Parlez-moi de vos projets phares (DoctorIQ, Brackets Genie, VIF).
~ Contact direct : ${profile.email}`;
  }

  // 9b. GARDE-FOU HORS-SUJET / OFF-TOPIC
  if (
    /^(quelle est la (capitale|m[eé]t[eé]o)|qui est (le pr[eé]sident|elon|bill|steve|donald|joe|obama|macron)|r[eé]sous|calcule|\d+\s*[\+\-\*\/]\s*\d+|comment (cuisiner|faire un g[aâ]teau|r[eé]parer)|raconte(z)?-(moi )?une (blague|histoire)|[eé]cris-(moi )?(un |une )?(po[eè]me|chanson|histoire|dissertation|script|code pour|programme pour))\b/i.test(q)
  ) {
    return `En tant que double numérique de **Muhammad Abdul Moiz**, je réponds exclusivement aux questions concernant son profil professionnel, ses projets d'ingénierie, ses compétences techniques (DevOps, Cloud, IA, Full-Stack) ou ses disponibilités.

N'hésitez pas à me poser une question sur ses réalisations concrètes (*DoctorIQ*, *Brackets Genie*), son expérience chez [Brackets Private Limited](https://www.bracketsltd.com/) et [EPITECH Paris](https://www.epitech.eu/en/), ou sa stack technique !`;
  }

  // 10. DEFAULT FRENCH FALLBACK (3 Dynamic Variations, concise & non-repetitive)
  const defaultVariants = [
    `Je suis à votre disposition en tant que double numérique IA de **Muhammad Abdul Moiz**. Vous pouvez explorer :

- **DevOps & Cloud** : GitLab CI, GitHub Actions, Docker, AWS & GCP, SonarQube et métriques DORA
- **Formation & Expérience** : MSc à l'**EPITECH Paris** (Assistant Pédagogique) & BSCS à **FAST-NUCES** (Pakistan)
- **Projets Phares** : *DoctorIQ* (santé OCR/LLM), *Brackets Genie* (WebSockets) et *Ledgeroo*
- **Statut & Opportunités** : En alternance à l'EPITECH Paris (Sept 2026 – Sept 2027), ouvert aux futurs **CDI / CDD**
- **Contact Direct** : [${profile.email}](mailto:${profile.email})

### Suggestions de questions :
? Quelles sont vos compétences et vos services en DevOps et Cloud ?
~ Né et grandi au Pakistan • Basé à Paris (23 ans)
? Pourquoi un recruteur devrait-il engager Muhammad Abdul Moiz ?
~ Équipe pédagogique EPITECH Paris & ex-ingénieur chez Brackets`,

    `Bienvenue ! Je suis le représentant interactif de Muhammad Abdul Moiz, ingénieur logiciel et IA à Paris (né le 16 octobre 2002 au Pakistan, 23 ans).

De quoi aimeriez-vous discuter ?
- **Architecture & Code** : Backends Python (FastAPI/Django) et conteneurs Docker.
- **Systèmes IA en Production** : Extraction documentaire multimodal (*DoctorIQ*) et agents conversationnels (*Brackets Genie*).
- **Parcours** : 23 ans, diplômé FAST-NUCES (Pakistan) et étudiant en Master à EPITECH Paris.

### Suggestions de questions :
? Parlez-moi de vos projets phares (DoctorIQ, Brackets Genie, Ledgeroo, VIF) ?
~ Master of Science EPITECH Paris & BSCS FAST-NUCES
? Quel âge avez-vous et quel est votre parcours académique ?
~ Contact direct : ${profile.email}`,

    `Je réponds à vos questions sur le parcours, les réalisations et les compétences techniques de Muhammad Abdul Moiz.

Voici quelques angles à explorer :
- **Enseignement & Rigueur** : Son rôle d'Assistant Pédagogique à EPITECH Paris, encadrant les étudiants sur les systèmes et le code propre.
- **Réalisations Concrètes** : 8 projets documentés couvrant le cloud, le DevOps, la FinTech et l'intelligence artificielle.
- **Statut Actuel** : Alternance à l'EPITECH Paris (Septembre 2026 – Septembre 2027), à l'écoute d'opportunités futures en CDI ou CDD.

### Suggestions de questions :
? Pourquoi un recruteur devrait-il engager Muhammad Abdul Moiz ?
~ Anglais C1 bilingue, Français B1.1 professionnel et Urdu natif
? Quelles sont vos disponibilités pour de futures opportunités CDI ou CDD ?
~ Localisation : Paris, Île-de-France (sur site, hybride ou télétravail)`,
  ];

  return defaultVariants[varIdx];
}
