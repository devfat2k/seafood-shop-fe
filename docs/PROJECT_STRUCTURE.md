# 📘 HỒ SƠ TỔNG QUAN VÀ CẤU TRÚC DỰ ÁN (SEAFOOD SHOP WEB)

> **Mô tả ngắn**: Tài liệu tổng hợp toàn bộ kiến trúc, công nghệ, thư viện (Dependencies & DevDependencies), cấu trúc thư mục chi tiết và các quy chuẩn phát triển của dự án Website Bán Hải Sản (Seafood Shop Web).

---

## 📄 MỤC LỤC
1. [Tổng Quan Dự Án](#1-tổng-quan-dự-án)
2. [Stack Công Nghệ & Danh Sách Thư Viện](#2-stack-công-nghệ--danh-sách-thư-viện)
   - [Core Framework & Runtime](#21-core-framework--runtime)
   - [Dependencies (Thư viện chính Runtime)](#22-dependencies-thư-viện-chính-runtime)
   - [DevDependencies (Thư viện Công cụ & Kiểm thử)](#23-devdependencies-thư-viện-công-cụ--kiểm-thử)
3. [Cấu Trúc Thư Mục Chi Tiết & Công Dụng](#3-cấu-trúc-thư-mục-chi-tiết--công-dụng)
   - [Thư Mục Gốc (Root Level)](#31-thư-mục-gốc-root-level)
   - [Thư Mục Mã Nguồn `src/`](#32-thư-mục-mã-nguồn-src)
   - [Thư Mục Kiểm Thử `tests/`](#33-thư-mục-kiểm-thử-tests)
   - [Thư Mục Tài Liệu `docs/`](#34-thư-mục-tài-liệu-docs)
   - [Thư Mục AI Agent `.agents/`](#35-thư-mục-ai-agent-agents)
4. [Các Lệnh Script & Quy Trình Phát Triển](#4-các-lệnh-script--quy-trình-phát-triển)
5. [Quy Chuẩn Kiến Trúc & Bất Biến (Architecture Rules)](#5-quy-chuẩn-kiến-trúc--bất-biến-architecture-rules)

---

## 1. TỔNG QUAN DỰ ÁN

Dự án **Seafood Shop Web** được xây dựng trên nền tảng Enterprise Next.js 16 Starter Kit tiêu chuẩn cao, được tùy chỉnh chuyên biệt cho trang thương mại điện tử hải sản. Dự án áp dụng kiến trúc **Next.js App Router**, **React 19**, **Tailwind CSS v4**, mô hình type-safe tuyệt đối với **TypeScript** và **Zod**, cùng hạ tầng testing & monitoring hiện đại.

- **Mục tiêu**: Xây dựng giao diện storefront mua sắm hải sản mượt mà, chuẩn SEO, đa ngôn ngữ, tích hợp API Backend chuẩn chỉnh với cơ chế auto-refresh token, loading state bằng skeleton, và quản lý state dữ liệu linh hoạt.
- **Node.js require**: `>= 24`
- **Package Manager**: Bun / npm / pnpm

---

## 2. STACK CÔNG NGHỆ & DANH SÁCH THƯ VIỆN

### 2.1 Core Framework & Runtime
- **Next.js (`v16.2.6`)**: Core Web Framework với App Router, Server Components (RSC), Server Actions, Middleware i18n & Security.
- **React / React DOM (`v19.2.6`)**: Thư viện UI cốt lõi kết hợp React Compiler giúp tối ưu hoá render tự động.
- **TypeScript (`v5.9.3`)**: Ngôn ngữ lập trình strict type safe toàn bộ dự án.

---

### 2.2 Dependencies (Thư viện chính Runtime)

| Tên Thư Viện | Phiên Bản | Công Dụng Chi Tiết |
| :--- | :--- | :--- |
| `@tanstack/react-query` | `^5.101.4` | Quản lý state server, caching, refetching và async state client. |
| `axios` | `^1.8.1` | HTTP Client gọi REST API Backend, tích hợp interceptors tự động refresh JWT token khi nhận lỗi 401. |
| `zod` | `^4.4.3` | Định nghĩa schema & validate dữ liệu runtime cho API response, form input và biến môi trường. |
| `next-intl` | `^4.12.0` | Giải pháp đa ngôn ngữ (i18n) cho Server Components và Client Components với routing động (`/[locale]`). |
| `@t3-oss/env-nextjs` | `^0.13.11` | Khởi tạo và kiểm tra Type-safe Environment Variables (`Env.ts`). |
| `@arcjet/next` | `^1.4.0` | Middleware bảo vệ bảo mật, chống bot nghi vấn và giới hạn tần suất truy cập (rate limiting). |
| `@sentry/nextjs` | `^10.53.1` | Theo dõi lỗi runtime (error tracking), ghi nhận log sự cố và theo dõi hiệu năng hệ thống (performance tracing). |
| `@logtape/logtape` | `^2.1.1` | Thư viện ghi log cấu trúc (structured logging) nhẹ nhàng thay thế cho Pino.js. |
| `react-hook-form` | `^7.76.0` | Quản lý state của Form linh hoạt, tối ưu hiệu năng không làm re-render thừa. |
| `@hookform/resolvers` | `^5.2.2` | Tích hợp Zod schema validator trực tiếp vào `react-hook-form`. |
| `sonner` | `^2.0.6` | Thư viện hiển thị thông báo popup (Toast notifications) giao diện đẹp mắt. |
| `clsx` & `tailwind-merge` | `^2.1.1` / `^3.6.0` | Helper xử lý nối className và giải quyết xung đột class Tailwind CSS. |
| `tw-animate-css` | `^1.3.4` | Thư viện hiệu ứng chuyển động animation tương thích Tailwind v4. |
| `next-themes` | `^0.4.6` | Hỗ trợ chuyển đổi Theme sáng/tối (Light/Dark mode). |

---

### 2.3 DevDependencies (Thư viện Công cụ & Kiểm thử)

#### 🧪 Kiểm Thử (Testing Suite)
- **`vitest` (`^4.1.7`)**: Framework Unit test & Component integration test cực nhanh dựa trên Vite.
- **`@vitest/browser` & `@vitest/browser-playwright` (`^4.1.7`)**: Chạy component test trong môi trường trình duyệt thực thông qua Playwright.
- **`@playwright/test` (`^1.60.0`)**: Framework End-to-End (E2E) test giả lập thao tác người dùng trên trình duyệt.
- **`@chromatic-com/playwright` (`^0.14.2`)**: Tích hợp Playwright kiểm thử giao diện bằng hình ảnh (Visual Regression Testing).
- **`@faker-js/faker` (`^10.4.0`)**: Tạo dữ liệu giả lập (mock data) cho unit test và storybook.

#### 📚 UI Catalog & Documentation
- **`storybook` (`^10.4.1`)**: Môi trường phát triển và kiểm thử độc lập cho các component UI.
- **`@storybook/nextjs-vite`, `@storybook/addon-a11y`, `@storybook/addon-docs`, `@storybook/addon-vitest`**: Các plugin mở rộng cho Storybook (kiểm tra khả năng truy cập a11y, viết tài liệu, tích hợp Vitest).

#### 🛠️ Quality Gates, Linter & Formatter
- **`ultracite` (`^7.7.0`)**: Bộ công cụ hợp nhất linter & formatter chuẩn mực cao.
- **`oxlint` (`^1.66.0`) & `oxlint-tsgolint`**: Linter tốc độ siêu cao viết bằng Rust thay thế ESLint.
- **`oxfmt` (`^0.51.0`)**: Formatter tốc độ cao viết bằng Rust thay thế Prettier.
- **`knip` (`^6.14.2`)**: Tự động phát hiện các file, export và dependency không được sử dụng (dead code).
- **`@lingual/i18n-check` (`^0.9.5`)**: Công cụ kiểm tra tính đồng bộ của các file khoá dịch i18n (`en.json`, `fr.json`).
- **`babel-plugin-react-compiler` (`^1.0.0`)**: Plugin hỗ trợ React Compiler tối ưu memoization.

#### 🔄 Git Hooks, CI/CD & Monitoring
- **`lefthook` (`^2.1.8`)**: Trình quản lý Git Hooks tốc độ nhanh (chạy `pre-commit` linter/check và `commit-msg` commitlint).
- **`@commitlint/cli` & `@commitlint/config-conventional` (`^21.0.1`)**: Ép buộc chuẩn viết commit theo Conventional Commits.
- **`semantic-release` (`^25.0.3`)**: Tự động tạo phiên bản phát hành và changelog từ commit history.
- **`checkly` (`^7.14.0`)**: Monitoring as Code - giám sát uptime và E2E flow trên môi trường production.
- **`@spotlightjs/spotlight` (`^4.11.4`)**: Công cụ overlay hiển thị thông tin Sentry trực tiếp khi phát triển ở local.
- **`@next/bundle-analyzer` (`^16.2.6`)**: Phân tích dung lượng các gói bundle Javascript của Next.js.
- **`cross-env`, `npm-run-all`, `rimraf`**: Utility chạy lệnh cross-platform trên mọi OS.
- **`tailwindcss` & `@tailwindcss/postcss` (`^4.3.0`)**: Engine Tailwind CSS v4.

---

## 3. CẤU TRÚC THƯ MỤC CHI TIẾT & CÔNG DỤNG

### 3.1 Thư Mục Gốc (Root Level)

```
seafood-shop-web/
├── .agents/               # Chứa rules và skills dành cho AI Agent pair programming
├── .github/               # Workflows CI/CD GitHub Actions, dependabot, funding
├── .storybook/            # Cấu hình Storybook sandbox cho UI components
├── .vscode/               # Cấu hình khuyến nghị extension cho VS Code
├── docs/                  # Tài liệu specs kiến trúc, API contract, UI design system
├── migrations/            # Thư mục lưu trữ database migrations (không sửa trực tiếp)
├── public/                # Chứa tài nguyên tĩnh: favicon, hình ảnh minh hoạ, logos
├── src/                   # Mã nguồn chính của ứng dụng
├── tests/                 # Các bài test Integration và E2E Playwright
├── AGENTS.md              # Quy chuẩn bắt buộc cho AI & Developer (Source of Truth)
├── README.md              # Hướng dẫn dự án chung
├── bun.lock / package.json# Khai báo script và quản lý dependencies
├── checkly.config.ts      # Cấu hình giám sát Checkly (Monitoring as Code)
├── commitlint.config.ts   # Cấu hình kiểm tra cú pháp Git commit
├── components.json        # Cấu hình Shadcn UI primitives & alias paths
├── crowdin.yml            # Cấu hình đồng bộ bản dịch với Crowdin
├── knip.config.ts         # Cấu hình quét dead-code knip
├── lefthook.yml           # Cấu hình Git hooks (pre-commit, commit-msg)
├── next.config.ts         # Cấu hình Next.js (Sentry, i18n, Bundle Analyzer, React Compiler)
├── oxfmt.config.ts        # Cấu hình oxfmt code formatter
├── oxlint.config.ts       # Cấu hình oxlint code linter
├── playwright.config.ts   # Cấu hình môi trường E2E testing Playwright
├── tsconfig.json          # Cấu hình TypeScript compiler & path aliases (@/*)
└── vitest.config.ts       # Cấu hình Vitest runner (Unit & UI Browser tests)
```

---

### 3.2 Thư Mục Mã Nguồn `src/`

```
src/
├── app/                       # App Router của Next.js
│   ├── [locale]/              # Route động theo ngôn ngữ (vi, en, fr...)
│   │   ├── (marketing)/       # Route Group cho trang public/marketing
│   │   │   ├── about/         # Trang giới thiệu
│   │   │   ├── portfolio/     # Trang danh mục dự án
│   │   │   ├── products/      # Trang danh sách sản phẩm hải sản (ProductGrid)
│   │   │   ├── layout.tsx     # Navigation Layout chung cho trang marketing
│   │   │   └── page.tsx       # Trang chủ Trang Marketing (Home Page)
│   │   └── layout.tsx         # Root Layout bọc NextIntlClientProvider & DemoBadge
│   ├── api/                   # Local API Routes (nếu có)
│   ├── global-error.tsx       # Bắt lỗi toàn cục của Next.js
│   ├── providers.tsx          # Wrapper TanStack ReactQueryProvider client-side
│   ├── robots.ts              # Tự động tạo file robots.txt chuẩn SEO
│   └── sitemap.ts             # Tự động tạo file sitemap.xml chuẩn SEO
├── components/                # Thành phần UI dùng chung trong ứng dụng
│   ├── ui/                    # Shadcn UI primitives (Button, Card, Dialog, Skeleton, Sonner, Table...)
│   ├── DemoBadge.tsx          # Badge thông tin demo
│   ├── DemoBanner.tsx         # Banner quảng cáo/thông báo demo
│   ├── Hello.tsx              # Component ví dụ
│   ├── LocaleSwitcher.tsx     # Bộ chuyển đổi ngôn ngữ giao diện
│   └── Sponsors.tsx           # Component danh sách nhà tài trợ
├── lib/ & libs/               # Thư viện core & modules tích hợp
│   ├── api/                   # Các hàm gọi API theo từng domain (ví dụ: `products.ts`)
│   ├── ApiClient.ts           # Axios instance có sẵn interceptors xử lý 401 & refresh token
│   ├── Arcjet.ts              # Khởi tạo security Arcjet bot protection
│   ├── Env.ts                 # Validated Environment variables với Zod
│   ├── I18n.ts                # Cấu hình server-side i18n
│   ├── I18nNavigation.ts      # Component Link/Router đa ngôn ngữ
│   ├── I18nRouting.ts         # Cấu hình danh sách locales & default locale
│   └── Logger.ts              # Logger wrapper từ `@logtape/logtape`
├── locales/                   # File chứa chuỗi dịch i18n (en.json, fr.json...)
├── models/                    # Khai báo các mô hình dữ liệu/database (Drizzle ORM)
├── styles/                    # Stylesheet toàn cục (`global.css` chứa Tailwind CSS v4 tokens)
├── templates/                 # Các Layout template mẫu (`BaseTemplate.tsx`, Story, Test)
├── types/                     # Định nghĩa TypeScript Types
│   ├── api.ts                 # Type chuẩn `ApiResponse<T>`, `PageResponse<T>` và `productSchema`
│   └── I18n.ts                # Type cho i18n routing
├── utils/                     # Các hàm helper bổ trợ (`AppConfig.ts`, `Helpers.ts`)
├── validations/               # Chứa các Zod Validation Schema cho Form & Input
├── instrumentation.ts         # Khởi tạo Sentry Server/Edge runtime
├── instrumentation-client.ts  # Khởi tạo Sentry Client runtime
└── proxy.ts                   # Middleware bảo vệ route và xử lý bot detection với Arcjet
```

#### Detailed Purpose of `src/` Folders:
- **`src/app/`**: Chứa toàn bộ các tuyến đường (routes) của dự án theo kiến trúc Next.js 16 App Router. Sử dụng `[locale]` để quản lý đa ngôn ngữ tự động trên URL.
- **`src/components/ui/`**: Chứa các component nguyên bản từ Shadcn UI (Card, Button, Dialog, Sheet, Skeleton...). **Quy tắc**: Không sửa trực tiếp các component này mà bọc/compose ở tầng trên.
- **`src/lib/` & `src/libs/`**: Nơi quản lý hạ tầng ứng dụng: Axios API Client chuẩn 401 refresh flow, Zod Environment, i18n Routing, Logger, Arcjet Security.
- **`src/types/api.ts`**: Chứa các contract chuẩn hoá của API Backend. Mọi API response đều được bọc trong `ApiResponse<T>` hoặc `PageResponse<T>` (phân trang 0-indexed).
- **`src/styles/global.css`**: Nơi cấu hình Tailwind CSS v4, các biến màu sắc HSL/OKLCH token, font chữ và các quy tắc giao diện chung.
- **`src/validations/`**: Nơi tập trung định nghĩa các Zod schema cho form nhập liệu (đăng ký, đăng nhập, gửi OTP, cập nhật giỏ hàng).

---

### 3.3 Thư Mục Kiểm Thử `tests/`

```
tests/
├── e2e/                      # Playwright End-to-End Tests
│   ├── Counter.e2e.ts        # Test luồng tính năng Counter trên trình duyệt
│   ├── I18n.e2e.ts           # Test chuyển đổi ngôn ngữ giao diện
│   ├── Sanity.check.e2e.ts   # Smoke test kiểm tra tình trạng ứng dụng
│   └── Visual.e2e.ts         # Snapshot visual test
├── integration/              # Integration tests cho các luồng xử lý dữ liệu
│   └── Counter.integ.ts
└── ProductGrid.integ.tsx     # Integration test cho danh sách sản phẩm hải sản
```

---

### 3.4 Thư Mục Tài Liệu `docs/`

```
docs/
├── conventions/              # Quy ước lập trình
│   ├── components.md         # Quy tắc thiết kế component
│   ├── data-fetching.md      # Quy tắc gọi dữ liệu với TanStack Query / Axios
│   └── state.md              # Quy tắc quản lý state
└── specs/                    # Thông số kỹ thuật của dự án
    ├── api-contract.md       # Hợp đồng API backend đầy đủ (Endpoints, Response formats)
    ├── constitution.md       # Hiến pháp quy định chất lượng mã nguồn
    ├── design-spec.md        # Hướng dẫn chi tiết UI/UX (Màu sắc, Spacing scale 4-96px, Typography)
    └── features/             # Template thông số kỹ thuật cho các tính năng mới
```

---

### 3.5 Thư Mục AI Agent `.agents/`

```
.agents/
├── rules/                    # Quy tắc ép buộc dành cho AI Assistant (AGENTS.md, project.md)
└── skills/                   # Kỹ năng chuyên biệt cho AI Agent
    ├── api-integration/      # Hướng dẫn gọi backend REST API, Zod parse & refresh token
    ├── hallmark/             # Kỹ năng thiết kế UI chống AI-slop
    ├── testing/              # Kỹ năng viết Unit/Integration/E2E test
    └── ui-ux/                # Kỹ năng thiết kế giao diện hải sản theo design spec
```

---

## 4. CÁC LỆNH SCRIPT & QUY TRÌNH PHÁT TRIỂN

Dự án quy định danh sách các lệnh được phép chạy thông qua `bun run` hoặc `npm run`:

| Script | Lệnh Thực Thi | Công Dụng |
| :--- | :--- | :--- |
| `npm run dev` | `run-p dev:*` | Chạy môi trường phát triển (Next.js dev server + Spotlight overlay). |
| `npm run build-local` | `next build` | Build ứng dụng ở môi trường local để kiểm tra biên dịch. |
| `npm run lint` | `ultracite check --type-aware --type-check` | Quét và phát hiện tất cả lỗi linting & type safety. |
| `npm run lint:fix` | `ultracite fix --type-aware --type-check` | Tự động sửa các lỗi linting và định dạng code. |
| `npm run check:types` | `tsc --noEmit --pretty` | Kiểm tra lỗi kiểu dữ liệu TypeScript toàn dự án. |
| `npm run check:deps` | `knip` | Quét mã nguồn để tìm file/dependency dư thừa không sử dụng. |
| `npm run check:i18n` | `i18n-check ...` | Kiểm tra tính thiếu hụt khoá dịch giữa các file ngôn ngữ. |
| `npm run test` | `vitest run` | Chạy toàn bộ Unit & Component Integration tests. |
| `npm run test:e2e` | `playwright test` | Chạy các kịch bản kiểm thử End-to-End với Playwright. |
| `npm run storybook` | `storybook dev -p 6006` | Khởi chạy môi trường Storybook sandbox tại cổng 6006. |
| `npm run build-storybook`| `storybook build` | Build bản đóng gói static của Storybook. |

---

## 5. QUY CHUẨN KIẾN TRÚC & BẤT BIẾN (ARCHITECTURE RULES)

1. **Chuẩn API Response**:
   - Mọi response từ Backend bắt buộc bọc trong `ApiResponse<T>` (`code`, `message`, `data`, `errors`, `timestamp`).
   - Mọi API danh sách phân trang trả về `PageResponse<T>` với `page` bắt đầu từ `0` (0-indexed).
   - Gọi API Client duy nhất qua `src/libs/ApiClient.ts` (đã có sẵn interceptor tự động bắt 401 và refresh token).

2. **Quản Lý Biến Môi Trường (Env)**:
   - Tất cả biến môi trường bắt buộc khai báo và kiểm tra trong `src/libs/Env.ts`. Không đọc trực tiếp `process.env` trong code component/lib.

3. **Giao Diện & UI Spec**:
   - Sử dụng Tailwind CSS v4 utility classes.
   - Spacing tuân thủ nghiêm ngặt bảng quy chuẩn trong `docs/specs/design-spec.md` (Khoảng cách chuẩn: `4, 8, 12, 16, 24, 32, 48, 64, 96px`). Không dùng kích thước lệch chuẩn (như 18px, 28px).
   - Giao diện tiếng Việt 100% cho người dùng cuối. Định dạng giá tiền chuẩn Việt Nam: `320.000₫`.
   - Tối đa 3 nhóm màu cho mỗi màn hình. Trang có dữ liệu động bắt buộc có đủ 3 trạng thái: Loading (Skeleton), Empty state và Error state.

4. **Kiểm Thử (Testing Conventions)**:
   - File Unit test (`*.test.ts`) nằm cùng thư mục với file mã nguồn.
   - File Integration test (`*.integ.tsx`) và E2E test (`*.e2e.ts`) tập trung tại thư mục `tests/`.

---
*Tài liệu được tổng hợp tự động chính xác theo hiện trạng thực tế của mã nguồn dự án Seafood Shop Web.*
