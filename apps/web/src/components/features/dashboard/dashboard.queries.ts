import { queryOptions } from '@tanstack/react-query'
import { getDashboardOverviewFn, getZoneDetailsFn } from './server/dashboard.functions'

export const dashboardOverviewQuery = queryOptions({
  queryKey: ['dashboard', 'overview'],
  queryFn: () => getDashboardOverviewFn(),
})

export const zoneDetailsQuery = (zoneId: string) =>
  queryOptions({
    queryKey: ['dashboard', 'zone', zoneId],
    queryFn: () => getZoneDetailsFn({ data: { zoneId } }),
  })
