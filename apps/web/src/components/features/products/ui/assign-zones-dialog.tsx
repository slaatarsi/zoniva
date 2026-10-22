import { useQuery } from '@tanstack/react-query'
import type { Product } from '@zoniva/contracts'
import { Button } from '@zoniva/ui/components/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@zoniva/ui/components/dialog'
import { Spinner } from '@zoniva/ui/components/spinner'
import { useState } from 'react'
import { toast } from 'sonner'
import { FormErrorAlert } from '#/components/form/form-base'
import { zonesQuery } from '../../zones/zones.queries'
import { useAssignProductZones } from '../products.queries'
import { ZoneCheckboxList } from './zone-checkbox-list'

export function AssignZonesDialog({
  product,
  onOpenChange,
}: {
  product: Product | null
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={!!product} onOpenChange={onOpenChange}>
      <DialogContent>
        {product && (
          <AssignZonesForm key={product.id} product={product} onDone={() => onOpenChange(false)} />
        )}
      </DialogContent>
    </Dialog>
  )
}

function AssignZonesForm({ product, onDone }: { product: Product; onDone: () => void }) {
  const zones = useQuery(zonesQuery)
  const assign = useAssignProductZones()
  const [zoneIds, setZoneIds] = useState(product.zones.map((z) => z.id))

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault()
        if (assign.isPending) return
        try {
          await assign.mutateAsync({ productId: product.id, zoneIds })
        } catch {
          return
        }
        toast.success('Delivery zones updated.')
        onDone()
      }}
    >
      <DialogHeader>
        <DialogTitle>Delivery zones</DialogTitle>
        <DialogDescription>Choose where “{product.name}” can be delivered.</DialogDescription>
      </DialogHeader>
      <FormErrorAlert error={assign.error} />
      <ZoneCheckboxList zones={zones.data ?? []} value={zoneIds} onChange={setZoneIds} />
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" disabled={assign.isPending}>
          {assign.isPending && <Spinner />}
          Save zones
        </Button>
      </DialogFooter>
    </form>
  )
}
