"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  isDimmed?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const ProjectCard = ({
  project,
  isDimmed = false,
  onMouseEnter,
  onMouseLeave,
}: ProjectCardProps) => {
  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onHoverStart={onMouseEnter}
      onHoverEnd={onMouseLeave}
      className={`relative overflow-hidden rounded-md p-2 border w-full border-black/5 bg-white shadow-sm transition-all duration-500 ${
        isDimmed ? "opacity-50" : "opacity-100"
      }`}
    >
      {/* Dimming overlay */}
      <div
        className={`absolute inset-0 z-10 bg-white transition-opacity duration-200 pointer-events-none ${
          isDimmed
            ? "opacity-40 shadow-[inset_0_0_40px_10px_rgba(255,255,255,0.6)]"
            : "opacity-0"
        }`}
      />

      <div className="relative h-64 w-full rounded-md">
        <Image
          src={project.previewImage!}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 640px) 100vw, 28rem"
          className="object-cover rounded-md"
          loading={
            project.previewImage === "/images/analytica-final.png"
              ? "eager"
              : "lazy"
          }
        />
        <div className="absolute inset-0" />
      </div>
      <div className="pb-4 pt-7">
        <h3 className="text-[15px] font-semibold text-slate-900">
          {project.title}
        </h3>
        <p className="text-[13px] text-slate-600">{project.tagline}</p>
      </div>
    </motion.article>
  );
};
