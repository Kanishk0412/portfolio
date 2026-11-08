"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarClock,
  Copy,
  ExternalLink,
  Search,
  type LucideIcon,
} from "lucide-react";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

const EMAIL = "kanishktyagi.connect@gmail.com";

type Command = {
  label: string;
  group: "Pages" | "Links" | "Actions";
  icon: LucideIcon;
  href?: string;
  external?: boolean;
  copy?: string;
};

const COMMANDS: Command[] = [
  { label: "Home", group: "Pages", icon: ArrowRight, href: "/" },
  { label: "Projects", group: "Pages", icon: ArrowRight, href: "/projects" },
  { label: "Events", group: "Pages", icon: ArrowRight, href: "/events" },
  { label: "About", group: "Pages", icon: ArrowRight, href: "/about" },
  { label: "Contact", group: "Pages", icon: ArrowRight, href: "/contact" },
  { label: "GitHub", group: "Links", icon: ExternalLink, href: "https://github.com/Kanishk0412", external: true },
  { label: "LinkedIn", group: "Links", icon: ExternalLink, href: "https://www.linkedin.com/in/kanishktyagi-connect/", external: true },
  { label: "Instagram", group: "Links", icon: ExternalLink, href: "https://www.instagram.com/kanishkcodez/", external: true },
  { label: "Book a 1:1 on Topmate", group: "Links", icon: CalendarClock, href: "https://topmate.io/kanishk_tyagi10/", external: true },
  { label: "Copy email address", group: "Actions", icon: Copy, copy: EMAIL },
];

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return term ? COMMANDS.filter((command) => command.label.toLowerCase().includes(term)) : COMMANDS;
  }, [query]);

  useEffect(() => {
    if (!open) return;

    // Return focus to wherever the visitor was once the palette closes.
    const previouslyFocused = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    return () => previouslyFocused?.focus();
  }, [open]);

  const close = () => {
    setQuery("");
    setActive(0);
    setCopied(false);
    onClose();
  };

  const run = async (command: Command | undefined) => {
    if (!command) return;

    if (command.copy) {
      try {
        await navigator.clipboard.writeText(command.copy);
        setCopied(true);
        setTimeout(close, 900);
      } catch {
        // Clipboard access can be refused, so fall back to the visitor's mail app.
        window.location.assign(`mailto:${command.copy}`);
        close();
      }
      return;
    }
    if (command.external) window.open(command.href, "_blank", "noopener,noreferrer");
    else if (command.href) router.push(command.href);
    close();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      close();
    } else if (event.key === "Tab") {
      // The search field is the only tab stop, which keeps focus inside the dialog.
      event.preventDefault();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current) => (results.length ? (current + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) => (results.length ? (current - 1 + results.length) % results.length : 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      void run(results[active]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/60 px-4 pt-[15vh] backdrop-blur-sm"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            onKeyDown={handleKeyDown}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-card-bg shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-card-border px-4">
              <Search className="h-4 w-4 shrink-0 text-foreground/50" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                }}
                placeholder="Search pages and links..."
                aria-label="Search pages and links"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-list"
                aria-activedescendant={results[active] ? `command-${active}` : undefined}
                className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-foreground/40"
              />
              <kbd className="rounded border border-card-border px-1.5 py-0.5 text-[10px] text-foreground/50">ESC</kbd>
            </div>

            <ul id="command-list" role="listbox" className="max-h-80 overflow-y-auto p-2 [scrollbar-color:#3f3f46_transparent] [scrollbar-width:thin]">
              {results.map((command, index) => {
                const Icon = command.icon;
                const showGroup = index === 0 || results[index - 1].group !== command.group;
                return (
                  <li key={command.label} role="presentation">
                    {showGroup && (
                      <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-foreground/40">
                        {command.group}
                      </p>
                    )}
                    <button
                      id={`command-${index}`}
                      type="button"
                      role="option"
                      aria-selected={index === active}
                      tabIndex={-1}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => void run(command)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                        index === active ? "bg-brand-primary/15 text-foreground" : "text-foreground/70"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {command.copy && copied ? "Copied!" : command.label}
                    </button>
                  </li>
                );
              })}
              {results.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-foreground/50">No results for that search.</li>
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
