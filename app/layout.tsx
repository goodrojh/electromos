import type { Metadata, Viewport } from "next";
import { Unbounded, Manrope } from "next/font/google";
import "./globals.css";

const display = Unbounded({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "600", "700", "800"], variable: "--font-display" });
const body = Manrope({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "600", "700", "800"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Электрик на дом в Москве за 40 минут — ЭлектроМос | +7 000 000 00 00",
  description:
    "Вызов электрика в Москве и Новой Москве 24/7. Выезд от 40 минут, бесплатная диагностика, фиксированная цена в договоре, гарантия до 2 лет.",
};

export const viewport: Viewport = { themeColor: "#0A0B0D", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
