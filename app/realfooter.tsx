'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { ArrowUpRight, ArrowUp, Phone, ShieldCheck, Clock } from 'lucide-react';
import type { Easing } from "framer-motion";



// High-Precision Architectural Easing
const luxuryEase: Easing = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: luxuryEase,
    },
  },
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  // Scroll Reveal Sync
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });

  const subtleParallax = useTransform(scrollYProgress, [0, 1], [24, 0]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home', index: '01' },
    { label: 'Services', href: '#services', index: '02' },
    { label: 'Our Practice', href: '#our-practice', index: '03' },
    { label: 'Patient Reviews', href: '#patient-reviews', index: '04' },
    { label: 'FAQs', href: '#faqs', index: '05' },
  ];

  return (
    <motion.footer
      ref={footerRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className={`${sora.variable} ${jakarta.variable} bg-black text-white pt-28 pb-12 font-[family-name:var(--font-jakarta)] selection:bg-white selection:text-black antialiased border-t border-neutral-900 relative overflow-hidden`}
    >
      <motion.div 
        style={{ y: subtleParallax }} 
        className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16 relative z-10"
      >
        {/* ROW 1: HEADER & PRIMARY CTA */}
        <motion.div
          variants={itemVariants}
          className="pb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-neutral-900"
        >
          <div className="max-w-2xl">
            <span className="font-[family-name:var(--font-jakarta)] font-medium text-[11px] uppercase tracking-[0.3em] text-neutral-500 block mb-3">
              Premier Dental Practice
            </span>
            <h2 className="font-[family-name:var(--font-sora)] text-5xl sm:text-7xl font-bold tracking-tight text-white leading-none">
              novadental<span className="text-neutral-600">.</span>
            </h2>
          </div>

          {/* High-Performance Fluid CTA Button */}
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: luxuryEase }}
            href="#book"
            className="group relative inline-flex items-center justify-between gap-12 px-8 py-5 bg-white text-black font-[family-name:var(--font-sora)] text-xs font-bold uppercase tracking-[0.2em] overflow-hidden shrink-0 shadow-2xl transition-colors duration-300 hover:bg-neutral-200"
          >
            <span className="relative z-10 font-[family-name:var(--font-sora)]">
              Book Appointment
            </span>

            <div className="relative z-10 w-7 h-7 rounded-full bg-black text-white flex items-center justify-center overflow-hidden">
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-4 group-hover:-translate-y-4" />
              <ArrowUpRight className="w-3.5 h-3.5 absolute -translate-x-4 translate-y-4 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0 text-white" />
            </div>
          </motion.a>
        </motion.div>

        {/* ROW 2: ASYMMETRIC CONTENT GRID (7:5 SPLIT) */}
        <div className="py-20 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start border-b border-neutral-900">
          
          {/* LEFT COLUMN: SCHEDULE & URGENT CARE */}
          <motion.div variants={itemVariants} className="lg:col-span-7 space-y-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                <span className="font-[family-name:var(--font-jakarta)] font-semibold text-[11px] uppercase tracking-[0.25em] text-neutral-500 block">
                  01 / Operating Schedule
                </span>
              </div>

              {/* Zero-Lag Hardware Accelerated Table */}
              {/* Zero-Lag Hardware Accelerated Table */}
              <div className="w-full border-t border-neutral-900">
                <div className="hidden sm:grid grid-cols-12 py-3 text-[11px] font-[family-name:var(--font-jakarta)] font-medium uppercase tracking-wider text-neutral-500 border-b border-neutral-900">
                  <span className="col-span-4">Days</span>
                  <span className="col-span-4">Regular Hours</span>
                  <span className="col-span-4 text-right">Emergency Care</span>
                </div>

                {/* Instant High-FPS Hover Rows */}
                {[
                  { days: 'Mon — Thu', hours: '08:00 — 17:00', emergency: 'On-Call Availability' },
                  { days: 'Friday', hours: '08:00 — 14:00', emergency: 'On-Call Availability' },
                  { days: 'Sat — Sun', hours: 'Closed', emergency: '24/7 Triage Line', highlight: true },
                ].map((row, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-1.5 py-4 sm:grid sm:grid-cols-12 sm:gap-0 sm:py-4 border-b border-neutral-900 sm:items-center text-sm transition-all duration-200 ease-out hover:bg-neutral-900/50 sm:hover:pl-3 sm:hover:-mr-3 px-1 -mx-1 group cursor-default"
                  >
                    <span className="sm:col-span-4 font-[family-name:var(--font-jakarta)] font-medium text-white group-hover:text-white transition-colors">
                      {row.days}
                    </span>
                    <span className="sm:col-span-4 font-[family-name:var(--font-jakarta)] text-xs text-neutral-400">
                      {row.hours}
                    </span>
                    <span className={`sm:col-span-4 font-[family-name:var(--font-jakarta)] text-xs sm:text-right ${row.highlight ? 'text-white font-semibold' : 'text-neutral-500'}`}>
                      {row.emergency}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architectural Emergency Tile */}
            <div className="p-8 border border-neutral-800 bg-neutral-950/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden group">
              <div className="space-y-1 z-10 max-w-sm">
                <span className="font-[family-name:var(--font-jakarta)] font-semibold text-[11px] uppercase tracking-[0.2em] text-neutral-400 block">
                  Urgent Care Unit
                </span>
                <p className="font-[family-name:var(--font-jakarta)] text-xs text-neutral-400 leading-relaxed font-light">
                  Direct triage access for acute dental pain, trauma, and urgent surgical needs.
                </p>
              </div>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="tel:5552348900"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-neutral-900 border border-neutral-800 text-xs font-semibold text-white hover:border-white transition-all duration-200 shrink-0 z-10 rounded-none"
              >
                <Phone className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
                <span className="font-[family-name:var(--font-jakarta)]">+1 (555) 234-8900</span>
              </motion.a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: NAVIGATION */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6 lg:pl-8">
            <span className="font-[family-name:var(--font-jakarta)] font-semibold text-[11px] uppercase tracking-[0.25em] text-neutral-500 block mb-6">
              02 / Practice Navigation
            </span>

            <nav className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.index}
                  href={link.href}
                  className="group flex items-center justify-between py-4 border-b border-neutral-900 text-base text-neutral-300 hover:text-white transition-colors relative"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono text-neutral-600 group-hover:text-neutral-400 transition-colors">
                      {link.index}
                    </span>
                    <span className="font-[family-name:var(--font-jakarta)] font-normal transition-transform duration-200 ease-out group-hover:translate-x-2 inline-block">
                      {link.label}
                    </span>
                  </div>

                  <div className="overflow-hidden w-4 h-4 relative">
                    <ArrowUpRight className="w-4 h-4 text-neutral-500 absolute transition-transform duration-300 ease-out group-hover:translate-x-4 group-hover:-translate-y-4" />
                    <ArrowUpRight className="w-4 h-4 text-white absolute -translate-x-4 translate-y-4 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
                  </div>
                </a>
              ))}
            </nav>
          </motion.div>

        </div>

        {/* ROW 3: BOTTOM METADATA BAR */}
        <motion.div
          variants={itemVariants}
          className="pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] text-neutral-500"
        >
          {/* Left: Copyright */}
          <p className="font-[family-name:var(--font-jakarta)] tracking-wider">
            © {new Date().getFullYear()} NOVADENTAL. All rights reserved.
          </p>

          {/* Right: Regulatory Compliance & Scroll */}
          <div className="flex items-center gap-8 font-[family-name:var(--font-jakarta)] tracking-wider">
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <div className="flex items-center gap-1.5 text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-300" />
              <span>HIPAA Certified</span>
            </div>

            <motion.button
              whileHover={{ y: -2, borderColor: '#ffffff' }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="p-3 border border-neutral-800 text-neutral-400 hover:text-white transition-all duration-200"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </motion.div>

      </motion.div>
    </motion.footer>
  );
}
