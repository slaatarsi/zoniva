---
name: create-project-features
description: 'Project-specific guidance for feature modules in apps/web: thin routes, feature UI, TanStack Start server functions calling the oRPC API Worker, shared contract schemas, and TanStack Query integration.'
---

# Create Project Features

Use this skill when creating, reviewing, or modifying a feature in this project.

## Project boundaries

Read `PRD.md` for scope; development currently targets Phase 1. Read `DESIGN.md` before creating or changing UI, styles, layouts, or interactions. Follow repository instructions and applicable UI skills, and reuse `@my/ui` components.

This is a workspace with independently deployable web and API Workers:

- `apps/web`: TanStack Start routes, UI, server functions, and server-side API orchestration.
- `apps/api`: oRPC procedures, authentication/authorization, business logic, and database access.
- `packages/contracts`: browser-safe oRPC contracts, Zod schemas, and public types.
- `packages/auth` and `packages/db`: backend implementation; do not import these into the web app.
- `packages/ui`: shared UI components and design tokens.

Use this data flow for feature reads and mutations:

```text
UI / route loader
  → TanStack Start server function
  → server-only oRPC client
  → API Worker procedure
  → Prisma
```

Do not call the oRPC API directly from feature UI, query functions running in the browser, or route loaders. Loaders must call server functions because loaders can also execute in the browser.

Server functions are callable network endpoints, not an authorization boundary by themselves. The API must independently validate input, authenticate callers, and enforce permissions on every protected operation. Adding server functions does not make the API private.

## Feature structure

```text
apps/web/src/components/features/<feature>/
├── index.ts
├── server/
│   ├── <feature>.functions.ts
│   └── <feature>.server.ts
├── <feature>.queries.ts
└── ui/
    └── <component-name>.tsx
```

- Keep routes thin: route configuration, loader integration, and rendering the public feature component.
- Export only the public UI, server functions, and query options needed by callers from `index.ts`.
- Never export server-only implementations from a browser-consumed barrel.
- Use relative imports inside a feature and public exports for cross-feature imports. Follow the project's existing import conventions; do not introduce aliases solely for this structure.
- Use kebab-case filenames and PascalCase component names.
- Omit unused layers. A UI-only feature needs no server directory; add query options only when caching/invalidation is useful.
- Do not create generic repositories, service layers, or CRUD factories for simple procedure calls.

As API procedures and contracts grow, split by feature where useful:

```text
apps/api/src/features/<feature>/<feature>.router.ts
packages/contracts/src/<feature>.ts
```

Keep the root API router and contract exports as composition points. Preserve shared middleware and contract typing when splitting. Do not split small files merely to match the example tree.

## Server functions

Put exported `createServerFn` endpoints in `server/<feature>.functions.ts`.

- Use the `Fn` suffix for new exports, such as `listProjectsFn` and `createProjectFn`.
- Use GET for side-effect-free reads and POST for mutations.
- Validate all user-controlled input at the server-function boundary using shared Zod schemas from `@my/contracts` and the installed TanStack Start validation API (`.inputValidator(...)`). Do not use a TypeScript cast or identity validator as runtime validation.
- Keep handlers thin: delegate to the feature's server-only implementation.
- Return only the data the feature needs. Never return sessions, credentials, database clients, or internal errors.
- Preserve `Cache-Control: private, no-store` for authenticated or otherwise private responses.
- Use TanStack Router navigation/redirect conventions where appropriate. Keep business decisions and authorization in the API, not in route redirects.

## Server-only oRPC implementation

Put feature-specific API orchestration in `server/<feature>.server.ts`.

- Enforce the server-only import boundary with the supported mechanism for the installed TanStack Start version. A `.server.ts` filename alone is not sufficient evidence that imports are protected.
- Reuse one shared server-only client helper, preferably `apps/web/src/lib/api.server.ts`, instead of repeating cookie/header handling per feature.
- Create a client for the current request using the existing typed `createApiClient` pattern. Forward the incoming cookie only to the configured trusted API origin.
- Read request headers on the server; never accept a session cookie, role, or authentication headers as function input.
- Do not store request cookies, sessions, or request-bound clients in global mutable state.
- Do not forward arbitrary incoming headers or accept an API target URL from user input.
- Do not import Prisma, database factories, or Better Auth server implementation into the web app.
- Do not duplicate API business logic here. This layer exists for transport and web-specific orchestration.
- Distinguish an expired session from API/network failure. Preserve safe, useful errors without exposing SQL, tokens, secrets, or stack traces.

The existing `apps/web/src/lib/session.ts` demonstrates server-function cookie forwarding. Reuse and consolidate that behavior when implementing features; do not assume the proposed helper or feature directories already exist.

## Contracts and API procedures

Treat `@my/contracts` as the shared source of truth for request/response schemas and public types.

- Export reusable input schemas alongside their procedures rather than duplicating validation rules in web wrappers.
- Retain API input validation even when the server function already validates the same schema: the API is independently callable.
- Keep contract modules browser-safe; never import backend implementations into them.
- Keep API responses explicit and minimal. Preserve output validation/contracts when moving procedures.
- Authenticate and authorize inside API middleware/procedures on every protected call.
- Derive ownership from the authenticated session, not a user ID supplied by the caller.
- Scope database reads and writes by ownership; enforce admin permissions on admin procedures.
- Preserve validation, error handling, list limits, and security checks when reorganizing existing code.
- Keep contracts compatible across independently deployed web/API versions.

## TanStack Query and route loaders

Keep TanStack Query for cached server state. Replacing browser oRPC calls does not require replacing Query.

- Put stable query keys and reusable query options in `<feature>.queries.ts` when needed.
- Query functions must call feature server functions, not a browser oRPC client.
- Share those options between loaders and components so initial reads, refetches, and invalidation use the same key and transport.
- Use the existing request-scoped router QueryClient; do not introduce a global SSR cache.
- Wire mutations to server functions, using `useServerFn` where its framework-aware behavior is needed. Keep hooks inside components/custom hooks, not module-level query factories.
- Invalidate the affected feature queries after successful mutations and preserve pending/error feedback.
- Do not maintain a second local copy of server data or create custom loading infrastructure unnecessarily.
- Remove browser oRPC router context/utilities only after checking every consumer and migrating remaining callers.

## UI and forms

- Follow `DESIGN.md` and reuse `@my/ui` primitives, accessible labels, error feedback, and submission states.
- Preserve the current form conventions unless the task explicitly calls for changing them.
- Do not assume the other project's `useAppForm`, form field registry, localization files, or import aliases exist here.
- Reuse shared contract validation where applicable; client validation improves feedback but never replaces server validation.
- Disable duplicate submissions and preserve actionable failure feedback.
- Only introduce a shared form control when an actual feature needs it.

## Authentication exception

Leave the existing Better Auth browser client and auth endpoints unchanged during a feature data-access migration unless authentication transport is explicitly in scope.

Proxying sign-in/sign-out requires deliberate `Set-Cookie` propagation and verification across deployed origins. Do not treat it as an ordinary oRPC wrapper or assume forwarding request cookies also propagates response cookies.

## Migration approach

Migrate one complete feature at a time, starting with projects as the reference implementation:

1. Read its routes, components, contracts, procedures, and tests; identify all callers.
2. Move its UI into the feature folder without redesigning it.
3. Add server functions and server-only oRPC delegation for every read and mutation.
4. Reuse contract schemas for server-function validation.
5. Update query options, loaders, mutations, refetches, invalidation, and public exports together.
6. Remove obsolete feature wrappers/imports only after checking remaining consumers.
7. Apply the proven pattern to admin users and later Phase 1 features.

Do not add Phase 2–4 functionality while organizing Phase 1 features.

## Verification checklist

- Routes and browser code cannot import server-only implementations.
- Feature reads, refetches, and mutations all use server functions.
- Missing/expired sessions, unauthorized ownership, and non-admin access remain rejected by the API.
- Invalid inputs are rejected at both callable boundaries.
- Private responses remain non-cacheable; cookies are not leaked or shared across requests.
- Query invalidation still refreshes the intended data; API failures are not reported as anonymous sessions.
- Add or update focused tests for non-trivial logic and security-sensitive behavior. Use the existing Vitest setup; never use Playwright in this project.
- Run the narrowest useful checks, then `pnpm check` and relevant web/API builds when practical. Report what was not checked.
