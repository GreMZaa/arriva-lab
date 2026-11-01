import React from 'react';
import { Tv, ShieldCheck, Percent, Sparkles } from 'lucide-react';

export const CyberInfoBento = () => {
  return (
    <section id="benefits" className="py-24 bg-[#090A0F] border-b border-white/[0.08] relative text-left">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs text-[#00F5FF] uppercase tracking-widest bg-[#00F5FF]/10 border border-[#00F5FF]/30 px-3.5 py-1 rounded-full">
            Преимущества агентства
          </span>
          <h2 className="text-white text-3xl sm:text-5xl font-black tracking-tight">
            Почему формат работает
          </h2>
          <p className="text-neutral-400 text-base">
            Три ключевых фактора, которые обеспечивают взрывной рост аудитории и максимальную безопасность.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* Карточка 1 */}
          <div className="group rounded-3xl p-8 bg-[rgba(18,20,32,0.7)] backdrop-blur-xl border border-white/[0.08] hover:border-[#00F5FF]/40 hover:shadow-[0_0_30px_rgba(0,245,255,0.15)] transition-all flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-6 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#00F5FF]/10 border border-[#00F5FF]/30 flex items-center justify-center text-[#00F5FF]">
                <Tv className="w-6 h-6" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                Почему витуберы взрывают Twitch и Fansly
              </h3>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-normal">
                Западный зритель перенасыщен обычными вебками. Трехмерная модель привлекает внимание моментально. Интерактивные предметы, летящие в лицо аватара за донат, микросбои звука и безумная мимика создают эффект аниме в прямом эфире. За эту интерактивность донатят в разы охотнее.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs font-mono text-[#00F5FF]">
              #Live2D #VRM #InteractiveShow
            </div>
          </div>

          {/* Карточка 2 */}
          <div className="group rounded-3xl p-8 bg-[rgba(18,20,32,0.7)] backdrop-blur-xl border border-white/[0.08] hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-6 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                Железная анонимность
              </h3>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-normal">
                Никакого сталкерства, сливов внешности или страха встретить знакомых. Твоя комната и тело остаются за кадром. Зритель знает только персонажа, историю и голос.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs font-mono text-emerald-400">
              #TotalPrivacy #ZeroDoxxing
            </div>
          </div>

          {/* Карточка 3 */}
          <div className="group rounded-3xl p-8 bg-[rgba(18,20,32,0.7)] backdrop-blur-xl border border-white/[0.08] hover:border-[#FF007A]/40 hover:shadow-[0_0_30px_rgba(255,0,122,0.15)] transition-all flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-6 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#FF007A]/10 border border-[#FF007A]/30 flex items-center justify-center text-[#FF007A]">
                <Percent className="w-6 h-6" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                Честный процент 70/30
              </h3>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-normal">
                Никаких копеечных зарплат. Ты получаешь 70% со всех входящих денег: подписки, донаты, подарки, спонсорка. Мы забираем 30% за продакшн, маркетинг и ведение. Растет твой общий чек — наша комиссия снижается до 15%.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs font-mono text-[#FF007A]">
              #FairRevenueShare #ScalableIncome
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
