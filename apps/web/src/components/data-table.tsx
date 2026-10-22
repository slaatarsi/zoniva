import { type ReactNode } from 'react'
import { Button } from '@zoniva/ui/components/button'
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
import { tableFeatures, type ReactTable, type RowData } from '@tanstack/react-table'

/** Core-only feature set: MVP tables need no sorting, filtering or pagination. */
export const coreFeatures = tableFeatures({})

type Props<TData extends RowData> = {
  table: ReactTable<typeof coreFeatures, TData>
  caption: string
  isPending: boolean
  error: Error | null
  onRetry: () => void
  empty: ReactNode
}

/** Shared semantic table with loading, error and empty rows spanning all columns. */
export function DataTable<TData extends RowData>({
  table,
  caption,
  isPending,
  error,
  onRetry,
  empty,
}: Props<TData>) {
  const columnCount = table.getAllLeafColumns().length
  const rows = table.getRowModel().rows
  let state: ReactNode = null
  if (isPending) {
    state = Array.from({ length: 3 }, (_, i) => (
      <TableRow key={i}>
        <TableCell colSpan={columnCount}>
          <Skeleton className="h-6 w-full" />
        </TableCell>
      </TableRow>
    ))
  } else if (error) {
    state = (
      <TableRow>
        <TableCell colSpan={columnCount} className="py-10 text-center" role="alert">
          <p className="text-destructive mb-3">{error.message}</p>
          <Button variant="outline" size="sm" onClick={onRetry}>
            Retry
          </Button>
        </TableCell>
      </TableRow>
    )
  } else if (rows.length === 0) {
    state = (
      <TableRow className="hover:bg-transparent">
        <TableCell colSpan={columnCount} className="p-0">
          {empty}
        </TableCell>
      </TableRow>
    )
  }

  return (
    <div className="bg-card rounded-lg border">
      <Table aria-busy={isPending}>
        <TableCaption className="sr-only">{caption}</TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => (
                <TableHead key={header.id} scope="col">
                  {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {state ??
            rows.map((row) => (
              <TableRow key={row.id} className="h-12">
                {row.getAllCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
