"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { ARCHIVED_PROJECTS, FEATURED_PROJECTS } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-6 md:px-12 py-12">
      <SectionHeading
        as="h1"
        title="My Projects"
        subtitle="Production applications and selected experiments from my public GitHub work. Every entry links to its real repository."
      />

      <section aria-labelledby="featured-projects">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary mb-2">
            Selected work
          </p>
          <h2 id="featured-projects" className="text-2xl md:text-3xl font-bold">
            Featured deployments
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURED_PROJECTS.map((project, index) => (
            <ProjectCard key={project.githubUrl} {...project} index={index} />
          ))}
        </div>
      </section>

      <section aria-labelledby="project-archive" className="mt-20">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-secondary mb-2">
            Learning & exploration
          </p>
          <h2 id="project-archive" className="text-2xl md:text-3xl font-bold">
            Project archive
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARCHIVED_PROJECTS.map((project, index) => (
            <ProjectCard key={project.githubUrl} {...project} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
