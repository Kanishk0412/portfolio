"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { EventCard, EventRole } from "@/components/EventCard";

const ALL_EVENTS = [
  {
    title: "Building Modern Web Apps with Next.js 15",
    role: "Speaker" as EventRole,
    organization: "GDG Cloud",
    location: "New Delhi, India",
    date: "May 2026",
    description: "A comprehensive deep dive into the new features of Next.js 15, including React Compiler, improved App Router performance, and advanced caching strategies.",
  },
  {
    title: "AI Hackathon 2026",
    role: "Judge" as EventRole,
    organization: "Tech University",
    location: "Bangalore, India",
    date: "April 2026",
    description: "Judged over 50 projects focusing on generative AI and LLM implementations for social good. Mentored final year students on scaling their MVPs.",
  },
  {
    title: "Open Source Contribution Workshop",
    role: "Mentor" as EventRole,
    organization: "TensorFlow User Group",
    location: "Remote",
    date: "February 2026",
    description: "Guided 100+ beginners through their first open source contribution. Covered Git basics, reading issues, and submitting PRs.",
  },
  {
    title: "React India Summit",
    role: "Speaker" as EventRole,
    organization: "React Community",
    location: "Goa, India",
    date: "November 2025",
    description: "Delivered a lightning talk on 'Server Components vs Client Components' and the future of full-stack React development.",
  },
];

const FILTERS = ["All", "Speaker", "Judge", "Mentor"];

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredEvents = activeFilter === "All" 
    ? ALL_EVENTS 
    : ALL_EVENTS.filter(e => e.role === activeFilter);

  return (
    <div className="container mx-auto px-6 md:px-12 py-12">
      <SectionHeading 
        title="Speaking & Events" 
        subtitle="Chronicles of my journey sharing knowledge, judging hackathons, and building the tech community." 
      />

      <div className="flex flex-wrap gap-3 mb-12">
        {FILTERS.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeFilter === filter
                ? "bg-brand-primary text-white"
                : "bg-card-bg border border-card-border hover:border-brand-primary/50 text-foreground/80"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {filteredEvents.map((event, index) => (
          <EventCard key={index} {...event} index={index} />
        ))}
        {filteredEvents.length === 0 && (
          <div className="text-center py-24 text-foreground/50 border border-dashed border-card-border rounded-2xl">
            No events found for the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}
