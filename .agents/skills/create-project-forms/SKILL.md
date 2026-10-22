---
name: create-project-forms
description: 'Project-specific guidance for feature forms using TanStack React Form, shared web form controls, @my/ui primitives, contract-based Zod validation, and TanStack Start server functions calling oRPC.'
---

# Create Project Forms

Use this skill when creating, reviewing, or modifying forms in this project.

## Status and scope

This skill defines the intended form pattern, not infrastructure that already exists.

At the time this skill was created:

- `@tanstack/react-form` is not installed in `apps/web`.
- `useAppForm`, `FormBase`, and registered form field components do not exist.
- Existing forms use React state or native `FormData` with `@my/ui` primitives.

Check the current code before assuming that status is still accurate. Creating or reading this skill does not authorize installing dependencies, implementing infrastructure, or migrating existing forms. If a task requires missing infrastructure, identify that prerequisite and obtain approval unless setup is explicitly included in the task.

Read `PRD.md` for product scope and `DESIGN.md` before changing UI, styles, layouts, or interactions. Follow the local `create-project-features` skill for feature organization and server-function/oRPC boundaries.

## Intended form stack

- TanStack React Form through a project `useAppForm` wrapper.
- Zod schemas, reusing input schemas from `@my/contracts` where applicable.
- Shared form bindings in `apps/web/src/components/form/`.
- Visual primitives from `@my/ui` in `packages/ui`.
- TanStack Start server functions for feature submissions, delegating to the oRPC API Worker.

Once the infrastructure exists, prefer the wrapper over direct TanStack Form setup inside each feature. Follow installed library APIs and existing import conventions; do not copy unsupported APIs or aliases from another project.

## Intended structure

```text
apps/web/src/components/form/
├── hooks.tsx
├── form-base.tsx
└── form-input.tsx

apps/web/src/components/features/<feature>/
├── server/
│   ├── <feature>.functions.ts
│   └── <feature>.server.ts
└── ui/
    └── <feature>-form.tsx
```

Create additional controls only when needed. Do not prebuild a password meter, select, checkbox, or other field merely because another project has one.

- Form bindings and field context belong in the web app.
- Reusable presentation primitives belong in `packages/ui`.
- Feature-specific field composition stays in its feature until it is genuinely reusable.
- Never put Prisma, Better Auth server implementation, or API credentials in a form component or shared form module.

## Standard form behavior

When using the intended infrastructure:

1. Define explicit, correctly typed default values.
2. Connect a Zod schema through the supported TanStack Form validators, normally `onSubmit`.
3. Render fields through `form.AppField` and registered controls.
4. Prevent native form submission and call `form.handleSubmit()`.
5. Await submission work inside `onSubmit` so pending state covers the entire request.
6. Subscribe to `canSubmit` and `isSubmitting` using `form.Subscribe` for submit controls.
7. Disable duplicate submissions while pending and give clear progress feedback.
8. Reset or navigate only after success. Preserve entered values after failure.
9. Clear stale submit errors on a new attempt and display safe, actionable failure feedback.
10. Give non-submit buttons `type="button"`.

Use the installed version's supported error-map API for submit-level errors; verify the expected error shape rather than copying `setErrorMap` calls blindly. Ensure submit errors are actually rendered. Keep field validation errors distinct from request-level failures.

Do not add a second manual pending state when the form's submission state already covers it. If using a TanStack Query mutation, await it and reuse existing feature invalidation conventions.

## Validation and schemas

- Export reusable API input schemas from `@my/contracts` and use them for matching form/server-function inputs.
- Add form-specific validation only for UI-only fields such as confirmation inputs; do not duplicate or weaken API rules.
- Client validation improves feedback. Server functions and the API must independently validate untrusted input.
- Normalize values deliberately. Use the parsed/transformed schema result or normalize at the authoritative boundary; do not assume client validation replaces form state with transformed values.
- Trim appropriate text values, never passwords or other values where whitespace is meaningful.
- Match field types to controls and schema expectations. Handle empty numeric/date values explicitly rather than silently converting them to zero or invalid dates.
- Keep messages specific and user-friendly. Follow existing localization conventions if present; do not assume the other project's language files exist.

## Submission boundary

Feature data submissions follow:

```text
Feature form
  → TanStack Start server function
  → server-only oRPC client
  → API validation and authorization
  → business logic / database
```

- Import public feature server functions, not server-only implementation modules.
- Use `useServerFn` where framework-aware behavior is needed; call hooks only inside components/custom hooks.
- Do not call oRPC directly from browser form code or add an API route as a competing transport.
- Never accept ownership, roles, cookies, or authentication headers as trusted form values.
- Do not expose raw API/database errors, secrets, or stack traces.
- Server functions are callable endpoints; they do not replace API permission checks.

### Authentication exception

Preserve the existing Better Auth browser client flow unless authentication transport is explicitly in scope. Proxying sign-in/sign-out requires deliberate response-cookie propagation and verification; do not treat authentication as an ordinary feature mutation.

## Shared field controls

Once the shared form infrastructure exists, reusable controls should:

1. Live under `apps/web/src/components/form/` with kebab-case filenames.
2. Use the typed field context provided by the project's form hooks.
3. Accept the shared label/description props defined by `FormBase`.
4. Reuse `@my/ui` controls before introducing new visual primitives.
5. Bind the field value, change handler, and blur handler correctly.
6. Use unique control IDs, associate labels, and provide a name where supported. Do not assume `field.name` is unique across multiple rendered forms.
7. Connect descriptions and errors with `aria-describedby`.
8. Apply `aria-invalid` and the shared invalid styling when errors are presented.
9. Preserve disabled, required, autocomplete, and relevant native input attributes.
10. Render labels, descriptions, and field errors through the shared base rather than duplicating them in feature forms.
11. Register in `hooks.tsx` so callers can use `form.AppField` with the registered control.

Define a consistent touched/submitted error-display policy in the shared infrastructure. Do not show errors before interaction merely because a validator has already run. Custom non-native controls must preserve keyboard interaction and appropriate accessibility semantics.

## UI rules

- `DESIGN.md` is the source of truth.
- Reuse `@my/ui` fields, labels, inputs, buttons, and alerts.
- Keep forms focused on their workflow; do not redesign surrounding screens during a form migration.
- Preserve visible labels, accessible errors, keyboard submission, and focus behavior.
- Use suitable input types, autocomplete, and input modes. Do not disable password managers or prevent pasting passwords.
- Avoid unnecessary wrappers, dependencies, and shared abstractions.

## Review checklist

- Confirm required infrastructure exists before importing it.
- Use the project form wrapper and registered fields once available.
- Reuse contract schemas and preserve server-side validation.
- Match field value types and normalization to the submitted schema.
- Await submission, prevent duplicate requests, and retain values on failure.
- Render field and submit-level errors accessibly.
- Keep browser code free of server-only imports and direct feature oRPC calls.
- Preserve Better Auth behavior unless its transport is explicitly being changed.
- Add focused tests for new non-trivial validation, submission, or control behavior using the existing test setup.
- Never use Playwright in this project.
- Run the narrowest relevant checks and report any checks not performed.
