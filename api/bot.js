import { Bot, webhookCallback, InlineKeyboard } from "grammy";
import { createClient } from "@supabase/supabase-js";

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Main menu helper
const sendMainMenu = async (ctx, text = "Выберите интересующий вас раздел:") => {
  const keyboard = new InlineKeyboard()
    .text("✨ Подобрать образ", "quiz_start").row()
    .text("💎 Тарифы и цены", "prices").row()
    .text("👤 Личный кабинет", "my_id").row()
    .text("💬 Техподдержка", "support");

  await ctx.reply(text, { reply_markup: keyboard });
};

// COMMANDS
bot.command("start", async (ctx) => {
  const userId = ctx.chat.id;
  const username = ctx.from.username || "";
  const firstName = ctx.from.first_name || "";

  try {
    await supabase.from("users").upsert({
      telegram_id: userId,
      username: username,
      first_name: firstName
    }, { onConflict: "telegram_id" });
  } catch (err) {
    console.error("Error saving user:", err);
  }

  const welcomeText = `👋 <b>Добро пожаловать в Oriva Lab!</b>\n\n` +
    `Я — Oriva, цифровой консультант лаборатории цифровых моделей.\n\n` +
    `Я помогу подобрать образ под вашу цель или ознакомиться с нашими тарифами.`;

  await sendMainMenu(ctx, welcomeText);
});

// CALLBACKS
bot.callbackQuery("quiz_start", async (ctx) => {
  const keyboard = new InlineKeyboard()
    .text("🆕 Я только начинаю (запуск с нуля)", "quiz_exp_new").row()
    .text("📹 Уже стримлю с веб-камерой (переход на VTuber)", "quiz_exp_cam");

  await ctx.answerCallbackQuery();
  await ctx.editMessageText("✨ <b>Подобрать образ — Шаг 1 из 4</b>\n\nКаков ваш текущий статус в стриминге?", {
    parse_mode: "HTML",
    reply_markup: keyboard
  });
});

bot.callbackQuery(/^quiz_exp_(.+)$/, async (ctx) => {
  const exp = ctx.match[1];
  const userId = ctx.from.id;
  await supabase.from("user_states").upsert({
    telegram_id: userId,
    state: "step_goal",
    data: { exp },
    updated_at: new Date()
  }, { onConflict: "telegram_id" });

  const keyboard = new InlineKeyboard()
    .text("🌐 Популярные (YouTube, Twitch, Kick, VK)", "quiz_goal_public").row()
    .text("🔞 Специализированные (18+ / Анонимно)", "quiz_goal_anonymous");

  await ctx.answerCallbackQuery();
  await ctx.editMessageText("✨ <b>Подобрать образ — Шаг 2 из 4</b>\n\nНа каких платформах вы планируете стримить?", {
    parse_mode: "HTML",
    reply_markup: keyboard
  });
});

bot.callbackQuery(/^quiz_goal_(.+)$/, async (ctx) => {
  const goal = ctx.match[1];
  const userId = ctx.from.id;
  const { data: stateData } = await supabase.from("user_states").select("*").eq("telegram_id", userId).single();
  const currentData = stateData ? stateData.data : {};

  await supabase.from("user_states").update({
    state: "step_budget",
    data: { ...currentData, goal },
    updated_at: new Date()
  }).eq("telegram_id", userId);

  const keyboard = new InlineKeyboard()
    .text("📄 Без модели (только инструкции)", "quiz_budget_none").row()
    .text("🎨 2D Live2D модель (со скидкой 50%)", "quiz_budget_2d").row()
    .text("🧊 3D VRM модель (со скидкой 50%)", "quiz_budget_3d");

  await ctx.answerCallbackQuery();
  await ctx.editMessageText("✨ <b>Подобрать образ — Шаг 3 из 4</b>\n\nКакая модель персонажа вас интересует?", {
    parse_mode: "HTML",
    reply_markup: keyboard
  });
});

bot.callbackQuery(/^quiz_budget_(.+)$/, async (ctx) => {
  const budget = ctx.match[1];
  const userId = ctx.from.id;
  const { data: stateData } = await supabase.from("user_states").select("*").eq("telegram_id", userId).single();
  const currentData = stateData ? stateData.data : {};

  await supabase.from("user_states").update({
    state: "step_hardware",
    data: { ...currentData, budget },
    updated_at: new Date()
  }).eq("telegram_id", userId);

  const keyboard = new InlineKeyboard()
    .text("📖 Настрою всё сам по инструкциям", "quiz_hw_self").row()
    .text("👑 Хочу полное сопровождение под ключ", "quiz_hw_premium");

  await ctx.answerCallbackQuery();
  await ctx.editMessageText("✨ <b>Подобрать образ — Шаг 4 из 4</b>\n\nНужна ли вам личная помощь в настройке?", {
    parse_mode: "HTML",
    reply_markup: keyboard
  });
});

bot.callbackQuery(/^quiz_hw_(.+)$/, async (ctx) => {
  const hardware = ctx.match[1];
  const userId = ctx.from.id;
  const { data: stateData } = await supabase.from("user_states").select("*").eq("telegram_id", userId).single();
  const currentData = stateData ? stateData.data : {};

  const exp = currentData.exp || "new";
  const goal = currentData.goal || "public";
  const budget = currentData.budget || "none";

  let rec = "archive_002_basic";
  if (exp === "cam") rec = "archive_004";
  else if (goal === "anonymous") rec = "archive_003";
  else if (hardware === "premium") rec = "archive_002_premium";
  else if (budget === "2d") rec = "archive_002_2d";
  else if (budget === "3d") rec = "archive_002_3d";

  const recNames = {
    archive_002_basic: "🟢 АРХИВ 002 — базовый (14 900 ₽)",
    archive_002_2d: "🔵 АРХИВ 002 + 2D (29 900 ₽)",
    archive_002_3d: "🔵 АРХИВ 002 + 3D (34 900 ₽)",
    archive_002_premium: "🟣 АРХИВ 002 PREMIUM (49 900 ₽)",
    archive_003: "🔞 АРХИВ 003 (от 59 900 ₽)",
    archive_004: "🔄 АРХИВ 004 — РЕСТАРТ (39 900 ₽)"
  };

  const keyboard = new InlineKeyboard()
    .text("💳 Оформить программу", `buy_${rec}`).row()
    .text("✨ Подобрать образ заново", "quiz_start").row()
    .text("🏠 Главное меню", "main_menu");

  await ctx.answerCallbackQuery();
  await ctx.editMessageText(`🎉 <b>Результат подбора:</b>\n\nНа основе ваших ответов рекомендуем программу:\n<b>${recNames[rec] || rec}</b>`, {
    parse_mode: "HTML",
    reply_markup: keyboard
  });
});

bot.callbackQuery("prices", async (ctx) => {
  const priceText = `💎 <b>Наши тарифы и услуги Oriva Lab:</b>\n\n` +
    `🟢 <b>АРХИВ 002 — базовый</b> — <code>14 900 ₽</code>\n` +
    `Пошаговое руководство по самостоятельному запуску VTuber-аватара с нуля.\n\n` +
    `🔵 <b>АРХИВ 002 + 2D</b> — <code>29 900 ₽</code>\n` +
    `Базовый архив + разработка персонального 2D-аватара со скидкой 50%.\n\n` +
    `🔵 <b>АРХИВ 002 + 3D</b> — <code>34 900 ₽</code>\n` +
    `Базовый архив + создание 3D/VRM модели персонажа со скидкой 50%.\n\n` +
    `🟣 <b>АРХИВ 002 PREMIUM</b> — <code>49 900 ₽</code>\n` +
    `Личное сопровождение до первого эфира + 2D или 3D модель в подарок.\n\n` +
    `🔄 <b>АРХИВ 004 — РЕСТАРТ</b> — <code>39 900 ₽</code>\n` +
    `Пошаговый переход с веб-камеры на виртуальный формат без потери аудитории.\n\n` +
    `🔞 <b>АРХИВ 003</b> — <code>от 59 900 ₽</code>\n` +
    `Специализированный запуск на анонимных и 18+ площадках с защитой приватности.\n\n` +
    `🤝 <b>Работать с нами</b> — <code>15% от дохода</code>\n` +
    `Агентская программа: даём программу, подбираем модель и ведем ваш канал.`;

  const keyboard = new InlineKeyboard().text("🔙 Назад", "main_menu");
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(priceText, { parse_mode: "HTML", reply_markup: keyboard });
});

bot.callbackQuery("my_id", async (ctx) => {
  const idText = `🔑 Ваш цифровой Telegram ID: <code>${ctx.from.id}</code>\n\n` +
    `Используйте его на сайте в личной кабинете для входа.`;

  const keyboard = new InlineKeyboard().text("🔙 Назад", "main_menu");
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(idText, { parse_mode: "HTML", reply_markup: keyboard });
});

bot.callbackQuery("support", async (ctx) => {
  const supportText = `💬 <b>Служба заботы Oriva Lab</b>\n\n` +
    `Наш специалист поддержки на связи в Telegram:\n👉 <b>@success_vstream</b>`;

  const keyboard = new InlineKeyboard().text("🔙 Назад", "main_menu");
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(supportText, { parse_mode: "HTML", reply_markup: keyboard });
});

bot.callbackQuery("main_menu", async (ctx) => {
  const welcomeText = `Выберите интересующий вас раздел:`;
  
  const keyboard = new InlineKeyboard()
    .text("✨ Подобрать образ", "quiz_start").row()
    .text("💎 Тарифы и цены", "prices").row()
    .text("👤 Личный кабинет", "my_id").row()
    .text("💬 Техподдержка", "support");

  await ctx.answerCallbackQuery();
  await ctx.editMessageText(welcomeText, { parse_mode: "HTML", reply_markup: keyboard });
});

// ADMIN APPROVAL ACTIONS
bot.callbackQuery(/^(approve|reject)_(.+)$/, async (ctx) => {
  const action = ctx.match[1];
  const rawId = ctx.match[2];
  const status = action === "approve" ? "approved" : "rejected";
  const statusText = action === "approve" ? "✅ Принята / Подтверждена" : "❌ Отклонена";

  try {
    const numericId = !isNaN(Number(rawId)) ? Number(rawId) : rawId;

    // 1. Update in purchases table
    await supabase
      .from("purchases")
      .update({ status })
      .eq("id", numericId);

    // 2. Update in agency_applications table
    await supabase
      .from("agency_applications")
      .update({ status })
      .eq("id", numericId);

    await ctx.answerCallbackQuery({ text: `Статус заявки/оплаты #${rawId} обновлен: ${statusText}` });

    const originalText = ctx.callbackQuery.message?.text || "Заявка ARRIVA lab";
    const updatedText = originalText + `\n\n📌 *Статус:* ${statusText} (Модератор: @${ctx.from.username || ctx.from.first_name})`;

    await ctx.editMessageText(updatedText, { parse_mode: "Markdown" });
  } catch (err) {
    console.error("Error updating status in bot:", err);
    await ctx.answerCallbackQuery({ text: "Ошибка обновления статуса: " + err.message });
  }
});

// TEXT INPUTS (for Quiz steps)
bot.on("message:text", async (ctx) => {
  const userId = ctx.from.id;

  const { data: stateData } = await supabase
    .from("user_states")
    .select("*")
    .eq("telegram_id", userId)
    .single();

  if (stateData) {
    const { state, data } = stateData;

    if (state === "step_name") {
      const nextData = { ...data, name: ctx.message.text };
      await supabase.from("user_states").update({
        state: "step_wishes",
        data: nextData,
        updated_at: new Date()
      }).eq("telegram_id", userId);

      await ctx.reply("🎨 Шаг 4: Опишите ваши пожелания по дизайну, стилю или референсам:");
    } else if (state === "step_wishes") {
      const wishes = ctx.message.text;
      const avatarType = data.avatarType || "2D-Аватар";
      const usage = data.usage || "Стриминг";
      const name = data.name || ctx.from.first_name;

      // Submit application to DB
      const { data: app, error } = await supabase
        .from("agency_applications")
        .insert({
          telegram_id: userId,
          full_name: name,
          about: `Тип: ${avatarType}. Цель: ${usage}. Пожелания: ${wishes}. Источник: Бот`,
          status: "pending"
        })
        .select()
        .single();

      if (error) {
        await ctx.reply("❌ Ошибка отправки заявки: " + error.message);
        return;
      }

      // Delete user state
      await supabase.from("user_states").delete().eq("telegram_id", userId);

      // Notify admin group
      const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
      if (adminChatId) {
        const messageText = `🔥 *Новая заявка через Telegram-бота!*\n\n` +
          `👤 *Имя:* ${name}\n` +
          `💬 *Telegram:* @${ctx.from.username || ""}\n` +
          `🆔 *Chat ID:* \`${userId}\`\n` +
          `👾 *Тип:* ${avatarType}\n` +
          `🎯 *Цель:* ${usage}\n` +
          `🎨 *Пожелания:* ${wishes}`;

        const keyboard = new InlineKeyboard()
          .text("✅ Принять", `approve_${app.id}`)
          .text("❌ Отклонить", `reject_${app.id}`);

        await bot.api.sendMessage(adminChatId, messageText, {
          parse_mode: "Markdown",
          reply_markup: keyboard
        });
      }

      await ctx.reply("🎉 Ваша заявка успешно принята! Наш менеджер скоро свяжется с вами.");
    }
  } else {
    // Show standard menu if no state exists
    await sendMainMenu(ctx, "Используйте меню ниже для работы с ботом:");
  }
});

// EXPORT WEBHOOK CALLBACK FOR VERCEL
export default webhookCallback(bot, "next-js");
