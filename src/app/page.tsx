import Link from "next/link";
import { ArrowRight, ChevronRight, FileText } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { EventCard } from "@/components/EventCard";
import { Stats } from "@/components/Stats";
import { ProfileImage } from "@/components/ProfileImage";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 md:gap-32">
      {/* Hero Section */}
      <section className="container mx-auto px-6 md:px-12 pt-12 md:pt-24 flex flex-col items-center text-center">
        <div className="mb-8 relative inline-block">
          {/* User's professional photo will go here */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-card-border overflow-hidden bg-card-bg relative z-10 shadow-2xl">
            <ProfileImage className="w-full h-full object-cover" />
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 blur-2xl -z-10 rounded-full" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          Hi, I&apos;m Kanishk Tyagi
        </h1>
        <p className="text-xl md:text-2xl text-foreground/70 mb-10 max-w-3xl">
          Full Stack Developer | Tech Speaker | Community Builder
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/projects"
            className="px-8 py-4 bg-white text-black hover:bg-white/90 rounded-full font-semibold transition-colors flex items-center justify-center group"
          >
            View Projects
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/events"
            className="px-8 py-4 bg-card-bg border border-card-border hover:bg-card-bg/80 hover:border-brand-primary/50 text-white rounded-full font-semibold transition-colors flex items-center justify-center"
          >
            Explore Events
          </Link>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="container mx-auto px-6 md:px-12">
        <Stats />
      </section>

      {/* Featured Projects Section */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-12">
          <SectionHeading 
            title="Featured Projects" 
            subtitle="Some of my recent work in web development and AI." 
          />
          <Link href="/projects" className="hidden md:flex items-center text-brand-primary hover:text-brand-secondary transition-colors font-medium mb-16">
            View all projects <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectCard
            title="HireSphere Social Manager"
            description="An AI-powered social media management dashboard built for personal brands. Features event scheduling, content creation, and analytics."
            tags={["Next.js", "Tailwind CSS", "Supabase", "OpenAI"]}
            githubUrl="https://github.com"
            liveUrl="https://hiresphere.example.com"
            index={0}
          />
          <ProjectCard
            title="DevConnect Community Portal"
            description="A central hub for developers to find local events, join discussions, and collaborate on open source projects."
            tags={["React", "Node.js", "PostgreSQL", "Socket.io"]}
            githubUrl="https://github.com"
            index={1}
          />
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link href="/projects" className="inline-flex items-center text-brand-primary hover:text-brand-secondary transition-colors font-medium">
            View all projects <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>

      {/* Recent Events Section */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-12">
          <SectionHeading 
            title="Recent Talks & Events" 
            subtitle="I love sharing knowledge and building tech communities." 
          />
          <Link href="/events" className="hidden md:flex items-center text-brand-primary hover:text-brand-secondary transition-colors font-medium mb-16">
            View all events <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="space-y-6">
          <EventCard
            title="Building Modern Web Apps with Next.js 15"
            role="Speaker"
            organization="GDG Cloud"
            location="New Delhi, India"
            date="May 2026"
            description="A comprehensive deep dive into the new features of Next.js 15, including React Compiler and improved App Router performance."
            index={0}
          />
          <EventCard
            title="AI Hackathon 2026"
            role="Judge"
            organization="Tech University"
            location="Bangalore, India"
            date="April 2026"
            description="Judged over 50 projects focusing on generative AI and LLM implementations for social good."
            index={1}
          />
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link href="/events" className="inline-flex items-center text-brand-primary hover:text-brand-secondary transition-colors font-medium">
            View all events <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>

      {/* Quick About / CTA */}
      <section className="container mx-auto px-6 md:px-12 pb-24">
        <div className="bg-card-bg border border-card-border rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-brand-primary/20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-brand-secondary/20 blur-3xl rounded-full" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's build something amazing together</h2>
            <p className="text-lg text-foreground/70 mb-10">
              Whether you need a full-stack developer for your next project, or a speaker for your upcoming tech event, I'm always open to new opportunities.
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
