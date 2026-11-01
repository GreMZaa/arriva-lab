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
    <header className="sticky top-0 z-50 bg-[#08090D]/90 backdrop-blur-md border-b border-white/[0.07] text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => { setView('home'); handleLogoClick(); }}
        >
          <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center font-bold text-white text-xs tracking-wider">
            AR
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-base text-white">ARRIVA</span>
              <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-white/[0.06] text-neutral-400 border border-white/10">
                LAB
              </span>
            </div>
            <span className="font-mono text-[9px] block text-neutral-400 tracking-wider uppercase">VTuber Agency</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-neutral-300">
          <a href="#about" className="hover:text-white transition-colors" onClick={() => setView('home')}>О формате</a>
          <a href="#partnership" className="hover:text-white transition-colors" onClick={() => setView('home')}>Партнерство</a>
          <a href="#safety" className="hover:text-white transition-colors" onClick={() => setView('home')}>Анонимность</a>
          <a href="#payouts" className="hover:text-white transition-colors" onClick={() => setView('home')}>Выплаты</a>
          
          <span className="w-px h-3.5 bg-white/10"></span>
          
          <button 
            onClick={() => setView('cabinet')} 
            className={`hover:text-white transition-colors flex items-center gap-1.5 ${view === 'cabinet' ? 'text-white font-semibold' : ''}`}
          >
            <Lock className="w-3.5 h-3.5 opacity-60" />
            {cabinetUser ? 'Кабинет' : 'Войти'}
          </button>
          
          {isAdminMode && (
            <button 
              onClick={() => setView('crm')} 
              className={`hover:text-[#9FE870] transition-colors flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-neutral-300 ${view === 'crm' ? 'text-[#9FE870] border-[#9FE870]/30' : ''}`}
            >
              <Shield className="w-3.5 h-3.5" /> CRM
            </button>
          )}

          <a 
            href="#apply" 
            onClick={() => setView('home')}
            className="px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider bg-[#9FE870] hover:bg-[#b0f283] text-[#090A0E] transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          >
            Заполнить анкету
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-neutral-300 hover:text-white bg-white/[0.04] border border-white/10"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090A0E] border-b border-white/10 px-6 py-6 space-y-4 text-left">
          <a 
            href="#about" 
            onClick={() => { setView('home'); setMobileMenuOpen(false); }} 
            className="block text-neutral-300 hover:text-white text-sm py-2 border-b border-white/5"
          >
            О формате
          </a>
          <a 
            href="#partnership" 
            onClick={() => { setView('home'); setMobileMenuOpen(false); }} 
            className="block text-neutral-300 hover:text-white text-sm py-2 border-b border-white/5"
          >
            Партнерство (70/30)
          </a>
          <a 
            href="#safety" 
            onClick={() => { setView('home'); setMobileMenuOpen(false); }} 
            className="block text-neutral-300 hover:text-white text-sm py-2 border-b border-white/5"
          >
            Анонимность и документы
          </a>
          <a 
            href="#payouts" 
            onClick={() => { setView('home'); setMobileMenuOpen(false); }} 
            className="block text-neutral-300 hover:text-white text-sm py-2 border-b border-white/5"
          >
            Выплаты (USDT)
          </a>
          <div className="pt-2 flex flex-col gap-2.5">
            <button 
              onClick={() => { setView('cabinet'); setMobileMenuOpen(false); }} 
              className="w-full py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white font-medium text-center text-xs"
            >
              {cabinetUser ? 'Личный кабинет' : 'Вход в кабинет'}
            </button>
            {isAdminMode && (
              <button 
                onClick={() => { setView('crm'); setMobileMenuOpen(false); }} 
                className="w-full py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-neutral-300 font-medium text-center text-xs"
              >
                Панель CRM
              </button>
            )}
            <a 
              href="#apply" 
              onClick={() => { setView('home'); setMobileMenuOpen(false); }} 
              className="w-full py-3 rounded-lg bg-[#9FE870] text-[#090A0E] font-bold text-center text-xs uppercase tracking-wider"
            >
              Заполнить анкету
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
