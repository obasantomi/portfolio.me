import type { Role } from "@/types";

export const experience: Role[] = [
  {
    company: "Tramango",
    companyUrl: "https://tramango.com",
    title: "Full-Stack Engineer",
    period: "Sep 2026 – Present",
    location: "Lagos",
    current: true,
    description:
      "A Nigerian travel platform for flights, travel insurance, events and ticketing, and travel packages.",
    highlights: [
      "Built the events Guest List feature end to end, now live in production. Creators invite free guests one by one or through shareable registration links, and sign-up limits hold even when many people register at once. Guests reuse the existing QR check-in flow and stay out of revenue figures.",
      "Fixed the travel insurance flow so customers could get quotes again, and rebuilt its booking forms to the Figma design with per-field validation and consistent layout.",
      "Built verified partner payouts with Paystack: a searchable list of every Nigerian bank, and account names resolved on the server before anything is saved, with clear errors for partners.",
      "Built a CSV export of event purchases for the finance team, covering every order with payment type, add-ons, fees and check-in status, restricted to super admins.",
      "Made scheduled event publishing run on time, with a backup check that catches missed schedules, and added automatic compression, cropping and validation for event image uploads.",
    ],
    stack: ["Next.js", "Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "Paystack"],
  },
  {
    company: "LeadSage Africa",
    companyUrl: "https://www.leadsageafrica.com/",
    title: "Full-Stack Engineer",
    period: "Apr 2026 – Present",
    location: "Lagos",
    current: true,
    description:
      "A Nigerian property platform for long-term rentals, shortlets and office space, with digital leasing, an escrow-backed wallet and rent savings.",
    highlights: [
      "Designed and built SageAI, a WhatsApp assistant on NestJS, Gemini, Redis and BullMQ, taking it from an urgent requirement to production in one week.",
      "Made SageAI resilient: Redis debouncing merges rapid-fire messages, transient Gemini failures retry with jittered backoff, and users get a clear reply when something fails.",
      "Redesigned dashboards and user workflows across property discovery, leasing, savings and payments, building from Figma in Next.js, TypeScript and Tailwind CSS.",
      "Ship through feature branches, pull requests and code review on a shared NestJS and Next.js codebase.",
    ],
    stack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Gemini"],
    caseStudySlug: "leadsage",
  },
  {
    company: "Echo",
    companyUrl: "https://www.echo-ng.com/",
    title: "Front-End Engineer",
    period: "Oct 2025",
    location: "Lagos",
    description:
      "A social impact platform that helps leaders gather feedback from their communities and rewards positive action.",
    highlights: [
      "Built responsive interfaces in React, TypeScript, Tailwind CSS and Framer Motion.",
      "Architected reusable components and type-safe form validation with Zod.",
      "Moved data fetching to TanStack Query for caching and synchronisation, making the app feel faster and more consistent.",
      "Worked with product designers and backend engineers in agile cycles to turn requirements into shipped features.",
    ],
    stack: ["React", "TypeScript", "TanStack Query", "Zod", "Framer Motion"],
    caseStudySlug: "echo",
  },
];
