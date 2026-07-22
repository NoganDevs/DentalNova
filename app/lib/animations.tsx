// lib/animations.ts
import { Variants, Transition } from 'framer-motion';

/**
 * Architectural Motion Curve
 * Custom cubic-bezier matching high-end editorial and luxury UI inertia.
 */
export const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Dynamic Spring Config
 * Fluid physics for hover states and micro-interactions.
 */
export const SMOOTH_SPRING: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 28,
  mass: 0.8,
};

// ==========================================
// CONTAINER & STAGGER VARIANTS
// ==========================================

/**
 * Main Section Container Stagger
 * Orchestrates staggered entry across all child elements.
 */
export const staggerContainerVariants: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
      when: 'beforeChildren',
    },
  },
};

/**
 * Sub-Grid Stagger
 * Used for inner card grids to create nested entrance rhythms.
 */
export const gridStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// ==========================================
// SCROLL ENTRANCE VARIANTS
// ==========================================

/**
 * Primary Vertical Reveal
 * Smooth rise with subtle blur dissipation for heavy headlines and narratives.
 */
export const fadeInUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 32,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.1,
      ease: LUXURY_EASE,
    },
  },
};

/**
 * Architectural Line Expansion
 * Expands decorative borders smoothly from the origin edge.
 */
export const lineExpandVariants: Variants = {
  hidden: { 
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 1.3,
      ease: LUXURY_EASE,
    },
  },
};

/**
 * Clip-Path Mask Reveal
 * Masking wipe for high-impact editorial images or featured blocks.
 */
export const maskRevealVariants: Variants = {
  hidden: { 
    clipPath: 'inset(0% 100% 0% 0%)',
    opacity: 0,
  },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: LUXURY_EASE,
    },
  },
};

// ==========================================
// MICRO-INTERACTION & HOVER VARIANTS
// ==========================================

/**
 * Pillar Card Hover Physics
 * Clean vertical lift with GPU-accelerated transition.
 */
export const cardHoverMotion: Variants = {
  rest: { 
    y: 0,
    boxShadow: '0px 0px 0px rgba(0,0,0,0)',
    transition: {
      duration: 0.4,
      ease: LUXURY_EASE,
    },
  },
  hover: {
    y: -6,
    boxShadow: '0px 20px 40px -15px rgba(0,0,0,0.05)',
    transition: SMOOTH_SPRING,
  },
};

/**
 * Top Border Accent Line Reveal
 * Expands across the top edge on card hover.
 */
export const accentLineHover: Variants = {
  rest: { 
    scaleX: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: LUXURY_EASE,
    },
  },
  hover: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: LUXURY_EASE,
    },
  },
};

/**
 * Interactive Arrow Icon Shift
 * Angles up and right on hover.
 */
export const arrowHoverMotion: Variants = {
  rest: { 
    x: 0, 
    y: 0,
    transition: { duration: 0.3, ease: LUXURY_EASE }
  },
  hover: { 
    x: 3, 
    y: -3,
    transition: SMOOTH_SPRING
  },
};

// --- Enhanced Doctor Showcase Specific Animations ---

/**
 * Enhanced Card Container: Smooth Y-shift on hover
 */
export const v_doctorCard = {
  rest: {
    y: 0,
    boxShadow: "0 0px 0px rgba(0,0,0,0)",
    transition: {
      duration: 0.5,
      ease: [0.19, 1, 0.22, 1], // Custom Bézier for gentle transition
    },
  },
  hover: {
    y: -8, // Slightly more pronounced shift
    boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05)", // Ultra-subtle depth shadow
    transition: {
      duration: 0.5,
      ease: [0.19, 1, 0.22, 1],
    },
  },
};

/**
 * Doctor Parallax Image: Combines scaling with shifting
 * Creates a sense of depth inside the container on hover.
 */
export const v_doctorImageParallax = {
  rest: {
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.19, 1, 0.22, 1],
    },
  },
  hover: {
    scale: 1.08,
    y: -10, // Image "rises" slightly inside its container
    transition: {
      duration: 0.8,
      ease: [0.19, 1, 0.22, 1],
    },
  },
};

/**
 * Moves the Arrow icon when the card is hovered
 */
export const v_arrowMove = {
    rest: {
        x: 0, y: 0,
        transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] }
    },
    hover: {
        x: 2, y: -2,
        transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] }
    }
}