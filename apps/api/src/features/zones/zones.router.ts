import { ORPCError } from '@orpc/server'
import { authed } from '../../middleware/auth'

const select = { id: true, name: true, latitude: true, longitude: true, radiusMeters: true }

export const zonesRouter = {
  list: authed.zones.list.handler(({ context }) =>
    context.db.deliveryZone.findMany({
      where: { userId: context.userId },
      select,
      orderBy: { createdAt: 'desc' },
    }),
  ),
  create: authed.zones.create.handler(({ context, input }) =>
    context.db.deliveryZone.create({ data: { ...input, userId: context.userId }, select }),
  ),
  getById: authed.zones.getById.handler(async ({ context, input }) => {
    const zone = await context.db.deliveryZone.findFirst({
      where: { id: input.id, userId: context.userId },
      select,
    })
    if (!zone) throw new ORPCError('NOT_FOUND')
    return zone
  }),
}
