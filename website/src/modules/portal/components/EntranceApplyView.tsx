"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Printer,
  RotateCcw,
  Phone,
  Download,
  GraduationCap,
  Calendar,
  Building,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/shared/i18n";

export const EntranceApplyView: React.FC = () => {
  const { language, direction } = useLanguage();
  const isRTL = direction === "rtl";

  const [formData, setFormData] = useState({
    candidateName: "",
    guardianName: "",
    dob: "",
    mobile: "",
    whatsapp: "",
    email: "",
    program: "dars-e-nizami",
    mode: "campus",
    previousEducation: "hafiza",
    state: "Uttar Pradesh",
    city: "",
    address: "",
    needScholarship: true,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationNo, setApplicationNo] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const generated = "JBH-2026-" + Math.floor(100000 + Math.random() * 900000);
      setApplicationNo(generated);
      setSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full flex flex-col min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Top Breadcrumb Link */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/students"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-300 hover:underline glass-item-card px-3 py-1.5 rounded-full"
        >
          {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{language === "ur" ? "طالبات پورٹل پر واپس جائیں" : "Back to Student Portal"}</span>
        </Link>

        <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-200 border border-amber-500/30">
          Session 2026-27
        </span>
      </div>

      {!isSubmitted ? (
        <div className="rounded-3xl glass-ultra p-6 sm:p-10 border border-amber-500/25 shadow-xl relative overflow-hidden">
          {/* Header Banner */}
          <div className="text-center pb-6 mb-6 border-b border-black/5 dark:border-white/10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
              <UserPlus className="w-7 h-7" />
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#2D1F33] dark:text-white">
              {language === "ur"
                ? "انٹرنس ٹیسٹ آن لائن داخلہ فارم (100% تک اسکالرشپ)"
                : language === "hi"
                ? "एंट्रेंस टेस्ट ऑनलाइन दाखिला फॉर्म (100% तक स्कॉलरशिप)"
                : "Up to 100% Scholarship Entrance Test Application"}
            </h1>
            <p className="text-xs sm:text-sm text-[#5C4A66] dark:text-[#C8BDCF] max-w-xl mx-auto mt-2">
              {language === "ur"
                ? "عالمہ، مفتیہ، حفظ اور اسمارٹ کلاسز کے لیے مفت اسکالرشپ انٹرنس ٹیسٹ کی آن لائن درخواست۔"
                : "Apply online for the upcoming entrance examination and qualify for full tuition & hostel sponsorship."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* 1. Candidate Personal Information */}
            <div>
              <h2 className="text-sm font-extrabold text-amber-900 dark:text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>{language === "ur" ? "طالبہ کی ذاتی معلومات" : "Candidate Information"}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A3B52] dark:text-[#C8BDCF] mb-1">
                    {language === "ur" ? "طالبہ کا پورا نام *" : "Candidate Full Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.candidateName}
                    onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                    placeholder={language === "ur" ? "طالبہ کا نام درج کریں" : "Enter candidate's full name"}
                    className="w-full p-3 rounded-xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs sm:text-sm font-semibold text-[#2D1F33] dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A3B52] dark:text-[#C8BDCF] mb-1">
                    {language === "ur" ? "والد / سرپرست کا نام *" : "Father / Guardian's Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    placeholder={language === "ur" ? "والد کا نام" : "Enter father's name"}
                    className="w-full p-3 rounded-xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs sm:text-sm font-semibold text-[#2D1F33] dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A3B52] dark:text-[#C8BDCF] mb-1">
                    {language === "ur" ? "تاریخِ پیدائش (DOB) *" : "Date of Birth *"}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs sm:text-sm font-semibold text-[#2D1F33] dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A3B52] dark:text-[#C8BDCF] mb-1">
                    {language === "ur" ? "موبائل / واٹس ایپ نمبر *" : "Mobile / WhatsApp Number *"}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="+91 98765 43210"
                    dir="ltr"
                    className="w-full p-3 rounded-xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs sm:text-sm font-semibold text-[#2D1F33] dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>
            </div>

            {/* 2. Course & Learning Mode Selection */}
            <div>
              <h2 className="text-sm font-extrabold text-amber-900 dark:text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>{language === "ur" ? "کورس و تعلیمی طریقہ کار" : "Course & Study Mode"}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A3B52] dark:text-[#C8BDCF] mb-1">
                    {language === "ur" ? "مطلوبہ کورس منتخب کریں *" : "Select Desired Program *"}
                  </label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white dark:bg-[#1E132D] border border-black/10 dark:border-white/10 text-xs sm:text-sm font-semibold text-[#2D1F33] dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  >
                    <option value="dars-e-nizami">Dars-e-Nizami (Alimah Course - 5 Years)</option>
                    <option value="muftiya">Takhassus Fil Ifta (Muftiya Course - 2 Years)</option>
                    <option value="hifz">Hifz-o-Tajweed & Qira'at (3 Years)</option>
                    <option value="smart-classes">Digital Smart Classes & English Skills</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A3B52] dark:text-[#C8BDCF] mb-1">
                    {language === "ur" ? "تعلیم کا طریقہ کار *" : "Study Mode *"}
                  </label>
                  <select
                    value={formData.mode}
                    onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white dark:bg-[#1E132D] border border-black/10 dark:border-white/10 text-xs sm:text-sm font-semibold text-[#2D1F33] dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  >
                    <option value="campus">Full-Time Residential Hostel Campus</option>
                    <option value="online">Global Live Interactive Online Classroom</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Address & State */}
            <div>
              <h2 className="text-sm font-extrabold text-amber-900 dark:text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Building className="w-4 h-4" />
                <span>{language === "ur" ? "پتہ و رہائشی معلومات" : "Address & Location"}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A3B52] dark:text-[#C8BDCF] mb-1">
                    {language === "ur" ? "ریاست (State) *" : "State / Province *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs sm:text-sm font-semibold text-[#2D1F33] dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A3B52] dark:text-[#C8BDCF] mb-1">
                    {language === "ur" ? "شہر / ضلع (City/District) *" : "City / District *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder={language === "ur" ? "شہر کا نام" : "Enter your city"}
                    className="w-full p-3 rounded-xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs sm:text-sm font-semibold text-[#2D1F33] dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>
            </div>

            {/* Up to 100% Scholarship Checkbox */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
              <input
                type="checkbox"
                id="scholarshipOpt"
                checked={formData.needScholarship}
                onChange={(e) => setFormData({ ...formData, needScholarship: e.target.checked })}
                className="w-5 h-5 rounded accent-amber-600"
              />
              <label htmlFor="scholarshipOpt" className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200 cursor-pointer">
                {language === "ur"
                  ? "میں مجدد الف ثانی ٹرسٹ کے 100% تک مفت اسکالرشپ و ہاسٹل کے لیے درخواست گزار ہوں۔"
                  : "I wish to be evaluated for up to 100% free tuition, books, and residential hostel scholarship."}
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:opacity-95 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-amber-500/25 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {submitting ? (
                <span>{language === "ur" ? "فارم سبمٹ ہو رہا ہے..." : "Submitting Application..."}</span>
              ) : (
                <>
                  <span>{language === "ur" ? "آن لائن درخواست سبمٹ کریں" : "Submit Entrance Application"}</span>
                  <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
                </>
              )}
            </button>
          </form>
        </div>
      ) : (
        /* SUCCESS CONFIRMATION & PRINTABLE REGISTRATION SLIP */
        <div className="rounded-3xl glass-ultra p-6 sm:p-10 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
          {/* Top Success Badge */}
          <div className="text-center pb-6 border-b border-black/5 dark:border-white/10">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Registration Successful • داخلہ فارم کامیابی سے جمع ہوگیا
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#2D1F33] dark:text-white mt-1">
              {language === "ur" ? "مبارک ہو! آپ کا فارم موصول ہو گیا ہے" : "Entrance Application Slip Generated"}
            </h2>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-200 font-mono text-sm sm:text-base font-black">
              <span>Application No:</span>
              <span className="text-amber-700 dark:text-amber-300">{applicationNo}</span>
            </div>
          </div>

          {/* Registration Slip Summary Card */}
          <div className="my-6 p-6 rounded-2xl bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-[#8C7A96] dark:text-[#A394AB] block">Candidate Name:</span>
              <strong className="text-[#2D1F33] dark:text-white text-base">{formData.candidateName || "Ayesha Fatima"}</strong>
            </div>
            <div>
              <span className="text-[#8C7A96] dark:text-[#A394AB] block">Father / Guardian:</span>
              <strong className="text-[#2D1F33] dark:text-white text-base">{formData.guardianName || "Mohammad Ahmad"}</strong>
            </div>
            <div>
              <span className="text-[#8C7A96] dark:text-[#A394AB] block">Applied Program:</span>
              <strong className="text-[#2D1F33] dark:text-white capitalize">{formData.program}</strong>
            </div>
            <div>
              <span className="text-[#8C7A96] dark:text-[#A394AB] block">Study Mode:</span>
              <strong className="text-[#2D1F33] dark:text-white capitalize">{formData.mode}</strong>
            </div>
            <div>
              <span className="text-[#8C7A96] dark:text-[#A394AB] block">Contact Mobile:</span>
              <strong className="text-[#2D1F33] dark:text-white" dir="ltr">{formData.mobile || "+91 70806 54147"}</strong>
            </div>
            <div>
              <span className="text-[#8C7A96] dark:text-[#A394AB] block">Scholarship Status:</span>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                Up to 100% Scholarship Applicant
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handlePrint}
              className="w-full sm:flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-700 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>{language === "ur" ? "رجسٹریشن سلپ پرنٹ کریں" : "Print Application Slip"}</span>
            </button>
            <Link
              href="/students/admit"
              className="w-full sm:flex-1 py-3.5 px-4 rounded-2xl glass-item-card border border-amber-500/30 text-amber-900 dark:text-amber-200 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 text-center"
            >
              <span>{language === "ur" ? "ایڈمٹ کارڈ ڈاؤنلوڈ پر جائیں" : "Go to Admit Card Portal"}</span>
              <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
