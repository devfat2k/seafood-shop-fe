---
name: create-api-hook
description: Standard workflow for creating custom React Query hooks for API integration.
---

# Create API Hook Skill

Use this workflow to build TanStack Query hooks consuming backend REST endpoints.

## Step-by-Step Instructions

1. **Verify Backend Contract**:
   - Check `docs/specs/api-contract.md` or OpenAPI specs for exact request/response types.
   - Response shapes wrap in `ApiResponse<T>` or `PageResponse<T>`.

2. **ApiClient Request**:
   - Use `src/libs/ApiClient.ts` instance for all HTTP methods (`get`, `post`, `put`, `delete`).

3. **Define Query / Mutation Hook**:
   - Return clean TanStack Query result wrapper.
   - Validate incoming payloads using Zod schemas when runtime safety is required.

4. **Verify Types**:
   - Run `bun run check:types`.
