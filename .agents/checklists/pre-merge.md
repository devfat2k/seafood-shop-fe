# Pre-Merge Checklist

Before committing code or merging pull requests:

- [ ] Execute `bun run check:types` - must pass with 0 errors.
- [ ] Execute `bun run lint` - must pass with 0 errors/warnings.
- [ ] Execute `bun run test` - all unit & integration tests pass.
- [ ] Verify 3 dynamic states (Loading, Empty, Error) for updated screens.
- [ ] Confirm no hardcoded hex colors or arbitrary spacing classes.
- [ ] Confirm user-visible strings use `next-intl` (Vietnamese default).
- [ ] Verify currency formatting follows `320.000₫` format.
