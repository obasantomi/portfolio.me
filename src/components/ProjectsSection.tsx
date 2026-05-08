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
import Link from "next/link";

export const ProjectsSection = () => {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <section className="px-4 pb-20 pt-5 sm:px-6 md:px-8">
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

        <div className="mt-8 grid justify-items-start grid-cols-1 gap-y-8  md:grid-cols-2 xl:grid-cols-2">
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

        {/* Backend & Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <h3 className="mb-6 text-[15px] font-semibold text-slate-900">
            Backend & Tools
          </h3>
          <div className="flex flex-wrap gap-5">
            {Array.from(
              new Set(
                projects
                  .filter((project) => project.backendTools)
                  .flatMap((project) => project.backendTools!),
              ),
            ).map((tool) => (
              <span
                key={tool}
                className="rounded-full bg-[#f1f1f1] px-4 py-2 text-[13px] text-black"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
