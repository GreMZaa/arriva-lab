import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Разрешен только метод POST" });
  }

  const { input, code } = req.body || {};

  if (!input || !code) {
    return res.status(400).json({ error: "Отсутствуют параметры ввода или кода подтверждения" });
  }

  // Validate 6-digit code format
  if (!/^\d{6}$/.test(String(code).trim())) {
    return res.status(400).json({ error: "Некорректный формат кода подтверждения (должно быть 6 цифр)" });
  }

  let chatId = null;
  const strInput = String(input).trim();

  // 1. Check if input is a numeric Telegram ID
  if (/^\d+$/.test(strInput)) {
    chatId = parseInt(strInput, 10);
  } else {
    // 2. Clean username and search in DB (matching both with and without leading '@')
    const cleanUsername = strInput.replace(/^@+/, "").trim();
    
    try {
      const { data: usersList, error } = await supabase
        .from("users")
        .select("telegram_id")
        .or(`username.ilike.${cleanUsername},username.ilike.@${cleanUsername}`)
        .order("id", { ascending: false })
        .limit(1);

      if (error) {
        console.error("Supabase username lookup error:", error);
      }

      if (usersList && usersList.length > 0 && usersList[0].telegram_id) {
        chatId = usersList[0].telegram_id;
      }
    } catch (err) {
      console.error("Error looking up username:", err);
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
