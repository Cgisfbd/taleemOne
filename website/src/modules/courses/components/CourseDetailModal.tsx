"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  X,
  BookOpen,
  GraduationCap,
  Sparkles,
  Award,
  Layers,
  Clock,
  CheckCircle2,
  Calendar,
  ChevronRight,
  Printer,
  Download,
  Share2,
  ShieldCheck,
  Check,
  Building,
  Globe2,
  Radio,
} from "lucide-react";
import { CourseProgram } from "../coursesData";
import { useLanguage } from "@/shared/i18n";

interface CourseDetailModalProps {
  course: CourseProgram | null;
  onClose: () => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({ course, onClose }) => {
  const { language, direction, t } = useLanguage();
  const isRTL = direction === "rtl";
  const cp = (t as any).coursesPage;
  const labels = cp?.labels;

  const [activeYearIdx, setActiveYearIdx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // Reset active year when course changes
  useEffect(() => {
    setActiveYearIdx(0);
  }, [course]);

  // Handle ESC key close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!course) return null;

  const activeSyllabusYear = course.syllabus[activeYearIdx] || course.syllabus[0];
  const outcomes = course.learningOutcomes[language] || course.learningOutcomes.ur;
  const careers = course.careerPaths[language] || course.careerPaths.ur;

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/courses#${course.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto backdrop-blur-md bg-black/60 transition-all animate-fadeIn">
      {/* Modal Card Backdrop Dismiss Area */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl overflow-hidden bg-white/95 dark:bg-[#150D20]/95 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.35)]"
      >
        {/* Top Gradient Arch Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-teal-500 to-purple-600" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 lg:p-7 border-b border-black/10 dark:border-white/10 flex items-start justify-between gap-4">
          <div className="flex-1 text-start">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs font-bold">
                {course.level[language] || course.level.ur}
              </span>
              {course.scholarshipEligible && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-900 dark:text-emerald-300 text-xs font-bold inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{labels?.scholarshipEligible || "100% Scholarship"}</span>
                </span>
              )}
            </div>

            <h2 className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-[#1E1128] dark:text-[#FAF6FC] tracking-tight mb-1">
              {course.title[language] || course.title.ur}
            </h2>

            <p className="text-xs sm:text-sm font-semibold text-[#825B96] dark:text-[#B692CC]">
              {course.tagline[language] || course.tagline.ur}
            </p>
          </div>

          {/* Close & Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              title={labels?.shareCourse || "Share"}
              className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[#5C4A66] dark:text-[#C8BDCF] transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handlePrint}
              title="Print Syllabus"
              className="hidden sm:inline-flex p-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[#5C4A66] dark:text-[#C8BDCF] transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-rose-500 hover:text-white text-[#5C4A66] dark:text-[#C8BDCF] transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 lg:p-7 space-y-6 text-start">
          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 text-xs">
            <div>
              <span className="text-[#8E7E96] dark:text-[#9A8AA6] block font-medium">
                {labels?.duration || "Duration"}:
              </span>
              <span className="font-bold text-[#1E1128] dark:text-[#FAF6FC] text-sm">
                {course.duration[language] || course.duration.ur}
              </span>
            </div>
            <div>
              <span className="text-[#8E7E96] dark:text-[#9A8AA6] block font-medium">
                {labels?.mode || "Mode"}:
              </span>
              <span className="font-bold text-[#1E1128] dark:text-[#FAF6FC] text-sm">
                {course.deliveryMode === "hybrid"
                  ? "Live Online + Campus"
                  : course.deliveryMode === "campus"
                  ? "Campus Full-Time"
                  : "Modular Batches"}
              </span>
            </div>
            <div>
              <span className="text-[#8E7E96] dark:text-[#9A8AA6] block font-medium">
                {labels?.language || "Medium"}:
              </span>
              <span className="font-bold text-[#1E1128] dark:text-[#FAF6FC] text-sm">
                {course.medium[language] || course.medium.ur}
              </span>
            </div>
            <div>
              <span className="text-[#8E7E96] dark:text-[#9A8AA6] block font-medium">
                {labels?.credits || "Seats / Capacity"}:
              </span>
              <span className="font-bold text-[#1E1128] dark:text-[#FAF6FC] text-sm">
                {course.seatsAvailable}
              </span>
            </div>
          </div>

          {/* Course Overview */}
          <div>
            <h3 className="font-display font-bold text-base sm:text-lg text-[#1E1128] dark:text-[#FAF6FC] mb-2">
              {labels?.syllabusOverview || "Curriculum Overview"}
            </h3>
            <p className="text-xs sm:text-sm text-[#5C4A66] dark:text-[#C8BDCF] leading-relaxed">
              {course.description[language] || course.description.ur}
            </p>
          </div>

          {/* Year / Module Tabbed Syllabus */}
          {course.syllabus && course.syllabus.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/5 dark:bg-amber-500/[0.03] border border-amber-500/20">
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <h3 className="font-display font-bold text-base sm:text-lg text-[#1E1128] dark:text-[#FAF6FC] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-500" />
                  <span>{labels?.semesterBreakdown || "Year / Semester Syllabus"}</span>
                </h3>
              </div>

              {/* Year Selector Tabs */}
              {course.syllabus.length > 1 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.syllabus.map((syl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveYearIdx(idx)}
                      className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeYearIdx === idx
                          ? "bg-amber-500 text-white shadow-sm"
                          : "bg-black/5 dark:bg-white/5 text-[#5C4A66] dark:text-[#C8BDCF] hover:bg-black/10 dark:hover:bg-white/10"
                      }`}
                    >
                      {syl.yearLabel[language] || syl.yearLabel.ur}
                    </button>
                  ))}
                </div>
              )}

              {/* Active Year Focus */}
              {activeSyllabusYear && (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-white/80 dark:bg-[#1A1224]/80 border border-amber-500/20 text-xs">
                    <span className="font-extrabold text-amber-800 dark:text-amber-300 block mb-0.5">
                      {activeSyllabusYear.yearLabel[language] || activeSyllabusYear.yearLabel.ur}:
                    </span>
                    <p className="text-[#5C4A66] dark:text-[#C8BDCF] font-medium">
                      {activeSyllabusYear.focusTitle[language] || activeSyllabusYear.focusTitle.ur}
                    </p>
                  </div>

                  {/* Books Grid */}
                  <div>
                    <span className="text-[11px] font-bold text-[#8E7E96] dark:text-[#9A8AA6] uppercase tracking-wider block mb-2">
                      {labels?.coreBooks || "Prescribed Classical Texts"}:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeSyllabusYear.books.map((book, bIdx) => (
                        <div
                          key={bIdx}
                          className="p-3 rounded-xl bg-white dark:bg-[#1A1224] border border-black/5 dark:border-white/10 shadow-xs"
                        >
                          <div className="font-bold text-[#1E1128] dark:text-[#FAF6FC] text-xs mb-1">
                            📖 {book.title}
                          </div>
                          <div className="text-[11px] text-[#7E6E85] dark:text-[#A898B0]">
                            {book.subject[language] || book.subject.ur}
                            {book.author && ` • ${book.author}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Practical Training note if present */}
                  {activeSyllabusYear.practicalTraining && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-300 font-semibold flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{activeSyllabusYear.practicalTraining[language] || activeSyllabusYear.practicalTraining.ur}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Learning Outcomes & Career Paths in 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Outcomes */}
            <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
              <h4 className="font-display font-bold text-sm text-[#1E1128] dark:text-[#FAF6FC] mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{labels?.learningOutcomes || "Learning Outcomes"}</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#5C4A66] dark:text-[#C8BDCF]">
                {outcomes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Career Opportunities */}
            <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
              <h4 className="font-display font-bold text-sm text-[#1E1128] dark:text-[#FAF6FC] mb-3 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-purple-500" />
                <span>{labels?.careerPaths || "Future Scholarly Roles"}</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#5C4A66] dark:text-[#C8BDCF]">
                {careers.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="p-4 sm:p-5 border-t border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#7E6E85] dark:text-[#A898B0] text-center sm:text-start">
            {course.accreditation[language] || course.accreditation.ur}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl font-bold text-xs bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[#5C4A66] dark:text-[#C8BDCF] transition-colors cursor-pointer"
            >
              {labels?.closeModal || "Close"}
            </button>

            <Link
              href={`/students/apply?course=${course.id}`}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-white font-bold text-xs bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 shadow-md inline-flex items-center justify-center gap-1.5 transition-all"
            >
              <span>{labels?.applyNow || "Apply for this Program"}</span>
              <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
