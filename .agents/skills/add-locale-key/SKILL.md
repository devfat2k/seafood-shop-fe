---
name: add-locale-key
description: Standard workflow for safely adding new i18n translation keys across all supported locales.
---

# Add Locale Key Skill

Use this workflow to add new internationalization keys without missing translations in localized files.

## Step-by-Step Instructions

1. **Locate Target Namespace**:
   - Check `src/locales/vi.json` and `src/locales/en.json`.
   - Identify or create namespace (page namespaces end with `Page`).

2. **Add Translation Strings**:
   - Add sentence-case text in `vi.json` and matching translation in `en.json`.
   - Use `t.rich(...)` format for tags or dynamic variables.

3. **Verify Integrity**:
   - Run `bun run check:i18n`.
