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
  Sparkles,
  Layers,
  Coins
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
    passport: 'Да',
    usdtExperience: 'Да',
    threeWords: '',
    bullyingReaction: '',
    screamReady: 'Да, легко',
    englishLevel: 'Свободно шучу',
    preferredRole: 'Дерзкий робот-хакер',
    favoriteGenres: '',
    weeklyHours: '15-20 часов'
  });

  // Form State for After Dark 18+
  const [afterDarkForm, setAfterDarkForm] = useState({
    telegram: '',
    country: '',
    age: '',
    kycPassport: 'Да',
    microphone: '',
    cryptoWallet: 'Да',
    stripReady: 'Да',
    audioSkills: 'Да, уверенно',
    comfortableArchetype: 'Властная доминантка',
    strictTaboos: '',
    voiceMessagesReady: 'Да',
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
      const modeTitle = isGaming ? '🎮 GAMING & SHOW' : '🔞 AFTER DARK 18+';
      
      const detailsList = isGaming ? [
        `Telegram: ${gamingForm.telegram}`,
        `Страна проживания: ${gamingForm.country || 'Не указано'}`,
        `Возраст: ${gamingForm.age}`,
        `Видеокарта и микрофон: ${gamingForm.hardware || 'Не указано'}`,
        `Наличие паспорта/загранпаспорта: ${gamingForm.passport}`,
        `Опыт с USDT: ${gamingForm.usdtExperience}`,
        `О себе тремя словами: ${gamingForm.threeWords || 'Не указано'}`,
        `Реакция на буллинг в чате: ${gamingForm.bullyingReaction || 'Не указано'}`,
        `Готовность орать/визжать/эмоции: ${gamingForm.screamReady}`,
        `Разговорный английский: ${gamingForm.englishLevel}`,
        `Близкая роль: ${gamingForm.preferredRole}`,
        `Любимые игровые жанры: ${gamingForm.favoriteGenres || 'Не указано'}`,
        `Часов в неделю на стримы: ${gamingForm.weeklyHours}`
      ] : [
        `Telegram: ${afterDarkForm.telegram}`,
        `Страна проживания: ${afterDarkForm.country || 'Не указано'}`,
        `Возраст (18+): ${afterDarkForm.age}`,
        `Паспорт для жесткого KYC: ${afterDarkForm.kycPassport}`,
        `Модель микрофона: ${afterDarkForm.microphone || 'Не указано'}`,
        `Криптокошелек: ${afterDarkForm.cryptoWallet}`,
        `Готовность к раздеванию 3D-модели: ${afterDarkForm.stripReady}`,
        `Умение шептать, стонать, интимные звуки: ${afterDarkForm.audioSkills}`,
        `Комфортный архетип: ${afterDarkForm.comfortableArchetype}`,
        `Строгие табу и запреты: ${afterDarkForm.strictTaboos || 'Не указано'}`,
        `Голосовые аудиосообщения для фанатов: ${afterDarkForm.voiceMessagesReady}`,
        `Дней в неделю в приватных эфирах: ${afterDarkForm.weeklyDays}`
      ];

      const fullWishes = `=== НАПРАВЛЕНИЕ: ${modeTitle} ===\n\n` + detailsList.join('\n');

      await onSubmitApplication({
        tab: activeModal,
        telegram: form.telegram,
        age: form.age,
        wishes: fullWishes
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setIsSuccess(true);
    } catch (err) {
      alert('Ошибка при отправке: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="formats" className="py-24 bg-[#090A0F] border-t border-white/[0.08] relative text-left">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-[#00F5FF]/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#FF007A]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs text-white uppercase tracking-widest bg-white/[0.05] border border-white/10 px-4 py-1.5 rounded-full">
            Интерактивная развилка
          </span>
          <h2 className="text-white text-3xl sm:text-5xl font-black tracking-tight">
            Выбери свой формат участия
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Определи вектор продюсирования. Мы подбираем персонажа, сетап софта и стратегию выхода на доход индивидуально под направление.
          </p>
        </div>

        {/* ДВЕ БОЛЬШИЕ КОНТРАСТНЫЕ КАРТОЧКИ-ВЫБОРА */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* КАРТОЧКА 1: GAMING & SHOW */}
          <div className="rounded-3xl p-8 sm:p-10 bg-[rgba(18,20,32,0.7)] backdrop-blur-xl border border-[#00F5FF]/30 hover:border-[#00F5FF] shadow-[0_0_30px_rgba(0,245,255,0.1)] hover:shadow-[0_0_50px_rgba(0,245,255,0.25)] transition-all flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F5FF]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#00F5FF]/20 transition-all"></div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-xl bg-[#00F5FF]/15 border border-[#00F5FF]/40 text-[#00F5FF] font-mono text-xs font-bold tracking-wider uppercase">
                  Стиль: Неоновый бирюзовый
                </span>
                <Gamepad2 className="w-6 h-6 text-[#00F5FF]" />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  GAMING & SHOW
                </h3>
                <p className="text-xs font-mono text-neutral-400 mt-1">
                  Площадки: <span className="text-white font-bold">Twitch, YouTube</span>
                </p>
              </div>

              <div className="space-y-3 py-2 border-y border-white/[0.08]">
                <div className="flex items-start gap-2.5 text-sm text-neutral-200">
                  <span className="text-[#00F5FF] font-bold text-base">•</span>
                  <span><strong>Контент:</strong> Игры, трэш-стримы, мем-интерактив</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-neutral-200">
                  <span className="text-[#00F5FF] font-bold text-base">•</span>
                  <span><strong>Чек:</strong> Стабильный рост за счет базы преданных фанатов</span>
                </div>
              </div>
            </div>

            <div className="pt-8 relative z-10">
              <button
                type="button"
                onClick={() => handleOpenForm('gaming')}
                className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider bg-[#00F5FF] hover:bg-cyan-300 text-black shadow-[0_0_25px_rgba(0,245,255,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Подать анкету</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>

          {/* КАРТОЧКА 2: AFTER DARK 18+ */}
          <div className="rounded-3xl p-8 sm:p-10 bg-[rgba(18,20,32,0.7)] backdrop-blur-xl border border-[#FF007A]/40 hover:border-[#FF007A] shadow-[0_0_30px_rgba(255,0,122,0.1)] hover:shadow-[0_0_50px_rgba(255,0,122,0.25)] transition-all flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF007A]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF007A]/20 transition-all"></div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-xl bg-[#FF007A]/15 border border-[#FF007A]/40 text-[#FF007A] font-mono text-xs font-bold tracking-wider uppercase">
                  Стиль: Неоновый пурпурный
                </span>
                <Flame className="w-6 h-6 text-[#FF007A]" />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  AFTER DARK 18+
                </h3>
                <p className="text-xs font-mono text-neutral-400 mt-1">
                  Площадки: <span className="text-white font-bold">Fansly, Private Live</span>
                </p>
              </div>

              <div className="space-y-3 py-2 border-y border-white/[0.08]">
                <div className="flex items-start gap-2.5 text-sm text-neutral-200">
                  <span className="text-[#FF007A] font-bold text-base">•</span>
                  <span><strong>Контент:</strong> Эротический ролеплей, фетиши, раздевание модели</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-neutral-200">
                  <span className="text-[#FF007A] font-bold text-base">•</span>
                  <span><strong>Чек:</strong> Максимальный доход с первых стримов в валюте</span>
                </div>
              </div>
            </div>

            <div className="pt-8 relative z-10">
              <button
                type="button"
                onClick={() => handleOpenForm('afterdark')}
                className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider bg-[#FF007A] hover:bg-pink-500 text-white shadow-[0_0_25px_rgba(255,0,122,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Подать анкету</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* МОДАЛЬНОЕ ОКНО СО СТЕППЕРОМ (1 ИЗ 3) */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div 
            onClick={handleClose} 
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          ></div>

          {/* Modal Container */}
          <div className={`relative w-full max-w-2xl bg-[#0D0E17] border rounded-3xl p-6 sm:p-10 z-10 shadow-[0_0_60px_rgba(0,0,0,0.9)] animate-fade-in text-left ${
            activeModal === 'gaming' ? 'border-[#00F5FF]/40' : 'border-[#FF007A]/40'
          }`}>
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Success State */}
            {isSuccess ? (
              <div className="text-center py-8 space-y-6">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto border shadow-2xl ${
                  activeModal === 'gaming' 
                    ? 'bg-[#00F5FF]/15 border-[#00F5FF] text-[#00F5FF] shadow-[0_0_40px_rgba(0,245,255,0.4)]' 
                    : 'bg-[#FF007A]/15 border-[#FF007A] text-[#FF007A] shadow-[0_0_40px_rgba(255,0,122,0.4)]'
                }`}>
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-white">Данные приняты в обработку</h3>
                  <p className="text-neutral-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                    Продюсер свяжется с тобой в Telegram в течение 24 часов.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleClose}
                    className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-colors"
                  >
                    Закрыть окно
                  </button>
                </div>
              </div>
            ) : (
              /* Step-by-Step Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Stepper Header */}
                <div className="border-b border-white/10 pb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-mono text-xs font-bold uppercase tracking-widest ${
                      activeModal === 'gaming' ? 'text-[#00F5FF]' : 'text-[#FF007A]'
                    }`}>
                      {activeModal === 'gaming' ? 'GAMING & SHOW // АНКЕТА' : 'AFTER DARK 18+ // АНКЕТА'}
                    </span>
                    <span className="font-mono text-xs text-neutral-400">Шаг {step} из 3</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {activeModal === 'gaming' && step === 1 && 'Шаг 1. Контакты и железо'}
                    {activeModal === 'gaming' && step === 2 && 'Шаг 2. Психотип и голос'}
                    {activeModal === 'gaming' && step === 3 && 'Шаг 3. Образ персонажа'}

                    {activeModal === 'afterdark' && step === 1 && 'Шаг 1. База и верификация'}
                    {activeModal === 'afterdark' && step === 2 && 'Шаг 2. Границы и фетиши'}
                    {activeModal === 'afterdark' && step === 3 && 'Шаг 3. Табу и безопасность'}
                  </h3>

                  {/* Progress Line */}
                  <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        activeModal === 'gaming' ? 'bg-[#00F5FF]' : 'bg-[#FF007A]'
                      }`}
                      style={{ width: `${(step / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* ========================================================= */}
                {/* ВАРИАНТ А: АНКЕТА «GAMING & SHOW» */}
                {/* ========================================================= */}
                {activeModal === 'gaming' && (
                  <div className="space-y-5">
                    {/* ШАГ 1: Контакты и железо */}
                    {step === 1 && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">Telegram-юзернейм *</label>
                            <input
                              type="text"
                              required
                              value={gamingForm.telegram}
                              onChange={(e) => setGamingForm({ ...gamingForm, telegram: e.target.value })}
                              placeholder="@username"
                              className="w-full bg-[#121420] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#00F5FF] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">Страна проживания *</label>
                            <input
                              type="text"
                              required
                              value={gamingForm.country}
                              onChange={(e) => setGamingForm({ ...gamingForm, country: e.target.value })}
                              placeholder="Россия, Беларусь, Казахстан..."
                              className="w-full bg-[#121420] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#00F5FF] focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">Возраст *</label>
                            <input
                              type="number"
                              required
                              min="16"
                              max="80"
                              value={gamingForm.age}
                              onChange={(e) => setGamingForm({ ...gamingForm, age: e.target.value })}
                              placeholder="18"
                              className="w-full bg-[#121420] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#00F5FF] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">Паспорт для верификации *</label>
                            <select
                              value={gamingForm.passport}
                              onChange={(e) => setGamingForm({ ...gamingForm, passport: e.target.value })}
                              className="w-full bg-[#121420] border border-white/15 rounded-xl px-4 py-3 text-white focus:border-[#00F5FF] focus:outline-none"
                            >
                              <option value="Да">Да, есть</option>
                              <option value="Нет">Нет в наличии</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">Видеокарта и микрофон *</label>
                          <input
                            type="text"
                            required
                            value={gamingForm.hardware}
                            onChange={(e) => setGamingForm({ ...gamingForm, hardware: e.target.value })}
                            placeholder="Например: RTX 3060, микрофон Fifine / HyperX"
                            className="w-full bg-[#121420] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#00F5FF] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">Опыт с USDT *</label>
                          <div className="grid grid-cols-3 gap-2">
                            {['Да', 'Нет', 'Нужна инструкция'].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setGamingForm({ ...gamingForm, usdtExperience: opt })}
                                className={`py-2.5 px-3 rounded-xl border text-xs font-medium text-center transition-all ${
                                  gamingForm.usdtExperience === opt
                                    ? 'bg-[#00F5FF]/20 border-[#00F5FF] text-[#00F5FF]'
                                    : 'bg-black/30 border-white/10 text-neutral-400 hover:text-white'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ШАГ 2: Психотип и голос */}
                    {step === 2 && (
                      <div className="space-y-4 animate-fade-in">
                        <div>
                          <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">Опиши себя тремя словами</label>
                          <input
                            type="text"
                            value={gamingForm.threeWords}
                            onChange={(e) => setGamingForm({ ...gamingForm, threeWords: e.target.value })}
                            placeholder="Например: Дерзкий, хаотичный, упорный"
                            className="w-full bg-[#121420] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#00F5FF] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">Твоя реакция на буллинг в чате</label>
                          <input
                            type="text"
                            value={gamingForm.bullyingReaction}
                            onChange={(e) => setGamingForm({ ...gamingForm, bullyingReaction: e.target.value })}
                            placeholder="Ядовитый сарказм / бан / словесный батл"
                            className="w-full bg-[#121420] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#00F5FF] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">Готовность громко кричать, визжать и отыгрывать эмоции</label>
                          <select
                            value={gamingForm.screamReady}
                            onChange={(e) => setGamingForm({ ...gamingForm, screamReady: e.target.value })}
                            className="w-full bg-[#121420] border border-white/15 rounded-xl px-4 py-3 text-white focus:border-[#00F5FF] focus:outline-none"
                          >
                            <option value="Да, легко">Да, легко</option>
                            <option value="Умеренно, нужно разогреться">Умеренно, нужно разогреться</option>
                            <option value="Предпочитаю спокойный стиль">Предпочитаю спокойный стиль</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">Реальный разговорный английский</label>
                          <select
                            value={gamingForm.englishLevel}
                            onChange={(e) => setGamingForm({ ...gamingForm, englishLevel: e.target.value })}
                            className="w-full bg-[#121420] border border-white/15 rounded-xl px-4 py-3 text-white focus:border-[#00F5FF] focus:outline-none"
                          >
                            <option value="Свободно шучу и импровизирую">Свободно шучу и импровизирую</option>
                            <option value="Строю простые фразы">Строю простые фразы</option>
                            <option value="Нужен постоянный переводчик">Нужен постоянный переводчик</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* ШАГ 3: Образ персонажа */}
                    {step === 3 && (
                      <div className="space-y-4 animate-fade-in">
                        <div>
                          <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">Какая роль ближе?</label>
                          <div className="grid grid-cols-2 gap-2">
                            {['Дерзкий робот-хакер', 'Капризная цундере', 'Токсичный сноб', 'Милая соня'].map((role) => (
                              <button
                                key={role}
                                type="button"
                                onClick={() => setGamingForm({ ...gamingForm, preferredRole: role })}
                                className={`py-3 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                                  gamingForm.preferredRole === role
                                    ? 'bg-[#00F5FF]/20 border-[#00F5FF] text-[#00F5FF]'
                                    : 'bg-black/30 border-white/10 text-neutral-400 hover:text-white'
                                }`}
                              >
                                {role}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">Любимые игровые жанры</label>
                          <input
                            type="text"
                            value={gamingForm.favoriteGenres}
                            onChange={(e) => setGamingForm({ ...gamingForm, favoriteGenres: e.target.value })}
                            placeholder="Шутеры, хорроры, инди, RPG..."
                            className="w-full bg-[#121420] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#00F5FF] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">Сколько часов в неделю готов отдавать трансляциям?</label>
                          <input
                            type="text"
                            value={gamingForm.weeklyHours}
                            onChange={(e) => setGamingForm({ ...gamingForm, weeklyHours: e.target.value })}
                            placeholder="Например: 15-20 часов"
                            className="w-full bg-[#121420] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#00F5FF] focus:outline-none"
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
                    {/* ШАГ 1: База и верификация */}
                    {step === 1 && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="p-3 rounded-xl bg-[#FF007A]/15 border border-[#FF007A]/30 text-xs text-rose-200 flex items-center gap-2">
                          <ShieldAlert className="w-4 h-4 text-[#FF007A] shrink-0" />
                          <span>Строго от 18 лет. Требуется паспорт для официального KYC на Fansly.</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">Telegram-юзернейм *</label>
                            <input
                              type="text"
                              required
                              value={afterDarkForm.telegram}
                              onChange={(e) => setAfterDarkForm({ ...afterDarkForm, telegram: e.target.value })}
                              placeholder="@username"
                              className="w-full bg-[#121420] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#FF007A] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">Страна проживания *</label>
                            <input
                              type="text"
                              required
                              value={afterDarkForm.country}
                              onChange={(e) => setAfterDarkForm({ ...afterDarkForm, country: e.target.value })}
                              placeholder="Россия, Казахстан, Грузия..."
                              className="w-full bg-[#121420] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#FF007A] focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">Возраст (строго 18+) *</label>
                            <input
                              type="number"
                              required
                              min="18"
                              max="80"
                              value={afterDarkForm.age}
                              onChange={(e) => setAfterDarkForm({ ...afterDarkForm, age: e.target.value })}
                              placeholder="18+"
                              className="w-full bg-[#121420] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#FF007A] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">Паспорт для KYC 18+ *</label>
                            <select
                              value={afterDarkForm.kycPassport}
                              onChange={(e) => setAfterDarkForm({ ...afterDarkForm, kycPassport: e.target.value })}
                              className="w-full bg-[#121420] border border-white/15 rounded-xl px-4 py-3 text-white focus:border-[#FF007A] focus:outline-none"
                            >
                              <option value="Да">Да, есть</option>
                              <option value="Нет">Нет в наличии</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">Модель микрофона *</label>
                            <input
                              type="text"
                              required
                              value={afterDarkForm.microphone}
                              onChange={(e) => setAfterDarkForm({ ...afterDarkForm, microphone: e.target.value })}
                              placeholder="Fifine, Rode, Blue Yeti..."
                              className="w-full bg-[#121420] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#FF007A] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">Криптокошелек (USDT) *</label>
                            <select
                              value={afterDarkForm.cryptoWallet}
                              onChange={(e) => setAfterDarkForm({ ...afterDarkForm, cryptoWallet: e.target.value })}
                              className="w-full bg-[#121420] border border-white/15 rounded-xl px-4 py-3 text-white focus:border-[#FF007A] focus:outline-none"
                            >
                              <option value="Да">Да, есть</option>
                              <option value="Нет">Нет кошелька</option>
                              <option value="Помочь настроить">Помочь настроить</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ШАГ 2: Границы и фетиши */}
                    {step === 2 && (
                      <div className="space-y-4 animate-fade-in">
                        <div>
                          <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">Готовность к тому, что 3D-модель раздевается по командам чата</label>
                          <div className="grid grid-cols-2 gap-3">
                            {['Да, полностью готов(а)', 'Есть сомнения / нужны рамки'].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setAfterDarkForm({ ...afterDarkForm, stripReady: opt })}
                                className={`py-3 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                                  afterDarkForm.stripReady === opt
                                    ? 'bg-[#FF007A]/20 border-[#FF007A] text-[#FF007A]'
                                    : 'bg-black/30 border-white/10 text-neutral-400 hover:text-white'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">Умение шептать, стонать и отыгрывать интимные звуки</label>
                          <select
                            value={afterDarkForm.audioSkills}
                            onChange={(e) => setAfterDarkForm({ ...afterDarkForm, audioSkills: e.target.value })}
                            className="w-full bg-[#121420] border border-white/15 rounded-xl px-4 py-3 text-white focus:border-[#FF007A] focus:outline-none"
                          >
                            <option value="Да, делаю это уверенно">Да, делаю это уверенно</option>
                            <option value="Справлюсь после пары тренировок">Справлюсь после пары тренировок</option>
                            <option value="Есть стеснение">Есть стеснение</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">Твой комфортный архетип</label>
                          <div className="grid grid-cols-3 gap-2">
                            {['Доминантка', 'Послушная горничная', 'Испорченная оторва'].map((arch) => (
                              <button
                                key={arch}
                                type="button"
                                onClick={() => setAfterDarkForm({ ...afterDarkForm, comfortableArchetype: arch })}
                                className={`py-3 px-2 rounded-xl border text-xs font-semibold text-center transition-all ${
                                  afterDarkForm.comfortableArchetype === arch
                                    ? 'bg-[#FF007A]/20 border-[#FF007A] text-[#FF007A]'
                                    : 'bg-black/30 border-white/10 text-neutral-400 hover:text-white'
                                }`}
                              >
                                {arch}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ШАГ 3: Табу и безопасность */}
                    {step === 3 && (
                      <div className="space-y-4 animate-fade-in">
                        <div>
                          <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">Какие темы и действия запрещены для тебя навсегда даже за огромный донат?</label>
                          <textarea
                            rows="2"
                            value={afterDarkForm.strictTaboos}
                            onChange={(e) => setAfterDarkForm({ ...afterDarkForm, strictTaboos: e.target.value })}
                            placeholder="Строгие табу..."
                            className="w-full bg-[#121420] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#FF007A] focus:outline-none"
                          ></textarea>
                        </div>

                        <div>
                          <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">Готовность наговаривать короткие аудиосообщения для закрытых фанатов</label>
                          <div className="grid grid-cols-2 gap-3">
                            {['Да, готов(а)', 'Нет, не готов(а)'].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setAfterDarkForm({ ...afterDarkForm, voiceMessagesReady: opt })}
                                className={`py-3 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                                  afterDarkForm.voiceMessagesReady === opt
                                    ? 'bg-[#FF007A]/20 border-[#FF007A] text-[#FF007A]'
                                    : 'bg-black/30 border-white/10 text-neutral-400 hover:text-white'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">Сколько дней в неделю готов выходить в приватные эфиры?</label>
                          <input
                            type="text"
                            value={afterDarkForm.weeklyDays}
                            onChange={(e) => setAfterDarkForm({ ...afterDarkForm, weeklyDays: e.target.value })}
                            placeholder="Например: 3-4 дня"
                            className="w-full bg-[#121420] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#FF007A] focus:outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Footer Controls */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
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
                      className={`px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                        activeModal === 'gaming'
                          ? 'bg-[#00F5FF] hover:bg-cyan-300 text-black shadow-[0_0_20px_rgba(0,245,255,0.4)]'
                          : 'bg-[#FF007A] hover:bg-pink-500 text-white shadow-[0_0_20px_rgba(255,0,122,0.4)]'
                      }`}
                    >
                      Далее <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2.5 disabled:opacity-50 ${
                        activeModal === 'gaming'
                          ? 'bg-[#00F5FF] hover:bg-cyan-300 text-black shadow-[0_0_25px_rgba(0,245,255,0.4)]'
                          : 'bg-[#FF007A] hover:bg-pink-500 text-white shadow-[0_0_25px_rgba(255,0,122,0.4)]'
                      }`}
                    >
                      {isSubmitting ? (
                        <>Отправка заявки...</>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Отправить заявку
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
