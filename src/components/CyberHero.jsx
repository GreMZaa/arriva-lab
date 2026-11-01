import React from 'react';
import { ArrowDown, Shield, TrendingUp, Sparkles, Wallet, Zap, EyeOff } from 'lucide-react';

export const CyberHero = ({ onChooseFormatClick }) => {
  return (
    <section className="relative py-20 lg:py-32 border-b border-[#00F0FF]/20 text-left overflow-hidden cyber-grid-container">
      
      {/* Perspective Grid Background & Neon Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#00F0FF]/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-[#FF0055]/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-[#B026FF]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10">
        
        {/* Left Column: Headlines & Selling Offer */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Status Plate */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#140826]/80 border border-[#00F0FF]/40 shadow-[0_0_20px_rgba(0,240,255,0.25)] backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]"></span>
            </span>
            <span className="text-[#00F0FF] font-mono text-xs font-bold tracking-widest uppercase text-glow-cyan">
              SYSTEM ONLINE // ПРОДЮСЕРСКИЙ ЦЕНТР ARRIVA LAB
            </span>
          </div>

          {/* H1 Headline */}
          <h1 className="font-cyber text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
            Если ты здесь, значит,{' '}
            <span className="bg-gradient-to-r from-[#00F0FF] via-[#FF0055] to-[#FF0055] bg-clip-text text-transparent filter drop-shadow-[0_0_25px_rgba(255,0,85,0.4)]">
              ты хочешь зарабатывать
            </span>
            . И вот почему тебе нужно делать это именно с нами.
          </h1>

          {/* Subtitle text */}
          <p className="text-[#E2E8F0] text-base sm:text-lg leading-relaxed font-normal">
            Забудь про скучную работу в офисе за 30-40 тысяч рублей и страх светить лицом на камеру. Мы запускаем виртуальных стримеров под ключ и выводим их на богатый рынок США и Европы. Наша команда изучает твой характер, создает уникального 3D-аватара строго под твой психотип, настраивает софт и дает личного куратора. Ты просто выходишь в эфир из дома и зарабатываешь на своей харизме, а мы берем на себя всю рутину, технику и продвижение.
          </p>

          {/* 4 Neon Key Fact Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            
            {/* Fact 1 */}
            <div className="p-3.5 rounded-xl bg-[#140826]/80 border border-[#00F0FF]/35 shadow-[0_0_15px_rgba(0,240,255,0.12)] flex items-start gap-3 backdrop-blur-md group hover:border-[#00F0FF] transition-all">
              <div className="p-2 rounded-lg bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] shrink-0 mt-0.5">
                <EyeOff className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm text-white font-medium leading-snug">
                <strong>Полная анонимность</strong> без показа реального лица и паспорта зрителям.
              </p>
            </div>

            {/* Fact 2 */}
            <div className="p-3.5 rounded-xl bg-[#140826]/80 border border-[#FF0055]/35 shadow-[0_0_15px_rgba(255,0,85,0.12)] flex items-start gap-3 backdrop-blur-md group hover:border-[#FF0055] transition-all">
              <div className="p-2 rounded-lg bg-[#FF0055]/15 border border-[#FF0055]/40 text-[#FF0055] shrink-0 mt-0.5">
                <TrendingUp className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm text-white font-medium leading-snug">
                <strong>От 70% до 80%</strong> чистой прибыли со всех донатов, подписок и рекламы идет тебе.
              </p>
            </div>

            {/* Fact 3 */}
            <div className="p-3.5 rounded-xl bg-[#140826]/80 border border-[#00F0FF]/35 shadow-[0_0_15px_rgba(0,240,255,0.12)] flex items-start gap-3 backdrop-blur-md group hover:border-[#00F0FF] transition-all">
              <div className="p-2 rounded-lg bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm text-white font-medium leading-snug">
                <strong>Бесплатный запуск с нуля</strong>, где модель и софт полностью оплачивает агентство.
              </p>
            </div>

            {/* Fact 4 */}
            <div className="p-3.5 rounded-xl bg-[#140826]/80 border border-[#FF0055]/35 shadow-[0_0_15px_rgba(255,0,85,0.12)] flex items-start gap-3 backdrop-blur-md group hover:border-[#FF0055] transition-all">
              <div className="p-2 rounded-lg bg-[#FF0055]/15 border border-[#FF0055]/40 text-[#FF0055] shrink-0 mt-0.5">
                <Wallet className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm text-white font-medium leading-snug">
                <strong>Выплаты в USDT</strong> напрямую на твой криптокошелек без задержек и банковских блокировок.
              </p>
            </div>

          </div>

          {/* Main Neon Red Action Button */}
          <div className="pt-4">
            <a
              href="#formats"
              onClick={onChooseFormatClick}
              className="cyber-btn-red px-8 py-5 text-sm sm:text-base font-cyber tracking-wider gap-3 shadow-[0_0_30px_rgba(255,0,85,0.7)]"
            >
              <span>УЗНАТЬ ПОДРОБНОСТИ И ВЫБРАТЬ ФОРМАТ</span>
              <ArrowDown className="w-5 h-5 text-white animate-bounce" />
            </a>
          </div>

        </div>

        {/* Right Column: Cyber Avatar HUD Showcase */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          
          {/* Futuristic HUD Frame */}
          <div className="relative w-full max-w-[420px] rounded-2xl p-[1.5px] bg-gradient-to-b from-[#00F0FF] via-[#FF0055] to-[#B026FF] shadow-[0_0_50px_rgba(0,240,255,0.3)]">
            <div className="rounded-[15px] bg-[#0E061E] overflow-hidden relative">
              
              <div className="h-[480px] relative overflow-hidden group">
                <img 
                  src="/hero_vtuber.png" 
                  alt="ARRIVA Cyber VTuber" 
                  className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.1] transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* HUD Overlay Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E061E] via-transparent to-[#0E061E]/40 pointer-events-none"></div>

                {/* Top HUD Telemetry */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                  <div className="px-3 py-1 rounded-lg bg-[#080512]/90 border border-[#00F0FF]/50 text-[#00F0FF] font-mono text-[11px] font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,240,255,0.4)]">
                    <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping"></span>
                    ARKit 60 FPS
                  </div>
                  <div className="px-3 py-1 rounded-lg bg-[#080512]/90 border border-[#FF0055]/50 text-[#FF0055] font-mono text-[11px] font-bold shadow-[0_0_12px_rgba(255,0,85,0.4)]">
                    ● 100% ANONYMOUS
                  </div>
                </div>

                {/* Corner HUD Reticles */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#00F0FF] pointer-events-none"></div>
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#FF0055] pointer-events-none"></div>
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#00F0FF] pointer-events-none"></div>
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#FF0055] pointer-events-none"></div>

                {/* Bottom HUD Spec Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#080512]/95 p-4 rounded-xl border border-white/20 backdrop-blur-md z-10 text-left space-y-1.5 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-cyber text-xs font-bold tracking-wider text-glow-cyan">
                      CYBER AVATAR // LIVE TRACK
                    </span>
                    <span className="text-[10px] font-mono text-[#00F0FF] font-bold bg-[#00F0FF]/20 px-2 py-0.5 rounded border border-[#00F0FF]/50">
                      SECURED
                    </span>
                  </div>
                  <p className="text-[11px] text-[#E2E8F0] font-mono leading-normal">
                    Голос и мимика считываются с веб-камеры в реальном времени. Личность надежно скрыта цифровой броней.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
