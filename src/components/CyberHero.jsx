import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Activity, Users } from 'lucide-react';

export const CyberHero = ({ onApplyClick }) => {
  return (
    <section className="relative overflow-hidden bg-[#0A0B10] py-24 lg:py-36 border-b border-white/5">
      {/* Background Cyberpunk Ambient Glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Column: Text & CTA */}
        <div className="lg:col-span-7 text-left space-y-7">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-xs tracking-wider uppercase backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            Продюсирование и разработка VTuber
          </div>

          <h1 className="text-white tracking-tight leading-[1.12] font-black text-4xl sm:text-5xl lg:text-6xl">
            Твоя цифровая сцена. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-500">
              Мы создаем витубера под ключ
            </span>{' '}
            и выводим на глобальный доход.
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl font-normal leading-relaxed">
            Никаких реальных лиц на камеру. Полный продакшн от 3D-модели до юридической поддержки.
          </p>

          <div className="pt-2 space-y-3">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <a
                href="#apply"
                onClick={onApplyClick}
                className="px-8 py-4 rounded-2xl font-bold text-base uppercase tracking-wider bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black shadow-[0_0_30px_rgba(0,240,255,0.45)] hover:shadow-[0_0_40px_rgba(0,240,255,0.7)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 group"
              >
                <span>Заполнить анкету</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#partnership"
                className="px-6 py-4 rounded-2xl font-semibold text-sm text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center gap-2"
              >
                Условия партнерства
              </a>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm font-medium flex items-center gap-2 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              Ограниченный пул мест. Мы отбираем людей на долгосрочное продюсирование.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">100%</p>
              <p className="text-xs text-gray-400 mt-1 uppercase font-mono">Анонимность</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white font-mono">70-85%</p>
              <p className="text-xs text-gray-400 mt-1 uppercase font-mono">Доход модели</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-purple-400 font-mono">USDT</p>
              <p className="text-xs text-gray-400 mt-1 uppercase font-mono">Выплаты без блоков</p>
            </div>
          </div>
        </div>

        {/* Right Column: High-tech Avatar Card & HUD */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div className="relative w-full max-w-[420px] rounded-3xl p-1 bg-gradient-to-b from-cyan-500/40 via-purple-500/20 to-transparent shadow-[0_0_50px_rgba(0,240,255,0.2)]">
            <div className="relative bg-[#0F111A] rounded-[22px] overflow-hidden border border-white/10">
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent h-20 w-full animate-pulse pointer-events-none"></div>

              <div className="h-[430px] relative overflow-hidden group">
                <img 
                  src="/hero_vtuber.png" 
                  alt="Cyber VTuber Avatar" 
                  className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F111A] via-transparent to-transparent"></div>

                {/* Cyberpunk Top Tag */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                  <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-cyan-400/30 text-cyan-300 font-mono text-[11px] flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    ARKit 60 FPS
                  </div>
                  <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-purple-400/30 text-purple-300 font-mono text-[11px]">
                    3D AVATAR #04
                  </div>
                </div>

                {/* HUD Bottom Panel */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0A0B10]/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 z-10 text-left">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Идентичность скрыта</span>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">PROTECTED</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse"></div>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-2 font-mono">
                    Мимика и голос передаются в реальном времени. Лицо защищено цифровой оболочкой.
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
