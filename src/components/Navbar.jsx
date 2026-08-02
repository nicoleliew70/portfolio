import { useState } from 'react';
import { BookOpen, MessageCircle, Menu, X, Globe, Gamepad2 } from 'lucide-react';
import { trackLanguageSwitch, trackWhatsAppClick } from '../utils/analytics';
import ServiceLinks from './ServiceLinks';

const focusRingClasses = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2';

const Navbar = ({ lang, setLang, currentText, whatsAppLink, navigationItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLangChange = (code) => {
    setLang(code);
    trackLanguageSwitch(code);
  };

  const defaultNavigationItems = [
    { href: '#about', label: currentText.nav.about },
    { href: '#classes', label: currentText.nav.classes },
    { href: '#arcade', label: currentText.nav.arcade, icon: Gamepad2 },
    { href: '#pricing', label: currentText.nav.pricing },
    { href: '#contact', label: currentText.nav.contact },
  ];
  const links = navigationItems || defaultNavigationItems;

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
          <div className="hidden xl:flex gap-1 items-center">
            {links.map((item) => {
              const Icon = item.icon;
              return (
                <a key={item.href} href={item.href} className={`text-gray-600 hover:text-sky-600 font-medium transition flex items-center gap-1 whitespace-nowrap ${focusRingClasses}`}>
                  {Icon && <Icon size={16} />}
                  {item.label}
                </a>
              );
            })}

            <ServiceLinks />

            {/* Lang Switcher */}
            <div className="flex bg-gray-100 rounded-full p-1 shrink-0">
              {[{ code: 'en', label: 'EN' }, { code: 'zh', label: '中' }, { code: 'ms', label: 'BM' }].map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => handleLangChange(code)}
                  aria-label={`Website language: ${label}`}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition ${focusRingClasses} ${lang === code ? 'bg-white shadow text-sky-600' : 'text-gray-400 hover:text-gray-600'}`}
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
              className={`bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-full font-bold transition shadow-md flex items-center gap-2 transform hover:scale-105 whitespace-nowrap ${focusRingClasses}`}
            >
              <MessageCircle size={18} />
              {currentText.nav.book}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center gap-4">
            <button
              onClick={() => handleLangChange(lang === 'en' ? 'zh' : lang === 'zh' ? 'ms' : 'en')}
              aria-label="Change website language"
              className={`font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded text-sm ${focusRingClasses}`}
            >
              {{ en: 'EN', zh: '中', ms: 'BM' }[lang]} <Globe size={14} className="inline ml-1" />
            </button>
            <button
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className={`text-gray-600 hover:text-sky-600 ${focusRingClasses}`}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <ServiceLinks mobile />
            {links.map((item) => (
              <a key={item.href} href={item.href} onClick={toggleMenu} className={`block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-sky-50 hover:text-sky-600 ${focusRingClasses}`}>{item.label}</a>
            ))}
            <a href={whatsAppLink} onClick={() => trackWhatsAppClick('mobile_menu')} className={`block px-3 py-3 rounded-md text-base font-bold text-sky-600 bg-sky-50 mt-4 ${focusRingClasses}`}>{currentText.nav.book}</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
