"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

const NAV_ITEMS = [
  { id: 1, label: "Home", iconSrc: "/icons/home.png", hash: "#home" },
  { id: 2, label: "Services", iconSrc: "/icons/services.png", hash: "#services" },
  { id: 3, label: "our practice", iconSrc: "/icons/our_practice.png", hash: "#our-practice" },
  { id: 4, label: "Patient Reviews", iconSrc: "/icons/reviews.png", hash: "#patient-reviews" },
  { id: 5, label: "FAQs", iconSrc: "/icons/faqs.png", hash: "#faqs" },
];

export default function FloatingMobileNav() {
  const [activeTab, setActiveTab] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > previous && latest > 40) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-4 md:hidden pointer-events-none"
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 30,
            scale: 0.97,
          }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 30,
          }}
        >
          <nav
            className="
              pointer-events-auto
              relative
              flex
              w-full
              max-w-[340px]
              items-center
              justify-between
              rounded-full

              border
              border-white/60

              bg-white/75
              backdrop-blur-md

              px-2
              py-2

              shadow-[0_12px_40px_rgba(15,23,42,0.10),0_2px_10px_rgba(15,23,42,0.06)]
              overflow-hidden
            "
          >
            {/* Top glass reflection */}
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

            {/* Bottom soft shadow */}
            <div className="pointer-events-none absolute bottom-0 left-6 right-6 h-px bg-black/5" />

            {NAV_ITEMS.map((item) => {
              const active = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  aria-label={item.label}
                  onClick={() => {
  setActiveTab(item.id);
  window.location.hash = item.hash;
}}
                  className="relative flex h-11 w-11 items-center justify-center rounded-full"
                >
                  {active && (
                    <motion.div
                      layoutId="mobile-active-pill"
                      transition={{
                        type: "spring",
                        stiffness: 520,
                        damping: 34,
                      }}
                      className="
                        absolute
                        inset-0
                        rounded-full

                        bg-white/80

                        border
                        border-white/90

                        shadow-[0_4px_16px_rgba(255,255,255,0.45)]
                      "
                    />
                  )}

                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      scale: active ? 1.08 : 1,
                      y: active ? -1 : 0,
                      rotate: active ? 0 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 22,
                    }}
                    className="relative z-10"
                  >
                    <Image
                      src={item.iconSrc}
                      alt={item.label}
                      width={21}
                      height={21}
                      unoptimized
                      className={`transition-all duration-300 ${
                        active
                          ? "opacity-100 grayscale-0"
                          : "opacity-45 grayscale"
                      }`}
                    />
                  </motion.div>
                </button>
              );
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
