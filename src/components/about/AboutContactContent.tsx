'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Icon } from '@/components/common/Icon';

export function AboutContactContent() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    subject: 'Tư vấn sản phẩm & Đặt hàng',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      toast.error('Vui lòng điền họ tên và số điện thoại liên hệ!');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Đã gửi tin nhắn liên hệ thành công!', {
        description: 'Đội ngũ Hải Sản Phan Thiết sẽ liên hệ lại với bạn trong vòng 15-30 phút.',
      });
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        subject: 'Tư vấn sản phẩm & Đặt hàng',
        message: '',
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Banner tiêu đề */}
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
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
              <h3 className="font-heading text-sm font-bold tracking-wider text-foreground uppercase">
                Kết Nối Qua Mạng Xã Hội
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Theo dõi các đợt cập nhật hải sản cập bến mỗi sáng qua các kênh truyền thông.
              </p>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-xl border border-border bg-background p-3 text-xs font-semibold text-foreground transition-all hover:border-secondary hover:bg-secondary/5"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <span className="text-xs font-black">f</span>
                  </div>
                  <span>Facebook Page</span>
                </a>

                <a
                  href="https://zalo.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-xl border border-border bg-background p-3 text-xs font-semibold text-foreground transition-all hover:border-secondary hover:bg-secondary/5"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500 text-white">
                    <span className="text-xs font-black">Z</span>
                  </div>
                  <span>Zalo Official</span>
                </a>

                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-xl border border-border bg-background p-3 text-xs font-semibold text-foreground transition-all hover:border-secondary hover:bg-secondary/5"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black text-white">
                    <span className="text-xs font-black">T</span>
                  </div>
                  <span>TikTok Channel</span>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs sm:p-8">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h2 className="font-heading text-xl font-bold text-foreground">
                    Gửi Tin Nhắn Cho Chúng Tôi
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Điền thông tin bên dưới, nhân viên chăm sóc khách hàng sẽ phản hồi quý khách sớm
                    nhất.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-bold text-foreground">
                      Họ và tên <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      aria-label="Họ và tên"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                      }}
                      placeholder="Nguyễn Văn A"
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-foreground">
                      Số điện thoại <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      aria-label="Số điện thoại"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                      }}
                      placeholder="0987 654 321"
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-foreground">
                      Địa chỉ Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      aria-label="Địa chỉ Email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                      }}
                      placeholder="example@gmail.com"
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-bold text-foreground">
                      Chủ đề cần hỗ trợ
                    </label>
                    <select
                      id="subject"
                      aria-label="Chủ đề cần hỗ trợ"
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData({ ...formData, subject: e.target.value });
                      }}
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                    >
                      <option value="Tư vấn sản phẩm &amp; Đặt hàng">
                        Tư vấn sản phẩm &amp; Đặt hàng
                      </option>
                      <option value="Hỏi về thời gian giao hàng 2H">
                        Hỏi về thời gian giao hàng 2H
                      </option>
                      <option value="Đổi trả &amp; Bao ăn hải sản">
                        Chính sách đổi trả &amp; Bao ăn 1-1
                      </option>
                      <option value="Hợp tác kinh doanh / Giá sỉ">Hợp tác cung cấp giá sỉ</option>
                      <option value="Góp ý dịch vụ">Góp ý chất lượng dịch vụ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-foreground">
                    Nội dung nhắn gửi
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    aria-label="Nội dung nhắn gửi"
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                    }}
                    placeholder="Nhập chi tiết yêu cầu tư vấn, loại hải sản muốn mua hoặc thông tin khác..."
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary py-3 text-xs font-bold text-secondary-foreground shadow-xs transition-all hover:bg-secondary/90 active:scale-98 disabled:opacity-50"
                >
                  <Icon name="check" size="xs" />
                  <span>{isSubmitting ? 'Đang gửi thông tin...' : 'Gửi Tin Nhắn Liên Hệ'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Khối Cam Kết Chất Lượng */}
        <div className="mt-12 rounded-2xl border border-tertiary/30 bg-tertiary/5 p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-tertiary text-tertiary-foreground">
                <Icon name="shield-check" size="md" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-foreground">
                  Cam Kết Tươi 100%
                </h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Hải sản được chọn lọc kỹ càng tại bến cảng Phan Thiết ngay khi vừa đánh bắt.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Icon name="truck" size="md" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-foreground">
                  Giao Hàng Siêu Tốc 2H
                </h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Bảo quản chuỗi lạnh chuyên dụng, đảm bảo hải sản sống tươi nguyên khi nhận.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                <Icon name="sparkles" size="md" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-foreground">
                  Đổi Trả 1-1 Nhanh Chóng
                </h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Hoàn tiền hoặc 1 đổi 1 ngay lập tức nếu sản phẩm không đúng cam kết tươi ngon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
