'use client';

import {
  MotionValue,
  animate,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
} from "framer-motion";
import { useEffect } from "react";
/* ==========================================================
   NOGAN MOTION ENGINE
   Part 1 — Physics Foundation
========================================================== */

export const motionConfig = {
  perspective: 1800,

  spring: {
    type: "spring" as const,
    stiffness: 165,
    damping: 21,
    mass: 0.72,
  },

  springFast: {
    type: "spring" as const,
    stiffness: 340,
    damping: 26,
    mass: 0.45,
  },

  springSoft: {
    type: "spring" as const,
    stiffness: 120,
    damping: 18,
    mass: 0.9,
  },

  ease: [0.16, 1, 0.30, 1] as const,
};

/* ==========================================================
   Motion Engine
========================================================== */

export function useMotionEngine() {

  const reduced = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, motionConfig.spring);
  const y = useSpring(rawY, motionConfig.spring);

  const velocityX = useVelocity(x);
  const velocityY = useVelocity(y);

  return {
    reduced,

    rawX,
    rawY,

    x,
    y,

    velocityX,
    velocityY,
  };
}

/* ==========================================================
   Cursor Tilt
========================================================== */

export function useTiltMotion(max = 8) {

  const engine = useMotionEngine();

  const rotateY = useTransform(
    engine.x,
    [-0.5, 0.5],
    [-max, max]
  );

  const rotateX = useTransform(
    engine.y,
    [-0.5, 0.5],
    [max, -max]
  );

  const translateZ = useTransform(
    engine.y,
    [-0.5, 0.5],
    [12, 30]
  );

  function onMove(
    e: React.MouseEvent<HTMLDivElement>
  ) {

    const rect = e.currentTarget.getBoundingClientRect();

    const px =
      (e.clientX - rect.left) / rect.width;

    const py =
      (e.clientY - rect.top) / rect.height;

    engine.rawX.set(px - 0.5);
    engine.rawY.set(py - 0.5);
  }

  function onLeave() {
  (animate as any)(engine.rawX, 0, motionConfig.springSoft);
  (animate as any)(engine.rawY, 0, motionConfig.springSoft);
}

  return {

    rotateX,
    rotateY,
    translateZ,

    onMouseMove: onMove,
    onMouseLeave: onLeave,

    style: {

      rotateX,
      rotateY,

      transformPerspective:
        motionConfig.perspective,

      transformStyle:
        "preserve-3d" as const,

      willChange:
        "transform",
    },
  };
}

/* ==========================================================
   Image Depth
========================================================== */

export function useImageDepth() {

  const engine = useMotionEngine();

  const scale = useTransform(
    engine.y,
    [-0.5, 0.5],
    [1.018, 1.03]
  );

  const rotate = useTransform(
    engine.x,
    [-0.5, 0.5],
    [-0.4, 0.4]
  );

  const y = useTransform(
    engine.y,
    [-0.5, 0.5],
    [-6, 6]
  );

  return {

    scale,
    rotate,
    y,

    style: {
      scale,
      rotate,
      y,
      willChange:
        "transform",
    },
  };
}

/* ==========================================================
   Ambient Floating
========================================================== */

/* ==========================================================
   Ambient Floating
========================================================== */

import type { Transition } from "framer-motion";

const floatingTransition: Transition = {
  duration: 16,
  repeat: Infinity,
  ease: "easeInOut",
};

export const floatingImageFx = {
  floating: {
    y: [0, -2, 0, 2, 0],
    rotate: [0, 0.15, 0, -0.15, 0],
    transition: floatingTransition,
  },
};
/* ==========================================================
   PREMIUM COMPONENT PRESETS
========================================================== */

export const cardHoverFx = {

  initial: {
    scale: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    filter: "brightness(100%)",
  },

  whileHover: {

    y: -6,

    scale: 1.012,

    rotateX: -1.4,

    rotateY: 1.8,

    filter: "brightness(101%)",

    transition: {
      ...motionConfig.spring,
    },
  },

  whileTap: {
    scale: 0.992,
    y: -2,

    transition: {
      duration: .12,
    },
  },
};

/* ---------------------------------------------------------- */

export const imageHoverFx = {

  initial: {

    scale: 1,

    rotate: 0,

    filter:
      "brightness(100%) saturate(100%)",

  },

  whileHover: {

    scale: 1.024,

    rotate: -.25,

    filter:
      "brightness(101%) saturate(103%)",

    transition: {

      duration: .9,

      ease: motionConfig.ease,
    },
  },
};

/* ---------------------------------------------------------- */

export const buttonHoverFx = {

  whileHover: {

    scale: 1.018,

    y: -2,

    transition: motionConfig.springFast,

  },

  whileTap: {

    scale: .985,

    transition: {

      duration: .1,
    },
  },
};

/* ---------------------------------------------------------- */

export const linkHoverFx = {

  whileHover: {

    x: 4,

    transition: {

      duration: .32,

      ease: motionConfig.ease,
    },
  },
};

/* ---------------------------------------------------------- */

export const badgeHoverFx = {

  whileHover: {

    rotate: -3,

    scale: 1.05,

    transition:
      motionConfig.spring,
  },
};

/* ---------------------------------------------------------- */

export const titleHoverFx = {

  whileHover: {

    y: -1,

    transition: {

      duration: .25,

      ease: motionConfig.ease,
    },
  },
};

/* ---------------------------------------------------------- */

export const ctaHoverFx = {

  whileHover: {

    y: -2,

    scale: 1.01,

    transition:
      motionConfig.spring,
  },
};

/* ---------------------------------------------------------- */

export const sectionHoverFx = {

  whileHover: {

    transition: {

      staggerChildren: .04,
    },
  },
};
