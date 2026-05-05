"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Building } from "lucide-react";
import { cn } from "@/lib/utils";

export type EventRole = "Speaker" | "Judge" | "Mentor" | "Organizer";

interface EventCardProps {
  title: string;
  role: EventRole;
  organization: string;
  location: string;
  date: string;
  description: string;
  imageUrls?: string[];
  className?: string;
  index?: number;
}

export function EventCard({
  title,
  role,
  organization,
  location,
  date,
  description,
  imageUrls = [],
  className,
  index = 0,
}: EventCardProps) {
  
  const roleColors = {
    Speaker: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Judge: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    Mentor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Organizer: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "bg-card-bg border border-card-border rounded-2xl overflow-hidden group",
        className
      )}
    >
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className={cn("px-3 py-1 text-xs font-semibold rounded-full border", roleColors[role])}>
                {role}
              </span>
              <span className="text-foreground/50 text-sm flex items-center">
                <Calendar className="w-4 h-4 mr-1.5" />
                {date}
              </span>
            </div>
            <h3 className="text-2xl font-bold group-hover:text-brand-primary transition-colors">{title}</h3>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-foreground/70 mb-6">
          <div className="flex items-center">
            <Building className="w-4 h-4 mr-2 text-brand-primary" />
            {organization}
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-brand-secondary" />
            {location}
          </div>
        </div>

        <p className="text-foreground/80 leading-relaxed mb-6">
          {description}
        </p>

        {imageUrls.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {imageUrls.map((url, i) => (
              <div key={i} className="aspect-video bg-background rounded-lg overflow-hidden border border-card-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`${title} highlight ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
