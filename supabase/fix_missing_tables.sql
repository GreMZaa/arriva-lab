-- =========================================================================
-- ARRIVA LAB — SQL скрипт для обновления живой базы Supabase
-- Запустите этот SQL скрипт в SQL Editor вашего проекта Supabase:
-- https://supabase.com/dashboard/project/qhwthhcuqmqzzztomzxc/sql/new
-- =========================================================================

-- 1. Добавляем недостающую колонку `phone` в таблицу `users` (для передачи телефона по кнопке в боте)
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone TEXT;

-- 2. Создаем таблицу `support_tickets` для обращений в техподдержку (для трекинга обращений в боте)
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

-- Индекс для быстрого поиска обращений пользователя
CREATE INDEX IF NOT EXISTS idx_support_tickets_telegram_id ON support_tickets(telegram_id);
