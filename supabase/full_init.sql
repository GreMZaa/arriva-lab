-- =========================================================================
-- ARRIVA LAB — Полная инициализация базы данных Supabase
-- Проект: https://supabase.com/dashboard/project/ltppnucrvdtbgfczcjog/sql/new
-- =========================================================================

-- 1. Таблица пользователей (Users)
CREATE TABLE IF NOT EXISTS public.users (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    telegram_id   BIGINT UNIQUE,
    email         TEXT UNIQUE,
    username      TEXT,
    first_name    TEXT NOT NULL,
    phone         TEXT,
    birth_date    DATE,
    registered_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_users_telegram_id ON public.users(telegram_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- 2. Таблица покупок и заказов (Purchases)
CREATE TABLE IF NOT EXISTS public.purchases (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id       BIGINT REFERENCES public.users(id) ON DELETE SET NULL,
    telegram_id   BIGINT,
    email         TEXT,
    program_name  TEXT NOT NULL,
    price         NUMERIC(10, 2) NOT NULL,
    paid_at       TIMESTAMPTZ DEFAULT now(),
    status        TEXT NOT NULL DEFAULT 'pending'
);

CREATE INDEX IF NOT EXISTS idx_purchases_telegram_id ON public.purchases(telegram_id);
CREATE INDEX IF NOT EXISTS idx_purchases_email ON public.purchases(email);

-- 3. Заявки в агентство (Agency Applications)
CREATE TABLE IF NOT EXISTS public.agency_applications (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id       BIGINT REFERENCES public.users(id) ON DELETE SET NULL,
    telegram_id   BIGINT,
    email         TEXT,
    full_name     TEXT NOT NULL,
    birth_date    DATE,
    about         TEXT,
    submitted_at  TIMESTAMPTZ DEFAULT now(),
    status        TEXT NOT NULL DEFAULT 'pending'
);

CREATE INDEX IF NOT EXISTS idx_applications_telegram_id ON public.agency_applications(telegram_id);
CREATE INDEX IF NOT EXISTS idx_applications_email ON public.agency_applications(email);

-- 4. События воронки сайта (Site Events)
CREATE TABLE IF NOT EXISTS public.site_events (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    session_id  TEXT NOT NULL,
    event_type  TEXT NOT NULL,
    details     JSONB DEFAULT '{}'::jsonb,
    created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_site_events_session_id ON public.site_events(session_id);
CREATE INDEX IF NOT EXISTS idx_site_events_event_type ON public.site_events(event_type);

-- 5. Временные коды входа в личный кабинет (Login Codes)
CREATE TABLE IF NOT EXISTS public.login_codes (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    telegram_id BIGINT UNIQUE,
    email       TEXT UNIQUE,
    code        TEXT NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT now()
);

-- 6. Состояния FSM бота и веб-интерфейса (User States)
CREATE TABLE IF NOT EXISTS public.user_states (
    telegram_id BIGINT PRIMARY KEY,
    state       TEXT NOT NULL,
    data        JSONB DEFAULT '{}'::jsonb,
    updated_at  TIMESTAMPTZ DEFAULT now()
);

-- 7. Обращения в техподдержку (Support Tickets)
CREATE TABLE IF NOT EXISTS public.support_tickets (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id     BIGINT REFERENCES public.users(id) ON DELETE SET NULL,
    telegram_id BIGINT NOT NULL,
    message     TEXT NOT NULL,
    status      TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'answered', 'closed'
    answer      TEXT,
    created_at  TIMESTAMPTZ DEFAULT now(),
    updated_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_support_tickets_telegram_id ON public.support_tickets(telegram_id);

-- 8. Продукты и тарифы (Products)
CREATE TABLE IF NOT EXISTS public.products (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name          TEXT NOT NULL,
    price         NUMERIC(10, 2) NOT NULL,
    type          TEXT NOT NULL, -- 'basic', 'restart', 'premium', '18+', 'agency'
    subtitle      TEXT,
    description   TEXT,
    features      JSONB DEFAULT '[]'::jsonb,
    created_at    TIMESTAMPTZ DEFAULT now()
);

-- 9. Вопросы квиза (Quiz Questions)
CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    step_index    INT NOT NULL,
    question_text TEXT NOT NULL,
    options       JSONB DEFAULT '[]'::jsonb,
    created_at    TIMESTAMPTZ DEFAULT now()
);

-- 10. Промокоды и реферальная система (Promo Codes)
CREATE TABLE IF NOT EXISTS public.promo_codes (
    id               BIGSERIAL PRIMARY KEY,
    code             TEXT UNIQUE NOT NULL,
    discount_percent NUMERIC DEFAULT 10,
    discount_amount  NUMERIC DEFAULT 0,
    partner_name     TEXT DEFAULT '',
    description      TEXT DEFAULT '',
    uses_count       INT DEFAULT 0,
    is_active        BOOLEAN DEFAULT TRUE,
    created_at       TIMESTAMPTZ DEFAULT now()
);

-- =========================================================================
-- Заполнение начальными данными (Seed Data)
-- =========================================================================

-- Тарифы
INSERT INTO public.products (name, price, type, subtitle, description, features)
VALUES 
('АРХИВ 002', 14900.00, 'basic', 'Быстрый старт (Сами)', 'Доступ к базе знаний и базовым материалам запуска', 
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

-- Вопросы квиза
INSERT INTO public.quiz_questions (step_index, question_text, options)
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

-- Промокоды
INSERT INTO public.promo_codes (code, discount_percent, partner_name, description)
VALUES 
  ('ARRIVA10', 10, 'Официальный партнёр ARRIVA', 'Скидка 10% на любой тариф'),
  ('STREAMER5', 5, 'Партнёрская программа Стримеров', 'Скидка 5% от реферальных каналов'),
  ('VIP15', 15, 'Специальное VIP предложение', 'Скидка 15% на запуск')
ON CONFLICT (code) DO NOTHING;

-- =========================================================================
-- Настройка Row Level Security (RLS)
-- =========================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agency_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.login_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public full access users" ON public.users;
DROP POLICY IF EXISTS "Public full access purchases" ON public.purchases;
DROP POLICY IF EXISTS "Public full access applications" ON public.agency_applications;
DROP POLICY IF EXISTS "Public full access user_states" ON public.user_states;
DROP POLICY IF EXISTS "Public full access login_codes" ON public.login_codes;
DROP POLICY IF EXISTS "Public full access products" ON public.products;
DROP POLICY IF EXISTS "Public full access quiz_questions" ON public.quiz_questions;
DROP POLICY IF EXISTS "Public full access site_events" ON public.site_events;
DROP POLICY IF EXISTS "Public full access support_tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "Public full access promo_codes" ON public.promo_codes;

CREATE POLICY "Public full access users" ON public.users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access purchases" ON public.purchases FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access applications" ON public.agency_applications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access user_states" ON public.user_states FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access login_codes" ON public.login_codes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access products" ON public.products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access quiz_questions" ON public.quiz_questions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access site_events" ON public.site_events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access support_tickets" ON public.support_tickets FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access promo_codes" ON public.promo_codes FOR ALL USING (true) WITH CHECK (true);

-- =========================================================================
-- Включение Supabase Realtime для мгновенной синхронизации CRM и Кабинета
-- =========================================================================

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.purchases, public.agency_applications, public.support_tickets, public.users, public.promo_codes;
  END IF;
EXCEPTION
  WHEN duplicate_object THEN
    -- Таблицы уже в публикации
    NULL;
END $$;
