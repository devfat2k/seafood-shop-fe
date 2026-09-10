export type TopBuyProduct = {
  id?: number;
  productId?: number;
  name: string;
  price: number;
  imageUrl?: string | null;
  totalSold?: number;
  totalRevenue?: number;
  stock?: number;
};

export type RevenueByCategory = {
  categoryId?: number;
  id?: number;
  categoryName?: string;
  name?: string;
  revenue: number;
  orderCount?: number;
  percentage?: number;
};

export type RevenueInMonth = {
  month: number;
  year: number;
  revenue: number;
  orderCount?: number;
};

// ─── Hero Banners ──────────────────────────────────────────
export type HeroBanner = {
  id: number;
  title: string;
  subtitle?: string | null;
  ctaText?: string | null;
  ctaLink?: string | null;
  imageUrl: string;
  sortOrder?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateBannerRequest = {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  sortOrder?: number;
  isActive?: boolean;
};

export type UpdateBannerRequest = Partial<CreateBannerRequest>;

// ─── Daily Arrivals ────────────────────────────────────────
export type DailyArrival = {
  id: number;
  productId: number;
  productName?: string;
  arrivalDate: string;
  badge?: string | null;
  title?: string;
  description?: string | null;
  imageUrl?: string | null;
  price?: number;
};

export type CreateDailyArrivalRequest = {
  productId: number;
  arrivalDate: string;
  badge?: string;
  title?: string;
  description?: string;
};

export type UpdateDailyArrivalRequest = Partial<Omit<CreateDailyArrivalRequest, 'productId'>>;

// ─── RBAC ──────────────────────────────────────────────────
export type Permission = {
  id: number;
  code: string;
  description?: string;
};

export type Role = {
  id: number;
  name: string;
  description?: string;
  permissions?: Permission[];
};

export type CreateRoleRequest = {
  name: string;
  description?: string;
};

// ─── Admin Users ───────────────────────────────────────────
export type AdminUserItem = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  avatarUrl?: string | null;
  isActive: boolean;
  roles: string[];
  createdAt?: string;
};

// ─── Orders ────────────────────────────────────────────────
export type AdminOrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DONE' | 'CANCELLED';

export type UpdateOrderStatusRequest = {
  status: AdminOrderStatus;
};

// ─── Products ──────────────────────────────────────────────
export type CreateProductRequest = {
  name: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  stock: number;
  categoryId: number;
  unit?: string | null;
  spec?: string | null;
  origin?: string | null;
  weightOptions?: string[] | null;
  productType?: 'REGULAR' | 'COMBO' | null;
  isActive: boolean;
};

export type UpdateProductRequest = Partial<CreateProductRequest>;

export type ProductComboConfig = {
  comboCategory?: string;
  comboTheme?: 'light' | 'dark';
  comboTag?: string;
  comboCtaText?: string;
  comboHref?: string;
  isBreakout?: boolean;
  comboSortOrder?: number;
};

// ─── Categories ────────────────────────────────────────────
export type CreateCategoryRequest = {
  name: string;
  description?: string;
  active?: boolean;
};

export type UpdateCategoryRequest = CreateCategoryRequest;

export type CategoryHomeConfig = {
  badge?: string;
  badgeType?: 'hot' | 'fresh' | 'dry' | 'number';
  iconName?: string;
  homeDisplayStyle?: 'main' | 'card' | 'icon';
  homeSortOrder?: number;
  homeIsActive?: boolean;
};
