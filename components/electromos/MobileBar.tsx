"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Zap } from "lucide-react";
import { useLead } from "./LeadModal";
import { PHONE_HREF } from "./site";

export default function MobileBar() {
  const { open } = useLead();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="md:hidden fixed bottom-0 inset-x-0 z-[80] p-3 pb-[max(12px,env(safe-area-inset-bottom))]"
        >
          <div className="flex gap-2 rounded-full bg-ink/85 backdrop-blur-xl border border-white/10 p-1.5 shadow-2xl">
            <a href={PHONE_HREF} className="flex-1 h-12 rounded-full bg-white/10 text-white font-semibold flex items-center justify-center gap-2">
              <Phone className="w-4 h-4 text-volt" /> Позвонить
            </a>
            <button
              onClick={() =>
                open({
                  source: "mobile-bar",
                  title: "Вызвать электрика",
                  subtitle: "Перезвоним за 5 минут и назовём цену.",
                  options: ["Срочно", "Установка", "Ремонт", "Проводка"],
                  askTime: true,
                })
              }
              className="flex-1 h-12 rounded-full bg-volt text-ink font-bold flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-ink" /> Вызвать
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
