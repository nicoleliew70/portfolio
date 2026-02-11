import { Check } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const PricingSection = ({ currentText, whatsAppLink }) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="pricing" className="py-20 bg-sky-900 text-white">
      <div ref={ref} className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{currentText.pricing.title}</h2>
          <p className="text-sky-200 text-lg">Invest in your future with affordable rates.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-gray-800">
          {/* Group Class */}
          <div className="bg-white rounded-2xl p-8 hover:bg-gray-50 transition">
            <h3 className="text-xl font-bold text-gray-500 mb-2">{currentText.pricing.group}</h3>
            <div className="text-4xl font-bold text-gray-900 mb-2">RM 120<span className="text-lg font-normal text-gray-500">/mo</span></div>
            <p className="text-sm text-gray-500 mb-6">{currentText.pricing.groupDesc}</p>
            <button onClick={() => window.open(whatsAppLink, '_blank')} className="w-full border-2 border-sky-600 text-sky-600 font-bold py-3 rounded-lg hover:bg-sky-50 transition mb-6">{currentText.pricing.inquire}</button>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Max 5 students</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> 4 Classes per month</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> 1.5 Hours per class</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Group activities</li>
            </ul>
          </div>

          {/* 1-on-1 Standard */}
          <div className="bg-white rounded-2xl p-8 transform md:scale-105 shadow-2xl relative border-4 border-yellow-400">
            <div className="absolute top-0 inset-x-0 -mt-3 flex justify-center">
              <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Most Recommended</span>
            </div>
            <h3 className="text-xl font-bold text-sky-600 mb-2 whitespace-nowrap tracking-tight">{currentText.pricing.personal}</h3>
            <div className="text-4xl font-bold text-gray-900 mb-2">RM 50<span className="text-lg font-normal text-gray-500">/hr</span></div>
            <p className="text-sm text-gray-500 mb-6">{currentText.pricing.personalDesc}</p>
            <button onClick={() => window.open(whatsAppLink, '_blank')} className="w-full bg-sky-600 text-white font-bold py-3 rounded-lg hover:bg-sky-700 transition mb-6">{currentText.pricing.book}</button>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> 100% Personal attention</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Flexible scheduling</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Customized materials</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Detailed progress reports</li>
            </ul>
          </div>

          {/* Intensive */}
          <div className="bg-white rounded-2xl p-8 hover:bg-gray-50 transition">
            <h3 className="text-xl font-bold text-purple-500 mb-2">{currentText.pricing.crash}</h3>
            <div className="text-4xl font-bold text-gray-900 mb-2">RM 600<span className="text-lg font-normal text-gray-500">/pack</span></div>
            <p className="text-sm text-gray-500 mb-6">{currentText.pricing.crashDesc}</p>
            <button onClick={() => window.open(whatsAppLink, '_blank')} className="w-full border-2 border-purple-500 text-purple-600 font-bold py-3 rounded-lg hover:bg-purple-50 transition mb-6">{currentText.pricing.inquire}</button>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> 100% Personal attention</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> 10 Hours Intensive</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Past Year Paper Drills</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Answering Techniques</li>
            </ul>
          </div>
        </div>
        <p className="text-center text-sky-300 text-sm mt-8 opacity-75">* Prices are estimates and subject to discussion based on level and location.</p>
      </div>
    </section>
  );
};

export default PricingSection;
