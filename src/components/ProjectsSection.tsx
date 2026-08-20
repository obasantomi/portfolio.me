"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import Link from "next/link";
import { fadeUp, revealViewport, staggerChildren } from "@/lib/motion";

export const ProjectsSection = () => {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <section className="pb-10 pt-5 px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={staggerChildren}
        className="mx-auto max-w-3xl"
      >
        <motion.h2
          variants={fadeUp}
          className="mb-6 text-[15px] font-semibold text-slate-900"
        >
          Work
        </motion.h2>

        <motion.div
          variants={staggerChildren}
          className="mt-8 grid grid-cols-1 justify-items-center gap-x-10 gap-y-8 md:grid-cols-2 md:justify-items-start xl:grid-cols-2"
        >
          {projects.map((project) => (
            <motion.div key={project.slug} variants={fadeUp} className="w-full">
              <Link href={`/projects/${project.slug}`} className="w-full">
                <ProjectCard
                  project={project}
                  isDimmed={hoveredSlug !== null && hoveredSlug !== project.slug}
                  onMouseEnter={() => setHoveredSlug(project.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
