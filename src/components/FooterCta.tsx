"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { LocalTime } from "@/components/LocalTime";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitText } from "@/components/motion/SplitText";

const EMAIL = "kanishktyagi.connect@gmail.com";

/** Oversized closing call to action at the top of the footer. Hidden on the contact page itself. */
export function FooterCta() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <section className="container mx-auto border-b border-card-border px-6 py-20 md:px-12 md:py-28">
      <p className="mb-6 font-mono text-xs font-medium uppercase tracking-[0.22em] text-brand-primary">
        Have a project or an event in mind?
      </p>
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <SplitText
          text="Let's build together."
          highlight={["together."]}
          className="text-[15vw] font-bold leading-[0.95] tracking-tighter md:text-[9vw] lg:text-[7.5vw]"
        />
        <Magnetic>
          <Link
            href="/contact"
            data-cursor="Say hi"
            className="group grid h-36 w-36 shrink-0 place-items-center rounded-full bg-brand-primary text-center font-semibold text-on-brand transition-transform duration-300 hover:scale-105 md:h-44 md:w-44"
          >
            <span className="flex flex-col items-center gap-1">
              <ArrowUpRight className="h-7 w-7 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
              Get in touch
            </span>
          </Link>
        </Magnetic>
      </div>
      <div className="mt-12 flex flex-col gap-4 text-sm text-foreground/60 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={`mailto:${EMAIL}`}
          className="w-fit border-b border-foreground/20 pb-0.5 text-base text-foreground transition-colors hover:border-brand-primary hover:text-brand-primary md:text-lg"
        >
          {EMAIL}
        </Link>
        <p className="flex items-center gap-2">
          <span className="pulse-dot" aria-hidden="true" />
          Local time in India: <LocalTime className="font-mono text-foreground" />
        </p>
      </div>
    </section>
  );
}
