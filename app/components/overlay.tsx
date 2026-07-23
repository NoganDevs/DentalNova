// components/PlaceholderNotice.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, Variants, useSpring } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

const textSentence =
  "All visual assets and interface systems showcased here serve as interactive structural placeholders. Built by nogandev as a custom design engineering portfolio—unlinked elements do not yield active destinations.";

const words = textSentence.split(" ");

export default function PlaceholderNotice() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsOpen(true);
    // Check for mobile screens to disable heavy animation passes
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Magnetic Button Effect Physics (Desktop only)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  }

  function handleMouseLeave() {
    if (isMobile) return;
    x.set(0);
    y.set(0);
  }

  // Desktop animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.94, y: 16 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: 0.015,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      y: 10,
      transition: {
        duration: 0.25,
        ease: [0.32, 0, 0.67, 0] as const,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  // Lightweight Mobile Animation Variants
  const mobileVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.15, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.1, ease: "easeIn" },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: isMobile ? 0.15 : 0.4,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 sm:bg-black/55 sm:backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            variants={isMobile ? mobileVariants : containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-[420px] rounded-3xl border border-white/10 bg-neutral-900/95 sm:bg-neutral-900/90 p-6 sm:p-7 shadow-xl sm:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]"
          >
            {/* Top Specular Edge Glow (Desktop Only) */}
            <div className="hidden sm:block pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />

            <div className="flex flex-col gap-6">
              {/* Text Render Section */}
              {isMobile ? (
                /* Lightweight Mobile Text View */
                <p className="text-[13.5px] leading-relaxed font-normal text-neutral-300 select-none">
                  <span className="mr-1.5 inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-1 text-white align-middle">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  All visual assets and interface systems showcased here serve as interactive structural placeholders. Built by{" "}
                  <span className="font-semibold text-white underline underline-offset-4 decoration-white/30">
                    nogandev
                  </span>{" "}
                  as a custom design engineering portfolio—unlinked elements do not yield active destinations.
                </p>
              ) : (
                /* Original Desktop Staggered Text View */
                <motion.div className="flex flex-wrap items-center gap-x-[4.5px] gap-y-1 text-[13.5px] leading-relaxed font-normal text-neutral-300 select-none">
                  <motion.span
                    variants={wordVariants}
                    className="mr-1 inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-1 text-white"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                  </motion.span>
                  {words.map((word, index) => {
                    const isHighlight = word.includes("nogandev");
                    return (
                      <motion.span
                        key={index}
                        variants={wordVariants}
                        className={
                          isHighlight
                            ? "font-semibold text-white underline underline-offset-4 decoration-white/30"
                            : ""
                        }
                      >
                        {word}
                      </motion.span>
                    );
                  })}
                </motion.div>
              )}

              {/* Action Button */}
              <div className="flex items-center justify-end pt-1">
                <motion.button
                  style={isMobile ? undefined : { x: mouseX, y: mouseY }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  whileHover={isMobile ? undefined : { scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  className="group relative flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 py-2 text-xs font-medium text-white transition-colors duration-200 hover:border-white/30 hover:bg-white/20 active:bg-white/25 focus:outline-none"
                >
                  <span>OK</span>
                  {isMobile ? (
                    <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400" />
                  ) : (
                    <motion.div
                      initial={{ x: 0, y: 0 }}
                      whileHover={{ x: 2, y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400 transition-colors duration-200 group-hover:text-white" />
                    </motion.div>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
