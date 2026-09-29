"use client";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { X, Phone, Check, Zap, ShieldCheck, Clock } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF } from "./site";

export type LeadConfig = {
  source: string;
  title: string;
  subtitle?: string;
  button?: string;
  /** Chips the client can pick from (problem, service type, etc.) */
  options?: string[];
  optionsLabel?: string;
  preset?: string;
  /** Show "when to come" selector */
  askTime?: boolean;
  /** Extra read-only summary (e.g. calculator result) */
  summary?: string;
  accent?: "volt" | "red";
};

type Ctx = { open: (c: LeadConfig) => void };
const LeadCtx = createContext<Ctx>({ open: () => {} });
export const useLead = () => useContext(LeadCtx);

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<LeadConfig | null>(null);
  const open = useCallback((c: LeadConfig) => setConfig(c), []);
  return (
    <LeadCtx.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {config && <LeadModal key={config.source} config={config} onClose={() => setConfig(null)} />}
      </AnimatePresence>
    </LeadCtx.Provider>
  );
}

function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7")) d = "7" + d;
  d = d.slice(0, 11);
  const p = d.slice(1);
  let out = "+7";
  if (p.length > 0) out += " (" + p.slice(0, 3);
  if (p.length >= 3) out += ")";
  if (p.length > 3) out += " " + p.slice(3, 6);
  if (p.length > 6) out += "-" + p.slice(6, 8);
  if (p.length > 8) out += "-" + p.slice(8, 10);
  return out;
}

const TIMES = ["Как можно скорее", "Сегодня вечером", "Завтра", "Договоримся по телефону"];

async function sendLead(payload: Record<string, unknown>) {
  // Подключите приём заявок: укажите NEXT_PUBLIC_LEAD_ENDPOINT (Telegram-бот, CRM, Formspree и т.п.)
  const endpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT;
  if (!endpoint) {
    console.info("[lead]", payload);
    await new Promise((r) => setTimeout(r, 700));
    return;
  }
  await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

function LeadModal({ config, onClose }: { config: LeadConfig; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [option, setOption] = useState(config.preset || "");
  const [time, setTime] = useState(TIMES[0]);
  const [comment, setComment] = useState("");
  const [agree, setAgree] = useState(true);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.replace(/\D/g, "").length < 11) return setError("Введите номер полностью — мы перезвоним");
    if (!agree) return setError("Нужно согласие на обработку данных");
    setError("");
    setState("sending");
    try {
      await sendLead({ source: config.source, name, phone, option, time: config.askTime ? time : undefined, comment, summary: config.summary });
      setState("done");
    } catch {
      setState("idle");
      setError("Не удалось отправить. Позвоните нам: " + PHONE_DISPLAY);
    }
  };

  const isRed = config.accent === "red";

  return (
    <m.div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-ink/80" onClick={onClose} />
      <m.div
        role="dialog"
        aria-modal="true"
        initial={{ y: 60, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
        className="relative w-full sm:max-w-[520px] max-h-[92vh] overflow-y-auto rounded-t-[28px] sm:rounded-[28px] bg-white shadow-2xl"
      >
        {/* Header strip */}
        <div className={"relative overflow-hidden px-6 sm:px-8 pt-7 pb-6 " + (isRed ? "bg-[#1a0b0b]" : "bg-ink")}>
          <div className={"absolute -top-20 -right-16 w-64 h-64 rounded-full " + (isRed ? "bg-[radial-gradient(closest-side,rgba(239,68,68,0.45),transparent)]" : "bg-[radial-gradient(closest-side,rgba(255,198,26,0.35),transparent)]")} />
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative flex items-center gap-2 mb-3">
            <span className={"inline-flex rounded-full h-2 w-2 " + (isRed ? "bg-red-500" : "bg-volt")} />
            <span className="text-[12px] font-medium text-white/70">Перезвоним в течение 5 минут</span>
          </div>
          <h3 className="relative font-display font-bold text-[24px] sm:text-[28px] leading-[1.1] text-white pr-10">{config.title}</h3>
          {config.subtitle && <p className="relative mt-2 text-[14px] text-white/65 leading-relaxed">{config.subtitle}</p>}
        </div>

        <AnimatePresence mode="wait">
          {state === "done" ? (
            <m.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-6 sm:px-8 py-10 text-center">
              <m.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="mx-auto w-20 h-20 rounded-full bg-volt flex items-center justify-center shadow-[0_0_60px_rgba(255,198,26,0.6)]"
              >
                <Check className="w-10 h-10 text-ink stroke-[3]" />
              </m.div>
              <h4 className="mt-6 font-display font-bold text-2xl text-ink">Заявка принята</h4>
              <p className="mt-2 text-[15px] text-gray-500 max-w-[340px] mx-auto">
                {name ? name + ", специалист" : "Специалист"} перезвонит вам в течение 5 минут и согласует стоимость работ.
              </p>
              <a href={PHONE_HREF} className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-ink underline decoration-volt decoration-2 underline-offset-4">
                <Phone className="w-4 h-4" /> Телефон: {PHONE_DISPLAY}
              </a>
              <button onClick={onClose} className="mt-8 w-full rounded-full py-4 bg-ink text-white font-semibold hover:bg-steel transition-colors">
                Хорошо
              </button>
            </m.div>
          ) : (
            <m.form key="form" onSubmit={submit} className="px-6 sm:px-8 py-6 flex flex-col gap-4">
              {config.summary && (
                <div className="rounded-2xl bg-volt-soft border border-volt/40 p-4 text-[13px] text-ink whitespace-pre-line leading-relaxed">
                  {config.summary}
                </div>
              )}

              {config.options && (
                <div>
                  <p className="text-[13px] font-semibold text-ink mb-2">{config.optionsLabel || "Что нужно сделать?"}</p>
                  <div className="flex flex-wrap gap-2">
                    {config.options.map((o) => (
                      <button
                        type="button"
                        key={o}
                        onClick={() => setOption(o === option ? "" : o)}
                        className={
                          "px-3.5 py-2 rounded-full text-[13px] font-medium border transition-all " +
                          (option === o ? "bg-ink text-white border-ink" : "bg-white text-gray-700 border-gray-200 hover:border-ink")
                        }
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] font-semibold text-ink">Как к вам обращаться</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Имя"
                  autoComplete="given-name"
                  className="h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-[16px] outline-none focus:border-ink focus:bg-white transition-colors"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] font-semibold text-ink">Телефон *</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  onFocus={() => !phone && setPhone("+7")}
                  placeholder="+7 (___) ___-__-__"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  className="h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-[16px] tracking-wide outline-none focus:border-ink focus:bg-white transition-colors"
                />
              </label>

              {config.askTime && (
                <div>
                  <p className="text-[13px] font-semibold text-ink mb-2">Когда удобно?</p>
                  <div className="grid grid-cols-2 gap-2">
                    {TIMES.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setTime(t)}
                        className={
                          "px-3 py-2.5 rounded-xl text-[13px] font-medium border text-left transition-all " +
                          (time === t ? "bg-volt border-volt text-ink" : "bg-white border-gray-200 text-gray-600 hover:border-ink")
                        }
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={2}
                placeholder="Комментарий: что случилось, адрес или район (необязательно)"
                className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-[15px] outline-none focus:border-ink focus:bg-white transition-colors resize-none"
              />

              {error && <p className="text-[13px] text-red-600 font-medium">{error}</p>}

              <button
                type="submit"
                disabled={state === "sending"}
                className={
                  "group relative w-full h-16 rounded-full font-bold text-[16px] flex items-center justify-center gap-2 overflow-hidden transition-all active:scale-[0.98] disabled:opacity-70 " +
                  (isRed ? "bg-red-500 text-white" : "bg-volt text-ink shadow-[0_10px_40px_-10px_rgba(255,198,26,0.8)]")
                }
              >
                <span className="shimmer" aria-hidden />
                <Zap className="w-5 h-5 relative" />
                <span className="relative">{state === "sending" ? "Отправляем…" : config.button || "Отправить заявку"}</span>
              </button>

              <label className="flex items-start gap-2.5 text-[12px] text-gray-500 leading-snug cursor-pointer">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 accent-ink w-4 h-4 shrink-0" />
                Даю согласие на обработку персональных данных в соответствии с политикой конфиденциальности
              </label>

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100 text-[12px] text-gray-500">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-ink" /> Цена фиксируется в договоре</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-ink" /> Выезд от 40 минут</span>
              </div>
              <a href={PHONE_HREF} className="text-center text-[14px] font-semibold text-ink">
                или позвоните: <span className="underline decoration-volt decoration-2 underline-offset-4">{PHONE_DISPLAY}</span>
              </a>
            </m.form>
          )}
        </AnimatePresence>
      </m.div>
    </m.div>
  );
}
