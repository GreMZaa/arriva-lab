import React from 'react';
import { Shield, Lock } from 'lucide-react';

export const CyberFooter = ({ setView }) => {
  return (
    <footer className="bg-[#07080B] text-gray-400 py-16 border-t border-white/5 text-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 text-left">
          {/* Col 1 */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 p-[1px]">
                <div className="w-full h-full bg-[#07080B] rounded-lg flex items-center justify-center font-black text-cyan-400 text-xs">
                  AR
                </div>
              </div>
              <span className="font-black text-lg text-white tracking-wider">ARRIVA LABORATORY</span>
            </div>
            <p className="text-gray-400 text-xs max-w-sm leading-relaxed">
              Международное продюсерское агентство и технологическая лаборатория запуска VTuber-персонажей под ключ. Экранная анонимность, юридическая поддержка и международный доход.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              ALL SYSTEMS ONLINE // GLOBAL ACCESS
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">Навигация</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#about" onClick={() => setView('home')} className="hover:text-cyan-400 transition-colors">Кто такой витубер</a></li>
              <li><a href="#partnership" onClick={() => setView('home')} className="hover:text-cyan-400 transition-colors">Суть партнерства</a></li>
              <li><a href="#safety" onClick={() => setView('home')} className="hover:text-cyan-400 transition-colors">Анонимность и документы</a></li>
              <li><a href="#payouts" onClick={() => setView('home')} className="hover:text-cyan-400 transition-colors">Выплаты в USDT</a></li>
              <li><a href="#apply" onClick={() => setView('home')} className="hover:text-cyan-400 transition-colors">Заполнить анкету</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">Безопасность и право</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => { setView('privacy'); window.scrollTo(0,0); }} 
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Политика конфиденциальности
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setView('terms'); window.scrollTo(0,0); }} 
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Пользовательское соглашение
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setView('cabinet'); window.scrollTo(0,0); }} 
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Личный кабинет
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>
            © {new Date().getFullYear()} ARRIVA LAB. Все права защищены.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-gray-400">
              <Lock className="w-3.5 h-3.5 text-cyan-400" /> 256-bit SSL Encrypted
            </span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <Shield className="w-3.5 h-3.5 text-purple-400" /> Identity Protected
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
