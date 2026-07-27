import { Bot, webhookCallback, InlineKeyboard } from "grammy";
import { createClient } from "@supabase/supabase-js";

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// HTML Escaping Helper for Telegram HTML mode
const escapeHtml = (text) => {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};

// Main menu helper
const sendMainMenu = async (ctx, text = "Выберите интересующий вас раздел:") => {

  const keyboard = new InlineKeyboard()
    .webApp("🌐 Открыть сайт (Mini App)", "https://arriva-lab.vercel.app/").row()
    .text("✨ Подобрать образ", "quiz_start").row()
    .text("💎 Тарифы и цены", "prices").row()
    .text("🛠 Услуги и Доп. опции", "services_info").row()
    .text("❓ FAQ / Вопросы", "faq_info").row()
    .text("👤 Личный кабинет", "my_id").row()
    .text("💬 Техподдержка", "support");

  await ctx.reply(text, { parse_mode: "HTML", reply_markup: keyboard });
};

// CALENDAR KEYBOARD HELPERS
const getDecadesKeyboard = () => {
  return new InlineKeyboard()
    .text("1980 - 1989", "cal_dec_1980").text("1990 - 1999", "cal_dec_1990").row()
    .text("2000 - 2009", "cal_dec_2000").text("2010 - 2018", "cal_dec_2010").row();
};

const getYearsKeyboard = (startYear) => {
  const kb = new InlineKeyboard();
  for (let i = 0; i < 10; i++) {
    const yr = startYear + i;
    if (yr > 2018) break;
    kb.text(String(yr), `cal_yr_${yr}`);
    if (i % 3 === 2) kb.row();
  }
  kb.row().text("⬅️ К десятилетиям", "cal_dec_back");
  return kb;
};

const getMonthsKeyboard = (year) => {
  const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
  const kb = new InlineKeyboard();
  months.forEach((m, idx) => {
    kb.text(m, `cal_mo_${year}_${idx + 1}`);
    if ((idx + 1) % 3 === 0) kb.row();
  });
  kb.row().text("⬅️ К выбору года", `cal_dec_${Math.floor(year / 10) * 10}`);
  return kb;
};

const getDaysKeyboard = (year, month) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const kb = new InlineKeyboard();
  for (let d = 1; d <= daysInMonth; d++) {
    const dayStr = d < 10 ? `0${d}` : `${d}`;
    const moStr = month < 10 ? `0${month}` : `${month}`;
    kb.text(String(d), `cal_day_${dayStr}.${moStr}.${year}`);
    if (d % 7 === 0) kb.row();
  }
  kb.row().text("⬅️ К выбору месяца", `cal_yr_${year}`);
  return kb;
};

// COMMANDS
bot.command("start", async (ctx) => {
  const userId = ctx.chat.id;
  const username = ctx.from.username || "";
  const firstName = ctx.from.first_name || "";

  try {
    await ctx.api.setChatMenuButton({
      chat_id: userId,
      menu_button: {
        type: "web_app",
        text: "Открыть сайт",
        web_app: { url: "https://arriva-lab.vercel.app/" }
      }
    });
    await ctx.api.setMyShortDescription("🚀 Arriva Lab — Лаборатория VTuber-моделей и аватаров под ключ.");
    await ctx.api.setMyDescription("👋 Добро пожаловать в Arriva Lab!\n\nПервая в СНГ система запуска VTuber-моделей для любых платформ с сохранением полной анонимности.\n\n✨ Подбор образа и персонажа\n💎 Тарифы и виртуальные модели\n🌐 Интерактивный Mini App\n🎧 Поддержка 24/7\n\nНажмите «СТАРТ», чтобы начать!");

    await ctx.api.setMyCommands([
      { command: "start", description: "Запустить бота и открыть главное меню" },
      { command: "menu", description: "Главное меню Arriva Lab" },
      { command: "help", description: "Служба заботы и поддержка" }
    ]);
  } catch (e) {
    console.error("Error setting menu button/info:", e);
  }

  // Fetch existing user profile
  let userRow = null;
  try {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("telegram_id", userId)
      .maybeSingle();
    userRow = data;
  } catch (err) {
    console.error("Error fetching user:", err);
  }

  // Upsert basic user details
  try {
    await supabase.from("users").upsert({
      telegram_id: userId,
      username: username,
      first_name: firstName
    }, { onConflict: "telegram_id" });
  } catch (err) {
    console.error("Error saving user:", err);
  }

  // Check if fully registered
  if (userRow && userRow.full_name && userRow.phone && userRow.birth_date) {
    const welcomeText = `👋 <b>Добро пожаловать в Arriva Lab, ${userRow.full_name}!</b>\n\n` +
      `Я — Arriva, цифровой консультант лаборатории цифровых моделей.\n\n` +
      `Я помогу подобрать образ под вашу цель или ознакомиться с нашими тарифами.`;
    await sendMainMenu(ctx, welcomeText);
    return;
  }

  // Start mandatory registration flow
  await supabase.from("user_states").upsert({
    telegram_id: userId,
    state: "reg_fio",
    data: {},
    updated_at: new Date()
  }, { onConflict: "telegram_id" });

  const regText = `👋 <b>Добро пожаловать в Arriva Lab!</b>\n\n` +
    `Для работы с платформой пройдите обязательную регистрацию.\n\n` +
    `📝 <b>Шаг 1 из 3: Введите ваше ФИО</b>\n` +
    `<i>(Например: Иванов Иван Иванович)</i>`;

  await ctx.reply(regText, { parse_mode: "HTML" });
});

bot.command("menu", async (ctx) => {
  await sendMainMenu(ctx, "Выберите интересующий вас раздел:");
});

bot.command("help", async (ctx) => {
  const supportText = `💬 <b>Служба заботы Arriva Lab</b>\n\n` +
    `Просто напишите ваш вопрос или обращение прямо в этот чат, и наша поддержка ответит вам в ближайшее время.`;
  const keyboard = new InlineKeyboard().text("🔙 Назад", "main_menu");
  await ctx.reply(supportText, { parse_mode: "HTML", reply_markup: keyboard });
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
    title: "🟢 АРХИВ 002\nБыстрый старт (Сами)",
    price: "14 900 ₽",
    items: [
      "Полный архив: 8 этапов + доп. раздел (28 страниц)",
      "Пошаговый запуск — оборудование, образ, OBS, первый эфир, платформы",
      "📋 Чек-листы — Вы ничего не забудете на запуске",
      "📚 Глоссарий — Не будете теряться в профессиональных терминах",
      "🎧 Поддержка 24/7 — Не останетесь один на один с проблемами",
      "Скидка 50% на готовую модель",
      "Скидка 5% на аудио переводчик",
      "Без личного сопровождения"
    ]
  },
  archive_002_2d: {
    title: "🔵 АРХИВ 002 + 2D\nАрхив + 2D-аватар",
    price: "29 900 ₽",
    items: [
      "Всё из базового архива",
      "Скидка 50% на создание 2D-аватара (модель создаётся со скидкой 50%)",
      "Помощь с полной сборкой — от заказа до настройки в софте",
      "📋 Чек-листы — Вы ничего не забудете на запуске",
      "📚 Глоссарий — Не будете теряться в профессиональных терминах",
      "🎧 Поддержка 24/7 — Не останетесь один на один с проблемами",
      "Скидка 5% на аудио переводчик",
      "Без личного сопровождения по запуску"
    ]
  },
  archive_002_3d: {
    title: "🔵 АРХИВ 002 + 3D\nАрхив + 3D-аватар",
    price: "34 900 ₽",
    items: [
      "Всё из базового архива",
      "Скидка 50% на создание 3D/VRM-модели (модель создаётся со скидкой 50%)",
      "Помощь с полной сборкой — от заказа до настройки в софте",
      "📋 Чек-листы — Вы ничего не забудете на запуске",
      "📚 Глоссарий — Не будете теряться в профессиональных терминах",
      "🎧 Поддержка 24/7 — Не останетесь один на один с проблемами",
      "Скидка 5% на аудио переводчик",
      "Без личного сопровождения по запуску"
    ]
  },
  archive_002_premium: {
    title: "🟣 АРХИВ 002 PREMIUM\nПолное сопровождение под ключ",
    price: "39 900 ₽",
    items: [
      "Всё из базового архива",
      "Личное сопровождение — проходим все настройки вместе",
      "Помогаем скачать и настроить все программы",
      "Помощь с нишей и стратегией первых эфиров",
      "2D или 3D модель — В ПОДАРОК (входит в стоимость)",
      "📋 Чек-листы — Вы ничего не забудете на запуске",
      "📚 Глоссарий — Не будете теряться в профессиональных терминах",
      "🎧 Поддержка 24/7 — Не останетесь один на один с проблемами",
      "Скидка 5% на аудио переводчик"
    ]
  },
  archive_003: {
    title: "🔞 АРХИВ 003\nВсё включено (С нами)",
    price: "35 900 ₽",
    items: [
      "Полный архив: 19 разделов, паспорт профессии, план на первую неделю",
      "Полный путь: анонимность, оборудование, платформы, финансы, образ, доход, юридика",
      "Готовый промпт для создания паспорта персонажа",
      "📋 Чек-листы — Вы ничего не забудете на запуске",
      "📚 Глоссарий — Не будете теряться в профессиональных терминах",
      "🎧 Поддержка 24/7 — Не останетесь один на один с проблемами",
      "Скидка 50% на создание 3D/VRM-модели",
      "Скидка 5% на аудио переводчик",
      "Мы помогаем полностью собрать модель — от заказа до настройки в софте"
    ]
  },
  archive_004: {
    title: "🔄 АРХИВ 004 — РЕСТАРТ\nПереход с веб-камеры (Рестарт)",
    price: "29 900 ₽",
    items: [
      "Полный архив: 24 страницы, 6 фаз перехода",
      "Финансовый план перехода (3 сценария + рекомендованный план на 4 месяца)",
      "Готовый промпт для генерации персонажа-аватара",
      "Инструкция по OBS + VTube Studio с шаблоном сцен и переходов",
      "Готовые шаблоны: объявление для аудитории, Tip Menu",
      "📋 Чек-листы — Вы ничего не забудете на запуске",
      "📚 Глоссарий — Не будете теряться в профессиональных терминах",
      "🎧 Поддержка 24/7 — Не останетесь один на один с проблемами",
      "Готовая VRM-модель",
      "Скидка 5% на аудио переводчик"
    ]
  },
  agency: {
    title: "🤝 Работать с нами\nАгентская программа",
    price: "15% комиссии нашему агентству",
    items: [
      "15% комиссии нашему агентству",
      "Полную программу даём вам",
      "Полный подбор персонажа под вас и фишки",
      "Помогаем с регистрацией на любых платформах",
      "📋 Чек-листы, Глоссарий, Поддержка 24/7",
      "Скидка 5% на аудио переводчик"
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
  let styleTitle = "Тебе подходит базовый запуск (быстрый старт)";

  if (exp === "cam") {
    rec = "archive_004";
    styleTitle = "Тебе подходит рестарт-аватар для перехода с веб-камеры";
  } else if (goal === "anonymous") {
    rec = "archive_003";
    styleTitle = "Тебе подходит анонимный образ для спец-платформ";
  } else if (hardware === "premium") {
    rec = "archive_002_premium";
    styleTitle = "Тебе подходит персональный VTuber-образ под ключ";
  } else if (budget === "3d") {
    rec = "archive_002_3d";
    styleTitle = "Тебе подходит 3D-аватар в стиле киберпанк";
  } else if (budget === "2d") {
    rec = "archive_002_2d";
    styleTitle = "Тебе подходит 2D-аватар в аниме-стиле";
  }

  const recNames = {
    archive_002_basic: "🟢 АРХИВ 002 — Быстрый старт (Сами) — 14 900 ₽",
    archive_002_2d: "🔵 АРХИВ 002 + 2D — 29 900 ₽",
    archive_002_3d: "🔵 АРХИВ 002 + 3D — 34 900 ₽",
    archive_002_premium: "🟣 АРХИВ 002 PREMIUM — Полное сопровождение — 39 900 ₽",
    archive_003: "🔞 АРХИВ 003 — Всё включено (С нами) — 35 900 ₽",
    archive_004: "🔄 АРХИВ 004 — РЕСТАРТ — 29 900 ₽"
  };

  const keyboard = new InlineKeyboard()
    .text("💳 Оформить рекомендованную программу", `buy_${rec}`).row()
    .text("✨ Подобрать образ заново", "quiz_start").row()
    .text("🏠 Главное меню", "main_menu");

  await ctx.answerCallbackQuery();
  await ctx.editMessageText(
    `🎯 <b>Персональный результат подбора:</b>\n\n` +
    `✨ <b>${styleTitle}</b>\n\n` +
    `Мы подобрали <b>один оптимальный тариф</b> под вашу задачу:\n` +
    `👉 <b>${recNames[rec] || rec}</b>\n\n` +
    `<i>Нажмите кнопку ниже для моментального перехода к оформлению:</i>`,
    {
      parse_mode: "HTML",
      reply_markup: keyboard
    }
  );
});

const PAYWALL_LINKS = {
  archive_002_basic: "https://paywall.ru/arrivalab/products/1491893657",
  archive_002_2d: "https://paywall.ru/arrivalab/products/1491893657",
  archive_002_3d: "https://paywall.ru/arrivalab/products/1491893657",
  archive_002_premium: "https://paywall.ru/arrivalab/products/1152545118",
  archive_003: "https://paywall.ru/arrivalab/products/1491893657",
  archive_004: "https://paywall.ru/arrivalab/products/1194159971",
  agency: ""
};

bot.callbackQuery(/^(buy|info)_(.+)$/, async (ctx) => {
  const key = ctx.match[2];
  
  if (key === 'agency') {
    const text = `🤝 <b>Заявка в агентство Arriva Lab</b>\n\n` +
      `15% комиссии нашему агентству. Полный подбор персонажа под вас, фишки, помогаем с регистрацией на любых платформах.\n\n` +
      `Напишите ваши пожелания или данные прямо сообщением в этот чат для подачи заявки.`;
    const keyboard = new InlineKeyboard()
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
    keyboard.text("💬 Задать вопрос поддержке", "support").row();
  }
  keyboard.text("💬 Вопрос по оплате", "support").row();
  keyboard.text("✨ Подобрать образ заново", "quiz_start").row();
  keyboard.text("🏠 Главное меню", "main_menu");

  await ctx.answerCallbackQuery();
  await ctx.reply(text, { parse_mode: "HTML", reply_markup: keyboard });
});

bot.callbackQuery("prices", async (ctx) => {
  const priceText = `💎 <b>Наши Тарифы и Экосистема Arriva Lab</b>\n\n` +
    `<blockquote>Первая в СНГ система запуска VTuber-моделей для международных платформ с сохранением полной анонимности.</blockquote>\n\n` +
    `🟢 <b>АРХИВ 002 — Быстрый старт (Сами)</b> — <code>14 900 ₽</code>\n` +
    `<i>Пошаговый запуск VTuber-аватара с нуля.</i>\n\n` +
    `🔵 <b>АРХИВ 002 + 2D</b> — <code>29 900 ₽</code>\n` +
    `<i>Базовый архив + 2D-аватар со скидкой 50%.</i>\n\n` +
    `🔵 <b>АРХИВ 002 + 3D</b> — <code>34 900 ₽</code>\n` +
    `<i>Базовый архив + 3D/VRM модель со скидкой 50%.</i>\n\n` +
    `🟣 <b>АРХИВ 002 PREMIUM — Всё включено</b> — <code>39 900 ₽</code>\n` +
    `<i>Личное сопровождение под ключ + 2D/3D модель в подарок.</i>\n\n` +
    `🔞 <b>АРХИВ 003 — Всё включено (С нами)</b> — <code>35 900 ₽</code>\n` +
    `<i>Запуск на 18+ и анонимных площадках под ключ.</i>\n\n` +
    `🔄 <b>АРХИВ 004 — РЕСТАРТ</b> — <code>29 900 ₽</code>\n` +
    `<i>Переход с веб-камеры на VTuber формат без потери аудитории.</i>\n\n` +
    `🤝 <b>Работать с нами</b> — <code>15% комиссии</code>\n` +
    `<i>Полный подбор персонажа под вас, фишки и поддержка.</i>\n\n` +
    `💡 <i>Каждая программа содержит: 📋 Чек-листы, 📚 Глоссарий, 🎧 Поддержку 24/7.</i>\n\n` +
    `👇 <b>Нажмите на нужную программу ниже для просмотра деталей и оплаты:</b>`;

  const keyboard = new InlineKeyboard()
    .text("🟢 АРХИВ 002 — Быстрый старт (14 900 ₽)", "buy_archive_002_basic").row()
    .text("🔵 АРХИВ 002 + 2D (29 900 ₽)", "buy_archive_002_2d").row()
    .text("🔵 АРХИВ 002 + 3D (34 900 ₽)", "buy_archive_002_3d").row()
    .text("🟣 АРХИВ 002 PREMIUM (39 900 ₽)", "buy_archive_002_premium").row()
    .text("🔞 АРХИВ 003 — Всё включено (35 900 ₽)", "buy_archive_003").row()
    .text("🔄 АРХИВ 004 — РЕСТАРТ (29 900 ₽)", "buy_archive_004").row()
    .text("🤝 Работать с нами (15% комиссии)", "buy_agency").row()
    .text("✨ Подобрать под себя (Квиз)", "quiz_start").row()
    .text("🏠 Главное меню", "main_menu");

  await ctx.answerCallbackQuery();
  await ctx.editMessageText(priceText, { parse_mode: "HTML", reply_markup: keyboard });
});

bot.callbackQuery("services_info", async (ctx) => {
  const servicesText = `🛠 <b>Дополнительные Услуги & Опции Arriva Lab</b>\n\n` +
    `🎙 <b>Аудио переводчик (Голосовой дубляж)</b>\n` +
    `• Перевод стрима в реальном времени на 10+ языков\n` +
    `• Сохранение эмоций и интонаций вашего голоса\n` +
    `• <i>Скидка 5% при покупке любой программы</i>\n\n` +
    `🎨 <b>Разработка 2D Live2D Модели</b>\n` +
    `• Индивидуальный дизайн аниме-персонажа\n` +
    `• Настройка физики волос, одежды и мимики\n` +
    `• <i>Скидка 50% при заказе архива</i>\n\n` +
    `🧊 <b>Создание 3D VRM Модели</b>\n` +
    `• Поддержка 3D-трекинга (VSeeFace, Unity, Unreal Engine)\n` +
    `• Высокая детализация текстур и аксессуаров\n` +
    `• <i>Скидка 50% при заказе архива</i>\n\n` +
    `👑 <b>Продюсирование & Агентство</b>\n` +
    `• Работа за 15% комиссии от вашего дохода\n` +
    `• Помощь с регистрацией и выводом средств`;

  const keyboard = new InlineKeyboard()
    .text("💳 Выбрать тариф", "prices").row()
    .text("🔙 Главное меню", "main_menu");

  await ctx.answerCallbackQuery();
  await ctx.editMessageText(servicesText, { parse_mode: "HTML", reply_markup: keyboard });
});

bot.callbackQuery("faq_info", async (ctx) => {
  const faqText = `❓ <b>Часто задаваемые вопросы (FAQ)</b>\n\n` +
    `<b>1. Нужна ли мощная видеокарта?</b>\n` +
    `<blockquote>Для 2D-VTuber достаточно базовой или встроенной видеокарты. Для 3D рекомендована видеокарта от GTX 1660 и выше.</blockquote>\n\n` +
    `<b>2. Можно ли оставаться 100% анонимным?</b>\n` +
    `<blockquote>Да! Виртуальный аватар полностью скрывает ваше реальное лицо, а софт позволяет изменять голос.</blockquote>\n\n` +
    `<b>3. Сколько времени занимает запуск?</b>\n` +
    `<blockquote>От 3 до 14 дней в зависимости от программы и сложности персонажа.</blockquote>\n\n` +
    `<b>4. Как выводить доход с международных платформ?</b>\n` +
    `<blockquote>Мы предоставляем подробные инструкции и помогаем настроить платежные решения для СНГ.</blockquote>`;

  const keyboard = new InlineKeyboard()
    .text("✨ Подобрать образ", "quiz_start").row()
    .text("💬 Задать вопрос поддержке", "support").row()
    .text("🔙 Главное меню", "main_menu");

  await ctx.answerCallbackQuery();
  await ctx.editMessageText(faqText, { parse_mode: "HTML", reply_markup: keyboard });
});

bot.callbackQuery("my_id", async (ctx) => {
  const idText = `🔑 Ваш цифровой Telegram ID: <code>${ctx.from.id}</code>\n\n` +
    `Используйте его на сайте в личной кабинете для входа.`;

  const keyboard = new InlineKeyboard().text("🔙 Назад", "main_menu");
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(idText, { parse_mode: "HTML", reply_markup: keyboard });
});

bot.callbackQuery("support", async (ctx) => {
  const userId = ctx.from.id;

  // Query user tickets from Supabase
  let tickets = [];
  try {
    const { data } = await supabase
      .from("agency_applications")
      .select("*")
      .eq("telegram_id", userId)
      .order("id", { ascending: false })
      .limit(5);
    tickets = data || [];
  } catch (err) {
    console.error("Error fetching support tickets:", err);
  }

  let supportText = `💬 <b>Служба заботы Arriva Lab — Ваши обращения</b>\n\n`;

  if (!tickets || tickets.length === 0) {
    supportText += `У вас пока нет активных обращений в техподдержку.\n\n` +
      `💡 <b>Как написать в техподдержку:</b>\n` +
      `Просто отправьте ваше сообщение или вопрос <b>прямо в этот чат</b> — бот автоматически зафиксирует новую заявку и уведомит специалистов!`;
  } else {
    supportText += `📋 <b>Ваши обращения и их статусы:</b>\n\n`;
    tickets.forEach((t) => {
      const statusBadge = t.status === "approved"
        ? "✅ Принято / Отвечено"
        : t.status === "rejected"
        ? "❌ Закрыто"
        : "🟡 В обработке";
      const dateStr = t.created_at ? t.created_at.substring(0, 10) : "Недавно";
      const textSnippet = t.about ? (t.about.length > 60 ? t.about.substring(0, 60) + "..." : t.about) : "Заявка в техподдержку";

      supportText += `📌 <b>Заявка #${t.id}</b> (${dateStr})\n` +
        `Статус: <b>${statusBadge}</b>\n` +
        `<blockquote>${textSnippet}</blockquote>\n\n`;
    });

    supportText += `💡 <b>Для создания нового обращения:</b>\n` +
      `Просто напишите новый вопрос или сообщение прямо в этот чат!`;
  }

  const keyboard = new InlineKeyboard()
    .text("✨ Подобрать образ", "quiz_start").row()
    .text("🏠 Главное меню", "main_menu");

  await ctx.answerCallbackQuery();
  await ctx.editMessageText(supportText, { parse_mode: "HTML", reply_markup: keyboard });
});

bot.callbackQuery("main_menu", async (ctx) => {
  const welcomeText = `Выберите интересующий вас раздел:`;
  
  const keyboard = new InlineKeyboard()
    .text("✨ Подобрать образ", "quiz_start").row()
    .text("💎 Тарифы и цены", "prices").row()
    .text("🛠 Услуги и Доп. опции", "services_info").row()
    .text("❓ FAQ / Вопросы", "faq_info").row()
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

// CONTACT HANDLER (Step 2: Native Phone sharing)
bot.on("message:contact", async (ctx) => {
  const userId = ctx.from.id;
  const phone = ctx.message.contact.phone_number;

  // Preserve state data
  const { data: stData } = await supabase.from("user_states").select("*").eq("telegram_id", userId).maybeSingle();
  const prevData = stData ? stData.data : {};

  // Save phone number
  await supabase.from("users").update({ phone }).eq("telegram_id", userId);

  // Update state to birthdate
  await supabase.from("user_states").upsert({
    telegram_id: userId,
    state: "reg_birthdate",
    data: { ...prevData, phone },
    updated_at: new Date()
  }, { onConflict: "telegram_id" });

  const birthdateMsg = `📱 <b>Номер телефона получен:</b> <code>${phone}</code>\n\n` +
    `📅 <b>Шаг 3 из 3: Дата рождения</b>\n\n` +
    `Выберите ваш <b>десятилетие рождения</b> из интерактивного календаря ниже:`;

  await ctx.reply(birthdateMsg, {
    parse_mode: "HTML",
    reply_markup: { remove_keyboard: true }
  });

  await ctx.reply("👇 <b>Интерактивный календарь:</b>", {
    parse_mode: "HTML",
    reply_markup: getDecadesKeyboard()
  });
});

// CALENDAR CALLBACKS
bot.callbackQuery(/^cal_dec_(.+)$/, async (ctx) => {
  const arg = ctx.match[1];
  await ctx.answerCallbackQuery();
  if (arg === "back") {
    await ctx.editMessageText("📅 <b>Шаг 3 из 3: Дата рождения</b>\n\nВыберите ваш <b>десятилетие рождения</b>:", {
      parse_mode: "HTML",
      reply_markup: getDecadesKeyboard()
    });
  } else {
    const startYr = parseInt(arg, 10);
    await ctx.editMessageText(`📅 <b>Шаг 3 из 3: Дата рождения</b>\n\nВыберите ваш <b>год рождения</b> (${startYr}-${startYr + 9}):`, {
      parse_mode: "HTML",
      reply_markup: getYearsKeyboard(startYr)
    });
  }
});

bot.callbackQuery(/^cal_yr_(\d+)$/, async (ctx) => {
  const year = parseInt(ctx.match[1], 10);
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(`📅 <b>Шаг 3 из 3: Дата рождения</b>\n\nГод: <b>${year}</b>\nВыберите ваш <b>месяц рождения</b>:`, {
    parse_mode: "HTML",
    reply_markup: getMonthsKeyboard(year)
  });
});

bot.callbackQuery(/^cal_mo_(\d+)_(\d+)$/, async (ctx) => {
  const year = parseInt(ctx.match[1], 10);
  const month = parseInt(ctx.match[2], 10);
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(`📅 <b>Шаг 3 из 3: Дата рождения</b>\n\nГод: <b>${year}</b>, Месяц: <b>${month}</b>\nВыберите ваш <b>день рождения</b>:`, {
    parse_mode: "HTML",
    reply_markup: getDaysKeyboard(year, month)
  });
});

bot.callbackQuery(/^cal_day_(.+)$/, async (ctx) => {
  const rawBirthDate = ctx.match[1]; // "DD.MM.YYYY"
  const userId = ctx.from.id;
  const username = ctx.from.username || "";

  // Convert DD.MM.YYYY to ISO YYYY-MM-DD for PostgreSQL date column
  let isoBirthDate = null;
  if (rawBirthDate && rawBirthDate.includes(".")) {
    const parts = rawBirthDate.split(".");
    if (parts.length === 3) {
      isoBirthDate = `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
    }
  }

  await ctx.answerCallbackQuery({ text: `Дата рождения выбрана: ${rawBirthDate}` });

  // Get state data to guarantee fio and phone aren't lost
  const { data: stData } = await supabase.from("user_states").select("*").eq("telegram_id", userId).maybeSingle();
  const savedFio = stData?.data?.fio;
  const savedPhone = stData?.data?.phone;

  const updatePayload = { birth_date: isoBirthDate || rawBirthDate };
  if (savedFio) updatePayload.full_name = savedFio;
  if (savedPhone) updatePayload.phone = savedPhone;

  const { error: updateErr } = await supabase.from("users").update(updatePayload).eq("telegram_id", userId);
  if (updateErr) {
    console.error("Error saving birth_date to users table:", updateErr);
  }

  await supabase.from("user_states").delete().eq("telegram_id", userId);

  // Fetch updated user profile
  const { data: user } = await supabase.from("users").select("*").eq("telegram_id", userId).maybeSingle();

  const successText = `🎉 <b>Регистрация успешно завершена!</b>\n\n` +
    `👤 <b>ФИО:</b> ${user?.full_name || savedFio || 'Не указано'}\n` +
    `📱 <b>Телефон:</b> ${user?.phone || savedPhone || 'Не указан'}\n` +
    `📅 <b>Дата рождения:</b> ${birthDate}\n` +
    `👤 <b>Telegram:</b> @${username || 'нет'}\n\n` +
    `Теперь вам доступна лаборатория VTubing Arriva Lab!`;

  await sendMainMenu(ctx, successText);
});

// TEXT INPUTS (for Quiz steps & Support tickets)
bot.on("message:text", async (ctx) => {
  const userId = ctx.from.id;
  const username = ctx.from.username || "";
  const firstName = ctx.from.first_name || "";

  // 1. Ensure user is registered in users table without overwriting full_name/phone
  try {
    const { data: existingUser } = await supabase.from("users").select("id").eq("telegram_id", userId).maybeSingle();
    if (!existingUser) {
      await supabase.from("users").insert({
        telegram_id: userId,
        username: username,
        first_name: firstName
      });
    } else {
      await supabase.from("users").update({
        username: username,
        first_name: firstName
      }).eq("telegram_id", userId);
    }
  } catch (err) {
    console.error("Error updating user:", err);
  }

  // 2. Fetch user state safely using maybeSingle() (does not throw PGRST116 when 0 rows)
  let stateData = null;
  try {
    const { data } = await supabase
      .from("user_states")
      .select("*")
      .eq("telegram_id", userId)
      .maybeSingle();
    stateData = data;
  } catch (err) {
    console.error("Error fetching stateData:", err);
  }

  if (stateData) {
    const { state, data } = stateData;

    if (state === "reg_fio") {
      const fio = ctx.message.text.trim();
      await supabase.from("users").update({ full_name: fio }).eq("telegram_id", userId);
      await supabase.from("user_states").update({
        state: "reg_phone",
        data: { ...(data || {}), fio },
        updated_at: new Date()
      }).eq("telegram_id", userId);

      const contactReplyKeyboard = {
        keyboard: [[{ text: "📱 Поделиться номером телефона", request_contact: true }]],
        resize_keyboard: true,
        one_time_keyboard: true
      };

      const phoneText = `📝 <b>ФИО сохранено:</b> ${fio}\n\n` +
        `📱 <b>Шаг 2 из 3: Номер телефона</b>\n\n` +
        `Нажмите кнопку ниже <b>«📱 Поделиться номером телефона»</b>, чтобы передать свой контакт в один клик:`;

      await ctx.reply(phoneText, { parse_mode: "HTML", reply_markup: contactReplyKeyboard });
      return;
    } else if (state === "reg_phone") {
      const phoneText = ctx.message.text.trim();
      await supabase.from("users").update({ phone: phoneText }).eq("telegram_id", userId);
      await supabase.from("user_states").update({
        state: "reg_birthdate",
        data: { ...(data || {}), phone: phoneText },
        updated_at: new Date()
      }).eq("telegram_id", userId);

      await ctx.reply("📱 <b>Номер телефона сохранен!</b>", { reply_markup: { remove_keyboard: true } });

      const birthdateMsg = `📅 <b>Шаг 3 из 3: Дата рождения</b>\n\n` +
        `Выберите ваш <b>десятилетие рождения</b> из календаря ниже:`;

      await ctx.reply(birthdateMsg, {
        parse_mode: "HTML",
        reply_markup: getDecadesKeyboard()
      });
      return;
    }

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
    // Free text input -> create support ticket & notify admin
    const textMsg = ctx.message?.text || "";
    try {
      const { data: ticket } = await supabase
        .from("agency_applications")
        .insert({
          telegram_id: userId,
          full_name: ctx.from.first_name || "Пользователь",
          about: `Обращение в техподдержку: ${textMsg}`,
          status: "pending"
        })
        .select()
        .single();

      const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID || "-5546587040";
      if (adminChatId) {
        const adminText = `🆘 <b>НОВАЯ ЗАЯВКА В ТЕХПОДДЕРЖКУ!</b>\n\n` +
          `👤 <b>Пользователь:</b> ${ctx.from.first_name || "Пользователь"} (@${ctx.from.username || "нет_юзернейма"})\n` +
          `🆔 <b>Telegram ID:</b> <code>${userId}</code>\n` +
          `💬 <b>Сообщение:</b> <i>«${textMsg}»</i>`;

        const keyboard = new InlineKeyboard()
          .url("💬 Написать пользователю", `tg://user?id=${userId}`).row()
          .text("✅ Принять", `approve_${ticket?.id || userId}`)
          .text("❌ Отклонить", `reject_${ticket?.id || userId}`);

        await bot.api.sendMessage(adminChatId, adminText, {
          parse_mode: "HTML",
          reply_markup: keyboard
        }).catch(err => console.error("Admin notify error:", err));
      }
    } catch (err) {
      console.error("Support ticket error:", err);
    }

    const replyMsg = `📩 <b>Ваше обращение принято в техподдержку!</b>\n\n` +
      `Мы получили ваше сообщение:\n` +
      `<blockquote>«${textMsg}»</blockquote>\n\n` +
      `Наш специалист поддержки свяжется с вами в ближайшее время.`;

    await sendMainMenu(ctx, replyMsg);
  }
});

// EXPORT WEBHOOK CALLBACK FOR VERCEL
export default webhookCallback(bot, "next-js");
