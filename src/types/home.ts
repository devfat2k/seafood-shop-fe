import type { Category, Product } from './api';

export type HeroSlideProductCard = {
  imageUrl?: string | null;
  image?: string | null;
  imageAlt?: string | null;
  comboBadge?: string | null;
  discountBadge?: string | null;
  originalPrice?: string | number | null;
  salePrice?: string | number | null;
  title?: string | null;
  subtitle?: string | null;
};

export type HeroSlide = {
  id: number | string;
  title?: string | null;
  subtitle?: string | null;
  imageUrl?: string | null;
  image?: string | null;
  ctaText?: string | null;
  ctaLink?: string | null;
  sortOrder?: number | null;
  isActive?: boolean | null;
  badgeText?: string | null;
  badgeIcon?: string | null;
  badge?:
    | {
        text: string;
        icon?: string;
      }
    | string
    | null;
  titlePrefix?: string | null;
  titleHighlight?: string | null;
  titleSuffix?: string | null;
  description?: string | null;
  primaryCtaLabel?: string | null;
  primaryCtaHref?: string | null;
  primaryCtaIcon?: string | null;
  primaryCta?: {
    label: string;
    href: string;
    icon?: string;
  } | null;
  secondaryCta?: {
    label: string;
    href: string;
    icon?: string;
  } | null;
  cardImageUrl?: string | null;
  cardOriginalPrice?: number | null;
  cardSalePrice?: number | null;
  cardTitle?: string | null;
  cardSubtitle?: string | null;
  productCard?: HeroSlideProductCard | null;
};

export type CategoryItem = Category;

export type DailyArrival = {
  id: number | string;
  productId?: number | null;
  boatCode?: string | null;
  date?: string | null;
  time?: string | null;
  badge?: string | null;
  title?: string | null;
  description?: string | null;
  weight?: string | null;
  origin?: string | null;
  price?: number | string | null;
  originalPrice?: number | string | null;
  image?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
};

export type FeaturedProductTab = {
  slug: string;
  label: string;
  sortOrder?: number;
};

export type ComboSet = {
  id: number | string;
  tag: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  unit: string;
  ctaText: string;
  href: string;
  image: string;
  imageUrl?: string;
  theme?: 'light' | 'dark';
  badgeType?: 'gold' | 'green' | 'orange';
  isBreakout?: boolean;
  category?: string;
};

export type FeaturedReview = {
  id: number | string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  location?: string;
  product?: string;
};

export type HomeStats = {
  totalOrdersDelivered: number;
  averageRating: number;
  totalReviews: number;
};

export type HomePageData = {
  heroSlides: HeroSlide[];
  categories: CategoryItem[];
  dailyArrivals: DailyArrival[];
  featuredProducts: Product[];
  featuredProductTabs: FeaturedProductTab[];
  comboSets: ComboSet[];
  featuredReviews: FeaturedReview[];
  stats: HomeStats;
};
