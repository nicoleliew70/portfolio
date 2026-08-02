const normalizePath = (path) => {
  const normalized = path.replace(/\/+$/, '');
  return normalized || '/';
};

const ServiceLinks = ({ mobile = false }) => {
  const currentPath = normalizePath(window.location.pathname);
  const isChineseService = currentPath === '/chinese';

  const links = [
    {
      href: '/',
      label: 'English Tuition',
      active: !isChineseService,
      ariaLabel: 'English Tuition service',
    },
    {
      href: '/chinese',
      label: 'Chinese Tuition 中文课',
      active: isChineseService,
      ariaLabel: 'Chinese Tuition 中文课 service',
    },
  ];

  return (
    <nav
      aria-label="Tuition services"
      className={mobile
        ? 'flex flex-col gap-1 rounded-2xl border border-sky-100 bg-sky-50 p-2 mb-2'
        : 'flex items-center gap-1 rounded-full border border-sky-100 bg-sky-50 p-1 shrink-0'}
    >
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          aria-label={link.ariaLabel}
          aria-current={link.active ? 'page' : undefined}
          className={`font-bold transition ${mobile
            ? 'block rounded-xl px-3 py-2 text-sm'
            : 'rounded-full px-1 py-1 text-xs leading-tight text-center'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${link.active
            ? 'bg-white text-sky-700 shadow-sm'
            : 'text-gray-500 hover:bg-white/80 hover:text-sky-700'}`}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
};

export default ServiceLinks;
