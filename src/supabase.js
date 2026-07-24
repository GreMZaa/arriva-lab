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
  // Create or update user safely without violating unique constraints
  async createUser(telegramId, firstName, username = '', email = null) {
    if (isSupabaseConfigured) {
      let existingUser = null;

      // 1. Search existing user by telegram_id
      if (telegramId) {
        const { data } = await supabase
          .from('users')
          .select('*')
          .eq('telegram_id', telegramId)
          .maybeSingle();
        if (data) existingUser = data;
      }

      // 2. Search existing user by email if not found by telegram_id
      if (!existingUser && email) {
        const { data } = await supabase
          .from('users')
          .select('*')
          .eq('email', email)
          .maybeSingle();
        if (data) existingUser = data;
      }

      // 3. If existing user found, update any new info and return
      if (existingUser) {
        const updates = {};
        if (firstName && (!existingUser.first_name || existingUser.first_name !== firstName)) {
          updates.first_name = firstName;
        }
        if (username && (!existingUser.username || existingUser.username !== username)) {
          updates.username = username;
        }
        if (email && (!existingUser.email || existingUser.email !== email)) {
          updates.email = email;
        }
        if (telegramId && (!existingUser.telegram_id || existingUser.telegram_id !== telegramId)) {
          updates.telegram_id = telegramId;
        }

        if (Object.keys(updates).length > 0) {
          const { data, error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', existingUser.id)
            .select()
            .single();
          if (!error && data) return data;
        }
        return existingUser;
      }

      // 4. Insert new user
      const payload = { first_name: firstName };
      if (telegramId) payload.telegram_id = telegramId;
      if (username) payload.username = username;
      if (email) payload.email = email;

      const { data, error } = await supabase
        .from('users')
        .insert(payload)
        .select()
        .single();

      if (error) {
        // Safe fallback if race condition occurred
        if (telegramId) {
          const { data: fallbackUser } = await supabase
            .from('users')
            .select('*')
            .eq('telegram_id', telegramId)
            .maybeSingle();
          if (fallbackUser) return fallbackUser;
        }
        if (email) {
          const { data: fallbackEmailUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .maybeSingle();
          if (fallbackEmailUser) return fallbackEmailUser;
        }
        throw error;
      }
      return data;
    } else {
      const users = JSON.parse(localStorage.getItem('arriva_users') || '[]');
      const existingUser = users.find(u => (telegramId && u.telegram_id === telegramId) || (email && u.email === email));
      if (existingUser) {
        if (email && !existingUser.email) existingUser.email = email;
        if (firstName) existingUser.first_name = firstName;
        if (username) existingUser.username = username;
        localStorage.setItem('arriva_users', JSON.stringify(users));
        return existingUser;
      }
      
      const newUser = {
        id: users.length + 1,
        telegram_id: telegramId,
        first_name: firstName,
        username,
        email,
        registered_at: new Date().toISOString()
      };
      users.push(newUser);
      localStorage.setItem('arriva_users', JSON.stringify(users));
      return newUser;
    }
  },

  // Find user by email or telegram
  async findUserByEmailOrTelegram(email = null, telegramId = null) {
    if (isSupabaseConfigured) {
      const query = supabase.from('users').select('*');
      if (email) {
        query.eq('email', email);
      } else if (telegramId) {
        query.eq('telegram_id', telegramId);
      }
      const { data, error } = await query.maybeSingle();
      if (error) return null;
      return data;
    } else {
      const users = JSON.parse(localStorage.getItem('arriva_users') || '[]');
      return users.find(u => (email && u.email === email) || (telegramId && u.telegram_id === telegramId)) || null;
    }
  },

  // Update user details directly
  async updateUserDetails(id, updates) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const users = JSON.parse(localStorage.getItem('arriva_users') || '[]');
      const index = users.findIndex(u => u.id === id);
      if (index === -1) throw new Error('User not found');
      users[index] = { ...users[index], ...updates };
      localStorage.setItem('arriva_users', JSON.stringify(users));
      return users[index];
    }
  },

  // Merge two accounts (e.g. email-only account into telegram-only account, or vice versa)
  async mergeAccounts(primaryUserId, secondaryUserId) {
    if (isSupabaseConfigured) {
      const { data: secUser, error: secErr } = await supabase
        .from('users')
        .select('*')
        .eq('id', secondaryUserId)
        .single();
      if (secErr || !secUser) throw new Error('Secondary user not found');

      const { data: primUser, error: primErr } = await supabase
        .from('users')
        .select('*')
        .eq('id', primaryUserId)
        .single();
      if (primErr || !primUser) throw new Error('Primary user not found');

      const updates = {};
      if (!primUser.telegram_id && secUser.telegram_id) {
        updates.telegram_id = secUser.telegram_id;
        updates.username = secUser.username;
      }
      if (!primUser.email && secUser.email) {
        updates.email = secUser.email;
      }

      if (Object.keys(updates).length > 0) {
        const { error: updErr } = await supabase
          .from('users')
          .update(updates)
          .eq('id', primaryUserId);
        if (updErr) throw updErr;
      }

      // Move purchases and applications from secondary to primary
      if (secUser.telegram_id && primUser.telegram_id) {
        const { error: purchErr } = await supabase
          .from('purchases')
          .update({ telegram_id: primUser.telegram_id })
          .eq('telegram_id', secUser.telegram_id);
        if (purchErr) console.error("Error transferring purchases:", purchErr);

        const { error: appErr } = await supabase
          .from('agency_applications')
          .update({ telegram_id: primUser.telegram_id })
          .eq('telegram_id', secUser.telegram_id);
        if (appErr) console.error("Error transferring applications:", appErr);
      }

      // Delete secondary user account as it is now merged
      const { error: delErr } = await supabase
        .from('users')
        .delete()
        .eq('id', secondaryUserId);
      if (delErr) console.warn("Could not delete secondary user:", delErr);

      return { ...primUser, ...updates };
    } else {
      const users = JSON.parse(localStorage.getItem('arriva_users') || '[]');
      const primIdx = users.findIndex(u => u.id === primaryUserId);
      const secIdx = users.findIndex(u => u.id === secondaryUserId);
      if (primIdx === -1 || secIdx === -1) throw new Error('User not found');

      const primUser = users[primIdx];
      const secUser = users[secIdx];

      if (!primUser.telegram_id && secUser.telegram_id) {
        primUser.telegram_id = secUser.telegram_id;
        primUser.username = secUser.username;
      }
      if (!primUser.email && secUser.email) {
        primUser.email = secUser.email;
      }

      if (secUser.telegram_id && primUser.telegram_id) {
        const purchases = JSON.parse(localStorage.getItem('arriva_purchases') || '[]');
        purchases.forEach(p => {
          if (p.telegram_id === secUser.telegram_id) p.telegram_id = primUser.telegram_id;
        });
        localStorage.setItem('arriva_purchases', JSON.stringify(purchases));

        const apps = JSON.parse(localStorage.getItem('arriva_applications') || '[]');
        apps.forEach(a => {
          if (a.telegram_id === secUser.telegram_id) a.telegram_id = primUser.telegram_id;
        });
        localStorage.setItem('arriva_applications', JSON.stringify(apps));
      }

      const filteredUsers = users.filter(u => u.id !== secondaryUserId);
      localStorage.setItem('arriva_users', JSON.stringify(filteredUsers));

      return primUser;
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

  // Update purchase
  async updatePurchase(id, updates) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('purchases')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const purchases = JSON.parse(localStorage.getItem('arriva_purchases') || '[]');
      const index = purchases.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Purchase not found');
      purchases[index] = { ...purchases[index], ...updates };
      localStorage.setItem('arriva_purchases', JSON.stringify(purchases));
      return purchases[index];
    }
  },

  // Generate login code (useful for mock testing)
  async generateLoginCode(telegramId, email = null) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    if (isSupabaseConfigured) {
      const payload = { code, created_at: new Date().toISOString() };
      if (telegramId) payload.telegram_id = telegramId;
      if (email) payload.email = email;

      const conflictCol = email ? 'email' : 'telegram_id';

      const { error } = await supabase
        .from('login_codes')
        .upsert(payload, { onConflict: conflictCol });
      if (error) throw error;
      return code;
    } else {
      const key = email || telegramId;
      const codes = JSON.parse(localStorage.getItem('arriva_login_codes') || '{}');
      codes[key] = code;
      localStorage.setItem('arriva_login_codes', JSON.stringify(codes));
      return code;
    }
  },

  // Verify login code
  async verifyLoginCode(telegramId, inputCode, email = null) {
    if (isSupabaseConfigured) {
      const query = supabase
        .from('login_codes')
        .select('code');
      
      if (email) {
        query.eq('email', email);
      } else {
        query.eq('telegram_id', telegramId);
      }

      const { data, error } = await query.maybeSingle();
      if (error || !data) return false;
      return data.code === inputCode;
    } else {
      const key = email || telegramId;
      const codes = JSON.parse(localStorage.getItem('arriva_login_codes') || '{}');
      return codes[key] === inputCode;
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
  },

  // Get all products
  async getAllProducts() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });
      if (error) throw error;
      return data;
    } else {
      let products = JSON.parse(localStorage.getItem('arriva_products') || '[]');
      if (products.length === 0) {
        products = defaultProducts;
        localStorage.setItem('arriva_products', JSON.stringify(products));
      }
      return products.sort((a, b) => a.id - b.id);
    }
  },

  // Update product
  async updateProduct(id, updates) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const products = JSON.parse(localStorage.getItem('arriva_products') || '[]');
      const index = products.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Product not found');
      products[index] = { ...products[index], ...updates };
      localStorage.setItem('arriva_products', JSON.stringify(products));
      return products[index];
    }
  },

  // Create product
  async createProduct(product) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('products')
        .insert(product)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const products = JSON.parse(localStorage.getItem('arriva_products') || '[]');
      const newProduct = {
        ...product,
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
      };
      products.push(newProduct);
      localStorage.setItem('arriva_products', JSON.stringify(products));
      return newProduct;
    }
  },

  // Delete product
  async deleteProduct(id) {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return true;
    } else {
      const products = JSON.parse(localStorage.getItem('arriva_products') || '[]');
      const filtered = products.filter(p => p.id !== id);
      localStorage.setItem('arriva_products', JSON.stringify(filtered));
      return true;
    }
  },

  // Get all quiz questions
  async getAllQuestions() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .order('step_index', { ascending: true });
      if (error) throw error;
      return data;
    } else {
      let questions = JSON.parse(localStorage.getItem('arriva_questions') || '[]');
      if (questions.length === 0) {
        questions = defaultQuestions;
        localStorage.setItem('arriva_questions', JSON.stringify(questions));
      }
      return questions.sort((a, b) => a.step_index - b.step_index);
    }
  },

  // Update quiz question
  async updateQuestion(id, updates) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('quiz_questions')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const questions = JSON.parse(localStorage.getItem('arriva_questions') || '[]');
      const index = questions.findIndex(q => q.id === id);
      if (index === -1) throw new Error('Question not found');
      questions[index] = { ...questions[index], ...updates };
      localStorage.setItem('arriva_questions', JSON.stringify(questions));
      return questions[index];
    }
  },

  // Create quiz question
  async createQuestion(question) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('quiz_questions')
        .insert(question)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const questions = JSON.parse(localStorage.getItem('arriva_questions') || '[]');
      const newQuestion = {
        ...question,
        id: questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1
      };
      questions.push(newQuestion);
      localStorage.setItem('arriva_questions', JSON.stringify(questions));
      return newQuestion;
    }
  },

  // Delete quiz question
  async deleteQuestion(id) {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('quiz_questions')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return true;
    } else {
      const questions = JSON.parse(localStorage.getItem('arriva_questions') || '[]');
      const filtered = questions.filter(q => q.id !== id);
      localStorage.setItem('arriva_questions', JSON.stringify(filtered));
      return true;
    }
  }
};

// Default products initial data for LocalStorage fallback
export const defaultProducts = [
  {
    id: 1,
    name: "АРХИВ 002 — базовый",
    price: 14900,
    type: "basic",
    description: "Базовый запуск с нуля",
    features: [
      "Полный архив: 8 этапов + доп. раздел (28 страниц)",
      "Пошаговый запуск — оборудование, образ, OBS, первый эфир, платформы",
      "Чек-листы, глоссарий, разбор частых ошибок",
      "Поддержка 24/7",
      "Скидка 50% на готовую модель",
      "Без личного сопровождения",
      "Без модели в подарок"
    ]
  },
  {
    id: 6,
    name: "АРХИВ 004 — РЕСТАРТ",
    price: 39900,
    type: "restart",
    description: "Переход на виртуальный формат",
    features: [
      "Полный архив: 24 страницы, 6 фаз перехода",
      "Финансовый план перехода (3 сценария + рекомендованный план на 4 месяца)",
      "Готовый промпт для генерации персонажа-аватара",
      "Инструкция по OBS + VTube Studio с шаблоном сцен и переходов",
      "Готовые шаблоны: объявление для аудитории, Tip Menu, чек-лист точек остановки",
      "Реалистичная статистика по росту зрителей и дохода",
      "Глоссарий терминов",
      "Поддержка 24/7",
      "Готовая VRM-модель"
    ]
  },
  {
    id: 4,
    name: "АРХИВ 002 PREMIUM",
    price: 49900,
    type: "premium",
    description: "Полное сопровождение",
    features: [
      "Всё из базового архива",
      "Личное сопровождение — проходим все настройки вместе",
      "Помогаем скачать и настроить все программы",
      "Помощь с нишей и стратегией первых эфиров",
      "2D или 3D модель — в подарок",
      "Полный запуск с готовым планом на первую неделю"
    ]
  },
  {
    id: 5,
    name: "АРХИВ 003",
    price: 59900,
    type: "18+",
    description: "Специализированный доступ",
    features: [
      "Полный архив: 19 разделов, паспорт профессии, план на первую неделю",
      "Полный путь: анонимность, оборудование, платформы, финансы, образ, доход, юридика",
      "Готовый промпт для создания паспорта персонажа",
      "Чек-листы к каждому разделу",
      "Поддержка 24/7",
      "Скидка 50% на создание 3D/VRM-модели",
      "Мы помогаем полностью собрать модель — от заказа до настройки в софте"
    ]
  },
  {
    id: 7,
    name: "Работать с нами",
    price: 0,
    priceLabel: "15% от дохода",
    type: "agency",
    description: "Агентская программа сопровождения",
    features: [
      "Даем вам полную программу",
      "Подбираем для вас вашу модель",
      "Прописываем характеристики персонажа",
      "Берем с этого 15%"
    ]
  }
];

// Default questions initial data for LocalStorage fallback
const defaultQuestions = [
  {
    id: 1,
    step_index: 0,
    question_text: "1. Каков ваш текущий статус в стриминге?",
    options: [
      { value: "new", label: "Я только начинаю", sublabel: "Хочу запустить карьеру с нуля, нет опыта стриминга" },
      { value: "cam", label: "Уже стримлю с веб-камерой", sublabel: "Хочу перейти на формат VTuber-аватара и обновить трансляции" }
    ]
  },
  {
    id: 2,
    step_index: 1,
    question_text: "2. На каких платформах вы планируете стримить?",
    options: [
      { value: "public", label: "Популярные платформы", sublabel: "YouTube, Twitch, VK Play Live, Kick — обычные стримы и общение" },
      { value: "anonymous", label: "Специализированные (18+ / Анонимно)", sublabel: "Скрытые/анонимные трансляции с особыми требованиями к приватности" }
    ]
  },
  {
    id: 3,
    step_index: 2,
    question_text: "3. Какая модель персонажа вас интересует?",
    options: [
      { value: "none", label: "Без модели (только инструкции)", sublabel: "У меня уже есть модель или хочу заказать её отдельно сам" },
      { value: "2d", label: "2D Live2D модель (аниме-стиль)", sublabel: "Хочу качественную плоскую модель с плавной анимацией лица" },
      { value: "3d", label: "3D VRM модель (3D-трекинг)", sublabel: "Хочу объемную 3D-модель для высокой интерактивности" }
    ]
  },
  {
    id: 4,
    step_index: 3,
    question_text: "4. Нужна ли вам личная помощь в настройке?",
    options: [
      { value: "self", label: "Настрою всё сам по инструкциям", sublabel: "Разберусь самостоятельно с помощью подробных текстовых гайдов" },
      { value: "premium", label: "Хочу полное сопровождение под ключ", sublabel: "Нужен специалист, который настроит весь софт, трекинг и OBS со мной" }
    ]
  }
];


