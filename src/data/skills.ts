import type { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    name: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Radix UI", "Chakra UI", "shadcn/ui"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "NestJS", "Express", "REST APIs", "Prisma", "BullMQ", "Redis"],
  },
  {
    name: "Data and auth",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "JWT", "OAuth", "NextAuth.js", "Supabase", "Firebase", "Redis"],
  },
  {
    name: "State and fetching",
    skills: ["TanStack Query", "Zustand", "Redux Toolkit", "Zod", "Joi"],
  },
  {
    name: "AI",
    skills: ["OpenAI API", "Google GenAI API (Gemini)", "MCP integrations", "Prompt and context design", "Retry and fallback strategies"],
  },
  {
    name: "Infrastructure",
    skills: ["Microservices", "Docker", "Kubernetes", "CI/CD pipelines", "Vercel", "Render", "AWS"],
  },
  {
    name: "Tools",
    skills: ["Git and GitHub", "Figma", "Sanity", "Jest", "Vitest", "Postman"],
  },
];
