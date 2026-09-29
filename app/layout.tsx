import type { Metadata, Viewport } from "next";
import { Unbounded, Manrope } from "next/font/google";
import "./globals.css";

// Variable fonts: one file per subset instead of one per weight
const display = Unbounded({ subsets: ["latin", "cyrillic"], variable: "--font-display", display: "swap" });
const body = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "Электрик на дом в Москве — выезд от 40 минут | ЭлектроМос",
  description:
    "Вызов электрика в Москве и Новой Москве круглосуточно. Выезд от 40 минут, бесплатная диагностика, фиксированная стоимость в договоре, гарантия до 2 лет. Тел. +7 000 000 00 00",
};

export const viewport: Viewport = { themeColor: "#0A0B0D", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
