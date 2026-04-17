import Description from "@/components/about/description.component";
import Profile from "@/components/about/profile.component";
import Experience from "@/components/about/experience.component";
import Projects from "@/components/about/projects.component";
import Footer from "@/components/about/footer.component";
import Education from "@/components/about/education.component";
import Skills from "@/components/about/skills.component";

export default function About() {
  return (
    <main className="relative overflow-hidden bg-base-100 text-base-content">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute right-0 top-32 h-112 w-md rounded-full bg-secondary/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-24 px-6 py-12 md:px-10 lg:px-12 lg:py-20">
        <Description />
        <Profile />
        <Experience />
        <Projects />
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Education />
          <Skills />
        </div>
        <Footer />
      </div>
    </main>
  );
}
