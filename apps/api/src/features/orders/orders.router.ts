import { ORDER_MESSAGES } from '@zoniva/contracts'
import type { Database } from '@zoniva/db'
import { ORPCError } from '@orpc/server'
import { authed } from '../../middleware/auth'
import { matchZone, type LatLng } from './geo'

type Tx = Parameters<Parameters<Database['$transaction']>[0]>[0]

const zoneSelect = { id: true, name: true, latitude: true, longitude: true, radiusMeters: true }

/** Loads the owned product and resolves the delivery zone for a location. */
async function resolveDelivery(db: Database | Tx, userId: string, productId: string, at: LatLng) {
  const [product, zones] = await Promise.all([
    db.product.findFirst({
      where: { id: productId, userId },
      select: { id: true, price: true, zones: { select: { id: true } } },
    }),
    db.deliveryZone.findMany({ where: { userId }, select: zoneSelect }),
  ])
  if (!product) throw new ORPCError('NOT_FOUND', { message: 'Product not found.' })
  const match = matchZone(at, zones, new Set(product.zones.map((z) => z.id)))
  return { product, match }
}

const orderSelect = {
  id: true,
  quantity: true,
  unitPrice: true,
  totalAmount: true,
  customerLatitude: true,
  customerLongitude: true,
  customerAddress: true,
  createdAt: true,
  product: { select: { id: true, name: true } },
  zone: { select: { id: true, name: true } },
}

type OrderRow = {
  unitPrice: { toFixed(d: number): string }
  totalAmount: { toFixed(d: number): string }
  createdAt: Date
}
const toOrder = <T extends OrderRow>(o: T) => ({
  ...o,
  unitPrice: o.unitPrice.toFixed(2),
  totalAmount: o.totalAmount.toFixed(2),
  createdAt: o.createdAt.toISOString(),
})

export const ordersRouter = {
  list: authed.orders.list.handler(async ({ context }) => {
    const rows = await context.db.order.findMany({
      where: { userId: context.userId },
      select: orderSelect,
      orderBy: { createdAt: 'desc' },
    })
    return rows.map(toOrder)
  }),

  validateLocation: authed.orders.validateLocation.handler(async ({ context, input }) => {
    const { match } = await resolveDelivery(context.db, context.userId, input.productId, input)
    if (match.ok) {
      return {
        available: true as const,
        zone: { id: match.zone.id, name: match.zone.name },
        message: ORDER_MESSAGES.available(match.zone.name),
      }
    }
    return {
      available: false as const,
      reason: match.reason,
      message:
        match.reason === 'OUTSIDE_ZONES'
          ? ORDER_MESSAGES.unavailableLocation
          : ORDER_MESSAGES.unavailableProduct,
    }
  }),

  create: authed.orders.create.handler(({ context, input, errors }) =>
    context.db.$transaction(async (tx) => {
      // Re-validate everything inside the transaction; the client's earlier check is advisory.
      const { product, match } = await resolveDelivery(tx, context.userId, input.productId, input)
      if (!match.ok) {
        throw match.reason === 'OUTSIDE_ZONES'
          ? errors.LOCATION_UNAVAILABLE()
          : errors.PRODUCT_UNAVAILABLE()
      }

      // Conditional decrement: concurrent orders cannot drive stock below zero.
      const { count } = await tx.product.updateMany({
        where: { id: product.id, userId: context.userId, quantity: { gte: input.quantity } },
        data: { quantity: { decrement: input.quantity } },
      })
      if (count === 0) throw errors.INSUFFICIENT_STOCK()

      const row = await tx.order.create({
        data: {
          quantity: input.quantity,
          unitPrice: product.price,
          totalAmount: product.price.mul(input.quantity),
          customerLatitude: input.latitude,
          customerLongitude: input.longitude,
          customerAddress: input.customerAddress ?? null,
          userId: context.userId,
          productId: product.id,
          zoneId: match.zone.id,
        },
        select: orderSelect,
      })
      return toOrder(row)
    }),
  ),
}
