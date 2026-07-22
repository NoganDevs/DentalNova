'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Plus_Jakarta_Sans, Syne } from 'next/font/google';
import LazySection from "./components/LazySection";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});
import {
  viewport,
  headingReveal,
  textReveal,
  imageRevealLeft,
  imageRevealRight,
  contentLeft,
  contentRight,
  fadeScale,
  imageHover,
  buttonHover,
  linkHover,
} from "./components/animations/animations-2";
import {
  imageHoverFx,
  buttonHoverFx,
  linkHoverFx,
  floatingImageFx,
  titleHoverFx,
  ctaHoverFx,
  cardHoverFx,
} from "./components/animations/interactions";

export default function ServicesHeaderSection() {
  return (

    
    <div className={`${plusJakarta.variable} ${syne.variable}`}>
      <LazySection>
      <section id="services" className="w-full overflow-hidden bg-[#f8faf8] px-5 sm:px-8 md:px-16 lg:px-24 py-12 sm:py-16 md:py-20 font-[family-name:var(--font-plus-jakarta)] text-slate-900">

      
        <div className="mx-auto max-w-7xl flex flex-col gap-8 lg:flex-row lg:items-end">          
          {/* Left Column: Eyebrow Tag & Main Headline */}
          <motion.div
  variants={headingReveal}
  initial="hidden"
  whileInView="show"
  viewport={viewport}
  className="lg:flex-1"
>
            {/* Eyebrow Label */}
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-3 sm:mb-4">
              <span className="text-[#0f4d4a] font-bold">/</span>
              <span className="text-slate-700 capitalize tracking-normal text-xs sm:text-sm font-medium">Services We Offer</span>
            </div>

            {/* Main Heading - Clamp scaling for absolute fluid responsiveness */}
            <motion.h2
  {...titleHoverFx} className="font-['Syne',sans-serif] text-4xl sm:text-6xl md:text-7xl font-semibold leading-[0.98] sm:leading-[0.95] tracking-tight text-slate-950">
              Certified <br />
              Excellence
            </motion.h2>
          </motion.div>

          {/* Right Column: Body Copy & Action Links */}
         <motion.div
  variants={contentRight}
  initial="hidden"
  whileInView="show"
  viewport={viewport}
  className="w-full lg:max-w-md lg:ml-auto"
>
            {/* Paragraph Text */}
            <p className="text-sm sm:text-[15px] leading-relaxed text-slate-600 font-normal">
              From repairs and installations to preventative maintenance, we've got you covered. Choose reliability, choose Razor.
            </p>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-8 pt-1">
              <motion.a
  {...linkHoverFx}
                href="#services"
                className="group inline-flex items-center gap-1 text-sm font-bold text-[#0f4d4a] hover:text-[#0b3836] transition-colors duration-200"
              >
                <span>View All Services</span>
                <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 shrink-0" />
              </motion.a>

              <motion.a
  {...linkHoverFx}
                href="#booking"
                className="group inline-flex items-center gap-1 text-sm font-bold text-[#0f4d4a] hover:text-[#0b3836] transition-colors duration-200"
              >
                <span>Call For Booking</span>
                <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 shrink-0" />
              </motion.a>
            </div>
          </motion.div>



        </div>
      </LazySection>
  <LazySection>
      </section>
      {/* Continuation: Service 01 - Cosmetic Dentistry */}
<section className="w-full bg-[#f8faf8] px-5 sm:px-8 md:px-16 lg:px-24 py-16 md:py-20 font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 border-t border-slate-200/60">
  <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
    
    {/* Left Column: Clean, Unadorned Image */}
    <motion.div
  {...imageHoverFx}
  variants={imageRevealLeft}
  initial="hidden"
  whileInView="floating"
  viewport={viewport}
      className="w-full lg:w-1/2 transform-gpu will-change-transform"
    >
      <motion.div
  {...cardHoverFx}
  className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-200"
>
       <Image
          src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1200&auto=format&fit=crop" 
          alt="Porcelain Veneers"
          className="w-full h-full object-cover object-center"
          width={800}
          height={800}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </motion.div>
    </motion.div>

    {/* Right Column: Minimalist Content */}
    <motion.div
  variants={contentRight}
  initial="hidden"
  whileInView="show"
  viewport={viewport}
      className="w-full lg:w-1/2 flex flex-col justify-between gap-6"
    >
      {/* Eyebrow Label matching header style */}
      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wide uppercase">
        <span className="text-[#0f4d4a] font-bold">01 /</span>
        <span className="text-slate-700 capitalize tracking-normal text-xs sm:text-sm font-medium">Porcelain Veneers</span>
      </div>

      {/* Main Title */}
      <motion.h3
  {...titleHoverFx} className="font-['Syne',sans-serif] text-3xl sm:text-4xl md:text-5xl font-semibold leading-[0.98] tracking-tight text-slate-950">
        Custom Porcelain <br />
        Veneers
      </motion.h3>

      {/* Body Copy */}
      <p className="text-sm sm:text-[15px] leading-relaxed text-slate-600 font-normal max-w-lg">
        Ultra-thin ceramic shells designed to transform discoloration, minor alignment, and chipped teeth while preserving your natural enamel. Tailored precisely to your smile architecture.
      </p>

      {/* Action Link */}
      <div className="pt-2">
        <motion.a
  {...linkHoverFx}
          href="#veneers"
          className="group inline-flex items-center gap-1 text-sm font-bold text-[#0f4d4a] hover:text-[#0b3836] transition-colors duration-200"
        >
          <span>Learn More About Veneers</span>
          <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 shrink-0" />
        </motion.a>
      </div>

    </motion.div>

  </div>
  </LazySection>
  <LazySection>

</section>
{/* Continuation: Service 02 - Precision Implant Restorations */}
<section className="w-full bg-[#f8faf8] px-5 sm:px-8 md:px-16 lg:px-24 py-16 md:py-20 font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 border-t border-slate-200/60">
  <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
    
    {/* Left Column: Text & 2-Part Content Breakdown */}
    <motion.div
  variants={contentLeft}
  initial="hidden"
  whileInView="show"
  viewport={viewport}
      className="w-full lg:w-1/2 flex flex-col justify-between gap-6"
    >
      {/* Eyebrow Label */}
      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wide uppercase">
        <span className="text-[#0f4d4a] font-bold">02 /</span>
        <span className="text-slate-700 capitalize tracking-normal text-xs sm:text-sm font-medium">Implant Dentistry</span>
      </div>

      {/* Main Title */}
      <motion.h3
  {...titleHoverFx} className="font-['Syne',sans-serif] text-3xl sm:text-4xl md:text-5xl font-semibold leading-[0.98] tracking-tight text-slate-950">
        Precision Dental <br />
        Implants
      </motion.h3>

      {/* Structural Shift: Split Information Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-1">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#0f4d4a] mb-1">Structural Integration</p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Biocompatible titanium anchors permanently replace missing root structures to preserve jaw bone mass.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#0f4d4a] mb-1">Custom Restoration</p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Hand-milled ceramic crowns built to replicate exact bite force, enamel shade, and natural translucency.
          </p>
        </div>
      </div>

      {/* Action Link */}
      <div className="pt-2">
        <motion.a
  {...linkHoverFx}
          href="#implants"
          className="group inline-flex items-center gap-1 text-sm font-bold text-[#0f4d4a] hover:text-[#0b3836] transition-colors duration-200"
        >
          <span>Learn More About Implants</span>
          <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 shrink-0" />
        </motion.a>
      </div>
    </motion.div>

    {/* Right Column: Clean Image (Permanent Right Position) */}
    <motion.div
  {...imageHoverFx}
  variants={imageRevealLeft}
  initial="hidden"
  whileInView="floating"
  viewport={viewport}
      className="w-full lg:w-1/2 transform-gpu will-change-transform"
    >
<motion.div
  {...cardHoverFx}
  className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-200"
>
  <Image
  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1200&auto=format&fit=crop"
  alt="Precision Dental Implants"
  width={800}
  height={800}
  className="w-full h-full object-contain object-center"
    sizes="(max-width: 1024px) 100vw, 50vw"    
/>
</motion.div>
    </motion.div>

  </div>
  </LazySection>
  <LazySection>
</section>
{/* Service 03: Professional Enamel Whitening */}
<section className="w-full bg-[#f8faf8] px-5 sm:px-8 md:px-16 lg:px-24 pt-16 md:pt-20 pb-16 font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 border-t border-slate-200/60">
  <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
    
    {/* Left Column: Clean Image (Strictly Left Position) */}
    <motion.div
  {...imageHoverFx}
  variants={imageRevealLeft}
  initial="hidden"
  whileInView="floating"
  viewport={viewport}
      className="w-full lg:w-1/2 transform-gpu will-change-transform"
    >
      <motion.div
  {...cardHoverFx}
  className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-200"
>
        <Image
          src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=1200&auto=format&fit=crop" 
          alt="Professional Enamel Whitening"
          className="w-full h-full object-cover object-center"
          width={800}
  height={800}
          sizes="(max-width: 1024px) 100vw, 50vw"

        />
      </motion.div>
    </motion.div>

    {/* Right Column: Narrative Copy & Editorial Guarantee Block */}
    <motion.div
  variants={contentRight}
  initial="hidden"
  whileInView="show"
  viewport={viewport}
      className="w-full lg:w-1/2 flex flex-col justify-between gap-6"
    >
      {/* Eyebrow Label */}
      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wide uppercase">
        <span className="text-[#0f4d4a] font-bold">03 /</span>
        <span className="text-slate-700 capitalize tracking-normal text-xs sm:text-sm font-medium">Cosmetic Whitening</span>
      </div>

      {/* Main Title */}
      <motion.h3
  {...titleHoverFx} className="font-['Syne',sans-serif] text-3xl sm:text-4xl md:text-5xl font-semibold leading-[0.98] tracking-tight text-slate-950">
        Professional Enamel <br />
        Brightening
      </motion.h3>

      {/* Lead Paragraph */}
      <p className="text-sm sm:text-[15px] leading-relaxed text-slate-600 font-normal max-w-lg">
        Clinical-grade whitening solutions designed to safely eliminate stubborn stains while shielding natural enamel. Delivered in-clinic or through custom prescription home kits.
      </p>

      {/* Distinct Structural Element: Horizontal Divider & Clinical Highlights */}
      <div className="pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row gap-4 sm:gap-8">
        <div>
          <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Zero Sensitivity</p>
          <p className="text-xs text-slate-500 mt-0.5">Enamel-safe desensitizing agents</p>
        </div>
        <div className="hidden sm:block w-[1px] bg-slate-200" />
        <div>
          <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Precision Fit</p>
          <p className="text-xs text-slate-500 mt-0.5">Custom-milled application trays</p>
        </div>
      </div>

      {/* Action Link */}
      <div className="pt-2">
        <motion.a
  {...linkHoverFx}
          href="#whitening"
          className="group inline-flex items-center gap-1 text-sm font-bold text-[#0f4d4a] hover:text-[#0b3836] transition-colors duration-200"
        >
          <span>Schedule Whitening Session</span>
          <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 shrink-0" />
        </motion.a>
      </div>
    </motion.div>

  </div>

  {/* Closing Element: Full-Width Summary & Transition Bar */}
  <motion.div
  variants={fadeScale}
  initial="hidden"
  whileInView="show"
  viewport={viewport}
   className="mx-auto max-w-7xl pt-16 md:pt-20">
    <motion.div
  {...ctaHoverFx}
  className="w-full bg-[#0f4d4a] text-white rounded-xl
> px-6 py-8 sm:px-10 sm:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
      <div className="flex flex-col gap-1 max-w-xl">
        <h4 className="font-['Syne',sans-serif] text-xl sm:text-2xl font-semibold tracking-tight">
          Not sure which treatment is right for you?
        </h4>
        <p className="text-xs sm:text-sm text-slate-200 font-normal">
          Schedule a comprehensive oral assessment with our specialists to build your custom treatment plan.
        </p>
      </div>

      <motion.a
  {...buttonHoverFx}
        href="#consultation"
        className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-white text-[#0f4d4a] text-sm font-bold hover:bg-slate-100 transition-colors duration-200 shrink-0"
      >
        Book Consultation
     </motion.a>
    </motion.div>
</motion.div>
</section>
</LazySection>
    </div>
        
  );
}
