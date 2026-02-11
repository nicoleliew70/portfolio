import { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import { trackEvent } from '../utils/analytics';

const NICOLE_EMAIL = 'nicoleliew70@gmail.com';

const ContactSection = ({ currentText, whatsAppLink }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const { ref, isVisible } = useScrollReveal();

  const t = currentText.contact;

  const isValid = form.name.trim() && form.email.trim() && form.message.trim();

  const buildMessage = () =>
    `Hi Teacher Nicole!\n\nMy name is ${form.name.trim()}.\n\n${form.message.trim()}\n\nReply to: ${form.email.trim()}`;

  const handleEmail = () => {
    if (!isValid) return;
    const subject = encodeURIComponent(`Enquiry from ${form.name.trim()}`);
    const body = encodeURIComponent(buildMessage());
    window.open(`mailto:${NICOLE_EMAIL}?subject=${subject}&body=${body}`, '_self');
    trackEvent('contact_email', { method: 'mailto' });
    setSent(true);
  };

  const handleWhatsApp = () => {
    if (!isValid) return;
    const text = encodeURIComponent(buildMessage());
    window.open(`${whatsAppLink}?text=${text}`, '_blank');
    trackEvent('contact_whatsapp', { method: 'whatsapp' });
    setSent(true);
  };

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  if (sent) {
    return (
      <section id="contact" className="py-20 bg-sky-50">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl shadow-lg p-10">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send size={28} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.thankYou}</h3>
            <p className="text-gray-500 mb-6">{t.thankYouDesc}</p>
            <button
              onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
              className="text-sky-600 font-bold hover:text-sky-800"
            >
              {t.sendAnother}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-sky-50">
      <div ref={ref} className={`max-w-lg mx-auto px-4 scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{t.title}</h2>
          <p className="text-gray-500">{t.desc}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">{t.name}</label>
              <input
                type="text"
                value={form.name}
                onChange={handleChange('name')}
                className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-sky-500 focus:outline-none transition"
                placeholder={t.namePlaceholder}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">{t.email}</label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-sky-500 focus:outline-none transition"
                placeholder={t.emailPlaceholder}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">{t.message}</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={handleChange('message')}
                className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-sky-500 focus:outline-none transition resize-none"
                placeholder={t.messagePlaceholder}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={handleEmail}
              disabled={!isValid}
              className="flex-1 bg-sky-600 text-white font-bold py-3 rounded-lg hover:bg-sky-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Send size={18} /> {t.sendEmail}
            </button>
            <button
              onClick={handleWhatsApp}
              disabled={!isValid}
              className="flex-1 bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} /> {t.sendWhatsApp}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
