import { useState } from 'react';
import { BookOpen, MessageCircle, Menu, X, Globe, Gamepad2 } from 'lucide-react';
import { trackLanguageSwitch, trackWhatsAppClick } from '../utils/analytics';
import ServiceLinks from './ServiceLinks';

const focusRingClasses = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2';
const languageOptions = [
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中' },
  { code: 'ms', label: 'BM' },
];

const LanguageSelector = ({ lang, onChange, mobile = false }) => (
  <div
    role="group"
    aria-label="Website language"
    title="Website language"
    className={mobile
      ? 'rounded-2xl border border-gray-200 bg-gray-50 p-3'
      : 'flex shrink-0 items-center gap-1 rounded-full border border-gray-200 bg-gray-50 p-1.5'}
  >
    <div className={mobile ? 'mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-500' : 'sr-only'}>
      <Globe size={14} aria-hidden="true" />
      <span>Website language</span>
    </div>
    {!mobile && <Globe size={14} className="ml-1 text-gray-400" aria-hidden="true" />}
    <div className={mobile ? 'grid grid-cols-3 gap-1' : 'flex items-center'}>
      {languageOptions.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => onChange(code)}
          aria-label={`Set website language to ${label}`}
          aria-pressed={lang === code}
          className={`${mobile ? 'min-h-10 px-3 py-2 text-sm' : 'px-2.5 py-1 text-xs'} rounded-full font-bold transition ${focusRingClasses} ${lang === code
            ? 'bg-white text-sky-600 shadow-sm'
            : 'text-gray-400 hover:bg-white/80 hover:text-gray-600'}`}
        >
          {label}
        </button>
      ))}
    </div>
  </div>
);

const Navbar = ({ lang, setLang, currentText, whatsAppLink, navigationItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((open) => !open);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLangChange = (code) => {
    setLang(code);
    trackLanguageSwitch(code);
  };

  const cycleLanguage = () => {
    const currentIndex = languageOptions.findIndex(({ code }) => code === lang);
    const nextLanguage = languageOptions[(currentIndex + 1) % languageOptions.length];
    handleLangChange(nextLanguage.code);
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
    <nav className="sticky top-0 z-50 bg-white shadow-sm" aria-label="Primary navigation">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-20 items-center justify-between gap-4">
          <div className="flex shrink-0 items-center gap-2">
            <div className="bg-yellow-400 p-2 rounded-full text-white">
              <BookOpen size={24} />
            </div>
            <span className="text-xl md:text-2xl font-bold text-sky-600 tracking-tight whitespace-nowrap">Teacher Nicole</span>
          </div>

          {/* Desktop navigation groups */}
          <div className="hidden min-w-0 flex-1 items-center justify-end gap-4 xl:flex">
            <div className="flex shrink-0 items-center gap-4 border-r border-gray-200 pr-4">
              {links.map((item) => {
                const Icon = item.icon;
                return (
                  <a key={item.href} href={item.href} className={`flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-gray-600 transition hover:text-sky-600 ${focusRingClasses}`}>
                    {Icon && <Icon size={16} />}
                    {item.label}
                  </a>
                );
              })}
            </div>

            <ServiceLinks />
            <LanguageSelector lang={lang} onChange={handleLangChange} />
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackWhatsAppClick('navbar')}
              className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-sky-500 px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:scale-105 hover:bg-sky-600 ${focusRingClasses}`}
            >
              <MessageCircle size={18} />
              {currentText.nav.book}
            </a>
          </div>

          {/* Mobile/tablet controls */}
          <div className="flex items-center gap-3 xl:hidden">
            <button
              type="button"
              onClick={cycleLanguage}
              aria-label={`Website language: ${languageOptions.find(({ code }) => code === lang)?.label}. Open the menu for all languages.`}
              title="Website language"
              className={`flex items-center gap-1 rounded-lg bg-sky-50 px-2.5 py-1.5 text-sm font-bold text-sky-600 ${focusRingClasses}`}
            >
              {languageOptions.find(({ code }) => code === lang)?.label} <Globe size={14} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className={`text-gray-600 hover:text-sky-600 ${focusRingClasses}`}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/tablet menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white shadow-lg xl:hidden">
          <div className="mx-auto grid max-w-7xl gap-3 px-4 pt-4 pb-6 sm:px-6 lg:px-8">
            <ServiceLinks mobile onNavigate={closeMenu} />
            <LanguageSelector mobile lang={lang} onChange={handleLangChange} />
            <div className="grid gap-1">
              {links.map((item) => (
                <a key={item.href} href={item.href} onClick={closeMenu} className={`block rounded-xl px-3 py-3 text-base font-semibold text-gray-700 transition hover:bg-sky-50 hover:text-sky-600 ${focusRingClasses}`}>{item.label}</a>
              ))}
            </div>
            <a href={whatsAppLink} onClick={() => { closeMenu(); trackWhatsAppClick('mobile_menu'); }} className={`mt-1 flex min-h-12 items-center justify-center rounded-xl bg-sky-500 px-4 py-3 text-base font-bold text-white shadow-md transition hover:bg-sky-600 ${focusRingClasses}`}>{currentText.nav.book}</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
