import type { IconType } from "react-icons";
import { FaGithub, FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { HiArrowUpRight, HiOutlineDocumentText } from "react-icons/hi2";
import { Container, cx } from "@/components/ui/primitives";
import { profile, socialLinks } from "@/data/profile";
import { ContactForm } from "./ContactForm";
import { CopyEmailButton } from "./CopyEmailButton";
import { LagosTimeNote } from "./LagosTimeNote";

const channelIcons: Record<(typeof socialLinks)[number]["label"], IconType> = {
  LinkedIn: FaLinkedinIn,
  GitHub: FaGithub,
  X: FaXTwitter,
  WhatsApp: FaWhatsapp,
};

const channels = [
  ...socialLinks.map((link) => ({ ...link, Icon: channelIcons[link.label] })),
  { label: "Résumé", href: profile.resumeUrl, handle: "Download PDF", Icon: HiOutlineDocumentText },
];

export function ContactSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className={cx(
        "py-24 md:py-36",
        headingLevel === "h1" ? "pt-32 md:pt-40" : "border-t border-line",
      )}
    >
      <Container>
        <p className="inline-flex items-center gap-2.5 text-sm font-medium text-success">
          <span aria-hidden className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-success/60" />
            <span className="relative size-2 rounded-full bg-success" />
          </span>
          {profile.availability}
        </p>

        <Heading
          id="contact-title"
          className="mt-6 max-w-5xl font-display text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.98] tracking-[-0.03em] text-balance"
        >
          Have a role in mind? Let&apos;s talk.
        </Heading>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted md:text-xl">
          {profile.availabilityDetail} Email is the fastest way to reach me.
        </p>

        <div className="mt-10">
          <CopyEmailButton />
        </div>

        <div className="mt-20 grid grid-cols-1 gap-16 md:mt-28 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <h3 className="text-sm font-medium text-muted">Elsewhere</h3>
            <ul className="mt-4 border-t border-line">
              {channels.map(({ label, href, handle, Icon }) => (
                <li key={label} className="border-b border-line">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-14 items-center gap-4 py-3"
                  >
                    <Icon
                      aria-hidden
                      className="size-[18px] shrink-0 text-muted transition-colors duration-200 group-hover:text-accent"
                    />
                    <span className="font-medium">{label}</span>
                    <span className="ml-auto truncate text-sm text-muted transition-colors duration-200 group-hover:text-fg">
                      {handle}
                    </span>
                    <HiArrowUpRight
                      aria-hidden
                      className="size-4 shrink-0 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <LagosTimeNote className="mt-6" />
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <h3 className="font-display text-2xl tracking-[-0.02em] md:text-3xl">Send a message</h3>
            <p className="mt-2 text-muted">Tell me about the role or project, and I&apos;ll get back to you.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
