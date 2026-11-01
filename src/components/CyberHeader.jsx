import React from 'react';
import { Menu, X, Lock, Shield, Sparkles } from 'lucide-react';

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
    <header className="sticky top-0 z-50 bg-[#080512]/90 backdrop-blur-xl border-b border-[#00F0FF]/20 text-white shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo - Neon Cyber Accent */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => { setView('home'); handleLogoClick(); }}
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00F0FF] to-[#FF0055] p-[1.5px] shadow-[0_0_15px_rgba(0,240,255,0.5)] group-hover:shadow-[0_0_25px_rgba(255,0,85,0.7)] transition-all">
              <div className="w-full h-full bg-[#080512] rounded-[10px] flex items-center justify-center font-cyber font-black text-xs text-white tracking-wider">
                AR
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#00F0FF] rounded-full border-2 border-[#080512] shadow-[0_0_8px_#00F0FF]"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-cyber font-bold tracking-wider text-base text-white group-hover:text-[#00F0FF] transition-colors">
                ARRIVA
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FF0055]/20 text-[#FF0055] border border-[#FF0055]/50 shadow-[0_0_10px_rgba(255,0,85,0.3)]">
                LAB
              </span>
            </div>
            <span className="font-mono text-[9px] block text-[#00F0FF]/80 tracking-widest uppercase">
              VTuber Production Center
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-[#E2E8F0]">
          <a 
            href="#details" 
            className="hover:text-[#00F0FF] transition-colors hover:text-glow-cyan" 
            onClick={() => setView('home')}
          >
            О проекте
          </a>
          <a 
            href="#formats" 
            className="hover:text-[#00F0FF] transition-colors hover:text-glow-cyan" 
            onClick={() => setView('home')}
          >
            Форматы участия
          </a>
          
          <span className="w-px h-4 bg-white/15"></span>
          
          <button 
            onClick={() => setView('cabinet')} 
            className={`hover:text-[#00F0FF] transition-colors flex items-center gap-1.5 ${view === 'cabinet' ? 'text-[#00F0FF] font-bold' : ''}`}
          >
            <Lock className="w-3.5 h-3.5 text-[#00F0FF]" />
            {cabinetUser ? 'Кабинет' : 'Войти'}
          </button>
          
          {isAdminMode && (
            <button 
              onClick={() => setView('crm')} 
              className={`hover:text-[#FF0055] transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF0055]/15 border border-[#FF0055]/40 text-[#FF0055] ${view === 'crm' ? 'bg-[#FF0055]/30' : ''}`}
            >
              <Shield className="w-3.5 h-3.5" /> CRM
            </button>
          )}

          {/* Uniform Neon Red Cyber Button */}
          <a 
            href="#formats" 
            onClick={() => setView('home')}
            className="cyber-btn-red px-5 py-2.5 text-xs font-bold font-cyber tracking-wider"
          >
            Выбрать формат
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/30 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0E061E]/95 border-b border-[#00F0FF]/30 px-6 py-6 space-y-4 text-left shadow-2xl">
          <a 
            href="#details" 
            onClick={() => { setView('home'); setMobileMenuOpen(false); }}
            className="block text-sm font-semibold text-white hover:text-[#00F0FF]"
          >
            О проекте
          </a>
          <a 
            href="#formats" 
            onClick={() => { setView('home'); setMobileMenuOpen(false); }}
            className="block text-sm font-semibold text-white hover:text-[#00F0FF]"
          >
            Форматы участия
          </a>
          <button 
            onClick={() => { setView('cabinet'); setMobileMenuOpen(false); }}
            className="block text-sm font-semibold text-[#00F0FF] flex items-center gap-2"
          >
            <Lock className="w-4 h-4" />
            {cabinetUser ? 'Кабинет стримера' : 'Личный кабинет'}
          </button>
          {isAdminMode && (
            <button 
              onClick={() => { setView('crm'); setMobileMenuOpen(false); }}
              className="block text-sm font-semibold text-[#FF0055] flex items-center gap-2"
            >
              <Shield className="w-4 h-4" /> Панель CRM
            </button>
          )}
          <div className="pt-2">
            <a 
              href="#formats" 
              onClick={() => { setView('home'); setMobileMenuOpen(false); }}
              className="cyber-btn-red w-full py-3.5 text-xs text-center"
            >
              Выбрать формат участия
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
