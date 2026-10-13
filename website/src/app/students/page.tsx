import type { Metadata } from "next";
import { StudentPortalView } from "@/modules/portal";

export const metadata: Metadata = {
  title: "طالبات پورٹل • جامعہ برکاتِ حرم (Student Academic & Exam Portal)",
  description:
    "جامعہ برکاتِ حرم (مرکز الدراسات الاسلامیۃ للبنات) کا مرکزی طالبات پورٹل: 100% اسکالرشپ انٹرنس فارم، ایڈمٹ کارڈ، امتحانی مارک شیٹ، رزلٹ اور سند ویریفیکیشن۔",
  keywords: [
    "Jamia Barkat-e-Haram Student Portal",
    "Islamic Studies Scholarship",
    "Admit Card Download",
    "Alimah Result Marksheet",
    "Sanad Verification",
    "Entrance Exam 2026",
    "طالبات پورٹل",
    "ایڈمٹ کارڈ",
    "مارک شیٹ",
    "سند تصدیق",
  ],
};

export default function StudentsPortalPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Jamia Barkat-e-Haram Student Portal",
    "description":
      "Digital student services gateway for entrance examinations, admit cards, marksheet records, and certificate verifications.",
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Jamia Barkat-e-Haram",
      "url": "https://jamiabarkateharam.edu",
    },
  };

  return (
    <main className="min-h-screen w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StudentPortalView />
    </main>
  );
}
