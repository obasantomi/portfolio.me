"use client";
import type { ComponentType } from "react";
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
    <section className="mt-16">
      <div className="mb-6 text-[15px] font-semibold text-slate-900">
        Tools I Work With
      </div>

      <div
        className="relative overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div className="overflow-hidden">
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
                  className="inline-flex items-center gap-2 mx-10 opacity-90"
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
                  className="inline-flex items-center gap-2 mx-10 opacity-90"
                >
                  {Icon ? <Icon className="h-4 w-4 text-slate-500" /> : null}
                  <span>{tool}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marqueeTrack {
          display: inline-flex;
          min-width: 200%;
          animation: marqueeLeft 70s linear infinite;
          will-change: transform;
        }

        .marqueeReverse {
          animation: marqueeLeft 70s linear infinite reverse;
        }

        @keyframes marqueeLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};
