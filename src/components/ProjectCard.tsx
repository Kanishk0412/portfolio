"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  className?: string;
  index?: number;
}

export function ProjectCard({
  title,
  description,
  tags,
  githubUrl,
  liveUrl,
  className,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group relative bg-card-bg border border-card-border rounded-2xl overflow-hidden hover:border-brand-primary/50 transition-colors duration-300",
        className
      )}
    >
      <div className="p-6 md:p-8 flex flex-col h-full">
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
        
        <div className="flex items-center space-x-4 mt-auto pt-4 border-t border-card-border/50">
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
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
              className="text-foreground/70 hover:text-brand-primary flex items-center text-sm font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
