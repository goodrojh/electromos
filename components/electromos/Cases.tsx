"use client";
import React from "react";
import { m } from "framer-motion";
import { Clock, Wallet } from "lucide-react";
import { useLead } from "./LeadModal";
import Pic from "./Pic";

const cases = [
  {
    image: "case-panel",
    tag: "Сталинка · Хамовники",
    title: "Старый щит с пробками → новый щит с УЗО",
    description: "Замена алюминиевой проводки и керамических пробок на щит с автоматами, УЗО и маркировкой линий.",
    time: "1 день",
    price: "от 18 000 ₽",
  },
  {
    image: "case-chandelier",
    tag: "ЖК · Новая Москва",
    title: "Дизайнерская люстра на потолок 3,2 м",
    description: "Сборка и монтаж люстры массой 14 кг с усилением крепления, подключение к двухклавишному выключателю.",
    time: "2 часа",
    price: "от 2 500 ₽",
  },
  {
    image: "case-kitchen",
    tag: "Кухня-гостиная · Коммунарка",
    title: "Свет и техника на кухне под ключ",
    description: "Точечные светильники, LED-подсветка рабочей зоны, отдельная линия для индукционной плиты.",
    time: "2 дня",
    price: "от 24 000 ₽",
  },
];

export default function Cases() {
  const { open } = useLead();

  return (
    <section id="cases" className="bg-paper py-20 md:py-24 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <h2 className="font-display font-bold text-[32px] md:text-[44px] text-ink leading-[1.12] max-w-2xl">Примеры работ</h2>
          <div className="relative self-start md:self-end">
            <div className="absolute -bottom-[6px] right-0 w-[120px] h-[24px] bg-volt/70 blur-[16px] rounded-full -z-10" />
            <button
              onClick={() =>
                open({
                  source: "cases",
                  title: "Расчёт стоимости",
                  subtitle: "Опишите задачу — специалист перезвонит и рассчитает стоимость.",
                  options: ["Щиток", "Освещение", "Кухня", "Проводка", "Другое"],
                  button: "Рассчитать стоимость",
                })
              }
              className="bg-ink text-white rounded-[14px] px-6 py-3 text-[15px] font-semibold flex items-center gap-2 hover:bg-steel transition-colors"
            >
              Рассчитать стоимость <span className="text-volt">↳</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <m.article
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className="bg-white border border-[#e6e3db] rounded-[18px] p-4 md:p-5 flex flex-col transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] group"
            >
              <div className="w-full h-[240px] rounded-[12px] overflow-hidden mb-5 relative">
                <Pic name={c.image} alt={c.title} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105" />
                <span className="absolute top-3 left-3 rounded-full bg-ink/75 text-white text-[11px] font-semibold px-3 py-1">{c.tag}</span>
              </div>
              <h3 className="font-bold text-[17px] text-ink leading-[1.35] mb-2.5">{c.title}</h3>
              <p className="text-[14px] text-muted leading-[1.6] mb-5">{c.description}</p>
              <div className="mt-auto flex items-center gap-4 pt-4 border-t border-gray-100 text-[13px]">
                <span className="flex items-center gap-1.5 text-ink font-semibold"><Clock className="w-4 h-4 text-volt-deep" /> {c.time}</span>
                <span className="flex items-center gap-1.5 text-ink font-semibold"><Wallet className="w-4 h-4 text-volt-deep" /> {c.price}</span>
              </div>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}
