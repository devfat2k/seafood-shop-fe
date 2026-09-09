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
    currentStep,
    setCurrentStep,
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
    createdOrder,
    handleNextToPayment,
    handleNextToConfirm,
    handlePlaceOrder,
    handleQrConfirmed,
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

  if (items.length === 0 && !createdOrder) {
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
      <div className="mb-6">
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
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-secondary/30 bg-secondary/10 p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-white">
              <Icon name="user" size="sm" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground sm:text-sm">
                Bạn chưa đăng nhập tài khoản
              </p>
              <p className="text-xs text-muted-foreground">
                Đăng nhập để theo dõi hành trình đơn hàng và nhận ưu đãi chuỗi lạnh
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsAuthModalOpen(true);
            }}
            className="rounded-xl bg-secondary px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-secondary/90 cursor-pointer"
          >
            Đăng Nhập
          </button>
        </div>
      )}

      {!createdOrder && (
        <CheckoutStepWizard
          currentStep={currentStep}
          onStepClick={(step) => {
            setCurrentStep(step);
          }}
        />
      )}

      {createdOrder ? (
        <CheckoutQrBankStep
          orderId={createdOrder.id}
          totalAmount={createdOrder.totalAmount}
          onPaymentConfirmed={handleQrConfirmed}
        />
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {currentStep === 1 && (
              <>
                <CheckoutAddressSection
                  selectedAddress={selectedAddress}
                  onSelectAddress={(addr) => {
                    setSelectedAddress(addr);
                  }}
                />

                <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
                  <label htmlFor="checkout-note" className="block text-xs font-bold text-foreground">
                    Ghi chú giao nhận hải sản
                  </label>
                  <textarea
                    id="checkout-note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ví dụ: Giao trước 11h30 trưa, đóng thùng oxy, gọi trước 15 phút..."
                    rows={2}
                    className="mt-2 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextToPayment}
                    className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-xs font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-98 sm:text-sm cursor-pointer"
                  >
                    <span>Tiếp tục: Chọn phương thức thanh toán</span>
                    <Icon name="arrow-right" size="sm" />
                  </button>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <CheckoutPaymentMethod
                  selectedMethod={selectedMethod}
                  onSelectMethod={(m) => {
                    setSelectedMethod(m);
                  }}
                />

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-5 py-3 text-xs font-bold text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <Icon name="arrow-left" size="xs" />
                    <span>Quay lại địa chỉ</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextToConfirm}
                    className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-xs font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-98 sm:text-sm cursor-pointer"
                  >
                    <span>Tiếp tục: Xác nhận đơn hàng</span>
                    <Icon name="arrow-right" size="sm" />
                  </button>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <CheckoutItemsSummary
                  items={items}
                  note={note}
                  onNoteChange={(val) => {
                    setNote(val);
                  }}
                />

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-5 py-3 text-xs font-bold text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <Icon name="arrow-left" size="xs" />
                    <span>Đổi phương thức thanh toán</span>
                  </button>
                </div>
              </>
            )}
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
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
        }}
      />
    </div>
  );
};
