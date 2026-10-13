export const API_ENDPOINTS = {
  STUDENTS: {
    ADMIT_CARD: "/api/students/admit-card",
    EXAM_RESULT: "/api/students/exam-result",
    ENTRANCE_APPLY: "/api/students/entrance-apply",
    ENTRANCE_RESULT: "/api/students/entrance-result",
    DOCUMENT_VERIFY: "/api/students/verify",
  },
  PLACEMENT: {
    TEACHER_REGISTER: "/api/placement/teacher-register",
    MADARSA_REQUEST: "/api/placement/madarsa-request",
    STATS: "/api/placement/stats",
  },
  COURSES: {
    LIST: "/api/courses",
    DETAIL: (slug: string) => `/api/courses/${slug}`,
  },
  NOTICES: {
    LIST: "/api/notices",
  },
  GALLERY: {
    LIST: "/api/gallery",
  },
  CONTACT: {
    SUBMIT: "/api/contact",
  },
} as const;
