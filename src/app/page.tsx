import { AboutContact } from "@/components/AboutContact";
import { Hero } from "@/components/Hero";
import { ModeProvider } from "@/components/ModeContext";
import { ProjectStack } from "@/components/ProjectStack";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SkillsExperience } from "@/components/SkillsExperience";

export default function Home() {
  return (
    <ModeProvider>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-24 pt-12">
        <Hero />
        <ProjectStack />
        <SkillsExperience />
        <AboutContact />
      </main>
      <SiteFooter />
    </ModeProvider>
  );
}
