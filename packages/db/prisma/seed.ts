import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { hashPassword } from 'better-auth/crypto'
import { PrismaClient } from '../src/generated/node/client'

const email = process.env.SEED_USER_EMAIL?.trim().toLowerCase()
const password = process.env.SEED_USER_PASSWORD
if (!process.env.DATABASE_URL || !email || !password || password.length < 8) {
  throw new Error('DATABASE_URL, SEED_USER_EMAIL and SEED_USER_PASSWORD (8+ chars) are required.')
}

const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
})

try {
  // Reuse the user if present; never touch other users or their non-credential accounts.
  const user =
    (await db.user.findUnique({ where: { email } })) ??
    (await db.user.create({
      data: { id: crypto.randomUUID(), name: 'Demo Admin', email, emailVerified: true },
    }))

  const credential = await db.account.findFirst({
    where: { userId: user.id, providerId: 'credential' },
  })
  const hash = await hashPassword(password)
  if (credential) {
    await db.account.update({ where: { id: credential.id }, data: { password: hash } })
  } else {
    await db.account.create({
      data: {
        id: crypto.randomUUID(),
        userId: user.id,
        accountId: user.id,
        providerId: 'credential',
        password: hash,
      },
    })
  }
  console.log(`Seeded demo user ${email}`)
} finally {
  await db.$disconnect()
}
