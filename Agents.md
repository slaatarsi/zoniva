# Zoniva — Agent Instructions

## Read before working

- [PRD.md](./PRD.md) — product scope, workflows, business rules, architecture, and testing/deployment requirements.
- [DESIGN.md](./DESIGN.md) — visual system, components, responsive behavior, accessibility, and interaction requirements.

Read both before implementing features or changing UI. Follow their relevant cross-references and verify installed component APIs rather than inventing props or configuration. The PRD governs product behavior and server integrity; DESIGN.md governs presentation and interaction. If requirements conflict or are unclear, ask before implementing.

## Implementation rules

- Build the smallest complete solution within MVP scope. Reuse existing code and installed dependencies; do not generate unused layers or add unrequested features.
- Follow the feature-based monorepo architecture in PRD.md. Keep route files thin, shared UI in `@zoniva/ui`, and business logic in its owning feature.
- Use the documented server-function → server-only oRPC → API flow. Keep authorization, geographical validation, price calculations, and inventory integrity authoritative on the server.
- Validate trust boundaries, protect secrets, preserve user input on errors, and maintain accessible loading, empty, error, and pending states.
- Use focused Vitest checks during feature development. Run Playwright E2E only when explicitly requested. Never run destructive tests against valuable production data.

## Mobile requirements

Treat native-feeling mobile behavior as a core requirement, not optional polish. Follow the complete specifications in PRD.md sections 12.3 and 18, and DESIGN.md's mobile shell, map picker, and native-feeling experience sections.

- Use bottom navigation in its own app-shell row, with independently scrolling page content; never overlap content. Retain the official shadcn Sidebar on desktop/tablet.
- Parent navigation items open related children in a bottom drawer. Move mobile footer/account content into the drawer's bottom section; do not invent child routes.
- Zone/customer location selection uses a full-screen mobile map with a stationary center pin, top search/exit controls, and bottom confirmation. Panning/search changes a draft; confirmation commits the current center into read-only form inputs. Exit preserves the prior selection.
- Preserve form state and scroll continuity, provide immediate touch feedback, respect safe areas and the software keyboard, and honor reduced motion and browser zoom.
- Real-phone verification is required before claiming native-feeling behavior is verified. Clearly report untested hardware behavior.

## Completion

Keep PRD.md and DESIGN.md consistent when requirements change. Report changed files, checks performed, and remaining risks or unverified behavior. Do not claim specifications alone are implemented functionality.
