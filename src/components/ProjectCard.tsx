"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { TiltCard } from "@/components/motion/TiltCard";
import { DURATION, EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  category?: string;
  year?: string;
  featured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  className?: string;
  index?: number;
}

export function ProjectCard({
  title,
  description,
  tags,
  category,
  year,
  featured = false,
  githubUrl,
  liveUrl,
  image,
  className,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: DURATION.base, delay: Math.min(index * 0.1, 0.4), ease: EASE_OUT }}
      className={className}
    >
      <TiltCard
        maxTilt={4}
        className={cn(
          "group flex h-full flex-col bg-card-bg border border-card-border rounded-2xl overflow-hidden hover:border-brand-primary/50 transition-colors duration-300",
          featured && "bg-gradient-to-br from-card-bg to-brand-primary/5"
        )}
      >
        {image && (
          <div className="aspect-[16/10] overflow-hidden border-b border-card-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={`${title} homepage`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-700 motion-safe:group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6 md:p-8 flex flex-col flex-1">
          {(category || year) && (
            <div className="flex items-center justify-between gap-4 mb-4 text-xs font-semibold uppercase tracking-[0.16em]">
              <span className="text-brand-primary">{category}</span>
              <span className="text-foreground/40">{year}</span>
            </div>
          )}
          <h3 className="text-xl font-bold mb-3 group-hover:text-brand-primary transition-colors">
            {title}
          </h3>
          <p className="text-foreground/70 mb-6 flex-grow">{description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-background text-foreground/80 rounded-full border border-card-border"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="relative z-10 flex items-center space-x-4 mt-auto pt-4 border-t border-card-border/50">
            {githubUrl && (
              <Link
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-white flex items-center text-sm font-medium transition-colors"
              >
                <FaGithub className="w-4 h-4 mr-2" />
                Source Code
              </Link>
            )}
            {liveUrl && (
              <Link
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-brand-primary flex items-center text-sm font-medium transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Link>
            )}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
