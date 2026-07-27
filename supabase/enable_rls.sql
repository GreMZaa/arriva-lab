-- =========================================================================
-- ARRIVA LAB — Полный SQL-скрипт включения Row Level Security (RLS)
-- Запустите в SQL Editor Supabase: https://supabase.com/dashboard/project/qhwthhcuqmqzzztomzxc/sql/new
-- =========================================================================

-- 1. Включаем RLS на всех 9 таблицах
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE login_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- 2. Сбрасываем старые политики, если они существовали
DROP POLICY IF EXISTS "Public full access users" ON users;
DROP POLICY IF EXISTS "Public full access purchases" ON purchases;
DROP POLICY IF EXISTS "Public full access applications" ON agency_applications;
DROP POLICY IF EXISTS "Public full access user_states" ON user_states;
DROP POLICY IF EXISTS "Public full access login_codes" ON login_codes;
DROP POLICY IF EXISTS "Public full access products" ON products;
DROP POLICY IF EXISTS "Public full access quiz_questions" ON quiz_questions;
DROP POLICY IF EXISTS "Public full access site_events" ON site_events;
DROP POLICY IF EXISTS "Public full access support_tickets" ON support_tickets;

-- 3. Публичные политики доступа для работы клиентских приложений и бота
CREATE POLICY "Public full access users" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access purchases" ON purchases FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access applications" ON agency_applications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access user_states" ON user_states FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access login_codes" ON login_codes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access quiz_questions" ON quiz_questions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access site_events" ON site_events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access support_tickets" ON support_tickets FOR ALL USING (true) WITH CHECK (true);
