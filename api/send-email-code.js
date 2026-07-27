import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Разрешен только метод POST" });
  }

  const { email, code } = req.body || {};

  if (!email || !code) {
    return res.status(400).json({ error: "Отсутствуют параметры почты или кода подтверждения" });
  }

  // Basic email syntax validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(email).trim())) {
    return res.status(400).json({ error: "Некорректный формат Email адреса" });
  }

  // Validate 6-digit code format
  if (!/^\d{6}$/.test(String(code).trim())) {
    return res.status(400).json({ error: "Некорректный формат кода подтверждения (должно быть 6 цифр)" });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT || 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || `"ARRIVA lab" <noreply@arriva.lab>`;

  // Fallback if SMTP is not configured: print to console for development testing
  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log(`[SMTP Debug] Email verification code for ${email} is ${code}`);
    const isLocal = process.env.NODE_ENV === "development" || 
                    (req.headers.host && (req.headers.host.includes("localhost") || req.headers.host.includes("127.0.0.1")));
    
    return res.status(200).json({ 
      success: true, 
      debug: isLocal, 
      code: isLocal ? code : undefined,
      message: isLocal 
        ? "SMTP не настроен в окружении. Код выведен для локального тестирования." 
        : "SMTP не настроен в окружении." 
    });
  }

  // Create nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(smtpPort, 10),
    secure: parseInt(smtpPort, 10) === 465, // true for 465, false for others
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  const mailOptions = {
    from: smtpFrom,
    to: String(email).trim(),
    subject: "🔑 Код подтверждения входа — ARRIVA lab",
    text: `Здравствуйте!\n\nВаш временный код для входа в Личный Кабинет ARRIVA lab: ${code}\n\nЕсли вы не запрашивали этот код, просто проигнорируйте это письмо.`,
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px;">
        <h2 style="color: #0f172a; margin-bottom: 8px; font-weight: 800;">ARRIVA lab.</h2>
        <p style="color: #475569; font-size: 14px;">Здравствуйте! Вы запросили код для входа в Личный Кабинет.</p>
        <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 16px; text-align: center; margin: 24px 0;">
          <span style="font-size: 24px; font-weight: 800; letter-spacing: 4px; color: #0f172a;">${code}</span>
        </div>
        <p style="color: #64748b; font-size: 12px;">Никому не передавайте этот код. Он действителен в течение 10 минут.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error sending email via SMTP:", err);
    return res.status(500).json({ error: "Не удалось отправить письмо: " + err.message });
  }
}
