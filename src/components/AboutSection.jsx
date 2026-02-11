import { useState } from 'react';
import { GraduationCap, Smile, Check, Coffee } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const AboutSection = ({ currentText }) => {
  const [imageError, setImageError] = useState(false);
  const profileImageSrc = import.meta.env.BASE_URL + "images/teacher-nicole.jpg";
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="py-20 bg-white">
      <div ref={ref} className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 relative">
            <div className="absolute inset-0 bg-yellow-200 rounded-3xl transform rotate-3"></div>
            <div className="relative bg-sky-100 rounded-3xl p-8 overflow-hidden">
              <div className="aspect-[4/3] bg-white rounded-2xl mb-6 border-4 border-white shadow-inner overflow-hidden relative">
                {!imageError ? (
                  <img
                    src={profileImageSrc}
                    alt="Teacher Nicole"
                    className="w-full h-full object-cover object-top"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-sky-50">
                    <div className="text-center p-4">
                      <Smile size={64} className="text-sky-400 mx-auto mb-2" />
                      <p className="text-gray-500 font-bold">Teacher Nicole</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4 justify-center">
                <div className="bg-white p-3 rounded-xl shadow-sm text-center transform hover:scale-105 transition">
                  <Coffee size={24} className="text-yellow-500 mx-auto mb-1" />
                  <span className="text-xs font-bold text-gray-600">Pastry Chef</span>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-sm text-center transform hover:scale-105 transition">
                  <GraduationCap size={24} className="text-sky-500 mx-auto mb-1" />
                  <span className="text-xs font-bold text-gray-600">Educator</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{currentText.about.title}</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {currentText.about.p1}
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              <strong className="text-sky-600">{currentText.about.funFact}</strong> {currentText.about.funFactText}
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-1 rounded text-green-600 mt-1"><Check size={16} /></div>
                <p className="text-gray-700"><strong>Specialty:</strong> {currentText.about.specialty}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 p-1 rounded text-purple-600 mt-1"><Check size={16} /></div>
                <p className="text-gray-700"><strong>Focus:</strong> {currentText.about.focus}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
