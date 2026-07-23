"use client";
import {
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

export function useToothAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint
  check();

  window.addEventListener("resize", check);
  return () => window.removeEventListener("resize", check);
}, []);
  // Raw mouse position (-1 to 1)
    const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXVelocity = useVelocity(mouseX);
  const mouseYVelocity = useVelocity(mouseY);

  // Return static hardware styles immediately if on a mobile viewport
  

  // Idle floating targets — layered sines so it doesn't feel robotic
  const floatX = useMotionValue(0);
  // ... (Keep the rest of your original desktop animation physics calculations here)


  const floatY = useMotionValue(0);
  const floatRotate = useMotionValue(0);

  useAnimationFrame((t) => {
  if (isMobile) {
    floatX.set(0);
    floatY.set(0);
    floatRotate.set(0);
    return;
  }

  const time = t / 1000;

  floatX.set(Math.sin(time * 0.6) * 4 + Math.sin(time * 1.3 + 1) * 2);
  floatY.set(Math.sin(time * 0.9 + 0.5) * 8 + Math.sin(time * 1.7) * 3);
  floatRotate.set(Math.sin(time * 0.5) * 2.5);
});

  // Spring "personalities"
  const tiltSpring = { stiffness: 200, damping: 20, mass: 0.6 };
  const whipSpring = { stiffness: 140, damping: 10, mass: 0.4 };
  const floatSpring = { stiffness: 60, damping: 14, mass: 1 };
  const scaleSpring = { stiffness: 320, damping: 16, mass: 0.5 };

  // Base cursor tilt
  const rotateYBase = useSpring(useTransform(mouseX, [-1, 1], [-18, 18]), tiltSpring);
  const rotateXBase = useSpring(useTransform(mouseY, [-1, 1], [18, -18]), tiltSpring);

  // Extra "whip" kick from movement speed, clamped and sprung separately (faster response)
  const rotateYWhip = useSpring(
    useTransform(mouseXVelocity, [-4, 4], [-10, 10], { clamp: true }),
    whipSpring
  );
  const rotateXWhip = useSpring(
    useTransform(mouseYVelocity, [-4, 4], [10, -10], { clamp: true }),
    whipSpring
  );

  const rotateY = useTransform([rotateYBase, rotateYWhip], ([a, b]) => Number(a) + Number(b));
  const rotateX = useTransform([rotateXBase, rotateXWhip], ([a, b]) => Number(a) + Number(b));

  // Position: mouse-driven translate + idle float, combined
  const translateX = useSpring(useTransform(mouseX, [-1, 1], [-12, 12]), tiltSpring);
  const translateY = useSpring(useTransform(mouseY, [-1, 1], [-10, 10]), tiltSpring);
  const smoothFloatX = useSpring(floatX, floatSpring);
  const smoothFloatY = useSpring(floatY, floatSpring);
  const rotateZ = useSpring(floatRotate, floatSpring);

  const x = useTransform([translateX, smoothFloatX], ([a, b]) => Number(a) + Number(b));
  const y = useTransform([translateY, smoothFloatY], ([a, b]) => Number(a) + Number(b));

  // Squash & stretch scale (independent X/Y, slightly underdamped for a tiny bounce)
  const scaleX = useSpring(1, scaleSpring);
  const scaleY = useSpring(1, scaleSpring);

  // Grounding shadow — reacts to tilt so the tooth feels lifted toward the light
  // Grounding shadow — static, avoids per-frame filter recalculation
  const dropShadow = "drop-shadow(0px 14px 22px rgba(15, 23, 42, 0.28))";

  // Glossy highlight position (for an optional overlay div, e.g. radial-gradient)
  const glowX = useTransform(mouseX, [-1, 1], [20, 80]);
  const glowY = useTransform(mouseY, [-1, 1], [20, 80]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
  if (isMobile || !ref.current) return;

  const rect = ref.current.getBoundingClientRect();

  mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
  mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
}

  function handleMouseLeave() {
  if (isMobile) return;

  mouseX.set(0);
  mouseY.set(0);
}

  function handleHoverStart() {
  if (isMobile) return;

  isHovered.current = true;
  scaleX.set(1.1);
  scaleY.set(1.1);
}

  function handleHoverEnd() {
  if (isMobile) return;

  isHovered.current = false;
  scaleX.set(1);
  scaleY.set(1);
}

  function handleTapStart() {
    scaleX.set(1.16); // squash: wider
    scaleY.set(0.86); // squash: shorter
  }

  function handleTapEnd() {
    if (isHovered.current) {
      scaleX.set(1.1);
      scaleY.set(1.1);
    } else {
      scaleX.set(1);
      scaleY.set(1);
    }
  }

  return {
    ref,
    style: {
  rotateX: isMobile ? 0 : rotateX,
  rotateY: isMobile ? 0 : rotateY,
  rotateZ: isMobile ? 0 : rotateZ,
  x: isMobile ? 0 : x,
  y: isMobile ? 0 : y,
  scaleX,
  scaleY,
  filter: dropShadow,
  transformPerspective: 1200,
  transformStyle: "preserve-3d" as const,
  willChange: "transform",
},
    glow: { x: glowX, y: glowY },
    entrance: {
      initial: { opacity: 0, scale: 0.98, y: 15 },
      animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring", stiffness: 200, damping: 22, delay: 0.05 },
      },
    },

    events: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      onHoverStart: handleHoverStart,
      onHoverEnd: handleHoverEnd,
      onTapStart: handleTapStart,
      onTap: handleTapEnd,
      onTapCancel: handleTapEnd,
    },
  };
}
