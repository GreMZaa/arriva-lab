-- Alter users table to support email login
ALTER TABLE users ALTER COLUMN telegram_id DROP NOT NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email TEXT UNIQUE;

-- Recreate login_codes table to support either telegram_id or email
DROP TABLE IF EXISTS login_codes;
CREATE TABLE login_codes (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    telegram_id BIGINT UNIQUE,
    email       TEXT UNIQUE,
    code        TEXT NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT now()
);

-- Alter other tables to make telegram_id optional and add email support
ALTER TABLE purchases ALTER COLUMN telegram_id DROP NOT NULL;
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS email TEXT;

ALTER TABLE agency_applications ALTER COLUMN telegram_id DROP NOT NULL;
ALTER TABLE agency_applications ADD COLUMN IF NOT EXISTS email TEXT;
