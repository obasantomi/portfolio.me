import { ContactSection } from "@/components/ContactSection";

export const metadata = {
  title: "Contact | Tomilola Obasan",
  description:
    "Get in touch with software engineer Tomilola Obasan for projects and roles.",
};

export default function ContactPage() {
  return (
    <main className="bg-white text-slate-900">
      <ContactSection />
    </main>
  );
}
