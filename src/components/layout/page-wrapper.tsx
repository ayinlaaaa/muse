"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { SLIDE_UP, FADE_IN } from '@/shared/motion';

interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  const shouldReduceMotion = useReducedMotion();
  
  const variants = shouldReduceMotion ? FADE_IN : SLIDE_UP;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
