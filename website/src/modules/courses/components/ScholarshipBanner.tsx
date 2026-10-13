"use client";

import React from "react";
import Link from "next/link";
import { Award, ShieldCheck, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/shared/i18n";

export const ScholarshipBanner: React.FC = () => {
  const { direction, t } = useLanguage();
  const isRTL = direction === "rtl";
  const cp = (t as any).coursesPage;
  const banner = cp?.scholarshipBanner;

  if (!banner) return null;

  return (
    <section className="relative w-full py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-6 sm:p-8 lg:p-10 overflow-hidden bg-gradient-to-br from-amber-500/15 via-purple-500/10 to-teal-500/15 dark:from-amber-500/10 dark:via-[#191124] dark:to-teal-500/10 backdrop-blur-2xl border border-amber-500/30 shadow-[0_12px_40px_rgba(245,158,11,0.08)]">
          {/* Top Arch Glow */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-purple-500 to-teal-400" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-start">
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/35 text-amber-950 dark:text-amber-200 text-xs font-black shadow-xs mb-3">
                <Award className="w-4 h-4 text-amber-500" />
                <span>{banner.badge}</span>
              </div>

              <h2 className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-[#1E1128] dark:text-[#FAF6FC] tracking-tight mb-2.5">
                {banner.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#5C4A66] dark:text-[#C8BDCF] leading-relaxed mb-6 max-w-2xl">
                {banner.subtitle}
              </p>

              {/* 3 Highlight Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-white/[0.05] border border-black/5 dark:border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-xs font-bold text-[#1E1128] dark:text-[#FAF6FC]">
                    {banner.highlight1}
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-white/[0.05] border border-black/5 dark:border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-xs font-bold text-[#1E1128] dark:text-[#FAF6FC]">
                    {banner.highlight2}
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-white/[0.05] border border-black/5 dark:border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                  <span className="text-xs font-bold text-[#1E1128] dark:text-[#FAF6FC]">
                    {banner.highlight3}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
              <Link
                href="/students/apply"
                className="h-12 px-6 rounded-2xl text-white font-extrabold text-xs sm:text-sm bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 shadow-md inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <span>{banner.ctaApply}</span>
                <ChevronRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
              <Link
                href="/students/entrance-result"
                className="h-12 px-6 rounded-2xl font-extrabold text-xs sm:text-sm bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/15 text-[#1E1128] dark:text-[#FAF6FC] border border-black/10 dark:border-white/10 inline-flex items-center justify-center gap-2 transition-all"
              >
                <span>{banner.ctaResult}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
