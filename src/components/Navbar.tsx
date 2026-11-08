"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { CommandPalette } from "@/components/CommandPalette";
import { EASE_OUT } from "@/lib/motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Events", href: "/events" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/Kanishk0412", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kanishktyagi-connect/", icon: FaLinkedin },
  { label: "Instagram", href: "https://www.instagram.com/kanishkcodez/", icon: FaInstagram },
];

const HIDE_AFTER_PX = 500;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.3 });

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(current > 20);
    // Get out of the way when reading down the page, and return on scroll up.
    setHidden(current > HIDE_AFTER_PX && current > previous);
  });

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((current) => !current);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-brand-primary to-brand-secondary motion-reduce:hidden"
      />

      <motion.header
        layoutRoot
        animate={{ y: hidden && !isOpen ? "-130%" : 0 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
        onFocusCapture={() => setHidden(false)}
        className="fixed inset-x-0 top-0 z-50 pt-3"
      >
        <div className="container mx-auto px-6 md:px-12">
        <div
          className={`-mx-5 flex items-center justify-between rounded-full border px-5 py-2.5 transition-colors duration-300 isolate ${
            scrolled || isOpen ? "nav-glass shadow-lg shadow-black/30" : "border-transparent"
          }`}
        >
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            Kanishk<span className="text-brand-primary">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-foreground ${
                    isActive ? "text-foreground" : "text-foreground/70"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.08]"
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}

            <div className="ml-2 flex items-center gap-3 border-l border-card-border pl-4">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="-m-1.5 p-1.5 text-foreground/70 transition-colors hover:text-foreground"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </Link>
              ))}
              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                aria-label="Open command palette"
                className="ml-1 hidden items-center gap-2 rounded-full border border-card-border bg-background/50 px-3 py-1.5 text-xs text-foreground/60 transition-colors hover:border-brand-primary/50 hover:text-foreground lg:flex"
              >
                <Search className="h-3.5 w-3.5" aria-hidden="true" />
                <kbd className="font-sans">Ctrl K</kbd>
              </button>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="-m-2 p-2 text-foreground md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.2, ease: EASE_OUT }}
              className="absolute inset-x-4 top-full mt-2 overflow-hidden rounded-3xl border border-white/10 bg-card-bg shadow-2xl md:hidden"
            >
              <nav className="flex flex-col space-y-4 px-6 py-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={`text-lg font-medium transition-colors hover:text-brand-primary ${
                      pathname === link.href ? "text-brand-primary" : "text-foreground/80"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="flex items-center space-x-6 border-t border-card-border pt-4">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="text-foreground/80 transition-colors hover:text-foreground"
                    >
                      <Icon className="h-6 w-6" />
                    </Link>
                  ))}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Outside the header, whose transform would otherwise trap this fixed overlay. */}
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
