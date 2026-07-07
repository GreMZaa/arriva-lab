import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Smartphone, 
  Tv, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  ArrowRight, 
  User, 
  Lock, 
  Search, 
  Filter, 
  Menu, 
  X, 
  LogOut, 
  Check, 
  Send,
  HelpCircle,
  Shield,
  Layers,
  Activity,
  Plus,
  Sliders,
  Bell,
  Settings
} from 'lucide-react';
import { db, getTelegramIdHash } from './supabase';
import confetti from 'canvas-confetti';

export default function App() {
  const [view, setView] = useState('home'); // 'home', 'quiz', 'cabinet', 'crm'
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true' || params.get('crm') === 'true' || window.location.hash === '#crm') {
      setIsAdminMode(true);
    }
  }, []);

  const handleLogoClick = () => {
    setLogoClicks(prev => {
      const next = prev + 1;
      if (next >= 5) {
        setIsAdminMode(true);
        return 0;
      }
      return next;
    });
  };

  // Contacts form state
  const [contactName, setContactName] = useState('');
  const [contactTelegram, setContactTelegram] = useState('');
  const [contactDate, setContactDate] = useState('');
  const [contactAbout, setContactAbout] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  // FAQ state
  const [activeFaq, setActiveFaq] = useState(null);

  // Quiz state
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizResult, setQuizResult] = useState(null); // 'png', '2d', '3d'
  
  // Cabinet state
  const [cabinetUser, setCabinetUser] = useState(null);
  const [cabinetTelegramInput, setCabinetTelegramInput] = useState('');
  const [cabinetCodeInput, setCabinetCodeInput] = useState('');
  const [cabinetCodeSent, setCabinetCodeSent] = useState(false);
  const [cabinetCodeLoading, setCabinetCodeLoading] = useState(false);
  const [cabinetLoginLoading, setCabinetLoginLoading] = useState(false);
  const [cabinetError, setCabinetError] = useState('');
  const [cabinetSuccessMessage, setCabinetSuccessMessage] = useState('');
  const [cabinetActiveTab, setCabinetActiveTab] = useState('project'); // 'project', 'guide', 'analytics'
  const [clientTasks, setClientTasks] = useState([
    { id: 1, text: 'Согласование концепт-арта персонажа', completed: true },
    { id: 2, text: 'Проверка слоев и нарезка 2D-модели', completed: true },
    { id: 3, text: 'Калибровка отслеживания лица в VTube Studio', completed: false },
    { id: 4, text: 'Тестовый стрим-выход на Twitch', completed: false }
  ]);

  // CRM state
  const [crmLoggedIn, setCrmLoggedIn] = useState(false);
  const [crmUsername, setCrmUsername] = useState('');
  const [crmPassword, setCrmPassword] = useState('');
  const [crmError, setCrmError] = useState('');
  const [crmApplications, setCrmApplications] = useState([]);
  const [crmPurchases, setCrmPurchases] = useState([]);
  const [crmSearch, setCrmSearch] = useState('');
  const [crmFilterStatus, setCrmFilterStatus] = useState('all');
  const [crmSelectedLead, setCrmSelectedLead] = useState(null); // Right drawer details
  const [crmLoading, setCrmLoading] = useState(false);

  // Initialize CRM data
  useEffect(() => {
    if (view === 'crm' && crmLoggedIn) {
      loadCrmData();
    }
  }, [view, crmLoggedIn]);

  const loadCrmData = async () => {
    setCrmLoading(true);
    try {
      const apps = await db.getAllApplications();
      const purchases = await db.getAllPurchases();
      setCrmApplications(apps);
      setCrmPurchases(purchases);
    } catch (err) {
      console.error(err);
    } finally {
      setCrmLoading(false);
    }
  };

  // Submission handler
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactName || !contactTelegram) return;
    setContactLoading(true);
    try {
      const tgId = getTelegramIdHash(contactTelegram);
      // Ensure user entry exists
      await db.createUser(tgId, contactName, contactTelegram);
      // Submit app
      const app = await db.submitApplication(tgId, contactName, contactDate || new Date().toISOString().split('T')[0], contactAbout);
      
      // Notify Admin Group via Serverless API!
      try {
        await fetch(`/api/notify-admin`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: app.id,
            name: contactName,
            telegram: contactTelegram,
            wishes: `Дата рождения: ${contactDate || 'не указана'}. Пожелания: ${contactAbout || 'не указаны'}`
          })
        });
      } catch (notifyErr) {
        console.error('Failed to send admin notification:', notifyErr);
      }

      setContactSubmitted(true);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.8 } });
    } catch (error) {
      alert('Ошибка при отправке заявки: ' + error.message);
    } finally {
      setContactLoading(false);
    }
  };

  // Quiz Navigation & Submit
  const handleQuizAnswer = (question, answer) => {
    setQuizAnswers(prev => ({ ...prev, [question]: answer }));
    if (quizStep < 3) {
      setQuizStep(prev => prev + 1);
    } else {
      calculateQuizResult();
    }
  };

  const calculateQuizResult = async () => {
    setQuizLoading(true);
    // Simple decision logic
    const budget = quizAnswers.budget || 'low';
    const goal = quizAnswers.goal || 'test';
    
    let result = 'png';
    if (budget === 'high' || (budget === 'medium' && goal === 'career')) {
      result = '3d';
    } else if (budget === 'medium' || (budget === 'low' && goal === 'career')) {
      result = '2d';
    }
    
    setQuizResult(result);
    setQuizStep(4);
    setQuizLoading(false);
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
  };

  const submitQuizLead = async (fullName, telegram) => {
    if (!fullName || !telegram) return;
    setQuizLoading(true);
    try {
      const tgId = getTelegramIdHash(telegram);
      await db.createUser(tgId, fullName, telegram);
      
      const details = `Подобрана модель: ${quizResult.toUpperCase()}. Бюджет: ${quizAnswers.budget}, Опыт: ${quizAnswers.exp}, Цель: ${quizAnswers.goal}`;
      await db.submitApplication(tgId, fullName, new Date().toISOString().split('T')[0], details);
      
      // Auto register a purchase suggestion
      const price = quizResult === '3d' ? 99000 : quizResult === '2d' ? 49000 : 19000;
      await db.createPurchase(tgId, `Запуск VTuber-карьеры (${quizResult.toUpperCase()})`, price);
      
      // Automatically log user in
      setCabinetUser({ telegram_id: tgId, first_name: fullName, username: telegram });
      setView('cabinet');
      setQuizStep(0);
      setQuizAnswers({});
      setQuizResult(null);
    } catch (err) {
      alert('Ошибка отправки: ' + err.message);
    } finally {
      setQuizLoading(false);
    }
  };

  // Cabinet Auth Flow
  const handleRequestCabinetCode = async () => {
    if (!cabinetTelegramInput) {
      setCabinetError('Пожалуйста, введите ваш Telegram ID или Username');
      return;
    }
    setCabinetError('');
    setCabinetCodeLoading(true);
    try {
      const tgId = getTelegramIdHash(cabinetTelegramInput);
      const code = await db.generateLoginCode(tgId);
      
      try {
        const res = await fetch(`/api/send-code?input=${encodeURIComponent(cabinetTelegramInput)}&code=${code}`);
        const resData = await res.json();
        if (!res.ok) {
          throw new Error(resData.error || 'Ошибка');
        }
        setCabinetSuccessMessage('Код отправлен в Telegram-бот!');
      } catch (botErr) {
        setCabinetSuccessMessage(`Код отправлен! (Для теста введите: ${code})`);
      }
      setCabinetCodeSent(true);
    } catch (err) {
      setCabinetError('Ошибка генерации кода: ' + err.message);
    } finally {
      setCabinetCodeLoading(false);
    }
  };

  const handleCabinetLogin = async () => {
    if (!cabinetCodeInput) {
      setCabinetError('Введите код подтверждения');
      return;
    }
    setCabinetError('');
    setCabinetLoginLoading(true);
    try {
      const tgId = getTelegramIdHash(cabinetTelegramInput);
      const success = await db.verifyLoginCode(tgId, cabinetCodeInput);
      if (success) {
        // Find or create user
        const user = await db.createUser(tgId, cabinetTelegramInput.replace('@', ''), cabinetTelegramInput);
        setCabinetUser(user);
        setCabinetTelegramInput('');
        setCabinetCodeInput('');
        setCabinetCodeSent(false);
        setCabinetSuccessMessage('');
      } else {
        setCabinetError('Неверный код подтверждения');
      }
    } catch (err) {
      setCabinetError('Ошибка входа: ' + err.message);
    } finally {
      setCabinetLoginLoading(false);
    }
  };

  // CRM Auth & Actions
  const handleCrmLogin = () => {
    const adminUser = import.meta.env.VITE_ADMIN_USERNAME || 'ssharonovv';
    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD || 'ArrivaAdmin26!#';

    if (crmUsername === adminUser && crmPassword === adminPass) {
      setCrmLoggedIn(true);
      setCrmError('');
    } else {
      setCrmError('Неверный логин или пароль администратора');
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const updated = await db.updateApplicationStatus(id, status);
      // Refresh local CRM data
      setCrmApplications(prev => prev.map(a => a.id === id ? updated : a));
      if (crmSelectedLead && crmSelectedLead.id === id) {
        setCrmSelectedLead(updated);
      }
    } catch (err) {
      alert('Ошибка смены статуса: ' + err.message);
    }
  };

  const toggleClientTask = (id) => {
    setClientTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // Render Page Content
  return (
    <div className="flex flex-col min-h-screen">
      {/* Dynamic Navigation Header */}
      <header className="site-header sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setView('home'); handleLogoClick(); }}>
            <img 
              src="/logo.jpg" 
              alt="ARRIVA Logo" 
              className="w-10 h-10 rounded-xl object-cover border border-gray-200"
            />
            <div>
              <span className="font-extrabold tracking-tight text-xl text-gray-900">ARRIVA</span>
              <span className="font-medium text-xs block text-gray-500 tracking-wider">LABORATORY</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-600">
            <a href="#services" className="hover:text-black transition-colors" onClick={() => setView('home')}>Услуги</a>
            <a href="#steps" className="hover:text-black transition-colors" onClick={() => setView('home')}>Как это работает</a>
            <a href="#portfolio" className="hover:text-black transition-colors" onClick={() => setView('home')}>Портфолио</a>
            <a href="#contacts" className="hover:text-black transition-colors" onClick={() => setView('home')}>Контакты</a>
            
            <span className="w-px h-4 bg-gray-200"></span>
            
            <button 
              onClick={() => setView(cabinetUser ? 'cabinet' : 'cabinet')} 
              className={`hover:text-black transition-colors ${view === 'cabinet' ? 'text-black font-semibold' : ''}`}
            >
              {cabinetUser ? 'Кабинет' : 'Войти'}
            </button>
            
            {isAdminMode && (
              <button 
                onClick={() => setView('crm')} 
                className={`hover:text-black transition-colors ${view === 'crm' ? 'text-black font-semibold' : ''}`}
              >
                CRM
              </button>
            )}

            <button 
              onClick={() => setView('quiz')} 
              className="btn btn-primary text-xs py-2 px-4 flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" /> Подобрать образ
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 flex flex-col gap-4 font-medium text-sm text-gray-700">
            <a href="#services" className="py-2 border-b border-gray-50" onClick={() => { setView('home'); setMobileMenuOpen(false); }}>Услуги</a>
            <a href="#steps" className="py-2 border-b border-gray-50" onClick={() => { setView('home'); setMobileMenuOpen(false); }}>Как это работает</a>
            <a href="#portfolio" className="py-2 border-b border-gray-50" onClick={() => { setView('home'); setMobileMenuOpen(false); }}>Портфолио</a>
            <a href="#contacts" className="py-2 border-b border-gray-50" onClick={() => { setView('home'); setMobileMenuOpen(false); }}>Контакты</a>
            
            <button onClick={() => { setView('cabinet'); setMobileMenuOpen(false); }} className="py-2 border-b border-gray-50 text-left">
              {cabinetUser ? 'Личный кабинет' : 'Личный кабинет (Войти)'}
            </button>
            {isAdminMode && (
              <button onClick={() => { setView('crm'); setMobileMenuOpen(false); }} className="py-2 border-b border-gray-50 text-left">
                CRM-Панель
              </button>
            )}
            <button onClick={() => { setView('quiz'); setMobileMenuOpen(false); }} className="btn btn-primary mt-2">
              <Sparkles className="w-4 h-4" /> Подобрать образ VTuber
            </button>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="flex-grow">
        
        {/* VIEW 1: HOME PAGE */}
        {view === 'home' && (
          <div className="animate-fade-in">
            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-gray-50 py-20 lg:py-32">
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 text-left space-y-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#9FE870]/20 border border-[#9FE870]/40 text-[#123d0c] font-semibold text-xs rounded-full uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> Лаборатория VTubing под ключ
                  </span>
                  <h1 className="text-gray-900 tracking-tight leading-[1.15] font-black text-4xl sm:text-5xl lg:text-6xl">
                    Запуск <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500">VTuber-карьеры</span> <br />
                    под ключ
                  </h1>
                  <p className="text-gray-500 text-lg md:text-xl max-w-xl">
                    От идеи персонажа до первых трансляций и дальнейшего продюсирования — всё в одной команде. Без поиска отдельных специалистов и без страха ошибиться на старте.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button onClick={() => setView('quiz')} className="btn btn-primary text-base px-8 py-4">
                      Запустить VTuber-карьеру <ArrowRight className="w-4 h-4" />
                    </button>
                    <a href="#contacts" className="btn btn-secondary text-base px-8 py-4">
                      Получить бесплатную консультацию
                    </a>
                  </div>
                </div>
                
                <div className="lg:col-span-5 relative flex justify-center items-center">
                  <div className="relative w-full max-w-[400px] h-[450px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden group">
                    <img 
                      src="/hero_vtuber.png" 
                      alt="ARRIVA VTuber Mascot" 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Dark gradient overlay for bottom text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    <div className="absolute bottom-6 left-6 right-6 bg-black/40 backdrop-blur-md rounded-2xl p-4 text-left border border-white/10 z-10">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-bold text-sm">ARRIVA Core v1.4</p>
                          <p className="text-[#9FE870] text-xs font-medium">Калибровка отслеживания: OK</p>
                        </div>
                        <div className="w-2.5 h-2.5 bg-[#9FE870] rounded-full animate-ping"></div>
                      </div>
                    </div>
                  </div>
                  {/* Floating Tech Badges */}
                  <div className="absolute -top-4 -right-2 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-50 flex items-center gap-2 text-xs font-semibold z-10">
                    <Layers className="w-4 h-4 text-purple-500" /> Live2D & 3D
                  </div>
                </div>
              </div>
            </section>

            {/* SERVICES SECTION */}
            <section id="services" className="py-24 bg-white border-t border-gray-100">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                  <h2 className="text-gray-900 font-extrabold tracking-tight">Наши услуги</h2>
                  <p className="text-gray-500 text-lg">Комплексный запуск и сопровождение на всех этапах вашей карьеры</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Card 1 */}
                  <div className="glass-card flex flex-col items-start text-left space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-lime-50 flex items-center justify-center text-[#123d0c] font-bold">
                      <Layers className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Разработка образа</h3>
                    <p className="text-sm text-gray-500">
                      Создание уникальной концепции, скетч-арт персонажа и подбор 2D/3D-модели под ваши задачи.
                    </p>
                  </div>
                  {/* Card 2 */}
                  <div className="glass-card flex flex-col items-start text-left space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-lime-50 flex items-center justify-center text-[#123d0c] font-bold">
                      <Sliders className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Настройка софта</h3>
                    <p className="text-sm text-gray-500">
                      Полная настройка трекинга лица и тела (iPhone/веб-камера), интеграция с VTube Studio, OBS и Unity.
                    </p>
                  </div>
                  {/* Card 3 */}
                  <div className="glass-card flex flex-col items-start text-left space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-lime-50 flex items-center justify-center text-[#123d0c] font-bold">
                      <Tv className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Выход на площадки</h3>
                    <p className="text-sm text-gray-500">
                      Помощь в оформлении каналов YouTube/Twitch/VK, подготовке оверлеев и запуске дебютного стрима.
                    </p>
                  </div>
                  {/* Card 4 */}
                  <div className="glass-card flex flex-col items-start text-left space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-lime-50 flex items-center justify-center text-[#123d0c] font-bold">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Продюсирование</h3>
                    <p className="text-sm text-gray-500">
                      Дальнейшее ведение канала, маркетинг, организация коллабораций и монетизация вашего контента.
                    </p>
                  </div>
                </div>

                {/* Objection Handlers Widget */}
                <div className="mt-16 bg-gray-50 rounded-3xl p-8 lg:p-12 border border-gray-100 text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">Почему это работает лучше, чем сборка самому?</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-gray-400 uppercase">Возражение</span>
                      <h4 className="text-lg font-bold text-gray-900">«Это слишком дорого»</h4>
                      <p className="text-sm text-gray-500">
                        Мы предлагаем поэтапную оплату. Начните с PNG-аватара и улучшайте его до 2D/3D по мере роста аудитории и доходов.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-gray-400 uppercase">Возражение</span>
                      <h4 className="text-lg font-bold text-gray-900">«Я запутаюсь в технике»</h4>
                      <p className="text-sm text-gray-500">
                        Вам не нужно учиться коду или риггингу. Наш специалист подключится, полностью настроит софт и научит управлять моделью за 1 вечер.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-gray-400 uppercase">Возражение</span>
                      <h4 className="text-lg font-bold text-gray-900">«Нет гарантии успеха»</h4>
                      <p className="text-sm text-gray-500">
                        Мы берем на себя всю техническую рутину и оверлеи. Вы фокусируетесь только на харизме и контенте, что увеличивает шансы на взлет на 300%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* PROCESS SECTION */}
            <section id="steps" className="py-24 bg-gray-50 border-t border-gray-100">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                  <h2 className="text-gray-900 font-extrabold tracking-tight">Как проходит запуск</h2>
                  <p className="text-gray-500 text-lg">Понятный пошаговый путь к виртуальному стримингу</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
                  {[
                    { nr: '1', title: 'Образ', desc: 'Проработка концепта и дизайна персонажа' },
                    { nr: '2', title: 'Модель', desc: 'Риггинг 2D или рендеринг 3D-модели' },
                    { nr: '3', title: 'Оборудование', desc: 'Подбор камеры, микрофона и ПК' },
                    { nr: '4', title: 'Настройка ПО', desc: 'Калибровка трекинга, настройка OBS' },
                    { nr: '5', title: 'Выход на сцену', desc: 'Первые стримы и оформление каналов' },
                    { nr: '6', title: 'Рост', desc: 'Продюсирование и ведение канала' },
                  ].map((step, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col justify-between text-left shadow-sm">
                      <span className="w-8 h-8 rounded-lg bg-[#9FE870]/20 flex items-center justify-center font-bold text-[#123d0c] text-sm mb-4">
                        {step.nr}
                      </span>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{step.title}</h4>
                        <p className="text-xs text-gray-400">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* PORTFOLIO SECTION */}
            <section id="portfolio" className="py-24 bg-white border-t border-gray-100">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                  <h2 className="text-gray-900 font-extrabold tracking-tight">Наши кейсы</h2>
                  <p className="text-gray-500 text-lg">Созданные нами персонажи и их успехи</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Case 1 */}
                  <div className="bg-gray-50 border border-gray-100 rounded-3xl overflow-hidden shadow-sm flex flex-col">
                    <div className="h-72 overflow-hidden relative">
                      <img src="/avatar_png.png" alt="PNG character case" className="w-full h-full object-cover" />
                      <span className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold">
                        PNG Avatar
                      </span>
                    </div>
                    <div className="p-6 text-left space-y-4 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Chibi Sakura</h3>
                        <p className="text-xs text-gray-500">Начинающий стример (16 лет). Запуск за 2 недели.</p>
                        <p className="text-sm text-gray-600 mt-2">
                          "Очень хотела попробовать стримить, но стеснялась лица. ARRIVA сделали милый чиби образ, настроили вебку. Стримы пошли!"
                        </p>
                      </div>
                      <div className="border-t border-gray-200 pt-4 flex items-center justify-between text-xs text-gray-500 font-medium">
                        <span>Дебют: Май 2026</span>
                        <span className="text-[#123d0c] font-bold bg-[#9FE870]/20 px-2 py-0.5 rounded">12K Subs</span>
                      </div>
                    </div>
                  </div>
                  {/* Case 2 */}
                  <div className="bg-gray-50 border border-gray-100 rounded-3xl overflow-hidden shadow-sm flex flex-col">
                    <div className="h-72 overflow-hidden relative">
                      <img src="/avatar_2d.png" alt="2D Live2D character case" className="w-full h-full object-cover" />
                      <span className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold">
                        2D Live2D
                      </span>
                    </div>
                    <div className="p-6 text-left space-y-4 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Cyber Koko</h3>
                        <p className="text-xs text-gray-500">Стример разговорного жанра (22 года). Запуск за 4 недели.</p>
                        <p className="text-sm text-gray-600 mt-2">
                          "Риггинг высшего класса! Движения губ, моргание, наклоны головы отслеживаются идеально через камеру телефона."
                        </p>
                      </div>
                      <div className="border-t border-gray-200 pt-4 flex items-center justify-between text-xs text-gray-500 font-medium">
                        <span>Дебют: Апрель 2026</span>
                        <span className="text-[#123d0c] font-bold bg-[#9FE870]/20 px-2 py-0.5 rounded">48K Subs</span>
                      </div>
                    </div>
                  </div>
                  {/* Case 3 */}
                  <div className="bg-gray-50 border border-gray-100 rounded-3xl overflow-hidden shadow-sm flex flex-col">
                    <div className="h-72 overflow-hidden relative">
                      <img src="/avatar_3d.png" alt="3D character case" className="w-full h-full object-cover" />
                      <span className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold">
                        3D VR Model
                      </span>
                    </div>
                    <div className="p-6 text-left space-y-4 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Vulkan Mech</h3>
                        <p className="text-xs text-gray-500">Игровой блогер (29 лет). Запуск за 8 недель.</p>
                        <p className="text-sm text-gray-600 mt-2">
                          "Намного удобнее вебки. Сделали полную 3D-модель под Unity с трекингом тела. Стримы выглядят как дорогой продакшн."
                        </p>
                      </div>
                      <div className="border-t border-gray-200 pt-4 flex items-center justify-between text-xs text-gray-500 font-medium">
                        <span>Дебют: Июнь 2026</span>
                        <span className="text-[#123d0c] font-bold bg-[#9FE870]/20 px-2 py-0.5 rounded">120K Subs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-24 bg-gray-50 border-t border-gray-100">
              <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12 space-y-4">
                  <h2 className="text-gray-900 font-extrabold tracking-tight">Часто задаваемые вопросы</h2>
                  <p className="text-gray-500 text-lg">Быстрые ответы на популярные вопросы о VTubing</p>
                </div>

                <div className="space-y-4 text-left">
                  {[
                    { q: 'Какой аватар выбрать — PNG, Live2D или 3D?', a: 'PNG-аватар — самый простой статичный вариант для быстрого теста. Live2D — плоская аниме-модель с плавными анимациями лица и наклонов (оптимально для 80% стримеров). 3D — полноценная трехмерная модель с отслеживанием жестов рук и тела (для продвинутых шоу).' },
                    { q: 'Какое оборудование мне понадобится?', a: 'Минимально: средний игровой ПК, хорошая веб-камера (или современный iPhone с поддержкой Face ID для идеального считывания лица) и студийный микрофон. Мы подберем точный комплект под ваш бюджет.' },
                    { q: 'Можно ли сохранить полную анонимность?', a: 'Да, в этом главная суть VTuber-формата! Вы скрываете лицо за аватаром, можете изменять голос с помощью программ и использовать виртуальный задний фон.' },
                    { q: 'На каких площадках можно стримить?', a: 'Мы настраиваем вещание на любые популярные площадки: YouTube, Twitch, VK Play Live, Kick или TikTok.' },
                    { q: 'Сколько времени занимает весь запуск?', a: 'От 2 недель для простых PNG/2D моделей до 1.5–2 месяцев для сложных кастомных 3D-образов с глубокой интеграцией.' },
                  ].map((faq, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                      <button 
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-gray-900 focus:outline-none"
                      >
                        <span>{faq.q}</span>
                        {activeFaq === idx ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                      </button>
                      {activeFaq === idx && (
                        <div className="px-6 pb-5 text-gray-500 text-sm border-t border-gray-50 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CONTACTS FORM SECTION */}
            <section id="contacts" className="py-24 bg-white border-t border-gray-100">
              <div className="max-w-3xl mx-auto px-6">
                <div className="bg-gray-900 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
                  {/* Decorative glowing green blob */}
                  <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#9FE870]/20 rounded-full blur-3xl"></div>
                  
                  {!contactSubmitted ? (
                    <form onSubmit={handleContactSubmit} className="space-y-6 relative">
                      <div className="space-y-2">
                        <span className="text-[#9FE870] font-bold text-xs uppercase tracking-widest">Бесплатная консультация</span>
                        <h2 className="text-white text-3xl font-extrabold tracking-tight">Запустить VTuber-карьеру под ключ</h2>
                        <p className="text-gray-400 text-sm max-w-md mx-auto">
                          Оставьте свои контакты, и наш специалист свяжется с вами для подбора концепта и обсуждения деталей проекта.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="form-group">
                          <label className="text-gray-300 text-xs font-semibold uppercase">Ваше Имя</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Иван Иванов" 
                            value={contactName} 
                            onChange={(e) => setContactName(e.target.value)}
                            className="form-control bg-white/5 border-white/10 text-white focus:border-[#9FE870] placeholder-gray-500"
                          />
                        </div>
                        <div className="form-group">
                          <label className="text-gray-300 text-xs font-semibold uppercase">Telegram Username или ID</label>
                          <input 
                            type="text" 
                            required
                            placeholder="@arriva_lab" 
                            value={contactTelegram} 
                            onChange={(e) => setContactTelegram(e.target.value)}
                            className="form-control bg-white/5 border-white/10 text-white focus:border-[#9FE870] placeholder-gray-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="form-group">
                          <label className="text-gray-300 text-xs font-semibold uppercase">Дата старта (желаемая)</label>
                          <input 
                            type="date" 
                            value={contactDate} 
                            onChange={(e) => setContactDate(e.target.value)}
                            className="form-control bg-white/5 border-white/10 text-white focus:border-[#9FE870] text-gray-400"
                          />
                        </div>
                        <div className="form-group">
                          <label className="text-gray-300 text-xs font-semibold uppercase">Какая модель интересует?</label>
                          <select 
                            value={contactAbout}
                            onChange={(e) => setContactAbout(e.target.value)}
                            className="form-control bg-white/5 border-white/10 text-white focus:border-[#9FE870]"
                          >
                            <option value="" className="bg-gray-900 text-white">Выберите вариант...</option>
                            <option value="PNG аватар" className="bg-gray-900 text-white">PNG-аватар (бюджетный)</option>
                            <option value="2D Live2D модель" className="bg-gray-900 text-white">2D Live2D (оптимальный)</option>
                            <option value="3D VR модель" className="bg-gray-900 text-white">3D VR (премиум)</option>
                          </select>
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        disabled={contactLoading}
                        className="btn btn-primary w-full py-4 text-base flex justify-center gap-2"
                      >
                        {contactLoading ? 'Отправка...' : 'Отправить заявку'} <Send className="w-4 h-4" />
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-6 py-12 relative flex flex-col items-center">
                      <div className="w-16 h-16 bg-[#9FE870]/20 rounded-full flex items-center justify-center text-[#9FE870] border border-[#9FE870]/40 pulse-badge mb-4">
                        <CheckCircle className="w-10 h-10" />
                      </div>
                      <h2 className="text-white text-3xl font-extrabold tracking-tight">Заявка принята!</h2>
                      <p className="text-gray-400 text-base max-w-md mx-auto">
                        Мы получили вашу информацию и уже подбираем концепты. Наш менеджер свяжется с вами в Telegram в течение 30 минут.
                      </p>
                      <button 
                        onClick={() => { setContactSubmitted(false); setContactName(''); setContactTelegram(''); }}
                        className="btn btn-secondary border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                      >
                        Отправить еще одну заявку
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: INTERACTIVE QUIZ */}
        {view === 'quiz' && (
          <div className="animate-fade-in py-16 px-6 max-w-2xl mx-auto">
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-xl text-left space-y-8">
              
              {/* Header with progress */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-semibold text-gray-400">
                  <span>Шаг {Math.min(quizStep + 1, 4)} из 4</span>
                  <span>{quizStep * 25}% завершено</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#9FE870] transition-all duration-300" style={{ width: `${(quizStep) * 25}%` }}></div>
                </div>
              </div>

              {quizStep === 0 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-extrabold text-gray-900">1. Какой у вас планируемый бюджет на запуск?</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <button 
                      onClick={() => handleQuizAnswer('budget', 'low')} 
                      className="p-5 border border-gray-150 rounded-2xl text-left hover:border-[#9FE870] hover:bg-lime-50/20 transition-all flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-gray-900 block">Минимальный (до 20 000 руб.)</span>
                        <span className="text-xs text-gray-500">Хочу попробовать формат стриминга с минимальными вложениями</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                    <button 
                      onClick={() => handleQuizAnswer('budget', 'medium')} 
                      className="p-5 border border-gray-155 rounded-2xl text-left hover:border-[#9FE870] hover:bg-lime-50/20 transition-all flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-gray-900 block">Средний (до 60 000 руб.)</span>
                        <span className="text-xs text-gray-500">Настроен на качественную Live2D анимацию лица и хороший звук</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                    <button 
                      onClick={() => handleQuizAnswer('budget', 'high')} 
                      className="p-5 border border-gray-155 rounded-2xl text-left hover:border-[#9FE870] hover:bg-lime-50/20 transition-all flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-gray-900 block">Премиальный (60 000+ руб.)</span>
                        <span className="text-xs text-gray-500">Интересует полноценная 3D-модель с трекингом тела и рук</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              )}

              {quizStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-extrabold text-gray-900">2. Есть ли у вас опыт ведения стримов или блогов?</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <button 
                      onClick={() => handleQuizAnswer('exp', 'none')} 
                      className="p-5 border border-gray-150 rounded-2xl text-left hover:border-[#9FE870] hover:bg-lime-50/20 transition-all flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-gray-900 block">Нет опыта</span>
                        <span className="text-xs text-gray-500">Начинаю абсолютно с нуля, не знаю как настраивать софт</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                    <button 
                      onClick={() => handleQuizAnswer('exp', 'some')} 
                      className="p-5 border border-gray-150 rounded-2xl text-left hover:border-[#9FE870] hover:bg-lime-50/20 transition-all flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-gray-900 block">Есть небольшой опыт</span>
                        <span className="text-xs text-gray-500">Стримил с вебкамерой, знаком с OBS Studio</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                    <button 
                      onClick={() => handleQuizAnswer('exp', 'pro')} 
                      className="p-5 border border-gray-150 rounded-2xl text-left hover:border-[#9FE870] hover:bg-lime-50/20 transition-all flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-gray-900 block">Профессиональный блогер</span>
                        <span className="text-xs text-gray-500">Имею базу подписчиков, перехожу в VTuber формат ради анонимности/образа</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              )}

              {quizStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-extrabold text-gray-900">3. Какова ваша главная цель при запуске?</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <button 
                      onClick={() => handleQuizAnswer('goal', 'test')} 
                      className="p-5 border border-gray-150 rounded-2xl text-left hover:border-[#9FE870] hover:bg-lime-50/20 transition-all flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-gray-900 block">Протестировать формат</span>
                        <span className="text-xs text-gray-500">Хочу понять, нравится ли мне стримить за виртуальным аватаром</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                    <button 
                      onClick={() => handleQuizAnswer('goal', 'career')} 
                      className="p-5 border border-gray-150 rounded-2xl text-left hover:border-[#9FE870] hover:bg-lime-50/20 transition-all flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-gray-900 block">Построить карьеру и бренд</span>
                        <span className="text-xs text-gray-500">Планирую стать топ-витубером, настроен на долгую работу и монетизацию</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              )}

              {quizStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-extrabold text-gray-900">4. Какое оборудование у вас сейчас есть?</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <button 
                      onClick={() => handleQuizAnswer('hardware', 'basic')} 
                      className="p-5 border border-gray-150 rounded-2xl text-left hover:border-[#9FE870] hover:bg-lime-50/20 transition-all flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-gray-900 block">Обычный ПК + вебкамера</span>
                        <span className="text-xs text-gray-500">Простая конфигурация без отдельного оборудования для трекинга</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                    <button 
                      onClick={() => handleQuizAnswer('hardware', 'iphone')} 
                      className="p-5 border border-gray-150 rounded-2xl text-left hover:border-[#9FE870] hover:bg-lime-50/20 transition-all flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-gray-900 block">Игровой ПК + iPhone (X или новее)</span>
                        <span className="text-xs text-gray-500">Идеально подходит для профессионального трекинга лица (ARKit)</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              )}

              {quizStep === 4 && quizResult && (
                <div className="space-y-6 animate-fade-in text-center py-6">
                  <div className="w-20 h-20 bg-lime-50 rounded-full flex items-center justify-center text-[#123d0c] font-bold text-2xl mx-auto pulse-badge">
                    🎉
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-gray-400 uppercase">Рекомендуемый образ</span>
                    <h3 className="text-3xl font-extrabold text-gray-900">
                      {quizResult === '3d' ? '3D VR-Аватар (Премиум)' : quizResult === '2d' ? '2D Live2D (Оптимальный)' : 'PNG-Аватар (Бюджетный)'}
                    </h3>
                    <p className="text-sm text-gray-500 max-w-md mx-auto">
                      На основе ваших ответов мы подобрали идеальную конфигурацию для быстрого и эффективного старта.
                    </p>
                  </div>

                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-left space-y-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={quizResult === '3d' ? '/avatar_3d.png' : quizResult === '2d' ? '/avatar_2d.png' : '/avatar_png.png'} 
                        alt="Result Preview" 
                        className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                      />
                      <div>
                        <span className="text-xs font-bold text-[#123d0c] bg-[#9FE870]/20 px-2 py-0.5 rounded uppercase">Рекомендация</span>
                        <h4 className="font-bold text-gray-900 mt-1">Пакет «Запуск под ключ»</h4>
                        <p className="text-xs text-gray-500">{quizResult === '3d' ? '99 000 руб.' : quizResult === '2d' ? '49 000' : '19 000'} руб.</p>
                      </div>
                    </div>
                    <ul className="text-xs text-gray-500 space-y-2 border-t border-gray-200 pt-4">
                      <li className="flex items-center gap-2">✓ Создание образа персонажа с нуля</li>
                      <li className="flex items-center gap-2">✓ Настройка {quizResult.toUpperCase()} трекинга и интеграции софта</li>
                      <li className="flex items-center gap-2">✓ 3 часа техподдержки на тестовых трансляциях</li>
                      <li className="flex items-center gap-2">✓ Полное сопровождение на первом стриме</li>
                    </ul>
                  </div>

                  {/* Submit result section & redirect to dashboard */}
                  <div className="space-y-4 pt-4 border-t border-gray-100 text-left">
                    <h4 className="font-bold text-gray-900 text-base">Сохранить результат и войти в кабинет:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="text-xs font-bold uppercase text-gray-500">Ваше Имя</label>
                        <input 
                          type="text" 
                          id="quizLeadName"
                          placeholder="Анна Ковалева" 
                          className="form-control placeholder-gray-400"
                        />
                      </div>
                      <div className="form-group">
                        <label className="text-xs font-bold uppercase text-gray-500">Ваш Telegram ID или Username</label>
                        <input 
                          type="text" 
                          id="quizLeadTelegram"
                          placeholder="@anya_vt" 
                          className="form-control placeholder-gray-400"
                        />
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => {
                        const nameEl = document.getElementById('quizLeadName');
                        const tgEl = document.getElementById('quizLeadTelegram');
                        if (nameEl && tgEl && nameEl.value && tgEl.value) {
                          submitQuizLead(nameEl.value, tgEl.value);
                        } else {
                          alert('Пожалуйста, заполните форму для входа в кабинет');
                        }
                      }}
                      className="btn btn-primary w-full py-4 text-base flex justify-center items-center gap-2"
                    >
                      Сохранить и войти в кабинет <ArrowRight className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => { setQuizStep(0); setQuizAnswers({}); setQuizResult(null); }} 
                      className="btn btn-secondary w-full py-3 text-sm"
                    >
                      Пройти квиз заново
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 3: CLIENT CABINET (PERSONAL DASHBOARD) */}
        {view === 'cabinet' && (
          <div className="animate-fade-in max-w-7xl mx-auto px-6 py-12">
            {!cabinetUser ? (
              // Login screen
              <div className="max-w-md mx-auto bg-white border border-gray-100 rounded-3xl p-8 shadow-xl text-left space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-lime-50 rounded-2xl flex items-center justify-center text-[#123d0c] font-bold text-xl mx-auto">
                    <User className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900">Вход в Личный кабинет</h3>
                  <p className="text-xs text-gray-500">Вход по коду подтверждения Telegram для безопасности</p>
                </div>

                {cabinetError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3 rounded-xl font-medium">
                    {cabinetError}
                  </div>
                )}
                {cabinetSuccessMessage && (
                  <div className="bg-lime-50 border border-lime-200 text-[#123d0c] text-xs px-4 py-3 rounded-xl font-medium">
                    {cabinetSuccessMessage}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="form-group">
                    <label className="text-xs font-bold uppercase text-gray-500">Telegram Username или ID</label>
                    <input 
                      type="text" 
                      placeholder="@arriva_lab" 
                      disabled={cabinetCodeSent}
                      value={cabinetTelegramInput}
                      onChange={(e) => setCabinetTelegramInput(e.target.value)}
                      className="form-control placeholder-gray-400"
                    />
                  </div>

                  {cabinetCodeSent && (
                    <div className="form-group">
                      <label className="text-xs font-bold uppercase text-gray-500">Код подтверждения из Telegram</label>
                      <input 
                        type="text" 
                        placeholder="123456" 
                        value={cabinetCodeInput}
                        onChange={(e) => setCabinetCodeInput(e.target.value)}
                        className="form-control placeholder-gray-400"
                      />
                    </div>
                  )}

                  {!cabinetCodeSent ? (
                    <button 
                      onClick={handleRequestCabinetCode}
                      disabled={cabinetCodeLoading}
                      className="btn btn-primary w-full py-4 text-sm"
                    >
                      {cabinetCodeLoading ? 'Отправка...' : 'Получить код'}
                    </button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={handleCabinetLogin}
                        disabled={cabinetLoginLoading}
                        className="btn btn-primary w-full py-4 text-sm"
                      >
                        {cabinetLoginLoading ? 'Вход...' : 'Войти'}
                      </button>
                      <button 
                        onClick={() => { setCabinetCodeSent(false); setCabinetSuccessMessage(''); }}
                        className="btn btn-secondary w-full py-2 text-xs"
                      >
                        Сбросить
                      </button>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-4 text-center">
                  <p className="text-[11px] text-gray-400">
                    *Если вы еще не отправляли заявку или не проходили квиз, вход автоматически зарегистрирует вас в системе.
                  </p>
                </div>
              </div>
            ) : (
              // Actual Dashboard
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                {/* Left Sidebar */}
                <div className="lg:col-span-3 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-8 flex flex-col justify-between">
                  <div className="space-y-6">
                    {/* User profile brief */}
                    <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
                      <div className="w-10 h-10 bg-lime-50 rounded-xl flex items-center justify-center font-bold text-[#123d0c]">
                        {cabinetUser.first_name ? cabinetUser.first_name[0].toUpperCase() : 'U'}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{cabinetUser.first_name || 'Клиент'}</h4>
                        <span className="text-xs text-gray-400">{cabinetUser.username || `@id_${cabinetUser.telegram_id}`}</span>
                      </div>
                    </div>

                    {/* Navigation Tabs */}
                    <nav className="flex flex-col gap-1.5 font-medium text-sm">
                      <button 
                        onClick={() => setCabinetActiveTab('project')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${cabinetActiveTab === 'project' ? 'bg-[#9FE870]/20 text-[#123d0c] font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
                      >
                        <Layers className="w-4 h-4" /> Проект запуска
                      </button>
                      <button 
                        onClick={() => setCabinetActiveTab('guide')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${cabinetActiveTab === 'guide' ? 'bg-[#9FE870]/20 text-[#123d0c] font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
                      >
                        <Shield className="w-4 h-4" /> База знаний
                      </button>
                      <button 
                        onClick={() => setCabinetActiveTab('analytics')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${cabinetActiveTab === 'analytics' ? 'bg-[#9FE870]/20 text-[#123d0c] font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
                      >
                        <Activity className="w-4 h-4" /> Аналитика канала
                      </button>
                    </nav>
                  </div>

                  {/* Logout Button */}
                  <button 
                    onClick={() => setCabinetUser(null)}
                    className="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-700 px-4 py-2 hover:bg-red-50 rounded-xl"
                  >
                    <LogOut className="w-4 h-4" /> Выйти из кабинета
                  </button>
                </div>

                {/* Right Content Area */}
                <div className="lg:col-span-9 space-y-6">
                  
                  {/* TAB 1: PROJECT TRACKER */}
                  {cabinetActiveTab === 'project' && (
                    <div className="space-y-6">
                      {/* Active Status Banner */}
                      <div className="bg-gray-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#9FE870]/10 rounded-full blur-2xl"></div>
                        <div className="space-y-2">
                          <span className="text-xs font-semibold text-[#9FE870] uppercase tracking-wider">Текущий статус</span>
                          <h3 className="text-2xl font-extrabold tracking-tight">Подготовка VTuber-образа</h3>
                          <p className="text-xs text-gray-400">Команда работает над слоями Live2D-арта. Готовность ~75%</p>
                        </div>
                        <div className="px-5 py-2.5 bg-white/10 border border-white/20 rounded-2xl flex items-center gap-3">
                          <div className="w-3 h-3 bg-[#9FE870] rounded-full animate-pulse"></div>
                          <span className="text-xs font-bold">В РАБОТЕ</span>
                        </div>
                      </div>

                      {/* Checklist & details grid */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        
                        {/* Checklist Widget */}
                        <div className="md:col-span-7 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6">
                          <h4 className="font-bold text-gray-900 text-lg">Чек-лист подготовки</h4>
                          <div className="space-y-3">
                            {clientTasks.map(task => (
                              <button 
                                key={task.id}
                                onClick={() => toggleClientTask(task.id)}
                                className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100/60 rounded-2xl border border-gray-100 text-left transition-colors"
                              >
                                <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${task.completed ? 'bg-[#9FE870] border-[#9FE870] text-[#123d0c]' : 'border-gray-300'}`}>
                                  {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>
                                <span className={`text-xs font-medium text-gray-700 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                                  {task.text}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Order info and technician brief */}
                        <div className="md:col-span-5 flex flex-col gap-6">
                          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
                            <h4 className="font-bold text-gray-900 text-base">Куратор проекта</h4>
                            <div className="flex items-center gap-3">
                              <div className="w-11 h-11 bg-lime-50 rounded-xl flex items-center justify-center font-bold text-green-700">
                                ML
                              </div>
                              <div>
                                <h5 className="font-bold text-sm text-gray-800">Максим Леонов</h5>
                                <p className="text-[11px] text-gray-400">Ведущий техник ARRIVA lab</p>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500">
                              Максим подключится к вам в Discord для настройки ПО и iPhone-трекинга, как только арт-директор согласует финальную модель.
                            </p>
                          </div>

                          <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 space-y-2">
                            <h5 className="text-xs font-semibold text-gray-400 uppercase">Пакет услуг</h5>
                            <h4 className="font-bold text-gray-950">Запуск VTuber под ключ (2D)</h4>
                            <p className="text-[11px] text-gray-500">
                              Включает в себя разработку 2D-образа, настройку трекинга, оверлеи и 3 часа сопровождения.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: GUIDE DATABASE */}
                  {cabinetActiveTab === 'guide' && (
                    <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                      <h3 className="text-xl font-bold text-gray-900">Инструкции по настройке и стримингу</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-5 border border-gray-100 rounded-2xl hover:border-gray-300 transition-colors space-y-2">
                          <h4 className="font-bold text-sm text-gray-900">1. Подготовка VTube Studio на iPhone</h4>
                          <p className="text-xs text-gray-500">
                            Как включить калибровку ARKit, подключить телефон по Wi-Fi к компьютеру и настроить идеальную частоту кадров (60 FPS) без нагрева батареи.
                          </p>
                        </div>
                        <div className="p-5 border border-gray-100 rounded-2xl hover:border-gray-300 transition-colors space-y-2">
                          <h4 className="font-bold text-sm text-gray-900">2. Настройка сцены в OBS Studio</h4>
                          <p className="text-xs text-gray-500">
                            Добавление прозрачного окна VTube Studio, настройка цветового ключа, интеграция игрового захвата и выравнивание оверлеев.
                          </p>
                        </div>
                        <div className="p-5 border border-gray-100 rounded-2xl hover:border-gray-300 transition-colors space-y-2">
                          <h4 className="font-bold text-sm text-gray-900">3. Правила сохранения анонимности</h4>
                          <p className="text-xs text-gray-500">
                            Как не спалить свое лицо при включении веб-камеры, как настроить фильтр шума микрофона и изменить голос на трансляции без задержки.
                          </p>
                        </div>
                        <div className="p-5 border border-gray-100 rounded-2xl hover:border-gray-300 transition-colors space-y-2">
                          <h4 className="font-bold text-sm text-gray-900">4. Идеи для первого дебютного стрима</h4>
                          <p className="text-xs text-gray-500">
                            Как написать сценарий дебюта, какие факты о себе рассказать виртуальному персонажу и как организовать интерактив с чатом.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: MOCK ANALYTICS */}
                  {cabinetActiveTab === 'analytics' && (
                    <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-900">Статистика канала (Тест)</h3>
                        <span className="text-[11px] text-gray-400 bg-gray-50 px-2 py-1 rounded">Обновлено: только что</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                          <span className="text-[10px] font-semibold text-gray-400 uppercase">Просмотры</span>
                          <h4 className="text-2xl font-bold text-gray-900 mt-1">4.2K</h4>
                          <span className="text-xs text-green-600 font-semibold">+18% к прошлому стриму</span>
                        </div>
                        <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                          <span className="text-[10px] font-semibold text-gray-400 uppercase">Фолловеры</span>
                          <h4 className="text-2xl font-bold text-gray-900 mt-1">295</h4>
                          <span className="text-xs text-green-600 font-semibold">+42 новых автора</span>
                        </div>
                        <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                          <span className="text-[10px] font-semibold text-gray-400 uppercase">Макс. онлайн</span>
                          <h4 className="text-2xl font-bold text-gray-900 mt-1">48</h4>
                          <span className="text-xs text-red-500 font-semibold">-5% удержание аудитории</span>
                        </div>
                      </div>

                      {/* Mock SVG Analytics Chart */}
                      <div className="border border-gray-100 rounded-2xl p-6 space-y-2">
                        <h4 className="font-bold text-sm text-gray-900">График онлайна (последние 7 стримов)</h4>
                        <div className="w-full h-48 bg-gray-50 rounded-xl flex items-end justify-between p-4 pt-8 relative">
                          <svg className="absolute inset-0 w-full h-full p-4 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path 
                              d="M 0 90 Q 15 70, 30 50 T 60 40 T 90 20 L 100 20 L 100 100 L 0 100 Z" 
                              fill="rgba(159, 232, 112, 0.15)"
                            />
                            <path 
                              d="M 0 90 Q 15 70, 30 50 T 60 40 T 90 20" 
                              fill="none" 
                              stroke="#9FE870" 
                              strokeWidth="2" 
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>
                          {[12, 18, 25, 30, 28, 42, 48].map((val, idx) => (
                            <div key={idx} className="flex flex-col items-center z-10">
                              <span className="text-[9px] font-bold text-gray-700 bg-white px-1 py-0.5 rounded shadow-sm border border-gray-100 mb-1">{val}</span>
                              <span className="text-[10px] text-gray-400">Стр.{idx+1}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: ADMIN CRM PANEL */}
        {view === 'crm' && (
          <div className="animate-fade-in py-12 px-6 max-w-7xl mx-auto">
            {!crmLoggedIn ? (
              // CRM login panel
              <div className="max-w-md mx-auto bg-white border border-gray-100 rounded-3xl p-8 shadow-xl text-left space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-[#9FE870] font-bold text-xl mx-auto">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900">CRM Панель Управления</h3>
                  <p className="text-xs text-gray-500">Введите пароль администратора для управления лидами</p>
                </div>

                {crmError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3 rounded-xl font-medium">
                    {crmError}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="form-group">
                    <label className="text-xs font-bold uppercase text-gray-500">Логин Администратора</label>
                    <input 
                      type="text" 
                      placeholder="Username" 
                      value={crmUsername}
                      onChange={(e) => setCrmUsername(e.target.value)}
                      className="form-control mt-1"
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-xs font-bold uppercase text-gray-500">Пароль</label>
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={crmPassword}
                      onChange={(e) => setCrmPassword(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleCrmLogin()}
                      className="form-control mt-1"
                    />
                  </div>

                  <button onClick={handleCrmLogin} className="btn btn-dark w-full py-4 text-sm mt-2">
                    Авторизоваться
                  </button>
                </div>
              </div>
            ) : (
              // CRM Workspace
              <div className="bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden text-left flex flex-col lg:flex-row min-h-[600px] relative">
                
                {/* Admin Left Sidebar */}
                <div className="lg:w-64 bg-gray-950 text-white p-6 space-y-8 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#9FE870] rounded-lg text-black font-extrabold flex items-center justify-center text-sm">
                        CRM
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm tracking-tight text-white">ARRIVA Admin</h4>
                        <span className="text-[10px] text-gray-400 font-semibold uppercase">Менеджер Лидов</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-gray-500 uppercase block tracking-wider">База Данных</span>
                      <div className="text-sm font-semibold text-[#9FE870] bg-white/5 border border-white/10 px-3 py-2 rounded-xl flex justify-between items-center">
                        <span>Supabase</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => { setCrmLoggedIn(false); setCrmUsername(''); setCrmPassword(''); }}
                    className="flex items-center gap-2 text-xs font-bold text-red-400 hover:text-red-300 px-3 py-2 hover:bg-white/5 rounded-xl text-left"
                  >
                    <LogOut className="w-4 h-4" /> Выйти
                  </button>
                </div>

                {/* Main CRM Workspace (Table / leads) */}
                <div className="flex-grow p-6 sm:p-8 space-y-6 relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-2xl font-black text-gray-950">Заявки в Агентство</h3>
                    
                    {/* Search & Filters */}
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                      <div className="relative flex-grow sm:flex-grow-0">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                        <input 
                          type="text" 
                          placeholder="Поиск по имени..." 
                          value={crmSearch}
                          onChange={(e) => setCrmSearch(e.target.value)}
                          className="form-control pl-10 py-2.5 text-xs rounded-xl"
                        />
                      </div>
                      <select 
                        value={crmFilterStatus}
                        onChange={(e) => setCrmFilterStatus(e.target.value)}
                        className="form-control py-2.5 text-xs rounded-xl w-32"
                      >
                        <option value="all">Все статусы</option>
                        <option value="pending">Ожидающие</option>
                        <option value="approved">Одобренные</option>
                        <option value="rejected">Отклоненные</option>
                      </select>
                    </div>
                  </div>

                  {crmLoading ? (
                    <div className="py-20 text-center text-gray-400 font-medium">Загрузка данных из Supabase...</div>
                  ) : (
                    <div className="border border-gray-100 rounded-2xl overflow-x-auto shadow-sm">
                      <table className="crm-table">
                        <thead className="bg-gray-50 border-b border-gray-100">
                          <tr>
                            <th className="text-[10px] text-gray-500 font-bold px-5 py-4">Клиент</th>
                            <th className="text-[10px] text-gray-500 font-bold px-5 py-4">Telegram</th>
                            <th className="text-[10px] text-gray-500 font-bold px-5 py-4">Дата / Желаемый Старт</th>
                            <th className="text-[10px] text-gray-500 font-bold px-5 py-4">Статус</th>
                          </tr>
                        </thead>
                        <tbody>
                          {crmApplications
                            .filter(app => {
                              const matchesSearch = app.full_name.toLowerCase().includes(crmSearch.toLowerCase());
                              const matchesStatus = crmFilterStatus === 'all' || app.status === crmFilterStatus;
                              return matchesSearch && matchesStatus;
                            })
                            .map((app) => (
                              <tr 
                                key={app.id} 
                                onClick={() => setCrmSelectedLead(app)}
                                className="cursor-pointer hover:bg-gray-50 transition-colors"
                              >
                                <td className="px-5 py-4 font-bold text-gray-900 text-sm">
                                  {app.full_name}
                                </td>
                                <td className="px-5 py-4 text-xs font-semibold text-gray-500">
                                  {app.telegram_id ? `@user_${app.telegram_id}` : 'Не указан'}
                                </td>
                                <td className="px-5 py-4 text-xs text-gray-500">
                                  {app.birth_date || app.submitted_at?.split('T')[0]}
                                </td>
                                <td className="px-5 py-4">
                                  <span className={`badge uppercase text-[9px] font-bold ${app.status === 'approved' ? 'badge-approved' : app.status === 'rejected' ? 'badge-error' : 'badge-pending'}`}>
                                    {app.status === 'approved' ? 'Одобрено' : app.status === 'rejected' ? 'Отклонено' : 'В обработке'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Right Detail Drawer */}
                  {crmSelectedLead && (
                    <div className="absolute inset-0 z-40 flex justify-end">
                      {/* Dark overlay backdrop */}
                      <div 
                        onClick={() => setCrmSelectedLead(null)}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                      ></div>
                      
                      {/* Drawer Panel */}
                      <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-6 sm:p-8 flex flex-col justify-between border-l border-gray-100 z-50 animate-fade-in">
                        <div className="space-y-6">
                          <div className="flex justify-between items-center">
                            <h4 className="text-lg font-black text-gray-950">Детали заявки</h4>
                            <button onClick={() => setCrmSelectedLead(null)} className="p-1 rounded-lg hover:bg-gray-100">
                              <X className="w-5 h-5 text-gray-500" />
                            </button>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <span className="text-[10px] font-bold uppercase text-gray-400">ФИО клиента</span>
                              <p className="text-base font-bold text-gray-900">{crmSelectedLead.full_name}</p>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold uppercase text-gray-400">Telegram ID / Аккаунт</span>
                              <p className="text-sm font-semibold text-gray-600">ID: {crmSelectedLead.telegram_id}</p>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold uppercase text-gray-400">Дата отправки</span>
                              <p className="text-sm text-gray-600">{crmSelectedLead.submitted_at?.split('T')[0] || crmSelectedLead.birth_date}</p>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold uppercase text-gray-400">Описание / Пожелания</span>
                              <p className="text-xs bg-gray-50 p-4 border border-gray-100 rounded-xl text-gray-600 line-height-1.5 whitespace-pre-line">
                                {crmSelectedLead.about || 'Комментарии отсутствуют.'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Action buttons inside drawer */}
                        <div className="space-y-3 pt-6 border-t border-gray-100">
                          <div className="flex gap-3">
                            <button 
                              onClick={() => handleUpdateStatus(crmSelectedLead.id, 'approved')}
                              className="btn btn-primary flex-grow text-xs py-3"
                            >
                              Одобрить
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(crmSelectedLead.id, 'rejected')}
                              className="btn btn-secondary border-red-200 text-red-500 hover:bg-red-50 flex-grow text-xs py-3"
                            >
                              Отклонить
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Modern Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src="/logo.jpg" 
                alt="ARRIVA Logo" 
                className="w-8 h-8 rounded-lg object-cover border border-gray-800"
              />
              <span className="font-extrabold tracking-tight text-lg text-white">ARRIVA lab</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Комплексный запуск и продюсирование виртуальных аватаров VTuber. Запустите карьеру мечты с профессиональной командой.
            </p>
          </div>
          
          <div>
            <h5 className="font-bold text-sm text-gray-200 mb-4">Навигация</h5>
            <ul className="text-xs text-gray-400 space-y-2">
              <li><a href="#services" className="hover:text-white transition-colors" onClick={() => setView('home')}>Наши Услуги</a></li>
              <li><a href="#steps" className="hover:text-white transition-colors" onClick={() => setView('home')}>Этапы запуска</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors" onClick={() => setView('home')}>Наши Кейсы</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-sm text-gray-200 mb-4">Инструменты</h5>
            <ul className="text-xs text-gray-400 space-y-2">
              <li><button onClick={() => setView('quiz')} className="hover:text-white transition-colors text-left">Пройти Квиз</button></li>
              <li><button onClick={() => setView('cabinet')} className="hover:text-white transition-colors text-left">Личный Кабинет</button></li>
              {isAdminMode && (
                <li><button onClick={() => setView('crm')} className="hover:text-white transition-colors text-left">CRM Админка</button></li>
              )}
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-sm text-gray-200 mb-4">Связь</h5>
            <ul className="text-xs text-gray-400 space-y-2">
              <li>Telegram: @arriva_lab</li>
              <li>Email: contact@arriva.lab</li>
              <li>Адрес: Санкт-Петербург, Россия</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-gray-800 mt-12 pt-6 text-center text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>&copy; {new Date().getFullYear()} ARRIVA lab. Все права защищены.</span>
          <span>Разработано с заботой о вашей анонимности.</span>
        </div>
      </footer>
    </div>
  );
}
