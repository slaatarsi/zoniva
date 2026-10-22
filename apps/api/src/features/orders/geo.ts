const EARTH_RADIUS_METERS = 6_371_008.8

export type LatLng = { latitude: number; longitude: number }
export type GeoZone = LatLng & { id: string; name: string; radiusMeters: number }

export function haversineMeters(a: LatLng, b: LatLng) {
  const rad = Math.PI / 180
  const dLat = (b.latitude - a.latitude) * rad
  const dLng = (b.longitude - a.longitude) * rad
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.latitude * rad) * Math.cos(b.latitude * rad) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.min(1, Math.sqrt(h)))
}

export type ZoneMatch =
  | { ok: true; zone: GeoZone }
  | { ok: false; reason: 'OUTSIDE_ZONES' | 'PRODUCT_UNAVAILABLE' }

/**
 * Picks the delivery zone for a customer location.
 * `zones` are all of the user's zones; `productZoneIds` are those assigned to the product.
 * Nearest eligible center wins; equal distances fall back to zone id for a stable result.
 */
export function matchZone(
  customer: LatLng,
  zones: GeoZone[],
  productZoneIds: ReadonlySet<string>,
): ZoneMatch {
  const containing = zones
    .map((zone) => ({ zone, distance: haversineMeters(customer, zone) }))
    .filter((z) => z.distance <= z.zone.radiusMeters)
  if (containing.length === 0) return { ok: false, reason: 'OUTSIDE_ZONES' }

  const eligible = containing.filter((z) => productZoneIds.has(z.zone.id))
  if (eligible.length === 0) return { ok: false, reason: 'PRODUCT_UNAVAILABLE' }

  eligible.sort((a, b) => a.distance - b.distance || a.zone.id.localeCompare(b.zone.id))
  return { ok: true, zone: eligible[0]!.zone }
}
