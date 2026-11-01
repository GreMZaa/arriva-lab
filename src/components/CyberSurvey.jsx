import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  ShieldAlert
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
        particleCount: 50,
        spread: 60,
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
    <section id="apply" className="py-24 bg-[#090A0E] border-t border-white/[0.07] relative text-left">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest bg-white/[0.04] border border-white/10 px-3 py-1 rounded-full">
            Отборочный пул
          </span>
          <h2 className="text-white text-3xl sm:text-5xl font-bold tracking-tight">
            Подать анкету в агентство
          </h2>
          <p className="text-neutral-400 text-base">
            Выберите направление. Мы внимательно изучаем каждый ответ перед персональным контактом.
          </p>
        </div>

        {/* Direction Switcher Tabs */}
        {!isSuccess && (
          <div className="flex p-1.5 rounded-xl bg-[#12141A] border border-white/[0.08] mb-10 gap-2">
            <button
              type="button"
              onClick={() => { setActiveTab('standard'); setStep(1); }}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold text-xs tracking-wide transition-all ${
                activeTab === 'standard'
                  ? 'bg-[#9FE870] text-[#090A0E] shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              Обычный витубинг (Игры, шоу)
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('adult'); setStep(1); }}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold text-xs tracking-wide transition-all ${
                activeTab === 'adult'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              Взрослый сегмент 18+ (Fansly)
            </button>
          </div>
        )}

        {/* Success Screen */}
        {isSuccess ? (
          <div className="rounded-2xl p-8 sm:p-12 bg-[#12141A] border border-white/[0.08] text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#9FE870]/10 border border-[#9FE870]/20 text-[#9FE870] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Заявка #{applicationId} принята</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Анкета успешно отправлена</h3>
              <p className="text-neutral-300 max-w-lg mx-auto text-sm leading-relaxed">
                Куратор агентства свяжется с вами в Telegram в течение 24 часов для обсуждения концепта персонажа и деталей сотрудничества.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 max-w-md mx-auto text-xs text-neutral-400 font-mono">
              Пожалуйста, убедитесь, что ваш Telegram открыт для входящих сообщений.
            </div>

            <button
              onClick={() => {
                setIsSuccess(false);
                setStep(1);
              }}
              className="px-6 py-2.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 text-xs font-mono uppercase tracking-wider transition-colors"
            >
              Заполнить ещё одну анкету
            </button>
          </div>
        ) : (
          /* Multi-Step Application Form */
          <form onSubmit={handleSubmit} className="rounded-2xl p-6 sm:p-10 bg-[#12141A] border border-white/[0.08]">
            {/* Step Progress Header */}
            <div className="mb-8 pb-6 border-b border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider block mb-1">
                  Шаг {step} из 3
                </span>
                <h3 className="text-lg font-bold text-white">
                  {step === 1 && 'Контакты и конфигурация ПК'}
                  {step === 2 && (activeTab === 'standard' ? 'Голос, характер и юмор' : 'Границы, ролевой формат и опыт')}
                  {step === 3 && 'Психология и формат работы'}
                </h3>
              </div>

              {/* Minimal Line Stepper */}
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full transition-all ${
                      step === s 
                        ? (activeTab === 'standard' ? 'bg-[#9FE870] w-8' : 'bg-rose-500 w-8') 
                        : (step > s ? 'bg-white/40 w-4' : 'bg-white/10 w-4')
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
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                          1. Никнейм в Telegram для связи *
                        </label>
                        <input
                          type="text"
                          required
                          value={stdForm.telegram}
                          onChange={(e) => handleStdChange('telegram', e.target.value)}
                          placeholder="@username"
                          className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#9FE870] focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                          2. Страна и город проживания *
                        </label>
                        <input
                          type="text"
                          required
                          value={stdForm.countryCity}
                          onChange={(e) => handleStdChange('countryCity', e.target.value)}
                          placeholder="Россия, Москва"
                          className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#9FE870] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
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
                          className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#9FE870] focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                          5. Готовность предоставить паспорт для верификации *
                        </label>
                        <select
                          value={stdForm.passportReady}
                          onChange={(e) => handleStdChange('passportReady', e.target.value)}
                          className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#9FE870] focus:outline-none transition-colors"
                        >
                          <option value="Да">Да, готов</option>
                          <option value="Нет">Нет, не готов</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                        4. Параметры компьютера: видеокарта, процессор, микрофон *
                      </label>
                      <input
                        type="text"
                        required
                        value={stdForm.pcSpecs}
                        onChange={(e) => handleStdChange('pcSpecs', e.target.value)}
                        placeholder="RTX 3060, i5-12400, микрофон Fifine / Shure"
                        className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#9FE870] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                        6. Опыт работы с криптовалютными кошельками (USDT) *
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {['Да', 'Нет', 'Нужна инструкция'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleStdChange('cryptoExperience', opt)}
                            className={`py-3 px-3 rounded-xl border text-xs font-medium text-center transition-all ${
                              stdForm.cryptoExperience === opt
                                ? 'bg-white/10 border-white text-white'
                                : 'bg-[#090A0E] border-white/10 text-neutral-400 hover:text-white'
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
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
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
                            className={`py-3 px-4 rounded-xl border text-xs font-medium text-left transition-all ${
                              stdForm.englishLevel === opt
                                ? 'bg-white/10 border-white text-white'
                                : 'bg-[#090A0E] border-white/10 text-neutral-400 hover:text-white'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                        8. Твой тембр и манера речи
                      </label>
                      <input
                        type="text"
                        value={stdForm.voiceTimbre}
                        onChange={(e) => handleStdChange('voiceTimbre', e.target.value)}
                        placeholder="Звонкий, низкий, с хрипотцой, тараторишь или говоришь размеренно?"
                        className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#9FE870] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                        9. Твое амплуа в компании друзей
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['Заводила', 'Язвительный циник', 'Серый кардинал', 'Генератор абсурда'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleStdChange('roleInFriends', opt)}
                            className={`py-3 px-3 rounded-xl border text-xs font-medium text-center transition-all ${
                              stdForm.roleInFriends === opt
                                ? 'bg-white/10 border-white text-white'
                                : 'bg-[#090A0E] border-white/10 text-neutral-400 hover:text-white'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                        10. Твоя главная странность или слабость, над которой обычно смеются близкие
                      </label>
                      <input
                        type="text"
                        value={stdForm.quirkOrWeakness}
                        onChange={(e) => handleStdChange('quirkOrWeakness', e.target.value)}
                        placeholder="Опиши коротко..."
                        className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#9FE870] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                        11. Что способно мгновенно вывести тебя из равновесия
                      </label>
                      <input
                        type="text"
                        value={stdForm.triggers}
                        onChange={(e) => handleStdChange('triggers', e.target.value)}
                        placeholder="Тупость, медлительность, наглая ложь или критика?"
                        className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#9FE870] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                        12. Если чат замолчит на 10 минут, какую тему ты начнешь обсуждать вслух с самим собой?
                      </label>
                      <textarea
                        rows="2"
                        value={stdForm.silentChatTopic}
                        onChange={(e) => handleStdChange('silentChatTopic', e.target.value)}
                        placeholder="О чем будешь рассуждать перед микрофоном..."
                        className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#9FE870] focus:outline-none transition-colors"
                      ></textarea>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                        13. Любимые игровые вселенные и жанры
                      </label>
                      <input
                        type="text"
                        value={stdForm.favoriteGenres}
                        onChange={(e) => handleStdChange('favoriteGenres', e.target.value)}
                        placeholder="Киберпанк, темное фэнтези, пиксельные инди или соревновательные шутеры"
                        className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#9FE870] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                        14. Как реагируешь на открытый хейт в комментариях
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {['Ядовитый сарказм', 'Холодный бан', 'Вступаю в словесную драку'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleStdChange('hateReaction', opt)}
                            className={`py-3 px-3 rounded-xl border text-xs font-medium text-center transition-all ${
                              stdForm.hateReaction === opt
                                ? 'bg-white/10 border-white text-white'
                                : 'bg-[#090A0E] border-white/10 text-neutral-400 hover:text-white'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
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
                            className={`py-3 px-3 rounded-xl border text-xs font-medium text-center transition-all ${
                              stdForm.preferredAvatar === opt
                                ? 'bg-white/10 border-white text-white'
                                : 'bg-[#090A0E] border-white/10 text-neutral-400 hover:text-white'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                          16. Способность громко орать, визжать и выдавать гипертрофированные реакции
                        </label>
                        <select
                          value={stdForm.screamAbility}
                          onChange={(e) => handleStdChange('screamAbility', e.target.value)}
                          className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#9FE870] focus:outline-none transition-colors"
                        >
                          <option value="Да, легко по щелчку пальцев">Да, легко по щелчку пальцев</option>
                          <option value="Умеренно, нужно разогреться">Умеренно, нужно разогреться</option>
                          <option value="Предпочитаю спокойную подачу">Предпочитаю спокойную подачу</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                          17. Сколько часов в неделю готов работать у микрофона?
                        </label>
                        <input
                          type="text"
                          value={stdForm.hoursPerWeek}
                          onChange={(e) => handleStdChange('hoursPerWeek', e.target.value)}
                          placeholder="Например: 15-20 часов"
                          className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#9FE870] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
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
                            className={`py-3 px-3 rounded-xl border text-xs font-medium text-center transition-all ${
                              stdForm.hiddenGoal === opt
                                ? 'bg-white/10 border-white text-white'
                                : 'bg-[#090A0E] border-white/10 text-neutral-400 hover:text-white'
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
                <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/20 flex items-center gap-3 text-xs text-rose-200">
                  <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
                  <span>Строго от 18 лет. Анкета определяет личные табу, психологические границы и формат взаимодействия со взрослой аудиторией.</span>
                </div>

                {/* STEP 1 */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                          1. Никнейм в Telegram для связи *
                        </label>
                        <input
                          type="text"
                          required
                          value={adultForm.telegram}
                          onChange={(e) => handleAdultChange('telegram', e.target.value)}
                          placeholder="@username"
                          className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-rose-400 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                          2. Страна проживания и часовой пояс (UTC) *
                        </label>
                        <input
                          type="text"
                          required
                          value={adultForm.countryTimezone}
                          onChange={(e) => handleAdultChange('countryTimezone', e.target.value)}
                          placeholder="Россия, Москва (UTC+3)"
                          className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-rose-400 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
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
                          className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-rose-400 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                          5. Загранпаспорт или внутренний паспорт для верификации *
                        </label>
                        <select
                          value={adultForm.passportVerified}
                          onChange={(e) => handleAdultChange('passportVerified', e.target.value)}
                          className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-rose-400 focus:outline-none transition-colors"
                        >
                          <option value="Да">Да, есть в наличии</option>
                          <option value="Нет">Нет в наличии</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                        4. Технические характеристики ПК: видеокарта, процессор, микрофон *
                      </label>
                      <input
                        type="text"
                        required
                        value={adultForm.pcSpecs}
                        onChange={(e) => handleAdultChange('pcSpecs', e.target.value)}
                        placeholder="Видеокарта, процессор, модель микрофона"
                        className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-rose-400 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                        6. Опыт приема выплат в криптовалюте (USDT) *
                      </label>
                      <input
                        type="text"
                        value={adultForm.cryptoExperience}
                        onChange={(e) => handleAdultChange('cryptoExperience', e.target.value)}
                        placeholder="Да, свободно принимаю / Нужна помощь с кошельком"
                        className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-rose-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                        7. Уровень английского для переписки и голосового контакта
                      </label>
                      <input
                        type="text"
                        value={adultForm.englishLevel}
                        onChange={(e) => handleAdultChange('englishLevel', e.target.value)}
                        placeholder="Свободный флирт / средний / только с переводчиком"
                        className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-rose-400 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                        8. Готовность к тому, что 3D-персонаж будет раздеваться и принимать позы за донаты
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Да, полностью готов(а)', 'Есть сомнения / нужны рамки'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleAdultChange('stripReady', opt)}
                            className={`py-3 px-3 rounded-xl border text-xs font-medium text-center transition-all ${
                              adultForm.stripReady === opt
                                ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                                : 'bg-[#090A0E] border-white/10 text-neutral-400 hover:text-white'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                        9. Твой комфортный архетип в эротическом общении
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['Властная доминантка', 'Послушная горничная', 'Испорченная оторва', 'Холодная госпожа'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleAdultChange('eroticArchetype', opt)}
                            className={`py-3 px-3 rounded-xl border text-xs font-medium text-center transition-all ${
                              adultForm.eroticArchetype === opt
                                ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                                : 'bg-[#090A0E] border-white/10 text-neutral-400 hover:text-white'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                        10. Опыт в интимной переписке, вебкаме, ролеплее или озвучке взрослого контента
                      </label>
                      <input
                        type="text"
                        value={adultForm.previousExperience}
                        onChange={(e) => handleAdultChange('previousExperience', e.target.value)}
                        placeholder="Опиши свой опыт или напиши «без опыта»"
                        className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-rose-400 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                        11. Готовность контролировать дыхание, стонать, переходить на интимный шепот без стыда
                      </label>
                      <select
                        value={adultForm.breathAndMoanReady}
                        onChange={(e) => handleAdultChange('breathAndMoanReady', e.target.value)}
                        className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-rose-400 focus:outline-none transition-colors"
                      >
                        <option value="Да, делаю это уверенно">Да, делаю это уверенно</option>
                        <option value="Справлюсь после пары репетиций">Справлюсь после пары репетиций</option>
                        <option value="Есть стеснение">Есть стеснение</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                        12. Какие темы и фетиши вызывают у тебя живой интерес, а не отторжение?
                      </label>
                      <textarea
                        rows="2"
                        value={adultForm.fetishInterests}
                        onChange={(e) => handleAdultChange('fetishInterests', e.target.value)}
                        placeholder="Интересные тебе ролевые сценарии, темы..."
                        className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-rose-400 focus:outline-none transition-colors"
                      ></textarea>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                        13. Твои абсолютные психологические табу: какие запросы не выполнишь даже за $1000?
                      </label>
                      <textarea
                        rows="2"
                        value={adultForm.absoluteTaboos}
                        onChange={(e) => handleAdultChange('absoluteTaboos', e.target.value)}
                        placeholder="Строгие границы, которые ты никогда не переступишь..."
                        className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-rose-400 focus:outline-none transition-colors"
                      ></textarea>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                        14. Реакция на грязные фантазии, фетишистские капризы и неадекватные предложения в ЛС
                      </label>
                      <input
                        type="text"
                        value={adultForm.kinkReaction}
                        onChange={(e) => handleAdultChange('kinkReaction', e.target.value)}
                        placeholder="Спокойное модерирование / игнор / перевод в платный контент"
                        className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-rose-400 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                        15. Готовность наговаривать короткие эротические аудиосообщения по готовым сценариям
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Да, готов(а)', 'Нет, не готов(а)'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleAdultChange('voiceMessagesReady', opt)}
                            className={`py-3 px-3 rounded-xl border text-xs font-medium text-center transition-all ${
                              adultForm.voiceMessagesReady === opt
                                ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                                : 'bg-[#090A0E] border-white/10 text-neutral-400 hover:text-white'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                          16. Желаемый баланс в эфирах
                        </label>
                        <select
                          value={adultForm.streamBalance}
                          onChange={(e) => handleAdultChange('streamBalance', e.target.value)}
                          className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-rose-400 focus:outline-none transition-colors"
                        >
                          <option value="Эстетичный флирт">Эстетичный флирт</option>
                          <option value="Откровенное безумие с жесткими ролевыми элементами">Откровенное безумие с ролевыми элементами</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
                          17. Сколько дней в неделю планируешь выходить в трансляции?
                        </label>
                        <input
                          type="text"
                          value={adultForm.daysPerWeek}
                          onChange={(e) => handleAdultChange('daysPerWeek', e.target.value)}
                          placeholder="Например: 4-5 дней"
                          className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-rose-400 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 block mb-2 font-medium">
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
                            className={`py-3 px-3 rounded-xl border text-xs font-medium text-center transition-all ${
                              adultForm.priorityGoal === opt
                                ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                                : 'bg-[#090A0E] border-white/10 text-neutral-400 hover:text-white'
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
            <div className="pt-8 mt-8 border-t border-white/[0.06] flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 text-xs font-medium uppercase tracking-wider transition-colors flex items-center gap-2"
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
                  className={`px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                    activeTab === 'standard'
                      ? 'bg-[#9FE870] hover:bg-[#b0f283] text-[#090A0E]'
                      : 'bg-rose-600 hover:bg-rose-500 text-white'
                  }`}
                >
                  Далее <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2.5 disabled:opacity-50 ${
                    activeTab === 'standard'
                      ? 'bg-[#9FE870] hover:bg-[#b0f283] text-[#090A0E]'
                      : 'bg-rose-600 hover:bg-rose-500 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <>Отправка анкеты...</>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Отправить анкету
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
