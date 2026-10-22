import { createAuthClient } from 'better-auth/react'

// Browser-safe. Relative base: the browser talks to the web origin's /api/auth proxy.
export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_AUTH_BASE_URL,
  basePath: '/api/auth',
})
