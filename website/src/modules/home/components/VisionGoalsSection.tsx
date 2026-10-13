"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/shared/i18n";

export const VisionGoalsSection: React.FC = () => {
  const { t, direction } = useLanguage();
  const isRTL = direction === "rtl";
  const vs = (t as any).visionSection;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // 6 Strategic Goals Data (Jamia Barkat-e-Haram)
  const goals = [
    {
      num: vs?.g1_num || "01",
      tag: vs?.g1_tag || "ڈیجیٹل تدریس",
      title: vs?.g1_title || "ہر کلاس روم میں اسمارٹ پینلز (۲ سالہ ہدف)",
      desc: vs?.g1_desc || "آئندہ ۲ سال میں جامعہ کے تمام کلاس رومز میں جدید انٹرایکٹو ڈیجیٹل اسمارٹ بورڈز کی تنصیب۔",
    },
    {
      num: vs?.g2_num || "02",
      tag: vs?.g2_tag || "تعمیرِ جامعہ",
      title: vs?.g2_title || "کیمپس و رہائشی ہاسٹل کی توسیع",
      desc: vs?.g2_desc || "طالبات کے محفوظ قیام اور تعلیمی گنجائش بڑھانے کے لیے نئے تعلیمی و رہائشی بلاکس کی تعمیر۔",
    },
    {
      num: vs?.g3_num || "03",
      tag: vs?.g3_tag || "علمی ذخیرہ",
      title: vs?.g3_title || "مرکزی اسلامی لائبریری کا قیام",
      desc: vs?.g3_desc || "تفسیر، حدیث، فقہ اور اسلامی علوم کی ہزاروں مستند و نایاب کتب پر مشتمل شاندار لائبریری۔",
    },
    {
      num: vs?.g4_num || "04",
      tag: vs?.g4_tag || "تربیتِ معلمات",
      title: vs?.g4_title || "تدریب المعلمات ورکشاپس",
      desc: vs?.g4_desc || "معلمات کی تدریسی صلاحیتوں اور طالبات کی نفسیاتی و اخلاقی تربیت کے لیے سالانہ خصوصی ورکشاپس۔",
    },
    {
      num: vs?.g5_num || "05",
      tag: vs?.g5_tag || "آن لائن رسائی",
      title: vs?.g5_title || "۱,۰۰۰+ طالبات کا آن لائن تعلیمی ہدف",
      desc: vs?.g5_desc || "آن لائن لائیو انٹرایکٹو کلاسز کے ذریعے ہندوستان اور بیرونِ ملک کی ایک ہزار سے زائد طالبات کو جوڑنا۔",
    },
    {
      num: vs?.g6_num || "06",
      tag: vs?.g6_tag || "شرعی رہنمائی",
      title: vs?.g6_title || "خواتین دار الافتاء و شرعی ہیلپ لائن",
      desc: vs?.g6_desc || "مسلم خواتین کے گھریلو، شخصی اور دینی مسائل کے مستند اور تسلی بخش حل کے لیے خصوصی رہنمائی سیل۔",
    },
  ];

  const totalGoals = goals.length;

  // 6 Dynamic 3D Rotation Angles for the Deck of Cards
  const deckAngles = [
    {
      front: "rotate-[-2.8deg]",
      back1: "rotate-[3.8deg] translate-x-2.5 translate-y-1.5",
      back2: "rotate-[-1.2deg] translate-x-5 translate-y-3",
    },
    {
      front: "rotate-[1.2deg]",
      back1: "rotate-[-3.5deg] -translate-x-2 translate-y-1.5",
      back2: "rotate-[3.2deg] translate-x-3.5 translate-y-3",
    },
    {
      front: "rotate-[3.2deg]",
      back1: "rotate-[-2.8deg] translate-x-2 -translate-y-1",
      back2: "rotate-[1.2deg] translate-x-4.5 translate-y-2.5",
    },
    {
      front: "rotate-[-1.5deg]",
      back1: "rotate-[2.5deg] translate-x-2 translate-y-2",
      back2: "rotate-[-3deg] -translate-x-3 translate-y-2",
    },
    {
      front: "rotate-[2.4deg]",
      back1: "rotate-[-2deg] -translate-x-2 translate-y-1",
      back2: "rotate-[1.5deg] translate-x-3.5 translate-y-2",
    },
    {
      front: "rotate-[-2.0deg]",
      back1: "rotate-[3deg] translate-x-2.5 -translate-y-1",
      back2: "rotate-[-1deg] translate-x-4 translate-y-2",
    },
  ];

  const currentAngles = deckAngles[currentIndex % deckAngles.length];

  // Navigation handlers
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalGoals);
  }, [totalGoals]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalGoals) % totalGoals);
  }, [totalGoals]);

  // Auto-play timer (every 4.5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        isRTL ? handlePrev() : handleNext();
      } else {
        isRTL ? handleNext() : handlePrev();
      }
    }
  };

  if (!vs) return null;

  return (
    <section className="relative w-full py-6 sm:py-9 lg:py-11 px-3.5 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 bg-amber-400/10 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-80 h-80 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* =========================================================================
            1. SECTION HEADER (Harmonized with Upper Sections)
           ========================================================================= */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
          
          {/* Glowing Mini Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs font-black shadow-xs mb-2.5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
            <span>{vs.badge}</span>
          </div>

          {/* Main Section Title */}
          <h2 className="font-display font-extrabold text-xl sm:text-2xl lg:text-3xl tracking-tight text-[#1E1128] dark:text-[#FAF6FC] mb-2">
            {vs.title}
          </h2>

          {/* Section Subtitle */}
          <p className="text-xs sm:text-sm text-[#6B5A73] dark:text-[#C8BDCF] max-w-xl leading-relaxed">
            {vs.subtitle}
          </p>
        </div>

        {/* =========================================================================
            2. CENTERED 3D TILTED STACKED CARD DECK SLIDER (6 Goals Focus)
           ========================================================================= */}
        <div
          className="flex flex-col items-center justify-center relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Card Deck Wrapper (Half-Height Slim Design) */}
          <div className="relative w-full max-w-[360px] sm:max-w-[440px] h-[165px] sm:h-[180px] flex items-center justify-center">
            
            {/* Back Stack Card 2 (Bottom Layer) */}
            <div
              className={`absolute inset-0 rounded-2xl bg-white/40 dark:bg-white/[0.04] backdrop-blur-xs shadow-md border border-amber-400/20 transition-all duration-700 ease-out pointer-events-none ${currentAngles.back2}`}
            />

            {/* Back Stack Card 1 (Middle Layer) */}
            <div
              className={`absolute inset-0 rounded-2xl bg-white/70 dark:bg-white/[0.08] backdrop-blur-xs shadow-lg border border-amber-400/30 transition-all duration-700 ease-out pointer-events-none ${currentAngles.back1}`}
            />

            {/* Front Featured Card (Top Layer - Slim Compact Proportion) */}
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-white/95 via-amber-50/20 to-white/90 dark:from-[#181126]/95 dark:via-[#1B122E]/90 dark:to-[#130D20]/95 text-[#2D1F33] dark:text-[#FAF6FC] p-3.5 sm:p-4 shadow-[0_6px_25px_rgba(217,119,6,0.12)] border border-amber-500/35 dark:border-amber-400/20 flex flex-col justify-between transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden ${currentAngles.front}`}
            >
              {/* Top Arch Glow Accent */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 shadow-[0_0_10px_rgba(245,158,11,0.6)]" />

              <div className="flex flex-col items-start text-start w-full">
                {/* Top Badges & Number Strip */}
                <div className="flex items-center justify-between w-full gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-[10.5px] font-black">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {goals[currentIndex]?.tag}
                  </span>

                  <span className="font-display font-black text-[11px] text-amber-800 dark:text-amber-300">
                    {goals[currentIndex]?.num}/06
                  </span>
                </div>

                {/* Card Goal Title */}
                <h3 className="font-display font-extrabold text-xs sm:text-sm text-[#1E1128] dark:text-[#FAF6FC] tracking-tight mb-1 text-start leading-snug">
                  {goals[currentIndex]?.title}
                </h3>

                {/* Card Goal Description */}
                <p className="text-[11px] sm:text-xs text-[#5C4A66] dark:text-[#C8BDCF] leading-snug italic text-start font-medium line-clamp-2">
                  "{goals[currentIndex]?.desc}"
                </p>
              </div>

              {/* Card Bottom Author Seal (Aligned to Start) */}
              <div className="flex items-center justify-start gap-2 pt-1.5 border-t border-black/5 dark:border-white/10 text-start w-full">
                <div className="w-5 h-5 rounded-full overflow-hidden border border-amber-500/40 shrink-0 bg-amber-50 dark:bg-[#2D1F33] p-0.5 shadow-2xs">
                  <Image
                    src="/images/logo.png"
                    alt="Jamia Logo"
                    width={20}
                    height={20}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="font-display font-black text-[10.5px] bg-gradient-to-r from-[#854D0E] via-[#D97706] to-[#B45309] dark:from-[#FFFBEB] dark:via-[#FBBF24] dark:to-[#F59E0B] bg-clip-text text-transparent uppercase truncate">
                    {t.common?.appName || "JAMIA BARKAT-E-HARAM"}
                  </span>
                  <span className="text-[9.5px] font-semibold text-amber-800/80 dark:text-amber-300/80 truncate">
                    • {vs.officialTag || "Official"}
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* =========================================================================
              BOTTOM NAVIGATION CONTROLS (Harmonized with Upper Sections)
             ========================================================================= */}
          <div className="flex items-center gap-3 mt-6 sm:mt-7">
            
            {/* Left Arrow Button */}
            <button
              onClick={isRTL ? handleNext : handlePrev}
              className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/[0.06] hover:bg-amber-500 hover:text-white border border-black/10 dark:border-white/10 flex items-center justify-center text-[#1E1128] dark:text-[#FAF6FC] transition-all duration-200 cursor-pointer active:scale-90 shadow-xs"
              aria-label="Previous Slide"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* 6 Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {goals.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? "w-6 bg-gradient-to-r from-amber-500 to-amber-600 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                      : "w-2 bg-black/15 dark:bg-white/20 hover:bg-black/30 dark:hover:bg-white/40"
                  }`}
                  aria-label={`Go to goal ${idx + 1}`}
                />
              ))}
            </div>

            {/* Right Arrow Button */}
            <button
              onClick={isRTL ? handlePrev : handleNext}
              className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/[0.06] hover:bg-amber-500 hover:text-white border border-black/10 dark:border-white/10 flex items-center justify-center text-[#1E1128] dark:text-[#FAF6FC] transition-all duration-200 cursor-pointer active:scale-90 shadow-xs"
              aria-label="Next Slide"
            >
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>

    </section>
  );
};
