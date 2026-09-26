import { AboutContact } from "@/components/AboutContact";
import { CursorFollower } from "@/components/CursorFollower";
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
      {/* Hero sits outside <main> so it can bleed to the viewport edges. */}
      <Hero />
      {/* Negative top margin cancels the hero track's blank tail, so Work
          arrives exactly as the hero finishes collapsing (no empty screen). */}
      <main className="relative z-10 -mt-[calc(100svh-6rem)] mx-auto w-full max-w-6xl flex-1 px-6 pb-24 pt-24">
        <ProjectStack />
        <SkillsExperience />
        <AboutContact />
      </main>
      <SiteFooter />
      <CursorFollower />
    </ModeProvider>
  );
}
