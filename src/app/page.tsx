import { CarouselLogos } from "@/components/carousel-logos";
import { ProjectsSection } from "./(landing)/_sections/projects";
import { HeroSection } from "./(landing)/_sections/hero";
import { AboutMeSection } from "./(landing)/_sections/about-me";
import { FooterSection } from "./(landing)/_sections/footer";
import { SkillsSection } from "./(landing)/_sections/skills";


export default function Home() {
  return (
    <main className="container">
      <HeroSection />
      <CarouselLogos />
      <div className="pt-24">
        <SkillsSection />
      </div>
      <div className="pt-24">
        <ProjectsSection />
      </div>
      <div className="pt-24">
        <AboutMeSection />
      </div>
      <div className="pt-24">
        <FooterSection />
      </div>
    </main>
  );
}
