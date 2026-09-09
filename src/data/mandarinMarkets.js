export const mandarinMarkets = {
  malaysia: { name: 'Malaysia', path: '/chinese', currency: 'MYR', symbol: 'RM', courses: [] },
  singapore: {
    name: 'Singapore', path: '/singapore', currency: 'SGD', symbol: 'S$',
    courses: [
      { name: 'PSLE Chinese 1-to-1 Tuition', hourly: 80, package: 700 },
      { name: 'Secondary Chinese 1-to-1 Tuition', hourly: 90, package: 800 },
    ],
  },
  australia: {
    name: 'Australia', path: '/australia', currency: 'AUD', symbol: 'A$',
    courses: [
      { name: 'Mandarin for Kids & Teens – Private 1-to-1', hourly: 80, package: 700 },
      { name: 'Mandarin for Adults – Private 1-to-1', hourly: 95, package: 850 },
    ],
  },
};

export const normalizeRoutePath = (pathname) => {
  const path = pathname.replace(/\/+$/, '') || '/';
  return path.replace(/^\/(chinese|singapore|australia)\/index\.html$/, '/$1');
};

export const marketForPath = (pathname) => Object.keys(mandarinMarkets)
  .find((key) => mandarinMarkets[key].path === normalizeRoutePath(pathname));

export const rememberMarket = (market) => {
  try { localStorage.setItem('mandarin-market', market); } catch { /* Storage is optional. */ }
};

export const preferredMandarinPath = () => {
  try { return mandarinMarkets[localStorage.getItem('mandarin-market')]?.path || '/chinese'; }
  catch { return '/chinese'; }
};
