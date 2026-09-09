const labels = {
  en: { title: 'Mandarin lesson fees', hourly: 'Single class · per hour', package: '10-hour package', enquiry: 'Ask about lessons' },
  zh: { title: '华语课程收费', hourly: '单堂课 · 每小时', package: '10小时配套', enquiry: '咨询课程' },
  ms: { title: 'Yuran kelas Mandarin', hourly: 'Kelas tunggal · sejam', package: 'Pakej 10 jam', enquiry: 'Tanya tentang kelas' },
};

const RegionalMandarinPricing = ({ market, lang, whatsAppLink, onEnquire }) => {
  const t = labels[lang] || labels.en;
  return (
    <div className="mandarin-regional-pricing">
      <h2 id="mandarin-pricing-title" className="text-3xl font-bold">{t.title}</h2>
      <p className="mb-6 mt-2" translate="no">{market.name} · {market.currency}</p>
      <div className="grid gap-5 md:grid-cols-2">
        {market.courses.map((course) => (
          <article key={course.name} className="rounded-3xl bg-white p-6 text-slate-800 shadow-lg">
            <h3 className="text-xl font-bold" lang="en">{course.name}</h3>
            <dl className="my-6 grid gap-4">
              <div><dt className="text-sm text-slate-600">{t.hourly}</dt><dd className="text-2xl font-bold text-sky-700" translate="no">{market.symbol}{course.hourly} <span className="text-sm">{market.currency}</span></dd></div>
              <div><dt className="text-sm text-slate-600">{t.package}</dt><dd className="text-2xl font-bold text-sky-700" translate="no">{market.symbol}{course.package} <span className="text-sm">{market.currency}</span></dd></div>
            </dl>
            <a href={whatsAppLink} target="_blank" rel="noreferrer" onClick={onEnquire} className="mandarin-button mandarin-button--yellow">{t.enquiry}</a>
          </article>
        ))}
      </div>
    </div>
  );
};

export default RegionalMandarinPricing;
