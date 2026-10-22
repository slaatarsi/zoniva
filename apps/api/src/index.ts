import { createAuth } from '@zoniva/auth'
import { createPrisma } from '@zoniva/db'
import { ORPCError, onError } from '@orpc/server'
import { RPCHandler } from '@orpc/server/fetch'
import { router } from './routers'

const rpc = new RPCHandler(router, {
  interceptors: [
    onError((error) => {
      // Only unexpected failures; clients get a generic message for these.
      if (!(error instanceof ORPCError)) console.error(error)
    }),
  ],
})

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const { pathname } = new URL(request.url)
    const isAuth = pathname.startsWith('/api/auth/')
    if (!isAuth && !pathname.startsWith('/rpc/')) return new Response('Not found', { status: 404 })

    // RPC is server-to-server only (web server functions). Reject browser cross-origin calls.
    const origin = request.headers.get('origin')
    if (!isAuth && origin && origin !== env.WEB_ORIGIN) {
      return new Response('Forbidden', { status: 403 })
    }

    const db = createPrisma(env.DATABASE_URL)
    ctx.waitUntil(Promise.resolve().then(() => db.$disconnect()))
    try {
      const auth = createAuth(env, db)
      if (isAuth) return await auth.handler(request)

      const { response } = await rpc.handle(request, {
        prefix: '/rpc',
        context: { db, auth, headers: request.headers },
      })
      return response ?? new Response('Not found', { status: 404 })
    } catch (error) {
      console.error(error)
      return new Response('Internal error', { status: 500 })
    }
  },
} satisfies ExportedHandler<Env>
