# Zoniva

**Smarter delivery zones. Simpler operations.**

Zoniva is a mobile-first delivery management application for creating products, defining circular delivery zones, and accepting orders only at eligible customer locations.

## Project status

**Scaffolded — no features yet, not deployed.** The Vite+ pnpm workspace, `apps/web` (TanStack Start starter, Vercel adapter, TanStack Query), `apps/api` (placeholder Cloudflare Worker), and `packages/db` (Prisma 7 schema/config) exist and build. Contracts, auth, UI, migrations, seed, and all features are still pending.

Verified commands (from the repo root):

```sh
pnpm install
pnpm exec vp check                 # format, lint, type-check
pnpm --filter @zoniva/web dev      # http://localhost:3000
pnpm --filter @zoniva/api dev      # wrangler dev, http://localhost:8787
pnpm --filter @zoniva/db generate  # needs DATABASE_URL (packages/db/.env)
```

Env templates: `apps/web/.env.example`, `apps/api/.dev.vars.example`, `packages/db/.env.example`.

The setup and deployment steps below describe the intended workflow. They are not verified executable instructions for the current repository. Exact package versions, scripts, runtime requirements, and deployment settings must be documented as the applications are scaffolded.

- [PRD.md](./PRD.md): scope, architecture, business rules, and acceptance criteria.
- [DESIGN.md](./DESIGN.md): design system and mobile interaction requirements.
- [AGENTS.md](./AGENTS.md): instructions for coding agents.

## Planned technology stack

| Area | Technology |
| --- | --- |
| Workspace | Vite+ monorepo, pnpm, TypeScript |
| Web | TanStack Start, React, TanStack Router/Query |
| API | oRPC, Cloudflare Workers, Wrangler |
| Validation | Shared oRPC contracts and Zod |
| Database | PostgreSQL, Prisma |
| Authentication | Better Auth |
| UI | shadcn/ui, Tailwind CSS, TanStack Form/Table |
| Maps | shadcn Map and MapSearchControl |
| Tests | Vitest; explicitly requested E2E with Playwright and Google Chrome |
| Hosting | Vercel for web; Cloudflare Workers for API |

## Planned repository structure

```text
apps/web/            TanStack Start frontend and server functions
apps/api/            Worker API, authentication, and business procedures
packages/contracts/ Shared schemas and oRPC contracts
packages/auth/      Better Auth configuration and browser-safe exports
packages/db/        Prisma schema, migrations, client, and seed
packages/ui/        Shared shadcn primitives and theme
e2e/                Playwright tests (root workspace)
assets/             Branding assets (already present)
```

The application/package directories above do not exist yet. The Prisma schema lives at `packages/db/prisma/schema.prisma`. Do not create unused layers merely to match this outline.

## Local setup

### 1. Prerequisites

Before implementation, prepare:

- Git, Node.js, and pnpm versions compatible with the selected Vite+, TanStack Start, and Prisma versions. Pin versions when the workspace is created.
- A development PostgreSQL database, separate from production.
- Vercel and Cloudflare accounts for deployment.
- A supported map style/tile provider and a geocoding provider compatible with MapSearchControl. Verify keys, autocomplete permissions, usage limits, and attribution.
- Google Chrome stable when running explicitly requested E2E tests.

Read the [official documentation references in PRD.md](./PRD.md#31-documentation-first-development) before choosing versions or configuration.

### 2. Install dependencies

First scaffold the workspace and applications according to PRD.md. Once `package.json`, `pnpm-workspace.yaml`, and a lockfile exist, install dependencies from the repository root:

```sh
pnpm install
```

**This command cannot set up the application in the current repository.** No workspace initialization or dev/build scripts are implemented yet.

### 3. Configure the environment

Environment templates are not present yet. Add secret-free templates alongside the applications during scaffolding, using their installed runtimes' supported environment mechanisms. Do not assume local web environment files also configure Worker bindings.

| Consumer | Variables | Purpose |
| --- | --- | --- |
| API | `DATABASE_URL` | PostgreSQL connection, using a Prisma-supported Worker-compatible strategy |
| API | `BETTER_AUTH_SECRET` | Strong server-side authentication secret |
| API | `BETTER_AUTH_URL` | Public authentication base URL for the chosen proxy arrangement |
| API | `WEB_ORIGIN` | Exact allowed frontend origin |
| Web server | `API_BASE_URL` | Trusted API Worker URL; server-only |
| Web browser | `VITE_AUTH_BASE_URL` | Public authentication endpoint; prefer same-origin proxy |
| Seeder | `SEED_USER_EMAIL`, `SEED_USER_PASSWORD` | Development/evaluation credentials |
| E2E | `E2E_BASE_URL` | Running test application URL |

Configure map-provider variables only after selecting the provider. Only publish keys explicitly intended for browser use and apply provider restrictions. Never expose database URLs, authentication secrets, or server credentials through `VITE_*` variables or committed files.

### 4. Prepare the database

Once `packages/db` and the Prisma configuration exist:

1. Review the schema and configure the selected PostgreSQL driver/adapter.
2. Generate Prisma Client using the installed version's supported command.
3. Create and apply development migrations against the development database.
4. Implement and run the configured Prisma seed command.

The seed must be idempotent, use Better Auth-compatible password hashing, and create/reuse only the demo user and credential account—not sample products, zones, or orders. Run migrations and seeding outside Worker request handling. Never reset a valuable database as part of setup.

Migration files and generate/migrate/seed scripts have not been implemented; exact commands remain pending.

### 5. Start local services

After scripts exist, start the API Worker and web application in separate terminals. Configure the web server to reach the local API and expose authentication through the chosen same-origin proxy. Verify cookie forwarding, `Set-Cookie` preservation, trusted origins, login, refresh, and logout.

No dev commands or ports are configured yet. Record the actual commands and URLs here when scaffolding is complete; do not assume example PRD ports are active.

For mobile checks, expose the development web server on the LAN using its supported host option and open it on a real phone. Use a separate development configuration for LAN origins and cookies; do not weaken production settings.

## Application architecture

Business requests follow:

```text
React / route loader → TanStack Start server function
  → request-scoped, server-only oRPC client → Worker procedure → Prisma / PostgreSQL
```

Contracts live in `packages/contracts`. Validate inputs at both server-function and API boundaries. Worker procedures authenticate users and enforce record ownership. The browser must not call business oRPC endpoints directly; Better Auth's supported browser client is the authentication exception.

Order eligibility, product-zone matching, inventory updates, and price calculations remain authoritative on the server. Use transactional, concurrency-safe order creation.

## Deployment

**Neither deployment is configured or verified yet.** Consult the selected versions' current official guides before adding configuration:

- [TanStack Start](https://tanstack.com/start/latest)
- [Vercel](https://vercel.com/docs)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Prisma](https://www.prisma.io/docs)
- [Better Auth](https://www.better-auth.com/docs)

### PostgreSQL

Provision production PostgreSQL with a connection strategy supported by both Prisma and Cloudflare Workers. Verify driver/runtime compatibility and transaction support. Apply reviewed migrations through a trusted CLI/CI environment before releasing dependent code; do not run development reset commands against production. Keep backups and a recovery plan for schema changes.

### API → Cloudflare Workers

1. Implement `apps/api` with oRPC, Better Auth routes, and supported Prisma connectivity.
2. Add Wrangler configuration and independent build/deploy scripts.
3. Configure production bindings/secrets securely, including the database URL and authentication secret. Do not commit secret values in Wrangler configuration.
4. Set the intended frontend origin and authentication URL consistently with the proxy/cookie arrangement.
5. Deploy using the installed Wrangler version's supported workflow and record the Worker URL.
6. Verify authenticated requests, ownership enforcement, database access, and transactional order creation without exposing internal errors.

### Web → Vercel

1. Implement `apps/web` using a supported TanStack Start/Vercel deployment configuration.
2. Connect the repository and configure workspace installation, the web build, and output settings according to that integration. Do not guess an output directory or treat the app as static-only.
3. Configure server-only `API_BASE_URL` and the public authentication endpoint, plus any approved public map-provider configuration.
4. Implement the same-origin `/api/auth/*` proxy to the Worker, preserving cookies and all `Set-Cookie` headers correctly.
5. Deploy, then verify HTTPS, SSR, direct route access, server functions, login/session persistence, and logout.
6. Verify production map search, attribution, provider origin restrictions, and the mobile workflows in DESIGN.md.

Build each application independently. Use separate preview/staging database and authentication configuration; do not point destructive tests at production.

## Testing

Test scripts and test suites are not present yet. Add focused Vitest coverage as features are implemented, prioritizing coordinates, geographical boundaries, product-zone eligibility, ownership, inventory concurrency, and order totals.

Run Playwright E2E only when explicitly requested, with Google Chrome stable and isolated test data. Cover authentication, products, zones, orders, and navigation on desktop/mobile viewports. Mock geocoding when appropriate.

Native-feeling mobile acceptance also requires real iOS Safari and Android Chrome checks: safe areas, keyboard behavior, touch feedback, inner-container scroll restoration, bottom navigation/drawers, and full-screen map confirmation. Emulation alone does not verify these behaviors.

## Demo and release information

| Item | Status |
| --- | --- |
| Live web URL | Not deployed |
| API Worker URL | Not deployed |
| Demo account | Planned default: `demo@delivery.test`; not seeded |
| Demo password | Set via `SEED_USER_PASSWORD` and share securely; never publish here |
| Challenge start date/time/timezone | Not recorded |
| AI assistance used so far | Coding assistant for requirements and repository documentation; no generated application implementation yet |

Replace pending setup/deployment instructions with tested commands and record verified release details as implementation progresses.
