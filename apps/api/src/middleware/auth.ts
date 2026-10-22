import { ORPCError } from '@orpc/server'
import { api } from '../context'

// The user ID always comes from the verified session, never from the client payload.
export const requireUser = api.middleware(async ({ context, next }) => {
  const session = await context.auth.api.getSession({ headers: context.headers })
  if (!session) throw new ORPCError('UNAUTHORIZED')
  return next({ context: { userId: session.user.id } })
})

export const authed = api.use(requireUser)
