import React from 'react';
import { Lock, Shield } from 'lucide-react';

export const CyberFooter = ({ setView }) => {
  return (
    <footer className="bg-stage-void text-stone-400 py-14 border-t border-white/[0.06] text-sm text-left stage-canvas">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-stage-panel border border-white/10 flex items-center justify-center font-display font-extrabold text-xs text-[#f5f0e8]">
                AR
              </div>
              <span className="font-display font-bold text-[#f5f0e8] tracking-tight">
                ARRIVA LABORATORY
              </span>
            </div>
            <p className="text-xs max-w-sm leading-relaxed text-stone-500">
              Продюсерский центр запуска виртуальных стримеров. Анонимность в кадре, международный
              сетап и выплаты в USDT.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-[10px] font-semibold text-stone-500 uppercase tracking-widest">
              Навигация
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#details" onClick={() => setView('home')} className="hover:text-[#f5f0e8] transition-colors cursor-pointer">
                  О проекте
                </a>
              </li>
              <li>
                <a href="#formats" onClick={() => setView('home')} className="hover:text-[#f5f0e8] transition-colors cursor-pointer">
                  Выбор направления
                </a>
              </li>
              <li>
                <a href="#formats" onClick={() => setView('home')} className="hover:text-live transition-colors cursor-pointer">
                  Подать анкету
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-[10px] font-semibold text-stone-500 uppercase tracking-widest">
              Документы
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setView('privacy');
                    window.scrollTo(0, 0);
                  }}
                  className="hover:text-[#f5f0e8] transition-colors text-left cursor-pointer"
                >
                  Политика конфиденциальности
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setView('terms');
                    window.scrollTo(0, 0);
                  }}
                  className="hover:text-[#f5f0e8] transition-colors text-left cursor-pointer"
                >
                  Пользовательское соглашение
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setView('cabinet');
                    window.scrollTo(0, 0);
                  }}
                  className="hover:text-chroma transition-colors text-left cursor-pointer"
                >
                  Личный кабинет
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px]">
          <div>© {new Date().getFullYear()} ARRIVA LAB</div>
          <div className="flex items-center gap-4 text-stone-500">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-chroma" /> SSL
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-live" /> Identity shield
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
