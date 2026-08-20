"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LuCheck, LuCopy } from "react-icons/lu";
import { ContactSection } from "@/components/ContactSection";
import { ProjectNavigation } from "@/components/ProjectNavigation";
import { fadeUp } from "@/lib/motion";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const email = "obasantomilola@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy email:", error);
    }
  };

  return (
    <main className="bg-white text-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 md:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mx-auto max-w-3xl"
        >
          <ProjectNavigation />
        </motion.div>

        <ContactSection />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-10 flex flex-col items-center justify-center gap-4"
        >
          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 rounded-full bg-slate-200 px-3 py-2 text-xs font-medium uppercase text-slate-950
              transition-all duration-300 ease-out
              hover:-translate-y-0.5 hover:bg-slate-700 hover:text-white
              active:scale-90
              "
          >
            <span className="transition-all duration-200 ease-out">
              {copied ? <LuCheck /> : <LuCopy />}
            </span>

            <span className="transition-all duration-200 ease-out">
              {copied ? "COPIED" : "COPY EMAIL ADDRESS"}
            </span>
          </button>
        </motion.div>
      </div>
    </main>
  );
}
