import { Check } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import { trackWhatsAppClick } from '../utils/analytics';
import pricingData from '../data/pricing.json';

const PricingSection = ({ currentText, lang, whatsAppLink }) => {
  const { ref, isVisible } = useScrollReveal();
  const tiers = pricingData.tiers;

  return (
    <section id="pricing" className="py-20 bg-sky-900 text-white">
      <div ref={ref} className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{currentText.pricing.title}</h2>
          <p className="text-sky-200 text-lg">{pricingData.subtitle[lang]}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-gray-800">
          {tiers.map((tier, i) => {
            const isHighlighted = tier.highlighted;
            const nameColor = tier.color === 'purple' ? 'text-purple-500' : isHighlighted ? 'text-sky-600' : 'text-gray-500';
            const btnClass = isHighlighted
              ? 'w-full bg-sky-600 text-white font-bold py-3 rounded-lg hover:bg-sky-700 transition mb-6'
              : tier.color === 'purple'
                ? 'w-full border-2 border-purple-500 text-purple-600 font-bold py-3 rounded-lg hover:bg-purple-50 transition mb-6'
                : 'w-full border-2 border-sky-600 text-sky-600 font-bold py-3 rounded-lg hover:bg-sky-50 transition mb-6';

            return (
              <div key={i} className={`bg-white rounded-2xl p-8 ${
                isHighlighted
                  ? 'transform md:scale-105 shadow-2xl relative border-4 border-yellow-400'
                  : 'hover:bg-gray-50 transition'
              }`}>
                {tier.badge && (
                  <div className="absolute top-0 inset-x-0 -mt-3 flex justify-center">
                    <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">{tier.badge}</span>
                  </div>
                )}
                <h3 className={`text-xl font-bold ${nameColor} mb-2 ${isHighlighted ? 'whitespace-nowrap tracking-tight' : ''}`}>{tier.name[lang]}</h3>
                <div className={`${isHighlighted ? 'text-3xl md:text-4xl' : 'text-4xl'} font-bold text-gray-900 mb-2`}>{tier.price}<span className="text-lg font-normal text-gray-500">{tier.unit}</span></div>
                <p className="text-sm text-gray-500 mb-6">{tier.desc[lang]}</p>
                <button
                  onClick={() => { trackWhatsAppClick('pricing'); window.open(whatsAppLink, '_blank'); }}
                  className={btnClass}
                >
                  {isHighlighted ? currentText.pricing.book : currentText.pricing.inquire}
                </button>
                <ul className="space-y-3 text-sm">
                  {tier.features[lang].map((feature, j) => (
                    <li key={j} className="flex items-center gap-2"><Check size={16} className="text-green-500" /> {feature}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <p className="text-center text-sky-300 text-sm mt-8 opacity-75">{pricingData.disclaimer[lang]}</p>
      </div>
    </section>
  );
};

export default PricingSection;
