"use client";
import React from "react";
import { m } from "framer-motion";
import type { Variants } from "framer-motion";
import { MapPin, Car, CheckCircle, Activity, FileText, Sparkles } from "lucide-react";
import { useLead } from "./LeadModal";
import { PHONE_HREF } from "./site";
import Pic from "./Pic";

const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
const stepVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } },
};

function StepBadge({ n }: { n: string }) {
  return (
    <span className="inline-flex w-fit rounded-full text-ink bg-volt/20 text-xs font-bold px-3 py-1 border border-volt">Шаг {n}</span>
  );
}

export default function HowItWorks() {
  const { open } = useLead();

  return (
    <section className="w-full px-5 md:px-12 lg:px-20 py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[radial-gradient(closest-side,rgba(255,198,26,0.14),transparent)]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[radial-gradient(closest-side,rgba(255,198,26,0.14),transparent)]" />
      </div>

      <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center mb-14 md:mb-20 flex flex-col items-center gap-4 relative z-10">
        <h2 className="font-display font-bold text-[32px] md:text-[48px] text-center leading-[1.1] max-w-3xl text-ink">
          <span className="block">Порядок работы</span>
          <span className="block text-gray-400">три этапа</span>
        </h2>
      </m.div>

      <m.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-16 md:mb-20 max-w-6xl mx-auto relative z-10"
      >
        {/* STEP 01 */}
        <m.div variants={stepVariants} className="flex flex-col gap-6">
          <div className="rounded-2xl overflow-hidden relative aspect-[4/3] w-full shadow-lg">
            <Pic name="step-arrive" alt="Специалист прибыл на объект" sizes="(min-width: 768px) 33vw, 100vw" className="object-cover w-full h-full absolute inset-0" />
            <div className="absolute inset-0 flex items-end justify-center p-5">
              <m.div
                initial={{ opacity: 0, y: 10 }}
                viewport={{ once: true }}
 whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full bg-ink/45 rounded-[15px] border border-white/30 p-3 flex flex-col gap-2 shadow-2xl"
              >
                <div className="relative bg-white rounded-[10px] px-3 py-2 flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-volt/20 flex items-center justify-center shrink-0">
                    <Car className="h-4 w-4 text-volt-deep" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold leading-none mb-1 text-ink">Мастер в пути</span>
                    <span className="text-[10px] text-gray-500 leading-none">будет через 32 минуты</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-1">
                  <MapPin className="h-3 w-3 text-white" />
                  <span className="text-[10px] text-white font-medium">Москва · ваш район</span>
                </div>
              </m.div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <StepBadge n="01" />
            <h3 className="font-display text-2xl font-bold leading-tight text-ink">Заявка и выезд</h3>
            <p className="text-base text-gray-500 leading-relaxed">Оператор уточняет задачу и направляет ближайшего специалиста. Инструмент и расходные материалы — с собой.</p>
          </div>
        </m.div>

        {/* STEP 02 */}
        <m.div variants={stepVariants} className="flex flex-col gap-6">
          <div className="rounded-2xl overflow-hidden relative aspect-[4/3] w-full shadow-lg">
            <Pic name="step-diagnose" alt="Диагностика розетки мультиметром" sizes="(min-width: 768px) 33vw, 100vw" className="object-cover w-full h-full absolute inset-0" />
            <div className="absolute inset-0 flex items-center justify-end p-5">
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
 whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-ink/40 rounded-[15px] border border-white/25 p-3 flex flex-col gap-2 shadow-2xl"
              >
                {["Диагностика", "Смета", "Договор"].map((t, i) => (
                  <m.div
                    key={t}
                    initial={{ opacity: 0, x: 10 }}
                    viewport={{ once: true }}
 whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className={
                      "rounded-[8px] px-4 py-2 shadow-xl border flex items-center gap-2 min-w-[120px] " +
                      (i === 1 ? "bg-volt border-volt text-ink" : "bg-white border-white text-gray-800")
                    }
                  >
                    {i === 0 ? <Activity className="w-3.5 h-3.5" /> : i === 1 ? <FileText className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                    <span className="text-[11px] font-bold">{t}</span>
                  </m.div>
                ))}
              </m.div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <StepBadge n="02" />
            <h3 className="font-display text-2xl font-bold leading-tight text-ink">Диагностика и смета</h3>
            <p className="text-base text-gray-500 leading-relaxed">Определяем причину неисправности и согласовываем стоимость. Диагностика бесплатна при заказе работ.</p>
          </div>
        </m.div>

        {/* STEP 03 */}
        <m.div variants={stepVariants} className="flex flex-col gap-6">
          <div className="rounded-2xl overflow-hidden relative aspect-[4/3] w-full shadow-lg">
            <Pic name="step-done" alt="Квартира после электромонтажных работ" sizes="(min-width: 768px) 33vw, 100vw" className="object-cover w-full h-full absolute inset-0" />
            <div className="absolute inset-0 flex items-start p-5">
              <m.div
                initial={{ opacity: 0, x: -10 }}
                viewport={{ once: true }}
 whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-[10px] px-3 py-2 shadow-lg flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[11px] font-bold text-ink">Работа принята · гарантия 2 года</span>
                <Sparkles className="w-3.5 h-3.5 text-volt-deep" />
              </m.div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <StepBadge n="03" />
            <h3 className="font-display text-2xl font-bold leading-tight text-ink">Выполнение и приёмка</h3>
            <p className="text-base text-gray-500 leading-relaxed">Выполняем работы, проверяем при вас и убираем рабочее место. Оплата — после приёмки.</p>
          </div>
        </m.div>
      </m.div>

      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10"
      >
        <m.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            open({
              source: "how-it-works",
              title: "Заявка на выезд",
              subtitle: "Оставьте номер телефона — оператор перезвонит и направит ближайшего специалиста.",
              askTime: true,
              button: "Отправить заявку",
            })
          }
          className="w-full sm:w-auto rounded-full px-10 py-4 text-sm font-bold tracking-widest uppercase bg-ink text-white shadow-xl hover:bg-steel transition-all"
        >
          Вызвать мастера
        </m.button>
        <m.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          href={PHONE_HREF}
          className="w-full sm:w-auto text-center rounded-full px-10 py-4 text-sm font-bold tracking-widest uppercase bg-volt text-ink shadow-lg shadow-volt/30 transition-all"
        >
          Позвонить сейчас
        </m.a>
      </m.div>
    </section>
  );
}
