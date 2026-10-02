"use client";

import { motion } from "framer-motion";
import { SLIDE_UP } from "@/shared/motion";
import { Logo } from "@/components/ui/logo";

const FEATURES = [
  {
    title: "Natural Language Chat",
    description: "No more rigid filters. Talk to MUSE like you'd talk to a friend who knows your library."
  },
  {
    title: "AI-Powered Discovery",
    description: "Discover tracks that resonate with your current mood, even if they're outside your usual rotation."
  },
  {
    title: "Explainable Recommendations",
    description: "Every recommendation comes with a 'Why this' explanation, connecting the music to your intent."
  },
  {
    title: "Spotify Integration",
    description: "Seamlessly sync your discoveries to your library and create playlists in seconds."
  }
];

export function Features() {
  return (
    <section className="py-32 bg-surface border-y border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-xl mb-20">
          <h2 className="text-sm font-medium uppercase tracking-widest text-accent mb-4">Capabilities</h2>
          <h3 className="text-4xl md:text-5xl font-serif">What MUSE can do</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-x-20 gap-y-16">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              variants={SLIDE_UP}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="text-xl font-medium">{feature.title}</h4>
              <p className="text-secondary leading-relaxed max-w-md">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="py-32 text-center">
      <div className="container mx-auto px-6">
        <motion.div
          variants={SLIDE_UP}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto space-y-10"
        >
          <h3 className="text-5xl md:text-7xl font-serif tracking-tight">Ready to listen?</h3>
          <p className="text-secondary text-xl">
            Connect your Spotify account to start exploring your music with MUSE.
          </p>
          <div className="flex flex-col items-center gap-4">
             <button disabled className="px-8 h-14 bg-accent text-background rounded-md font-medium text-lg opacity-50 cursor-not-allowed">
              Connect Spotify
            </button>
            <p className="text-xs text-muted uppercase tracking-widest">Available soon</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
