# Styling & UI Rules

## Tailwind CSS v4 & Design Tokens
- **Fixed Spacing Scale**: Use strictly allowed spacing steps: `4, 8, 12, 16, 24, 32, 48, 64, 96px`.
  - Never use arbitrary off-scale values (e.g. `mt-[17px]`, `w-[123px]`) unless accompanied by a technical code comment explaining the necessity.
- **Color Tokens**: Max 3 color groups per screen. Colors must originate from CSS variables/design tokens in `src/styles/global.css`. Never hardcode raw hex values in components.
- **UI Primitives**: Reuse Shadcn components located in `src/components/ui/`. Do not rewrite custom buttons, inputs, cards, or dialogs from raw divs + Tailwind. Compose above `src/components/ui/`.

## Design Aesthetics & Requirements
- **Formatting**: Currency must be formatted as `xxx.xxx₫` (dot separator for thousands, `₫` suffix attached directly without space, e.g. `320.000₫`).
- **Responsive & Mobile First**: Ensure clean responsive behavior across desktop, tablet, and mobile breakpoints (`sm:`, `md:`, `lg:`).
- **Text & Language**: 100% of user-visible text must be in Vietnamese via `next-intl`.
