import { useState } from 'react';
import { Star } from 'lucide-react';
import testimonials from '../data/testimonials';

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section className="py-20 bg-yellow-50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Star size={40} className="text-yellow-400 mx-auto mb-6 fill-current" />
        <h2 className="text-3xl font-bold mb-12">Student Success Stories</h2>

        <div className="relative h-48">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 flex flex-col items-center justify-center ${i === activeTestimonial ? 'opacity-100' : 'opacity-0'}`}
            >
              <p className="text-xl md:text-2xl font-light italic text-gray-700 mb-6">&ldquo;{item.text}&rdquo;</p>
              <div>
                <div className="font-bold text-gray-900">{item.author}</div>
                <div className="text-sm text-gray-500">{item.grade}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveTestimonial(i)}
              className={`w-3 h-3 rounded-full transition ${i === activeTestimonial ? 'bg-yellow-400' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
