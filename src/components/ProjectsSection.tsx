"use client";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ToolsShowcase } from "@/components/ToolsShowcase";

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
import Link from "next/link";

export const ProjectsSection = () => {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <section className="pb-10 pt-5 px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
        className="mx-auto max-w-3xl"
      >
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="mb-6 text-[15px] font-semibold text-slate-900"
        >
          Work
        </motion.h2>

        <div className="mt-8 grid justify-items-center md:justify-items-start grid-cols-1 gap-y-8 gap-x-10  md:grid-cols-2 xl:grid-cols-2">
          {projects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`}>
              <ProjectCard
                key={project.slug}
                project={project}
                isDimmed={hoveredSlug !== null && hoveredSlug !== project.slug}
                onMouseEnter={() => setHoveredSlug(project.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
              />
            </Link>
          ))}
        </div>

      </motion.div>
        
    </section>
  );
};
