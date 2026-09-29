"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, Zap, ShieldCheck, Clock, BadgeCheck, Wallet } from "lucide-react";
import { useLead } from "./LeadModal";
import { PHONE_DISPLAY, PHONE_HREF, img } from "./site";

const NAV = [
  { label: "Услуги", href: "#services" },
  { label: "Калькулятор", href: "#calc" },
  { label: "Цены", href: "#pricing" },
  { label: "Работы", href: "#cases" },
  { label: "Вопросы", href: "#faq" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={"flex items-center gap-2 font-display font-bold text-white text-[18px] tracking-tight " + className}>
      <span className="w-8 h-8 rounded-xl bg-volt flex items-center justify-center shadow-[0_0_24px_rgba(255,198,26,0.55)]">
        <Zap className="w-4.5 h-4.5 text-ink fill-ink" style={{ width: 18, height: 18 }} />
      </span>
      <span>Электро<span className="text-volt">Мос</span></span>
    </span>
  );
}

export default function Hero() {
  const { open } = useLead();
  const [menu, setMenu] = useState(false);

  return (
    <section className="min-h-[100svh] md:min-h-[110vh] flex flex-col bg-ink relative w-full overflow-hidden">
      {/* Photo background with slow cinematic zoom */}
      <motion.img
        src={img("hero.jpg")}
        alt="Электрик собирает электрощит в московской квартире"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full object-cover object-[70%_center] z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/10 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40 z-[1]" />
      {/* Voltage flicker glow */}
      <motion.div
        animate={{ opacity: [0.35, 0.6, 0.3, 0.55, 0.35] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute right-[18%] top-[35%] w-[420px] h-[420px] rounded-full bg-volt/25 blur-[140px] z-[1] pointer-events-none"
      />

      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-50 px-4 md:px-8 pt-4 md:pt-6 pb-2"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between p-[10px] rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
          <a href="#" className="flex-1 flex items-center pl-2 whitespace-nowrap">
            <Logo />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="text-[15px] font-medium text-white/70 hover:text-white transition-colors relative group">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-volt transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex-1 flex items-center justify-end gap-2 whitespace-nowrap">
            <a href={PHONE_HREF} className="hidden md:flex items-center gap-2 text-[15px] font-semibold text-white hover:text-volt transition-colors px-3 py-2">
              <Phone className="w-4 h-4 text-volt" />
              {PHONE_DISPLAY}
            </a>
            <button
              onClick={() =>
                open({
                  source: "nav",
                  title: "Вызвать электрика",
                  subtitle: "Мастер перезвонит, уточнит задачу и назовёт цену до выезда.",
                  askTime: true,
                })
              }
              className="hidden sm:block rounded-full px-5 py-2.5 text-[15px] font-semibold bg-volt text-ink hover:bg-white transition-all hover:scale-105 active:scale-95"
            >
              Вызвать мастера
            </button>
            <a href={PHONE_HREF} aria-label="Позвонить" className="sm:hidden w-10 h-10 rounded-full bg-volt flex items-center justify-center">
              <Phone className="w-4.5 h-4.5 text-ink" style={{ width: 18, height: 18 }} />
            </a>
            <button onClick={() => setMenu(true)} aria-label="Меню" className="lg:hidden w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-ink/95 backdrop-blur-xl flex flex-col p-6"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button onClick={() => setMenu(false)} aria-label="Закрыть меню" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-6">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenu(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="font-display font-bold text-4xl text-white"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
            <a href={PHONE_HREF} className="w-full rounded-full py-4 bg-volt text-ink font-bold text-center text-lg flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" /> {PHONE_DISPLAY}
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex-1 flex flex-col justify-center px-5 md:px-8 pt-16 md:pt-[110px] pb-10 md:pb-16 z-10">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 pl-2 pr-4 py-1.5 mb-6"
          >
            <span className="relative flex h-2.5 w-2.5 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="text-[13px] text-white/85 font-medium">Работаем 24/7 · свободные мастера есть сейчас</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="font-display font-bold text-[40px] leading-[1.02] sm:text-6xl lg:text-[76px] tracking-[-0.03em] text-white max-w-4xl mb-6"
          >
            Электрик приедет <br className="hidden sm:block" />
            <span className="relative inline-block text-volt">
              за 40 минут
              <motion.svg viewBox="0 0 300 20" className="absolute left-0 -bottom-2 w-full h-4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}>
                <motion.path
                  d="M2 14 L60 6 L90 16 L150 4 L200 14 L240 6 L298 12"
                  fill="none"
                  stroke="#FFC61A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                />
              </motion.svg>
            </span>
            <span className="block mt-3 text-[22px] sm:text-3xl lg:text-[38px] leading-tight italic font-medium text-white/85 tracking-[-0.02em]">и назовёт цену до начала работ</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-base md:text-lg text-white/75 max-w-[520px] leading-relaxed mb-8"
          >
            Розетки, люстры, щиты, замена проводки — по Москве и Новой Москве. Бесплатная диагностика, фиксированная цена в договоре и гарантия до 2 лет.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row sm:items-center gap-3"
          >
            <button
              onClick={() =>
                open({
                  source: "hero",
                  title: "Мастер выедет за 40 минут",
                  subtitle: "Оставьте номер — перезвоним за 5 минут, уточним задачу и зафиксируем цену.",
                  options: ["Нет света", "Искрит / греется", "Установка", "Замена проводки", "Щиток / автоматы", "Другое"],
                  askTime: true,
                  button: "Вызвать электрика",
                })
              }
              className="group relative rounded-full px-8 py-5 text-base font-bold bg-volt text-ink transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_-5px_rgba(255,198,26,0.7)] overflow-hidden"
            >
              <motion.span
                animate={{ x: ["-120%", "260%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12"
              />
              <span className="relative flex items-center justify-center gap-2">
                <Zap className="w-5 h-5 fill-ink" /> Вызвать электрика
              </span>
            </button>
            <a
              href={PHONE_HREF}
              className="rounded-full px-8 py-5 text-base font-semibold bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              style={{ boxShadow: "0 8px 32px 0 rgba(0,0,0,0.37)" }}
            >
              <Phone className="w-5 h-5 text-volt" /> {PHONE_DISPLAY}
            </a>
          </motion.div>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="block mt-3 text-sm text-white/50">
            Выезд бесплатный при заказе работ · Оплата после проверки
          </motion.span>

          {/* Trust stats */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.6 } } }}
            initial="hidden"
            animate="show"
            className="mt-12 md:mt-[72px] grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl"
          >
            {[
              { icon: Clock, v: "40 мин", l: "среднее время выезда" },
              { icon: BadgeCheck, v: "8+ лет", l: "работаем в Москве" },
              { icon: ShieldCheck, v: "до 2 лет", l: "гарантия по договору" },
              { icon: Wallet, v: "600+", l: "довольных клиентов" },
            ].map((s) => (
              <motion.div
                key={s.l}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                className="rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 p-4"
              >
                <s.icon className="w-5 h-5 text-volt mb-2" />
                <div className="font-display font-bold text-xl md:text-2xl text-white">{s.v}</div>
                <div className="text-[12px] md:text-[13px] text-white/55 leading-tight">{s.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
