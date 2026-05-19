import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

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
            <div className="flex space-x-4 mb-4">
              <Link href="https://github.com" target="_blank" className="p-2 bg-background rounded-full hover:bg-brand-primary transition-colors hover:text-white">
                <FaGithub className="w-5 h-5" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="p-2 bg-background rounded-full hover:bg-brand-primary transition-colors hover:text-white">
                <FaLinkedin className="w-5 h-5" />
              </Link>
              <Link href="https://instagram.com" target="_blank" className="p-2 bg-background rounded-full hover:bg-brand-secondary transition-colors hover:text-white">
                <FaInstagram className="w-5 h-5" />
              </Link>
            </div>
            <Link href="mailto:contact@kanishk.com" className="inline-flex items-center text-foreground/70 hover:text-brand-primary transition-colors">
              <Mail className="w-4 h-4 mr-2" />
              Let's chat!
            </Link>
          </div>
        </div>
        
        <div className="border-t border-card-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Kanishk Tyagi. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Built with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
