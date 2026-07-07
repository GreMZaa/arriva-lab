import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Verify if credentials are configured
export const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase credentials are not set. The application will use LocalStorage fallback mode.'
  );
}

// Helper to generate numeric hash from string (e.g. telegram username)
export const getTelegramIdHash = (usernameOrId) => {
  if (!usernameOrId) return 0;
  const num = parseInt(usernameOrId, 10);
  if (!isNaN(num)) return num;
  
  // Simple hashing algorithm
  let hash = 0;
  for (let i = 0; i < usernameOrId.length; i++) {
    hash = (hash << 5) - hash + usernameOrId.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

// Database interface layer with LocalStorage fallback
export const db = {
  // Create user
  async createUser(telegramId, firstName, username = '') {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('users')
        .upsert({ telegram_id: telegramId, first_name: firstName, username }, { onConflict: 'telegram_id' })
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const users = JSON.parse(localStorage.getItem('arriva_users') || '[]');
      const existingUser = users.find(u => u.telegram_id === telegramId);
      if (existingUser) return existingUser;
      
      const newUser = {
        id: users.length + 1,
        telegram_id: telegramId,
        first_name: firstName,
        username,
        registered_at: new Date().toISOString()
      };
      users.push(newUser);
      localStorage.setItem('arriva_users', JSON.stringify(users));
      return newUser;
    }
  },

  // Submit agency application
  async submitApplication(telegramId, fullName, birthDate, about) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('agency_applications')
        .insert({ telegram_id: telegramId, full_name: fullName, birth_date: birthDate, about })
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const apps = JSON.parse(localStorage.getItem('arriva_applications') || '[]');
      const newApp = {
        id: apps.length + 1,
        telegram_id: telegramId,
        full_name: fullName,
        birth_date: birthDate,
        about,
        submitted_at: new Date().toISOString(),
        status: 'pending'
      };
      apps.push(newApp);
      localStorage.setItem('arriva_applications', JSON.stringify(apps));
      return newApp;
    }
  },

  // Submit purchase
  async createPurchase(telegramId, programName, price) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('purchases')
        .insert({ telegram_id: telegramId, program_name: programName, price, status: 'pending' })
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const purchases = JSON.parse(localStorage.getItem('arriva_purchases') || '[]');
      const newPurchase = {
        id: purchases.length + 1,
        telegram_id: telegramId,
        program_name: programName,
        price,
        paid_at: new Date().toISOString(),
        status: 'pending'
      };
      purchases.push(newPurchase);
      localStorage.setItem('arriva_purchases', JSON.stringify(purchases));
      return newPurchase;
    }
  },

  // Generate login code (useful for mock testing)
  async generateLoginCode(telegramId) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('login_codes')
        .upsert({ telegram_id: telegramId, code, created_at: new Date().toISOString() });
      if (error) throw error;
      return code;
    } else {
      const codes = JSON.parse(localStorage.getItem('arriva_login_codes') || '{}');
      codes[telegramId] = code;
      localStorage.setItem('arriva_login_codes', JSON.stringify(codes));
      return code;
    }
  },

  // Verify login code
  async verifyLoginCode(telegramId, inputCode) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('login_codes')
        .select('code')
        .eq('telegram_id', telegramId)
        .single();
      
      if (error || !data) return false;
      return data.code === inputCode;
    } else {
      const codes = JSON.parse(localStorage.getItem('arriva_login_codes') || '{}');
      return codes[telegramId] === inputCode;
    }
  },

  // Get all applications (CRM view)
  async getAllApplications() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('agency_applications')
        .select('*')
        .order('submitted_at', { ascending: false });
      if (error) throw error;
      return data;
    } else {
      // Load initial mock apps if storage is empty
      let apps = JSON.parse(localStorage.getItem('arriva_applications') || '[]');
      if (apps.length === 0) {
        apps = [
          { id: 1, telegram_id: 84729104, full_name: 'Дарья Соколова', birth_date: '2002-04-12', about: 'Стример с Twitch, хочу 2D-модель в стиле киберпанк кошки.', submitted_at: new Date(Date.now() - 3600000 * 24).toISOString(), status: 'pending' },
          { id: 2, telegram_id: 19837482, full_name: 'Никита Орлов', birth_date: '1998-11-20', about: 'Блогер на YouTube, заинтересован в полной 3D-модели для летсплеев.', submitted_at: new Date(Date.now() - 3600000 * 50).toISOString(), status: 'approved' },
          { id: 3, telegram_id: 48572910, full_name: 'Алиса Ветрова', birth_date: '2005-08-05', about: 'Начинающий витубер, планирую PNG-модель на старте.', submitted_at: new Date(Date.now() - 3600000 * 120).toISOString(), status: 'pending' }
        ];
        localStorage.setItem('arriva_applications', JSON.stringify(apps));
      }
      return apps.sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at));
    }
  },

  // Update application status
  async updateApplicationStatus(id, status) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('agency_applications')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const apps = JSON.parse(localStorage.getItem('arriva_applications') || '[]');
      const updatedApps = apps.map(app => app.id === id ? { ...app, status } : app);
      localStorage.setItem('arriva_applications', JSON.stringify(updatedApps));
      return updatedApps.find(app => app.id === id);
    }
  },

  // Get all purchases (CRM view)
  async getAllPurchases() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('purchases')
        .select('*')
        .order('paid_at', { ascending: false });
      if (error) throw error;
      return data;
    } else {
      let purchases = JSON.parse(localStorage.getItem('arriva_purchases') || '[]');
      if (purchases.length === 0) {
        purchases = [
          { id: 1, telegram_id: 19837482, program_name: 'Запуск VTuber-карьеры под ключ', price: 99000, paid_at: new Date(Date.now() - 3600000 * 20).toISOString(), status: 'approved' },
          { id: 2, telegram_id: 48572910, program_name: 'Разработка образа & 2D-модели', price: 49000, paid_at: new Date(Date.now() - 3600000 * 100).toISOString(), status: 'pending' }
        ];
        localStorage.setItem('arriva_purchases', JSON.stringify(purchases));
      }
      return purchases.sort((a, b) => new Date(b.paid_at) - new Date(a.paid_at));
    }
  }
};
