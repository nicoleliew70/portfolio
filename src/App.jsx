import { useState, useEffect } from 'react';
import translations from './data/translations.json';
import settings from './data/settings.json';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsBar from './components/StatsBar';
import AboutSection from './components/AboutSection';
import ArcadeSection from './components/ArcadeSection';
import ClassesSection from './components/ClassesSection';
import PricingSection from './components/PricingSection';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ChinesePage from './pages/ChinesePage';
import { marketForPath, normalizeRoutePath, mandarinMarkets } from './data/mandarinMarkets';

const whatsAppLink = `https://wa.me/${settings.whatsappNumber}`;

const getRoutePath = () => {
  return normalizeRoutePath(window.location.pathname);
};

const App = () => {
  const market = marketForPath(getRoutePath());
  const [lang, setLang] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get('lang');
    return market && ['en', 'zh', 'ms'].includes(requested) ? requested : market ? 'zh' : 'en';
  });
  const currentText = translations[lang];
  const isChineseRoute = Boolean(market);

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang === 'ms' ? 'ms' : 'en';
  }, [lang]);

  if (isChineseRoute) {
    return (
      <ChinesePage
        market={market}
        lang={lang}
        setLang={setLang}
        currentText={currentText}
        whatsAppLink={`${whatsAppLink}?text=${encodeURIComponent(`Hello, I would like to enquire about Mandarin classes for ${mandarinMarkets[market].name} (${mandarinMarkets[market].currency}).`)}`}
      />
    );
  }

  return (
    <div className="font-sans text-gray-800 bg-sky-50 min-h-screen selection:bg-yellow-200">
      <Navbar lang={lang} setLang={setLang} currentText={currentText} whatsAppLink={whatsAppLink} />
      <main>
        <HeroSection currentText={currentText} whatsAppLink={whatsAppLink} />
        <StatsBar lang={lang} />
        <AboutSection currentText={currentText} />
        <ArcadeSection currentText={currentText} lang={lang} whatsAppLink={whatsAppLink} />
        <ClassesSection lang={lang} />
        <PricingSection currentText={currentText} lang={lang} whatsAppLink={whatsAppLink} />
        <Testimonials lang={lang} />
        <ContactSection currentText={currentText} whatsAppLink={whatsAppLink} />
      </main>
      <Footer currentText={currentText} lang={lang} whatsAppLink={whatsAppLink} />
    </div>
  );
};

export default App;
