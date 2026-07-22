"use client";
import { useEffect, useRef } from "react";
interface AnimatedCounterProps {
  value: number;
  suffix: string;
  decimals?: number;
  duration?: number;
}
export default function AnimatedCounter({
  value,
  suffix,
  decimals = 0,
  duration = 1600,
}: AnimatedCounterProps) {
  const elRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = progress * value;
      const formatted = decimals > 0 ? current.toFixed(decimals) : Math.floor(current).toString();
      if (elRef.current) {
        elRef.current.textContent = `${formatted}${suffix}`;
      }
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };
    animationFrameId = window.requestAnimationFrame(step);
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration, decimals, suffix]);
  const initialFormatted = decimals > 0 ? (0).toFixed(decimals) : "0";
  return (
    <h3 ref={elRef}>
      {initialFormatted}
      {suffix}
    </h3>
  );
}
