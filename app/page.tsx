'use client'; // Required since you use hooks and framer-motion

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from 'next/image';
import type { HTMLMotionProps } from "framer-motion";

// 1. CRITICAL TOP-OF-PAGE COMPONENTS (Keep as standard imports so they load instantly)
import AnimatedCounter from "./components/AnimatedCounter";
import FloatingMobileNav from "./components/FloatingMobileNav";
import { useToothAnimation } from "./components/animations/animations";
import PlaceholderNotice from "./components/overlay";

// 2. DYNAMIC IMPORTS FOR LOWER SECTIONS (Next.js splits these into separate, lazy-loaded files)
import dynamic from 'next/dynamic';

const ServicesHeaderSection = dynamic(() => import("./services"), {
  loading: () => <div className="h-[500px] w-full animate-pulse bg-slate-50 rounded-2xl" />, // Skeleton prevents layout shift
  ssr: false // Prevents heavy Framer Motion/Client logic from bloating initial server load
});

const OurPracticeHeader = dynamic(() => import("./our_practice"), {
  loading: () => <div className="h-[600px] w-full animate-pulse bg-slate-50" />,
  ssr: false
});

const DentalReviewsSection = dynamic(() => import("./reviews"), {
  loading: () => <div className="h-[400px] w-full animate-pulse bg-slate-50" />,
  ssr: false
});

const CosmeticDentistryFAQ = dynamic(() => import("./faq"), {
  loading: () => <div className="h-[500px] w-full animate-pulse bg-slate-50" />,
  ssr: false
});

const FooterContactSection = dynamic(() => import("./footer"), {
  loading: () => <div className="h-[400px] w-full animate-pulse bg-slate-50" />,
  ssr: false
});

    
   function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function Home() {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
      const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
      useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
    
      const navLinks = [
        { label: "Home", href: "#home" },
        { label: "Services", href: "#services" },
        { label: "Our Practice", href: "#our-practice" },
        { label: "Patient Reviews", href: "#Patient-Reviews" },
        { label: "FAQ's", href: "#faqs" }
      ];
    
      // spring-based variant states for the navbar container
      const navbarVariants = {
        static: {
          width: "100%",
          maxWidth: "1440px",
          marginTop: "0px",
          paddingLeft: "6rem",
          paddingRight: "6rem",
          paddingTop: "24px",
          paddingBottom: "24px",
          backgroundColor: "rgba(255, 255, 255, 0)",
          borderColor: "rgba(255, 255, 255, 0)",
          borderRadius: "0px",
          boxShadow: "0 0px 0px rgba(0,0,0,0)",
          backdropFilter: "blur(0px)",
          WebkitBackdropFilter: "blur(0px)"
        },
        scrolled: {
          width: "90%",
          maxWidth: "1200px",
          marginTop: "16px",
          paddingLeft: "2.5rem",
          paddingRight: "2.5rem",
          paddingTop: "12px",
          paddingBottom: "12px",
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          borderColor: "rgba(226, 232, 240, 0.6)",
          borderRadius: "9999px",
          boxShadow: "0 20px 40px -15px rgba(24, 61, 79, 0.06)",
          backdropFilter: "blur(16px) saturate(160%)",
          WebkitBackdropFilter: "blur(16px) saturate(160%)"
        }
      };

      // Load-in staggered variants for hero copy
      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1
          }
        }
      };

      const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 90,
      damping: 18,
      mass: 1,
    },
  },
};

      // Stats loading transitions
      const statsContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.45
          }
        }
      };

      const statItemVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: 15,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

      // 3D tooth entry and exit animations
      const toothSceneVariants: Variants = {
        hidden: { opacity: 0, scale: 0.6, rotateY: -35, rotateX: 15, z: -150 },
        visible: {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          rotateX: 0,
          z: 0,
          transition: {
            type: "spring" as const,
            stiffness: 60,
            damping: 15,
            mass: 1.2,
            delay: 0.35
          }
        }
      };

      // Button interaction configurations
      const primaryButtonProps: HTMLMotionProps<"button"> = {
        whileHover: { 
          scale: 1.025, 
          y: -4, 
          boxShadow: "0 15px 35px hsl(var(--primary) / 0.22)",
          backgroundColor: "hsl(var(--primary) / 0.96)"
        },
        whileTap: { 
          scale: 0.96, 
          y: 1,
          boxShadow: "0 4px 10px rgba(24, 61, 79, 0.12)"
        },
        transition: { type: "spring", stiffness: 400, damping: 18 }
      };

      const secondaryButtonProps: HTMLMotionProps<"button"> = {
        whileHover: { 
          scale: 1.025, 
          y: -3, 
          borderColor: "hsl(var(--primary) / 0.5)",
          boxShadow: "0 10px 25px rgba(24, 61, 79, 0.05)"
        },
        whileTap: { 
          scale: 0.96, 
          y: 1,
          borderColor: "hsl(var(--primary) / 0.3)"
        },
        transition: { type: "spring", stiffness: 400, damping: 18 }
      };

      // Stats card interactions
      const statCardProps: HTMLMotionProps<"div"> = {
        whileHover: { 
          scale: 1.05, 
          y: -5,
          borderColor: "hsl(var(--primary) / 0.15)",
          boxShadow: "0 15px 30px rgba(24, 61, 79, 0.04)"
        },
        whileTap: { 
          scale: 0.98,
          y: 1
        },
        transition: { type: "spring", stiffness: 300, damping: 18 }
      };
      const tooth = useToothAnimation();
    
      return (
        <main style={{ position: "relative" }}>
          
          {/* 
            This embedded style block injects the responsive styles directly into the document head,
            guaranteeing they override any external CSS animations, hover states, and structural alignments.
          */}
          
    
          {/* =========================
              NAVBAR SECTION
          ========================= */}
          <section className="navbar-section">
            {/* Container transitions are now entirely controlled via spring physics */}
           <motion.div 
  layout={!isMobile}
  className="navbar-container"
  variants={navbarVariants}
  animate={isMobile ? "static" : (isScrolled ? "scrolled" : "static")}
  transition={isMobile ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 24, mass: 1.1 }}
>
              <motion.div layout="position" className="navbar-logo">
                <h1>DentalNova</h1>
              </motion.div>
    
              <motion.nav 
                layout="position"
                className="navbar-links" 
                style={{ position: "relative" }}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <AnimatePresence>
                  {navLinks.map((link, index) => (
                    <motion.a 
                      layout="position"
                      href={link.href} 
                      key={index}
                      onMouseEnter={() => setHoveredIndex(index)}
                      style={{ position: "relative", zIndex: 1 }}
                    >
                      {link.label}
                      {!isMobile && hoveredIndex === index && (
                        <motion.span
                          layoutId="nav-hover-pill"
                          style={{
                            position: "absolute",
                            inset: "-6px -12px",
                            borderRadius: "9999px",
                            backgroundColor: "hsl(var(--primary-light) / 0.55)",
                            border: "1px solid hsl(var(--primary) / 0.05)",
                            zIndex: -1,
                          }}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        />
                      )}
                    </motion.a>
                  ))}
                </AnimatePresence>
              </motion.nav>
    
              {isMobile ? (
                isScrolled && (
                  <button
                    className="navbar-booking-btn"
                    onClick={() => {
                      window.history.replaceState(null, "", "#booking");
                      document.getElementById("booking")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                  >
                    Book Appointment
                  </button>
                )
              ) : (
                <AnimatePresence>
                  {isScrolled && (
                    <motion.button
                      layout="position"
                      className="navbar-booking-btn"
                      onClick={() => {
                        window.history.replaceState(null, "", "#booking");
                        document.getElementById("booking")?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }}
                      initial={{ opacity: 0, scale: 0.85, x: 15, width: 0 }}
                      animate={{ opacity: 1, scale: 1, x: 0, width: "auto" }}
                      exit={{ opacity: 0, scale: 0.85, x: 15, width: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                    >
                      Book Appointment
                    </motion.button>
                  )}
                </AnimatePresence>
              )}

              {/* Mobile menu toggle */}
              <button
                className="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M 4 20 L 20 4" />
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M 4 4 L 20 20" />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M 4 6 L 20 6" />
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M 4 12 L 20 12" />
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M 4 18 L 20 18" />
                  </svg>
                )}
              </button>
            </motion.div>

            {/* Mobile menu drawer overlay */}
            {isMobileMenuOpen && (
              <div className="mobile-menu-drawer mobile-menu-drawer-open" style={{ pointerEvents: "auto" }}>
                <div className="mobile-menu-links">
                  {navLinks.map((link, index) => {
  return (
    <a
      key={index}
      href={link.href}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {link.label}
    </a>
  )
})}

                  <button 
                    className="mobile-booking-btn"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            )}
          </section>

      {/* =========================
          HERO SECTION
      ========================= */}
      <section className="hero-section" id="home">
        
        {/* Background Layer */}
        <div className="hero-background">
          <div className="hero-image"></div>
          <div className="hero-overlay"></div>
          <div className="hero-blur"></div>
        </div>

        {/* Decorations */}
        <div className="hero-decorations">
          <div className="gradient gradient-1"></div>
          <div className="gradient gradient-2"></div>
          <div className="gradient gradient-3"></div>
          <div className="grid-pattern"></div>
          <div className="particles">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="hero-container">
          
          {/* Left Block (Text and CTA Elements) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hero-left"
          >
            {isMobile ? (
              <div className="hero-badge hero-fade-in">
                <p>Trusted Modern Dental Clinic</p>
              </div>
            ) : (
              <motion.div variants={itemVariants} className="hero-badge">
                <p>Trusted Modern Dental Clinic</p>
              </motion.div>
            )}

            <motion.div variants={isMobile ? undefined : itemVariants} className={isMobile ? "hero-heading hero-fade-in" : "hero-heading"}>
              <h2>
                Creating
                <br />
                Healthy
                <br />
                <span>Smiles.</span>
              </h2>
              <p>
                Advanced dental care with modern technology, experienced
                professionals, and a comfortable environment designed for
                patients of every age.
              </p>
            </motion.div>

            {isMobile ? (
              <div className="hero-actions hero-fade-in">
                <button
                  onClick={() => {
                    window.history.replaceState(null, "", "#booking");
                    document.getElementById("booking")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className="primary-button"
                >
                  Book Appointment
                </button>
                <button
                  onClick={() => {
                    window.history.replaceState(null, "", "#services");
                    document.getElementById("services")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className="secondary-button"
                >
                  Explore Services
                </button>
              </div>
            ) : (
              <motion.div variants={itemVariants} className="hero-actions">
                <motion.button
                  onClick={() => {
                    window.history.replaceState(null, "", "#booking");
                    document.getElementById("booking")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className="primary-button"
                  {...primaryButtonProps}
                >
                  Book Appointment
                </motion.button>
                <motion.button
                  onClick={() => {
                    window.history.replaceState(null, "", "#services");
                    document.getElementById("services")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className="secondary-button"
                  {...secondaryButtonProps}
                >
                  Explore Services
                </motion.button>
              </motion.div>
            )}

{isMobile ? (
  <div className="hero-stats hero-fade-in">
    <div className="stat-card">
      <AnimatedCounter value={15} suffix="+" />
      <p>Years Experience</p>
    </div>
    <div className="stat-card">
      <AnimatedCounter value={8} suffix="K+" />
      <p>Happy Patients</p>
    </div>
    <div className="stat-card">
      <AnimatedCounter value={4.9} suffix="★" decimals={1} />
      <p>Average Rating</p>
    </div>
  </div>
) : (
  <motion.div variants={statsContainerVariants} className="hero-stats">
    <motion.div variants={statItemVariants} className="stat-card" {...statCardProps}>
      <AnimatedCounter value={15} suffix="+" />
      <p>Years Experience</p>
    </motion.div>
    <motion.div variants={statItemVariants} className="stat-card" {...statCardProps}>
      <AnimatedCounter value={8} suffix="K+" />
      <p>Happy Patients</p>
    </motion.div>
    <motion.div variants={statItemVariants} className="stat-card" {...statCardProps}>
      <AnimatedCounter value={4.9} suffix="★" decimals={1} />
      <p>Average Rating</p>
    </motion.div>
  </motion.div>
)}
          {/* Right Block (Image Scene Container) */}
          <div className="hero-right">
            <motion.div 
              variants={toothSceneVariants}
              initial="hidden"
              animate="visible"
              className="tooth-scene"
            >
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 0.4, duration: 1.2 }} className="ring ring-one"></motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 0.55, duration: 1.2 }} className="ring ring-two"></motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 0.7, duration: 1.2 }} className="ring ring-three"></motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.75 }} transition={{ delay: 0.45, duration: 1.5 }} className="tooth-glow"></motion.div>

            
             <motion.div
  initial={{
    opacity: 0,
    scale: 0.7,
    rotate: -25,
    y: 25,
  }}

  animate={{
    opacity: 1,
    scale: 1,
    rotate: -12,
    y: 0,
  }}

  transition={{
    type: "spring",
    stiffness: 90,
    damping: 18,
    mass: 1.1,
    delay: 0.45,
  }}

  style={{
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  }}
>
                <motion.div
  ref={tooth.ref}
  className="tooth-wrapper"
  style={isMobile ? undefined : tooth.style}
  {...(isMobile ? {} : tooth.events)}
>
  <Image
    src="/tooth.png"
    alt="3D Tooth"
    width={400}
    height={400}
    priority
    fetchPriority="high"
    decoding="async"
    className="object-contain"
    sizes="(max-width: 480px) 250px, (max-width: 1024px) 280px, 400px"
  />
</motion.div>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="floating-plus plus-1">+</motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="floating-plus plus-2">+</motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="floating-circle circle-1"></motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="floating-circle circle-2"></motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="floating-circle circle-3"></motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }} className="floating-dot dot-1"></motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }} className="floating-dot dot-2"></motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }} className="floating-dot dot-3"></motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15 }} className="spark spark-1"></motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.25 }} className="spark spark-2"></motion.div>
            </motion.div>
          </div>
        </div>
        <div className="hero-bottom-fade"></div>
      </section>


  

      <PlaceholderNotice />
      <FloatingMobileNav />
      <ServicesHeaderSection />
      <OurPracticeHeader />
      <DentalReviewsSection />
      <CosmeticDentistryFAQ />
      <FooterContactSection />

    

    </main>
  );
}
