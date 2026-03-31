"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import profilePic from "../../public/images/IMG_6174.jpeg";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const HeroSection = () => {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={container}
      className="relative flex min-h-[calc(100vh-72px)] items-center justify-center px-4 pt-24 pb-16 sm:px-6 md:px-8"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <motion.div
          variants={item}
          className="relative mb-8 h-32 w-32 overflow-hidden rounded-full border border-slate-200 shadow-lg"
        >
          <Image
            src={profilePic}
            alt="Profile"
            fill
            className="object-cover"
            sizes="128px"
          />
        </motion.div>

        <motion.h1
          variants={item}
          className="text-4xl font-extrabold outline-0 text-slate-900 sm:text-6xl"
        >
          Tomilola Obasan
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-4 text-lg font-medium text-slate-600 sm:text-xl"
        >
          Software Engineer · AI Engineer · Builder
        </motion.p>

        <motion.p
          variants={item}
          className="mt-4 max-w-2xl text-sm text-slate-500 sm:text-base"
        >
          Passionate about building clean, scalable web experiences with modern
          tooling and AI-driven problem solving.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-lg border border-transparent bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white transition hover:scale-105 hover:shadow-lg"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:scale-105 hover:bg-slate-100"
          >
            Contact Me
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};
