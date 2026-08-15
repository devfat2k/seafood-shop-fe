import type { Category, Product } from './api';

export type HeroSlideProductCard = {
  image: string;
  imageAlt: string;
  comboBadge: string;
  discountBadge: string;
  originalPrice: string;
  salePrice: string;
  title: string;
  subtitle: string;
};

export type HeroSlide = {
  id: number | string;
  badgeText?: string;
  badgeIcon?: string;
  badge?: {
    text: string;
    icon: string;
  };
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  primaryCtaIcon?: string;
  primaryCta?: {
    label: string;
    href: string;
    icon: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
    icon: string;
  };
  cardImageUrl?: string;
  cardOriginalPrice?: number;
  cardSalePrice?: number;
  cardTitle?: string;
  cardSubtitle?: string;
  productCard?: HeroSlideProductCard;
};

export type CategoryItem = Category;

export type DailyArrival = {
  id: number | string;
  productId?: number;
  date?: string;
  time?: string;
  badge?: string;
  title?: string;
  description?: string;
  weight?: string;
  origin?: string;
  price?: number | string;
  originalPrice?: number | string;
  image?: string;
  imageAlt?: string;
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
  unit: string;
  ctaText: string;
  href: string;
  image: string;
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
