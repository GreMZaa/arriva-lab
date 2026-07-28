-- SQL Migration for Promo Codes & Referral System
CREATE TABLE IF NOT EXISTS public.promo_codes (
  id BIGSERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount_percent NUMERIC DEFAULT 10,
  discount_amount NUMERIC DEFAULT 0,
  partner_name TEXT DEFAULT '',
  description TEXT DEFAULT '',
  uses_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default promo codes
INSERT INTO public.promo_codes (code, discount_percent, partner_name, description)
VALUES 
  ('ARRIVA10', 10, 'Официальный партнёр ARRIVA', 'Скидка 10% на любой тариф'),
  ('STREAMER5', 5, 'Партнёрская программа Стримеров', 'Скидка 5% от реферальных каналов'),
  ('VIP15', 15, 'Специальное VIP предложение', 'Скидка 15% на запуск')
ON CONFLICT (code) DO NOTHING;

-- Enable RLS
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active promo codes
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'promo_codes' AND policyname = 'Public read active promo codes'
  ) THEN
    CREATE POLICY "Public read active promo codes" ON public.promo_codes FOR SELECT USING (is_active = true);
  END IF;
END $$;
