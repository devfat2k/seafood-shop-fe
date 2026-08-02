export type CatalogProduct = {
  id: string;
  name: string;
  category: string;
  categorySlug:
    | 'set-combo'
    | 'tom-cua'
    | 'muc-bach-tuoc'
    | 'so-oc'
    | 'che-bien-san'
    | 'dac-san-kho';
  badges: string[];
  spec: string;
  price: number;
  unit: string;
  image: string;
  inStock: boolean;
  isPopular?: boolean;
  fastShipping?: boolean;
  cleanPrep?: boolean;
  rating: number;
};

export type CategoryFilterItem = {
  id: string;
  name: string;
  slug: CatalogProduct['categorySlug'];
  count: number;
};

export const CATEGORY_FILTER_LIST: CategoryFilterItem[] = [
  { id: 'cat-combo', name: 'Set Hải Sản BBQ & Nhậu', slug: 'set-combo', count: 12 },
  { id: 'cat-tom-cua', name: 'Tôm Hùm & Cua Ghẹ', slug: 'tom-cua', count: 18 },
  { id: 'cat-muc', name: 'Mực & Bạch Tuộc', slug: 'muc-bach-tuoc', count: 24 },
  { id: 'cat-so-oc', name: 'Nghêu, Sò & Ốc', slug: 'so-oc', count: 30 },
  { id: 'cat-che-bien', name: 'Chế Biến Sẵn & Phile', slug: 'che-bien-san', count: 15 },
  { id: 'cat-kho', name: 'Đặc Sản Khô & Gia Vị', slug: 'dac-san-kho', count: 21 },
];

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 'cat-prod-1',
    name: 'Tôm Hùm Bông Phan Thiết Tươi Sống (Size 1-1.2kg/con)',
    category: 'TÔM & CUA',
    categorySlug: 'tom-cua',
    badges: ['🟢 TƯƠI SỐNG HÔM NAY', '📍 Phan Thiết'],
    spec: '🚚 Giao trong 2-4h • Thùng xốp đá',
    price: 890_000,
    unit: 'Kg',
    image:
      'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isPopular: true,
    fastShipping: true,
    cleanPrep: true,
    rating: 4.9,
  },
  {
    id: 'cat-prod-2',
    name: 'Set Nhậu Hải Sản "Cuối Tuần" Tiết Kiệm Đầy Đủ',
    category: 'SET COMBO',
    categorySlug: 'set-combo',
    badges: ['🟢 TƯƠI SỐNG HÔM NAY', 'Bán chạy'],
    spec: '🚚 Giao kèm sốt chấm muối ớt xanh',
    price: 650_000,
    unit: 'Set',
    image:
      'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isPopular: true,
    fastShipping: true,
    cleanPrep: true,
    rating: 5,
  },
  {
    id: 'cat-prod-3',
    name: 'Mực Lá Phan Thiết Lớn (Size 2-3 con/kg)',
    category: 'MỰC & BẠCH TUỘC',
    categorySlug: 'muc-bach-tuoc',
    badges: ['🟢 TƯƠI SỐNG HÔM NAY'],
    spec: '🚚 Giao hỏa tốc 2h • Đóng khay sạch',
    price: 380_000,
    unit: 'Kg',
    image:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isPopular: true,
    fastShipping: true,
    cleanPrep: true,
    rating: 4.8,
  },
  {
    id: 'cat-prod-4',
    name: 'Ốc Hương Biển Phan Thiết Tươi Béo (Size 50-60 con/kg)',
    category: 'ỐC & SÒ',
    categorySlug: 'so-oc',
    badges: ['🟢 TƯƠI SỐNG HÔM NAY'],
    spec: '🚚 Giao hỏa tốc 2h • Đóng khay sạch',
    price: 490_000,
    unit: 'Kg',
    image:
      'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isPopular: false,
    fastShipping: true,
    cleanPrep: true,
    rating: 4.7,
  },
  {
    id: 'cat-prod-5',
    name: 'Hàu Sữa Pháp Tươi Sống (Size 10-12 con/kg)',
    category: 'ỐC & SÒ',
    categorySlug: 'so-oc',
    badges: ['🟢 TƯƠI SỐNG HÔM NAY'],
    spec: '🚚 Hỗ trợ tách vỏ miễn phí',
    price: 145_000,
    unit: 'Kg',
    image:
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isPopular: false,
    fastShipping: true,
    cleanPrep: true,
    rating: 4.6,
  },
  {
    id: 'cat-prod-6',
    name: 'Cá Thu Phile Cắt Khúc Tươi Ngon Chuẩn Xuất Khẩu',
    category: 'CÁ PHILE & CHẾ BIẾN',
    categorySlug: 'che-bien-san',
    badges: ['CÒN ÍT HÀNG'],
    spec: '🚚 Hút chân không chuẩn xuất khẩu',
    price: 280_000,
    unit: 'Kg',
    image:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isPopular: false,
    fastShipping: false,
    cleanPrep: true,
    rating: 4.8,
  },
  {
    id: 'cat-prod-7',
    name: 'Cua Cà Mau Tươi Sống Chắc Thịt (Size 2-3 con/kg)',
    category: 'TÔM & CUA',
    categorySlug: 'tom-cua',
    badges: ['🟢 TƯƠI SỐNG HÔM NAY'],
    spec: '🚚 Giao sống tận nơi trong 2h',
    price: 520_000,
    unit: 'Kg',
    image:
      'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isPopular: true,
    fastShipping: true,
    cleanPrep: false,
    rating: 4.9,
  },
  {
    id: 'cat-prod-8',
    name: 'Mực Một Nắng Phan Thiết Thượng Hạng (Khay 500g)',
    category: 'ĐẶC SẢN KHÔ',
    categorySlug: 'dac-san-kho',
    badges: ['📍 ĐẶC SẢN PHAN THIẾT'],
    spec: '🚚 Đóng gói hút chân không cao cấp',
    price: 320_000,
    unit: 'Khay',
    image:
      'https://images.unsplash.com/photo-1509358217973-885695e43e6e?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isPopular: true,
    fastShipping: false,
    cleanPrep: true,
    rating: 5,
  },
  {
    id: 'cat-prod-9',
    name: 'Bạch Tuộc Biển Phan Thiết Tươi Giòn (Size 10-15 con/kg)',
    category: 'MỰC & BẠCH TUỘC',
    categorySlug: 'muc-bach-tuoc',
    badges: ['🟢 TƯƠI SỐNG HÔM NAY'],
    spec: '🚚 Làm sạch ướp đá lạnh giao nhanh',
    price: 240_000,
    unit: 'Kg',
    image:
      'https://images.unsplash.com/photo-1545696968-1a5245650b36?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isPopular: false,
    fastShipping: true,
    cleanPrep: true,
    rating: 4.7,
  },
  {
    id: 'cat-prod-10',
    name: 'Sò Điệp Nhật Bản Nhập Khẩu Tươi Ngon',
    category: 'ỐC & SÒ',
    categorySlug: 'so-oc',
    badges: ['NHẬP KHẨU'],
    spec: '🚚 Bảo quản lạnh 0-4 độ C',
    price: 450_000,
    unit: 'Kg',
    image:
      'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isPopular: false,
    fastShipping: false,
    cleanPrep: true,
    rating: 4.8,
  },
  {
    id: 'cat-prod-11',
    name: 'Nước Mắm Phan Thiết Truyền Thống 40 Độ Đạm (Chai 500ml)',
    category: 'ĐẶC SẢN KHÔ',
    categorySlug: 'dac-san-kho',
    badges: ['📍 TRUYỀN THỐNG'],
    spec: '🚚 Ủ chượp thủ công 100%',
    price: 95_000,
    unit: 'Chai',
    image:
      'https://images.unsplash.com/photo-1509358217973-885695e43e6e?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isPopular: true,
    fastShipping: false,
    cleanPrep: false,
    rating: 5,
  },
  {
    id: 'cat-prod-12',
    name: 'Set Tiệc Hải Sản Đêm 4 Người Cao Cấp',
    category: 'SET COMBO',
    categorySlug: 'set-combo',
    badges: ['🔥 HOT COMBO'],
    spec: '🚚 Đã chế biến nướng chín giao nóng',
    price: 1_250_000,
    unit: 'Set',
    image:
      'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isPopular: true,
    fastShipping: true,
    cleanPrep: true,
    rating: 4.9,
  },
];
