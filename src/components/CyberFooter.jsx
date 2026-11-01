import React from 'react';
import { Lock, Shield } from 'lucide-react';

export const CyberFooter = ({ setView }) => {
  return (
    <footer className="bg-[#090A0F] text-neutral-400 py-16 border-t border-white/[0.08] text-xs text-left">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1 */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00F5FF] to-[#FF007A] p-[1px]">
                <div className="w-full h-full bg-[#090A0F] rounded-lg flex items-center justify-center font-bold text-white text-[11px]">
                  AR
                </div>
              </div>
              <span className="font-bold text-sm text-white tracking-wider">ARRIVA LABORATORY</span>
            </div>
            <p className="text-neutral-400 text-xs max-w-sm leading-relaxed">
              Продюсерское агентство и технологическая лаборатория запуска виртуальных стримеров под ключ. Экранная анонимность, международный сетап и выплаты в USDT.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider font-mono text-[11px]">Разделы</h4>
            <ul className="space-y-2">
              <li><a href="#benefits" onClick={() => setView('home')} className="hover:text-[#00F5FF] transition-colors">Преимущества формата</a></li>
              <li><a href="#formats" onClick={() => setView('home')} className="hover:text-[#00F5FF] transition-colors">Выбор направления</a></li>
              <li><a href="#formats" onClick={() => setView('home')} className="hover:text-[#00F5FF] transition-colors">Подать анкету</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider font-mono text-[11px]">Документы</h4>
            <ul className="space-y-2">
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
                  className="hover:text-[#00F5FF] transition-colors text-left"
                >
                  Личный кабинет
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-neutral-400">
          <div>
            © {new Date().getFullYear()} ARRIVA LAB. Продюсирование VTuber под ключ.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-neutral-400">
              <Lock className="w-3.5 h-3.5 text-[#00F5FF]" /> 256-bit SSL Encrypted
            </span>
            <span className="flex items-center gap-1.5 text-neutral-400">
              <Shield className="w-3.5 h-3.5 text-[#FF007A]" /> Identity Protected
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
