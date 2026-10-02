"use client";

import { motion } from "framer-motion";
import { cn } from "@/shared/utils";
import { SLIDE_UP } from "@/shared/motion";

interface MessageProps {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

export function Message({ role, content, isStreaming }: MessageProps) {
  return (
    <motion.div
      variants={SLIDE_UP}
      className={cn(
        "flex flex-col max-w-[85%]",
        role === 'user' ? "ml-auto text-right" : "mr-auto text-left"
      )}
    >
      <div className={cn(
        "px-4 py-2 rounded-lg text-sm md:text-base",
        role === 'user' 
          ? "bg-accent text-background font-medium" 
          : "bg-surface text-primary border border-border"
      )}>
        {content}
        {isStreaming && (
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-1 h-4 bg-accent ml-1 translate-y-0.5"
          />
        )}
      </div>
    </motion.div>
  );
}

interface TrackRowProps {
  index: number;
  title: string;
  artist: string;
  duration: string;
  artwork?: string;
  reason?: string;
}

export function TrackRow({ index, title, artist, duration, reason }: TrackRowProps) {
  return (
    <motion.div
      variants={SLIDE_UP}
      className="group flex items-center gap-4 p-2 rounded-md hover:bg-surface transition-colors cursor-pointer"
    >
      <div className="w-8 text-muted text-xs font-mono group-hover:hidden">
        {String(index).padStart(2, '0')}
      </div>
      <div className="hidden group-hover:flex w-8 text-accent items-center justify-center">
        <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-accent border-b-[5px] border-b-transparent ml-1" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{title}</div>
        <div className="text-xs text-secondary truncate">{artist}</div>
      </div>
      
      <div className="text-xs text-muted font-mono">{duration}</div>
    </motion.div>
  );
}
