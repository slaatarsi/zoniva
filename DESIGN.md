---
version: alpha
name: Zoniva Design System
description: "A minimal, mobile-first SaaS interface for managing products, circular delivery zones, and geographically validated orders."
colors:
  primary: "#2563EB"
  primary-hover: "#1D4ED8"
  primary-active: "#1E40AF"
  on-primary: "#FFFFFF"
  secondary: "#06B6D4"
  secondary-soft: "#ECFEFF"
  logo-navy: "#0F172A"
  background: "#FAFAFA"
  surface: "#FFFFFF"
  surface-muted: "#F4F4F5"
  surface-hover: "#F8FAFC"
  foreground: "#0F172A"
  foreground-muted: "#52525B"
  foreground-subtle: "#71717A"
  border: "#E4E4E7"
  border-strong: "#D4D4D8"
  focus: "#2563EB"
  success: "#15803D"
  success-soft: "#F0FDF4"
  warning: "#A16207"
  warning-soft: "#FEFCE8"
  destructive: "#B91C1C"
  destructive-hover: "#991B1B"
  destructive-soft: "#FEF2F2"
  map-zone-fill: "#2563EB"
  map-zone-stroke: "#1D4ED8"
  map-selected: "#06B6D4"
  overlay: "#0F172A"
typography:
  page-title:
    fontFamily: "Geist, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.02em
  section-title:
    fontFamily: "Geist, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: -0.01em
  card-title:
    fontFamily: "Geist, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0em
  body:
    fontFamily: "Geist, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  label:
    fontFamily: "Geist, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0em
  caption:
    fontFamily: "Geist, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  metric:
    fontFamily: "Geist, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: 30px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.03em
  code:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  0: 0px
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  5: 20px
  6: 24px
  8: 32px
  10: 40px
  12: 48px
  16: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    typography: "{typography.label}"
    height: 40px
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    borderColor: "{colors.border}"
    rounded: "{rounded.md}"
    height: 40px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    borderColor: "{colors.border}"
    rounded: "{rounded.md}"
    height: 40px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    borderColor: "{colors.border}"
    rounded: "{rounded.lg}"
    padding: 24px
  dialog:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
  badge-neutral:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.foreground-muted}"
    rounded: "{rounded.sm}"
  badge-success:
    backgroundColor: "{colors.success-soft}"
    textColor: "{colors.success}"
    rounded: "{rounded.sm}"
  alert-error:
    backgroundColor: "{colors.destructive-soft}"
    textColor: "{colors.destructive}"
    rounded: "{rounded.md}"
  map-zone:
    fillColor: "{colors.map-zone-fill}"
    strokeColor: "{colors.map-zone-stroke}"
  sidebar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    borderColor: "{colors.border}"
---

# Zoniva Design System

> **Source of truth:** Zoniva PRD v3.0 and the supplied Zoniva logo. This is the implementation-oriented visual and interaction specification for the MVP, not a replacement for business rules in the PRD. Read this file before modifying UI. YAML values are normative when prose differs. Values not explicitly fixed by the PRD are recommended implementation defaults, not claims about the existing logo artwork or an implemented product.

## Overview

**Product:** Zoniva — *Smarter delivery zones. Simpler operations.* A delivery-zone and order management SaaS for business owners managing products, coverage areas, inventory, and customer orders.

**Personality:** precise, trustworthy, approachable, efficient, calm. A functional operations tool rather than a consumer marketplace or data-heavy analytics suite. Favor low-to-medium information density, structured whitespace, clearly labeled actions, and quick scanning.

**Visual signature:** white and very light neutral surfaces, dark navy copy, selective blue actions, cyan as a subtle supporting accent. The provided logo combines a blue location pin with a cyan coverage orbit and dark navy wordmark. Preserve that recognizable motif in the actual brand artwork; do not redraw the logo using generic Lucide icons.

**Principles:**
1. **Location-first clarity:** geographic area and delivery eligibility must be obvious at a glance.
2. **One obvious next action:** primary buttons guide users to create a product, zone, or order.
3. **Predictable workflows:** forms and dialogs share layout, terminology, validation, and button placement.
4. **Accessible operational feedback:** show actionable text beside icons and status colors.
5. **Mobile-ready, not mobile-compromised:** maps, forms, tables, and navigation remain usable on narrow screens.
6. **Minimal MVP discipline:** do not add marketing dashboards, charts, bulk actions, or settings views outside the PRD.

The interface must never feel neon, overly animated, gamified, cluttered, or like a complex enterprise GIS tool.

## Colors

### Brand and semantic colors

| Token | Hex | Usage |
| --- | --- | --- |
| `primary` | `#2563EB` | Main CTA, selected navigation accent, links, focused action |
| `primary-hover` | `#1D4ED8` | Primary hover and map zone outline |
| `primary-active` | `#1E40AF` | Pressed primary control |
| `secondary` | `#06B6D4` | Selected map center, restrained brand detail |
| `logo-navy` / `foreground` | `#0F172A` | Main typography and high-priority information |
| `background` | `#FAFAFA` | Application page canvas |
| `surface` | `#FFFFFF` | Cards, sidebar, dialogs, inputs |
| `surface-muted` | `#F4F4F5` | Quiet badges and muted containers |
| `foreground-muted` | `#52525B` | Secondary copy and descriptions |
| `foreground-subtle` | `#71717A` | Low-priority hints; verify contrast before using at small sizes |
| `border` | `#E4E4E7` | Controls, cards, separators |
| `success` | `#15803D` | Confirmed delivery eligibility, successful save |
| `warning` | `#A16207` | Insufficient-stock or caution messages |
| `destructive` | `#B91C1C` | Invalid delivery area, input errors, destructive controls |

Use a Neutral/Zinc base compatible with shadcn semantic tokens. Map these literals to `--background`, `--foreground`, `--card`, `--card-foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--muted`, `--muted-foreground`, `--border`, `--input`, `--ring`, `--destructive`, and sidebar variables rather than scattering hex constants through features. `secondary` in shadcn may remain a neutral control treatment; reserve `#06B6D4` for the **brand cyan accent** rather than forcing cyan fills on every secondary button.

### Usage rules

- Default screen background is `background`; surfaces and dialogs are white. Do not use colored section backgrounds as decoration.
- Blue represents actions, selected navigation, and map coverage. Green means confirmed eligibility; red means invalid/unavailable. Never use blue alone to indicate order validity.
- Use `success-soft`, `warning-soft`, and `destructive-soft` as low-chroma status backgrounds with readable dark status text.
- Maintain WCAG AA: normal text at least **4.5:1**, large text and meaningful graphical elements at least **3:1**. Validate foreground/color pairings in the final theme; avoid small light-gray text.
- On map tiles, status and label readability must not depend on map color: pair circles with outlines, legends, tooltips, and textual names.
- The supplied logo is an artwork asset with its own gradient. **Do not introduce logo-like gradients into cards, buttons, or page backgrounds.**

### Dark mode

Not in MVP scope. Ship one polished light theme; retain semantic tokens so dark mode could be added later. Do not invent a partial dark theme or ship mismatched component colors.

## Typography

Use **Geist** where available, then Inter, then system sans-serif; all screens should use the same stack. Type follows the frontmatter scale:

| Role | Size / weight | Application |
| --- | --- | --- |
| Page title | 24px / 600 | Dashboard, Products, Delivery Zones, Orders |
| Section heading | 18px / 600 | Overview blocks, zone details, dialog titles |
| Card heading | 16px / 600 | Metric and list titles |
| Body | 14px / 400 | Table cells, descriptions, validation messages |
| Form label | 14px / 500 | Explicit labels above controls |
| Caption | 12px / 400 | Supporting metadata and timestamps |
| Metric | 30px / 600 | Dashboard totals |
| Code/ID | 12px / 400 monospace | Truncated order identifiers as needed |

Rules: use sentence case for titles and labels; do not use all-caps headings. Keep headings short. Default to left alignment; right-align numeric table columns where useful. Use tabular numerals for quantities, prices, counts, radius, and order totals. Localize number and currency formatting consistently; the PRD does **not** specify a currency, so do not hardcode USD, MAD, or a symbol without a product configuration decision. Display meaningful units (`m`, `km`) on all delivery radius controls/readouts; store and validate meters. Links require distinguishable hover/focus treatment and preferably an underline in prose.

## Layout

### Spacing and containers

- Base unit: **4px**, using `spacing` frontmatter scale and Tailwind utilities.
- Mobile content padding: **16px**; desktop: **24px**. Horizontal alignment is consistent across page titles, cards, and tables.
- Standard gap between page sections: **24px**; between form fields: **16px**; between a label and field: **8px**.
- Card padding: **16px mobile**, **24px desktop** for roomy informational cards; compact tables may use 16px.
- Recommended main content maximum width: **1440px** for dashboards and map-heavy screens, while forms use their own narrower widths. Allow map content to expand within available space.
- Avoid nested cards unless they visibly simplify hierarchy. Prefer one border around a section and internal separators.

### Core application shell

For desktop/tablet sidebars, use the official **shadcn Sidebar** components: `SidebarProvider`, `Sidebar`, `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarInset`, and `SidebarTrigger`. Do not reimplement a custom sidebar.

**Desktop:** left sidebar approximately **240–256px** wide in expanded mode (use the library-supported width variables), thin right border, fixed content hierarchy. Main content occupies remaining width; top header approximately **56–64px** high. Include the sidebar trigger and a short page context/title as appropriate. Optional library-supported icon-collapse is allowed; if collapsed, show the supplied compact logo mark and icon-only menu items with tooltips/accessible labels.

**Sidebar header:** approved Zoniva logo with wordmark; size for legibility without stretching. The artwork has substantial whitespace around it, so crop/container-fit carefully. Store and serve appropriately cropped transparent assets where possible rather than embedding the original large white canvas as a tiny unreadable graphic.

**Navigation order:** Dashboard (`LayoutDashboard`), Products (`Package`), Delivery Zones (`MapPinned`), Orders (`ShoppingCart` or `ClipboardList`). These are Lucide navigation icons, **not** replacements for the logo. Active item gets a quiet neutral/blue-tinted background plus clear text emphasis and `aria-current="page"`; inactive items stay neutral. Do not show unrelated routes.

**Sidebar footer:** authenticated user name and email, dropdown with Logout. Show truncation for long emails and a visible accessible dropdown trigger.

**Mobile (<640px):** replace the side sidebar and header menu trigger with an Airbnb-inspired **bottom navigation bar**: a white surface, subtle top border, evenly spaced icon-and-label destinations, and clear active-route emphasis. Keep Zoniva styling rather than copying Airbnb branding.

- Show the same four destinations in the same order as desktop. A leaf item navigates directly; an item with children is a button that opens a **bottom drawer** containing only its related child items. Highlight the parent when a child route is active, and close the drawer after navigation. Reuse one navigation definition across layouts; do not invent child routes for the MVP.
- Place the bar in the app shell's bottom layout row, **not over page content**. Use a `100dvh` column/grid shell with a `min-height: 0`, independently scrollable main content region and a non-shrinking bottom navigation row. Page content scrolls freely above the bar, including its last item; the bar remains visible without a fixed/absolute overlay or compensating content padding.
- Include bottom safe-area padding in the bar's own height and provide at least 44 × 44px touch targets. Keep visible text labels and use links with `aria-current="page"` for destinations; drawer triggers are buttons with expanded state and an accessible name.
- Remove standalone page/sidebar footers from the mobile layout. Move their existing content, including authenticated name, email, and Logout, into the **bottom section of the drawer**, separated from the related menu list. If the current navigation has no children, provide a labeled Account utility button in the bar to open that section; this is not an additional route or feature page.
- Compose the bottom drawer using the supported shadcn **Drawer** primitive from `@zoniva/ui`, not a hand-built gesture panel. Give it an accessible title, close control, focus containment/restoration, Escape dismissal, and a backdrop that blocks background interaction and scrolling. Its menu body scrolls independently when tall; the footer stays at its bottom, respects safe areas, and remains reachable with large text or a short viewport.
- A full-screen location picker or modal appears above the shell and hides/inerts the bottom navigation while active. Its Confirm/exit controls must not compete with the bar. Restore the bar and the prior page scroll position when it closes.

**Tablet (640–1023px):** retain the supported sidebar sheet or compact sidebar. Desktop sidebar behavior and footer remain unchanged.

### Route-specific compositions

| Route | Main layout | Primary action |
| --- | --- | --- |
| `/login` | Centered auth card, constrained width (~400px), logo above form | Log in |
| `/signup` | Same auth layout and width | Create account |
| `/dashboard` | Page heading, three responsive metric cards, zone overview list/grid, selected-zone detail panel | No invented global action; link to relevant feature if useful |
| `/products` | Title/action row, bordered table with zone badges, add dialog | Add Product |
| `/zones` | Title/action row, existing zone list plus spacious map and create-zone dialog/form | Create Zone |
| `/orders` | Title/action row, orders table, map-assisted order dialog/form | Create Order |

There is no separate product detail, profile, customer, analytics, or settings page in the MVP. Root `/` redirects by auth state; unknown routes get a restrained 404 with a clear route back.

## Elevation & Depth

Zoniva is primarily **flat and border-led**. Use a 1px `border` outline on cards, tables, inputs, and panels; hierarchy comes from placement, heading scale, contrast, and spacing.

- **Base surface:** no shadow; white on `#FAFAFA`.
- **Dropdown/popover:** subtle shadow such as `0 4px 12px rgba(15, 23, 42, 0.08)` and a visible border.
- **Dialog:** restrained shadow such as `0 12px 32px rgba(15, 23, 42, 0.14)`; overlay uses `overlay` with approximately 45–55% opacity.
- **Focus:** clearly visible ring equivalent to a 2px primary-colored outline/ring with offset; no focus suppression without an accessible replacement.
- **Hover:** use subtle background/border changes instead of lifting cards with exaggerated motion.
- **Map controls:** may use one low-intensity shadow to separate them from busy tiles; maintain readable solid backgrounds.

Avoid glow effects, glassmorphism, strong drop shadows, layered cards-within-cards, and decorative blur.

## Shapes

Use consistent moderate rounding:

- Inputs, buttons, and small alerts: **8px** (`rounded.md`).
- Cards, dialogs, and large panels: **12px** (`rounded.lg`).
- Small zone badges: **4px** (`rounded.sm`) or library-consistent rounded badge styling.
- Avatars/markers: circular where appropriate; location pins use map library assets or official primitives.
- Default border width: **1px**. Map circle outlines may be **2px** for visibility.
- Do not mix extra-sharp inputs with exaggerated pill-shaped buttons. Pill shapes are reserved for compact semantic status treatments if used consistently.

## Components

All foundational components come from **`@zoniva/ui`**, using shadcn/ui primitives and semantic Tailwind tokens. Business-specific compositions remain in their feature folders. Do not fork UI primitives or invent component APIs. Use actual versions of installed shadcn Map, TanStack Form, and TanStack Table.

### Buttons

- Primary: blue background, white text, 40px height, 8px radius, horizontal padding ~16px; hover `primary-hover`, active `primary-active`.
- Secondary/outline: white or quiet neutral surface and border, dark text; hover muted surface.
- Ghost: navigation/utility actions only, obvious focus and hover states.
- Destructive: reserved for destructive actions (not mandatory in MVP).
- Button labels are verbs: **Add Product**, **Create Zone**, **Create Order**, **Save Zone**, **Log in**.
- Provide icon + label for primary creation actions where space allows, never icon-only without an accessible label.
- Disable submission while a request is pending, with spinner/loading text and prevention of duplicate submissions.
- Default visual control height 40px; ensure actionable touch area **at least 44 × 44px on mobile**.

### Inputs, selects, and forms

- Use `Input`, `Select`, `Label`/`Field`, `Button`, and TanStack React Form with Zod contracts.
- Labels appear **above**, not only as placeholders. Mark required fields clearly; reserve helper text for constraints.
- Height 40px desktop, touch target >=44px mobile; border and 8px radius. Read-only coordinates may be displayed as compact helper data rather than making users edit raw lat/lon.
- Error state: visible red border/indicator **plus concise error text**, `aria-invalid`, and error association. Preserve entered values after failures.
- Use inline errors for specific fields; use `Alert` or an in-dialog status region for submission failures.
- Decimal prices should have consistent formatting and validation; price >0. Quantity is a nonnegative integer for products and a **positive** integer for orders.
- Product dialog: Name, Price, Quantity, multi-zone assignment to user-owned zones. Products without zones remain visible but are not orderable.
- Zone dialog: Name, address search/manual center picker, radius in meters, immediate circle preview, Save Zone. Radius must be >0.
- Order dialog: Product, quantity, address search/manual customer location, eligibility status, assigned zone, computed total, submit. The location status resets when product, quantity, or coordinates change.

### Cards and metrics

- White surface, 1px border, 12px radius, no default shadow. Use `CardHeader`, `CardTitle`, `CardContent` as applicable.
- Metric card: subdued title and prominent numeric value. Exactly three primary dashboard metrics: **Total products**, **Total delivery zones**, **Total orders**.
- Show `0`, not blank, for genuinely empty metrics. Use skeletons during loading and descriptive errors on failure.
- Zone overview item displays zone name, radius, assigned product count, and order count. Selection should be apparent without relying solely on color.

### Tables and data displays

- TanStack Table for Products and Orders with shadcn `Table` primitives. Use typed columns, stable row IDs, `getCoreRowModel`, and no unnecessary sorting/filtering/pagination.
- Table header: muted/neutral background or white with bottom border, medium text. Rows: 48–56px minimum on desktop; quiet hover state. Numeric data right-aligned where appropriate.
- **Products:** Name, Price, Quantity, Delivery zones. Render zone names as small neutral badges; wrap when needed. Empty zone assignment uses “No zones assigned.”
- **Orders:** Order ID, Product, Quantity, Delivery zone, Total amount, Date. Format date consistently and truncate long IDs with an accessible way to see the full ID (e.g., title/tooltip).
- On narrow screens, contain tables in horizontal scroll regions with no page-level overflow; if using stacked item cards, preserve all required fields and labels. Do not silently hide critical eligibility, price, or zone data.
- Empty state: brief explanation and relevant create action. Error state: human-readable message and Retry where available. Loading state: stable skeleton rows to avoid layout jumping.

### Badges and status messaging

- Neutral zone badges have muted background and dark readable text.
- Success status shows a check icon (optional) and **“Delivery available in [Zone Name].”**
- Invalid coverage shows **“Delivery is unavailable at this location.”**
- Product unavailable in selected coverage shows **“This product is not available in the selected delivery area.”**
- Insufficient stock gets a distinct explicit quantity/stock error. Do not represent eligibility using color or map circles alone.
- Feedback messages should be announced with an appropriate live region (`role="status"` for non-urgent success, `role="alert"` for errors) without excessive screen-reader repetition.

### Dialogs, dropdowns, and toasts

- Use shadcn `Dialog` for create flows. Desktop max-width: roughly 480–640px for standard forms; allow a wider zone/order dialog or split region when the map is included. Mobile dialog is near-full viewport width with safe padding and scrollable contents; actions remain discoverable.
- Dialog structure: concise title, optional explanation, grouped fields, clear Cancel and primary Submit actions. Escape key and close control must work without losing data accidentally in surprising ways.
- Use dropdown menu for user account and logout, with accessible keyboard interactions.
- Use Sonner for succinct post-save confirmation. Inline errors and map eligibility messages remain persistent where decisions depend on them; never rely on fleeting toasts for rejection details.

### Maps and geographic controls

**Required:** shadcn Map plus **MapSearchControl** for both zone-center selection and customer-location selection. Refer to the installed shadcn Map documentation and actual engine; do not assume Leaflet APIs. A map must be client-only where the installed mapping component depends on browser APIs; render a stable placeholder/skeleton before hydration.

**Zones screen:** display all saved named zones with geographical circles, visible center markers, and a selected or editing preview. A list alongside/above the map links names to selected map coverage. The newly selected center uses the cyan accent so it is visually distinct from previously saved blue zones. Zoom and center adjustments must not alter stored geographical coordinates.

**Zone creation flow:** on desktop, search or click the map → update explicit latitude/longitude form values; on mobile, open the full-screen picker → search or pan beneath a fixed center pin → Confirm location → populate read-only latitude/longitude inputs and return to the form. Then set radius in **meters** → preview true geodesic coverage → save. New preview may use a dashed outline while existing saved zones use solid outlines. Use semi-transparent blue fill (~12–18% opacity) and solid ~2px blue stroke. Geographic circles must represent physical radius, **never CSS pixel radius**. Multiple circles and overlaps are supported.

**Order location picker:** Search Control with suggestions, desktop click selection, customer marker, and any relevant assigned product zones. On mobile, use the full-screen centered-pin picker described below and update the form's read-only customer latitude/longitude inputs only after confirmation. Distinguish marker and boundary styling. Re-evaluate when location or product changes and show a text result below/adjacent to map. The UI preview is informative; final authoritative validation happens on the server when creating the order.

**Mobile full-screen location picker (zone centers and customer locations):**

- Below 640px, provide a clearly labeled “Choose location” / “Change location” button in the form. Open the map edge-to-edge over the application, not inside the scrollable form. Preserve all other form values.
- Use the available viewport height (`100dvh`), prevent background scrolling while open, and respect safe-area insets. Keep map attribution visible and unobstructed.
- Place **MapSearchControl** at the top beside an accessible, labeled exit button. Use touch targets of at least 44 × 44px and a minimum 16px search-input font size. Search suggestions must remain above the map and usable with the software keyboard open.
- Anchor a non-interactive pin overlay at the exact map center, with its **tip** indicating the selected point. Users pan the map with one finger beneath the stationary pin and can pinch to zoom; tapping the map must not move the pin independently. Retain keyboard map navigation and address search as alternatives to touch gestures.
- Maintain a draft location while the picker is open. Search results recenter the map beneath the pin; panning updates the draft from the map engine's center. Neither action changes confirmed form coordinates yet. On reopening, center on the previously confirmed location; otherwise use the existing configured initial map view without claiming it is the user's location.
- Place a full-width **Confirm location** button at the bottom, above the home indicator and clear of attribution. On confirmation, read the map's current center (including any in-progress movement), validate latitude/longitude, commit both values together, and return to the form. Do not allow a continuing search fly-to animation to change the intended confirmed point; stop movement before reading the center.
- The form shows labeled **read-only latitude and longitude inputs** populated by the confirmed selection. Until the first confirmation, show no selected coordinates and prevent zone saving or order validation/submission that requires a location. Confirming a customer location resets stale eligibility and triggers the existing eligibility flow; authoritative validation remains server-side.
- Exiting via the top control, Escape, or supported dismissal cancels the draft without changing the prior confirmed coordinates or other form values. Use the existing accessible dialog primitive with a title, focus containment, and focus restoration to the opening button.
- Disable confirmation until the map is ready and its center is valid. Show explanatory map/search errors; a failed search must not prevent manual panning when the map still works. On desktop, retain the inline search/click picker and read-only coordinate inputs.

**Geographic integrity:** store named `latitude` and `longitude`, display location coordinates only as supportive metadata, normalize GeoJSON as `[longitude, latitude]`, and use the map engine’s expected order at the boundary. For eligibility the server applies Haversine distance in meters, inside boundary inclusive (`distance <= radius`), restricted to zones assigned to that product; if overlapping eligible zones exist choose nearest center with stable tie-breaker. The UI must never imply that containment in an unassigned zone allows ordering.

**Map usability:** map controls and search must stay above map overlays, be keyboard-accessible if supported, and remain reachable on touch devices. Include visible map provider attribution per provider requirements. Do not place hidden or unverified provider keys in client code. If map/geocoding fails, show an explanatory error; where feasible, keep manual map selection available rather than fabricating a location result.

### Navigation and authentication

- Auth screens are uncluttered and intentionally separate from the application shell; show the supplied Zoniva logo, name/tagline, and one form card.
- Signup fields: Name, Email, Password. Login fields: Email, Password. Include a clear link between auth routes.
- Error messaging is generic enough to avoid credential disclosure; sessions/route protection are enforced server-side, not just visual redirects.
- Protected shell exposes exactly Dashboard, Products, Delivery Zones, Orders, and user Logout. Logo links to dashboard when authenticated.

### Dashboard zone detail composition

- The selected zone shows heading, radius, product count, order count, product list/table (Name, Price, Available quantity), and order list/table (Order ID, Product, Quantity, Total, Date).
- On desktop: overview list/grid and detail panel can sit side-by-side if readable; on mobile: stack overview above details. If no zone exists, display a straightforward “Create your first delivery zone” empty state with navigation to Zones.
- Data, counts, and current order totals must be sourced from authenticated API operations; no decorative fake metrics or charts.

## Do's and Don'ts

### Do

- Preserve the supplied pin-and-orbit logo and its blue/cyan/navy visual identity.
- Start with shared semantic shadcn tokens and official components.
- Use a consistent 4px spacing scale, modest typography, light surfaces, and subtle 1px borders.
- Make the active zone, selected map point, selected product, and delivery result explicit in text.
- Reuse form feedback patterns across products, zones, and orders.
- Make all interactive controls keyboard navigable, with visible focus and meaningful labels.
- Use server-derived outcomes for final order success or rejection; refresh relevant tables and dashboard after a successful mutation.
- Preserve no-data, loading, error, successful, disabled, and validation states in every significant feature.

### Don't

- Don't add charts, analytics, driver/customer features, settings pages, animations, or payment flows outside the PRD.
- Don't build a custom sidebar, fake map, hand-coded autocomplete, or new component library when supported primitives exist.
- Don't use large gradients behind layouts, neon accent fills, or oversized headings.
- Don't use color alone as the only success/failure cue.
- Don't assume a selected location is deliverable before product-zone matching and server validation.
- Don't enable ordering for unassigned products or oversold inventory.
- Don't expose internal database/worker errors, secrets, or authentication cookies in UI states.
- Don't hardcode demo content as real products, orders, zones, or dashboard statistics.
- Don't confuse radius in meters with coordinates or pixel distances.

## Responsive Behavior

**Strategy:** mobile-first. Design for ~320px through large desktops without page-level horizontal scrolling. Use Tailwind/shadcn responsive breakpoints with these practical bands:

| Width | Shell and content | Components |
| --- | --- | --- |
| **Mobile <640px** | Bottom navigation in its own shell row; independently scrolling page; child menus and footer in a bottom drawer; 16px page gutters | 44px touch targets; forms single column; location selection in a full-screen centered-pin map with top search/exit and bottom confirmation; overview maps ~280–360px; scroll container for tables; dialogs fit viewport |
| **Tablet 640–1023px** | Drawer or library-supported compact sidebar; 16–24px gutters | Metrics can use 2 columns; zone list/map may stack; dialogs can widen |
| **Desktop >=1024px** | Left sidebar visible; 24px gutters; content max-width ~1440px | Three metric cards in one row; map with adjacent list/form where space permits |

At 320–375px, do not put two full-width primary buttons side by side. Page title/action may stack vertically with a full-width creation button. Map overlays/search should not obscure the only available selection interface. Prevent dialog overflow by scrolling its internal content. On mobile, move large map interactions above explanatory details if necessary but retain accessible order-form controls. Avoid shrinking typography below 12px captions or 14px body to fit columns. Focus order must match visual reading order.

**Reduced motion:** honor `prefers-reduced-motion` and disable nonessential transitions. Use short native shadcn transitions for dialogs/drawers only; no decorative page entrance effects.

### Native-feeling mobile experience

**Experience goal:** users should feel they are navigating a native application, not a desktop website compressed onto a phone. This is a requirement for interaction quality, not a request for a native rewrite, decorative animation, or additional features.

- **Continuous navigation:** keep the app shell stable during client-side route changes; do not flash a blank screen or reload the document for internal navigation. Preserve each destination's scroll position when switching away and returning. Use the router's supported restoration for the actual inner scroll container, not just the window. Browser Back/Forward must remain correct; opening a transient drawer or map must not strand the user or lose form data.
- **Immediate touch feedback:** controls respond visually on press (`:active`), not only after release or a network response. Use `touch-action: manipulation` on buttons/links, suppress browser tap highlights only where equivalent feedback exists, and gate hover styling by hover capability. Prevent long-press text selection on controls, never on addresses, coordinates, or other content users may copy.
- **Platform-correct scrolling:** keep one primary page scroll region, with separate scrolling only where required for tables or open drawers/dialogs. Contain scroll chaining in overlays and prevent underlying-page movement or accidental pull-to-refresh during map/drawer gestures. Use the installed map/drawer gesture handling rather than global touch-event cancellation; preserve browser zoom and ordinary scrolling.
- **Keyboard and safe areas:** use `100dvh`, `viewport-fit=cover`, and appropriate `env(safe-area-inset-*)` padding. Mobile editable inputs use at least 16px text and suitable input types/input modes. Keep the focused field, search results, validation feedback, and relevant actions reachable with the software keyboard open. Do not autofocus on route entry and unexpectedly summon the keyboard. Never disable pinch zoom.
- **Predictable state:** opening/closing a drawer or map preserves the underlying page and in-progress form. Failed requests keep entered values and show actionable inline feedback. Stable skeletons and explicit pending states avoid layout jumps and duplicate submissions; do not fake success or show full-screen loaders for ordinary cached navigation.
- **Restrained motion:** use the installed drawer/dialog's brief, interruptible transitions to explain opening/closing only; respect reduced motion. No animated route choreography, decorative motion, or custom gesture engine.
- **Acceptance on hardware:** verify iOS Safari and Android Chrome on real phones, including a smaller/older device, landscape, large text, an open software keyboard, browser chrome changes, and slower networking. Check press feedback, scroll continuity, Back/Forward, drawer dismissal, map panning, and safe-area spacing. Desktop emulation alone cannot establish native-feeling behavior.

## Accessibility & Content Standards

- Meet WCAG AA color contrast targets, visible focus, and semantic HTML.
- Every actionable icon needs accessible text (`aria-label` or visible label). Navigation indicates current page.
- Every form error references its field and explains the repair action; summary errors do not overwrite valid user input.
- Support keyboard operation for dropdowns, sidebar, dialogs, selects, tables, and location search to the extent the chosen map provider allows; offer a non-gesture search route for selecting locations.
- Never prevent the user from reading a status message by dismissing it immediately.
- Label location concepts unambiguously: “Zone center”, “Delivery radius (meters)”, “Customer location”, “Assigned delivery zone”.
- Use consistent empty-state language: “No products yet”, “No delivery zones yet”, “No orders yet”, followed by one relevant action.
- Handle pending map loading, no search results, geocoding failures, server connection failures, session expiry, and unexpected request errors.

## Implementation Map

| UI area | Location in architecture | Preferred primitives |
| --- | --- | --- |
| App shell | `apps/web/src/components/layout/` | shadcn Sidebar (desktop/tablet), mobile bottom navigation, Drawer, Dropdown Menu, Separator |
| Auth routes | `apps/web/src/routes/login.tsx`, `signup.tsx` | Input, Label, Button, Card, Alert |
| Dashboard | `apps/web/src/components/features/dashboard/ui/` | Card, Skeleton, Badge, zone overview/detail |
| Products | `apps/web/src/components/features/products/ui/` | Dialog, TanStack React Form, Table, Badge |
| Zones | `apps/web/src/components/features/zones/ui/` | Dialog, Map, MapSearchControl, form controls |
| Orders | `apps/web/src/components/features/orders/ui/` | Dialog, MapSearchControl, Alert, Table |
| Shared UI and tokens | `packages/ui/src/` | shadcn primitives, global theme, map wrappers where reusable |

Keep TanStack Start route files thin. Business UI calls server functions, which use the server-only oRPC client; authenticated operations, authorization, geospatial validation, stock transactions, and persisted results belong to the backend. Use TanStack Query for server data and invalidation after mutations. Do not introduce direct browser-to-oRPC feature requests. Better Auth browser client is the documented authentication exception.

## Agent Prompt Guide

**Paste-ready agent instruction:**

> Implement Zoniva UI according to `DESIGN.md` and PRD v3.0. Build a clean, neutral, mobile-first shadcn/ui SaaS shell with the official shadcn Sidebar, blue `#2563EB` primary actions, cyan `#06B6D4` selective map highlights, navy `#0F172A` text, white cards on `#FAFAFA`, 4px spacing increments, 8px controls, and 12px cards. Use the supplied Zoniva logo, not a replacement icon. Create only Login, Signup, Dashboard, Products, Delivery Zones, and Orders views. Use official shadcn Map plus MapSearchControl for zone centers and order customer locations, with true geographic radius circles and explicit validation states. Feature forms use TanStack React Form; tables use TanStack Table; design primitives come from `@zoniva/ui`. Include responsive layout, accessible labels/focus, skeletons, empty/error states, and server-derived data. Do not add non-MVP features or decorative effects. Verify installed component APIs before coding.

**Token quick reference:** primary `#2563EB`; brand cyan `#06B6D4`; foreground `#0F172A`; background `#FAFAFA`; surface `#FFFFFF`; border `#E4E4E7`; body 14px; page heading 24px; spacing 4px steps; control radius 8px; card radius 12px.

**Decision priority:** (1) functional PRD workflows and server integrity, (2) installed official component patterns, (3) these visual tokens and responsive rules, (4) small cosmetic refinement. When a component cannot support a specified visual interaction in the installed version, use its documented equivalent rather than inventing props. Treat this file as the design reference and the PRD as the feature/business-rule reference.

## UI Acceptance Checklist

- [ ] Brand logo legible on Login, Signup, Sidebar, and favicon/metadata; compact symbol available for collapsed sidebar.
- [ ] Exactly four authenticated route destinations, proper active state, account menu and Logout; mobile may include an Account drawer utility, not another route.
- [ ] Mobile bottom navigation occupies its own layout row without covering page content; the page scrolls independently and its final content remains reachable.
- [ ] Parent items open related child menus in a bottom drawer; leaf items navigate directly, and mobile footer/account content exists only in the drawer's bottom section.
- [ ] Drawer focus, dismissal, long-content scrolling, and safe areas work; full-screen pickers hide/inert the bottom bar and restore it on exit.
- [ ] Title, primary action, cards, tables, map regions, and dialogs follow consistent spacing and theme.
- [ ] Product form validates name, positive price, nonnegative integer inventory, and owned zone assignments.
- [ ] Zone form has searchable and clickable center selection, numeric radius in meters, accurate preview, and saved circles.
- [ ] Order form selects product, positive quantity, searchable/clickable location, eligibility status, assigned zone, and computed amount.
- [ ] Invalid/outside/unassigned locations show clear rejection text; no order saved on failure.
- [ ] Dashboard metrics and zone details reflect real user data, including empty state.
- [ ] Each major view has skeleton/loading, error, empty (where appropriate), and success states.
- [ ] Mobile navigation, dialogs, maps, tables and controls work at 320px and up without body overflow.
- [ ] Mobile zone/order location pickers fill the viewport, keep a fixed center pin, support one-finger panning and search, and expose top search/exit plus bottom Confirm location controls.
- [ ] Confirmation commits the current map center into read-only form inputs; exit cancels the draft, reopening restores the confirmed point, and other form values remain intact.
- [ ] Text and controls meet contrast, focus, semantics, keyboard, and touch-target requirements.
- [ ] No non-PRD routes or decorative widgets have been introduced.
