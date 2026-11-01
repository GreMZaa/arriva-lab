import React from 'react';
import { ArrowDown, Activity } from 'lucide-react';

export const CyberHero = ({ onChooseFormatClick }) => {
  return (
    <section className="relative bg-[#090A0E] py-24 lg:py-36 border-b border-white/[0.08] text-left">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Column: Headlines & CTA */}
        <div className="lg:col-span-7 space-y-8">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-zinc-300 text-xs font-mono tracking-wide">
              Открыт набор стримеров на продюсирование.
            </span>
          </div>

          {/* H1 Headline - Solid White, No Gradient */}
          <h1 className="text-white tracking-tight leading-[1.08] font-bold text-4xl sm:text-5xl lg:text-[58px]">
            Зарабатывай на западном стриминге.{' '}
            <span className="text-zinc-400 font-normal">
              Твое настоящее лицо никто не увидит.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl font-normal leading-relaxed">
            Создаем 3D-аватара под твой голос, ставим сетап и выводим на аудиторию США. Ты стримишь из дома под цифровой броней — мы закрываем техническую часть и софт.
          </p>

          {/* Metrics in one row - Solid Matte Cards */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl pt-2">
            <div className="p-4 rounded-xl bg-[#13141C] border border-white/[0.08]">
              <p className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">100%</p>
              <p className="text-[11px] sm:text-xs text-zinc-400 mt-1 font-medium leading-snug">
                Анонимность личности (показ лица исключен)
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#13141C] border border-white/[0.08]">
              <p className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">70–85%</p>
              <p className="text-[11px] sm:text-xs text-zinc-400 mt-1 font-medium leading-snug">
                Твой чистый доход со всех донатов и подписок
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#13141C] border border-white/[0.08]">
              <p className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">USDT</p>
              <p className="text-[11px] sm:text-xs text-zinc-400 mt-1 font-medium leading-snug">
                Прямые выплаты в крипте без блокировок банков
              </p>
            </div>
          </div>

          {/* Action Button - Solid White, No Neon */}
          <div className="pt-2">
            <a
              href="#formats"
              onClick={onChooseFormatClick}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-sm tracking-wide bg-white hover:bg-zinc-200 text-black transition-colors"
            >
              <span>Выбрать формат участия</span>
              <ArrowDown className="w-4 h-4 text-black" />
            </a>
          </div>
        </div>

        {/* Right Column: Clean Avatar Card - Solid Matte, No Glowing Halos */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div className="w-full max-w-[420px] rounded-2xl bg-[#13141C] border border-white/[0.08] overflow-hidden">
            <div className="h-[450px] relative overflow-hidden group">
              <img 
                src="/hero_vtuber.png" 
                alt="ARRIVA VTuber Production" 
                className="w-full h-full object-cover object-top filter brightness-[0.9] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#13141C] via-transparent to-transparent"></div>

              {/* Top Status Tags */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                <div className="px-3 py-1 rounded-lg bg-black/80 border border-white/10 text-zinc-300 font-mono text-[11px] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-zinc-400" />
                  ARKit 60 FPS
                </div>
                <div className="px-3 py-1 rounded-lg bg-black/80 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-semibold">
                  ● SYSTEM ACTIVE
                </div>
              </div>

              {/* Bottom Spec Box */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#090A0E] p-4 rounded-xl border border-white/10 z-10 text-left space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-white text-xs font-semibold uppercase tracking-wider">Цифровой образ #02</span>
                  <span className="text-[10px] font-mono text-zinc-400 font-medium bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    SECURED
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 font-mono leading-normal">
                  Голос и мимика транслируются в реальном времени. Личность защищена броней кода.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
