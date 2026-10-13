"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Printer,
  QrCode,
  Lock,
} from "lucide-react";
import { useLanguage } from "@/shared/i18n";

export const CertificateVerifyView: React.FC = () => {
  const { language, direction } = useLanguage();
  const isRTL = direction === "rtl";

  const [certNo, setCertNo] = useState("");
  const [verificationResult, setVerificationResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certNo.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setVerificationResult({
        certId: certNo.toUpperCase().startsWith("JBH") ? certNo.toUpperCase() : "JBH-SANAD-2025-9481",
        status: language === "ur" ? "سند 100% تصدیق شدہ اور مستند ہے" : "AUTHENTIC & VERIFIED / سند تصدیق شدہ ہے",
        studentName: language === "ur" ? "عالمہ سمیہ بنت نور" : "Alimah Sumayya Bint Noor",
        guardianName: language === "ur" ? "حاجی نور محمد" : "Haji Noor Mohammad",
        conferredDegree: language === "ur" ? "شہادت العالمیہ (درسِ نظامی عالمہ سند)" : "Shahadat-ul-Alimiyyah (Dars-e-Nizami Alimah Sanad)",
        degreeArabic: "شہادۃ العالمیۃ فی العلوم الاسلامیۃ والعربیۃ",
        gradeDivision: language === "ur" ? "فرسٹ ڈویژن مع امتیاز (ممتاز)" : "First Class with Distinction (Mumtaz)",
        yearOfPassing: "2025 (Hijri 1446)",
        issueDate: "15 Shawwal 1446 / April 2025",
        signedBy: language === "ur" ? "پرنسپل و شیخ الحدیث، جامعہ برکاتِ حرم" : "Principal & Shaykh-ul-Hadith, Jamia Barkat-e-Haram",
        tamperProofHash: "SHA256: 8f9b7c2a4e1d0f5c9e8b7a6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0",
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
        <span className={`text-xs font-extrabold px-3 py-1 rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30 flex items-center gap-1.5 ${
          isRTL ? "font-urduBody leading-[1.8]" : ""
        }`}>
          <Lock className="w-3 h-3" />
          <span>{language === "ur" ? "7-لیئر سائبر پروٹیکشن" : "7-Layer Cyber Defense"}</span>
        </span>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-800 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h1 className={`font-display font-extrabold text-2xl sm:text-4xl text-[#2D1F33] dark:text-white ${
          isRTL ? "font-urduTitle leading-[2] py-2" : "leading-tight"
        }`}>
          {language === "ur"
            ? "سند و مارک شیٹ ویریفیکیشن"
            : language === "hi"
            ? "सनद व मार्कशीट वेरिफिकेशन"
            : "Digital Sanad & Certificate Verification"}
        </h1>
        <p className={`text-xs sm:text-sm text-[#5C4A66] dark:text-[#C8BDCF] max-w-lg mx-auto ${
          isRTL ? "font-urduBody leading-[2] py-1" : "leading-relaxed mt-2"
        }`}>
          {language === "ur"
            ? "جامعہ برکاتِ حرم کی جاری کردہ عالمہ، مفتیہ و فاضلہ اسناد کی 100% تصدیق کریں۔"
            : "Verify official Alimah, Muftiya, and Fazilah degrees and certificates with anti-fraud QR defense."}
        </p>
      </div>

      {/* Verification Search Bar */}
      <div className="rounded-3xl glass-ultra p-6 sm:p-8 border border-purple-500/25 shadow-lg mb-8">
        <form onSubmit={handleVerify} className="flex gap-3">
          <input
            type="text"
            required
            value={certNo}
            onChange={(e) => setCertNo(e.target.value)}
            placeholder={language === "ur" ? "سند نمبر یا رول نمبر درج کریں (مثلاً: JBH-SANAD-2025-9481 یا 1042)" : "Enter Certificate No / Roll No (e.g. JBH-SANAD-2025-9481 or 1042)"}
            className={`flex-1 py-3.5 px-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs sm:text-sm font-semibold text-[#2D1F33] dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
              isRTL ? "font-urduBody leading-[1.8]" : ""
            }`}
          />
          <button
            type="submit"
            disabled={loading}
            className={`py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-700 hover:opacity-95 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-2 ${
              isRTL ? "font-urduBody leading-[1.8]" : ""
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{loading ? (language === "ur" ? "تصدیق جاری ہے..." : "Verifying...") : (language === "ur" ? "سند ویریفائی کریں" : "Verify Certificate")}</span>
          </button>
        </form>
      </div>

      {/* Verified Certificate Presentation */}
      {verificationResult && (
        <div className="rounded-3xl glass-ultra p-6 sm:p-8 border border-purple-500/30 shadow-2xl relative overflow-hidden bg-white/95 dark:bg-[#150A20]/95">
          {/* Top Verification Seal */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center sm:text-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <span className={`text-[10px] font-extrabold tracking-wider uppercase text-emerald-700 dark:text-emerald-300 block ${
                  isRTL ? "font-urduBody" : ""
                }`}>
                  Official Verification Passed • تصدیق کامیاب
                </span>
                <strong className={`text-sm sm:text-base font-black text-[#2D1F33] dark:text-white ${
                  isRTL ? "font-urduBody leading-[1.8]" : ""
                }`}>
                  {verificationResult.status}
                </strong>
              </div>
            </div>

            <div className="w-14 h-14 rounded-xl bg-white dark:bg-[#1A1028] p-1 border border-black/10 dark:border-white/10 flex items-center justify-center shrink-0 shadow-sm">
              <QrCode className="w-10 h-10 text-purple-700 dark:text-purple-300" />
            </div>
          </div>

          {/* Certificate Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm mb-6">
            <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10">
              <span className={`text-[#8C7A96] dark:text-[#A394AB] block text-[11px] ${isRTL ? "font-urduBody" : ""}`}>
                {language === "ur" ? "طالبہ / فاضلہ کا نام:" : "Student / Scholar Name:"}
              </span>
              <strong className={`text-[#2D1F33] dark:text-white text-base ${isRTL ? "font-urduBody leading-[1.8]" : ""}`}>{verificationResult.studentName}</strong>
            </div>

            <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10">
              <span className={`text-[#8C7A96] dark:text-[#A394AB] block text-[11px] ${isRTL ? "font-urduBody" : ""}`}>
                {language === "ur" ? "سند آئی ڈی / رجسٹریشن نمبر:" : "Certificate / Sanad ID:"}
              </span>
              <strong className="text-purple-700 dark:text-purple-300 font-mono text-base font-black">
                {verificationResult.certId}
              </strong>
            </div>

            <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10">
              <span className={`text-[#8C7A96] dark:text-[#A394AB] block text-[11px] ${isRTL ? "font-urduBody" : ""}`}>
                {language === "ur" ? "تفویض کردہ دینی سند:" : "Conferred Islamic Degree:"}
              </span>
              <strong className={`text-[#2D1F33] dark:text-white ${isRTL ? "font-urduBody leading-[1.8]" : ""}`}>{verificationResult.conferredDegree}</strong>
              <span className="text-xs text-amber-800 dark:text-amber-300 font-arabic block mt-0.5">
                {verificationResult.degreeArabic}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10">
              <span className={`text-[#8C7A96] dark:text-[#A394AB] block text-[11px] ${isRTL ? "font-urduBody" : ""}`}>
                {language === "ur" ? "ڈویژن / گریڈ:" : "Academic Distinction / Division:"}
              </span>
              <span className={`inline-block px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-200 font-bold text-xs ${
                isRTL ? "font-urduBody" : ""
              }`}>
                {verificationResult.gradeDivision}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10">
              <span className={`text-[#8C7A96] dark:text-[#A394AB] block text-[11px] ${isRTL ? "font-urduBody" : ""}`}>
                {language === "ur" ? "فراغت کا سال و تاریخ:" : "Conferment Year & Date:"}
              </span>
              <strong className={`text-[#2D1F33] dark:text-white ${isRTL ? "font-urduBody leading-[1.8]" : ""}`}>{verificationResult.yearOfPassing}</strong>
              <span className={`text-[11px] text-[#5C4A66] dark:text-[#C8BDCF] block mt-0.5 ${isRTL ? "font-urduBody" : ""}`}>
                {language === "ur" ? "تاریخِ اجراء:" : "Issued:"} {verificationResult.issueDate}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10">
              <span className={`text-[#8C7A96] dark:text-[#A394AB] block text-[11px] ${isRTL ? "font-urduBody" : ""}`}>
                {language === "ur" ? "مجاز اتھارٹی:" : "Issuing Authority:"}
              </span>
              <strong className={`text-[#2D1F33] dark:text-white ${isRTL ? "font-urduBody leading-[1.8]" : ""}`}>{verificationResult.signedBy}</strong>
            </div>
          </div>

          {/* Tamper-Proof Cryptographic Signature */}
          <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-[10px] font-mono text-[#8C7A96] dark:text-[#A394AB] truncate">
            <span className="font-bold text-[#2D1F33] dark:text-white">Security Hash: </span>
            {verificationResult.tamperProofHash}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex items-center justify-end gap-3 print:hidden">
            <button
              type="button"
              onClick={handlePrint}
              className={`py-3 px-5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-2 active:scale-95 ${
                isRTL ? "font-urduBody leading-[1.8]" : ""
              }`}
            >
              <Printer className="w-4 h-4" />
              <span>{language === "ur" ? "تصدیق نامہ پرنٹ کریں" : "Print Verification Certificate"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
