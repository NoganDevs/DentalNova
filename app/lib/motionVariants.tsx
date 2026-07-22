// lib/animations/motionVariants.ts
import { Variants } from 'framer-motion';

/**
 * Parent container variant to stagger children elements sequentially.
 */
export const staggerContainer: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

/**
 * Standard subtle fade up with slight scaling for smooth component entry.
 */
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 28,
    scale: 0.99
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1], // Custom snappy cubic-bezier curve
    },
  },
};

/**
 * Asymmetric entrance sliding from the left side.
 */
export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -32 
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Asymmetric entrance sliding from the right side.
 */
export const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 32 
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Clean fade-in without dimensional movement for overlays or subtle badges.
 */
export const fadeIn: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};