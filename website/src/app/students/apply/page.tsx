import type { Metadata } from "next";
import { EntranceApplyView } from "@/modules/portal";

export const metadata: Metadata = {
  title: "انٹرنس ٹیسٹ آن لائن فارم • جامعہ برکاتِ حرم (Entrance Application 2026)",
  description:
    "جامعہ برکاتِ حرم میں تعلیمی سال 2026-27 کے لیے 100% اسکالرشپ انٹرنس ٹیسٹ کا آن لائن داخلہ فارم پر کریں۔",
};

export default function EntranceApplyPage() {
  return (
    <main className="min-h-screen w-full">
      <EntranceApplyView />
    </main>
  );
}
