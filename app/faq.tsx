'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowUpRight, Disc } from 'lucide-react';
import type { Transition } from "framer-motion";

const faqData = [
  {
    id: '01',
    category: 'Veneers & Aesthetics',
    question: 'How do custom porcelain veneers differ from standard composite bonding?',
    answer: 'Porcelain veneers are hand-crafted ceramic shells engineered to match your natural facial symmetry and optical translucent depth. Unlike composite resin—which is direct-sculpted in office and prone to surface degradation—porcelain offers permanent color stability and structural endurance exceeding 15–20 years.'
  },
  {
    id: '02',
    category: 'Procedure & Comfort',
    question: 'Is the smile design process painful or invasive?',
    answer: 'Our clinical protocols utilize micro-preparation techniques that preserve maximum original enamel structure. Most procedures are completely comfortable, conducted under local anesthesia or subtle sedation with zero recovery downtime required.'
  },
  {
    id: '03',
    category: 'Longevity & Maintenance',
    question: 'Will my custom ceramic restorations require specialized home care?',
    answer: 'You maintain them just like healthy natural enamel. Routine non-abrasive brushing, daily flossing, and standard semi-annual checkups keep your restorations immaculate. We also engineer a bespoke nocturnal protective guard.'
  },
  {
    id: '04',
    category: 'Timeline & Protocol',
    question: 'How long does a full smile transformation take from consult to placement?',
    answer: 'A comprehensive smile design spans 2 to 3 clinical visits over a 3-week window. This includes digital 3D facial mapping, custom temporary wear testing, and final precision cementation of your bespoke restorations.'
  }
];

// Motion physics presets
const springTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 28,
};

import { cormorant, jakarta } from './layout';

export default function CosmeticDentistryFAQ() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className={`${cormorant.variable} ${jakarta.variable}`}>
      <style jsx global>{`
        .font-display-serif {
          font-family: var(--font-cormorant), Georgia, serif;
        }
        .font-body-sans {
          font-family: var(--font-jakarta), sans-serif;
        }
        .crisp-rendering {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }
      `}</style>
      <section id="faqs" className="w-full bg-white text-[#0f172a] font-body-sans py-28 lg:py-40 px-6 sm:px-12 lg:px-24 overflow-hidden crisp-rendering">
        <div className="max-w-[1380px] mx-auto">
          
          {/* Top Asymmetric Editorial Header */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={springTransition}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-20 lg:mb-32 border-b border-slate-200/80 pb-16"
          >
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2.5 mb-6">
                <Disc className="w-3 h-3 text-slate-800" />
                <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-slate-500">
                  Clinical Insights
                </span>
              </div>
              <h2 className="font-display-serif text-4xl sm:text-6xl lg:text-7xl font-light text-slate-900 leading-[1.02] tracking-[-0.01em]">
                Questions regarding <br className="hidden sm:block" />
                <span className="italic font-normal text-slate-500">bespoke smile</span> reconstruction.
              </h2>
            </div>

            <div className="lg:col-span-4 lg:pl-6">
              <p className="text-slate-500 text-sm sm:text-base font-light leading-relaxed mb-6">
                Every restoration is engineered individually to match your facial anatomy, shade profile, and bite mechanics.
              </p>
              <a 
                href="#consultation" 
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-slate-900 hover:text-slate-600 transition-colors group"
              >
                <span>Request Clinical Evaluation</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>

          {/* Asymmetrical 2-Column Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Dynamic Numbering Display - Sticky Focus */}
            <div className="lg:col-span-4 lg:sticky lg:top-16">
              <div className="bg-[#f8faf8] border border-slate-200/70 p-8 sm:p-12 rounded-3xl relative overflow-hidden">
                
                {/* Dynamic Large Number Indicator */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={faqData[activeIndex].id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.25 }}
                    className="mb-8"
                  >
                    <span className="font-display-serif text-7xl sm:text-8xl font-light text-slate-300 block leading-none">
                      {faqData[activeIndex].id}
                    </span>
                    <span className="inline-block mt-4 px-3 py-1 bg-white border border-slate-200/90 text-[10px] tracking-[0.2em] uppercase font-semibold text-slate-800 rounded">
                      {faqData[activeIndex].category}
                    </span>
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.h3 
                    key={faqData[activeIndex].question}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="font-display-serif text-2xl sm:text-3xl text-slate-900 leading-snug font-normal"
                  >
                    {faqData[activeIndex].question}
                  </motion.h3>
                </AnimatePresence>

                <div className="mt-12 pt-8 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>FACIAL ARTISTRY</span>
                  <span>04 PROTOCOLS</span>
                </div>
              </div>
            </div>

            {/* Right Accordion Area */}
            <div className="lg:col-span-8 space-y-4">
              {faqData.map((item, index) => {
                const isOpen = activeIndex === index;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ ...springTransition, delay: index * 0.08 }}
                    className={`rounded-2xl transition-all duration-300 border ${
                      isOpen 
                        ? 'bg-white border-slate-900 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.05)]' 
                        : 'bg-[#f8faf8] border-slate-200/60 hover:border-slate-300'
                    }`}
                  >
                    <button
                      onClick={() => setActiveIndex(index)}
                      className="w-full text-left p-6 sm:p-9 flex items-start justify-between gap-6 focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-5 sm:gap-8">
                        <span className={`text-xs font-mono mt-1 ${
                          isOpen ? 'text-slate-900 font-bold' : 'text-slate-400'
                        }`}>
                          {item.id}
                        </span>
                        <div>
                          <h4 className={`text-base sm:text-xl font-medium tracking-tight transition-colors ${
                            isOpen ? 'text-slate-900 font-semibold' : 'text-slate-800'
                          }`}>
                            {item.question}
                          </h4>
                        </div>
                      </div>

                      <motion.div 
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={springTransition}
                        className={`p-2.5 rounded-full shrink-0 transition-colors ${
                          isOpen ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200'
                        }`}
                      >
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ 
                            height: springTransition,
                            opacity: { duration: 0.2 }
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 sm:px-9 pb-9 pt-0 pl-12 sm:pl-20 pr-6 sm:pr-12 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100/90 mt-1">
                            <p className="pt-5 font-light text-slate-600 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
