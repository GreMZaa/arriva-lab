export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Метод не поддерживается. Разрешен только POST." });
  }

  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: "Необходимы логин и пароль администратора" });
  }

  // Server-side environment variables (fallback to default admin if not provided)
  const adminUser = process.env.ADMIN_USERNAME || process.env.VITE_ADMIN_USERNAME || "ssharonovv";
  const adminPass = process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASSWORD || "ArrivaAdmin26!#";

  const isUsernameValid = username.trim() === adminUser.trim();
  const isPasswordValid = password.trim() === adminPass.trim();

  if (isUsernameValid && isPasswordValid) {
    // Generate secure session token / authorization flag
    const sessionToken = Buffer.from(`${username}:${Date.now()}:${Math.random()}`).toString("base64");
    return res.status(200).json({
      success: true,
      token: sessionToken,
      message: "Успешная авторизация администратора"
    });
  } else {
    return res.status(401).json({ error: "Неверный логин или пароль администратора" });
  }
}
