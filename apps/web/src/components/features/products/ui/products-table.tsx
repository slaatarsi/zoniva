import { useQuery } from '@tanstack/react-query'
import { createColumnHelper, useTable } from '@tanstack/react-table'
import type { Product } from '@zoniva/contracts'
import { Badge } from '@zoniva/ui/components/badge'
import { Button } from '@zoniva/ui/components/button'
import { useMemo, useState, type ReactNode } from 'react'
import { DataTable, coreFeatures as features } from '#/components/data-table'
import { formatMoney } from '#/lib/format'
import { productsQuery } from '../products.queries'
import { AssignZonesDialog } from './assign-zones-dialog'

const helper = createColumnHelper<typeof features, Product>()
const EMPTY: Product[] = []

export function ProductsTable({ empty }: { empty: ReactNode }) {
  const products = useQuery(productsQuery)
  const [editing, setEditing] = useState<Product | null>(null)

  const columns = useMemo(
    () =>
      helper.columns([
        helper.accessor('name', {
          header: 'Name',
          cell: (c) => <span className="font-medium">{c.getValue()}</span>,
        }),
        helper.accessor('price', {
          header: () => <div className="text-end">Price</div>,
          cell: (c) => <div className="text-end tabular-nums">{formatMoney(c.getValue())}</div>,
        }),
        helper.accessor('quantity', {
          header: () => <div className="text-end">Quantity</div>,
          cell: (c) => <div className="text-end tabular-nums">{c.getValue()}</div>,
        }),
        helper.accessor('zones', {
          header: 'Delivery zones',
          cell: (c) =>
            c.getValue().length ? (
              <div className="flex max-w-80 min-w-40 flex-wrap gap-1">
                {c.getValue().map((z) => (
                  <Badge key={z.id} variant="secondary" className="rounded-sm">
                    {z.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground">No zones assigned.</span>
            ),
        }),
        helper.display({
          id: 'actions',
          header: () => <span className="sr-only">Actions</span>,
          cell: (c) => (
            <div className="text-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditing(c.row.original)}
                aria-label={`Edit delivery zones for ${c.row.original.name}`}
              >
                Edit zones
              </Button>
            </div>
          ),
        }),
      ]),
    [],
  )

  const table = useTable({
    features,
    columns,
    data: products.data ?? EMPTY,
    getRowId: (row) => row.id,
  })

  return (
    <>
      <DataTable
        table={table}
        caption="Products"
        isPending={products.isPending}
        error={products.error}
        onRetry={() => void products.refetch()}
        empty={empty}
      />
      <AssignZonesDialog product={editing} onOpenChange={(open) => !open && setEditing(null)} />
    </>
  )
}
