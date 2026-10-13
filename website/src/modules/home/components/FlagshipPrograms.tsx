"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  ScreenShare,
  Globe2,
  Sparkles,
  ChevronRight,
  Video,
  Award,
  Radio,
  Layers,
} from "lucide-react";
import { useLanguage } from "@/shared/i18n";

export const FlagshipPrograms: React.FC = () => {
  const { t, direction, language } = useLanguage();
  const isRTL = direction === "rtl";
  const ps = (t as any).programsSection;

  // Active Tab: 'muftiya' or 'darsNizami'
  const [activeTab, setActiveTab] = useState<"muftiya" | "darsNizami">("muftiya");

  if (!ps) return null;

  const currentProgram = activeTab === "muftiya" ? ps.muftiya : ps.darsNizami;
  const isMuftiya = activeTab === "muftiya";

  return (
    <section className="relative w-full py-6 sm:py-9 lg:py-11 px-3.5 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 bg-amber-400/10 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-80 h-80 bg-teal-400/10 dark:bg-teal-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* =========================================================================
            1. SECTION HEADER & SEGMENTED TAB SWITCHER
           ========================================================================= */}
        <div className="flex flex-col items-center text-center mb-5 sm:mb-6">
          
          {/* Glowing Mini Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs font-black shadow-xs mb-2.5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
            <span>{ps.badge}</span>
          </div>

          {/* Main Title */}
          <h2 className="font-display font-extrabold text-xl sm:text-2xl lg:text-3xl tracking-tight text-[#1E1128] dark:text-[#FAF6FC] mb-2">
            {ps.title}
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-[#6B5A73] dark:text-[#C8BDCF] max-w-xl leading-relaxed mb-4">
            {ps.subtitle}
          </p>

          {/* Dual Pill Switcher (Height optimized for English/Hindi/Arabic & Urdu) */}
          <div className="inline-flex p-1 rounded-2xl bg-black/5 dark:bg-white/[0.06] border border-black/10 dark:border-white/10 shadow-inner backdrop-blur-md max-w-full">
            
            {/* Tab 1: Takhassus Fil Ifta */}
            <button
              onClick={() => setActiveTab("muftiya")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                language === "ur" ? "py-1.5 sm:py-2 leading-[1.6]" : "py-1 sm:py-1.5 leading-tight"
              } ${
                isMuftiya
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md scale-[1.02]"
                  : "text-[#5C4A66] dark:text-[#C8BDCF] hover:text-[#1E1128] dark:hover:text-white"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>{ps.muftiya?.title}</span>
            </button>

            {/* Tab 2: Dars-e-Nizami */}
            <button
              onClick={() => setActiveTab("darsNizami")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                language === "ur" ? "py-1.5 sm:py-2 leading-[1.6]" : "py-1 sm:py-1.5 leading-tight"
              } ${
                !isMuftiya
                  ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md scale-[1.02]"
                  : "text-[#5C4A66] dark:text-[#C8BDCF] hover:text-[#1E1128] dark:hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>{ps.darsNizami?.title}</span>
            </button>

          </div>
        </div>

        {/* =========================================================================
            2. SINGLE UNIFIED COMPACT CARD (Clean, Unboxed Typography)
           ========================================================================= */}
        <div
          className={`relative rounded-3xl p-5 sm:p-7 lg:p-8 overflow-hidden transition-all duration-300 border ${
            isMuftiya
              ? "border-amber-500/35 bg-gradient-to-br from-white/95 via-amber-50/25 to-white/90 dark:from-[#181126]/95 dark:via-[#1B122E]/90 dark:to-[#130D20]/95 shadow-[0_8px_30px_rgba(217,119,6,0.1)]"
              : "border-teal-500/35 bg-gradient-to-br from-white/95 via-teal-50/25 to-white/90 dark:from-[#0D181D]/95 dark:via-[#0F1E24]/90 dark:to-[#0B1418]/95 shadow-[0_8px_30px_rgba(13,148,136,0.1)]"
          }`}
        >
          {/* Top Arch Glow Accent */}
          <div
            className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${
              isMuftiya
                ? "from-amber-400 via-amber-500 to-amber-600 shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                : "from-teal-400 via-teal-500 to-teal-600 shadow-[0_0_12px_rgba(20,184,166,0.6)]"
            }`}
          />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Left/Main Content Column */}
            <div className="flex-1 min-w-0 text-start">
              
              {/* Header Badges Strip */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-black border ${
                    isMuftiya
                      ? "bg-amber-500/15 border-amber-500/30 text-amber-900 dark:text-amber-200"
                      : "bg-teal-500/15 border-teal-500/30 text-teal-900 dark:text-teal-200"
                  }`}
                >
                  {isMuftiya ? <Award className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
                  {currentProgram?.tag}
                </span>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold">
                  <Radio className="w-3 h-3 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                  {currentProgram?.modeChip}
                </span>

                <span className="text-xs font-semibold text-[#7E6E85] dark:text-[#A898B0]">
                  • {currentProgram?.badge}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display font-extrabold text-lg sm:text-2xl text-[#1E1128] dark:text-[#FAF6FC] tracking-tight leading-snug mb-2">
                {currentProgram?.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-[14px] text-[#5C4A66] dark:text-[#C8BDCF] leading-relaxed mb-5 max-w-2xl">
                {currentProgram?.desc}
              </p>

              {/* 4 Clean Digital Highlights (Unboxed Clean List) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-1">
                
                {/* Feature 1 */}
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      isMuftiya
                        ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]"
                        : "bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.7)]"
                    }`}
                  />
                  <ScreenShare
                    className={`w-4 h-4 shrink-0 ${
                      isMuftiya ? "text-amber-600 dark:text-amber-400" : "text-teal-600 dark:text-teal-400"
                    }`}
                  />
                  <span className="text-xs sm:text-[13px] font-bold text-[#2D1F33] dark:text-[#FAF6FC] leading-tight">
                    {currentProgram?.f1}
                  </span>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      isMuftiya
                        ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]"
                        : "bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.7)]"
                    }`}
                  />
                  <Globe2
                    className={`w-4 h-4 shrink-0 ${
                      isMuftiya ? "text-purple-600 dark:text-purple-400" : "text-amber-600 dark:text-amber-400"
                    }`}
                  />
                  <span className="text-xs sm:text-[13px] font-bold text-[#2D1F33] dark:text-[#FAF6FC] leading-tight">
                    {currentProgram?.f2}
                  </span>
                </div>

                {/* Feature 3 */}
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      isMuftiya
                        ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]"
                        : "bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.7)]"
                    }`}
                  />
                  <Award
                    className={`w-4 h-4 shrink-0 ${
                      isMuftiya ? "text-emerald-600 dark:text-emerald-400" : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  />
                  <span className="text-xs sm:text-[13px] font-bold text-[#2D1F33] dark:text-[#FAF6FC] leading-tight">
                    {currentProgram?.f3}
                  </span>
                </div>

                {/* Feature 4 */}
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      isMuftiya
                        ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]"
                        : "bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.7)]"
                    }`}
                  />
                  <Video
                    className={`w-4 h-4 shrink-0 ${
                      isMuftiya ? "text-rose-600 dark:text-rose-400" : "text-purple-600 dark:text-purple-400"
                    }`}
                  />
                  <span className="text-xs sm:text-[13px] font-bold text-[#2D1F33] dark:text-[#FAF6FC] leading-tight">
                    {currentProgram?.f4}
                  </span>
                </div>

              </div>

            </div>

            {/* Right Action Column */}
            <div className="flex flex-col items-stretch lg:items-end justify-center shrink-0 lg:w-52 pt-2 lg:pt-0 border-t lg:border-t-0 lg:border-s border-black/10 dark:border-white/10 lg:ps-6">
              <Link
                href="/courses"
                className={`w-full flex items-center justify-center gap-2 h-11 sm:h-12 px-5 rounded-xl text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] group/btn ${
                  isMuftiya
                    ? "bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600"
                    : "bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 hover:from-teal-400 hover:to-teal-600"
                }`}
              >
                <span>{currentProgram?.cta}</span>
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
