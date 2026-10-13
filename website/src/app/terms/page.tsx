"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Scale,
  GraduationCap,
  Award,
  BookOpen,
  FileCheck,
  ShieldAlert,
  Users,
  QrCode,
  HeartHandshake,
  Gavel,
  ChevronRight,
  Sparkles,
  Phone,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/shared/i18n";

interface PolicySection {
  id?: string;
  title?: string;
  desc?: string;
}

export default function TermsConditionsPage() {
  const { t, direction } = useLanguage();
  const isRTL = direction === "rtl";
  const [activeSection, setActiveSection] = useState<string>("agreement");

  const sections: PolicySection[] = (t.termsPage?.sections as PolicySection[]) || [];

  const getSectionIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Scale className="w-4 h-4 text-amber-500" />;
      case 1:
        return <GraduationCap className="w-4 h-4 text-rose-500" />;
      case 2:
        return <FileCheck className="w-4 h-4 text-amber-500" />;
      case 3:
        return <Award className="w-4 h-4 text-amber-600" />;
      case 4:
        return <Users className="w-4 h-4 text-purple-500" />;
      case 5:
        return <BookOpen className="w-4 h-4 text-rose-500" />;
      case 6:
        return <QrCode className="w-4 h-4 text-emerald-500" />;
      case 7:
        return <Users className="w-4 h-4 text-amber-500" />;
      case 8:
        return <HeartHandshake className="w-4 h-4 text-rose-500" />;
      default:
        return <Gavel className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="min-h-screen py-6 sm:py-12 px-3.5 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 1. HERO HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          {/* Jewel Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-300 font-bold text-xs sm:text-sm shadow-sm mb-4">
            <Scale className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{t.termsPage?.badge || "Academic & Legal Framework"}</span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight bg-gradient-to-r from-[#713F12] via-[#D97706] to-[#BE123C] dark:from-[#FFFBEB] dark:via-[#FBBF24] dark:to-[#F43F5E] bg-clip-text text-transparent drop-shadow-sm mb-3 sm:mb-4">
            {t.termsPage?.title || "Terms & Conditions"}
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-base leading-relaxed text-[#5C4A66] dark:text-[#C8BDCF] max-w-2xl mx-auto mb-4">
            {t.termsPage?.subtitle ||
              "Jamia Barkat-e-Haram's Institutional Rules, Entrance Examination Guidelines, Smart Class Protocols & Code of Conduct."}
          </p>

          {/* Document Ref & Updated Date */}
          <div className="inline-flex items-center gap-2 text-[11px] font-medium text-[#7A6985] dark:text-[#A394AB] px-3 py-1 rounded-xl glass-item-card">
            <span>{t.termsPage?.lastUpdated || "Last Updated: August 2026 | Document Ref: JBH-TOS-2026"}</span>
          </div>
        </div>

        {/* 2. 100% SCHOLARSHIP & CONDUCT HIGHLIGHTS BANNER */}
        <div className="mb-8 sm:mb-12 rounded-3xl glass-ultra border border-amber-500/30 p-5 sm:p-7 shadow-lg bg-gradient-to-r from-amber-500/[0.08] via-rose-500/[0.05] to-amber-500/[0.08] relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0 shadow-sm">
              <Award className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="flex flex-col text-start flex-1">
              <h2 className="text-base sm:text-lg font-black text-[#2D1F33] dark:text-white mb-1">
                100% Scholarship Charter & Institutional Discipline
              </h2>
              <p className="text-xs sm:text-sm text-[#5C4A66] dark:text-[#C8BDCF] leading-relaxed">
                Admissions and 100% scholarships (covering 100% tuition fees, hostel accommodation, and meals) are awarded on strict academic merit. Admission fees and curriculum books are payable by the student. Students must maintain a minimum 85% attendance, 70% semester marks, and exemplary Islamic Akhlaaq.
              </p>
            </div>
          </div>
        </div>

        {/* 3. 4-PILLAR RULES BADGES */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mb-8 sm:mb-12">
          <div className="p-3 sm:p-4 rounded-2xl glass-ultra border border-amber-500/20 text-start flex flex-col gap-1">
            <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#2D1F33] dark:text-white">
              <GraduationCap className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Merit Admission</span>
            </div>
            <span className="text-[10px] text-[#7A6985] dark:text-[#A394AB]">Strict Eligibility Verification</span>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl glass-ultra border border-amber-500/20 text-start flex flex-col gap-1">
            <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#2D1F33] dark:text-white">
              <Award className="w-4 h-4 text-amber-500 shrink-0" />
              <span>100% Scholarship</span>
            </div>
            <span className="text-[10px] text-[#7A6985] dark:text-[#A394AB]">85% Attendance & 70% Merit</span>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl glass-ultra border border-amber-500/20 text-start flex flex-col gap-1">
            <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#2D1F33] dark:text-white">
              <QrCode className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>QR Verification</span>
            </div>
            <span className="text-[10px] text-[#7A6985] dark:text-[#A394AB]">Tamper-Proof Degree Ledger</span>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl glass-ultra border border-amber-500/20 text-start flex flex-col gap-1">
            <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#2D1F33] dark:text-white">
              <Users className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Placement Cell</span>
            </div>
            <span className="text-[10px] text-[#7A6985] dark:text-[#A394AB]">100% Free Teacher Hiring</span>
          </div>
        </div>

        {/* 4. MAIN CONTENT LAYOUT (Table of Contents + Policy Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Quick Sticky Table of Contents (Desktop 4 cols) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28 p-5 rounded-3xl glass-ultra border border-amber-500/25 shadow-lg">
              <h3 className="font-extrabold text-sm text-[#2D1F33] dark:text-white pb-3 border-b border-black/5 dark:border-white/10 mb-3">
                Rules & Guidelines
              </h3>
              <nav className="flex flex-col gap-1 text-xs">
                {sections.map((sec: PolicySection, idx: number) => (
                  <a
                    key={sec.id || idx}
                    href={`#${sec.id || `sec-${idx}`}`}
                    onClick={() => setActiveSection(sec.id || `sec-${idx}`)}
                    className={`flex items-center justify-between p-2 rounded-xl transition-all ${
                      activeSection === (sec.id || `sec-${idx}`)
                        ? "bg-amber-500/20 text-amber-900 dark:text-amber-200 font-bold border border-amber-500/30"
                        : "hover:bg-amber-500/10 text-[#5C4A66] dark:text-[#C8BDCF]"
                    }`}
                  >
                    <span className="truncate">{sec.title}</span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 text-amber-500 shrink-0 ${isRTL ? "rotate-180" : ""}`}
                    />
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Policy Sections Cards (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-5">
            {sections.map((sec: PolicySection, idx: number) => (
              <div
                key={sec.id || idx}
                id={sec.id || `sec-${idx}`}
                className="p-5 sm:p-6 rounded-3xl glass-ultra border border-amber-500/20 shadow-sm scroll-mt-28 text-start hover:border-amber-500/40 transition-colors"
              >
                <div className="flex items-center gap-2.5 pb-2.5 mb-3 border-b border-black/5 dark:border-white/10">
                  <div className="p-2 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 shrink-0">
                    {getSectionIcon(idx)}
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#2D1F33] dark:text-white">
                    {sec.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#5C4A66] dark:text-[#C8BDCF] leading-relaxed">
                  {sec.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. MUJADDID ALF SANI TRUST ADMINISTRATIVE AUTHORITY CARD */}
        <div className="rounded-3xl glass-ultra border border-amber-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-start bg-gradient-to-r from-amber-500/[0.08] via-white/80 dark:via-[#160D22]/80 to-rose-500/[0.08]">
          <div className="flex flex-col gap-1 max-w-xl text-start">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Institutional Authority
            </span>
            <h4 className="text-base sm:text-lg font-black text-[#2D1F33] dark:text-white">
              Mujaddid Alf Sani Education and Welfare Trust & Administrative Office
            </h4>
            <p className="text-xs sm:text-sm text-[#5C4A66] dark:text-[#C8BDCF]">
              For student admission queries, disciplinary matters, or institutional verification:
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            {/* Email Button */}
            <a
              href="mailto:cgisbarkateharam@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold text-xs sm:text-sm shadow-md transition-transform active:scale-95"
            >
              <Mail className="w-4 h-4" />
              <span>cgisbarkateharam@gmail.com</span>
            </a>

            {/* Helpline Call Button */}
            <a
              href="tel:+917080654147"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl glass-item-card hover:border-amber-500/40 text-amber-900 dark:text-amber-200 font-bold text-xs sm:text-sm transition-transform active:scale-95"
            >
              <Phone className="w-4 h-4 text-amber-500" />
              <span dir="ltr">+91 70806 54147</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
