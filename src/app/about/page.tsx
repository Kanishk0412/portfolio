"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, CalendarCheck, Code2, ExternalLink, Sparkles, Users } from "lucide-react";
import { AboutFaq } from "@/components/about/AboutFaq";
import { AboutIntro } from "@/components/about/AboutIntro";
import { JourneyTimeline } from "@/components/about/JourneyTimeline";
import { RoleTabs } from "@/components/about/RoleTabs";
import { ScrollRevealText } from "@/components/about/ScrollRevealText";
import { SkillExplorer } from "@/components/about/SkillExplorer";
import {
  COMMUNITY_EXPERIENCE,
  EVENT_COUNTS,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  PROJECT_COUNT,
} from "@/components/about/aboutData";
import { SectionHeading } from "@/components/SectionHeading";
import { Stats } from "@/components/Stats";
import { TiltCard } from "@/components/motion/TiltCard";

const STORY =
  "I'm Kanishk Tyagi, a customer experience professional, full-stack developer, speaker, and community builder. For more than three years I've been building in, and contributing to, the AI, web, and data communities. I enjoy turning ideas into useful digital products, sharing what I learn on stage, and creating spaces where developers learn from one another.";

const ABOUT_STATS = [
  { label: "Events on this site", value: EVENT_COUNTS.total, icon: CalendarCheck },
  { label: "Communities", value: COMMUNITY_EXPERIENCE.length, icon: Users },
  { label: "Projects on GitHub", value: PROJECT_COUNT, icon: Code2 },
  // Matches "more than three years" in the story above.
  { label: "Years in community", value: 3, suffix: "+", icon: Sparkles },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto flex flex-col gap-28 px-6 py-12 md:gap-36 md:px-12">
      <AboutIntro />

      <Stats stats={ABOUT_STATS} />

      <section aria-labelledby="my-story">
        <p id="my-story" className="mb-8 font-mono text-xs font-medium uppercase tracking-[0.22em] text-brand-primary">
          My story
        </p>
        <ScrollRevealText
          text={STORY}
          className="max-w-5xl font-display text-3xl font-semibold leading-[1.25] tracking-tight md:text-5xl"
        />
      </section>

      <section>
        <SectionHeading eyebrow="Three hats" title="What I do" subtitle="Pick a role to see what it involves." />
        <RoleTabs />
      </section>

      <section>
        <SectionHeading eyebrow="Timeline" title="The journey so far" subtitle="From a campus chapter to stages across India." />
        <JourneyTimeline />
      </section>

      <section>
        <SectionHeading eyebrow="Toolkit" title="Skills" subtitle="The languages, frameworks, and tools I reach for most. Filter by area." />
        <SkillExplorer />
      </section>

      <section>
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Community"
            title="Community experience"
            subtitle="From leading a campus chapter to organizing developer events across Chandigarh and Delhi."
          />
          <Link
            href="/events"
            className="mb-16 hidden items-center gap-2 font-semibold text-brand-primary transition-colors hover:text-brand-secondary sm:inline-flex"
          >
            Explore my events <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {COMMUNITY_EXPERIENCE.map((item, index) => (
            <TiltCard
              key={`${item.community}-${item.period}`}
              maxTilt={3}
              className="overflow-hidden rounded-2xl border border-card-border bg-card-bg p-6"
            >
              <span className="absolute right-5 top-5 font-display text-5xl font-black text-foreground/[0.06]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-secondary">{item.period}</p>
              <h3 className="mt-3 text-xl font-bold">{item.role}</h3>
              <p className="mt-1 font-medium text-brand-primary">{item.community}</p>
              <p className="mt-4 max-w-xl leading-relaxed text-foreground/70">{item.description}</p>
            </TiltCard>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-foreground/65 transition-colors hover:text-brand-primary"
          >
            Community updates on LinkedIn <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-foreground/65 transition-colors hover:text-brand-primary"
          >
            Event moments on Instagram <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      <section className="grid items-start gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:gap-14">
        <div>
          <SectionHeading eyebrow="FAQ" title="Questions people ask me" />
          <AboutFaq />
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-brand-primary/30 bg-gradient-to-br from-brand-primary/15 via-card-bg to-brand-secondary/10 p-7 md:p-9 lg:sticky lg:top-28"
        >
          <Briefcase className="h-8 w-8 text-brand-primary" />
          <h2 className="mt-5 text-2xl font-bold">Have a project in mind?</h2>
          <p className="mt-3 leading-relaxed text-foreground/75">
            I&apos;m available for freelance full-stack development. Whether you need a business website, portfolio,
            dashboard, or custom web application, tell me what you&apos;re building and I&apos;ll help shape the right
            solution.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 font-semibold text-on-brand transition-transform hover:-translate-y-0.5"
          >
            Request a quotation <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.aside>
      </section>
    </div>
  );
}
