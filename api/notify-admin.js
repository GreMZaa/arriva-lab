export default async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const params = req.method === "POST" ? req.body : req.query;
  const { id, name, telegram, wishes } = params;

  if (!name || !telegram) {
    return res.status(400).json({ error: "Missing required fields (name, telegram)" });
  }

  const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!adminChatId || !token) {
    return res.status(500).json({ error: "Server missing Telegram configuration environment variables" });
  }

  const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

  const messageText = `🔥 *Новая заявка с веб-сайта ARRIVA lab!*\n\n` +
    `👤 *Имя:* ${name}\n` +
    `💬 *Telegram:* ${telegram.startsWith("@") ? telegram : "@" + telegram}\n` +
    `🎨 *Детали заявки:* ${wishes || "Не указаны"}\n` +
    `🆔 *ID Заявки:* ${id || "N/A"}`;

  // Build inline keyboard for moderator approval
  const inlineKeyboard = {
    inline_keyboard: [
      [
        { text: "✅ Принять", callback_data: `approve_${id}` },
        { text: "❌ Отклонить", callback_data: `reject_${id}` }
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
      throw new Error(data.description || "Telegram API error");
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error notifying admin:", err);
    return res.status(500).json({ error: "Failed to send notification to admin chat: " + err.message });
  }
}
