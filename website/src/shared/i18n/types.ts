export type LanguageCode = "en" | "ur" | "ar" | "hi";

export type Direction = "ltr" | "rtl";

export interface LanguageConfig {
  code: LanguageCode;
  label: string;
  nativeName: string;
  dir: Direction;
  fontFamily: string;
}

export interface TranslationDictionary {
  common: {
    appName: string;
    tagline: string;
    loading: string;
    error: string;
    submit: string;
    search: string;
    cancel: string;
    viewAll: string;
    download: string;
    verify: string;
    accept: string;
    back: string;
    [key: string]: any;
  };
  nav: {
    home: string;
    about: string;
    courses: string;
    gallery: string;
    studentPortal: string;
    placementCell?: string;
    contact: string;
    admissionOpen: string;
    applyNow?: string;
    topNotice?: string;
    helpline?: string;
    appDownload?: string;
    coursesList?: {
      muftiya: string;
      muftiyaDesc: string;
      darsNizami: string;
      darsNizamiDesc: string;
      hifz: string;
      hifzDesc: string;
      smartClasses: string;
      smartClassesDesc: string;
      [key: string]: string;
    };
    studentPortalList?: {
      entranceApply: string;
      entranceApplyDesc: string;
      admitCard: string;
      admitCardDesc: string;
      examResult: string;
      examResultDesc: string;
      documentVerify: string;
      documentVerifyDesc: string;
      [key: string]: string;
    };
    placementList?: {
      teacherRegister: string;
      teacherRegisterDesc: string;
      madarsaRequest: string;
      madarsaRequestDesc: string;
      [key: string]: string;
    };
    [key: string]: any;
  };
  footer: {
    rightsReserved: string;
    privacyPolicy: string;
    termsConditions: string;
    address: string;
    contactUs: string;
    securityBadge: string;
    [key: string]: any;
  };
  hero?: {
    badge: string;
    exploreCourses: string;
    studentPortal: string;
    applyOnline: string;
    slides: Array<{
      tag: string;
      title: string;
      subtitle: string;
    }>;
    highlights: {
      scholarship: string;
      scholarshipSub: string;
      smartClass: string;
      smartClassSub: string;
      hybridIfta: string;
      hybridIftaSub: string;
      [key: string]: string;
    };
    [key: string]: any;
  };
  coursesPage?: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    clearSearch: string;
    showing: string;
    coursesCount: string;
    filters: {
      all: string;
      ifta: string;
      alimah: string;
      hifz: string;
      short: string;
      scholarship: string;
    };
    modes: {
      all: string;
      hybrid: string;
      campus: string;
      modular: string;
    };
    labels: {
      duration: string;
      eligibility: string;
      mode: string;
      language: string;
      credits: string;
      scholarshipEligible: string;
      viewSyllabus: string;
      applyNow: string;
      downloadBrochure: string;
      keySubjects: string;
      learningOutcomes: string;
      closeModal: string;
      syllabusOverview: string;
      semesterBreakdown: string;
      coreBooks: string;
      careerPaths: string;
      noCoursesFound: string;
      noCoursesDesc: string;
      resetFilter: string;
      shareCourse: string;
      copied: string;
    };
    comparison: {
      badge: string;
      title: string;
      subtitle: string;
      headers: {
        program: string;
        level: string;
        duration: string;
        mode: string;
        smartClasses: string;
        scholarship: string;
        certification: string;
      };
    };
    scholarshipBanner: {
      badge: string;
      title: string;
      subtitle: string;
      highlight1: string;
      highlight2: string;
      highlight3: string;
      ctaApply: string;
      ctaResult: string;
    };
    admissionRoadmap: {
      badge: string;
      title: string;
      subtitle: string;
      steps: Array<{
        step: string;
        title: string;
        desc: string;
      }>;
    };
    faq: {
      badge: string;
      title: string;
      subtitle: string;
      items: Array<{
        question: string;
        answer: string;
      }>;
    };
    [key: string]: any;
  };
  [key: string]: any;
}
