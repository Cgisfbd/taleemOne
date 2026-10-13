"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Search,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Printer,
  Award,
  BookOpen,
  Calendar,
  Building,
  GraduationCap,
} from "lucide-react";
import { useLanguage } from "@/shared/i18n";

export const EntranceResultView: React.FC = () => {
  const { language, direction } = useLanguage();
  const isRTL = direction === "rtl";

  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setResult({
        appNo: query.toUpperCase().startsWith("JBH") ? query.toUpperCase() : "JBH-2026-84920",
        candidateName: "Maryam Siddiqua (مریم صدیقہ)",
        fatherName: "Hafiz Mohammad Ismail",
        program: "Dars-e-Nizami (Alimah Program)",
        marksObtained: 96,
        totalMarks: 100,
        allIndiaRank: "AIR-04",
        scholarshipQualified: true,
        scholarshipType: "Up to 100% Scholarship (Free Tuition, Hostel & Meals)",
        reportingDate: "Monday, 15 June 2026",
        venue: "Jamia Barkat-e-Haram Admissions Desk, Campus 1",
      });
      setLoading(false);
    }, 500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full flex flex-col min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Top Breadcrumb Link */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/students"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-300 hover:underline glass-item-card px-3 py-1.5 rounded-full"
        >
          {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{language === "ur" ? "طالبات پورٹل پر واپس جائیں" : "Back to Student Portal"}</span>
        </Link>
        <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
          Merit & Scholarship List
        </span>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
          <Sparkles className="w-7 h-7" />
        </div>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#2D1F33] dark:text-white">
          {language === "ur"
            ? "انٹرنس ٹیسٹ رزلٹ و میرٹ لسٹ"
            : language === "hi"
            ? "एंट्रेंस टेस्ट रिजल्ट व मेरिट लिस्ट"
            : "Entrance Test Result & Scholarship Merit"}
        </h1>
        <p className="text-xs sm:text-sm text-[#5C4A66] dark:text-[#C8BDCF] max-w-lg mx-auto mt-2">
          {language === "ur"
            ? "اپنا ایپلیکیشن نمبر یا رول نمبر درج کر کے 100% تک اسکالرشپ سلیکشن رزلٹ دیکھیں۔"
            : "Enter your Application Number or Roll Number to inspect your scholarship selection score."}
        </p>
      </div>

      {/* Search Input */}
      <div className="rounded-3xl glass-ultra p-6 sm:p-8 border border-emerald-500/25 shadow-lg mb-8">
        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            type="text"
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Application No (e.g. JBH-2026-84920 or JBH-APP-102)"
            className="flex-1 py-3.5 px-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs sm:text-sm font-semibold text-[#2D1F33] dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
          <button
            type="submit"
            disabled={loading}
            className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>{loading ? "Checking..." : "Check Result"}</span>
          </button>
        </form>
      </div>

      {/* Result Display */}
      {result && (
        <div className="rounded-3xl glass-ultra p-6 sm:p-8 border border-emerald-500/30 shadow-2xl relative overflow-hidden bg-white/95 dark:bg-[#150A20]/95">
          {/* Congratulations Top Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-amber-500/15 to-emerald-500/20 border border-emerald-500/35 text-center mb-6">
            <div className="inline-flex p-2 rounded-full bg-emerald-500 text-white mb-2 shadow-sm">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-base sm:text-lg font-black text-emerald-800 dark:text-emerald-200">
              {language === "ur"
                ? "مبارکباد! آپ 100% تک اسکالرشپ کے لیے منتخب ہو چکی ہیں"
                : "Congratulations! You have qualified for Up to 100% Jamia Scholarship"}
            </h2>
            <p className="text-xs text-emerald-900/80 dark:text-emerald-300/80 mt-1">
              Merit Rank: <strong className="font-mono font-black">{result.allIndiaRank}</strong> | Score: <strong className="font-mono font-black">{result.marksObtained}/{result.totalMarks}</strong>
            </p>
          </div>

          {/* Candidate Card Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm mb-6">
            <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10">
              <span className="text-[#8C7A96] dark:text-[#A394AB] block text-[11px]">Candidate Name:</span>
              <strong className="text-[#2D1F33] dark:text-white text-base">{result.candidateName}</strong>
            </div>

            <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10">
              <span className="text-[#8C7A96] dark:text-[#A394AB] block text-[11px]">Application No:</span>
              <strong className="text-emerald-700 dark:text-emerald-300 font-mono text-base font-black">{result.appNo}</strong>
            </div>

            <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10">
              <span className="text-[#8C7A96] dark:text-[#A394AB] block text-[11px]">Selected Program:</span>
              <strong className="text-[#2D1F33] dark:text-white">{result.program}</strong>
            </div>

            <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10">
              <span className="text-[#8C7A96] dark:text-[#A394AB] block text-[11px]">Scholarship Granted:</span>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                {result.scholarshipType}
              </span>
            </div>
          </div>

          {/* Next Steps for Seat Confirmation */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-950 dark:text-amber-200 mb-6">
            <strong className="block font-bold mb-1">Next Steps & Seat Confirmation:</strong>
            <ul className="list-disc list-inside space-y-1 text-[11px]">
              <li>Please report on <strong>{result.reportingDate}</strong> at <strong>{result.venue}</strong> with original documents.</li>
              <li>Required documents: 4 passport-size photographs, original previous Sanad / Marksheet, and Aadhaar/ID proof.</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 print:hidden">
            <button
              type="button"
              onClick={handlePrint}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-2 active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Print Scholarship Letter</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
