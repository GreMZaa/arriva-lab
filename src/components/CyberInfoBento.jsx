import React from 'react';
import { Tv, ShieldCheck, Percent } from 'lucide-react';

export const CyberInfoBento = () => {
  return (
    <section id="benefits" className="py-24 bg-[#090A0E] border-b border-white/[0.08] relative text-left">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs text-zinc-300 uppercase tracking-widest bg-white/[0.05] border border-white/10 px-3.5 py-1.5 rounded-full">
            Преимущества агентства
          </span>
          <h2 className="text-white text-3xl sm:text-5xl font-bold tracking-tight">
            Почему формат работает
          </h2>
          <p className="text-zinc-400 text-base">
            Три ключевых фактора, которые обеспечивают взрывной рост аудитории и максимальную безопасность.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* Карточка 1 */}
          <div className="rounded-2xl p-8 bg-[#13141C] border border-white/[0.08] hover:border-zinc-700 transition-colors flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-200">
                <Tv className="w-5 h-5" />
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                Почему витуберы взрывают Twitch и Fansly
              </h3>

              <p className="text-zinc-400 text-sm leading-relaxed font-normal">
                Западный зритель перенасыщен обычными вебками. Трехмерная модель привлекает внимание моментально. Интерактивные предметы, летящие в лицо аватара за донат, микросбои звука и безумная мимика создают эффект аниме в прямом эфире. За эту интерактивность донатят в разы охотнее.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs font-mono text-zinc-500">
              #Live2D #VRM #InteractiveShow
            </div>
          </div>

          {/* Карточка 2 */}
          <div className="rounded-2xl p-8 bg-[#13141C] border border-white/[0.08] hover:border-zinc-700 transition-colors flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                Железная анонимность
              </h3>

              <p className="text-zinc-400 text-sm leading-relaxed font-normal">
                Никакого сталкерства, сливов внешности или страха встретить знакомых. Твоя комната и тело остаются за кадром. Зритель знает только персонажа, историю и голос.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs font-mono text-zinc-500">
              #TotalPrivacy #ZeroDoxxing
            </div>
          </div>

          {/* Карточка 3 */}
          <div className="rounded-2xl p-8 bg-[#13141C] border border-white/[0.08] hover:border-zinc-700 transition-colors flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-200">
                <Percent className="w-5 h-5" />
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                Честный процент 70/30
              </h3>

              <p className="text-zinc-400 text-sm leading-relaxed font-normal">
                Никаких копеечных зарплат. Ты получаешь 70% со всех входящих денег: подписки, донаты, подарки, спонсорка. Мы забираем 30% за продакшн, маркетинг и ведение. Растет твой общий чек — наша комиссия снижается до 15%.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs font-mono text-zinc-500">
              #FairRevenueShare #ScalableIncome
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
