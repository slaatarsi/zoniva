import { createFileRoute } from '@tanstack/react-router'
import { apiBaseUrl } from '#/lib/api.server'

// Same-origin proxy so Better Auth cookies are first-party on the web domain.
async function proxy({ request }: { request: Request }) {
  const url = new URL(request.url)
  const headers = new Headers(request.headers)
  headers.delete('host')
  const hasBody = request.method !== 'GET' && request.method !== 'HEAD'
  const response = await fetch(`${apiBaseUrl()}${url.pathname}${url.search}`, {
    method: request.method,
    headers,
    body: hasBody ? await request.arrayBuffer() : undefined,
    redirect: 'manual',
  })
  const out = new Headers(response.headers)
  // fetch already decoded the body; stale encoding/length headers would corrupt it.
  out.delete('content-encoding')
  out.delete('content-length')
  return new Response(response.body, { status: response.status, headers: out })
}

export const Route = createFileRoute('/api/auth/$')({
  server: { handlers: { GET: proxy, POST: proxy } },
})
