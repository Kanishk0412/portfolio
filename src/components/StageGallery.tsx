"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { INSTAGRAM_EVENTS } from "@/data/events";
import { DURATION, EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Roles where Kanishk is the one on stage or running the room.
const STAGE_ROLES = new Set(["Speaker", "Judge", "Mentor", "Organizer"]);

// Spans for a 4-column grid that tiles 7 photos with no gaps (and 2 columns on phones).
const TILE_SPANS = [
  "col-span-2 row-span-2",
  "",
  "",
  "col-span-2",
  "",
  "",
  "col-span-2",
];

const PHOTOS = INSTAGRAM_EVENTS.flatMap((event) => {
  const roles = [event.role].flat();
  const cover = event.media.find((item) => item.type === "image");
  if (!cover || !roles.some((role) => STAGE_ROLES.has(role))) return [];
  return [{ src: cover.src, title: event.title, role: roles[0], date: event.date }];
}).slice(0, TILE_SPANS.length);

/** A grid of event photos on the home page, linking through to the full events list. */
export function StageGallery() {
  return (
    <ul className="grid grid-flow-dense grid-cols-2 gap-3 auto-rows-[9rem] sm:auto-rows-[12rem] md:grid-cols-4 md:gap-4 lg:auto-rows-[14rem]">
      {PHOTOS.map((photo, index) => (
        <motion.li
          key={photo.src}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: DURATION.base, delay: index * 0.06, ease: EASE_OUT }}
          className={cn("relative", TILE_SPANS[index])}
        >
          <Link
            href="/events"
            data-cursor="View"
            className="group relative block h-full w-full overflow-hidden rounded-2xl border border-card-border bg-card-bg"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover grayscale-[35%] transition duration-700 group-hover:grayscale-0 motion-safe:group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 via-30% to-transparent to-65% opacity-90 transition-opacity duration-500 group-hover:opacity-100"
            />
            <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
              <p className="mb-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-brand-primary">
                {photo.role} · {photo.date}
              </p>
              <p
                className={cn(
                  "font-display font-semibold leading-snug text-white line-clamp-2",
                  index === 0 ? "text-lg md:text-2xl" : "text-sm md:text-base"
                )}
              >
                {photo.title}
              </p>
            </div>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
