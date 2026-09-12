import { Check, Globe2 } from 'lucide-react';
import { mandarinMarkets, rememberMarket } from '../data/mandarinMarkets';

const labels = {
  en: { eyebrow: 'Pricing region', title: 'Choose your market', detail: 'Prices are shown in the selected currency.' },
  zh: { eyebrow: '收费地区', title: '选择地区', detail: '价格会以所选货币显示。' },
  ms: { eyebrow: 'Wilayah yuran', title: 'Pilih pasaran anda', detail: 'Harga dipaparkan dalam mata wang yang dipilih.' },
};

const MarketSelector = ({ market, lang, onNavigate }) => {
  const copy = labels[lang] || labels.en;

  return (
    <div role="group" aria-label={copy.title} className="mandarin-market-selector">
      <div className="mandarin-market-selector__copy">
        <span className="mandarin-market-selector__icon" aria-hidden="true"><Globe2 size={20} /></span>
        <div>
          <p className="mandarin-market-selector__eyebrow">{copy.eyebrow}</p>
          <p className="mandarin-market-selector__detail">{copy.detail}</p>
        </div>
      </div>
      <div className="mandarin-market-selector__options" translate="no">
        {Object.entries(mandarinMarkets).map(([key, item]) => {
          const isActive = key === market;
          return (
            <a key={key} href={`${item.path}?lang=${lang}#mandarin-pricing`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => { rememberMarket(key); onNavigate?.(); }}
              className={`mandarin-market-option ${isActive ? 'is-active' : ''}`}>
              <span className="mandarin-market-option__name">{item.name}</span>
              <span className="mandarin-market-option__currency">{item.currency}</span>
              {isActive && <Check size={16} aria-hidden="true" />}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default MarketSelector;
