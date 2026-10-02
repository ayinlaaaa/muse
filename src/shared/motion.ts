import { Transition, Variants } from 'framer-motion';

export const TIMING = {
  INSTANT: 0.09,
  FAST: 0.14,
  BASE: 0.22,
  SLOW: 0.36,
  SCENE: 0.6,
};

export const EASING = {
  STANDARD: [0.2, 0, 0, 1] as [number, number, number, number],
  EMPHASIZED: [0.16, 1, 0.3, 1] as [number, number, number, number],
  EXIT: [0.16, 1, 0.3, 1] as [number, number, number, number], // Using same for now
};

export const SPRING = {
  type: 'spring',
  stiffness: 260,
  damping: 20,
  mass: 1,
} as const;

export const SOFT_SPRING = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
  mass: 1,
} as const;

export const FADE_IN: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: TIMING.BASE, ease: EASING.STANDARD } },
  exit: { opacity: 0, transition: { duration: TIMING.FAST, ease: EASING.STANDARD } },
};

export const SLIDE_UP: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: TIMING.BASE, ease: EASING.STANDARD } },
  exit: { opacity: 0, y: 8, transition: { duration: TIMING.FAST, ease: EASING.STANDARD } },
};

export const MASK_REVEAL: Variants = {
  initial: { clipPath: 'inset(100% 0% 0% 0%)', y: 20 },
  animate: { 
    clipPath: 'inset(0% 0% 0% 0%)', 
    y: 0, 
    transition: { 
      duration: TIMING.SCENE, 
      ease: EASING.EMPHASIZED 
    } 
  },
};

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 26, // Critically damped
};
