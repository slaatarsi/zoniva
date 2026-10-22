import { describe, expect, it } from 'vite-plus/test'
import { haversineMeters, matchZone, type GeoZone } from './geo'

const casablanca = { latitude: 33.5731, longitude: -7.5898 }
const rabat = { latitude: 34.0209, longitude: -6.8416 }
const zone = (id: string, at: typeof casablanca, radiusMeters: number): GeoZone => ({
  id,
  name: id,
  radiusMeters,
  ...at,
})

describe('haversineMeters', () => {
  it('is zero for the same point and πR/180 for one degree of latitude', () => {
    expect(haversineMeters(casablanca, casablanca)).toBe(0)
    expect(
      haversineMeters({ latitude: 0, longitude: 0 }, { latitude: 1, longitude: 0 }),
    ).toBeCloseTo(111_195.08, 1)
  })
})

describe('matchZone', () => {
  const zones = [zone('casa', casablanca, 10_000), zone('rabat', rabat, 10_000)]

  it('rejects a location outside all zones', () => {
    expect(matchZone({ latitude: 0, longitude: 0 }, zones, new Set(['casa']))).toEqual({
      ok: false,
      reason: 'OUTSIDE_ZONES',
    })
  })

  it('rejects when the containing zone does not offer the product', () => {
    expect(matchZone(rabat, zones, new Set(['casa']))).toEqual({
      ok: false,
      reason: 'PRODUCT_UNAVAILABLE',
    })
  })

  it('accepts a point exactly on the boundary', () => {
    const edge = { latitude: casablanca.latitude, longitude: casablanca.longitude + 0.05 }
    const r = Math.ceil(haversineMeters(casablanca, edge))
    expect(matchZone(edge, [zone('casa', casablanca, r)], new Set(['casa'])).ok).toBe(true)
  })

  it('picks the nearest eligible center, then the lowest id on ties', () => {
    const near = { latitude: 33.58, longitude: -7.59 }
    const overlapping = [
      zone('b', casablanca, 50_000),
      zone('a', near, 50_000),
      zone('c', near, 50_000),
    ]
    const match = matchZone(near, overlapping, new Set(['a', 'b', 'c']))
    expect(match.ok && match.zone.id).toBe('a')
    // An ineligible nearer zone never wins.
    const match2 = matchZone(near, overlapping, new Set(['b']))
    expect(match2.ok && match2.zone.id).toBe('b')
  })
})
