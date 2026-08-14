# Testing Rules & Quality Gates

## Testing Frameworks & Conventions
- **Vitest & Playwright**: Use Vitest for unit (`*.test.ts`) and integration (`*.integ.ts`) tests. Use Playwright for E2E user flows (`*.e2e.ts`).
- **Co-location**: Place unit tests co-located next to implementation files. Place integration and E2E tests in the `tests/` directory.
- **Naming & Style**: Test descriptions use short, third-person present tense (`verb + object + context`). Omit "should/works/handles". Avoid excessive mocking unless dealing with external networks.

## Quality Gate Mandatory Commands
Before marking any task as complete or submitting code, you MUST run:
```bash
bun run check:types
bun run lint
```
For core hooks or state utilities, also run `bun run test`.
Never suppress TypeScript errors with `@ts-ignore` or `any`.
