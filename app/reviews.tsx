import React, { useState } from 'react';
import { Star, MapPin, ArrowUpRight, Check, ChevronRight } from 'lucide-react';

/**
 * FRAMER MOTION PLACEHOLDER WRAPPER
 * Swap this with your actual Framer Motion components.
 */
import { 
  MotionFadeUp, 
  MotionQuoteSwitcher, 
  MotionReviewCard, 
  MotionDirectionsButton 
} from './lib/review_animations';

interface Review {
  id: string;
  author: string;
  role: string;
  quote: string;
  rating: number;
  treatment: string;
  verified: boolean;
}

const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Elena Rostova',
    role: 'Porcelain Veneer Reconstruction',
    quote: 'They mapped my facial bone structure before designing a single veneer. The teeth look completely organic—it subtlely reshaped my entire smile and profile.',
    rating: 5,
    treatment: 'Full Upper Arch',
    verified: true,
  },
  {
    id: '2',
    author: 'Dr. Marcus Vance',
    role: 'Composite Edge Bonding',
    quote: 'As a surgeon, microscopic detail is second nature to me. Their enamel layering technique and bite balance calibration are genuinely exceptional.',
    rating: 5,
    treatment: 'Anterior Restoration',
    verified: true,
  },
  {
    id: '3',
    author: 'Julian Thorne',
    role: 'Full Smile Rehabilitation',
    quote: 'The 3D digital simulation was 1:1 with the final result. Walking out after the final session felt like a total physical reset.',
    rating: 5,
    treatment: 'Full Rehabilitation',
    verified: true,
  },
  {
    id: '4',
    author: 'Sophia Chen',
    role: 'Laser Alignment & Veneers',
    quote: 'Zero sensitivity throughout the process. Quiet, composed, and executed with precise clinical craft.',
    rating: 5,
    treatment: 'Laser & Veneers',
    verified: true,
  },
];

export default function DentalReviewsSection() {
  const [activeReview, setActiveReview] = useState<Review>(REVIEWS[0]);
  const googleMapsUrl = "https://maps.google.com/?q=740+Park+Avenue+New+York";

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        .font-playfair {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .font-sans-custom {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
      `}</style>

      <section
        id="patient-reviews"
        className="w-full py-20 lg:py-32 px-6 sm:px-10 lg:px-20 font-sans-custom text-neutral-900 selection:bg-neutral-900 selection:text-white"
        style={{ backgroundColor: '#f8faf8' }}
      >
        <div className="max-w-7xl mx-auto space-y-20 lg:space-y-28">

          {/* ==================== SECTION HEADER ==================== */}
          {/* ==================== SECTION HEADER ==================== */}
<MotionFadeUp delay={0.1}>
  <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-neutral-200/80 pb-10">
    <div className="space-y-4">
      <span className="text-[11px] font-sans-custom font-semibold tracking-[0.2em] text-neutral-500 uppercase block">
        Patient Experiences &amp; Practice Location
      </span>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-neutral-950 tracking-tight leading-[1.1]">
        Clinical Precision, <br />
        <span className="font-playfair italic text-neutral-800 font-normal">Natural Outcomes.</span>
      </h2>
    </div>

    <div className="flex items-center gap-3 text-xs font-sans-custom font-medium text-neutral-600 pb-1">
      <div className="flex gap-1 text-neutral-950">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-current" />
        ))}
      </div>
      <span className="text-neutral-950 font-bold">4.98 / 5.0</span>
      <span className="text-neutral-400 font-normal">— Over 1,200 Cases</span>
    </div>
  </header>
</MotionFadeUp>

          {/* ==================== INTERACTIVE REVIEW FOCUS ==================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            
            {/* Main Stage: Active Review (7 Columns) */}
            {/* Main Stage: Active Review (7 Columns) */}
<div className="lg:col-span-7 flex flex-col justify-between space-y-10 border-l-2 border-neutral-900 pl-6 sm:pl-10 py-2">
  <MotionQuoteSwitcher activeKey={activeReview.id}>
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[11px] font-sans-custom font-semibold tracking-wider uppercase bg-neutral-200/70 text-neutral-800 px-3.5 py-1.5 rounded-full border border-neutral-300/60">
          {activeReview.treatment}
        </span>
        {activeReview.verified && (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-sans-custom font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200/80">
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            Verified Patient
          </span>
        )}
      </div>

      <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-normal text-neutral-950 leading-[1.2] tracking-tight">
        &ldquo;{activeReview.quote}&rdquo;
      </blockquote>
    </div>
  </MotionQuoteSwitcher>

  <div className="pt-6 border-t border-neutral-200/80 flex items-center justify-between gap-4">
    <div className="font-sans-custom">
      <h3 className="text-base font-bold text-neutral-950 tracking-tight">{activeReview.author}</h3>
      <p className="text-xs font-sans-custom text-neutral-500 font-medium mt-1">{activeReview.role}</p>
    </div>

    <div className="flex gap-1 text-neutral-900 shrink-0">
      {[...Array(activeReview.rating)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-current" />
      ))}
    </div>
  </div>
</div>

            {/* Side Navigation: Patient List (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col justify-center divide-y divide-neutral-200/80 py-2">
              {REVIEWS.map((review) => {
  const isActive = review.id === activeReview.id;
  return (
    <button
      key={review.id}
      onClick={() => setActiveReview(review)}
      className={`w-full py-4 px-5 text-left transition-all duration-300 flex items-center justify-between gap-4 group font-sans-custom ${
        isActive
          ? 'opacity-100 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-neutral-200/80 my-2'
          : 'opacity-60 hover:opacity-100 border-transparent px-3'
      }`}
    >
      <div className="space-y-1 min-w-0 flex-1">
        <div className="text-sm font-bold text-neutral-950 truncate">{review.author}</div>
        <div className="text-xs text-neutral-500 font-medium truncate">{review.role}</div>
      </div>

      <div className={`shrink-0 transition-transform duration-200 ${isActive ? 'text-neutral-950 translate-x-0' : 'text-neutral-400 group-hover:text-neutral-700'}`}>
        <ChevronRight className="w-4 h-4" />
      </div>
    </button>
  );
})}
            </div>

          </div>


          {/* ==================== CLEAN LOCATION MODULE ==================== */}
          {/* ==================== CLEAN LOCATION MODULE ==================== */}
<MotionFadeUp delay={0.3}>
  <div className="pt-8 border-t border-neutral-200/80">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch rounded-3xl bg-neutral-950 text-white p-8 sm:p-10 lg:p-14 overflow-hidden relative shadow-2xl">
      
      {/* Left Info Panel */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-10 relative z-10 font-sans-custom">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 tracking-widest uppercase">
            <MapPin className="w-4 h-4" />
            <span>Studio Location</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-playfair font-normal leading-tight text-white">
            Visit Our Suite in <br />
            <span className="italic font-light text-neutral-300">Upper East Side.</span>
          </h3>

          <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed max-w-md">
            Designed around privacy and quiet comfort. Features private consultation bays, discreet subterranean arrival, and full in-house 3D facial imaging.
          </p>
        </div>

        <div className="space-y-6 pt-6 border-t border-neutral-800/80">
          <div>
            <div className="text-sm font-bold text-white tracking-wide">740 Park Avenue</div>
            <div className="text-xs text-neutral-400 font-medium mt-1">New York, NY 10021</div>
          </div>

          <MotionDirectionsButton
            href={googleMapsUrl}
            className="inline-flex items-center justify-between w-full px-6 py-4 bg-white text-neutral-950 rounded-xl text-xs font-bold tracking-wide transition-colors shadow-sm"
          >
            <span>Get Directions on Google Maps</span>
            <ArrowUpRight className="w-4 h-4 shrink-0 ml-2" />
          </MotionDirectionsButton>
        </div>
      </div>

      {/* Right Google Maps Canvas */}
      <div className="lg:col-span-7 relative min-h-[320px] rounded-2xl overflow-hidden border border-neutral-800/80 group z-10">
        <iframe
          title="Practice Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.217707322883!2d-73.98658822342082!3d40.75549823483984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259002f231777%3A0x6a0868f05e3ec400!2sHarley%20Street%20Medical!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
          className="w-full h-full grayscale opacity-85 contrast-110 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        
        <div className="absolute top-5 left-5 bg-neutral-950/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-neutral-700/80 text-xs font-bold font-sans-custom text-white shadow-xl">
          740 Park Ave, New York
        </div>
      </div>

    </div>
  </div>
</MotionFadeUp>

        </div>
      </section>
    </>
  );
}
