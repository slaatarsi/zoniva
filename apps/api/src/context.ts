import type { Auth } from '@zoniva/auth'
import { contract } from '@zoniva/contracts'
import type { Database } from '@zoniva/db'
import { implement } from '@orpc/server'

export type ApiContext = { db: Database; auth: Auth; headers: Headers }

export const api = implement(contract).$context<ApiContext>()
