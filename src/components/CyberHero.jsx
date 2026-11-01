import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CyberHero = ({ onApplyClick }) => {
  return (
    <section className="relative bg-[#FAFAFC] py-20 lg:py-32 border-b border-gray-200 overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-700 text-xs font-mono tracking-wider uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]"></span>
            Лаборатория виртуального продюсирования
          </div>

          <h1 className="text-gray-900 tracking-tight leading-[1.1] font-black text-4xl sm:text-5xl lg:text-6xl">
            Твоя цифровая сцена.{' '}
            <span className="text-gray-900">
              Мы создаем витубера под ключ
            </span>{' '}
            <span className="text-gray-500 font-normal">
              и выводим на глобальный доход.
            </span>
          </h1>

          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl font-normal leading-relaxed">
            Никаких реальных лиц на камеру. Полный продакшн от 3D-модели до юридической поддержки.
          </p>

          <div className="pt-2 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <a
                href="#apply"
                onClick={onApplyClick}
                className="px-8 py-4 rounded-xl font-bold text-sm tracking-wide bg-gray-900 hover:bg-black text-white transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-3 shadow-md"
              >
                <span>Заполнить анкету</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </a>

              <a
                href="#partnership"
                className="px-7 py-4 rounded-xl font-semibold text-sm text-gray-700 hover:text-black bg-white hover:bg-gray-50 border border-gray-200 transition-colors flex items-center justify-center shadow-sm"
              >
                Условия партнерства
              </a>
            </div>

            <p className="text-gray-500 text-xs font-mono flex items-center gap-2 pt-1">
              <span className="w-1 h-1 rounded-full bg-gray-400"></span>
              Ограниченный пул мест. Мы отбираем людей на долгосрочное продюсирование.
            </p>
          </div>

          {/* Minimal Key Metrics */}
          <div className="pt-8 border-t border-gray-200 grid grid-cols-3 gap-6 max-w-lg">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-gray-900 font-mono tracking-tight">100%</p>
              <p className="text-xs text-gray-500 mt-1 uppercase font-mono tracking-wider">Экранная анонимность</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono tracking-tight">70–85%</p>
              <p className="text-xs text-gray-500 mt-1 uppercase font-mono tracking-wider">Доля модели</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-gray-900 font-mono tracking-tight">USDT</p>
              <p className="text-xs text-gray-500 mt-1 uppercase font-mono tracking-wider">Прямые выплаты</p>
            </div>
          </div>
        </div>

        {/* Right Column: Grounded Real Avatar Card */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div className="w-full max-w-[420px] rounded-2xl p-2 bg-white border border-gray-200 shadow-xl">
            <div className="bg-gray-100 rounded-xl overflow-hidden relative">
              <div className="h-[440px] relative overflow-hidden group">
                <img 
                  src="/hero_vtuber.png" 
                  alt="ARRIVA VTuber Production" 
                  className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                {/* Status Bar */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                  <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white font-mono text-[11px] border border-white/10">
                    ARKit 60 FPS • Real-time
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-gray-300 font-mono text-[11px] border border-white/10">
                    3D MODEL #02
                  </span>
                </div>

                {/* Bottom Spec Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-gray-200 z-10 text-left space-y-1.5 shadow-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 text-xs font-bold uppercase tracking-wider">Идентичность защищена</span>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      SECURED
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600 font-normal leading-normal">
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
