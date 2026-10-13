"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Award,
  Search,
  ArrowLeft,
  ArrowRight,
  Calendar,
  IdCard,
  BookOpen,
} from "lucide-react";
import { useLanguage } from "@/shared/i18n";
import { A4PdfViewer } from "./A4PdfViewer";

export const ExamResultView: React.FC = () => {
  const { language, direction } = useLanguage();
  const isRTL = direction === "rtl";

  // Form State: Roll Number, DOB & Exam Term
  const [rollNo, setRollNo] = useState("");
  const [dob, setDob] = useState("");
  const [examTerm, setExamTerm] = useState("annual-2026");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Headings:
  // English: Examination Result
  // Urdu: امتحان رزلٹ
  // Hindi: इम्तिहान रिजल्ट
  const pageHeading =
    language === "ur"
      ? "امتحان رزلٹ"
      : language === "hi"
      ? "इम्तिहान रिजल्ट"
      : language === "ar"
      ? "نتائج الامتحانات"
      : "Examination Result";

  const handleFetch = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanRoll = rollNo.trim();
    if (!cleanRoll || !dob) return;

    setLoading(true);

    setTimeout(() => {
      setShowResult(true);
      setLoading(false);
    }, 400);
  };

  return (
    <div className="w-full flex flex-col min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Top Breadcrumb Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/students"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-300 hover:underline glass-item-card px-3.5 py-1.5 rounded-full"
        >
          {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span className={isRTL ? "font-urduBody leading-[1.8]" : ""}>
            {language === "ur" ? "طالبات پورٹل پر واپس جائیں" : "Back to Student Portal"}
          </span>
        </Link>
        <span className={`text-xs font-extrabold px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 ${
          isRTL ? "font-urduBody leading-[1.8]" : ""
        }`}>
          {language === "ur" ? "امتحانی رزلٹ پورٹل" : "Exam Result Portal"}
        </span>
      </div>

      {/* =========================================================================
          PAGE HEADER (Heading: امتحان رزلٹ / Examination Result)
         ========================================================================= */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-600/20">
          <Award className="w-7 h-7" />
        </div>
        <h1 className={`font-display font-black text-3xl sm:text-5xl text-[#2D1F33] dark:text-white ${
          isRTL
            ? "font-urduTitle leading-[2.1] sm:leading-[2.3] py-2 px-1 tracking-normal"
            : "leading-tight tracking-tight"
        }`}>
          {pageHeading}
        </h1>
        <p className={`text-xs sm:text-base text-[#5C4A66] dark:text-[#C8BDCF] max-w-lg mx-auto ${
          isRTL ? "font-urduBody leading-[2] py-1" : "leading-relaxed mt-2"
        }`}>
          {language === "ur"
            ? "اپنا رول نمبر، تاریخِ پیدائش (DOB) اور امتحانی ٹرم درج کر کے اصل A4 PDF رزلٹ حاصل کریں۔"
            : language === "hi"
            ? "अपना रोल नंबर, जन्म तिथि (DOB) और एग्जाम टर्म दर्ज करके असली A4 PDF रिजल्ट प्राप्त करें।"
            : "Enter your Roll Number, Date of Birth (DOB), and Exam Term to fetch your live A4 PDF result."}
        </p>
      </div>

      {/* =========================================================================
          INPUT BOX: ROLL NO + DOB + EXAM TERM + FETCH BUTTON
         ========================================================================= */}
      <div className="rounded-3xl glass-ultra p-6 sm:p-8 border border-amber-500/30 shadow-xl mb-8 relative overflow-hidden">
        <form onSubmit={handleFetch} className="flex flex-col gap-4 sm:gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Box 1: Roll No */}
            <div>
              <label className={`block text-xs sm:text-sm font-bold text-[#2D1F33] dark:text-white mb-1.5 flex items-center gap-1.5 ${
                isRTL ? "font-urduBody" : ""
              }`}>
                <IdCard className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>{language === "ur" ? "رول نمبر (Roll No)" : language === "hi" ? "रोल नंबर (Roll No)" : "Roll Number"}</span>
                <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={rollNo}
                onChange={(e) => {
                  setRollNo(e.target.value);
                  setShowResult(false);
                }}
                placeholder={
                  language === "ur"
                    ? "رول نمبر درج کریں (مثلاً: 1042)"
                    : language === "hi"
                    ? "रोल नंबर दर्ज करें (जैसे: 1042)"
                    : "Enter Roll Number (e.g. 1042)"
                }
                className={`w-full py-3.5 px-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs sm:text-sm font-semibold text-[#2D1F33] dark:text-white placeholder-[#8C7A96] dark:placeholder-[#A394AB] focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-sm transition-all ${
                  isRTL ? "font-urduBody leading-[1.8]" : ""
                }`}
              />
            </div>

            {/* Box 2: DOB (Date of Birth) */}
            <div>
              <label className={`block text-xs sm:text-sm font-bold text-[#2D1F33] dark:text-white mb-1.5 flex items-center gap-1.5 ${
                isRTL ? "font-urduBody" : ""
              }`}>
                <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>{language === "ur" ? "تاریخِ پیدائش (DOB)" : language === "hi" ? "जन्म तिथि (DOB)" : "Date of Birth (DOB)"}</span>
                <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                  setShowResult(false);
                }}
                className={`w-full py-3.5 px-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs sm:text-sm font-semibold text-[#2D1F33] dark:text-white placeholder-[#8C7A96] dark:placeholder-[#A394AB] focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-sm transition-all ${
                  isRTL ? "font-urduBody leading-[1.8]" : ""
                }`}
              />
            </div>

            {/* Box 3: Exam Term (Under Roll No / DOB) */}
            <div>
              <label className={`block text-xs sm:text-sm font-bold text-[#2D1F33] dark:text-white mb-1.5 flex items-center gap-1.5 ${
                isRTL ? "font-urduBody" : ""
              }`}>
                <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>{language === "ur" ? "امتحانی ٹرم (Exam Term)" : language === "hi" ? "एग्जाम टर्म (Exam Term)" : "Exam Term"}</span>
                <span className="text-rose-500">*</span>
              </label>
              <select
                value={examTerm}
                onChange={(e) => {
                  setExamTerm(e.target.value);
                  setShowResult(false);
                }}
                className={`w-full py-3.5 px-4 rounded-2xl bg-white dark:bg-[#1E132D] border border-black/10 dark:border-white/10 text-xs sm:text-sm font-semibold text-[#2D1F33] dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-sm transition-all ${
                  isRTL ? "font-urduBody leading-[1.8]" : ""
                }`}
              >
                <option value="annual-2026">
                  {language === "ur"
                    ? "سالانہ امتحان 2026 (Annual Exam 2026)"
                    : language === "hi"
                    ? "सालाना इम्तिहान 2026 (Annual Exam 2026)"
                    : "Annual Examination 2026"}
                </option>
                <option value="half-yearly">
                  {language === "ur"
                    ? "ششماہی امتحان 2025-26 (Half-Yearly Exam)"
                    : language === "hi"
                    ? "छमाही इम्तिहान 2025-26 (Half-Yearly Exam)"
                    : "Half-Yearly Examination 2025-26"}
                </option>
                <option value="term-1">
                  {language === "ur"
                    ? "سہ ماہی اول / فرسٹ ٹرم امتحان (1st Term)"
                    : language === "hi"
                    ? "फर्स्ट टर्म इम्तिहान (1st Term)"
                    : "1st Term Examination"}
                </option>
                <option value="term-2">
                  {language === "ur"
                    ? "سہ ماہی دوم / سیکنڈ ٹرم امتحان (2nd Term)"
                    : language === "hi"
                    ? "सेकंड टर्म इम्तिहान (2nd Term)"
                    : "2nd Term Examination"}
                </option>
                <option value="final-sanad">
                  {language === "ur"
                    ? "دورۂ حدیث فائنل سالانہ امتحان"
                    : language === "hi"
                    ? "दौरा-ए-हदीस फाइनल इम्तिहान"
                    : "Final Dawrah-e-Hadith Sanad Exam"}
                </option>
              </select>
            </div>

            {/* Fetch Button (In same row beside Exam Term) */}
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-800 hover:opacity-95 text-white font-black text-xs sm:text-sm shadow-lg shadow-amber-600/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                  isRTL ? "font-urduTitle leading-[1.8]" : ""
                }`}
              >
                <Search className="w-4 h-4" />
                <span>
                  {loading
                    ? (language === "ur" ? "لوڈ ہو رہا ہے..." : "Loading Live PDF...")
                    : (language === "ur" ? "Fetch Result (رزلٹ حاصل کریں)" : "Fetch Result")}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* =========================================================================
          LIVE ACTUAL A4 PDF VIEWER STAGE (APPEARS WHEN FETCHED)
         ========================================================================= */}
      {showResult && (
        <div className="w-full">
          <A4PdfViewer
            documentTitle={`Official_Document_A4_${rollNo || "2026"}.pdf`}
          />
        </div>
      )}
    </div>
  );
};
