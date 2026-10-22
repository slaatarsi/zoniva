import type { Database } from '@zoniva/db'
import { ORPCError } from '@orpc/server'
import { authed } from '../../middleware/auth'

const select = {
  id: true,
  name: true,
  price: true,
  quantity: true,
  zones: { select: { id: true, name: true }, orderBy: { name: 'asc' as const } },
}

type Row = { price: { toFixed(d: number): string } }
const toProduct = <T extends Row>(p: T) => ({ ...p, price: p.price.toFixed(2) })

async function assertOwnZones(db: Database, userId: string, zoneIds: string[]) {
  if (zoneIds.length === 0) return
  const owned = await db.deliveryZone.count({ where: { id: { in: zoneIds }, userId } })
  if (owned !== zoneIds.length) {
    throw new ORPCError('BAD_REQUEST', { message: 'One or more zones were not found.' })
  }
}

export const productsRouter = {
  list: authed.products.list.handler(async ({ context }) => {
    const rows = await context.db.product.findMany({
      where: { userId: context.userId },
      select,
      orderBy: { createdAt: 'desc' },
    })
    return rows.map(toProduct)
  }),
  create: authed.products.create.handler(async ({ context, input }) => {
    const { zoneIds, ...data } = input
    await assertOwnZones(context.db, context.userId, zoneIds)
    const row = await context.db.product.create({
      data: {
        ...data,
        userId: context.userId,
        zones: { connect: zoneIds.map((id) => ({ id })) },
      },
      select,
    })
    return toProduct(row)
  }),
  assignZones: authed.products.assignZones.handler(async ({ context, input }) => {
    const owns = await context.db.product.count({
      where: { id: input.productId, userId: context.userId },
    })
    if (!owns) throw new ORPCError('NOT_FOUND')
    await assertOwnZones(context.db, context.userId, input.zoneIds)
    const row = await context.db.product.update({
      where: { id: input.productId },
      data: { zones: { set: input.zoneIds.map((id) => ({ id })) } },
      select,
    })
    return toProduct(row)
  }),
}
