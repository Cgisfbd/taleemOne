import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Cinzel } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/shared/i18n";
import { ThemeProvider } from "@/shared/theme";
import { Header, Footer, CookieBanner } from "@/shared/layout";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jamia Barkat-e-Haram — Girls' Islamic Studies Centre",
  description:
    "Jamia Barkat-e-Haram: Girls' Islamic Studies Centre offering Takhassus Fil Ifta, Dars-e-Nizami, and 100% scholarship programs.",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ur" dir="rtl" className={`${inter.variable} ${playfair.variable} ${cinzel.variable}`}>
      <body className="bg-pastel-mesh min-h-screen flex flex-col text-bah-text-primary dark:text-bah-dark-text-primary antialiased selection:bg-amber-500/30">
        <ThemeProvider>
          <LanguageProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <CookieBanner />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
