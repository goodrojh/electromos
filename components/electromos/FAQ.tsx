"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Wallet, Car, ShieldCheck } from "lucide-react";
import { useLead } from "./LeadModal";
import { img } from "./site";

type FAQItem = { question: string; answer: string };

const faqData: Record<string, FAQItem[]> = {
  price: [
    { question: "Сколько стоит вызов электрика?", answer: "Выезд и диагностика бесплатны, если вы заказываете работу. Если после диагностики решите не ремонтировать — оплачивается только выезд, сумму назовём заранее по телефону." },
    { question: "Может ли цена вырасти по ходу работы?", answer: "Нет. Мастер составляет смету до начала работ, вы её согласовываете, и сумма фиксируется в договоре. Если обнаружится что-то новое — сначала согласуем с вами, без самодеятельности." },
    { question: "Как можно оплатить?", answer: "Наличными, картой или переводом — после того, как работа выполнена и проверена при вас. Выдаём чек." },
    { question: "Кто покупает материалы?", answer: "Как удобнее вам: мастер привезёт всё необходимое (по чеку, без наценки на расходники) или поработает с вашими материалами." },
  ],
  visit: [
    { question: "Как быстро приедет мастер?", answer: "В среднем за 40 минут по Москве и Новой Москве. Точное время оператор назовёт при звонке." },
    { question: "Вы работаете ночью и в выходные?", answer: "Да, круглосуточно и без выходных. Ночной и праздничный выезд — с надбавкой, её называем заранее." },
    { question: "В какие районы выезжаете?", answer: "Вся Москва, Новая Москва (Коммунарка, Сосенское, Московский, Внуково и др.) и ближайшее Подмосковье." },
    { question: "Будет ли грязь и пыль?", answer: "Мастер работает в бахилах, накрывает мебель плёнкой, штробит с промышленным пылесосом и убирает мусор за собой." },
  ],
  guarantee: [
    { question: "Какая гарантия на работы?", answer: "До 2 лет на замену проводки и сборку щитов, 1 год — на мелкий ремонт. Гарантия указана в договоре и талоне." },
    { question: "Что если после вас снова что-то сломается?", answer: "Позвоните нам — по гарантийному случаю мастер приедет и устранит проблему бесплатно." },
    { question: "Вы работаете официально?", answer: "Да, мы ООО «Электромонтаж»: заключаем договор, выдаём чек и гарантийный талон." },
  ],
};

const tabs = [
  { id: "price", label: "Цены", icon: <Wallet className="w-4 h-4" /> },
  { id: "visit", label: "Выезд", icon: <Car className="w-4 h-4" /> },
  { id: "guarantee", label: "Гарантия", icon: <ShieldCheck className="w-4 h-4" /> },
];

export default function FAQ() {
  const { open } = useLead();
  const [active, setActive] = useState("price");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-20 md:py-[80px] px-5 md:px-[80px]">
      <div className="max-w-[780px] mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-[32px] md:text-[48px] font-bold text-ink leading-tight mb-3">Частые вопросы</h2>
          <p className="text-[16px] text-muted">Отвечаем честно — до того, как вы позвоните</p>
        </div>

        <div className="flex justify-center gap-2 border-b border-[#efefee] mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActive(tab.id);
                setOpenIndex(0);
              }}
              className={
                "inline-flex items-center gap-2 px-4 md:px-5 py-2.5 text-[15px] transition-all border-b-2 whitespace-nowrap " +
                (active === tab.id ? "text-ink font-semibold border-volt" : "text-muted font-medium border-transparent")
              }
            >
              <span className={active === tab.id ? "text-volt-deep" : ""}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div>
          {faqData[active].map((item, index) => (
            <div key={active + index} className="border-b border-[#efefee] py-5">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex justify-between items-center gap-4 text-left">
                <span className="text-[16px] font-semibold text-ink">{item.question}</span>
                <span className={"shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors " + (openIndex === index ? "bg-volt text-ink" : "bg-paper text-muted")}>
                  {openIndex === index ? <X size={18} strokeWidth={2} /> : <Plus size={18} strokeWidth={2} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 pb-1 text-[15px] text-[#5f5e5f] leading-[1.7]">{item.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-paper rounded-[18px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <img src={img("master.jpg")} alt="" className="w-[52px] h-[52px] rounded-full border-2 border-white object-cover object-top" />
            <div className="ml-4">
              <p className="font-semibold text-[15px] text-ink">Остались вопросы?</p>
              <p className="text-[14px] text-muted">Мастер ответит по телефону — бесплатно</p>
            </div>
          </div>
          <button
            onClick={() =>
              open({
                source: "faq",
                title: "Ваш вопрос электрику",
                subtitle: "Напишите вопрос в комментарии — мастер перезвонит и ответит.",
                button: "Задать вопрос",
              })
            }
            className="w-full md:w-auto relative bg-ink text-white rounded-[16px] px-6 py-4 text-[15px] font-semibold hover:bg-steel transition-colors flex items-center justify-center gap-3 overflow-hidden"
          >
            Задать вопрос
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 7v6a2 2 0 0 0 2 2h9" />
              <path d="m15 11 4 4-4 4" />
            </svg>
            <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[120%] h-[20px] bg-[radial-gradient(circle,rgba(255,198,26,0.5),transparent_70%)] blur-[15px] pointer-events-none" />
          </button>
        </div>
      </div>
    </section>
  );
}
