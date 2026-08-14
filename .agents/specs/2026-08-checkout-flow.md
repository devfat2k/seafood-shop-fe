# Checkout Flow Feature Specification

## 1. Overview & Context
Specifies the end-to-end checkout flow for the Seafood Shop web storefront, enabling customers to order fresh seafood from Phan Thiết.

## 2. Key User Stories
- Customer reviews cart items and selects delivery shipping method.
- Customer fills shipping address (Phan Thiết express or nationwide standard).
- Customer selects payment method (COD, QR Transfer, Bank Card).

## 3. UI States
- **Loading State**: Skeleton review list during order processing.
- **Empty State**: Empty cart message directing to products catalog.
- **Error State**: Payment or validation error alert with retry button.

## 4. Technical Architecture
- Endpoint: `POST /api/v1/orders`
- State: React Query checkout mutation.
- Schema: Order validation schema in `src/validations/order.ts`.
