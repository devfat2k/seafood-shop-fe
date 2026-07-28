# Data fetching

## Nguyên tắc chọn
- Dữ liệu public / cần SEO (catalog, product list, product detail, trang chủ) → fetch trong **Server Component**. Prefetch + `HydrationBoundary` nếu component con cần TanStack Query.
- Dữ liệu sau đăng nhập / tương tác client (cart, orders, profile) → **TanStack Query** (`useQuery` / `useMutation`).
- KHÔNG dùng `fetch` trực tiếp tới backend. Luôn qua `src/libs/api/*` (đã validate Zod) và `src/libs/ApiClient.ts`.

## Query key convention
- List: `['products', params]` · Detail: `['product', id]` · Theo user: `['orders', userId]`.
- Sau mutation, `invalidateQueries` đúng key để làm mới cache.

## File mẫu canonical (copy theo)
- Server prefetch: `src/app/[locale]/(marketing)/products/page.tsx`
- Query options: `src/libs/queries/products.ts`
- Client dùng query (đủ 4 trạng thái): `src/app/[locale]/(marketing)/products/ProductGrid.tsx`
