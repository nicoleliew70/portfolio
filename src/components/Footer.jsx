import { BookOpen, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { trackWhatsAppClick } from '../utils/analytics';
import settings from '../data/settings.json';

const Footer = ({ currentText, lang, whatsAppLink }) => {
  const ft = currentText.footer;

  return (
    <>
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
                <BookOpen className="text-sky-500" /> {settings.brandName}
              </div>
              <p className="text-sm">{settings.tagline}</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">{ft.contact}</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><Phone size={16} /> {settings.phone}</li>
                <li className="flex items-center gap-2"><Mail size={16} /> {settings.email}</li>
                <li className="flex items-center gap-2"><MapPin size={16} /> {settings.location}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">{ft.quickLinks}</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-sky-400">{currentText.nav.about}</a></li>
                <li><a href="#classes" className="hover:text-sky-400">{currentText.nav.classes}</a></li>
                <li><a href="#pricing" className="hover:text-sky-400">{currentText.nav.pricing}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs">
            &copy; {new Date().getFullYear()} {settings.copyrightName}. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsAppLink}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackWhatsAppClick('floating_button')}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl z-50 transition transform hover:scale-110 flex items-center justify-center"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle size={32} />
      </a>
    </>
  );
};

export default Footer;
