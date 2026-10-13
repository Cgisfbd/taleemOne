import type { Metadata } from "next";
import { BRAND } from "@/shared/config/brand";
import { DashboardOverview } from "@/widgets/dashboard-overview";

export const metadata: Metadata = {
  title: `Administrative Dashboard | ${BRAND.fullName}`,
  description: `Executive institutional administration center for ${BRAND.fullName}. ${BRAND.attribution}.`,
};

export default function DashboardPage() {
  return <DashboardOverview />;
}
