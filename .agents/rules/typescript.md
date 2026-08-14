# TypeScript Rules & Conventions

## Strict Mode & Safety
- **Strict Typing Everywhere**: Never use `any`. Use `unknown` with type narrowing, generic constraints, or Zod schemas.
- **Explicit Inferences**: Let TypeScript infer return types for simple internal functions, but explicitly annotate exported signatures when clarity or public contracts require it.
- **Type-only Imports for Zod**: Always use `import type * as z from 'zod';` by default. Runtime Zod validation in `src/types/api.ts` or `src/validations/` uses `import * as z from 'zod'`.

## Data Models & API Contracts
- All backend responses wrap in `ApiResponse<T>`.
- Paginated lists return `PageResponse<T>` with `0-indexed` page numbers.
- Reuse types defined in `src/types/api.ts` and domain type files.
