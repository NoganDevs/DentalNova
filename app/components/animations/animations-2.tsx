"use client";

import { Variants } from "framer-motion";

/* ---------- Easing & Physics Design Tokens ---------- */

// Snappy spring with a tiny, pleasing natural bounce
const SPRING_SNAPPY = {
  type: "spring",
  stiffness: 260,
  damping: 24,
  mass: 0.8,
};

// Smooth spring for subtle scaling/reveals
const SPRING_SMOOTH = {
  type: "spring",
  stiffness: 140,
  damping: 20,
  mass: 1,
} as const;

// Apple-style bespoke quintic cubic-bezier curve
const EASE_CUSTOM: [number, number, number, number] = [
  0.22,
  1,
  0.36,
  1,
];
export const viewport = {
  once: true,
  amount: 0.2,
};

/* ---------- Parent ---------- */

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

/* ---------- Header ---------- */

export const headingReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE_CUSTOM,
    },
  },
};

export const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_CUSTOM,
    },
  },
};

/* ---------- Images ---------- */

export const imageRevealLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -32,
    scale: 0.95,
    rotate: -1.5,
  },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotate: 0,
    transition: {
      ...SPRING_SMOOTH,
      opacity: { duration: 0.5, ease: EASE_CUSTOM },
    },
  },
};
export const imageRevealRight: Variants = {
  hidden: {
    opacity: 0,
    x: 32,
    scale: 0.95,
    rotate: 1.5,
  },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotate: 0,
    transition: {
      ...SPRING_SMOOTH,
      opacity: { duration: 0.5, ease: EASE_CUSTOM },
    },
  },
};

/* ---------- Content ---------- */

export const contentLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -24,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: EASE_CUSTOM,
    },
  },
};

export const contentRight: Variants = {
  hidden: {
    opacity: 0,
    x: 24,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: EASE_CUSTOM,
    },
  },
};

/* ---------- Cards / CTA ---------- */

export const fadeScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 16,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: SPRING_SMOOTH,
  },
};

export const listItem: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: EASE_CUSTOM,
    },
  },
};

/* ---------- Mobile ---------- */

export const mobileImage: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: SPRING_SMOOTH,
  },
};

export const mobileContent: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: EASE_CUSTOM,
    },
  },
};

/* ---------- Interactive Hover/Tap State Objects ---------- */

export const imageHover = {
  whileHover: {
    scale: 1.02,
    y: -2,
    transition: SPRING_SNAPPY,
  },
  whileTap: {
    scale: 0.98,
    transition: SPRING_SNAPPY,
  },
};

export const buttonHover = {
  whileHover: {
    y: -2,
    scale: 1.02,
    transition: SPRING_SNAPPY,
  },
  whileTap: {
    scale: 0.96,
    transition: SPRING_SNAPPY,
  },
};

export const linkHover = {
  whileHover: {
    x: 4,
    transition: SPRING_SNAPPY,
  },
};
