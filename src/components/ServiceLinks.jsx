const normalizePath = (path) => {
  const normalized = path.replace(/\/+$/, '');
  const route = normalized || '/';
  return route === '/chinese/index.html' ? '/chinese' : route;
};

const ServiceLinks = ({ mobile = false, onNavigate }) => {
  const currentPath = normalizePath(window.location.pathname);
  const isChineseService = currentPath === '/chinese';

  const links = [
    {
      href: '/',
      label: 'English',
      active: !isChineseService,
      ariaLabel: 'English classes service',
    },
    {
      href: '/chinese',
      label: 'Mandarin 中文',
      active: isChineseService,
      ariaLabel: 'Mandarin Chinese classes service',
    },
  ];

  return (
    <div
      role="group"
      aria-label="Tuition classes"
      className={mobile
        ? 'rounded-2xl border border-yellow-200 bg-yellow-50 p-3 shadow-sm'
        : 'flex shrink-0 items-center gap-2 rounded-2xl border border-yellow-200 bg-yellow-50 px-2.5 py-1.5 shadow-sm'}
    >
      <span className={mobile ? 'mb-2 block text-sm font-bold text-gray-700' : 'text-xs font-bold text-gray-700'}>Classes:</span>
      <div className={mobile ? 'flex flex-wrap items-center gap-1' : 'flex items-center gap-1'}>
        {links.map((link, index) => (
          <span key={link.href} className="flex items-center gap-1">
            {index > 0 && <span aria-hidden="true" className="px-0.5 text-gray-400">|</span>}
            <a
              href={link.href}
              onClick={onNavigate}
              aria-label={link.ariaLabel}
              aria-current={link.active ? 'page' : undefined}
              className={`${mobile ? 'min-h-10 rounded-lg px-3 py-2 text-sm' : 'rounded-lg px-2 py-1 text-sm'} inline-flex items-center whitespace-nowrap font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${link.active
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-sky-800 hover:bg-white hover:text-sky-700'}`}
            >
              {link.label}
            </a>
          </span>
        ))}
      </div>
    </div>
  );
};

export default ServiceLinks;
