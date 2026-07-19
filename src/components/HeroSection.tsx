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
    <section className="relative min-h-screen overflow-hidden py-10">
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
                  src="/images/tomi.jpeg"
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
                I enjoy solving complex problems through thoughtful engineering.
                Creating scalable applications, designing maintainable
                architectures, and crafting user experiences that feel
                effortless. To me, great software isn't just about working
                correctly, it's about being reliable, responsive, accessible,
                and genuinely enjoyable to use.
              </p>
              <div>
                Over the past year, I've worked with early-stage startups,
                shipping real products with React, Next.js, TypeScript, Tailwind
                CSS, and modern frontend tooling. I currently work as a Software
                Engineer at
                <Link
                  href={"https://www.leadsageafrica.com/"}
                  target="_blank"
                  className="inline-flex items-center gap-1 group mx-1 transition-all duration-400 font-bold"
                >
                  <span className="hidden bg-green-700 group-hover:block">
                    <img
                      src="/images/logo.webp"
                      alt="LeadSage Africa Logo"
                      className="w-8 h-3 object-cover"
                    />
                  </span>
                  <span className="group-hover:translate-x-0.5 transform transition-transform duration-300 group-hover:text-green-700">
                    LeadSage Africa
                  </span>
                </Link>
              </div>
              <p>
                where I collaborate closely with designers, engineers, and
                product teams to build and improve a PropTech platform that
                helps Nigerians find, secure, and save toward their next home.
                My work spans developing new features, redesigning product
                dashboards, translating design systems into polished interfaces,
                and contributing through collaborative GitHub workflows.
              </p>

              <div>
                I've also served as the Co-lead Creators Community at
                <Link
                  href={"https://hebronstartup.com/"}
                  target="_blank "
                  className="inline-flex items-center gap-1 group mx-1 transition-all duration-400 font-bold"
                >
                  <span className="hidden group-hover:block">
                    <img
                      src="/images/hsl.png"
                      alt="Echo Logo"
                      className="w-2.5 h-2.5 object-cover"
                    />
                  </span>
                  <span className="group-hover:translate-x-0.5 transform transition-transform duration-300 group-hover:text-[#61CE70]">
                    Hebron Startup Lab
                  </span>
                </Link>
                <p>
                  A community focused on fostering growth and development as a
                  tech enthusiast. Leading a diverse group of tech-driven
                  individuals, helping them navigate the collaborative,
                  fast-pased environment of working within a tech startup.
                </p>
              </div>

              <p>
                While I'm most comfortable building with React, Next.js,
                Node.js, TypeScript and many other tools, I believe my greatest
                strength is my ability to understand systems deeply, learn
                unfamiliar technologies quickly, and adapt to new challenges
                with confidence. I enjoy working with ambitious teams that care
                about clean architecture, thoughtful product design, and
                building software that creates lasting impact.
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
