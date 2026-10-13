"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  GraduationCap,
  Building2,
  Users,
  CheckCircle2,
  HeartHandshake,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Globe2,
} from "lucide-react";
import { useLanguage } from "@/shared/i18n";

export const TeacherPlacementSection: React.FC = () => {
  const { t, language, direction } = useLanguage();
  const isRTL = direction === "rtl";
  const tp = (t as any).teacherPlacement;

  const [activeTab, setActiveTab] = useState<"teacher" | "madarsa">("teacher");
  const isTeacher = activeTab === "teacher";

  if (!tp) return null;

  return (
    <section className="relative w-full py-6 sm:py-9 lg:py-11 px-3.5 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-amber-400/10 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* =========================================================================
            1. SECTION HEADER
           ========================================================================= */}
        <div className="flex flex-col items-center text-center mb-5 sm:mb-6">
          
          {/* Glowing Mini Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs font-black shadow-xs mb-2.5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{tp.badge}</span>
          </div>

          {/* Main Section Title */}
          <h2 className="font-display font-extrabold text-xl sm:text-2xl lg:text-3xl tracking-tight text-[#1E1128] dark:text-[#FAF6FC] mb-2">
            {tp.title}
          </h2>

          {/* Section Subtitle */}
          <p className="text-xs sm:text-sm text-[#6B5A73] dark:text-[#C8BDCF] max-w-xl leading-relaxed mb-4">
            {tp.subtitle}
          </p>

          {/* Dual Pill Switcher (Merged Tabs like Section 6) */}
          <div className="inline-flex p-1 rounded-2xl bg-black/5 dark:bg-white/[0.06] border border-black/10 dark:border-white/10 shadow-inner backdrop-blur-md max-w-full">
            
            {/* Tab 1: For Teachers */}
            <button
              onClick={() => setActiveTab("teacher")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                language === "ur" ? "py-1.5 sm:py-2 leading-[1.6]" : "py-1 sm:py-1.5 leading-tight"
              } ${
                isTeacher
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md scale-[1.02]"
                  : "text-[#5C4A66] dark:text-[#C8BDCF] hover:text-[#1E1128] dark:hover:text-white"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>{tp.teacherCard?.tag}</span>
            </button>

            {/* Tab 2: For Madaris */}
            <button
              onClick={() => setActiveTab("madarsa")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                language === "ur" ? "py-1.5 sm:py-2 leading-[1.6]" : "py-1 sm:py-1.5 leading-tight"
              } ${
                !isTeacher
                  ? "bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md scale-[1.02]"
                  : "text-[#5C4A66] dark:text-[#C8BDCF] hover:text-[#1E1128] dark:hover:text-white"
              }`}
            >
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>{tp.madarsaCard?.tag}</span>
            </button>

          </div>
        </div>

        {/* =========================================================================
            2. TOP COMPACT LIVE STAT BADGES (3 Side-by-Side Mini Counters)
           ========================================================================= */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3.5 max-w-2xl mx-auto mb-6 sm:mb-7">
          
          {/* Stat 1: Registered Teachers */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-2.5 p-2 sm:p-2.5 rounded-2xl bg-white/70 dark:bg-white/[0.04] border border-amber-500/25 dark:border-amber-400/20 backdrop-blur-xs shadow-2xs text-center sm:text-start transition-transform hover:scale-[1.02]">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-display font-black text-xs sm:text-base text-[#1E1128] dark:text-[#FAF6FC] leading-none mb-0.5">
                {tp.stat1Value}
              </span>
              <span className="text-[10px] sm:text-[11.5px] font-bold text-[#5C4A66] dark:text-[#C8BDCF] truncate leading-tight">
                {tp.stat1Label}
              </span>
            </div>
          </div>

          {/* Stat 2: Connected Madaris */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-2.5 p-2 sm:p-2.5 rounded-2xl bg-white/70 dark:bg-white/[0.04] border border-amber-500/25 dark:border-amber-400/20 backdrop-blur-xs shadow-2xs text-center sm:text-start transition-transform hover:scale-[1.02]">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-display font-black text-xs sm:text-base text-[#1E1128] dark:text-[#FAF6FC] leading-none mb-0.5">
                {tp.stat2Value}
              </span>
              <span className="text-[10px] sm:text-[11.5px] font-bold text-[#5C4A66] dark:text-[#C8BDCF] truncate leading-tight">
                {tp.stat2Label}
              </span>
            </div>
          </div>

          {/* Stat 3: Free Placements Done */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-2.5 p-2 sm:p-2.5 rounded-2xl bg-white/70 dark:bg-white/[0.04] border border-emerald-500/30 dark:border-emerald-400/25 backdrop-blur-xs shadow-2xs text-center sm:text-start transition-transform hover:scale-[1.02]">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-display font-black text-xs sm:text-base text-emerald-800 dark:text-emerald-300 leading-none mb-0.5">
                {tp.stat3Value}
              </span>
              <span className="text-[10px] sm:text-[11.5px] font-bold text-[#5C4A66] dark:text-[#C8BDCF] truncate leading-tight">
                {tp.stat3Label}
              </span>
            </div>
          </div>

        </div>

        {/* =========================================================================
            3. SINGLE UNIFIED MERGED CARD (Dynamic Tab-Switched Architecture)
           ========================================================================= */}
        <div
          className={`relative rounded-3xl p-5 sm:p-7 lg:p-8 overflow-hidden transition-all duration-300 border ${
            isTeacher
              ? "border-amber-500/35 bg-gradient-to-br from-white/95 via-amber-50/25 to-white/90 dark:from-[#181126]/95 dark:via-[#1B122E]/90 dark:to-[#130D20]/95 shadow-[0_8px_30px_rgba(217,119,6,0.1)]"
              : "border-emerald-500/35 bg-gradient-to-br from-white/95 via-emerald-50/25 to-white/90 dark:from-[#131E1E]/95 dark:via-[#152322]/90 dark:to-[#0F1A19]/95 shadow-[0_8px_30px_rgba(16,185,129,0.1)]"
          }`}
        >
          {/* Top Arch Glow Accent */}
          <div
            className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${
              isTeacher
                ? "from-amber-400 via-amber-500 to-amber-600 shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                : "from-emerald-400 via-emerald-500 to-teal-600 shadow-[0_0_12px_rgba(16,185,129,0.6)]"
            }`}
          />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Left/Main Content Area */}
            <div className="flex-1 min-w-0 text-start">
              
              {/* Header Badges Strip */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-black border ${
                    isTeacher
                      ? "bg-amber-500/15 border-amber-500/30 text-amber-900 dark:text-amber-200"
                      : "bg-emerald-500/15 border-emerald-500/30 text-emerald-900 dark:text-emerald-200"
                  }`}
                >
                  {isTeacher ? (
                    <GraduationCap className="w-3.5 h-3.5" />
                  ) : (
                    <Building2 className="w-3.5 h-3.5" />
                  )}
                  {isTeacher ? tp.teacherCard?.tag : tp.madarsaCard?.tag}
                </span>

                <span className="text-xs font-semibold text-[#7E6E85] dark:text-[#A898B0]">
                  • {isTeacher ? tp.teacherCard?.badge : tp.madarsaCard?.badge}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display font-extrabold text-lg sm:text-2xl text-[#1E1128] dark:text-[#FAF6FC] tracking-tight leading-snug mb-2">
                {isTeacher ? tp.teacherCard?.title : tp.madarsaCard?.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-[14px] text-[#5C4A66] dark:text-[#C8BDCF] leading-relaxed mb-4 max-w-2xl">
                {isTeacher ? tp.teacherCard?.desc : tp.madarsaCard?.desc}
              </p>

              {/* 2 Clean Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 pt-1">
                
                <div className="flex items-center gap-2 text-xs sm:text-[13px] font-bold text-[#1E1128] dark:text-[#FAF6FC]">
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      isTeacher
                        ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]"
                        : "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]"
                    }`}
                  />
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 ${
                      isTeacher ? "text-amber-500" : "text-emerald-500"
                    }`}
                  />
                  <span className="leading-tight">
                    {isTeacher ? tp.teacherCard?.f1 : tp.madarsaCard?.f1}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-[13px] font-bold text-[#1E1128] dark:text-[#FAF6FC]">
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      isTeacher
                        ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]"
                        : "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]"
                    }`}
                  />
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 ${
                      isTeacher ? "text-amber-500" : "text-emerald-500"
                    }`}
                  />
                  <span className="leading-tight">
                    {isTeacher ? tp.teacherCard?.f2 : tp.madarsaCard?.f2}
                  </span>
                </div>

              </div>

            </div>

            {/* Right Action CTA Button (Single Solid Focus per Tab) */}
            <div className="shrink-0 flex flex-col items-stretch sm:items-start lg:items-end justify-center pt-2 lg:pt-0">
              {isTeacher ? (
                <Link
                  href="/teacher-register"
                  className="relative group overflow-hidden bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-[0_4px_18px_rgba(217,119,6,0.35)] flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <GraduationCap className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                  <span>{tp.teacherCard?.cta}</span>
                  {isRTL ? (
                    <ArrowLeft className="w-4 h-4 opacity-80 group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="w-4 h-4 opacity-80 group-hover:translate-x-1 transition-transform" />
                  )}
                </Link>
              ) : (
                <Link
                  href="/madarsa-request"
                  className="relative group overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-[0_4px_18px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <Building2 className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                  <span>{tp.madarsaCard?.cta}</span>
                  {isRTL ? (
                    <ArrowLeft className="w-4 h-4 opacity-80 group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="w-4 h-4 opacity-80 group-hover:translate-x-1 transition-transform" />
                  )}
                </Link>
              )}
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
