'use client';

import { AuthModal } from '@/components/auth/AuthModal';
import { CheckoutAddressSection } from '@/components/checkout/CheckoutAddressSection';
import { CheckoutItemsSummary } from '@/components/checkout/CheckoutItemsSummary';
import { CheckoutOrderSummary } from '@/components/checkout/CheckoutOrderSummary';
import { CheckoutPaymentMethod } from '@/components/checkout/CheckoutPaymentMethod';
import { PaymentWaitingOverlay } from '@/components/checkout/PaymentWaitingOverlay';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import { useCheckoutFlow } from './useCheckoutFlow';

export const CheckoutContainer = () => {
  const {
    items,
    subtotal,
    note,
    setNote,
    selectedMethod,
    setSelectedMethod,
    selectedAddress,
    setSelectedAddress,
    userProfile,
    isUserLoading,
    isAddressesLoading,
    isSubmitting,
    isAuthModalOpen,
    setIsAuthModalOpen,
    waitingPayment,
    handlePlaceOrder,
    handlePaymentConfirmed,
  } = useCheckoutFlow();

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
              <p className="text-xs text-muted-foreground">
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

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <CheckoutAddressSection
            selectedAddress={selectedAddress}
            onSelectAddress={(addr) => {
              setSelectedAddress(addr);
            }}
          />

          <CheckoutItemsSummary
            items={items}
            note={note}
            onNoteChange={(val) => {
              setNote(val);
            }}
          />

          <CheckoutPaymentMethod
            selectedMethod={selectedMethod}
            onSelectMethod={(m) => {
              setSelectedMethod(m);
            }}
          />
        </div>

        <div className="lg:col-span-1">
          <CheckoutOrderSummary
            subtotal={subtotal}
            isSubmitting={isSubmitting}
            onPlaceOrder={() => void handlePlaceOrder()}
            disabled={!userProfile || !selectedAddress}
          />
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
        }}
      />

      {waitingPayment && (
        <PaymentWaitingOverlay
          orderId={waitingPayment.orderId}
          paymentMethod={waitingPayment.method}
          onConfirmed={handlePaymentConfirmed}
        />
      )}
    </div>
  );
};
