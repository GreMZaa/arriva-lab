import React, { useState } from 'react';
import { Sparkles, Menu, X, Shield, Lock } from 'lucide-react';

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
    <header className="sticky top-0 z-50 bg-[#0A0B10]/90 backdrop-blur-xl border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => { setView('home'); handleLogoClick(); }}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 p-[1px] shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              <div className="w-full h-full bg-[#0A0B10] rounded-xl flex items-center justify-center font-black text-cyan-400 text-sm tracking-tighter">
                AR
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-[#0A0B10] animate-pulse"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black tracking-wider text-lg text-white group-hover:text-cyan-400 transition-colors">ARRIVA</span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">LAB</span>
            </div>
            <span className="font-mono text-[10px] block text-gray-400 tracking-widest uppercase">Cyber VTubing Agency</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 font-medium text-sm text-gray-300">
          <a href="#about" className="hover:text-cyan-400 transition-colors" onClick={() => setView('home')}>Кто такой витубер</a>
          <a href="#partnership" className="hover:text-cyan-400 transition-colors" onClick={() => setView('home')}>Суть партнерства</a>
          <a href="#safety" className="hover:text-cyan-400 transition-colors" onClick={() => setView('home')}>Анонимность</a>
          <a href="#payouts" className="hover:text-cyan-400 transition-colors" onClick={() => setView('home')}>Выплаты</a>
          
          <span className="w-px h-4 bg-white/10"></span>
          
          <button 
            onClick={() => setView('cabinet')} 
            className={`hover:text-cyan-400 transition-colors flex items-center gap-1.5 ${view === 'cabinet' ? 'text-cyan-400 font-bold' : ''}`}
          >
            <Lock className="w-3.5 h-3.5 opacity-70" />
            {cabinetUser ? 'Кабинет' : 'Войти'}
          </button>
          
          {isAdminMode && (
            <button 
              onClick={() => setView('crm')} 
              className={`hover:text-purple-400 transition-colors flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 ${view === 'crm' ? 'bg-purple-500/20 text-purple-200' : ''}`}
            >
              <Shield className="w-3.5 h-3.5" /> CRM
            </button>
          )}

          <a 
            href="#apply" 
            onClick={() => setView('home')}
            className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" /> Заполнить анкету
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-gray-300 hover:text-white bg-white/5 border border-white/10"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0B10] border-b border-white/10 px-6 py-6 space-y-4 animate-fade-in text-left">
          <a 
            href="#about" 
            onClick={() => { setView('home'); setMobileMenuOpen(false); }} 
            className="block text-gray-300 hover:text-cyan-400 font-medium py-2 border-b border-white/5"
          >
            Кто такой витубер
          </a>
          <a 
            href="#partnership" 
            onClick={() => { setView('home'); setMobileMenuOpen(false); }} 
            className="block text-gray-300 hover:text-cyan-400 font-medium py-2 border-b border-white/5"
          >
            Суть партнерства
          </a>
          <a 
            href="#safety" 
            onClick={() => { setView('home'); setMobileMenuOpen(false); }} 
            className="block text-gray-300 hover:text-cyan-400 font-medium py-2 border-b border-white/5"
          >
            Анонимность и документы
          </a>
          <a 
            href="#payouts" 
            onClick={() => { setView('home'); setMobileMenuOpen(false); }} 
            className="block text-gray-300 hover:text-cyan-400 font-medium py-2 border-b border-white/5"
          >
            Выплаты (USDT)
          </a>
          <div className="pt-2 flex flex-col gap-3">
            <button 
              onClick={() => { setView('cabinet'); setMobileMenuOpen(false); }} 
              className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-center text-sm"
            >
              {cabinetUser ? 'Личный кабинет' : 'Вход в кабинет'}
            </button>
            {isAdminMode && (
              <button 
                onClick={() => { setView('crm'); setMobileMenuOpen(false); }} 
                className="w-full py-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 font-semibold text-center text-sm"
              >
                Панель управления CRM
              </button>
            )}
            <a 
              href="#apply" 
              onClick={() => { setView('home'); setMobileMenuOpen(false); }} 
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-bold text-center text-sm uppercase tracking-wider shadow-lg"
            >
              Заполнить анкету
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
