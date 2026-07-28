import { Bot } from "grammy";
import { createClient } from "@supabase/supabase-js";

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN || "");
const supabase = createClient(
  process.env.VITE_SUPABASE_URL || "",
  process.env.VITE_SUPABASE_ANON_KEY || ""
);

const escapeHtml = (text) => {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Метод не поддерживается" });
  }

  const { telegram_id, title, message, item_name, status } = req.body;

  if (!telegram_id) {
    return res.status(400).json({ error: "Не указан telegram_id" });
  }

  if (!process.env.TELEGRAM_BOT_TOKEN) {
    return res.status(500).json({ error: "TELEGRAM_BOT_TOKEN не настроен на сервере" });
  }

  try {
    let pushText = "";
    if (status === "approved") {
      pushText = `🎉 <b>ВАШ ЗАКАЗ ОДОБРЕН!</b>\n\n` +
        `📦 <b>Программа/Тариф:</b> ${escapeHtml(item_name || "Тариф ARRIVA lab")}\n` +
        `✅ <b>Статус:</b> Успешно подтвержден модератором.\n\n` +
        `Вам открыт доступ в <b>Личном кабинете</b>. Перейдите на сайт или откройте Mini App!`;
    } else if (title && message) {
      pushText = `🔔 <b>${escapeHtml(title)}</b>\n\n${escapeHtml(message)}`;
    } else {
      pushText = `📢 <b>Уведомление от ARRIVA lab</b>\n\n${escapeHtml(message || "Ваш статус обновлен!")}`;
    }

    await bot.api.sendMessage(telegram_id, pushText, { parse_mode: "HTML" });

    return res.status(200).json({ success: true, message: "PUSH-уведомление успешно доставлено" });
  } catch (err) {
    console.error("Error sending push notification via bot:", err);
    return res.status(500).json({ error: "Ошибка отправки PUSH-уведомления: " + err.message });
  }
}
