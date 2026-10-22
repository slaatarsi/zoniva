import { oc } from '@orpc/contract'
import { z } from 'zod'
import { idSchema, latitudeSchema, longitudeSchema, moneySchema, zoneRefSchema } from './common'

export const ORDER_MESSAGES = {
  unavailableLocation: 'Delivery is unavailable at this location.',
  unavailableProduct: 'This product is not available in the selected delivery area.',
  available: (zoneName: string) => `Delivery available in ${zoneName}.`,
} as const

export const locationInput = z.object({
  productId: idSchema,
  latitude: latitudeSchema,
  longitude: longitudeSchema,
})

export const validateLocationOutput = z.discriminatedUnion('available', [
  z.object({ available: z.literal(true), zone: zoneRefSchema, message: z.string() }),
  z.object({
    available: z.literal(false),
    reason: z.enum(['OUTSIDE_ZONES', 'PRODUCT_UNAVAILABLE']),
    message: z.string(),
  }),
])
export type ValidateLocationResult = z.infer<typeof validateLocationOutput>

export const createOrderInput = locationInput.extend({
  quantity: z
    .number({ error: 'Quantity is required.' })
    .int('Quantity must be a whole number.')
    .gt(0, 'Quantity must be at least 1.')
    .max(1_000_000, 'Quantity is too large.'),
  customerAddress: z
    .string()
    .trim()
    .max(300, 'Address is too long.')
    .optional()
    .transform((v) => v || undefined),
})
export type CreateOrderInput = z.input<typeof createOrderInput>

export const orderSchema = z.object({
  id: z.string(),
  quantity: z.number().int(),
  unitPrice: moneySchema,
  totalAmount: moneySchema,
  customerLatitude: z.number(),
  customerLongitude: z.number(),
  customerAddress: z.string().nullable(),
  product: z.object({ id: z.string(), name: z.string() }),
  zone: zoneRefSchema,
  createdAt: z.iso.datetime(),
})
export type Order = z.infer<typeof orderSchema>

export const ordersContract = {
  list: oc.output(z.array(orderSchema)),
  validateLocation: oc.input(locationInput).output(validateLocationOutput),
  create: oc
    .errors({
      LOCATION_UNAVAILABLE: { status: 422, message: ORDER_MESSAGES.unavailableLocation },
      PRODUCT_UNAVAILABLE: { status: 422, message: ORDER_MESSAGES.unavailableProduct },
      INSUFFICIENT_STOCK: { status: 409, message: 'Not enough stock for this quantity.' },
    })
    .input(createOrderInput)
    .output(orderSchema),
}
