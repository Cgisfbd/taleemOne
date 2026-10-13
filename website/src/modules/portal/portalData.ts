import {
  UserPlus,
  IdCard,
  Award,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export interface PortalServiceCard {
  id: string;
  category: "admission" | "admit" | "result" | "verify";
  route: string;
  icon: any;
  colorGradient: string;
  borderHover: string;
  badgeColor: string;
  key: "apply" | "admit" | "result" | "entranceResult" | "verify";
}

export const PORTAL_SERVICES: PortalServiceCard[] = [
  {
    id: "exam-result",
    category: "result",
    route: "/students/result",
    icon: Award,
    colorGradient: "from-amber-600 via-amber-700 to-yellow-800",
    borderHover: "hover:border-amber-600/80 hover:shadow-[0_8px_30px_rgba(217,119,6,0.2)]",
    badgeColor: "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30",
    key: "result",
  },
  {
    id: "sanad-verify",
    category: "verify",
    route: "/students/verify",
    icon: ShieldCheck,
    colorGradient: "from-purple-600 via-purple-700 to-indigo-800",
    borderHover: "hover:border-purple-500/80 hover:shadow-[0_8px_30px_rgba(168,85,247,0.2)]",
    badgeColor: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30",
    key: "verify",
  },
  {
    id: "entrance-apply",
    category: "admission",
    route: "/students/apply",
    icon: UserPlus,
    colorGradient: "from-amber-500 via-amber-600 to-amber-700",
    borderHover: "hover:border-amber-500/80 hover:shadow-[0_8px_30px_rgba(245,158,11,0.2)]",
    badgeColor: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
    key: "apply",
  },
  {
    id: "admit-card",
    category: "admit",
    route: "/students/admit",
    icon: IdCard,
    colorGradient: "from-rose-500 via-rose-600 to-rose-700",
    borderHover: "hover:border-rose-500/80 hover:shadow-[0_8px_30px_rgba(244,63,94,0.2)]",
    badgeColor: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30",
    key: "admit",
  },
  {
    id: "entrance-result",
    category: "result",
    route: "/students/entrance-result",
    icon: Sparkles,
    colorGradient: "from-emerald-500 via-emerald-600 to-emerald-700",
    borderHover: "hover:border-emerald-500/80 hover:shadow-[0_8px_30px_rgba(16,185,129,0.2)]",
    badgeColor: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    key: "entranceResult",
  },
];

export const PORTAL_FAQS = [
  {
    q_ur: "انٹرنس ٹیسٹ میں 100% اسکالرشپ کیسے حاصل کریں؟",
    a_ur: "داخلہ فارم آن لائن سبمٹ کریں اور انٹرنس امتحان میں شامل ہوں۔ میرٹ میں نمایاں پوزیشن حاصل کرنے والی مستحق طالبات کو 100% مفت رہائش اور تعلیم دی جاتی ہے۔",
    q_en: "How can I qualify for the 100% Entrance Scholarship?",
    a_en: "Submit the online entrance application and appear for the assessment. High-scoring candidates meeting eligibility criteria receive 100% sponsored education & hostel accommodation.",
    q_hi: "एंट्रेंस टेस्ट में 100% स्कॉलरशिप कैसे हासिल करें?",
    a_hi: "दाखिला फॉर्म ऑनलाइन भरें और एंट्रेंस इम्तिहान दें। मेरिट में शानदार नंबर हासिल करने वाली तालिबात को 100% मुफ़्त हॉस्टल व तालीम की सुविधा मिलती है।",
    q_ar: "كيف أحصل على المنحة الدراسية المجانية بنسبة 100%؟",
    a_ar: "قومي بملء استمارة التقديم لاختبار القبول، وتحصل الطالبات المتفوقات في الاختبار على منحة دراسية كاملة تشمل التعليم والسكن والإعاشة.",
  },
  {
    q_ur: "ایڈمٹ کارڈ ڈاؤنلوڈ کرنے کے لیے کن معلومات کی ضرورت ہوتی ہے؟",
    a_ur: "آپ اپنا ایپلیکیشن رجسٹریشن نمبر (Application No) یا رول نمبر درج کر کے سیکنڈوں میں اپنا ایڈمٹ کارڈ حاصل اور پرنٹ کر سکتے ہیں۔",
    q_en: "What details are required to download the Admit Card?",
    a_en: "You only need your Application Registration Number or assigned Roll Number to instantly generate and print your official hall ticket.",
    q_hi: "एडमिट कार्ड डाउनलोड करने के लिए क्या जानकारी चाहिए?",
    a_hi: "आप अपना एप्लीकेशन नंबर या रोल नंबर दर्ज करके तुरंत अपना एडमिट कार्ड डाउनलोड व प्रिंट कर सकते हैं।",
    q_ar: "ما هي البيانات المطلوبة لتحميل بطاقة الدخول؟",
    a_ar: "تحتاجين فقط إلى إدخال رقم التسجيل الإلكتروني أو رقم الجلوس لتحميل وطباعة بطاقة دخول الاختبار مباشرة.",
  },
  {
    q_ur: "کیا جامعہ کی جاری کردہ اسناد آن لائن ویریفائی ہو جاتی ہیں؟",
    a_ur: "جی ہاں، ہر سند پر 7-لیئر سائبر سیکیور کیو آر کوڈ اور رول نمبر موجود ہوتا ہے جس سے دنیا کے کسی بھی کونے سے سند کی تصدیق کی جا سکتی ہے۔",
    q_en: "Are certificates issued by Jamia verifiable online worldwide?",
    a_en: "Yes, every official credential contains an encrypted tamper-proof QR code and unique Roll No allowing 24/7 instant global verification.",
    q_hi: "क्या जामिया की सनद ऑनलाइन वेरीफाई हो जाती है?",
    a_hi: "जी हां, हर सनद पर 7-लेयर सुरक्षित क्यूआर कोड और रोल नंबर होता है जिससे दुनिया के किसी भी कोने से प्रामाणिकता जांची जा सकती है।",
    q_ar: "هل يمكن التحقق من صحة الشهادات الصادرة عبر الإنترنت عالمياً؟",
    a_ar: "نعم، تتضمن كل شهادة رمز QR مشفراً غير قابل للتزوير مع رقم السجل للتحقق الفوري المعتمد على مدار الساعة من أي مكان.",
  },
];
