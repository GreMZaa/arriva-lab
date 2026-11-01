import React from 'react';
import { Lock, Shield, Sparkles } from 'lucide-react';

export const CyberFooter = ({ setView }) => {
  return (
    <footer className="bg-[#080512] text-[#E2E8F0] py-16 border-t border-[#00F0FF]/20 text-xs text-left relative cyber-grid-container overflow-hidden">
      
      {/* Ambient background light */}
      <div className="absolute bottom-0 left-1/3 w-96 h-48 bg-[#00F0FF]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1 */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00F0FF] to-[#FF0055] p-[1.5px] shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                <div className="w-full h-full bg-[#080512] rounded-[10px] flex items-center justify-center font-cyber font-black text-xs text-white tracking-wider">
                  AR
                </div>
              </div>
              <span className="font-cyber font-bold text-base text-white tracking-wider text-glow-cyan">
                ARRIVA LABORATORY
              </span>
            </div>
            <p className="text-[#E2E8F0] text-xs max-w-sm leading-relaxed">
              Продюсерский центр и технологическая лаборатория запуска виртуальных стримеров под ключ. Экранная анонимность, международный сетап софта и прямые выплаты в USDT.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="font-cyber font-bold text-white uppercase tracking-wider text-[11px] text-[#00F0FF]">
              Навигация
            </h4>
            <ul className="space-y-2.5 text-[#E2E8F0]">
              <li>
                <a href="#details" onClick={() => setView('home')} className="hover:text-[#00F0FF] transition-colors">
                  О проекте
                </a>
              </li>
              <li>
                <a href="#formats" onClick={() => setView('home')} className="hover:text-[#00F0FF] transition-colors">
                  Выбор направления
                </a>
              </li>
              <li>
                <a href="#formats" onClick={() => setView('home')} className="hover:text-[#FF0055] transition-colors">
                  Подать анкету
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="font-cyber font-bold text-white uppercase tracking-wider text-[11px] text-[#FF0055]">
              Безопасность
            </h4>
            <ul className="space-y-2.5 text-[#E2E8F0]">
              <li>
                <button 
                  onClick={() => { setView('privacy'); window.scrollTo(0,0); }} 
                  className="hover:text-white transition-colors text-left"
                >
                  Политика конфиденциальности
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setView('terms'); window.scrollTo(0,0); }} 
                  className="hover:text-white transition-colors text-left"
                >
                  Пользовательское соглашение
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setView('cabinet'); window.scrollTo(0,0); }} 
                  className="hover:text-[#00F0FF] transition-colors text-left"
                >
                  Личный кабинет стримера
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-zinc-400">
          <div>
            © {new Date().getFullYear()} ARRIVA LAB. Продюсирование VTuber под ключ.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <Lock className="w-3.5 h-3.5 text-[#00F0FF]" /> 256-bit SSL Encrypted
            </span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <Shield className="w-3.5 h-3.5 text-[#FF0055]" /> Identity Protected
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
