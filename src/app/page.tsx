import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BentoGrid } from "@/components/BentoGrid";
import { CommunityMarquee } from "@/components/CommunityMarquee";
import { CompactEventCard } from "@/components/EventCard";
import { Hero } from "@/components/Hero";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { SectionHeading } from "@/components/SectionHeading";
import { StageGallery } from "@/components/StageGallery";
import { Stats } from "@/components/Stats";
import { VelocityMarquee } from "@/components/motion/VelocityMarquee";
import { FEATURED_EVENTS } from "@/data/events";
import { FEATURED_PROJECTS } from "@/data/projects";

const SHOWCASE_PROJECTS = FEATURED_PROJECTS.filter((project) => project.image);

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-12 md:gap-36">
      <div className="flex flex-col gap-14 md:gap-20">
        <Hero />
        <CommunityMarquee />
      </div>

      <section className="container mx-auto px-6 md:px-12">
        <Stats />
      </section>

      <section className="container mx-auto px-6 md:px-12">
        <SectionHeading
          eyebrow="Expertise"
          title="What I do"
          subtitle="Building products, speaking on stage, and growing developer communities."
        />
        <BentoGrid />
      </section>

      <VelocityMarquee />

      <section className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="Featured Projects"
            subtitle="A selection of production applications from my public GitHub work."
          />
          <Link href="/projects" className="hidden md:flex items-center text-brand-primary hover:text-brand-secondary transition-colors font-medium mb-16">
            View all projects <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <ProjectShowcase projects={SHOWCASE_PROJECTS} />

        <div className="mt-8 text-center md:hidden">
          <Link href="/projects" className="inline-flex items-center text-brand-primary hover:text-brand-secondary transition-colors font-medium">
            View all projects <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end">
          <SectionHeading
            eyebrow="On stage"
            title="In the room"
            subtitle="Judging hackathons, mentoring builders, and organizing community events."
          />
          <Link href="/events" className="hidden md:flex items-center text-brand-primary hover:text-brand-secondary transition-colors font-medium mb-16">
            See every event <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <StageGallery />
      </section>

      <section className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end">
          <SectionHeading
            eyebrow="Community"
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
    </div>
  );
}
