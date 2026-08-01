export type ProductDetailData = {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  rating: number;
  reviewCount: number;
  origin: string;
  stockStatus: string;
  inStockCount: number;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  unit: string;
  badges: string[];
  images: string[];
  shortDescription: string;
  specs: string[];
  trustItems: { title: string; desc: string; icon: 'truck' | 'shield' }[];
  descriptionHtml: string;
  recipeGuideHtml: string;
  reviews: {
    id: string;
    author: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
  }[];
};

export const PRODUCT_DETAIL_DATA: ProductDetailData = {
  id: 'prod-1',
  name: 'Tôm Hùm Bông Phan Thiết Tươi Sống',
  category: 'Tôm & Cua',
  categorySlug: 'tom-cua',
  rating: 4.9,
  reviewCount: 128,
  origin: 'Cảng cá Phan Thiết',
  stockStatus: 'Còn hàng',
  inStockCount: 24,
  price: 890_000,
  originalPrice: 1_150_000,
  discountPercentage: 22,
  unit: '1kg',
  badges: ['🟢 TƯƠI SỐNG HÔM NAY', '🛡️ Cam Kết Hoàn Tiền 100%'],
  images: [
    'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1545696968-1a5245650b36?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=1000&q=80',
  ],
  shortDescription:
    'Tôm hùm bông là vua của các loại tôm hùm, nổi tiếng với thịt sẵn chắc, ngọt đậm đà và lớp gạch béo ngậy. Được đánh bắt tự nhiên từ đảo Phú Quý, Phan Thiết và mang về đất liền trong ngày.',
  specs: [
    'Trọng lượng tiêu chuẩn: 0.8kg - 1.2kg / con',
    'Hỗ trợ làm sạch và cắt đôi miễn phí',
    'Đóng thùng xốp đá giữ lạnh chuẩn chuyên nghiệp khi giao',
  ],
  trustItems: [
    {
      title: 'Giao Hỏa Tốc 2 Giờ',
      desc: 'Bảo quản lạnh, giao tận tay tại TP.HCM & Phan Thiết.',
      icon: 'truck',
    },
    {
      title: 'Bao Tươi 1 Đổi 1',
      desc: 'Hoàn trả ngay lập tức nếu tôm bị ốp hoặc không tươi.',
      icon: 'shield',
    },
  ],
  descriptionHtml: `
    <h3 class="text-xl font-bold text-[#26312D] mb-3">Tại sao nên chọn Tôm Hùm Bông tại Hải Sản Phan Thiết?</h3>
    <p class="text-sm leading-relaxed text-[#5B6B63] mb-4">
      Tôm hùm bông của chúng tôi được thu mua trực tiếp từ các tàu cá đánh bắt gần bờ tại khu vực biển Phan Thiết - Bình Thuận. Khác với tôm hùm nuôi lồng bè công nghiệp, tôm đánh bắt tự nhiên có cơ thịt cực kỳ săn chắc do bơi lội liên tục trong dòng hải lưu mạnh, tạo nên hương vị ngọt thơm đặc trưng không thể trộn lẫn.
    </p>
    <p class="text-sm leading-relaxed text-[#5B6B63]">
      Ngay sau khi cập cảng lúc 4h sáng, tôm được lựa chọn phân loại kỹ càng, chỉ giữ lại những con khỏe mạnh nhất để đưa vào hệ thống bể kính suc oxy tiêu chuẩn. Khi giao tới tay khách hàng, tôm được đóng gói trong thùng xốp dày kèm đá khô chuyên dụng để duy trì trạng thái ngủ đông tốt nhất, đảm bảo độ tươi ngon nguyên bản như vừa vớt dưới biển lên.
    </p>
  `,
  recipeGuideHtml: `
    <h3 class="text-xl font-bold text-[#26312D] mb-3">Gợi Ý Món Ngon Từ Tôm Hùm Bông</h3>
    <ul class="list-disc pl-5 text-sm space-y-2 text-[#5B6B63]">
      <li><strong>Tôm Hùm Bơ Tỏi Nướng Lò:</strong> Bổ đôi thân tôm, phết hỗn hợp bơ lạt, tỏi băm và bơ nướng ở 200°C trong 12 phút.</li>
      <li><strong>Tôm Hùm Hấp Nước Dừa:</strong> Hấp cách thủy tôm cùng 1 trái dừa tươi và vài nhánh sả đập dập trong 15 phút.</li>
      <li><strong>Cháo Gạch Tôm Hùm:</strong> Dùng đầu và gạch tôm hùm nấu cháo đậu xanh cho vị ngọt béo tự nhiên.</li>
    </ul>
  `,
  reviews: [
    {
      id: 'rev-1',
      author: 'Anh Minh Tuấn',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      rating: 5,
      date: '12/07/2026',
      comment:
        'Tôm sống giao tới nhà quẫy rất khỏe. Thịt săn chắc ngọt đậm, gạch béo ngậy nướng bơ tỏi ai cũng khen!',
    },
    {
      id: 'rev-2',
      author: 'Chị Thanh Hằng',
      avatar:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80',
      rating: 5,
      date: '08/07/2026',
      comment:
        'Giao hàng cực nhanh trong 1.5h. Shop hỗ trợ chẻ đôi giúp rất tiện lợi. Đáng tiền lắm!',
    },
  ],
};
