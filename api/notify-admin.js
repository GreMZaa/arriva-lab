// Helper to escape Markdown special characters for safe Telegram rendering
function escapeMarkdown(text) {
  if (!text) return "";
  return String(text).replace(/[_*`\[\]]/g, "\\$&");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Разрешен только метод POST" });
  }

  const { id, name, telegram, wishes } = req.body || {};

  if (!name || !telegram) {
    return res.status(400).json({ error: "Отсутствуют обязательные поля (name, telegram)" });
  }

  const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!adminChatId || !token) {
    return res.status(500).json({ error: "На сервере не настроены переменные окружения Telegram" });
  }

  const cleanName = escapeMarkdown(name.trim());
  const cleanTelegram = escapeMarkdown(telegram.trim().startsWith("@") ? telegram.trim() : "@" + telegram.trim());
  const cleanWishes = escapeMarkdown(wishes ? wishes.trim() : "Не указаны");
  const cleanId = escapeMarkdown(id ? String(id) : "N/A");

  const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

  const messageText = `🔥 *Новая заявка с веб-сайта ARRIVA lab!*\n\n` +
    `👤 *Имя:* ${cleanName}\n` +
    `💬 *Telegram:* ${cleanTelegram}\n` +
    `🎨 *Детали заявки:* ${cleanWishes}\n` +
    `🆔 *ID Заявки:* ${cleanId}`;

  const inlineKeyboard = {
    inline_keyboard: [
      [
        { text: "✅ Принять", callback_data: `approve_${id || 0}` },
        { text: "❌ Отклонить", callback_data: `reject_${id || 0}` }
      ]
    ]
  };

  try {
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: adminChatId,
        text: messageText,
        parse_mode: "Markdown",
        reply_markup: id ? inlineKeyboard : undefined
      })
    });

    const data = await response.json();
    if (!data.ok) {
      throw new Error(data.description || "ошибка Telegram API");
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error notifying admin:", err);
    return res.status(500).json({ error: "Не удалось отправить уведомление в админ-чат: " + err.message });
  }
}
