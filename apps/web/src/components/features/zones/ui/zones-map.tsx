import type { Zone } from '@zoniva/contracts'
import { Map, MapTileLayer, MapZoomControl, useMap } from '@zoniva/ui/components/map'
import { useEffect } from 'react'
import { ZoneCircles } from '#/components/location/zone-circles'

/** Flies to the selected zone; view changes never touch stored coordinates. */
function FocusZone({ zone }: { zone: Zone | undefined }) {
  const map = useMap()
  useEffect(() => {
    if (!zone) return
    map.flyTo([zone.latitude, zone.longitude], map.getZoom() < 10 ? 12 : map.getZoom())
  }, [map, zone])
  return null
}

export function ZonesMap({
  zones,
  selectedId,
  onSelect,
}: {
  zones: Zone[]
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  const first = zones[0]
  return (
    <div className="bg-muted h-80 overflow-hidden rounded-lg border sm:h-[28rem] lg:h-full lg:min-h-[32rem]">
      <Map
        center={first ? [first.latitude, first.longitude] : [20, 0]}
        zoom={first ? 11 : 2}
        attributionControl
        className="min-h-0 rounded-none"
      >
        <MapTileLayer />
        <MapZoomControl />
        <ZoneCircles zones={zones} selectedId={selectedId} onSelect={onSelect} />
        <FocusZone zone={zones.find((z) => z.id === selectedId)} />
      </Map>
    </div>
  )
}
