import type { Metadata } from "next";
import { EntranceResultView } from "@/modules/portal";

export const metadata: Metadata = {
  title: "انٹرنس ٹیسٹ رزلٹ و میرٹ • جامعہ برکاتِ حرم (Entrance Test Result)",
  description:
    "جامعہ برکاتِ حرم 100% اسکالرشپ انٹرنس ٹیسٹ کا اسکور کارڈ اور میرٹ لسٹ چیک کریں۔",
};

export default function EntranceResultPage() {
  return (
    <main className="min-h-screen w-full">
      <EntranceResultView />
    </main>
  );
}
