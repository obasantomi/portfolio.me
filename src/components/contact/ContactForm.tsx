"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { buttonClass, cx } from "@/components/ui/primitives";
import { profile } from "@/data/profile";
import { EASE_OUT } from "@/lib/motion";

const FORM_ENDPOINT = "https://formspree.io/f/xvzvrnrv";

const topics = ["Full-time role", "Contract work", "Something else"] as const;

const contactSchema = z.object({
  topic: z.enum(topics),
  name: z.string().trim().min(2, "Enter your name so I know who I'm replying to."),
  email: z.email("Enter an email address I can reply to, like name@company.com."),
  message: z.string().trim().min(10, "Tell me a little more. A sentence or two is enough."),
});

type ContactFormValues = z.infer<typeof contactSchema>;
type SubmitStatus = "idle" | "sent" | "failed";

// Underline-only fields: no box or focus ring. The underline darkens on hover
// and turns solid on focus, which is enough to show where the cursor is.
const fieldClass =
  "mt-1 block w-full appearance-none rounded-none border-0 border-b border-line bg-transparent px-0 py-3 text-base text-fg placeholder:text-muted/60 transition-colors duration-200 hover:border-muted focus:border-fg focus:outline-none focus-visible:outline-none aria-invalid:border-red-500";

const labelClass = "text-sm text-muted";

export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { topic: topics[0] },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("idle");
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(`Form endpoint responded ${response.status}`);
      setStatus("sent");
      reset({ topic: values.topic, name: "", email: "", message: "" });
    } catch {
      setStatus("failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <fieldset>
        <legend className={labelClass}>What&apos;s this about?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {topics.map((topic) => (
            <label key={topic} className="group cursor-pointer">
              <input type="radio" value={topic} className="peer sr-only" {...register("topic")} />
              <span className="inline-flex min-h-10 items-center rounded-full border border-line bg-surface px-4 text-sm text-muted transition-colors duration-150 group-hover:border-muted group-hover:bg-surface-2 group-hover:text-fg peer-checked:border-fg peer-checked:bg-fg peer-checked:text-bg peer-checked:group-hover:border-fg peer-checked:group-hover:bg-fg/85 peer-checked:group-hover:text-bg peer-focus-visible:border-fg">
                {topic}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={fieldClass}
            {...register("name")}
          />
          {errors.name ? (
            <p id="contact-name-error" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              {errors.name.message}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={fieldClass}
            {...register("email")}
          />
          {errors.email ? (
            <p id="contact-email-error" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              {errors.email.message}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          rows={4}
          placeholder="The role or project, and how I can help"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={cx(fieldClass, "min-h-28 resize-none")}
          {...register("message")}
        />
        {errors.message ? (
          <p id="contact-message-error" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={isSubmitting} className={buttonClass("primary", "min-h-12 px-6 disabled:opacity-60")}>
          {isSubmitting ? (
            <>
              <span
                aria-hidden
                className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
              />
              Sending
            </>
          ) : (
            "Send message"
          )}
        </button>

        <div aria-live="polite" className="min-h-6 text-sm">
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.p
                key="sent"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                className="text-success"
              >
                Message sent. I&apos;ll get back to you soon.
              </motion.p>
            ) : null}
            {status === "failed" ? (
              <motion.p
                key="failed"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                className="text-red-600 dark:text-red-400"
              >
                Your message didn&apos;t send. Try again, or email me at {profile.email}.
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}
