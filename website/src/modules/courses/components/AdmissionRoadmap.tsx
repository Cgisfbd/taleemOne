"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, FileText, Download, Award, GraduationCap, ChevronRight } from "lucide-react";
import { useLanguage } from "@/shared/i18n";

export const AdmissionRoadmap: React.FC = () => {
  const { direction, t } = useLanguage();
  const isRTL = direction === "rtl";
  const cp = (t as any).coursesPage;
  const roadmap = cp?.admissionRoadmap;

  if (!roadmap) return null;

  const stepIcons = [FileText, Download, Award, GraduationCap];

  return (
    <section className="relative w-full py-8 sm:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-900 dark:text-purple-300 text-xs font-black shadow-xs mb-2.5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>{roadmap.badge}</span>
          </div>

          <h2 className="font-display font-black text-xl sm:text-2xl lg:text-3xl tracking-tight text-[#1E1128] dark:text-[#FAF6FC] mb-2">
            {roadmap.title}
          </h2>

          <p className="text-xs sm:text-sm text-[#6B5A73] dark:text-[#C8BDCF] max-w-2xl leading-relaxed">
            {roadmap.subtitle}
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {roadmap.steps.map((item: any, idx: number) => {
            const Icon = stepIcons[idx] || GraduationCap;
            return (
              <div
                key={idx}
                className="relative flex flex-col p-6 rounded-3xl bg-white/80 dark:bg-[#160E1F]/80 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 group text-start"
              >
                {/* Step Number Pill */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-amber-500/20 border border-purple-500/30 text-purple-950 dark:text-purple-300 font-black text-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-display font-black text-2xl text-black/15 dark:text-white/15">
                    {item.step}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-base text-[#1E1128] dark:text-[#FAF6FC] mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-[#5C4A66] dark:text-[#C8BDCF] leading-relaxed flex-1">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
