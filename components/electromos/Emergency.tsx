"use client";
import React from "react";
import { motion } from "framer-motion";
import { Phone, Siren, AlertTriangle } from "lucide-react";
import { useLead } from "./LeadModal";
import { PHONE_DISPLAY, PHONE_HREF, img } from "./site";

const tips = ["Не трогайте щиток мокрыми руками", "Выключите технику из розеток", "Если пахнет гарью — отключите вводной автомат"];

export default function Emergency() {
  const { open } = useLead();
  return (
    <section className="px-3 md:px-8 py-4 bg-white">
      <div className="max-w-[1300px] mx-auto relative rounded-[28px] overflow-hidden min-h-[560px] flex items-end md:items-center">
        <img src={img("outage.jpg")} alt="Отключение света в квартире ночью" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-ink via-ink/80 to-ink/10" />
        {/* flicker */}
        <motion.div
          animate={{ opacity: [0, 0, 0.18, 0, 0.1, 0, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0 bg-volt pointer-events-none mix-blend-overlay"
        />

        <div className="relative z-10 p-6 md:p-14 max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-red-500/20 border border-red-400/30 px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.14em] text-red-300">
            <Siren className="w-4 h-4" /> Аварийная служба 24/7
          </span>
          <h2 className="mt-5 font-display font-bold text-[34px] md:text-[52px] leading-[1.02] text-white">
            Пропал свет <br />в 2 часа ночи?
          </h2>
          <p className="mt-4 text-white/70 text-base md:text-lg">
            Работаем круглосуточно, в выходные и праздники. Ночной мастер приедет так же быстро, как дневной.
          </p>

          <ul className="mt-6 space-y-2">
            {tips.map((t) => (
              <li key={t} className="flex items-start gap-2 text-[14px] text-white/80">
                <AlertTriangle className="w-4 h-4 text-volt mt-0.5 shrink-0" /> {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={PHONE_HREF}
              className="relative rounded-full px-7 py-4 bg-red-500 text-white font-bold flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
            >
              <span className="absolute inset-0 rounded-full animate-ping bg-red-500/40" />
              <Phone className="w-5 h-5 relative" />
              <span className="relative">{PHONE_DISPLAY}</span>
            </a>
            <button
              onClick={() =>
                open({
                  source: "emergency",
                  title: "Аварийный вызов",
                  subtitle: "Перезвоним в течение 2 минут. Пока ждёте — не трогайте щиток и проводку.",
                  options: ["Нет света везде", "Нет света в части комнат", "Искрит / дым", "Выбивает автомат"],
                  optionsLabel: "Что происходит?",
                  accent: "red",
                  button: "Срочно перезвоните",
                })
              }
              className="rounded-full px-7 py-4 bg-white/10 backdrop-blur-md border border-white/25 text-white font-semibold hover:bg-white/20 transition-colors"
            >
              Перезвоните мне
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
