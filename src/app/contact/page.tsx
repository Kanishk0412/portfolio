"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { Mail, Send, Loader2, CheckCircle, CalendarClock } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const LIMITS = { name: 100, email: 254, message: 2000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: { name: string; email: string; message: string }): string | null {
  if (!data.name) return "Please enter your name.";
  if (data.name.length > LIMITS.name) return "Name is too long.";
  if (!data.email) return "Please enter your email.";
  if (data.email.length > LIMITS.email || !EMAIL_RE.test(data.email))
    return "Please enter a valid email address.";
  if (!data.message) return "Please enter a message.";
  if (data.message.length > LIMITS.message) return "Message is too long (max 2000 characters).";
  return null;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  // The server checks this honeypot before it performs validation or writes.
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("Something went wrong. Please try again later.");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      website,
    };

    const validationError = validate(payload);
    if (validationError) {
      setErrorMsg(validationError);
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        throw new Error(result?.error ?? "Something went wrong. Please try again later.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setWebsite("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setErrorMsg(
        error instanceof Error ? error.message : "Something went wrong. Please try again later.",
      );
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (status === "error") setStatus("idle");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-6 md:px-12 py-12">
      <SectionHeading 
        title="Get In Touch" 
        subtitle="Have a question or want to work together? Leave a message." 
      />

      <div className="flex flex-col lg:flex-row gap-12 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/3 space-y-8"
        >
          <div className="bg-card-bg border border-card-border rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <p className="text-foreground/70 mb-8">
              Fill out the form and I will get back to you within 24 hours.
            </p>
            
            <div className="space-y-4 mb-12">
              <Link href="mailto:kanishktyagi.connect@gmail.com" className="flex items-center text-foreground/80 hover:text-brand-primary transition-colors">
                <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center mr-4">
                  <Mail className="w-5 h-5 text-brand-primary" />
                </div>
                kanishktyagi.connect@gmail.com
              </Link>
              <Link
                href="https://topmate.io/kanishk_tyagi10/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-foreground/80 hover:text-brand-secondary transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-brand-secondary/10 flex items-center justify-center mr-4">
                  <CalendarClock className="w-5 h-5 text-brand-secondary" />
                </div>
                Book a 1:1 session on Topmate
              </Link>
            </div>

            <h4 className="font-semibold text-lg mb-4">Follow Me</h4>
            <div className="flex space-x-4">
              <Link href="https://github.com/Kanishk0412" target="_blank" rel="noopener noreferrer" className="p-3 bg-background rounded-full hover:bg-brand-primary transition-colors hover:text-white border border-card-border">
                <FaGithub className="w-5 h-5" />
              </Link>
              <Link href="https://www.linkedin.com/in/kanishktyagi-connect/" target="_blank" rel="noopener noreferrer" className="p-3 bg-background rounded-full hover:bg-brand-primary transition-colors hover:text-white border border-card-border">
                <FaLinkedin className="w-5 h-5" />
              </Link>
              <Link href="https://www.instagram.com/kanishkcodez/" target="_blank" rel="noopener noreferrer" className="p-3 bg-background rounded-full hover:bg-brand-secondary transition-colors hover:text-white border border-card-border">
                <FaInstagram className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full lg:w-2/3"
        >
          <div className="bg-card-bg border border-card-border rounded-3xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field — hidden from real users, catches naive bots.
                  Zero-size + clipped so it never affects layout or scroll width. */}
              <div
                aria-hidden="true"
                className="absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none"
                style={{ clip: "rect(0 0 0 0)" }}
              >
                <label htmlFor="website">Website (leave this empty)</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground/80">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    maxLength={100}
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-card-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-shadow"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground/80">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-card-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-shadow"
                    placeholder="you@email.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground/80">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  maxLength={2000}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-card-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-shadow resize-none"
                  placeholder="Tell me what you're working on, or just say hi."
                />
              </div>

              {status === "error" && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm">
                  {errorMsg}
                </div>
              )}

              {status === "success" ? (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-xl flex items-center justify-center text-sm font-medium">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Message sent successfully!
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl font-semibold transition-colors flex items-center justify-center disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
