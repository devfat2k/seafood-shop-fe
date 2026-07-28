# Next.js: ALWAYS read docs before coding
Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

# AGENTS

## Principles
- Clarity and consistency over cleverness. Minimal changes. Match existing patterns.
- Keep components/functions short; break down when it improves structure.
- TypeScript everywhere; no `any` unless isolated and necessary.
- No unnecessary `try/catch`. Avoid casting; use narrowing.
- Named exports only (no default exports, except Next.js pages).
- Absolute imports via `@/` unless same directory.
- Follow existing ESLint setup; don't reformat unrelated code.
- Zod type-only by default: `import type * as z from 'zod';`. Exception: runtime API-response validation in `src/types/api.ts` uses `import * as z from 'zod'` with `.safeParse`.
- Let compiler infer return types unless annotation adds clarity.
- Options object for 3+ params, optional flags, or ambiguous args.
- Hypothesis-driven debugging: 1-3 causes, validate most likely first.

## Token efficiency
- Skip recaps unless the result is ambiguous or you need more input.

## Commands
Only these `bun run` scripts: `build-local`, `lint`, `check:types`, `check:deps`, `check:i18n`, `test`, `test:e2e`.

## Git Commits
Conventional Commits: `type: summary` without scope. The summary should be a short, specific sentence that explains what changed and where or why, not a vague phrase. Types: `feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert`. `BREAKING CHANGE:` footer when needed.

## Env
All env vars validated in `Env.ts`; never read `process.env` directly.

## Backend API (đọc trước khi gọi API)
Contract đầy đủ ở `docs/specs/api-contract.md`. Quy tắc bất biến:
- Mọi response bọc trong `ApiResponse<T>`.
- API list trả `PageResponse<T>`; `page` là 0-indexed.
- Base URL local: `http://localhost:8085`. Prefix: `/api/v1`.
- Gọi API client dùng instance ở `src/libs/ApiClient.ts` (đã có interceptor 401 → refresh). KHÔNG tự tạo axios instance mới.

## Styling
Tailwind v4 utility classes. Reuse shared components. Responsive. No unnecessary classes.

## UI Spec
- Full design spec in `docs/specs/design-spec.md`; follow it for every screen.
- Spacing comes from the fixed table in the spec; never estimate off-scale values (no 18/28/52px). Scale: 4·8·12·16·24·32·48·64·96.
- Max 3 color groups per screen; accent never fills large areas. Never use colors outside the design tokens.
- No full-page dark mode. User-visible text is 100% Vietnamese; prices formatted like `320.000₫`.
- Every screen with dynamic data has loading (skeleton, not spinner), empty, and error states.


## React
- No `useMemo`/`useCallback` (React compiler handles it). Avoid `useEffect`.
- Single `props` param with inline type; access as `props.foo` (no destructuring).
- Use `React.ReactNode`, not `ReactNode`.
- Inline short event handlers; extract only when complex.

## Pages
- Default export name ends with `Page`. Props alias (if reused) ends with `PageProps`.
- Locale pages: `props: { params: Promise<{ locale: string }> }` → `await props.params` → `setRequestLocale(locale)`.
- Escape glob chars in shell commands for Next.js paths.
- Dashboard pages (sit behind auth); define meta once in layout, not in each page.

## i18n (next-intl)
- Never hard-code user-visible strings. Page namespaces end with `Page`.
- Server: `getTranslations`; Client: `useTranslations`.
- Context-specific keys (`card_title`, `meta_description`). Use `t.rich(...)` for markup.
- Use sentence case for translations.
- Error messages: short, no "try again" variants.

## JSDoc
- Start each block with `/**` directly above the symbol.
- Short, sentence-case, present-tense description of intent.
- Order: description → `@param` → `@returns` → `@throws` (only if it can throw).

## Tests
- `*.test.ts` for unit tests; `*.integ.ts` for integration tests; `*.e2e.ts` for Playwright tests.
- `*.test.ts` co-located with implementation; `*.integ.ts` and `*.e2e.ts` in `tests/` directory.
- Top `describe` = subject; nested `describe` to group scenarios or contexts.
- `it` titles: short, third-person present, `verb + object + context`. Sentence case, no period.
- Omit "should/works/handles/checks/validates". State what, not how.
- Avoid mocking unless necessary.

## Boundaries
- Never commit `.env` hoặc secrets.
- Never hardcode màu ngoài design token.
- Never sửa trực tiếp file trong `src/components/ui/` (Shadcn primitives) — compose ở tầng trên.
- Never sửa `migrations/`.