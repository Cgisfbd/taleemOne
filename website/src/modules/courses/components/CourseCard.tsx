"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Sparkles,
  Radio,
  Award,
  Layers,
  Laptop,
  Clock,
  CheckCircle2,
  ChevronRight,
  FileText,
  ShieldCheck,
  Globe2,
  Building,
} from "lucide-react";
import { CourseProgram } from "../coursesData";
import { useLanguage } from "@/shared/i18n";

interface CourseCardProps {
  course: CourseProgram;
  onOpenDetails: (course: CourseProgram) => void;
}

const ICON_MAP = {
  GraduationCap,
  BookOpen,
  Sparkles,
  Radio,
  Award,
  Layers,
  Laptop,
};

export const CourseCard: React.FC<CourseCardProps> = ({ course, onOpenDetails }) => {
  const { language, direction, t } = useLanguage();
  const isRTL = direction === "rtl";
  const cp = (t as any).coursesPage;
  const labels = cp?.labels;

  const IconComponent = ICON_MAP[course.iconName] || BookOpen;

  // Dynamic theme gradients based on badgeColor
  const themeStyles = {
    amber: {
      border: "border-amber-500/35 hover:border-amber-500/70",
      topGlow: "from-amber-400 via-amber-500 to-amber-600",
      iconBg: "bg-amber-500/15 border-amber-500/30 text-amber-900 dark:text-amber-300",
      badgeBg: "bg-amber-500/15 border-amber-500/30 text-amber-950 dark:text-amber-200",
      btnGrad: "bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600",
      dotColor: "bg-amber-500",
    },
    teal: {
      border: "border-teal-500/35 hover:border-teal-500/70",
      topGlow: "from-teal-400 via-teal-500 to-teal-600",
      iconBg: "bg-teal-500/15 border-teal-500/30 text-teal-900 dark:text-teal-300",
      badgeBg: "bg-teal-500/15 border-teal-500/30 text-teal-950 dark:text-teal-200",
      btnGrad: "bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 hover:from-teal-400 hover:to-teal-600",
      dotColor: "bg-teal-500",
    },
    purple: {
      border: "border-purple-500/35 hover:border-purple-500/70",
      topGlow: "from-purple-400 via-purple-500 to-purple-600",
      iconBg: "bg-purple-500/15 border-purple-500/30 text-purple-900 dark:text-purple-300",
      badgeBg: "bg-purple-500/15 border-purple-500/30 text-purple-950 dark:text-purple-200",
      btnGrad: "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:from-purple-400 hover:to-purple-600",
      dotColor: "bg-purple-500",
    },
    rose: {
      border: "border-rose-500/35 hover:border-rose-500/70",
      topGlow: "from-rose-400 via-rose-500 to-rose-600",
      iconBg: "bg-rose-500/15 border-rose-500/30 text-rose-900 dark:text-rose-300",
      badgeBg: "bg-rose-500/15 border-rose-500/30 text-rose-950 dark:text-rose-200",
      btnGrad: "bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 hover:from-rose-400 hover:to-rose-600",
      dotColor: "bg-rose-500",
    },
    indigo: {
      border: "border-indigo-500/35 hover:border-indigo-500/70",
      topGlow: "from-indigo-400 via-indigo-500 to-indigo-600",
      iconBg: "bg-indigo-500/15 border-indigo-500/30 text-indigo-900 dark:text-indigo-300",
      badgeBg: "bg-indigo-500/15 border-indigo-500/30 text-indigo-950 dark:text-indigo-200",
      btnGrad: "bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:from-indigo-400 hover:to-indigo-600",
      dotColor: "bg-indigo-500",
    },
    emerald: {
      border: "border-emerald-500/35 hover:border-emerald-500/70",
      topGlow: "from-emerald-400 via-emerald-500 to-emerald-600",
      iconBg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-900 dark:text-emerald-300",
      badgeBg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-950 dark:text-emerald-200",
      btnGrad: "bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600",
      dotColor: "bg-emerald-500",
    },
  }[course.badgeColor];

  const modeBadge = {
    hybrid: {
      label: language === "ur" ? "آن لائن + کیمپس" : language === "ar" ? "بث مباشر + حضوري" : language === "hi" ? "ऑनलाइन + ऑफ़लाइन" : "Online + Offline",
      icon: Globe2,
      color: "bg-teal-500/15 border-teal-500/30 text-teal-800 dark:text-teal-300",
    },
    campus: {
      label: language === "ur" ? "کیمپس فل ٹائم" : language === "ar" ? "حضوري بالحرم" : language === "hi" ? "कैम्पस फ़ुल-टाइम" : "On-Campus",
      icon: Building,
      color: "bg-purple-500/15 border-purple-500/30 text-purple-800 dark:text-purple-300",
    },
    modular: {
      label: language === "ur" ? "فلیکسیبل ماڈیولر" : language === "ar" ? "مرن (عن بعد)" : language === "hi" ? "फ़्लेक्सिबल मॉड्यूलर" : "Flexible Modular",
      icon: Radio,
      color: "bg-rose-500/15 border-rose-500/30 text-rose-800 dark:text-rose-300",
    },
  }[course.deliveryMode];

  const ModeIcon = modeBadge.icon;
  const subjectsList = course.keySubjects[language] || course.keySubjects.ur;

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-3xl p-5 sm:p-6 lg:p-7 overflow-hidden transition-all duration-300 bg-white/90 dark:bg-[#160E1F]/90 backdrop-blur-xl border ${themeStyles.border} shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1`}
    >
      {/* Top Arch Glow */}
      <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${themeStyles.topGlow}`} />

      {/* Top Header Row */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3.5">
          {/* Level Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${themeStyles.badgeBg}`}
            >
              <IconComponent className="w-3.5 h-3.5" />
              <span>{course.level[language] || course.level.ur}</span>
            </span>

            {/* Mode Chip */}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${modeBadge.color}`}
            >
              <ModeIcon className="w-3 h-3 animate-pulse" />
              <span>{modeBadge.label}</span>
            </span>
          </div>

          {/* Scholarship Tag */}
          {course.scholarshipEligible && (
            <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-[11px] font-bold">
              <ShieldCheck className="w-3 h-3 text-amber-500" />
              <span className="hidden sm:inline">{labels?.scholarshipEligible || "100% Scholarship"}</span>
              <span className="sm:hidden">100% Free</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#1E1128] dark:text-[#FAF6FC] tracking-tight mb-2 leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
          {course.title[language] || course.title.ur}
        </h3>

        {/* Tagline / Subtitle */}
        <p className="text-xs sm:text-[13px] font-semibold text-[#825B96] dark:text-[#B692CC] mb-3 leading-relaxed">
          {course.tagline[language] || course.tagline.ur}
        </p>

        {/* Description */}
        <p className="text-xs sm:text-[13px] text-[#5C4A66] dark:text-[#C8BDCF] leading-relaxed mb-4 line-clamp-3">
          {course.description[language] || course.description.ur}
        </p>

        {/* Quick Meta Strip */}
        <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 mb-4 text-xs">
          <div>
            <span className="text-[#8E7E96] dark:text-[#9A8AA6] block text-[11px] font-medium">
              {labels?.duration || "Duration"}:
            </span>
            <span className="font-bold text-[#1E1128] dark:text-[#FAF6FC]">
              {course.duration[language] || course.duration.ur}
            </span>
          </div>
          <div>
            <span className="text-[#8E7E96] dark:text-[#9A8AA6] block text-[11px] font-medium">
              {labels?.eligibility || "Eligibility"}:
            </span>
            <span className="font-bold text-[#1E1128] dark:text-[#FAF6FC] line-clamp-1">
              {course.eligibility[language] || course.eligibility.ur}
            </span>
          </div>
        </div>

        {/* Key Subjects Teaser */}
        <div className="mb-5">
          <span className="text-[11px] font-bold text-[#8E7E96] dark:text-[#9A8AA6] uppercase tracking-wider block mb-2">
            {labels?.keySubjects || "Core Subjects"}:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {subjectsList.slice(0, 3).map((subj, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.05] text-[#3D2C47] dark:text-[#DDD3E3] text-xs font-semibold"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                <span className="truncate max-w-[200px]">{subj}</span>
              </span>
            ))}
            {subjectsList.length > 3 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] text-[#8E7E96] text-xs font-semibold">
                +{subjectsList.length - 3} {labels?.more || "more"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Action Strip */}
      <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center gap-2.5">
        {/* View Syllabus Modal Button */}
        <button
          type="button"
          onClick={() => onOpenDetails(course)}
          className="w-full sm:flex-1 h-10 sm:h-11 px-4 rounded-xl font-bold text-xs sm:text-[13px] inline-flex items-center justify-center gap-2 bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.14] text-[#1E1128] dark:text-[#FAF6FC] border border-black/10 dark:border-white/10 transition-all active:scale-[0.98] cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{labels?.viewSyllabus || "View Syllabus & Books"}</span>
        </button>

        {/* Apply Now Button */}
        <Link
          href={`/students/apply?course=${course.id}`}
          className={`w-full sm:w-auto h-10 sm:h-11 px-5 rounded-xl text-white font-bold text-xs sm:text-[13px] shadow-sm hover:shadow-md inline-flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] ${themeStyles.btnGrad}`}
        >
          <span>{labels?.applyNow || "Apply Online"}</span>
          <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} />
        </Link>
      </div>
    </div>
  );
};
