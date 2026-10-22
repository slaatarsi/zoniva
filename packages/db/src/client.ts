import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma/client'

// One client per Worker request: Workers must not share TCP connections across requests.
export function createPrisma(connectionString: string) {
  return new PrismaClient({ adapter: new PrismaPg({ connectionString }) })
}

export type Database = ReturnType<typeof createPrisma>
