import { ArrowRight, Clock3, Tag } from 'lucide-react';

const labels = {
  en: { title: 'Mandarin lesson fees', subtitle: 'Quality 1-to-1 Mandarin tuition, tailored to every learner’s goals.', hourly: 'Single class · per hour', package: '10-hour package', format: '1-to-1 lesson', enquiry: 'Ask about lessons', service: 'Mandarin tuition', residing: 'Rates apply to students residing in' },
  zh: { title: '华语课程收费', subtitle: '根据每位学习者的目标，提供优质的一对一华语课程。', hourly: '单堂课 · 每小时', package: '10小时配套', format: '一对一课程', enquiry: '咨询课程', service: '华语课程', residing: '收费适用于居住在', suffix: '的学生。' },
  ms: { title: 'Mandarin lesson fees', subtitle: 'Quality 1-to-1 Mandarin tuition, tailored to every learner’s goals.', hourly: 'Single class · per hour', package: '10-hour package', format: '1-to-1 lesson', enquiry: 'Ask about lessons', service: 'Mandarin tuition', residing: 'Rates apply to students residing in' },
};

const RegionalMandarinPricing = ({ market, lang, whatsAppLink, onEnquire }) => {
  const t = labels[lang] || labels.en;
  const marketNames = {
    en: { Singapore: 'Singapore', Australia: 'Australia' },
    zh: { Singapore: '新加坡', Australia: '澳大利亚' },
    ms: { Singapore: 'Singapura', Australia: 'Australia' },
  };
  const marketName = marketNames[lang]?.[market.name] || market.name;
  const residencyNote = lang === 'zh'
    ? `${t.residing}${marketName}${t.suffix}`
    : `${t.residing} ${marketName}${t.suffix || '.'}`;

  return (
    <div className="mandarin-regional-pricing">
      <div className="mandarin-regional-pricing__heading">
        <div>
          <h2 id="mandarin-pricing-title">{t.title}</h2>
          <div className="mandarin-regional-pricing__subtitle"><span aria-hidden="true" />{t.subtitle}</div>
        </div>
        <span className="mandarin-regional-pricing__currency" translate="no">{market.currency}</span>
      </div>
      <div className="mandarin-regional-pricing__grid">
        {market.courses.map((course, index) => (
          <article key={course.name} className="mandarin-regional-card">
            <div className="mandarin-regional-card__topline">
              <div className="mandarin-regional-card__index"><span className="mandarin-regional-card__number">0{index + 1}</span><span aria-hidden="true" /></div>
              <span className="mandarin-regional-card__label">{t.format}</span>
            </div>
            <h3 lang={lang === 'zh' ? 'zh-CN' : 'en'}>{course.name}</h3>
            <p className="mandarin-regional-card__description">{course.description?.[lang] || course.description?.en}</p>
            <dl className="mandarin-regional-card__prices">
              <div>
                <span className="mandarin-regional-card__price-icon" aria-hidden="true"><Clock3 size={22} /></span>
                <dt>{t.hourly}</dt>
                <dd translate="no">{market.symbol}{course.hourly}</dd>
              </div>
              <div>
                <span className="mandarin-regional-card__price-icon" aria-hidden="true"><Tag size={22} /></span>
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
      <p className="mandarin-regional-pricing__note">{residencyNote}</p>
    </div>
  );
};

export default RegionalMandarinPricing;
