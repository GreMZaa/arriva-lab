import React from 'react';
import { Shield, Lock } from 'lucide-react';

export const CyberSafetyPayouts = () => {
  return (
    <section id="safety" className="py-20 lg:py-24 bg-dossier border-b border-dossier-border text-left">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        <div>
          <header className="max-w-xl mb-10 space-y-2">
            <p className="font-mono text-[11px] uppercase tracking-widest text-dossier-muted font-semibold">
              Защита личности
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-dossier-ink">
              Анонимность и документы
            </h2>
          </header>

          <div className="max-w-4xl rounded-sm p-8 sm:p-10 bg-white border border-dossier-border">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-2 flex justify-center md:justify-start">
                <div className="w-16 h-16 rounded-sm bg-dossier border border-dossier-border flex items-center justify-center">
                  <Shield className="w-8 h-8 text-dossier-ink" />
                </div>
              </div>
              <div className="md:col-span-10 space-y-4">
                <p className="text-dossier-ink text-lg font-semibold leading-relaxed">
                  Зрители не узнают имя, лицо и город. Анонимность в кадре — в контракте.
                </p>
                <p className="text-dossier-muted text-sm sm:text-base leading-relaxed">
                  Паспорт нужен только для верификации 18+ на международных площадках — без публичного следа.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-dossier-muted">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-dossier border border-dossier-border">
                    <Lock className="w-3.5 h-3.5" /> NDA
                  </span>
                  <span className="px-3 py-1.5 rounded-sm bg-dossier border border-dossier-border">
                    Верификация 18+
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="payouts">
          <header className="max-w-xl mb-10 space-y-2">
            <p className="font-mono text-[11px] uppercase tracking-widest text-dossier-muted font-semibold">
              Финансы
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-dossier-ink">
              Выплаты
            </h2>
          </header>

          <div className="max-w-4xl rounded-sm p-8 sm:p-10 bg-white border border-dossier-border">
            <div>
              <p className="text-dossier-ink text-lg font-semibold leading-relaxed">
                Расчёты в USDT — площадки не переводят на обычные карты напрямую.
              </p>
              <p className="text-dossier-muted text-sm sm:text-base leading-relaxed mt-3">
                Покажем, как завести кошелёк и безопасно вывести в местную валюту.
              </p>
            </div>
            <div className="pt-4 flex flex-wrap gap-2">
              {['TRC-20', 'TON', 'ERC-20 / Arbitrum'].map((n) => (
                <span
                  key={n}
                  className="px-3 py-1 rounded-sm bg-dossier border border-dossier-border font-mono text-xs font-semibold text-dossier-ink"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
