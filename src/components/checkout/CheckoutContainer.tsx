'use client';

import { AuthModal } from '@/components/auth/AuthModal';
import { CheckoutEmptyCart } from '@/components/checkout/CheckoutEmptyCart';
import { CheckoutGuestBanner } from '@/components/checkout/CheckoutGuestBanner';
import { CheckoutOrderSummary } from '@/components/checkout/CheckoutOrderSummary';
import { CheckoutQrBankStep } from '@/components/checkout/CheckoutQrBankStep';
import { CheckoutSkeleton } from '@/components/checkout/CheckoutSkeleton';
import { CheckoutStepContent } from '@/components/checkout/CheckoutStepContent';
import { CheckoutStepWizard } from '@/components/checkout/CheckoutStepWizard';
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
    return <CheckoutSkeleton />;
  }

  if (items.length === 0 && !createdOrder) {
    return <CheckoutEmptyCart />;
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
        <CheckoutGuestBanner
          onOpenLogin={() => {
            setIsAuthModalOpen(true);
          }}
        />
      )}

      {!createdOrder && (
        <CheckoutStepWizard
          currentStep={currentStep}
          onStepClick={(step: 1 | 2 | 3) => {
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
          <div className="lg:col-span-2">
            <CheckoutStepContent
              currentStep={currentStep}
              selectedAddress={selectedAddress}
              onSelectAddress={(addr) => {
                setSelectedAddress(addr);
              }}
              note={note}
              onNoteChange={(val) => {
                setNote(val);
              }}
              selectedMethod={selectedMethod}
              onSelectMethod={(m) => {
                setSelectedMethod(m);
              }}
              items={items}
              onNextToPayment={handleNextToPayment}
              onNextToConfirm={handleNextToConfirm}
              onStepChange={(s) => {
                setCurrentStep(s);
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
