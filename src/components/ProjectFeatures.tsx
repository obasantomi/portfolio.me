"use client";

import { motion } from "framer-motion";
import { fadeUp, revealViewport, staggerChildren } from "@/lib/motion";

interface ProjectFeaturesProps {
  features: string[];
}

export function ProjectFeatures({ features }: ProjectFeaturesProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={staggerChildren}
      className="mt-16"
    >
      <motion.div variants={fadeUp} className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          Features
        </h2>
        <p className="max-w-2xl text-[11px] md:text-sm md:leading-7 text-slate-600">
          What makes this project feel polished, purposeful, and built for real
          users.
        </p>
      </motion.div>

      <motion.div variants={staggerChildren} className="mt-4 space-y-6">
        {features.map((feature, index) => (
          <motion.article
            key={`${feature}-${index}`}
            variants={fadeUp}
            className="rounded-3xl border border-slate-200 bg-slate-50/80 p-2 md:p-5"
          >
            <div className="flex items-center gap-2">
              <span className="h-1 w-1 shrink-0 rounded-full bg-slate-900" />
              <p className="text-[10px] md:text-sm text-slate-900">{feature}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
