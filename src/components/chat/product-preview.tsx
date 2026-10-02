"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Message, TrackRow } from "./preview-components";
import { SLIDE_UP, FADE_IN } from "@/shared/motion";

type PreviewStep = {
  type: 'user' | 'assistant' | 'thinking' | 'tracks' | 'action';
  content?: string;
  delay: number;
  tracks?: Array<{ title: string; artist: string; duration: string }>;
};

const PREVIEW_SEQUENCE: PreviewStep[] = [
  { type: 'user', content: "Give me something for a 2am drive.", delay: 1000 },
  { type: 'thinking', delay: 800 },
  { type: 'assistant', content: "Finding something atmospheric and steady for those quiet roads. Here's a mix that stays in the lane of moody R&B and nocturnal electronics.", delay: 500 },
  { type: 'tracks', tracks: [
    { title: "The Color Violet", artist: "Tory Lanez", duration: "3:46" },
    { title: "After Hours", artist: "The Weeknd", duration: "6:01" },
    { title: "Nightcall", artist: "Kavinsky", duration: "4:18" }
  ], delay: 1000 },
  { type: 'action', content: "Playlist created in Spotify.", delay: 2000 }
];

export function ProductPreview() {
  const [step, setStep] = useState(-1);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.5 });
  
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    if (!isInView) {
      timeout = setTimeout(() => setStep(-1), 0);
      return () => {
        cancelled = true;
        if (timeout) clearTimeout(timeout);
      };
    }

    const runSequence = async () => {
      for (let i = 0; i < PREVIEW_SEQUENCE.length; i++) {
        await new Promise<void>((resolve) => {
          timeout = setTimeout(resolve, PREVIEW_SEQUENCE[i].delay);
        });
        if (cancelled) return;
        setStep(i);
      }
    };

    void runSequence();
    return () => {
      cancelled = true;
      if (timeout) clearTimeout(timeout);
    };
  }, [isInView]);

  return (
    <section ref={containerRef} className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto border border-border bg-surface rounded-md overflow-hidden shadow-2xl">
          <div className="h-12 border-b border-border flex items-center px-4 gap-2">
            <div className="w-2 h-2 rounded-full bg-border-strong" />
            <div className="w-2 h-2 rounded-full bg-border-strong" />
            <div className="w-2 h-2 rounded-full bg-border-strong" />
            <div className="ml-4 text-[10px] uppercase tracking-widest text-muted font-medium">Preview Mode</div>
          </div>
          
          <div className="h-[500px] flex flex-col p-6 space-y-6 overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {step >= 0 && PREVIEW_SEQUENCE[0].content && (
                <Message key="msg-0" role="user" content={PREVIEW_SEQUENCE[0].content} />
              )}
              
              {step === 1 && (
                <motion.div key="thinking" variants={FADE_IN} initial="initial" animate="animate" exit="exit" className="flex gap-1 items-center">
                  <div className="text-xs text-muted uppercase tracking-widest mr-2">Thinking</div>
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [4, 12, 4] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                      className="w-0.5 bg-accent"
                    />
                  ))}
                </motion.div>
              )}
              
              {step >= 2 && PREVIEW_SEQUENCE[2].content && (
                <Message key="msg-2" role="assistant" content={PREVIEW_SEQUENCE[2].content} />
              )}
              
              {step >= 3 && (
                <motion.div
                  key="tracks"
                  variants={{
                    animate: { transition: { staggerChildren: 0.1 } }
                  }}
                  initial="initial"
                  animate="animate"
                  className="space-y-1 pl-4 border-l border-border"
                >
                  {PREVIEW_SEQUENCE[3].tracks?.map((track, i) => (
                    <TrackRow key={i} index={i + 1} {...track} />
                  ))}
                </motion.div>
              )}

              {step >= 4 && PREVIEW_SEQUENCE[4].content && (
                <motion.div
                  key="action"
                  variants={FADE_IN}
                  className="mt-4 flex items-center justify-center p-4 rounded bg-accent/5 border border-accent/20"
                >
                  <div className="text-xs font-medium text-accent uppercase tracking-widest">
                    {PREVIEW_SEQUENCE[4].content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
