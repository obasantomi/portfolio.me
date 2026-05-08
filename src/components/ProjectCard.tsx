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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.005 }}
      transition={{ duration: 0.01 }}
      onHoverStart={onMouseEnter}
      onHoverEnd={onMouseLeave}
      className={`relative overflow-hidden rounded-md p-3 border w-87.5 border-black/5 bg-white shadow-sm transition-all duration-500 ${
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
      <div className="relative h-44 w-full">
        <Image
          src={project.previewImage!}
          alt={`${project.title} preview`}
          fill
          className="object-cover"
          priority={false}
        />

        <div className="absolute inset-0" />
      </div>
      <div className="space-y-2 p-5">
        <h3 className="text-[15px] font-semibold text-slate-900">
          {project.title}
        </h3>
        <p className="text-[13px] text-slate-600">{project.tagline}</p>
      </div>
    </motion.article>
  );
};
