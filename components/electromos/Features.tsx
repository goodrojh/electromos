"use client";
import React from "react";
import { m } from "framer-motion";
import type { Variants } from "framer-motion";
import { Footprints, Receipt, Phone, Car, Check, ShieldCheck, FileSignature, Wrench, Lock } from "lucide-react";
import Pic from "./Pic";

const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const cardVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

export default function Features() {
  return (
    <section id="why" className="w-full px-5 md:px-8 py-24 md:py-[140px] bg-paper relative overflow-hidden rounded-t-[32px] md:rounded-t-[48px] -mt-8 z-10">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(255,198,26,0.18),transparent)] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(closest-side,rgba(251,146,60,0.14),transparent)] translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 mb-12 md:mb-16 text-center">
        <m.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-[32px] md:text-5xl font-bold text-ink mb-5 leading-[1.08]"
        >
          Принципы нашей работы
        </m.h2>
        <m.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto"
        >
          Фиксированная стоимость, аккуратность на объекте и официальная гарантия на все виды работ.
        </m.p>
      </div>

      <m.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-6xl mx-auto relative z-10"
      >
        {/* Card 1: photo */}
        <m.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="rounded-[32px] p-6 flex flex-col gap-10 group relative overflow-hidden min-h-[460px]"
        >
          <div className="absolute inset-0 z-0">
            <Pic name="panel-hands" alt="Сборка электрощита" sizes="(min-width: 768px) 50vw, 100vw" className="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/70" />
          </div>
          <div className="relative z-10">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white leading-[1.1] tracking-tight drop-shadow-lg">
              Аккуратный монтаж <br />
              <span className="text-volt">по нормам ПУЭ</span>
            </h3>
            <p className="text-base text-white/85 leading-relaxed max-w-[420px] mt-3 drop-shadow-md">
              Маркировка линий, ровная укладка кабеля, уборка рабочего места по завершении работ.
            </p>
          </div>
          <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
            {[
              { icon: Footprints, t: "Чистота на объекте", d: "Бахилы, защитная плёнка, уборка мусора" },
              { icon: Receipt, t: "Материалы по чеку", d: "Закупка специалистом или ваши материалы" },
            ].map((c) => (
              <div key={c.t} className="flex sm:flex-col gap-4 p-5 rounded-[24px] bg-ink/55 border border-white/20 transition-colors group/item">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center border border-white/25 shrink-0">
                  <c.icon className="h-6 w-6 text-volt" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-white">{c.t}</span>
                  <p className="text-[12px] text-white/70 leading-relaxed">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </m.div>

        {/* Card 2: fixed estimate mockup */}
        <m.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-white rounded-[32px] border border-gray-200 p-6 flex flex-col overflow-hidden relative min-h-[460px]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 via-orange-50/40 to-yellow-100/50" />
          <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-[radial-gradient(closest-side,rgba(255,198,26,0.35),transparent)]" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[radial-gradient(closest-side,rgba(251,146,60,0.22),transparent)]" />

          <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center pointer-events-none select-none py-6">
            <div className="w-full max-w-[300px] bg-white/80 border border-white rounded-[24px] p-6 shadow-xl shadow-amber-500/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-500">Смета №0427</span>
                <FileSignature className="w-4 h-4 text-volt-deep" />
              </div>
              <div className="space-y-2.5">
                {[
                  { l: "Розетка двойная × 4", p: "1 400 ₽" },
                  { l: "Люстра, сборка", p: "1 500 ₽" },
                  { l: "Автомат 16А × 2", p: "900 ₽" },
                ].map((r, i) => (
                  <m.div
                    key={r.l}
                    initial={{ opacity: 0, x: -10 }}
                    viewport={{ once: true }}
 whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.12 }}
                    className="flex items-center justify-between gap-3 bg-white/85 rounded-xl px-3 py-2.5 border border-white/50 shadow-sm"
                  >
                    <span className="text-xs font-medium text-gray-700">{r.l}</span>
                    <span className="text-xs font-bold text-ink whitespace-nowrap">{r.p}</span>
                  </m.div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-dashed border-gray-300 flex justify-between items-baseline">
                <span className="text-xs text-gray-500">Итого</span>
                <span className="font-display font-bold text-2xl text-ink">3 800 ₽</span>
              </div>
              <m.div
                initial={{ scale: 0, rotate: -12 }}
                viewport={{ once: true }}
 whileInView={{ scale: 1, rotate: -6 }}
                transition={{ delay: 1.1, type: "spring" }}
                className="mt-5 bg-ink rounded-full p-2.5 flex items-center gap-3 shadow-lg"
              >
                <div className="w-7 h-7 rounded-full bg-volt flex items-center justify-center">
                  <Lock className="h-3.5 w-3.5 text-ink" />
                </div>
                <span className="text-[11px] font-bold text-white">Цена зафиксирована</span>
              </m.div>
            </div>
          </div>

          <div className="mt-auto relative z-10 pt-6">
            <h3 className="font-display text-xl font-bold text-ink">Фиксированная цена</h3>
            <p className="text-sm text-gray-500 leading-relaxed mt-2">
              Смета составляется до начала работ и фиксируется в договоре. Стоимость не меняется в процессе.
            </p>
          </div>
        </m.div>

        {/* Card 3: order timeline */}
        <m.div variants={cardVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="bg-white rounded-[32px] border border-gray-200 overflow-hidden flex flex-col">
          <div className="bg-gray-50 h-80 relative flex items-center justify-center overflow-hidden border-b border-gray-200 p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-white to-orange-50/50" />
            <div className="animate-float hidden sm:flex absolute top-8 right-6 md:right-10 w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.08)] items-center justify-center">
              <Car className="h-7 w-7 text-volt-deep" />
            </div>
            <div className="animate-float-slow hidden sm:flex absolute bottom-8 left-6 md:left-10 w-16 h-16 rounded-[22px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.08)] items-center justify-center">
              <Wrench className="h-7 w-7 text-ink" />
            </div>

            <div className="relative z-10 w-full max-w-[260px] flex flex-col items-center">
              <m.div
                initial={{ opacity: 0, y: 10 }}
                viewport={{ once: true }}
 whileInView={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-4 shadow-xl shadow-amber-500/10 border border-amber-100 flex items-center gap-3 w-full mb-8 relative"
              >
                <div className="w-10 h-10 rounded-xl bg-volt flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-ink" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-ink">Заявка · 18:42</span>
                  <span className="text-[10px] text-gray-400">«Выбило автомат, не включается»</span>
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-amber-200 to-amber-400" />
              </m.div>
              <div className="grid grid-cols-2 gap-4 w-full relative">
                <div className="absolute -top-4 left-1/4 right-1/4 h-px bg-amber-200" />
                <div className="absolute -top-4 left-1/4 w-px h-4 bg-amber-200" />
                <div className="absolute -top-4 right-1/4 w-px h-4 bg-amber-200" />
                {[
                  { i: Phone, t: "Перезвонили 18:45" },
                  { i: Car, t: "Мастер у двери 19:21" },
                ].map((n, k) => (
                  <m.div
                    key={n.t}
                    initial={{ opacity: 0, scale: 0.9 }}
                    viewport={{ once: true }}
 whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + k * 0.1 }}
                    className="bg-white rounded-xl p-3 shadow-lg border border-white flex flex-col gap-2 items-center text-center"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                      <n.i className="h-4 w-4 text-volt-deep" />
                    </div>
                    <span className="text-[10px] font-bold text-ink">{n.t}</span>
                  </m.div>
                ))}
              </div>
              <m.div
                initial={{ opacity: 0, y: 10 }}
                viewport={{ once: true }}
 whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-7 bg-ink text-white text-[11px] font-bold py-2 px-4 rounded-full shadow-lg flex items-center gap-2"
              >
                <Check className="h-3.5 w-3.5 stroke-[3] text-volt" />
                Работа выполнена · 19:58
              </m.div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-display text-xl font-bold text-ink">Оперативный выезд</h3>
            <p className="text-base text-gray-500 leading-relaxed mt-2">
              Специалисты работают во всех округах Москвы и Новой Москвы. Среднее время прибытия — 40 минут.
            </p>
          </div>
        </m.div>

        {/* Card 4: warranty */}
        <m.div variants={cardVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="bg-white rounded-[32px] border border-gray-200 overflow-hidden flex flex-col">
          <div className="bg-ink h-80 relative flex items-center justify-center border-b border-gray-200 p-8 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(#FFC61A 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
            <div className="absolute w-64 h-64 rounded-full bg-[radial-gradient(closest-side,rgba(255,198,26,0.25),transparent)]" />
            <m.div
              initial={{ rotate: -4, y: 20, opacity: 0 }}
              viewport={{ once: true }}
 whileInView={{ rotate: -4, y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-[300px] rounded-2xl bg-gradient-to-br from-[#2a2d35] to-graphite border border-white/10 p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">Гарантийный талон</span>
                <ShieldCheck className="w-6 h-6 text-volt" />
              </div>
              <div className="mt-5 font-display font-bold text-4xl text-white">
                24 <span className="text-lg text-white/60 font-medium">месяца</span>
              </div>
              <div className="mt-1 text-[12px] text-white/50">на замену проводки и сборку щита</div>
              <div className="mt-5 flex items-end gap-1 h-8">
                {Array.from({ length: 24 }).map((_, i) => (
                  <m.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.03 }}
                    style={{ height: 8 + ((i * 7) % 24) }}
                    className="flex-1 bg-volt/70 rounded-sm origin-bottom"
                  />
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex justify-between text-[11px] text-white/50">
                <span>Договор · чек</span>
                <span className="text-volt font-semibold">Действует</span>
              </div>
            </m.div>
          </div>
          <div className="p-6">
            <h3 className="font-display text-xl font-bold text-ink">Официальная гарантия</h3>
            <p className="text-base text-gray-500 leading-relaxed mt-2">
              Договор, кассовый чек и гарантийный талон. Гарантийные случаи устраняются бесплатно.
            </p>
          </div>
        </m.div>
      </m.div>
    </section>
  );
}
