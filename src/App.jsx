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

const whatsAppLink = `https://wa.me/${settings.whatsappNumber}`;

const getRoutePath = () => {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  return path === '/chinese/index.html' ? '/chinese' : path;
};

const App = () => {
  const [lang, setLang] = useState(() => (getRoutePath() === '/chinese' ? 'zh' : 'en'));
  const currentText = translations[lang];
  const isChineseRoute = getRoutePath() === '/chinese';

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang === 'ms' ? 'ms' : 'en';
  }, [lang]);

  if (isChineseRoute) {
    return (
      <ChinesePage
        lang={lang}
        setLang={setLang}
        currentText={currentText}
        whatsAppLink={whatsAppLink}
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
