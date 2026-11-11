import React from 'react';
import { Menu, X, Lock, Shield } from 'lucide-react';

export const CyberHeader = ({
  view,
  setView,
  handleLogoClick,
  cabinetUser,
  isAdminMode,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-stage-void/92 backdrop-blur-md border-b border-white/[0.07] text-[#f5f0e8]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-3 cursor-pointer group"
          onClick={(e) => {
            e.preventDefault();
            setView('home');
            handleLogoClick();
          }}
        >
          <div className="w-10 h-10 rounded-sm bg-stage-panel border border-white/10 flex items-center justify-center font-display font-extrabold text-xs tracking-tight group-hover:border-chroma/40 transition-colors">
            AR
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold tracking-tight text-base">ARRIVA</span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-sm bg-live/15 text-live border border-live/30">
                LAB
              </span>
            </div>
            <span className="font-mono text-[9px] block text-stone-500 tracking-widest uppercase">
              VTuber production
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-400">
          <a
            href="#details"
            className="hover:text-[#f5f0e8] transition-colors"
            onClick={() => setView('home')}
          >
            О проекте
          </a>
          <a
            href="#formats"
            className="hover:text-[#f5f0e8] transition-colors"
            onClick={() => setView('home')}
          >
            Форматы
          </a>

          <span className="w-px h-4 bg-white/10" />

          <button
            type="button"
            onClick={() => setView('cabinet')}
            className={`hover:text-chroma transition-colors flex items-center gap-1.5 cursor-pointer ${
              view === 'cabinet' ? 'text-chroma' : ''
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            {cabinetUser ? 'Кабинет' : 'Войти'}
          </button>

          {isAdminMode && (
            <button
              type="button"
              onClick={() => setView('crm')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-stage-panel border border-white/10 text-sm cursor-pointer hover:border-live/40 ${
                view === 'crm' ? 'border-live/50 text-live' : ''
              }`}
            >
              <Shield className="w-3.5 h-3.5" /> CRM
            </button>
          )}

          <a
            href="#formats"
            onClick={() => setView('home')}
            className="btn-live px-5 py-2.5 text-xs tracking-wide"
          >
            Выбрать формат
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-sm text-[#f5f0e8] bg-stage-panel border border-white/10 cursor-pointer"
          aria-expanded={mobileMenuOpen}
          aria-label="Меню"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-stage-floor border-b border-white/[0.07] px-6 py-6 space-y-4">
          <a
            href="#details"
            onClick={() => {
              setView('home');
              setMobileMenuOpen(false);
            }}
            className="block text-sm font-medium text-[#f5f0e8]"
          >
            О проекте
          </a>
          <a
            href="#formats"
            onClick={() => {
              setView('home');
              setMobileMenuOpen(false);
            }}
            className="block text-sm font-medium text-[#f5f0e8]"
          >
            Форматы участия
          </a>
          <button
            type="button"
            onClick={() => {
              setView('cabinet');
              setMobileMenuOpen(false);
            }}
            className="block text-sm font-medium text-chroma flex items-center gap-2 cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            {cabinetUser ? 'Кабинет стримера' : 'Личный кабинет'}
          </button>
          {isAdminMode && (
            <button
              type="button"
              onClick={() => {
                setView('crm');
                setMobileMenuOpen(false);
              }}
              className="block text-sm font-medium text-live flex items-center gap-2 cursor-pointer"
            >
              <Shield className="w-4 h-4" /> Панель CRM
            </button>
          )}
          <a
            href="#formats"
            onClick={() => {
              setView('home');
              setMobileMenuOpen(false);
            }}
            className="btn-live w-full py-3.5 text-xs text-center block"
          >
            Выбрать формат участия
          </a>
        </div>
      )}
    </header>
  );
};
