import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import type { DashboardOverview, ZoneDetails } from '@zoniva/contracts'
import { Button } from '@zoniva/ui/components/button'
import { Card, CardContent, CardHeader, CardTitle } from '@zoniva/ui/components/card'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@zoniva/ui/components/empty'
import { Skeleton } from '@zoniva/ui/components/skeleton'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@zoniva/ui/components/table'
import { cn } from '@zoniva/ui/lib/utils'
import { PageHeader } from '#/components/layout/page-header'
import { QueryError } from '#/components/query-error'
import { formatDate, formatMoney, formatRadius } from '#/lib/format'
import { OrderId } from '../../orders'
import { dashboardOverviewQuery, zoneDetailsQuery } from '../dashboard.queries'

export function DashboardView({
  selectedZoneId,
  onSelectZone,
}: {
  selectedZoneId: string | undefined
  onSelectZone: (id: string) => void
}) {
  const overview = useQuery(dashboardOverviewQuery)

  return (
    <>
      <PageHeader title="Dashboard" description="Your delivery operations at a glance." />
      {overview.error ? (
        <QueryError error={overview.error} onRetry={() => void overview.refetch()} />
      ) : (
        <div className="flex flex-col gap-6">
          <Metrics totals={overview.data?.totals} />
          {overview.data && overview.data.zones.length === 0 ? (
            <Empty className="rounded-lg border">
              <EmptyHeader>
                <EmptyTitle>Create your first delivery zone</EmptyTitle>
                <EmptyDescription>
                  Zones define where your products can be delivered.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button asChild>
                  <Link to="/zones">Go to Delivery Zones</Link>
                </Button>
              </EmptyContent>
            </Empty>
          ) : (
            <ZonesSection
              zones={overview.data?.zones}
              selectedZoneId={selectedZoneId ?? overview.data?.zones[0]?.id}
              onSelectZone={onSelectZone}
            />
          )}
        </div>
      )}
    </>
  )
}

function Metrics({ totals }: { totals: DashboardOverview['totals'] | undefined }) {
  const items = [
    { label: 'Total products', value: totals?.products },
    { label: 'Total delivery zones', value: totals?.zones },
    { label: 'Total orders', value: totals?.orders },
  ]
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card key={item.label} className="gap-2">
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm font-medium">
              {item.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {item.value === undefined ? (
              <Skeleton className="h-9 w-16" />
            ) : (
              <p className="text-3xl font-semibold tabular-nums">{item.value}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ZonesSection({
  zones,
  selectedZoneId,
  onSelectZone,
}: {
  zones: DashboardOverview['zones'] | undefined
  selectedZoneId: string | undefined
  onSelectZone: (id: string) => void
}) {
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[22rem_1fr]">
      <section aria-labelledby="zones-overview" className="flex flex-col gap-3">
        <h2 id="zones-overview" className="text-lg font-semibold">
          Delivery zones
        </h2>
        {zones ? (
          <ul className="bg-card flex flex-col divide-y rounded-lg border">
            {zones.map((zone) => {
              const selected = zone.id === selectedZoneId
              return (
                <li key={zone.id}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => onSelectZone(zone.id)}
                    className={cn(
                      'hover:bg-muted active:bg-muted flex min-h-14 w-full flex-col gap-1 border-s-2 border-transparent px-4 py-3 text-start transition-colors',
                      selected && 'border-primary bg-primary/5',
                    )}
                  >
                    <span className="flex w-full items-center justify-between gap-2">
                      <span className="truncate font-medium">{zone.name}</span>
                      <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
                        {formatRadius(zone.radiusMeters)}
                      </span>
                    </span>
                    <span className="text-muted-foreground text-xs tabular-nums">
                      {zone.productCount} {zone.productCount === 1 ? 'product' : 'products'} ·{' '}
                      {zone.orderCount} {zone.orderCount === 1 ? 'order' : 'orders'}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        ) : (
          <Skeleton className="h-48 w-full rounded-lg" />
        )}
      </section>
      {selectedZoneId ? (
        <ZoneDetailsPanel zoneId={selectedZoneId} />
      ) : (
        <Skeleton className="h-64 rounded-lg" />
      )}
    </div>
  )
}

function ZoneDetailsPanel({ zoneId }: { zoneId: string }) {
  const details = useQuery(zoneDetailsQuery(zoneId))
  if (details.error)
    return <QueryError error={details.error} onRetry={() => void details.refetch()} />
  if (!details.data) return <Skeleton className="h-64 rounded-lg" />
  return <ZoneDetailsContent details={details.data} />
}

function ZoneDetailsContent({ details }: { details: ZoneDetails }) {
  const { zone, products, orders } = details
  return (
    <section aria-labelledby="zone-details" className="flex min-w-0 flex-col gap-4">
      <div>
        <h2 id="zone-details" className="text-lg font-semibold">
          {zone.name}
        </h2>
        <p className="text-muted-foreground text-sm tabular-nums">
          Radius {formatRadius(zone.radiusMeters)} · {products.length}{' '}
          {products.length === 1 ? 'product' : 'products'} · {orders.length}{' '}
          {orders.length === 1 ? 'order' : 'orders'}
        </p>
      </div>
      <Card className="gap-0 py-0">
        <CardHeader className="py-4">
          <CardTitle className="text-base">Products</CardTitle>
        </CardHeader>
        {products.length === 0 ? (
          <p className="text-muted-foreground px-6 pb-4 text-sm">
            No products assigned to this zone.
          </p>
        ) : (
          <Table>
            <TableCaption className="sr-only">Products in {zone.name}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead scope="col" className="ps-6">
                  Name
                </TableHead>
                <TableHead scope="col" className="text-end">
                  Price
                </TableHead>
                <TableHead scope="col" className="pe-6 text-end">
                  Available quantity
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id} className="h-12">
                  <TableCell className="ps-6 font-medium">{p.name}</TableCell>
                  <TableCell className="text-end tabular-nums">{formatMoney(p.price)}</TableCell>
                  <TableCell className="pe-6 text-end tabular-nums">{p.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
      <Card className="gap-0 py-0">
        <CardHeader className="py-4">
          <CardTitle className="text-base">Orders</CardTitle>
        </CardHeader>
        {orders.length === 0 ? (
          <p className="text-muted-foreground px-6 pb-4 text-sm">
            No orders delivered to this zone yet.
          </p>
        ) : (
          <Table>
            <TableCaption className="sr-only">Orders in {zone.name}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead scope="col" className="ps-6">
                  Order ID
                </TableHead>
                <TableHead scope="col">Product</TableHead>
                <TableHead scope="col" className="text-end">
                  Quantity
                </TableHead>
                <TableHead scope="col" className="text-end">
                  Total
                </TableHead>
                <TableHead scope="col" className="pe-6">
                  Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o.id} className="h-12">
                  <TableCell className="ps-6">
                    <OrderId id={o.id} />
                  </TableCell>
                  <TableCell className="font-medium">{o.productName}</TableCell>
                  <TableCell className="text-end tabular-nums">{o.quantity}</TableCell>
                  <TableCell className="text-end tabular-nums">
                    {formatMoney(o.totalAmount)}
                  </TableCell>
                  <TableCell className="pe-6 whitespace-nowrap tabular-nums">
                    {formatDate(o.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </section>
  )
}
