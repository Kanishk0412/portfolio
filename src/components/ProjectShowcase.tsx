"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { PortfolioProject } from "@/data/projects";
import { trackCursorGlow } from "@/lib/motion";

function ShowcaseCard({
  project,
  index,
  total,
  progress,
}: {
  project: PortfolioProject;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each card recedes slightly as the next one slides over it.
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - index - 1) * 0.04]);

  return (
    <div className="showcase-sticky" style={{ top: `${6 + index * 1.25}rem` }}>
      <motion.article
        style={{ scale, transformOrigin: "top center" }}
        onPointerMove={trackCursorGlow}
        className="card-glow group grid overflow-hidden rounded-3xl border border-card-border bg-card-bg shadow-2xl shadow-black/40 lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="flex flex-col p-7 md:p-10">
          <div className="mb-8 flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.16em]">
            <span className="text-brand-primary">{project.category}</span>
            <span className="shrink-0 font-mono text-foreground/40">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
          <h3 className="mb-4 text-3xl font-bold md:text-4xl">{project.title}</h3>
          <p className="mb-6 leading-relaxed text-foreground/70">{project.description}</p>
          <ul className="mb-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-card-border bg-background px-3 py-1 text-xs font-medium text-foreground/80">
                {tag}
              </li>
            ))}
          </ul>
          <div className="relative z-10 mt-auto flex flex-wrap items-center gap-5 text-sm font-semibold">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-brand-primary"
              >
                Visit site
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </Link>
            )}
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground"
            >
              <FaGithub className="h-4 w-4" aria-hidden="true" />
              Source code
            </Link>
          </div>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden bg-background/60 lg:aspect-auto lg:min-h-[26rem]">
          <div className="absolute inset-x-5 top-5 bottom-0 overflow-hidden rounded-t-xl border border-b-0 border-white/10 md:inset-x-8 md:top-8">
            <div className="flex h-7 items-center gap-1.5 bg-zinc-900 px-3" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={`${project.title} homepage`}
              loading="lazy"
              decoding="async"
              className="h-[calc(100%-1.75rem)] w-full object-cover object-top transition-transform duration-700 motion-safe:group-hover:scale-[1.03]"
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

/** Featured projects as cards that stack on top of each other while scrolling. */
export function ProjectShowcase({ projects }: { projects: PortfolioProject[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="flex flex-col gap-6 md:gap-20">
      {projects.map((project, index) => (
        <ShowcaseCard
          key={project.githubUrl}
          project={project}
          index={index}
          total={projects.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}
