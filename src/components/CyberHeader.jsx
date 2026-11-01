import React from 'react';
import { Menu, X, Lock, Shield } from 'lucide-react';

export const CyberHeader = ({ 
  view, 
  setView, 
  handleLogoClick, 
  cabinetUser, 
  isAdminMode, 
  mobileMenuOpen, 
  setMobileMenuOpen 
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 text-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => { setView('home'); handleLogoClick(); }}
        >
          <div className="w-9 h-9 rounded-xl bg-gray-900 text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-sm">
            AR
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-base text-gray-900">ARRIVA</span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200">
                LAB
              </span>
            </div>
            <span className="font-mono text-[9px] block text-gray-400 tracking-wider uppercase">VTuber Agency</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-gray-600">
          <a href="#about" className="hover:text-black transition-colors" onClick={() => setView('home')}>О формате</a>
          <a href="#partnership" className="hover:text-black transition-colors" onClick={() => setView('home')}>Партнерство</a>
          <a href="#safety" className="hover:text-black transition-colors" onClick={() => setView('home')}>Анонимность</a>
          <a href="#payouts" className="hover:text-black transition-colors" onClick={() => setView('home')}>Выплаты</a>
          
          <span className="w-px h-3.5 bg-gray-200"></span>
          
          <button 
            onClick={() => setView('cabinet')} 
            className={`hover:text-black transition-colors flex items-center gap-1.5 ${view === 'cabinet' ? 'text-black font-bold' : ''}`}
          >
            <Lock className="w-3.5 h-3.5 text-gray-400" />
            {cabinetUser ? 'Кабинет' : 'Войти'}
          </button>
          
          {isAdminMode && (
            <button 
              onClick={() => setView('crm')} 
              className={`hover:text-black transition-colors flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 border border-gray-200 text-gray-700 ${view === 'crm' ? 'bg-gray-900 text-white border-gray-900' : ''}`}
            >
              <Shield className="w-3.5 h-3.5" /> CRM
            </button>
          )}

          <a 
            href="#apply" 
            onClick={() => setView('home')}
            className="px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider bg-gray-900 hover:bg-black text-white transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] shadow-sm"
          >
            Заполнить анкету
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-700 hover:text-black bg-gray-100 border border-gray-200"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-6 space-y-4 text-left shadow-xl animate-fade-in">
          <a 
            href="#about" 
            onClick={() => { setView('home'); setMobileMenuOpen(false); }} 
            className="block text-gray-700 hover:text-black text-sm font-medium py-2 border-b border-gray-100"
          >
            О формате
          </a>
          <a 
            href="#partnership" 
            onClick={() => { setView('home'); setMobileMenuOpen(false); }} 
            className="block text-gray-700 hover:text-black text-sm font-medium py-2 border-b border-gray-100"
          >
            Партнерство (70/30)
          </a>
          <a 
            href="#safety" 
            onClick={() => { setView('home'); setMobileMenuOpen(false); }} 
            className="block text-gray-700 hover:text-black text-sm font-medium py-2 border-b border-gray-100"
          >
            Анонимность и документы
          </a>
          <a 
            href="#payouts" 
            onClick={() => { setView('home'); setMobileMenuOpen(false); }} 
            className="block text-gray-700 hover:text-black text-sm font-medium py-2 border-b border-gray-100"
          >
            Выплаты (USDT)
          </a>
          <div className="pt-2 flex flex-col gap-2.5">
            <button 
              onClick={() => { setView('cabinet'); setMobileMenuOpen(false); }} 
              className="w-full py-2.5 rounded-lg bg-gray-100 border border-gray-200 text-gray-900 font-semibold text-center text-xs"
            >
              {cabinetUser ? 'Личный кабинет' : 'Вход в кабинет'}
            </button>
            {isAdminMode && (
              <button 
                onClick={() => { setView('crm'); setMobileMenuOpen(false); }} 
                className="w-full py-2.5 rounded-lg bg-gray-100 border border-gray-200 text-gray-700 font-semibold text-center text-xs"
              >
                Панель CRM
              </button>
            )}
            <a 
              href="#apply" 
              onClick={() => { setView('home'); setMobileMenuOpen(false); }} 
              className="w-full py-3 rounded-lg bg-gray-900 text-white font-bold text-center text-xs uppercase tracking-wider"
            >
              Заполнить анкету
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
