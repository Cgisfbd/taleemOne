"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Quote,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Home,
  Award,
  BookOpen,
} from "lucide-react";
import { useLanguage } from "@/shared/i18n";

export const AboutFounderSection: React.FC = () => {
  const { t, direction, language } = useLanguage();
  const isRTL = direction === "rtl";
  const sec = (t as any).aboutFounderSection;

  // Active Tab: 'about' or 'founder'
  const [activeTab, setActiveTab] = useState<"about" | "founder">("about");

  if (!sec) return null;

  const isAbout = activeTab === "about";

  return (
    <section className="relative w-full py-6 sm:py-9 lg:py-11 px-3.5 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 bg-amber-400/10 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-80 h-80 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* =========================================================================
            1. COMPACT SECTION HEADER & SEGMENTED TAB SWITCHER
           ========================================================================= */}
        <div className="flex flex-col items-center text-center mb-5 sm:mb-6">
          
          {/* Glowing Mini Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs font-black shadow-xs mb-2.5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
            <span>{sec.badge}</span>
          </div>

          {/* Main Title */}
          <h2 className="font-display font-extrabold text-xl sm:text-2xl lg:text-3xl tracking-tight text-[#1E1128] dark:text-[#FAF6FC] mb-2">
            {sec.title}
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-[#6B5A73] dark:text-[#C8BDCF] max-w-xl leading-relaxed mb-4">
            {sec.subtitle}
          </p>

          {/* Dual Pill Switcher */}
          <div className="inline-flex p-1 rounded-2xl bg-black/5 dark:bg-white/[0.06] border border-black/10 dark:border-white/10 shadow-inner backdrop-blur-md max-w-full">
            
            {/* Tab 1: About Institution */}
            <button
              onClick={() => setActiveTab("about")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                language === "ur" ? "py-1.5 sm:py-2 leading-[1.6]" : "py-1 sm:py-1.5 leading-tight"
              } ${
                isAbout
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md scale-[1.02]"
                  : "text-[#5C4A66] dark:text-[#C8BDCF] hover:text-[#1E1128] dark:hover:text-white"
              }`}
            >
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>{sec.about?.tag}</span>
            </button>

            {/* Tab 2: Founder's Message */}
            <button
              onClick={() => setActiveTab("founder")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                language === "ur" ? "py-1.5 sm:py-2 leading-[1.6]" : "py-1 sm:py-1.5 leading-tight"
              } ${
                !isAbout
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md scale-[1.02]"
                  : "text-[#5C4A66] dark:text-[#C8BDCF] hover:text-[#1E1128] dark:hover:text-white"
              }`}
            >
              <Quote className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>{sec.founder?.tag}</span>
            </button>

          </div>
        </div>

        {/* =========================================================================
            2. SINGLE UNIFIED COMPACT CARD (High Space Efficiency)
           ========================================================================= */}
        <div
          className={`relative rounded-3xl p-5 sm:p-7 lg:p-8 overflow-hidden transition-all duration-300 border ${
            isAbout
              ? "border-amber-500/35 bg-gradient-to-br from-white/95 via-amber-50/25 to-white/90 dark:from-[#181126]/95 dark:via-[#1B122E]/90 dark:to-[#130D20]/95 shadow-[0_8px_30px_rgba(217,119,6,0.1)]"
              : "border-purple-500/35 bg-gradient-to-br from-white/95 via-purple-50/25 to-white/90 dark:from-[#181024]/95 dark:via-[#1D132D]/90 dark:to-[#140D1F]/95 shadow-[0_8px_30px_rgba(168,85,247,0.1)]"
          }`}
        >
          {/* Top Arch Glow Accent */}
          <div
            className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${
              isAbout
                ? "from-amber-400 via-amber-500 to-amber-600 shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                : "from-purple-400 via-purple-500 to-amber-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]"
            }`}
          />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Left/Main Content Column */}
            <div className="flex-1 min-w-0 text-start">
              
              {/* Header Badges Strip */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-black border ${
                    isAbout
                      ? "bg-amber-500/15 border-amber-500/30 text-amber-900 dark:text-amber-200"
                      : "bg-purple-500/15 border-purple-500/30 text-purple-900 dark:text-purple-200"
                  }`}
                >
                  {isAbout ? <Building2 className="w-3.5 h-3.5" /> : <Quote className="w-3.5 h-3.5" />}
                  {isAbout ? sec.about?.tag : sec.founder?.tag}
                </span>

                <span className="text-xs font-semibold text-[#7E6E85] dark:text-[#A898B0]">
                  {isAbout ? "• مرکز الدراسات الاسلامیۃ للبنات" : `• ${sec.founder?.role}`}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display font-extrabold text-lg sm:text-2xl text-[#1E1128] dark:text-[#FAF6FC] tracking-tight leading-snug mb-2">
                {isAbout ? sec.about?.title : sec.founder?.title}
              </h3>

              {/* Content depending on Active Tab */}
              {isAbout ? (
                <>
                  {/* Description */}
                  <p className="text-xs sm:text-[14px] text-[#5C4A66] dark:text-[#C8BDCF] leading-relaxed mb-4 max-w-2xl">
                    {sec.about?.desc}
                  </p>

                  {/* 3 Clean Unboxed Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full shrink-0 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]" />
                      <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="text-xs sm:text-[12.5px] font-bold text-[#2D1F33] dark:text-[#FAF6FC] leading-tight">
                        {sec.about?.p1}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full shrink-0 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]" />
                      <Home className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span className="text-xs sm:text-[12.5px] font-bold text-[#2D1F33] dark:text-[#FAF6FC] leading-tight">
                        {sec.about?.p2}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full shrink-0 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]" />
                      <Award className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                      <span className="text-xs sm:text-[12.5px] font-bold text-[#2D1F33] dark:text-[#FAF6FC] leading-tight">
                        {sec.about?.p3}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Founder's Message Quote */}
                  <div className="relative p-3.5 sm:p-4 rounded-2xl bg-white/60 dark:bg-white/[0.04] border border-purple-500/20 dark:border-white/10 mb-3 max-w-2xl">
                    <p className="text-xs sm:text-[13.5px] text-[#4A3B52] dark:text-[#E2D9E7] leading-relaxed italic font-medium">
                      "{sec.founder?.quote}"
                    </p>
                  </div>

                  {/* Founder Signature */}
                  <div className="flex items-center gap-2.5 pt-1">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-amber-500 flex items-center justify-center text-white font-black text-[11px] shadow-sm shrink-0">
                      م.ش
                    </div>
                    <div className="flex items-baseline gap-2 min-w-0">
                      <h4 className="font-display font-black text-xs sm:text-sm text-[#1E1128] dark:text-[#FAF6FC]">
                        {sec.founder?.author}
                      </h4>
                      <span className="text-[11px] font-semibold text-purple-800 dark:text-purple-300/90 truncate">
                        ({sec.founder?.role})
                      </span>
                    </div>
                  </div>
                </>
              )}

            </div>

            {/* Right Action Column */}
            <div className="flex flex-col items-stretch lg:items-end justify-center shrink-0 lg:w-52 pt-2 lg:pt-0 border-t lg:border-t-0 lg:border-s border-black/10 dark:border-white/10 lg:ps-6">
              <Link
                href="/about"
                className={`w-full flex items-center justify-center gap-2 h-11 sm:h-12 px-5 rounded-xl text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] group/btn ${
                  isAbout
                    ? "bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600"
                    : "bg-gradient-to-r from-purple-600 via-purple-700 to-amber-600 hover:from-purple-500 hover:to-amber-500"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>{isAbout ? sec.about?.cta : sec.founder?.cta}</span>
                <ChevronRight
                  className={`w-4 h-4 transition-transform group-hover/btn:translate-x-1 ${
                    isRTL ? "rotate-180 group-hover/btn:-translate-x-1" : ""
                  }`}
                />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
