import type { Metadata } from "next";
import { CertificateVerifyView } from "@/modules/portal";

export const metadata: Metadata = {
  title: "سند و مارک شیٹ ویریفیکیشن • جامعہ برکاتِ حرم (Sanad Verification)",
  description:
    "جامعہ برکاتِ حرم کی جاری کردہ عالمہ، مفتیہ و فاضلہ اسناد اور مارک شیٹس کی آن لائن 100% مستند تصدیق کریں۔",
};

export default function DocumentVerifyPage() {
  return (
    <main className="min-h-screen w-full">
      <CertificateVerifyView />
    </main>
  );
}
