import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Smooth luxury easing curve
const EASE_CUBIC = [0.25, 1, 0.5, 1];

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * 1. Scroll Entrance Animation for Sections
 */
export const MotionFadeUp: React.FC<FadeUpProps> = ({
  children,
  delay = 0,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: EASE_CUBIC,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * 2. Animated Quote Switcher (Active Review Quote)
 */
export const MotionQuoteSwitcher: React.FC<{
  children: React.ReactNode;
  activeKey: string;
}> = ({ children, activeKey }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeKey}
        initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
        transition={{ duration: 0.35, ease: EASE_CUBIC }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

/**
 * 3. Interactive Review Item Button (Hover/Tap Micro-interactions)
 */
export const MotionReviewCard: React.FC<{
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}> = ({ children, isActive, onClick, className = '' }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: isActive ? 0 : 4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

/**
 * 4. Interactive Directions Button with Arrow Animation
 */
export const MotionDirectionsButton: React.FC<{
  href: string;
  children: React.ReactNode;
  className?: string;
}> = ({ href, children, className = '' }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.01, backgroundColor: '#e5e5e5' }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.a>
  );
};