import assert from 'node:assert/strict';
import test from 'node:test';
import { mandarinMarkets, marketForPath, normalizeRoutePath } from '../src/data/mandarinMarkets.js';
import { resolveMarketPayload } from '../src/data/regionPricing.js';

test('Mandarin route variants use the same market; English stays separate', () => {
  for (const [key, market] of Object.entries(mandarinMarkets)) {
    for (const suffix of ['', '/', '/index.html', '/index.html/']) {
      assert.equal(normalizeRoutePath(market.path + suffix), market.path);
      assert.equal(marketForPath(market.path + suffix), key);
    }
  }
  assert.equal(marketForPath('/'), undefined);
  assert.equal(marketForPath('/singapore-other'), undefined);
});

test('Only approved regional fees are published; no Malaysian prices invented', () => {
  assert.deepEqual(mandarinMarkets.singapore.courses.map(c => [c.hourly, c.package]), [[80,700],[90,800]]);
  assert.deepEqual(mandarinMarkets.australia.courses.map(c => [c.hourly, c.package]), [[80,700],[95,850]]);
  assert.equal(mandarinMarkets.singapore.currency, 'SGD');
  assert.equal(mandarinMarkets.australia.currency, 'AUD');
  assert.equal(mandarinMarkets.malaysia.currency, 'MYR');
  assert.equal(mandarinMarkets.malaysia.courses.length, 0);
});

test('Geo payload is the only market source and invalid data is safe', () => {
  assert.equal(resolveMarketPayload({ market: 'singapore' }), 'singapore');
  assert.equal(resolveMarketPayload({ market: 'AUSTRALIA' }), 'australia');
  assert.equal(resolveMarketPayload({ market: 'malaysia', country: 'SG' }), 'malaysia');
  assert.equal(resolveMarketPayload({ market: 'invalid' }), 'malaysia');
  assert.equal(resolveMarketPayload({}), 'malaysia');
});
