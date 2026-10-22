import { useQuery } from '@tanstack/react-query'
import { createProductInput } from '@zoniva/contracts'
import { Button } from '@zoniva/ui/components/button'
import { DialogClose, DialogFooter } from '@zoniva/ui/components/dialog'
import { toast } from 'sonner'
import { FormErrorAlert } from '#/components/form/form-base'
import { useAppForm } from '#/components/form/hooks'
import { zonesQuery } from '../../zones/zones.queries'
import { useCreateProduct } from '../products.queries'
import { ZoneCheckboxList } from './zone-checkbox-list'

export function ProductForm({ onDone }: { onDone: () => void }) {
  const zones = useQuery(zonesQuery)
  const create = useCreateProduct()
  const form = useAppForm({
    defaultValues: {
      name: '',
      price: null as number | null,
      quantity: null as number | null,
      zoneIds: [] as string[],
    },
    validators: { onSubmit: createProductInput },
    onSubmit: async ({ value }) => {
      create.reset()
      try {
        await create.mutateAsync(createProductInput.parse(value))
      } catch {
        return // shown via create.error; values are preserved
      }
      toast.success('Product added.')
      onDone()
    },
  })

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
      <form.AppField name="name">
        {(field) => <field.FormInput label="Name" autoComplete="off" />}
      </form.AppField>
      <div className="grid gap-4 sm:grid-cols-2">
        <form.AppField name="price">
          {(field) => (
            <field.FormNumberInput label="Price" inputMode="decimal" step="0.01" min="0.01" />
          )}
        </form.AppField>
        <form.AppField name="quantity">
          {(field) => (
            <field.FormNumberInput label="Quantity in stock" inputMode="numeric" step="1" min="0" />
          )}
        </form.AppField>
      </div>
      <form.Field name="zoneIds">
        {(field) => (
          <ZoneCheckboxList
            zones={zones.data ?? []}
            value={field.state.value}
            onChange={field.handleChange}
          />
        )}
      </form.Field>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <form.AppForm>
          <form.SubmitButton pendingLabel="Saving…">Add Product</form.SubmitButton>
        </form.AppForm>
      </DialogFooter>
    </form>
  )
}
