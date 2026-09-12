import { ArrowRight } from 'lucide-react';

const labels = {
  en: { title: 'Mandarin lesson fees', hourly: 'Single class · per hour', package: '10-hour package', format: '1-to-1 lesson', enquiry: 'Ask about lessons' },
  zh: { title: '华语课程收费', hourly: '单堂课 · 每小时', package: '10小时配套', format: '一对一课程', enquiry: '咨询课程' },
  ms: { title: 'Yuran kelas Mandarin', hourly: 'Kelas tunggal · sejam', package: 'Pakej 10 jam', format: 'Kelas 1-to-1', enquiry: 'Tanya tentang kelas' },
};

const RegionalMandarinPricing = ({ market, lang, whatsAppLink, onEnquire }) => {
  const t = labels[lang] || labels.en;

  return (
    <div className="mandarin-regional-pricing">
      <div className="mandarin-regional-pricing__heading">
        <div>
          <p className="mandarin-eyebrow">{market.name} · {market.currency}</p>
          <h2 id="mandarin-pricing-title">{t.title}</h2>
        </div>
        <span className="mandarin-regional-pricing__currency" translate="no">{market.currency}</span>
      </div>
      <div className="mandarin-regional-pricing__grid">
        {market.courses.map((course, index) => (
          <article key={course.name} className="mandarin-regional-card">
            <div className="mandarin-regional-card__topline">
              <span className="mandarin-regional-card__number">0{index + 1}</span>
              <span className="mandarin-regional-card__label">{t.format}</span>
            </div>
            <h3 lang="en">{course.name}</h3>
            <dl className="mandarin-regional-card__prices">
              <div>
                <dt>{t.hourly}</dt>
                <dd translate="no">{market.symbol}{course.hourly}</dd>
              </div>
              <div>
                <dt>{t.package}</dt>
                <dd translate="no">{market.symbol}{course.package}</dd>
              </div>
            </dl>
            <a href={whatsAppLink} target="_blank" rel="noreferrer" onClick={onEnquire} className="mandarin-button mandarin-button--yellow mandarin-regional-card__button">
              {t.enquiry}<ArrowRight size={18} aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </div>
  );
};

export default RegionalMandarinPricing;
