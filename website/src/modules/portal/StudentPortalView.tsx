"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  X,
  Sparkles,
  ArrowRight,
  GraduationCap,
  CheckCircle2,
  Phone,
  Clock,
  HelpCircle,
  ChevronDown,
  ShieldAlert,
  Zap,
} from "lucide-react";
import { PORTAL_SERVICES, PORTAL_FAQS, PortalServiceCard } from "./portalData";
import { useLanguage } from "@/shared/i18n";

export const StudentPortalView: React.FC = () => {
  const { language, direction, t } = useLanguage();
  const isRTL = direction === "rtl";
  const portal = (t as any).portalPage;

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<
    "all" | "result" | "verify" | "admission" | "admit"
  >("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Filtered Cards
  const filteredServices = useMemo(() => {
    return PORTAL_SERVICES.filter((service) => {
      // 1. Category filter
      if (activeCategory !== "all" && service.category !== activeCategory) {
        return false;
      }

      // 2. Search query filter
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const cardInfo = portal?.cards?.[service.key];
        const title = (cardInfo?.title || "").toLowerCase();
        const desc = (cardInfo?.desc || "").toLowerCase();
        const tag = (cardInfo?.tag || "").toLowerCase();
        const features = (cardInfo?.features || []).join(" ").toLowerCase();

        if (!title.includes(q) && !desc.includes(q) && !tag.includes(q) && !features.includes(q)) {
          return false;
        }
      }

      return true;
    });
  }, [activeCategory, searchQuery, portal]);

  const categories = [
    { id: "all", label_ur: "تمام سروسز (5)", label_en: "All Services (5)", label_hi: "तमाम सर्विसेज (5)", label_ar: "جميع الخدمات (5)" },
    { id: "result", label_ur: "امتحانی رزلٹ و مارک شیٹ", label_en: "Exam Results", label_hi: "इम्तिहानी रिजल्ट", label_ar: "نتائج الامتحانات" },
    { id: "verify", label_ur: "سند ویریفیکیشن", label_en: "Sanad Verification", label_hi: "सनद वेरिफिकेशन", label_ar: "التحقق من الشهادات" },
    { id: "admission", label_ur: "انٹرنس داخلہ فارم", label_en: "Entrance Apply", label_hi: "एंट्रेंस दाखिला", label_ar: "طلب القبول" },
    { id: "admit", label_ur: "ایڈمٹ کارڈ ڈاؤنلوڈ", label_en: "Admit Card", label_hi: "एडमिट कार्ड", label_ar: "بطاقة الدخول" },
  ];

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* =========================================================================
          1. HERO HEADER SHOWCASE (Zero-Clipping Headroom for Urdu Script)
         ========================================================================= */}
      <section className="relative w-full pt-8 pb-6 sm:pt-12 sm:pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-400/10 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Top Session Live Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-purple-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-bold mb-3 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className={isRTL ? "font-urduBody leading-[1.8] py-0.5" : ""}>
              {portal?.sessionTag || "Academic Session 2026-27 Active"}
            </span>
            <span className="text-amber-500/60 font-bold">•</span>
            <span className={`text-amber-700 dark:text-amber-300 font-extrabold ${isRTL ? "font-urduBody leading-[1.8] py-0.5" : ""}`}>
              {language === "ur"
                ? "100% تک اسکالرشپ"
                : language === "hi"
                ? "100% तक स्कॉलरशिप"
                : language === "ar"
                ? "منحة دراسية تصل إلى 100%"
                : "Up to 100% Scholarship"}
            </span>
          </div>

          {/* Main Title (High Breathing Space - Zero Clipping for Urdu Kasheeda) */}
          <h1 className={`font-display font-black text-3xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-[#854D0E] via-[#D97706] to-[#B45309] dark:from-[#FFFBEB] dark:via-[#FBBF24] dark:to-[#F59E0B] bg-clip-text text-transparent drop-shadow-sm mb-2 ${
            isRTL
              ? "font-urduTitle leading-[2.1] sm:leading-[2.3] py-2 px-1 tracking-normal"
              : "tracking-tight leading-tight py-1"
          }`}>
            {portal?.title || (language === "ur" ? "طالبات پورٹل" : "Centralized Student Services Gateway")}
          </h1>

          {/* Subtitle */}
          <p className={`text-xs sm:text-base text-[#5C4A66] dark:text-[#C8BDCF] max-w-2xl mx-auto font-medium ${
            isRTL ? "font-urduBody leading-[2] sm:leading-[2.2] py-1" : "leading-relaxed"
          }`}>
            {portal?.subtitle ||
              "Access entrance registrations, admit cards, marksheet records, merit scorecards, and tamper-proof certificate verifications."}
          </p>

          {/* Instant Search Bar */}
          <div className="mt-5 sm:mt-7 max-w-xl mx-auto relative">
            <div className="relative flex items-center">
              <div
                className={`absolute ${
                  isRTL ? "right-4" : "left-4"
                } text-amber-600 dark:text-amber-400 pointer-events-none`}
              >
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  portal?.searchPlaceholder ||
                  (language === "ur"
                    ? "سروس تلاش کریں (مثلاً: رزلٹ، سند، داخلہ فارم، ایڈمٹ کارڈ)..."
                    : "Search by service (e.g. Results, Sanad, Entrance Form, Admit Card)...")
                }
                className={`w-full ${
                  isRTL ? "pr-12 pl-12 py-3.5 sm:py-4 font-urduBody leading-[2] text-sm" : "pl-12 pr-12 py-3.5 sm:py-4 text-xs sm:text-sm"
                } rounded-2xl glass-ultra border border-amber-500/30 dark:border-amber-500/20 font-semibold text-[#2D1F33] dark:text-white placeholder-[#8C7A96] dark:placeholder-[#A394AB] focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-lg transition-all`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className={`absolute ${
                    isRTL ? "left-4" : "right-4"
                  } p-1 rounded-full text-amber-700 dark:text-amber-300 hover:bg-black/5 dark:hover:bg-white/10`}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Filter Category Chips */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 flex-wrap mt-4">
            {categories.map((cat) => {
              const label =
                cat[`label_${language}` as keyof typeof cat] || cat.label_ur;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 ${
                    isRTL ? "font-urduBody leading-[1.8]" : ""
                  } ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white shadow-md shadow-amber-500/20 scale-[1.02]"
                      : "glass-item-card text-[#4A3B52] dark:text-[#C8BDCF] hover:border-amber-500/40 hover:text-amber-900 dark:hover:text-amber-200"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. SERVICE ACTION CARDS GRID (5 CORE STUDENT SERVICES)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 w-full">
        {filteredServices.length === 0 ? (
          <div className="p-10 rounded-3xl glass-ultra text-center border border-amber-500/20 max-w-md mx-auto">
            <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto mb-3 opacity-80" />
            <h3 className="text-base font-bold text-[#2D1F33] dark:text-white mb-1">
              {language === "ur" ? "کوئی سروس نہیں ملی" : language === "hi" ? "कोई सर्विस नहीं मिली" : "No matching service found"}
            </h3>
            <p className="text-xs text-[#6B5A73] dark:text-[#A394AB] mb-4">
              {language === "ur" ? "براہِ کرم دوسرے الفاظ کے ساتھ سرچ کریں یا فلٹر تبدیل کریں۔" : "Please try different keywords or reset your filters."}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold shadow-sm"
            >
              {language === "ur" ? "فلٹر ری سیٹ کریں" : "Reset Filter"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredServices.map((service) => {
              const Icon = service.icon;
              const cardInfo = portal?.cards?.[service.key];
              const title = cardInfo?.title || service.key;
              const desc = cardInfo?.desc || "";
              const tag = cardInfo?.tag || "Active";
              const btn = cardInfo?.btn || "Open Page";
              const features: string[] = cardInfo?.features || [];

              return (
                <div
                  key={service.id}
                  className={`group relative rounded-3xl glass-ultra p-5 sm:p-6 border border-black/5 dark:border-white/10 ${service.borderHover} transition-all duration-300 flex flex-col justify-between overflow-hidden`}
                >
                  {/* Top Subtle Color Accent Line */}
                  <div
                    className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${service.colorGradient}`}
                  />

                  {/* Card Header */}
                  <div>
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      {/* Gradient Icon Badge */}
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.colorGradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-1 transition-transform duration-300 shrink-0`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      {/* Tag Chip */}
                      <span
                        className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${service.badgeColor} shadow-xs truncate ${
                          isRTL ? "font-urduBody leading-[1.8] py-0.5" : ""
                        }`}
                      >
                        {tag}
                      </span>
                    </div>

                    {/* Title (Generous Breathing Space for Nastaleeq) */}
                    <h2 className={`font-display font-extrabold text-lg sm:text-xl text-[#2D1F33] dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors mb-2 ${
                      isRTL
                        ? "font-urduTitle leading-[1.9] sm:leading-[2] py-1 tracking-normal"
                        : "leading-tight tracking-tight"
                    }`}>
                      {title}
                    </h2>

                    {/* Description */}
                    <p className={`text-xs sm:text-[13px] text-[#5C4A66] dark:text-[#C8BDCF] mb-4 ${
                      isRTL ? "font-urduBody leading-[2] py-0.5" : "leading-relaxed"
                    }`}>
                      {desc}
                    </p>

                    {/* Feature Bullets */}
                    {features.length > 0 && (
                      <div className="flex flex-col gap-1.5 mb-5 pt-3 border-t border-black/5 dark:border-white/10">
                        {features.map((feat, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center gap-2 text-xs font-semibold text-[#4A3B52] dark:text-[#E2D9E7] ${
                              isRTL ? "font-urduBody leading-[1.8] py-0.5" : ""
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Button */}
                  <div className="pt-2">
                    <Link
                      href={service.route}
                      className={`group/btn relative w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r ${service.colorGradient} hover:opacity-95 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all duration-200 active:scale-[0.98] overflow-hidden ${
                        isRTL ? "font-urduTitle leading-[1.8] text-sm" : ""
                      }`}
                    >
                      {/* Shimmer Sweep Effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 pointer-events-none" />
                      <span>{btn}</span>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1 ${
                          isRTL ? "rotate-180 group-hover/btn:-translate-x-1" : ""
                        }`}
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* =========================================================================
          3. DIRECT HELPDESK & SUPPORT STRIP
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 w-full">
        <div className="rounded-3xl glass-ultra p-6 sm:p-8 border border-amber-500/25 bg-gradient-to-br from-amber-500/[0.08] via-transparent to-purple-500/[0.05] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Info */}
            <div className="lg:col-span-7 flex flex-col text-start">
              <div className={`inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1.5 ${
                isRTL ? "font-urduBody leading-[1.8]" : ""
              }`}>
                <Zap className="w-4 h-4" />
                <span>{language === "ur" ? "طالبات ہیلپ ڈیسک و رہنمائی" : language === "hi" ? "तालिबात हेल्पडेस्क व रहनुमाई" : "Student Support & Helpdesk"}</span>
              </div>
              <h3 className={`font-display font-extrabold text-lg sm:text-2xl text-[#2D1F33] dark:text-white mb-2 ${
                isRTL ? "font-urduTitle leading-[1.9] py-1" : ""
              }`}>
                {portal?.help?.title || (language === "ur" ? "طالبات سروسز میں کوئی مدد چاہیے؟" : "Need Assistance with Student Services?")}
              </h3>
              <p className={`text-xs sm:text-sm text-[#5C4A66] dark:text-[#C8BDCF] max-w-xl ${
                isRTL ? "font-urduBody leading-[2] py-0.5" : "leading-relaxed"
              }`}>
                {portal?.help?.desc ||
                  (language === "ur"
                    ? "داخلہ فارم، ایڈمٹ کارڈ یا رزلٹ سے متعلق کسی بھی سوال یا رہنمائی کے لیے ہمارے ہیلپ ڈیسک سے رابطہ کریں۔"
                    : "Our dedicated student helpdesk is available to assist you with registration, admit cards, or result queries.")}
              </p>
              <div className="flex items-center gap-2 text-xs text-[#8C7A96] dark:text-[#A394AB] mt-3 font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span className={isRTL ? "font-urduBody leading-[1.8]" : ""}>
                  {portal?.help?.timings || (language === "ur" ? "پیر تا ہفتہ: صبح 9 بجے سے شام 5 بجے تک" : "Mon - Sat: 9:00 AM - 5:00 PM IST")}
                </span>
              </div>
            </div>

            {/* Right: Direct Action Badges */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-2.5">
              {/* Helpline Call Button */}
              <a
                href="tel:+917080654147"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white/80 dark:bg-white/5 border border-amber-500/30 hover:border-amber-500 text-[#2D1F33] dark:text-white font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-[0.98] group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-start">
                    <span className={`text-[10px] text-[#8C7A96] dark:text-[#A394AB] font-normal ${isRTL ? "font-urduBody" : ""}`}>
                      {language === "ur" ? "ہیلپ لائن پر کال کریں" : language === "hi" ? "हेल्पलाइन पर कॉल करें" : "Call Helpline"}
                    </span>
                    <span dir="ltr">+91 70806 54147</span>
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 text-amber-500 ${isRTL ? "rotate-180" : ""}`} />
              </a>

              {/* WhatsApp Support Button */}
              <a
                href="https://wa.me/917080654147"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-500 text-emerald-950 dark:text-emerald-200 font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-[0.98] group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-start">
                    <span className={`text-[10px] text-emerald-700/80 dark:text-emerald-400 font-normal ${isRTL ? "font-urduBody" : ""}`}>
                      {language === "ur" ? "آفیشل واٹس ایپ ہیلپ" : language === "hi" ? "ऑफिशियल व्हाट्सएप हेल्प" : "Official WhatsApp Help"}
                    </span>
                    <span className={isRTL ? "font-urduBody text-xs" : "text-xs"}>
                      {language === "ur" ? "ہیلپ ڈیسک سے براہِ راست چیٹ کریں" : language === "hi" ? "हेल्पडेस्क से सीधे चैट करें" : "Direct Chat with Desk"}
                    </span>
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 text-emerald-600 ${isRTL ? "rotate-180" : ""}`} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. STUDENT FAQS SECTION
         ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
        <div className="text-center mb-5">
          <div className={`inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1 ${
            isRTL ? "font-urduBody" : ""
          }`}>
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{language === "ur" ? "عام سوالات" : "FAQs"}</span>
          </div>
          <h3 className={`font-display font-extrabold text-xl sm:text-2xl text-[#2D1F33] dark:text-white ${
            isRTL ? "font-urduTitle leading-[1.9] py-1" : ""
          }`}>
            {language === "ur"
              ? "طالبات سروسز کے متعلق عام سوالات"
              : language === "hi"
              ? "तालिबात सर्विसेज के जरूरी सवालात"
              : "Frequently Asked Questions"}
          </h3>
        </div>

        <div className="flex flex-col gap-3">
          {PORTAL_FAQS.map((faq, index) => {
            const q = faq[`q_${language}` as keyof typeof faq] || faq.q_ur;
            const a = faq[`a_${language}` as keyof typeof faq] || faq.a_ur;
            const isOpen = openFaq === index;

            return (
              <div
                key={index}
                className="rounded-2xl glass-ultra border border-black/5 dark:border-white/10 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className={`w-full flex items-center justify-between p-4 text-start text-xs sm:text-sm font-bold text-[#2D1F33] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors gap-3 ${
                    isRTL ? "font-urduBody leading-[1.9] py-3" : ""
                  }`}
                >
                  <span>{q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className={`px-4 pb-4 pt-1 text-xs sm:text-[13px] text-[#5C4A66] dark:text-[#C8BDCF] border-t border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] ${
                    isRTL ? "font-urduBody leading-[2.1] py-3" : "leading-relaxed"
                  }`}>
                    {a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
