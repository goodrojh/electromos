"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Plug, Lamp, Lightbulb, ToggleLeft, ShieldAlert, Gauge, LayoutGrid, Cable, CookingPot, Search, WashingMachine, Fan, Router, Zap } from "lucide-react";
import { useLead } from "./LeadModal";

type Service = { name: string; price: string; desc: string; icon: React.ElementType };

const services: Service[] = [
  { name: "Розетки и выключатели", price: "от 350 ₽", desc: "Установка, замена, перенос, добавление точек", icon: Plug },
  { name: "Люстры и бра", price: "от 1 500 ₽", desc: "Сборка, навеска, подключение любой сложности", icon: Lamp },
  { name: "Точечные светильники", price: "от 300 ₽", desc: "Споты, трек-системы, LED-ленты", icon: Lightbulb },
  { name: "Поиск неисправности", price: "0 ₽*", desc: "Бесплатно при заказе ремонта", icon: Search },
  { name: "Автоматы и УЗО", price: "от 450 ₽", desc: "Замена, подбор номинала, защита от утечки", icon: ToggleLeft },
  { name: "Сборка электрощита", price: "от 5 000 ₽", desc: "С маркировкой и схемой для вас", icon: LayoutGrid },
  { name: "Замена счётчика", price: "от 2 000 ₽", desc: "Однотарифный и многотарифный, опломбировка", icon: Gauge },
  { name: "Замена проводки", price: "от 350 ₽/м", desc: "Частично или под ключ, медный кабель", icon: Cable },
  { name: "Электроплиты и духовки", price: "от 1 200 ₽", desc: "Подключение с отдельной линией", icon: CookingPot },
  { name: "Бытовая техника", price: "от 900 ₽", desc: "Стиральные, посудомоечные машины, бойлеры", icon: WashingMachine },
  { name: "Вытяжки и вентиляторы", price: "от 1 000 ₽", desc: "Подключение к сети и выключателю", icon: Fan },
  { name: "Слаботочка", price: "от 500 ₽", desc: "Интернет-розетки, ТВ-кабель, звонки", icon: Router },
  { name: "Защита от скачков", price: "от 1 500 ₽", desc: "Реле напряжения, стабилизаторы", icon: ShieldAlert },
  { name: "Аварийный выезд 24/7", price: "от 1 500 ₽", desc: "Ночью, в выходные и праздники", icon: Zap },
];

const all = [...services, ...services];

export default function Services() {
  const { open } = useLead();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const pos = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let id: number;
    const tick = () => {
      if (!paused) {
        pos.current += 0.5;
        if (pos.current >= el.scrollWidth / 2) pos.current = 0;
        el.scrollLeft = pos.current;
      } else {
        pos.current = el.scrollLeft;
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [paused]);

  return (
    <section id="services" className="bg-paper py-20 md:py-24 overflow-hidden">
      <style>{".no-scrollbar::-webkit-scrollbar{display:none}"}</style>
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div className="flex-1">
            <h2 className="font-display font-bold text-[32px] md:text-[44px] text-ink mb-2 leading-tight">Любая электрика в квартире</h2>
            <p className="text-[15px] text-muted">Более 40 видов работ · цены без скрытых доплат</p>
          </div>
          <button
            onClick={() =>
              open({
                source: "services-price",
                title: "Пришлём полный прайс",
                subtitle: "Отправим прайс-лист в WhatsApp или Telegram и ответим на вопросы.",
                options: ["WhatsApp", "Telegram", "Позвоните мне"],
                optionsLabel: "Куда прислать?",
                preset: "WhatsApp",
                button: "Получить прайс",
              })
            }
            className="rounded-full px-6 py-3 text-sm font-semibold text-ink bg-volt hover:bg-ink hover:text-white transition-colors"
          >
            Весь прайс-лист
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-10 md:w-32 bg-gradient-to-r from-paper to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 md:w-32 bg-gradient-to-l from-paper to-transparent z-10 pointer-events-none" />
        <div
          ref={scrollRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setTimeout(() => setPaused(false), 2500)}
          className="flex flex-row gap-4 overflow-x-auto pb-4 px-5 no-scrollbar"
          style={{ scrollbarWidth: "none" }}
        >
          {all.map((s, i) => (
            <motion.button
              key={s.name + i}
              whileHover={{ y: -4 }}
              onClick={() =>
                open({
                  source: "service:" + s.name,
                  title: s.name,
                  subtitle: `${s.desc}. Цена ${s.price} — точную сумму мастер назовёт до начала работ.`,
                  askTime: true,
                  summary: "Услуга: " + s.name + " · " + s.price,
                  button: "Заказать",
                })
              }
              className="text-left min-w-[230px] md:min-w-[260px] bg-white border border-[#e6e3db] rounded-[18px] p-6 md:p-7 flex flex-col gap-3 transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] group"
            >
              <div className="w-11 h-11 rounded-xl bg-ink flex items-center justify-center mb-1 group-hover:bg-volt transition-colors">
                <s.icon className="w-5 h-5 text-volt group-hover:text-ink transition-colors" />
              </div>
              <h3 className="font-bold text-[15px] text-ink">{s.name}</h3>
              <p className="text-[13px] text-muted leading-[1.5]">{s.desc}</p>
              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="font-display font-bold text-[17px] text-ink">{s.price}</span>
                <span className="text-[13px] font-semibold text-ink group-hover:underline decoration-volt decoration-2 underline-offset-4">Заказать ↗</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
