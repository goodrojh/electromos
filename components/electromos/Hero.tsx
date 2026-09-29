"use client";
import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, Zap, ShieldCheck, Clock, BadgeCheck, Users } from "lucide-react";
import { useLead } from "./LeadModal";
import { PHONE_DISPLAY, PHONE_HREF } from "./site";
import Pic from "./Pic";

const NAV = [
  { label: "Услуги", href: "#services" },
  { label: "Калькулятор", href: "#calc" },
  { label: "Цены", href: "#pricing" },
  { label: "Работы", href: "#cases" },
  { label: "Вопросы", href: "#faq" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={"flex items-center gap-2 font-display font-bold text-white text-[17px] tracking-tight " + className}>
      <span className="w-8 h-8 rounded-xl bg-volt flex items-center justify-center shrink-0">
        <Zap className="text-ink fill-ink" style={{ width: 18, height: 18 }} />
      </span>
      <span>
        Электро<span className="text-volt">Мос</span>
      </span>
    </span>
  );
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

export default function Hero() {
  const { open } = useLead();
  const [menu, setMenu] = useState(false);

  const callMaster = () =>
    open({
      source: "nav",
      title: "Вызов электрика",
      subtitle: "Специалист перезвонит, уточнит задачу и согласует стоимость до выезда.",
      askTime: true,
    });

  return (
    <section className="min-h-[100svh] md:min-h-[100vh] flex flex-col bg-ink relative w-full overflow-hidden">
      <Pic
        name="hero"
        alt="Электрик собирает электрощит в квартире"
        priority
        className="absolute inset-0 w-full h-full object-cover object-[70%_center] z-0 animate-hero-zoom"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/10 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40 z-[1]" />

      {/* Navigation */}
      <nav className="relative z-50 px-4 md:px-8 pt-4 md:pt-6 pb-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 p-[10px] rounded-full bg-ink/60 md:bg-white/5 md:backdrop-blur-xl border border-white/10">
          <a href="#" className="flex items-center pl-2 whitespace-nowrap">
            <Logo />
          </a>

          <div className="hidden md:flex items-center gap-5 lg:gap-8">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="text-[14px] lg:text-[15px] font-medium text-white/70 hover:text-white transition-colors relative group">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-volt transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 whitespace-nowrap">
            <a href={PHONE_HREF} className="hidden xl:flex items-center gap-2 text-[15px] font-semibold text-white hover:text-volt transition-colors px-3 py-2">
              <Phone className="w-4 h-4 text-volt" />
              {PHONE_DISPLAY}
            </a>
            <button
              onClick={callMaster}
              className="hidden lg:block rounded-full px-5 py-2.5 text-[15px] font-semibold bg-volt text-ink hover:bg-white transition-colors"
            >
              Вызвать мастера
            </button>
            <a href={PHONE_HREF} aria-label="Позвонить" className="xl:hidden w-10 h-10 rounded-full bg-volt flex items-center justify-center">
              <Phone className="text-ink" style={{ width: 18, height: 18 }} />
            </a>
            <button onClick={() => setMenu(true)} aria-label="Меню" className="md:hidden w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menu && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-[90] bg-ink flex flex-col p-6"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button onClick={() => setMenu(false)} aria-label="Закрыть меню" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-6">
              {NAV.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenu(false)} className="font-display font-bold text-4xl text-white">
                  {item.label}
                </a>
              ))}
            </div>
            <a href={PHONE_HREF} className="w-full rounded-full py-4 bg-volt text-ink font-bold text-center text-lg flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" /> {PHONE_DISPLAY}
            </a>
          </m.div>
        )}
      </AnimatePresence>

      <div className="relative flex-1 flex flex-col justify-center px-5 md:px-8 pt-14 md:pt-[100px] pb-10 md:pb-16 z-10">
        <div className="max-w-6xl mx-auto w-full">
          <m.h1
            {...fadeUp(0.05)}
            className="font-display font-bold text-[38px] leading-[1.04] sm:text-6xl lg:text-[72px] tracking-[-0.03em] text-white max-w-4xl mb-6"
          >
            Электрик на дом <br className="hidden sm:block" />в Москве
            <span className="block text-volt">выезд от 40 минут</span>
          </m.h1>

          <m.p {...fadeUp(0.15)} className="text-base md:text-lg text-white/75 max-w-[540px] leading-relaxed mb-8">
            Монтаж и ремонт электрики в квартирах и домах Москвы и Новой Москвы. Бесплатная диагностика, фиксированная стоимость в договоре, гарантия до 2 лет.
          </m.p>

          <m.div {...fadeUp(0.25)} className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              onClick={() =>
                open({
                  source: "hero",
                  title: "Вызов электрика",
                  subtitle: "Оставьте номер телефона — перезвоним в течение 5 минут, уточним задачу и согласуем стоимость.",
                  options: ["Нет света", "Искрит / греется", "Установка", "Замена проводки", "Щиток / автоматы", "Другое"],
                  askTime: true,
                  button: "Вызвать электрика",
                })
              }
              className="relative rounded-full px-8 py-5 text-base font-bold bg-volt text-ink transition-transform hover:scale-[1.03] active:scale-95 overflow-hidden"
            >
              <span className="shimmer" aria-hidden />
              <span className="relative flex items-center justify-center gap-2">
                <Zap className="w-5 h-5 fill-ink" /> Вызвать электрика
              </span>
            </button>
            <a
              href={PHONE_HREF}
              className="rounded-full px-8 py-5 text-base font-semibold bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5 text-volt" /> {PHONE_DISPLAY}
            </a>
          </m.div>
          <m.span {...fadeUp(0.35)} className="block mt-3 text-sm text-white/50">
            Выезд бесплатный при заказе работ · Оплата после приёмки
          </m.span>

          <m.div {...fadeUp(0.45)} className="mt-12 md:mt-[72px] grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl">
            {[
              { icon: Clock, v: "от 40 мин", l: "время прибытия" },
              { icon: BadgeCheck, v: "8+ лет", l: "на рынке" },
              { icon: ShieldCheck, v: "до 2 лет", l: "гарантия по договору" },
              { icon: Users, v: "600+", l: "клиентов" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-white/[0.07] border border-white/10 p-4">
                <s.icon className="w-5 h-5 text-volt mb-2" />
                <div className="font-display font-bold text-xl md:text-2xl text-white">{s.v}</div>
                <div className="text-[12px] md:text-[13px] text-white/55 leading-tight">{s.l}</div>
              </div>
            ))}
          </m.div>
        </div>
      </div>
    </section>
  );
}
