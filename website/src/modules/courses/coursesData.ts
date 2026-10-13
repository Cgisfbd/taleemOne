export interface LocalizedText {
  ur: string;
  en: string;
  hi: string;
  ar: string;
}

export interface LocalizedList {
  ur: string[];
  en: string[];
  hi: string[];
  ar: string[];
}

export interface SyllabusYear {
  yearNumber: number;
  yearLabel: LocalizedText;
  focusTitle: LocalizedText;
  books: Array<{
    title: string;
    subject: LocalizedText;
    author?: string;
  }>;
  practicalTraining?: LocalizedText;
}

export interface CourseProgram {
  id: string;
  category: "ifta" | "alimah" | "hifz" | "short";
  scholarshipEligible: boolean;
  deliveryMode: "hybrid" | "campus" | "modular";
  level: LocalizedText;
  title: LocalizedText;
  tagline: LocalizedText;
  description: LocalizedText;
  duration: LocalizedText;
  eligibility: LocalizedText;
  medium: LocalizedText;
  badgeColor: "amber" | "teal" | "purple" | "rose" | "emerald" | "indigo";
  iconName: "GraduationCap" | "BookOpen" | "Sparkles" | "Radio" | "Award" | "Layers" | "Laptop";
  keySubjects: LocalizedList;
  learningOutcomes: LocalizedList;
  careerPaths: LocalizedList;
  syllabus: SyllabusYear[];
  seatsAvailable: string;
  accreditation: LocalizedText;
  classTimings: LocalizedText;
}

export const COURSES_DATA: CourseProgram[] = [
  {
    id: "takhassus-fil-ifta",
    category: "ifta",
    scholarshipEligible: true,
    deliveryMode: "hybrid",
    badgeColor: "amber",
    iconName: "Award",
    seatsAvailable: "30 Seats / Batch",
    level: {
      ur: "اعلیٰ تخصص (پوسٹ گریجویٹ)",
      en: "Post-Graduate Specialization",
      hi: "उच्च विशेषज्ञता (पोस्ट ग्रेजुएट)",
      ar: "تخصص عالي (دراسات عليا)",
    },
    title: {
      ur: "تخصّص فی الافتاء (مفتیہ کورس)",
      en: "Takhassus Fil Ifta (Muftiya Course)",
      hi: "तख़स्सुस फ़िल-इफ़्ता (मुफ़्तीया कोर्स)",
      ar: "التخصص في الإفتاء والبحوث الفقهية",
    },
    tagline: {
      ur: "فقہ اسلامی، اصولِ افتاء اور معاصر مسائل پر عالمانہ و تحقیقی عبور",
      en: "Advanced Islamic Jurisprudence, Research Methodology & Contemporary Fatwa Formulation",
      hi: "इस्लामी न्यायशास्त्र, उसूल-ए-इफ़्ता और आधुनिक मसाइल पर शोधपूर्ण विशेषज्ञता",
      ar: "إعداد الفقيهات والمفتيات في الفقه الإسلامي والقضايا المعاصرة",
    },
    description: {
      ur: "تخصّص فی الافتاء جامعہ برکاتِ حرم کا سب سے ممتاز پوسٹ گریجویٹ تحقیقی پروگرام ہے۔ اس میں فارغاتِ درسِ نظامی کو فقہِ حنفی، اصولِ فقہ، قواعدِ فقہیہ، تقابلی فقہ، رسم المفتی اور فتاویٰ رضویہ کے وسیع مطالعہ کے ساتھ ساتھ میڈیکل، فنانشل اور گھریلو معاصر مسائل پر باضابطہ فتویٰ نویسی کی عملی مشق کروائی جاتی ہے۔",
      en: "Takhassus Fil Ifta is Jamia Barkat-e-Haram's premier 2-year post-graduate research program. Female scholars who have graduated from Dars-e-Nizami are trained in Hanafi Jurisprudence, Legal Maxims (Qawa'id Fiqhiyyah), Comparative Fiqh, Rasm al-Mufti, and practical fatwa drafting for contemporary medical, financial, and family matters.",
      hi: "तख़स्सुस फ़िल-इफ़्ता जामिया का प्रमुख 2-वर्षीय पोस्ट ग्रेजुएट प्रोग्राम है। इसमें आलिमा फ़ारिगात को फ़िक़्ह-ए-हनफ़ी, उसूल-ए-फ़िक़्ह, क़वाइद-ए-फ़िक़्हिया, फ़तावा रज़विया के गहरे मुताले के साथ आधुनिक मेडिकल, फ़ाइनेंशियल और पारिवारिक मसाइल पर व्यावहारिक फ़तवा लेखन का गहन प्रशिक्षण दिया जाता है।",
      ar: "برنامج دراسات عليا لمدة سنتين يهدف إلى إعداد العالمات المتخصصات في الإفتاء والفقه المقارن وأصول الفقه والقواعد الفقهية مع التدريب العملي على صياغة الفتاوى الشرعية في المعاملات المالية والنوازل الطبية والأسرية المعاصرة.",
    },
    duration: {
      ur: "2 سال (4 سمسٹرز)",
      en: "2 Years (4 Semesters)",
      hi: "2 साल (4 सेमिस्टर)",
      ar: "سنتان (4 فصول دراسية)",
    },
    eligibility: {
      ur: "درسِ نظامی (عالمہ / فاضلہ) سند یا مساوی شرعی اہلیت",
      en: "Alimah / Fazilah Sanad (Dars-e-Nizami Graduate) or equivalent",
      hi: "दर्स-ए-निज़ामी (आलिमा / फ़ाज़िला) सनद या समकक्ष",
      ar: "شهادة العالمية / الفضيلة في الدرس النظامي أو ما يعادلها",
    },
    medium: {
      ur: "عربی و اردو (تحقیقی مواد)",
      en: "Arabic & Urdu (Research Medium)",
      hi: "अरबी व उर्दू (शोध माध्यम)",
      ar: "العربية والأردية (لغة البحث والتحقيق)",
    },
    classTimings: {
      ur: "لائیو آن لائن و کیمپس: صبح 8:00 تا دوپہر 1:30",
      en: "Live Online & Campus: 8:00 AM - 1:30 PM",
      hi: "लाइव ऑनलाइन व कैम्पस: सुबह 8:00 से दोपहर 1:30",
      ar: "بث مباشر وحضوري: 8:00 صباحاً - 1:30 ظهراً",
    },
    accreditation: {
      ur: "مجدد الف ثانی ایجوکیشن ٹرسٹ سند و سیکیور کیو آر تصدیق",
      en: "Mujaddid Alf Sani Trust Accredited with QR Cryptographic Verification",
      hi: "मुजद्दिद अल्फ़ सानी ट्रस्ट प्रमाणित व सुरक्षित QR कोड",
      ar: "معتمد من مؤسسة مجدد ألف ثاني وموثق برمز QR الرقمي",
    },
    keySubjects: {
      ur: [
        "اصول الافتاء و رسم المفتی (ابن عابدین)",
        "قواعد الفقہیہ و الاشباہ والنظائر (ابن نجیم)",
        "فقہ المعاملات و جدید معاشی مسائل",
        "مسائلِ نسواں و میڈیکل بایو ایتھکس",
        "دراسات الفتاویٰ الرضویہ و فتاویٰ ہندیہ",
        "عملی تمرینِ افتاء و تخریج احکام",
      ],
      en: [
        "Usul al-Ifta & Rasm al-Mufti (Ibn Abidin)",
        "Qawa'id Fiqhiyyah & Al-Ashbah wan-Nazair (Ibn Nujaym)",
        "Islamic Commercial Law & Modern Financial Transactions",
        "Women's Jurisprudence & Contemporary Bio-Ethics",
        "Study of Fatawa Razawiyyah & Fatawa Hindiyyah",
        "Practical Fatwa Drafting & Textual Verification (Takrij)",
      ],
      hi: [
        "उसूल अल-इफ़्ता व रस्म अल-मुफ़्ती (इब्ने आबिदीन)",
        "क़वाइद अल-फ़िक़्हिया व अल-अशबाह वन-नज़ाइर (इब्ने नुजैम)",
        "आधुनिक इस्लामी अर्थशास्त्र व वित्तीय मसाइल",
        "महिलाओं के मसाइल व आधुनिक बायो-एथिक्स",
        "फ़तावा रज़विया व फ़तावा हिंदिया का गहन अध्ययन",
        "व्यावहारिक फ़तवा लेखन व तख़रीज-ए-अहकाम",
      ],
      ar: [
        "أصول الإفتاء ورسم المفتي للعلامة ابن عابدين",
        "القواعد الفقهية والأشباه والنظائر لابن نجيم",
        "فقه المعاملات المالية والاقتصاد الإسلامي المعاصر",
        "فقه المرأة المسلمة والنوازل الطبية المعاصرة",
        "دراسة الفتاوى الرضوية والفتاوى الهندية",
        "التدريب العملي على الإفتاء وصياغة الأحكام الشرعية",
      ],
    },
    learningOutcomes: {
      ur: [
        "قدیم و جدید ماخذِ فقہ سے احکام اخذ کرنے اور استنباط کی صلاحیت",
        "عصری میڈیکل، ڈیجیٹل کرنسی اور فیملی مسائل پر مدلل فتویٰ لکھنے کی مہارت",
        "عربی عبارات، نصوص اور مخطوطات کے مطالعہ اور فہم میں پختگی",
        "خواتین کے مخصوص مسائل میں عالمی سطح پر آن لائن و آف لائن شرعی رہنمائی",
      ],
      en: [
        "Proficiency in extracting rulings from classical primary and secondary jurisprudential sources.",
        "Mastery in formulating reasoned fatwas on modern biomedical, digital, and familial issues.",
        "Advanced comprehension of classical Arabic legal treatises and manuscript research.",
        "Scholarly leadership to provide authentic Shar'i guidance globally to female communities.",
      ],
      hi: [
        "प्राचीन व आधुनिक फ़िक़्ही स्रोतों से अहकाम निकालने और व्याख्या करने की पूर्ण क्षमता।",
        "आधुनिक मेडिकल, डिजिटल व पारिवारिक मुद्दों पर प्रमाणिक फ़तवा लिखने में महारत।",
        "शास्त्रीय अरबी इबारत व पांडुलिपियों के अध्ययन में उच्च दक्षता।",
        "विश्व भर में मुस्लिम महिलाओं को प्रामाणिक शरई मार्गदर्शन प्रदान करने का नेतृत्व।",
      ],
      ar: [
        "القدرة على استنباط الأحكام الشرعية من المصادر الفقهية المعتمدة.",
        "إتقان صياغة الفتاوى المدللة في النوازل المعاصرة الطبية والمالية.",
        "التمكن من قراءة وفهم أمهات الكتب الفقهية والمخطوطات التراثية.",
        "الريادة في تقديم التوجيه والفتوى الشرعية للمجتمعات النسائية حول العالم.",
      ],
    },
    careerPaths: {
      ur: [
        "دار الافتاء میں مستند مفتیہ و ریسرچ اسکالر",
        "اعلیٰ دینی جامعات و مدارس میں استاذۃ الحدیث و الفقہ",
        "اسلامی فیملی کاؤنسلر و شریعہ ایڈوائزر",
        "اسلامی ریسرچ جرائد و دار التصنیف میں محققہ",
      ],
      en: [
        "Certified Female Muftiya & Jurisprudential Scholar in Dar-ul-Ifta",
        "Senior Professor of Hadith & Fiqh at Islamic Universities",
        "Islamic Family Consultant & Shariah Advisory Council Member",
        "Author & Academic Researcher in Islamic Jurisprudence Journals",
      ],
      hi: [
        "दारुल इफ़्ता में प्रमाणित मुफ़्तीया व शोधकर्ता",
        "इस्लामी विश्वविद्यालयों में हदीस व फ़िक़्ह की सीनियर उस्ताज़ा",
        "इस्लामी पारिवारिक परामर्शदाता व शरीया सलाहकार",
        "इस्लामी शोध पत्रिकाओं व प्रकाशन गृहों में लेखिका व अनुवादक",
      ],
      ar: [
        "مفتية معتمدة وباحثة فقهية في دور الإفتاء الشرعية",
        "أستاذة الفقه والحديث في الجامعات والمعاهد الإسلامية العليا",
        "مستشارة شرعية وأسرية في التوجيه والإرشاد الإسلامي",
        "باحثة ومؤلفة في مراكز الدراسات الإسلامية ومجلات البحوث",
      ],
    },
    syllabus: [
      {
        yearNumber: 1,
        yearLabel: {
          ur: "سالِ اول (تخصّص فقہ و اصول)",
          en: "Year 1: Fiqh Foundation & Usul Specialization",
          hi: "प्रथम वर्ष: फ़िक़्ह बुनियाद व उसूल विशेषज्ञता",
          ar: "السنة الأولى: أصول الفقه والقواعد الكبرى",
        },
        focusTitle: {
          ur: "اصولِ افتاء، قواعدِ فقہیہ اور کتبِ مبسوط کا مطالعہ",
          en: "Jurisprudential Principles, Legal Maxims & Classical Commentaries",
          hi: "उसूल-ए-इफ़्ता, क़वाइद-ए-फ़िक़्हिया और प्राचीन ग्रंथों का अध्ययन",
          ar: "دراسة أصول الإفتاء والقواعد الفقهية والتمرن على المتون",
        },
        books: [
          {
            title: "شرح عقود رسم المفتی",
            subject: {
              ur: "اصولِ افتاء و مراتبِ فقہاء",
              en: "Methodology of Fatwa Issuance",
              hi: "फ़तवा जारी करने के उसूल",
              ar: "أصول الإفتاء ورسم المفتي",
            },
            author: "العلامة محمد أمين بن عابدين الشامي",
          },
          {
            title: "الأشباه والنظائر فی الفروع",
            subject: {
              ur: "قواعدِ فقہیہ و فقہی نظائر",
              en: "Legal Maxims & Analogy",
              hi: "क़वाइद-ए-फ़िक़्हिया",
              ar: "القواعد الفقهية الكلية",
            },
            author: "العلامة زين الدين بن نجيم الحنفي",
          },
          {
            title: "فتح القدير للعاجز الفقير (مجلدات مختارہ)",
            subject: {
              ur: "فقہِ مقارن و دلائلِ احکام",
              en: "Comparative Fiqh & Evidences",
              hi: "तुलनात्मक फ़िक़्ह व दलीलें",
              ar: "الفقه المقارن وأدلة الأحكام",
            },
            author: "الكمال بن الهمام الحنفي",
          },
          {
            title: "المسوّدة في النوازل المعاصرة",
            subject: {
              ur: "جدید میڈیکل و فنانشل مسائل",
              en: "Contemporary Medical & Financial Issues",
              hi: "आधुनिक मेडिकल व वित्तीय मसाइल",
              ar: "فقه النوازل والمعاملات الحديثة",
            },
            author: "مجمع الفقه الإسلامي / بحوث مختارة",
          },
        ],
        practicalTraining: {
          ur: "ہفتہ وار 5 سوالات پر تحقیقی فتاویٰ کی مسودہ سازی اور تصحیح",
          en: "Weekly drafting of 5 researched fatwas with faculty review and annotation",
          hi: "साप्ताहिक 5 फ़तवों का शोधपूर्ण आलेखन व उस्ताज़ा से सत्यापन",
          ar: "صياغة 5 فتاوى أسبوعياً مع التصحيح والتدقيق الفقهي",
        },
      },
      {
        yearNumber: 2,
        yearLabel: {
          ur: "سالِ دوم (عملی افتاء و تحقیقی مقالہ)",
          en: "Year 2: Applied Fatwa Drafting & Thesis",
          hi: "द्वितीय वर्ष: व्यावहारिक इफ़्ता व शोध प्रबंध",
          ar: "السنة الثانية: الإفتاء التطبيقي والرسالة العلمية",
        },
        focusTitle: {
          ur: "عملی فتاویٰ نویسی، فتاویٰ رضویہ کا اختصاصی مطالعہ اور ریسرچ مقالہ",
          en: "Practical Fatwa Internship, Fatawa Razawiyyah Study & Master Thesis",
          hi: "व्यावहारिक फ़तवा लेखन, फ़तावा रज़विया का अध्ययन व शोध प्रबंध",
          ar: "التدريب على الإفتاء العملي ودراسة الموسوعات الفقهية وبحث التخرج",
        },
        books: [
          {
            title: "فتاویٰ رضویہ (مجلدات متعلقہ بالعقائد، النکاح، البیوع والفرائض)",
            subject: {
              ur: "تحقیقی فتاویٰ و استدلالِ احکام",
              en: "Encyclopedic Fatwa Analytics",
              hi: "फ़तावा रज़विया का शोधपूर्ण अध्ययन",
              ar: "موسوعة الفتاوى الرضوية للإمام أحمد رضا",
            },
            author: "الإمام أحمد رضا خان القادري",
          },
          {
            title: "الفتاوى الهندية (عالمگیری)",
            subject: {
              ur: "قضائی فقہ و احکامِ شرعیہ",
              en: "Judicial Hanafi Precedents",
              hi: "क़ज़ाई फ़िक़्ह व अहकाम",
              ar: "الفتاوى الهندية (الفتاوى العالمكيرية)",
            },
            author: "لجنة علماء الهند برئاسة الشيخ نظام الدين",
          },
          {
            title: "أحكام المعاملات المالية الحديثة والذكاء الاصطناعي",
            subject: {
              ur: "عصری معاشی مسائل، آن لائن ٹریڈنگ و AI",
              en: "Digital Currency, Fintech & AI in Shar'i Lens",
              hi: "डिजिटल लेनदेन, शेयर बाज़ार व आधुनिक मसले",
              ar: "المعاملات المالية الرقمية والنوازل المستجدة",
            },
            author: "أبحاث الهيئات الفقهية المعاصرة",
          },
        ],
        practicalTraining: {
          ur: "جامعہ دار الافتاء میں مکمل انٹرن شپ + 100 صفحات پر مشتمل تحقیقی مقالہ (Thesis)",
          en: "Complete internship at Jamia Dar-ul-Ifta + 100-page Master's research thesis",
          hi: "दारुल इफ़्ता में मुकम्मल इंटर्नशिप + 100 पृष्ठों का शोध प्रबंध (थीसिस)",
          ar: "تدريب عملي مكثف في دار الإفتاء بالجامعة + تقديم بحث تخرج علمي (100 صفحة)",
        },
      },
    ],
  },
  {
    id: "dars-e-nizami-alimah",
    category: "alimah",
    scholarshipEligible: true,
    deliveryMode: "hybrid",
    badgeColor: "teal",
    iconName: "BookOpen",
    seatsAvailable: "80 Seats / Track",
    level: {
      ur: "جامع شریعہ گریجویشن (عالمہ و فاضلہ)",
      en: "Comprehensive Graduate Degree (Alimah & Fazilah)",
      hi: "विस्तृत स्नातक डिग्री (आलिमा व फ़ाज़िला)",
      ar: "الإجازة العالمية في العلوم الإسلامية والعربية",
    },
    title: {
      ur: "درسِ نظامی (عالمہ و فاضلہ کورس)",
      en: "Dars-e-Nizami (Alimah & Fazilah Program)",
      hi: "दर्स-ए-निज़ामी (आलिमा व फ़ाज़िला पाठ्यक्रम)",
      ar: "برنامج الدرس النظامي الكامل (دورة العالمية والفضيلة)",
    },
    tagline: {
      ur: "قرآن، صحاح ستہ حدیث، فقہِ ہدایہ اور عربی ادب کا 6 سالہ مستند و اسمارٹ نصاب",
      en: "6-Year Authentic Classical Curriculum: Quran, Sihah Sittah Hadith, Fiqh & Arabic Literature",
      hi: "क़ुरआन, सिहाह-ए-सित्ता हदीस, हिदाया फ़िक़्ह और अरबी साहित्य का 6-वर्षीय प्रमाणिक पाठ्यक्रम",
      ar: "منهج أصيل يجمع بين القرآن وكتب الصحاح الستة والفقه الحنفي واللغة العربية",
    },
    description: {
      ur: "درسِ نظامی اسلامی علوم کا وہ لازوال اور جامع نصاب ہے جس سے مستند عالمات و فاضلات تیار ہوتی ہیں۔ جامعہ برکاتِ حرم میں اس نصاب کو ڈیجیٹل اسمارٹ پینلز، پروجیکٹرز اور جدید تدریسی خاکوں کے ساتھ پڑھایا جاتا ہے۔ فل ٹائم کیمپس کلاسز کے علاوہ گھریلو خواتین اور ورکنگ طالبات کے لیے لائیو آن لائن براڈکاسٹ اور ماڈیولر بیجز کی سہولت بھی میسر ہے۔",
      en: "Dars-e-Nizami is the gold standard classical Islamic curriculum designed to nurture accomplished female scholars. At Jamia Barkat-e-Haram, traditional texts are illuminated through high-tech interactive smart panels and digital diagrams. Beyond the full-time campus track, flexible modular tracks are available globally via two-way live streaming.",
      hi: "दर्स-ए-निज़ामी इस्लामी उलूम का विश्व प्रसिद्ध और मुकम्मल पाठ्यक्रम है। जामिया में इसे इंटरएक्टिव डिजिटल स्मार्ट पैनल्स और ऑडियो-विज़ुअल माध्यम से पढ़ाया जाता है। फ़ुल-टाइम कैम्पस के साथ-साथ घरेलू व कामकाजी बहनों के लिए लाइव ऑनलाइन और मॉड्यूलर बैच की उत्तम सुविधा है।",
      ar: "المنهج التقليدي المتكامل لإعداد العالمات في العلوم الشرعية. يتميز بتدريسه عبر الشاشات الذكية التفاعلية مع توفير بث مباشر وفصول مرنة للملتحقات عن بُعد حول العالم.",
    },
    duration: {
      ur: "6 سال (یا فاسٹ ٹریک ماڈیولر)",
      en: "6 Years (or Fast-Track Modular)",
      hi: "6 साल (या फ़ास्ट ट्रैक मॉड्यूलर)",
      ar: "6 سنوات (أو مسار مرن ومكثف)",
    },
    eligibility: {
      ur: "کم از کم مڈل / میٹرک پاس اور اردو و بنیادی عربی خوانی",
      en: "Minimum Middle / Matriculation pass & basic Urdu/Arabic reading ability",
      hi: "न्यूनतम 8वीं / 10वीं पास और बुनियादी उर्दू/अरबी पठन क्षमता",
      ar: "إتمام المرحلة المتوسطة / الثانوية والقدرة على قراءة العربية والأردية",
    },
    medium: {
      ur: "عربی، اردو و انگریزی اصطلاحات",
      en: "Arabic, Urdu & English Terminology",
      hi: "अरबी, उर्दू व अंग्रेज़ी शब्दावली",
      ar: "العربية والأردية",
    },
    classTimings: {
      ur: "کیمپس فل ٹائم: 7:30 تا 2:00 | ماڈیولر ایوننگ: 5:00 تا 8:00",
      en: "Campus Full-Time: 7:30 AM - 2:00 PM | Modular Evening: 5:00 PM - 8:00 PM",
      hi: "कैम्पस फ़ुल-टाइम: सुबह 7:30 से 2:00 | मॉड्यूलर शाम: 5:00 से 8:00",
      ar: "دوام كامل: 7:30 صباحاً - 2:00 ظهراً | فصول مسائية: 5:00 - 8:00 مساءً",
    },
    accreditation: {
      ur: "جامعہ برکاتِ حرم کی رسمی سندِ فضیلت و وفاق تصدیق",
      en: "Official Sanad-e-Fazilat from Jamia Barkat-e-Haram & Board Verification",
      hi: "जामिया बरकात-ए-हरम की अधिकारिक सनद-ए-फ़ज़ीलत",
      ar: "شهادة العالمية الرسمية المعتمدة والموثقة",
    },
    keySubjects: {
      ur: [
        "تفسیر القرآن: جلالین، بیضاوی و مدارک التنزیل",
        "کتبِ صحاح: صحیح بخاری، صحیح مسلم، جامع ترمذی و سنن",
        "فقہ حنفی: ہدایہ، قدوری، کنز الدقائق و نور الایضاح",
        "اصول فقہ: اصول الشاشی، المنار و نور الانوار",
        "عربی صرف، نحو و بلاغت: کافیہ، ہدایۃ النحو و تلخیص المفتاح",
        "حدیث شناسی، عقائدِ اہل سنت و تاریخ اسلام",
      ],
      en: [
        "Quranic Exegesis (Tafsir): Jalalayn, Baidawi & Madarik",
        "Hadith Sihah Collections: Sahih Bukhari, Muslim, Tirmidhi, Abu Dawood",
        "Hanafi Jurisprudence: Hidayah, Quduri, Kanz al-Daqaiq, Nur al-Idah",
        "Legal Theory (Usul al-Fiqh): Usul ash-Shashi, Al-Manar, Nur al-Anwar",
        "Arabic Syntax, Morphology & Rhetoric: Kafiyah, Hidayat an-Nahw, Talkhis",
        "Hadith Methodology, Creed (Aqeedah) & Islamic History",
      ],
      hi: [
        "क़ुरआन तफ़्सीर: जलालैन, बैज़ावी व मदारिक",
        "सिहाह हदीस ग्रंथ: सहीह बुख़ारी, सहीह मुस्लिम, जामे तिर्मिज़ी",
        "हनफ़ी फ़िक़्ह: हिदाया, क़ुदूरी, कन्ज़ुद दक़ाइक़, नूरुल ईज़ाह",
        "उसूल-ए-फ़िक़्ह: उसूलुश शाशी, अल-मनार, नूरुल अनवार",
        "अरबी सर्फ़, नह्व व बलाग़त: काफ़िया, हिदायतुन नह्व, तल्ख़ीसुल मिफ़्ताह",
        "अक़ीदा-ए-अहले सुन्नत, हदीस के उसूल व इस्लामी इतिहास",
      ],
      ar: [
        "تفسير القرآن الكريم: الجلالين، البيضاوي، ومدارك التنزيل",
        "الصحاح الستة في الحديث: صحيح البخاري، مسلم، الترمذي، والسنن",
        "الفقه الحنفي: الهداية، القدوري، كنز الدقائق، ونور الإيضاح",
        "أصول الفقه: أصول الشاشي، المنار، ونور الأنوار",
        "علوم اللغة العربية (النحو والصرف والبلاغة): الكافية، وتلخيص المفتاح",
        "العقيدة الإسلامية ومناهج المحدثين والتاريخ الإسلامي",
      ],
    },
    learningOutcomes: {
      ur: [
        "قرآن و حدیث کی اصل عربی نصوص کو براہِ راست پڑھنے اور سمجھنے پر مکمل دسترس",
        "فقہی و شرعی مسائل میں صحیح احکام بیان کرنے کی تدریسی اور خطیبانہ صلاحیت",
        "مستند اسلامی مدارس اور تعلیمی اداروں میں باوقار تدریس کا اعزاز",
        "معاشرے میں اسلامی اقدار، اخلاق اور پردہ دار طرزِ زندگی کا فروغ",
      ],
      en: [
        "Fluent direct reading and deep linguistic analysis of classical Quran and Hadith sources.",
        "Articulate pedagogical and oratory skills to explain Shar'i rulings to communities.",
        "Honorable qualification for teaching in prestigious Islamic seminaries and colleges.",
        "Spreading authentic moral values, Islamic ethics, and noble character.",
      ],
      hi: [
        "क़ुरआन और हदीस की मूल अरबी इबारत को सीधे पढ़ने और समझाने की मुकम्मल महारत।",
        "शरई मसाइल को दलीलों के साथ समझाने और ब्यान करने की बेमिसाल सलाहियत।",
        "प्रतिष्ठित मदरसों और स्कूलों में सम्मानजनक मुअल्लिमा बनने की योग्यता।",
        "समाज में अख़लाक़, दीनी तरबियत और पाकीज़ा ज़िंदगी का प्रचार।",
      ],
      ar: [
        "التمكن التام من قراءة وفهم النصوص الشرعية من القرآن والحديث واللغة.",
        "القدرة على التدريس والخطابة والبيان الشرعي الرصين.",
        "التأهيل العالي لشغل الوظائف التعليمية والإرشادية في المؤسسات الإسلامية.",
        "غرس القيم والأخلاق الإسلامية والتربية النبوية في المجتمع.",
      ],
    },
    careerPaths: {
      ur: [
        "دینی جامعات میں استاذۃ الحدیث و التفسیر (Senior Lecturer)",
        "مکاتب و گرلز اسکولز میں پرنسپل، ایڈمنسٹریٹر اور مشیرِ تعلیم",
        "بین الاقوامی سطح پر آن لائن اسلامی ٹیچر اور قاریہ",
        "شعبہ دعوت و تبلیغ اور اصلاحِ معاشرہ کی قائد",
      ],
      en: [
        "Lecturer of Hadith, Fiqh & Tafsir in Islamic Seminaries",
        "Principal / Academic Director in Islamic Girls' Schools & Colleges",
        "Global Online Islamic Educator & Quran Instructor",
        "Community Counselor & Director of Female Tarbiyah Wings",
      ],
      hi: [
        "दीनी मदरसों में हदीस व तफ़्सीर की सीनियर उस्ताज़ा (लेक्चरर)",
        "इस्लामिक गर्ल्स स्कूलों में प्रिंसिपल व एडमिनिस्ट्रेटर",
        "वैश्विक स्तर पर ऑनलाइन इस्लामी उस्ताज़ा व क़ारिया",
        "महिला सुधार व दीनी मार्गदर्शन की संचालक",
      ],
      ar: [
        "أستاذة ومحاضرة في علوم الشريعة والتفسير والحديث",
        "مديرة ومشرفة تربوية في المدارس والمعاهد الإسلامية للبنات",
        "معلمة للعلوم الشرعية والقرآن الكريم عبر المنصات العالمية",
        "داعية ومرشدة أسرية ومجتمعية في الإصلاح والتوجيه",
      ],
    },
    syllabus: [
      {
        yearNumber: 1,
        yearLabel: {
          ur: "سالِ اول (اعدادیہ / دراسات)",
          en: "Year 1: Foundation (I'dadiyah)",
          hi: "प्रथम वर्ष: एदादिया (बुनियादी)",
          ar: "السنة الأولى: الإعدادية والتأسيس اللغوي",
        },
        focusTitle: {
          ur: "عربی زبان کے بنیادی قواعد، صرف، نحو اور فقہِ ابتدائی",
          en: "Arabic Grammar Foundations, Morphology & Basic Fiqh",
          hi: "अरबी व्याकरण, सर्फ़, नह्व और शुरुआती फ़िक़्ह",
          ar: "قواعد اللغة العربية ومبادئ الفقه والحديث",
        },
        books: [
          {
            title: "نحو میر و شرح مائۃ عامل",
            subject: {
              ur: "عربی گرامر و نحو",
              en: "Arabic Syntax",
              hi: "अरबी नह्व",
              ar: "النحو العربي والتراكيب",
            },
            author: "السيد الشريف علي بن محمد الجرجاني",
          },
          {
            title: "علم الصیغہ و میزان الصرف",
            subject: {
              ur: "عربی صیغہ شناسی و صرف",
              en: "Arabic Morphology",
              hi: "अरबी सर्फ़",
              ar: "علم الصرف وتصريف الأفعال",
            },
            author: "المفتي عنايت أحمد الكاكوروي",
          },
          {
            title: "نور الإيضاح ونجاة الأرواح",
            subject: {
              ur: "فقہ العبادات (طہارت، نماز، روزہ)",
              en: "Fiqh of Worship",
              hi: "इबादत की फ़िक़्ह",
              ar: "فقه العبادات والطهارة",
            },
            author: "الشيخ حسن بن عمار الشرنبلالي",
          },
          {
            title: "تيسير المنطق",
            subject: {
              ur: "بنیادی منطق و استدلال",
              en: "Introductory Logic",
              hi: "बुनियादी मंतिक़",
              ar: "مبادئ علم المنطق",
            },
            author: "مناهج دار العلوم",
          },
        ],
      },
      {
        yearNumber: 2,
        yearLabel: {
          ur: "سالِ دوم (اوّلٰی)",
          en: "Year 2: Elementary Islamic Sciences (Oola)",
          hi: "द्वितीय वर्ष: ऊला",
          ar: "السنة الثانية: العلوم التمهيدية والمتون الوسيطة",
        },
        focusTitle: {
          ur: "عربی ادب، قدوری فقہ، اصول الشاشی اور منطقِ قطبی",
          en: "Intermediate Arabic Literature, Quduri Fiqh & Legal Foundations",
          hi: "अरबी अदब, क़ुदूरी फ़िक़्ह और उसूलुश शाशी",
          ar: "متن القدوري وأصول الشاشي والبلاغة العربية",
        },
        books: [
          {
            title: "مختصر القدوري (طہارت تا حج)",
            subject: {
              ur: "فقہِ حنفی کا بنیادی متن",
              en: "Classical Hanafi Manual",
              hi: "हनफ़ी फ़िक़्ह का अहम ग्रंथ",
              ar: "متن القدوري في الفقه الحنفي",
            },
            author: "أبو الحسن أحمد بن محمد القدوري",
          },
          {
            title: "أصول الشاشي في أصول الفقه",
            subject: {
              ur: "اصولِ فقہ کی اساس",
              en: "Legal Theory Principles",
              hi: "उसूल-ए-फ़िक़्ह की बुनियाद",
              ar: "أصول الفقه والاستنباط",
            },
            author: "الشيخ نظام الدين الشاشي",
          },
          {
            title: "شرح مائة عامل والكافية",
            subject: {
              ur: "متوسط عربی نحو",
              en: "Intermediate Arabic Syntax",
              hi: "अरबी नह्व",
              ar: "الكافية لابن الحاجب",
            },
            author: "ابن الحاجب النحوي",
          },
          {
            title: "رياض الصالحين (أبواب مختارة)",
            subject: {
              ur: "حدیث و اخلاقِ نبوی",
              en: "Hadith & Prophetic Morals",
              hi: "हदीस व अख़लाक़",
              ar: "الأحاديث النبوية والتربية",
            },
            author: "الإمام يحيى بن شرف النووي",
          },
        ],
      },
      {
        yearNumber: 3,
        yearLabel: {
          ur: "سالِ سوم (ثانیہ)",
          en: "Year 3: Intermediate Jurisprudence (Thaniyah)",
          hi: "तृतीय वर्ष: सानिया",
          ar: "السنة الثالثة: الفقه المتقدم وأصول التفسير",
        },
        focusTitle: {
          ur: "کنز الدقائق، نور الانوار، تلخیص المفتاح اور ترجمۃ القرآن",
          en: "Advanced Jurisprudence, Hermeneutics & Rhetoric",
          hi: "कन्ज़ुद दक़ाइक़, नूरुल अनवार और तर्जुमा-ए-क़ुरआन",
          ar: "كنز الدقائق ونور الأنوار والبلاغة القرآنية",
        },
        books: [
          {
            title: "كنز الدقائق (معاملات و مناکحات)",
            subject: {
              ur: "فقہ المعاملات و النکاح",
              en: "Transactional & Family Law",
              hi: "मुआमलात व निकाह की फ़िक़्ह",
              ar: "فقه المعاملات والأسرة",
            },
            author: "الإمام عبد الله بن أحمد النسفي",
          },
          {
            title: "نور الأنوار في شرح المنار",
            subject: {
              ur: "اصولِ فقہ",
              en: "Legal Hermeneutics",
              hi: "उसूल-ए-फ़िक़्ह",
              ar: "شرح المنار في أصول الفقه",
            },
            author: "الشيخ أحمد بن أبي سعيد (ملا جيون)",
          },
          {
            title: "مختصر المعاني وتلخيص المفتاح",
            subject: {
              ur: "علم البلاغة، البیان و البدیع",
              en: "Arabic Rhetoric & Eloquence",
              hi: "अरबी बलाग़त",
              ar: "علوم البلاغة والبيان",
            },
            author: "سعد الدين التفتازاني",
          },
        ],
      },
      {
        yearNumber: 4,
        yearLabel: {
          ur: "سالِ چہارم (ثالثہ)",
          en: "Year 4: Tafsir & Higher Fiqh (Thalithah)",
          hi: "चतुर्थ वर्ष: सालिसा",
          ar: "السنة الرابعة: التفسير الموسع وشروح الفقه",
        },
        focusTitle: {
          ur: "تفسیر جلالین، ہدایہ اولین، شرح العقائد النسفیہ",
          en: "Exegesis, Classical Masterwork (Hidayah) & Creed",
          hi: "तफ़्सीर जलालैन, हिदाया अव्वलीन व शरह अक़ाइद",
          ar: "تفسير الجلالين وبداية الهداية والعقيدة الإسلامية",
        },
        books: [
          {
            title: "تفسير الجلالين (الجزء الأول)",
            subject: {
              ur: "تفسیر قرآن مجید",
              en: "Quranic Exegesis",
              hi: "क़ुरआन की तफ़्सीर",
              ar: "التفسير الموضوعي للقرآن",
            },
            author: "جلال الدين المحلي وجلال الدين السيوطي",
          },
          {
            title: "الهداية في شرح بداية المبتدي (المجلد الأول والثاني)",
            subject: {
              ur: "فقہ حنفی مع دلائل و علل",
              en: "The Supreme Hanafi Treatise",
              hi: "हिदाया - फ़िक़्ह-ए-हनफ़ी का शाहकार",
              ar: "الهداية للمرغيناني",
            },
            author: "برهان الدين علي بن أبي بكر المرغيناني",
          },
          {
            title: "شرح العقائد النسفية",
            subject: {
              ur: "عقائد اہل سنت و کلام",
              en: "Scholastic Islamic Theology",
              hi: "अक़ीदा व इल्मुल कलाम",
              ar: "العقيدة وعلم الكلام",
            },
            author: "سعد الدين التفتازاني",
          },
        ],
      },
      {
        yearNumber: 5,
        yearLabel: {
          ur: "سالِ پنجم (رابعہ / مشکوٰۃ)",
          en: "Year 5: Advanced Hadith Sciences (Mishkat)",
          hi: "पंचम वर्ष: राबिया (मिशकात)",
          ar: "السنة الخامسة: علوم الحديث وموسوعة المشكاة",
        },
        focusTitle: {
          ur: "مشکوٰۃ المصابیح مکمل، ہدایہ آخرین اور بیضاوی شریف",
          en: "Comprehensive Mishkat Hadith Compilation & Higher Exegesis",
          hi: "मिशकातुल मसाबीह हदीस ग्रंथ व हिदाया आख़िरीन",
          ar: "مشكاة المصابيح والهداية وتفسير البيضاوي",
        },
        books: [
          {
            title: "مشكاة المصابيح (المجلد الأول والثاني)",
            subject: {
              ur: "جامع کتبِ احادیث",
              en: "Major Hadith Compendium",
              hi: "हदीस का विस्तृत संग्रह",
              ar: "موسوعة الأحاديث النبوية المعتمدة",
            },
            author: "الخطيب التبريزي",
          },
          {
            title: "الهداية (المجلد الثالث والرابع - بیوع، قضاء، حدود)",
            subject: {
              ur: "فقہِ قضاء، حدود و معاملات",
              en: "Judicial Law & Criminal Rulings",
              hi: "क़ज़ा, हुदूद व मुआमलात",
              ar: "فقه القضاء والمعاملات والحدود",
            },
            author: "برهان الدين المرغيناني",
          },
          {
            title: "أنوار التنزيل وأسرار التأويل (تفسير البيضاوي)",
            subject: {
              ur: "تفسیر قرآن و اعجازِ لغوی",
              en: "Analytical Exegesis & Semantics",
              hi: "विश्लेषणात्मक तफ़्सीर",
              ar: "تفسير البيضاوي في أسرار التأويل",
            },
            author: "القاضي ناصر الدين البيضاوي",
          },
        ],
      },
      {
        yearNumber: 6,
        yearLabel: {
          ur: "سالِ ششم (دورۂ حدیث شریف / فضیلت)",
          en: "Year 6: Dawrah-e-Hadith (Graduation)",
          hi: "छठा वर्ष: दौरा-ए-हदीस शरीफ़ (फ़ज़ीलत)",
          ar: "السنة السادسة: دورة الحديث الشريف ونيل الإجازة العالمية",
        },
        focusTitle: {
          ur: "کتبِ صحاح ستہ (بخاری شریف، مسلم شریف، ترمذی، ابوداؤد، نسائی، ابن ماجہ) اور سندِ فضیلت",
          en: "Full Sihah Sittah Hadith Canon & Sanad-e-Fazilat Conferral",
          hi: "सिहाह-ए-सित्ता हदीस ग्रंथ (बुख़ारी, मुस्लिम आदि) व सनद",
          ar: "قراءة ودراسة الصحاح الستة في الحديث الشريف والإسناد المتصل",
        },
        books: [
          {
            title: "صحيح البخاري (الجامع المسند الصحيح)",
            subject: {
              ur: "اصح الکتب بعد کتاب اللہ",
              en: "Most Authentic Hadith Canon",
              hi: "सहीह बुख़ारी शरीफ़",
              ar: "صحيح الإمام البخاري بالسند المتصل",
            },
            author: "الإمام محمد بن إسماعيل البخاري",
          },
          {
            title: "صحيح مسلم",
            subject: {
              ur: "جامع احادیث و اسانید",
              en: "Sahih Muslim Canon",
              hi: "सहीह मुस्लिम शरीफ़",
              ar: "صحيح الإمام مسلم بن الحجاج",
            },
            author: "الإمام مسلم بن الحجاج النيسابوري",
          },
          {
            title: "جامع الترمذي",
            subject: {
              ur: "فقہ الحدیث و عللِ اسانید",
              en: "Comparative Hadith Jurisprudence",
              hi: "जामे तिर्मिज़ी शरीफ़",
              ar: "جامع الإمام أبي عيسى الترمذي",
            },
            author: "الإمام أبو عيسى محمد بن عيسى الترمذي",
          },
          {
            title: "سنن أبي داود، سنن النسائي وسنن ابن ماجه",
            subject: {
              ur: "احادیثِ احکام و فقہی ابواب",
              en: "Canonical Sunan of Jurisprudential Rulings",
              hi: "सुनन अबी दाऊद, नसाई व इब्ने माजा",
              ar: "السنن الثلاثة في أحكام الشريعة",
            },
            author: "أئمة السنن الثلاثة",
          },
        ],
        practicalTraining: {
          ur: "ختمِ بخاری شریف کی سالانہ عالمی تقریب + مشائخ سے متصل اسنادِ روایت کی فراہمی",
          en: "Annual Grand Khatm-e-Bukhari convocation + Connected Sanad chain of narration conferral",
          hi: "सालाना ख़त्म-ए-बुख़ारी जलसा व सनद-ए-फ़ज़ीलत प्रदान",
          ar: "حفل ختم صحيح البخاري السنوي ومنح الإجازة بالإسناد المتصل إلى رسول الله ﷺ",
        },
      },
    ],
  },
  {
    id: "hifz-o-tajweed",
    category: "hifz",
    scholarshipEligible: true,
    deliveryMode: "campus",
    badgeColor: "purple",
    iconName: "Sparkles",
    seatsAvailable: "40 Seats / Batch",
    level: {
      ur: "حفظِ قرآن و تجویدِ اتقان",
      en: "Quran Memorization & Phonetic Mastery",
      hi: "क़ुरआन हिफ़्ज़ व तजवीद",
      ar: "تحفيظ القرآن الكريم والإتقان والتجويد",
    },
    title: {
      ur: "شعبہ تحفیظ القرآن و تجوید و قرأت",
      en: "Hifz-o-Tajweed & Qira'at-e-Sab'ah",
      hi: "हिफ़्ज़-ओ-तजवीद व क़िरअत-ए-सबअह",
      ar: "شعبة تحفيظ القرآن الكريم والتجويد والقراءات",
    },
    tagline: {
      ur: "ماہر معلمات و قاریات کے زیرِ سایہ 30 پاروں کا حفظ، مخارجِ حروف اور حسنِ قرأت",
      en: "Complete 30 Juz Memorization, Articulation Precision & Beautiful Recitation",
      hi: "माहिर क़ारिया उस्ताज़ा की निगरानी में 30 पारों का हिफ़्ज़ व हुस्न-ए-क़िरअत",
      ar: "حفظ القرآن الكريم كاملاً مع تصحيح المخارج وأحكام التلاوة والتجويد",
    },
    description: {
      ur: "جامعہ کا شعبہ تحفیظ القرآن طالبات کو انتہائی پُرسکون اور روحانی ماحول میں مکمل 30 پارے حفظ کروانے کے لیے وقف ہے۔ اس شعبے میں خصوصی آڈیو وژول ساؤنڈ لیب، روزانہ کا سبق، سبقی اور منزل کا سخت نظام، اور مخارج و صفات کی سائنسی و صوتی مشق کروائی جاتی ہے تاکہ ہر حافظہ بچی تجوید و ترتیل کی سند حاصل کر سکے۔",
      en: "Jamia's Department of Tahfeez is dedicated to guiding female students through the complete memorization of the 30 Juz in a serene, spiritually uplifting sanctuary. Equipped with modern audio-visual phonetic labs, rigorous daily review (Sabaq, Sabqi, Manzil), and individual vocal coaching under certified Qariahs.",
      hi: "जामिया का हिफ़्ज़ विभाग बच्चियों को रूहानी और महफ़ूज़ माहौल में 30 पारे कंठस्थ (हिफ़्ज़) कराने का आदर्श केंद्र है। आधुनिक ऑडियो-विज़ुअल लैब, रोज़ाना सबक़, सबक़ी और मंज़िल का पाबंद निज़ाम और मख़ारिज की सही अदायगी पर ख़ास तवज्जो दी जाती है।",
      ar: "قسم مخصص لحفظ القرآن الكريم كاملاً (30 جزءاً) في بيئة هادئة ومحفزة للطالبات، مع تصحيح المخارج عبر مختبرات الصوتيات الذكية ومتابعة يومية دقيقة للحفظ والمراجعة والإتقان.",
    },
    duration: {
      ur: "2 تا 3 سال (انفرادی استعداد کے مطابق)",
      en: "2 to 3 Years (Paced to student ability)",
      hi: "2 से 3 साल (बच्ची की सलाहियत के मुताबिक)",
      ar: "2 إلى 3 سنوات (حسب القدرة الفردية)",
    },
    eligibility: {
      ur: "عمر 7 تا 16 سال، ناظرہ قرآن مجید رواں پڑھنے کی صلاحیت",
      en: "Ages 7 to 16, Fluent Nazirah Quran recitation ability",
      hi: "उम्र 7 से 16 वर्ष, नाज़िरा क़ुरआन रवां पढ़ने की सलाहियत",
      ar: "العمر من 7 إلى 16 سنة، وإتقان القراءة النظرية للقرآن الكريم",
    },
    medium: {
      ur: "عربی (تلاوت) و اردو (توضیح)",
      en: "Arabic (Recitation) & Urdu (Instruction)",
      hi: "अरबी (तिलावत) व उर्दू (तौज़ीह)",
      ar: "العربية",
    },
    classTimings: {
      ur: "کیمپس رہائشی: فجر تا عشاء پُرخلوص نظام الاوقات",
      en: "Campus Residential: Fajr to Isha immersive boarding schedule",
      hi: "कैम्पस रिहाइशी: फ़ज्र से इशा तक पाबंद टाइम-टेबल",
      ar: "نظام إقامة كامل ومتابعة من الفجر إلى العشاء",
    },
    accreditation: {
      ur: "سندِ حفظ و تجوید برکاتِ حرم مع کیو آر ویریفیکیشن",
      en: "Sanad of Hifz & Tajweed with Cryptographic QR Verification",
      hi: "सनद-ए-हिफ़्ज़ व तजवीद मय QR कोड",
      ar: "شهادة وإجازة حفظ القرآن الكريم بالسند المعتمد",
    },
    keySubjects: {
      ur: [
        "حفظِ مکمل 30 پارہ قرآن مجید",
        "تجوید و اتقان: مخارج الحروف و صفاتِ لازمہ و عارضہ",
        "آڈیو وژول لیب میں مشائخِ مصر و حرمین کی تلاوت کی مشق",
        "حفظِ ادعیہ ماثورہ، فرائضِ نماز و روزمرہ کی سنتیں",
        "حسنِ صوت، ترتیل و ترنم کے اصول",
      ],
      en: [
        "Complete 30 Juz Quranic Memorization",
        "Tajweed & Phonetic Articulation Points (Makharij & Sifat)",
        "Audio-Visual Lab: Recitation Modeling after Haramain & Egyptian Masters",
        "Memorization of Prophetic Duas, Essential Fiqh of Salah & Daily Sunnahs",
        "Tarteel, Vocal Modulation & Beautiful Qira'at",
      ],
      hi: [
        "मुकम्मल 30 पारों का हिफ़्ज़",
        "तजवीद व मख़ारिज की सही अदायगी",
        "ऑडियो-विज़ुअल लैब में हरमैन शरीफ़ैन के क़ारियों की तिलावत की मश्क़",
        "मसनून दुआओं, नमाज़ के अरकान व सुन्नतों का हिफ़्ज़",
        "तरतील व हुस्न-ए-क़िरअत के क़वाइद",
      ],
      ar: [
        "حفظ القرآن الكريم كاملاً 30 جزءاً",
        "علم التجويد ومخارج الحروف وصفاتها",
        "التدريب الصوتي في المختبر على قراءات كبار القراء",
        "حفظ الأذكار المأثورة والأدعية والسنن اليومية",
        "تحسين الصوت والتلاوة بالترتيل والتجويد المتقن",
      ],
    },
    learningOutcomes: {
      ur: [
        "قرآن مجید کے 30 پاروں کا کامل، مضبوط اور پختہ حفظ",
        "مخارج کی باریکیوں کے ساتھ صحیح ترین لہجے میں تلاوت کا ملکہ",
        "تراویح اور خصوصی محافل میں پراعتماد قرآن سنانے کی اہلیت",
        "روحانی و اخلاقی پاکیزگی اور زندگی بھر کے لیے نورِ قرآن",
      ],
      en: [
        "Solid, flawless memorization of the entire Quranic text.",
        "Precision in Arabic phonetics and classical recitation melodies.",
        "Confidence in leading Taraweeh and Quranic assemblies.",
        "Lifelong spiritual connection and profound Quranic character.",
      ],
      hi: [
        "क़ुरआन मजीद के 30 पारों का मज़बूत और पक्का हिफ़्ज़।",
        "मख़ारिज की बारीकियों के साथ सही अरबी लहजे में तिलावत की सलाहियत।",
        "तरावीह व दीनी महफ़िलों में पुर-एतमाद क़ुरआन सुनाने की क्षमता।",
        "रूहानी पाकीज़गी और ताउम्र के लिए क़ुरआन की हिफ़ाज़त।",
      ],
      ar: [
        "الحفظ المتقن والراسخ لكتاب الله كاملاً.",
        "إتقان الأداء الصوتي الصحيح وفق قواعد التجويد المعتمدة.",
        "التأهيل لتسميع القرآن وإمامة صلاة التراويح والمسابقات القرآنية.",
        "الارتقاء الإيماني والروحي بأخلاق القرآن الكريم.",
      ],
    },
    careerPaths: {
      ur: [
        "مدارس و گرلز مکاتب میں استاذۃ الحفظ و قاریہ",
        "قومی و بین الاقوامی قرأت و حفظ مقابلوں میں شرکت",
        "آن لائن عالمی قراء ت انسٹی ٹیوٹس میں معلمہ",
        "درسِ نظامی یا تخصص کے اعلیٰ درجات کے لیے پیش رفت",
      ],
      en: [
        "Certified Quran & Tajweed Teacher in Islamic Seminaries",
        "Representative in National & Global Quran Competitions",
        "Global Online Quran & Hifz Coach for Girls & Women",
        "Pathway to Dars-e-Nizami & Higher Islamic Jurisprudence",
      ],
      hi: [
        "गर्ल्स मदरसों में उस्ताज़ा-ए-हिफ़्ज़ व क़ारिया",
        "राष्ट्रीय व अंतर्राष्ट्रीय क़ुरआन प्रतियोगिताओं में भागीदारी",
        "ऑनलाइन क़ुरआन क्लासेज़ में प्रमाणित अध्यापिका",
        "दर्स-ए-निज़ामी या उच्च इस्लामी शिक्षा के लिए आगे बढ़ना",
      ],
      ar: [
        "معلمة للقرآن الكريم والتجويد في المدارس والمراكز القرآنية",
        "المشاركة في المسابقات القرآنية المحلية والدولية",
        "التدريس في الأكاديميات القرآنية العالمية عن بُعد",
        "مواصلة المسار الأكاديمي في الدرس النظامي والعلوم الشرعية",
      ],
    },
    syllabus: [
      {
        yearNumber: 1,
        yearLabel: {
          ur: "مرحلہ اول (پارہ 1 تا 10)",
          en: "Phase 1: Juz 1 to 10",
          hi: "प्रथम चरण: पारा 1 से 10",
          ar: "المرحلة الأولى: من الجزء الأول إلى العاشر",
        },
        focusTitle: {
          ur: "تجوید، مخارج کی تصحیح اور پہلے 10 پاروں کا حفظ",
          en: "Phonetic Grounding, Makharij Perfection & First 10 Juz",
          hi: "तजवीद, मख़ारिज की दुरुस्तगी और पहले 10 पारों का हिफ़्ज़",
          ar: "تأسيس التجويد وحفظ الأجزاء العشرة الأولى",
        },
        books: [
          {
            title: "قواعد التجويد ومخارج الحروف",
            subject: {
              ur: "تجویدِ عملی",
              en: "Applied Tajweed",
              hi: "अमली तजवीद",
              ar: "أحكام التجويد التطبيقي",
            },
            author: "شعبة التجويد بالجامعة",
          },
          {
            title: "المصحف المعلم برواية حفص عن عاصم",
            subject: {
              ur: "حفظ و ترتیل",
              en: "Hifz & Tarteel",
              hi: "हिफ़्ज़ व तरतील",
              ar: "الحفظ المرتل برواية حفص",
            },
          },
        ],
      },
      {
        yearNumber: 2,
        yearLabel: {
          ur: "مرحلہ دوم (پارہ 11 تا 20)",
          en: "Phase 2: Juz 11 to 20",
          hi: "द्वितीय चरण: पारा 11 से 20",
          ar: "المرحلة الثانية: من الجزء الحادي عشر إلى العشرين",
        },
        focusTitle: {
          ur: "درمیانی 10 پاروں کا حفظ اور پچھلی منزل کی تکرار",
          en: "Intermediate 10 Juz Memorization & Relentless Manzil Revision",
          hi: "दरमियानी 10 पारों का हिफ़्ज़ और पिछली मंज़िल का दोहराव",
          ar: "حفظ الأجزاء المتوسطة ومراجعة المحفوظ السابق",
        },
        books: [
          {
            title: "متن الجزرية في علم التجويد",
            subject: {
              ur: "منظوم قواعدِ تجوید",
              en: "Classical Tajweed Ode",
              hi: "तजवीद का प्रसिद्ध काव्य",
              ar: "المقدمة الجزرية لابن الجزري",
            },
            author: "الإمام محمد بن الجزري الشافعي",
          },
        ],
      },
      {
        yearNumber: 3,
        yearLabel: {
          ur: "مرحلہ سوم (پارہ 21 تا 30 و دورۂ تکمیل)",
          en: "Phase 3: Juz 21 to 30 & Grand Khatm",
          hi: "तृतीय चरण: पारा 21 से 30 व ख़त्म-ए-क़ुरआन",
          ar: "المرحلة الثالثة: إتمام الحفظ والإجازة في التلاوة",
        },
        focusTitle: {
          ur: "تکمیلِ 30 پارہ، روزانہ 3 پارے دور اور سندِ حفظ",
          en: "30 Juz Completion, 3-Juz Daily Fluency & Sanad Conferral",
          hi: "30 पारों की मुकम्मल हिफ़्ज़, रोज़ाना 3 पारे दोहराव व सनद",
          ar: "ختم القرآن الكريم كاملاً والمراجعة اليومية المكثفة ونيل السند",
        },
        books: [
          {
            title: "مصحف التجويد والوقف والابتداء",
            subject: {
              ur: "وقف و ابتدا کے احکام",
              en: "Rules of Waqf & Ibtida",
              hi: "वक़्फ़ व इब्तिदा के क़ायदे",
              ar: "أحكام الوقف والابتداء",
            },
          },
        ],
      },
    ],
  },
  {
    id: "fehm-e-deen-modular",
    category: "short",
    scholarshipEligible: false,
    deliveryMode: "modular",
    badgeColor: "rose",
    iconName: "Radio",
    seatsAvailable: "120 Seats / Batch",
    level: {
      ur: "سرٹیفکیٹ کورس (شارٹ ٹریک)",
      en: "Certificate Course (Short Track)",
      hi: "सर्टिफ़िकेट कोर्स (शॉर्ट ट्रैक)",
      ar: "دورة شهادة تدريبية (مسار قصير)",
    },
    title: {
      ur: "فہمِ دین و فرائضِ شرعیہ کورس",
      en: "Fehm-e-Deen & Essential Islamic Fardh Batch",
      hi: "फ़हम-ए-दीन व फ़राइज़-ए-शरईया कोर्स",
      ar: "دورة فقه الدين والفرائض الشرعية الأساسية",
    },
    tagline: {
      ur: "گھریلو خواتین، کالج طالبات اور ورکنگ خواتین کے لیے 6 ماہ کا ضروری دینی کورس",
      en: "6-Month Essential Islamic Knowledge for Homemakers, College Girls & Working Professionals",
      hi: "घरेलू महिलाओं, कॉलेज छात्राओं व कामकाजी बहनों के लिए 6 महीने का ज़रूरी दीनी कोर्स",
      ar: "برنامج لمدة 6 أشهر في أساسيات الشريعة لربات البيوت وطالبات الجامعات",
    },
    description: {
      ur: "یہ کورس ان خواتین اور طالبات کے لیے ترتیب دیا گیا ہے جو وقت کی تنگی کے باعث مکمل درسِ نظامی نہیں کر سکتیں۔ اس میں روزمرہ زندگی کے ضروری مسائل، عقائد کی درستگی، طہارت و نماز کے احکام، حلال و حرام، حقوق العباد، اور اخلاق و حسنِ سلوک کو انتہائی آسان اور دلچسپ انداز میں آن لائن اسمارٹ کلاسز کے ذریعے سکھایا جاتا ہے۔",
      en: "Specially curated for women and college students whose schedules prevent full-time enrollment. Covers daily foundational beliefs (Aqeedah), purity, prayer precision, halal & haram, marital & family rights, and prophetic etiquette through interactive 1-hour evening/morning digital smart classes.",
      hi: "यह कोर्स उन बहनों के लिए तैयार किया गया है जो व्यस्तता के कारण पूरा दर्स-ए-निज़ामी नहीं कर सकतीं। इसमें दैनिक जीवन के ज़रूरी मसाइल, अक़ीदा, वुज़ू-नमाज़ के तरीक़े, हलाल व हराम, पारिवारिक अधिकार और अख़लाक़ को रोज़ाना 1 घंटे की लाइव स्मार्ट क्लास में आसान भाषा में सिखाया जाता है।",
      ar: "برنامج مكثف مصمم لربات البيوت والعاملات اللاتي يتعذر عليهن الانتظام الكامل. يركز على تصحيح العقيدة، فقه العبادات، فقه الأسرة، والأخلاق والآداب الإسلامية بأسلوب مبسط وشيق.",
    },
    duration: {
      ur: "6 ماہ (روزانہ 1 گھنٹہ آن لائن)",
      en: "6 Months (Daily 1 Hour Live Online)",
      hi: "6 महीने (रोज़ाना 1 घंटा लाइव ऑनलाइन)",
      ar: "6 أشهر (ساعة واحدة يومياً عبر البث المباشر)",
    },
    eligibility: {
      ur: "تمام عمر کی خواتین و طالبات (کوئی تعلیمی شرط نہیں)",
      en: "Open to women of all ages (No prior formal prerequisite)",
      hi: "सभी आयु की महिलाओं व बच्चियों के लिए खुला",
      ar: "مفتوح لجميع الأخوات والفتيات الراغبات في التعلم",
    },
    medium: {
      ur: "اردو و ہندی (آسان عوامی انداز)",
      en: "Urdu & Hindi (Easy Accessible Medium)",
      hi: "उर्दू व हिन्दी (आसान व स्पष्ट माध्यम)",
      ar: "الأردية والعربية المبسطة",
    },
    classTimings: {
      ur: "فلیکسیبل شام: 8:00 تا 9:00 رات (ریکارڈنگز ایپ پر دستیاب)",
      en: "Flexible Evening: 8:00 PM - 9:00 PM (24/7 Mobile App Replays)",
      hi: "शाम का बैच: रात 8:00 से 9:00 (रिकॉर्डिंग ऐप पर 24 घंटे)",
      ar: "الفترة المسائية: 8:00 - 9:00 مساءً مع توفر التسجيلات في التطبيق",
    },
    accreditation: {
      ur: "جامعہ برکاتِ حرم فہمِ دین سرٹیفکیٹ",
      en: "Jamia Barkat-e-Haram Fehm-e-Deen Completion Certificate",
      hi: "जामिया बरकात-ए-हरम फ़हम-ए-दीन सर्टिफ़िकेट",
      ar: "شهادة إتمام معتمدة من جامعة بركات الحرم",
    },
    keySubjects: {
      ur: [
        "درست اسلامی عقائد و بدعات سے حفاظت",
        "طہارت، غسل، وضو اور نماز کا عملی طریقہ",
        "مسائلِ طہارت و نسواں (حیض، نفاس، استحاضہ)",
        "حقوق الزوجین، اولاد کی تربیت و گھریلو امن",
        "تجوید کے ساتھ روزمرہ کی سورتوں کی تصحیح",
      ],
      en: [
        "Authentic Islamic Creed (Aqeedah) & Guarding from Innovations",
        "Practical Fiqh of Purification, Wudu, Ghusl & Complete Salah",
        "Women's Jurisprudence: Purity & Specialized Rulings",
        "Marital Rights, Nurturing Virtuous Children & Home Peace",
        "Phonetic Tajweed Correction of Daily Surahs & Prayers",
      ],
      hi: [
        "सच्चा इस्लामी अक़ीदा व ग़लत रस्मों से बचाव",
        "वुज़ू, ग़ुस्ल और नमाज़ का सही व्यावहारिक तरीक़ा",
        "महिलाओं के ख़ास मसाइल (हैज़, निफ़ास, इस्तिहाज़ा)",
        "पति-पत्नी के अधिकार, बच्चों की तरबियत व घर में अमन",
        "तजवीद के साथ रोज़ाना पढ़ी जाने वाली सूरतों की दुरुस्तगी",
      ],
      ar: [
        "العقيدة الإسلامية الصحيحة والسلامة من البدع",
        "فقه الطهارة والغسل والوضوء والصلاة العملية",
        "أحكام الطهارة الخاصة بالمرأة المسلمة",
        "حقوق الزوجين وتربية الأولاد والآداب المنزلية",
        "تصحيح تلاوة السور القصار وأذكار اليوم والليلة",
      ],
    },
    learningOutcomes: {
      ur: [
        "روزمرہ شرعی فرائض اور نماز کی درست ادائیگی کا پختہ علم",
        "خواتین کے مخصوص شرعی مسائل میں خود اعتمادی اور درست رہنمائی",
        "گھر میں پرامن، دیندار اور برکت والی فضا قائم کرنے کی بصیرت",
        "روزمرہ تلاوتِ قرآن کو تجوید کی غلطیوں سے پاک کرنا",
      ],
      en: [
        "Confidence in performing daily prayers, fasting, and obligatory duties correctly.",
        "Clear understanding of women's specific jurisprudence without confusion.",
        "Ability to cultivate a peaceful, Islamic atmosphere at home for the family.",
        "Recitation of short Surahs free from major phonetic errors.",
      ],
      hi: [
        "दैनिक शरई फ़राइज़ और नमाज़ की सही अदायगी का पक्का ज्ञान।",
        "महिलाओं के विशेष मसाइल में स्पष्ट समझ व मार्गदर्शन।",
        "घर में अमन, बरकत और दीनी माहौल पैदा करने की सलाहियत।",
        "क़ुरआन की सूरतों को ग़लतियों से पाक कर के सही पढ़ना।",
      ],
      ar: [
        "القدرة على أداء العبادات والفرائض اليومية وفق الهدي النبوي.",
        "الإلمام الواضح بأحكام المرأة المسلمة وتطبيقها بثقة.",
        "بناء بيت مسلم عامر بالسكينة والتربية الصالحة والبركة.",
        "تصحيح تلاوة القرآن الكريم من اللحن الجلي والخفي.",
      ],
    },
    careerPaths: {
      ur: [
        "گھریلو دینی تربیت کار اور مثالی ماں",
        "محلہ و فیملی میں دینی حلقہ جات و تدریس کی منتظمہ",
        "بچوں کو گھر پر دینی و اخلاقی بنیادی تعلیم دینے کی اہلیت",
      ],
      en: [
        "Exemplary Islamic Mother & Family Spiritual Mentor",
        "Organizer of Local Community Islamic Study Circles for Sisters",
        "Home Quran & Primary Moral Educator for Children",
      ],
      hi: [
        "आदर्श इस्लामी मां व परिवार की मार्गदर्शिका",
        "मोहल्ले व रिश्तेदारों में दीनी महफ़िलों की संचालिका",
        "बच्चों को घर पर बुनियादी दीनी व अख़लाक़ी तालीम देने में सक्षम",
      ],
      ar: [
        "أم ومربية قدوة في الأسرة والمجتمع",
        "مشرفة على الحلقات الإيمانية النسائية في الحي",
        "معلمة لأساسيات الدين والقرآن لأبنائها في البيت",
      ],
    },
    syllabus: [
      {
        yearNumber: 1,
        yearLabel: {
          ur: "ماڈیول 1 تا 3 (بنیادیاتِ دین)",
          en: "Module 1-3: Foundations",
          hi: "मॉड्यूल 1 से 3: बुनियाद",
          ar: "الوحدة 1-3: الأساسيات والعبادات",
        },
        focusTitle: {
          ur: "عقائد، طہارت، نماز اور خواتین کے مسائل",
          en: "Creed, Purification, Salah & Women's Rulings",
          hi: "अक़ीदा, तहारत, नमाज़ और औरतों के ख़ास मसले",
          ar: "العقيدة والطهارة والصلاة وفقه المرأة",
        },
        books: [
          {
            title: "تعلیم الاسلام و قانون شریعت (منتخب ابواب)",
            subject: {
              ur: "بنیادی فقہ و عقائد",
              en: "Basic Fiqh & Creed",
              hi: "बुनियादी फ़िक़्ह",
              ar: "مبادئ الفقه والعقيدة",
            },
            author: "المفتي كفاية الله / مولانا قاضي ثناء الله",
          },
        ],
      },
      {
        yearNumber: 2,
        yearLabel: {
          ur: "ماڈیول 4 تا 6 (اخلاق و معاشرت)",
          en: "Module 4-6: Ethics & Family",
          hi: "मॉड्यूल 4 से 6: अख़लाक़ व परिवार",
          ar: "الوحدة 4-6: الآداب وحقوق الأسرة",
        },
        focusTitle: {
          ur: "حقوق العباد، اخلاقِ حسنہ، سنتیں اور تربیتِ اولاد",
          en: "Social Ethics, Prophetic Sunnahs & Upbringing",
          hi: "पारिवारिक हुक़ूक़, सुन्नतें और बच्चों की परवरिश",
          ar: "فقه المعاملات وحقوق الأسرة وتربية الأبناء",
        },
        books: [
          {
            title: "بہشتی زیور (حصہ آداب و اخلاق)",
            subject: {
              ur: "گھریلو معاشرت و تربیت",
              en: "Islamic Household Ethics",
              hi: "घरेलू अख़लाक़",
              ar: "الآداب الأسرية والأخلاق",
            },
          },
        ],
      },
    ],
  },
  {
    id: "masail-e-khawateen-special",
    category: "short",
    scholarshipEligible: false,
    deliveryMode: "hybrid",
    badgeColor: "indigo",
    iconName: "Layers",
    seatsAvailable: "100 Seats / Batch",
    level: {
      ur: "خصوصی ورکشاپ کورس",
      en: "Specialized Workshop Series",
      hi: "विशेष वर्कशॉप कोर्स",
      ar: "دورة تخصصية وورش عمل نسائية",
    },
    title: {
      ur: "مسائلِ خواتین و عصری احکام",
      en: "Contemporary Women's Fiqh & Bio-Ethics",
      hi: "मसाइल-ए-ख़वातीन व आधुनिक अहकाम",
      ar: "فقه المرأة المسلمة والنوازل الطبية المعاصرة",
    },
    tagline: {
      ur: "طہارت، میڈیکل مسائل، بیوٹی کاسمیٹکس، فیملی پلاننگ اور روزمرہ شرعی احکام پر 3 ماہ کا خصوصی کورس",
      en: "3-Month Intensive on Women's Purity, Medical Bio-Ethics, Cosmetics, and Modern Family Jurisprudence",
      hi: "तहारत, मेडिकल मसले, कॉस्मेटिक्स, ब्यूटी व फ़ैमिली मामलों पर 3 महीने का विशेष कोर्स",
      ar: "دورة مكثفة لمدة 3 أشهر في أحكام الطهارة، مستحضرات التجميل، والمسائل الطبية",
    },
    description: {
      ur: "یہ ایک جامع اور سائنسی انداز میں مرتب کیا گیا خصوصی کورس ہے جس میں مستند مفتیات اور ڈاکٹرز کے اشتراک سے خواتین کو پیش آنے والے پیچیدہ طبی مسائل، بیوٹی ٹریٹمنٹس (سرجری، ناخن، بال)، شرعی حدود، طہارت کے دقیق احکام، اور ازدواجی و خاندانی مسائل کے مدلل حل سکھائے جاتے ہیں۔",
      en: "A focused 3-month course combining classical Hanafi legal rulings with contemporary medical science. Taught by qualified Muftiyas with guest sessions by female medical experts, addressing clinical questions, cosmetic procedures, microblading, modern contraceptives, and detailed rulings of purity.",
      hi: "यह 3 महीने का ख़ास कोर्स है जिसमें मुफ़्तीया उस्ताज़ा और लेडी डॉक्टर्स के सहयोग से औरतों को पेश आने वाले जटिल मेडिकल मसले, ब्यूटी ट्रीटमेंट्स (कॉस्मेटिक्स, हेयर, स्किन), तहारत की बारीकियां और वैवाहिक मसाइल के शरई समाधान सिखाए जाते हैं।",
      ar: "دورة متميزة تجمع بين التأصيل الفقهي والطب المعاصر بالتعاون مع طبيبات ومفتيات، لدراسة النوازل الطبية والتجميلية وأحكام الطهارة الدقيقة والأحكام الأسرية.",
    },
    duration: {
      ur: "3 ماہ (ہفتہ وار 2 کلاسز)",
      en: "3 Months (2 Weekend Classes/Week)",
      hi: "3 महीने (हफ़्ते में 2 क्लासेज़)",
      ar: "3 أشهر (محاضرتان أسبوعياً في عطلة نهاية الأسبوع)",
    },
    eligibility: {
      ur: "خواتین و شادی شدہ بہنیں، طالبات اور معلمات",
      en: "Women, married sisters, educators & female scholars",
      hi: "महिलाएं, विवाहित बहनें, छात्राएं व शिक्षिकाएं",
      ar: "مفتوح للأخوات والباحثات والمعلمات",
    },
    medium: {
      ur: "اردو (شائستہ اور صریح انداز)",
      en: "Urdu (Modest & Scientific Medium)",
      hi: "उर्दू व हिन्दी (शिष्ट व स्पष्ट माध्यम)",
      ar: "العربية والأردية",
    },
    classTimings: {
      ur: "ہفتہ و اتوار: 4:00 تا 5:30 شام",
      en: "Saturday & Sunday: 4:00 PM - 5:30 PM",
      hi: "शनिवार व रविवार: शाम 4:00 से 5:30",
      ar: "السبت والأحد: 4:00 - 5:30 مساءً",
    },
    accreditation: {
      ur: "جامعہ برکاتِ حرم اسپیشلائزڈ سرٹیفکیٹ",
      en: "Jamia Specialized Certificate of Completion",
      hi: "जामिया स्पेशलाइज्ड सर्टिफ़िकेट",
      ar: "شهادة حضور معتمدة في فقه النوازل النسائية",
    },
    keySubjects: {
      ur: [
        "دماء ثلاثہ (حیض، نفاس، استحاضہ) کا تفصیلی فقہی و طبی تجزیہ",
        "جدید بیوٹی سرجری، بوٹوکس، ٹیٹو، نیل پالش و کاسمیٹکس کے احکام",
        "میڈیکل اسقاطِ حمل، آئی وی ایف (IVF) اور فیملی پلاننگ",
        "حقِ مہر، نان نفقہ، خلع و طلاق کے شرعی ضوابط",
        "سوشل میڈیا پردہ، تصاویر اور ڈیجیٹل انٹرایکشن",
      ],
      en: [
        "Detailed Fiqh & Medical Analysis of Women's Bleeding Cycles",
        "Shar'i Rulings on Cosmetic Surgery, Botox, Nail Art & Makeup",
        "Bio-Ethics: IVF, Contraception & Modern Medical Interventions",
        "Mahr, Maintenance, Khula, and Divorce Frameworks",
        "Digital Purdah, Social Media Etiquette & Photography",
      ],
      hi: [
        "हैज़, निफ़ास व इस्तिहाज़ा का विस्तृत फ़िक़्ही व मेडिकल विश्लेषण",
        "आधुनिक ब्यूटी सर्जरी, बोटोक्स, टैटू, नेल आर्ट व कॉस्मेटिक्स के अहकाम",
        "आईवीएफ (IVF), गर्भनिरोधक व आधुनिक मेडिकल तकनीकें",
        "मेहर, ख़र्चा, ख़ुला व तलाक़ के शरई नियम",
        "सोशल मीडिया पर पर्दा, फ़ोटो व डिजिटल अदब",
      ],
      ar: [
        "الأحكام الفقهية والطبية للدماء الطبيعية عند النساء",
        "أحكام عمليات التجميل المعاصرة والمكياج والزينة",
        "النوازل الطبية: أطفال الأنابيب والتلقيح الصناعي وتنظيم النسل",
        "أحكام المهر والنفقة والخلع والطلاق في الشريعة",
        "ضوابط الحجاب والستر في الفضاء الرقمي ووسائل التواصل",
      ],
    },
    learningOutcomes: {
      ur: [
        "دقیق شرعی و طبی مسائل کو بغیر کسی جھجک کے درست سمجھنے کی صلاحیت",
        "بیوٹی اور فیشن انڈسٹری میں حلال و حرام کی تفریق کی واقفیت",
        "اپنی اور دیگر بہنوں کی شرعی الجھنوں کا مستند حل فراہم کرنا",
      ],
      en: [
        "Precision in distinguishing between normal and abnormal purity cycles with medical clarity.",
        "Knowledge of halal versus prohibited cosmetics and aesthetic enhancements.",
        "Empowerment to provide authentic peer guidance with modesty and accuracy.",
      ],
      hi: [
        "तहारत व मेडिकल मसाइल को बिना किसी हिचकिचाहट के सही समझना।",
        "ब्यूटी और कॉस्मेटिक्स में हलाल व हराम की साफ़ पहचान।",
        "अन्य बहनों को सही शरई रहनुमाई देने का आत्मविश्वास।",
      ],
      ar: [
        "الوضوح التام في التفريق بين الدماء وأحكامها الفقهية والطبية.",
        "معرفة الحلال والحرام في الزينة والمستحضرات التجميلية الحديثة.",
        "القدرة على إرشاد الأخوات في المسائل الدقيقة بعلم وحياء شرعي.",
      ],
    },
    careerPaths: {
      ur: [
        "خواتین کے لیے فیملی ہیلپ لائن اور شرعی کونسلر",
        "اسکولز و کالجز میں نسوانی ورکشاپس کی ٹرینر",
      ],
      en: [
        "Female Shariah Counselor for Women's Consultations",
        "Workshop Instructor & Tarbiyah Speaker for Girls' Academies",
      ],
      hi: [
        "महिला शरई परामर्शदाता व पारिवारिक सलाहकार",
        "गर्ल्स स्कूलों व हॉस्टलों में वर्कशॉप ट्रेनर",
      ],
      ar: [
        "مرشدة ومستشارة شرعية في الجمعيات والمراكز الأسرية",
        "محاضرة في ورش العمل والندوات التثقيفية للفتيات",
      ],
    },
    syllabus: [
      {
        yearNumber: 1,
        yearLabel: {
          ur: "3 ماہ کا مکمل جامع نصاب",
          en: "3-Month Comprehensive Syllabus",
          hi: "3 महीने का मुकम्मल पाठ्यक्रम",
          ar: "المنهج الكامل للدورة (3 أشهر)",
        },
        focusTitle: {
          ur: "طہارت، معاصر میڈیکل مسائل، بیوٹی اور ازدواجی احکام",
          en: "Purity, Medical Bio-Ethics, Beauty & Marital Law",
          hi: "तहारत, मेडिकल मसले, ब्यूटी व वैवाहिक अहकाम",
          ar: "فقه الدماء والطهارة والنوازل الطبية والتجميلية",
        },
        books: [
          {
            title: "مسائلِ رفعتِ قاسمی (مسائلِ خواتین)",
            subject: {
              ur: "فتاویٰ متعلقہ خواتین",
              en: "Contemporary Women's Fiqh",
              hi: "महिला फ़िक़्ह",
              ar: "فتاوى المرأة المسلمة",
            },
          },
          {
            title: "المرأة في الفقه الإسلامي المعاصر",
            subject: {
              ur: "عصری ابحاث",
              en: "Modern Jurisprudential Studies",
              hi: "आधुनिक शोध",
              ar: "دراسات فقهية معاصرة",
            },
          },
        ],
      },
    ],
  },
  {
    id: "digital-smart-skills",
    category: "short",
    scholarshipEligible: false,
    deliveryMode: "hybrid",
    badgeColor: "emerald",
    iconName: "Laptop",
    seatsAvailable: "60 Seats / Batch",
    level: {
      ur: "عصری ہنر و اسکلز",
      en: "Modern Digital Skills Track",
      hi: "आधुनिक डिजिटल स्किल्स",
      ar: "المهارات الرقمية الحديثة واللغات",
    },
    title: {
      ur: "ڈیجیٹل اسمارٹ اسکلز و عربی و انگریزی تکلم",
      en: "Digital Smart Skills & Spoken Arabic / English",
      hi: "डिजिटल स्मार्ट स्किल्स व अरबी-अंग्रेज़ी सम्भाषण",
      ar: "المهارات الرقمية الحديثة والمحادثة باللغتين العربية والإنجليزية",
    },
    tagline: {
      ur: "طالبات اور معلمات کے لیے کمپیوٹر، اسمارٹ پینل ٹیچنگ، گرافک ڈیزائننگ اور زبان دانی کا 6 ماہ کا کورس",
      en: "6-Month Integrated Track: Computer Literacy, Smart Panel Pedagogy, Design & Dual Languages",
      hi: "छात्राओं व शिक्षिकाओं के लिए कंप्यूटर, स्मार्ट पैनल टीचिंग, डिज़ाइन व भाषा का 6 महीने का कोर्स",
      ar: "دورة لمدة 6 أشهر لإتقان الحاسوب، التدريس باللوحات الذكية، والتخاطب اللغوي",
    },
    description: {
      ur: "دینی طالبات کو عصری میدان میں خود اعتماد اور باصلاحیت بنانے کے لیے یہ کورس ڈیزائن کیا گیا ہے۔ اس میں کمپیوٹر بنیادیات، ایم ایس آفس، ڈیجیٹل اسمارٹ پینل پر تدریس کے طریقے، آن لائن کلاس مینجمنٹ، عربی بول چال (المحادثة العربية)، اور بنیادی انگریزی مواصلت سکھائی جاتی ہے تاکہ ہماری فارغات جدید تعلیمی اداروں میں شاندار خدمات انجام دے سکیں۔",
      en: "Designed to equip Islamic scholars with high-demand 21st-century technological tools. Covers basic computing, digital smart panel interactive teaching techniques, Canva & graphic creation for Islamic content, Spoken Modern Standard Arabic, and English communication skills.",
      hi: "दीनी तालिबात को आधुनिक दौर में सशक्त और आत्मविश्वासी बनाने के लिए यह कोर्स तैयार किया गया है। इसमें कंप्यूटर, एमएस ऑफ़िस, डिजिटल स्मार्ट पैनल पर पढ़ाने के आधुनिक तरीक़े, अरबी सम्भाषण (बातचीत) और अंग्रेज़ी कम्युनिकेशन सिखाया जाता है।",
      ar: "يهدف البرنامج إلى تمكين خريجات العلوم الشرعية بالمهارات التقنية المعاصرة، ويشمل تطبيقات الحاسوب، التدريس عبر الشاشات الذكية التفاعلية، والمحادثة باللغتين العربية الفصحى والإنجليزية.",
    },
    duration: {
      ur: "6 ماہ (ہفتہ میں 3 دن)",
      en: "6 Months (3 Days/Week)",
      hi: "6 महीने (हफ़्ते में 3 दिन)",
      ar: "6 أشهر (3 أيام أسبوعياً)",
    },
    eligibility: {
      ur: "جامعہ کی طالبات اور تمام دلچسپی رکھنے والی خواتین",
      en: "Jamia students, female scholars & interested women",
      hi: "जामिया की छात्राएं व सभी इच्छुक महिलाएं",
      ar: "طالبات الجامعة والمعلمات والراغبات في تطوير مهاراتهن",
    },
    medium: {
      ur: "اردو، عربی و انگریزی",
      en: "Urdu, Arabic & English",
      hi: "उर्दू, अरबी व अंग्रेज़ी",
      ar: "العربية والأردية والإنجليزية",
    },
    classTimings: {
      ur: "شام کا وقت: 3:30 تا 5:00 سہ پہر",
      en: "Afternoon: 3:30 PM - 5:00 PM",
      hi: "दोपहर बाद: 3:30 से 5:00",
      ar: "الفترة المسائية: 3:30 - 5:00 عصراً",
    },
    accreditation: {
      ur: "سرٹیفکیٹ اِن ڈیجیٹل ایجوکیشن اینڈ لینگویجز",
      en: "Certificate in Digital Pedagogy & Languages",
      hi: "सर्टिफ़िकेट इन डिजिटल पेडागॉजी व लैंग्वेजेस",
      ar: "شهادة معتمدة في المهارات الرقمية والتعليم الذكي",
    },
    keySubjects: {
      ur: [
        "کمپیوٹر بنیادیات، انٹرنیٹ سیکیورٹی و گوگل ورک اسپیس",
        "ڈیجیٹل اسمارٹ پینل اور انٹرایکٹو ایجوکیشن ٹیکنالوجی",
        "المحادثۃ العربیۃ (روزمرہ عربی تکلم و جملہ سازی)",
        "Spoken English for Islamic Teachers & Communicators",
        "کینوا گرافک ڈیزائننگ و سوشل میڈیا اسلامی پوسٹرز",
        "آن لائن کلاس روم مینجمنٹ (Zoom, Google Meet, OBS)",
      ],
      en: [
        "Computer Fundamentals, Cyber Safety & Google Workspace",
        "Digital Smart Board & Interactive Educational Tech",
        "Al-Muhadathah al-Arabiyyah (Spoken Arabic Fluency)",
        "Spoken English for Islamic Teachers & Communicators",
        "Canva Graphic Design for Islamic Educational Content",
        "Online Classroom Management (Zoom, Google Meet, OBS Studio)",
      ],
      hi: [
        "कंप्यूटर बेसिक्स, इंटरनेट सुरक्षा व गूगल वर्कस्पेस",
        "डिजिटल स्मार्ट पैनल पर आधुनिक टीचिंग के तरीक़े",
        "अल-मुहादसा अल-अरबिया (अरबी बोलचाल का अभ्यास)",
        "स्पोकन इंग्लिश (इस्लामिक टीचर्स के लिए)",
        "कैनवा ग्राफ़िक डिज़ाइन व इस्लामी पोस्टर्स बनाना",
        "ऑनलाइन क्लास मैनेजमेंट (ज़ूम, गूगल मीट, ओबीएस)",
      ],
      ar: [
        "أساسيات الحاسوب والأمان الرقمي وحزمة تطبيقات جوجل",
        "تقنيات التدريس عبر الشاشات واللوحات الذكية التفاعلية",
        "المحادثة باللغة العربية الفصحى والتعبير الشفهي",
        "اللغة الإنجليزية التخاطبية للمعلمات والمربيات",
        "تصميم المحتوى الدعوي والتعليمي عبر كانفا (Canva)",
        "إدارة الفصول الافتراضية عبر منصات التعليم عن بعد",
      ],
    },
    learningOutcomes: {
      ur: [
        "جدید اسمارٹ کلاس روم میں پراعتماد تدریس کا مکمل کنٹرول",
        "عربی زبان میں فصیح گفتگو اور روزمرہ تعبیرات پر عبور",
        "آن لائن کلاسز خود کنڈکٹ کرنے اور ڈیجیٹل نوٹس تیار کرنے کی صلاحیت",
        "انگریزی میں بنیادی گفتگو اور باوقار تعلیمی تعارف",
      ],
      en: [
        "Mastery over interactive digital smart panel pedagogy.",
        "Fluency in daily Modern Standard Arabic conversation.",
        "Ability to host professional online live webinars and create digital curricula.",
        "Confidence in basic English communicative discourse.",
      ],
      hi: [
        "डिजिटल स्मार्ट क्लासरूम में आत्मविश्वास के साथ पढ़ाने की क्षमता।",
        "अरबी भाषा में धाराप्रवाह बातचीत करने में महारत।",
        "ऑनलाइन क्लासेज़ संचालित करने व डिजिटल नोट्स बनाने की दक्षता।",
        "अंग्रेज़ी में सम्मानजनक बातचीत व परिचय देने की योग्यता।",
      ],
      ar: [
        "إتقان التدريس الاحترافي باستخدام الوسائط والشاشات الذكية.",
        "الطلاقة في المحادثة والتخاطب باللغة العربية الفصحى.",
        "القدرة على إدارة المحاضرات المرئية وإنشاء المحتوى الرقمي.",
        "اكتساب مهارات التواصل الأساسية باللغة الإنجليزية.",
      ],
    },
    careerPaths: {
      ur: [
        "اسمارٹ اسکولز و انگلش میڈیم اداروں میں اسلامیات معلّمہ",
        "گلوبل آن لائن قرآنی و اسلامی اکیڈمیز میں انٹرنیشنل ٹیوٹر",
        "اسلامی فاؤنڈیشنز میں سوشل میڈیا و کنٹینٹ مینیجر",
      ],
      en: [
        "Islamic Studies Teacher in Smart & International Schools",
        "Global Online Tutor for Overseas Islamic Academies",
        "Content & Media Coordinator for Islamic Institutions",
      ],
      hi: [
        "स्मार्ट स्कूलों में इस्लामी तालीम की शिक्षिका",
        "विदेशी ऑनलाइन अकादमियों में इंटरनेशनल ट्यूटर",
        "इस्लामिक संस्थानों में डिजिटल मीडिया व कंटेंट कोऑर्डिनेटर",
      ],
      ar: [
        "معلمة للتربية الإسلامية في المدارس الحديثة والدولية",
        "معلمة عن بعد في الأكاديميات الإسلامية العالمية",
        "منسقة محتوى وإعلام في المؤسسات التعليمية والدعوية",
      ],
    },
    syllabus: [
      {
        yearNumber: 1,
        yearLabel: {
          ur: "ماڈیول 1 تا 4",
          en: "Module 1-4: Tech & Languages",
          hi: "मॉड्यूल 1 से 4: तकनीक व भाषा",
          ar: "الوحدات 1-4: التقنية واللغات",
        },
        focusTitle: {
          ur: "کمپیوٹر، اسمارٹ پینلز، عربی بول چال اور انگریزی تکلم",
          en: "Computing, Smart Boards, Spoken Arabic & Spoken English",
          hi: "कंप्यूटर, स्मार्ट बोर्ड, अरबी व अंग्रेज़ी सम्भाषण",
          ar: "الحاسوب والشاشات الذكية والمحادثة العربية والإنجليزية",
        },
        books: [
          {
            title: "العربية بين يديك (دروس المحادثة المختارة)",
            subject: {
              ur: "عربی بول چال",
              en: "Spoken Arabic",
              hi: "अरबी बातचीत",
              ar: "المحادثة والتعبير العربي",
            },
            author: "د. عبد الرحمن الفوزان",
          },
        ],
      },
    ],
  },
];
