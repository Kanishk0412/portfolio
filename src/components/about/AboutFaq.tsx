"use client";

import { useId, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { EVENT_COUNTS, INSTAGRAM_URL, LINKEDIN_URL, TALK_TOPICS, TOPMATE_URL } from "./aboutData";

const linkClass = "font-medium text-brand-primary underline-offset-4 hover:underline";

const FAQS: { question: string; answer: ReactNode }[] = [
  {
    question: "What do you speak about?",
    answer: (
      <>
        Mostly {TALK_TOPICS.map((topic) => topic.charAt(0).toLowerCase() + topic.slice(1)).join("; ")}. Sessions are
        practical and aimed at helping developers turn concepts into working projects.
      </>
    ),
  },
  {
    question: "Are you available for freelance work?",
    answer: (
      <>
        Yes. I build business websites, portfolios, dashboards, and custom web applications.{" "}
        <Link href="/contact" className={linkClass}>
          Tell me what you&apos;re building
        </Link>{" "}
        and I&apos;ll help shape the right solution.
      </>
    ),
  },
  {
    question: "Can you judge or mentor at our hackathon?",
    answer: (
      <>
        I&apos;ve judged {EVENT_COUNTS.judge} and mentored at {EVENT_COUNTS.mentor} of the events listed on this site.
        Send the event details through the{" "}
        <Link href="/contact" className={linkClass}>
          contact page
        </Link>
        .
      </>
    ),
  },
  {
    question: "Can I book a one-on-one session?",
    answer: (
      <>
        Yes, you can book a 1:1 with me on{" "}
        <a href={TOPMATE_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Topmate
        </a>
        .
      </>
    ),
  },
  {
    question: "Where can I follow your community work?",
    answer: (
      <>
        Community updates go on{" "}
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
          LinkedIn
        </a>{" "}
        and event moments on{" "}
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Instagram
        </a>
        .
      </>
    ),
  },
];

export function AboutFaq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul className="divide-y divide-card-border border-y border-card-border">
      {FAQS.map((faq, index) => {
        const isOpen = open === index;
        return (
          <li key={faq.question}>
            <h3>
              <button
                type="button"
                id={`${baseId}-q-${index}`}
                aria-expanded={isOpen}
                aria-controls={`${baseId}-a-${index}`}
                onClick={() => setOpen(isOpen ? null : index)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span
                  className={cn(
                    "font-display text-lg font-semibold transition-colors md:text-2xl",
                    isOpen ? "text-foreground" : "text-foreground/70 group-hover:text-foreground"
                  )}
                >
                  {faq.question}
                </span>
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300",
                    isOpen ? "rotate-45 border-brand-primary bg-brand-primary text-on-brand" : "border-card-border group-hover:border-brand-primary/50"
                  )}
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${baseId}-a-${index}`}
                  role="region"
                  aria-labelledby={`${baseId}-q-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 leading-relaxed text-foreground/70">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
