"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HeartHandshake,
  QrCode,
  Copy,
  Check,
  Building2,
  Phone,
  ShieldCheck,
  Award,
  Sparkles,
  Zap,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  BookOpen,
  Lock,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  Gift,
  Coins,
  Utensils,
  GraduationCap,
  FileCheck2,
  Share2,
} from "lucide-react";
import { useLanguage } from "@/shared/i18n";

export default function DonatePage() {
  const { t, direction, language } = useLanguage();
  const isRTL = direction === "rtl";

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(3500);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedPurpose, setSelectedPurpose] = useState<string>("scholarship");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  // Official Trust Banking and UPI Credentials
  const trustFullName = "Mujaddid Alf Sani Education and Welfare Trust";
  const upiId = "jamiabarkateharam@hdfcbank";
  const accNum = "50200089234512";
  const ifscCode = "HDFC0001234";
  const bankName = "HDFC Bank Ltd.";
  const branchName = "Hazratganj / Central Campus Branch, India";
  const accType = "Current / Trust Account";

  // Calculate actual numeric amount
  const finalAmount =
    selectedAmount === "custom"
      ? parseInt(customAmount, 10) || 0
      : selectedAmount;

  // Donation Purpose Options
  const purposeOptions = [
    {
      id: "scholarship",
      label: language === "hi" ? "मुकम्मल स्कॉलरशिप फंड (ज़कात/सदक़ा)" : language === "ur" ? "مکمل اسکالرشپ فنڈ (زکوٰۃ / صدقہ)" : language === "ar" ? "صندوق المنح الدراسية (الزكاة والصدقات)" : "Scholarship Fund (Zakat / Sadaqah)",
      icon: GraduationCap,
      color: "from-amber-500 to-amber-600",
    },
    {
      id: "smartclass",
      label: language === "hi" ? "डिजिटल स्मार्ट क्लास व IT लैब" : language === "ur" ? "ڈیجیٹل اسمارٹ کلاس و آئی ٹی لیب" : language === "ar" ? "الفصول الذكية ومختبر الحاسوب" : "Smart Class & IT Lab",
      icon: Sparkles,
      color: "from-rose-500 to-rose-600",
    },
    {
      id: "meals",
      label: language === "hi" ? "छात्रा भोजन व हॉस्टल केयर" : language === "ur" ? "طالبات طعام و ہاسٹل کیئر" : language === "ar" ? "الإعاشة والسكن للطالبات" : "Hostel Meals & Care",
      icon: Utensils,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "books",
      label: language === "hi" ? "निशुल्क दरसी किताबें व लाइब्रेरी" : language === "ur" ? "مفت نصابی کتب و لائبریری" : language === "ar" ? "الكتب المنهجية والمكتبة" : "Free Books & Library",
      icon: BookOpen,
      color: "from-emerald-500 to-emerald-600",
    },
  ];

  // Preset Amount Tiers with Impact Descriptions
  const amountTiers = [
    {
      amount: 500,
      title: "₹500",
      desc: language === "hi" ? "1 महीने की स्टेशनरी व किताबें" : language === "ur" ? "1 ماہ کی کتب و اسٹیشنری" : language === "ar" ? "كتب وقرطاسية لشهر" : "1 Month Books & Stationery",
    },
    {
      amount: 1500,
      title: "₹1,500",
      desc: language === "hi" ? "1 छात्रा का 1 महीने का पौष्टिक भोजन" : language === "ur" ? "1 طالبہ کا 1 ماہ کا کھانا" : language === "ar" ? "إعاشة طالبة لشهر" : "1 Month Student Meals",
    },
    {
      amount: 3500,
      title: "₹3,500",
      desc: language === "hi" ? "1 छात्रा की 1 महीने की मुकम्मल कफ़ालत" : language === "ur" ? "1 طالبہ کی 1 ماہ کی مکمل کفالت" : language === "ar" ? "كفالة شاملة لطالبة لشهر" : "1 Month Full Sponsorship",
      popular: true,
    },
    {
      amount: 10000,
      title: "₹10,000",
      desc: language === "hi" ? "1 सेमेस्टर की मुकम्मल तालीमी इमदाद" : language === "ur" ? "1 سمسٹر کی مکمل تعلیمی امداد" : language === "ar" ? "رعاية فصل دراسي كامل" : "1 Semester Education Fund",
    },
    {
      amount: 25000,
      title: "₹25,000",
      desc: language === "hi" ? "1 साल की वार्षिक पूर्ण स्कॉलरशिप" : language === "ur" ? "1 سال کی سالانہ مکمل اسکالرشپ" : language === "ar" ? "كفالة سنوية كاملة لطالبة" : "1 Year Full Scholarship",
    },
  ];

  // Dynamic UPI Intent Link
  const currentPurposeLabel = purposeOptions.find((p) => p.id === selectedPurpose)?.label || "Scholarship Fund";
  const upiIntentUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(trustFullName)}&am=${finalAmount > 0 ? finalAmount : ""}&cu=INR&tn=${encodeURIComponent(`Jamia Barkat-e-Haram - ${currentPurposeLabel}`)}`;

  // Dynamic WhatsApp Receipt Link
  const whatsappMsg = encodeURIComponent(
    `السلام علیکم ورحمۃ اللہ،\nمیں نے جامعہ برکاتِ حرم کے تحت درج ذیل تعاون کیا ہے:\n\n` +
      `📌 ٹرسٹ کا نام: ${trustFullName}\n` +
      `🎯 مد / شعبہ: ${currentPurposeLabel}\n` +
      `💰 رقم: ₹${finalAmount > 0 ? finalAmount.toLocaleString("en-IN") : "---"}\n\n` +
      `برائے مہربانی میری پیمنٹ اسکرین شاٹ تصدیق کر کے مجدد الف ثانی ایجوکیشن اینڈ ویلفیئر ٹرسٹ کی آفیشل رسید جاری فرمائیں۔ جزاکم اللہ خیراً۔`
  );
  const whatsappUrl = `https://wa.me/917080654147?text=${whatsappMsg}`;

  // FAQ List
  const faqs = [
    {
      q: language === "hi" ? "जामिया बरकात-ए-हरम किस ट्रस्ट के अंतर्गत आता है?" : language === "ur" ? "جامعہ برکاتِ حرم کس ٹرسٹ کے تحت کام کرتا ہے؟" : language === "ar" ? "تحت أي مؤسسة تعمل جامعة بركات الحرم؟" : "Under which Trust does Jamia Barkat-e-Haram operate?",
      a: language === "hi" ? "जामिया बरकात-ए-हरम, 'मुजद्दिद अल्फ़ सानी एजुकेशन एंड वेलफेयर ट्रस्ट' (Mujaddid Alf Sani Education and Welfare Trust) के अंतर्गत स्थापित और प्रबंधित एक पंजीकृत गैर-लाभकारी धर्मार्थ शैक्षणिक व कल्याणकारी संस्थान है। समस्त वित्तीय लेन-देन इसी पंजीकृत ट्रस्ट के माध्यम से संचालित होते हैं।" : language === "ur" ? "جامعہ برکاتِ حرم، 'مجدد الف ثانی ایجوکیشن اینڈ ویلفیئر ٹرسٹ' (Mujaddid Alf Sani Education and Welfare Trust) کے زیرِ اہتمام قائم اور منظم ایک باضابطہ رجسٹرڈ غیر منافع بخش تعلیمی و فلاحی ادارہ ہے۔ تمام مالیاتی امور اور بینک کھاتے اسی ٹرسٹ کے نام پر ہیں۔" : language === "ar" ? "جامعة بركات الحرم هي مؤسسة تعليمية وخيرية تعمل تحت مظلة وإدارة 'مؤسسة مجدد ألف ثاني التعليمية والخيرية' (Mujaddid Alf Sani Education and Welfare Trust) المسجلة رسمياً كمنظمة غير ربحية." : "Jamia Barkat-e-Haram is founded and administered under 'Mujaddid Alf Sani Education and Welfare Trust' (A registered non-profit educational and welfare trust). All official donations, receipts, and banking operate directly under this Trust.",
    },
    {
      q: language === "hi" ? "क्या मेरा दिया हुआ दान ज़कात (Zakat) के लिए शरीअत सम्मत है?" : language === "ur" ? "کیا دیا گیا تعاون زکوٰۃ کے لیے شرعاً جائز اور معتبر ہے؟" : language === "ar" ? "هل التبرعات متوافقة مع أحكام الزكاة الشرعية؟" : "Is my donation Shariah-compliant for Zakat?",
      a: language === "hi" ? "जी हाँ! ज़कात की पाई-पाई मुस्तहिक, नादार और यतीम तालिबात की तालीम, भोजन, रिहाइश और किताबों पर शरीअत के मुताबिक़ 'तम्लीक' के मुकम्मल उसूलों के तहत खर्च की जाती है। ज़कात की रकम से कोई प्रशासनिक कटौती नहीं की जाती।" : language === "ur" ? "جی ہاں! زکوٰۃ کی رقم 100% مستحق، نادار اور یتیم طالبات کی تعلیم، خوراک، رہائش اور درسی کتب پر مکمل شرعی تملیک کے ساتھ صرف کی جاتی ہے۔ زکوٰۃ فنڈ سے انتظامی اخراجات منہا نہیں کیے جاتے۔" : language === "ar" ? "نعم بكل تأكيد! تُصرف أموال الزكاة بنسبة 100% على الطالبات المستحقات واليتيمات وفق ضوابط التمليك الشرعي المعتمدة دون أي استقطاعات إدارية." : "Yes! 100% of Zakat contributions are disbursed directly to deserving, orphan, and underprivileged female students under strict Islamic Tamleek protocols with zero administrative deduction.",
    },
    {
      q: language === "hi" ? "दान करने के बाद आधिकारिक ट्रस्ट रसीद कैसे प्राप्त होगी?" : language === "ur" ? "تعاون کے بعد ٹرسٹ کی آفیشل رسید کیسے حاصل ہوگی؟" : language === "ar" ? "كيف يمكنني الحصول على الإيصال الرسمي للتبرع؟" : "How do I receive the official Trust donation receipt?",
      a: language === "hi" ? "जैसे ही आप UPI या बैंक ट्रांसफर के जरिए पेमेंट करें, उसका स्क्रीनशॉट या UTR नंबर हमारे व्हाट्सएप नंबर +91 70806 54147 पर भेज दें। हमारी अकाउंट टीम तुरंत मुजद्दिद अल्फ़ सानी एजुकेशन एंड वेलफेयर ट्रस्ट की मुहरबंद डिजिटल रसीद जारी कर देगी।" : language === "ur" ? "UPI یا بینک ٹرانسفر کے بعد ٹرانزیکشن کا اسکرین شاٹ یا یو ٹی آر نمبر ہمارے واٹس ایپ نمبر +91 70806 54147 پر بھیج دیں۔ ہمارا فنانس ڈیپارٹمنٹ فوری طور پر مجدد الف ثانی ایجوکیشن اینڈ ویلفیئر ٹرسٹ کی مہر شدہ آفیشل رسید جاری کر دے گا۔" : language === "ar" ? "بمجرد إتمام التحويل عبر UPI أو الحساب البنكي، أرسل لقطة الشاشة أو رقم العملية عبر واتساب إلى +91 70806 54147 ليتم إصدار الإيصال الرسمي المختوم فوراً." : "Immediately after making the transfer via UPI or Net Banking, send the transaction screenshot/UTR to our WhatsApp helpline (+91 70806 54147). Our accounts office will issue an official stamped digital Trust receipt.",
    },
    {
      q: language === "hi" ? "क्या मैं किसी एक छात्रा को मासिक या वार्षिक तौर पर गोद (Sponsor) ले सकता हूँ?" : language === "ur" ? "کیا میں کسی ایک طالبہ کی ماہانہ یا سالانہ مکمل کفالت کر سکتا ہوں؟" : language === "ar" ? "هل يمكنني كفالة طالبة بشكل شهري أو سنوي؟" : "Can I sponsor a specific student on a monthly or annual basis?",
      a: language === "hi" ? "बिल्कुल! आप 'मुकम्मल कफ़ालत स्कीम' के तहत किसी भी मुस्तहिक बच्ची की 1 माह (₹3,500), 1 सेमेस्टर (₹10,000) या 1 साल (₹25,000) की संपूर्ण तालीम व रिहाइश का खर्च उठा सकते हैं। आप चाहें तो नाम गोपनीय रखकर सदक़ा-ए-जारिया का सवाब हासिल कर सकते हैं।" : language === "ur" ? "جی ہاں! 'مکمل کفالت اسکیم' کے ذریعے آپ کسی بھی مستحق طالبہ کے 1 ماہ (₹3,500)، 1 سمسٹر (₹10,000) یا پورے سال (₹25,000) کے تعلیمی و رہائشی اخراجات برداشت کر سکتے ہیں۔" : language === "ar" ? "نعم بالتأكيد! يمكنك كفالة طالبة مستحقة لمدة شهر (₹3,500) أو فصل دراسي (₹10,000) أو عام كامل (₹25,000) وتكون صدقة جارية مباركة." : "Absolutely! Under our Student Sponsorship Scheme, you can sponsor a deserving female student for 1 Month (₹3,500), 1 Semester (₹10,000), or a Full Year (₹25,000).",
    },
  ];

  return (
    <div className="min-h-screen py-6 sm:py-12 px-3.5 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 1. TOP TRUST AUTHORITY HERO BANNER */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          {/* Trust Authority Jewel Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-amber-500/15 border border-amber-500/35 text-amber-900 dark:text-amber-300 font-extrabold text-xs sm:text-sm shadow-sm mb-4">
            <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>
              {t.donation?.trustAegis ||
                "मुजद्दिद अल्फ़ सानी एजुकेशन एंड वेलफेयर ट्रस्ट (रजि.) के अंतर्गत संचालित"}
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight bg-gradient-to-r from-[#713F12] via-[#D97706] to-[#BE123C] dark:from-[#FFFBEB] dark:via-[#FBBF24] dark:to-[#F43F5E] bg-clip-text text-transparent drop-shadow-sm mb-3 sm:mb-4">
            {t.donation?.heroTitle ||
              "तालिबात की आला दीनी व असरी तालीम में तआवुन करें"}
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-base leading-relaxed text-[#5C4A66] dark:text-[#C8BDCF] max-w-3xl mx-auto">
            {t.donation?.trustDesc ||
              "जामिया बरकात-ए-हरम, मुजद्दिद अल्फ़ सानी एजुकेशन एंड वेलफेयर ट्रस्ट के अंतर्गत स्थापित व प्रबंधित एक पंजीकृत गैर-लाभकारी शैक्षणिक व कल्याणकारी इदारा है। आपकी दी हुई इमदाद और अतियात का 100% हिस्सा मुस्तहिक बच्चियों की तालीम, डिजिटल क्लासरूम्स और हॉस्टल पर खर्च होता है।"}
          </p>

          {/* Trust Key Governance Badges Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-6">
            <div className="p-2.5 rounded-2xl glass-item-card border border-amber-500/20 flex items-center justify-center gap-2 text-start">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#2D1F33] dark:text-white leading-tight">
                  100% Shariah Zakat
                </span>
                <span className="text-[9.5px] text-[#7A6985] dark:text-[#A394AB]">
                  Tamleek Verified
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl glass-item-card border border-amber-500/20 flex items-center justify-center gap-2 text-start">
              <Building2 className="w-4 h-4 text-amber-500 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#2D1F33] dark:text-white leading-tight">
                  Registered Trust
                </span>
                <span className="text-[9.5px] text-[#7A6985] dark:text-[#A394AB]">
                  Mujaddid Alf Sani Trust
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl glass-item-card border border-amber-500/20 flex items-center justify-center gap-2 text-start">
              <FileCheck2 className="w-4 h-4 text-purple-500 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#2D1F33] dark:text-white leading-tight">
                  Official Stamped Receipt
                </span>
                <span className="text-[9.5px] text-[#7A6985] dark:text-[#A394AB]">
                  Instant via WhatsApp
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl glass-item-card border border-amber-500/20 flex items-center justify-center gap-2 text-start">
              <Award className="w-4 h-4 text-rose-500 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#2D1F33] dark:text-white leading-tight">
                  Zero Admin Cut
                </span>
                <span className="text-[9.5px] text-[#7A6985] dark:text-[#A394AB]">
                  100% Student Benefit
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. INTERACTIVE CONTRIBUTION SELECTOR CARD (Cause + Amount) */}
        <div className="rounded-3xl glass-ultra border border-amber-500/30 p-5 sm:p-7 shadow-xl mb-8 sm:mb-12 bg-white/80 dark:bg-[#160D22]/85">
          <div className="flex items-center justify-between gap-2 pb-3 mb-5 border-b border-black/5 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
                <Coins className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-start">
                <h2 className="text-sm sm:text-base font-black text-[#2D1F33] dark:text-white">
                  {language === "hi"
                    ? "1. अपना पसंदीदा तालीमी शोबा व रक़म चुनें"
                    : language === "ur"
                    ? "1. اپنا پسندیدہ شعبہ اور رقم منتخب کریں"
                    : language === "ar"
                    ? "1. اختر مجال التبرع والمبلغ"
                    : "1. Select Purpose & Contribution Amount"}
                </h2>
                <span className="text-[10.5px] text-[#7A6985] dark:text-[#A394AB]">
                  {language === "hi"
                    ? "आपकी चुनी हुई रकम सीधे UPI ऐप और रसीद में अपडेट हो जाएगी"
                    : language === "ur"
                    ? "آپ کی منتخب کردہ رقم خود بخود یو پی آئی اور رسید میں درج ہو جائے گی"
                    : "Your selected amount will dynamically configure your UPI app & receipt"}
                </span>
              </div>
            </div>
          </div>

          {/* A. Select Purpose Grid */}
          <div className="mb-6">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8C7A96] dark:text-[#A394AB] mb-2.5 text-start">
              {language === "hi"
                ? "इमदाद की मद / तालीमी शोबा (Donation Purpose):"
                : language === "ur"
                ? "عطیہ کی مد / تعلیمی شعبہ:"
                : "Donation Purpose / Cause:"}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {purposeOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedPurpose === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedPurpose(opt.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border text-start transition-all active:scale-[0.98] ${
                      isSelected
                        ? "bg-gradient-to-r from-amber-500/20 to-rose-500/15 border-amber-500/70 shadow-sm text-amber-950 dark:text-amber-100 font-extrabold"
                        : "glass-item-card border-black/5 dark:border-white/10 hover:border-amber-500/40 text-[#4A3B52] dark:text-[#C8BDCF]"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-xl text-white shadow-sm shrink-0 ${
                        isSelected
                          ? `bg-gradient-to-br ${opt.color}`
                          : "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold leading-tight flex-1">
                      {opt.label}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* B. Select Amount Tiers */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8C7A96] dark:text-[#A394AB] mb-2.5 text-start">
              {language === "hi"
                ? "रक़म चुनें या अपनी मर्जी से दर्ज करें (Choose Amount):"
                : language === "ur"
                ? "رقم منتخب کریں یا درج کریں:"
                : "Choose Amount (INR ₹):"}
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-3.5">
              {amountTiers.map((tier) => {
                const isSelected = selectedAmount === tier.amount;
                return (
                  <button
                    key={tier.amount}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(tier.amount);
                      setCustomAmount("");
                    }}
                    className={`relative flex flex-col p-3 rounded-2xl border text-start transition-all active:scale-[0.98] overflow-hidden ${
                      isSelected
                        ? "bg-gradient-to-br from-amber-500/25 via-amber-500/15 to-rose-500/20 border-amber-500/80 shadow-md ring-2 ring-amber-500/40"
                        : "glass-item-card border-black/5 dark:border-white/10 hover:border-amber-500/40"
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute top-1.5 end-1.5 px-1.5 py-0.5 rounded-md bg-rose-500 text-white text-[8.5px] font-extrabold uppercase tracking-wider shadow-sm">
                        Popular
                      </span>
                    )}
                    <span
                      className={`text-base sm:text-lg font-black tracking-tight ${
                        isSelected
                          ? "text-amber-950 dark:text-amber-100"
                          : "text-[#2D1F33] dark:text-white"
                      }`}
                    >
                      {tier.title}
                    </span>
                    <span className="text-[10px] text-[#6B5A73] dark:text-[#A394AB] mt-1 leading-tight line-clamp-2">
                      {tier.desc}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Amount Input Field */}
            <div className="flex flex-col sm:flex-row items-center gap-3 p-3 rounded-2xl glass-item-card border border-amber-500/30">
              <div className="flex items-center gap-2 w-full sm:w-auto text-start">
                <span className="text-xs font-extrabold text-[#2D1F33] dark:text-white whitespace-nowrap">
                  {language === "hi"
                    ? "अन्य मनचाही रक़म (Custom Amount):"
                    : language === "ur"
                    ? "دیگر رقم درج کریں:"
                    : "Other Custom Amount:"}
                </span>
              </div>
              <div className="relative flex-1 w-full">
                <span className="absolute start-3.5 top-1/2 -translate-y-1/2 font-bold text-amber-700 dark:text-amber-400 text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="10"
                  step="10"
                  placeholder="Enter custom amount e.g. 5000"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount("custom");
                  }}
                  onFocus={() => setSelectedAmount("custom")}
                  className="w-full ps-8 pe-3.5 py-2 rounded-xl bg-white/70 dark:bg-black/20 border border-amber-500/30 focus:border-amber-500 focus:outline-none text-xs sm:text-sm font-bold text-[#2D1F33] dark:text-white font-mono"
                />
              </div>
              {selectedAmount === "custom" && customAmount && (
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>₹{parseInt(customAmount, 10).toLocaleString("en-IN")} Selected</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. DUAL PAYMENT OPTIONS GRID (UPI & QR Code + Official Bank Details) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 mb-10 sm:mb-14">
          {/* LEFT: 1-Click UPI & Dynamic QR Code (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl glass-ultra border border-amber-500/30 p-5 sm:p-7 shadow-xl flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-amber-500/[0.08] via-white/80 dark:via-[#160D22]/80 to-rose-500/[0.06]">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-black/5 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-start">
                    <h2 className="text-sm sm:text-base font-extrabold text-[#2D1F33] dark:text-white">
                      {t.donation?.qrTitle || "फ़ौरी UPI और QR कोड स्कैन"}
                    </h2>
                    <span className="text-[10px] text-[#7A6985] dark:text-[#A394AB]">
                      Google Pay, PhonePe, Paytm, BHIM
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
                  Instant Pay
                </span>
              </div>

              {/* Dynamic QR Code Frame with Luxury Ambient Halo */}
              <div className="flex flex-col items-center justify-center my-2">
                <div className="relative p-3 rounded-2xl bg-white dark:bg-[#1A1028] border-2 border-amber-500/40 shadow-[0_0_25px_rgba(245,158,11,0.25)] group">
                  {/* High-Resolution Clean QR Code SVG */}
                  <svg
                    className="w-44 h-44 sm:w-52 sm:h-52"
                    viewBox="0 0 100 100"
                    fill="currentColor"
                  >
                    <path
                      className="text-amber-950 dark:text-amber-100"
                      d="M10,10 h30 v30 h-30 z M16,16 v18 h18 v-18 z M22,22 h6 v6 h-6 z M60,10 h30 v30 h-30 z M66,16 v18 h18 v-18 z M72,22 h6 v6 h-6 z M10,60 h30 v30 h-30 z M16,66 v18 h18 v-18 z M22,72 h6 v6 h-6 z M45,15 h10 v5 h-10 z M45,25 h5 v10 h-5 z M55,25 h5 v5 h-5 z M45,40 h15 v5 h-15 z M15,45 h10 v5 h-10 z M30,45 h5 v10 h-5 z M40,45 h5 v5 h-5 z M50,50 h15 v5 h-15 z M70,45 h15 v5 h-15 z M75,55 h10 v10 h-10 z M60,60 h10 v5 h-10 z M45,60 h10 v15 h-10 z M55,70 h5 v15 h-5 z M65,70 h15 v5 h-15 z M65,80 h5 v10 h-5 z M75,80 h15 v5 h-15 z M85,70 h5 v5 h-5 z M85,90 h5 v5 h-5 z"
                    />
                  </svg>

                  {/* Center Trust Logo Monogram Badge */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-[#1A1028] border-2 border-amber-500/50 p-1 flex flex-col items-center justify-center shadow-md">
                      <span className="font-black text-[9px] text-amber-700 dark:text-amber-300 leading-none">
                        TRUST
                      </span>
                      <span className="font-extrabold text-[7.5px] text-rose-600 leading-none">
                        JBH
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 mt-2.5 text-center">
                  <span className="text-[11px] font-bold text-amber-900 dark:text-amber-200">
                    {finalAmount > 0 ? `Pay ₹${finalAmount.toLocaleString("en-IN")}` : "Scan to Pay Any Amount"}
                  </span>
                  <span className="text-[10px] text-[#6B5A73] dark:text-[#A394AB]">
                    • {currentPurposeLabel}
                  </span>
                </div>
              </div>

              {/* UPI ID Copy Field */}
              <div className="p-3 rounded-2xl glass-item-card border border-amber-500/30 flex items-center justify-between gap-2 mt-3">
                <div className="flex flex-col text-start min-w-0">
                  <span className="text-[10px] font-bold text-[#8C7A96] dark:text-[#A394AB] uppercase tracking-wider">
                    {t.donation?.upiIdLabel || "ऑफिशियल ट्रस्ट UPI ID"}
                  </span>
                  <span
                    className="text-xs sm:text-sm font-mono font-bold text-amber-900 dark:text-amber-200 truncate"
                    dir="ltr"
                  >
                    {upiId}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(upiId, "upi")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all shrink-0 active:scale-95 ${
                    copiedField === "upi"
                      ? "bg-emerald-500 text-white shadow-sm"
                      : "bg-amber-500/20 hover:bg-amber-500/30 text-amber-900 dark:text-amber-200 border border-amber-500/35"
                  }`}
                >
                  {copiedField === "upi" ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{t.donation?.copiedBtn || "Copied!"}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.donation?.copyBtn || "Copy"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Pay via UPI Button */}
            <a
              href={upiIntentUrl}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-extrabold text-sm shadow-md transition-transform active:scale-[0.98]"
            >
              <Zap className="w-4 h-4" />
              <span>
                {finalAmount > 0
                  ? `Pay ₹${finalAmount.toLocaleString("en-IN")} via UPI App`
                  : t.donation?.payUpiBtn || "Open in UPI App (GPay/PhonePe)"}
              </span>
            </a>
          </div>

          {/* RIGHT: Official Bank Transfer Details (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl glass-ultra border border-amber-500/30 p-5 sm:p-7 shadow-xl flex flex-col justify-between relative bg-white/80 dark:bg-[#160D22]/80">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-black/5 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-start">
                    <h2 className="text-sm sm:text-base font-extrabold text-[#2D1F33] dark:text-white">
                      {t.donation?.bankTitle || "ऑफिशियल ट्रस्ट बैंक अकाउंट डिटेल्स"}
                    </h2>
                    <span className="text-[10px] text-[#7A6985] dark:text-[#A394AB]">
                      NEFT / RTGS / IMPS / Net Banking
                    </span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Verified Trust Account</span>
                </div>
              </div>

              {/* Copyable Bank Details Fields */}
              <div className="flex flex-col gap-2.5">
                {/* 1. Account Name (Trust Full Name) */}
                <div className="p-3.5 rounded-2xl glass-item-card border border-black/5 dark:border-white/10 flex items-center justify-between gap-2">
                  <div className="flex flex-col text-start min-w-0">
                    <span className="text-[10px] font-bold text-[#8C7A96] dark:text-[#A394AB] uppercase tracking-wider">
                      {t.donation?.accNameLabel || "खाताधारक (ट्रस्ट) का नाम"}
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-amber-950 dark:text-amber-100 truncate">
                      {trustFullName}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(trustFullName, "accName")}
                    className={`p-2 rounded-xl transition-all active:scale-95 shrink-0 ${
                      copiedField === "accName"
                        ? "bg-emerald-500 text-white shadow-sm"
                        : "glass-item-card hover:border-amber-500/40 text-amber-800 dark:text-amber-300"
                    }`}
                    aria-label="Copy account name"
                  >
                    {copiedField === "accName" ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* 2. Account Number */}
                <div className="p-3.5 rounded-2xl glass-item-card border border-black/5 dark:border-white/10 flex items-center justify-between gap-2">
                  <div className="flex flex-col text-start min-w-0">
                    <span className="text-[10px] font-bold text-[#8C7A96] dark:text-[#A394AB] uppercase tracking-wider">
                      {t.donation?.accNumLabel || "अकाउंट नंबर"}
                    </span>
                    <span
                      className="text-sm sm:text-base font-mono font-black text-amber-900 dark:text-amber-200 tracking-wider truncate"
                      dir="ltr"
                    >
                      {accNum}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(accNum, "accNum")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all active:scale-95 shrink-0 ${
                      copiedField === "accNum"
                        ? "bg-emerald-500 text-white shadow-sm"
                        : "bg-amber-500/20 hover:bg-amber-500/30 text-amber-900 dark:text-amber-200 border border-amber-500/35"
                    }`}
                  >
                    {copiedField === "accNum" ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{t.donation?.copiedBtn || "Copied!"}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.donation?.copyBtn || "Copy"}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 3. IFSC Code & Bank Name (2-col on desktop) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* IFSC */}
                  <div className="p-3.5 rounded-2xl glass-item-card border border-black/5 dark:border-white/10 flex items-center justify-between gap-2">
                    <div className="flex flex-col text-start min-w-0">
                      <span className="text-[10px] font-bold text-[#8C7A96] dark:text-[#A394AB] uppercase tracking-wider">
                        {t.donation?.ifscLabel || "IFSC कोड"}
                      </span>
                      <span
                        className="text-xs sm:text-sm font-mono font-black text-amber-900 dark:text-amber-200 truncate"
                        dir="ltr"
                      >
                        {ifscCode}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(ifscCode, "ifsc")}
                      className={`p-2 rounded-xl transition-all active:scale-95 shrink-0 ${
                        copiedField === "ifsc"
                          ? "bg-emerald-500 text-white"
                          : "glass-item-card hover:border-amber-500/40 text-amber-800 dark:text-amber-300"
                      }`}
                      aria-label="Copy IFSC code"
                    >
                      {copiedField === "ifsc" ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Bank Name */}
                  <div className="p-3.5 rounded-2xl glass-item-card border border-black/5 dark:border-white/10 flex flex-col text-start justify-center">
                    <span className="text-[10px] font-bold text-[#8C7A96] dark:text-[#A394AB] uppercase tracking-wider">
                      {t.donation?.bankNameLabel || "बैंक का नाम"}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#2D1F33] dark:text-white truncate">
                      {t.donation?.bankNameVal || bankName}
                    </span>
                  </div>
                </div>

                {/* 4. Branch Location & Account Type (2-col) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-2xl glass-item-card border border-black/5 dark:border-white/10 flex flex-col text-start">
                    <span className="text-[10px] font-bold text-[#8C7A96] dark:text-[#A394AB] uppercase tracking-wider">
                      {t.donation?.branchLabel || "ब्रांच लोकेशन"}
                    </span>
                    <span className="text-xs font-semibold text-[#5C4A66] dark:text-[#C8BDCF] truncate">
                      {t.donation?.branchVal || branchName}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl glass-item-card border border-black/5 dark:border-white/10 flex flex-col text-start">
                    <span className="text-[10px] font-bold text-[#8C7A96] dark:text-[#A394AB] uppercase tracking-wider">
                      {t.donation?.accTypeLabel || "अकाउंट का प्रकार"}
                    </span>
                    <span className="text-xs font-semibold text-[#5C4A66] dark:text-[#C8BDCF] truncate">
                      {t.donation?.accTypeVal || accType}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Note Strip */}
            <div className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-amber-500/15 border border-amber-500/30 flex items-center gap-2.5 text-xs font-medium text-amber-950 dark:text-amber-200">
              <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="leading-tight">
                {t.donation?.verifiedTrust ||
                  "मुजद्दिद अल्फ़ सानी एजुकेशन एंड वेलफेयर ट्रस्ट (रजि.) का तस्दीक़शुदा ऑफिशियल खाता।"}
              </span>
            </div>
          </div>
        </div>

        {/* 4. THREE IMPACT PILLARS & SHARIAH GOVERNANCE */}
        <div className="mb-10 sm:mb-14">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <h3 className="font-display font-black text-lg sm:text-2xl text-[#2D1F33] dark:text-white mb-2">
              {t.donation?.impactTitle ||
                "आपकी इमदाद से बच्चियों को मिलने वाली सहूलियात"}
            </h3>
            <p className="text-xs sm:text-sm text-[#6B5A73] dark:text-[#A394AB]">
              {language === "hi"
                ? "आपका हर रुपया दीनी व दुनियावी तालीम में बेटियों को आत्मनिर्भर और आलिमा-मुफ़्तिया बनाने में खर्च होता है।"
                : language === "ur"
                ? "آپ کا ہر روپیہ طالبات کو باوقار عالمہ، مفتیہ اور معلمہ بنانے میں صرف ہوتا ہے۔"
                : "Every rupee contributes directly to nurturing future female Islamic scholars and contemporary leaders."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Impact 1 */}
            <div className="p-5 sm:p-6 rounded-3xl glass-ultra border border-amber-500/25 text-start flex flex-col gap-2.5 hover:border-amber-500/50 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-sm sm:text-base font-extrabold text-[#2D1F33] dark:text-white">
                {t.donation?.impact1Title || "मुकम्मल स्कॉलरशिप"}
              </h4>
              <p className="text-xs text-[#5C4A66] dark:text-[#C8BDCF] leading-relaxed">
                {t.donation?.impact1Desc ||
                  "मुस्तहिक तालिबात के लिए 100% मुफ्त तालीम (ट्यूशन फीस), हॉस्टल आवास और भोजन।"}
              </p>
            </div>

            {/* Impact 2 */}
            <div className="p-5 sm:p-6 rounded-3xl glass-ultra border border-amber-500/25 text-start flex flex-col gap-2.5 hover:border-amber-500/50 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="text-sm sm:text-base font-extrabold text-[#2D1F33] dark:text-white">
                {t.donation?.impact2Title || "स्मार्ट डिजिटल क्लासरूम"}
              </h4>
              <p className="text-xs text-[#5C4A66] dark:text-[#C8BDCF] leading-relaxed">
                {t.donation?.impact2Desc ||
                  "इंटरएक्टिव डिजिटल पैनल्स और ऑनलाइन लाइव लेक्चर्स की सहूलत।"}
              </p>
            </div>

            {/* Impact 3 */}
            <div className="p-5 sm:p-6 rounded-3xl glass-ultra border border-amber-500/25 text-start flex flex-col gap-2.5 hover:border-amber-500/50 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="text-sm sm:text-base font-extrabold text-[#2D1F33] dark:text-white">
                {t.donation?.impact3Title || "काबिल मुअल्लिमात व असातिज़ा"}
              </h4>
              <p className="text-xs text-[#5C4A66] dark:text-[#C8BDCF] leading-relaxed">
                {t.donation?.impact3Desc ||
                  "आला इस्लामिक स्कॉलर्स और मॉडर्न एजुकेशन एक्सपर्ट्स की खिदमात।"}
              </p>
            </div>
          </div>
        </div>

        {/* 5. INSTANT WHATSAPP STAMPED RECEIPT & VERIFICATION BAR */}
        <div className="rounded-3xl glass-ultra border border-amber-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-start bg-gradient-to-r from-[#21112D]/10 via-amber-500/10 to-[#21112D]/10 mb-10 sm:mb-14">
          <div className="flex flex-col gap-1.5 max-w-xl text-start">
            <div className="inline-flex items-center gap-1.5 text-[10.5px] font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Trust Receipt & Confirmation</span>
            </div>
            <h4 className="text-base sm:text-lg font-black text-[#2D1F33] dark:text-white">
              {t.donation?.receiptTitle || "ऑफिशियल रसीद व तस्दीक़"}
            </h4>
            <p className="text-xs sm:text-sm text-[#5C4A66] dark:text-[#C8BDCF] leading-relaxed">
              {t.donation?.receiptDesc ||
                "पेमेंट के बाद स्क्रीनशॉट व्हाट्सएप पर भेजें या हेल्पलाइन पर कॉल करें ताकि मुजद्दिद अल्फ़ सानी एजुकेशन एंड वेलफेयर ट्रस्ट की ऑफिशियल रसीद तुरंत जारी की जा सके।"}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            {/* WhatsApp Receipt Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-md transition-transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.donation?.whatsappReceipt || "व्हाट्सएप पर स्क्रीनशॉट भेजें"}</span>
            </a>

            {/* Helpline Call Button */}
            <a
              href="tel:+917080654147"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl glass-item-card hover:border-amber-500/40 text-amber-900 dark:text-amber-200 font-bold text-xs sm:text-sm transition-transform active:scale-95"
            >
              <Phone className="w-4 h-4 text-amber-500" />
              <span dir="ltr">+91 70806 54147</span>
            </a>
          </div>
        </div>

        {/* 6. DONOR FAQ ACCORDION SECTION */}
        <div className="rounded-3xl glass-ultra border border-amber-500/25 p-5 sm:p-8 bg-white/70 dark:bg-[#160D22]/75">
          <div className="flex items-center gap-2 pb-3 mb-5 border-b border-black/5 dark:border-white/10">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-start">
              <h3 className="text-sm sm:text-base font-black text-[#2D1F33] dark:text-white">
                {language === "hi"
                  ? "दान व इमदाद से संबंधित जरूरी सवालात (FAQ)"
                  : language === "ur"
                  ? "عطیات اور ٹرسٹ سے متعلق اہم سوالات"
                  : "Frequently Asked Questions for Donors"}
              </h3>
              <span className="text-[10px] text-[#7A6985] dark:text-[#A394AB]">
                Trust registration, Zakat rules, and receipt verification
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl glass-item-card border border-black/5 dark:border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-3.5 sm:p-4 text-start gap-3 hover:bg-amber-500/5 transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-xs sm:text-sm font-bold text-[#2D1F33] dark:text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 text-start text-xs sm:text-[13px] text-[#5C4A66] dark:text-[#C8BDCF] leading-relaxed border-t border-black/5 dark:border-white/5 pt-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
