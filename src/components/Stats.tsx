"use client";

import { motion } from "framer-motion";

interface StatProps {
  label: string;
  value: string;
  suffix?: string;
  index: number;
}

const Stat = ({ label, value, suffix, index }: StatProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-6 bg-card-bg border border-card-border rounded-2xl text-center flex flex-col items-center justify-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-baseline">
        {value}<span className="text-brand-primary ml-1 text-2xl">{suffix}</span>
      </div>
      <div className="text-foreground/70 font-medium">{label}</div>
    </motion.div>
  );
};

export function Stats() {
  const stats = [
    { label: "Events Attended", value: "50", suffix: "+" },
    { label: "Talks Given", value: "15", suffix: "+" },
    { label: "Community Reach", value: "10", suffix: "k+" },
    { label: "Hackathons Judged", value: "8", suffix: "+" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
      {stats.map((stat, idx) => (
        <Stat key={stat.label} {...stat} index={idx} />
      ))}
    </div>
  );
}
