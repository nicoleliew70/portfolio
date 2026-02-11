import { Smile, PenTool, Brain } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const ClassesSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="classes" className="py-20 bg-sky-50 relative">
      <div ref={ref} className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Learning Path</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Whether you are preparing for a big exam or just want to speak confidently, I have a class for you.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Primary */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-b-8 border-yellow-400 hover:-translate-y-2 transition duration-300">
            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600 mb-6 mx-auto">
              <Smile size={32} />
            </div>
            <h3 className="text-xl font-bold text-center mb-4">Junior Explorers</h3>
            <p className="text-gray-500 text-center text-sm mb-6 uppercase tracking-wider font-bold">Primary School (Std 1-6)</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 bg-yellow-400 rounded-full"></div>Interactive Storytelling</li>
              <li className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 bg-yellow-400 rounded-full"></div>Vocabulary Building</li>
              <li className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 bg-yellow-400 rounded-full"></div>Basic Grammar Fun</li>
              <li className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 bg-yellow-400 rounded-full"></div>Reading Comprehension</li>
            </ul>
          </div>

          {/* Secondary */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-b-8 border-sky-500 transform md:scale-110 z-10 relative">
            <div className="absolute top-0 right-0 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
            <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600 mb-6 mx-auto">
              <PenTool size={32} />
            </div>
            <h3 className="text-xl font-bold text-center mb-4">Exam Warriors</h3>
            <p className="text-gray-500 text-center text-sm mb-6 uppercase tracking-wider font-bold">Secondary (Form 1-5 / IGCSE)</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 bg-sky-500 rounded-full"></div>SPM & IGCSE Prep</li>
              <li className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 bg-sky-500 rounded-full"></div>Essay Writing Structures</li>
              <li className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 bg-sky-500 rounded-full"></div>Literature Components</li>
              <li className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 bg-sky-500 rounded-full"></div>Advanced Grammar Logic</li>
            </ul>
          </div>

          {/* Adults */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-b-8 border-purple-400 hover:-translate-y-2 transition duration-300">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 mx-auto">
              <Brain size={32} />
            </div>
            <h3 className="text-xl font-bold text-center mb-4">Global Speakers</h3>
            <p className="text-gray-500 text-center text-sm mb-6 uppercase tracking-wider font-bold">Adults & University</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 bg-purple-400 rounded-full"></div>IELTS / PTE / MUET</li>
              <li className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 bg-purple-400 rounded-full"></div>Business Communication</li>
              <li className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 bg-purple-400 rounded-full"></div>Conversation Skills</li>
              <li className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 bg-purple-400 rounded-full"></div>Resume & Interview Prep</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassesSection;
