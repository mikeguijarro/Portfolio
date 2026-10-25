import { CarouselLogos } from "@/components/carousel-logos";
import { ProjectsSection } from "./(landing)/_sections/projects";
import { HeroSection } from "./(landing)/_sections/hero";
import { AboutMeSection } from "./(landing)/_sections/about-me";
import { ContactSection, SiteFooter } from "./(landing)/_sections/footer";
import { SkillsSection } from "./(landing)/_sections/skills";
import { CaseStudyLink, MobileBar, RailLeft, RailRight } from "./(landing)/_components/site-rails";
import { SECTIONS } from "./(landing)/contact";
import { sectionClassName } from "./(landing)/_components/section-heading";

// 12-column frame from DESIGN.md: rails in columns 1–2 and 11–12, content in 3–10.
export default function Home() {
  return (
    <div id="top" className="mx-auto grid w-full max-w-frame grid-cols-frame gap-x-4 px-4 xl:px-6">
      <RailLeft sections={SECTIONS}>
        <CaseStudyLink />
      </RailLeft>

      <main className="col-span-12 row-start-1 flex min-w-0 flex-col gap-20 pb-24 lg:col-span-8 lg:col-start-3 lg:gap-24 lg:pb-32 lg:pt-content-start">
        <div>
          <MobileBar sections={SECTIONS}>
            <CaseStudyLink />
          </MobileBar>
          <HeroSection />
        </div>
        <CarouselLogos />
        <section id="skills" aria-labelledby="skills-title" className={sectionClassName}>
          <SkillsSection />
        </section>
        <section id="projects" aria-labelledby="projects-title" className={sectionClassName}>
          <ProjectsSection />
        </section>
        <section id="about" aria-labelledby="about-title" className={sectionClassName}>
          <AboutMeSection />
        </section>
        <section id="contact" aria-labelledby="contact-title" className={sectionClassName}>
          <ContactSection />
        </section>
      </main>

      <RailRight />

      <footer className="col-span-12">
        <SiteFooter />
      </footer>
    </div>
  );
}
