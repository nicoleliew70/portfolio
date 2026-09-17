import assert from 'node:assert/strict';
import test from 'node:test';
import { onRequestGet } from '../functions/api/region.js';
import { resolveRegionalMarket } from '../src/data/regionPricing.js';
import { readSavedRegion, saveRegion } from '../src/data/regionPreference.js';
import { getAllowedLanguages, resolveLanguage } from '../src/data/regionLanguages.js';

test('markets expose only their supported languages and default invalid requests to English', () => {
  assert.deepEqual(getAllowedLanguages('malaysia'), ['en', 'zh', 'ms']);
  assert.deepEqual(getAllowedLanguages('singapore'), ['en', 'zh']);
  assert.deepEqual(getAllowedLanguages('australia'), ['en', 'zh']);
  assert.equal(resolveLanguage('malaysia', 'ms'), 'ms');
  assert.equal(resolveLanguage('singapore', 'ms'), 'en');
  assert.equal(resolveLanguage('australia', 'invalid'), 'en');
  assert.equal(resolveLanguage('singapore', 'zh'), 'zh');
});

test('region function maps Cloudflare country and ignores spoofed request data', async () => {
  for (const [country, market] of [['MY', 'malaysia'], ['SG', 'singapore'], ['AU', 'australia'], ['US', 'malaysia'], [undefined, 'malaysia']]) {
    const request = { url: 'https://example.test/api/region?market=malaysia', headers: new Headers({ 'CF-IPCountry': 'MY' }), cf: country ? { country } : undefined };
    const response = await onRequestGet({ request });
    assert.equal((await response.json()).market, market);
    assert.equal(response.headers.get('cache-control'), 'private, no-store');
    assert.equal(response.headers.get('cdn-cache-control'), 'no-store');
  }
});

test('frontend region resolution defaults safely to Malaysia', async () => {
  let options;
  assert.equal(await resolveRegionalMarket(async (_url, opts) => { options = opts; return { ok: true, json: async () => ({ market: 'SG' }) }; }), 'singapore');
  assert.equal(options.cache, 'no-store');
  assert.equal(await resolveRegionalMarket(async () => ({ ok: true, json: async () => ({ market: 'MY', country: 'SG' }) })), 'malaysia');
  assert.equal(await resolveRegionalMarket(async () => { throw new Error('offline'); }), 'malaysia');
  assert.equal(await resolveRegionalMarket(async (_url, opts) => new Promise((_, reject) => opts.signal?.addEventListener('abort', () => reject(new Error('timeout')))), 1), 'malaysia');
});

test('manual region preference accepts only supported regions and tolerates blocked storage', () => {
  let saved;
  const storage = {
    getItem: () => saved,
    setItem: (_key, value) => { saved = value; },
  };

  assert.equal(readSavedRegion(storage), null);
  assert.equal(saveRegion('singapore', storage), true);
  assert.equal(readSavedRegion(storage), 'singapore');
  assert.equal(saveRegion('international', storage), false);
  assert.equal(readSavedRegion(storage), 'singapore');

  const blocked = {
    getItem: () => { throw new Error('blocked'); },
    setItem: () => { throw new Error('blocked'); },
  };
  assert.equal(readSavedRegion(blocked), null);
  assert.equal(saveRegion('australia', blocked), false);
});
