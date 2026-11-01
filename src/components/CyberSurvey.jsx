import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Gamepad2, 
  Flame, 
  ShieldAlert, 
  Cpu, 
  Globe, 
  MessageSquare, 
  ArrowRight, 
  ArrowLeft,
  Lock,
  ChevronRight,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CyberSurvey = ({ onSubmitApplication }) => {
  const [activeTab, setActiveTab] = useState('standard'); // 'standard' | 'adult'
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState(null);

  // Form State for Survey 1 (Standard)
  const [stdForm, setStdForm] = useState({
    telegram: '',
    countryCity: '',
    age: '',
    pcSpecs: '',
    passportReady: 'Да',
    cryptoExperience: 'Да',
    englishLevel: 'Строю простые фразы',
    voiceTimbre: '',
    roleInFriends: 'Заводила',
    quirkOrWeakness: '',
    triggers: '',
    silentChatTopic: '',
    favoriteGenres: '',
    hateReaction: 'Ядовитый сарказм',
    preferredAvatar: 'Капризная цундере',
    screamAbility: 'Да, легко',
    hoursPerWeek: '15-20 часов',
    hiddenGoal: 'Финансовая независимость'
  });

  // Form State for Survey 2 (Adult 18+)
  const [adultForm, setAdultForm] = useState({
    telegram: '',
    countryTimezone: '',
    age: '',
    pcSpecs: '',
    passportVerified: 'Да',
    cryptoExperience: 'Да, свободно принимаю',
    englishLevel: 'Базовый флирт / средний',
    stripReady: 'Да',
    eroticArchetype: 'Властная доминантка',
    previousExperience: '',
    breathAndMoanReady: 'Да, без стеснения',
    fetishInterests: '',
    absoluteTaboos: '',
    kinkReaction: '',
    voiceMessagesReady: 'Да',
    streamBalance: 'Эстетичный флирт',
    daysPerWeek: '3-4 дня',
    priorityGoal: 'Предельный заработок в валюте'
  });

  const handleStdChange = (field, val) => {
    setStdForm(prev => ({ ...prev, [field]: val }));
  };

  const handleAdultChange = (field, val) => {
    setAdultForm(prev => ({ ...prev, [field]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isStd = activeTab === 'standard';
    const form = isStd ? stdForm : adultForm;

    if (!form.telegram || !form.telegram.trim()) {
      alert('Пожалуйста, укажите ваш никнейм в Telegram для обратной связи.');
      setStep(1);
      return;
    }

    if (!form.age || Number(form.age) < (isStd ? 16 : 18)) {
      alert(isStd ? 'Минимальный возраст для участия — 16 лет.' : 'Внимание! Для взрослого сегмента строго от 18 лет.');
      setStep(1);
      return;
    }

    setIsSubmitting(true);

    try {
      const modeTitle = isStd ? '🎮 Обычный витубинг (Игры, общение, шоу)' : '🔞 Взрослый сегмент 18+ (Fansly, эротический ролеплей)';
      
      const detailsList = isStd ? [
        `1. Telegram: ${stdForm.telegram}`,
        `2. Страна и город: ${stdForm.countryCity || 'Не указано'}`,
        `3. Полных лет: ${stdForm.age}`,
        `4. Характеристики ПК: ${stdForm.pcSpecs || 'Не указано'}`,
        `5. Готовность предоставить паспорт: ${stdForm.passportReady}`,
        `6. Опыт с криптовалютой: ${stdForm.cryptoExperience}`,
        `7. Уровень английского: ${stdForm.englishLevel}`,
        `8. Тембр и манера речи: ${stdForm.voiceTimbre || 'Не указано'}`,
        `9. Амплуа в компании: ${stdForm.roleInFriends}`,
        `10. Странность/слабость: ${stdForm.quirkOrWeakness || 'Не указано'}`,
        `11. Триггеры: ${stdForm.triggers || 'Не указано'}`,
        `12. Тема при тишине в чате: ${stdForm.silentChatTopic || 'Не указано'}`,
        `13. Любимые игровые жанры: ${stdForm.favoriteGenres || 'Не указано'}`,
        `14. Реакция на хейт: ${stdForm.hateReaction}`,
        `15. Близкая виртуальная оболочка: ${stdForm.preferredAvatar}`,
        `16. Способность орать/визжать/реакции: ${stdForm.screamAbility}`,
        `17. Часов в неделю у микрофона: ${stdForm.hoursPerWeek}`,
        `18. Скрытая цель: ${stdForm.hiddenGoal}`
      ] : [
        `1. Telegram: ${adultForm.telegram}`,
        `2. Страна и часовой пояс: ${adultForm.countryTimezone || 'Не указано'}`,
        `3. Реальный возраст (18+): ${adultForm.age}`,
        `4. Характеристики ПК: ${adultForm.pcSpecs || 'Не указано'}`,
        `5. Паспорт для верификации 18+: ${adultForm.passportVerified}`,
        `6. Опыт приема выплат в USDT: ${adultForm.cryptoExperience}`,
        `7. Уровень английского: ${adultForm.englishLevel}`,
        `8. Готовность к раздеванию 3D-модели: ${adultForm.stripReady}`,
        `9. Комфортный архетип: ${adultForm.eroticArchetype}`,
        `10. Опыт в эротике/вебкаме/ролеплее: ${adultForm.previousExperience || 'Без опыта'}`,
        `11. Дыхание, стоны, интимный шепот: ${adultForm.breathAndMoanReady}`,
        `12. Интересующие темы и фетиши: ${adultForm.fetishInterests || 'Не указано'}`,
        `13. Абсолютные психологические табу: ${adultForm.absoluteTaboos || 'Не указано'}`,
        `14. Реакция на фантазии и капризы: ${adultForm.kinkReaction || 'Не указано'}`,
        `15. Наговаривание аудиосообщений: ${adultForm.voiceMessagesReady}`,
        `16. Баланс в эфирах: ${adultForm.streamBalance}`,
        `17. Дней в неделю в эфире: ${adultForm.daysPerWeek}`,
        `18. Главный приоритет: ${adultForm.priorityGoal}`
      ];

      const fullWishes = `=== АНКЕТА: ${modeTitle} ===\n\n` + detailsList.join('\n');

      const result = await onSubmitApplication({
        tab: activeTab,
        telegram: form.telegram,
        age: form.age,
        wishes: fullWishes
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setApplicationId(result?.id || Math.floor(1000 + Math.random() * 9000));
      setIsSuccess(true);
    } catch (err) {
      alert('Ошибка при отправке анкеты: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="apply" className="py-24 bg-[#0A0B10] border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest bg-cyan-950/50 border border-cyan-500/30 px-3 py-1 rounded-full">
            Анкета на продюсирование
          </span>
          <h2 className="text-white text-3xl sm:text-5xl font-black tracking-tight">
            Подай заявку в команду
          </h2>
          <p className="text-gray-400 text-base">
            Выберите желаемое направление работы. Мы внимательно изучаем каждый ответ для подбора оптимального 3D-образа и софта.
          </p>
        </div>

        {/* Direction Switcher Tabs */}
        {!isSuccess && (
          <div className="flex flex-col sm:flex-row p-1.5 rounded-2xl bg-[#12141F] border border-white/10 mb-10 gap-2">
            <button
              type="button"
              onClick={() => { setActiveTab('standard'); setStep(1); }}
              className={`flex-1 py-3.5 px-5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2.5 ${
                activeTab === 'standard'
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-black shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Обычный витубинг (Игры, общение)</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('adult'); setStep(1); }}
              className={`flex-1 py-3.5 px-5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2.5 ${
                activeTab === 'adult'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.3)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Flame className="w-4 h-4 text-pink-400" />
              <span>Взрослый сегмент 18+ (Fansly, ролеплей)</span>
            </button>
          </div>
        )}

        {/* Success Screen */}
        {isSuccess ? (
          <div className="rounded-3xl p-8 sm:p-12 bg-[#12141F] border border-cyan-500/40 text-center space-y-6 shadow-[0_0_40px_rgba(0,240,255,0.15)] animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0,240,255,0.4)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">Заявка #{applicationId} принята</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">Добро пожаловать в отборочный пул!</h3>
              <p className="text-gray-300 max-w-lg mx-auto text-sm leading-relaxed">
                Твоя анкета успешно поступила кураторам агентства ARRIVA. Мы свяжемся с тобой в Telegram в течение 24 часов для согласования концепта и первичного собеседования.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 max-w-md mx-auto text-xs text-gray-400 font-mono">
              Пожалуйста, держи личные сообщения в Telegram открытыми.
            </div>

            <button
              onClick={() => {
                setIsSuccess(false);
                setStep(1);
              }}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wider uppercase transition-colors"
            >
              Отправить ещё одну заявку
            </button>
          </div>
        ) : (
          /* Multi-Step Application Form */
          <form onSubmit={handleSubmit} className="rounded-3xl p-6 sm:p-10 bg-[#12141F] border border-white/10 text-left relative shadow-2xl">
            {/* Step Progress Header */}
            <div className="mb-8 pb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-1">
                  {activeTab === 'standard' ? 'Анкета: Классический стриминг' : 'Анкета: Взрослый сегмент 18+'}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {step === 1 && 'Шаг 1: Контакты и техническая база'}
                  {step === 2 && (activeTab === 'standard' ? 'Шаг 2: Голос, образ и характер' : 'Шаг 2: Границы, архетип и раскрепощенность')}
                  {step === 3 && 'Шаг 3: Психология, реакции и готовность'}
                </h3>
              </div>

              {/* Progress Dots */}
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`w-8 h-2 rounded-full transition-all ${
                      step === s 
                        ? (activeTab === 'standard' ? 'bg-cyan-400 w-10' : 'bg-pink-500 w-10') 
                        : (step > s ? 'bg-white/40' : 'bg-white/10')
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            {/* ============================================================== */}
            {/* АНКЕТА 1: ОБЫЧНЫЙ ВИТУБИНГ */}
            {/* ============================================================== */}
            {activeTab === 'standard' && (
              <div className="space-y-6">
                {/* STEP 1 */}
                {step === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                          1. Никнейм в Telegram для связи *
                        </label>
                        <input
                          type="text"
                          required
                          value={stdForm.telegram}
                          onChange={(e) => handleStdChange('telegram', e.target.value)}
                          placeholder="@username"
                          className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                          2. Страна и город проживания *
                        </label>
                        <input
                          type="text"
                          required
                          value={stdForm.countryCity}
                          onChange={(e) => handleStdChange('countryCity', e.target.value)}
                          placeholder="Например: Россия, Москва"
                          className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                          3. Полных лет *
                        </label>
                        <input
                          type="number"
                          required
                          min="16"
                          max="80"
                          value={stdForm.age}
                          onChange={(e) => handleStdChange('age', e.target.value)}
                          placeholder="18"
                          className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                          5. Готовность предоставить паспорт для верификации *
                        </label>
                        <select
                          value={stdForm.passportReady}
                          onChange={(e) => handleStdChange('passportReady', e.target.value)}
                          className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                        >
                          <option value="Да">Да, готов</option>
                          <option value="Нет">Нет, не готов</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                        4. Параметры компьютера: видеокарта, процессор, микрофон *
                      </label>
                      <input
                        type="text"
                        required
                        value={stdForm.pcSpecs}
                        onChange={(e) => handleStdChange('pcSpecs', e.target.value)}
                        placeholder="RTX 3060, i5-12400, микрофон Fifine / HyperX"
                        className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                        6. Опыт работы с криптовалютными кошельками (USDT) *
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {['Да', 'Нет', 'Нужна инструкция'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleStdChange('cryptoExperience', opt)}
                            className={`py-3 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                              stdForm.cryptoExperience === opt
                                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                                : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                        7. Реальный уровень разговорного английского
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          'Могу спонтанно шутить',
                          'Строю простые фразы',
                          'Нужен постоянный переводчик'
                        ].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleStdChange('englishLevel', opt)}
                            className={`py-3 px-4 rounded-xl border text-xs font-semibold text-left transition-all ${
                              stdForm.englishLevel === opt
                                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                                : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                        8. Твой тембр и манера речи
                      </label>
                      <input
                        type="text"
                        value={stdForm.voiceTimbre}
                        onChange={(e) => handleStdChange('voiceTimbre', e.target.value)}
                        placeholder="Голос звонкий, низкий, с хрипотцой, тараторишь или говоришь медленно?"
                        className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                        9. Твое амплуа в компании друзей
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['Заводила', 'Язвительный циник', 'Серый кардинал', 'Генератор абсурда'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleStdChange('roleInFriends', opt)}
                            className={`py-3 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                              stdForm.roleInFriends === opt
                                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                                : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                        10. Твоя главная странность или слабость, над которой обычно смеются близкие
                      </label>
                      <input
                        type="text"
                        value={stdForm.quirkOrWeakness}
                        onChange={(e) => handleStdChange('quirkOrWeakness', e.target.value)}
                        placeholder="Опиши коротко..."
                        className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                        11. Что способно мгновенно вывести тебя из равновесия
                      </label>
                      <input
                        type="text"
                        value={stdForm.triggers}
                        onChange={(e) => handleStdChange('triggers', e.target.value)}
                        placeholder="Тупость, медлительность, наглая ложь или критика?"
                        className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                        12. Если чат замолчит на 10 минут, какую тему ты начнешь обсуждать вслух с самим собой?
                      </label>
                      <textarea
                        rows="2"
                        value={stdForm.silentChatTopic}
                        onChange={(e) => handleStdChange('silentChatTopic', e.target.value)}
                        placeholder="О чем будешь рассуждать перед микрофоном..."
                        className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                      ></textarea>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                        13. Любимые игровые вселенные и жанры
                      </label>
                      <input
                        type="text"
                        value={stdForm.favoriteGenres}
                        onChange={(e) => handleStdChange('favoriteGenres', e.target.value)}
                        placeholder="Киберпанк, темное фэнтези, пиксельные инди или соревновательные шутеры"
                        className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                        14. Как реагируешь на открытый хейт в комментариях
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {['Ядовитый сарказм', 'Холодный бан', 'Вступаю в словесную драку'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleStdChange('hateReaction', opt)}
                            className={`py-3 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                              stdForm.hateReaction === opt
                                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                                : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                        15. Какая виртуальная оболочка тебе ближе всего
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          'Капризная цундере',
                          'Психопатичный хакер',
                          'Уставший боевой андроид',
                          'Надменная аристократка'
                        ].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleStdChange('preferredAvatar', opt)}
                            className={`py-3 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                              stdForm.preferredAvatar === opt
                                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                                : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                          16. Способность громко орать, визжать и выдавать гипертрофированные реакции
                        </label>
                        <select
                          value={stdForm.screamAbility}
                          onChange={(e) => handleStdChange('screamAbility', e.target.value)}
                          className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                        >
                          <option value="Да, легко по щелчку пальцев">Да, легко по щелчку пальцев</option>
                          <option value="Умеренно, нужно разогреться">Умеренно, нужно разогреться</option>
                          <option value="Предпочитаю спокойную подачу">Предпочитаю спокойную подачу</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                          17. Сколько часов в неделю готов работать у микрофона?
                        </label>
                        <input
                          type="text"
                          value={stdForm.hoursPerWeek}
                          onChange={(e) => handleStdChange('hoursPerWeek', e.target.value)}
                          placeholder="Например: 15-20 часов"
                          className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                        18. Твоя скрытая цель в проекте
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          'Финансовая независимость',
                          'Медийность и признание',
                          'Безопасное творчество без лица'
                        ].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleStdChange('hiddenGoal', opt)}
                            className={`py-3 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                              stdForm.hiddenGoal === opt
                                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                                : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================== */}
            {/* АНКЕТА 2: ВЗРОСЛЫЙ СЕГМЕНТ 18+ */}
            {/* ============================================================== */}
            {activeTab === 'adult' && (
              <div className="space-y-6">
                {/* 18+ Disclaimer Banner */}
                <div className="p-4 rounded-xl bg-pink-950/40 border border-pink-500/30 flex items-center gap-3 text-xs text-pink-200">
                  <ShieldAlert className="w-5 h-5 text-pink-400 shrink-0" />
                  <span>Строго от 18 лет. Вопросы выявляют готовность к эротическому контенту, личные табу и психологические границы.</span>
                </div>

                {/* STEP 1 */}
                {step === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                          1. Никнейм в Telegram для связи *
                        </label>
                        <input
                          type="text"
                          required
                          value={adultForm.telegram}
                          onChange={(e) => handleAdultChange('telegram', e.target.value)}
                          placeholder="@username"
                          className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                          2. Страна проживания и часовой пояс (UTC) *
                        </label>
                        <input
                          type="text"
                          required
                          value={adultForm.countryTimezone}
                          onChange={(e) => handleAdultChange('countryTimezone', e.target.value)}
                          placeholder="Россия, Москва (UTC+3)"
                          className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                          3. Твой реальный возраст (Строго от 18 лет) *
                        </label>
                        <input
                          type="number"
                          required
                          min="18"
                          max="80"
                          value={adultForm.age}
                          onChange={(e) => handleAdultChange('age', e.target.value)}
                          placeholder="18+"
                          className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                          5. Загранпаспорт или внутренний паспорт для верификации *
                        </label>
                        <select
                          value={adultForm.passportVerified}
                          onChange={(e) => handleAdultChange('passportVerified', e.target.value)}
                          className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white focus:border-pink-500 focus:outline-none transition-colors"
                        >
                          <option value="Да">Да, есть в наличии</option>
                          <option value="Нет">Нет в наличии</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                        4. Технические характеристики ПК: видеокарта, процессор, микрофон *
                      </label>
                      <input
                        type="text"
                        required
                        value={adultForm.pcSpecs}
                        onChange={(e) => handleAdultChange('pcSpecs', e.target.value)}
                        placeholder="Видеокарта, процессор, модель микрофона"
                        className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                        6. Опыт приема выплат в криптовалюте (USDT) *
                      </label>
                      <input
                        type="text"
                        value={adultForm.cryptoExperience}
                        onChange={(e) => handleAdultChange('cryptoExperience', e.target.value)}
                        placeholder="Да, свободно принимаю / Нужна помощь с настройкой кошелька"
                        className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                        7. Уровень английского для переписки и голосового контакта
                      </label>
                      <input
                        type="text"
                        value={adultForm.englishLevel}
                        onChange={(e) => handleAdultChange('englishLevel', e.target.value)}
                        placeholder="Свободный флирт / средний / только с переводчиком"
                        className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                        8. Готовность к тому, что 3D-персонаж будет раздеваться и принимать позы за донаты
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Да, полностью готов(а)', 'Есть сомнения / нужны рамки'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleAdultChange('stripReady', opt)}
                            className={`py-3 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                              adultForm.stripReady === opt
                                ? 'bg-pink-500/20 border-pink-500 text-pink-300'
                                : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                        9. Твой комфортный архетип в эротическом общении
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['Властная доминантка', 'Послушная горничная', 'Испорченная оторва', 'Холодная госпожа'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleAdultChange('eroticArchetype', opt)}
                            className={`py-3 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                              adultForm.eroticArchetype === opt
                                ? 'bg-pink-500/20 border-pink-500 text-pink-300'
                                : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                        10. Опыт в интимной переписке, вебкаме, откровенном ролеплее или озвучке взрослого контента
                      </label>
                      <input
                        type="text"
                        value={adultForm.previousExperience}
                        onChange={(e) => handleAdultChange('previousExperience', e.target.value)}
                        placeholder="Опиши свой опыт или напиши «без опыта»"
                        className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                        11. Готовность контролировать дыхание, стонать, переходить на интимный шепот без стыда
                      </label>
                      <select
                        value={adultForm.breathAndMoanReady}
                        onChange={(e) => handleAdultChange('breathAndMoanReady', e.target.value)}
                        className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white focus:border-pink-500 focus:outline-none transition-colors"
                      >
                        <option value="Да, делаю это уверенно">Да, делаю это уверенно</option>
                        <option value="Справлюсь после пары репетиций">Справлюсь после пары репетиций</option>
                        <option value="Есть стеснение">Есть стеснение</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                        12. Какие темы и фетиши вызывают у тебя живой интерес, а не отторжение?
                      </label>
                      <textarea
                        rows="2"
                        value={adultForm.fetishInterests}
                        onChange={(e) => handleAdultChange('fetishInterests', e.target.value)}
                        placeholder="Интересные тебе ролевые сценарии, темы..."
                        className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"
                      ></textarea>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                        13. Твои абсолютные психологические табу: какие запросы не выполнишь даже за $1000?
                      </label>
                      <textarea
                        rows="2"
                        value={adultForm.absoluteTaboos}
                        onChange={(e) => handleAdultChange('absoluteTaboos', e.target.value)}
                        placeholder="Строгие границы, которые ты никогда не переступишь..."
                        className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"
                      ></textarea>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                        14. Реакция на грязные фантазии, фетишистские капризы и неадекватные предложения в ЛС
                      </label>
                      <input
                        type="text"
                        value={adultForm.kinkReaction}
                        onChange={(e) => handleAdultChange('kinkReaction', e.target.value)}
                        placeholder="Спокойное модерирование / игнор / умелый перевод в платный контент"
                        className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                        15. Готовность наговаривать короткие эротические аудиосообщения по готовым сценариям
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Да, готов(а)', 'Нет, не готов(а)'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleAdultChange('voiceMessagesReady', opt)}
                            className={`py-3 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                              adultForm.voiceMessagesReady === opt
                                ? 'bg-pink-500/20 border-pink-500 text-pink-300'
                                : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                          16. Желаемый баланс в эфирах
                        </label>
                        <select
                          value={adultForm.streamBalance}
                          onChange={(e) => handleAdultChange('streamBalance', e.target.value)}
                          className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white focus:border-pink-500 focus:outline-none transition-colors"
                        >
                          <option value="Эстетичный флирт">Эстетичный флирт</option>
                          <option value="Откровенное безумие с жесткими ролевыми элементами">Откровенное безумие с ролевыми элементами</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                          17. Сколько дней в неделю планируешь выходить в трансляции?
                        </label>
                        <input
                          type="text"
                          value={adultForm.daysPerWeek}
                          onChange={(e) => handleAdultChange('daysPerWeek', e.target.value)}
                          placeholder="Например: 4-5 дней"
                          className="w-full bg-[#0A0B10] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-gray-300 block mb-2 font-semibold">
                        18. Что для тебя важнее?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          'Предельный заработок в валюте',
                          'Сохранение жестких личных рамок'
                        ].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleAdultChange('priorityGoal', opt)}
                            className={`py-3 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                              adultForm.priorityGoal === opt
                                ? 'bg-pink-500/20 border-pink-500 text-pink-300'
                                : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="pt-8 mt-8 border-t border-white/10 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center gap-2"
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
                  className={`px-8 py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2 ${
                    activeTab === 'standard'
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-black shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:brightness-110'
                      : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:brightness-110'
                  }`}
                >
                  Далее <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-4 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2.5 disabled:opacity-50 ${
                    activeTab === 'standard'
                      ? 'bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 text-black shadow-[0_0_30px_rgba(0,240,255,0.5)] hover:brightness-110'
                      : 'bg-gradient-to-r from-pink-500 via-rose-400 to-purple-600 text-white shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:brightness-110'
                  }`}
                >
                  {isSubmitting ? (
                    <>Отправка анкеты...</>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Отправить анкету куратору
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        )}

      </div>
    </section>
  );
};
