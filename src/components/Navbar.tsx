"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Events", href: "/events" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-card-border py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          Kanishk<span className="text-brand-primary">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-brand-primary ${
                pathname === link.href ? "text-brand-primary" : "text-foreground/80"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center space-x-4 ml-4 border-l border-card-border pl-4">
            <Link href="https://github.com/Kanishk0412" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-white transition-colors">
              <FaGithub className="w-5 h-5" />
            </Link>
            <Link href="https://www.linkedin.com/in/kanishktyagi-connect/" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-brand-primary transition-colors">
              <FaLinkedin className="w-5 h-5" />
            </Link>
            <Link href="https://www.instagram.com/hiresphere.in/" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-brand-secondary transition-colors">
              <FaInstagram className="w-5 h-5" />
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background border-b border-card-border md:hidden shadow-xl"
          >
            <nav className="flex flex-col px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium transition-colors hover:text-brand-primary ${
                    pathname === link.href ? "text-brand-primary" : "text-foreground/80"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center space-x-6 pt-4 border-t border-card-border">
                <Link href="https://github.com/Kanishk0412" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-white transition-colors">
                  <FaGithub className="w-6 h-6" />
                </Link>
                <Link href="https://www.linkedin.com/in/kanishktyagi-connect/" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-brand-primary transition-colors">
                  <FaLinkedin className="w-6 h-6" />
                </Link>
                <Link href="https://www.instagram.com/hiresphere.in/" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-brand-secondary transition-colors">
                  <FaInstagram className="w-6 h-6" />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
