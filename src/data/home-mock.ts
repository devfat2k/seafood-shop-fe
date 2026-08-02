export type Product = {
  id: string;
  name: string;
  category: string;
  categorySlug: 'tom-cua' | 'muc-bach-tuoc' | 'sot-tiec' | 'so-oc';
  badges: string[];
  spec: string;
  price: number;
  unit: string;
  image: string;
  rating?: number;
};

export type CategoryItem = {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  badgeType?: 'hot' | 'number' | 'fresh' | 'dry';
  linkText: string;
  href: string;
  image: string;
  gridSpan?: string;
  iconName?: string;
};

export type UspItem = {
  id: string;
  iconName: 'bag' | 'clock' | 'shield' | 'snowflake';
  title: string;
  description: string;
};

export const USP_LIST: UspItem[] = [
  {
    id: 'usp-1',
    iconName: 'bag',
    title: 'Đánh Bắt Trong Đêm',
    description: 'Hải sản tươi mang từ cảng cá Phan Thiết ngay từ bình minh.',
  },
  {
    id: 'usp-2',
    iconName: 'clock',
    title: 'Giao Hỏa Tốc < 2h',
    description: 'Đóng gói giữ lạnh chuyên nghiệp, giao hàng tận nơi nhanh chóng.',
  },
  {
    id: 'usp-3',
    iconName: 'shield',
    title: 'Cam Kết Hoàn Tiền',
    description: 'Bồi hoàn 100% nếu sản phẩm hư hỏng hoặc không tươi.',
  },
  {
    id: 'usp-4',
    iconName: 'snowflake',
    title: 'Đóng Khay Sạch Sẽ',
    description: 'Hải sản làm sạch, sơ chế và hút chân không chuẩn 5 sao.',
  },
];

export const BENTO_CATEGORIES: CategoryItem[] = [
  {
    id: 'bento-combo',
    title: 'SET HẢI SẢN NHẬU & BBQ',
    subtitle:
      'Đầy đủ tôm, mực, hàu, sò kèm sốt muối ớt xanh đặc sản Phan Thiết. Chỉ cần mở hộp và nướng, lý tưởng cho gia đình & tiệc cuối tuần.',
    badge: 'HOT COMBO',
    badgeType: 'hot',
    linkText: 'Khám phá ngay →',
    href: '/products?category=set-combo',
    image:
      'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80',
    gridSpan: 'col-span-1 lg:col-span-2 row-span-2',
  },
  {
    id: 'bento-lobster',
    title: 'Tôm Hùm & Cua Ghẹ',
    subtitle: 'Tươi sống, đang bơi trong bể kính',
    linkText: 'Xem thêm →',
    href: '/products?category=tom-cua',
    image:
      'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bento-squid',
    title: 'Mực Lá & Bạch Tuộc',
    subtitle: 'Mực nhảy cấp đông chuẩn IQF',
    linkText: 'Xem thêm →',
    href: '/products?category=muc-bach-tuoc',
    image:
      'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bento-clam',
    title: 'Nghêu, Sò & Ốc',
    subtitle: 'Hàu sữa Pháp, sò điệp Nhật, ốc hương Phan Thiết.',
    badge: '45+ sản phẩm',
    badgeType: 'number',
    linkText: 'Mua ngay →',
    href: '/products?category=so-oc',
    image:
      'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80',
    iconName: 'shell',
  },
  {
    id: 'bento-ready',
    title: 'Chế Biến Sẵn',
    subtitle: 'Cá kho tộ, mực rim me, chả cá Phan Thiết chiên nóng.',
    badge: 'Món ăn liền',
    badgeType: 'fresh',
    linkText: 'Mua ngay →',
    href: '/products?category=che-bien-san',
    image:
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    iconName: 'flame',
  },
  {
    id: 'bento-dry',
    title: 'Hải Sản Khô & Gia Vị',
    subtitle: 'Mực một nắng, cá chỉ vàng, sốt chấm muối ớt đỏ thần thánh.',
    badge: 'Đặc sản khô',
    badgeType: 'dry',
    linkText: 'Mua ngay →',
    href: '/products?category=dac-san-kho',
    image:
      'https://images.unsplash.com/photo-1509358217973-885695e43e6e?auto=format&fit=crop&w=600&q=80',
    iconName: 'sun',
  },
];

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Tôm Hùm Bông Phan Thiết (Size 1-1.2kg/con)',
    category: 'TÔM & CUA',
    categorySlug: 'tom-cua',
    badges: ['🔥 Bán chạy số 1', 'Tươi sống'],
    spec: '⚡ Giao sống tận nơi • Thùng xốp 4l',
    price: 890_000,
    unit: '1kg',
    image:
      'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
  },
  {
    id: 'prod-2',
    name: 'Mực Lá Phan Thiết Lớn (Size 2-3 con/kg)',
    category: 'MỰC & BẠCH TUỘC',
    categorySlug: 'muc-bach-tuoc',
    badges: ['🔥 Bán chạy số 1'],
    spec: '⚡ Giao tươi dấp đá • Đóng khay sạch',
    price: 380_000,
    unit: '1kg',
    image:
      'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
  },
  {
    id: 'prod-3',
    name: 'Set Nhậu Hải Sản "Cuối Tuần" Tiết Kiệm',
    category: 'SET COMBO',
    categorySlug: 'sot-tiec',
    badges: ['🔥 Bán chạy số 1', 'Sốt Tiệc'],
    spec: '⚡ Đã kèm sốt chấm muối ớt xanh',
    price: 650_000,
    unit: 'set',
    image:
      'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
    rating: 5,
  },
  {
    id: 'prod-4',
    name: 'Hàu Sữa Pháp Tươi Sống (Size 10-12 con/kg)',
    category: 'SÒ & ỐC',
    categorySlug: 'so-oc',
    badges: ['Đơn 11 món'],
    spec: '⚡ Hỗ trợ tách nắp miễn phí',
    price: 145_000,
    unit: '1kg',
    image:
      'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
  },
];
