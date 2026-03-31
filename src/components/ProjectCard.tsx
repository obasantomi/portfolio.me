"use client";

import Image from "next/image";
import Link from "next/link";
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
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-200 ${
        isDimmed ? "opacity-60 backdrop-blur-sm" : "opacity-100"
      }`}
    >
      <div className="relative h-44 w-full">
        <Image
          src={project.previewImage}
          alt={`${project.title} preview`}
          fill
          className="object-cover"
          priority={false}
        />
      </div>
      <div className="space-y-4 p-5">
        <h3 className="text-xl font-semibold text-slate-900">
          {project.title}
        </h3>
        <p className="text-sm text-slate-600">{project.tagline}</p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center rounded-md bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 px-3 py-2 text-xs font-semibold text-white transition hover:scale-105"
          >
            View Details
          </Link>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Live Site →
          </a>
        </div>
      </div>
    </motion.article>
  );
};
