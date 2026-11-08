"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Building, Calendar, ChevronLeft, ChevronRight, ExternalLink, MapPin } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { DURATION, EASE_OUT, trackCursorGlow } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type EventRole =
  | "Speaker"
  | "Judge"
  | "Mentor"
  | "Organizer"
  | "Attendee"
  | "Community";

export type EventMedia =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster: string };

interface EventCardProps {
  title: string;
  role: EventRole | EventRole[];
  organization: string;
  location: string;
  date: string;
  description: string;
  media?: EventMedia[];
  instagramUrls?: string[];
  className?: string;
  index?: number;
}

const roleColors: Record<EventRole, string> = {
  Speaker: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Judge: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  Mentor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Organizer: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  Attendee: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  Community: "bg-amber-500/10 text-amber-500 border-amber-500/20",
};

/** Short card with a cover image, used where the full carousel would take too much room. */
export function CompactEventCard({
  title,
  role,
  organization,
  date,
  media = [],
  instagramUrls = [],
  index = 0,
}: EventCardProps) {
  const roles = Array.isArray(role) ? role : [role];
  const cover = media[0];
  const coverSrc = cover?.type === "video" ? cover.poster : cover?.src;
  const postUrl = instagramUrls[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: DURATION.base, delay: index * 0.1, ease: EASE_OUT }}
      onPointerMove={trackCursorGlow}
      className="card-glow group flex flex-col overflow-hidden rounded-2xl border border-card-border bg-card-bg hover:border-brand-primary/50 motion-safe:hover:-translate-y-1 transition-[translate,border-color] duration-300"
    >
      <div className="aspect-[4/3] overflow-hidden bg-background/60">
        {coverSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverSrc}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden="true"
            className="grid h-full w-full place-items-center bg-gradient-to-br from-brand-primary/30 via-card-bg to-brand-secondary/30"
          >
            <Calendar className="h-10 w-10 text-foreground/40" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {roles.map((r) => (
            <span
              key={r}
              className={cn("rounded-full border px-3 py-1 text-xs font-semibold", roleColors[r])}
            >
              {r}
            </span>
          ))}
        </div>
        <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-brand-primary">{title}</h3>
        <p className="mb-1 text-sm text-foreground/70">{organization}</p>
        <p className="mb-5 flex items-center text-sm text-foreground/50">
          <Calendar className="mr-1.5 h-4 w-4" />
          {date}
        </p>
        {postUrl && (
          <a
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${title} on Instagram`}
            className="relative z-10 mt-auto inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand-secondary transition-colors hover:text-brand-primary"
          >
            <FaInstagram className="h-4 w-4" aria-hidden="true" />
            View on Instagram
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.article>
  );
}

export function EventCard({
  title,
  role,
  organization,
  location,
  date,
  description,
  media = [],
  instagramUrls = [],
  className,
  index = 0,
}: EventCardProps) {
  const roles = Array.isArray(role) ? role : [role];
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const videos = Array.from(
      carouselRef.current?.querySelectorAll<HTMLVideoElement>("video[data-event-video]") ?? []
    );
    if (videos.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;

          if (entry.isIntersecting && entry.intersectionRatio >= 0.65) {
            document.querySelectorAll<HTMLVideoElement>("video[data-event-video]").forEach((other) => {
              if (other !== video) other.pause();
            });
            video.muted = true;
            void video.play().catch(() => {
              // Autoplay can still be declined by user-level browser settings.
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0, 0.65, 1] }
    );

    videos.forEach((video) => observer.observe(video));

    return () => {
      observer.disconnect();
      videos.forEach((video) => video.pause());
    };
  }, [media]);

  const pauseInactiveVideos = (activeIndex: number) => {
    carouselRef.current?.querySelectorAll("video").forEach((video) => {
      if (Number(video.dataset.slideIndex) !== activeIndex) video.pause();
    });
  };

  const goToSlide = (slide: number) => {
    const nextSlide = Math.max(0, Math.min(slide, media.length - 1));
    const carousel = carouselRef.current;

    if (carousel) {
      carousel.scrollTo({ left: carousel.clientWidth * nextSlide, behavior: "smooth" });
    }
    setActiveSlide(nextSlide);
    pauseInactiveVideos(nextSlide);
  };

  const updateActiveSlide = () => {
    const carousel = carouselRef.current;
    if (!carousel || carousel.clientWidth === 0) return;

    const nextSlide = Math.max(
      0,
      Math.min(Math.round(carousel.scrollLeft / carousel.clientWidth), media.length - 1)
    );
    setActiveSlide(nextSlide);
    pauseInactiveVideos(nextSlide);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: DURATION.base, delay: Math.min(index * 0.05, 0.3), ease: EASE_OUT }}
      onPointerMove={trackCursorGlow}
      className={cn(
        "card-glow bg-card-bg border border-card-border rounded-2xl overflow-hidden group hover:border-brand-primary/40 motion-safe:hover:-translate-y-1 transition-[translate,border-color] duration-300",
        className
      )}
    >
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {roles.map((r) => (
                <span
                  key={r}
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-full border",
                    roleColors[r]
                  )}
                >
                  {r}
                </span>
              ))}
              <span className="text-foreground/50 text-sm flex items-center ml-1">
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

        {media.length > 0 && (
          <div
            className="relative mb-6 overflow-hidden rounded-xl border border-card-border bg-background/60"
            role="region"
            aria-roledescription="carousel"
            aria-label={`${title} image gallery`}
          >
            <div
              ref={carouselRef}
              onScroll={updateActiveSlide}
              className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {media.map((item, mediaIndex) => (
                <figure
                  key={item.src}
                  className="flex min-h-64 min-w-full snap-center items-center justify-center p-3 md:p-5"
                  aria-label={`${item.type === "video" ? "Video" : "Image"} ${mediaIndex + 1} of ${media.length}`}
                >
                  {item.type === "video" ? (
                    <video
                      src={item.src}
                      poster={item.poster}
                      controls
                      playsInline
                      muted
                      loop
                      preload="metadata"
                      data-event-video
                      data-slide-index={mediaIndex}
                      aria-label={`${title} reel ${mediaIndex + 1}`}
                      onPlay={(event) => {
                        document.querySelectorAll<HTMLVideoElement>("video[data-event-video]").forEach((video) => {
                          if (video !== event.currentTarget) video.pause();
                        });
                      }}
                      className="h-auto max-h-[26rem] w-auto max-w-full rounded-lg object-contain"
                    >
                      Your browser does not support HTML video.
                    </video>
                  ) : (
                    <>
                      {/* Local copies retain each Instagram slide's natural aspect ratio. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.src}
                        alt={`${title} highlight ${mediaIndex + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="h-auto max-h-[26rem] w-auto max-w-full rounded-lg object-contain"
                      />
                    </>
                  )}
                </figure>
              ))}
            </div>

            {media.length > 1 && (
              <>
                <span className="absolute right-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {activeSlide + 1} / {media.length}
                </span>
                <button
                  type="button"
                  onClick={() => goToSlide(activeSlide - 1)}
                  disabled={activeSlide === 0}
                  aria-label="Show previous image"
                  className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/70 text-white shadow-lg transition hover:bg-black/85 disabled:pointer-events-none disabled:opacity-30"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => goToSlide(activeSlide + 1)}
                  disabled={activeSlide === media.length - 1}
                  aria-label="Show next image"
                  className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/70 text-white shadow-lg transition hover:bg-black/85 disabled:pointer-events-none disabled:opacity-30"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
                <div className="absolute bottom-3 left-1/2 flex max-w-[75%] -translate-x-1/2 gap-1.5 rounded-full bg-black/60 px-3 py-2 backdrop-blur-sm">
                  {media.map((item, dotIndex) => (
                    <button
                      key={item.src}
                      type="button"
                      onClick={() => goToSlide(dotIndex)}
                      aria-label={`Show image ${dotIndex + 1}`}
                      aria-current={activeSlide === dotIndex ? "true" : undefined}
                      className={cn(
                        "h-1.5 rounded-full transition-all",
                        activeSlide === dotIndex ? "w-4 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                      )}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <p className="text-foreground/80 leading-relaxed whitespace-pre-line mb-6">
          {description}
        </p>

        {instagramUrls.length > 0 && (
          <div className="flex flex-wrap gap-3 border-t border-card-border pt-5">
            {instagramUrls.map((instagramUrl, postIndex) => (
              <a
                key={instagramUrl}
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-brand-secondary/30 bg-brand-secondary/10 px-4 py-2 text-sm font-semibold text-brand-secondary transition-colors hover:border-brand-secondary hover:bg-brand-secondary hover:text-white"
              >
                <FaInstagram className="h-4 w-4" aria-hidden="true" />
                {instagramUrls.length === 1 ? "View on Instagram" : `View Instagram post ${postIndex + 1}`}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
