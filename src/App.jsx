import { useState, useEffect } from 'react';
import translations from './data/translations.json';
import settings from './data/settings.json';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsBar from './components/StatsBar';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/Services';
import ArcadeSection from './components/ArcadeSection';
import ClassesSection from './components/ClassesSection';
import PricingSection from './components/PricingSection';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const whatsAppLink = `https://wa.me/${settings.whatsappNumber}`;

const App = () => {
  const [lang, setLang] = useState('en');
  const currentText = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang === 'ms' ? 'ms' : 'en';
  }, [lang]);

  return (
    <div className="font-sans text-gray-800 bg-sky-50 min-h-screen selection:bg-yellow-200">
      <Navbar lang={lang} setLang={setLang} currentText={currentText} whatsAppLink={whatsAppLink} />
      <main>
        <HeroSection currentText={currentText} whatsAppLink={whatsAppLink} />
        <StatsBar lang={lang} />
        <AboutSection currentText={currentText} />
        <ServicesSection lang={lang} currentText={currentText} whatsAppLink={whatsAppLink} />
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
