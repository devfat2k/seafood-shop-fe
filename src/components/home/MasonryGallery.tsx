import Image from 'next/image';
import { Icon } from '@/components/common/Icon';

type GalleryItem = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  heightClass: string;
};

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'cang-ca-hung-dong',
    title: 'Hừng Đông Cảng Cá Phan Thiết',
    subtitle: 'Thuyền đánh bắt đêm rẽ sóng cập cảng lúc 4h00 sáng',
    image:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    heightClass: 'h-72 lg:h-96',
  },
  {
    id: 'dong-thung-oxy',
    title: 'Đóng Thùng Oxy Tươi Sống',
    subtitle: 'Hải sản bơi bể đóng oxy chuẩn xuất khẩu giao tận tay',
    image:
      'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80',
    heightClass: 'h-60 lg:h-72',
  },
  {
    id: 'tom-hum-phu-quy',
    title: 'Tôm Hùm Đảo Phú Quý',
    subtitle: 'Tôm bơi khoẻ, vỏ cứng gạch đậm đà tự nhiên',
    image:
      'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=800&q=80',
    heightClass: 'h-80 lg:h-96',
  },
  {
    id: 'tuyet-tac-mon-ngon',
    title: 'Bàn Tiệc Hải Sản Đậm Vị Biển',
    subtitle: 'Chế biến đơn giản giữ trọn vị ngọt tự nhiên tại gia',
    image:
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    heightClass: 'h-64 lg:h-80',
  },
  {
    id: 'doi-ngu-giao-hang',
    title: 'Giao Nhanh Tốc Độ < 2 Giờ',
    subtitle: 'Đội ngũ shipper thùng lạnh bảo quản nghiêm ngặt',
    image:
      'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80',
    heightClass: 'h-72 lg:h-88',
  },
  {
    id: 'che-bien-dat-chuan',
    title: 'Sơ Chế Đạt Chuẩn ATTP',
    subtitle: 'Đóng khay hút chân không sạch sẽ, an toàn tuyệt đối',
    image:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    heightClass: 'h-64 lg:h-80',
  },
];

export function MasonryGallery() {
  return (
    <section className="bg-[#F8FAFC] py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F6E8CC] bg-[#F6E8CC] px-4 py-1.5 text-xs font-bold text-[#C4922F]">
            <Icon name="sparkles" size="xs" />
            <span>KHOẢNH KHẮC PHAN THIẾT</span>
          </div>
          <h2 className="mt-3 text-2xl font-extrabold text-[#26312D] sm:text-3xl lg:text-4xl">
            Từ Đại Dương <span className="text-[#C4922F]">Tới Bàn Tiệc</span>
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-text-secondary sm:text-sm">
            Hành trình đánh bắt, tuyển chọn và vận chuyển hải sản tươi sống mỗi ngày
          </p>
        </div>

        {/* Masonry Layout */}
        <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-2">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-3xl border border-[#E4E0D8] shadow-md ${item.heightClass}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-3d"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />

              <div className="absolute right-4 bottom-4 left-4 text-white">
                <span className="inline-block rounded-md bg-[#0E3D34] px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-[#D9A441] uppercase">
                  NHẬT KÝ BIỂN CẢ
                </span>
                <h3 className="mt-2 text-base font-bold text-white sm:text-lg">{item.title}</h3>
                <p className="mt-1 text-xs text-slate-200">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
