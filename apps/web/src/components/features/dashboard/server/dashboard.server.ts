import { callApi } from '#/lib/api.server'

export const getDashboardOverview = () => callApi((api) => api.dashboard.overview())
export const getZoneDetails = (zoneId: string) =>
  callApi((api) => api.dashboard.zoneDetails({ zoneId }))
