"use client";
import React from "react";
import { m } from "framer-motion";
import { FileCheck2, BadgeCheck, Receipt, Wrench, HardHat, Sparkles } from "lucide-react";
import { useLead } from "./LeadModal";
import Pic from "./Pic";

const guarantees = [
  { icon: FileCheck2, t: "Договор с фиксированной ценой", d: "Сумма не меняется после начала работ" },
  { icon: BadgeCheck, t: "Допуск по электробезопасности", d: "Подтверждённая квалификация" },
  { icon: Receipt, t: "Чек и гарантийный талон", d: "Работаем официально, ООО" },
  { icon: Wrench, t: "Профессиональный инструмент", d: "Штроборез с пылесосом, тестеры, мегаомметр" },
  { icon: HardHat, t: "Соблюдаем ПУЭ", d: "Сечение кабеля, УЗО, заземление — по нормам" },
  { icon: Sparkles, t: "Чистота после работы", d: "Бахилы, плёнка, уборка мусора" },
];

export default function Master() {
  const { open } = useLead();

  return (
    <section className="bg-white px-5 md:px-8 py-20 md:py-28">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] xl:grid-cols-[420px_minmax(0,1fr)] gap-10 lg:gap-14 items-center">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[32px] overflow-hidden aspect-[4/5] max-w-[420px] mx-auto w-full"
        >
          <Pic name="master" alt="Специалист ЭлектроМос" sizes="(min-width: 1024px) 420px, 100vw" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-ink/60 border border-white/20 p-4">
            <p className="text-white font-display font-bold text-lg leading-tight">Специалист ЭлектроМос</p>
            <p className="text-white/65 text-[13px] mt-1">Электромонтажные работы любой сложности</p>
          </div>
        </m.div>

        <div>
          <h2 className="font-display font-bold text-[26px] sm:text-[32px] md:text-[40px] xl:text-[44px] leading-[1.08] text-ink">
            Квалифицированные специалисты
          </h2>
          <p className="mt-4 text-muted text-base md:text-lg max-w-xl">
            Специалисты проходят проверку квалификации и работают по единым стандартам компании. Ответственность за результат несёт компания.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {guarantees.map((g, i) => (
              <m.div
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
              </m.div>
            ))}
          </div>

          <button
            onClick={() =>
              open({
                source: "master",
                title: "Консультация специалиста",
                subtitle: "Специалист перезвонит и бесплатно ответит на ваши вопросы.",
                button: "Отправить заявку",
              })
            }
            className="mt-8 rounded-full px-8 py-4 bg-ink text-white font-semibold hover:bg-volt hover:text-ink transition-colors"
          >
            Консультация специалиста
          </button>
        </div>
      </div>
    </section>
  );
}
