import { createORPCClient, ORPCError } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { redirect } from '@tanstack/react-router'
import { getRequestHeader, setResponseHeader } from '@tanstack/react-start/server'
import type { ApiClient } from '@zoniva/contracts'

export function apiBaseUrl() {
  const url = process.env.API_BASE_URL
  if (!url) throw new Error('API_BASE_URL is not configured.')
  return url.replace(/\/$/, '')
}

// Request-specific: forwards only the incoming session cookie to the trusted Worker.
function createApi(): ApiClient {
  const cookie = getRequestHeader('cookie')
  const link = new RPCLink({
    url: `${apiBaseUrl()}/rpc`,
    headers: cookie ? { cookie } : {},
  })
  return createORPCClient(link)
}

const GENERIC_ERROR = 'Something went wrong. Please try again.'

/** Calls the API and converts failures into messages that are safe to show users. */
export async function callApi<T>(fn: (api: ApiClient) => Promise<T>): Promise<T> {
  setResponseHeader('Cache-Control', 'private, no-store')
  try {
    return await fn(createApi())
  } catch (error) {
    if (error instanceof ORPCError) {
      if (error.code === 'UNAUTHORIZED') throw redirect({ to: '/login' })
      // 4xx messages are written for users (contract errors, validation, not found).
      if (error.status >= 400 && error.status < 500) throw new Error(error.message)
      console.error('API error', error.code, error.status)
      throw new Error(GENERIC_ERROR)
    }
    console.error('API transport error', error)
    throw new Error('Could not reach the server. Check your connection and try again.')
  }
}
