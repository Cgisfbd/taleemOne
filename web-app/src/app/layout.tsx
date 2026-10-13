import type { Metadata } from "next";
import { BRAND } from "@/shared/config/brand";
import { GlobalBackdrop, PremiumToaster } from "@/shared/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: BRAND.fullName,
  description: `${BRAND.fullName}. ${BRAND.attribution}.`,
  icons: { icon: BRAND.crest },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <GlobalBackdrop />
        <PremiumToaster />
        {children}
      </body>
    </html>
  );
}
