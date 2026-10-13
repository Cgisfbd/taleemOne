"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Calendar,
  X,
  Download,
  Sparkles,
  ExternalLink,
  ZoomIn,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/shared/i18n";

interface NoticeItem {
  id: string;
  date: string;
  title: string;
  image: string;
}

export const NoticeBoardSection: React.FC = () => {
  const { t, language, direction } = useLanguage();
  const isRTL = direction === "rtl";
  const nb = (t as any).noticeBoard;

  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);

  // Lock body scroll when lightbox modal is open
  useEffect(() => {
    if (selectedNotice) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedNotice]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedNotice(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!nb || !nb.notices) return null;

  const notices: NoticeItem[] = nb.notices;

  // Pushpin colors for the 4 notices
  const pinHeads = [
    "bg-gradient-to-br from-rose-400 to-rose-700",
    "bg-gradient-to-br from-amber-400 to-amber-700",
    "bg-gradient-to-br from-emerald-400 to-emerald-700",
    "bg-gradient-to-br from-purple-400 to-purple-800",
  ];

  // Natural subtle rotation angles
  const rotations = ["-rotate-1", "rotate-1", "-rotate-0.5", "rotate-0.5"];

  return (
    <section className="relative w-full py-5 sm:py-8 lg:py-9 px-3 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* =========================================================================
            1. SECTION HEADER (Standard Centered Layout)
           ========================================================================= */}
        <div className="flex flex-col items-center text-center mb-5 sm:mb-6">
          
          {/* Glowing Mini Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-900 dark:text-purple-300 text-xs font-black shadow-xs mb-2.5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>{nb.badge}</span>
          </div>

          {/* Main Section Title */}
          <h2 className="font-display font-extrabold text-xl sm:text-2xl lg:text-3xl tracking-tight text-[#1E1128] dark:text-[#FAF6FC] mb-2">
            {nb.title}
          </h2>

          {/* Section Subtitle */}
          <p className="text-xs sm:text-sm text-[#6B5A73] dark:text-[#C8BDCF] max-w-xl leading-relaxed">
            {nb.subtitle}
          </p>
        </div>

        {/* =========================================================================
            2. MAIN CARD CONTAINER (Matching Other Section Cards)
           ========================================================================= */}
        <div className="relative rounded-3xl sm:rounded-[32px] p-4 sm:p-6 lg:p-7 bg-white/75 dark:bg-[#181126]/95 backdrop-blur-xl border border-purple-500/20 dark:border-purple-400/20 shadow-xl overflow-hidden">
          
          {/* Subtle Top Gradient Accent Line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 via-amber-400 to-purple-600 opacity-60" />

          {/* =========================================================================
              3. 4 PINNED NOTICES IN EXACT 2x2 GRID (Mobile & Desktop)
             ========================================================================= */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4.5 relative z-10">
            {notices.map((notice, index) => {
              const pinHead = pinHeads[index % pinHeads.length];
              const rotation = rotations[index % rotations.length];

              return (
                <div
                  key={notice.id}
                  onClick={() => setSelectedNotice(notice)}
                  className={`relative group rounded-xl sm:rounded-2xl p-2 sm:p-3 bg-[#FAF8F5] dark:bg-[#1F172B] text-[#1E1128] dark:text-[#FAF6FC] shadow-[0_6px_16px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_26px_rgba(0,0,0,0.4)] transition-all duration-200 cursor-pointer flex flex-col justify-between ${rotation} hover:rotate-0 hover:scale-[1.015] border border-[#E8DFC8] dark:border-[#38264C]`}
                >
                  {/* Compact 3D Pushpin on Top */}
                  <div className="absolute -top-2 sm:-top-2.5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
                    <div
                      className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full ${pinHead} border border-white/80 dark:border-black/40 shadow-xs flex items-center justify-center`}
                    >
                      <div className="w-1 h-1 rounded-full bg-white/60 blur-[0.5px]" />
                    </div>
                  </div>

                  {/* Notice Image Thumbnail */}
                  <div className="relative w-full aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 mb-1.5 group-hover:opacity-95 transition-opacity">
                    <img
                      src={notice.image}
                      alt={notice.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    
                    {/* Hover Zoom Overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-white/90 text-black flex items-center justify-center shadow-md">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Caption Strip */}
                  <div className="flex flex-col justify-between flex-1">
                    {/* Date */}
                    <div className="flex items-center gap-1 text-[9px] sm:text-[10.5px] font-semibold text-[#7C6340] dark:text-[#B5A4C7] mb-0.5">
                      <Calendar className="w-2.5 h-2.5 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span className="truncate">{notice.date}</span>
                    </div>

                    {/* Notice Title */}
                    <h3 className="font-display font-extrabold text-[11px] sm:text-[13px] text-[#1E1128] dark:text-[#FAF6FC] group-hover:text-amber-700 dark:group-hover:text-amber-300 tracking-tight leading-snug line-clamp-2 mb-1 transition-colors">
                      {notice.title}
                    </h3>

                    {/* Tap to View Hint */}
                    <div className="pt-1 border-t border-dashed border-[#D5C7A3] dark:border-[#4A3266] flex items-center justify-between text-[9px] sm:text-[10px] text-[#6B5A73] dark:text-[#A898B0]">
                      <span className="truncate">{nb.tapToView}</span>
                      <span className="text-amber-700 dark:text-amber-400 font-bold shrink-0">🔍</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* =========================================================================
          4. FULL LIGHTBOX MODAL (Theme-Matched Image Preview Popup with Download)
         ========================================================================= */}
      {selectedNotice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedNotice(null)}
        >
          {/* Modal Content - Theme Matched */}
          <div
            className="relative max-w-2xl w-full max-h-[90vh] rounded-3xl bg-[#FAF8F5] dark:bg-[#181126] border-2 border-purple-500/25 dark:border-purple-400/25 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 text-[#1E1128] dark:text-[#FAF6FC]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Brand Gradient Accent Bar */}
            <div className="h-1.5 bg-gradient-to-r from-purple-600 via-amber-400 to-purple-700" />

            {/* Header Strip */}
            <div className="p-3.5 sm:p-4.5 border-b border-purple-500/10 dark:border-white/10 flex items-center justify-between gap-3 bg-white/70 dark:bg-white/[0.02]">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-[11px] font-bold shrink-0">
                  <Calendar className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  <span>{selectedNotice.date}</span>
                </div>
                <span className="text-[#8B7A94] dark:text-white/30 shrink-0">•</span>
                <h3 className="text-xs sm:text-sm font-extrabold text-[#1E1128] dark:text-[#FAF6FC] truncate">
                  {selectedNotice.title}
                </h3>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedNotice(null)}
                className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 flex items-center justify-center text-[#5C4A66] dark:text-[#C8BDCF] transition-colors shrink-0 cursor-pointer"
                title={nb.closeModal}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image Body (Scrollable / Full view) */}
            <div className="relative flex-1 overflow-y-auto p-3 sm:p-5 flex items-center justify-center bg-[#F3EFEA]/80 dark:bg-black/35">
              <img
                src={selectedNotice.image}
                alt={selectedNotice.title}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-2xl shadow-xl border border-black/10 dark:border-white/10"
              />
            </div>

            {/* Footer Action Strip */}
            <div className="p-3 sm:p-4 border-t border-purple-500/10 dark:border-white/10 flex items-center justify-between bg-white/70 dark:bg-white/[0.02] gap-3">
              <a
                href={selectedNotice.image}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-900 hover:from-purple-800 hover:to-indigo-950 text-white text-xs font-bold shadow-md cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{nb.downloadNotice}</span>
              </a>

              <button
                onClick={() => setSelectedNotice(null)}
                className="px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-[#1E1128] dark:text-[#FAF6FC] text-xs font-bold transition-colors cursor-pointer"
              >
                {nb.closeModal}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
