import { useQuery } from '@tanstack/react-query'
import { Button } from '@zoniva/ui/components/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@zoniva/ui/components/dialog'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@zoniva/ui/components/empty'
import { Skeleton } from '@zoniva/ui/components/skeleton'
import { cn } from '@zoniva/ui/lib/utils'
import { PlusIcon } from 'lucide-react'
import { ClientOnly } from '@tanstack/react-router'
import { lazy, Suspense, useState } from 'react'
import { PageHeader } from '#/components/layout/page-header'
import { QueryError } from '#/components/query-error'
import { formatCoord, formatRadius } from '#/lib/format'
import { zonesQuery } from '../zones.queries'
// Leaflet touches `window` at import time, so map modules load only in the browser.
const ZoneForm = lazy(() => import('./zone-form').then((m) => ({ default: m.ZoneForm })))
const ZonesMap = lazy(() => import('./zones-map').then((m) => ({ default: m.ZonesMap })))
const mapFallback = <Skeleton className="h-80 w-full rounded-lg sm:h-[28rem] lg:h-[32rem]" />

export function ZonesView() {
  const zones = useQuery(zonesQuery)
  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const list = zones.data ?? []

  const createButton = (
    <DialogTrigger asChild>
      <Button className="max-sm:w-full">
        <PlusIcon />
        Create Zone
      </Button>
    </DialogTrigger>
  )

  let content
  if (zones.isPending) {
    content = <Skeleton className="h-96 w-full rounded-lg" />
  } else if (zones.error) {
    content = <QueryError error={zones.error} onRetry={() => void zones.refetch()} />
  } else if (list.length === 0) {
    content = (
      <Empty className="rounded-lg border">
        <EmptyHeader>
          <EmptyTitle>No delivery zones yet</EmptyTitle>
          <EmptyDescription>
            Create a circular zone around a center point to define where you deliver.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>{createButton}</EmptyContent>
      </Empty>
    )
  } else {
    content = (
      <div className="grid gap-4 lg:grid-cols-[20rem_1fr]">
        <ul
          className="bg-card flex flex-col divide-y rounded-lg border lg:max-h-[32rem] lg:overflow-y-auto"
          aria-label="Delivery zones"
        >
          {list.map((zone) => {
            const selected = zone.id === selectedId
            return (
              <li key={zone.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setSelectedId(zone.id)}
                  className={cn(
                    'hover:bg-muted active:bg-muted flex min-h-14 w-full flex-col items-start gap-0.5 border-s-2 border-transparent px-4 py-3 text-start transition-colors',
                    selected && 'border-primary bg-primary/5',
                  )}
                >
                  <span className="w-full truncate font-medium">{zone.name}</span>
                  <span className="text-muted-foreground text-xs tabular-nums">
                    {formatRadius(zone.radiusMeters)} · {formatCoord(zone.latitude)},{' '}
                    {formatCoord(zone.longitude)}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
        <ClientOnly fallback={mapFallback}>
          <Suspense fallback={mapFallback}>
            <ZonesMap zones={list} selectedId={selectedId} onSelect={setSelectedId} />
          </Suspense>
        </ClientOnly>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <PageHeader
        title="Delivery Zones"
        description="Circular coverage areas defined by a center point and radius."
        action={createButton}
      />
      {content}
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create zone</DialogTitle>
          <DialogDescription>
            Name the zone, set its radius, and choose its center.
          </DialogDescription>
        </DialogHeader>
        {open && (
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <ZoneForm zones={list} onDone={() => setOpen(false)} />
          </Suspense>
        )}
      </DialogContent>
    </Dialog>
  )
}
