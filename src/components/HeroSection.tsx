"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
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
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    if (!isProfileOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow || "";
    };
  }, [isProfileOpen]);

  useEffect(() => {
    if (!isProfileOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isProfileOpen]);

  return (
    <section className="relative min-h-screen overflow-hidden py-10">
      <AnimatePresence>
        {isProfileOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-white/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.button
              type="button"
              layoutId="hero-profile-image"
              onClick={() => setIsProfileOpen(false)}
              aria-label="Close profile image"
              className="relative z-10 w-full max-w-[min(90vw,28rem)] aspect-square max-h-[min(90vh,28rem)] overflow-hidden rounded-[1.75rem] bg-white shadow-2xl ring-1 ring-slate-200"
              style={{ cursor: "pointer" }}
            >
              <Image
                src="/images/tomi.jpeg"
                alt="Profile"
                fill
                className="object-cover"
              />
            </motion.button>
          </motion.div>
        ) : null}
      </AnimatePresence>

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
              <motion.button
                type="button"
                layoutId="hero-profile-image"
                onClick={() => setIsProfileOpen(true)}
                aria-label="View profile image"
                className="relative h-11.5 w-11.5 overflow-hidden rounded-full cursor-pointer"
              >
                <Image
                  src="/images/tomi.jpeg"
                  alt="Profile"
                  fill
                  className="object-cover"
                  sizes="46px"
                />
              </motion.button>
              <div className="flex flex-col">
                <h1 className="text-[20px]">Tomilola Obasan</h1>
                <p
                  className="text-[13px] font-semibold text-neutral-600"
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                  }}
                >
                  Software Engineer
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
              <p>I'm a Full-Stack Engineer based in Lagos, Nigeria.</p>
              <div>
                Over the past year, I've worked with early-stage startups,
                shipping real products with React, Next.js, TypeScript, Tailwind
                CSS, and modern frontend tooling. I currently work as a Software
                Engineer at
                <Link
                  href={"https://www.leadsageafrica.com/"}
                  target="_blank"
                  className="inline-flex relative items-center gap-1 group mx-1 transition-all duration-400 font-bold"
                >
                  <span className="absolute left-0 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
                    <img
                      src="/images/LeadSage.png"
                      alt="LeadSage Africa Logo"
                      className="h-4 object-cover"
                    />
                  </span>
                  <span className="group-hover:translate-x-5 transform transition-transform duration-300 group-hover:text-green-700">
                    LeadSage Africa
                  </span>
                </Link>
              </div>
              <p>
                Where I collaborate closely with designers, engineers, and
                product teams to build and improve a PropTech platform that
                helps Nigerians find, secure, and save toward their next home.
              </p>
              <p>
                My work at LeadSage spans designing and developing full-stack
                features, building scalable backend services and APIs, crafting
                polished user interfaces from design systems, redesigning
                product dashboards, integrating third-party services, and
                contributing through collaborative GitHub workflows.
              </p>
              <p>
                Recently, I Designed and implemented a scalable AI chatbot using
                Node.js, NestJS, Google GenAI, Redis Cloud, and BullMQ,
                leveraging background workers and queue processing to deliver
                personalized WhatsApp conversations while maintaining fast API
                response times.
              </p>

              <div>
                Previously, I worked as a Core Front-End Engineer at
                <Link
                  href={"https://www.echo-ng.com/"}
                  target="_blank "
                  className="inline-flex relative items-center gap-1 group mx-1 transition-all duration-400 font-bold"
                >
                  <span className="absolute left-0 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
                    <img
                      src="/images/echo.svg"
                      alt="Echo Logo"
                      className="h-3.5 object-cover"
                    />
                  </span>
                  <span className="group-hover:translate-x-4 transform transition-transform duration-300 group-hover:text-[#ff9c23]">
                    Echo
                  </span>
                </Link>
                <p>
                  A B2B platform that contributes to the development of a social
                  impact platform that rewards meaningful community engagement.
                </p>
              </div>

              <div>
                I also worked across a broader product, an AI-powered learning
                platform called
                <Link
                  href={"https://analytica-app-flame.vercel.app/"}
                  target="_blank "
                  className="inline-flex relative items-center gap-1 group mx-1 transition-all duration-400 font-bold"
                >
                  <span className="absolute left-0 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
                    <img
                      src="/analytica.svg"
                      alt="Analytica Logo"
                      className="h-3.5 object-cover"
                    />
                  </span>
                  <span className="group-hover:translate-x-4 transform transition-transform duration-300 group-hover:text-[#0d4083]">
                    Analytica
                  </span>
                </Link>
                <p>
                  where I focused on building practical learning experiences
                  through AI-generated analytics tasks, real-world datasets,
                  personalized AI guidance, and performance tracking.
                </p>
                <p className="mt-4">
                  More than just building features, the project pushed me to
                  think about how software should work, how users should
                  experience it, and how the product could scale beyond an MVP.
                </p>
              </div>
              <p>
                I'm currently on the search for my next full-time role as a
                software engineer, surrounded by really talented people who'll
                push me to grow.
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
