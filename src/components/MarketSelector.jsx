import { mandarinMarkets, rememberMarket } from '../data/mandarinMarkets';

const labels = { en: 'Country / currency', zh: '国家 / 货币', ms: 'Negara / mata wang' };

const MarketSelector = ({ market, lang, onNavigate }) => (
  <div role="group" aria-label={labels[lang] || labels.en} className="rounded-2xl border border-sky-200 bg-sky-50 p-3 text-slate-800">
    <p className="mb-2 text-sm font-bold">{labels[lang] || labels.en}</p>
    <div className="flex flex-wrap gap-2" translate="no">
      {Object.entries(mandarinMarkets).map(([key, item]) => (
        <a key={key} href={`${item.path}?lang=${lang}#mandarin-pricing`}
          aria-current={key === market ? 'page' : undefined}
          onClick={() => { rememberMarket(key); onNavigate?.(); }}
          className={`inline-flex min-h-11 items-center gap-1 rounded-xl border px-3 py-2 text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 ${key === market ? 'border-sky-700 bg-sky-700 text-white shadow-sm' : 'border-sky-200 bg-white text-sky-800 hover:bg-yellow-50'}`}>
          {key === market && <span aria-hidden="true">✓</span>}{item.name} · {item.currency}
        </a>
      ))}
    </div>
  </div>
);

export default MarketSelector;
