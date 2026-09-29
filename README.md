# ЭлектроМос — лендинг электрика в Москве

Next.js 15 (App Router) + Tailwind CSS + framer-motion + lucide-react. Статический экспорт, деплой на GitHub Pages через Actions.

```bash
npm install
npm run dev
```

- Телефон и контакты: `components/electromos/site.ts`
- Приём заявок: задайте `NEXT_PUBLIC_LEAD_ENDPOINT` (URL, принимающий POST JSON) — см. `LeadModal.tsx`
- Фото сгенерированы в Higgsfield (Nano Banana Pro): `public/img`
