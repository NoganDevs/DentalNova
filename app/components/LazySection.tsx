"use client";

import { ReactNode, useRef, useState, useEffect } from "react";

interface LazySectionProps {
  children: ReactNode;
  rootMargin?: string;
  className?: string;
}

export default function LazySection({
  children,
  rootMargin = "600px",
  className,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setVisible(true);
        observer.disconnect();
      },
      {
        rootMargin,
        threshold: 0,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {visible ? children : null}
    </div>
  );
}
