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
    .text("📋 Пройти Квиз на образ", "quiz_start").row()
    .text("💰 Цены и услуги", "prices").row()
    .text("🔑 Показать мой Telegram ID", "my_id").row()
    .text("📞 Связаться с нами", "support");

  await ctx.reply(text, { reply_markup: keyboard });
};

// COMMANDS
bot.command("start", async (ctx) => {
  const userId = ctx.chat.id;
  const username = ctx.from.username || "";
  const firstName = ctx.from.first_name || "";

  // Upsert user into database to map username -> chat_id
  try {
    await supabase.from("users").upsert({
      telegram_id: userId,
      username: username,
      first_name: firstName
    }, { onConflict: "telegram_id" });
  } catch (err) {
    console.error("Error saving user:", err);
  }

  const welcomeText = `👋 Привет, ${firstName}! Добро пожаловать в ARRIVA lab.\n\n` +
    `Мы создаем виртуалных персонажей (VTuber) под ключ: от концепта до настройки отслеживания лица для стримов.\n\n` +
    `Я твой интерактивный помощник. Помогу подобрать образ, узнать цены или войти в личный кабинет на сайте.`;

  await sendMainMenu(ctx, welcomeText);
});

// CALLBACKS
bot.callbackQuery("quiz_start", async (ctx) => {
  const userId = ctx.from.id;

  // Initialize quiz state
  await supabase.from("user_states").upsert({
    telegram_id: userId,
    state: "step_avatar",
    data: {},
    updated_at: new Date()
  }, { onConflict: "telegram_id" });

  const keyboard = new InlineKeyboard()
    .text("🖼️ PNG-Аватар (V-Tube старт)", "png_avatar").row()
    .text("👾 2D-Аватар (Live2D классика)", "2d_avatar").row()
    .text("🌐 3D-Аватар (Полный захват)", "3d_avatar");

  await ctx.answerCallbackQuery();
  await ctx.editMessageText("🔮 Шаг 1: Какой тип аватара вы хотите запустить?", {
    reply_markup: keyboard
  });
});

bot.callbackQuery(/^(png|2d|3d)_avatar$/, async (ctx) => {
  const userId = ctx.from.id;
  const avatarType = ctx.match[1] === "png" ? "PNG-Аватар" : ctx.match[1] === "2d" ? "2D-Аватар" : "3D-Аватар";

  await supabase.from("user_states").update({
    state: "step_usage",
    data: { avatarType },
    updated_at: new Date()
  }).eq("telegram_id", userId);

  const keyboard = new InlineKeyboard()
    .text("🎮 Стриминг игр / Twitch", "usage_streaming").row()
    .text("🎥 Разговорный блог / YouTube", "usage_vlogs").row()
    .text("✨ Просто для себя", "usage_personal");

  await ctx.answerCallbackQuery();
  await ctx.editMessageText("🎯 Шаг 2: Для чего планируете использовать аватар?", {
    reply_markup: keyboard
  });
});

bot.callbackQuery(/^usage_(.+)$/, async (ctx) => {
  const userId = ctx.from.id;
  const usageMap = {
    streaming: "Стриминг игр",
    vlogs: "Видеоблоги",
    personal: "Для себя"
  };
  const usage = usageMap[ctx.match[1]] || "Стримы";

  const { data: stateData } = await supabase
    .from("user_states")
    .select("*")
    .eq("telegram_id", userId)
    .single();

  if (stateData) {
    const nextData = { ...stateData.data, usage };
    await supabase.from("user_states").update({
      state: "step_name",
      data: nextData,
      updated_at: new Date()
    }).eq("telegram_id", userId);

    await ctx.answerCallbackQuery();
    await ctx.editMessageText("📝 Шаг 3: Напишите ваше имя или игровой никнейм для связи (отправьте текстовым сообщением):");
  }
});

bot.callbackQuery("prices", async (ctx) => {
  const priceText = `💰 *Наши тарифы и услуги:*\n\n` +
    `🖼️ *PNG-Аватар* — от 10 000 ₽\n` +
    `Быстрый старт. Статичные изображения с анимацией рта при разговоре.\n\n` +
    `👾 *2D-Аватар (Live2D)* — от 45 000 ₽\n` +
    `Классический витубер-формат. Нарезка слоев и плавная настройка мимики.\n\n` +
    `🌐 *3D-Аватар (VRoid/FBX)* — от 70 000 ₽\n` +
    `Полная трехмерная свобода движения головы, рук и тела.\n\n` +
    `Все тарифы включают базовый аудит вашего оборудования и помощь в настройке OBS.`;

  const keyboard = new InlineKeyboard().text("🔙 Назад", "main_menu");
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(priceText, { parse_mode: "Markdown", reply_markup: keyboard });
});

bot.callbackQuery("my_id", async (ctx) => {
  const idText = `🔑 Ваш цифровой Telegram ID: \`${ctx.from.id}\`\n\n` +
    `Используйте его на сайте в поле «Личный Кабинет», чтобы зайти и отслеживать прогресс выполнения вашей модели!`;

  const keyboard = new InlineKeyboard().text("🔙 Назад", "main_menu");
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(idText, { parse_mode: "Markdown", reply_markup: keyboard });
});

bot.callbackQuery("support", async (ctx) => {
  const supportText = `📞 *Связь с командой ARRIVA lab:*\n\n` +
    `• Наш менеджер: @arriva_lab\n` +
    `• Почта: contact@arriva.lab\n\n` +
    `Вы можете написать менеджеру напрямую для обсуждения индивидуальных проектов.`;

  const keyboard = new InlineKeyboard().text("🔙 Назад", "main_menu");
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(supportText, { parse_mode: "Markdown", reply_markup: keyboard });
});

bot.callbackQuery("main_menu", async (ctx) => {
  const welcomeText = `Я твой интерактивный помощник. Помогу подобрать образ, узнать цены или войти в личный кабинет на сайте.`;
  
  const keyboard = new InlineKeyboard()
    .text("📋 Пройти Квиз на образ", "quiz_start").row()
    .text("💰 Цены и услуги", "prices").row()
    .text("🔑 Показать мой Telegram ID", "my_id").row()
    .text("📞 Связаться с нами", "support");

  await ctx.answerCallbackQuery();
  await ctx.editMessageText(welcomeText, { reply_markup: keyboard });
});

// ADMIN APPROVAL ACTIONS
bot.callbackQuery(/^(approve|reject)_(.+)$/, async (ctx) => {
  const action = ctx.match[1];
  const appId = ctx.match[2];
  const status = action === "approve" ? "approved" : "rejected";
  const statusText = action === "approve" ? "✅ Принята" : "❌ Отклонена";

  try {
    const { data: app, error } = await supabase
      .from("agency_applications")
      .update({ status })
      .eq("id", appId)
      .select()
      .single();

    if (error) throw error;

    await ctx.answerCallbackQuery({ text: `Статус заявки #${appId} изменен.` });

    const originalText = ctx.callbackQuery.message.text;
    const updatedText = originalText + `\n\n📌 *Статус:* ${statusText} (Модератор: @${ctx.from.username || ctx.from.first_name})`;

    await ctx.editMessageText(updatedText, { parse_mode: "Markdown" });
  } catch (err) {
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
