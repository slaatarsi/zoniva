# ZONIVA
## Product Requirements Document (PRD)

**Version:** 3.0 — Final MVP Specification  
**Product:** Zoniva  
**Product Type:** Delivery Zone & Order Management SaaS  
**Assessment:** AdProMax — AI Full Stack Developer  
**Time Limit:** 60 minutes, including coding, testing, GitHub submission, and deployment  
**Architecture:** Vite+ Monorepo / Feature-Based Architecture  
**Frontend:** TanStack Start + React  
**Backend:** oRPC + Cloudflare Workers  
**Database:** PostgreSQL + Prisma  
**Authentication:** Better Auth  
**Design System:** shadcn/ui + shadcn Map  
**Testing:** Vitest + Playwright with Google Chrome  
**Deployment:** Vercel (Web) + Cloudflare Workers (API)

---

# 1. Product Overview

## 1.1 Product Description

Zoniva is a lightweight, mobile-first delivery management application that helps businesses organize their products, define geographical delivery zones, and manage customer orders.

Business owners can create named delivery zones using an interactive map, assign products to these zones, and validate customer locations before accepting orders.

The system must automatically reject orders outside supported delivery areas.

## 1.2 Product Objectives

The application must allow authenticated users to:

1. Create an account and log in.
2. Create and list products.
3. Assign products to geographical delivery zones.
4. Create named delivery zones using an interactive map.
5. Search for addresses and locations.
6. Configure delivery radii.
7. Visualize delivery boundaries.
8. Create customer orders.
9. Automatically validate customer delivery locations.
10. Reject orders outside eligible zones.
11. Display products and orders organized by delivery zone.
12. Access the application on mobile and desktop.

## 1.3 Assessment Objective

Demonstrate the ability to rapidly build, test, and deploy a functional full-stack application using modern software engineering tools and AI-assisted development.

The implementation must prioritize working functionality over unnecessary complexity.

## 1.4 Success Criteria

The MVP is successful when:

- Authentication works.
- Products can be created and listed.
- Delivery zones can be created.
- Geographical circles appear correctly on the map.
- Products can be assigned to zones.
- Customer locations can be selected.
- Valid locations are accepted.
- Invalid locations are rejected.
- Orders are persisted with their assigned delivery zones.
- The dashboard displays products and orders by zone.
- The application works on mobile and desktop.
- Database data survives browser refresh.
- The public HTTPS application functions end to end.
- GitHub and README deliverables are ready.

---

# 2. Branding and Identity

## 2.1 Product Name

**Zoniva**

Suggested tagline:

*Smarter delivery zones. Simpler operations.*

## 2.2 Brand Direction

Zoniva should have a modern, minimal SaaS identity.

Use the established Zoniva logo concept featuring a geographical location symbol with a delivery coverage motif.

### Brand Colors

Use a neutral UI theme with blue branding accents.

Suggested colors:

- Primary brand blue: `#2563EB`
- Secondary cyan: `#06B6D4`
- Dark text: `#0F172A`
- Light background: `#FAFAFA`

These colors are brand references, not a requirement to replace shadcn's semantic tokens.

## 2.3 Logo Usage

Use the logo in:

- Application sidebar.
- Login page.
- Signup page.
- Browser favicon.
- Application metadata.

A compact logo symbol should be usable in the collapsed sidebar.

Keep the logo consistent with the approved brand artwork.

---

# 3. Technology Stack

| Layer | Technology |
|---|---|
| Monorepo | Vite+ |
| Package Management | pnpm / Vite+ |
| Language | TypeScript |
| Web Framework | TanStack Start |
| Frontend | React |
| Routing | TanStack Router |
| Server Functions | TanStack Start |
| RPC Framework | oRPC |
| API Contracts | @orpc/contract |
| Validation | Zod |
| Authentication | Better Auth |
| ORM | Prisma |
| Database | PostgreSQL |
| UI Components | shadcn/ui |
| Shared UI Package | @zoniva/ui |
| Forms | TanStack React Form |
| Tables | TanStack Table |
| Data Fetching | TanStack Query |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Maps | shadcn Map |
| Location Search | MapSearchControl |
| Frontend Hosting | Vercel |
| API Hosting | Cloudflare Workers |
| Worker Tooling | Wrangler |
| Unit/Integration Tests | Vitest |
| End-to-End Tests | Playwright |
| E2E Browser | Google Chrome |

## 3.1 Documentation-First Development

Before installing or configuring any dependency:

1. Consult the latest official documentation.
2. Verify package compatibility.
3. Verify supported configuration methods.
4. Check TanStack Start and Cloudflare deployment requirements.
5. Avoid deprecated APIs.
6. Do not invent unsupported component props or library functions.

### Official Documentation

- Vite+: https://viteplus.dev/guide/
- TanStack Start: https://tanstack.com/start/latest
- oRPC: https://orpc.dev/docs
- oRPC Contract-First: https://orpc.dev/docs/contract-first
- Better Auth: https://www.better-auth.com/docs
- Prisma: https://www.prisma.io/docs
- shadcn/ui: https://ui.shadcn.com/docs
- shadcn Sidebar: https://ui.shadcn.com/docs/components/sidebar
- shadcn Map: https://shadcn-map.vercel.app/docs
- Map Search Control: https://shadcn-map.vercel.app/docs/examples/search-control
- TanStack Form: https://tanstack.com/form/latest
- TanStack Table: https://tanstack.com/table/latest
- Playwright: https://playwright.dev/docs/intro

---

# 4. Monorepo Architecture

## 4.1 Architecture Principles

Use a Vite+ managed TypeScript monorepo.

The workspace contains two independently deployable applications and four shared packages.

### Applications

- `apps/web` — Vercel deployment.
- `apps/api` — Cloudflare Workers deployment.

### Packages

- `packages/contracts` — Shared oRPC contracts.
- `packages/auth` — Better Auth configuration.
- `packages/db` — Prisma and database operations.
- `packages/ui` — Shared shadcn components and design tokens.

Do not create `packages/api`.

Keep all oRPC procedure implementations inside `apps/api`.

## 4.2 Final Project Structure

```text
zoniva/
│
├── apps/
│   │
│   ├── web/
│   │   ├── src/
│   │   │   │
│   │   │   ├── routes/
│   │   │   │   ├── __root.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   ├── login.tsx
│   │   │   │   ├── signup.tsx
│   │   │   │   └── _app/
│   │   │   │       ├── route.tsx
│   │   │   │       ├── dashboard.tsx
│   │   │   │       ├── products.tsx
│   │   │   │       ├── zones.tsx
│   │   │   │       └── orders.tsx
│   │   │   │
│   │   │   ├── components/
│   │   │   │   ├── layout/
│   │   │   │   │   ├── app-sidebar.tsx
│   │   │   │   │   ├── app-header.tsx
│   │   │   │   │   └── nav-user.tsx
│   │   │   │   │
│   │   │   │   ├── form/
│   │   │   │   │   ├── hooks.tsx
│   │   │   │   │   ├── form-base.tsx
│   │   │   │   │   └── form-input.tsx
│   │   │   │   │
│   │   │   │   └── features/
│   │   │   │       ├── dashboard/
│   │   │   │       │   ├── index.ts
│   │   │   │       │   ├── dashboard.queries.ts
│   │   │   │       │   ├── server/
│   │   │   │       │   │   ├── dashboard.functions.ts
│   │   │   │       │   │   └── dashboard.server.ts
│   │   │   │       │   └── ui/
│   │   │   │       │       ├── dashboard-view.tsx
│   │   │   │       │       ├── stats-cards.tsx
│   │   │   │       │       └── zone-overview.tsx
│   │   │   │       │
│   │   │   │       ├── products/
│   │   │   │       │   ├── index.ts
│   │   │   │       │   ├── products.queries.ts
│   │   │   │       │   ├── server/
│   │   │   │       │   │   ├── products.functions.ts
│   │   │   │       │   │   └── products.server.ts
│   │   │   │       │   └── ui/
│   │   │   │       │       ├── products-view.tsx
│   │   │   │       │       ├── product-form.tsx
│   │   │   │       │       ├── products-table.tsx
│   │   │   │       │       └── columns.tsx
│   │   │   │       │
│   │   │   │       ├── zones/
│   │   │   │       │   ├── index.ts
│   │   │   │       │   ├── zones.queries.ts
│   │   │   │       │   ├── server/
│   │   │   │       │   │   ├── zones.functions.ts
│   │   │   │       │   │   └── zones.server.ts
│   │   │   │       │   └── ui/
│   │   │   │       │       ├── zones-view.tsx
│   │   │   │       │       ├── zone-form.tsx
│   │   │   │       │       └── zone-map.tsx
│   │   │   │       │
│   │   │   │       └── orders/
│   │   │   │           ├── index.ts
│   │   │   │           ├── orders.queries.ts
│   │   │   │           ├── server/
│   │   │   │           │   ├── orders.functions.ts
│   │   │   │           │   └── orders.server.ts
│   │   │   │           └── ui/
│   │   │   │               ├── orders-view.tsx
│   │   │   │               ├── order-form.tsx
│   │   │   │               ├── orders-table.tsx
│   │   │   │               ├── columns.tsx
│   │   │   │               └── location-picker.tsx
│   │   │   │
│   │   │   ├── lib/
│   │   │   │   ├── api.server.ts
│   │   │   │   ├── auth-client.ts
│   │   │   │   └── query-client.ts
│   │   │   │
│   │   │   └── styles/
│   │   │       └── app.css
│   │   │
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   └── api/
│       ├── src/
│       │   ├── index.ts
│       │   ├── context.ts
│       │   ├── middleware/
│       │   │   └── auth.ts
│       │   ├── features/
│       │   │   ├── products/
│       │   │   │   └── products.router.ts
│       │   │   ├── zones/
│       │   │   │   └── zones.router.ts
│       │   │   ├── orders/
│       │   │   │   ├── orders.router.ts
│       │   │   │   └── geo.ts
│       │   │   └── dashboard/
│       │   │       └── dashboard.router.ts
│       │   └── routers/
│       │       └── index.ts
│       ├── wrangler.jsonc
│       └── package.json
│
├── packages/
│   ├── contracts/
│   │   ├── src/
│   │   │   ├── products.ts
│   │   │   ├── zones.ts
│   │   │   ├── orders.ts
│   │   │   ├── dashboard.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── auth/
│   │   ├── src/
│   │   │   ├── auth.ts
│   │   │   ├── auth-client.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── db/
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── seed.ts
│   │   ├── prisma.config.ts
│   │   ├── src/
│   │   │   ├── client.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── ui/
│       ├── src/
│       │   ├── components/
│       │   │   ├── ui/
│       │   │   └── map/
│       │   ├── lib/
│       │   │   └── utils.ts
│       │   └── styles/
│       │       └── globals.css
│       ├── components.json
│       └── package.json
│
├── e2e/
│   ├── playwright.config.ts
│   ├── tests/
│   │   ├── auth.spec.ts
│   │   ├── products.spec.ts
│   │   ├── zones.spec.ts
│   │   ├── orders.spec.ts
│   │   └── navigation.spec.ts
│   └── helpers/
│       └── auth.ts
│
├── PRD.md
├── DESIGN.md
├── package.json
├── pnpm-workspace.yaml
├── vite.config.ts
├── .env.example
├── .gitignore
└── README.md
```

This is a target structure, not a requirement to generate every file upfront.

Omit unused layers and files. Follow the installed versions' actual configuration conventions.

## 4.3 Package Naming

Use:

- `@zoniva/web`
- `@zoniva/api`
- `@zoniva/contracts`
- `@zoniva/auth`
- `@zoniva/db`
- `@zoniva/ui`

Use workspace package exports rather than importing deeply into another package's internal files.

---

# 5. Feature-Based Frontend Architecture

## 5.1 Feature Structure

Each feature belongs inside:

`apps/web/src/components/features/<feature>/`

The expected pattern is:

```text
<feature>/
├── index.ts
├── <feature>.queries.ts
├── server/
│   ├── <feature>.functions.ts
│   └── <feature>.server.ts
└── ui/
    ├── <feature>-view.tsx
    ├── <feature>-form.tsx
    ├── <feature>-table.tsx
    └── columns.tsx
```

Only create files required by that feature.

## 5.2 Route Responsibilities

TanStack Start route files must remain thin.

Routes are responsible for:

- Route configuration.
- Authentication-aware navigation.
- Loader integration.
- Rendering feature components.

Do not implement business logic, database queries, or substantial UI directly in route files.

## 5.3 Feature Server Functions

Use TanStack Start `createServerFn` for business feature operations.

Naming convention:

- `listProductsFn`
- `createProductFn`
- `assignProductZonesFn`
- `listZonesFn`
- `createZoneFn`
- `validateOrderLocationFn`
- `createOrderFn`

### Rules

- GET for reads.
- POST for mutations.
- Validate user-controlled inputs with shared Zod schemas.
- Delegate to server-only implementations.
- Do not accept authentication cookies or roles as user-provided inputs.
- Return only data required by the frontend.
- Keep authenticated responses private and non-cacheable.

## 5.4 Server-Only oRPC Client

Use:

`apps/web/src/lib/api.server.ts`

Responsibilities:

- Create a request-specific oRPC client.
- Connect to the trusted API Worker.
- Forward required request cookies safely.
- Handle transport failures.
- Return typed responses.

The module must be protected by the installed framework's server-only import mechanism.

Never expose the server-only oRPC client to browser bundles.

## 5.5 API Communication Flow

```text
React UI / TanStack Router Loader
                 |
                 v
       TanStack Start Server Fn
                 |
                 v
         Server-only oRPC
                 |
                 v
         Cloudflare Worker
                 |
                 v
        oRPC API Procedure
                 |
                 v
       Prisma + PostgreSQL
```

Business feature UI must not call oRPC procedures directly from the browser.

Authentication is an exception: Better Auth's browser client may use its supported authentication endpoints.

## 5.6 TanStack Query

Use TanStack Query for caching feature data.

Store reusable query keys and options in:

`<feature>.queries.ts`

Requirements:

- Query functions call server functions.
- Route loaders and components reuse consistent query options.
- Mutations invalidate affected query keys.
- Keep SSR query state request-scoped.
- Do not duplicate remote data unnecessarily in local React state.

---

# 6. Backend Architecture

## 6.1 API Worker

The backend is implemented inside:

`apps/api`

It must be independently deployable to Cloudflare Workers.

Responsibilities:

- Expose oRPC endpoints.
- Expose Better Auth HTTP endpoints.
- Validate requests.
- Authenticate users.
- Enforce authorization.
- Execute business logic.
- Access Prisma.
- Return typed API responses.

## 6.2 Backend Feature Organization

Organize business procedures under:

`apps/api/src/features/`

Each feature owns its router and feature-specific logic.

### Products

`products/products.router.ts`

### Zones

`zones/zones.router.ts`

### Orders

`orders/orders.router.ts`

### Dashboard

`dashboard/dashboard.router.ts`

Combine procedures in:

`apps/api/src/routers/index.ts`

## 6.3 API Security

Every protected procedure must:

1. Resolve the authenticated user.
2. Validate the incoming payload.
3. Verify ownership of referenced records.
4. Execute authorized operations.
5. Return a minimal typed response.

Never trust a user ID or role supplied by the frontend.

Do not expose internal exceptions, credentials, or database details.

---

# 7. Shared oRPC Contracts

## 7.1 Contract-First Architecture

Use `@orpc/contract` and Zod.

All API definitions live in:

`packages/contracts`

The package contains:

- Input schemas.
- Output schemas.
- Procedure contracts.
- Shared API types.
- Router composition.

Do not put Prisma, secrets, Worker bindings, or business implementations into contracts.

## 7.2 Required Procedures

### Products

| Procedure | Purpose |
|---|---|
| `products.list` | List products |
| `products.create` | Create product |
| `products.assignZones` | Assign zones |

### Zones

| Procedure | Purpose |
|---|---|
| `zones.list` | List zones |
| `zones.create` | Create zone |
| `zones.getById` | Retrieve zone details |

### Orders

| Procedure | Purpose |
|---|---|
| `orders.list` | List orders |
| `orders.validateLocation` | Validate delivery location |
| `orders.create` | Create order |

### Dashboard

| Procedure | Purpose |
|---|---|
| `dashboard.overview` | Get overview metrics |
| `dashboard.zoneDetails` | Get zone products and orders |

## 7.3 Validation Boundaries

Validate inputs at both:

- TanStack Start server-function boundary.
- oRPC API boundary.

The API must remain secure when called independently of the web application.

---

# 8. Authentication — Better Auth

## 8.1 Authentication Features

Implement:

- User signup.
- User login.
- User logout.
- Persistent sessions.
- Protected routes.
- Protected API procedures.

Use Better Auth with its Prisma adapter.

## 8.2 Registration

Fields:

- Name.
- Email.
- Password.

## 8.3 Login

Fields:

- Email.
- Password.

## 8.4 Authentication Ownership

Better Auth server implementation runs in the Cloudflare Worker.

The frontend uses the Better Auth browser client through a browser-safe export.

Do not duplicate Better Auth server instances across Vercel and Cloudflare.

## 8.5 Protected Routes

Unauthenticated users must not access:

- `/dashboard`
- `/products`
- `/zones`
- `/orders`

Authenticated users accessing `/login` or `/signup` may be redirected to `/dashboard`.

## 8.6 Session Security

- Secure password hashing.
- Server-side session verification.
- Proper cookie handling.
- Trusted origins configuration.
- HTTPS production cookies.
- Safe logout behavior.

Do not rely solely on frontend navigation guards for security.

---

# 9. Application Routes

## 9.1 Public Routes

| Route | Description |
|---|---|
| `/login` | Login form |
| `/signup` | Registration form |

## 9.2 Protected Routes

| Route | Description |
|---|---|
| `/dashboard` | Overview and zone information |
| `/products` | Product management |
| `/zones` | Delivery-zone management |
| `/orders` | Order management |

## 9.3 Supporting Routes

- `/` redirects according to authentication status.
- Unknown routes display a 404 page.

## 9.4 Route Design

Use one protected layout route for all authenticated pages.

It contains:

- Official shadcn Sidebar on desktop/tablet; bottom navigation on mobile below 640px.
- Application header.
- Independently scrollable main content above the mobile bottom navigation row.
- User account menu; mobile footer/account content lives in the bottom drawer.

Do not create unnecessary detail, settings, or profile pages.

Use dialogs and inline forms for creation workflows.

---

# 10. Product Management

## 10.1 Product Requirements

Authenticated users must be able to:

- Create products.
- List products.
- Assign products to multiple delivery zones.
- View assigned zones.

## 10.2 Product Fields

- ID.
- Name.
- Price.
- Quantity.
- User ID.
- Assigned zones.
- Created At.
- Updated At.

## 10.3 Validation Rules

- Name is required.
- Price must be greater than zero.
- Quantity must be a non-negative integer.
- Assigned zones must belong to the authenticated user.
- Products with no assigned zones cannot be ordered.

## 10.4 User Interface

Page: `/products`

Required interface:

- Page title.
- Add Product button.
- Products table.
- Product form dialog.

Columns:

- Name.
- Price.
- Quantity.
- Delivery zones.

Use shadcn badges for zone assignments.

---

# 11. Delivery Zone Management

## 11.1 Zone Requirements

Users must be able to create geographical delivery zones.

Each zone contains:

- Name.
- Center latitude.
- Center longitude.
- Radius in meters.

## 11.2 Create Zone Workflow

1. Navigate to `/zones`.
2. Click Create Zone.
3. Enter the zone name.
4. On desktop, search for a location or click the inline map. On mobile, open the full-screen location picker, then search or pan the map with one finger beneath a fixed centered pin.
5. On mobile, click Confirm location to commit the map center and return to the form; exiting cancels the draft. Display the selected latitude and longitude in read-only form inputs.
6. Configure the radius.
7. Preview the geographical circle.
8. Save the zone.
9. Display the zone in the existing-zone list.

## 11.3 Validation

- Name required.
- Latitude between -90 and 90.
- Longitude between -180 and 180.
- Radius greater than zero.
- Zones may overlap.

## 11.4 Zone Display

The map must display:

- Zone centers.
- Delivery circles.
- Existing named zones.
- Newly selected center.
- Radius preview.

Circles must represent geographical distance, not fixed pixel dimensions.

---

# 12. Maps — shadcn Map

## 12.1 Required Library

Use:

https://shadcn-map.vercel.app/docs

Required Search Control example:

https://shadcn-map.vercel.app/docs/examples/search-control

Use the installed library's actual map engine and component API.

Do not assume that Leaflet-specific props or types apply if the selected shadcn Map version uses another mapping engine.

## 12.2 Search Control

MapSearchControl is mandatory for:

- Delivery-zone center selection.
- Customer location selection.

### Behavior

1. User types an address or place.
2. Autocomplete suggestions appear.
3. User selects a result.
4. Map centers on the location.
5. On desktop, a marker appears and coordinates update in form state.
6. On mobile, the result centers beneath a stationary pin in the full-screen picker. Coordinates remain draft until Confirm location is clicked; confirmation populates read-only form inputs and returns to the form.

Use the official selection callback and documented component props.

## 12.3 Manual Location Selection

On desktop, users must be able to click the inline map to select a location manually.

On mobile (viewport width below 640px), both zone-center and customer-location selection use a full-screen map:

- Open it from a labeled Choose location / Change location button in the form, preserving other form values.
- Keep MapSearchControl and an accessible exit button at the top, with a full-width Confirm location button at the bottom.
- Fix a pin overlay at the exact map center, its tip marking the location. Users navigate by panning the map with one finger beneath it, with pinch zoom supported. Tapping does not reposition the pin independently. Search and keyboard map navigation remain available as alternatives.
- Search results recenter the map; panning changes the draft center only. Do not update confirmed form coordinates while navigating.
- Confirm location stops any map movement, reads and validates the current map center, commits latitude and longitude together, and closes the picker. Display those values in labeled read-only form inputs.
- Exit, Escape, or supported dismissal discards the draft and preserves the previous confirmed selection. Reopening starts at that selection, or the configured initial view if none exists. Do not imply the initial view is a detected user location.
- Until the first confirmation, coordinates remain unselected and location-dependent saving, validation, and submission are blocked. Disable confirmation until the map is ready and its center is valid.
- Fill the available viewport using dynamic viewport height, lock background scrolling, respect safe areas, keep attribution unobstructed, and use touch targets of at least 44 × 44px. Search suggestions must remain usable with the software keyboard open.
- Use the existing accessible dialog primitive with a title, focus containment, and focus restoration. Provide explanatory map/search errors and retain manual panning after search failure if the map remains available.

After a search result is selected, manual selection may update the final coordinates using the applicable desktop or mobile interaction. Always validate the final selected coordinates; preserve latitude/longitude ordering at the map boundary.

## 12.4 Coordinate Normalization

Geographical data must use consistent coordinate ordering.

For GeoJSON:

`[longitude, latitude]`

Store latitude and longitude in clearly named fields.

Convert to the map library's expected coordinate representation at the component boundary.

## 12.5 Zone Rendering

Render geographical circles using the mapping library's supported circle or radius primitives.

Requirements:

- Accurate center coordinates.
- Accurate radius in meters.
- Semi-transparent fill.
- Visible border.
- Multiple simultaneous zones.
- Consistent geographical results on mobile and desktop, with the full-screen centered-pin confirmation flow on mobile and inline search/click selection on desktop.

## 12.6 Address Search Provider

Use a provider compatible with the installed Search Control.

Verify:

- Autocomplete availability.
- API requirements.
- Usage limits.
- Attribution.
- Production restrictions.

Avoid relying on unrestricted public geocoding services that prohibit heavy autocomplete usage.

## 12.7 Server-Side Rendering

Map components must be compatible with TanStack Start SSR.

Browser-dependent code must not execute during server rendering.

Use client-only rendering where required.

---

# 13. Order Management

## 13.1 Required Functionality

Users must be able to:

- Select a product.
- Enter quantity.
- Search for a customer address.
- Choose the final location.
- Validate delivery availability.
- Create a valid order.
- View orders with assigned zones.

## 13.2 Order Fields

- ID.
- Product ID.
- Quantity.
- Customer latitude.
- Customer longitude.
- Optional customer address.
- Zone ID.
- Unit price.
- Total amount.
- User ID.
- Creation date.

## 13.3 Create Order Workflow

1. Open `/orders`.
2. Click Create Order.
3. Select a product.
4. Enter quantity.
5. Search or select customer location. On mobile, open the full-screen map, search or pan beneath the centered pin, then click Confirm location to return to the form; exit cancels the draft.
6. Display the confirmed customer marker and read-only latitude/longitude inputs.
7. Reset stale eligibility when the confirmed location changes and validate delivery eligibility. Mobile draft map movement does not trigger eligibility updates.
8. Show the assigned zone if valid.
9. Display total price.
10. Submit order.
11. Revalidate on the server.
12. Save order and update inventory.
13. Refresh orders and dashboard data.

## 13.4 Geographical Validation

Use the Haversine formula.

An eligible delivery zone satisfies:

`distance(customer, zone center) <= zone radius`

Only zones assigned to the selected product may accept that product's orders.

## 13.5 Order Rejection

Reject when:

- Customer location is outside all delivery zones.
- Customer is inside a zone that does not offer the selected product.
- Product belongs to another user.
- Quantity is invalid.
- Inventory is insufficient.
- Coordinates are invalid.

### Valid Location Message

"Delivery available in [Zone Name]."

### Invalid Location Message

"Delivery is unavailable at this location."

### Unavailable Product Message

"This product is not available in the selected delivery area."

## 13.6 Overlapping Zones

If multiple eligible zones contain the customer:

1. Calculate distance to each eligible zone center.
2. Select the nearest center.
3. Apply a stable tie-breaker when distances are equal.

## 13.7 Inventory Integrity

Use a Prisma transaction.

The transaction must:

- Verify product ownership.
- Verify eligible zone.
- Check available stock.
- Decrement inventory with concurrency protection.
- Create the order.
- Roll back on failure.

## 13.8 Price Integrity

Calculate:

`totalAmount = unitPrice × quantity`

Store unit price and total amount at order creation.

Historical order values must not change when the product price changes.

---

# 14. Dashboard

## 14.1 Overview Metrics

Display:

- Total products.
- Total delivery zones.
- Total orders.

## 14.2 Zone Overview

Each delivery zone displays:

- Zone name.
- Radius.
- Assigned product count.
- Assigned order count.

## 14.3 Zone Details

Selecting a zone displays:

### Products

- Name.
- Price.
- Available quantity.

### Orders

- Order ID.
- Product.
- Quantity.
- Total amount.
- Date.

## 14.4 Data Requirements

All values must come from authenticated API operations.

No hardcoded dashboard statistics.

Handle empty datasets correctly.

---

# 15. Prisma Database Architecture

## 15.1 Database

Use PostgreSQL with Prisma.

Maintain the schema inside:

`packages/db/prisma/schema.prisma`

## 15.2 Authentication Models

Use the four Better Auth models:

1. User.
2. Session.
3. Account.
4. Verification.

Generate or verify the authentication schema according to the installed Better Auth version.

## 15.3 Business Models

### Product

- id: String.
- name: String.
- price: Decimal.
- quantity: Int.
- userId: String.
- zones: DeliveryZone[].
- orders: Order[].
- createdAt: DateTime.
- updatedAt: DateTime.

### DeliveryZone

- id: String.
- name: String.
- latitude: Float.
- longitude: Float.
- radiusMeters: Int.
- userId: String.
- products: Product[].
- orders: Order[].
- createdAt: DateTime.
- updatedAt: DateTime.

### Order

- id: String.
- quantity: Int.
- unitPrice: Decimal.
- totalAmount: Decimal.
- customerLatitude: Float.
- customerLongitude: Float.
- customerAddress: String?.
- userId: String.
- productId: String.
- zoneId: String.
- createdAt: DateTime.

## 15.4 Relationships

- User → Product: one-to-many.
- User → DeliveryZone: one-to-many.
- User → Order: one-to-many.
- Product ↔ DeliveryZone: many-to-many.
- Product → Order: one-to-many.
- DeliveryZone → Order: one-to-many.

Use an implicit Prisma many-to-many relation between Product and DeliveryZone.

## 15.5 Database Rules

- Use Decimal for money.
- Use Float for coordinates.
- Use meters for zone radius.
- Ensure email uniqueness.
- Index useful foreign keys.
- Enforce ownership in API queries.
- Use transactions for order creation.
- Use one consistent Prisma client configuration.

Avoid adding OrderItem, Customer, Driver, Payment, or other models not needed by the challenge.

---

# 16. Prisma Seeder

## 16.1 Objective

Create one test user with email/password credentials.

Use Prisma's seeding mechanism.

Location:

`packages/db/prisma/seed.ts`

## 16.2 Seeded User

**Name:** Demo Admin  
**Email:** demo@delivery.test  
**Password:** Read from environment variables.

## 16.3 Environment Variables

```env
SEED_USER_EMAIL=demo@delivery.test
SEED_USER_PASSWORD=
```

## 16.4 Seeder Requirements

- Run using Prisma's configured seed command.
- Create or reuse the demo User.
- Create the associated Better Auth credential Account.
- Store a Better Auth-compatible password hash.
- Never store plaintext passwords.
- Keep seeding idempotent.
- Avoid duplicate users.
- Do not overwrite unrelated accounts.
- Do not create sample products.
- Do not create sample zones.
- Do not create sample orders.

Use Better Auth's current compatible password hashing mechanism.

The seed script should work from CLI tooling rather than depending on the Worker runtime.

## 16.5 Acceptance Criteria

- Seed command succeeds.
- Demo account exists.
- Demo user can log in.
- Rerunning the command does not duplicate the account.
- Authentication works against the seeded credentials.

---

# 17. UI Design System

## 17.1 Design Direction

Build a clean, minimal, professional SaaS dashboard using shadcn/ui.

Prioritize:

- Clarity.
- Consistency.
- Usability.
- Responsive behavior.
- Accessible controls.
- Fast implementation.

Avoid:

- Excessive shadows.
- Large decorative gradients.
- Oversized headings.
- Unnecessary animations.
- Sharp, inconsistent component styling.
- Custom component libraries duplicating shadcn.

## 17.2 Theme

Use Neutral or Zinc as the shadcn base theme.

### Typography

Use Geist or a clean system sans-serif.

Suggested hierarchy:

- Page title: 24px semibold.
- Section title: 16–18px semibold.
- Body: 14px.
- Supporting text: 12–14px.
- Form labels: 14px medium.

### Layout

- Mobile page padding: 16px.
- Desktop page padding: 24px.
- Standard section gap: 24px.
- Standard card padding: 16–24px.
- Medium corner radius.
- Subtle borders.

Use semantic shadcn theme tokens.

## 17.3 Shared UI Package

Use:

`packages/ui`

Package name:

`@zoniva/ui`

Contains:

- Shared shadcn primitives.
- Common UI utilities.
- Theme variables.
- Reusable presentational map components when appropriate.

Business-specific components remain inside their feature folders.

## 17.4 Required UI Components

Use official shadcn components wherever applicable:

- Sidebar.
- SidebarProvider.
- SidebarInset.
- SidebarTrigger.
- SidebarHeader.
- SidebarContent.
- SidebarFooter.
- SidebarMenu.
- SidebarMenuItem.
- SidebarMenuButton.
- Button.
- Card.
- Dialog.
- Input.
- Select.
- Table.
- Badge.
- Alert.
- Field or Label.
- Skeleton.
- Separator.
- Dropdown Menu.
- Drawer (mobile child navigation and footer/account section).
- Sonner.

Install only components that are actually used.

---

# 18. Application Sidebar

## 18.1 Required Component

Use the official shadcn Sidebar for desktop/tablet. On mobile below 640px, use the bottom navigation and shadcn Drawer composition specified in section 18.4 instead of the side sidebar.

Do not build a custom navigation sidebar or gesture drawer from scratch. Share navigation data between layouts.

## 18.2 Sidebar Content

### Header

- Zoniva logo.
- Zoniva wordmark.

### Navigation

- Dashboard.
- Products.
- Delivery Zones.
- Orders.

### Footer

- User name.
- User email.
- Account dropdown.
- Logout.

## 18.3 Desktop Behavior

- Left sidebar.
- Main content area.
- Active route indication.
- Optional collapsible behavior.
- Consistent icon alignment.

## 18.4 Mobile Behavior

Below 640px, replace the sidebar and header menu trigger with an Airbnb-inspired bottom navigation experience, retaining Zoniva's design tokens. Tablet sidebar behavior is unchanged.

Requirements:

- Display Dashboard, Products, Delivery Zones, and Orders as evenly spaced icon-and-label items with an explicit active state. Reuse the desktop navigation definition.
- Leaf items navigate directly. If an item has child menu items, it opens a bottom drawer containing its related children rather than navigating immediately. Highlight the parent of an active child and close the drawer after route selection. Do not create unnecessary child routes for the MVP.
- Place bottom navigation in its own non-shrinking bottom row of a `100dvh` app shell, not as a fixed/absolute overlay on content. Give the main content region `min-height: 0` and independent vertical scrolling; all page content, including the last item, must remain reachable without being covered by navigation.
- Include safe-area padding in the navigation row and use at least 44 × 44px touch targets, visible labels, semantic route links with `aria-current`, and accessible drawer-trigger buttons with expanded state. No horizontal overflow at 320px.
- Remove standalone page/sidebar footers on mobile. Move existing footer content, including user name, email, and Logout, into a separated bottom section of the drawer. If there are no child menus, a labeled Account utility button in the bar opens the account/footer drawer; it is not a new route.
- Use the supported shadcn Drawer primitive from `@zoniva/ui`, with an accessible title, close control, focus containment and restoration, Escape dismissal, and a backdrop. Lock background interaction/scroll while open. Let long menu content scroll within the drawer while its bottom footer remains reachable, including with large text and in landscape.
- Full-screen location pickers and modals appear above the shell, hiding/inerting bottom navigation until dismissed; restore navigation and the page's prior scroll position afterward.

## 18.5 Native-Feeling Mobile Acceptance

The mobile experience must feel like navigating a native application, not a scaled-down desktop website. Achieve this in the existing web stack; native packaging, offline support, and new product features are not required.

- Keep the application shell stable across client-side navigation. Preserve each destination's inner-container scroll position on return, support correct browser Back/Forward behavior, and avoid full-document reloads or blank flashes for internal route changes.
- Give immediate visual press feedback before network completion, use touch-friendly controls, and avoid sticky hover, browser tap flashes without replacement feedback, and accidental text selection on controls. Keep content selectable and browser zoom available.
- Preserve form values and underlying page state across drawer/map opening and dismissal. Keep explicit loading, pending, error, and retry states without unnecessary layout shifts or duplicate submissions.
- Use dynamic viewport sizing and safe-area insets. Keep fields, search suggestions, and relevant actions reachable with the keyboard open; use at least 16px text in mobile editable inputs and appropriate input modes. Do not trigger the keyboard automatically on route entry.
- Prevent background scroll and scroll chaining while interacting with overlays; retain natural page scrolling and the installed map/drawer gesture behavior. Use only restrained built-in drawer/dialog transitions and honor reduced motion.
- Verify the experience on real iOS Safari and Android Chrome devices, including smaller/older hardware, landscape, large text, software keyboard, changing browser chrome, and slower networking. Check navigation/scroll restoration, touch feedback, safe areas, map gestures, and dismissal. Emulation alone is insufficient; document any hardware checks that remain unverified.

---

# 19. Forms Architecture

## 19.1 Form Technology

Use TanStack React Form with Zod.

Use shared visual primitives from `@zoniva/ui`.

## 19.2 Shared Form Infrastructure

Directory:

`apps/web/src/components/form/`

Contains:

- `hooks.tsx`
- `form-base.tsx`
- `form-input.tsx`

Create the infrastructure when implementing the first appropriate feature form.

Do not assume it already exists.

## 19.3 Feature Forms

- Product form.
- Zone form.
- Order form.

Authentication forms may continue using Better Auth's supported client workflow.

## 19.4 Form Rules

- Explicit typed default values.
- Contract-based Zod validation.
- Accessible labels.
- Appropriate input types.
- Field-level errors.
- Submission-level errors.
- Pending state.
- Duplicate submission prevention.
- Preserve values after failed submission.
- Reset or navigate only after success.

## 19.5 Submission Flow

```text
Feature Form
    |
TanStack React Form
    |
TanStack Start Server Function
    |
Server-only oRPC Client
    |
Cloudflare Worker
    |
Prisma
```

Do not call business oRPC procedures directly from form components.

---

# 20. Tables Architecture

## 20.1 Table Technology

Use TanStack Table with shadcn table primitives.

## 20.2 Products Table

Columns:

- Name.
- Price.
- Quantity.
- Assigned zones.

## 20.3 Orders Table

Columns:

- Order identifier.
- Product.
- Quantity.
- Delivery zone.
- Total amount.
- Date.

## 20.4 TanStack Table Requirements

- Typed ColumnDef definitions.
- Stable row IDs.
- useReactTable.
- getCoreRowModel.
- Accessible table markup.
- Proper loading states.
- Empty states.
- Error states.
- Mobile overflow handling.

Do not introduce sorting, pagination, filtering, row selection, or column pinning unless a concrete feature requires them.

For the small MVP dataset, simple tables are preferred.

## 20.5 Remote Data

Use:

`TanStack Query → Server Function → oRPC → Database`

Do not maintain duplicate local copies of remote records.

---

# 21. Testing Strategy

## 21.1 Testing Principles

Separate feature implementation tests from full end-to-end testing.

### Feature Development

Use Vitest for focused tests of:

- Validation.
- Geographical calculations.
- Business rules.
- API procedures.
- Authentication/authorization behavior.
- Form logic.
- Table behavior where necessary.

Do not automatically run Playwright when creating or modifying individual features.

### Explicit E2E Testing

When end-to-end testing is explicitly requested, use Playwright with Google Chrome.

Playwright tests complete user journeys across frontend, backend, authentication, maps, and database.

## 21.2 Vitest Test Coverage

Prioritize:

- Haversine distance calculation.
- Zone boundary behavior.
- Invalid coordinates.
- Product-zone eligibility.
- Stock validation.
- Order total calculation.
- Ownership enforcement.
- Concurrent inventory update behavior.

## 21.3 Playwright Configuration

Use:

- Playwright Test.
- Google Chrome stable channel.
- Desktop Chrome configuration.
- Mobile viewport configuration.
- Screenshots on failure.
- Traces on failure.

Keep tests inside the root `e2e/` workspace.

## 21.4 Authentication E2E

Verify:

- Seeded user login.
- Invalid password rejection.
- Session persistence after refresh.
- Protected routes.
- Logout.

## 21.5 Products E2E

Verify:

- Product creation.
- Invalid price rejection.
- Product persistence.
- Zone assignment.

## 21.6 Zones E2E

Verify:

- Zone creation.
- Search Control visibility.
- Address selection.
- Desktop manual map selection.
- Mobile full-screen layout, fixed center pin, one-finger panning, top search/exit, and bottom confirmation.
- Draft search/panning leaves form coordinates unchanged; confirmation commits the current center to read-only inputs and returns to the form.
- Exit cancels without altering confirmed coordinates or other form fields; reopening restores the confirmed location.
- Confirmation is unavailable before map readiness; search failure retains manual selection when possible.
- Circle preview.
- Zone persistence.

## 21.7 Orders E2E

Verify:

- Order form.
- Product selection.
- Quantity entry.
- Customer location selection, including the mobile full-screen centered-pin confirmation/cancellation flow and read-only coordinates.
- Eligibility refresh after confirmation, with no validation requests for unconfirmed draft movement.
- Valid location acceptance.
- Outside-zone rejection.
- Insufficient stock rejection.
- Order persistence.
- Inventory update.

## 21.8 Navigation E2E

Verify:

- Sidebar navigation.
- Active route state.
- Mobile bottom navigation, direct leaf navigation, active states, and related child-menu bottom drawers where children exist.
- Drawer close after navigation, keyboard dismissal, focus restoration, and mobile footer/account content including Logout.
- Independently scrolling page content with bottom navigation occupying its own layout row; no overlap with the last page item.
- Long drawer content, safe areas, and 320px/landscape layouts.
- Bottom navigation hidden/inert during full-screen location selection and restored with the prior page scroll position afterward.
- Responsive layouts.
- No horizontal overflow.

## 21.9 Test Isolation

- Use isolated test data.
- Do not depend on pre-existing products or zones.
- Use deterministic coordinates.
- Mock geocoding where appropriate.
- Avoid arbitrary timeouts.
- Do not run destructive tests against valuable production data.

---

# 22. Deployment Architecture

## 22.1 Independent Deployments

Deploy:

`apps/web` → Vercel

`apps/api` → Cloudflare Workers

The applications must build independently.

## 22.2 Request Flow

```text
Browser
   |
   v
Vercel / TanStack Start
   |
   +-- UI & Routes
   |
   +-- Server Functions
           |
           v
     Server-only oRPC
           |
           v
     Cloudflare Worker
           |
           +-- oRPC Procedures
           +-- Better Auth
           |
           v
         Prisma
           |
           v
       PostgreSQL
```

## 22.3 Vercel Requirements

- Supported TanStack Start deployment configuration.
- Successful production build.
- Functional SSR.
- Direct route navigation.
- Working server functions.
- Correct Worker connectivity.
- Correct authentication cookie handling.
- Functional mobile experience.

## 22.4 Cloudflare Workers Requirements

- Worker-compatible oRPC handler.
- Better Auth HTTP handler.
- Wrangler configuration.
- Environment bindings.
- Compatible PostgreSQL connection strategy.
- Working Prisma queries.
- Secure authentication middleware.
- Independent Worker deployment.

## 22.5 Database Connectivity

Select a Prisma-supported Cloudflare Workers connection approach.

Verify compatibility with:

- Worker runtime.
- PostgreSQL provider.
- Prisma version.
- Database driver.
- Transaction requirements.

Do not assume that standard Node.js connection pooling works unchanged in Cloudflare Workers.

Database migrations and seeding must run outside normal Worker request processing.

## 22.6 Authentication Cookies

Prefer a same-origin proxy for browser authentication.

Example:

```text
Browser
   |
Vercel
   |
   +-- /api/auth/* ---> Worker
   |
   +-- Server Functions ---> Worker oRPC
```

If authentication requests are proxied:

- Preserve Set-Cookie response headers correctly.
- Preserve necessary request cookies.
- Configure trusted origins.
- Ensure secure cookie scope.
- Verify login, refresh, and logout.

Do not treat Better Auth sign-in/out as ordinary business server-function mutations.

## 22.7 Environment Variables

### API

```env
DATABASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
WEB_ORIGIN=
```

### Web

```env
API_BASE_URL=
VITE_AUTH_BASE_URL=
```

`API_BASE_URL` should be available only to trusted server code when used for server-to-server oRPC communication.

### Seeder

```env
SEED_USER_EMAIL=demo@delivery.test
SEED_USER_PASSWORD=
```

### E2E

```env
E2E_BASE_URL=http://localhost:3000
```

Use correct production and local values.

Do not commit real credentials.

---

# 23. Development Schedule

The assessment allows 60 minutes total.

The schedule below is an execution target, not a guaranteed duration.

| Time | Activity |
|---|---|
| 00–08 min | Initialize monorepo, apps, packages, environment |
| 08–16 min | Prisma, Better Auth, oRPC contracts and server transport |
| 16–24 min | Sidebar, products, zone assignment |
| 24–34 min | shadcn Map, Search Control, delivery zones |
| 34–44 min | Orders, geographical validation, inventory |
| 44–49 min | Dashboard, Prisma seed, responsive adjustments |
| 49–55 min | Deploy API and web, verify connectivity |
| 55–60 min | Smoke testing, README, GitHub, submission |

## 23.1 Priority Levels

### P0 — Mandatory

- Authentication.
- Products.
- Delivery zones.
- Interactive map.
- Delivery radii.
- Order validation.
- Order creation.
- Zone-based dashboard.
- Public HTTPS deployment.
- GitHub and README.

### P1 — Supporting

- Prisma test user.
- Focused automated tests.
- Mobile refinements (the full-screen location-picker interaction specified in section 12.3 remains required).
- Error handling.
- Inventory integrity.

Inventory correctness and server-side validation must still be preserved in the implemented order flow.

### P2 — Optional

- Advanced sorting.
- Editing/deleting records.
- Complex filters.
- Charts.
- Animations.
- Additional pages.

Prioritize a deployable system over optional enhancements.

---

# 24. Out of Scope

Do not implement:

- Payment processing.
- Delivery drivers.
- Driver tracking.
- Route optimization.
- Customer registration.
- Customer CRM.
- Warehouses.
- Multi-tenant organizations.
- Staff roles.
- Coupon systems.
- Shipping fee calculation.
- Advanced order statuses.
- Push notifications.
- Email or SMS workflows.
- Advanced analytics.
- Multiple products per order.
- Complex reporting.
- Decorative animations.

---

# 25. Project Documentation

## 25.1 PRD.md

Contains:

- Product requirements.
- Features.
- Business rules.
- Routes.
- Architecture.
- Acceptance criteria.
- Implementation priorities.

## 25.2 DESIGN.md

Contains:

- Brand identity.
- Theme.
- Typography.
- Spacing.
- Layouts.
- Sidebar behavior.
- UI components.
- Forms.
- Tables.
- Maps.
- Responsive patterns.
- Loading/error states.

Read DESIGN.md before modifying UI.

## 25.3 README.md

Must document:

1. Product overview.
2. Technology stack.
3. Monorepo structure.
4. Prerequisites.
5. Installation.
6. Environment configuration.
7. Database setup.
8. Prisma migrations.
9. Prisma seeding.
10. Running the web app.
11. Running the API Worker.
12. oRPC contracts.
13. Better Auth setup.
14. Vercel deployment.
15. Cloudflare deployment.
16. Vitest testing.
17. Playwright E2E instructions.
18. AI tools actually used.
19. Demo account information.
20. Live application URL.

Provide `.env.example` without secrets.

---

# 26. Final Submission

The AdProMax submission must include:

**1. Live Website**

Functional public HTTPS URL.

**2. GitHub Repository**

Complete source code.

**3. README**

Setup and deployment instructions.

**4. AI Tools**

Brief description of the AI tools actually used.

**5. Demo Credentials**

Seeded demo email and password for evaluation.

Provide the password securely rather than publishing it in a public README.

**6. Challenge Start Time**

Include the exact date, time, and timezone when development started.

**7. API Deployment**

Include the Cloudflare Worker URL when deployed separately.

---

# 27. Definition of Done

## Authentication

- Signup works.
- Login works.
- Logout works.
- Sessions persist.
- Protected pages require authentication.
- Seeded demo user can log in.

## Products

- Products can be created.
- Products persist.
- Products can be assigned to zones.

## Delivery Zones

- Zones can be created.
- Address Search Control works.
- Manual location selection works.
- Delivery circles render.
- Zones persist.

## Orders

- Products and quantities can be selected.
- Customer locations can be searched.
- Geographical eligibility is validated.
- Valid locations are accepted.
- Invalid locations are rejected.
- Zone assignment is correct.
- Inventory updates safely.
- Orders persist.

## Dashboard

- Metrics display correctly.
- Zones are listed.
- Products display by zone.
- Orders display by zone.

## Architecture

- Vite+ monorepo configured.
- Feature-based frontend organization.
- Thin route files.
- Server-function communication.
- Server-only oRPC client.
- Shared contract-first API.
- Shared shadcn UI package.
- Better Auth and Prisma integration.
- Independent web and API builds.

## UI

- Zoniva branding applied.
- shadcn Sidebar implemented on desktop/tablet; mobile bottom navigation in a separate layout row with child-menu bottom drawers and drawer-only footer/account content.
- Minimal shadcn theme.
- shadcn Map with Search Control.
- Responsive layouts.
- Accessible forms and tables.
- Loading, empty, and error states.

## Testing

- Relevant Vitest tests pass.
- Prisma seed works.
- Explicitly requested Playwright E2E suite can run.
- Main user flows can be verified in Chrome.

## Deployment

- Vercel website works.
- Cloudflare Worker responds.
- Database connectivity works.
- Authentication works in production.
- Server functions reach the API.
- Browser refresh works.
- Mobile layout is usable.
- README and submission details are complete.

---

# 28. Final Engineering Rules

1. Follow the official documentation of installed libraries.
2. Use Vite+ for the monorepo.
3. Keep two deployable applications: web and API.
4. Keep shared packages limited to contracts, auth, db, and ui.
5. Never create packages/api.
6. Organize frontend code by feature.
7. Keep route files thin.
8. Use TanStack Start server functions for business feature requests.
9. Keep the oRPC client server-only in the web app.
10. Enforce authentication and authorization in the Worker API.
11. Use shared Zod schemas from contracts.
12. Use TanStack Query for remote data.
13. Use TanStack React Form for feature forms.
14. Use TanStack Table for interactive tables.
15. Use shared shadcn primitives from @zoniva/ui.
16. Use the official shadcn Sidebar on desktop/tablet and the specified bottom navigation with shadcn Drawer on mobile.
17. Use shadcn Map with Search Control.
18. Use Prisma Seeder only for the demo user.
19. Use Vitest during feature development.
20. Use Playwright with Chrome when E2E testing is explicitly requested.
21. Keep browser bundles free of server-only dependencies.
22. Never duplicate authentication or business logic.
23. Maintain secure environment handling.
24. Verify Vercel and Cloudflare Workers compatibility.
25. Do not add unnecessary abstractions or dependencies.
26. Create only the files required by implemented features.
27. Prioritize functionality, correctness, and deployment.
28. Complete final submission within the assessment's 60-minute window.

---

# Final Product Principle

**Zoniva must be a functional, minimal, mobile-first delivery management application with secure authentication, geographical delivery validation, and reliable order management.**

Its codebase should demonstrate disciplined architecture through Vite+, TanStack Start, oRPC contracts, feature modules, shared shadcn components, and independent Vercel/Cloudflare deployments.

The implementation should prioritize working software and successful production delivery over unnecessary complexity.