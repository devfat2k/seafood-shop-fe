import { Link } from '@/libs/I18nNavigation';

export function ProductHeaderBanner(props: { totalProducts?: number }) {
  const count = props.totalProducts ?? 48;

  return (
    <section className="border-b border-[#E4E0D8] bg-[#FBF8F3] py-8">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#5B6B63]">
          <Link href="/" className="transition-colors hover:text-[#0E3D34]">
            Trang chủ
          </Link>
          <span>→</span>
          <span className="font-semibold text-[#26312D]">Tất cả hải sản</span>
        </nav>

        {/* Title & Description */}
        <h1 className="mt-3 text-3xl font-extrabold text-[#26312D] sm:text-4xl">
          Danh Sách Hải Sản Tươi Ngon
        </h1>
        <p className="mt-2 text-sm text-[#5B6B63]">
          Hiện đang hiển thị {count} sản phẩm tươi sống vừa cập cảng sáng nay tại Phan Thiết.
        </p>
      </div>
    </section>
  );
}
