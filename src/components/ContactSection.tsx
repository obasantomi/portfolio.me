"use client";

import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaFilePdf,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ContactMediaCard } from "@/components/ContactMediaCard";
import Toast from "@/components/Toast";
import { fadeUp, staggerChildren } from "@/lib/motion";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const FORM_ENDPOINT = "https://formspree.io/f/xvzvrnrv";

const contacts = [
  {
    icon: FaEnvelope,
    label: "Email",
    href: "mailto:obasantomilola@gmail.com",
    text: "obasantomilola@gmail.com",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    href: "https://wa.me/2348134595301",
    text: "+2348134595301",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/tomilola-obasan",
    text: "linkedin.com/in/tomilola-obasan",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/obasantomi",
    text: "github.com/obasantomi",
  },
];

export const ContactSection = () => {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [serverError, setServerError] = useState<string>("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  useEffect(() => {
    if (!toastOpen) return;
    const timer = window.setTimeout(() => setToastOpen(false), 4000);
    return () => window.clearTimeout(timer);
  }, [toastOpen]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
  });

  const onSubmit = async (values: ContactFormData) => {
    setStatus("submitting");
    setServerError("");

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Submission failed");
      }

      setStatus("success");
      setToastType("success");
      setToastMessage("Message sent successfully! Thanks for reaching out.");
      setToastOpen(true);
      reset();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      setStatus("error");
      setServerError(errorMessage);
      setToastType("error");
      setToastMessage(`Failed to send message: ${errorMessage}`);
      setToastOpen(true);
    }
  };

  return (
    <section className="px-4 pb-24 pt-24 sm:px-6 md:px-8" id="contact">
      <Toast
        show={toastOpen}
        type={toastType}
        message={toastMessage}
        onClose={() => setToastOpen(false)}
      />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="mx-auto max-w-4xl"
      >
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-start justify-between gap-8 md:flex-row"
        >
          <div>
            <h2 className="text-[20px] font-bold text-slate-900">
              Let&apos;s Work Together
            </h2>
            <p className=" mb-4 max-w-xl text-black/50 text-xs">
              Reach out via email, WhatsApp, or connect on GitHub/LinkedIn.
            </p>
          </div>
          <div className="inline-flex my-4 mb-8 md:my-0 md:mb-0 items-center gap-5 rounded-full px-3 py-2 text-sm font-semibold text-emerald-900 shadow-xs">
            <span
              className="inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_10px_rgba(16,185,129,0.1)] animate-pulse"
              aria-hidden="true"
            />
            <span>Available for work</span>
          </div>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          className="grid gap-4 sm:grid-cols-2"
        >
          {contacts.map((item) => (
            <motion.div key={item.label} variants={fadeUp}>
              <ContactMediaCard
                href={item.href}
                label={item.label}
                text={item.text}
                Icon={item.icon}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.a
          variants={fadeUp}
          href="/resume/OBASAN_TOMILOLA_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-linear-to-r bg-[#f1f1f1] px-5 py-2 text-sm font-semibold text-black transition hover:opacity-75"
        >
          <FaFilePdf className="h-3 w-3" />
          View My Resume
        </motion.a>

        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              {...register("name")}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Message
            </label>
            <textarea
              {...register("message")}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 h-62.5 text-sm outline-none"
              rows={4}
              placeholder="Send a message with your questions, ideas, or opportunities."
            />
            {errors.message && (
              <p className="mt-1 text-sm  text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>

          {status === "success" && (
            <p className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              Message sent successfully! I&apos;ll be in touch soon.
            </p>
          )}

          {status === "error" && (
            <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              Failed to send message: {serverError || "Please try again later."}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r bg-[#f1f1f1] px-5 py-2 text-sm font-semibold text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaPaperPlane className="h-3 w-3" />
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
};
