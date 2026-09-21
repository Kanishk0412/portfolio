"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Code2,
  ExternalLink,
  GraduationCap,
  Mic2,
  Users,
} from "lucide-react";
import Link from "next/link";

const skills = [
  "MERN Stack",
  "MongoDB",
  "Express.js",
  "React",
  "Node.js",
  "Next.js",
  "TypeScript",
  "Python",
  "Power BI",
  "Data Analysis",
  "NumPy",
  "Pandas",
  "scikit-learn",
  "Artificial Intelligence",
  "AI Agents",
];

const communityExperience = [
  {
    period: "2022",
    role: "Lead",
    community: "GDG on Campus UIET",
    description:
      "Led the campus developer community and created opportunities for students to learn, collaborate, and build together.",
  },
  {
    period: "2023 – Present",
    role: "Core Team Member",
    community: "GDG Cloud Chandigarh",
    description:
      "Contributing to the Chandigarh developer ecosystem through community programs, technical sessions, and events.",
  },
  {
    period: "Community journey",
    role: "Community Member & Organizer",
    community: "MongoDB User Group Chandigarh",
    description:
      "Helping bring developers together for practical conversations around MongoDB, data, and modern application development.",
  },
  {
    period: "Current",
    role: "Community Contributor & Organizer",
    community: "AI Community Delhi",
    description:
      "Supporting AI-focused learning and events while connecting developers, speakers, and builders across the community.",
  },
];

const talkHighlights = [
  "Artificial intelligence, AI agents, and Google ADK",
  "Modern web and full-stack development",
  "Data analysis, Python, and developer tools",
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12 md:px-12">
      <SectionHeading
        title="About Me"
        subtitle="Developer, speaker, community builder, and lifelong learner."
      />

      <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.7fr)] lg:gap-16">
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-card-border bg-card-bg shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile.jpg"
              alt="Kanishk Tyagi"
              className="h-full w-full object-cover"
              onError={(event) => {
                (event.target as HTMLImageElement).src =
                  "https://ui-avatars.com/api/?name=Kanishk+Tyagi&background=18181b&color=fafafa&size=800";
              }}
            />
          </div>

          <div className="rounded-2xl border border-card-border bg-card-bg p-6">
            <div className="mb-4 flex items-center gap-3">
              <Code2 className="h-5 w-5 text-brand-primary" />
              <h2 className="text-xl font-bold">Technical Toolkit</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-card-border bg-background px-3 py-1 text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.aside>

        <div className="space-y-12">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="mb-5 flex items-center text-2xl font-bold">
              <span className="mr-3 h-7 w-1.5 rounded-full bg-brand-primary" />
              My Journey
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-foreground/80">
              <p>
                I&apos;m Kanishk Tyagi, a customer experience professional,
                full-stack developer, speaker, and community builder. I&apos;m
                currently working as a Sr. CSA at
                Prodege, where I&apos;ve been part of the team since April 2026.
              </p>
              <p>
                I graduated from UIET, Panjab University with a Bachelor of
                Engineering in 2024. Alongside my professional journey, I&apos;ve
                spent more than three years building in and contributing to the
                AI, web, and data communities.
              </p>
              <p>
                I enjoy turning ideas into useful digital products, sharing what
                I learn through technical talks, and creating spaces where
                developers can learn from one another.
              </p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-6 flex items-center text-2xl font-bold">
              <Briefcase className="mr-3 h-6 w-6 text-brand-secondary" />
              Professional Experience
            </h2>
            <div className="space-y-7 border-l-2 border-card-border pl-8">
              <div className="relative">
                <span className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-4 border-background bg-brand-secondary" />
                <p className="text-sm font-semibold uppercase tracking-wider text-brand-secondary">
                  April 2026 – Present
                </p>
                <h3 className="mt-1 text-xl font-bold">
                  Sr. CSA
                </h3>
                <p className="mt-1 text-foreground/70">Prodege</p>
              </div>
              <div className="relative">
                <span className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-4 border-background bg-brand-primary" />
                <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
                  Independent
                </p>
                <h3 className="mt-1 text-xl font-bold">
                  Freelance Full-Stack Developer
                </h3>
                <p className="mt-1 leading-relaxed text-foreground/70">
                  Building end-to-end websites and web applications tailored to
                  each client&apos;s goals.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-6 flex items-center text-2xl font-bold">
              <GraduationCap className="mr-3 h-6 w-6 text-brand-primary" />
              Education
            </h2>
            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-card-border bg-card-bg p-6 md:flex-row md:items-center">
              <div>
                <h3 className="text-xl font-bold">Bachelor of Engineering</h3>
                <p className="mt-1 text-foreground/70">
                  UIET, Panjab University
                </p>
              </div>
              <span className="w-fit rounded-full border border-card-border bg-background px-4 py-2 text-sm font-medium text-foreground/60">
                Class of 2024
              </span>
            </div>
          </motion.section>
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mt-20"
      >
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <Users className="h-7 w-7 text-brand-secondary" />
              <h2 className="text-3xl font-bold">Community Experience</h2>
            </div>
            <p className="max-w-2xl text-foreground/65">
              From leading a campus chapter to organizing developer events
              across Chandigarh and Delhi.
            </p>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 font-semibold text-brand-primary transition-colors hover:text-brand-secondary"
          >
            Explore my events <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {communityExperience.map((item, index) => (
            <article
              key={`${item.community}-${item.period}`}
              className="relative overflow-hidden rounded-2xl border border-card-border bg-card-bg p-6"
            >
              <span className="absolute right-5 top-5 text-5xl font-black text-foreground/[0.04]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-secondary">
                {item.period}
              </p>
              <h3 className="mt-3 text-xl font-bold">{item.role}</h3>
              <p className="mt-1 font-medium text-brand-primary">
                {item.community}
              </p>
              <p className="mt-4 max-w-xl leading-relaxed text-foreground/70">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <a
            href="https://www.linkedin.com/in/kanishktyagi-connect"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-foreground/65 transition-colors hover:text-brand-primary"
          >
            Community updates on LinkedIn <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href="https://www.instagram.com/kanishkcodez/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-foreground/65 transition-colors hover:text-brand-primary"
          >
            Event moments on Instagram <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </motion.section>

      <div className="mt-20 grid gap-6 lg:grid-cols-2">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-card-border bg-card-bg p-7 md:p-9"
        >
          <Mic2 className="h-8 w-8 text-brand-primary" />
          <h2 className="mt-5 text-2xl font-bold">Speaking & Knowledge Sharing</h2>
          <p className="mt-3 leading-relaxed text-foreground/70">
            With 3+ years of hands-on experience across AI, web, and data, I
            deliver practical sessions that help developers turn concepts into
            working projects.
          </p>
          <ul className="mt-6 space-y-3">
            {talkHighlights.map((topic) => (
              <li key={topic} className="flex items-start gap-3 text-foreground/80">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary" />
                {topic}
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-brand-primary/30 bg-gradient-to-br from-brand-primary/15 via-card-bg to-brand-secondary/10 p-7 md:p-9"
        >
          <Briefcase className="h-8 w-8 text-brand-secondary" />
          <h2 className="mt-5 text-2xl font-bold">Have a project in mind?</h2>
          <p className="mt-3 max-w-xl leading-relaxed text-foreground/75">
            I&apos;m available for freelance full-stack development. Whether you
            need a business website, portfolio, dashboard, or custom web
            application, tell me what you&apos;re building and I&apos;ll help shape the
            right solution.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-semibold text-background transition-transform hover:-translate-y-0.5"
          >
            Request a quotation <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>
      </div>
    </div>
  );
}
