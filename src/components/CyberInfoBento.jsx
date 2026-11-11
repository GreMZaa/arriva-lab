import React from 'react';
import { Tv, Sparkles, DollarSign, Percent, ArrowUpRight } from 'lucide-react';

const cards = [
  {
    num: '01',
    icon: Tv,
    title: 'Кто такой витубер и чем он занимается?',
    body: 'Витубер — стример, который общается через 3D-персонажа вместо веб-камеры. Программа переносит мимику с телефона или вебки на героя в реальном времени. Мы собираем образ строго под твой психотип: дерзкий кибер-тон или мягкий аниме — ты остаёшься собой под цифровой маской.',
    tags: '#Live2D #FaceTracking #3DCharacter',
  },
  {
    num: '2026',
    icon: Sparkles,
    title: 'Почему именно сейчас это разрывает интернет?',
    body: 'Обычные вебки приелись. Западная аудитория хочет яркий визуал и интерактив как в игре. Тебе не нужен макияж и идеальная комната — домашняя одежда, одна кнопка, и в кадре звезда мирового уровня.',
    tags: '#ZeroMakeup #GlobalAudience',
    accent: 'live',
  },
  {
    num: '$',
    icon: DollarSign,
    title: 'Почему люди будут платить тебе реальные деньги?',
    body: 'На Twitch, YouTube и Fansly платят за эмоции и шоу. Мы подключаем интерактив: донат — торт в лицо аватару, голосовой баг, хоррор-реакция или приватный флирт. Зрители управляют экраном и легко оставляют десятки и сотни долларов за вечер.',
    tags: '#Donations #Interactive',
  },
  {
    num: '70→80',
    icon: Percent,
    title: 'Честные деньги: 30% и снижение до 20%',
    body: 'Мы — продюсерский центр: старт 30% с кассы, тебе 70%. За это — 3D-модель, софт, аккаунты и наставник. После стабильного месяца снижаем до 20%, твоя доля до 80%. Нужны паспорт для верификации 18+ на площадках и криптокошелёк для выплат.',
    tags: '#70to80 #USDT',
    accent: 'live',
  },
];

export const CyberInfoBento = () => {
  return (
    <section id="details" className="py-20 lg:py-24 border-b border-white/[0.06] bg-stage-floor stage-canvas">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="max-w-2xl mb-14 space-y-4 text-left">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-chroma font-semibold">
            Перед стартом
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#f5f0e8]">
            Всё, что нужно знать
          </h2>
          <p className="text-stone-400 text-base sm:text-lg">
            Четыре честных ответа: от 3D-аватара до выплат и процентов.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            const accent = card.accent === 'live' ? 'live' : 'chroma';
            return (
              <article
                key={card.title}
                className="panel-stage p-8 sm:p-9 flex flex-col justify-between min-h-[280px] group hover:border-white/[0.12] transition-colors"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`p-2.5 rounded-sm bg-${accent === 'live' ? 'live' : 'chroma'}/10 text-${accent === 'live' ? 'live' : 'chroma'}`}
                      style={{
                        backgroundColor: accent === 'live' ? 'rgba(225,29,72,0.12)' : 'rgba(74,222,128,0.1)',
                        color: accent === 'live' ? '#e11d48' : '#4ade80',
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="font-mono text-xs text-stone-500 font-semibold">{card.num}</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#f5f0e8] leading-snug">
                    {card.title}
                  </h3>

                  <p className="text-stone-400 text-sm sm:text-base leading-relaxed">{card.body}</p>
                </div>

                <footer className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-stone-500">
                  <span>{card.tags}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                </footer>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
