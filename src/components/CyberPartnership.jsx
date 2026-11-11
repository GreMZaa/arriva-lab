import React from 'react';
import { Check } from 'lucide-react';

export const CyberPartnership = () => {
  return (
    <section id="partnership" className="py-20 lg:py-24 bg-dossier border-b border-dossier-border text-left">
      <div className="max-w-7xl mx-auto px-6">
        <header className="max-w-2xl mb-14 space-y-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dossier-muted font-semibold">
            Распределение прибыли
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-dossier-ink tracking-tight">
            Суть партнёрства
          </h2>
          <p className="text-dossier-muted text-base leading-relaxed">
            Без платного входа и копеечных окладов. Мы вкладываемся в сетап, маркетинг и софт — забираем процент с реальной кассы.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          <article className="rounded-sm p-8 sm:p-10 bg-white border border-dossier-border">
            <p className="font-mono text-[10px] uppercase tracking-widest text-dossier-muted mb-6">Этап 01 · старт</p>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-5xl sm:text-6xl font-extrabold font-display text-dossier-ink">70%</span>
              <span className="text-sm font-semibold text-dossier-muted">модели</span>
            </div>
            <p className="text-sm text-dossier-muted leading-relaxed border-t border-dossier-border pt-4 mb-5">
              Подписки, донаты, реклама — твои 70%. Агентство 30% за продакшн, софт и продвижение.
            </p>
            <ul className="space-y-2 text-sm text-dossier-ink">
              {['Полный продакшн аватара', 'Настройка софта и калибровка', 'Выход на зарубежную аудиторию'].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-chroma-dim shrink-0" />
                    {t}
                  </li>
                )
              )}
            </ul>
          </article>

          <article className="rounded-sm p-8 sm:p-10 bg-dossier-ink text-[#f5f0e8] border border-stone-800">
            <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500 mb-6">Этап 02 · рост</p>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-5xl sm:text-6xl font-extrabold font-display text-live">до 80%</span>
              <span className="text-sm font-semibold text-stone-400">модели</span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed border-t border-white/10 pt-4 mb-5">
              После стабильного месяца снижаем долю до 20% — максимум в твою пользу.
            </p>
            <ul className="space-y-2 text-sm text-stone-300">
              {['Снижение агентской доли', 'Финансирование апгрейдов', 'Индивидуальный продюсерский план'].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-chroma shrink-0" />
                    {t}
                  </li>
                )
              )}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
};
