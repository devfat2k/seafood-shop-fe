# 📘 HỒ SƠ TỔNG QUAN VÀ CẤU TRÚC DỰ ÁN (SEAFOOD SHOP WEB)

> **Mô tả ngắn**: Tài liệu tổng hợp toàn bộ kiến trúc, công nghệ, thư viện (Dependencies & DevDependencies), cấu trúc thư mục chi tiết và các quy chuẩn phát triển của dự án Website Bán Hải Sản Phan Thiết (Seafood Shop Web).

---

## 📄 MỤC LỤC
1. [Tổng Quan Dự Án](#1-tổng-quan-dự-án)
2. [Stack Công Nghệ & Danh Sách Thư Viện](#2-stack-công-nghệ--danh-sách-thư-viện)
   - [Core Framework & Runtime](#21-core-framework--runtime)
   - [Dependencies (Thư viện chính Runtime)](#22-dependencies-thư-viện-chính-runtime)
   - [DevDependencies (Thư viện Công cụ & Kiểm thử)](#23-devdependencies-thư-viện-công-cụ--kiểm-thử)
3. [Cấu Trúc Thư Mục Chi Tiết](#3-cấu-trúc-thư-mục-chi-tiết)
4. [Các Màn Hình Chức Năng & Routes](#4-các-màn-hình-chức-năng--routes)
5. [Các Lệnh Script & Quy Trình Phát Triển](#5-các-lệnh-script--quy-trình-phát-triển)
6. [Quy Chuẩn Kiến Trúc & Bất Biến (Architecture Rules)](#6-quy-chuẩn-kiến-trúc--bất-biến-architecture-rules)

---

## 1. TỔNG QUAN DỰ ÁN

Dự án **Seafood Shop Web** được xây dựng nhằm phục vụ nhu cầu kinh doanh thương mại điện tử hải sản tươi sống đánh bắt tại biển Phan Thiết (Bình Thuận). Dự án áp dụng kiến trúc **Next.js 16 App Router**, **React 19**, **Tailwind CSS v4**, mô hình type-safe tuyệt đối với **TypeScript** và **Zod**, cùng hạ tầng testing & monitoring hiện đại.

- **Mục tiêu**: Xây dựng giao diện storefront mua sắm hải sản mượt mà, chuẩn SEO, đa ngôn ngữ (i18n), tích hợp REST API Backend chuẩn chỉnh với cơ chế auto-refresh token 401, loading state bằng skeleton, và quản lý state dữ liệu linh hoạt.
- **Node.js require**: `>= 24.0.0`
- **Package Manager**: Bun / npm / pnpm

---

## 2. STACK CÔNG NGHỆ & DANH SÁCH THƯ VIỆN

### 2.1 Core Framework & Runtime
- **Next.js (`v16.2.6`)**: Core Web Framework với App Router, Server Components (RSC), Server Actions, Middleware i18n & Security.
- **React / React DOM (`v19.2.6`)**: Thư viện UI cốt lõi kết hợp React Compiler giúp tối ưu hoá render tự động.
- **TypeScript (`v5.9.3`)**: Ngôn ngữ lập trình strict type safe toàn bộ dự án.

### 2.2 Dependencies (Thư viện chính Runtime)

| Tên Thư Viện | Phiên Bản | Công Dụng Chi Tiết |
| :--- | :--- | :--- |
| `@tanstack/react-query` | `^5.101.4` | Quản lý state server, caching, refetching và async state client. |
| `axios` | `^1.8.1` | HTTP Client gọi REST API Backend, tích hợp interceptors tự động refresh JWT token khi nhận lỗi 401. |
| `zod` | `^4.4.3` | Định nghĩa schema & validate dữ liệu runtime cho API response, form input và biến môi trường. |
| `next-intl` | `^4.12.0` | Giải pháp đa ngôn ngữ (i18n) cho Server Components và Client Components với routing động (`/[locale]`). |
| `@t3-oss/env-nextjs` | `^0.13.11` | Khởi tạo và kiểm tra Type-safe Environment Variables (`Env.ts`). |
| `@arcjet/next` | `^1.4.0` | Middleware bảo vệ bảo mật, chống bot nghi vấn và giới hạn tần suất truy cập (rate limiting). |
| `@sentry/nextjs` | `^10.53.1` | Theo dõi lỗi runtime (error tracking), ghi nhận log sự cố và theo dõi hiệu năng hệ thống. |
| `@logtape/logtape` | `^2.1.1` | Thư viện ghi log cấu trúc (structured logging) nhẹ nhàng thay thế cho Pino.js. |
| `react-hook-form` | `^7.76.0` | Quản lý state của Form linh hoạt, tối ưu hiệu năng không làm re-render thừa. |
| `@hookform/resolvers` | `^5.2.2` | Tích hợp Zod schema validator trực tiếp vào `react-hook-form`. |
| `sonner` | `^2.0.6` | Thư viện hiển thị thông báo popup (Toast notifications) giao diện đẹp mắt. |
| `clsx` & `tailwind-merge` | `^2.1.1` / `^3.6.0` | Helper xử lý nối className và giải quyết xung đột class Tailwind CSS. |
| `tw-animate-css` | `^1.3.4` | Thư viện hiệu ứng chuyển động animation tương thích Tailwind v4. |
| `next-themes` | `^0.4.6` | Hỗ trợ chuyển đổi Theme sáng/tối (Light/Dark mode). |
| `lucide-react` | `^1.28.0` | Bộ biểu tượng vector giao diện. |

---

### 2.3 DevDependencies (Thư viện Công cụ & Kiểm thử)

- **Testing Suite**: `vitest` (`^4.1.7`), `@vitest/browser`, `@vitest/browser-playwright`, `@playwright/test` (`^1.60.0`), `@chromatic-com/playwright`, `@faker-js/faker`.
- **UI Documentation**: `storybook` (`^10.4.1`), `@storybook/nextjs-vite`, `@storybook/addon-a11y`, `@storybook/addon-docs`, `@storybook/addon-vitest`.
- **Linter & Formatter**: `ultracite` (`^7.7.0`), `oxlint` (`^1.66.0`), `oxfmt` (`^0.51.0`), `knip` (`^6.14.2`), `@lingual/i18n-check`.
- **Git Hooks & CI/CD**: `lefthook` (`^2.1.8`), `@commitlint/cli`, `semantic-release`, `checkly`, `@spotlightjs/spotlight`, `tailwindcss` (`^4.3.0`).

---

## 3. CẤU TRÚC THƯ MỤC CHI TIẾT

```text
seafood-shop-web/
├── .agents/               # Rules và skills dành cho AI Agent
├── .github/               # Workflows CI/CD GitHub Actions
├── .storybook/            # Cấu hình Storybook UI sandbox
├── .vscode/               # Cấu hình khuyến nghị extension VS Code
├── docs/                  # Tài liệu specs kiến trúc, API contract, UI design system
├── public/                # Tài nguyên tĩnh: favicon, hình ảnh hải sản, logos
├── src/                   # MÃ NGUỒN CHÍNH
│   ├── app/               # Next.js App Router ([locale]/(marketing), [locale]/(auth))
│   ├── components/        # UI components (account, auth, common, home, layout, product-detail, products, ui)
│   ├── data/              # Mock data phát triển (home, products catalog, detail, account)
│   ├── lib/ & libs/       # Axios ApiClient (401 refresh token), Arcjet, Env validation, I18n, Logger
│   ├── locales/           # File từ điển dịch thuật i18n (en.json, fr.json...)
│   ├── styles/            # global.css (Tailwind CSS v4 tokens)
│   ├── types/             # Types TypeScript (api.ts, I18n.ts)
│   ├── utils/             # Helpers & AppConfig
│   └── validations/       # Zod validation schemas
├── tests/                 # Integration và E2E Playwright tests
├── AGENTS.md              # Quy chuẩn bắt buộc cho Developer & AI Agent
├── PROJECT_OVERVIEW.md    # Tài liệu tổng quan gốc của toàn bộ dự án
├── package.json           # Khai báo dependencies và scripts
└── next.config.ts         # Cấu hình Next.js
```

---

## 4. CÁC MÀN HÌNH CHỨC NĂNG & ROUTES

- **Route `/[locale]/` (Trang Chủ)**: HeroSection, MarqueeStrip, UspSection, FeaturedProducts, BentoCategories.
- **Route `/[locale]/products` (Trang Danh Sách Sản Phẩm)**: ProductHeaderBanner, ProductSidebarFilter, ProductListToolbar, ProductCatalogGrid, ProductPagination.
- **Route `/[locale]/products/[id]` (Trang Chi Tiết Sản Phẩm)**: ProductDetailBreadcrumb, ProductGallery, ProductPurchasePanel, ProductTabs.
- **Route `/[locale]/account` (Trang Quản Lý Tài Khoản)**: AccountProfileTab, AccountOrdersTab, AccountAddressesTab, AccountSecurityTab.
- **Route `/[locale]/orders` (Trang Đơn Hàng)**: Danh sách đơn hàng người dùng.
- **Route `/[locale]/checkout` (Trang Thanh Toán)**: Địa chỉ giao hàng và phương thức thanh toán.
- **Route `/[locale]/payment-result` (Trang Kết Quả Thanh Toán)**: Phản hồi kết quả giao dịch.
- **Route `/[locale]/about` & `/[locale]/contact` & `/[locale]/search`**: Màn hình giới thiệu, liên hệ, tìm kiếm.
- **Auth Modal Popup (`AuthModal`)**: Modal đăng nhập, đăng ký và OTP ngay tại header.

---

## 5. CÁC LỆNH SCRIPT & QUY TRÌNH PHÁT TRIỂN

| Script | Lệnh | Công Dụng |
| :--- | :--- | :--- |
| `bun run dev` | `run-p dev:*` | Chạy môi trường dev local. |
| `bun run build-local` | `next build` | Build thử local. |
| `bun run lint` | `ultracite check ...` | Kiểm tra lint & types. |
| `bun run lint:fix` | `ultracite fix ...` | Tự động fix lint. |
| `bun run check:types` | `tsc --noEmit` | Kiểm tra types TS. |
| `bun run check:deps` | `knip` | Quét dead-code. |
| `bun run check:i18n` | `i18n-check ...` | Kiểm tra thiếu key i18n. |
| `bun run test` | `vitest run` | Chạy unit & integration test. |
| `bun run test:e2e` | `playwright test` | Chạy E2E tests. |
| `bun run storybook` | `storybook dev -p 6006` | Khởi chạy Storybook. |

---

## 6. QUY CHUẨN KIẾN TRÚC & BẤT BIẾN

1. API Response chuẩn `ApiResponse<T>`, `PageResponse<T>` (0-indexed). Gọi API qua `src/libs/ApiClient.ts`.
2. Biến môi trường đọc qua `src/libs/Env.ts`.
3. Spacing Scale: `4, 8, 12, 16, 24, 32, 48, 64, 96px`. 100% tiếng Việt, giá tiền `320.000₫`.
4. Mọi màn hình động có 3 states: Loading (Skeleton), Empty state, Error state.
