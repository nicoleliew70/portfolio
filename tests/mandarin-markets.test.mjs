import assert from 'node:assert/strict';
import test from 'node:test';
import { mandarinMarkets, marketForPath, normalizeRoutePath, preferredMandarinPath, rememberMarket } from '../src/data/mandarinMarkets.js';

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

test('Remembered market only changes service entry link, never explicit route', () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  let saved;
  try {
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
      getItem: () => saved, setItem: (_, value) => { saved = value; },
    } });
    assert.equal(preferredMandarinPath(), '/chinese');
    rememberMarket('australia');
    assert.equal(preferredMandarinPath(), '/australia');
    assert.equal(marketForPath('/singapore'), 'singapore');
    saved = 'invalid';
    assert.equal(preferredMandarinPath(), '/chinese');
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, get() { throw Error('Blocked storage'); } });
    assert.doesNotThrow(() => rememberMarket('singapore'));
    assert.equal(preferredMandarinPath(), '/chinese');
  } finally {
    if (original) Object.defineProperty(globalThis, 'localStorage', original);
    else delete globalThis.localStorage;
  }
});
