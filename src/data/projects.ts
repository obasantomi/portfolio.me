import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "analytica",
    title: "Analytica",
    tagline: "An AI-powered learning platform for aspiring data analysts",
    summary:
      "A full-stack platform that turns real-world datasets into guided analytics projects, with an AI mentor and professional-style feedback.",
    role: "Solo build, design to deployment",
    context: "Personal product",
    year: "2026",
    featured: true,
    overview: [
      "Aspiring data analysts usually practise on toy tutorials that look nothing like real work. Analytica gives them realistic projects instead: real datasets, a business brief, guidance from an AI mentor, and feedback that reflects how professional analysts think, not just whether an answer is correct.",
      "I built it from scratch, from the product design and landing page to the data model, authentication, AI workflows and deployment. It runs on Next.js, TypeScript, Prisma and PostgreSQL, with Gemini generating projects and feedback from World Bank data.",
    ],
    highlights: [
      "AI-generated analytics projects built on real datasets from the World Bank Data API, with contextual mentorship and feedback.",
      "Project evaluation workflows that score submissions and explain what to improve.",
      "Progress tracking and a skill radar, backed by PostgreSQL, so learners can see measurable growth.",
      "Authentication and protected sessions with NextAuth.",
      "Cloudinary storage for dataset uploads, submissions and generated files.",
      "A scrollytelling landing page built with Framer Motion.",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Gemini", "Cloudinary", "Tailwind CSS", "Recharts"],
    links: {
      live: "https://analytica-app-flame.vercel.app/",
      github: "https://github.com/obasantomi/Analytica-app.git",
      linkedin:
        "https://www.linkedin.com/posts/tomilola-obasan_after-weeks-of-designing-building-refining-ugcPost-7484327790079713280-06fU/",
    },
    cover: { src: "/images/analytica-final.png", alt: "Analytica landing page with a live project preview" },
    gallery: [
      { src: "/images/analytica-dashboard.png", alt: "Analytica learner dashboard" },
      { src: "/images/analytica-new.png", alt: "Starting a new AI-generated project in Analytica" },
      { src: "/images/analytica-details.png", alt: "Analytica project brief and dataset details" },
      { src: "/images/analytica-feedback.png", alt: "AI feedback on a submitted Analytica project" },
    ],
    demo: { capId: "11ynd1y4shjcvz4", title: "Analytica product walkthrough" },
  },
  {
    slug: "leadsage",
    title: "LeadSage Africa",
    tagline: "Property, payments and an AI assistant for Nigerian renters",
    summary:
      "PropTech and fintech features end to end, including SageAI, a WhatsApp assistant I designed and built on NestJS, Gemini, Redis and BullMQ.",
    role: "Full-stack engineer",
    context: "LeadSage Africa",
    year: "2026",
    featured: true,
    overview: [
      "LeadSage Africa makes finding, securing and saving toward a home simpler for Nigerians. The platform covers rentals, shortlets and office space, digital leasing, an escrow-backed wallet and FirstKey rent savings.",
      "My work spans the Next.js frontend and the NestJS backend. I turn product ideas and Figma designs into production features, and I've redesigned dashboards and user workflows around property discovery, leasing, savings and payments.",
    ],
    highlights: [
      "Property discovery and search with recommendations based on a renter's budget.",
      "Tour booking for scheduling in-person viewings.",
      "Digital leasing workflows from application to signed agreement.",
      "Escrow-protected payments that hold rent until a transaction is confirmed.",
      "A wallet for property payments, and FirstKey savings toward rent goals.",
      "SageAI, an assistant for property search, savings guidance and support.",
    ],
    stack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Gemini", "Tailwind CSS", "shadcn/ui"],
    links: {
      live: "https://www.leadsageafrica.com/",
      linkedin: "https://www.linkedin.com/company/leadsage-africa/about/",
    },
    cover: { src: "/images/leadsage-preview.png", alt: "LeadSage Africa home page with property search" },
    gallery: [
      { src: "/images/first-key.png", alt: "FirstKey rent savings in LeadSage" },
      { src: "/images/dashboard.png", alt: "LeadSage renter dashboard" },
      { src: "/images/sagenest.png", alt: "LeadSage SageNest in light mode" },
      { src: "/images/sagenestDark.png", alt: "LeadSage SageNest in dark mode" },
    ],
    spotlight: {
      title: "SageAI: from urgent requirement to resilient product in a week",
      diagram: "sageai-pipeline",
      image: { src: "/images/leadsage-chat-1.png", alt: "A SageAI conversation on WhatsApp" },
      paragraphs: [
        "LeadSage needed a personalised assistant that could talk to users directly on WhatsApp, and it was urgent. I had one week to design and build the backend.",
        "I built it on NestJS, Gemini, Redis and BullMQ. Incoming messages go onto a queue and a separate worker handles the AI conversation, so slow model calls never hold up the main API. The assistant understands each user's context and helps with property search, rent savings, tours, wallets and payments.",
        "As it grew, I made it resilient. Redis-based debouncing merges rapid-fire messages into one clean turn, transient Gemini failures retry with jittered backoff, and users get a clear message instead of silence when something goes wrong.",
      ],
    },
  },
  {
    slug: "next-reel",
    title: "NextReel",
    tagline: "A movie discovery app built on the TMDB API",
    summary:
      "Trailers, cast, reviews and recommendations from several TMDB endpoints, with infinite loading and debounced search.",
    role: "Solo build",
    context: "Personal project",
    overview: [
      "API integration is one of the most important frontend skills, and NextReel is built around it. It pulls trailers, clips, reviews, cast details, ratings and recommendations from the TMDB API to help you decide what to watch next.",
      "The focus was on making a data-heavy app feel fast: infinite queries for smooth loading and caching, a debounced search that avoids wasted requests, and clear loading, error and empty states throughout.",
    ],
    highlights: [
      "Infinite queries with TanStack Query for smooth loading and caching.",
      "Debounced search with loading, error and empty states.",
      "Several TMDB endpoints combined for trailers, cast, reviews, ratings and recommendations.",
      "Client-side routing with route-level error handling.",
    ],
    stack: ["React", "TypeScript", "TanStack Query", "Zustand", "Tailwind CSS", "TMDB API"],
    links: {
      live: "https://nextreel-orcin.vercel.app/",
      github: "https://github.com/obasantomi/NextReel.git",
      linkedin:
        "https://www.linkedin.com/posts/tomilola-obasan_frontenddevelopment-webdevelopment-activity-7409694136531996673-Cxrb",
    },
    cover: { src: "/images/next-reel.jpg", alt: "NextReel home page with featured movies" },
    gallery: [
      { src: "/images/nextreel-hero.png", alt: "NextReel hero section" },
      { src: "/images/next-reel-home.png", alt: "NextReel home feed" },
      { src: "/images/next-reel-explore.png", alt: "Exploring movies in NextReel" },
      { src: "/images/next-reel-specific.png", alt: "A NextReel movie detail page" },
    ],
    demo: { capId: "19vzhrtm775c87j", title: "NextReel product walkthrough" },
  },
  {
    slug: "hsl-hub",
    title: "HSL Hub",
    tagline: "A startup community platform for Hebron Startup Lab",
    summary:
      "I led a one-week sprint to ship v1 of a full-stack platform where members create profiles, join startups and manage tasks.",
    role: "Technical lead",
    context: "Hebron Startup Lab",
    overview: [
      "As an executive of Hebron Startup Lab, a community for founders and builders, and a lead in its Creators community, I led development of HSL Hub v1.0.0.",
      "I wrote code across the frontend and backend, supervised the team's work and ran our GitHub workflow. In a one-week sprint we shipped an MVP where members create profiles, discover and join startups, collaborate with their teams and manage tasks.",
    ],
    highlights: [
      "Secure registration, login and protected API endpoints.",
      "Profile onboarding into four communities: Creators, Executors, Creatives and Founders.",
      "Startup discovery and management with owner and member roles.",
      "Task assignment and tracking from to-do through in progress to completed.",
      "A REST API with Zod validation, centralised error handling and consistent status codes.",
    ],
    stack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma", "Zod", "JWT"],
    links: {
      linkedin: "https://www.linkedin.com/company/hebron-startup-lab/posts/?feedView=all",
    },
    cover: { src: "/images/hsl-preview.png", alt: "HSL Hub landing page" },
    gallery: [
      { src: "/images/hsl-dashboard.png", alt: "HSL Hub member dashboard" },
      { src: "/images/hsl-startup.png", alt: "A startup page in HSL Hub" },
      { src: "/images/hsl-profile.png", alt: "A member profile in HSL Hub" },
      { src: "/images/hsl-loading.png", alt: "HSL Hub loading state" },
    ],
  },
  {
    slug: "echo",
    title: "Echo",
    tagline: "A social impact platform that rewards positive action",
    summary:
      "Responsive React interfaces for a platform that helps leaders gather meaningful feedback from their communities.",
    role: "Front-end engineer",
    context: "Echo",
    year: "2025",
    overview: [
      "Echo helps leaders gather meaningful feedback from their followers so they can build stronger communities. Instead of chasing attention, users create waves: helpful actions and ideas that improve their environment.",
      "I built responsive, scalable interfaces with React, TypeScript and Zod, working closely with designers and backend engineers to turn product ideas into polished features.",
    ],
    highlights: [
      "Reusable React components and a scalable frontend architecture.",
      "Community engagement through feedback, discussions and waves.",
      "API state managed with TanStack Query for caching and synchronisation.",
      "Type-safe forms validated with Zod.",
      "Interface motion with Framer Motion.",
    ],
    stack: ["React", "TypeScript", "TanStack Query", "Zod", "Framer Motion", "Tailwind CSS", "Recharts"],
    links: {
      live: "https://www.echo-ng.com/",
      linkedin:
        "https://www.linkedin.com/posts/tomilola-obasan_reactjs-frontenddevelopment-socialimpact-activity-7403444990099759104-G_U4",
    },
    cover: { src: "/images/echo-home.jpg", alt: "Echo home page" },
    gallery: [],
  },
  {
    slug: "game-hub",
    title: "Game Hub",
    tagline: "Discover video games by genre, platform and rating",
    summary: "A game discovery app on the RAWG API with filtering, global state in Zustand and typed validation.",
    role: "Solo build",
    context: "Personal project",
    overview: [
      "Game Hub helps players explore video games with rich metadata, including genres, platforms, release dates and ratings.",
      "I focused on API integration, reusable components and clean frontend architecture, with careful loading and error states, search and filtering.",
    ],
    highlights: [
      "Dynamic game data from the RAWG API.",
      "Filtering by genre, platform and rating.",
      "Global state with Zustand.",
      "Type-safe development with TypeScript and Zod.",
    ],
    stack: ["React", "TypeScript", "Zustand", "Zod", "Chakra UI", "RAWG API"],
    links: {
      live: "https://game-hub-nine-neon.vercel.app/",
      github: "https://github.com/obasantomi/Game-hub.git",
    },
    cover: { src: "/images/game-hub.jpg", alt: "Game Hub game grid" },
    gallery: [],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
