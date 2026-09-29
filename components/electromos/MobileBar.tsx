"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Phone, Zap } from "lucide-react";
import { useLead } from "./LeadModal";
import { PHONE_HREF } from "./site";

export default function MobileBar() {
  const { open } = useLead();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show the bar once the hero leaves the viewport (no scroll listener)
    const hero = document.querySelector("main > section");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { threshold: 0.15 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <m.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "tween", duration: 0.25 }}
          className="md:hidden fixed bottom-0 inset-x-0 z-[80] p-3 pb-[max(12px,env(safe-area-inset-bottom))]"
        >
          <div className="flex gap-2 rounded-full bg-ink/95 border border-white/10 p-1.5 shadow-2xl">
            <a href={PHONE_HREF} className="flex-1 h-12 rounded-full bg-white/10 text-white font-semibold flex items-center justify-center gap-2">
              <Phone className="w-4 h-4 text-volt" /> Позвонить
            </a>
            <button
              onClick={() =>
                open({
                  source: "mobile-bar",
                  title: "Вызов электрика",
                  subtitle: "Перезвоним в течение 5 минут и согласуем стоимость.",
                  options: ["Срочно", "Установка", "Ремонт", "Проводка"],
                  askTime: true,
                })
              }
              className="flex-1 h-12 rounded-full bg-volt text-ink font-bold flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-ink" /> Вызвать
            </button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
