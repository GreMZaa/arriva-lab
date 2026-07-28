import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const isSupabaseConfigured = process.env.VITE_SUPABASE_URL && process.env.VITE_SUPABASE_ANON_KEY;
const supabase = isSupabaseConfigured
  ? createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)
  : null;

// Helper to verify WebApp initData
function verifyInitData(initDataRaw, botToken) {
  const urlParams = new URLSearchParams(initDataRaw);
  const hash = urlParams.get("hash");
  if (!hash) return null;

  urlParams.delete("hash");

  const paramsArray = [];
  for (const [key, value] of urlParams.entries()) {
    paramsArray.push(`${key}=${value}`);
  }
  paramsArray.sort();
  const dataCheckString = paramsArray.join("\n");

  const secretKey = crypto.createHmac("sha256", "WebAppData").update(botToken).digest();
  const calculatedHash = crypto.createHmac("sha256", secretKey).update(dataCheckString).digest("hex");

  if (calculatedHash !== hash) {
    return null;
  }

  const userStr = urlParams.get("user");
  const authDate = urlParams.get("auth_date");

  // Check auth date freshness (24h limit)
  if (authDate) {
    const now = Math.floor(Date.now() / 1000);
    if (now - parseInt(authDate, 10) > 86400) {
      return null;
    }
  }

  try {
    const user = JSON.parse(userStr);
    return user;
  } catch (err) {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Метод не поддерживается" });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) {
    return res.status(500).json({ error: "Токен Telegram бота не настроен на сервере" });
  }

  let verifiedUser = null;
  const { initData, id, first_name, last_name, username, photo_url, auth_date, hash } = req.body;

  // 1. Mini App initData Verification Flow
  if (initData) {
    verifiedUser = verifyInitData(initData, botToken);
    if (!verifiedUser) {
      return res.status(401).json({ error: "Недействительные или устаревшие данные Telegram Mini App initData." });
    }
  } else if (id && auth_date && hash) {
    // 2. Standard Telegram Login Widget Verification Flow
    const authData = { id, first_name, auth_date };
    if (last_name) authData.last_name = last_name;
    if (username) authData.username = username;
    if (photo_url) authData.photo_url = photo_url;

    const dataCheckString = Object.keys(authData)
      .sort()
      .map(key => `${key}=${authData[key]}`)
      .join('\n');

    const secretKey = crypto.createHash('sha256').update(botToken).digest();
    const calculatedHash = crypto.createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    if (calculatedHash !== hash) {
      return res.status(401).json({ error: "Ошибка проверки подписи Telegram." });
    }

    const now = Math.floor(Date.now() / 1000);
    if (now - parseInt(auth_date, 10) > 86400) {
      return res.status(401).json({ error: "Сессия авторизации устарела." });
    }

    verifiedUser = {
      id: parseInt(id, 10),
      first_name,
      last_name,
      username
    };
  } else {
    return res.status(400).json({ error: "Отсутствуют обязательные параметры аутентификации Telegram." });
  }

  // 3. User signature verified! Upsert user into Supabase DB
  const numericId = parseInt(verifiedUser.id, 10);
  
  if (!isSupabaseConfigured) {
    return res.status(200).json({ 
      success: true, 
      user: { 
        id: numericId, 
        telegram_id: numericId, 
        first_name: verifiedUser.first_name || "", 
        username: verifiedUser.username || "" 
      } 
    });
  }

  try {
    const { data: dbUser, error: dbErr } = await supabase
      .from("users")
      .upsert({
        telegram_id: numericId,
        first_name: verifiedUser.first_name || "",
        username: verifiedUser.username || ""
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
