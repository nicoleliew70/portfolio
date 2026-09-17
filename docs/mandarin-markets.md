# Regional storefront delivery

The Cloudflare Pages Function at `/api/region` reads the trusted `request.cf.country` value and maps Malaysia (`MY`) to the English storefront, Singapore (`SG`) to Mandarin Singapore pricing, and Australia (`AU`) to Mandarin Australia pricing. Unknown, missing, or failed detection uses the Malaysian English storefront. The function returns only country and market, sends `private, no-store` and `cdn-cache-control: no-store`, and does not store IP addresses or call an external geolocation service.

When running `npm run dev`, Vite provides a bounded local simulation for GET `/api/region` so the default page behaves as Malaysia. It reads `testCountry` from the API URL first, then from a same-origin page `Referer`; absent values default to `MY`. Use these links to exercise the local routes:

- `http://localhost:5173/?testCountry=MY`
- `http://localhost:5173/?testCountry=SG`
- `http://localhost:5173/?testCountry=AU`
- `http://localhost:5173/?testCountry=US`

Restart the dev server after changing the Vite config. `npm run preview` does not provide this simulation. Real geolocation is available on a deployed Cloudflare Pages environment, where Cloudflare supplies `request.cf.country`.

The frontend waits for this one request before rendering. Route aliases, query strings, hashes, and language selection do not choose pricing. A visitor can correct the detected region with the globe menu; that explicit choice is saved locally and takes priority on later production visits. During local Vite development, detection uses the bounded simulation and ignores the saved region so localhost starts from the simulated country (MY by default). Legacy `/chinese`, `/singapore`, and `/australia` entries remain valid and are canonicalized after detection; Singapore and Australia use `/chinese` as the canonical Mandarin service route. Language controls change copy only. A VPN or travel connection can produce a different detected country because Cloudflare sees the request exit location.

Only the approved Mandarin schedules in `src/data/mandarinMarkets.js` are published: Singapore PSLE and Secondary 1-to-1 tuition, and Australia Kids & Teens and Adults private 1-to-1 tuition. Malaysia has no Mandarin offer. Malaysian English fees remain in `src/data/pricing.json`; they are shown for the Malaysian default and detected Malaysia. Singapore and Australia show their Mandarin offers; other countries use the Malaysian English storefront. The globe menu can apply an explicit valid region choice, which is remembered locally; language selection remains separate and there are no pricing tabs.

## Verification

```sh
npm run build
npm run lint
node --test tests/mandarin-markets.test.mjs tests/region.test.mjs
```

The endpoint tests cover country mapping, spoofed URL/header values being ignored, no-store headers, Malaysia fallback, and safe manual-preference storage. Browser QA should exercise `/`, all Mandarin aliases, trailing slash and `index.html` variants, `?lang=`, and both pricing hashes using Cloudflare Pages preview. For local checks, use the `testCountry` links above with `npm run dev`; Vite preview does not provide `request.cf.country`. Local development ignores the saved `teacher-nicole-region` key while testing automatic detection; production honors that saved globe-menu choice.
