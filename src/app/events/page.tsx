"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { SectionHeading } from "@/components/SectionHeading";
import { EventCard, EventRole } from "@/components/EventCard";

type EventEntry = {
  title: string;
  role: EventRole | EventRole[];
  organization: string;
  location: string;
  date: string;
  description: string;
  instagramUrl?: string;
};

const ALL_EVENTS: EventEntry[] = [
  {
    title: "Hack-N-Win 3.0 — Mentor",
    role: "Mentor",
    organization: "CGC University · D4 Community",
    location: "Mohali, India",
    date: "April 2026",
    description:
      "Glad to be invited again as a Mentor at Hack-N-Win 3.0 at CGC University, Mohali. After mentoring at Hack-N-Win 2.0, it feels great to return and support another group of passionate student innovators. Events like these always remind me how much talent exists when students get the right platform and guidance.\n\nLooking forward to interacting with some amazing builders, discussing ideas, and helping teams turn concepts into real solutions.\n\nGrateful to the D4 Community and CGC University for the opportunity.",
    instagramUrl: "https://www.instagram.com/p/DVx5514iebt/",
  },
  {
    title: "AI Summit Delhi",
    role: "Attendee",
    organization: "AI Summit",
    location: "New Delhi, India",
    date: "March 2026",
    description:
      "Attended the AI Summit in Delhi — and one thing is very clear: AI is moving faster than most people realise.\n\nDiscussions around new LLM models, real-world deployments and enterprise use-cases showed how quickly industries are shifting from experimentation to actual implementation.\n\nWe are entering a phase where knowing about AI won't matter — knowing how to use AI will. For students and professionals, the real skill now is not coding alone, it is understanding how to think, build and solve problems using AI tools.",
    instagramUrl: "https://www.instagram.com/p/DVC49RKCc7H/",
  },
  {
    title: "GDG On Campus Hackathon — SCRIET, Meerut",
    role: "Judge",
    organization: "Google Developer Group On Campus · SCRIET / MIET College",
    location: "Meerut, India",
    date: "February 2026",
    description:
      "Honoured to be invited as a Guest Speaker & Judge at the Hackathon hosted by Google Developer Group (GDG) On Campus – SCRIET, Meerut in collaboration with the code.scriet community.\n\nDelivered a session on the latest AI innovations launched in Firebase and how students can practically use them to build real-world, scalable solutions.\n\nAs a judge, it was inspiring to evaluate projects that blended AI, creativity and problem-solving under time pressure. Events like these prove one thing clearly — the future of work belongs to builders.",
    instagramUrl: "https://www.instagram.com/p/DVBq0Yhkoqb/",
  },
  {
    title: "Bharti Foundation Hackathon — Gyan Bharti School",
    role: ["Speaker", "Judge"],
    organization: "Gyan Bharti School · Bharti Foundation",
    location: "Amritsar, India",
    date: "January 2026",
    description:
      "Honoured to be invited as a Speaker & Judge at the Hackathon hosted at Gyan Bharti School, Amritsar — an initiative by the Bharti Foundation.\n\nInteracting with students from classes 9–12 was honestly inspiring. What surprised me most was not their coding — but their thinking. Many of them are already exploring AI tools, problem-solving, and startup ideas at a very early stage.\n\nToday's students don't lack talent — they lack direction and industry exposure. That is exactly what I spoke about: how skills, not marksheets, will define careers in the coming future of work.",
    instagramUrl: "https://www.instagram.com/p/DVAbBrHjnq2/",
  },
];

const FILTERS: ("All" | EventRole)[] = ["All", "Speaker", "Judge", "Mentor", "Attendee"];

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>("All");

  const filteredEvents =
    activeFilter === "All"
      ? ALL_EVENTS
      : ALL_EVENTS.filter((e) =>
          Array.isArray(e.role) ? e.role.includes(activeFilter) : e.role === activeFilter
        );

  useEffect(() => {
    if (typeof window !== "undefined" && window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [activeFilter]);

  return (
    <div className="container mx-auto px-6 md:px-12 py-12">
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onReady={() => {
          if (typeof window !== "undefined" && window.instgrm) {
            window.instgrm.Embeds.process();
          }
        }}
      />

      <SectionHeading
        title="Speaking & Events"
        subtitle="Chronicles of my journey sharing knowledge, judging hackathons, and building the tech community."
      />

      <div className="flex flex-wrap gap-3 mb-12">
        {FILTERS.map((filter) => (
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
          <EventCard key={event.instagramUrl ?? index} {...event} index={index} />
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
