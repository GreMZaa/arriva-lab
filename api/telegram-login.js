import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const isSupabaseConfigured = process.env.VITE_SUPABASE_URL && process.env.VITE_SUPABASE_ANON_KEY;
const supabase = isSupabaseConfigured
  ? createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)
  : null;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Метод не поддерживается" });
  }

  const { id, first_name, last_name, username, photo_url, auth_date, hash } = req.body;

  if (!id || !auth_date || !hash) {
    return res.status(400).json({ error: "Отсутствуют обязательные параметры аутентификации" });
  }

  // 1. Verify Telegram signature
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) {
    return res.status(500).json({ error: "Токен Telegram бота не настроен на сервере" });
  }

  // Collect and sort all parameters except hash
  const authData = { id, first_name, auth_date };
  if (last_name) authData.last_name = last_name;
  if (username) authData.username = username;
  if (photo_url) authData.photo_url = photo_url;

  const dataCheckString = Object.keys(authData)
    .sort()
    .map(key => `${key}=${authData[key]}`)
    .join('\n');

  // Compute key and hash
  const secretKey = crypto.createHash('sha256').update(botToken).digest();
  const calculatedHash = crypto.createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  if (calculatedHash !== hash) {
    return res.status(401).json({ error: "Ошибка проверки подписи. Неверные данные авторизации Telegram." });
  }

  // Check age (24 hours maximum)
  const now = Math.floor(Date.now() / 1000);
  if (now - parseInt(auth_date, 10) > 86400) {
    return res.status(401).json({ error: "Сессия авторизации устарела. Пожалуйста, попробуйте войти снова." });
  }

  // 2. Signature is valid! Now create or retrieve the user in database
  const numericId = parseInt(id, 10);
  
  if (!isSupabaseConfigured) {
    // Return verified user payload for LocalStorage fallback mode
    return res.status(200).json({ 
      success: true, 
      user: { 
        id: numericId, 
        telegram_id: numericId, 
        first_name: first_name, 
        username: username || "" 
      } 
    });
  }

  try {
    // Upsert user into Supabase users table
    const { data: dbUser, error: dbErr } = await supabase
      .from("users")
      .upsert({
        telegram_id: numericId,
        first_name: first_name,
        username: username || ""
      }, { onConflict: "telegram_id" })
      .select()
      .single();

    if (dbErr) throw dbErr;

    return res.status(200).json({ success: true, user: dbUser });
  } catch (err) {
    console.error("Error creating/retrieving user on telegram login:", err);
    return res.status(500).json({ error: "Ошибка базы данных: " + err.message });
  }
}
