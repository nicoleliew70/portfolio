import { ArrowRight } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import servicesData from '../data/services.json';

const ServicesSection = ({ lang, currentText, whatsAppLink }) => {
    const { ref, isVisible } = useScrollReveal();
    const ft = currentText.footer;

    return (
        <section id="services" className="py-20 bg-sky-50">
            <div ref={ref} className={`max-w-6xl mx-auto px-4 scroll-reveal ${isVisible ? 'visible' : ''}`}>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                    {servicesData.sectionTitle[lang]}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {servicesData.items.map((service, index) => (
                        <div key={index} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border-2 border-transparent hover:border-sky-200 group">
                            <div className="mb-4">
                                <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${service.open ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {service.open ? ft.slotsAvailable : ft.currentlyFull}
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.name[lang]}</h3>
                            {service.description && (
                                <p className="text-gray-500 text-sm mb-4">{service.description[lang]}</p>
                            )}
                            <p className="text-3xl font-bold text-sky-600 mb-6">RM {service.price}</p>

                            <button
                                onClick={() => window.open(whatsAppLink, '_blank')}
                                className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-2xl transition-colors"
                            >
                                {ft.enquireNow} <ArrowRight size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
