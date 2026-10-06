import { profile } from "@/data/profile";

// Set NEXT_PUBLIC_SITE_URL to the live domain. On Vercel the production URL
// is used automatically, so share links and the sitemap stay absolute.
const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelProductionUrl ? `https://${vercelProductionUrl}` : "http://localhost:3000");

export const siteTitle = `${profile.name} | Full-stack software engineer`;

export const siteDescription =
  "Tomilola Obasan, a full-stack software engineer in Lagos building fintech, AI and travel products with TypeScript, React, Next.js, Node.js and NestJS. Available now for new roles.";

export const siteKeywords = [
  "Tomilola Obasan",
  "full-stack engineer",
  "software engineer Lagos",
  "Next.js developer",
  "NestJS developer",
  "TypeScript",
  "React",
  "Node.js",
  "fintech engineer",
  "AI engineer",
  "Nigeria",
  "remote software engineer",
];
