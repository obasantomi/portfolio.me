import type { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    name: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Radix UI", "Chakra UI"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "NestJS", "Express", "REST APIs", "Prisma", "BullMQ", "Redis"],
  },
  {
    name: "Data and auth",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "JWT", "OAuth", "NextAuth.js"],
  },
  {
    name: "State and fetching",
    skills: ["TanStack Query", "Zustand", "Redux", "Zod"],
  },
  {
    name: "AI",
    skills: ["OpenAI API", "Google GenAI (Gemini)", "Prompt and context design", "Retry and fallback strategies"],
  },
  {
    name: "Tools",
    skills: ["Git and GitHub", "Figma", "Vercel", "Render"],
  },
];
