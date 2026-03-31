import { ProjectsSection } from "@/components/ProjectsSection";

export const metadata = {
  title: "Projects | Tomilola Obasan",
  description: "A showcase of software projects created by Tomilola Obasan.",
};

export default function ProjectsPage() {
  return (
    <main className="bg-white text-slate-900">
      <ProjectsSection />
    </main>
  );
}
