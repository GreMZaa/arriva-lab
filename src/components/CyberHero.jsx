import React from 'react';
import { ArrowDown, TrendingUp, Sparkles, Wallet, EyeOff } from 'lucide-react';

export const CyberHero = ({ onChooseFormatClick }) => {
  const facts = [
    {
      icon: EyeOff,
      title: 'Полная анонимность',
      text: 'без показа реального лица и паспорта зрителям.',
    },
    {
      icon: TrendingUp,
      title: 'От 70% до 80%',
      text: 'чистой прибыли со всех донатов, подписок и рекламы идёт тебе.',
    },
    {
      icon: Sparkles,
      title: 'Бесплатный запуск с нуля',
      text: 'модель и софт оплачивает агентство.',
    },
    {
      icon: Wallet,
      title: 'Выплаты в USDT',
      text: 'на криптокошелёк без банковских блокировок.',
    },
  ];

  return (
    <section className="relative py-16 lg:py-28 border-b border-white/[0.06] stage-canvas overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        <div className="lg:col-span-7 space-y-8 text-left">
          <div className="badge-on-air">
            <span className="rec-dot" aria-hidden />
            ON AIR · продюсерский центр Arriva Lab
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#f5f0e8] leading-[1.08]">
            Если ты здесь — ты хочешь{' '}
            <span className="text-live">зарабатывать</span> на стриме. Мы запускаем тебя под ключ.
          </h1>

          <p className="text-stone-400 text-base sm:text-lg max-w-xl leading-relaxed">
            Забудь про офис за 30–40 тысяч и страх показать лицо. Мы создаём 3D-аватара под твой
            психотип, настраиваем софт, даём куратора и выводим на рынок США и Европы. Ты в эфире из
            дома — мы берём рутину, технику и продвижение.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {facts.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.title}
                  className="panel-stage p-4 flex items-start gap-3 transition-colors hover:border-chroma/25"
                >
                  <span className="p-2 rounded-sm bg-chroma/10 text-chroma shrink-0">
                    <Icon className="w-4 h-4" />
                  </span>
                  <p className="text-sm text-stone-300 leading-snug">
                    <strong className="text-[#f5f0e8] font-semibold">{item.title}</strong> — {item.text}
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="pt-2">
            <a
              href="#formats"
              onClick={onChooseFormatClick}
              className="btn-live px-8 py-4 text-sm gap-2"
            >
              Выбрать формат участия
              <ArrowDown className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="safe-frame w-full max-w-[400px] panel-stage overflow-hidden border-chroma/20">
            <div className="relative aspect-[5/6] max-h-[520px] overflow-hidden">
              <img
                src="/hero_vtuber.png"
                alt="VTuber-аватар Arriva Lab"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stage-void via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-3 left-3 right-3 flex justify-between items-center gap-2 font-mono text-[10px] font-semibold">
                <span className="px-2 py-1 bg-stage-void/90 border border-chroma/30 text-chroma rounded-sm">
                  TRACK · 60fps
                </span>
                <span className="px-2 py-1 bg-stage-void/90 border border-live/30 text-live rounded-sm flex items-center gap-1">
                  <span className="rec-dot w-1.5 h-1.5" /> LIVE MASK
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-stage-void/90 border-t border-white/[0.08]">
                <p className="font-display text-xs font-bold tracking-wide text-[#f5f0e8]">
                  Аватар в эфире
                </p>
                <p className="text-[11px] text-stone-400 font-mono mt-1 leading-relaxed">
                  Мимика с веб-камеры в реальном времени. Личность за кадром.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
