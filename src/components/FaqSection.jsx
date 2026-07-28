import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FaqSection = ({ activeFaq, setActiveFaq }) => {
  const faqs = [
    { q: 'Какой аватар выбрать — PNG, Live2D или 3D?', a: 'PNG-аватар — самый простой статичный вариант для быстрого теста. Live2D — плоская аниме-модель с плавными анимациями лица и наклонов (оптимально для 80% стримеров). 3D — полноценная трехмерная модель с отслеживанием жестов рук и тела (для продвинутых шоу).' },
    { q: 'Какое оборудование мне понадобится?', a: 'Минимально: средний игровой ПК, хорошая веб-камера (или современный iPhone с поддержкой Face ID для идеального считывания лица) и студийный микрофон. Мы подберем точный комплект под ваш бюджет.' },
    { q: 'Можно ли сохранить полную анонимность?', a: 'Да, в этом главная суть VTuber-формата! Вы скрываете лицо за аватаром, можете изменять голос с помощью программ и использовать виртуальный задний фон.' },
    { q: 'На каких площадках можно стримить?', a: 'Мы настраиваем вещание на любые популярные площадки: YouTube, Twitch, VK Play Live, Kick или TikTok.' },
    { q: 'Сколько времени занимает весь запуск?', a: 'От 2 недель для простых PNG/2D моделей до 1.5–2 месяцев для сложных кастомных 3D-образов с глубокой интеграцией.' },
  ];

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-gray-900 font-extrabold tracking-tight">Часто задаваемые вопросы</h2>
          <p className="text-gray-500 text-lg">Быстрые ответы на популярные вопросы о VTubing</p>
        </div>

        <div className="space-y-4 text-left">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <button 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-gray-900 focus:outline-none bg-transparent border-none cursor-pointer"
              >
                <span>{faq.q}</span>
                {activeFaq === idx ? <ChevronUp className="w-5 h-5 text-gray-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />}
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-5 text-gray-500 text-sm border-t border-gray-50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
