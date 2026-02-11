export const trackEvent = (eventName, params = {}) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

export const trackWhatsAppClick = (location) => {
  trackEvent('whatsapp_click', { click_location: location });
};

export const trackGameStart = (game, level) => {
  trackEvent('game_start', { game_name: game, difficulty_level: level });
};

export const trackGameComplete = (game, score, total) => {
  trackEvent('game_complete', { game_name: game, score, total, score_pct: Math.round((score / total) * 100) });
};

export const trackStoryGenerated = (source) => {
  trackEvent('story_generated', { source });
};

export const trackLanguageSwitch = (language) => {
  trackEvent('language_switch', { language });
};
