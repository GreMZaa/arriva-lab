import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const CyberHero = ({ onApplyClick }) => {
  return (
    <section className="relative bg-[#090A0E] py-24 lg:py-36 border-b border-white/[0.07] overflow-hidden text-left">
      {/* Subtle organic light wash - strictly restrained, no AI neon blobs, no dot grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Column: Editorial Headline & CTA */}
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-mono tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9FE870]"></span>
            Лаборатория виртуального продюсирования
          </div>

          <h1 className="text-white tracking-tight leading-[1.08] font-bold text-4xl sm:text-5xl lg:text-[62px]">
            Твоя цифровая сцена.{' '}
            <span className="text-white">
              Мы создаем витубера под ключ
            </span>{' '}
            <span className="text-neutral-400 font-normal">
              и выводим на глобальный доход.
            </span>
          </h1>

          <p className="text-neutral-300 text-lg sm:text-xl max-w-2xl font-normal leading-relaxed">
            Никаких реальных лиц на камеру. Полный продакшн от 3D-модели до юридической поддержки.
          </p>

          <div className="pt-2 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <a
                href="#apply"
                onClick={onApplyClick}
                className="px-8 py-4 rounded-xl font-bold text-sm tracking-wide bg-[#9FE870] hover:bg-[#b0f283] text-[#090A0E] transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-3 shadow-[0_2px_12px_rgba(159,232,112,0.2)]"
              >
                <span>Заполнить анкету</span>
                <ArrowRight className="w-4 h-4 text-[#090A0E]" />
              </a>

              <a
                href="#partnership"
                className="px-7 py-4 rounded-xl font-semibold text-sm text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors flex items-center justify-center"
              >
                Условия партнерства
              </a>
            </div>

            <p className="text-neutral-400 text-xs font-mono flex items-center gap-2 pt-1">
              <span className="w-1 h-1 rounded-full bg-neutral-500"></span>
              Ограниченный пул мест. Мы отбираем людей на долгосрочное продюсирование.
            </p>
          </div>

          {/* Minimal Key Metrics */}
          <div className="pt-8 border-t border-white/[0.08] grid grid-cols-3 gap-6 max-w-lg">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">100%</p>
              <p className="text-xs text-neutral-400 mt-1 uppercase font-mono tracking-wider">Экранная анонимность</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-[#9FE870] font-mono tracking-tight">70–85%</p>
              <p className="text-xs text-neutral-400 mt-1 uppercase font-mono tracking-wider">Доля модели</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">USDT</p>
              <p className="text-xs text-neutral-400 mt-1 uppercase font-mono tracking-wider">Прямые выплаты</p>
            </div>
          </div>
        </div>

        {/* Right Column: Grounded Real Avatar Card */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div className="w-full max-w-[420px] rounded-2xl p-[1px] bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-2xl">
            <div className="bg-[#111319] rounded-2xl overflow-hidden border border-white/[0.08]">
              <div className="h-[440px] relative overflow-hidden group">
                <img 
                  src="/hero_vtuber.png" 
                  alt="ARRIVA VTuber Production" 
                  className="w-full h-full object-cover object-top filter brightness-[0.95] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111319] via-transparent to-transparent"></div>

                {/* Status Bar */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                  <span className="px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-neutral-300 font-mono text-[11px]">
                    ARKit 60 FPS • Real-time
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-neutral-400 font-mono text-[11px]">
                    3D MODEL #02
                  </span>
                </div>

                {/* Bottom Spec Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#090A0E]/90 backdrop-blur-md p-4 rounded-xl border border-white/10 z-10 text-left space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-xs font-semibold uppercase tracking-wider">Идентичность защищена</span>
                    <span className="text-[10px] font-mono text-[#9FE870] font-bold bg-[#9FE870]/10 px-2 py-0.5 rounded border border-[#9FE870]/20">
                      SECURED
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-normal leading-normal">
                    Голос и мимика считываются в реальном времени. Личность остается полностью за кадром.
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
