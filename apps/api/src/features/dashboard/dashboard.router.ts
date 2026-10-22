import { ORPCError } from '@orpc/server'
import { authed } from '../../middleware/auth'

export const dashboardRouter = {
  overview: authed.dashboard.overview.handler(async ({ context }) => {
    const where = { userId: context.userId }
    const [products, zones, orders] = await Promise.all([
      context.db.product.count({ where }),
      context.db.deliveryZone.findMany({
        where,
        orderBy: { name: 'asc' },
        select: {
          id: true,
          name: true,
          latitude: true,
          longitude: true,
          radiusMeters: true,
          _count: { select: { products: true, orders: true } },
        },
      }),
      context.db.order.count({ where }),
    ])
    return {
      totals: { products, zones: zones.length, orders },
      zones: zones.map(({ _count, ...z }) => ({
        ...z,
        productCount: _count.products,
        orderCount: _count.orders,
      })),
    }
  }),

  zoneDetails: authed.dashboard.zoneDetails.handler(async ({ context, input }) => {
    const zone = await context.db.deliveryZone.findFirst({
      where: { id: input.zoneId, userId: context.userId },
      select: {
        id: true,
        name: true,
        radiusMeters: true,
        products: {
          select: { id: true, name: true, price: true, quantity: true },
          orderBy: { name: 'asc' },
        },
        orders: {
          select: {
            id: true,
            quantity: true,
            totalAmount: true,
            createdAt: true,
            product: { select: { name: true } },
          },
          orderBy: { createdAt: 'desc' },
          take: 50,
        },
      },
    })
    if (!zone) throw new ORPCError('NOT_FOUND')
    const { products, orders, ...rest } = zone
    return {
      zone: rest,
      products: products.map((p) => ({ ...p, price: p.price.toFixed(2) })),
      orders: orders.map((o) => ({
        id: o.id,
        productName: o.product.name,
        quantity: o.quantity,
        totalAmount: o.totalAmount.toFixed(2),
        createdAt: o.createdAt.toISOString(),
      })),
    }
  }),
}
