import React from 'react';
import { ShieldCheck, Lock, Coins, ArrowRightLeft, FileCheck2, Globe2, EyeOff } from 'lucide-react';

export const CyberSafetyPayouts = () => {
  return (
    <section id="safety" className="py-24 bg-[#0D0E15] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* БЛОК 5: Анонимность и документы */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest bg-cyan-950/50 border border-cyan-500/30 px-3 py-1 rounded-full">
              Блок 04 // Безопасность
            </span>
            <h2 className="text-white text-3xl sm:text-4xl font-black tracking-tight">
              Анонимность и документы
            </h2>
          </div>

          <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 bg-[#12141F] border border-cyan-500/30 shadow-[0_0_30px_rgba(0,240,255,0.08)] text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
              <div className="md:col-span-3 flex justify-center">
                <div className="w-24 h-24 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                  <EyeOff className="w-12 h-12" />
                </div>
              </div>

              <div className="md:col-span-9 space-y-4">
                <p className="text-gray-200 text-base sm:text-lg leading-relaxed font-normal">
                  <strong className="text-white font-bold">Зрители никогда не узнают твое настоящее имя, лицо, город или домашний адрес.</strong> Экранная анонимность гарантирована условиями нашего контракта.
                </p>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  При этом паспорт необходим нам для регистрации твоих профилей на международных платформах. Стриминговые площадки требуют строгую верификацию возраста. Мы защищаем тебя от сталкеров, но работаем строго в рамках правового поля.
                </p>

                <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-cyan-300">
                  <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-lg border border-cyan-500/20">
                    <Lock className="w-3.5 h-3.5 text-cyan-400" /> Договор о неразглашении (NDA)
                  </span>
                  <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-lg border border-cyan-500/20">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Защита от деанонимизации
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* БЛОК 6: Выплаты */}
        <div id="payouts">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="font-mono text-xs text-purple-400 uppercase tracking-widest bg-purple-950/50 border border-purple-500/30 px-3 py-1 rounded-full">
              Блок 05 // Финансовый рельс
            </span>
            <h2 className="text-white text-3xl sm:text-4xl font-black tracking-tight">
              Выплаты
            </h2>
          </div>

          <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 bg-[#12141F] border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.08)] text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
              <div className="md:col-span-3 flex justify-center">
                <div className="w-24 h-24 rounded-3xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                  <Coins className="w-12 h-12" />
                </div>
              </div>

              <div className="md:col-span-9 space-y-4">
                <p className="text-gray-200 text-base sm:text-lg leading-relaxed font-normal">
                  <strong className="text-white font-bold">Все расчеты идут в USDT.</strong> Зарубежные платформы блокируют прямые переводы на обычные банковские карты.
                </p>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  Криптовалюта доходит за секунды в любую точку мира без лишних проверок. Мы даем понятные инструкции по созданию кошелька и безопасному выводу денег в твою местную валюту.
                </p>

                {/* Crypto Badges */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    USDT TRC-20
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 font-mono text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    USDT TON
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    USDT ERC-20 / Arbitrum
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
