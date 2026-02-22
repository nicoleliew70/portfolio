import { Smile, PenTool, Brain } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import classesData from '../data/classes.json';

const iconMap = { smile: Smile, penTool: PenTool, brain: Brain };
const cmsImage = (path) => path ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}` : '';

const colorMap = {
  yellow: { border: 'border-yellow-400', bg: 'bg-yellow-100', text: 'text-yellow-600', dot: 'bg-yellow-400' },
  sky: { border: 'border-sky-500', bg: 'bg-sky-100', text: 'text-sky-600', dot: 'bg-sky-500' },
  purple: { border: 'border-purple-400', bg: 'bg-purple-100', text: 'text-purple-600', dot: 'bg-purple-400' },
};

const ClassesSection = ({ lang }) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="classes" className="py-20 bg-sky-50 relative">
      <div ref={ref} className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{classesData.sectionTitle[lang]}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{classesData.sectionSubtitle[lang]}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {classesData.items.map((item, i) => {
            const Icon = iconMap[item.icon];
            const colors = colorMap[item.color];
            const hasPopularBadge = !!item.badge;

            return (
              <div key={i} className={`bg-white rounded-2xl p-8 border-b-8 ${colors.border} ${
                hasPopularBadge ? 'shadow-xl transform md:scale-110 z-10 relative' : 'shadow-lg hover:-translate-y-2 transition duration-300'
              }`}>
                {item.badge && (
                  <div className="absolute top-0 right-0 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">{item.badge}</div>
                )}
                {item.image ? (
                  <div className="w-20 h-20 rounded-2xl mb-6 mx-auto overflow-hidden">
                    <img src={cmsImage(item.image)} alt={item.title[lang]} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center ${colors.text} mb-6 mx-auto`}>
                    <Icon size={32} />
                  </div>
                )}
                <h3 className="text-xl font-bold text-center mb-4">{item.title[lang]}</h3>
                <p className="text-gray-500 text-center text-sm mb-6 uppercase tracking-wider font-bold">{item.level[lang]}</p>
                <ul className="space-y-3 mb-8">
                  {item.features[lang].map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-600">
                      <div className={`w-2 h-2 ${colors.dot} rounded-full`}></div>{feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ClassesSection;
