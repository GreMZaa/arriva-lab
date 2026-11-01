import React from 'react';
import { UserCheck, Sparkles } from 'lucide-react';

export const CyberInfoBento = () => {
  return (
    <section id="about" className="py-24 bg-[#0C0D12] border-b border-white/[0.07] relative text-left">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest bg-white/[0.04] border border-white/10 px-3 py-1 rounded-full">
            Специфика индустрии
          </span>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
            Формат и механика монетизации
          </h2>
          <p className="text-neutral-400 text-base">
            Почему виртуальные стримеры удерживают внимание выше классических авторов.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Блок 2. Кто такой витубер (Левая колонка) */}
          <div className="rounded-2xl p-8 sm:p-10 bg-[#12141A] border border-white/[0.08] hover:border-white/20 transition-colors flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider bg-white/[0.04] px-3 py-1 rounded-md border border-white/5">
                  Блок 01 // Определение
                </span>
                <span className="w-2 h-2 rounded-full bg-[#9FE870]"></span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Кто такой витубер
              </h3>

              <div className="space-y-4 text-neutral-300 text-base sm:text-lg leading-relaxed font-normal">
                <p>
                  <strong className="text-white font-semibold">Виртуальный стример.</strong> Человек управляет трехмерным аватаром через камеру смартфона или обычную вебку. Модель считывает мимику лица в реальном времени.
                </p>
                <p className="text-neutral-400">
                  Ты можешь быть дерзким кибер-андроидом или готической куклой. Образ берет внимание на себя. Зрители видят живую харизму, но твоя личность скрыта броней кода.
                </p>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/[0.06] flex items-center gap-3 text-xs font-mono text-neutral-400">
              <span className="text-neutral-400">Технологии:</span>
              <span className="text-neutral-300">Live2D / VRM 3D</span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-300">ARKit Motion</span>
            </div>
          </div>

          {/* Блок 3. Почему зрители платят за это (Правая колонка) */}
          <div className="rounded-2xl p-8 sm:p-10 bg-[#12141A] border border-white/[0.08] hover:border-white/20 transition-colors flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider bg-white/[0.04] px-3 py-1 rounded-md border border-white/5">
                  Блок 02 // Экономика эмоций
                </span>
                <span className="w-2 h-2 rounded-full bg-white"></span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Почему зрители платят за это
              </h3>

              <div className="space-y-4 text-neutral-300 text-base sm:text-lg leading-relaxed font-normal">
                <p>
                  <strong className="text-white font-semibold">Люди платят за эмоции.</strong> На западном рынке виртуальный стример воспринимается как персонаж ожившего аниме или интерактивного кино.
                </p>
                <p className="text-neutral-400">
                  Зрители донатят за живой отклик: крик испуга в хорроре, колкий сарказм, забавный голосовой глитч или брошенный прямо в лицо аватарки интерактивный предмет. Это шоу, где донатер становится участником событий.
                </p>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/[0.06] flex items-center gap-3 text-xs font-mono text-neutral-400">
              <span className="text-neutral-400">Монетизация:</span>
              <span className="text-neutral-300">Direct Donations</span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-300">Fansly & Twitch</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
