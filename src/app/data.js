// this comtains the data we are gonna for AboutMe component and slider component 

export const AboutData = [
  {
    count: 1,
    title: "UI / UX Designer",
    img: "/first.svg",
    array: [
      "Information Architecture",
      "Pen and Paper",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Figma",
      "Framer",
      "Typography / Spacing / ...",
    ],
  },
  {
    count: 2,
    title: "Front-end Developer",
    img: "/second.svg",
    array: [
      "HTML / CSS3",
      "javaScript (ES6)",
      "ReactJS",
      "NextJS",
      "TailwindCSS",
      "Bootstrap",
      "REST API / GraphQL",
    ],
  },
  {
    count: 3,
    title: "Back-end Developer",
    img: "/third.svg",
    array: [
      "NodeJS / Express.js",
      "MongoDB / MySQL / MSSQL",
      "Next.js (API)",
      "PHP",
      "WordPress Theme Dev",
      "WordPress Plugin Dev.",
      "ASP (Once upon a time)",
    ],
  },
  {
    count: 4,
    title: "DevOps and Admin",
    img: "/fourth.svg",
    array: [
      "Docker / CI CD",
      "Apache / Nginx",
      "CentOS / Ubuntu",
      "Windows Server / IIS",
      "Mail Servers / DNS Servers",
      "Firewalls / Security",
      "VMWare ESXi",
    ],
  },
  {
    count: 5,
    title: "CMS and Headless CMS",
    img: "/fifth.svg",
    array: [
      "Contentful",
      "GraphCMS",
      "Strapi",
      "WordPress (Gutenberg)",
      "Directus",
      "Sanity",
      "SiteBaan (My Own)",
    ],
  },
  {
    count: 6,
    title: "Tools and Things",
    img: "/sisxth.svg",
    array: [
      "VSCode",
      "Git / Github",
      "Bash / Powershell",
      "NPM / Yarn",
      "Plesk Control Panel",
      "Vercel / Stormkit / Netlify",
      "Postman / Insomnia",
    ],
  },
];


// this is for the slider 
export const DataArray = [
  {
    title: "Personal Portfolio Website Using Reactjs",
    name: "Portfolio Website",
    des: "A portfolio website to showcase my projects and skills.",
    des1: "Built a modern, responsive portfolio website built with Next.js 15 and React 19, featuring animated neural network backgrounds, interactive project carousel, AI chatbot integration, and glassmorphism design. Includes dynamic routing for project details, smooth scroll animations, custom scrollbars, and comprehensive responsive design. Showcases advanced CSS techniques, React hooks, and modern web development practices with full mobile optimization.",
    images: ["/website.png"],
    techStack: ["Next.js", "React.js", "JavaScript", "Tailwind CSS", "CSS"],
    status: {
      text: "Completed",
      color: "green"
    },
    year: "2025",
    demoLink: null,
    repositoryLink: "https://github.com/bseo97/Portfolio"
  },
  {
    title: "Hackathon Project: Rent-spiracy",
    name: "Rent-spiracy",
    des: "Built a website for a 3-mean team hackathon project that allows users search for potential scams.",
    des1: "Rent-spiracy is a hackathon project developed by a 3-person team to help users identify and avoid potential rental scams. The platform allows users to search for properties and cross-reference them against known scam databases, providing real-time alerts and risk assessments. Built with Next.js and TypeScript for a robust frontend experience, the application integrates with MongoDB for data storage and utilizes Python backend services for advanced data processing. The Gemini API powers intelligent scam detection algorithms, analyzing listing patterns, pricing anomalies, and user reports to provide comprehensive fraud prevention. This project demonstrates rapid prototyping skills, API integration, and collaborative development in a time-constrained hackathon environment.",
    images: ["/Rentspiracy.png"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Python", "Gemini API"],
    status: {
      text: "Live",
      color: "blue"
    },
    year: "2025",
    demoLink: "https://www.youtube.com/watch?v=CsMjk4ld_aA&t=10s",
    repositoryLink: "https://github.com/bseo97/Rent-Spiracy"
  },
  {
    title: "Fabflix full-stack project",
    name: "Fabflix (renamed to Decurb – Academic Project)",
    des: "A full-stack movie eCommerce platform with secure login, dynamic search, chatbot integration, and full AWS deployment.",
    des1: "Fabflix is a full-stack movie eCommerce web application that allows users to search, browse, and purchase movies through a secure and interactive interface. Built using Java Servlets, MySQL, and AJAX-powered front-end technologies, the platform supports advanced features such as fuzzy search, dynamic shopping cart, and an AI-powered chatbot integrated via the OpenAI API. I implemented secure login with JWT, optimized SQL performance, automated XML data import, and successfully deployed the application on AWS using Docker and Kubernetes, demonstrating a scalable microservices architecture before shutting down the server due to cost constraints. You can test the full project locally by visiting my GitHub repository, Fabflix!",
    images: ["/Decurb_main.png", "/Decurb_login.png"],
    techStack: ["Java", "MySQL", "JavaScript (AJAX)", "HTML/CSS", "Servlet", "JDBC", "Docker", "Kubernetes", "AWS", "Microservices"],
    status: {
      text: "Completed",
      color: "green"
    },
    year: "2025",
    demoLink: "https://youtu.be/R7KXw658VMg",
    repositoryLink: "https://github.com/bseo97/Fabflix"
  },
  {
    title: "Decurb",
    name: "Decurb – AI Token Forecasting & Optimization Platform",
    des: "An AI infrastructure platform designed to minimize token usage and prevent hallucinations across LLM workflows.",
    des1: "Decurb is an AI platform I’m currently leading as part of a collaborative team project, aimed at helping users better understand and optimize how much “token space” their prompts and completions consume when interacting with large language models like GPT. The platform analyzes token usage in real-time, forecasts when prompts are likely to exceed model limits or produce incomplete responses, and proactively manages those cases by breaking complex prompts into smaller subproblems. It also caches reusable outputs and recombines them intelligently to reduce cost while preserving accuracy and performance. Decurb was born out of both technical curiosity and a practical need for scalable, efficient AI workflows—especially in applications that involve long or dynamic user interactions. Stay Tuned!",
    images: ["/Decurb.png"],
    techStack: ["Python", "FastAPI", "PostgreSQL", "OpenAI API", "Regex", "Prompt Pattern Matching", "Token Forecasting Heuristics", "Modular Inference Planning", "Caching (LRU/Memoization)", "Docker", "Kubernetes", "AWS EC2", "JWT", "React", "marked.js"],
    status: {
      text: "In Progress",
      color: "yellow"
    },
    year: "2025",
    demoLink: null,
    repositoryLink: null
  },
];
