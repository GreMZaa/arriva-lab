import React from 'react';
import { Sparkles, Menu, X } from 'lucide-react';

export const Header = ({ 
  view, 
  setView, 
  handleLogoClick, 
  cabinetUser, 
  isAdminMode, 
  mobileMenuOpen, 
  setMobileMenuOpen 
}) => {
  return (
    <header className="site-header sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setView('home'); handleLogoClick(); }}>
          <img 
            src="/logo.jpg" 
            alt="ARRIVA Logo" 
            className="w-10 h-10 rounded-xl object-cover border border-gray-200"
          />
          <div>
            <span className="font-extrabold tracking-tight text-xl text-gray-900">ARRIVA</span>
            <span className="font-medium text-xs block text-gray-500 tracking-wider">LABORATORY</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-600">
          <a href="#services" className="hover:text-black transition-colors" onClick={() => setView('home')}>Услуги</a>
          <a href="#steps" className="hover:text-black transition-colors" onClick={() => setView('home')}>Как это работает</a>
          <a href="#portfolio" className="hover:text-black transition-colors" onClick={() => setView('home')}>Портфолио</a>
          <a href="#tariffs" className="hover:text-black transition-colors" onClick={() => setView('home')}>Тарифы</a>
          <a href="#contacts" className="hover:text-black transition-colors" onClick={() => setView('home')}>Контакты</a>
          
          <span className="w-px h-4 bg-gray-200"></span>
          
          <button 
            onClick={() => setView('cabinet')} 
            className={`hover:text-black transition-colors ${view === 'cabinet' ? 'text-black font-semibold' : ''}`}
          >
            {cabinetUser ? 'Кабинет' : 'Войти'}
          </button>
          
          {isAdminMode && (
            <button 
              onClick={() => setView('crm')} 
              className={`hover:text-black transition-colors ${view === 'crm' ? 'text-black font-semibold' : ''}`}
            >
              CRM
            </button>
          )}

          <button 
            onClick={() => setView('quiz')} 
            className="btn btn-primary text-xs py-2 px-4 flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" /> Подобрать образ
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 flex flex-col gap-4 font-medium text-sm text-gray-700">
          <a href="#services" className="py-2 border-b border-gray-50" onClick={() => { setView('home'); setMobileMenuOpen(false); }}>Услуги</a>
          <a href="#steps" className="py-2 border-b border-gray-50" onClick={() => { setView('home'); setMobileMenuOpen(false); }}>Как это работает</a>
          <a href="#portfolio" className="py-2 border-b border-gray-50" onClick={() => { setView('home'); setMobileMenuOpen(false); }}>Портфолио</a>
          <a href="#tariffs" className="py-2 border-b border-gray-50" onClick={() => { setView('home'); setMobileMenuOpen(false); }}>Тарифы</a>
          <a href="#contacts" className="py-2 border-b border-gray-50" onClick={() => { setView('home'); setMobileMenuOpen(false); }}>Контакты</a>
          
          <button onClick={() => { setView('cabinet'); setMobileMenuOpen(false); }} className="py-2 border-b border-gray-50 text-left">
            {cabinetUser ? 'Личный кабинет' : 'Личный кабинет (Войти)'}
          </button>
          {isAdminMode && (
            <button onClick={() => { setView('crm'); setMobileMenuOpen(false); }} className="py-2 border-b border-gray-50 text-left">
              CRM-Панель
            </button>
          )}
          <button onClick={() => { setView('quiz'); setMobileMenuOpen(false); }} className="btn btn-primary mt-2">
            <Sparkles className="w-4 h-4" /> Подобрать образ VTuber
          </button>
        </div>
      )}
    </header>
  );
};
