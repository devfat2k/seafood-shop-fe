# Styling & UI Rules

## Tailwind CSS v4 & Design Tokens (UXMagic Frame 6a8031ae52f49148d866f95c)
- **Fixed Spacing Scale**: Use strictly allowed spacing steps: `4, 8, 12, 16, 24, 32, 48, 64, 96px`.
  - Never use arbitrary off-scale values (e.g. `mt-[17px]`, `w-[123px]`) unless accompanied by a technical code comment explaining the necessity.
- **Color Tokens**: Colors must strictly originate from CSS variables/design tokens in `src/styles/global.css`:
  - `bg-background` (`#FBF7F0` Ivory Warm) · `text-foreground` (`#0B4A5C` Ocean Deep)
  - `bg-primary` / `text-primary` (`#FF6B4A` Coral) · `bg-secondary` / `text-secondary` (`#0F7C8C` Ocean Teal)
  - `text-tertiary` (`#2E8B57` Fresh Green) · `text-accent` (`#F4A93B` Amber) · `text-destructive` (`#E4483C` Red)
  - Never hardcode raw hex values in components.
- **Typography**:
  - `font-sans`: Be Vietnam Pro (UI, body, heading H2-H6, button, price)
  - `font-heading`: Fraunces (Hero display headline, Luxury combo sets)
  - `font-mono`: JetBrains Mono (Order codes, dates, metrics)
- **UI Primitives**: Reuse Shadcn components located in `src/components/ui/`. Do not rewrite custom buttons, inputs, cards, or dialogs from raw divs + Tailwind.

## Design Aesthetics & Requirements
- **Formatting**: Currency must be formatted as `xxx.xxx₫` (dot separator for thousands, `₫` suffix attached directly without space, e.g. `320.000₫`).
- **Responsive & Mobile First**: Ensure clean responsive behavior across desktop, tablet, and mobile breakpoints (`sm:`, `md:`, `lg:`).
- **Text & Language**: 100% of user-visible text must be in Vietnamese via `next-intl`.

