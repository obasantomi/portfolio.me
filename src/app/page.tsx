import { AboutSection } from "@/components/AboutSection";
import { HeroSection } from "@/components/HeroSection";

export const metadata = {
  title: "Tomilola Obasan | Portfolio",
  description:
    "Portfolio of software engineer Tomilola Obasan — projects, experience, and contact details.",
};

export default function HomePage() {
  return (
    <main className="bg-white text-slate-900">
      <HeroSection />
      <AboutSection />
    </main>
  );
}
