"use client";
import React from "react";
import { m } from "framer-motion";
import { PowerOff, Flame, Plug, Lamp, ToggleRight, Cable, ArrowUpRight, Gauge } from "lucide-react";
import { useLead } from "./LeadModal";

const problems = [
  { icon: PowerOff, title: "Пропал свет", hint: "во всей квартире или в части комнат", urgent: true },
  { icon: Flame, title: "Искрит или пахнет гарью", hint: "розетка, выключатель, щиток", urgent: true },
  { icon: ToggleRight, title: "Выбивает автомат", hint: "при включении техники", urgent: true },
  { icon: Plug, title: "Перенести / добавить розетки", hint: "от 250 ₽ за точку", urgent: false },
  { icon: Lamp, title: "Повесить люстру или споты", hint: "сборка и подключение", urgent: false },
  { icon: Gauge, title: "Заменить счётчик", hint: "с опломбировкой", urgent: false },
  { icon: Cable, title: "Заменить проводку", hint: "частично или под ключ", urgent: false },
];

export default function Problems() {
  const { open } = useLead();

  return (
    <section className="bg-ink px-5 md:px-8 pb-24 pt-6 md:pt-10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <h2 className="font-display font-bold text-3xl md:text-[44px] leading-[1.05] text-white">
            Выберите задачу
            <span className="block text-white/45 font-sans font-medium text-base md:text-lg mt-3">Укажите тип работ — специалист перезвонит и сориентирует по стоимости</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {problems.map((p, i) => (
            <m.button
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              onClick={() =>
                open({
                  source: "problem:" + p.title,
                  title: p.urgent ? "Срочно: " + p.title.toLowerCase() : p.title,
                  subtitle: p.urgent
                    ? "Не прикасайтесь к щитку и проводке до приезда специалиста. Перезвоним в течение 5 минут."
                    : "Специалист перезвонит, уточнит детали и согласует стоимость до выезда.",
                  accent: p.urgent ? "red" : "volt",
                  askTime: !p.urgent,
                  button: p.urgent ? "Срочный вызов" : "Узнать стоимость",
                  summary: "Задача: " + p.title,
                })
              }
              className={
                "group text-left relative overflow-hidden rounded-[24px] p-5 border transition-colors " +
                (p.urgent
                  ? "bg-gradient-to-br from-[#2a1210] to-graphite border-red-500/20 hover:border-red-400/60"
                  : "bg-graphite border-white/10 hover:border-volt/60")
              }
            >
              <div className="flex items-start justify-between">
                <div
                  className={
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 " +
                    (p.urgent ? "bg-red-500/15 text-red-400" : "bg-volt/10 text-volt")
                  }
                >
                  <p.icon className="w-6 h-6" />
                </div>
                {p.urgent ? (
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-red-300 bg-red-500/15 rounded-full px-2.5 py-1">срочно</span>
                ) : (
                  <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-volt transition-colors" />
                )}
              </div>
              <h3 className="mt-6 font-display font-semibold text-[17px] text-white leading-snug">{p.title}</h3>
              <p className="mt-1 text-[13px] text-white/45">{p.hint}</p>
            </m.button>
          ))}

          <m.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            onClick={() =>
              open({
                source: "problem:other",
                title: "Консультация специалиста",
                subtitle: "Опишите задачу в комментарии — специалист перезвонит и проконсультирует бесплатно.",
                button: "Получить консультацию",
              })
            }
            className="text-left rounded-[24px] p-5 bg-volt text-ink flex flex-col justify-between min-h-[160px] hover:shadow-[0_0_50px_-10px_rgba(255,198,26,0.8)] transition-shadow"
          >
            <span className="text-[13px] font-semibold opacity-70">Другая задача</span>
            <span className="font-display font-bold text-xl leading-tight flex items-end justify-between gap-2">
              Консультация специалиста
              <ArrowUpRight className="w-6 h-6 shrink-0" />
            </span>
          </m.button>
        </div>
      </div>
    </section>
  );
}
