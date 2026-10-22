---
name: tanstack-table-datatables
description: 'Build and review feature data tables with TanStack Table, @my/ui primitives, typed columns, accessible controls, RTL-safe layouts, and server-function-to-oRPC data access.'
---

# TanStack Table Data Tables

Use this skill when creating, reviewing, or modifying interactive data tables, sortable/filterable grids, selectable tables, and table-like admin workflows.

## Scope and project conventions

Read `PRD.md` for Phase 1 scope and `DESIGN.md` before changing UI. Follow the local `create-project-features`, `create-project-forms`, and `rtl-ltr-safe-tailwind-ui` skills where applicable.

- Use the installed `@tanstack/react-table` for interactive table state and row models.
- Render semantic table markup with primitives from `@my/ui`.
- Use TanStack Query and feature server functions for remote data.
- Keep API authorization, business logic, and Prisma access in `apps/api`.
- Keep schemas and public response types in `@my/contracts`.

This skill does not authorize installing dependencies, building generic infrastructure, or migrating existing tables unless the task requests it. Inspect current implementations and installed APIs first. Do not assume dropdown, checkbox, skeleton, or other controls already exist in `@my/ui`.

A simple read-only table can use existing semantic table primitives without introducing interactive machinery. Non-tabular lists, directories, and experience cards do not need TanStack Table merely because they display multiple records.

## Feature organization

```text
apps/web/src/components/features/<feature>/
├── <feature>.queries.ts
├── server/
│   ├── <feature>.functions.ts
│   └── <feature>.server.ts
└── ui/
    ├── <feature>-table.tsx
    ├── columns.tsx
    ├── <feature>-table-toolbar.tsx
    └── <feature>-table-pagination.tsx
```

Only create files the feature needs. Small column definitions may stay in the table component. Extract generic helpers only after genuine reuse appears, keeping business logic and feature copy out of shared helpers.

## Table setup and rendering

Use typed `ColumnDef<Row>` definitions, `useReactTable`, and `getCoreRowModel`. Add other row models only for enabled client-side features.

```tsx
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import type { Project } from "@my/contracts";

const columns: ColumnDef<Project>[] = [
  { accessorKey: "name", header: "Project" },
];

// Inside the feature component:
const table = useReactTable({
  data,
  columns,
  getRowId: (row) => row.id,
  getCoreRowModel: getCoreRowModel(),
});
```

Render header groups, visible cells, and rows from the table instance:

- `table.getHeaderGroups()` for headers.
- Skip placeholder header content; otherwise use `flexRender`.
- `table.getRowModel().rows` for the active row model.
- `row.getVisibleCells()` and `flexRender` for body cells.
- Stable header, row, and cell IDs as React keys.
- `table.getVisibleLeafColumns().length` for full-width loading/empty/error cells, not the original column-array length. Keep at least one column visible or account for that edge case explicitly.

Keep data and columns referentially stable where practical. Avoid repeatedly creating fallback arrays or copying query results just to feed the table. Do not duplicate server data in local state.

## Columns and row identity

- Use `accessorKey` for direct properties and `accessorFn` for derived values.
- Give derived/display/action columns stable IDs where required.
- Use `row.original` when a cell needs the full record.
- Set `getRowId` from a stable record ID, especially for selection, mutations, and remote pagination. Do not use page indexes as persistent record identity.
- Disable sorting/filtering for action, selection, and decorative columns.
- Keep raw comparable values as accessors and format their display in cells.
- Use the existing date/currency conventions and explicit locale/time-zone policy where needed; avoid SSR/client formatting mismatches.
- Never rely on hidden columns or disabled buttons for data security. The API must omit sensitive fields and enforce permissions independently.

## Sorting, filtering, and pagination

Use TanStack Table state and APIs, not parallel ad-hoc sorting or filtering implementations.

### Client-side mode

For a complete, bounded dataset, add the corresponding row models as needed:

- `getSortedRowModel()` for client sorting.
- `getFilteredRowModel()` for client filtering/search.
- `getPaginationRowModel()` for client pagination.

Expose controls for enabled features. Do not enable default pagination without a way to reach the remaining rows. Do not add sorting/filtering merely because the library supports it.

### Remote mode

For growing datasets, perform pagination, filtering, and sorting in the API. Control the corresponding table state and enable only the relevant manual flags:

```tsx
manualPagination: true,
manualSorting: true,
manualFiltering: true,
```

- Match the actual API pagination model: offset/page and cursor pagination are not interchangeable.
- Provide accurate `rowCount` or `pageCount` when available, following the installed library API.
- For unknown totals or cursor pagination, derive next-page availability from the response; do not invent a total or enable navigation into nonexistent pages.
- Do not apply client sorting/filtering only to the loaded page while presenting it as dataset-wide behavior.
- Reset pagination/cursors appropriately when filters, sorting, or page size change, particularly in manual mode.
- Whitelist sortable/filterable fields, constrain page sizes, and validate inputs with shared Zod schemas. Never pass arbitrary client field names into database queries.
- Use deterministic server ordering with a stable tie-breaker for pagination.
- Persist validated state in route search params only when shareable/bookmarkable state is useful.

The current project API limits project and admin-user lists to the latest 100 records. Client search/sorting/pagination over those responses covers only that subset. Label the limit honestly; implement an API contract/procedure change before claiming full-dataset operations.

## Remote data boundary

```text
Table / route loader
  → feature query options
  → TanStack Start server function
  → server-only oRPC client
  → API validation and authorization
  → database
```

- Reuse feature query options between loaders and components.
- Include all result-affecting pagination, sorting, and filter values in query keys.
- Use the existing request-scoped QueryClient; never introduce a global SSR cache.
- Do not fetch all records merely to paginate a potentially unbounded dataset.
- Distinguish initial loading, background refresh, and failure. Do not display stale rows as if they belong to a newly requested page without an explicit loading treatment.
- Submit row/bulk mutations through feature server functions and invalidate affected queries after success.
- Preserve private response caching rules and safe errors.
- Keep authentication, admin checks, ownership, and deletion validation authoritative in the API.

## Row actions and pinning

- Use a display column with `id: "actions"` when needed.
- Use real buttons, descriptive accessible labels, and clear pending states.
- Use a single accessible dropdown trigger when multiple actions would otherwise clutter rows, provided the workflow and available primitives justify it.
- Do not introduce a dropdown dependency solely to enforce a blanket rule; a small number of clear inline actions may be appropriate.
- Confirm destructive actions according to existing project conventions and preserve recovery/error feedback.
- Add sticky/pinned actions only when horizontal scrolling and the workflow benefit from them.
- Pin actions to the logical end, not unconditionally to the physical right. Verify how TanStack pinning's physical left/right state maps to the active direction before styling.
- Account for column widths, sticky offsets, header/body alignment, background, stacking, and multiple pinned columns. An `end-0` class alone is not a complete multi-column pinning implementation.

## Selection and bulk actions

Use TanStack row-selection state and existing accessible checkbox primitives when available.

- Set stable record IDs with `getRowId`.
- Label row and header checkboxes and represent the partially selected state correctly.
- Use page-selection APIs such as `toggleAllPageRowsSelected` when the control means “select this page.” State that scope visibly/accessibly.
- Do not call a page-level selection “select all results.” Dataset-wide selection requires an explicit API contract and selection model.
- Under manual pagination, selected row models only describe loaded rows. Cross-page selected IDs can remain in selection state, but `getFilteredSelectedRowModel().rows` does not enumerate all selected records.
- Define whether selection survives page/filter changes. Clear or reconcile it deliberately after mutations and when the relevant scope changes.
- Validate all bulk-action IDs and permissions on the server, even for previously displayed rows. Handle partial failure explicitly if the API supports it.
- Do not add selection or bulk actions until requested by the workflow.

## Visibility, responsive layout, and RTL

- Use TanStack column visibility state only if users need configurable columns.
- Keep essential workflow information reachable on mobile; prefer the existing table wrapper's horizontal overflow for dense tables.
- Use logical spacing and alignment: `ps-*`, `pe-*`, `text-start`, and `text-end`.
- Align numeric values consistently at the logical end and isolate mixed-direction values where appropriate.
- Mirror or swap reading-direction pagination arrows; do not mirror data, charts, maps, or brand icons.
- Preserve DOM/tab order and verify dropdown/portal direction behavior.
- Follow `DESIGN.md`; do not wrap every table in nested cards or add oversized marketing UI around admin workflows.

## Loading, empty, error, and accessibility states

Every remote table must account for:

- Initial loading with compact progress feedback or existing skeleton components.
- An empty dataset versus no matching filter results, with suitable guidance.
- Request failure with a safe message and retry where appropriate.
- Background refresh and mutation pending states without unnecessary loss of usable data.

Preserve semantic `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, and `TableCell` structure. Provide a meaningful caption or accessible table name. Use appropriate header scopes, including grouped headers when present.

Use buttons for sortable headers and expose active sorting through `aria-sort` on the relevant header. Icon-only controls and checkboxes need accessible names. Preserve keyboard navigation and visible focus. Do not add ARIA grid semantics to an ordinary table without implementing the required interaction model.

## Verification checklist

- Typed columns, stable row IDs, and correct `flexRender` usage.
- Existing `@my/ui` primitives and design tokens reused.
- No unnecessary sorting, pagination, selection, pinning, or generic helpers.
- Client versus remote behavior matches the actual dataset and API contract.
- Query keys include every result-affecting input.
- Pagination resets and next-page/total handling are correct.
- Loading/empty/error rows span the visible columns.
- Row actions, selection scope, and destructive behavior are accessible and explicit.
- Mobile overflow, RTL positioning, and directional icons are reviewed.
- API input validation, ownership, admin checks, and private-data boundaries remain intact.
- Tests cover new non-trivial state/selection/pagination logic and relevant API behavior using the existing test setup.
- Run the narrowest relevant checks and report skipped checks. Never use Playwright, its MCP tools, CLI, or library in this project.
