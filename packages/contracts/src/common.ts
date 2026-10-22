import { z } from 'zod'

export const idSchema = z.string().trim().min(1).max(64)

export const latitudeSchema = z
  .number({ error: 'Latitude is required.' })
  .finite()
  .min(-90, 'Latitude must be between -90 and 90.')
  .max(90, 'Latitude must be between -90 and 90.')

export const longitudeSchema = z
  .number({ error: 'Longitude is required.' })
  .finite()
  .min(-180, 'Longitude must be between -180 and 180.')
  .max(180, 'Longitude must be between -180 and 180.')

// Matches Decimal(10, 2) in the database.
export const MAX_PRICE = 99_999_999.99
export const priceSchema = z
  .number({ error: 'Price is required.' })
  .finite()
  .gt(0, 'Price must be greater than zero.')
  .max(MAX_PRICE, 'Price is too large.')
  .refine(
    (v) => Math.abs(v * 100 - Math.round(v * 100)) < 1e-6,
    'Price can have at most 2 decimal places.',
  )

// Money crosses the wire as a fixed 2-decimal string to avoid float drift.
export const moneySchema = z.string()

export const zoneRefSchema = z.object({ id: z.string(), name: z.string() })
export type ZoneRef = z.infer<typeof zoneRefSchema>
