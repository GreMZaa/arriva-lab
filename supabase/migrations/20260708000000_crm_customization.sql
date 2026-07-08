-- CRM Customization — Products and Quiz Questions tables

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name          TEXT NOT NULL,
    price         NUMERIC(10, 2) NOT NULL,
    type          TEXT NOT NULL, -- 'png', '2d', '3d'
    description   TEXT,
    features      JSONB DEFAULT '[]'::jsonb,
    created_at    TIMESTAMPTZ DEFAULT now()
);

-- Quiz questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    step_index    INT NOT NULL,
    question_text TEXT NOT NULL,
    options       JSONB DEFAULT '[]'::jsonb,
    created_at    TIMESTAMPTZ DEFAULT now()
);

-- Insert initial default products
INSERT INTO products (name, price, type, description, features)
VALUES 
('PNG-Аватар (Бюджетный)', 19000.00, 'png', 'Начальный пакет для простого старта', 
 '["Создание образа персонажа с нуля", "Настройка PNG трекинга и интеграции софта", "3 часа техподдержки на тестовых трансляциях", "Полное сопровождение на первом стриме"]'::jsonb),
('2D Live2D (Оптимальный)', 49000.00, '2d', 'Оптимальный пакет для большинства витуберов', 
 '["Создание образа персонажа с нуля", "Настройка 2D трекинга и интеграции софта", "3 часа техподдержки на тестовых трансляциях", "Полное сопровождение на первом стриме"]'::jsonb),
('3D VR-Аватар (Премиум)', 99000.00, '3d', 'Премиум пакет для профессионального стриминга', 
 '["Создание образа персонажа с нуля", "Настройка 3D трекинга и интеграции софта", "3 часа техподдержки на тестовых трансляциях", "Полное сопровождение на первом стриме"]'::jsonb)
ON CONFLICT DO NOTHING;

-- Insert initial default questions
INSERT INTO quiz_questions (step_index, question_text, options)
VALUES
(0, '1. Какой у вас планируемый бюджет на запуск?', 
 '[
   {"value": "low", "label": "Минимальный (до 20 000 руб.)", "sublabel": "Хочу попробовать формат стриминга с минимальными вложениями"},
   {"value": "medium", "label": "Средний (до 60 000 руб.)", "sublabel": "Настроен на качественную Live2D анимацию лица и хороший звук"},
   {"value": "high", "label": "Премиальный (60 000+ руб.)", "sublabel": "Интересует полноценная 3D-модель с трекингом тела и рук"}
 ]'::jsonb),
(1, '2. Есть ли у вас опыт ведения стримов или блогов?', 
 '[
   {"value": "none", "label": "Нет опыта", "sublabel": "Начинаю абсолютно с нуля, не знаю как настраивать софт"},
   {"value": "some", "label": "Есть небольшой опыт", "sublabel": "Стримил с вебкамерой, знаком с OBS Studio"},
   {"value": "pro", "label": "Профессиональный блогер", "sublabel": "Имею базу подписчиков, перехожу в VTuber формат ради анонимности/образа"}
 ]'::jsonb),
(2, '3. Какова ваша главная цель при запуске?', 
 '[
   {"value": "test", "label": "Протестировать формат", "sublabel": "Хочу понять, нравится ли мне стримить за виртуальным аватаром"},
   {"value": "career", "label": "Построить карьеру и бренд", "sublabel": "Планирую стать топ-витубером, настроен на долгую работу и монетизацию"}
 ]'::jsonb),
(3, '4. Какое оборудование у вас сейчас есть?', 
 '[
   {"value": "basic", "label": "Обычный ПК + вебкамера", "sublabel": "Простая конфигурация без отдельного оборудования для трекинга"},
   {"value": "iphone", "label": "Игровой ПК + iPhone (X или новее)", "sublabel": "Идеально подходит для профессионального трекинга лица (ARKit)"}
 ]'::jsonb)
ON CONFLICT DO NOTHING;
