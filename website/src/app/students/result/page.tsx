import type { Metadata } from "next";
import { ExamResultView } from "@/modules/portal";

export const metadata: Metadata = {
  title: "امتحان رزلٹ • Examination Result • جامعہ برکاتِ حرم",
  description:
    "جامعہ برکاتِ حرم کے سالانہ و سمسٹر امتحانات کے تفصیلی نمبرات اور آفیشل مارک شیٹ چیک کریں۔ Check official semester and annual examination results and transcript.",
};

export default function ExamResultPage() {
  return (
    <main className="min-h-screen w-full">
      <ExamResultView />
    </main>
  );
}
