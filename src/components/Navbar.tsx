"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import BackgroundAudio from "@/components/BackgroundAudio";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="text-xl font-bold">
          Tomilola
          <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500">
            .
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-slate-900 hover:text-slate-600"
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="text-sm font-medium text-slate-900 hover:text-slate-600"
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-slate-900 hover:text-slate-600"
          >
            Contact
          </Link>
          {/* <BackgroundAudio src="https://www.victorwilliams.me/audio/bg-jazz-2.mp3" /> */}
        </nav>

        <div className="hidden md:block">
          <BackgroundAudio src="https://www.victorwilliams.me/audio/bg-jazz-2.mp3" />
        </div>

        <button
          aria-label="Toggle navigation"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="sr-only">Menu</span>
          <div className="relative h-5 w-5">
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="absolute left-0 top-0 block h-0.5 w-5 bg-slate-900"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={{ opacity: isOpen ? 0 : 1 }}
              className="absolute left-0 top-2.5 block h-0.5 w-5 bg-slate-900"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="absolute left-0 top-5 block h-0.5 w-5 bg-slate-900"
              transition={{ duration: 0.2 }}
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden"
          >
            <div className="space-y-1 border-t border-slate-200 bg-white px-4 py-3">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100"
              >
                Home
              </Link>
              <Link
                href="/projects"
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100"
              >
                Projects
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
