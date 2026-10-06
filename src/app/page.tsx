import { ContactSection } from "@/components/contact/ContactSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { Hero } from "@/components/home/Hero";
import { WorkSection } from "@/components/home/WorkSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WorkSection />
      <ExperienceSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
