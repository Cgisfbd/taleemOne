"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  IdCard,
  Search,
  Printer,
  ArrowLeft,
  ArrowRight,
  Calendar,
  MapPin,
  QrCode,
} from "lucide-react";
import { useLanguage } from "@/shared/i18n";

export const AdmitCardView: React.FC = () => {
  const { language, direction } = useLanguage();
  const isRTL = direction === "rtl";

  const [searchType, setSearchType] = useState<"roll" | "app">("roll");
  const [query, setQuery] = useState("");
  const [admitCard, setAdmitCard] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);

    setTimeout(() => {
      setAdmitCard({
        rollNo: query.toUpperCase().startsWith("JBH") ? query.toUpperCase() : "JBH-2026-84920",
        candidateName: language === "ur" ? "فاطمہ زہرا" : "Fatima Zehra",
        guardianName: language === "ur" ? "مولانا محمد طارق" : "Maulana Mohammad Tariq",
        course: language === "ur" ? "درسِ نظامی (عالمہ کورس - سالِ اول)" : "Dars-e-Nizami (Alimah Program - 1st Year)",
        examType: language === "ur" ? "سالانہ داخلہ و اسکالرشپ اسیسمنٹ 2026" : "Annual Entrance & Scholarship Assessment 2026",
        examDate: language === "ur" ? "اتوار، 24 مئی 2026" : "Sunday, 24 May 2026",
        examTime: language === "ur" ? "صبح 09:30 تا 12:30 بجے" : "09:30 AM - 12:30 PM (Morning Session)",
        reportingTime: language === "ur" ? "صبح 08:45 بجے" : "08:45 AM IST",
        center: language === "ur" ? "جامعہ برکاتِ حرم امتحانی ہال، کیمپس 1، بھارت" : "Jamia Barkat-e-Haram Main Examination Hall, Campus 1, India",
        rollCode: "ROLL-" + Math.floor(1000 + Math.random() * 9000),
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
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-300 hover:underline glass-item-card px-3.5 py-1.5 rounded-full"
        >
          {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span className={isRTL ? "font-urduBody leading-[1.8]" : ""}>
            {language === "ur" ? "طالبات پورٹل پر واپس جائیں" : "Back to Student Portal"}
          </span>
        </Link>
        <span className={`text-xs font-extrabold px-3 py-1 rounded-full bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 ${
          isRTL ? "font-urduBody leading-[1.8]" : ""
        }`}>
          {language === "ur" ? "ہال ٹکٹ ڈاؤنلوڈ پورٹل" : "Hall Ticket Portal"}
        </span>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-700 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
          <IdCard className="w-7 h-7" />
        </div>
        <h1 className={`font-display font-extrabold text-2xl sm:text-4xl text-[#2D1F33] dark:text-white ${
          isRTL ? "font-urduTitle leading-[2] py-2" : "leading-tight"
        }`}>
          {language === "ur"
            ? "ایڈمٹ کارڈ ڈاؤنلوڈ"
            : language === "hi"
            ? "एडमिट कार्ड डाउनलोड"
            : "Download Admit Card / Hall Ticket"}
        </h1>
        <p className={`text-xs sm:text-sm text-[#5C4A66] dark:text-[#C8BDCF] max-w-lg mx-auto ${
          isRTL ? "font-urduBody leading-[2] py-1" : "leading-relaxed mt-2"
        }`}>
          {language === "ur"
            ? "اپنا رول نمبر یا ایپلیکیشن نمبر درج کر کے امتحان کا آفیشل ایڈمٹ کارڈ حاصل کریں۔"
            : "Enter your Roll Number or Application Number to search and print your official examination hall ticket."}
        </p>
      </div>

      {/* Lookup Form */}
      <div className="rounded-3xl glass-ultra p-6 sm:p-8 border border-rose-500/25 shadow-lg mb-8">
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <label className={`text-xs font-bold text-[#4A3B52] dark:text-[#C8BDCF] ${isRTL ? "font-urduBody" : ""}`}>
              {language === "ur" ? "تلاش کا ذریعہ:" : "Search By:"}
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchType("roll")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  isRTL ? "font-urduBody leading-[1.8]" : ""
                } ${
                  searchType === "roll"
                    ? "bg-rose-500 text-white shadow-xs"
                    : "bg-black/5 dark:bg-white/5 text-[#4A3B52] dark:text-[#C8BDCF]"
                }`}
              >
                {language === "ur" ? "رول نمبر" : "Roll Number"}
              </button>
              <button
                type="button"
                onClick={() => setSearchType("app")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  isRTL ? "font-urduBody leading-[1.8]" : ""
                } ${
                  searchType === "app"
                    ? "bg-rose-500 text-white shadow-xs"
                    : "bg-black/5 dark:bg-white/5 text-[#4A3B52] dark:text-[#C8BDCF]"
                }`}
              >
                {language === "ur" ? "ایپلیکیشن نمبر" : "Application Number"}
              </button>
            </div>
          </div>

          <div className="relative flex items-center">
            <input
              type="text"
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                searchType === "roll"
                  ? (language === "ur" ? "رول نمبر درج کریں (مثلاً: JBH-2026-84920 یا 1042)" : "Enter Roll No (e.g. JBH-2026-84920 or 1042)")
                  : (language === "ur" ? "ایپلیکیشن نمبر درج کریں (مثلاً: JBH-APP-7721)" : "Enter Application No (e.g. JBH-APP-7721)")
              }
              className={`w-full py-3.5 px-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs sm:text-sm font-semibold text-[#2D1F33] dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 ${
                isRTL ? "font-urduBody leading-[1.8]" : ""
              }`}
            />
            <button
              type="submit"
              disabled={loading}
              className={`absolute end-2 py-2 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5 ${
                isRTL ? "font-urduBody leading-[1.8]" : ""
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>{loading ? (language === "ur" ? "تلاش..." : "Searching...") : (language === "ur" ? "تلاش کریں" : "Search")}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Admit Card Result */}
      {admitCard && (
        <div className="rounded-3xl glass-ultra p-6 sm:p-8 border border-rose-500/30 shadow-2xl relative overflow-hidden print:p-0 print:border-none print:shadow-none bg-white/95 dark:bg-[#150A20]/95">
          {/* Official Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/10 dark:border-white/10">
            <div>
              <span className={`text-[10px] font-extrabold tracking-wider uppercase text-rose-600 dark:text-rose-400 block ${
                isRTL ? "font-urduBody" : ""
              }`}>
                Official Examination Hall Ticket • بطاقة دخول الامتحان
              </span>
              <h2 className={`font-display font-black text-lg sm:text-xl text-[#2D1F33] dark:text-white ${
                isRTL ? "font-urduTitle leading-[1.9] py-1" : ""
              }`}>
                جامعہ برکاتِ حرم (مرکز الدراسات الاسلامیۃ للبنات)
              </h2>
              <span className={`text-xs text-[#5C4A66] dark:text-[#C8BDCF] ${isRTL ? "font-urduBody leading-[1.8]" : ""}`}>
                Jamia Barkat-e-Haram Centre of Islamic Studies for Girls
              </span>
            </div>

            {/* Micro QR Box */}
            <div className="w-16 h-16 rounded-xl bg-white dark:bg-[#1A1028] p-1 border border-black/10 dark:border-white/10 flex items-center justify-center shrink-0">
              <QrCode className="w-12 h-12 text-rose-800 dark:text-rose-300" />
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10">
              <span className={`text-[#8C7A96] dark:text-[#A394AB] block text-[11px] ${isRTL ? "font-urduBody" : ""}`}>
                {language === "ur" ? "امیدوار کا نام:" : "Candidate Name:"}
              </span>
              <strong className={`text-[#2D1F33] dark:text-white text-base ${isRTL ? "font-urduBody leading-[1.8]" : ""}`}>{admitCard.candidateName}</strong>
            </div>

            <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10">
              <span className={`text-[#8C7A96] dark:text-[#A394AB] block text-[11px] ${isRTL ? "font-urduBody" : ""}`}>
                {language === "ur" ? "رول نمبر:" : "Roll Number:"}
              </span>
              <strong className="text-rose-700 dark:text-rose-300 font-mono text-base font-black">
                {admitCard.rollNo}
              </strong>
            </div>

            <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10">
              <span className={`text-[#8C7A96] dark:text-[#A394AB] block text-[11px] ${isRTL ? "font-urduBody" : ""}`}>
                {language === "ur" ? "سرپرست / والد کا نام:" : "Guardian Name:"}
              </span>
              <strong className={`text-[#2D1F33] dark:text-white ${isRTL ? "font-urduBody leading-[1.8]" : ""}`}>{admitCard.guardianName}</strong>
            </div>

            <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10">
              <span className={`text-[#8C7A96] dark:text-[#A394AB] block text-[11px] ${isRTL ? "font-urduBody" : ""}`}>
                {language === "ur" ? "امتحانی شعبہ / کلاس:" : "Examination Program:"}
              </span>
              <strong className={`text-[#2D1F33] dark:text-white ${isRTL ? "font-urduBody leading-[1.8]" : ""}`}>{admitCard.course}</strong>
            </div>

            <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10">
              <span className={`text-[#8C7A96] dark:text-[#A394AB] block text-[11px] ${isRTL ? "font-urduBody" : ""}`}>
                {language === "ur" ? "امتحان کی تاریخ و وقت:" : "Exam Date & Timing:"}
              </span>
              <strong className={`text-[#2D1F33] dark:text-white flex items-center gap-1.5 mt-0.5 ${isRTL ? "font-urduBody leading-[1.8]" : ""}`}>
                <Calendar className="w-3.5 h-3.5 text-rose-500" />
                <span>{admitCard.examDate}</span>
              </strong>
              <span className={`text-[11px] text-[#5C4A66] dark:text-[#C8BDCF] block mt-0.5 ${isRTL ? "font-urduBody" : "font-mono"}`}>
                {admitCard.examTime} ({language === "ur" ? "رپورٹنگ:" : "Reporting:"} {admitCard.reportingTime})
              </span>
            </div>

            <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10">
              <span className={`text-[#8C7A96] dark:text-[#A394AB] block text-[11px] ${isRTL ? "font-urduBody" : ""}`}>
                {language === "ur" ? "امتحانی مرکز:" : "Examination Center:"}
              </span>
              <strong className={`text-[#2D1F33] dark:text-white flex items-center gap-1.5 mt-0.5 ${isRTL ? "font-urduBody leading-[1.8]" : ""}`}>
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>{admitCard.center}</span>
              </strong>
            </div>
          </div>

          {/* Important Rules / Instructions */}
          <div className="mt-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-950 dark:text-rose-200">
            <strong className={`block mb-1 font-bold ${isRTL ? "font-urduBody leading-[1.8]" : ""}`}>
              {language === "ur" ? "امتحان کے لیے ضروری ہدایات:" : "Important Instructions for Examination:"}
            </strong>
            <ul className={`list-disc list-inside space-y-1 text-[11px] ${isRTL ? "font-urduBody leading-[1.9]" : ""}`}>
              <li>{language === "ur" ? "امتحانی ہال میں داخلے کے لیے یہ پرنٹ شدہ ایڈمٹ کارڈ اور شناختی کارڈ لانا لازمی ہے۔" : "Please bring this printed Admit Card along with a valid ID proof to the exam center."}</li>
              <li>{language === "ur" ? "امتحان شروع ہونے سے کم از کم 45 منٹ قبل مرکز پر پہنچنا ضروری ہے۔" : "Reporting time is strictly 45 minutes prior to the exam start time."}</li>
              <li>{language === "ur" ? "امتحانی ہال کے اندر موبائل فون، گھڑی اور الیکٹرانک آلات لے جانا سخت منع ہے۔" : "Electronic gadgets, mobile phones, and calculators are strictly prohibited inside the hall."}</li>
            </ul>
          </div>

          {/* Action Print / Download Button */}
          <div className="mt-6 flex items-center justify-end gap-3 print:hidden">
            <button
              type="button"
              onClick={handlePrint}
              className={`py-3 px-5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-2 active:scale-95 ${
                isRTL ? "font-urduBody leading-[1.8]" : ""
              }`}
            >
              <Printer className="w-4 h-4" />
              <span>{language === "ur" ? "ایڈمٹ کارڈ پرنٹ کریں" : "Print / Save as PDF"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
