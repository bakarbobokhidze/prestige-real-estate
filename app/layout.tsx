import type { Metadata } from "next";
import { Inter, Noto_Sans_Georgian } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/context/language-context";
import "./globals.css";
import { CurrencyProvider } from "@/context/currency-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSansGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  variable: "--font-georgian",
});

export const metadata: Metadata = {
  title: "Nini's Homes",
  description:
    "Discover exceptional properties with Prestige. Premium real estate services for discerning clients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body
        className={`${inter.variable} ${notoSansGeorgian.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          <CurrencyProvider>{children}</CurrencyProvider>
        </LanguageProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
