"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { Mail, Send, Loader2, CheckCircle } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const { error } = await supabase.from("contacts").insert([formData]);
      if (error) throw error;

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-6 md:px-12 py-12">
      <SectionHeading 
        title="Get In Touch" 
        subtitle="Have a question or want to work together? Leave a message." 
      />

      <div className="flex flex-col lg:flex-row gap-12 mt-12">
        {/* Contact Info */}
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
            
            <div className="space-y-6 mb-12">
              <Link href="mailto:hello@kanishk.com" className="flex items-center text-foreground/80 hover:text-brand-primary transition-colors">
                <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center mr-4">
                  <Mail className="w-5 h-5 text-brand-primary" />
                </div>
                hello@kanishk.com
              </Link>
            </div>

            <h4 className="font-semibold text-lg mb-4">Follow Me</h4>
            <div className="flex space-x-4">
              <Link href="https://github.com" target="_blank" className="p-3 bg-background rounded-full hover:bg-brand-primary transition-colors hover:text-white border border-card-border">
                <FaGithub className="w-5 h-5" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="p-3 bg-background rounded-full hover:bg-brand-primary transition-colors hover:text-white border border-card-border">
                <FaLinkedin className="w-5 h-5" />
              </Link>
              <Link href="https://instagram.com" target="_blank" className="p-3 bg-background rounded-full hover:bg-brand-secondary transition-colors hover:text-white border border-card-border">
                <FaInstagram className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full lg:w-2/3"
        >
          <div className="bg-card-bg border border-card-border rounded-3xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground/80">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-card-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-shadow"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground/80">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-card-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-shadow"
                    placeholder="john@example.com"
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
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-card-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-shadow resize-none"
                  placeholder="How can I help you?"
                />
              </div>

              {status === "error" && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm">
                  Something went wrong. Please try again later.
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
