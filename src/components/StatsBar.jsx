import useScrollReveal from '../hooks/useScrollReveal';
import useCountUp from '../hooks/useCountUp';

const StatsBar = ({ currentText }) => {
  const { ref, isVisible } = useScrollReveal(0.3);
  const yearsCount = useCountUp(7, 1500, isVisible);
  const studentsCount = useCountUp(100, 1500, isVisible);

  return (
    <div ref={ref} className={`bg-white border-y border-gray-100 scroll-reveal ${isVisible ? 'visible' : ''}`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-4">
            <div className="text-3xl font-bold text-sky-600 mb-1">{yearsCount}+ Years</div>
            <div className="text-sm text-gray-500 font-medium">{currentText.stats.exp}</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-sky-600 mb-1">A+</div>
            <div className="text-sm text-gray-500 font-medium">{currentText.stats.spm}</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-sky-600 mb-1">CELT</div>
            <div className="text-sm text-gray-500 font-medium">{currentText.stats.cert}</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-sky-600 mb-1">{studentsCount}+</div>
            <div className="text-sm text-gray-500 font-medium">{currentText.stats.students}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
