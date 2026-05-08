"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import SoundToggle from "./SoundToogle";
import { SocialLinks } from "./SocialLinks";
import { ProjectsSection } from "./ProjectsSection";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const HeroSection = () => {
  return (
    <section className="relative  min-h-screen overflow-hidden px-4 py-10">
      {/* Card */}
      <div className="relative  w-full overflow-hidden bg-white">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto flex w-full h-full max-w-225 flex-col px-8 py-12 sm:px-14"
        >
          {/* Profile */}
          <motion.div
            variants={item}
            className="flex w-full justify-between items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <div className="relative h-11.5 w-11.5 overflow-hidden rounded-full">
                <Image
                  src="/images/mee.jpeg"
                  alt="Profile"
                  fill
                  className="object-cover"
                  sizes="46px"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-[20px]">Tomilola Obasan</h1>
                <p
                  className="text-[13px] font-semibold text-neutral-600"
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                  }}
                >
                  Frontend Engineer
                </p>
              </div>
            </div>
            <div>
              <SoundToggle />
            </div>
          </motion.div>

          <div className="h-full mt-7 [scrollbar-width:none] py-4">
            <motion.div
              variants={item}
              className="space-y-5 text-[14px] leading-[2.1] text-neutral-700"
              style={{
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              <p>I'm a software engineer based in Lagos, Nigeria.</p>
              <p>
                I love building things that work beautifully — scalable
                software, clean architectures, and interfaces that feel as good
                as they perform. I believe great products are defined by their
                user experience. Much of that comes down to software
                architecture, how usable, responsive, and functional the
                software is, beyond it just working.
              </p>
              <div>
                Over the past year, I've worked with early-stage startups,
                shipping real products with React, Next.js, TypeScript, Tailwind
                CSS, and many UI frameworks. In my last role, I worked as the
                front-end engineer at a startup
                <Link
                  href={"https://www.echo-ng.com/"}
                  target="_blank"
                  className="inline-flex items-center gap-1 group mx-1 transition-all duration-400 font-bold"
                >
                  <span className="hidden group-hover:block">
                    <img
                      src="/images/echo.svg"
                      alt="Echo Logo"
                      className="w-2.5 h-2.5 object-cover"
                    />
                  </span>
                  <span className="group-hover:translate-x-0.5 transform transition-transform duration-300 group-hover:text-orange-300">
                    Echo
                  </span>
                </Link>
              </div>
              <p>
                Building a B2B SaaS product for organization management, where I
                was responsible for building and maintaining the user interface,
                collaborating with designers and backend engineers, and ensuring
                a seamless user experience.
              </p>
              <p>
                My strongest asset isn't any single tool; it's the ability to
                learn fast, adapt quickly, understand systems and software
                archietecture. and figure things out, independently, and with
                precision.
              </p>
              <p>
                I'm currently looking for my next full-time role or contract
                opportunity. Ideally somewhere technical and ambitious,
                surrounded by people who care about what they build and push
                each other to grow.
              </p>
            </motion.div>
            {/* Links */}
          </div>
          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <SocialLinks />
          </motion.div>

          {/* Spacer for smooth marquee looping */}
        </motion.div>
      </div>

      <ProjectsSection />
    </section>
  );
};
