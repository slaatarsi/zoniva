import type { CreateZoneInput } from '@zoniva/contracts'
import { callApi } from '#/lib/api.server'

export const listZones = () => callApi((api) => api.zones.list())
export const createZone = (input: CreateZoneInput) => callApi((api) => api.zones.create(input))
