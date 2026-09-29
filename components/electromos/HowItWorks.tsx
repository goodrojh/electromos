"use client";
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { MapPin, Car, CheckCircle, Activity, FileText, Sparkles } from "lucide-react";
import { useLead } from "./LeadModal";
import { PHONE_HREF, img } from "./site";

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
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-24 -left-24 w-96 h-96 bg-volt/10 rounded-full blur-3xl" />
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -bottom-24 -right-24 w-96 h-96 bg-volt/10 rounded-full blur-3xl" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center mb-14 md:mb-20 flex flex-col items-center gap-4 relative z-10">
        <h2 className="font-display font-bold text-[32px] md:text-[48px] text-center leading-[1.1] max-w-3xl text-ink">
          <span className="block">От звонка до света —</span>
          <span className="block text-gray-400">3 простых шага</span>
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-16 md:mb-20 max-w-6xl mx-auto relative z-10"
      >
        {/* STEP 01 */}
        <motion.div variants={stepVariants} className="flex flex-col gap-6">
          <div className="rounded-2xl overflow-hidden relative aspect-[4/3] w-full shadow-lg">
            <img src={img("step-arrive.jpg")} alt="Электрик приехал к клиенту" className="object-cover w-full h-full absolute inset-0" />
            <div className="absolute inset-0 flex items-end justify-center p-5">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full bg-white/25 backdrop-blur-2xl rounded-[15px] border border-white/40 p-3 flex flex-col gap-2 shadow-2xl"
              >
                <div className="relative bg-white rounded-[10px] px-3 py-2 flex items-center gap-3 overflow-hidden">
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-volt/30 to-transparent -skew-x-12"
                  />
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
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <StepBadge n="01" />
            <h3 className="font-display text-2xl font-bold leading-tight text-ink">Звоните — мастер выезжает</h3>
            <p className="text-base text-gray-500 leading-relaxed">Оператор уточнит задачу за 2 минуты и отправит ближайшего электрика. Приезжаем со своим инструментом.</p>
          </div>
        </motion.div>

        {/* STEP 02 */}
        <motion.div variants={stepVariants} className="flex flex-col gap-6">
          <div className="rounded-2xl overflow-hidden relative aspect-[4/3] w-full shadow-lg">
            <img src={img("step-diagnose.jpg")} alt="Диагностика розетки мультиметром" className="object-cover w-full h-full absolute inset-0" />
            <div className="absolute inset-0 flex items-center justify-end p-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/20 backdrop-blur-2xl rounded-[15px] border border-white/30 p-3 flex flex-col gap-2 shadow-2xl"
              >
                {["Диагностика", "Смета", "Договор"].map((t, i) => (
                  <motion.div
                    key={t}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className={
                      "rounded-[8px] px-4 py-2 shadow-xl border flex items-center gap-2 min-w-[120px] " +
                      (i === 1 ? "bg-volt border-volt text-ink" : "bg-white border-white text-gray-800")
                    }
                  >
                    {i === 0 ? <Activity className="w-3.5 h-3.5" /> : i === 1 ? <FileText className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                    <span className="text-[11px] font-bold">{t}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <StepBadge n="02" />
            <h3 className="font-display text-2xl font-bold leading-tight text-ink">Бесплатная диагностика и смета</h3>
            <p className="text-base text-gray-500 leading-relaxed">Находим причину, показываем её вам и называем точную цену. Согласны — работаем. Нет — ничего не платите.</p>
          </div>
        </motion.div>

        {/* STEP 03 */}
        <motion.div variants={stepVariants} className="flex flex-col gap-6">
          <div className="rounded-2xl overflow-hidden relative aspect-[4/3] w-full shadow-lg">
            <img src={img("step-done.jpg")} alt="Готовая квартира со светом" className="object-cover w-full h-full absolute inset-0" />
            <div className="absolute inset-0 flex items-start p-5">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-[10px] px-3 py-2 shadow-lg flex items-center gap-2"
              >
                <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[11px] font-bold text-ink">Работа принята · гарантия 2 года</span>
                <Sparkles className="w-3.5 h-3.5 text-volt-deep" />
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <StepBadge n="03" />
            <h3 className="font-display text-2xl font-bold leading-tight text-ink">Работа, уборка, гарантия</h3>
            <p className="text-base text-gray-500 leading-relaxed">Делаем, проверяем при вас, убираем за собой. Оплата — только после того, как всё работает.</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            open({
              source: "how-it-works",
              title: "Начнём с шага 01",
              subtitle: "Оставьте номер — оператор перезвонит и отправит ближайшего мастера.",
              askTime: true,
              button: "Отправить мастера",
            })
          }
          className="w-full sm:w-auto rounded-full px-10 py-4 text-sm font-bold tracking-widest uppercase bg-ink text-white shadow-xl hover:bg-steel transition-all"
        >
          Вызвать мастера
        </motion.button>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          href={PHONE_HREF}
          className="w-full sm:w-auto text-center rounded-full px-10 py-4 text-sm font-bold tracking-widest uppercase bg-volt text-ink shadow-lg shadow-volt/30 transition-all"
        >
          Позвонить сейчас
        </motion.a>
      </motion.div>
    </section>
  );
}
