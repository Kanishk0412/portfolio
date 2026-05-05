"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 md:px-12 py-12">
      <SectionHeading 
        title="About Me" 
        subtitle="The story behind the code and the communities." 
      />

      <div className="flex flex-col lg:flex-row gap-16 items-start mt-12">
        {/* Left Column - Image & Quick Facts */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/3 space-y-8"
        >
          <div className="aspect-[4/5] bg-card-bg rounded-3xl overflow-hidden border border-card-border relative shadow-2xl">
            {/* User image */}
            <img src="/profile.jpg" alt="Kanishk Tyagi" className="w-full h-full object-cover" onError={(e) => {
              (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Kanishk+Tyagi&background=18181b&color=fafafa&size=800";
            }} />
          </div>

          <div className="bg-card-bg border border-card-border rounded-2xl p-6">
            <h3 className="font-bold text-xl mb-4">Tech Arsenal</h3>
            <div className="flex flex-wrap gap-2">
              {["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Supabase", "Python"].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-background text-sm font-medium rounded-full border border-card-border">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column - Bio & Timeline */}
        <div className="w-full lg:w-2/3 space-y-12">
          
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <span className="w-8 h-8 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center mr-3">👋</span>
              My Journey
            </h2>
            <div className="text-foreground/80 space-y-4 leading-relaxed text-lg">
              <p>
                Hello! I'm Kanishk Tyagi, a passionate Full Stack Developer who believes that writing code is only half the job. The other half is building up the community around it.
              </p>
              <p>
                My background includes diverse roles, from tackling complex engineering challenges to managing customer support, which taught me that empathy is the most important skill in building user-centric products.
              </p>
              <p>
                Outside of coding, you'll often find me organizing tech meetups, speaking at conferences, or mentoring the next generation of developers through organizations like GDG and TFUG.
              </p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Briefcase className="w-6 h-6 mr-3 text-brand-secondary" />
              Experience
            </h2>
            <div className="space-y-6 pl-4 border-l-2 border-card-border">
              {[
                { title: "Senior Full Stack Developer", company: "TechNova Solutions", period: "2024 - Present" },
                { title: "Community Manager", company: "Google Developer Groups", period: "2023 - Present" },
                { title: "Software Engineer", company: "DevSphere", period: "2022 - 2024" },
                { title: "Customer Support Specialist", company: "TechHelp Inc", period: "2021 - 2022" },
              ].map((job, idx) => (
                <div key={idx} className="relative pl-6">
                  <span className="absolute -left-[35px] top-1.5 w-4 h-4 rounded-full bg-brand-secondary border-4 border-background" />
                  <h4 className="text-xl font-bold">{job.title}</h4>
                  <div className="text-foreground/70 font-medium mb-1">{job.company}</div>
                  <div className="text-sm text-foreground/50">{job.period}</div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <GraduationCap className="w-6 h-6 mr-3 text-brand-primary" />
              Education
            </h2>
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h4 className="text-xl font-bold">B.Tech in Computer Science</h4>
                <div className="text-foreground/70 mt-1">Tech University</div>
              </div>
              <div className="text-foreground/50 text-sm font-medium bg-background px-4 py-2 rounded-full border border-card-border w-fit">
                Class of 2022
              </div>
            </div>
          </motion.section>

        </div>
      </div>
    </div>
  );
}
