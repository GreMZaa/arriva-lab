import React from 'react';
import { Lock, Shield } from 'lucide-react';

export const CyberFooter = ({ setView }) => {
  return (
    <footer className="bg-gray-50 text-gray-500 py-16 border-t border-gray-200 text-xs text-left">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1 */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gray-900 text-white flex items-center justify-center font-bold text-[11px]">
                AR
              </div>
              <span className="font-bold text-sm text-gray-900 tracking-wider">ARRIVA LABORATORY</span>
            </div>
            <p className="text-gray-500 text-xs max-w-sm leading-relaxed">
              Продюсерское агентство и технологическая лаборатория запуска виртуальных стримеров. Полная экранная анонимность, международный сетап и выплаты в USDT.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-gray-900 uppercase tracking-wider font-mono text-[11px]">Разделы</h4>
            <ul className="space-y-2">
              <li><a href="#about" onClick={() => setView('home')} className="hover:text-gray-900 transition-colors">О формате витубинга</a></li>
              <li><a href="#partnership" onClick={() => setView('home')} className="hover:text-gray-900 transition-colors">Суть партнерства</a></li>
              <li><a href="#safety" onClick={() => setView('home')} className="hover:text-gray-900 transition-colors">Анонимность и документы</a></li>
              <li><a href="#payouts" onClick={() => setView('home')} className="hover:text-gray-900 transition-colors">Выплаты в USDT</a></li>
              <li><a href="#apply" onClick={() => setView('home')} className="hover:text-gray-900 transition-colors">Анкета на продюсирование</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-gray-900 uppercase tracking-wider font-mono text-[11px]">Документы</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => { setView('privacy'); window.scrollTo(0,0); }} 
                  className="hover:text-gray-900 transition-colors text-left"
                >
                  Политика конфиденциальности
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setView('terms'); window.scrollTo(0,0); }} 
                  className="hover:text-gray-900 transition-colors text-left"
                >
                  Пользовательское соглашение
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setView('cabinet'); window.scrollTo(0,0); }} 
                  className="hover:text-gray-900 transition-colors text-left"
                >
                  Личный кабинет
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-gray-400">
          <div>
            © {new Date().getFullYear()} ARRIVA LAB. Продюсирование VTuber под ключ.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-gray-500">
              <Lock className="w-3.5 h-3.5 text-gray-400" /> SSL Encrypted
            </span>
            <span className="flex items-center gap-1.5 text-gray-500">
              <Shield className="w-3.5 h-3.5 text-gray-400" /> Identity Protected
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
