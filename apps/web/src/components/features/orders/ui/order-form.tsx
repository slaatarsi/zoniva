import { useQuery } from '@tanstack/react-query'
import { useStore } from '@tanstack/react-form'
import { createOrderInput } from '@zoniva/contracts'
import { Button } from '@zoniva/ui/components/button'
import { DialogClose, DialogFooter } from '@zoniva/ui/components/dialog'
import { Field, FieldDescription, FieldLabel } from '@zoniva/ui/components/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@zoniva/ui/components/select'
import { toast } from 'sonner'
import { FormErrorAlert } from '#/components/form/form-base'
import { useAppForm } from '#/components/form/hooks'
import { LocationPicker, type LatLng } from '#/components/location/location-picker'
import { ZoneCircles } from '#/components/location/zone-circles'
import { formatMoney } from '#/lib/format'
import { productsQuery } from '../../products/products.queries'
import { zonesQuery } from '../../zones/zones.queries'
import { previewTotal } from '../order-total'
import { locationCheckQuery, useCreateOrder } from '../orders.queries'
import { EligibilityStatus } from './eligibility-status'

type Values = { productId: string; quantity: number | null; location: LatLng | null }

export function OrderForm({ onDone }: { onDone: () => void }) {
  const products = useQuery(productsQuery)
  const zones = useQuery(zonesQuery)
  const create = useCreateOrder()

  const form = useAppForm({
    defaultValues: { productId: '', quantity: 1, location: null } as Values,
    onSubmit: async ({ value }) => {
      create.reset()
      try {
        await create.mutateAsync({
          productId: value.productId,
          quantity: value.quantity!,
          latitude: value.location!.latitude,
          longitude: value.location!.longitude,
        })
      } catch {
        return // shown via create.error; values are preserved
      }
      toast.success('Order created.')
      onDone()
    },
  })

  const { productId, quantity, location } = useStore(form.store, (s) => s.values)
  const product = products.data?.find((p) => p.id === productId)
  const checkEnabled = !!product && !!location
  // The query key includes product + point, so any change resets the status automatically.
  const check = useQuery({
    ...locationCheckQuery({
      productId,
      latitude: location?.latitude ?? 0,
      longitude: location?.longitude ?? 0,
    }),
    enabled: checkEnabled,
  })
  const productZoneIds = new Set(product?.zones.map((z) => z.id))
  const productZones = (zones.data ?? []).filter((z) => productZoneIds.has(z.id))
  const overStock = !!product && !!quantity && quantity > product.quantity
  const quantityValid = createOrderInput.shape.quantity.safeParse(quantity).success
  // Submission requires a passing server eligibility check; the server re-validates on create.
  const canSubmit =
    checkEnabled &&
    quantityValid &&
    check.data?.available === true &&
    !check.isFetching &&
    !overStock

  const initialView = productZones[0]
    ? {
        center: [productZones[0].latitude, productZones[0].longitude] as [number, number],
        zoom: 11,
      }
    : undefined

  return (
    <form
      noValidate
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        void form.handleSubmit()
      }}
    >
      <FormErrorAlert error={create.error} />
      <form.Field name="productId">
        {(field) => {
          return (
            <Field>
              <FieldLabel htmlFor="order-product">Product</FieldLabel>
              <Select
                value={field.state.value}
                onValueChange={field.handleChange}
                disabled={products.isPending}
              >
                <SelectTrigger id="order-product" className="h-11 w-full sm:h-9">
                  <SelectValue
                    placeholder={products.isPending ? 'Loading products…' : 'Choose a product'}
                  />
                </SelectTrigger>
                <SelectContent>
                  {(products.data ?? []).map((p) => (
                    <SelectItem key={p.id} value={p.id} disabled={p.zones.length === 0}>
                      {p.name} — {formatMoney(p.price)}
                      {p.zones.length === 0 ? ' (no zones)' : ` · ${p.quantity} in stock`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {products.data?.length === 0 && (
                <FieldDescription>Add a product with delivery zones first.</FieldDescription>
              )}
            </Field>
          )
        }}
      </form.Field>
      <form.AppField name="quantity" validators={{ onChange: createOrderInput.shape.quantity }}>
        {(field) => (
          <field.FormNumberInput
            label="Quantity"
            inputMode="numeric"
            step="1"
            min="1"
            description={product ? `${product.quantity} in stock.` : undefined}
          />
        )}
      </form.AppField>
      {overStock && (
        <p className="text-destructive -mt-2 text-sm" role="alert">
          Only {product.quantity} in stock. Lower the quantity.
        </p>
      )}
      <form.Field name="location">
        {(field) => (
          <LocationPicker
            label="Customer location"
            value={field.state.value}
            onChange={field.handleChange}
            initialView={initialView}
            overlays={() => <ZoneCircles zones={productZones} />}
          />
        )}
      </form.Field>
      <EligibilityStatus enabled={checkEnabled} check={check} />
      {product && quantity && quantity > 0 && (
        <p className="flex items-baseline justify-between border-t pt-3 text-sm">
          <span className="text-muted-foreground">Estimated total</span>
          <span className="text-base font-semibold tabular-nums">
            {formatMoney(previewTotal(product.price, quantity))}
          </span>
        </p>
      )}
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <form.Subscribe selector={(s) => s.isSubmitting}>
          {(isSubmitting) => (
            <Button type="submit" disabled={isSubmitting || !canSubmit} aria-busy={isSubmitting}>
              {isSubmitting ? 'Creating…' : 'Create Order'}
            </Button>
          )}
        </form.Subscribe>
      </DialogFooter>
    </form>
  )
}
