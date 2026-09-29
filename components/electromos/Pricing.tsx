"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { useLead } from "./LeadModal";
import { img } from "./site";

const plans = [
  {
    name: "Мелкий ремонт",
    tagline: "Когда нужно «просто починить».",
    price: "1 500 ₽",
    unit: "/ВЫЕЗД С РАБОТОЙ",
    isPopular: false,
    cta: "Вызвать мастера",
    features: ["ВЫЕЗД ОТ 40 МИНУТ", "ДИАГНОСТИКА БЕСПЛАТНО", "РОЗЕТКИ, ВЫКЛЮЧАТЕЛИ, АВТОМАТЫ", "ЛЮСТРЫ И СВЕТИЛЬНИКИ", "ОПЛАТА ПОСЛЕ ПРОВЕРКИ", "ГАРАНТИЯ 1 ГОД"],
  },
  {
    name: "Комната",
    tagline: "Обновить электрику в одной комнате.",
    price: "15 000 ₽",
    unit: "/ПОД КЛЮЧ",
    isPopular: true,
    cta: "Рассчитать комнату",
    features: ["ЗАМЕНА ПРОВОДКИ НА МЕДЬ", "НОВЫЕ ТОЧКИ И ПЕРЕНОС", "ШТРОБЛЕНИЕ С ПЫЛЕСОСОМ", "ОТДЕЛЬНЫЙ АВТОМАТ НА ЛИНИЮ", "УБОРКА ПОСЛЕ РАБОТ", "ГАРАНТИЯ 2 ГОДА"],
  },
  {
    name: "Квартира",
    tagline: "Полная замена электрики.",
    price: "1 200 ₽",
    unit: "/М² ПОД КЛЮЧ",
    isPopular: false,
    cta: "Получить смету",
    features: ["ВЫЕЗД ИНЖЕНЕРА И СХЕМА", "СБОРКА НОВОГО ЩИТА С УЗО", "ВСЯ ПРОВОДКА И ОСВЕЩЕНИЕ", "ЗАМЕРЫ И АКТ ПРИЁМКИ", "ФИКСИРОВАННАЯ СМЕТА", "ГАРАНТИЯ 2 ГОДА"],
  },
];

function DotGridIcon() {
  return (
    <div className="grid grid-cols-2 gap-1">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="w-1 h-1 rounded-full bg-ink" />
      ))}
    </div>
  );
}

export default function Pricing() {
  const { open } = useLead();

  return (
    <section id="pricing" className="w-full py-20 md:py-24 bg-white overflow-hidden relative">
      <div className="text-center px-5 mb-10 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="font-display font-bold text-[32px] md:text-[48px] text-ink leading-[1.04] tracking-tight"
        >
          Понятные цены. Честные сроки.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-4 text-sm md:text-base text-muted"
        >
          Выберите формат — точную сумму зафиксируем в договоре до начала работ.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mx-3 md:mx-10 lg:mx-auto max-w-[1300px] relative rounded-[24px] overflow-hidden bg-ink"
      >
        <div className="absolute inset-0 z-0">
          <img src={img("cables.jpg")} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-ink/30" />
        </div>

        <div className="relative z-10 bg-white/55 backdrop-blur-xl m-3 md:m-[40px] rounded-[16px] overflow-hidden border border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-black/10">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 + idx * 0.1 }}
                className={"flex flex-col px-6 md:px-8 py-8 md:py-10 " + (plan.isPopular ? "bg-white/50" : "")}
              >
                <div className="pb-8 border-b border-black/10">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display font-bold text-2xl text-ink">{plan.name}</h3>
                    {plan.isPopular && (
                      <span className="inline-flex items-center px-3 py-1 text-[10px] font-bold tracking-[0.12em] uppercase bg-volt text-ink rounded-full">
                        ЧАЩЕ ВСЕГО
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-ink/80 mt-1">{plan.tagline}</p>

                  <div className="mt-8 flex items-baseline gap-1 flex-wrap">
                    <span className="text-sm font-medium text-ink/60 mr-1">от</span>
                    <span className="font-display font-bold text-4xl md:text-5xl text-ink leading-none">{plan.price}</span>
                    <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-ink/55 ml-1">{plan.unit}</span>
                  </div>

                  <button
                    onClick={() =>
                      open({
                        source: "plan:" + plan.name,
                        title: plan.cta,
                        subtitle: `Пакет «${plan.name}» — от ${plan.price}. Перезвоним, уточним объём и назовём итоговую сумму.`,
                        summary: `Пакет: ${plan.name} (от ${plan.price} ${plan.unit.toLowerCase().replace("/", "")})`,
                        askTime: true,
                        button: plan.cta,
                      })
                    }
                    className={
                      "mt-6 w-full flex items-center justify-between rounded-full p-1.5 group transition-colors " +
                      (plan.isPopular ? "bg-volt text-ink hover:bg-ink hover:text-white" : "bg-ink text-white hover:bg-volt hover:text-ink")
                    }
                  >
                    <span className="flex-1 px-5 py-3 text-sm font-semibold text-left">{plan.cta}</span>
                    <span className={"w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 " + (plan.isPopular ? "bg-white" : "bg-volt")}>
                      {plan.isPopular ? <ArrowUpRight className="w-4 h-4 text-ink" /> : <DotGridIcon />}
                    </span>
                  </button>
                </div>

                <div className="pt-8 flex flex-col gap-3">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-sm bg-ink flex items-center justify-center flex-shrink-0">
                        <Check className="h-2.5 w-2.5 text-volt stroke-[3]" />
                      </div>
                      <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-ink">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
