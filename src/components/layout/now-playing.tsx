"use client";

import { motion } from "framer-motion";
import { Music2 } from "lucide-react";

export function NowPlaying() {
  return (
    <aside className="w-[280px] h-screen border-l border-border bg-background flex flex-col hidden lg:flex">
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
        <div className="w-full aspect-square bg-surface border border-border rounded-md flex items-center justify-center group relative overflow-hidden">
          <Music2 className="w-12 h-12 text-muted/20 group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted">Nothing playing</h3>
          <p className="text-xs text-muted/60 max-w-[180px] mx-auto">
            Select a track to start your listening session.
          </p>
        </div>
      </div>
      
      <div className="p-6 border-t border-border">
        {/* Playback controls (Honest empty state) */}
        <div className="flex flex-col gap-4 opacity-20 pointer-events-none">
          <div className="h-1 bg-border-strong rounded-full w-full" />
          <div className="flex items-center justify-center gap-6">
            <div className="w-4 h-4 bg-primary rounded-full" />
            <div className="w-8 h-8 bg-primary rounded-full" />
            <div className="w-4 h-4 bg-primary rounded-full" />
          </div>
        </div>
      </div>
    </aside>
  );
}
