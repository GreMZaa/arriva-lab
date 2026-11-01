import React from 'react';
import { Check } from 'lucide-react';

export const CyberPartnership = () => {
  return (
    <section id="partnership" className="py-24 bg-[#090A0E] border-b border-white/[0.07] relative text-left">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest bg-white/[0.04] border border-white/10 px-3 py-1 rounded-full">
            Блок 03 // Распределение прибыли
          </span>
          <h2 className="text-white text-3xl sm:text-5xl font-bold tracking-tight">
            Суть партнерства
          </h2>
          <p className="text-neutral-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Честное разделение прибыли без скрытых поборов. Мы не берем денег за вход и не обещаем копеечные оклады. Мы вкладываем свои мощности в сетап, маркетинг и софт.
          </p>
        </div>

        {/* Contrast Cards with Percentages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Card 1: Стартовый этап */}
          <div className="rounded-2xl p-8 sm:p-10 bg-[#12141A] border border-white/[0.08] flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider bg-white/[0.04] border border-white/5 px-3 py-1 rounded-md">
                  Старт сотрудничества
                </span>
                <span className="text-xs font-mono text-neutral-400">Этап 01</span>
              </div>

              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl sm:text-6xl font-bold text-white font-mono tracking-tight">70%</span>
                  <span className="text-lg font-semibold text-neutral-300">доход модели</span>
                </div>
                <p className="text-xs font-mono text-neutral-400 mt-2">
                  Доля агентства: <span className="text-white font-semibold">30%</span> (инвестиции в софт, модель и продвижение)
                </p>
              </div>

              <p className="text-neutral-300 text-sm leading-relaxed border-t border-white/[0.06] pt-4">
                На старте модель забирает 70% от всех входящих денег: платные подписки, донаты, подарки и рекламные контракты. Наша доля составляет 30%.
              </p>

              <ul className="space-y-2.5 text-xs text-neutral-300 font-medium">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#9FE870] shrink-0" />
                  Полный продакшн 3D/2D аватара
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#9FE870] shrink-0" />
                  Настройка стримингового софта и калибровка
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#9FE870] shrink-0" />
                  Продвижение и выход на зарубежную аудиторию
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: Масштабирование */}
          <div className="rounded-2xl p-8 sm:p-10 bg-[#161822] border border-[#9FE870]/30 flex flex-col justify-between relative">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs font-bold text-[#9FE870] uppercase tracking-wider bg-[#9FE870]/10 border border-[#9FE870]/20 px-3 py-1 rounded-md">
                  Масштабирование
                </span>
                <span className="text-xs font-mono text-[#9FE870]">Этап 02</span>
              </div>

              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl sm:text-6xl font-bold text-[#9FE870] font-mono tracking-tight">До 85%</span>
                  <span className="text-lg font-semibold text-white">доход модели</span>
                </div>
                <p className="text-xs font-mono text-neutral-400 mt-2">
                  Доля агентства снижается до: <span className="text-white font-semibold">15%</span>
                </p>
              </div>

              <p className="text-neutral-300 text-sm leading-relaxed border-t border-white/[0.06] pt-4">
                Дольше работаем вместе, выше твои обороты — агентский процент снижается вплоть до 15%. Чем сильнее ты растешь, тем выгоднее проект для обеих сторон.
              </p>

              <ul className="space-y-2.5 text-xs text-neutral-300 font-medium">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#9FE870] shrink-0" />
                  Снижение агентской доли до минимальных 15%
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#9FE870] shrink-0" />
                  Приоритетное финансирование апгрейдов аватара
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#9FE870] shrink-0" />
                  Индивидуальный продюсерский план
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiet Footnote */}
        <div className="max-w-2xl mx-auto text-center text-xs text-neutral-400 font-mono">
          Никаких платных входов или комиссий за обучение. Мы зарабатываем строго как процент от реального дохода.
        </div>
      </div>
    </section>
  );
};
