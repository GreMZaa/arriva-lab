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
    <header className="sticky top-0 z-50 bg-[#090A0E] border-b border-white/[0.08] text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo - Solid, no gradients, no neon */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => { setView('home'); handleLogoClick(); }}
        >
          <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-black text-xs tracking-wider">
            AR
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-base text-white group-hover:text-zinc-300 transition-colors">ARRIVA</span>
              <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-400 border border-white/10">
                LAB
              </span>
            </div>
            <span className="font-mono text-[9px] block text-zinc-500 tracking-wider uppercase">VTuber Agency</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-zinc-400">
          <a href="#benefits" className="hover:text-white transition-colors" onClick={() => setView('home')}>Преимущества</a>
          <a href="#formats" className="hover:text-white transition-colors" onClick={() => setView('home')}>Форматы участия</a>
          
          <span className="w-px h-3.5 bg-white/10"></span>
          
          <button 
            onClick={() => setView('cabinet')} 
            className={`hover:text-white transition-colors flex items-center gap-1.5 ${view === 'cabinet' ? 'text-white font-bold' : ''}`}
          >
            <Lock className="w-3.5 h-3.5 text-zinc-500" />
            {cabinetUser ? 'Кабинет' : 'Войти'}
          </button>
          
          {isAdminMode && (
            <button 
              onClick={() => setView('crm')} 
              className={`hover:text-white transition-colors flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300 ${view === 'crm' ? 'bg-white/15 text-white' : ''}`}
            >
              <Shield className="w-3.5 h-3.5" /> CRM
            </button>
          )}

          <a 
            href="#formats" 
            onClick={() => setView('home')}
            className="px-4 py-2 rounded-lg font-semibold text-xs uppercase tracking-wider bg-white hover:bg-zinc-200 text-black transition-colors"
          >
            Выбрать формат
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white bg-white/5 border border-white/10"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090A0E] border-b border-white/10 px-6 py-6 space-y-4 text-left">
          <a 
            href="#benefits" 
            onClick={() => { setView('home'); setMobileMenuOpen(false); }} 
            className="block text-zinc-300 hover:text-white text-sm py-2 border-b border-white/5"
          >
            Преимущества
          </a>
          <a 
            href="#formats" 
            onClick={() => { setView('home'); setMobileMenuOpen(false); }} 
            className="block text-zinc-300 hover:text-white text-sm py-2 border-b border-white/5"
          >
            Форматы участия
          </a>
          <div className="pt-2 flex flex-col gap-2.5">
            <button 
              onClick={() => { setView('cabinet'); setMobileMenuOpen(false); }} 
              className="w-full py-2.5 rounded-lg bg-white/5 border border-white/10 text-white font-medium text-center text-xs"
            >
              {cabinetUser ? 'Личный кабинет' : 'Вход в кабинет'}
            </button>
            {isAdminMode && (
              <button 
                onClick={() => { setView('crm'); setMobileMenuOpen(false); }} 
                className="w-full py-2.5 rounded-lg bg-white/5 border border-white/10 text-zinc-300 font-medium text-center text-xs"
              >
                Панель CRM
              </button>
            )}
            <a 
              href="#formats" 
              onClick={() => { setView('home'); setMobileMenuOpen(false); }} 
              className="w-full py-3 rounded-lg bg-white text-black font-bold text-center text-xs uppercase tracking-wider"
            >
              Выбрать формат
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
