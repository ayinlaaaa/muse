"use client";

import { motion } from "framer-motion";
import { SLIDE_UP } from "@/shared/motion";

const STEPS = [
  {
    number: "01",
    title: "Tell MUSE what you want",
    description: "Speak naturally about moods, moments, or specific sounds you're looking for."
  },
  {
    number: "02",
    title: "MUSE understands the request",
    description: "Our AI analyzes your taste and the context of your request to find the perfect fit."
  },
  {
    number: "03",
    title: "MUSE finds music",
    description: "Get curated recommendations that go beyond the obvious hits."
  },
  {
    number: "04",
    title: "MUSE explains why",
    description: "Understand the connection between your request and the music recommended."
  },
  {
    number: "05",
    title: "Build your playlist",
    description: "Create and sync your new discovery directly to Spotify in one click."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-xl mb-20">
          <h2 className="text-sm font-medium uppercase tracking-widest text-accent mb-4">Process</h2>
          <h3 className="text-4xl md:text-5xl font-serif">How MUSE works</h3>
        </div>
        
        <div className="grid md:grid-cols-5 gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              variants={SLIDE_UP}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={i}
              className="space-y-4"
            >
              <div className="text-xs font-mono text-muted">{step.number}</div>
              <h4 className="text-lg font-medium">{step.title}</h4>
              <p className="text-secondary text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
