import React from 'react';
import { ArrowDown, ShieldCheck, Activity } from 'lucide-react';

export const CyberHero = ({ onChooseFormatClick }) => {
  return (
    <section className="relative bg-[#090A0F] py-24 lg:py-36 border-b border-white/[0.08] overflow-hidden text-left">
      {/* Low-contrast cyber grid & ambient glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#00F5FF]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#FF007A]/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Column: Headlines & CTA */}
        <div className="lg:col-span-7 space-y-8">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
            <span className="text-neutral-200 text-xs font-mono tracking-wide">
              Открыт набор стримеров на продюсирование.
            </span>
          </div>

          {/* H1 Headline */}
          <h1 className="text-white tracking-tight leading-[1.08] font-black text-4xl sm:text-5xl lg:text-[60px]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] via-cyan-300 to-teal-200">
              Зарабатывай
            </span>{' '}
            на западном стриминге. <br className="hidden sm:inline" />
            Твое настоящее лицо никто не увидит.
          </h1>

          {/* Subtitle */}
          <p className="text-neutral-300 text-lg sm:text-xl max-w-2xl font-normal leading-relaxed">
            Создаем 3D-аватара под твой голос, ставим сетап и выводим на аудиторию США. Ты стримишь из дома под цифровой броней — мы закрываем техническую часть и софт.
          </p>

          {/* Metrics in one row */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl pt-2">
            <div className="p-4 rounded-2xl bg-[rgba(18,20,32,0.7)] backdrop-blur-md border border-white/[0.08] hover:border-[#00F5FF]/30 transition-all">
              <p className="text-2xl sm:text-3xl font-black text-[#00F5FF] font-mono tracking-tight">100%</p>
              <p className="text-[11px] sm:text-xs text-neutral-400 mt-1 font-medium leading-snug">
                Анонимность личности (показ лица исключен)
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[rgba(18,20,32,0.7)] backdrop-blur-md border border-white/[0.08] hover:border-[#00F5FF]/30 transition-all">
              <p className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">70–85%</p>
              <p className="text-[11px] sm:text-xs text-neutral-400 mt-1 font-medium leading-snug">
                Твой чистый доход со всех донатов и подписок
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[rgba(18,20,32,0.7)] backdrop-blur-md border border-white/[0.08] hover:border-[#FF007A]/30 transition-all">
              <p className="text-2xl sm:text-3xl font-black text-[#FF007A] font-mono tracking-tight">USDT</p>
              <p className="text-[11px] sm:text-xs text-neutral-400 mt-1 font-medium leading-snug">
                Прямые выплаты в крипте без блокировок банков
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <a
              href="#formats"
              onClick={onChooseFormatClick}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-[#00F5FF] via-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-black shadow-[0_0_25px_rgba(0,245,255,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              <span>Выбрать формат участия</span>
              <ArrowDown className="w-4 h-4 text-black animate-bounce" />
            </a>
          </div>
        </div>

        {/* Right Column: 3D VTuber Mascot Card */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div className="relative w-full max-w-[420px] rounded-2xl p-[1px] bg-gradient-to-b from-[#00F5FF]/40 via-white/10 to-[#FF007A]/30 shadow-[0_0_40px_rgba(0,245,255,0.15)]">
            <div className="bg-[#0D0E17] rounded-2xl overflow-hidden border border-white/[0.08]">
              <div className="h-[450px] relative overflow-hidden group">
                <img 
                  src="/hero_vtuber.png" 
                  alt="ARRIVA VTuber Production" 
                  className="w-full h-full object-cover object-top filter brightness-[0.95] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-transparent to-transparent"></div>

                {/* Top Status Tags */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                  <div className="px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-[#00F5FF]/30 text-[#00F5FF] font-mono text-[11px] flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 animate-pulse" />
                    ARKit 60 FPS
                  </div>
                  <div className="px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-[#10B981]/40 text-[#10B981] font-mono text-[11px] font-bold">
                    ● SYSTEM ACTIVE
                  </div>
                </div>

                {/* Bottom HUD Box */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#090A0F]/90 backdrop-blur-md p-4 rounded-xl border border-white/10 z-10 text-left space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Цифровой образ #02</span>
                    <span className="text-[10px] font-mono text-[#00F5FF] font-bold bg-[#00F5FF]/10 px-2 py-0.5 rounded border border-[#00F5FF]/20">
                      SECURED
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-mono leading-normal">
                    Голос и мимика транслируются в реальном времени. Личность защищена броней кода.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
