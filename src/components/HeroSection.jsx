import React from 'react';
import { Sparkles, ArrowRight, Layers } from 'lucide-react';

export const HeroSection = ({ setView }) => {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 text-left space-y-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#9FE870]/20 border border-[#9FE870]/40 text-[#123d0c] font-semibold text-xs rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Лаборатория VTubing под ключ
          </span>
          <h1 className="text-gray-900 tracking-tight leading-[1.15] font-black text-4xl sm:text-5xl lg:text-6xl">
            Запуск <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500">VTuber-карьеры</span> <br />
            под ключ
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-xl">
            От идеи персонажа до первых трансляций и дальнейшего продюсирования — всё в одной команде. Без поиска отдельных специалистов и без страха ошибиться на старте.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a href="#tariffs" className="btn btn-primary text-base px-8 py-4">
              Тарифы <ArrowRight className="w-4 h-4" />
            </a>
            <button 
              onClick={() => setView('quiz')} 
              className="btn btn-secondary text-base px-8 py-4 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#123d0c]" /> Подобрать образ
            </button>
          </div>
        </div>
        
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div className="relative w-full max-w-[400px] h-[450px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden group">
            <img 
              src="/hero_vtuber.png" 
              alt="ARRIVA VTuber Mascot" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dark gradient overlay for bottom text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 right-6 bg-black/40 backdrop-blur-md rounded-2xl p-4 text-left border border-white/10 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-sm">ARRIVA Core v1.4</p>
                  <p className="text-[#9FE870] text-xs font-medium">Калибровка отслеживания: OK</p>
                </div>
                <div className="w-2.5 h-2.5 bg-[#9FE870] rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
          {/* Floating Tech Badges */}
          <div className="absolute -top-4 -right-2 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-50 flex items-center gap-2 text-xs font-semibold z-10">
            <Layers className="w-4 h-4 text-purple-500" /> Live2D & 3D
          </div>
        </div>
      </div>
    </section>
  );
};
