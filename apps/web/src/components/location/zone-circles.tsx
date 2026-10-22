import { MapCircle, MapCircleMarker, MapTooltip } from '@zoniva/ui/components/map'
import { cn } from '@zoniva/ui/lib/utils'
import type { LatLng } from './location-picker'

type CircleZone = LatLng & { id: string; name: string; radiusMeters: number }

// Opacity is applied via the fill class, so Leaflet's own fill-opacity is neutralized.
const solid = { weight: 2, fillOpacity: 1 }

/** Saved zones as true geographic circles (radius in meters), with name tooltips. */
export function ZoneCircles({
  zones,
  selectedId,
  onSelect,
}: {
  zones: CircleZone[]
  selectedId?: string | null
  onSelect?: (id: string) => void
}) {
  return zones.map((zone) => {
    const selected = zone.id === selectedId
    const center: [number, number] = [zone.latitude, zone.longitude]
    return (
      <MapCircle
        key={zone.id}
        center={center}
        radius={zone.radiusMeters}
        pathOptions={{ ...solid, weight: selected ? 3 : 2 }}
        className={cn('stroke-primary fill-primary/15', selected && 'fill-primary/25')}
        eventHandlers={onSelect ? { click: () => onSelect(zone.id) } : undefined}
      >
        <MapTooltip side="top">{zone.name}</MapTooltip>
      </MapCircle>
    )
  })
}

/** Dashed preview of an unsaved zone. */
export function PreviewCircle({ center, radiusMeters }: { center: LatLng; radiusMeters: number }) {
  return (
    <>
      <MapCircle
        center={[center.latitude, center.longitude]}
        radius={radiusMeters}
        pathOptions={{ ...solid, dashArray: '6 6' }}
        className="stroke-brand-cyan fill-brand-cyan/15"
        interactive={false}
      />
      <MapCircleMarker
        center={[center.latitude, center.longitude]}
        radius={4}
        pathOptions={solid}
        className="fill-brand-cyan stroke-white"
        interactive={false}
      />
    </>
  )
}
