import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'
import { getRequestHeader, setResponseHeader } from '@tanstack/react-start/server'
import { apiBaseUrl } from './api.server'

export type SessionUser = { name: string; email: string }

// Server-side session check against the Worker; used by route guards (UX) — the API enforces auth itself.
export const getSessionFn = createServerFn({ method: 'GET' }).handler(
  async (): Promise<SessionUser | null> => {
    setResponseHeader('Cache-Control', 'private, no-store')
    const cookie = getRequestHeader('cookie')
    if (!cookie) return null
    const res = await fetch(`${apiBaseUrl()}/api/auth/get-session`, { headers: { cookie } })
    if (!res.ok) return null
    const data = (await res.json()) as { user?: SessionUser } | null
    return data?.user ? { name: data.user.name, email: data.user.email } : null
  },
)

export const sessionQuery = queryOptions({
  queryKey: ['session'],
  queryFn: () => getSessionFn(),
  staleTime: 60_000,
})
