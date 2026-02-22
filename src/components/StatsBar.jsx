import useScrollReveal from '../hooks/useScrollReveal';
import useCountUp from '../hooks/useCountUp';
import statsData from '../data/stats.json';

const StatsBar = ({ lang }) => {
  const { ref, isVisible } = useScrollReveal(0.3);
  const items = statsData.items;
  const yearsCount = useCountUp(items[0].value, 1500, isVisible);
  const studentsCount = useCountUp(items[3].value, 1500, isVisible);

  const getDisplay = (item, index) => {
    if (index === 0) return `${yearsCount}${item.suffix}`;
    if (index === 3) return `${studentsCount}${item.suffix}`;
    return `${item.value}${item.suffix}`;
  };

  return (
    <div ref={ref} className={`bg-white border-y border-gray-100 scroll-reveal ${isVisible ? 'visible' : ''}`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {items.map((item, i) => (
            <div key={i} className="p-4">
              <div className="text-3xl font-bold text-sky-600 mb-1">{getDisplay(item, i)}</div>
              <div className="text-sm text-gray-500 font-medium">{item.label[lang]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
