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
  id: string;
  badge: {
    text: string;
    icon: string;
  };
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
    icon: string;
  };
  secondaryCta: {
    label: string;
    href: string;
    icon: string;
  };
  productCard: HeroSlideProductCard;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'combo-bbq-dai-duong',
    badge: {
      text: 'SET TIỆC BBQ CUỐI TUẦN BÁN CHẠY NHẤT',
      icon: 'sparkles',
    },
    titlePrefix: 'Cảng cá Phan Thiết',
    titleHighlight: 'Gõ cửa nhà bạn',
    titleSuffix: 'trong 2 giờ!',
    description:
      'Hải sản tươi rói đánh bắt trong đêm, đóng thùng giữ lạnh chuẩn xuất khẩu và giao thẳng tới bàn tiệc của bạn. Cam kết 1 đổi 1 nếu không tươi sống.',
    primaryCta: {
      label: 'Đặt Combo BBQ Ngay',
      href: '/products?category=set-combo',
      icon: 'arrow-right',
    },
    secondaryCta: {
      label: 'Xem Thực Đơn',
      href: '/products',
      icon: 'fish',
    },
    productCard: {
      image:
        'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Tôm hùm và hải sản tươi sống xếp trên đá lạnh',
      comboBadge: 'COMBO TIẾT KIỆM',
      discountBadge: '-15% GIẢM SỐC',
      originalPrice: '1.150.000₫',
      salePrice: '980.000₫',
      title: 'Set Hải Sản BBQ "Đại Dương Xanh"',
      subtitle: 'Tôm hùm bơi, Mực lá Phan Thiết, Sò điệp Nhật, Rau củ nướng',
    },
  },
  {
    id: 'lau-hai-san-hoang-gia',
    badge: {
      text: 'ĐẶC SẢN LẨU HẢI SẢN TƯƠI SỐNG',
      icon: 'sparkles',
    },
    titlePrefix: 'Hải sản biển khơi',
    titleHighlight: 'Đánh bắt trong đêm',
    titleSuffix: 'giao tận bàn!',
    description:
      'Nước lẩu Thái chua cay đậm đà kèm set hải sản bơi bể: Cá bớp tươi, tôm càng xanh, mực trứng và ngao 2 vòi. Chọn ngay cho bữa ăn gia đình ấm cúng.',
    primaryCta: {
      label: 'Khám Phá Set Lẩu',
      href: '/products?category=lau-hai-san',
      icon: 'arrow-right',
    },
    secondaryCta: {
      label: 'Xem Thực Đơn',
      href: '/products',
      icon: 'fish',
    },
    productCard: {
      image:
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Hải sản tươi sống hải cảng Phan Thiết vừa cập bến',
      comboBadge: 'HOTSELLER TẠI BỂ',
      discountBadge: '-20% GIỜ VÀNG',
      originalPrice: '890.000₫',
      salePrice: '712.000₫',
      title: 'Set Lẩu Hải Sản "Hoàng Gia"',
      subtitle: 'Cá bớp phi lê, Tôm càng bơi, Mực trứng, Ngao 2 vòi, Rau nấm lẩu',
    },
  },
  {
    id: 'cua-gach-phan-thiet',
    badge: {
      text: 'CUA GẠCH CHỌN LỌC 100% GẠCH SON',
      icon: 'sparkles',
    },
    titlePrefix: 'Đặc sản Phan Thiết',
    titleHighlight: 'Cam kết 100% tươi sống',
    titleSuffix: 'hoàn tiền nếu lỗi!',
    description:
      'Cua gạch chắc thịt, gạch béo ngậy bắt trực tiếp từ bể nuôi nước biển tự nhiên. Giao tận nơi đóng oxy hoặc hấp chín miễn phí theo yêu cầu.',
    primaryCta: {
      label: 'Đặt Cua Gạch Ngay',
      href: '/products?category=cua-ghe',
      icon: 'arrow-right',
    },
    secondaryCta: {
      label: 'Xem Thực Đơn',
      href: '/products',
      icon: 'fish',
    },
    productCard: {
      image:
        'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Cua gạch Phan Thiết tươi sống trên nền đá biển',
      comboBadge: 'CUA CHẮC 100%',
      discountBadge: 'FREESHIP 0Đ',
      originalPrice: '750.000₫',
      salePrice: '620.000₫',
      title: 'Set Cua Gạch Phan Thiết (2 Con)',
      subtitle: 'Cua gạch loại 1 (400g-500g/con), Tặng sốt chấm Muối Ớt Xanh',
    },
  },
];
