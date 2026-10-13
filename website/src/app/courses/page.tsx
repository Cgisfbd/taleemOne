import type { Metadata } from "next";
import { CoursesView } from "@/modules/courses";

export const metadata: Metadata = {
  title: "تعلیمی شعبہ جات و مکمل نصاب • جامعہ برکاتِ حرم (Courses & Syllabus)",
  description:
    "جامعہ برکاتِ حرم (مرکز الدراسات الاسلامیۃ للبنات) کے تعلیمی شعبہ جات: تخصص فی الافتاء (مفتیہ کورس)، درسِ نظامی (عالمہ و فاضلہ)، شعبہ حفظ و تجوید اور ڈیجیٹل اسمارٹ کلاسز کا مکمل نصاب۔",
  keywords: [
    "Muftiya Course",
    "Takhassus Fil Ifta",
    "Dars-e-Nizami Alimah",
    "Girls Islamic Studies",
    "Jamia Barkat-e-Haram Courses",
    "Hifz o Tajweed",
    "Online Islamic Classes for Girls",
    "تخصّص فی الافتاء",
    "درسِ نظامی عالمہ کورس",
    "تجوید القرآن",
  ],
  openGraph: {
    title: "Courses & Academic Programs • Jamia Barkat-e-Haram",
    description:
      "Explore comprehensive classical Islamic scholarship and modern digital classrooms for female scholars.",
    type: "website",
  },
};

export default function CoursesPage() {
  // Schema.org structured data for Educational Organization Programs
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "name": "Jamia Barkat-e-Haram Academic Programs",
    "description":
      "Classical Islamic scholarship, Takhassus Fil Ifta, Dars-e-Nizami, and Hifz-o-Tajweed for female scholars with 100% scholarship options.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Jamia Barkat-e-Haram",
      "url": "https://jamiabarkateharam.edu",
    },
    "educationalProgramMode": ["Online", "Onsite", "Blended"],
  };

  return (
    <main className="min-h-screen w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CoursesView />
    </main>
  );
}
