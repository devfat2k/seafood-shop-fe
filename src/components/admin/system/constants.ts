export const CACHE_PARTITIONS = [
  {
    name: 'Hero Banners',
    key: 'home:banners',
    desc: 'Băng rôn quảng cáo đầu trang chủ',
  },
  {
    name: 'Hải Sản Cập Bến',
    key: 'home:daily-arrivals',
    desc: 'Hàng tươi sống về trong ngày',
  },
  {
    name: 'Danh Mục Bento',
    key: 'home:categories',
    desc: 'Danh mục hải sản nổi bật trang chủ',
  },
  {
    name: 'Top Bán Chạy',
    key: 'home:top-buy',
    desc: 'Bảng xếp hạng sản phẩm bán nhiều nhất',
  },
  {
    name: 'Combo Tiệc Hải Sản',
    key: 'home:combos',
    desc: 'Các gói combo lẩu, nướng và gia đình',
  },
  {
    name: 'Hải Sản Cao Cấp',
    key: 'home:luxury',
    desc: 'Cua hoàng đế, tôm hùm bông, bào ngư',
  },
];

export const SYSTEM_SERVICES = [
  {
    name: 'Backend REST API',
    version: 'v1.2.0',
    status: 'Hoạt động bình thường',
    protocol: 'HTTPS / Spring Boot',
    isHealthy: true,
  },
  {
    name: 'Bộ Nhớ Đệm Redis',
    version: 'In-Memory Key-Value',
    status: 'Đã kết nối',
    protocol: 'Redis Protocol',
    isHealthy: true,
  },
  {
    name: 'Storefront Web App',
    version: 'Next.js 16 + React 19',
    status: 'Sẵn sàng phục vụ',
    protocol: 'HTTP/2 App Router',
    isHealthy: true,
  },
];
