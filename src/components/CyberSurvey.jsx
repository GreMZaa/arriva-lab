import React, { useState } from 'react';
import { 
  Gamepad2, 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  Send, 
  ShieldAlert, 
  Lock,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CyberSurvey = ({ onSubmitApplication }) => {
  // Modal / Stepper State: null | 'gaming' | 'afterdark'
  const [activeModal, setActiveModal] = useState(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State for Gaming & Show
  const [gamingForm, setGamingForm] = useState({
    telegram: '',
    country: '',
    age: '',
    hardware: '',
    passport: 'Да, есть',
    usdtExperience: 'Да',
    threeWords: '',
    bullyingReaction: '',
    screamReady: 'Да, легко',
    englishLevel: 'Свободно шучу и импровизирую',
    preferredRole: 'Дерзкий робот-хакер',
    favoriteGenres: '',
    weeklyHours: '15-20 часов'
  });

  // Form State for After Dark 18+
  const [afterDarkForm, setAfterDarkForm] = useState({
    telegram: '',
    country: '',
    age: '',
    kycPassport: 'Да, есть',
    microphone: '',
    cryptoWallet: 'Да, есть',
    stripReady: 'Да, полностью готов(а)',
    audioSkills: 'Да, делаю это уверенно',
    comfortableArchetype: 'Властная доминантка',
    strictTaboos: '',
    voiceMessagesReady: 'Да, готов(а)',
    weeklyDays: '3-4 дня'
  });

  const handleOpenForm = (type) => {
    setActiveModal(type);
    setStep(1);
    setIsSuccess(false);
  };

  const handleClose = () => {
    setActiveModal(null);
    setStep(1);
    setIsSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isGaming = activeModal === 'gaming';
    const form = isGaming ? gamingForm : afterDarkForm;

    if (!form.telegram || !form.telegram.trim()) {
      alert('Пожалуйста, укажите ваш Telegram для связи.');
      setStep(1);
      return;
    }

    if (!form.age || Number(form.age) < (isGaming ? 16 : 18)) {
      alert(isGaming ? 'Минимальный возраст для участия — 16 лет.' : 'Строго от 18 лет!');
      setStep(1);
      return;
    }

    setIsSubmitting(true);

    try {
      const modeTitle = isGaming ? '🎮 GAMING & SHOW (Витубинг)' : '🔞 AFTER DARK 18+ (Взрослый сегмент)';
      
      const detailsList = isGaming ? [
        `Telegram: ${gamingForm.telegram}`,
        `Страна: ${gamingForm.country || 'Не указано'}`,
        `Возраст: ${gamingForm.age}`,
        `Видеокарта и микрофон: ${gamingForm.hardware || 'Не указано'}`,
        `Наличие паспорта: ${gamingForm.passport}`,
        `Опыт с USDT: ${gamingForm.usdtExperience}`,
        `О себе тремя словами: ${gamingForm.threeWords || 'Не указано'}`,
        `Реакция на буллинг в чате: ${gamingForm.bullyingReaction || 'Не указано'}`,
        `Готовность орать/эмоции: ${gamingForm.screamReady}`,
        `Разговорный английский: ${gamingForm.englishLevel}`,
        `Близкая роль: ${gamingForm.preferredRole}`,
        `Любимые игры: ${gamingForm.favoriteGenres || 'Не указано'}`,
        `Часов в неделю: ${gamingForm.weeklyHours}`
      ] : [
        `Telegram: ${afterDarkForm.telegram}`,
        `Страна: ${afterDarkForm.country || 'Не указано'}`,
        `Возраст (18+): ${afterDarkForm.age}`,
        `Паспорт для KYC 18+: ${afterDarkForm.kycPassport}`,
        `Модель микрофона: ${afterDarkForm.microphone || 'Не указано'}`,
        `Криптокошелек: ${afterDarkForm.cryptoWallet}`,
        `Раздевание 3D-модели: ${afterDarkForm.stripReady}`,
        `Шепот, стоны, интимные звуки: ${afterDarkForm.audioSkills}`,
        `Комфортный архетип: ${afterDarkForm.comfortableArchetype}`,
        `Строгие табу: ${afterDarkForm.strictTaboos || 'Не указано'}`,
        `Голосовые аудиосообщения для фанатов: ${afterDarkForm.voiceMessagesReady}`,
        `Дней в неделю в приватах: ${afterDarkForm.weeklyDays}`
      ];

      const fullWishes = `=== НАПРАВЛЕНИЕ: ${modeTitle} ===\n\n` + detailsList.join('\n');

      await onSubmitApplication({
        tab: activeModal,
        telegram: form.telegram,
        age: form.age,
        wishes: fullWishes
      });

      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });

      setIsSuccess(true);
    } catch (err) {
      alert('Ошибка при отправке анкеты: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="formats" className="py-24 bg-[#080512] border-t border-[#00F0FF]/20 relative text-left cyber-grid-container overflow-hidden">
      
      {/* Background Glowing Orbs */}
      <div className="absolute top-1/2 left-5 w-[450px] h-[450px] bg-[#00F0FF]/15 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-5 w-[450px] h-[450px] bg-[#FF0055]/15 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#140826] border border-[#00F0FF]/40 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
            <span className="w-2 h-2 rounded-full bg-[#FF0055] animate-ping"></span>
            <span className="font-mono text-xs text-white uppercase tracking-widest font-bold">
              ИНТЕРАКТИВНАЯ РАЗВИЛКА // ВЫБОР ФОРМАТА
            </span>
          </div>

          <h2 className="font-cyber text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Определи вектор продюсирования
          </h2>
          
          <p className="text-[#E2E8F0] text-base sm:text-lg">
            Выбери одно из двух ключевых направлений. Анкета откроется во всплывающем окне и займет всего 2 минуты.
          </p>
        </div>

        {/* ДВЕ КОНТРАСТНЫЕ КАРТОЧКИ-ВЫБОРА (Анкета полностью скрыта по умолчанию) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* КАРТОЧКА 1: GAMING & SHOW (Обычный витубинг) */}
          <div className="relative group rounded-3xl p-[2px] bg-gradient-to-b from-[#00F0FF] via-[#00F0FF]/40 to-[#B026FF] shadow-[0_0_35px_rgba(0,240,255,0.25)] hover:shadow-[0_0_55px_rgba(0,240,255,0.45)] transition-all">
            <div className="rounded-[22px] p-8 sm:p-10 bg-[#0E061E]/95 backdrop-blur-xl h-full flex flex-col justify-between relative overflow-hidden">
              
              {/* Corner HUD accent */}
              <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#00F0FF] pointer-events-none"></div>

              <div className="space-y-6">
                
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1.5 rounded-xl bg-[#00F0FF]/15 border border-[#00F0FF]/50 text-[#00F0FF] font-mono text-xs font-bold tracking-wider uppercase shadow-[0_0_12px_rgba(0,240,255,0.3)]">
                    Twitch & YouTube
                  </span>
                  <div className="p-2.5 rounded-xl bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                    <Gamepad2 className="w-6 h-6" />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-cyber text-2xl sm:text-3xl font-black text-white tracking-tight text-glow-cyan">
                    GAMING & SHOW
                  </h3>
                  <p className="text-xs font-mono text-[#00F0FF] mt-1 font-semibold tracking-wider">
                    Обычный стриминг без 18+ ограничений
                  </p>
                </div>

                {/* Description */}
                <p className="text-[#E2E8F0] text-sm sm:text-base leading-relaxed">
                  Стриминг игр, разговорные шоу, юмор, мемы и интерактивные реакции на донаты на Twitch и YouTube.
                </p>

                {/* Feature Bullets */}
                <div className="space-y-3 py-4 border-y border-white/10">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]"></span>
                    <span><strong>Контент:</strong> Игры, хорроры, трэш-стримы, мем-интерактив</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]"></span>
                    <span><strong>Чек:</strong> Стабильный рост за счет преданной базы фанатов</span>
                  </div>
                </div>

              </div>

              {/* Exact Uniform Neon Red Button */}
              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => handleOpenForm('gaming')}
                  className="cyber-btn-red w-full py-4 text-sm sm:text-base font-cyber tracking-wider gap-2 shadow-[0_0_25px_rgba(255,0,85,0.6)]"
                >
                  <span>ПОДАТЬ АНКЕТУ</span>
                  <ArrowRight className="w-5 h-5 text-white" />
                </button>
              </div>

            </div>
          </div>

          {/* КАРТОЧКА 2: AFTER DARK 18+ (Взрослый сегмент) */}
          <div className="relative group rounded-3xl p-[2px] bg-gradient-to-b from-[#FF0055] via-[#FF0055]/40 to-[#B026FF] shadow-[0_0_35px_rgba(255,0,85,0.25)] hover:shadow-[0_0_55px_rgba(255,0,85,0.45)] transition-all">
            <div className="rounded-[22px] p-8 sm:p-10 bg-[#0E061E]/95 backdrop-blur-xl h-full flex flex-col justify-between relative overflow-hidden">
              
              <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#FF0055] pointer-events-none"></div>

              <div className="space-y-6">
                
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1.5 rounded-xl bg-[#FF0055]/15 border border-[#FF0055]/50 text-[#FF0055] font-mono text-xs font-bold tracking-wider uppercase shadow-[0_0_12px_rgba(255,0,85,0.3)]">
                    Fansly & Private Live
                  </span>
                  <div className="p-2.5 rounded-xl bg-[#FF0055]/15 border border-[#FF0055]/40 text-[#FF0055] shadow-[0_0_15px_rgba(255,0,85,0.3)]">
                    <Flame className="w-6 h-6" />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-cyber text-2xl sm:text-3xl font-black text-white tracking-tight text-glow-magenta">
                    AFTER DARK 18+
                  </h3>
                  <p className="text-xs font-mono text-[#FF0055] mt-1 font-semibold tracking-wider">
                    Взрослый сегмент с максимальным доходом
                  </p>
                </div>

                {/* Description */}
                <p className="text-[#E2E8F0] text-sm sm:text-base leading-relaxed">
                  Закрытые трансляции на Fansly и Private Live для парней и девушек, откровенный флирт, фетиш-ролеплей, горячая озвучка и раздевание 3D-персонажа за крупные чеки.
                </p>

                {/* Feature Bullets */}
                <div className="space-y-3 py-4 border-y border-white/10">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF0055] shadow-[0_0_6px_#FF0055]"></span>
                    <span><strong>Контент:</strong> Эротический ролеплей, фетиши, раздевание модели</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF0055] shadow-[0_0_6px_#FF0055]"></span>
                    <span><strong>Чек:</strong> Максимальный доход с первых стримов в долларах/USDT</span>
                  </div>
                </div>

              </div>

              {/* Exact Uniform Neon Red Button */}
              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => handleOpenForm('afterdark')}
                  className="cyber-btn-red w-full py-4 text-sm sm:text-base font-cyber tracking-wider gap-2 shadow-[0_0_25px_rgba(255,0,85,0.6)]"
                >
                  <span>ПОДАТЬ АНКЕТУ</span>
                  <ArrowRight className="w-5 h-5 text-white" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* МОДАЛЬНОЕ ОКНО СО СТЕППЕРОМ (Плавно открывается по нажатию) */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          
          {/* Backdrop with Blur */}
          <div 
            onClick={handleClose} 
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
          ></div>

          {/* Modal Container */}
          <div className="relative w-full max-w-2xl bg-[#0E061E] border-2 border-[#00F0FF]/40 rounded-3xl p-6 sm:p-10 z-10 shadow-[0_0_60px_rgba(0,240,255,0.35)] animate-fade-in text-left">
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-[#FF0055]/30 text-white hover:text-[#FF0055] border border-white/15 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Success State */}
            {isSuccess ? (
              <div className="text-center py-8 space-y-6">
                <div className="w-20 h-20 rounded-2xl bg-[#00F0FF]/20 border border-[#00F0FF] text-[#00F0FF] flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(0,240,255,0.5)]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-3">
                  <h3 className="font-cyber text-2xl sm:text-3xl font-black text-white text-glow-cyan">
                    Данные приняты в обработку!
                  </h3>
                  <p className="text-[#E2E8F0] text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                    Продюсер Arriva Lab свяжется с тобой в Telegram в течение 24 часов для согласования деталей и начала подготовки 3D-модели.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleClose}
                    className="cyber-btn-red px-8 py-3.5 text-xs font-cyber tracking-wider"
                  >
                    Закрыть окно
                  </button>
                </div>
              </div>
            ) : (
              /* Step-by-Step Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Stepper Header */}
                <div className="border-b border-white/15 pb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00F0FF] text-glow-cyan">
                      {activeModal === 'gaming' ? 'GAMING & SHOW // АНКЕТА' : 'AFTER DARK 18+ // АНКЕТА'}
                    </span>
                    <span className="font-mono text-xs text-white bg-white/10 px-2.5 py-0.5 rounded border border-white/20">
                      Шаг {step} из 3
                    </span>
                  </div>

                  <h3 className="font-cyber text-xl sm:text-2xl font-bold text-white">
                    {activeModal === 'gaming' && step === 1 && 'Шаг 1. Контакты и оборудование'}
                    {activeModal === 'gaming' && step === 2 && 'Шаг 2. Психотип и подача'}
                    {activeModal === 'gaming' && step === 3 && 'Шаг 3. Образ и расписание'}

                    {activeModal === 'afterdark' && step === 1 && 'Шаг 1. Базовые данные и верификация'}
                    {activeModal === 'afterdark' && step === 2 && 'Шаг 2. Границы и артистизм'}
                    {activeModal === 'afterdark' && step === 3 && 'Шаг 3. Табу и конфиденциальность'}
                  </h3>

                  {/* Progress Line */}
                  <div className="w-full bg-white/10 h-2 rounded-full mt-3 overflow-hidden p-0.5 border border-white/10">
                    <div 
                      className="h-full bg-gradient-to-r from-[#00F0FF] to-[#FF0055] rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(255,0,85,0.8)]"
                      style={{ width: `${(step / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* ========================================================= */}
                {/* ВАРИАНТ А: АНКЕТА «GAMING & SHOW» */}
                {/* ========================================================= */}
                {activeModal === 'gaming' && (
                  <div className="space-y-5">
                    
                    {/* ШАГ 1: Контакты и оборудование */}
                    {step === 1 && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-mono uppercase text-[#00F0FF] block mb-1.5 font-bold">Telegram-юзернейм *</label>
                            <input
                              type="text"
                              required
                              value={gamingForm.telegram}
                              onChange={(e) => setGamingForm({ ...gamingForm, telegram: e.target.value })}
                              placeholder="@username"
                              className="input-field"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-mono uppercase text-[#E2E8F0] block mb-1.5">Страна проживания *</label>
                            <input
                              type="text"
                              required
                              value={gamingForm.country}
                              onChange={(e) => setGamingForm({ ...gamingForm, country: e.target.value })}
                              placeholder="Россия, Беларусь, Казахстан..."
                              className="input-field"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-mono uppercase text-[#E2E8F0] block mb-1.5">Возраст *</label>
                            <input
                              type="number"
                              required
                              min="16"
                              max="80"
                              value={gamingForm.age}
                              onChange={(e) => setGamingForm({ ...gamingForm, age: e.target.value })}
                              placeholder="18"
                              className="input-field"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-mono uppercase text-[#E2E8F0] block mb-1.5">Паспорт для верификации *</label>
                            <select
                              value={gamingForm.passport}
                              onChange={(e) => setGamingForm({ ...gamingForm, passport: e.target.value })}
                              className="input-field"
                            >
                              <option value="Да, есть">Да, есть в наличии</option>
                              <option value="Нет в наличии">Нет в наличии</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-mono uppercase text-[#E2E8F0] block mb-1.5">Видеокарта и микрофон *</label>
                          <input
                            type="text"
                            required
                            value={gamingForm.hardware}
                            onChange={(e) => setGamingForm({ ...gamingForm, hardware: e.target.value })}
                            placeholder="Например: RTX 3060, микрофон HyperX / Fifine"
                            className="input-field"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-mono uppercase text-[#E2E8F0] block mb-1.5">Опыт получения USDT / крипты *</label>
                          <div className="grid grid-cols-3 gap-2">
                            {['Да', 'Нет', 'Нужна инструкция'].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setGamingForm({ ...gamingForm, usdtExperience: opt })}
                                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                                  gamingForm.usdtExperience === opt
                                    ? 'bg-[#00F0FF]/25 border-[#00F0FF] text-white shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                                    : 'bg-white/5 border-white/10 text-[#E2E8F0] hover:bg-white/10'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ШАГ 2: Психотип и подача */}
                    {step === 2 && (
                      <div className="space-y-4 animate-fade-in">
                        <div>
                          <label className="text-xs font-mono uppercase text-[#E2E8F0] block mb-1.5">Опиши себя тремя словами</label>
                          <input
                            type="text"
                            value={gamingForm.threeWords}
                            onChange={(e) => setGamingForm({ ...gamingForm, threeWords: e.target.value })}
                            placeholder="Например: Дерзкий, хаотичный, упорный"
                            className="input-field"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-mono uppercase text-[#E2E8F0] block mb-1.5">Твоя реакция на токсичность или буллинг в чате</label>
                          <input
                            type="text"
                            value={gamingForm.bullyingReaction}
                            onChange={(e) => setGamingForm({ ...gamingForm, bullyingReaction: e.target.value })}
                            placeholder="Ядовитый сарказм / бан / словесный батл"
                            className="input-field"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-mono uppercase text-[#E2E8F0] block mb-1.5">Готовность громко кричать, визжать и отыгрывать эмоции</label>
                          <select
                            value={gamingForm.screamReady}
                            onChange={(e) => setGamingForm({ ...gamingForm, screamReady: e.target.value })}
                            className="input-field"
                          >
                            <option value="Да, легко">Да, легко</option>
                            <option value="Умеренно, нужно разогреться">Умеренно, нужно разогреться</option>
                            <option value="Предпочитаю спокойный стиль">Предпочитаю спокойный стиль</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-mono uppercase text-[#E2E8F0] block mb-1.5">Реальный разговорный английский</label>
                          <select
                            value={gamingForm.englishLevel}
                            onChange={(e) => setGamingForm({ ...gamingForm, englishLevel: e.target.value })}
                            className="input-field"
                          >
                            <option value="Свободно шучу и импровизирую">Свободно шучу и импровизирую</option>
                            <option value="Строю простые фразы">Строю простые фразы</option>
                            <option value="Нужен постоянный переводчик">Нужен постоянный переводчик</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* ШАГ 3: Образ и расписание */}
                    {step === 3 && (
                      <div className="space-y-4 animate-fade-in">
                        <div>
                          <label className="text-xs font-mono uppercase text-[#E2E8F0] block mb-1.5">Какая роль ближе твоему характеру?</label>
                          <div className="grid grid-cols-2 gap-2">
                            {['Дерзкий робот-хакер', 'Капризная цундере', 'Токсичный сноб', 'Милая соня'].map((role) => (
                              <button
                                key={role}
                                type="button"
                                onClick={() => setGamingForm({ ...gamingForm, preferredRole: role })}
                                className={`py-3 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                                  gamingForm.preferredRole === role
                                    ? 'bg-[#00F0FF]/25 border-[#00F0FF] text-white shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                                    : 'bg-white/5 border-white/10 text-[#E2E8F0] hover:bg-white/10'
                                }`}
                              >
                                {role}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-mono uppercase text-[#E2E8F0] block mb-1.5">Любимые игровые жанры</label>
                          <input
                            type="text"
                            value={gamingForm.favoriteGenres}
                            onChange={(e) => setGamingForm({ ...gamingForm, favoriteGenres: e.target.value })}
                            placeholder="Шутеры, хорроры, инди, RPG..."
                            className="input-field"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-mono uppercase text-[#E2E8F0] block mb-1.5">Сколько часов в неделю готов отдавать стримам?</label>
                          <input
                            type="text"
                            value={gamingForm.weeklyHours}
                            onChange={(e) => setGamingForm({ ...gamingForm, weeklyHours: e.target.value })}
                            placeholder="Например: 15-20 часов"
                            className="input-field"
                          />
                        </div>
                      </div>
                    )}

                  </div>
                )}

                {/* ========================================================= */}
                {/* ВАРИАНТ Б: АНКЕТА «AFTER DARK 18+» */}
                {/* ========================================================= */}
                {activeModal === 'afterdark' && (
                  <div className="space-y-5">
                    
                    {/* ШАГ 1: Базовые данные и верификация */}
                    {step === 1 && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="p-3.5 rounded-xl bg-[#FF0055]/15 border border-[#FF0055]/40 text-xs text-white flex items-center gap-2.5 shadow-[0_0_15px_rgba(255,0,85,0.2)]">
                          <ShieldAlert className="w-5 h-5 text-[#FF0055] shrink-0" />
                          <span>Строго от 18 лет. Паспорт необходим для закрытой верификации на Fansly.</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-mono uppercase text-[#FF0055] block mb-1.5 font-bold">Telegram-юзернейм *</label>
                            <input
                              type="text"
                              required
                              value={afterDarkForm.telegram}
                              onChange={(e) => setAfterDarkForm({ ...afterDarkForm, telegram: e.target.value })}
                              placeholder="@username"
                              className="input-field"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-mono uppercase text-[#E2E8F0] block mb-1.5">Страна проживания *</label>
                            <input
                              type="text"
                              required
                              value={afterDarkForm.country}
                              onChange={(e) => setAfterDarkForm({ ...afterDarkForm, country: e.target.value })}
                              placeholder="Россия, Казахстан, Грузия..."
                              className="input-field"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-mono uppercase text-[#E2E8F0] block mb-1.5">Возраст (строго 18+) *</label>
                            <input
                              type="number"
                              required
                              min="18"
                              max="80"
                              value={afterDarkForm.age}
                              onChange={(e) => setAfterDarkForm({ ...afterDarkForm, age: e.target.value })}
                              placeholder="18+"
                              className="input-field"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-mono uppercase text-[#E2E8F0] block mb-1.5">Паспорт для KYC 18+ *</label>
                            <select
                              value={afterDarkForm.kycPassport}
                              onChange={(e) => setAfterDarkForm({ ...afterDarkForm, kycPassport: e.target.value })}
                              className="input-field"
                            >
                              <option value="Да, есть">Да, есть в наличии</option>
                              <option value="Нет в наличии">Нет в наличии</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-mono uppercase text-[#E2E8F0] block mb-1.5">Модель микрофона *</label>
                            <input
                              type="text"
                              required
                              value={afterDarkForm.microphone}
                              onChange={(e) => setAfterDarkForm({ ...afterDarkForm, microphone: e.target.value })}
                              placeholder="Fifine, Rode, Blue Yeti..."
                              className="input-field"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-mono uppercase text-[#E2E8F0] block mb-1.5">Криптокошелек (USDT) *</label>
                            <select
                              value={afterDarkForm.cryptoWallet}
                              onChange={(e) => setAfterDarkForm({ ...afterDarkForm, cryptoWallet: e.target.value })}
                              className="input-field"
                            >
                              <option value="Да, есть">Да, есть</option>
                              <option value="Нет кошелька">Нет кошелька</option>
                              <option value="Помочь настроить">Помочь настроить</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ШАГ 2: Границы и артистизм */}
                    {step === 2 && (
                      <div className="space-y-4 animate-fade-in">
                        <div>
                          <label className="text-xs font-mono uppercase text-[#E2E8F0] block mb-1.5">Готовность к тому, что 3D-модель раздевается по командам чата</label>
                          <div className="grid grid-cols-2 gap-3">
                            {['Да, полностью готов(а)', 'Есть сомнения / нужны рамки'].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setAfterDarkForm({ ...afterDarkForm, stripReady: opt })}
                                className={`py-3 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                                  afterDarkForm.stripReady === opt
                                    ? 'bg-[#FF0055]/25 border-[#FF0055] text-white shadow-[0_0_12px_rgba(255,0,85,0.4)]'
                                    : 'bg-white/5 border-white/10 text-[#E2E8F0] hover:bg-white/10'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-mono uppercase text-[#E2E8F0] block mb-1.5">Умение шептать, стонать и отыгрывать интимные звуки</label>
                          <select
                            value={afterDarkForm.audioSkills}
                            onChange={(e) => setAfterDarkForm({ ...afterDarkForm, audioSkills: e.target.value })}
                            className="input-field"
                          >
                            <option value="Да, делаю это уверенно">Да, делаю это уверенно</option>
                            <option value="Справлюсь после пары тренировок">Справлюсь после пары тренировок</option>
                            <option value="Есть стеснение">Есть стеснение</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-mono uppercase text-[#E2E8F0] block mb-1.5">Твой комфортный архетип</label>
                          <div className="grid grid-cols-3 gap-2">
                            {['Властная доминантка', 'Послушная горничная', 'Испорченная оторва'].map((arch) => (
                              <button
                                key={arch}
                                type="button"
                                onClick={() => setAfterDarkForm({ ...afterDarkForm, comfortableArchetype: arch })}
                                className={`py-3 px-2 rounded-xl border text-xs font-semibold text-center transition-all ${
                                  afterDarkForm.comfortableArchetype === arch
                                    ? 'bg-[#FF0055]/25 border-[#FF0055] text-white shadow-[0_0_12px_rgba(255,0,85,0.4)]'
                                    : 'bg-white/5 border-white/10 text-[#E2E8F0] hover:bg-white/10'
                                }`}
                              >
                                {arch}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ШАГ 3: Табу и конфиденциальность */}
                    {step === 3 && (
                      <div className="space-y-4 animate-fade-in">
                        <div>
                          <label className="text-xs font-mono uppercase text-[#E2E8F0] block mb-1.5">Какие темы и действия запрещены для тебя навсегда даже за огромный донат?</label>
                          <textarea
                            rows="2"
                            value={afterDarkForm.strictTaboos}
                            onChange={(e) => setAfterDarkForm({ ...afterDarkForm, strictTaboos: e.target.value })}
                            placeholder="Строгие табу..."
                            className="input-field"
                          ></textarea>
                        </div>

                        <div>
                          <label className="text-xs font-mono uppercase text-[#E2E8F0] block mb-1.5">Готовность наговаривать короткие аудиосообщения для фанатов</label>
                          <div className="grid grid-cols-2 gap-3">
                            {['Да, готов(а)', 'Нет, не готов(а)'].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setAfterDarkForm({ ...afterDarkForm, voiceMessagesReady: opt })}
                                className={`py-3 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                                  afterDarkForm.voiceMessagesReady === opt
                                    ? 'bg-[#FF0055]/25 border-[#FF0055] text-white shadow-[0_0_12px_rgba(255,0,85,0.4)]'
                                    : 'bg-white/5 border-white/10 text-[#E2E8F0] hover:bg-white/10'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-mono uppercase text-[#E2E8F0] block mb-1.5">Сколько дней в неделю готов выходить в приватные эфиры?</label>
                          <input
                            type="text"
                            value={afterDarkForm.weeklyDays}
                            onChange={(e) => setAfterDarkForm({ ...afterDarkForm, weeklyDays: e.target.value })}
                            placeholder="Например: 3-4 дня"
                            className="input-field"
                          />
                        </div>
                      </div>
                    )}

                  </div>
                )}

                {/* Footer Controls */}
                <div className="pt-6 border-t border-white/15 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-[#E2E8F0] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 border border-white/15"
                    >
                      <ArrowLeft className="w-4 h-4" /> Назад
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      className="cyber-btn-red px-8 py-3.5 text-xs font-cyber tracking-wider gap-2 shadow-[0_0_25px_rgba(255,0,85,0.6)]"
                    >
                      <span>Далее</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="cyber-btn-red px-8 py-3.5 text-xs font-cyber tracking-wider gap-2.5 disabled:opacity-50 shadow-[0_0_30px_rgba(255,0,85,0.7)]"
                    >
                      {isSubmitting ? (
                        <>Отправка...</>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> ОТПРАВИТЬ АНКЕТУ
                        </>
                      )}
                    </button>
                  )}
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
