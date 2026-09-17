import { useEffect, useState } from 'react';
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
import { mandarinMarkets } from './data/mandarinMarkets';
import { resolveRegionalMarket } from './data/regionPricing';
import { readSavedRegion, saveRegion, isSelectableRegion } from './data/regionPreference';
import { resolveLanguage } from './data/regionLanguages';

const whatsAppLink = `https://wa.me/${settings.whatsappNumber}`;
const availabilityCopy = {
  en: ['We’ll help you find the right local programme.', 'English tuition is available in Malaysia. Mandarin tuition is available in Singapore and Australia. Contact us for current availability and arrangements.', 'Retry detection', 'Ask on WhatsApp'],
  zh: ['我们可以帮助您找到合适的地区课程。', '英语课程在马来西亚提供；华语课程在新加坡和澳大利亚提供。欢迎联系我们了解安排。', '重新检测地区', '通过 WhatsApp 询问'],
  ms: ['Kami boleh membantu anda mencari program tempatan yang sesuai.', 'Kelas Bahasa Inggeris tersedia di Malaysia. Kelas Mandarin tersedia di Singapura dan Australia. Hubungi kami untuk mengetahui ketersediaan dan susunan semasa.', 'Cuba semula pengesanan', 'Tanya di WhatsApp'],
};

const regionalLabels = {
  en: 'Malaysia · English tuition',
  zh: '马来西亚 · 英语课程',
  ms: 'Malaysia · Kelas Bahasa Inggeris',
};

const Availability = ({ whatsApp, lang = 'en' }) => {
  const copy = availabilityCopy[lang] || availabilityCopy.en;

  return (
    <div className="min-h-screen bg-sky-50 text-gray-800 flex items-center justify-center px-6">
      <main className="max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl">
        <h1 className="text-3xl font-bold text-sky-700">Teacher Nicole Academy</h1>
        <p className="mt-4 text-lg">{copy[0]}</p>
        <p className="mt-3 text-gray-600">{copy[1]}</p>
        <button className="mt-5 mr-2 rounded-full border border-sky-500 px-5 py-3 font-bold text-sky-600" onClick={() => window.location.reload()}>{copy[2]}</button>
        <a className="mt-5 inline-flex rounded-full bg-sky-500 px-6 py-3 font-bold text-white" href={whatsApp} target="_blank" rel="noreferrer">{copy[3]}</a>
      </main>
    </div>
  );
};

const getCanonicalPath = (market) => {
  if (market === 'malaysia') return '/';
  if (market === 'singapore' || market === 'australia') return '/chinese';
  return null;
};

const getCanonicalHash = (market, hash) => {
  if (market === 'malaysia' && hash === '#mandarin-pricing') return '#pricing';
  if ((market === 'singapore' || market === 'australia') && hash === '#pricing') return '#mandarin-pricing';
  return hash;
};

const getMetadata = (market, lang) => {
  const metadata = {
    malaysia: {
      en: ['Teacher Nicole Academy | English Tuition in Malaysia', 'English tuition and fun, logical learning programmes with Teacher Nicole in Malaysia.'],
      zh: ['Teacher Nicole Academy | 马来西亚英语课程', 'Teacher Nicole Academy 在马来西亚提供有趣且有系统的英语课程。'],
      ms: ['Teacher Nicole Academy | Kelas Bahasa Inggeris di Malaysia', 'Program pembelajaran Bahasa Inggeris yang menyeronokkan dan tersusun bersama Teacher Nicole di Malaysia.'],
    },
    singapore: {
      en: ['Teacher Nicole Academy | Mandarin Tuition in Singapore', 'Mandarin tuition and learning programmes with Teacher Nicole in Singapore.'],
      zh: ['Teacher Nicole Academy | 新加坡华语课程', 'Teacher Nicole Academy 在新加坡提供华语课程。'],
      ms: ['Teacher Nicole Academy | Kelas Mandarin di Singapura', 'Kelas Mandarin bersama Teacher Nicole di Singapura.'],
    },
    australia: {
      en: ['Teacher Nicole Academy | Mandarin Tuition in Australia', 'Mandarin tuition and learning programmes with Teacher Nicole in Australia.'],
      zh: ['Teacher Nicole Academy | 澳大利亚华语课程', 'Teacher Nicole Academy 在澳大利亚提供华语课程。'],
      ms: ['Teacher Nicole Academy | Kelas Mandarin di Australia', 'Kelas Mandarin bersama Teacher Nicole di Australia.'],
    },
    international: {
      en: ['Teacher Nicole Academy | Tuition programmes', 'Explore Teacher Nicole Academy tuition programmes and current availability.'],
      zh: ['Teacher Nicole Academy | 课程项目', '了解 Teacher Nicole Academy 的课程项目和最新安排。'],
      ms: ['Teacher Nicole Academy | Program tuisyen', 'Terokai program tuisyen dan ketersediaan semasa Teacher Nicole Academy.'],
    },
  };

  return metadata[market]?.[lang] || metadata[market]?.en || metadata.international.en;
};

const updateCanonicalUrl = (market) => {
  const canonicalPath = getCanonicalPath(market);
  if (!canonicalPath) return;

  const currentUrl = new URL(window.location.href);
  const canonicalHash = getCanonicalHash(market, currentUrl.hash);
  if (currentUrl.pathname === canonicalPath && currentUrl.hash === canonicalHash) return;

  currentUrl.pathname = canonicalPath;
  currentUrl.hash = canonicalHash;
  window.history.replaceState({}, '', `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`);
};

const updateMetadata = (market, lang) => {
  const [title, description] = getMetadata(market, lang);
  document.title = title;
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) descriptionMeta.setAttribute('content', description);
};

export const Storefront = ({ market, lang, setLang, onMarketChange }) => {
  const isMandarin = market === 'singapore' || market === 'australia';
  const text = translations[lang];
  const serviceWhatsApp = `${whatsAppLink}?text=${encodeURIComponent(isMandarin ? `Hello, I would like to enquire about Mandarin classes for ${mandarinMarkets[market].name} (${mandarinMarkets[market].currency}).` : 'Hello, I would like to enquire about English tuition in Malaysia.')}`;

  useEffect(() => {
    if (window.location.hash) requestAnimationFrame(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView());
  }, [market]);

  if (market !== 'malaysia' && !isMandarin) return <Availability whatsApp={whatsAppLink} lang={lang} />;
  if (isMandarin) return <ChinesePage market={market} lang={lang} setLang={setLang} currentText={text} whatsAppLink={serviceWhatsApp} onMarketChange={onMarketChange} />;

  const regionLabel = regionalLabels[lang] || regionalLabels.en;
  return (
    <div className="font-sans text-gray-800 bg-sky-50 min-h-screen selection:bg-yellow-200">
      <Navbar lang={lang} setLang={setLang} currentText={text} whatsAppLink={serviceWhatsApp} market={market} onMarketChange={onMarketChange} />
      <div className="bg-sky-100 py-2 text-center text-sm font-bold text-sky-800">{regionLabel}</div>
      <main>
        <HeroSection currentText={text} whatsAppLink={serviceWhatsApp} />
        <StatsBar lang={lang} />
        <AboutSection currentText={text} />
        <ArcadeSection currentText={text} lang={lang} whatsAppLink={serviceWhatsApp} />
        <ClassesSection lang={lang} />
        <PricingSection currentText={text} lang={lang} whatsAppLink={serviceWhatsApp} market={market} />
        <Testimonials lang={lang} />
        <ContactSection currentText={text} whatsAppLink={serviceWhatsApp} />
      </main>
      <Footer currentText={text} lang={lang} whatsAppLink={serviceWhatsApp} />
    </div>
  );
};

const App = () => {
  const [market, setMarket] = useState(null);
  const [lang, setLang] = useState('en');

  const applyMarket = (nextMarket, { persist = false } = {}) => {
    if (!isSelectableRegion(nextMarket)) return;
    const nextLang = resolveLanguage(nextMarket, lang);
    if (persist) saveRegion(nextMarket);
    setLang(nextLang);
    setMarket(nextMarket);
    updateCanonicalUrl(nextMarket);
    updateMetadata(nextMarket, nextLang);
  };

  useEffect(() => {
    let active = true;
    const savedRegion = readSavedRegion();
    const detectedMarket = import.meta.env.DEV
      ? resolveRegionalMarket()
      : savedRegion ? Promise.resolve(savedRegion) : resolveRegionalMarket();
    detectedMarket.then((resolved) => {
      if (!active) return;
      const requested = new URLSearchParams(window.location.search).get('lang');
      const resolvedLang = resolveLanguage(resolved, requested);
      setLang(resolvedLang);
      setMarket(resolved);
      updateCanonicalUrl(resolved);
      updateMetadata(resolved, resolvedLang);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!lang) return;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang === 'ms' ? 'ms' : 'en';
    if (market) updateMetadata(market, lang);
  }, [lang, market]);

  if (!market) {
    return (
      <div className="min-h-screen bg-sky-50 text-sky-700 flex items-center justify-center" role="status" aria-label="Loading regional programme">
        <p className="rounded-full bg-white px-6 py-3 font-bold shadow">Teacher Nicole Academy · Loading your regional programme…</p>
      </div>
    );
  }
  return <Storefront market={market} lang={lang} setLang={setLang} onMarketChange={(nextMarket) => applyMarket(nextMarket, { persist: true })} />;
};

export default App;
