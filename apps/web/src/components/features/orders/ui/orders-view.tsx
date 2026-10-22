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
import { PlusIcon } from 'lucide-react'
import { Skeleton } from '@zoniva/ui/components/skeleton'
import { lazy, Suspense, useState } from 'react'
import { PageHeader } from '#/components/layout/page-header'
// The form includes the Leaflet map, which can only load in the browser.
const OrderForm = lazy(() => import('./order-form').then((m) => ({ default: m.OrderForm })))
import { OrdersTable } from './orders-table'

export function OrdersView() {
  const [open, setOpen] = useState(false)
  const createButton = (
    <DialogTrigger asChild>
      <Button className="max-sm:w-full">
        <PlusIcon />
        Create Order
      </Button>
    </DialogTrigger>
  )
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <PageHeader
        title="Orders"
        description="Orders are accepted only inside a delivery zone assigned to the product."
        action={createButton}
      />
      <OrdersTable
        empty={
          <Empty>
            <EmptyHeader>
              <EmptyTitle>No orders yet</EmptyTitle>
              <EmptyDescription>
                Create an order for a customer location inside a delivery zone.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>{createButton}</EmptyContent>
          </Empty>
        }
      />
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create order</DialogTitle>
          <DialogDescription>
            Delivery is checked against the product’s zones before you submit.
          </DialogDescription>
        </DialogHeader>
        {open && (
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <OrderForm onDone={() => setOpen(false)} />
          </Suspense>
        )}
      </DialogContent>
    </Dialog>
  )
}
