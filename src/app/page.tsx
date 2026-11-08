import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { CompactEventCard } from "@/components/EventCard";
import { CommunityMarquee } from "@/components/CommunityMarquee";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { FEATURED_PROJECTS } from "@/data/projects";
import { FEATURED_EVENTS } from "@/data/events";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 md:gap-32">
      <Hero />

      <section className="container mx-auto px-6 md:px-12">
        <Stats />
      </section>

      <CommunityMarquee />

      <section className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-12">
          <SectionHeading
            title="Featured Projects"
            subtitle="A selection of production applications from my public GitHub work."
          />
          <Link href="/projects" className="hidden md:flex items-center text-brand-primary hover:text-brand-secondary transition-colors font-medium mb-16">
            View all projects <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_PROJECTS.slice(0, 3).map((project, index) => (
            <ProjectCard key={project.githubUrl} {...project} index={index} />
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link href="/projects" className="inline-flex items-center text-brand-primary hover:text-brand-secondary transition-colors font-medium">
            View all projects <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-12">
          <SectionHeading
            title="Featured Talks & Events"
            subtitle="Selected highlights from speaking, judging, mentoring, and building tech communities."
          />
          <Link href="/events" className="hidden md:flex items-center text-brand-primary hover:text-brand-secondary transition-colors font-medium mb-16">
            View all events <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_EVENTS.map((event, index) => (
            <CompactEventCard key={event.title} {...event} index={index} />
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link href="/events" className="inline-flex items-center text-brand-primary hover:text-brand-secondary transition-colors font-medium">
            View all events <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-6 md:px-12 pb-24">
        <div className="bg-card-bg border border-card-border rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-brand-primary/20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-brand-secondary/20 blur-3xl rounded-full" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Let&apos;s build something amazing together</h2>
            <p className="text-lg text-foreground/70 mb-10">
              Whether you need a full-stack developer for your next project, or a speaker for your upcoming tech event, I&apos;m always open to new opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-brand-primary text-white hover:bg-brand-primary/90 rounded-full font-semibold transition-colors flex items-center justify-center"
              >
                Get in Touch
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 bg-transparent border border-card-border hover:bg-card-border text-white rounded-full font-semibold transition-colors flex items-center justify-center"
              >
                <FileText className="w-4 h-4 mr-2" />
                Read My Story
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
