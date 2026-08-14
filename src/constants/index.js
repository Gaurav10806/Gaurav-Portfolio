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
} from "../assets";

const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
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
    name: "AI Farmer Assistance Platform",
    description: `
An AI-driven platform combining RAG, geospatial intelligence & computer vision for farmers:

- Built RAG system using LangChain + vector DB (~90% relevant responses)
- Developed plant disease detection model (~88% accuracy, ~1.2s latency)
- Added Gemini + Datagram API for AI voice assistant functionality
- Implemented India map interface for crop suggestions & market insights
- Included real-time community chat for farmers & experts
`,
    tags: [
      { name: "NextJs", color: "blue-text-gradient" },
      { name: "LangChain", color: "green-text-gradient" },
      { name: "Vector DB", color: "pink-text-gradient" },
      { name: "Python CV", color: "blue-text-gradient" },
    ],
    image: farmer,
    source_code_link: "https://github.com/Divyanshu-Mishra9620/Agri-Ai",
    deployed_link: "https://kris-hinova.vercel.app/",
  },
  {
    name: "TheSocial",
    description: `
Built a production grade messaging platform, handling scalable communication using modern web technologies.
- Implemented real time messaging using Socket.IO with event driven architecture
- Designed optimistic UI updates for instant message delivery experience
- Integrated Redis for caching recent messages, rate limiting, and Pub/Sub for multi server scalability
- Used BullMQ for asynchronous message processing to ensure non blocking performance
- Designed efficient MongoDB schema with indexing and ULID based message ordering
- Built a complete message lifecycle system from creation to persistence with high reliability
- Implemented deduplication logic to prevent duplicate messages across socket events and API responses
`,
    tags: [
      { name: "MongoDB", color: "green-text-gradient" },
      { name: "BullMQ", color: "blue-text-gradient" },
      { name: "Socket.IO", color: "pink-text-gradient" },
      { name: "Redis", color: "green-text-gradient" },
      { name: "WebSockets", color: "blue-text-gradient" },
      { name: "NextJs", color: "pink-text-gradient" },
    ],
    image: theSocial,
    source_code_link: "https://github.com/Divyanshu-Mishra9620/The-Social",
    deployed_link: "https://thesocialapp.xyz",
  },
  {
    name: "E-Commerce",
    description: `
A scalable e-commerce platform optimized for large product catalogs and fast performance:

- Architected a store supporting 19,000+ products using SSR + caching
- Reduced TTFB by 40% through optimized PostgreSQL queries
- Designed APIs reducing product search latency from 650ms to 120ms
- Integrated Auth.js + JWT for secure authentication and session handling
- Added Razorpay payment gateway with webhook validation
`,
    tags: [
      { name: "MERN", color: "blue-text-gradient" },
      { name: "MongoDB", color: "green-text-gradient" },
      { name: "NextJs", color: "pink-text-gradient" },
    ],
    image: ecommerce,
    source_code_link:
      "https://github.com/Divyanshu-Mishra9620/E-Commerce-frontend",
    deployed_link: "https://e-commerce-frontend-murex-eta.vercel.app/",
  },
  {
    name: "Uber-Style Ride Booking System",
    description: `
A real-time ride booking platform enabling live driver-customer interactions:

- Implemented instant ride requests using Socket.IO
- Built live location tracking with Leaflet maps (pickup & drop points)
- Developed driver matching algorithm with ride status transitions
- Added authentication, ride history & driver availability features
- Designed a responsive, intuitive interface for customers & drivers
`,
    tags: [
      { name: "NextJs", color: "blue-text-gradient" },
      { name: "Node.js", color: "green-text-gradient" },
      { name: "Socket.IO", color: "pink-text-gradient" },
      { name: "Leaflet", color: "blue-text-gradient" },
    ],
    image: uber,
    source_code_link: "https://github.com/Divyanshu-Mishra9620/uber-b",
    deployed_link: "https://uber-b-4vyh.vercel.app/",
  },

  {
    name: "AI-Health-Assistant",
    description: `
AI-powered health assistant providing instant diagnosis and structured recommendations:

- Built with Next.js, Django, PostgreSQL, LangChain & TypeScript
- Implemented RAG workflow reducing hallucinations by ~30%
- Added symptom extraction pipeline + vector DB search
- Integrated JWT authentication & secure rate-limited API routes
- Enabled image upload & chat-based health interaction
`,
    tags: [
      { name: "TypeScript", color: "blue-text-gradient" },
      { name: "Python", color: "green-text-gradient" },
      { name: "Django", color: "pink-text-gradient" },
      { name: "PostgreSQL", color: "blue-text-gradient" },
    ],
    image: healthAssistant,
    source_code_link:
      "https://github.com/Divyanshu-Mishra9620/Health-Assistant",
    deployed_link: "https://health-assistant-omega.vercel.app/",
  },

  {
    name: "Chatty (Real-Time Chat App)",
    description: `
A real-time messaging platform built with Socket.IO and modern UI components:

- Developed using the MERN stack (MongoDB, Express, React, Node.js)
- Implemented instant messaging with reliable WebSocket channels
- Added authentication, protected routes & persistent chat storage
- Built responsive UI with Tailwind CSS
- Integrated typing indicators, message status & smooth chat UX
`,
    tags: [
      { name: "MERN", color: "blue-text-gradient" },
      { name: "tailwind", color: "green-text-gradient" },
      { name: "socket.io", color: "pink-text-gradient" },
    ],
    image: chatty,
    source_code_link:
      "https://github.com/Divyanshu-Mishra9620/Fullstack-chat-app",
    deployed_link: "https://fullstack-chat-app-1-57jj.onrender.com",
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
