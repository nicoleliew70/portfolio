import { MessageCircle } from 'lucide-react';

const HeroSection = ({ currentText, whatsAppLink }) => {
  return (
    <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-sm font-bold mb-6 animate-bounce">
            {currentText.hero.badge}
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            {currentText.hero.title} <span className="text-sky-500">{currentText.hero.titleHighlight}</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            {currentText.hero.desc}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={whatsAppLink}
              className="bg-sky-500 hover:bg-sky-600 text-white text-lg px-8 py-4 rounded-full font-bold transition shadow-lg flex items-center justify-center gap-2"
            >
              <MessageCircle />
              {currentText.hero.cta}
            </a>
            <a
              href="#classes"
              className="bg-white hover:bg-gray-50 text-sky-600 border-2 border-sky-100 text-lg px-8 py-4 rounded-full font-bold transition shadow-sm flex items-center justify-center"
            >
              {currentText.hero.view}
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 -ml-20 -mt-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
    </section>
  );
};

export default HeroSection;
