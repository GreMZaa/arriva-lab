import React from 'react';
import { Tv, Sparkles, DollarSign, Percent, Shield, ArrowUpRight } from 'lucide-react';

export const CyberInfoBento = () => {
  return (
    <section id="details" className="py-24 bg-[#080512] border-b border-[#00F0FF]/20 relative text-left cyber-grid-container overflow-hidden">
      
      {/* Ambient Cyber Light */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#FF0055]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#140826] border border-[#00F0FF]/40 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
            <span className="font-mono text-xs text-[#00F0FF] uppercase tracking-widest font-bold">
              FAQ & ДЕТАЛИ ПРОЕКТА
            </span>
          </div>

          <h2 className="font-cyber text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Всё, что нужно знать перед стартом
          </h2>
          
          <p className="text-[#E2E8F0] text-base sm:text-lg">
            Четыре честных ответа на главные вопросы: от технологии 3D-аватара до выплат и процентов.
          </p>
        </div>

        {/* Четыре яркие кибер-карточки (2x2 grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Карточка 1 */}
          <div className="relative group rounded-2xl p-[1.5px] bg-gradient-to-br from-[#00F0FF]/60 via-[#00F0FF]/15 to-[#B026FF]/40 shadow-[0_0_25px_rgba(0,240,255,0.15)] hover:shadow-[0_0_40px_rgba(0,240,255,0.3)] transition-all">
            <div className="rounded-[15px] p-8 sm:p-9 bg-[#0E061E]/90 backdrop-blur-xl h-full flex flex-col justify-between relative overflow-hidden">
              
              {/* Corner HUD reticle */}
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#00F0FF] pointer-events-none"></div>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/15 border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                    <Tv className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs text-[#00F0FF] font-bold px-3 py-1 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/30">
                    МОДУЛЬ 01
                  </span>
                </div>

                <h3 className="font-cyber text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  Кто такой витубер и чем он занимается?
                </h3>

                <p className="text-[#E2E8F0] text-sm sm:text-base leading-relaxed font-normal">
                  Витубер это стример, который общается с аудиторией через крутого 3D-персонажа вместо обычной веб-камеры. Специальная программа улавливает мимику твоего лица через телефон или вебку и в реальном времени переносит каждую эмоцию на экранного героя. Мы не заставляем тебя ломать себя или отыгрывать чужую роль. Мы подбираем и собираем внешность витубера строго под твой реальный психотип. Если ты по жизни дерзкая и саркастичная, мы сделаем тебе образ язвительного кибер-панка. Если ты мягкая и игривая, соберем милого аниме-персонажа. Ты просто играешь в игры, общаешься, смеешься и остаешься собой под надежной цифровой броней.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#00F0FF]">
                <span>#Live2D #FaceTracking #3DCharacter</span>
                <ArrowUpRight className="w-4 h-4 text-[#00F0FF]" />
              </div>
            </div>
          </div>

          {/* Карточка 2 */}
          <div className="relative group rounded-2xl p-[1.5px] bg-gradient-to-br from-[#FF0055]/60 via-[#FF0055]/15 to-[#B026FF]/40 shadow-[0_0_25px_rgba(255,0,85,0.15)] hover:shadow-[0_0_40px_rgba(255,0,85,0.3)] transition-all">
            <div className="rounded-[15px] p-8 sm:p-9 bg-[#0E061E]/90 backdrop-blur-xl h-full flex flex-col justify-between relative overflow-hidden">
              
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#FF0055] pointer-events-none"></div>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#FF0055]/15 border border-[#FF0055]/40 flex items-center justify-center text-[#FF0055] shadow-[0_0_15px_rgba(255,0,85,0.3)]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs text-[#FF0055] font-bold px-3 py-1 rounded bg-[#FF0055]/10 border border-[#FF0055]/30">
                    ТРЕНД 2026
                  </span>
                </div>

                <h3 className="font-cyber text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  Почему именно сейчас это разрывает интернет?
                </h3>

                <p className="text-[#E2E8F0] text-sm sm:text-base leading-relaxed font-normal">
                  Классические стримеры с обычными вебками всем надоели. В 2026 году западная аудитория жаждет яркого визуала, киберпанка и живого интерактива, похожего на ожившую игру или аниме. Для тебя как для автора это абсолютная свобода и комфорт. Тебе не нужно наносить макияж по два часа, убирать комнату на заднем фоне или переживать, что трансляцию увидят знакомые из твоего города. Ты садишься за компьютер в любой домашней одежде, нажимаешь одну кнопку запуска и выглядишь в кадре как звезда мирового уровня.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#FF0055]">
                <span>#ZeroMakeup #GlobalAudience #NoDoxxing</span>
                <ArrowUpRight className="w-4 h-4 text-[#FF0055]" />
              </div>
            </div>
          </div>

          {/* Карточка 3 */}
          <div className="relative group rounded-2xl p-[1.5px] bg-gradient-to-br from-[#00F0FF]/60 via-[#00F0FF]/15 to-[#10B981]/40 shadow-[0_0_25px_rgba(0,240,255,0.15)] hover:shadow-[0_0_40px_rgba(0,240,255,0.3)] transition-all">
            <div className="rounded-[15px] p-8 sm:p-9 bg-[#0E061E]/90 backdrop-blur-xl h-full flex flex-col justify-between relative overflow-hidden">
              
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#00F0FF] pointer-events-none"></div>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/15 border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs text-[#00F0FF] font-bold px-3 py-1 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/30">
                    МОНЕТИЗАЦИЯ
                  </span>
                </div>

                <h3 className="font-cyber text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  Почему люди будут платить тебе реальные деньги?
                </h3>

                <p className="text-[#E2E8F0] text-sm sm:text-base leading-relaxed font-normal">
                  На Twitch, YouTube и Fansly западные зрители приходят за живыми эмоциями, вниманием и шоу. Они платят не за киберспортивный скилл, а за твой отклик. Мы подключаем к твоей модели интерактивные механики: зритель кидает донат и может бросить в лицо твоему аватару виртуальный торт, включить смешной голосовой баг, услышать твой крик в хорроре или заказать приватный флирт. Людям нравится управлять тем, что происходит на экране. Они легко расстаются с десятками и сотнями долларов за вечер просто ради того, чтобы твой персонаж обратил на них внимание.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#00F0FF]">
                <span>#TwitchDonates #InteractiveDonations #USDPayouts</span>
                <ArrowUpRight className="w-4 h-4 text-[#00F0FF]" />
              </div>
            </div>
          </div>

          {/* Карточка 4 */}
          <div className="relative group rounded-2xl p-[1.5px] bg-gradient-to-br from-[#FF0055]/60 via-[#FF0055]/15 to-[#F59E0B]/40 shadow-[0_0_25px_rgba(255,0,85,0.15)] hover:shadow-[0_0_40px_rgba(255,0,85,0.3)] transition-all">
            <div className="rounded-[15px] p-8 sm:p-9 bg-[#0E061E]/90 backdrop-blur-xl h-full flex flex-col justify-between relative overflow-hidden">
              
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#FF0055] pointer-events-none"></div>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#FF0055]/15 border border-[#FF0055]/40 flex items-center justify-center text-[#FF0055] shadow-[0_0_15px_rgba(255,0,85,0.3)]">
                    <Percent className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs text-[#FF0055] font-bold px-3 py-1 rounded bg-[#FF0055]/10 border border-[#FF0055]/30">
                    70/30 → 80/20
                  </span>
                </div>

                <h3 className="font-cyber text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  Честные деньги: почему мы берем 30% и снижаем до 20%?
                </h3>

                <p className="text-[#E2E8F0] text-sm sm:text-base leading-relaxed font-normal">
                  Мы не сажаем стримеров на фиксированную зарплату, потому что в стриминге твой доход зависит только от твоей активности. Мы работаем как полноценный продюсерский центр и берем на старте 30% от общей кассы со всех площадок, донатов и рекламных интеграций. Твои честные 70% сразу уходят тебе. За свои 30% мы даем тебе готовую 3D-модель, настраиваем программы, регистрируем аккаунты и прикрепляем наставника, который ведет тебя за руку. Когда ты работаешь с нами больше месяца и выходишь на стабильный результат, мы снижаем свой процент до 20%, а твоя доля вырастает до 80% (это наш максимальный порог снижения). Для старта тебе понадобится только паспорт для легальной внутренней верификации возраста на зарубежных платформах и криптокошелек для получения выплат.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#FF0055]">
                <span>#70to80Percent #FullProduction #USDTDirect</span>
                <ArrowUpRight className="w-4 h-4 text-[#FF0055]" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
