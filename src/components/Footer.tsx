import Link from "next/link";
import { Mail, CalendarClock } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FooterWordmark } from "@/components/FooterWordmark";

export function Footer() {
  return (
    <footer className="bg-card-bg border-t border-card-border mt-auto">
      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tighter mb-4 block">
              Kanishk<span className="text-brand-primary">.</span>
            </Link>
            <p className="text-foreground/70 max-w-sm">
              Developer, Tech Speaker, and Community Builder crafting digital experiences and empowering communities.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/projects" className="text-foreground/70 hover:text-brand-primary transition-colors">Projects</Link></li>
              <li><Link href="/events" className="text-foreground/70 hover:text-brand-primary transition-colors">Speaking & Events</Link></li>
              <li><Link href="/about" className="text-foreground/70 hover:text-brand-primary transition-colors">About Me</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <div className="mb-5 flex gap-4">
              <Link href="https://github.com/Kanishk0412" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 bg-background rounded-full hover:bg-brand-primary transition-colors hover:text-white">
                <FaGithub className="w-5 h-5" />
              </Link>
              <Link href="https://www.linkedin.com/in/kanishktyagi-connect/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 bg-background rounded-full hover:bg-brand-primary transition-colors hover:text-white">
                <FaLinkedin className="w-5 h-5" />
              </Link>
              <Link href="https://www.instagram.com/kanishkcodez/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 bg-background rounded-full hover:bg-brand-secondary transition-colors hover:text-white">
                <FaInstagram className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex flex-col items-start gap-3">
              <Link href="mailto:kanishktyagi.connect@gmail.com" className="inline-flex items-center text-foreground/70 hover:text-brand-primary transition-colors">
                <Mail className="mr-2 h-4 w-4 shrink-0" />
                Let&apos;s chat!
              </Link>
              <Link
                href="https://topmate.io/kanishk_tyagi10/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-foreground/70 hover:text-brand-secondary transition-colors"
              >
                <CalendarClock className="mr-2 h-4 w-4 shrink-0" />
                Book a 1:1 on Topmate
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-card-border pt-8 text-center text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Kanishk Tyagi. All rights reserved.</p>
        </div>
      </div>
      <FooterWordmark />
    </footer>
  );
}
