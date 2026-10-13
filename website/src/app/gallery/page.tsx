import type { Metadata } from "next";
import { GalleryView } from "@/modules/gallery";

export const metadata: Metadata = {
  title: "تصویری گیلری • جامعہ برکاتِ حرم (Gallery)",
  description:
    "جامعہ برکاتِ حرم (مرکز الدراسات الاسلامیۃ للبنات) کے کیمپس، اسمارٹ کلاس رومز، لائبریری، ہاسٹل، تقاریب اور تعلیمی سرگرمیوں کی تصویری گیلری۔",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen w-full">
      <GalleryView />
    </main>
  );
}
