"use client";
import React from "react";
import { Phone, AlertTriangle } from "lucide-react";
import { useLead } from "./LeadModal";
import { PHONE_DISPLAY, PHONE_HREF } from "./site";
import Pic from "./Pic";

const tips = ["Не прикасайтесь к щитку влажными руками", "Отключите бытовую технику от сети", "При запахе гари отключите вводной автомат"];

export default function Emergency() {
  const { open } = useLead();
  return (
    <section className="px-3 md:px-8 py-4 bg-white">
      <div className="max-w-[1300px] mx-auto relative rounded-[28px] overflow-hidden min-h-[560px] flex items-end md:items-center">
        <Pic name="outage" alt="Отключение электроэнергии в квартире" className="absolute inset-0 w-full h-full object-cover object-[65%_center]" />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-ink via-ink/80 to-ink/10" />

        <div className="relative z-10 w-full p-6 md:p-14 max-w-xl">
          <h2 className="font-display font-bold text-[34px] md:text-[52px] leading-[1.02] text-white">
            Аварийный выезд <br />круглосуточно
          </h2>
          <p className="mt-4 text-white/70 text-base md:text-lg">
            Выезжаем ночью, в выходные и праздничные дни. Время прибытия — от 40 минут.
          </p>

          <p className="mt-6 text-[13px] font-semibold text-white/50">До приезда специалиста:</p>
          <ul className="mt-2 space-y-2">
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
              <Phone className="w-5 h-5 relative" />
              <span className="relative">{PHONE_DISPLAY}</span>
            </a>
            <button
              onClick={() =>
                open({
                  source: "emergency",
                  title: "Аварийный вызов",
                  subtitle: "Перезвоним в течение 5 минут. До приезда специалиста не прикасайтесь к щитку и проводке.",
                  options: ["Нет света везде", "Нет света в части комнат", "Искрит / дым", "Выбивает автомат"],
                  optionsLabel: "Что происходит?",
                  accent: "red",
                  button: "Отправить заявку",
                })
              }
              className="rounded-full px-7 py-4 bg-white/10 border border-white/25 text-white font-semibold hover:bg-white/20 transition-colors"
            >
              Перезвоните мне
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
