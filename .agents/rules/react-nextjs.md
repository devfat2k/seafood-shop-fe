# React & Next.js Rules

## Next.js App Router Architecture
- **Docs First**: Always consult `node_modules/next/dist/docs/` for up-to-date Next.js features and conventions.
- **Server & Client Components**: Mark interactive components with `'use client';` at the top line. Keep server components as defaults for data fetching and SEO rendering.
- **Locale Pages**: Page props follow `props: { params: Promise<{ locale: string }> }`. Always `await props.params` and call `setRequestLocale(locale)`.
- **Page Export Naming**: Default export name ends with `Page` (e.g., `HomePage`, `ProductsPage`). Reused props types end with `PageProps`.

## React Guidelines
- **React Compiler Enabled**: Do not manually add `useMemo` or `useCallback` unless specifically required by complex legacy hooks. Avoid unnecessary `useEffect`.
- **Component Props**: Use single `props` parameter with inline types (`props: { title: string }`), accessing via `props.foo`. Use `React.ReactNode` for node types.
- **File Length**: Component files must stay under ~150 lines (excluding imports/types). Split sub-components into separate files when exceeding this threshold.
- **Dynamic Data States**: Components rendering async data MUST support 3 states: Loading (skeleton), Empty (Vietnamese message + illustration), and Error (clear reason + Retry CTA).
