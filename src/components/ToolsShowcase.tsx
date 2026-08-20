"use client";
import type { ComponentType } from "react";
import { motion } from "framer-motion";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiPrisma,
  SiPostgresql,
  SiMysql,
  SiNodedotjs,
  SiExpress,
  SiAuth0,
  SiGit,
  SiGithub,
  SiCloudinary,
  SiReactquery,
  SiStackoverflow,
  SiZod,
  SiFramer,
  SiGooglecloud,
} from "react-icons/si";
import { toolsIWorkWith } from "@/data/tools";
import { fadeUp, revealViewport, staggerChildren } from "@/lib/motion";

const toolIcons: Record<string, ComponentType<{ className?: string }>> = {
  "Next.js": SiNextdotjs,
  "React.js": SiReact,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  Prisma: SiPrisma,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  NextAuth: SiAuth0,
  Git: SiGit,
  GitHub: SiGithub,
  Cloudinary: SiCloudinary,
  "TanStack Query": SiReactquery,
  Zustand: SiStackoverflow,
  Zod: SiZod,
  "Framer Motion": SiFramer,
  "Google Cloud Services": SiGooglecloud,
};

export const ToolsShowcase = () => {
  const marqueeItems = [...toolsIWorkWith, ...toolsIWorkWith];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={staggerChildren}
      className="mt-16"
    >
      <motion.div
        variants={fadeUp}
        className="mb-6 text-[15px] font-semibold text-slate-900"
      >
        Tools I Work With
        <p className="text-[11px]  md:text-sm italic text-slate-500 my-5">
          (I adapt quickly to new tools and technologies when needed. These are
          the ones I'm most experienced with.)
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="relative w-full min-w-0 overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div className="overflow-hidden mb-10">
          <div
            className="marqueeTrack whitespace-nowrap text-[14px] font-semibold tracking-[-0.01em] text-slate-600"
            style={{
              fontFamily:
                "var(--font-plex-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
            }}
          >
            {marqueeItems.map((tool, index) => {
              const Icon = toolIcons[tool];
              return (
                <span
                  key={`tool-1-${tool}-${index}`}
                  className="inline-flex shrink-0 items-center gap-2 mx-10 opacity-90"
                >
                  {Icon ? <Icon className="h-4 w-4 text-slate-500" /> : null}
                  <span>{tool}</span>
                </span>
              );
            })}
          </div>
        </div>

        <div className="mt-4 overflow-hidden">
          <div
            className="marqueeTrack marqueeReverse whitespace-nowrap text-[14px] font-semibold tracking-[-0.01em] text-slate-600"
            style={{
              fontFamily:
                "var(--font-plex-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
            }}
          >
            {marqueeItems.map((tool, index) => {
              const Icon = toolIcons[tool];
              return (
                <span
                  key={`tool-2-${tool}-${index}`}
                  className="inline-flex shrink-0 items-center gap-2 mx-10 opacity-90"
                >
                  {Icon ? <Icon className="h-4 w-4 text-slate-500" /> : null}
                  <span>{tool}</span>
                </span>
              );
            })}
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .marqueeTrack {
          display: flex;
          align-items: center;
          width: max-content;
          min-width: 100%;
          animation: marqueeLeft 70s linear infinite;
          will-change: transform;
        }

        .marqueeReverse {
          animation: marqueeLeft 70s linear infinite reverse;
        }

        @keyframes marqueeLeft {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </motion.section>
  );
};
