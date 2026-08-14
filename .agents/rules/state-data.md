# State & Data Fetching Rules

## Backend API Integration
- **Centralized Client**: All API requests must use `src/libs/ApiClient.ts` (configured with automatic 401 JWT refresh interceptor). Do NOT create standalone `fetch()` or `axios` instances.
- **Base URL & Prefix**: Local Base URL is `http://localhost:8085` with prefix `/api/v1`.
- **Response Contracts**: Responses map to `ApiResponse<T>` or `PageResponse<T>` (`page` is 0-indexed).
- **Environment Variables**: Access environment variables strictly via `src/libs/Env.ts`. Never read `process.env` directly in components or pages.

## Data Fetching & Caching
- **TanStack Query**: Use TanStack Query (`useQuery`, `useMutation`) for async server state management. Do NOT manually fetch with `useEffect` + `useState`.
- **Validation**: Validate API parameters and responses with Zod schemas defined in `src/validations/` or `src/types/api.ts`.
