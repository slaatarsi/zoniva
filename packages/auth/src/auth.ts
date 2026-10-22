import type { Database } from '@zoniva/db'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'

export type AuthEnv = {
  BETTER_AUTH_SECRET: string
  /** Public web origin; browsers reach auth through its same-origin /api/auth proxy. */
  BETTER_AUTH_URL: string
  WEB_ORIGIN: string
}

// Built per request because the Worker's Prisma client is per request.
export function createAuth(env: AuthEnv, db: Database) {
  return betterAuth({
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    basePath: '/api/auth',
    trustedOrigins: [env.WEB_ORIGIN],
    database: prismaAdapter(db, { provider: 'postgresql' }),
    emailAndPassword: { enabled: true, minPasswordLength: 8, autoSignIn: true },
    advanced: { useSecureCookies: env.BETTER_AUTH_URL.startsWith('https://') },
  })
}

export type Auth = ReturnType<typeof createAuth>
export type AuthSession = NonNullable<Awaited<ReturnType<Auth['api']['getSession']>>>
