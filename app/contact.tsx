'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Transition } from "framer-motion";
import { 
  ArrowUpRight, 
  Check, 
  Mail, 
  MapPin, 
  Phone 
} from 'lucide-react';


const springPhysics: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 28,
};

const transitionEase = [0.215, 0.61, 0.355, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    filter: 'blur(4px)' 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: transitionEase,
    },
  },
};

const treatmentOptions = [
  'Porcelain Veneers',
  'Invisalign / Alignment',
  'Smile Design & Bonding',
  'Full Arch Restoration',
];

const socialLinks = [
  { name: 'Instagram', icon: '/icons/instagram.png', url: 'https://instagram.com' },
  { name: 'LinkedIn', icon: '/icons/linkedin.png', url: 'https://linkedin.com' },
  { name: 'X', icon: '/icons/x.png', url: 'https://x.com' },
];

export default function DentalNovaContactForm() {
  const [selectedTreatment, setSelectedTreatment] = useState<string>(treatmentOptions[0]);
  
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className={inter.variable}>
      <link rel="preconnect" href="https://api.fontshare.com" />
      <style jsx global>{`
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800&display=swap');

        .font-cabinet {
          font-family: 'Cabinet Grotesk', sans-serif;
        }
        .font-inter {
          font-family: var(--font-inter), sans-serif;
        }
      `}</style>

      <section className="w-full bg-[#f8faf8] text-[#0f172a] font-inter pt-28 sm:pt-40 pb-32 px-6 sm:px-12 lg:px-20 select-none overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start"
        >
          
          {/* LEFT COLUMN: Clean Contact Info */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div variants={itemVariants} className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold block">
                Contact Info
              </span>
              <div className="h-0.5 w-8 bg-slate-900 rounded-full" />
            </motion.div>

            <div className="space-y-6">
              
              {/* Phone Link */}
              <motion.div variants={itemVariants}>
                <motion.a 
                  href="tel:+18005550199" 
                  whileHover="hover"
                  className="group relative flex items-center justify-between py-3 border-b border-slate-200/80 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <motion.div 
                      variants={{ hover: { scale: 1.08, rotate: -4 } }}
                      transition={springPhysics}
                      className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-200"
                    >
                      <Phone className="w-4 h-4" />
                    </motion.div>
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-medium">Direct Line</span>
                      <span className="text-slate-900 text-lg font-medium group-hover:text-slate-600 transition-colors">
                        +1 (800) 555-0199
                      </span>
                    </div>
                  </div>
                  <motion.div
                    variants={{ hover: { x: 3, y: -3 } }}
                    transition={springPhysics}
                  >
                    <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 transition-colors" />
                  </motion.div>
                </motion.a>
              </motion.div>

              {/* Email Link */}
              <motion.div variants={itemVariants}>
                <motion.a 
                  href="mailto:concierge@dentalnova.com" 
                  whileHover="hover"
                  className="group relative flex items-center justify-between py-3 border-b border-slate-200/80 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <motion.div 
                      variants={{ hover: { scale: 1.08, rotate: 4 } }}
                      transition={springPhysics}
                      className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-200"
                    >
                      <Mail className="w-4 h-4" />
                    </motion.div>
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-medium">Email</span>
                      <span className="text-slate-900 text-lg font-medium group-hover:text-slate-600 transition-colors">
                        concierge@dentalnova.com
                      </span>
                    </div>
                  </div>
                  <motion.div
                    variants={{ hover: { x: 3, y: -3 } }}
                    transition={springPhysics}
                  >
                    <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 transition-colors" />
                  </motion.div>
                </motion.a>
              </motion.div>

              {/* Location Link */}
              <motion.div variants={itemVariants}>
                <motion.a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover="hover"
                  className="group relative flex items-start justify-between py-3 border-b border-slate-200/80 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      variants={{ hover: { scale: 1.08, y: -2 } }}
                      transition={springPhysics}
                      className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-200 shrink-0 mt-0.5"
                    >
                      <MapPin className="w-4 h-4" />
                    </motion.div>
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-medium">Practice</span>
                      <span className="text-slate-900 text-base font-medium leading-relaxed group-hover:text-slate-600 transition-colors block">
                        740 Park Avenue, Suite 12B<br />New York, NY 10021
                      </span>
                    </div>
                  </div>
                  <motion.div
                    variants={{ hover: { x: 3, y: -3 } }}
                    transition={springPhysics}
                    className="mt-1"
                  >
                    <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 transition-colors" />
                  </motion.div>
                </motion.a>
              </motion.div>

            </div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="pt-2 space-y-3">
              <span className="block text-xs uppercase tracking-widest text-slate-400 font-semibold">
                Social
              </span>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <motion.a 
                    key={social.name}
                    href={social.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={springPhysics}
                    className="p-2 rounded-full hover:bg-slate-200/50 transition-colors"
                  >
                    <img 
                      src={social.icon} 
                      alt={social.name} 
                      className="w-4 h-4 object-contain" 
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Treatment Focus Selection Grid */}
              <motion.div variants={itemVariants} className="space-y-3">
                <label className="block text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  Primary Focus
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {treatmentOptions.map((option) => {
                    const isSelected = selectedTreatment === option;
                    return (
                      <motion.button
                        key={option}
                        type="button"
                        onClick={() => setSelectedTreatment(option)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={springPhysics}
                        className={`relative text-left p-4 rounded-xl text-sm font-medium transition-colors border ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-700 border-slate-200/80 hover:border-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {isSelected && (
                            <motion.span 
                              layoutId="activeTreatmentCheck"
                              transition={springPhysics}
                              className="w-5 h-5 rounded-full bg-white text-slate-900 flex items-center justify-center shrink-0"
                            >
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            </motion.span>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Input Fields with Precision Floating Labels */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
                
                {/* Full Name */}
                <div className="relative">
                  <motion.label
                    initial={false}
                    animate={{
                      y: focusedInput === 'fullName' || formData.fullName ? -14 : 12,
                      scale: focusedInput === 'fullName' || formData.fullName ? 0.78 : 1,
                      color: focusedInput === 'fullName' ? '#0f172a' : '#94a3b8',
                    }}
                    transition={springPhysics}
                    className="absolute left-0 top-0 origin-top-left pointer-events-none text-base font-normal tracking-wide"
                  >
                    Full Name
                  </motion.label>
                  
                  <input
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    onFocus={() => setFocusedInput('fullName')}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full bg-transparent border-b border-slate-300 py-3 text-slate-900 font-medium text-base focus:outline-none rounded-none"
                  />

                  {/* Focus Underline */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedInput === 'fullName' ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: transitionEase }}
                  />
                </div>

                {/* Email Address */}
                <div className="relative">
                  <motion.label
                    initial={false}
                    animate={{
                      y: focusedInput === 'email' || formData.email ? -14 : 12,
                      scale: focusedInput === 'email' || formData.email ? 0.78 : 1,
                      color: focusedInput === 'email' ? '#0f172a' : '#94a3b8',
                    }}
                    transition={springPhysics}
                    className="absolute left-0 top-0 origin-top-left pointer-events-none text-base font-normal tracking-wide"
                  >
                    Email Address
                  </motion.label>

                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full bg-transparent border-b border-slate-300 py-3 text-slate-900 font-medium text-base focus:outline-none rounded-none"
                  />

                  {/* Focus Underline */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedInput === 'email' ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: transitionEase }}
                  />
                </div>

              </motion.div>

              {/* Message / Notes */}
              <motion.div variants={itemVariants} className="relative pt-2">
                <motion.label
                  initial={false}
                  animate={{
                    y: focusedInput === 'notes' || formData.notes ? -14 : 12,
                    scale: focusedInput === 'notes' || formData.notes ? 0.78 : 1,
                    color: focusedInput === 'notes' ? '#0f172a' : '#94a3b8',
                  }}
                  transition={springPhysics}
                  className="absolute left-0 top-0 origin-top-left pointer-events-none text-base font-normal tracking-wide"
                >
                  Additional Notes (Optional)
                </motion.label>

                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  onFocus={() => setFocusedInput('notes')}
                  onBlur={() => setFocusedInput(null)}
                  className="w-full bg-transparent border-b border-slate-300 py-3 text-slate-900 font-medium text-base focus:outline-none resize-none rounded-none"
                />

                {/* Focus Underline */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedInput === 'notes' ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: transitionEase }}
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="pt-2 flex items-center justify-between gap-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springPhysics}
                  className="group inline-flex items-center gap-3 bg-slate-900 text-white px-9 py-4 rounded-xl text-sm font-medium tracking-tight hover:bg-black transition-colors"
                >
                  <span>Request Assessment</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors" />
                </motion.button>

                <AnimatePresence>
                  {isSubmitted && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={springPhysics}
                      className="text-xs font-semibold text-emerald-700 tracking-wide"
                    >
                      Request sent successfully.
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>

            </form>
          </div>

       </motion.div>
      </section>
    </div>
  );
}
