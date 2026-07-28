import { createClient } from "@supabase/supabase-js";

const isSupabaseConfigured = process.env.VITE_SUPABASE_URL && process.env.VITE_SUPABASE_ANON_KEY;
const supabase = isSupabaseConfigured
  ? createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)
  : null;

// Fallback promo codes dictionary if table isn't created in Supabase yet
const fallbackPromos = {
  "ARRIVA10": { discount_percent: 10, discount_amount: 0, partner_name: "Официальный партнёр ARRIVA" },
  "STREAMER5": { discount_percent: 5, discount_amount: 0, partner_name: "Партнёрская программа Стримеров" },
  "VIP15": { discount_percent: 15, discount_amount: 0, partner_name: "Специальное VIP предложение" }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Метод не поддерживается" });
  }

  const { code, price = 0 } = req.body;

  if (!code || typeof code !== "string") {
    return res.status(400).json({ error: "Укажите корректный промокод" });
  }

  const normalizedCode = code.trim().toUpperCase();
  let promoData = null;

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("promo_codes")
        .select("*")
        .eq("code", normalizedCode)
        .eq("is_active", true)
        .maybeSingle();

      if (!error && data) {
        promoData = data;
      }
    } catch (err) {
      console.error("Error querying promo_codes in DB:", err);
    }
  }

  // Use fallback if not found in DB
  if (!promoData && fallbackPromos[normalizedCode]) {
    promoData = fallbackPromos[normalizedCode];
  }

  // Personal referral link codes (e.g. REF405845462) give 2% discount
  if (!promoData && normalizedCode.startsWith("REF")) {
    promoData = {
      discount_percent: 2,
      discount_amount: 0,
      partner_name: "Реферальная ссылка (2% скидка)"
    };
  }

  if (!promoData) {
    return res.status(404).json({ error: "Промокод не найден или устарел" });
  }

  const originalPrice = Number(price) || 0;
  let discountAmount = 0;
  let discountPercent = promoData.discount_percent || 0;

  if (promoData.discount_amount && promoData.discount_amount > 0) {
    discountAmount = Number(promoData.discount_amount);
  } else if (discountPercent > 0) {
    discountAmount = Math.round((originalPrice * discountPercent) / 100);
  }

  const finalPrice = Math.max(0, originalPrice - discountAmount);

  return res.status(200).json({
    success: true,
    code: normalizedCode,
    discountPercent,
    discountAmount,
    finalPrice,
    partnerName: promoData.partner_name || "Партнёрская программа",
    message: `Промокод ${normalizedCode} успешно применён (${discountPercent > 0 ? `-${discountPercent}%` : `-${discountAmount} ₽`})!`
  });
}
