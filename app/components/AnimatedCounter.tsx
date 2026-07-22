"use client";

import { useEffect, useState } from "react";

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
  const [currentVal, setCurrentVal] = useState<number>(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = progress * value;
      setCurrentVal(current);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration]);

  const formattedVal = decimals > 0 ? currentVal.toFixed(decimals) : Math.floor(currentVal).toString();

  return (
    <h3>
      {formattedVal}
      {suffix}
    </h3>
  );
}
