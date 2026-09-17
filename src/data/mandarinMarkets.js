export const mandarinMarkets = {
  malaysia: { name: 'Malaysia', path: '/chinese', currency: 'MYR', symbol: 'RM', courses: [] },
  singapore: {
    name: 'Singapore', path: '/singapore', currency: 'SGD', symbol: 'S$',
    courses: [
      {
        name: 'PSLE Chinese 1-to-1 Tuition', hourly: 80, package: 700,
        description: {
          en: 'Focused support to build a strong foundation and excel in PSLE Chinese.',
          zh: '针对小学离校考试华文，打好基础并提升学习表现。',
        },
      },
      {
        name: 'Secondary Chinese 1-to-1 Tuition', hourly: 90, package: 800,
        description: {
          en: 'Personalised guidance to strengthen language skills and achieve academic confidence.',
          zh: '针对中学华文提供个别指导，巩固语文能力并建立学习信心。',
        },
      },
    ],
  },
  australia: {
    name: 'Australia', path: '/australia', currency: 'AUD', symbol: 'A$',
    courses: [
      {
        name: 'Mandarin for Kids & Teens – Private 1-to-1', hourly: 80, package: 700,
        description: {
          en: 'Supportive Mandarin lessons shaped around children and teens’ language goals.',
          zh: '配合儿童与青少年的学习目标，提供合适的华语个别课程。',
        },
      },
      {
        name: 'Mandarin for Adults – Private 1-to-1', hourly: 95, package: 850,
        description: {
          en: 'Practical Mandarin tuition shaped around each adult learner’s goals and pace.',
          zh: '配合成人学习者的目标与进度，提供实用的华语个别课程。',
        },
      },
    ],
  },
};

export const normalizeRoutePath = (pathname) => {
  const path = pathname.replace(/\/+$/, '') || '/';
  return path.replace(/^\/(chinese|singapore|australia)\/index\.html$/, '/$1');
};

export const marketForPath = (pathname) => Object.keys(mandarinMarkets)
  .find((key) => mandarinMarkets[key].path === normalizeRoutePath(pathname));
