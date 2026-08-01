import type { LucideIcon, LucideProps } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

/**
 * Common icon size options or numeric pixel size in px.
 */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

export type IconName =
  | 'shopping-bag'
  | 'shopping-cart'
  | 'search'
  | 'user'
  | 'filter'
  | 'x'
  | 'check'
  | 'chevron-down'
  | 'chevron-up'
  | 'chevron-right'
  | 'chevron-left'
  | 'arrow-right'
  | 'arrow-left'
  | 'plus'
  | 'minus'
  | 'trash'
  | 'heart'
  | 'star'
  | 'phone'
  | 'mail'
  | 'map-pin'
  | 'truck'
  | 'shield-check'
  | 'clock'
  | 'sparkles'
  | 'grid'
  | 'list'
  | 'sliders-horizontal'
  | 'log-out'
  | 'lock'
  | 'eye'
  | 'eye-off'
  | 'fish'
  | (string & Record<never, never>);

export type IconProps = Omit<LucideProps, 'size'> & {
  /** Icon name (kebab-case or PascalCase string) */
  name?: IconName;
  /** Direct LucideIcon component reference */
  icon?: LucideIcon;
  /** Size preset ('xs'|'sm'|'md'|'lg'|'xl') or pixel number */
  size?: IconSize;
};

const SIZE_MAP: Record<string, number> = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

/**
 * Converts kebab-case string to PascalCase for Lucide icon component lookup.
 * e.g. "shopping-bag" -> "ShoppingBag", "chevron-down" -> "ChevronDown"
 *
 * @param str - Input string in kebab-case or lowercase.
 * @returns PascalCase formatted string.
 */
function toPascalCase(str: string): string {
  return str.replaceAll(/(^\w|-\w)/gu, (match) => match.replace('-', '').toUpperCase());
}

function isLucideIcon(val: unknown): val is LucideIcon {
  return typeof val === 'function' || (typeof val === 'object' && val !== null);
}

/**
 * Unified Icon component wrapping Lucide React icons for the seafood shop.
 * Supports icon selection by name or direct LucideIcon component reference.
 *
 * @param props - Icon component props.
 * @returns Rendered Lucide Icon element or null if not found.
 */
export function Icon(props: IconProps) {
  const { name, icon: Component, size = 'md', className, ...rest } = props;

  const numericSize = typeof size === 'number' ? size : (SIZE_MAP[size] ?? 20);

  if (Component) {
    return <Component size={numericSize} className={className} {...rest} />;
  }

  if (name) {
    const pascalName = toPascalCase(name);
    const iconsRecord: Record<string, unknown> = LucideIcons;
    const candidate = iconsRecord[pascalName] ?? iconsRecord[name];

    if (isLucideIcon(candidate)) {
      const LucideComponent = candidate;
      return <LucideComponent size={numericSize} className={className} {...rest} />;
    }
  }

  return null;
}
