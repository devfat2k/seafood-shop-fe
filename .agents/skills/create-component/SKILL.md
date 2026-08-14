---
name: create-component
description: Standard workflow for creating reusable React UI components in the Seafood Shop web application.
---

# Create Component Skill

Use this workflow to create a standard, compliant React component.

## Step-by-Step Instructions

1. **Location & Design Check**:
   - Determine target directory in `src/components/<domain>/`.
   - Check if an existing primitive in `src/components/ui/` can be reused.

2. **Component File Creation**:
   - Limit file length to under ~150 lines.
   - Use named export only (no default export unless Next.js page).
   - Use single `props` parameter with inline type.
   - Ensure user-visible strings use `next-intl`.

3. **Handle Dynamic Data States (if dynamic)**:
   - Implement **Loading** state (Skeleton).
   - Implement **Empty** state (Vietnamese copy + illustration).
   - Implement **Error** state (clear error message + retry action).

4. **Verify Quality**:
   - Run `bun run check:types` and `bun run lint`.
