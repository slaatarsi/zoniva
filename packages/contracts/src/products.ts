import { oc } from '@orpc/contract'
import { z } from 'zod'
import { idSchema, moneySchema, priceSchema, zoneRefSchema } from './common'

export const zoneIdsSchema = z
  .array(idSchema)
  .max(100, 'Too many zones.')
  .transform((ids) => [...new Set(ids)])

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: moneySchema,
  quantity: z.number().int(),
  zones: z.array(zoneRefSchema),
})
export type Product = z.infer<typeof productSchema>

export const createProductInput = z.object({
  name: z.string().trim().min(1, 'Name is required.').max(120, 'Name is too long.'),
  price: priceSchema,
  quantity: z
    .number({ error: 'Quantity is required.' })
    .int('Quantity must be a whole number.')
    .min(0, 'Quantity cannot be negative.')
    .max(1_000_000_000, 'Quantity is too large.'),
  zoneIds: zoneIdsSchema,
})
export type CreateProductInput = z.input<typeof createProductInput>

export const assignZonesInput = z.object({
  productId: idSchema,
  zoneIds: zoneIdsSchema,
})

export const productsContract = {
  list: oc.output(z.array(productSchema)),
  create: oc.input(createProductInput).output(productSchema),
  assignZones: oc.input(assignZonesInput).output(productSchema),
}
