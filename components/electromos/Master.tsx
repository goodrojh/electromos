"use client";
import React from "react";
import { motion } from "framer-motion";
import { FileCheck2, BadgeCheck, Receipt, Wrench, HardHat, Sparkles } from "lucide-react";
import { useLead } from "./LeadModal";
import { img } from "./site";

const guarantees = [
  { icon: FileCheck2, t: "Договор с фиксированной ценой", d: "Сумма не меняется после начала работ" },
  { icon: BadgeCheck, t: "Допуск по электробезопасности", d: "Мастера с опытом от 5 лет" },
  { icon: Receipt, t: "Чек и гарантийный талон", d: "Работаем официально, ООО" },
  { icon: Wrench, t: "Профессиональный инструмент", d: "Штроборез с пылесосом, тестеры, мегаомметр" },
  { icon: HardHat, t: "Соблюдаем ПУЭ", d: "Сечение кабеля, УЗО, заземление — по нормам" },
  { icon: Sparkles, t: "Чистота после работы", d: "Бахилы, плёнка, уборка мусора" },
];

export default function Master() {
  const { open } = useLead();

  return (
    <section className="bg-white px-5 md:px-8 py-20 md:py-28">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[420px_1fr] gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[32px] overflow-hidden aspect-[4/5] max-w-[420px] mx-auto w-full"
        >
          <img src={img("master.jpg")} alt="Электрик ЭлектроМос" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/25 p-4">
            <p className="text-white font-display font-bold text-lg leading-tight">«Делаю так, чтобы вы забыли про электрику на 20 лет»</p>
            <p className="text-white/65 text-[13px] mt-1">Старший мастер ЭлектроМос</p>
          </div>
        </motion.div>

        <div>
          <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-volt-deep">Кто к вам приедет</span>
          <h2 className="mt-3 font-display font-bold text-[32px] md:text-[44px] leading-[1.08] text-ink">
            Не «мужик с объявления», <br className="hidden md:block" />а электрик с ответственностью
          </h2>
          <p className="mt-4 text-muted text-base md:text-lg max-w-xl">
            Каждый мастер проходит проверку и работает по нашим стандартам. Мы отвечаем за результат — не он один.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {guarantees.map((g, i) => (
              <motion.div
                key={g.t}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-3 rounded-2xl bg-paper p-4"
              >
                <div className="w-10 h-10 rounded-xl bg-ink flex items-center justify-center shrink-0">
                  <g.icon className="w-5 h-5 text-volt" />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-ink leading-snug">{g.t}</div>
                  <div className="text-[12px] text-muted mt-0.5">{g.d}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() =>
              open({
                source: "master",
                title: "Задайте вопрос мастеру",
                subtitle: "Мастер перезвонит и бесплатно проконсультирует — даже если вы пока просто прицениваетесь.",
                button: "Жду звонка мастера",
              })
            }
            className="mt-8 rounded-full px-8 py-4 bg-ink text-white font-semibold hover:bg-volt hover:text-ink transition-colors"
          >
            Задать вопрос мастеру
          </button>
        </div>
      </div>
    </section>
  );
}
