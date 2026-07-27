-- ========================================================
-- ARRIVA LAB — Full Consolidated Supabase Database Schema
-- ========================================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    telegram_id   BIGINT UNIQUE,
    email         TEXT UNIQUE,
    username      TEXT,
    first_name    TEXT NOT NULL,
    phone         TEXT,
    birth_date    DATE,
    registered_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_users_telegram_id ON users(telegram_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- 2. Purchases Table
CREATE TABLE IF NOT EXISTS purchases (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id       BIGINT REFERENCES users(id) ON DELETE SET NULL,
    telegram_id   BIGINT,
    email         TEXT,
    program_name  TEXT NOT NULL,
    price         NUMERIC(10, 2) NOT NULL,
    paid_at       TIMESTAMPTZ DEFAULT now(),
    status        TEXT NOT NULL DEFAULT 'pending'
);

CREATE INDEX IF NOT EXISTS idx_purchases_telegram_id ON purchases(telegram_id);
CREATE INDEX IF NOT EXISTS idx_purchases_email ON purchases(email);

-- 3. Agency Applications Table
CREATE TABLE IF NOT EXISTS agency_applications (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id       BIGINT REFERENCES users(id) ON DELETE SET NULL,
    telegram_id   BIGINT,
    email         TEXT,
    full_name     TEXT NOT NULL,
    birth_date    DATE,
    about         TEXT,
    submitted_at  TIMESTAMPTZ DEFAULT now(),
    status        TEXT NOT NULL DEFAULT 'pending'
);

CREATE INDEX IF NOT EXISTS idx_applications_telegram_id ON agency_applications(telegram_id);
CREATE INDEX IF NOT EXISTS idx_applications_email ON agency_applications(email);

-- 4. Site Funnel Events Table
CREATE TABLE IF NOT EXISTS site_events (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    session_id  TEXT NOT NULL,
    event_type  TEXT NOT NULL,
    details     JSONB DEFAULT '{}'::jsonb,
    created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_site_events_session_id ON site_events(session_id);
CREATE INDEX IF NOT EXISTS idx_site_events_event_type ON site_events(event_type);

-- 5. Temporary Login Codes Table
CREATE TABLE IF NOT EXISTS login_codes (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    telegram_id BIGINT UNIQUE,
    email       TEXT UNIQUE,
    code        TEXT NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT now()
);

-- 6. User FSM States Table (Bot & Web State Machine)
CREATE TABLE IF NOT EXISTS user_states (
    telegram_id BIGINT PRIMARY KEY,
    state       TEXT NOT NULL,
    data        JSONB DEFAULT '{}'::jsonb,
    updated_at  TIMESTAMPTZ DEFAULT now()
);

-- 7. Support Tickets Table
CREATE TABLE IF NOT EXISTS support_tickets (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id     BIGINT REFERENCES users(id) ON DELETE SET NULL,
    telegram_id BIGINT NOT NULL,
    message     TEXT NOT NULL,
    status      TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'answered', 'closed'
    answer      TEXT,
    created_at  TIMESTAMPTZ DEFAULT now(),
    updated_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_support_tickets_telegram_id ON support_tickets(telegram_id);

-- 8. Products Table
CREATE TABLE IF NOT EXISTS products (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name          TEXT NOT NULL,
    price         NUMERIC(10, 2) NOT NULL,
    type          TEXT NOT NULL, -- 'basic', 'restart', 'premium', '18+', 'agency'
    subtitle      TEXT,
    description   TEXT,
    features      JSONB DEFAULT '[]'::jsonb,
    created_at    TIMESTAMPTZ DEFAULT now()
);

-- 9. Quiz Questions Table
CREATE TABLE IF NOT EXISTS quiz_questions (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    step_index    INT NOT NULL,
    question_text TEXT NOT NULL,
    options       JSONB DEFAULT '[]'::jsonb,
    created_at    TIMESTAMPTZ DEFAULT now()
);

-- Initial Default Products
INSERT INTO products (name, price, type, subtitle, description, features)
VALUES 
('АРХИВ 002', 14900.00, 'basic', 'Быстрый старт (Сами)', 'Доступ к базе знаний и баховым материалам запуска', 
 '["Обучающие видео и гайды", "Чек-лист запуска", "Глоссарий терминов", "Доступ к чату сообщества"]'::jsonb),
('АРХИВ 004 — РЕСТАРТ', 29900.00, 'restart', 'Переход с веб-камеры (Рестарт)', 'Специальная программа адаптации существующих стримеров', 
 '["Анализ текущего канала", "Индивидуальный план перехода", "Настройка OBS & софта", "Контент-план рестарта"]'::jsonb),
('АРХИВ 002 PREMIUM', 39900.00, 'premium', 'Полное сопровождение под ключ', 'Индивидуальный запуск с личным куратором', 
 '["Создание 2D/3D аватара", "Индивидуальная настройка софта", "3 часа техподдержки на эфирах", "Полное сопровождение на первом стриме"]'::jsonb),
('АРХИВ 003', 35900.00, '18+', 'Всё включено (С нами)', 'Запуск на анонимных и специализированных платформах', 
 '["Проработка анонимности", "Настройка изменения голоса", "Анонимный вывод средств", "Полный технический сетап"]'::jsonb),
('Работать с нами', 0.00, 'agency', 'Агентская программа сопровождения', 'Агентская программа сопровождения (15% от дохода)', 
 '["Даем вам полную программу", "Подбираем для вас вашу модель", "Прописываем характеристики персонажа", "📋 Чек-листы — Вы ничего не забудете на запуске", "📚 Глоссарий — Не будете теряться в профессиональных терминах", "🎧 Поддержка 24/7 — Не останетесь один на один с проблемами", "Скидка 5% на аудио переводчик", "Берем с этого 15%"]'::jsonb)
ON CONFLICT DO NOTHING;




-- Initial Default Quiz Questions
INSERT INTO quiz_questions (step_index, question_text, options)
VALUES
(0, '1. Какова ваша главная цель при запуске?', 
 '[
   {"value": "new", "label": "Запуск с нуля", "sublabel": "Хочу начать стримить под виртуальным образом"},
   {"value": "cam", "label": "Переход с вебкамеры", "sublabel": "Уже стримлю с лицом, хочу перейти на VTuber-формат"},
   {"value": "anonymous", "label": "Полная анонимность", "sublabel": "Интересуют анонимные и специализированные платформы"}
 ]'::jsonb),
(1, '2. На каких платформах планируете работать?', 
 '[
   {"value": "public", "label": "Публичные (Twitch / YouTube / VK Play)", "sublabel": "Классический игровой или разговорный стриминг"},
   {"value": "anonymous", "label": "Анонимные / 18+ платформы", "sublabel": "Формат с повышенными требованиями к приватности"}
 ]'::jsonb),
(2, '3. Какой формат модели рассматриваете?', 
 '[
   {"value": "basic", "label": "Быстрый старт (Сами)", "sublabel": "Базовая настройка софта и готовая база знаний"},
   {"value": "2d", "label": "2D Live2D Модель", "sublabel": "Анимированный аниме-аватар с детальным трекингом лица"},
   {"value": "3d", "label": "3D VRM Модель", "sublabel": "Объемная 3D-модель для трекинга всего тела"}
 ]'::jsonb),
(3, '4. Нужна ли помощь нашего специалиста при запуске?', 
 '[
   {"value": "self", "label": "Разберусь сам по гайдам", "sublabel": "Базовые видеоуроки и документация"},
   {"value": "premium", "label": "Нужно сопровождение под ключ", "sublabel": "Личный куратор, настройка OBS и помощь на первом стриме"}
 ]'::jsonb)
ON CONFLICT DO NOTHING;
