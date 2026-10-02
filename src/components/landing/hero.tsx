"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { MASK_REVEAL, FADE_IN } from "@/shared/motion";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";

export function Hero() {
  const { user } = useAuth();

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 text-left">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <motion.h1
            variants={MASK_REVEAL}
            className="mb-12 inline-block"
          >
            <Logo variant="wordmark" className="w-[240px] md:w-[480px]" />
          </motion.h1>
          
          <motion.div variants={FADE_IN} className="max-w-2xl">
            <h2 className="text-2xl md:text-4xl font-light text-primary mb-6 leading-tight">
              Your music, understood.
            </h2>
            <p className="text-secondary text-lg md:text-xl mb-10 leading-relaxed max-w-lg">
              Discover music, build playlists, and explore your taste through conversation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {user ? (
                <Link href="/chat">
                  <Button size="lg" className="relative overflow-hidden group">
                    Go to Chat
                    <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </Button>
                </Link>
              ) : (
                <Link href="/api/auth/login">
                  <Button size="lg" className="relative overflow-hidden group">
                    Connect Spotify
                    <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </Button>
                </Link>
              )}
              <Button variant="secondary" size="lg" onClick={() => {
                const element = document.getElementById('how-it-works');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}>
                See how it works
              </Button>
            </div>
            
            {!user && (
              <p className="mt-4 text-[10px] text-muted uppercase tracking-[0.2em] font-medium">
                Spotify Premium Recommended
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
