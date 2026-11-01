import React from 'react';
import { Percent, TrendingUp, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const CyberPartnership = () => {
  return (
    <section id="partnership" className="py-24 bg-[#0A0B10] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest bg-cyan-950/50 border border-cyan-500/30 px-3 py-1 rounded-full">
            Блок 03 // Модель сотрудничества
          </span>
          <h2 className="text-white text-3xl sm:text-5xl font-black tracking-tight">
            Суть партнерства
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Честное разделение прибыли без скрытых поборов. Мы не берем денег за вход и не обещаем копеечные оклады. Мы вкладываем свои мощности в сетап, маркетинг и софт.
          </p>
        </div>

        {/* Contrast Cards with Percentages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Card 1: Старт */}
          <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-[#141724] to-[#0E1018] border border-cyan-500/30 shadow-[0_0_30px_rgba(0,240,255,0.15)] flex flex-col justify-between text-left">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider bg-cyan-950/80 border border-cyan-500/40 px-3 py-1 rounded-full">
                  Стартовый этап
                </span>
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-5xl sm:text-6xl font-black text-white font-mono">70%</span>
                <span className="text-xl font-bold text-cyan-400">доход модели</span>
              </div>

              <div className="text-sm font-mono text-gray-400 pb-2 border-b border-white/10">
                Доля агентства на старте: <span className="text-white font-bold">30%</span> (реинвестиции в маркетинг и сетап)
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                На старте модель забирает 70% от всех входящих денег: платные подписки, донаты, подарки и рекламные контракты. Наша доля составляет 30%.
              </p>

              <ul className="space-y-2.5 text-xs text-gray-300 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  Полный сетап 3D/2D-модели под ключ
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  Техподдержка и калибровка софта
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  Маркетинг и продвижение на зарубежных площадках
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: Масштабирование */}
          <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-[#1E1428] to-[#120E1A] border border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col justify-between text-left">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs font-bold text-purple-400 uppercase tracking-wider bg-purple-950/80 border border-purple-500/40 px-3 py-1 rounded-full">
                  Масштабирование
                </span>
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-5xl sm:text-6xl font-black text-white font-mono">До 85%</span>
                <span className="text-xl font-bold text-purple-400">доход модели</span>
              </div>

              <div className="text-sm font-mono text-gray-400 pb-2 border-b border-white/10">
                Доля агентства снижается до: <span className="text-emerald-400 font-bold">15%</span>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                Дольше работаем вместе, выше твои обороты — агентский процент снижается вплоть до 15%. Чем сильнее ты растешь, тем выгоднее проект для обеих сторон.
              </p>

              <ul className="space-y-2.5 text-xs text-gray-300 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  Снижение агентского процента с 30% до 15%
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  Приоритетное финансирование апгрейдов аватара
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  Юридическое и налоговое сопровождение
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Callout */}
        <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 text-center text-sm text-gray-300 font-medium">
          💡 <strong className="text-white">Нулевой финансовый риск:</strong> Никаких предварительных платежей, скрытых аренд или комиссий за рассмотрение заявки. Мы зарабатываем только тогда, когда зарабатываешь ты.
        </div>
      </div>
    </section>
  );
};
