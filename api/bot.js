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

const PROGRAMS = {
  archive_002_basic: {
    title: "🟢 АРХИВ 002 — базовый\nБазовый запуск с нуля",
    price: "14 900 ₽",
    items: [
      "Полный архив: 8 этапов + доп. раздел (28 страниц)",
      "Пошаговый запуск — оборудование, образ, OBS, первый эфир, платформы",
      "Чек-листы, глоссарий, разбор частых ошибок",
      "Поддержка 24/7",
      "Скидка 50% на готовую модель",
      "Скидка 5% на аудио переводчик",
      "Без личного сопровождения",
      "Без бесплатной модели в подарок (предоставляется скидка 50% на создание 2D или 3D модели)"
    ]
  },
  archive_002_2d: {
    title: "🔵 АРХИВ 002 + 2D\nАрхив + 2D-аватар",
    price: "29 900 ₽",
    items: [
      "Всё из базового архива",
      "Скидка 50% на создание 2D-аватара (модель создаётся со скидкой 50%)",
      "Помощь с полной сборкой — от заказа до настройки в софте",
      "Скидка 5% на аудио переводчик",
      "Без личного сопровождения по запуску",
      "Без бесплатной модели в подарок (модель создаётся со скидкой 50%)"
    ]
  },
  archive_002_3d: {
    title: "🔵 АРХИВ 002 + 3D\nАрхив + 3D-аватар",
    price: "34 900 ₽",
    items: [
      "Всё из базового архива",
      "Скидка 50% на создание 3D/VRM-модели (модель создаётся со скидкой 50%)",
      "Помощь с полной сборкой — от заказа до настройки в софте",
      "Скидка 5% на аудио переводчик",
      "Без личного сопровождения по запуску",
      "Без бесплатной модели в подарок (модель создаётся со скидкой 50%)"
    ]
  },
  archive_002_premium: {
    title: "🟣 АРХИВ 002 PREMIUM\nПолное сопровождение",
    price: "49 900 ₽",
    items: [
      "Всё из базового архива",
      "Личное сопровождение — проходим все настройки вместе",
      "Помогаем скачать и настроить все программы",
      "Помощь с нишей и стратегией первых эфиров",
      "2D или 3D модель — В ПОДАРОК (входит в стоимость)",
      "Скидка 5% на аудио переводчик",
      "Полный запуск с готовым планом на первую неделю"
    ]
  },
  archive_003: {
    title: "🔞 АРХИВ 003\nСпециализированный доступ",
    price: "от 59 900 ₽",
    items: [
      "Полный архив: 19 разделов, паспорт профессии, план на первую неделю",
      "Полный путь: анонимность, оборудование, платформы, финансы, образ, доход, юридика",
      "Готовый промпт для создания паспорта персонажа",
      "Чек-листы к каждому разделу",
      "Поддержка 24/7",
      "Скидка 50% на создание 3D/VRM-модели",
      "Скидка 5% на аудио переводчик",
      "Мы помогаем полностью собрать модель — от заказа до настройки в софте"
    ]
  },
  archive_004: {
    title: "🔄 АРХИВ 004 — РЕСТАРТ\nПереход на виртуальный формат",
    price: "39 900 ₽",
    items: [
      "Полный архив: 24 страницы, 6 фаз перехода",
      "Финансовый план перехода (3 сценария + рекомендованный план на 4 месяца)",
      "Готовый промпт для генерации персонажа-аватара",
      "Инструкция по OBS + VTube Studio с шаблоном сцен и переходов",
      "Готовые шаблоны: объявление для аудитории, Tip Menu, чек-лист точек остановки",
      "Реалистичная статистика по росту зрителей и дохода",
      "Глоссарий терминов",
      "Поддержка 24/7",
      "Готовая VRM-модель",
      "Скидка 5% на аудио переводчик"
    ]
  },
  agency: {
    title: "🤝 Работать с нами\nАгентская программа",
    price: "15% от дохода",
    items: [
      "Даем вам полную программу",
      "Подбираем для вас вашу модель",
      "Прописываем характеристики персонажа",
      "Скидка 5% на аудио переводчик",
      "Берем с этого 15%"
    ]
  }
};

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

const PAYWALL_LINKS = {
  archive_002_basic: "https://paywall.ru/arrivalab/products/1491893657",
  archive_002_2d: "https://paywall.ru/arrivalab/products/1491893657",
  archive_002_3d: "https://paywall.ru/arrivalab/products/1491893657",
  archive_002_premium: "https://paywall.ru/arrivalab/products/1152545118",
  archive_004: "https://paywall.ru/arrivalab/products/1194159971",
  archive_003: "https://t.me/success_vstream",
  agency: "https://t.me/success_vstream"
};

bot.callbackQuery(/^(buy|info)_(.+)$/, async (ctx) => {
  const key = ctx.match[2];
  
  if (key === 'agency') {
    const text = `🤝 <b>Заявка в агентство Oriva Lab</b>\n\n` +
      `Мы даем вам полную программу, подбираем модель, прописываем характеристики персонажа и берем 15% от вашего дохода.\n\n` +
      `Напишите нашему менеджеру в Telegram для подачи заявки:\n👉 <b>@success_vstream</b>`;
    const keyboard = new InlineKeyboard()
      .url("💬 Подать заявку", "https://t.me/success_vstream").row()
      .text("🏠 Главное меню", "main_menu");
    await ctx.answerCallbackQuery();
    await ctx.reply(text, { parse_mode: "HTML", reply_markup: keyboard });
    return;
  }

  const p = PROGRAMS[key] || {
    title: key,
    price: "По запросу",
    items: ["Консультация и полная настройка"]
  };

  const formattedItems = (p.items || []).map(i => `• ${i}`).join("\n");
  const payUrl = PAYWALL_LINKS[key] || "https://paywall.ru/arrivalab/products/1491893657";
  const isDirectPay = payUrl.includes("paywall.ru");

  const text = `💳 <b>Оформление программы</b>\n\n` +
    `<b>${p.title}</b>\n` +
    `💰 Стоимость: <b>${p.price}</b>\n\n` +
    `<b>Что входит в программу:</b>\n${formattedItems}\n\n` +
    (isDirectPay 
      ? `Нажмите кнопку ниже для перехода к мгновенной оплате на Paywall:`
      : `Для согласования свяжитесь с нашим менеджером:`);

  const keyboard = new InlineKeyboard();
  if (isDirectPay) {
    keyboard.url("💳 Перейти к оплате на Paywall", payUrl).row();
  } else {
    keyboard.url("💬 Связаться для оплаты", payUrl).row();
  }
  keyboard.url("💬 Вопрос по оплате", "https://t.me/success_vstream").row();
  keyboard.text("✨ Подобрать образ заново", "quiz_start").row();
  keyboard.text("🏠 Главное меню", "main_menu");

  await ctx.answerCallbackQuery();
  await ctx.reply(text, { parse_mode: "HTML", reply_markup: keyboard });
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
