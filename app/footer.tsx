'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EnhancedForm from "./contact.tsx";
import Footer from "./realfooter.tsx";


import {
  ArrowUpRight,
  Check
} from 'lucide-react';
// --- ANIMATION PRESETS ---
const springConfig = {
  type: 'spring',
  stiffness: 110,
  damping: 20,
  mass: 0.8,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const scrollUpVariant = {
  hidden: { 
    opacity: 0, 
    y: 35,
    filter: 'blur(5px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: springConfig,
  },
};

const treatmentOptions = [
  'Porcelain Veneers',
  'Invisalign / Alignment',
  'Smile Design & Bonding',
  'Full Arch Restoration',
];

export default function DentalNovaHeader() {
  // --- HOOKS MUST SIT RIGHT HERE INSIDE THE COMPONENT BODY ---
  const [selectedTreatment, setSelectedTreatment] = useState<string>(treatmentOptions[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };
  return (
    <>
      <style jsx global>{`
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');

        .font-cabinet {
          font-family: 'Cabinet Grotesk', sans-serif;
        }
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      <section id="booking" className="w-full bg-[#f8faf8] text-[#0f172a] font-inter pt-32 pb-24 px-6 sm:px-12 lg:px-20 select-none overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-[1320px] mx-auto"
        >
          {/* Main Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-baseline">
            
            {/* LEFT: Headline */}
            <div className="lg:col-span-7">
              <motion.h1
                variants={scrollUpVariant}
                className="font-cabinet text-5xl sm:text-7xl lg:text-[92px] font-medium leading-[0.94] tracking-[-0.03em] text-[#0f172a]"
              >
                Architecting <br />
                <span className="font-normal italic text-slate-400">
                  your signature
                </span>{' '}
                smile.
              </motion.h1>
            </div>

            {/* RIGHT: Paragraph + Embedded Email Block */}
            <div className="lg:col-span-5 lg:pl-4 space-y-8">
              <motion.p 
                variants={scrollUpVariant}
                className="text-slate-600 font-light text-base sm:text-lg leading-relaxed max-w-md"
              >
                Every restoration is engineered individually to match your facial anatomy, shade profile, and bite mechanics with porcelain veneers, clear alignment, and structural harmonizations.
              </motion.p>

              {/* Email directly attached to the text column */}
              <motion.div variants={scrollUpVariant} className="pt-2">
                <a 
                  href="mailto:care@dentalnova.com" 
                  className="group inline-flex items-center gap-2 text-slate-900 font-medium text-base tracking-tight hover:text-black transition-colors"
                >
                  <span className="relative">
                    care@dentalnova.com
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-slate-900 transition-all duration-300 group-hover:w-full" />
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </a>
              </motion.div>
            </div>


          </div>

        </motion.div>
        
        <EnhancedForm />
        
      </section>
      <Footer />
    </>
  );
}




