import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown, Globe2 } from 'lucide-react';
import { getAllowedLanguages } from '../data/regionLanguages';

const regions = [
  { market: 'malaysia', code: 'MY', labels: { en: 'Malaysia — English', zh: '马来西亚 — 英语', ms: 'Malaysia — Bahasa Inggeris' } },
  { market: 'singapore', code: 'SG', labels: { en: 'Singapore — Mandarin', zh: '新加坡 — 中文', ms: 'Singapura — Mandarin' } },
  { market: 'australia', code: 'AU', labels: { en: 'Australia — Mandarin', zh: '澳大利亚 — 中文', ms: 'Australia — Mandarin' } },
];

const marketLabels = {
  en: 'Select region',
  zh: '选择地区',
  ms: 'Pilih rantau',
};

const RegionMenu = ({ market = 'malaysia', lang = 'en', onMarketChange, onNavigate, mobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const menuId = `region-menu-${useId().replace(/:/g, '')}`;
  const selected = regions.find((region) => region.market === market) || regions[0];
  const language = getAllowedLanguages(market).includes(lang) ? lang : 'en';

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const chooseRegion = (nextMarket) => {
    onMarketChange?.(nextMarket);
    setIsOpen(false);
    onNavigate?.();
  };

  return (
    <div ref={rootRef} className={`relative ${mobile ? 'w-full' : 'shrink-0'}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={`${marketLabels[language]}: ${selected.code}`}
        aria-expanded={isOpen}
        aria-controls={menuId}
        title={marketLabels[language]}
        className={`${mobile
          ? 'flex min-h-12 w-full items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2.5'
          : 'flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-xs'} font-bold text-gray-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2`}
      >
        <span className="flex items-center gap-2">
          <Globe2 size={mobile ? 17 : 15} aria-hidden="true" />
          <span translate="no">{selected.code}</span>
          {mobile && <span className="text-sm text-gray-500">{selected.labels[language]}</span>}
        </span>
        <ChevronDown size={mobile ? 17 : 14} aria-hidden="true" className={isOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
      </button>

      {isOpen && (
        <div
          id={menuId}
          role="group"
          aria-label={marketLabels[language]}
          className={`absolute z-20 mt-2 min-w-[13rem] rounded-2xl border border-gray-200 bg-white p-1.5 shadow-xl ${mobile ? 'left-0 right-0' : 'right-0'}`}
        >
          {regions.map((region) => (
            <button
              key={region.market}
              type="button"
              onClick={() => chooseRegion(region.market)}
              aria-pressed={selected.market === region.market}
              className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-gray-700 transition hover:bg-sky-50 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <span>{region.labels[language]}</span>
              {selected.market === region.market && <Check size={16} className="shrink-0 text-sky-600" aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegionMenu;
