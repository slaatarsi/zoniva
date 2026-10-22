import 'dotenv/config'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations', seed: 'tsx prisma/seed.ts' },
  // process.env (not env()) so `prisma generate` works in builds without a database URL.
  datasource: { url: process.env.DATABASE_URL ?? '' },
})
