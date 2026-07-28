import React from 'react';
import { Sparkles, ArrowRight, Check, X, Layers, Box, Volume2 } from 'lucide-react';
import { defaultProducts } from '../supabase';

export const TariffsSection = ({ products, setView, setContactAbout }) => {
  return (
    <section id="tariffs" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-gray-900 font-extrabold tracking-tight">Тарифы и Программы</h2>
          <p className="text-gray-500 text-lg">Выберите подходящий формат или пройдите <button onClick={() => setView('quiz')} className="text-[#123d0c] font-bold underline hover:text-black bg-transparent border-none p-0 cursor-pointer">подбор образа</button></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(() => {
            const typeOrder = { 'basic': 1, 'restart': 2, 'premium': 3, '18+': 4, 'agency': 5 };
            const rawList = (products && products.length > 0) ? products : defaultProducts;
            const list = rawList.filter(p => ['basic', 'restart', 'premium', '18+', 'agency'].includes(p.type));
            return [...list].sort((a, b) => (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99));
          })().map((product) => {

            // Subtitles lookup helper
            const subtitleMap = {
              'basic': 'Быстрый старт (Сами)',
              'restart': 'Переход с веб-камеры (Рестарт)',
              'premium': 'Полное сопровождение под ключ',
              '18+': 'Всё включено (С нами)',
              'agency': 'Агентская программа'
            };
            const cardSubtitle = product.subtitle || subtitleMap[product.type] || '';

            return (
              <div 
                key={product.id || product.name} 
                className="bg-gray-50 border border-gray-100 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#9FE870] transition-all duration-300 group"
              >
                <div className="space-y-6 text-left">
                  <div className="flex justify-center mb-2">
                    <span className="text-3xl font-black uppercase bg-[#9FE870]/20 text-[#123d0c] px-6 py-2.5 rounded-2xl border border-[#9FE870]/40 tracking-widest">
                      {product.type}
                    </span>
                  </div>
                  <div className="text-center">
                    <h3 className="font-extrabold text-gray-900 text-xl leading-tight group-hover:text-black transition-colors">{product.name}</h3>
                    {cardSubtitle && (
                      <span className="inline-block mt-1 text-xs font-extrabold text-[#123d0c] bg-lime-100/60 px-2.5 py-0.5 rounded-full">
                        {cardSubtitle}
                      </span>
                    )}
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">{product.description}</p>
                  </div>
                  <div className="text-3xl font-black text-gray-950 text-center">
                    {product.priceLabel ? product.priceLabel : (product.price === 0 ? '15% от дохода' : `${Number(product.price).toLocaleString('ru-RU')} ₽`)}
                  </div>
                  <ul className="text-sm text-gray-500 space-y-3 border-t border-gray-200 pt-6 text-left">
                    {product.features && product.features.map((rawFeat, idx) => {
                      const feat = rawFeat
                        .replace(/Без скидки на готовую модель/gi, "Скидка 50% на готовую модель")
                        .replace(/❌ Скидка на готовую модель/gi, "Скидка 50% на готовую модель");
                      const isExcluded = feat.startsWith('Без') || feat.startsWith('без');
                      return (
                        <li key={idx} className="flex items-start gap-2.5 leading-snug">
                          {isExcluded ? (
                            <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                          ) : (
                            <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          )}
                          <span className={isExcluded ? 'text-gray-400 font-medium line-through decoration-red-200/50 decoration-1' : 'text-gray-700 font-medium'}>
                            {feat}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <a
                  href="#contacts"
                  onClick={() => setContactAbout(product.priceLabel ? `${product.name} (${product.priceLabel})` : (product.price === 0 ? `${product.name} (15% от дохода)` : `${product.name} (${Number(product.price).toLocaleString('ru-RU')} ₽)`))}
                  className="btn btn-primary w-full mt-8 py-3.5 text-sm font-extrabold text-center flex items-center justify-center gap-2 shadow-sm"
                >
                  {product.type === 'agency' ? 'Подать заявку' : 'Выбрать и оформить'} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>

        {/* ADDITIONAL SERVICES SECTION */}
        <div className="mt-20 pt-16 border-t border-gray-100">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-lime-50 text-[#123d0c] font-bold text-xs rounded-full uppercase tracking-wider border border-[#9FE870]/40">
              <Sparkles className="w-3.5 h-3.5" /> Кастомные решения
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Дополнительные услуги</h3>
            <p className="text-gray-500 text-base">Индивидуальная разработка и сервисы под ваши задачи</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 2D Model */}
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#9FE870] transition-all duration-300 group text-left">
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#123d0c] shadow-sm group-hover:bg-[#9FE870]/20 transition-colors">
                  <Layers className="w-7 h-7 text-gray-800 group-hover:text-[#123d0c]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900 text-xl group-hover:text-black transition-colors">Создание 2D модели</h4>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    Разработка концепт-арта персонажа, арт по слоям и профессиональный Live2D риггинг.
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Стоимость</div>
                  <div className="text-2xl font-black text-gray-950 mt-1">Цена по запросу</div>
                </div>
              </div>
              <a 
                href="#contacts"
                onClick={() => setContactAbout('Создание 2D модели (Цена по запросу)')}
                className="btn btn-primary w-full mt-8 py-3.5 text-sm font-bold text-center inline-block"
              >
                Узнать стоимость
              </a>
            </div>

            {/* 3D Model */}
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#9FE870] transition-all duration-300 group text-left">
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#123d0c] shadow-sm group-hover:bg-[#9FE870]/20 transition-colors">
                  <Box className="w-7 h-7 text-gray-800 group-hover:text-[#123d0c]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900 text-xl group-hover:text-black transition-colors">Создание 3D модели</h4>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    Трехмерное моделирование персонажа, текстурирование, настройка шейдеров и физики под VRM/Unity.
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Стоимость</div>
                  <div className="text-2xl font-black text-gray-950 mt-1">Цена по запросу</div>
                </div>
              </div>
              <a 
                href="#contacts"
                onClick={() => setContactAbout('Создание 3D модели (Цена по запросу)')}
                className="btn btn-primary w-full mt-8 py-3.5 text-sm font-bold text-center inline-block"
              >
                Узнать стоимость
              </a>
            </div>

            {/* Audio Translator */}
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#9FE870] transition-all duration-300 group text-left">
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#123d0c] shadow-sm group-hover:bg-[#9FE870]/20 transition-colors">
                  <Volume2 className="w-7 h-7 text-gray-800 group-hover:text-[#123d0c]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900 text-xl group-hover:text-black transition-colors">Аудио переводчик</h4>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    Выкуп своего голоса, настройка на один язык для потокового аудио-перевода в реальном времени.
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Стоимость</div>
                  <div className="text-2xl font-black text-gray-950 mt-1">10 000 ₽</div>
                </div>
              </div>
              <a 
                href="#contacts"
                onClick={() => setContactAbout('Аудио переводчик (10 000 ₽)')}
                className="btn btn-primary w-full mt-8 py-3.5 text-sm font-bold text-center inline-block"
              >
                Заказать сервис
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
