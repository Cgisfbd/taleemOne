"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import {
  X,
  Download,
  Calendar,
  Layers,
  Sparkles,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  ImageOff,
} from "lucide-react";
import { useLanguage } from "@/shared/i18n";

export interface GalleryItem {
  id: string;
  src: string;
  title: {
    ur: string;
    en: string;
    hi: string;
    ar: string;
  };
  category: "Campus" | "Classroom" | "Hostel" | "Events" | "Library" | "Tarbiyah";
  date: string;
}

const GALLERY_DATA: GalleryItem[] = [
  {
    id: "g1",
    src: "/images/slides/slide1.jpg",
    title: {
      ur: "جامعہ برکاتِ حرم کا مرکزی کیمپس و سرسبز احاطہ",
      en: "Main Campus View & Central Green Quadrangle",
      hi: "जामिया बरकात-ए-हरम का मुख्य कैम्पस व हरा-भरा अहाता",
      ar: "المبنى الرئيسي للحرم الجامعي والحدائق المحيطة",
    },
    category: "Campus",
    date: "2026",
  },
  {
    id: "g2",
    src: "/images/slides/slide2.jpg",
    title: {
      ur: "جدید انٹرایکٹو ڈیجیٹل اسمارٹ پینل کلاس روم",
      en: "Interactive Digital Smart Panel Classroom",
      hi: "जदीद इंटरएक्टिव डिजिटल स्मार्ट पैनल क्लासरूम",
      ar: "القاعات الدراسية الذكية المزودة بشاشات تفاعلية",
    },
    category: "Classroom",
    date: "2026",
  },
  {
    id: "g3",
    src: "/images/slides/slide3.jpg",
    title: {
      ur: "مرکزی اسلامی لائبریری و ڈیجیٹل ریسرچ سیکشن",
      en: "Central Islamic Library & Digital Research Section",
      hi: "मरकज़ी इस्लामी लाइब्रेरी व डिजिटल रिसर्च सेक्शन",
      ar: "المكتبة المركزية وقسم البحوث والدراسات الإسلامية",
    },
    category: "Library",
    date: "2026",
  },
  {
    id: "g4",
    src: "/images/slides/slide4.jpg",
    title: {
      ur: "شعبہ حفظ و تجوید اور آڈیو وژول لیب",
      en: "Hifz & Tajweed Auditory Learning Lab",
      hi: "शोबा-ए-हिफ़्ज़ व तजवीद और ऑडियो-विज़ुअल लैब",
      ar: "مختبر تحفيظ القرآن الكريم وأحكام التجويد والقراءات",
    },
    category: "Classroom",
    date: "2026",
  },
  {
    id: "g5",
    src: "/images/slides/slide5.jpg",
    title: {
      ur: "سالانہ تقریبِ تقسیمِ اسناد و دستارِ فضیلت",
      en: "Annual Convocation & Graduation Ceremony",
      hi: "सालाना तक़रीब-ए-तक़सीम-ए-असनाद व दस्तार-ए-फ़ज़ीलत",
      ar: "حفل التخرج السنوي وتوزيع الشهادات والإجازات",
    },
    category: "Events",
    date: "2026",
  },
  {
    id: "g6",
    src: "/images/slides/slide1.jpg",
    title: {
      ur: "محفوظ اور پُرسکون ہاسٹل رہائشی کیمپس",
      en: "Safe & Peaceful Residential Girls Hostel",
      hi: "महफ़ूज़ और पुरसुकून हॉस्टल रिहाइशी कैम्पस",
      ar: "مجمع السكن الداخلي الآمن والمريح للطالبات",
    },
    category: "Hostel",
    date: "2026",
  },
  {
    id: "g7",
    src: "/images/slides/slide2.jpg",
    title: {
      ur: "سیرت النبی ﷺ کوئز و بزمِ ادب خطابت مقابلہ",
      en: "Seerat-un-Nabi Speech & Islamic Quiz Contest",
      hi: "सीरत-उन-नबी ﷺ क्विज़ व बज़्म-ए-अदब ख़िताबत मुक़ाबला",
      ar: "مسابقة السيرة النبوية والخطابة الأدبية للبنات",
    },
    category: "Events",
    date: "2026",
  },
  {
    id: "g8",
    src: "/images/slides/slide3.jpg",
    title: {
      ur: "تین روزہ 'تدریب المعلمات' خصوصی تربیتی ورکشاپ",
      en: "3-Day 'Tadreeb-ul-Muallimaat' Pedagogical Workshop",
      hi: "तीन रोज़ा 'तदरीबुल मुअल्लिमात' विशेष वर्कशॉप",
      ar: "ورشة عمل 'تدريب المعلمات' الأكاديمية والتربوية",
    },
    category: "Tarbiyah",
    date: "2026",
  },
  {
    id: "g9",
    src: "/images/slides/slide4.jpg",
    title: {
      ur: "کیمپس گرین لان و پرفضا تعلیمی ماحول",
      en: "Serene Campus Lawns & Academic Ambience",
      hi: "कैम्पस ग्रीन लॉन व पुरफ़ज़ा तालीमी माहौल",
      ar: "المساحات الخضراء والبيئة التعليمية الهادئة",
    },
    category: "Campus",
    date: "2026",
  },
  {
    id: "g10",
    src: "/images/slides/slide5.jpg",
    title: {
      ur: "طالبات کا کشادہ طعام گاہ اور ڈائننگ ہال",
      en: "Spacious Student Dining Hall & Kitchen",
      hi: "तालिबात का कुशादा तआमगाह और डाइनिंग हॉल",
      ar: "صالة الإطعام المجهزة وقاعة الطعام المركزية",
    },
    category: "Hostel",
    date: "2026",
  },
  {
    id: "g11",
    src: "/images/slides/slide1.jpg",
    title: {
      ur: "اسلامی خطاطی و فنونِ لطیفہ کی سالانہ نمائش",
      en: "Islamic Calligraphy & Sacred Arts Showcase",
      hi: "इस्लामी ख़त्ताती व फ़नून-ए-लतीफ़ा की सालाना नुमाइश",
      ar: "معرض فن الخط العربي والزخرفة الإسلامية",
    },
    category: "Tarbiyah",
    date: "2026",
  },
  {
    id: "g12",
    src: "/images/slides/slide3.jpg",
    title: {
      ur: "نادر قرآنی مخطوطات و کتبِ تفاسیر گیلری",
      en: "Rare Quranic Manuscripts & Tafseer Archives",
      hi: "नादिर क़ुरआनी मख़तूतात व कुतुब-ए-तफ़ासीर गैलरी",
      ar: "مخطوطات قرآنية نادرة وقسم أمهات كتب التفسير",
    },
    category: "Library",
    date: "2026",
  },
];

export const GalleryView: React.FC = () => {
  const { t, language } = useLanguage();
  const gp = (t as any).galleryPage || {};

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Lock body scroll when lightbox is active
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxIndex]);

  // Categories list
  const categories = useMemo(() => [
    { key: "All", label: gp.filterAll || "تمام تصاویر" },
    { key: "Campus", label: gp.filterCampus || "کیمپس" },
    { key: "Classroom", label: gp.filterClassroom || "کلاس رومز" },
    { key: "Hostel", label: gp.filterHostel || "ہاسٹل" },
    { key: "Events", label: gp.filterEvents || "تقاریب" },
    { key: "Library", label: gp.filterLibrary || "لائبریری" },
    { key: "Tarbiyah", label: gp.filterTarbiyah || "تربیت" },
  ], [gp]);

  // Fast Memoized filtering
  const filteredPhotos = useMemo(() => {
    if (activeCategory === "All") return GALLERY_DATA;
    return GALLERY_DATA.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Handle keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;

      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredPhotos.length : null
        );
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null
            ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length
            : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);

  const activePhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  const getItemTitle = useCallback((item: GalleryItem) => {
    if (language === "ur") return item.title.ur;
    if (language === "hi") return item.title.hi;
    if (language === "ar") return item.title.ar;
    return item.title.en;
  }, [language]);

  return (
    <section className="relative w-full py-5 sm:py-7 px-3 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* =========================================================================
            1. SECTION HEADER
           ========================================================================= */}
        <div className="flex flex-col items-center text-center mb-4 sm:mb-5">
          {/* Glowing Mini Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-900 dark:text-purple-300 text-xs font-black shadow-xs mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>{gp.badge || "🖼️ تصویری جھلکیاں • کیمپس گیلری"}</span>
          </div>

          {/* Main Section Title */}
          <h1 className="font-display font-extrabold text-xl sm:text-2xl lg:text-3xl tracking-tight text-[#1E1128] dark:text-[#FAF6FC] mb-1">
            {gp.title || "گیلری"}
          </h1>

          {/* Section Subtitle */}
          <p className="text-xs sm:text-sm text-[#6B5A73] dark:text-[#C8BDCF] max-w-xl leading-relaxed">
            {gp.subtitle ||
              "جامعہ برکاتِ حرم کے کیمپس، اسمارٹ کلاس رومز، ہاسٹل، تقاریب اور تعلیمی سرگرمیوں کی تصویری جھلکیاں۔"}
          </p>
        </div>

        {/* =========================================================================
            2. DEDICATED SEPARATE CATEGORY BUTTONS CARD
           ========================================================================= */}
        <div className="rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 mb-4 bg-white dark:bg-[#181126] border border-purple-500/20 dark:border-purple-400/20 shadow-md flex items-center justify-between gap-3 overflow-hidden">
          {/* Category Filter Chips */}
          <div className="w-full sm:w-auto flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-colors duration-150 cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500 via-amber-600 to-rose-600 text-white shadow-xs"
                      : "bg-black/5 dark:bg-white/[0.06] text-[#5C4A66] dark:text-[#C8BDCF] hover:bg-black/10 dark:hover:bg-white/10 hover:text-[#1E1128] dark:hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Counter & Reset Badge (Desktop & Tablet) */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#6B5A73] dark:text-[#A898B0] shrink-0">
            <span>
              {gp.showing || "دکھائے جا رہے ہیں"}:{" "}
              <strong className="text-purple-700 dark:text-purple-300 font-bold">
                {filteredPhotos.length}
              </strong>{" "}
              {gp.itemsCount || "تصاویر"}
            </span>

            {activeCategory !== "All" && (
              <button
                onClick={() => setActiveCategory("All")}
                className="inline-flex items-center gap-0.5 text-purple-700 dark:text-purple-300 hover:underline cursor-pointer font-bold text-[11px]"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>{gp.resetFilter || "تمام"}</span>
              </button>
            )}
          </div>
        </div>

        {/* =========================================================================
            3. MAIN PHOTOS GRID CARD CONTAINER
           ========================================================================= */}
        <div className="rounded-3xl p-3.5 sm:p-5 lg:p-6 bg-white dark:bg-[#181126] border border-purple-500/20 dark:border-purple-400/20 shadow-xl relative overflow-hidden">
          
          {/* Top Brand Accent Line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 via-amber-400 to-purple-600 opacity-60" />

          {/* Mobile Counter Strip */}
          <div className="flex sm:hidden items-center justify-between pb-2.5 mb-3 border-b border-dashed border-purple-500/15 dark:border-purple-400/15 text-xs font-semibold text-[#6B5A73] dark:text-[#A898B0]">
            <span>
              {gp.showing || "دکھائے جا رہے ہیں"}:{" "}
              <strong className="text-purple-700 dark:text-purple-300 font-bold">
                {filteredPhotos.length}
              </strong>{" "}
              {gp.itemsCount || "تصاویر"}
            </span>

            {activeCategory !== "All" && (
              <button
                onClick={() => setActiveCategory("All")}
                className="inline-flex items-center gap-0.5 text-purple-700 dark:text-purple-300 hover:underline cursor-pointer font-bold text-[11px]"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>{gp.resetFilter || "تمام"}</span>
              </button>
            )}
          </div>

          {/* =========================================================================
              3. HIGH-PERFORMANCE PHOTO GRID (Optimized Next.js Images)
             ========================================================================= */}
          {filteredPhotos.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
              {filteredPhotos.map((item, index) => {
                const title = getItemTitle(item);

                return (
                  <article
                    key={item.id}
                    onClick={() => setLightboxIndex(index)}
                    tabIndex={0}
                    role="button"
                    aria-label={title}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setLightboxIndex(index);
                      }
                    }}
                    className="group relative rounded-xl sm:rounded-2xl p-2 sm:p-2.5 bg-[#FAF8F5] dark:bg-[#1F172B] text-[#1E1128] dark:text-[#FAF6FC] shadow-xs hover:shadow-md hover:border-purple-400/50 transition-shadow duration-150 cursor-pointer flex flex-col justify-between border border-[#E8DFC8] dark:border-[#38264C]"
                  >
                    {/* Next.js Optimized Image Thumbnail */}
                    <div className="relative w-full aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 mb-1.5">
                      <Image
                        src={item.src}
                        alt={title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                      />

                      {/* Hover Zoom Icon */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center pointer-events-none">
                        <div className="w-7 h-7 rounded-full bg-white/95 text-[#1E1128] flex items-center justify-center shadow-md">
                          <ZoomIn className="w-3.5 h-3.5 text-purple-700" />
                        </div>
                      </div>
                    </div>

                    {/* Caption Strip */}
                    <div className="flex flex-col justify-between">
                      {/* Photo Title */}
                      <h3 className="font-display font-extrabold text-[10.5px] sm:text-[12px] text-[#1E1128] dark:text-[#FAF6FC] group-hover:text-purple-700 dark:group-hover:text-amber-300 tracking-tight leading-snug line-clamp-1 mb-1 transition-colors">
                        {title}
                      </h3>

                      {/* Tags & Date Row */}
                      <div className="flex items-center justify-between pt-1 border-t border-dashed border-[#D5C7A3] dark:border-[#4A3266] text-[9px] sm:text-[10px]">
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-[#EDE2C4] dark:bg-purple-950/60 text-amber-950 dark:text-purple-200 font-bold shadow-2xs">
                          <Layers className="w-2.5 h-2.5" />
                          <span>{item.category}</span>
                        </span>

                        <div className="flex items-center gap-0.5 font-semibold text-[#7C6340] dark:text-[#B5A4C7]">
                          <Calendar className="w-2.5 h-2.5 text-amber-600 dark:text-amber-400" />
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="rounded-2xl p-6 text-center bg-black/[0.02] dark:bg-white/[0.02] border border-dashed border-black/10 dark:border-white/10 max-w-sm mx-auto">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto mb-2 shadow-2xs">
                <ImageOff className="w-4 h-4" />
              </div>
              <h3 className="font-display font-extrabold text-sm text-[#1E1128] dark:text-[#FAF6FC] mb-0.5">
                {gp.noPhotosFound || "کوئی تصویر نہیں ملی۔"}
              </h3>
              <p className="text-xs text-[#6B5A73] dark:text-[#C8BDCF] mb-2.5">
                {gp.noPhotosDesc || "براہِ کرم فلٹر تبدیل کریں۔"}
              </p>
              <button
                onClick={() => setActiveCategory("All")}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-900 text-white text-xs font-bold shadow-md cursor-pointer hover:scale-[1.02] transition-transform"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{gp.resetFilter || "تمام تصاویر دکھائیں"}</span>
              </button>
            </div>
          )}

        </div>

      </div>

      {/* =========================================================================
          4. 🔎 THEME-MATCHED LIGHTBOX MODAL
         ========================================================================= */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          {/* Modal Content */}
          <div
            className="relative max-w-3xl w-full max-h-[90vh] rounded-3xl bg-[#FAF8F5] dark:bg-[#181126] border-2 border-purple-500/25 dark:border-purple-400/25 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150 text-[#1E1128] dark:text-[#FAF6FC]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Brand Gradient Accent Bar */}
            <div className="h-1.5 bg-gradient-to-r from-purple-600 via-amber-400 to-purple-700" />

            {/* Header Strip */}
            <div className="p-3.5 sm:p-4 border-b border-purple-500/10 dark:border-white/10 flex items-center justify-between gap-3 bg-white/70 dark:bg-white/[0.02]">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-[11px] font-bold shrink-0">
                  <Layers className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  <span>{activePhoto.category}</span>
                </span>
                <span className="text-[#8B7A94] dark:text-white/30 shrink-0">•</span>
                <h3 className="text-xs sm:text-sm font-extrabold text-[#1E1128] dark:text-[#FAF6FC] truncate">
                  {getItemTitle(activePhoto)}
                </h3>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 flex items-center justify-center text-[#5C4A66] dark:text-[#C8BDCF] transition-colors shrink-0 cursor-pointer"
                title={gp.closePreview || "بند کریں"}
                aria-label="Close preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* High-Res Photo Body with Nav Arrows */}
            <div className="relative flex-1 overflow-hidden p-3 sm:p-5 flex items-center justify-center bg-[#F3EFEA]/80 dark:bg-black/35 min-h-[280px]">
              
              {/* Prev Button */}
              {filteredPhotos.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) =>
                      prev !== null
                        ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length
                        : null
                    );
                  }}
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 z-20 cursor-pointer"
                  title="Previous photo"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Main Photo Display */}
              <div className="relative max-h-[62vh] w-full h-[50vh] flex items-center justify-center">
                <Image
                  src={activePhoto.src}
                  alt={getItemTitle(activePhoto)}
                  fill
                  sizes="100vw"
                  className="object-contain rounded-2xl shadow-xl select-none"
                  priority
                />
              </div>

              {/* Next Button */}
              {filteredPhotos.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) =>
                      prev !== null ? (prev + 1) % filteredPhotos.length : null
                    );
                  }}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 z-20 cursor-pointer"
                  title="Next photo"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Footer Action Strip */}
            <div className="p-3 sm:p-4 border-t border-purple-500/10 dark:border-white/10 flex items-center justify-between bg-white/70 dark:bg-white/[0.02] gap-3">
              <div className="flex items-center gap-2 text-xs text-[#6B5A73] dark:text-[#A898B0]">
                <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>{activePhoto.date}</span>
                <span>•</span>
                <span>
                  {lightboxIndex !== null ? lightboxIndex + 1 : 1} / {filteredPhotos.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Direct Download Anchor Button */}
                <a
                  href={activePhoto.src}
                  download={`jamia-barkat-e-haram-${activePhoto.id}.jpg`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-900 hover:from-purple-800 hover:to-indigo-950 text-white text-xs font-bold shadow-md cursor-pointer transition-transform hover:scale-[1.02]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{gp.downloadPhoto || "ڈاؤن لوڈ تصویر"}</span>
                </a>

                {/* Close Button */}
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="px-4 py-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-[#1E1128] dark:text-[#FAF6FC] text-xs font-bold transition-colors cursor-pointer"
                >
                  {gp.closePreview || "بند کریں"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
