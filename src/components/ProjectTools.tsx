"use client";

import { motion } from "framer-motion";
import { fadeUp, revealViewport, staggerChildren } from "@/lib/motion";

interface ProjectToolsProps {
  tech: string[];
}

export function ProjectTools({ tech }: ProjectToolsProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={staggerChildren}
      className="mt-16 border-t border-slate-200 pt-10"
    >
      <motion.div variants={fadeUp} className="space-y-1 md:space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          Tools
        </h2>
        <p className="max-w-2xl text-[11px] md:text-sm md:leading-7 text-slate-600">
          A concise overview of the technologies that powered this case study.
        </p>
      </motion.div>

      <motion.div variants={staggerChildren} className="mt-6 flex flex-wrap gap-3">
        {tech.map((tool) => (
          <motion.span
            key={tool}
            variants={fadeUp}
            className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
          >
            {tool}
          </motion.span>
        ))}
      </motion.div>
    </motion.section>
  );
}
