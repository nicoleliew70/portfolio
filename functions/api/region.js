const MARKET_BY_COUNTRY = { MY: 'malaysia', SG: 'singapore', AU: 'australia' };

export async function onRequestGet({ request }) {
  const country = typeof request.cf?.country === 'string' ? request.cf.country.toUpperCase() : null;
  const market = MARKET_BY_COUNTRY[country] || 'malaysia';
  return new Response(JSON.stringify({ country, market }), {
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'private, no-store', 'cdn-cache-control': 'no-store' },
  });
}
