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
import { useState } from 'react'
import { PageHeader } from '#/components/layout/page-header'
import { ProductForm } from './product-form'
import { ProductsTable } from './products-table'

export function ProductsView() {
  const [open, setOpen] = useState(false)
  const addButton = (
    <DialogTrigger asChild>
      <Button className="max-sm:w-full">
        <PlusIcon />
        Add Product
      </Button>
    </DialogTrigger>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <PageHeader
        title="Products"
        description="Manage inventory and where each product can be delivered."
        action={addButton}
      />
      <ProductsTable
        empty={
          <Empty>
            <EmptyHeader>
              <EmptyTitle>No products yet</EmptyTitle>
              <EmptyDescription>
                Add your first product and assign it to delivery zones.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>{addButton}</EmptyContent>
          </Empty>
        }
      />
      <DialogContent className="max-h-[90dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add product</DialogTitle>
          <DialogDescription>
            Products need at least one delivery zone to be orderable.
          </DialogDescription>
        </DialogHeader>
        {open && <ProductForm onDone={() => setOpen(false)} />}
      </DialogContent>
    </Dialog>
  )
}
