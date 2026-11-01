import React from 'react';
import { Bot, HeartHandshake, Eye, Sparkles, Terminal, Gift } from 'lucide-react';

export const CyberInfoBento = () => {
  return (
    <section id="about" className="py-24 bg-[#0D0E15] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest bg-cyan-950/50 border border-cyan-500/30 px-3 py-1 rounded-full">
            Информация о формате
          </span>
          <h2 className="text-white text-3xl sm:text-4xl font-black tracking-tight">
            Новая индустрия интерактивного стриминга
          </h2>
          <p className="text-gray-400 text-base">
            Почему виртуальные аватары обходят классический стриминг по вовлеченности и донатам.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Блок 2. Кто такой витубер (Левая колонка) */}
          <div className="relative rounded-3xl p-8 sm:p-10 bg-[#12141F] border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between text-left group overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors"></div>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Bot className="w-7 h-7" />
                </div>
                <span className="font-mono text-xs text-gray-500 uppercase tracking-wider bg-white/5 px-3 py-1 rounded-full">
                  Блок 01 // Формат
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Кто такой витубер
              </h3>

              <div className="space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed">
                <p>
                  <strong className="text-cyan-400 font-semibold">Виртуальный стример.</strong> Человек управляет трехмерным аватаром через камеру смартфона или обычную вебку. Модель считывает мимику лица в реальном времени.
                </p>
                <p>
                  Ты можешь быть дерзким кибер-андроидом или готической куклой. Образ берет внимание на себя. Зрители видят живую харизму, но твоя личность скрыта броней кода.
                </p>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/5 flex flex-wrap gap-2 text-xs font-mono text-gray-400">
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-cyan-300">#FaceTracking</span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-purple-300">#3DAvatar</span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-emerald-300">#Anonymity</span>
            </div>
          </div>

          {/* Блок 3. Почему зрители платят за это (Правая колонка) */}
          <div className="relative rounded-3xl p-8 sm:p-10 bg-[#12141F] border border-white/10 hover:border-purple-500/40 transition-all flex flex-col justify-between text-left group overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/10 transition-colors"></div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Gift className="w-7 h-7" />
                </div>
                <span className="font-mono text-xs text-gray-500 uppercase tracking-wider bg-white/5 px-3 py-1 rounded-full">
                  Блок 02 // Экономика
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Почему зрители платят за это
              </h3>

              <div className="space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed">
                <p>
                  <strong className="text-purple-400 font-semibold">Люди платят за эмоции.</strong> На западном рынке виртуальный стример воспринимается как персонаж ожившего аниме или интерактивного кино.
                </p>
                <p>
                  Зрители донатят за живой отклик: крик испуга в хорроре, колкий сарказм, забавный голосовой глитч или брошенный прямо в лицо аватарки интерактивный предмет. Это шоу, где донатер становится участником событий.
                </p>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/5 flex flex-wrap gap-2 text-xs font-mono text-gray-400">
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-purple-300">#InteractiveDonations</span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-pink-300">#EmotionalConnection</span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-cyan-300">#TwitchFansly</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
