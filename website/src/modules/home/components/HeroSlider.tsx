"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Award,
  ScreenShare,
  Globe2,
} from "lucide-react";
import { useLanguage } from "@/shared/i18n";

// 5 Real Campus Slides Asset List
const SLIDE_IMAGES = [
  {
    id: "slide1",
    src: "/images/slides/slide1.jpg",
    alt: "Smart Digital Classroom & Projector Taleem",
  },
  {
    id: "slide2",
    src: "/images/slides/slide2.jpg",
    alt: "Campus Infrastructure & Safe Hostel",
  },
  {
    id: "slide3",
    src: "/images/slides/slide3.jpg",
    alt: "Academic Assembly & Islamic Scholarship",
  },
  {
    id: "slide4",
    src: "/images/slides/slide4.jpg",
    alt: "Computer Lab & Modern Learning",
  },
  {
    id: "slide5",
    src: "/images/slides/slide5.jpg",
    alt: "100% Scholarship & Takhassus Fil Ifta",
  },
];

const AUTOPLAY_DURATION = 5000; // 5 seconds per slide

export const HeroSlider: React.FC = () => {
  const { t, language, direction } = useLanguage();
  const isRTL = direction === "rtl";

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Translation helpers
  const heroData = t.hero || {
    badge: "✨ India's Premier Digital Smart Classroom Islamic Centre for Girls",
    exploreCourses: "Explore Courses",
    studentPortal: "Student Portal",
    applyOnline: "Apply for Admission",
    slides: [
      {
        tag: "Smart Digital Education",
        title: "Interactive Digital Smart Classes & Projector Learning",
        subtitle:
          "Harmonious integration of classical Islamic scholarship with digital interactive panels and high-tech labs.",
      },
      {
        tag: "Safe & Modest Environment",
        title: "Strict Purdah-Compliant & Magnificent Campus",
        subtitle:
          "100% safe, secure, and nurturing residential campus dedicated to female academic excellence and moral Tarbiyah.",
      },
      {
        tag: "Sacred & Modern Harmony",
        title: "Dars-e-Nizami, Muftiya Course & Contemporary Skills",
        subtitle:
          "Specialization in Islamic Jurisprudence (Online & Offline) combined with Spoken English and IT competencies.",
      },
      {
        tag: "Hifz & Tajweed-ul-Quran",
        title: "Quran Memorization, Tajweed & Qira'at",
        subtitle:
          "Expert Quran memorization with authentic Tajweed rules and spiritual nurturing under certified female scholars.",
      },
      {
        tag: "100% Scholarship",
        title: "Jamia 100% Scholarship & Merit Entrance Test",
        subtitle:
          "100% free education, hostel boarding, and meals sponsored directly by Jamia Barkat-e-Haram for deserving students.",
      },
    ],
    highlights: {
      scholarship: "100% Scholarship",
      scholarshipSub: "Merit & Deserving Girls",
      smartClass: "Smart Panels",
      smartClassSub: "Interactive Classes",
      hybridIfta: "Takhassus Fil Ifta",
      hybridIftaSub: "Online & On-Campus",
    },
  };

  const currentSlideText =
    heroData.slides?.[currentIndex] || heroData.slides?.[0];

  // Navigation handlers
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDE_IMAGES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? SLIDE_IMAGES.length - 1 : prev - 1
    );
  }, []);

  // Guaranteed Continuous Auto-play timer for Laptop, Desktop & Mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDE_IMAGES.length);
    }, 4500); // 4.5 seconds auto-advance

    return () => clearInterval(timer);
  }, []);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        // Swiped left
        isRTL ? handlePrev() : handleNext();
      } else {
        // Swiped right
        isRTL ? handleNext() : handlePrev();
      }
    }
  };

  // Font family determination based on active language
  const getHeadlineFont = () => {
    switch (language) {
      case "ur":
        return "font-urduTitle tracking-normal leading-[1.6] sm:leading-[1.7] py-0.5";
      case "ar":
        return "font-arabic font-bold tracking-normal leading-[1.4] py-0.5";
      case "hi":
        return "font-hindi font-bold tracking-tight leading-[1.2]";
      default:
        return "font-display font-bold tracking-tight leading-[1.15]";
    }
  };

  const getSubtextFont = () => {
    switch (language) {
      case "ur":
        return "font-urduBody text-[11px] sm:text-sm md:text-base leading-[1.7] sm:leading-[1.8] py-0.5";
      case "ar":
        return "font-arabic text-[11px] sm:text-sm leading-[1.55] sm:leading-[1.65]";
      case "hi":
        return "font-hindi text-[10.5px] sm:text-sm leading-[1.4] sm:leading-[1.45]";
      default:
        return "font-sans text-[10.5px] sm:text-sm leading-[1.4] sm:leading-[1.45]";
    }
  };

  return (
    <section
      aria-label="Hero Section"
      className="relative w-full overflow-hidden pt-2 sm:pt-3.5 lg:pt-4 pb-3 sm:pb-6 lg:pb-8 select-none px-2.5 sm:px-6 lg:px-8"
    >
      {/* Background Ambient Glow Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[600px] h-[280px] sm:h-[400px] rounded-full bg-gradient-to-tr from-amber-400/15 via-rose-400/15 to-teal-400/15 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        


        {/* =========================================================================
            2. CLEAN CINEMATIC GLASS SLIDER CARD (COMPACT HEIGHT & FULL WIDTH IMAGES)
           ========================================================================= */}
        <div
          className="relative w-full rounded-xl sm:rounded-3xl overflow-hidden glass-card border border-white/70 dark:border-amber-500/25 shadow-[0_12px_35px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_55px_rgba(0,0,0,0.7)] group"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Visual Container: Balanced Sweet Spot on Mobile */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[16/10] md:aspect-[21/10] lg:aspect-[21/10] min-h-[175px] sm:min-h-[340px] lg:min-h-[370px] max-h-[210px] sm:max-h-[430px]">
            
            {/* Persistent Dark Base to prevent white flash */}
            <div className="absolute inset-0 bg-neutral-950 z-0" />

            {/* All 5 Preloaded Slides Hardware-Accelerated Crossfade */}
            {SLIDE_IMAGES.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 w-full h-full transform-gpu transition-opacity duration-700 ease-in-out ${
                    isActive
                      ? "opacity-100 z-10 scale-100"
                      : "opacity-0 z-0 scale-[1.02] pointer-events-none"
                  }`}
                  style={{ willChange: "opacity, transform" }}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                    className="object-cover object-center"
                  />
                </div>
              );
            })}

            {/* Permanent Persistent Scrim Gradients (Zero Flash, Never Unmounts) */}
            <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-black/95 via-black/45 to-black/20 sm:to-black/30" />
            <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/75 sm:to-black/80" />

            {/* Specular Top Border Glow Line */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent z-30" />

            {/* Top Slide Tag Luxury Capsule Badge */}
            <div className="absolute top-2 inset-x-2.5 sm:top-3.5 sm:inset-x-4 z-30 flex items-center justify-start pointer-events-none">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/45 dark:bg-black/65 backdrop-blur-xl border border-amber-400/40 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(245,158,11,0.25)] transition-all duration-300">
                {/* Glowing Pulsing Beacon */}
                <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-90" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gradient-to-r from-amber-300 to-amber-500 shadow-[0_0_8px_rgba(245,158,11,1)]" />
                </span>

                <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-amber-300 shrink-0" />

                {/* Animated Gradient Tag Text */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`badge-tag-${currentIndex}-${language}`}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 6 }}
                    transition={{ duration: 0.25 }}
                    className={`text-[9.5px] sm:text-xs font-extrabold tracking-wider ${isRTL ? "font-urduTitle leading-[1.4] py-0.5 text-amber-200" : "bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 bg-clip-text text-transparent drop-shadow-sm uppercase"}`}
                  >
                    {currentSlideText?.tag}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Content HUD (Text + Buttons Overlay) */}
            <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-4 lg:p-5 z-30 flex flex-col text-start">
              
              {/* Animated Slide Title */}
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`slide-title-${currentIndex}-${language}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                  className={`text-xs sm:text-xl md:text-2xl lg:text-3xl text-white font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] mb-0.5 sm:mb-1.5 overflow-visible ${getHeadlineFont()}`}
                >
                  {currentSlideText?.title}
                </motion.h1>
              </AnimatePresence>

              {/* Animated Slide Subtitle */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={`slide-sub-${currentIndex}-${language}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  className={`text-white/85 text-[9.5px] sm:text-sm line-clamp-1 sm:line-clamp-2 max-w-2xl drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] mb-1.5 sm:mb-3.5 ${getSubtextFont()}`}
                >
                  {currentSlideText?.subtitle}
                </motion.p>
              </AnimatePresence>

              {/* Action Buttons Row (Compact on Mobile) */}
              <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2.5 pt-1 sm:pt-2 border-t border-white/15">
                
                {/* CTA Buttons */}
                <div className="flex items-center gap-1.5 sm:gap-2.5">
                  <Link
                    href="/courses"
                    className="btn-luxury-gradient inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-4.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-bold text-white shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none"
                  >
                    <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-100" />
                    <span>{heroData.exploreCourses}</span>
                  </Link>

                  <Link
                    href="/students"
                    className="btn-crystal-glass inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-semibold text-white hover:text-amber-300 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none border-white/30"
                  >
                    <GraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" />
                    <span>{heroData.studentPortal}</span>
                  </Link>
                </div>

                {/* Micro Trust Tag (Desktop only) */}
                <div className="hidden sm:flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/80 glass-ultra px-2.5 py-1 rounded-lg border border-white/20">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Mujaddid Alf Sani Trust (Regd.)</span>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =========================================================================
            3. ULTRA-COMPACT 3 STORY STAT CHIPS (BELOW CARD - ZERO CLIPPING)
           ========================================================================= */}
        <div className="grid grid-cols-3 gap-1 sm:gap-3 mt-1.5 sm:mt-2.5">
          
          {/* Chip 1: 100% Scholarship */}
          <div className="glass-item-card rounded-lg sm:rounded-xl p-1.5 sm:p-2.5 flex items-center gap-1 sm:gap-2.5 transition-transform duration-200 hover:-translate-y-0.5 shadow-sm min-h-[38px] sm:min-h-[44px]">
            <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shrink-0 shadow-sm">
              <Award className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
            </div>
            <div className="flex flex-col text-start min-w-0 flex-1 overflow-visible">
              <span className={`font-bold text-[8.5px] xs:text-[9.5px] sm:text-xs text-bah-text-primary dark:text-bah-dark-text-primary overflow-visible py-0.5 ${language === "ur" ? "font-urduTitle text-[10px] xs:text-[11px] sm:text-sm leading-[1.65]" : language === "ar" ? "font-arabic text-[9px] xs:text-[10px] leading-[1.35]" : language === "hi" ? "font-hindi text-[9px] xs:text-[10px] leading-[1.25]" : "leading-[1.2]"}`}>
                {heroData.highlights?.scholarship}
              </span>
              <span className={`hidden sm:inline text-[9px] sm:text-[10px] text-bah-text-muted dark:text-bah-dark-text-muted leading-tight mt-0.5 ${language === "ur" ? "font-urduBody" : ""}`}>
                {heroData.highlights?.scholarshipSub}
              </span>
            </div>
          </div>

          {/* Chip 2: Digital Smart Panels */}
          <div className="glass-item-card rounded-lg sm:rounded-xl p-1.5 sm:p-2.5 flex items-center gap-1 sm:gap-2.5 transition-transform duration-200 hover:-translate-y-0.5 shadow-sm min-h-[38px] sm:min-h-[44px]">
            <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white shrink-0 shadow-sm">
              <ScreenShare className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
            </div>
            <div className="flex flex-col text-start min-w-0 flex-1 overflow-visible">
              <span className={`font-bold text-[8.5px] xs:text-[9.5px] sm:text-xs text-bah-text-primary dark:text-bah-dark-text-primary overflow-visible py-0.5 ${language === "ur" ? "font-urduTitle text-[10px] xs:text-[11px] sm:text-sm leading-[1.65]" : language === "ar" ? "font-arabic text-[9px] xs:text-[10px] leading-[1.35]" : language === "hi" ? "font-hindi text-[9px] xs:text-[10px] leading-[1.25]" : "leading-[1.2]"}`}>
                {heroData.highlights?.smartClass}
              </span>
              <span className={`hidden sm:inline text-[9px] sm:text-[10px] text-bah-text-muted dark:text-bah-dark-text-muted leading-tight mt-0.5 ${language === "ur" ? "font-urduBody" : ""}`}>
                {heroData.highlights?.smartClassSub}
              </span>
            </div>
          </div>

          {/* Chip 3: Global Hybrid Muftiya */}
          <div className="glass-item-card rounded-lg sm:rounded-xl p-1.5 sm:p-2.5 flex items-center gap-1 sm:gap-2.5 transition-transform duration-200 hover:-translate-y-0.5 shadow-sm min-h-[38px] sm:min-h-[44px]">
            <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-sm">
              <Globe2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
            </div>
            <div className="flex flex-col text-start min-w-0 flex-1 overflow-visible">
              <span className={`font-bold text-[8.5px] xs:text-[9.5px] sm:text-xs text-bah-text-primary dark:text-bah-dark-text-primary overflow-visible py-0.5 ${language === "ur" ? "font-urduTitle text-[10px] xs:text-[11px] sm:text-sm leading-[1.65]" : language === "ar" ? "font-arabic text-[9px] xs:text-[10px] leading-[1.35]" : language === "hi" ? "font-hindi text-[9px] xs:text-[10px] leading-[1.25]" : "leading-[1.2]"}`}>
                {heroData.highlights?.hybridIfta}
              </span>
              <span className={`hidden sm:inline text-[9px] sm:text-[10px] text-bah-text-muted dark:text-bah-dark-text-muted leading-tight mt-0.5 ${language === "ur" ? "font-urduBody" : ""}`}>
                {heroData.highlights?.hybridIftaSub}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
