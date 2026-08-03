import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ChinesePage.css';

const navigationItems = [
  { href: '#mandarin-programmes', label: 'Programmes' },
  { href: '#mandarin-process', label: 'How It Works' },
  { href: '#mandarin-pricing', label: 'Pricing' },
  { href: '#mandarin-faq', label: 'FAQ' },
];

const footerNavigationItems = [
  { href: '#mandarin-programmes', label: 'Programmes' },
  { href: '#mandarin-process', label: 'How It Works' },
  { href: '#mandarin-pricing', label: 'Pricing' },
  { href: '#mandarin-faq', label: 'FAQ' },
];

const shellSections = [
  ['mandarin-programmes', 'Mandarin programmes'],
  ['mandarin-approach', 'Mandarin teaching approach'],
  ['mandarin-playground', 'Mandarin playground'],
  ['mandarin-process', 'Mandarin learning process'],
  ['mandarin-pricing', 'Mandarin tuition pricing'],
  ['mandarin-faq', 'Mandarin tuition frequently asked questions'],
  ['mandarin-contact', 'Mandarin tuition contact'],
];

const ChinesePage = ({ lang, setLang, currentText, whatsAppLink }) => {
  return (
    <div className="mandarin-page min-h-screen selection:bg-yellow-200" data-site-language={lang} data-service="chinese">
      <Navbar
        lang={lang}
        setLang={setLang}
        currentText={currentText}
        whatsAppLink={whatsAppLink}
        navigationItems={navigationItems}
      />

      <main>
        <section id="mandarin-hero" className="mandarin-shell-section mandarin-hero" aria-labelledby="mandarin-page-title">
          <div className="mandarin-shell-inner">
            <h1 id="mandarin-page-title">Online Mandarin Tuition</h1>
          </div>
        </section>

        {shellSections.map(([id, label]) => (
          <section key={id} id={id} className="mandarin-shell-section" aria-label={label} />
        ))}
      </main>

      <Footer
        currentText={currentText}
        lang={lang}
        whatsAppLink={whatsAppLink}
        navigationItems={footerNavigationItems}
      />
    </div>
  );
};

export default ChinesePage;
