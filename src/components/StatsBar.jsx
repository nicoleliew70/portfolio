const StatsBar = ({ currentText }) => {
  return (
    <div className="bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-4">
            <div className="text-3xl font-bold text-sky-600 mb-1">7+ Years</div>
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
            <div className="text-3xl font-bold text-sky-600 mb-1">100+</div>
            <div className="text-sm text-gray-500 font-medium">{currentText.stats.students}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
