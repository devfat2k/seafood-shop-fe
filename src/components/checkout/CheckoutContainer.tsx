'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { AuthModal } from '@/components/auth/AuthModal';
import { CheckoutAddressSection } from '@/components/checkout/CheckoutAddressSection';
import { CheckoutItemsSummary } from '@/components/checkout/CheckoutItemsSummary';
import { CheckoutOrderSummary } from '@/components/checkout/CheckoutOrderSummary';
import { CheckoutPaymentMethod } from '@/components/checkout/CheckoutPaymentMethod';
import { Icon } from '@/components/common/Icon';
import { Link, useRouter } from '@/libs/I18nNavigation';
import { useCurrentUserQuery } from '@/libs/queries/auth';
import { useCreateOrderMutation } from '@/libs/queries/orders';
import { useCreatePaymentUrlMutation } from '@/libs/queries/payments';
import { useAddressesQuery } from '@/libs/queries/users';
import { useCartStore } from '@/libs/stores/cart';
import type { PaymentMethod } from '@/types/payment';
import type { UserAddress } from '@/types/user';

export function CheckoutContainer() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const [note, setNote] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('VNPAY');
  const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { data: userProfile, isLoading: isUserLoading } = useCurrentUserQuery();
  const { data: addresses = [], isLoading: isAddressesLoading } = useAddressesQuery();
  const createOrderMutation = useCreateOrderMutation();
  const createPaymentUrlMutation = useCreatePaymentUrlMutation();

  const isSubmitting = createOrderMutation.isPending || createPaymentUrlMutation.isPending;

  // Find active address: either manually selected or defaultAddress or first address
  const activeAddress =
    selectedAddress ?? addresses.find((a: UserAddress) => a.defaultAddress) ?? addresses[0] ?? null;

  const handlePlaceOrder = async () => {
    if (!userProfile) {
      setIsAuthModalOpen(true);
      toast.error('Vui lòng đăng nhập để tiến hành đặt hàng');
      return;
    }

    if (items.length === 0) {
      toast.error('Giỏ hàng của bạn đang trống');
      return;
    }

    if (!activeAddress) {
      toast.error('Vui lòng thêm địa chỉ nhận hàng trước khi thanh toán');
      return;
    }

    try {
      // Step 1: Create Order via POST /api/v1/orders
      const orderItems = items.map((item) => ({
        productId: Number(item.id),
        quantity: item.quantity,
      }));

      const orderRes = await createOrderMutation.mutateAsync({
        paymentMethod: selectedMethod,
        note: note.trim() || undefined,
        items: orderItems,
      });

      const orderData = orderRes.data;
      if (!orderData?.id) {
        throw new Error('Không nhận được mã đơn hàng từ hệ thống');
      }

      // Step 2: Handle Payment Method Flow
      if (selectedMethod === 'VNPAY') {
        const paymentRes = await createPaymentUrlMutation.mutateAsync({
          orderId: orderData.id,
        });

        if (paymentRes.data?.paymentUrl) {
          clearCart();
          toast.success('Đang chuyển hướng sang cổng thanh toán VNPAY...');
          window.location.href = paymentRes.data.paymentUrl;
          return;
        }
      }

      // COD or other methods: Clear cart and go to success result page
      clearCart();
      toast.success('Đặt hàng thành công!');
      router.push(
        `/payment-result?orderId=${orderData.id}&status=success&paymentMethod=${selectedMethod}`,
      );
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : 'Đặt hàng không thành công, vui lòng thử lại sau';
      toast.error(msg);
    }
  };

  // Loading State
  if (isUserLoading || isAddressesLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-64 rounded-lg bg-muted" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="h-40 rounded-2xl bg-muted/60" />
              <div className="h-64 rounded-2xl bg-muted/60" />
            </div>
            <div className="h-72 rounded-2xl bg-muted/60" />
          </div>
        </div>
      </div>
    );
  }

  // Empty Cart State
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary/15 text-secondary">
          <Icon name="shopping-cart" size="xl" />
        </div>
        <h1 className="mt-6 font-heading text-2xl font-bold text-foreground sm:text-3xl">
          Giỏ Hàng Đang Trống
        </h1>
        <p className="mx-auto mt-2 max-w-md text-xs text-muted-foreground sm:text-sm">
          Chưa có hải sản nào trong giỏ hàng. Hãy chọn các loại tôm, cua, cá tươi ngon vừa cập bến
          hôm nay!
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 hover:opacity-90"
        >
          <Icon name="fish" size="sm" />
          <span>Khám Phá Hải Sản Tươi Sống</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-secondary">
          <Link href="/products" className="hover:underline">
            Cửa hàng
          </Link>
          <span>/</span>
          <span className="text-muted-foreground">Thanh toán</span>
        </div>
        <h1 className="mt-2 font-heading text-2xl font-black text-foreground sm:text-3xl">
          Xác Nhận Đơn Hàng &amp; Thanh Toán
        </h1>
      </div>

      {/* Guest Notice */}
      {!userProfile && (
        <div className="mb-8 flex items-center justify-between rounded-2xl border border-secondary/30 bg-secondary/10 p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-white">
              <Icon name="user" size="sm" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground sm:text-sm">
                Bạn chưa đăng nhập tài khoản
              </p>
              <p className="text-[11px] text-muted-foreground">
                Đăng nhập để theo dõi hành trình đơn hàng và nhận ưu đãi tích điểm
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsAuthModalOpen(true);
            }}
            className="rounded-xl bg-secondary px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-secondary/90"
          >
            Đăng Nhập
          </button>
        </div>
      )}

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Details */}
        <div className="space-y-6 lg:col-span-2">
          {/* Address Section */}
          <CheckoutAddressSection
            selectedAddress={activeAddress}
            onSelectAddress={(addr) => {
              setSelectedAddress(addr);
            }}
          />

          {/* Items & Note */}
          <CheckoutItemsSummary
            items={items}
            note={note}
            onNoteChange={(val) => {
              setNote(val);
            }}
          />

          {/* Payment Method */}
          <CheckoutPaymentMethod
            selectedMethod={selectedMethod}
            onSelectMethod={(m) => {
              setSelectedMethod(m);
            }}
          />
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-1">
          <CheckoutOrderSummary
            subtotal={subtotal}
            isSubmitting={isSubmitting}
            onPlaceOrder={() => void handlePlaceOrder()}
            disabled={!userProfile || !activeAddress}
          />
        </div>
      </div>

      {/* Auth Modal if guest */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
        }}
      />
    </div>
  );
}
