import { useQuery } from '@tanstack/react-query'
import { createColumnHelper, useTable } from '@tanstack/react-table'
import type { Order } from '@zoniva/contracts'
import { Tooltip, TooltipContent, TooltipTrigger } from '@zoniva/ui/components/tooltip'
import { useMemo, type ReactNode } from 'react'
import { DataTable, coreFeatures as features } from '#/components/data-table'
import { formatDate, formatMoney } from '#/lib/format'
import { ordersQuery } from '../orders.queries'

const helper = createColumnHelper<typeof features, Order>()
const EMPTY: Order[] = []

/** Shortened id with the full value available on hover/focus and to screen readers. */
export function OrderId({ id }: { id: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" className="font-mono text-xs" aria-label={`Order ${id}`}>
          {id.slice(0, 8)}…
        </button>
      </TooltipTrigger>
      <TooltipContent className="font-mono">{id}</TooltipContent>
    </Tooltip>
  )
}

export function OrdersTable({ empty }: { empty: ReactNode }) {
  const orders = useQuery(ordersQuery)
  const columns = useMemo(
    () =>
      helper.columns([
        helper.accessor('id', { header: 'Order ID', cell: (c) => <OrderId id={c.getValue()} /> }),
        helper.accessor((o) => o.product.name, {
          id: 'product',
          header: 'Product',
          cell: (c) => <span className="font-medium">{c.getValue()}</span>,
        }),
        helper.accessor('quantity', {
          header: () => <div className="text-end">Quantity</div>,
          cell: (c) => <div className="text-end tabular-nums">{c.getValue()}</div>,
        }),
        helper.accessor((o) => o.zone.name, { id: 'zone', header: 'Delivery zone' }),
        helper.accessor('totalAmount', {
          header: () => <div className="text-end">Total amount</div>,
          cell: (c) => (
            <div className="text-end font-medium tabular-nums">{formatMoney(c.getValue())}</div>
          ),
        }),
        helper.accessor('createdAt', {
          header: 'Date',
          cell: (c) => (
            <span className="whitespace-nowrap tabular-nums">{formatDate(c.getValue())}</span>
          ),
        }),
      ]),
    [],
  )
  const table = useTable({ features, columns, data: orders.data ?? EMPTY, getRowId: (r) => r.id })
  return (
    <DataTable
      table={table}
      caption="Orders"
      isPending={orders.isPending}
      error={orders.error}
      onRetry={() => void orders.refetch()}
      empty={empty}
    />
  )
}
