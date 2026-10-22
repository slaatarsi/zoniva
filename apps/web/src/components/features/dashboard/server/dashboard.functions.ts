import { createServerFn } from '@tanstack/react-start'
import { zoneDetailsInput } from '@zoniva/contracts'
import { getDashboardOverview, getZoneDetails } from './dashboard.server'

export const getDashboardOverviewFn = createServerFn({ method: 'GET' }).handler(() =>
  getDashboardOverview(),
)

export const getZoneDetailsFn = createServerFn({ method: 'GET' })
  .validator(zoneDetailsInput)
  .handler(({ data }) => getZoneDetails(data.zoneId))
