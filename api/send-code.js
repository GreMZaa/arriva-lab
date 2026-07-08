import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ error: "Метод не поддерживается" });
  }

  // Support both GET and POST for simplicity
  const params = req.method === "POST" ? req.body : req.query;
  const { input, code } = params;

  if (!input || !code) {
    return res.status(400).json({ error: "Отсутствуют параметры ввода или кода подтверждения" });
  }

  let chatId = null;

  // 1. Check if input is a numeric Telegram ID
  if (/^\d+$/.test(input.trim())) {
    chatId = parseInt(input.trim(), 10);
  } else {
    // 2. Clean username and search in DB
    const cleanUsername = input.replace("@", "").trim();
    
    try {
      const { data: user, error } = await supabase
        .from("users")
        .select("telegram_id")
        .ilike("username", cleanUsername)
        .maybeSingle();

      if (error) throw error;

      if (user && user.telegram_id) {
        chatId = user.telegram_id;
      }
    } catch (err) {
      console.error("Error looking up username:", err);
      return res.status(500).json({ error: "Ошибка базы данных при поиске пользователя" });
    }
  }

  if (!chatId) {
    return res.status(404).json({ 
      error: "Пользователь не найден. Пожалуйста, сначала запустите Telegram-бота (напишите ему в ЛС команду /start), чтобы привязать ваш никнейм к системе." 
    });
  }

  // 3. Send message via Telegram Bot API
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: `🔑 *ARRIVA lab.*\n\nВаш временный код для входа в Личный Кабинет:\n\n💬 *${code}*\n\nНикому не сообщайте этот код.`,
        parse_mode: "Markdown"
      })
    });

    const data = await response.json();
    if (!data.ok) {
      throw new Error(data.description || "ошибка Telegram API");
    }

    return res.status(200).json({ success: true, chat_id: chatId });
  } catch (err) {
    console.error("Error sending telegram message:", err);
    return res.status(500).json({ error: "Не удалось отправить код через Telegram: " + err.message });
  }
}
