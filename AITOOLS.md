# AI Tools Used

## Coding agent

- **Tool:** [pi](https://github.com/earendil-works/pi-coding-agent) coding agent (CLI)
- **Model:** Anthropic Claude (`claude-opus-5-5`)

**What it did:**

- Read `PRD.md`, `DESIGN.md` and `Agents.md` and implemented them in phases:
  - the Vite+ monorepo scaffold
  - Prisma schema, migration and seed
  - shared Zod/oRPC contracts
  - Better Auth setup
  - the oRPC Cloudflare Worker API
  - the TanStack Start web app (auth, app shell, Products, Delivery Zones, Orders, Dashboard)
- Checked library APIs against the installed package types and docs before using them, including oRPC v1, Better Auth, TanStack Start, Router, Form and Table v9, and the shadcn Map.
- Ran checks (`tsc`, `vp check`, Vitest, `vp build`) and fixed the problems they found, such as Leaflet crashing during server rendering and hydration mismatches.
- Wrote commit messages and ran git commits and pushes when asked.

**Skills it used:**

- The project skills in `.agents/skills`:
  - `create-project-features`
  - `create-project-forms`
  - `tanstack-table-datatables`
- General skills:
  - `shadcn`
  - `mobile-native`
  - `ponytail` (aim for the smallest complete change)

## Supporting tools

- **Playwright MCP (Chrome):**
  - Clicked through the login, zone, product and order flows against the local Worker and Postgres.
  - Checked the mobile layout at 390×844.
- **shadcn CLI / registries:** installed the UI primitives and the Map component into `@zoniva/ui`.
- **context-mode MCP:** searched and summarized large docs and logs without loading them all into the agent's context.

## Human oversight

- A developer wrote the requirements (PRD and design spec) and chose the architecture.
- The developer directed each step and reviewed the output.
- The AI's browser tests covered desktop and emulated mobile only.
- Real-phone checks of native-feeling behavior are still a manual step.
