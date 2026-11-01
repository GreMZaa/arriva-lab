import React from 'react';

export const CyberInfoBento = () => {
  return (
    <section id="about" className="py-24 bg-white border-b border-gray-200 relative text-left">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs text-gray-500 uppercase tracking-widest bg-gray-100 border border-gray-200 px-3 py-1 rounded-full">
            Специфика индустрии
          </span>
          <h2 className="text-gray-900 text-3xl sm:text-4xl font-black tracking-tight">
            Формат и механика монетизации
          </h2>
          <p className="text-gray-600 text-base">
            Почему виртуальные стримеры удерживают внимание выше классических авторов.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Блок 2. Кто такой витубер (Левая колонка) */}
          <div className="rounded-2xl p-8 sm:p-10 bg-[#F9FAFB] border border-gray-200 hover:border-gray-300 transition-colors flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-gray-600 uppercase tracking-wider bg-white px-3 py-1 rounded-md border border-gray-200 font-semibold">
                  Блок 01 // Определение
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Кто такой витубер
              </h3>

              <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed font-normal">
                <p>
                  <strong className="text-gray-900 font-bold">Виртуальный стример.</strong> Человек управляет трехмерным аватаром через камеру смартфона или обычную вебку. Модель считывает мимику лица в реальном времени.
                </p>
                <p className="text-gray-600">
                  Ты можешь быть дерзким кибер-андроидом или готической куклой. Образ берет внимание на себя. Зрители видят живую харизму, но твоя личность скрыта броней кода.
                </p>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-gray-200 flex items-center gap-3 text-xs font-mono text-gray-500">
              <span className="font-semibold text-gray-700">Технологии:</span>
              <span className="text-gray-600">Live2D / VRM 3D</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-600">ARKit Motion</span>
            </div>
          </div>

          {/* Блок 3. Почему зрители платят за это (Правая колонка) */}
          <div className="rounded-2xl p-8 sm:p-10 bg-[#F9FAFB] border border-gray-200 hover:border-gray-300 transition-colors flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-gray-600 uppercase tracking-wider bg-white px-3 py-1 rounded-md border border-gray-200 font-semibold">
                  Блок 02 // Экономика эмоций
                </span>
                <span className="w-2 h-2 rounded-full bg-gray-900"></span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Почему зрители платят за это
              </h3>

              <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed font-normal">
                <p>
                  <strong className="text-gray-900 font-bold">Люди платят за эмоции.</strong> На западном рынке виртуальный стример воспринимается как персонаж ожившего аниме или интерактивного кино.
                </p>
                <p className="text-gray-600">
                  Зрители донатят за живой отклик: крик испуга в хорроре, колкий сарказм, забавный голосовой глитч или брошенный прямо в лицо аватарки интерактивный предмет. Это шоу, где донатер становится участником событий.
                </p>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-gray-200 flex items-center gap-3 text-xs font-mono text-gray-500">
              <span className="font-semibold text-gray-700">Монетизация:</span>
              <span className="text-gray-600">Direct Donations</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-600">Fansly & Twitch</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
