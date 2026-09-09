# Mandarin regional pages

- `/chinese`: Malaysia / MYR; existing fee-enquiry copy is preserved. The repository has no approved Malaysian Mandarin fee schedule.
- `/singapore`: SGD; approved PSLE and Secondary 1-to-1 fees.
- `/australia`: AUD; approved Kids & Teens and Adults private 1-to-1 fees.

All routes render `ChinesePage`; regional data lives in `src/data/mandarinMarkets.js`. Existing Mandarin copy and default Chinese interface are shared. `?lang=en`, `?lang=zh`, or `?lang=ms` selects the interface without changing the market. Country links carry the current language.

Manual selection is saved locally to make the Mandarin service link return to the chosen market. Explicit URLs always win; no automatic redirect occurs. Storage failure safely falls back to `/chinese`.

Each route has a Vite HTML entry and canonical URL. Cloudflare `_redirects` canonicalises `index.html` and serves extensionless routes. No Workers, Pages Functions, paid API, billing or account configuration changes are introduced. IP suggestions are intentionally not enabled: Functions may incur metered usage. No IP addresses are collected for this feature.

## Verification

```sh
npm run build
npm run lint
node --test tests/mandarin-markets.test.mjs
npm run preview
```

Check `/`, `/chinese`, `/singapore`, `/australia`, including trailing slashes and `index.html` variants. Vite preview verifies rendered entries, but does not implement Cloudflare redirect rules; verify HTTP canonical redirects on a Cloudflare preview deployment before production merge.

At 375, 768, 1024, 1280, 1440 and 1920px check header spacing, mobile menu scrolling, country selection, service active state and horizontal overflow. Change website language, switch country, refresh, and verify prices, language and country. WhatsApp links must include the selected market/currency. Keep production on `main` until review and merge approval.
