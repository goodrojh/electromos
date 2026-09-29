export const PHONE_DISPLAY = "+7 000 000 00 00";
export const PHONE_HREF = "tel:+70000000000";
export const WHATSAPP_HREF = "https://wa.me/70000000000";
export const TELEGRAM_HREF = "https://t.me/+70000000000";

export const BRAND = "ЭлектроМос";
export const ADDRESS = "Москва, пос. Коммунарка, ул. Липовый Парк, 7";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const img = (name: string) => `${BASE}/img/${name}`;

export const rub = (n: number) => n.toLocaleString("ru-RU") + " ₽";
