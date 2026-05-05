"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";

const PROJECTS = [
  {
    title: "HireSphere Social Manager",
    description: "An AI-powered social media management dashboard built for personal brands. Features event scheduling, content creation, and analytics to track community growth.",
    tags: ["Next.js", "Tailwind CSS", "Supabase", "OpenAI"],
    githubUrl: "https://github.com",
    liveUrl: "https://hiresphere.example.com",
  },
  {
    title: "DevConnect Community Portal",
    description: "A central hub for developers to find local events, join discussions, and collaborate on open source projects. Built with real-time chat functionality.",
    tags: ["React", "Node.js", "PostgreSQL", "Socket.io"],
    githubUrl: "https://github.com",
  },
  {
    title: "AI Resume Builder",
    description: "A web application that takes user input and generates ATS-friendly resumes using Gemini API to optimize bullet points.",
    tags: ["Next.js", "TypeScript", "Gemini API", "Tailwind"],
    githubUrl: "https://github.com",
    liveUrl: "https://resume-ai.example.com",
  },
  {
    title: "Portfolio CMS Template",
    description: "An open-source portfolio template for developers. Includes a Notion-like CMS interface built from scratch for easy content updates.",
    tags: ["Vue", "Nuxt", "Firebase", "CSS Modules"],
    githubUrl: "https://github.com",
  },
];

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-6 md:px-12 py-12">
      <SectionHeading 
        title="My Projects" 
        subtitle="A collection of applications, tools, and experiments I've built to solve problems and learn new technologies." 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={index} {...project} index={index} />
        ))}
      </div>
    </div>
  );
}
