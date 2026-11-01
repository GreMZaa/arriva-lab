import React from 'react';
import { Check } from 'lucide-react';

export const CyberPartnership = () => {
  return (
    <section id="partnership" className="py-24 bg-[#FAFAFC] border-b border-gray-200 relative text-left">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs text-gray-500 uppercase tracking-widest bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm font-semibold">
            Блок 03 // Распределение прибыли
          </span>
          <h2 className="text-gray-900 text-3xl sm:text-5xl font-black tracking-tight">
            Суть партнерства
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Честное разделение прибыли без скрытых поборов. Мы не берем денег за вход и не обещаем копеечные оклады. Мы вкладываем свои мощности в сетап, маркетинг и софт.
          </p>
        </div>

        {/* Contrast Cards with Percentages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Card 1: Стартовый этап */}
          <div className="rounded-2xl p-8 sm:p-10 bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs font-bold text-gray-700 uppercase tracking-wider bg-gray-100 border border-gray-200 px-3 py-1 rounded-md">
                  Старт сотрудничества
                </span>
                <span className="text-xs font-mono text-gray-400 font-semibold">Этап 01</span>
              </div>

              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl sm:text-6xl font-black text-gray-900 font-mono tracking-tight">70%</span>
                  <span className="text-lg font-bold text-gray-700">доход модели</span>
                </div>
                <p className="text-xs font-mono text-gray-500 mt-2">
                  Доля агентства: <span className="text-gray-900 font-bold">30%</span> (инвестиции в софт, модель и продвижение)
                </p>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4 font-normal">
                На старте модель забирает 70% от всех входящих денег: платные подписки, донаты, подарки и рекламные контракты. Наша доля составляет 30%.
              </p>

              <ul className="space-y-2.5 text-xs text-gray-700 font-medium">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  Полный продакшн 3D/2D аватара
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  Настройка стримингового софта и калибровка
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  Продвижение и выход на зарубежную аудиторию
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: Масштабирование */}
          <div className="rounded-2xl p-8 sm:p-10 bg-gray-900 text-white shadow-xl flex flex-col justify-between relative border border-gray-800">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-md">
                  Масштабирование
                </span>
                <span className="text-xs font-mono text-gray-400 font-semibold">Этап 02</span>
              </div>

              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl sm:text-6xl font-black text-emerald-400 font-mono tracking-tight">До 85%</span>
                  <span className="text-lg font-bold text-white">доход модели</span>
                </div>
                <p className="text-xs font-mono text-gray-400 mt-2">
                  Доля агентства снижается до: <span className="text-emerald-400 font-bold">15%</span>
                </p>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed border-t border-white/10 pt-4 font-normal">
                Дольше работаем вместе, выше твои обороты — агентский процент снижается вплоть до 15%. Чем сильнее ты растешь, тем выгоднее проект для обеих сторон.
              </p>

              <ul className="space-y-2.5 text-xs text-gray-200 font-medium">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  Снижение агентской доли до минимальных 15%
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  Приоритетное финансирование апгрейдов аватара
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  Индивидуальный продюсерский план
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiet Footnote */}
        <div className="max-w-2xl mx-auto text-center text-xs text-gray-500 font-mono">
          Никаких платных входов или комиссий за обучение. Мы зарабатываем строго как процент от реального дохода.
        </div>
      </div>
    </section>
  );
};
