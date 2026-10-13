import type { Metadata } from "next";
import { AdmitCardView } from "@/modules/portal";

export const metadata: Metadata = {
  title: "ایڈمٹ کارڈ ڈاؤنلوڈ • جامعہ برکاتِ حرم (Download Admit Card)",
  description:
    "جامعہ برکاتِ حرم کے انٹرنس ٹیسٹ اور سمسٹر امتحانات کا آفیشل ہال ٹکٹ و ایڈمٹ کارڈ ڈاؤنلوڈ اور پرنٹ کریں۔",
};

export default function AdmitCardPage() {
  return (
    <main className="min-h-screen w-full">
      <AdmitCardView />
    </main>
  );
}
