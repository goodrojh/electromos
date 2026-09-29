"use client";
import React from "react";
import { m } from "framer-motion";
import { Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { useLead } from "./LeadModal";
import { Logo } from "./Hero";
import { ADDRESS, PHONE_DISPLAY, PHONE_HREF, TELEGRAM_HREF, WHATSAPP_HREF } from "./site";
import Pic from "./Pic";

export default function Footer() {
  const { open } = useLead();

  return (
    <footer className="w-full bg-white pb-20 md:pb-0">
      <div className="m-2 rounded-[24px] overflow-hidden relative min-h-[100svh] md:min-h-[820px] flex flex-col">
        <Pic name="moscow" alt="Вечерняя Москва" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink/80" />

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 md:px-20 pt-20 pb-10 text-center">
          <m.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-[40px] md:text-[76px] font-bold text-white leading-[0.98] tracking-[-0.03em]"
          >
            Электрик на дом <br />
            <span className="text-volt">по Москве</span>
          </m.h2>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 w-full max-w-[560px] bg-ink/50 rounded-[32px] sm:rounded-full border border-white/25 flex flex-col sm:flex-row overflow-hidden p-1.5 gap-1.5"
          >
            <a href={PHONE_HREF} className="flex-1 flex items-center justify-center gap-3 px-4 sm:px-6 py-4 text-white font-display font-bold text-lg sm:text-xl whitespace-nowrap">
              <Phone className="w-5 h-5 text-volt" /> {PHONE_DISPLAY}
            </a>
            <button
              onClick={() =>
                open({
                  source: "footer",
                  title: "Обратный звонок",
                  subtitle: "Оставьте номер телефона — специалист перезвонит в течение 5 минут.",
                  askTime: true,
                  button: "Перезвоните мне",
                })
              }
              className="px-8 py-4 bg-volt text-ink rounded-full text-[13px] font-bold tracking-[0.1em] uppercase hover:bg-white transition-colors whitespace-nowrap"
            >
              Перезвоните мне
            </button>
          </m.div>
        </div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 bg-ink/80 md:bg-ink/60 md:backdrop-blur-xl border border-white/15 rounded-[24px] mx-3 md:mx-5 mb-3 md:mb-5 p-6 md:p-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.3fr_1fr_1fr_1.2fr] gap-8 md:gap-10">
            <div>
              <Logo />
              <p className="mt-3 text-white/55 text-[13px] leading-relaxed max-w-[260px]">
                Электрик на дом в Москве и Новой Москве. Выезд от 40 минут, фиксированная цена, гарантия до 2 лет.
              </p>
            </div>

            <div>
              <h4 className="text-white text-[13px] font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2">
                {["Розетки и выключатели", "Люстры и светильники", "Электрощиты", "Замена проводки", "Аварийный выезд"].map((l) => (
                  <li key={l}>
                    <a href="#services" className="text-white/60 text-[13px] hover:text-volt transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-[13px] font-semibold mb-4">Клиентам</h4>
              <ul className="space-y-2">
                {[
                  ["Калькулятор", "#calc"],
                  ["Цены", "#pricing"],
                  ["Примеры работ", "#cases"],
                  ["Вопросы", "#faq"],
                ].map(([l, h]) => (
                  <li key={l}>
                    <a href={h} className="text-white/60 text-[13px] hover:text-volt transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-[13px] font-semibold mb-4">Контакты</h4>
              <ul className="space-y-3 text-[13px] text-white/70">
                <li><a href={PHONE_HREF} className="flex items-center gap-2 text-white font-semibold hover:text-volt"><Phone className="w-4 h-4 text-volt" /> {PHONE_DISPLAY}</a></li>
                <li className="flex items-start gap-2"><Clock className="w-4 h-4 text-volt mt-0.5" /> Круглосуточно, без выходных</li>
                <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-volt mt-0.5 shrink-0" /> {ADDRESS}</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-white/50 text-[12px]">Напишите нам:</span>
              {[
                { n: "WhatsApp", h: WHATSAPP_HREF, i: <MessageCircle className="w-4 h-4" /> },
                { n: "Telegram", h: TELEGRAM_HREF, i: <Send className="w-4 h-4" /> },
                { n: "VK", h: "https://vk.com/electric_rs", i: <span className="text-[11px] font-bold">VK</span> },
              ].map((s) => (
                <a key={s.n} href={s.h} target="_blank" rel="noreferrer" aria-label={s.n} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-volt hover:text-ink hover:border-volt transition-colors">
                  {s.i}
                </a>
              ))}
            </div>
            <p className="text-white/40 text-[11px] text-center md:text-right">
              ООО «Электромонтаж» · ИНН 4346445471 · ОГРН 1164350065354 · © {new Date().getFullYear()}
            </p>
          </div>
        </m.div>
      </div>
    </footer>
  );
}
