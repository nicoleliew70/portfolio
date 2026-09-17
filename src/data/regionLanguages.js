const marketLanguages = {
  malaysia: ['en', 'zh', 'ms'],
  singapore: ['en', 'zh'],
  australia: ['en', 'zh'],
};

export const getAllowedLanguages = (market) => marketLanguages[market] || ['en'];

export const isAllowedLanguage = (market, lang) => getAllowedLanguages(market).includes(lang);

export const resolveLanguage = (market, requestedLanguage) => (
  isAllowedLanguage(market, requestedLanguage) ? requestedLanguage : 'en'
);
