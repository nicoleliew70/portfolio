export const regionalMarkets = ['malaysia', 'singapore', 'australia'];

const marketByCountry = { MY: 'malaysia', SG: 'singapore', AU: 'australia' };
const marketAliases = { my: 'malaysia', sg: 'singapore', au: 'australia' };

export const resolveMarketPayload = (payload) => {
  const rawMarket = payload && typeof payload.market === 'string' ? payload.market.toLowerCase() : '';
  const market = marketAliases[rawMarket] || rawMarket;
  const country = payload && typeof payload.country === 'string' ? payload.country.toUpperCase() : '';
  if (country) {
    const countryMarket = marketByCountry[country];
    if (!countryMarket || (market && market !== countryMarket)) return 'malaysia';
    return countryMarket;
  }
  return regionalMarkets.includes(market) ? market : 'malaysia';
};

export const resolveRegionalMarket = async (fetcher = fetch, timeoutMs = 3500) => {
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeout = setTimeout(() => controller?.abort(), timeoutMs);
  try {
    const response = await fetcher('/api/region', { signal: controller?.signal, credentials: 'same-origin', cache: 'no-store' });
    if (!response.ok) throw new Error(`region request failed: ${response.status}`);
    return resolveMarketPayload(await response.json());
  } catch {
    return 'malaysia';
  } finally {
    clearTimeout(timeout);
  }
};
