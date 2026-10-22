// Fixed locale/time zone so server and client render identical strings (no hydration mismatch).
// No currency symbol: the PRD does not define a currency.
const money = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const date = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'UTC',
})

export const formatMoney = (value: string | number) => money.format(Number(value))
export const formatDate = (iso: string) => `${date.format(new Date(iso))} UTC`
export const formatRadius = (meters: number) =>
  meters < 1000 ? `${meters} m` : `${Number((meters / 1000).toFixed(2))} km`
export const formatCoord = (value: number) => value.toFixed(6)
