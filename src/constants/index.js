import {
  backend,
  creator,
  mobile,
  web,
  javascript,
  typescript,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  gssoc,
  chatty,
  nextjs,
  python,
  postgresql,
  django,
  ecommerce,
  healthAssistant,
  uber,
  farmer,
  theSocial,
  draftyard,
  flowzen,
  parallelGuardian,
  pulsechain,
  smartcity,
} from "../assets";

const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Projects",
  },
  {
    id: "github",
    title: "GitHub",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Full-Stack Apps",
    icon: web,
  },
  {
    title: "Realtime Systems",
    icon: mobile,
  },
  {
    title: "AI / RAG Workflows",
    icon: creator,
  },
  {
    title: "Backend Performance",
    icon: backend,
  },
];

const technologies = [
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "PostgreSql",
    icon: postgresql,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "Django",
    icon: django,
  },
  {
    name: "Next Js",
    icon: nextjs,
  },
  {
    name: "figma",
    icon: figma,
  },
];

const experiences = [
  {
    title: "Front-End Developer",
    company_name: "GSSOC'24",
    icon: gssoc,
    iconBg: "#E6DEDD",
    date: "May 2024 - July 2024",
    points: [
      "Collaborated with a team of developers to design and implement user-friendly, responsive, and visually appealing interfaces",
      "Refactored existing codebase to enhance readability,maintainability, and scalability following best coding practices.",
      "Converted Figma designs into functional web pages using HTML, CSS, and JavaScript, ensuring cross-browser compatibility and optimal performance.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Divyanshu proved me wrong.",
    name: "Govind Sharma",
    designation: "Full-Stack developer",
    company: "JabRod",
  },
];

const projects = [
  {
    name: "DraftYard",
    description: `
Led a 3-member team in building an AI-powered platform to revive, manage, and collaborate on unfinished software projects.

• Built a scalable full-stack system using React.js, Node.js, Express.js, MongoDB, Django, and Python-based ML services with GitHub Repository Import, Google OAuth 2.0, RBAC, and secure REST APIs.
• Integrated RAG, Semantic Search, and Sentence Transformers to deliver contextual project insights and intelligent project matching.
• Developed AI-driven project intelligence including project health analysis, revival insights, and semantic project matching.
`,
    tags: [
      { name: "React.js", color: "blue-text-gradient" },
      { name: "Node.js", color: "green-text-gradient" },
      { name: "MongoDB", color: "green-text-gradient" },
      { name: "Django", color: "pink-text-gradient" },
      { name: "Express", color: "blue-text-gradient" },
    ],
    image: draftyard,
    source_code_link: "https://github.com/Gaurav10806/DraftYard",
    deployed_link: "https://draft-yard.vercel.app/",
  },
  {
    name: "FlowZen",
    description: `
Developed a visual AI-powered workflow automation platform with a drag-and-drop workflow builder and graph-based workflow modeling.

• Built conditional branching, reusable workflow templates, and configurable AI agent nodes for complex automation pipelines.
• Engineered the backend using Django, Django REST Framework, PostgreSQL, Celery, and Redis with asynchronous task execution.
• Implemented REST APIs, JWT authentication, dependency validation, real-time workflow execution monitoring, and a modular workflow execution engine.
`,
    tags: [
      { name: "React.js", color: "blue-text-gradient" },
      { name: "Django", color: "green-text-gradient" },
      { name: "PostgreSQL", color: "blue-text-gradient" },
      { name: "Celery", color: "pink-text-gradient" },
      { name: "Redis", color: "green-text-gradient" },
    ],
    image: flowzen,
    source_code_link: "https://github.com/Gaurav10806/FlowZen",
    deployed_link:
      "https://drive.google.com/file/d/1b4kNyMe7lBpif6rp5mtRWnRtwBNkEFAj/view?usp=sharing",
  },
  {
    name: "Parallel Guardian AI",
    description: `
AI-powered student productivity platform that predicts deadline risks, prioritizes tasks, and generates recovery plans.

• Built AI Daily Brief, Deadline Guardian, and AI Priority Queue for deadline-risk detection, task prioritization, workload analysis, and actionable recommendations.
• Implemented Smart Task Capture, Rescue Planner, Adaptive Focus Window, Productivity Analytics, and AI Reflection Journal for intelligent productivity and recovery workflows.
• Integrated Google Gemini for AI reasoning and generation with secure authentication, interactive dashboards, and productivity visualizations.
`,
    tags: [
      { name: "React.js", color: "blue-text-gradient" },
      { name: "Supabase", color: "green-text-gradient" },
      { name: "Tailwind CSS", color: "pink-text-gradient" },
      { name: "Google Gemini", color: "blue-text-gradient" },
      { name: "Recharts", color: "green-text-gradient" },
    ],
    image: parallelGuardian,
    source_code_link: "https://github.com/Gaurav10806/parallel-guardian-ai",
    deployed_link: "https://parallel-guardian-ai.vercel.app/",
  },
  {
    name: "PulseChain AI",
    description: `
An AI-powered decision-intelligence platform that models cascading consequences of crisis incidents and recommends high-leverage interventions.

• Built an interactive cascade reasoning graph with probability, impact, time-to-impact, AI reasoning, and critical turning-point analysis.
• Integrated Google Gemini 2.5 Flash with structured JSON responses to generate incident analysis, risk assessments, recommendations, and executive summaries.
• Developed an Intervention Lab, six-step scenario builder, decision reports, risk matrix visualization, mission history, and mock-analysis fallback for reliable demonstrations.
`,
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "TypeScript", color: "green-text-gradient" },
      { name: "TanStack Start", color: "pink-text-gradient" },
      { name: "Google Gemini", color: "blue-text-gradient" },
      { name: "Recharts", color: "green-text-gradient" },
    ],
    image: pulsechain,
    source_code_link: "https://github.com/Gaurav10806/PulseChain-AI",
    deployed_link: "https://pulse-chain-ai-rust.vercel.app/",
  },
  {
    name: "Smart City Management System",
    description: `
A Java-based smart-city complaint management system with role-based User, Officer, and Admin workflows, MySQL/JDBC integration, analytics, reporting, and custom data structures.

• Built separate User, Officer, and Admin workflows for complaint registration, tracking, assignment, status management, evidence handling, and administration.
• Integrated Java with MySQL using JDBC, SQL, and stored procedures for complaints, users, officers, evidence, analytics, and reporting.
• Implemented custom Queue, Stack, Binary Search Tree, Linked List, Hash Map, Hash Table, Graph, and Task Queue structures for complaint management, workload analysis, searching, and reporting.
`,
    tags: [
      { name: "Java", color: "blue-text-gradient" },
      { name: "MySQL", color: "green-text-gradient" },
      { name: "JDBC", color: "pink-text-gradient" },
      { name: "DSA", color: "blue-text-gradient" },
      { name: "SQL", color: "green-text-gradient" },
    ],
    image: smartcity,
    source_code_link:
      "https://github.com/Gaurav10806/Smart_City_Management_System",
    deployed_link: null,
  },
];

export {
  navLinks,
  services,
  technologies,
  experiences,
  testimonials,
  projects,
};
