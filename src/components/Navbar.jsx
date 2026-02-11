import { useState } from 'react';
import { BookOpen, MessageCircle, Menu, X, Globe, Gamepad2 } from 'lucide-react';
import { trackLanguageSwitch, trackWhatsAppClick } from '../utils/analytics';

const Navbar = ({ lang, setLang, currentText, whatsAppLink }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLangChange = (code) => {
    setLang(code);
    trackLanguageSwitch(code);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-2">
            <div className="bg-yellow-400 p-2 rounded-full text-white">
              <BookOpen size={24} />
            </div>
            <span className="text-xl md:text-2xl font-bold text-sky-600 tracking-tight whitespace-nowrap">Teacher Nicole</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6 items-center">
            <a href="#about" className="text-gray-600 hover:text-sky-600 font-medium transition whitespace-nowrap">{currentText.nav.about}</a>
            <a href="#classes" className="text-gray-600 hover:text-sky-600 font-medium transition whitespace-nowrap">{currentText.nav.classes}</a>
            <a href="#arcade" className="text-gray-600 hover:text-sky-600 font-medium transition flex items-center gap-1 whitespace-nowrap"><Gamepad2 size={16} /> {currentText.nav.arcade}</a>
            <a href="#pricing" className="text-gray-600 hover:text-sky-600 font-medium transition whitespace-nowrap">{currentText.nav.pricing}</a>
            <a href="#contact" className="text-gray-600 hover:text-sky-600 font-medium transition whitespace-nowrap">{currentText.nav.contact}</a>

            {/* Lang Switcher */}
            <div className="flex bg-gray-100 rounded-full p-1 shrink-0">
              {[{ code: 'en', label: 'EN' }, { code: 'zh', label: '中' }, { code: 'ms', label: 'BM' }].map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => handleLangChange(code)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition ${lang === code ? 'bg-white shadow text-sky-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <a
              href={whatsAppLink}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackWhatsAppClick('navbar')}
              className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-full font-bold transition shadow-md flex items-center gap-2 transform hover:scale-105 whitespace-nowrap"
            >
              <MessageCircle size={18} />
              {currentText.nav.book}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <button onClick={() => handleLangChange(lang === 'en' ? 'zh' : lang === 'zh' ? 'ms' : 'en')} className="font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded text-sm">
              {{ en: 'EN', zh: '中', ms: 'BM' }[lang]} <Globe size={14} className="inline ml-1" />
            </button>
            <button onClick={toggleMenu} className="text-gray-600 hover:text-sky-600 focus:outline-none">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <a href="#about" onClick={toggleMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-sky-50 hover:text-sky-600">{currentText.nav.about}</a>
            <a href="#classes" onClick={toggleMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-sky-50 hover:text-sky-600">{currentText.nav.classes}</a>
            <a href="#arcade" onClick={toggleMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-sky-50 hover:text-sky-600">{currentText.nav.arcade}</a>
            <a href="#pricing" onClick={toggleMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-sky-50 hover:text-sky-600">{currentText.nav.pricing}</a>
            <a href="#contact" onClick={toggleMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-sky-50 hover:text-sky-600">{currentText.nav.contact}</a>
            <a href={whatsAppLink} onClick={() => trackWhatsAppClick('mobile_menu')} className="block px-3 py-3 rounded-md text-base font-bold text-sky-600 bg-sky-50 mt-4">{currentText.nav.book}</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
