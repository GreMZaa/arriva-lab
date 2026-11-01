import React from 'react';
import { Shield, Lock, ArrowUpRight } from 'lucide-react';

export const CyberSafetyPayouts = () => {
  return (
    <section id="safety" className="py-24 bg-[#0C0D12] border-b border-white/[0.07] relative text-left">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* БЛОК 5: Анонимность и документы */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest bg-white/[0.04] border border-white/10 px-3 py-1 rounded-full">
              Блок 04 // Защита личности
            </span>
            <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
              Анонимность и документы
            </h2>
          </div>

          <div className="max-w-4xl mx-auto rounded-2xl p-8 sm:p-12 bg-[#12141A] border border-white/[0.08]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-3 flex justify-center">
                <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white">
                  <Shield className="w-10 h-10 text-neutral-200" />
                </div>
              </div>

              <div className="md:col-span-9 space-y-4">
                <p className="text-white text-base sm:text-lg leading-relaxed font-normal">
                  <strong>Зрители никогда не узнают твое настоящее имя, лицо, город или домашний адрес.</strong> Экранная анонимность гарантирована условиями нашего контракта.
                </p>
                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                  При этом паспорт необходим нам для регистрации твоих профилей на международных платформах. Стриминговые площадки требуют строгую верификацию возраста. Мы защищаем тебя от сталкеров, но работаем строго в рамках правового поля.
                </p>

                <div className="pt-2 flex flex-wrap gap-3 text-xs font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 text-neutral-300">
                    <Lock className="w-3.5 h-3.5 text-neutral-400" /> NDA Контракт
                  </span>
                  <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 text-neutral-300">
                    Верификация 18+ без публичного следа
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* БЛОК 6: Выплаты */}
        <div id="payouts">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest bg-white/[0.04] border border-white/10 px-3 py-1 rounded-full">
              Блок 05 // Финансовый рельс
            </span>
            <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
              Выплаты
            </h2>
          </div>

          <div className="max-w-4xl mx-auto rounded-2xl p-8 sm:p-12 bg-[#12141A] border border-white/[0.08]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-3 flex justify-center">
                <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white">
                  <span className="text-2xl font-bold font-mono text-[#9FE870]">₮</span>
                </div>
              </div>

              <div className="md:col-span-9 space-y-4">
                <p className="text-white text-base sm:text-lg leading-relaxed font-normal">
                  <strong>Все расчеты идут в USDT.</strong> Зарубежные платформы блокируют прямые переводы на обычные банковские карты.
                </p>
                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                  Криптовалюта доходит за секунды в любую точку мира без лишних проверок. Мы даем понятные инструкции по созданию кошелька и безопасному выводу денег в твою местную валюту.
                </p>

                {/* Grounded crypto badges */}
                <div className="pt-2 flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-neutral-300 font-mono text-xs">
                    TRC-20
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-neutral-300 font-mono text-xs">
                    TON
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-neutral-300 font-mono text-xs">
                    ERC-20 / Arbitrum
                  </span>
                  <span className="text-neutral-400 text-xs font-mono ml-2">
                    Мгновенный вывод на любые карты
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
