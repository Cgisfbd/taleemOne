"use client";

import React from "react";
import Link from "next/link";
import { Check, X, ShieldCheck, Sparkles, BookOpen, ChevronRight } from "lucide-react";
import { COURSES_DATA } from "../coursesData";
import { useLanguage } from "@/shared/i18n";

export const CurriculumComparison: React.FC = () => {
  const { language, direction, t } = useLanguage();
  const isRTL = direction === "rtl";
  const cp = (t as any).coursesPage;
  const comp = cp?.comparison;

  if (!comp) return null;

  return (
    <section className="relative w-full py-8 sm:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-900 dark:text-teal-300 text-xs font-black shadow-xs mb-2.5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-teal-500" />
            <span>{comp.badge}</span>
          </div>

          <h2 className="font-display font-black text-xl sm:text-2xl lg:text-3xl tracking-tight text-[#1E1128] dark:text-[#FAF6FC] mb-2">
            {comp.title}
          </h2>

          <p className="text-xs sm:text-sm text-[#6B5A73] dark:text-[#C8BDCF] max-w-2xl leading-relaxed">
            {comp.subtitle}
          </p>
        </div>

        {/* Comparison Table Container (Horizontal scroll on mobile) */}
        <div className="rounded-3xl overflow-hidden bg-white/90 dark:bg-[#160E1F]/90 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
                  <th className="p-4 sm:p-5 text-start font-bold text-xs sm:text-sm text-[#1E1128] dark:text-[#FAF6FC] min-w-[200px]">
                    {comp.headers?.program || "Program"}
                  </th>
                  <th className="p-4 sm:p-5 text-start font-bold text-xs sm:text-sm text-[#1E1128] dark:text-[#FAF6FC] min-w-[140px]">
                    {comp.headers?.level || "Level"}
                  </th>
                  <th className="p-4 sm:p-5 text-start font-bold text-xs sm:text-sm text-[#1E1128] dark:text-[#FAF6FC] min-w-[120px]">
                    {comp.headers?.duration || "Duration"}
                  </th>
                  <th className="p-4 sm:p-5 text-start font-bold text-xs sm:text-sm text-[#1E1128] dark:text-[#FAF6FC] min-w-[150px]">
                    {comp.headers?.mode || "Delivery Mode"}
                  </th>
                  <th className="p-4 sm:p-5 text-center font-bold text-xs sm:text-sm text-[#1E1128] dark:text-[#FAF6FC] min-w-[120px]">
                    {comp.headers?.smartClasses || "Smart Panels"}
                  </th>
                  <th className="p-4 sm:p-5 text-center font-bold text-xs sm:text-sm text-[#1E1128] dark:text-[#FAF6FC] min-w-[130px]">
                    {comp.headers?.scholarship || "100% Scholarship"}
                  </th>
                  <th className="p-4 sm:p-5 text-end font-bold text-xs sm:text-sm text-[#1E1128] dark:text-[#FAF6FC] min-w-[120px]">
                    {cp?.labels?.applyNow || "Action"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5 text-xs sm:text-[13px]">
                {COURSES_DATA.map((course, idx) => (
                  <tr
                    key={course.id}
                    className={`hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors ${
                      idx % 2 === 1 ? "bg-black/[0.01] dark:bg-white/[0.01]" : ""
                    }`}
                  >
                    <td className="p-4 sm:p-5 font-bold text-[#1E1128] dark:text-[#FAF6FC]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                        <span>{course.title[language] || course.title.ur}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-[#5C4A66] dark:text-[#C8BDCF]">
                      {course.level[language] || course.level.ur}
                    </td>
                    <td className="p-4 sm:p-5 font-semibold text-[#1E1128] dark:text-[#FAF6FC]">
                      {course.duration[language] || course.duration.ur}
                    </td>
                    <td className="p-4 sm:p-5 text-[#5C4A66] dark:text-[#C8BDCF]">
                      {course.deliveryMode === "hybrid"
                        ? "Live Online + Campus"
                        : course.deliveryMode === "campus"
                        ? "Campus Full-Time"
                        : "Modular Batches"}
                    </td>
                    <td className="p-4 sm:p-5 text-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    </td>
                    <td className="p-4 sm:p-5 text-center">
                      {course.scholarshipEligible ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-900 dark:text-amber-300 font-bold text-xs">
                          <ShieldCheck className="w-3 h-3 text-amber-500" />
                          <span>Yes</span>
                        </span>
                      ) : (
                        <span className="text-[#A394AB]">Self-Paced</span>
                      )}
                    </td>
                    <td className="p-4 sm:p-5 text-end">
                      <Link
                        href={`/students/apply?course=${course.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 transition-all shadow-xs"
                      >
                        <span>{cp?.labels?.applyNow || "Apply"}</span>
                        <ChevronRight className={`w-3 h-3 ${isRTL ? "rotate-180" : ""}`} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
