"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Search,
  X,
  Filter,
  Sparkles,
  GraduationCap,
  BookOpen,
  Award,
  Radio,
  Layers,
  ShieldCheck,
  Globe2,
  Building,
  RotateCcw,
} from "lucide-react";
import { COURSES_DATA, CourseProgram } from "./coursesData";
import { CourseCard } from "./components/CourseCard";
import { CourseDetailModal } from "./components/CourseDetailModal";
import { CurriculumComparison } from "./components/CurriculumComparison";
import { ScholarshipBanner } from "./components/ScholarshipBanner";
import { AdmissionRoadmap } from "./components/AdmissionRoadmap";
import { CourseFaqSection } from "./components/CourseFaqSection";
import { useLanguage } from "@/shared/i18n";

export const CoursesView: React.FC = () => {
  const { language, direction, t } = useLanguage();
  const isRTL = direction === "rtl";
  const cp = (t as any).coursesPage;
  const filters = cp?.filters;
  const modes = cp?.modes;
  const labels = cp?.labels;

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<
    "all" | "ifta" | "alimah" | "hifz" | "short" | "scholarship"
  >("all");
  const [activeMode, setActiveMode] = useState<"all" | "hybrid" | "campus" | "modular">("all");

  // Selected Course for Full Syllabus Modal
  const [selectedCourse, setSelectedCourse] = useState<CourseProgram | null>(null);

  // Filter logic
  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      // 1. Category Filter
      if (activeCategory === "scholarship") {
        if (!course.scholarshipEligible) return false;
      } else if (activeCategory !== "all" && course.category !== activeCategory) {
        return false;
      }

      // 2. Delivery Mode Filter
      if (activeMode !== "all" && course.deliveryMode !== activeMode) {
        return false;
      }

      // 3. Search Query Filter (Matches across title, tagline, description, keySubjects)
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = (course.title[language] || course.title.ur).toLowerCase().includes(q);
        const taglineMatch = (course.tagline[language] || course.tagline.ur).toLowerCase().includes(q);
        const descMatch = (course.description[language] || course.description.ur).toLowerCase().includes(q);
        const subjects = course.keySubjects[language] || course.keySubjects.ur;
        const subjectMatch = subjects.some((s) => s.toLowerCase().includes(q));

        // Also search in syllabus books
        const bookMatch = course.syllabus.some((syl) =>
          syl.books.some((b) => b.title.toLowerCase().includes(q) || (b.author && b.author.toLowerCase().includes(q)))
        );

        if (!titleMatch && !taglineMatch && !descMatch && !subjectMatch && !bookMatch) {
          return false;
        }
      }

      return true;
    });
  }, [activeCategory, activeMode, searchQuery, language]);

  const handleResetFilters = useCallback(() => {
    setSearchQuery("");
    setActiveCategory("all");
    setActiveMode("all");
  }, []);

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* =========================================================================
          1. HERO HEADER SHOWCASE
         ========================================================================= */}
      <section className="relative w-full pt-10 pb-8 sm:pt-14 sm:pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-400/10 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs font-black shadow-xs mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
            <span>{cp?.badge || "Academic Programs & Curriculum"}</span>
          </div>

          {/* Main Display Title */}
          <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[#1E1128] dark:text-[#FAF6FC] mb-3 leading-tight">
            {cp?.title || "Educational Programs & Full Syllabus"}
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-base text-[#6B5A73] dark:text-[#C8BDCF] max-w-2xl mx-auto leading-relaxed mb-6">
            {cp?.subtitle ||
              "Discover comprehensive classical Islamic scholarship, Takhassus Fil Ifta (Muftiya), Dars-e-Nizami, and smart digital classrooms designed for female scholars worldwide."}
          </p>

          {/* 4 Quick Stat Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/80 dark:bg-white/[0.06] border border-black/10 dark:border-white/10 backdrop-blur-md text-[#1E1128] dark:text-[#FAF6FC] font-bold">
              <GraduationCap className="w-4 h-4 text-amber-500" />
              <span>6+ Accredited Programs</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/80 dark:bg-white/[0.06] border border-black/10 dark:border-white/10 backdrop-blur-md text-[#1E1128] dark:text-[#FAF6FC] font-bold">
              <Layers className="w-4 h-4 text-teal-500" />
              <span>100% Smart Panels</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/80 dark:bg-white/[0.06] border border-black/10 dark:border-white/10 backdrop-blur-md text-[#1E1128] dark:text-[#FAF6FC] font-bold">
              <Globe2 className="w-4 h-4 text-purple-500" />
              <span>Global Live Stream</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/80 dark:bg-white/[0.06] border border-black/10 dark:border-white/10 backdrop-blur-md text-[#1E1128] dark:text-[#FAF6FC] font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Trust Scholarship</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. SEARCH BAR & FILTER TOOLBAR
         ========================================================================= */}
      <section className="sticky top-16 z-30 w-full py-3 bg-white/80 dark:bg-[#120A17]/80 backdrop-blur-xl border-y border-black/10 dark:border-white/10 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          {/* Top Row: Search Input + Mode Switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input Box */}
            <div className="relative flex-1">
              <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E7E96] ${isRTL ? "right-3.5" : "left-3.5"}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={cp?.searchPlaceholder || "Search courses, subjects, books..."}
                className={`w-full h-11 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-xs sm:text-sm text-[#1E1128] dark:text-[#FAF6FC] placeholder-[#8E7E96] focus:outline-none focus:border-amber-500 transition-colors ${
                  isRTL ? "pr-10 pl-10" : "pl-10 pr-10"
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className={`absolute top-1/2 -translate-y-1/2 p-1 text-[#8E7E96] hover:text-[#1E1128] dark:hover:text-white ${
                    isRTL ? "left-3" : "right-3"
                  }`}
                  title={cp?.clearSearch || "Clear"}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mode Select Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 shrink-0 overflow-x-auto">
              <button
                onClick={() => setActiveMode("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeMode === "all"
                    ? "bg-amber-500 text-white shadow-xs"
                    : "text-[#5C4A66] dark:text-[#C8BDCF] hover:text-[#1E1128] dark:hover:text-white"
                }`}
              >
                {modes?.all || "All Modes"}
              </button>
              <button
                onClick={() => setActiveMode("hybrid")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeMode === "hybrid"
                    ? "bg-teal-500 text-white shadow-xs"
                    : "text-[#5C4A66] dark:text-[#C8BDCF] hover:text-[#1E1128] dark:hover:text-white"
                }`}
              >
                {modes?.hybrid || "Live Online"}
              </button>
              <button
                onClick={() => setActiveMode("campus")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeMode === "campus"
                    ? "bg-purple-500 text-white shadow-xs"
                    : "text-[#5C4A66] dark:text-[#C8BDCF] hover:text-[#1E1128] dark:hover:text-white"
                }`}
              >
                {modes?.campus || "Campus"}
              </button>
              <button
                onClick={() => setActiveMode("modular")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeMode === "modular"
                    ? "bg-rose-500 text-white shadow-xs"
                    : "text-[#5C4A66] dark:text-[#C8BDCF] hover:text-[#1E1128] dark:hover:text-white"
                }`}
              >
                {modes?.modular || "Modular"}
              </button>
            </div>
          </div>

          {/* Bottom Row: Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-start">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                activeCategory === "all"
                  ? "bg-amber-500/20 border-amber-500/50 text-amber-900 dark:text-amber-200"
                  : "bg-black/[0.03] dark:bg-white/[0.04] border-black/5 dark:border-white/5 text-[#5C4A66] dark:text-[#C8BDCF] hover:bg-black/[0.06]"
              }`}
            >
              {filters?.all || "All Programs"}
            </button>

            <button
              onClick={() => setActiveCategory("ifta")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                activeCategory === "ifta"
                  ? "bg-amber-500/20 border-amber-500/50 text-amber-900 dark:text-amber-200"
                  : "bg-black/[0.03] dark:bg-white/[0.04] border-black/5 dark:border-white/5 text-[#5C4A66] dark:text-[#C8BDCF] hover:bg-black/[0.06]"
              }`}
            >
              {filters?.ifta || "Takhassus Fil Ifta (Muftiya)"}
            </button>

            <button
              onClick={() => setActiveCategory("alimah")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                activeCategory === "alimah"
                  ? "bg-teal-500/20 border-teal-500/50 text-teal-900 dark:text-teal-200"
                  : "bg-black/[0.03] dark:bg-white/[0.04] border-black/5 dark:border-white/5 text-[#5C4A66] dark:text-[#C8BDCF] hover:bg-black/[0.06]"
              }`}
            >
              {filters?.alimah || "Dars-e-Nizami (Alimah)"}
            </button>

            <button
              onClick={() => setActiveCategory("hifz")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                activeCategory === "hifz"
                  ? "bg-purple-500/20 border-purple-500/50 text-purple-900 dark:text-purple-200"
                  : "bg-black/[0.03] dark:bg-white/[0.04] border-black/5 dark:border-white/5 text-[#5C4A66] dark:text-[#C8BDCF] hover:bg-black/[0.06]"
              }`}
            >
              {filters?.hifz || "Hifz & Tajweed"}
            </button>

            <button
              onClick={() => setActiveCategory("short")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                activeCategory === "short"
                  ? "bg-rose-500/20 border-rose-500/50 text-rose-900 dark:text-rose-200"
                  : "bg-black/[0.03] dark:bg-white/[0.04] border-black/5 dark:border-white/5 text-[#5C4A66] dark:text-[#C8BDCF] hover:bg-black/[0.06]"
              }`}
            >
              {filters?.short || "Short & Skill Batches"}
            </button>

            <button
              onClick={() => setActiveCategory("scholarship")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                activeCategory === "scholarship"
                  ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-900 dark:text-emerald-200"
                  : "bg-black/[0.03] dark:bg-white/[0.04] border-black/5 dark:border-white/5 text-[#5C4A66] dark:text-[#C8BDCF] hover:bg-black/[0.06]"
              }`}
            >
              ⭐ {filters?.scholarship || "100% Scholarship"}
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. COURSES CARDS GRID
         ========================================================================= */}
      <section className="relative w-full py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count Header */}
          <div className="flex items-center justify-between mb-6 text-xs text-[#7E6E85] dark:text-[#A898B0]">
            <div>
              <span>{cp?.showing || "Showing"} </span>
              <strong className="text-[#1E1128] dark:text-[#FAF6FC] font-bold">
                {filteredCourses.length}
              </strong>
              <span> {cp?.coursesCount || "programs"}</span>
            </div>

            {(searchQuery || activeCategory !== "all" || activeMode !== "all") && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline font-bold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{labels?.resetFilter || "Reset Filters"}</span>
              </button>
            )}
          </div>

          {/* Cards Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onOpenDetails={(c) => setSelectedCourse(c)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-white/60 dark:bg-[#160E1F]/60 border border-black/10 dark:border-white/10 backdrop-blur-xl">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-amber-500/15 text-amber-500 mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#1E1128] dark:text-[#FAF6FC] mb-1">
                {labels?.noCoursesFound || "No courses found matching your criteria."}
              </h3>
              <p className="text-xs text-[#6B5A73] dark:text-[#C8BDCF] max-w-sm mb-5">
                {labels?.noCoursesDesc ||
                  "Try searching with different keywords or reset your active filters."}
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-amber-500 text-white shadow-sm hover:bg-amber-600 transition-all cursor-pointer"
              >
                {labels?.resetFilter || "Show All Programs"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          4. COMPARISON MATRIX
         ========================================================================= */}
      <CurriculumComparison />

      {/* =========================================================================
          5. SCHOLARSHIP BANNER
         ========================================================================= */}
      <ScholarshipBanner />

      {/* =========================================================================
          6. ADMISSION ROADMAP
         ========================================================================= */}
      <AdmissionRoadmap />

      {/* =========================================================================
          7. COURSE FAQ SECTION
         ========================================================================= */}
      <CourseFaqSection />

      {/* =========================================================================
          8. SYLLABUS INSPECTOR MODAL
         ========================================================================= */}
      <CourseDetailModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </div>
  );
};
