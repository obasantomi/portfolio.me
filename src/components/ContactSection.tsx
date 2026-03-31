"use client";

import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ContactMediaCard } from "@/components/ContactMediaCard";
import Toast from "@/components/Toast";

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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl"
      >
        <h2 className="mb-3 text-3xl font-bold text-slate-900">
          Let&apos;s Work Together
        </h2>
        <p className="mb-10 text-slate-600">
          Reach out via email, WhatsApp, or connect on GitHub/LinkedIn.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {contacts.map((item) => (
            <ContactMediaCard
              key={item.label}
              href={item.href}
              label={item.label}
              text={item.text}
              Icon={item.icon}
            />
          ))}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              {...register("name")}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
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
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
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
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
              rows={4}
              placeholder="Send a message with your questions, ideas, or opportunities."
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">
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
            className="inline-flex items-center justify-center rounded-lg bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 px-5 py-2 text-sm font-semibold text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </motion.div>
    </section>
  );
};
