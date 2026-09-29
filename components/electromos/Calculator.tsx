"use client";
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Lock, Calculator as CalcIcon, Plug, Lamp, Lightbulb, ToggleLeft, ShieldAlert, Gauge, LayoutGrid, Cable, CookingPot, Moon } from "lucide-react";
import { useLead } from "./LeadModal";
import { rub } from "./site";

type Item = { id: string; name: string; unit: string; price: number; icon: React.ElementType; step?: number };

const ITEMS: Item[] = [
  { id: "socket", name: "Розетка / выключатель", unit: "шт", price: 350, icon: Plug },
  { id: "lustre", name: "Люстра (сборка + подключение)", unit: "шт", price: 1500, icon: Lamp },
  { id: "spot", name: "Точечный светильник", unit: "шт", price: 300, icon: Lightbulb },
  { id: "breaker", name: "Автомат защиты", unit: "шт", price: 450, icon: ToggleLeft },
  { id: "rcd", name: "УЗО / дифавтомат", unit: "шт", price: 700, icon: ShieldAlert },
  { id: "meter", name: "Замена счётчика", unit: "шт", price: 2000, icon: Gauge },
  { id: "panel", name: "Сборка щитка", unit: "шт", price: 5000, icon: LayoutGrid },
  { id: "cable", name: "Прокладка кабеля + штроба", unit: "м", price: 350, icon: Cable, step: 5 },
  { id: "stove", name: "Подключение плиты / духовки", unit: "шт", price: 1200, icon: CookingPot },
];

function Counter({ value, onChange, step = 1 }: { value: number; onChange: (v: number) => void; step?: number }) {
  return (
    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
      <button
        aria-label="Меньше"
        onClick={() => onChange(Math.max(0, value - step))}
        className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:bg-white/10 disabled:opacity-30"
        disabled={value === 0}
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-8 text-center font-display font-bold text-white tabular-nums">{value}</span>
      <button aria-label="Больше" onClick={() => onChange(value + step)} className="w-9 h-9 rounded-full flex items-center justify-center bg-volt text-ink hover:bg-white">
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function Calculator() {
  const { open } = useLead();
  const [qty, setQty] = useState<Record<string, number>>({ socket: 4, lustre: 1 });
  const [night, setNight] = useState(false);

  const { total, lines } = useMemo(() => {
    const lines = ITEMS.filter((i) => (qty[i.id] || 0) > 0).map((i) => ({ ...i, q: qty[i.id], sum: qty[i.id] * i.price }));
    const base = lines.reduce((s, l) => s + l.sum, 0);
    return { total: Math.round(base * (night ? 1.3 : 1)), lines };
  }, [qty, night]);

  const summary =
    "Расчёт с калькулятора:\n" +
    lines.map((l) => `• ${l.name} — ${l.q} ${l.unit} = ${rub(l.sum)}`).join("\n") +
    (night ? "\n• Ночной / срочный выезд +30%" : "") +
    `\nИтого ориентировочно: ${rub(total)}`;

  return (
    <section id="calc" className="bg-ink px-5 md:px-8 py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-volt/10 rounded-full blur-[140px]" />

      <div className="max-w-6xl mx-auto relative">
        <div className="mb-12 max-w-2xl">
          <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-volt mb-4">
            <CalcIcon className="w-4 h-4" /> Калькулятор
          </span>
          <h2 className="font-display font-bold text-[32px] md:text-5xl text-white leading-[1.08]">
            Посчитайте цену <span className="text-volt">за 30 секунд</span>
          </h2>
          <p className="mt-4 text-white/55 text-base md:text-lg">
            Отметьте, что нужно сделать. Мастер подтвердит смету по телефону — и она уже не изменится.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">
          <div className="grid sm:grid-cols-2 gap-3">
            {ITEMS.map((it) => {
              const v = qty[it.id] || 0;
              return (
                <div
                  key={it.id}
                  className={
                    "rounded-[22px] p-3 sm:p-4 border flex flex-row sm:flex-col items-center sm:items-stretch justify-between gap-3 sm:gap-4 transition-colors " +
                    (v > 0 ? "bg-volt/[0.08] border-volt/40" : "bg-graphite border-white/10")
                  }
                >
                  <div className="flex items-center sm:items-start gap-3 min-w-0">
                    <div className={"w-10 h-10 rounded-xl flex items-center justify-center shrink-0 " + (v > 0 ? "bg-volt text-ink" : "bg-white/5 text-volt")}>
                      <it.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[13px] sm:text-[14px] font-semibold text-white leading-snug">{it.name}</div>
                      <div className="text-[12px] text-white/45">
                        от {rub(it.price)} / {it.unit}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="hidden sm:inline text-[13px] text-white/40">{it.unit === "м" ? "метров" : "количество"}</span>
                    <Counter value={v} step={it.step} onChange={(n) => setQty((q) => ({ ...q, [it.id]: n }))} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary panel */}
          <div className="lg:sticky lg:top-6 rounded-[28px] bg-white/[0.06] backdrop-blur-xl border border-white/15 p-6 shadow-2xl">
            <button
              onClick={() => setNight(!night)}
              className="w-full flex items-center justify-between gap-3 rounded-2xl bg-white/5 border border-white/10 px-4 py-3 mb-5"
            >
              <span className="flex items-center gap-2 text-[14px] text-white/80">
                <Moon className="w-4 h-4 text-volt" /> Ночью / срочно (+30%)
              </span>
              <span className={"w-11 h-6 rounded-full p-0.5 transition-colors " + (night ? "bg-volt" : "bg-white/15")}>
                <motion.span layout className={"block w-5 h-5 rounded-full bg-white shadow " + (night ? "ml-auto" : "")} />
              </span>
            </button>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {lines.length === 0 && <p className="text-[14px] text-white/40">Добавьте хотя бы одну работу</p>}
                {lines.map((l) => (
                  <motion.div
                    key={l.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex justify-between gap-3 text-[13px]"
                  >
                    <span className="text-white/60">
                      {l.name} × {l.q}
                    </span>
                    <span className="text-white font-medium whitespace-nowrap">{rub(l.sum)}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-5 pt-5 border-t border-dashed border-white/15">
              <div className="text-[13px] text-white/50">Ориентировочно</div>
              <motion.div key={total} initial={{ opacity: 0.4, y: -6 }} animate={{ opacity: 1, y: 0 }} className="font-display font-bold text-5xl text-white tabular-nums">
                {rub(total)}
              </motion.div>
              <div className="mt-2 text-[12px] text-white/40">Выезд и диагностика — 0 ₽ при заказе работ</div>
            </div>

            <button
              disabled={lines.length === 0}
              onClick={() =>
                open({
                  source: "calculator",
                  title: "Зафиксируем эту цену",
                  subtitle: "Мастер перезвонит, сверит объём и закрепит смету в договоре.",
                  summary,
                  askTime: true,
                  button: "Зафиксировать цену",
                })
              }
              className="mt-6 w-full h-16 rounded-full bg-volt text-ink font-bold text-[16px] flex items-center justify-center gap-2 hover:bg-white transition-colors disabled:opacity-40 shadow-[0_10px_40px_-10px_rgba(255,198,26,0.8)]"
            >
              <Lock className="w-5 h-5" /> Зафиксировать цену
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
