import { Button } from '@zoniva/ui/components/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@zoniva/ui/components/dialog'
import { Field, FieldLabel } from '@zoniva/ui/components/field'
import { Input } from '@zoniva/ui/components/input'
import {
  Map,
  MapMarker,
  MapSearchControl,
  MapTileLayer,
  MapZoomControl,
  useMap,
  useMapEvents,
} from '@zoniva/ui/components/map'
import { PlaceAutocomplete } from '@zoniva/ui/components/place-autocomplete'
import { useIsMobile } from '@zoniva/ui/hooks/use-mobile'
type LeafletMap = ReturnType<typeof useMap>
import { MapPinIcon, XIcon } from 'lucide-react'
import { useId, useState, type ReactNode } from 'react'
import { formatCoord } from '#/lib/format'

export type LatLng = { latitude: number; longitude: number }

// No location is assumed for the user; this is just the configured starting view.
const DEFAULT_VIEW = { center: [20, 0] as [number, number], zoom: 2 }
const PICKED_ZOOM = 14

/** Keeps longitude in [-180, 180] after panning across the antimeridian. */
function toLatLng(map: LeafletMap): LatLng {
  const c = map.getCenter().wrap()
  return { latitude: c.lat, longitude: c.lng }
}

function ClickToSelect({ onSelect }: { onSelect: (v: LatLng) => void }) {
  useMapEvents({
    click: (e) => {
      const c = e.latlng.wrap()
      onSelect({ latitude: c.lat, longitude: c.lng })
    },
  })
  return null
}

function SelectedMarker({ value }: { value: LatLng }) {
  return (
    <MapMarker
      position={[value.latitude, value.longitude]}
      iconAnchor={[16, 32]}
      icon={<MapPinIcon className="fill-brand-cyan size-8 stroke-white" />}
      interactive={false}
    />
  )
}

type PickerProps = {
  label: string
  value: LatLng | null
  onChange: (value: LatLng) => void
  /** Extra map layers (e.g. zone circles) rendered under the selected point. */
  overlays?: (point: LatLng | null) => ReactNode
  /** Starting view when nothing is selected yet. */
  initialView?: { center: [number, number]; zoom: number }
  invalid?: boolean
  error?: ReactNode
}

/**
 * Desktop/tablet: inline map; search or click sets the location.
 * Mobile (<640px): full-screen picker with a fixed center pin and explicit confirmation.
 * Both commit coordinates only into read-only inputs.
 */
export function LocationPicker(props: PickerProps) {
  const isMobile = useIsMobile(640)
  const id = useId()
  const { label, value, invalid, error } = props

  return (
    <fieldset className="flex flex-col gap-3" aria-invalid={invalid || undefined}>
      <legend className="mb-2 text-sm font-medium">{label}</legend>
      {isMobile ? <MobilePicker {...props} /> : <InlinePicker {...props} />}
      <div className="grid grid-cols-2 gap-3">
        <Field>
          <FieldLabel htmlFor={`${id}-lat`}>Latitude</FieldLabel>
          <Input
            id={`${id}-lat`}
            readOnly
            placeholder="Not selected"
            value={value ? formatCoord(value.latitude) : ''}
            className="bg-muted tabular-nums"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`${id}-lng`}>Longitude</FieldLabel>
          <Input
            id={`${id}-lng`}
            readOnly
            placeholder="Not selected"
            value={value ? formatCoord(value.longitude) : ''}
            className="bg-muted tabular-nums"
          />
        </Field>
      </div>
      {error}
    </fieldset>
  )
}

function startView(value: LatLng | null, initialView = DEFAULT_VIEW) {
  return value
    ? { center: [value.latitude, value.longitude] as [number, number], zoom: PICKED_ZOOM }
    : initialView
}

function InlinePicker({ value, onChange, overlays, initialView }: PickerProps) {
  const [map, setMap] = useState<LeafletMap | null>(null)
  const view = startView(value, initialView)
  return (
    <div className="bg-muted relative h-80 overflow-hidden rounded-lg border lg:h-96">
      <Map
        center={view.center}
        zoom={view.zoom}
        ref={setMap}
        attributionControl
        className="min-h-0 rounded-none"
      >
        <MapTileLayer />
        <MapSearchControl
          className="w-72 max-w-[calc(100%-1rem)]"
          placeholder="Search address…"
          onPlaceSelect={(f) => {
            const [lng, lat] = f.geometry.coordinates // GeoJSON is [longitude, latitude]
            onChange({ latitude: lat, longitude: lng })
            map?.flyTo([lat, lng], PICKED_ZOOM)
          }}
        />
        <MapZoomControl />
        <ClickToSelect onSelect={onChange} />
        {overlays?.(value)}
        {value && <SelectedMarker value={value} />}
      </Map>
      <p className="bg-card/90 text-muted-foreground pointer-events-none absolute right-2 bottom-2 z-1000 rounded-md px-2 py-1 text-xs">
        Search or click the map to set the location
      </p>
    </div>
  )
}

function MobilePicker({ value, onChange, overlays, initialView, label }: PickerProps) {
  const [open, setOpen] = useState(false)
  return (
    <>
      {value && (
        <div className="bg-muted relative h-48 overflow-hidden rounded-lg border">
          {/* Static preview; interaction happens in the full-screen picker. */}
          <Map
            key={`${value.latitude},${value.longitude}`}
            center={[value.latitude, value.longitude]}
            zoom={PICKED_ZOOM}
            dragging={false}
            touchZoom={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            keyboard={false}
            attributionControl
            className="pointer-events-none min-h-0 rounded-none"
          >
            <MapTileLayer />
            {overlays?.(value)}
            <SelectedMarker value={value} />
          </Map>
        </div>
      )}
      <Button type="button" variant="outline" className="h-11" onClick={() => setOpen(true)}>
        <MapPinIcon />
        {value ? 'Change location' : 'Choose location'}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="top-0 left-0 flex h-dvh max-h-none w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none p-0 ring-0 sm:max-w-none"
        >
          {open && (
            <FullScreenPicker
              title={label}
              value={value}
              initialView={initialView}
              overlays={overlays}
              onCancel={() => setOpen(false)}
              onConfirm={(v) => {
                onChange(v)
                setOpen(false)
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

function FullScreenPicker({
  title,
  value,
  initialView,
  overlays,
  onCancel,
  onConfirm,
}: Pick<PickerProps, 'value' | 'initialView' | 'overlays'> & {
  title: string
  onCancel: () => void
  onConfirm: (v: LatLng) => void
}) {
  const [map, setMap] = useState<LeafletMap | null>(null)
  const [draft, setDraft] = useState<LatLng | null>(value)
  const view = startView(value, initialView)

  return (
    <div className="relative min-h-0 flex-1">
      <DialogTitle className="sr-only">{title}</DialogTitle>
      <DialogDescription className="sr-only">
        Move the map under the center pin or search for an address, then confirm.
      </DialogDescription>
      <Map
        center={view.center}
        zoom={view.zoom}
        ref={setMap}
        attributionControl
        className="min-h-0 rounded-none"
      >
        <MapTileLayer />
        <DraftTracker onMove={setDraft} />
        {overlays?.(draft)}
      </Map>

      {/* Top controls sit outside the map so search suggestions stay above it. */}
      <div className="absolute inset-x-0 top-0 z-1001 flex items-start gap-2 p-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="bg-card size-11 shrink-0 shadow-sm"
          aria-label="Close map without changing location"
          onClick={onCancel}
        >
          <XIcon />
        </Button>
        <div className="bg-card min-w-0 flex-1 rounded-md shadow-sm">
          <PlaceAutocomplete
            placeholder="Search address…"
            onPlaceSelect={(f) => {
              const [lng, lat] = f.geometry.coordinates // GeoJSON is [longitude, latitude]
              map?.stop()
              map?.setView([lat, lng], PICKED_ZOOM, { animate: false })
            }}
          />
        </div>
      </div>

      {/* Stationary pin: its tip marks the exact map center. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 z-1000 -translate-x-1/2 -translate-y-full"
      >
        <MapPinIcon className="fill-brand-cyan size-10 stroke-white drop-shadow" />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-1000 flex flex-col gap-2 p-3 pb-[max(1.75rem,calc(env(safe-area-inset-bottom)+1.25rem))]">
        <p
          className="bg-card/95 self-center rounded-md px-2 py-1 text-xs tabular-nums"
          aria-live="polite"
        >
          {draft
            ? `${formatCoord(draft.latitude)}, ${formatCoord(draft.longitude)}`
            : 'Move the map to choose'}
        </p>
        <Button
          type="button"
          className="h-12 w-full shadow-sm"
          disabled={!map}
          onClick={() => {
            if (!map) return
            map.stop() // a running fly-to must not shift the confirmed point
            const next = toLatLng(map)
            if (Number.isFinite(next.latitude) && Number.isFinite(next.longitude)) onConfirm(next)
          }}
        >
          Confirm location
        </Button>
      </div>
    </div>
  )
}

function DraftTracker({ onMove }: { onMove: (v: LatLng) => void }) {
  const map = useMapEvents({ move: () => onMove(toLatLng(map)) })
  return null
}
