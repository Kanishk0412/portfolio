"use client";

import { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { SectionHeading } from "@/components/SectionHeading";
import { EventCard, type EventRole } from "@/components/EventCard";
import { INSTAGRAM_EVENTS } from "@/data/events";

const FILTERS: ("All" | EventRole)[] = [
  "All",
  "Speaker",
  "Judge",
  "Mentor",
  "Organizer",
  "Attendee",
  "Community",
];

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>("All");

  const filteredEvents =
    activeFilter === "All"
      ? INSTAGRAM_EVENTS
      : INSTAGRAM_EVENTS.filter((event) =>
          Array.isArray(event.role)
            ? event.role.includes(activeFilter)
            : event.role === activeFilter
        );

  return (
    <div className="container mx-auto px-6 py-12 md:px-12">
      <SectionHeading
        title="Events & Community"
        subtitle="Talks, hackathons, and community events — consolidated into unique entries with their original post imagery."
      />

      <div className="mb-10 flex flex-col gap-5 rounded-2xl border border-card-border bg-card-bg p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
        <div>
          <p className="font-semibold text-foreground">@kanishkcodez on Instagram</p>
          <p className="mt-1 text-sm text-foreground/60">
            Developer | Tech Speaker | Community Builder
          </p>
        </div>
        <a
          href="https://www.instagram.com/kanishkcodez/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <FaInstagram className="h-4 w-4" aria-hidden="true" />
          Visit Instagram profile
        </a>
      </div>

      <div className="mb-6 flex flex-wrap gap-3" aria-label="Filter events by role">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              activeFilter === filter
                ? "bg-brand-primary text-white"
                : "border border-card-border bg-card-bg text-foreground/80 hover:border-brand-primary/50"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <p className="mb-10 text-sm text-foreground/55" aria-live="polite">
        Showing {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"}
        {activeFilter === "All" ? "" : ` tagged ${activeFilter}`}
      </p>

      <div className="space-y-8">
        {filteredEvents.map((event, index) => (
          <EventCard key={event.title} {...event} index={index} />
        ))}
        {filteredEvents.length === 0 && (
          <div className="rounded-2xl border border-dashed border-card-border py-24 text-center text-foreground/50">
            No events found for the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}
