import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Tomilola Obasan about full-time roles or contract work.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactSection headingLevel="h1" />;
}
