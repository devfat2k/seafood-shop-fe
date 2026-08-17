'use client';

import { cn } from '@/lib/utils';
import { Link, usePathname } from '@/libs/I18nNavigation';

export const navLinks = [
  { id: 1, href: '/', label: 'Trang chủ' },
  { id: 2, href: '/products', label: 'Sản phẩm' },
  { id: 3, href: '/about', label: 'Liên hệ' },
];

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-6 font-medium lg:flex">
      {navLinks.map((link) => {
        const isCurrent =
          pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
        return (
          <Link
            key={link.id}
            href={link.href}
            className={cn(
              'text-sm font-semibold transition-colors hover:text-primary',
              isCurrent ? 'text-primary' : 'text-muted-foreground',
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
