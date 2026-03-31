"use client";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

import { useState } from "react";

export const ProjectsSection = () => {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <section className="px-4 pb-20 pt-24 sm:px-6 md:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
        className="mx-auto max-w-6xl"
      >
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="mb-6 text-3xl font-bold text-slate-900"
        >
          Projects
        </motion.h2>
        <div className="h-1 w-20 rounded-full bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500" />

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              isDimmed={hoveredSlug !== null && hoveredSlug !== project.slug}
              onMouseEnter={() => setHoveredSlug(project.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};
