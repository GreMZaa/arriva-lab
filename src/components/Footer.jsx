import React from 'react';
import { Sparkles } from 'lucide-react';

export const Footer = ({ view, setView, isAdminMode }) => {
  return (
    <>
      {/* Modern Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src="/logo.jpg" 
                alt="ARRIVA Logo" 
                className="w-8 h-8 rounded-lg object-cover border border-gray-800"
              />
              <span className="font-extrabold tracking-tight text-lg text-white">ARRIVA lab</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Комплексный запуск и продюсирование виртуальных аватаров VTuber. Запустите карьеру мечты с профессиональной командой.
            </p>
          </div>
          
          <div>
            <h5 className="font-bold text-sm text-gray-200 mb-4">Навигация</h5>
            <ul className="text-xs text-gray-400 space-y-2">
              <li><a href="#services" className="hover:text-white transition-colors" onClick={() => setView('home')}>Наши Услуги</a></li>
              <li><a href="#steps" className="hover:text-white transition-colors" onClick={() => setView('home')}>Этапы запуска</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors" onClick={() => setView('home')}>Наши Кейсы</a></li>
              <li><a href="#tariffs" className="hover:text-white transition-colors" onClick={() => setView('home')}>Тарифы</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-sm text-gray-200 mb-4">Инструменты</h5>
            <ul className="text-xs text-gray-400 space-y-2">
              <li><button onClick={() => setView('quiz')} className="hover:text-white transition-colors text-left bg-transparent border-none p-0 cursor-pointer">Пройти Квиз</button></li>
              <li><button onClick={() => setView('cabinet')} className="hover:text-white transition-colors text-left bg-transparent border-none p-0 cursor-pointer">Личный Кабинет</button></li>
              {isAdminMode && (
                <li><button onClick={() => setView('crm')} className="hover:text-white transition-colors text-left bg-transparent border-none p-0 cursor-pointer">CRM Админка</button></li>
              )}
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-sm text-gray-200 mb-4">Связь и Поддержка</h5>
            <ul className="text-xs text-gray-400 space-y-2">
              <li>Telegram Бот: <a href="https://t.me/ArrivalLabBOT" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@ArrivalLabBOT</a></li>
              <li>Telegram Поддержка: <a href="https://t.me/ArrivalLabBOT" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@ArrivalLabBOT</a></li>
              <li>Email: <a href="mailto:support@arrivalab.ru" className="hover:text-white transition-colors">support@arrivalab.ru</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-gray-800 mt-12 pt-6 text-center text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>&copy; {new Date().getFullYear()} ARRIVA lab. Все права защищены.</span>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <button onClick={() => { setView('privacy'); window.scrollTo(0,0); }} className="hover:text-white transition-colors underline cursor-pointer bg-transparent border-none text-gray-500 text-xs">Политика конфиденциальности</button>
            <button onClick={() => { setView('terms'); window.scrollTo(0,0); }} className="hover:text-white transition-colors underline cursor-pointer bg-transparent border-none text-gray-500 text-xs">Пользовательское соглашение</button>
          </div>
          <span>Разработано с заботой о вашей анонимности.</span>
        </div>
      </footer>

      {/* FLOATING MOBILE ACTION BAR */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 bg-gray-900/90 backdrop-blur-xl p-2 rounded-full border border-white/10 shadow-2xl flex items-center justify-between gap-2">
        <button 
          onClick={() => { setView('quiz'); window.scrollTo(0,0); }} 
          className="flex-1 btn btn-primary text-xs py-3 px-4 font-extrabold flex items-center justify-center gap-1.5 shadow-glow"
        >
          <Sparkles className="w-4 h-4" /> Подобрать образ
        </button>
        <a 
          href="#tariffs" 
          onClick={() => { if (view !== 'home') setView('home'); }} 
          className="btn btn-secondary text-xs py-3 px-4 bg-white/10 hover:bg-white/20 text-white border-white/10 font-bold"
        >
          Тарифы
        </a>
      </div>
    </>
  );
};
