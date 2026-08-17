import { ContactForm } from '@/components/about/ContactForm';
import { ContactInfoCards } from '@/components/about/ContactInfoCards';

export function AboutContactContent() {
  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header Banner */}
        <div className="mb-10 text-center sm:mb-14">
          <h1 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Chúng tôi luôn sẵn sàng lắng nghe, tư vấn chọn hải sản tươi ngon nhất tại bến cảng Phan
            Thiết và hỗ trợ mọi thắc mắc của quý khách hàng.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <ContactInfoCards />
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
