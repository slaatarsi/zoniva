import { createServerFn } from '@tanstack/react-start'
import { createZoneInput } from '@zoniva/contracts'
import { createZone, listZones } from './zones.server'

export const listZonesFn = createServerFn({ method: 'GET' }).handler(() => listZones())

export const createZoneFn = createServerFn({ method: 'POST' })
  .validator(createZoneInput)
  .handler(({ data }) => createZone(data))
