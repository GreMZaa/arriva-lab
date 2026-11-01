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
    <header className="sticky top-0 z-50 bg-[#090A0F]/85 backdrop-blur-xl border-b border-white/[0.08] text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => { setView('home'); handleLogoClick(); }}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00F5FF] to-[#FF007A] p-[1px] shadow-[0_0_15px_rgba(0,245,255,0.3)]">
            <div className="w-full h-full bg-[#090A0F] rounded-xl flex items-center justify-center font-black text-white text-xs tracking-wider">
              AR
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-base text-white group-hover:text-[#00F5FF] transition-colors">ARRIVA</span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/[0.06] text-[#00F5FF] border border-[#00F5FF]/30">
                LAB
              </span>
            </div>
            <span className="font-mono text-[9px] block text-neutral-400 tracking-wider uppercase">VTuber Agency</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-neutral-300">
          <a href="#benefits" className="hover:text-[#00F5FF] transition-colors" onClick={() => setView('home')}>Преимущества</a>
          <a href="#formats" className="hover:text-[#00F5FF] transition-colors" onClick={() => setView('home')}>Форматы участия</a>
          
          <span className="w-px h-3.5 bg-white/10"></span>
          
          <button 
            onClick={() => setView('cabinet')} 
            className={`hover:text-[#00F5FF] transition-colors flex items-center gap-1.5 ${view === 'cabinet' ? 'text-[#00F5FF] font-bold' : ''}`}
          >
            <Lock className="w-3.5 h-3.5 opacity-70" />
            {cabinetUser ? 'Кабинет' : 'Войти'}
          </button>
          
          {isAdminMode && (
            <button 
              onClick={() => setView('crm')} 
              className={`hover:text-[#FF007A] transition-colors flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FF007A]/10 border border-[#FF007A]/30 text-rose-300 ${view === 'crm' ? 'bg-[#FF007A]/20 text-white' : ''}`}
            >
              <Shield className="w-3.5 h-3.5" /> CRM
            </button>
          )}

          <a 
            href="#formats" 
            onClick={() => setView('home')}
            className="px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#00F5FF] to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-black shadow-[0_0_20px_rgba(0,245,255,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          >
            Выбрать формат
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
        <div className="md:hidden bg-[#090A0F] border-b border-white/10 px-6 py-6 space-y-4 text-left">
          <a 
            href="#benefits" 
            onClick={() => { setView('home'); setMobileMenuOpen(false); }} 
            className="block text-neutral-300 hover:text-[#00F5FF] text-sm py-2 border-b border-white/5"
          >
            Преимущества
          </a>
          <a 
            href="#formats" 
            onClick={() => { setView('home'); setMobileMenuOpen(false); }} 
            className="block text-neutral-300 hover:text-[#00F5FF] text-sm py-2 border-b border-white/5"
          >
            Форматы участия
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
                className="w-full py-2.5 rounded-lg bg-[#FF007A]/10 border border-[#FF007A]/30 text-rose-300 font-medium text-center text-xs"
              >
                Панель CRM
              </button>
            )}
            <a 
              href="#formats" 
              onClick={() => { setView('home'); setMobileMenuOpen(false); }} 
              className="w-full py-3 rounded-lg bg-[#00F5FF] text-black font-bold text-center text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,245,255,0.3)]"
            >
              Выбрать формат
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
