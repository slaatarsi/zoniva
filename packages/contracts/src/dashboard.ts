import { oc } from '@orpc/contract'
import { z } from 'zod'
import { idSchema, moneySchema } from './common'

export const dashboardOverviewSchema = z.object({
  totals: z.object({ products: z.number(), zones: z.number(), orders: z.number() }),
  zones: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      latitude: z.number(),
      longitude: z.number(),
      radiusMeters: z.number(),
      productCount: z.number(),
      orderCount: z.number(),
    }),
  ),
})
export type DashboardOverview = z.infer<typeof dashboardOverviewSchema>

export const zoneDetailsSchema = z.object({
  zone: z.object({ id: z.string(), name: z.string(), radiusMeters: z.number() }),
  products: z.array(
    z.object({ id: z.string(), name: z.string(), price: moneySchema, quantity: z.number() }),
  ),
  orders: z.array(
    z.object({
      id: z.string(),
      productName: z.string(),
      quantity: z.number(),
      totalAmount: moneySchema,
      createdAt: z.iso.datetime(),
    }),
  ),
})
export type ZoneDetails = z.infer<typeof zoneDetailsSchema>

export const zoneDetailsInput = z.object({ zoneId: idSchema })

export const dashboardContract = {
  overview: oc.output(dashboardOverviewSchema),
  zoneDetails: oc.input(zoneDetailsInput).output(zoneDetailsSchema),
}
