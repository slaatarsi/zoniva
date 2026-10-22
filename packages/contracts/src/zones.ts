import { oc } from '@orpc/contract'
import { z } from 'zod'
import { idSchema, latitudeSchema, longitudeSchema } from './common'

// Half of Earth's circumference; anything larger is meaningless as a delivery radius.
export const MAX_RADIUS_METERS = 20_000_000

export const zoneSchema = z.object({
  id: z.string(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  radiusMeters: z.number().int(),
})
export type Zone = z.infer<typeof zoneSchema>

export const createZoneInput = z.object({
  name: z.string().trim().min(1, 'Name is required.').max(120, 'Name is too long.'),
  latitude: latitudeSchema,
  longitude: longitudeSchema,
  radiusMeters: z
    .number({ error: 'Radius is required.' })
    .int('Radius must be a whole number of meters.')
    .gt(0, 'Radius must be greater than zero.')
    .max(MAX_RADIUS_METERS, 'Radius is too large.'),
})
export type CreateZoneInput = z.infer<typeof createZoneInput>

export const zoneByIdInput = z.object({ id: idSchema })

export const zonesContract = {
  list: oc.output(z.array(zoneSchema)),
  create: oc.input(createZoneInput).output(zoneSchema),
  getById: oc.input(zoneByIdInput).output(zoneSchema),
}
