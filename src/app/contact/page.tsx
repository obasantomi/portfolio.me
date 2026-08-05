import { ContactSection } from "@/components/ContactSection";
import { ProjectNavigation } from "@/components/ProjectNavigation";

export const metadata = {
  title: "Contact | Tomilola Obasan",
  description:
    "Get in touch with software engineer Tomilola Obasan for projects and roles.",
};

export default function ContactPage() {
  return (
    <main className="bg-white text-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <ProjectNavigation />
        </div>
        <ContactSection />
      </div>
    </main>
  );
}
