// components/OurPracticeHeader.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Syne, Plus_Jakarta_Sans, Cormorant_Garamond } from 'next/font/google';
// 1. Icons imported strictly from lucide-react
import { ArrowUpRight, Sparkles, ShieldCheck, UserCheck, LucideIcon } from 'lucide-react';

// 2. Motion variants imported strictly from your central animation file
// 2. Motion variants imported strictly from your central animation file
import {
  staggerContainerVariants,
  fadeInUpVariants,
  lineExpandVariants,
  cardHoverMotion,
  accentLineHover,
  v_doctorCard,
  v_doctorImageParallax,
  v_arrowMove,
  } from './lib/animations'; // Adjust relative path (e.g., '@/lib/animations' or '../lib/animations') if necessary
import Image from 'next/image';

const MotionImage = motion(Image);

const syne = Syne({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-syne',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jakarta',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['italic', 'normal'],
  variable: '--font-cormorant',
});

interface PillarItem {
  num: string;
  category: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const PILLARS: PillarItem[] = [
  {
    num: '01',
    category: 'Surgical Precision',
    title: 'Bespoke Structural Design',
    description:
      'Every veneer, crown, and restoration is digitally sculpted to match natural light translucency, enamel acoustics, and individual facial dynamics.',
    icon: Sparkles,
  },
  {
    num: '02',
    category: 'Biological Conservation',
    title: 'Minimal Invasiveness',
    description:
      'Utilizing high-magnification micro-instrumentation to preserve maximal natural enamel structure while achieving total aesthetic symmetry.',
    icon: ShieldCheck,
  },
];

export default function OurPracticeHeader() {
  return (
    <section
      id="our-practice"
      className={`${syne.variable} ${jakarta.variable} ${cormorant.variable} w-full bg-white text-neutral-900 pt-20 sm:pt-28 lg:pt-36 pb-16 sm:pb-24 lg:pb-28 px-6 sm:px-12 lg:px-20 border-b border-neutral-200/60 overflow-hidden select-none`}
      style={{ fontFamily: 'var(--font-jakarta)' }}
    >
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainerVariants}
      >
        {/* Eyebrow / Category Identifier */}
        <motion.div 
          variants={fadeInUpVariants} 
          className="flex items-center gap-3.5 mb-8 sm:mb-12"
        >
          <motion.span 
            variants={lineExpandVariants}
            className="h-px bg-neutral-400 block origin-left w-8 sm:w-12" 
          />
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Clinical Excellence & Cosmetic Artistry
          </span>
        </motion.div>

        {/* Unified Editorial Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-24 items-start">
          
          {/* Main Headline Container & Integrated Team Lead-In */}
          <motion.div variants={fadeInUpVariants} className="lg:col-span-5 flex flex-col justify-between h-full space-y-12 sm:space-y-16">
            <div>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl text-neutral-950 font-bold tracking-tight leading-[1.02]"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                Our Practice<span className="text-stone-300 font-light">.</span>
              </h2>
              
              <p
                className="mt-4 text-xl sm:text-2xl text-stone-500 italic tracking-wide font-normal leading-relaxed"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                The synthesis of clinical science and facial harmony.
              </p>
            </div>

            {/* Embedded "Meet Our Team" Header Block (Occupying lower left column space) */}
            <div className="pt-8 border-t border-neutral-200/60">
              <div className="inline-flex items-center gap-2 mb-3">
                <UserCheck className="w-3.5 h-3.5 text-neutral-700 stroke-[1.75]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
                  Medical Leadership
                </span>
              </div>

              <h3 
                className="text-2xl sm:text-3xl text-neutral-950 font-bold tracking-tight leading-tight"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                Meet Our Specialists<span className="text-stone-300 font-light">.</span>
              </h3>

              <p 
                className="mt-2 text-base sm:text-lg text-neutral-500 italic tracking-wide font-normal"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                World-class clinicians united by a passion for aesthetic perfection and patient care.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Lead Narrative & Pillar Cards */}
          <div className="lg:col-span-7 space-y-12 sm:space-y-14">
            
            {/* Lead Narrative */}
            <motion.p
              variants={fadeInUpVariants}
              className="text-lg sm:text-2xl font-light text-neutral-800 leading-relaxed sm:leading-snug tracking-tight"
            >
              We view dentistry not as routine procedure, but as a discipline of structural balance. Every treatment plan is engineered with millimeter precision to harmonize native facial anatomy with long-term oral longevity.
            </motion.p>

            {/* Sub-Cards / Pillars */}
            <motion.div
              variants={fadeInUpVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-2"
            >
              {PILLARS.map((card, idx) => {
                const IconComponent = card.icon;
                return (
                  <motion.div
                    key={idx}
                    initial="rest"
                    whileHover="hover"
                    variants={cardHoverMotion}
                    className="group relative p-7 sm:p-9 bg-[#FAF9F8] hover:bg-white border border-neutral-200/80 hover:border-neutral-950 transition-colors duration-500 ease-out flex flex-col justify-between"
                  >
                    {/* Top Animated Accent Bar */}
                    <motion.div 
                      variants={accentLineHover}
                      className="absolute top-0 left-0 w-full h-[2px] bg-neutral-950 origin-left"
                    />

                    <div>
                      {/* Card Category Header + Icon */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-4 h-4 text-neutral-400 group-hover:text-neutral-950 transition-colors duration-300 stroke-[1.5]" />
                          <span className="text-xs font-mono text-neutral-400 font-medium tracking-wider">
                            {card.num}
                          </span>
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-neutral-500 group-hover:text-neutral-950 transition-colors duration-300">
                          {card.category}
                        </span>
                      </div>

                      {/* Card Title using Cormorant Serif */}
                      <h3
                        className="text-2xl sm:text-3xl font-semibold text-neutral-950 mb-3 tracking-tight group-hover:translate-x-0.5 transition-transform duration-300"
                        style={{ fontFamily: 'var(--font-cormorant)' }}
                      >
                        {card.title}
                      </h3>

                      {/* Description Text */}
                      <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    {/* Micro Indicator Link */}
                    <div className="pt-6 mt-4 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 group-hover:text-neutral-950 transition-colors duration-300 border-t border-neutral-200/40 group-hover:border-neutral-200">
                      <span>Clinical Standard</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

          </div>

        </div>

        {/* Team Grid Showcase */}
{/* --- Begin Optimized Team Grid Showcase --- */}
<motion.div 
  variants={fadeInUpVariants} 
  className="mt-16 sm:mt-24 lg:mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
>
  {[
    {
      id: "01",
      name: "Dr. Elena Vance",
      role: "Lead Prosthodontist & Founder",
      credentials: "DDS, MSc Aesthetic Dentistry",
      specialty: "Aesthetics",
      focus: "Enamel Sculpting",
      image: "doctor1.avif", // Replace with your image path
    },
    {
      id: "02",
      name: "Dr. Marcus Thorne",
      role: "Surgical Director",
      credentials: "BDS, MS Periodontics",
      specialty: "Implants",
      focus: "Bone Regeneration",
      image: "doctor2.webp", // Replace with your image path
    },
    {
      id: "03",
      name: "Dr. Sophia Chen",
      role: "Cosmetic Specialist",
      credentials: "DMD, AACD Fellow",
      specialty: "Smile Design",
      focus: "Digital Symmetry",
      image: "doctor3.webp", // Replace with your image path
    },
  ].map((doctor) => (
    <motion.article
      key={doctor.id}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={v_doctorCard}
      className="group relative bg-[#FAF9F8] border border-neutral-200/80 hover:border-neutral-950 transition-colors duration-500 ease-out flex flex-col overflow-hidden"
    >
      {/* Animated Top Edge Accent */}
      <motion.div
        variants={accentLineHover}
        className="absolute top-0 left-0 w-full h-[2px] bg-neutral-950 origin-left z-20"
      />

      {/* Media Box: Parallax Image Container (Aspect Ratio 3:4) */}
      {/* Media Box: Parallax Image Container (Aspect Ratio 3:4) */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-neutral-100">
        <MotionImage
          src={doctor.image}
          alt={doctor.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          variants={v_doctorImageParallax}
          className="object-cover grayscale contrast-[1.02] group-hover:grayscale-0"
        />

        {/* Dynamic Vignette & Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-transparent to-transparent group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" />
        <div className="absolute inset-0 ring-1 ring-inset ring-neutral-950/5 group-hover:ring-neutral-950/20 transition-all duration-700 pointer-events-none" />

        {/* Index Badge & Role Indicator */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm border border-neutral-100 shadow-sm">
          <span className="text-[11px] font-mono font-medium tracking-tight text-neutral-950">
            {doctor.id}
          </span>
          <span className="w-px h-3 bg-neutral-200" />
          <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-neutral-950">
            {doctor.specialty}
          </span>
        </div>
      </div>

      {/* Information Container */}
      <div className="p-7 sm:p-9 flex flex-col justify-between flex-grow bg-[#FAF9F8] group-hover:bg-white transition-colors duration-500">
        <div>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] font-medium text-neutral-500 block mb-2 sm:mb-2.5">
            {doctor.role}
          </span>

          <h3
            className="text-2xl sm:text-3xl font-medium text-neutral-950 tracking-tight group-hover:translate-x-0.5 transition-transform duration-300"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            {doctor.name}
          </h3>

          <p className="mt-1 text-[11px] sm:text-xs text-neutral-500 font-light tracking-wide">
            {doctor.credentials}
          </p>
        </div>

        {/* Clinical Data Footer & Interaction */}
        <div className="pt-6 mt-8 flex flex-col gap-5 border-t border-neutral-200/50 group-hover:border-neutral-200">
          
          {/* Structured Expertise Data */}
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Primary Focus</p>
              <p className="text-base text-neutral-800 font-normal tracking-tight font-serif italic" style={{fontFamily: 'var(--font-cormorant)'}}>{doctor.focus}</p>
            </div>
            
            {/* Minimal Icon/Indicator */}
            <motion.div
              variants={v_arrowMove}
              className="w-9 h-9 rounded-full border border-neutral-200 group-hover:border-neutral-950 flex items-center justify-center transition-colors duration-300"
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-950" />
            </motion.div>
          </div>
          
          {/* Label for Action */}
          <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 group-hover:text-neutral-950 transition-colors duration-300">
            <span>Explore Portfolio</span>
            <span>Est. {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </motion.article>
  ))}
</motion.div>
{/* --- End Optimized Team Grid Showcase --- */}
      </motion.div>
    </section>
  );
}
