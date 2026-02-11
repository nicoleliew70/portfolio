import { useState } from 'react';
import translations from './data/translations';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsBar from './components/StatsBar';
import AboutSection from './components/AboutSection';
import ArcadeSection from './components/ArcadeSection';
import ClassesSection from './components/ClassesSection';
import PricingSection from './components/PricingSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

const WHATSAPP_NUMBER = "601133848412";
const whatsAppLink = `https://wa.me/${WHATSAPP_NUMBER}`;

const App = () => {
  const [lang, setLang] = useState('en');
  const currentText = translations[lang];

  return (
    <div className="font-sans text-gray-800 bg-sky-50 min-h-screen selection:bg-yellow-200">
      <Navbar lang={lang} setLang={setLang} currentText={currentText} whatsAppLink={whatsAppLink} />
      <HeroSection currentText={currentText} whatsAppLink={whatsAppLink} />
      <StatsBar currentText={currentText} />
      <AboutSection currentText={currentText} />
      <ArcadeSection currentText={currentText} lang={lang} whatsAppLink={whatsAppLink} />
      <ClassesSection />
      <PricingSection currentText={currentText} whatsAppLink={whatsAppLink} />
      <Testimonials />
      <Footer whatsAppLink={whatsAppLink} />
    </div>
  );
};

export default App;
