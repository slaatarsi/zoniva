import { createZoneInput, type Zone } from '@zoniva/contracts'
import { Button } from '@zoniva/ui/components/button'
import { DialogClose, DialogFooter } from '@zoniva/ui/components/dialog'
import { FieldError } from '@zoniva/ui/components/field'
import { toast } from 'sonner'
import { FormErrorAlert } from '#/components/form/form-base'
import { useAppForm } from '#/components/form/hooks'
import { LocationPicker, type LatLng } from '#/components/location/location-picker'
import { PreviewCircle, ZoneCircles } from '#/components/location/zone-circles'
import { useCreateZone } from '../zones.queries'

export function ZoneForm({ zones, onDone }: { zones: Zone[]; onDone: () => void }) {
  const create = useCreateZone()
  const form = useAppForm({
    defaultValues: {
      name: '',
      location: null as LatLng | null,
      radiusMeters: null as number | null,
    },
    validators: {
      onSubmit: ({ value }) => {
        const parsed = createZoneInput.safeParse({ ...value.location, ...value })
        const fields: Record<string, { message: string }[]> = {}
        if (!value.location) fields.location = [{ message: 'Choose the zone center on the map.' }]
        for (const issue of parsed.error?.issues ?? []) {
          const key =
            issue.path[0] === 'latitude' || issue.path[0] === 'longitude'
              ? 'location'
              : String(issue.path[0])
          fields[key] ??= [{ message: issue.message }]
        }
        return Object.keys(fields).length ? { fields } : undefined
      },
    },
    onSubmit: async ({ value }) => {
      create.reset()
      try {
        await create.mutateAsync(createZoneInput.parse({ ...value, ...value.location }))
      } catch {
        return // shown via create.error; values are preserved
      }
      toast.success('Zone saved.')
      onDone()
    },
  })

  // Start the map over existing coverage when there is any.
  const initialView = zones[0]
    ? { center: [zones[0].latitude, zones[0].longitude] as [number, number], zoom: 11 }
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
      <form.AppField name="name">
        {(field) => <field.FormInput label="Zone name" autoComplete="off" />}
      </form.AppField>
      <form.AppField name="radiusMeters">
        {(field) => (
          <field.FormNumberInput
            label="Radius (meters)"
            inputMode="numeric"
            step="1"
            min="1"
            description="Delivery is available within this distance of the center."
          />
        )}
      </form.AppField>
      <form.Subscribe selector={(s) => s.values.radiusMeters}>
        {(radius) => (
          <form.Field name="location">
            {(field) => {
              const errors = field.state.meta.errors as { message: string }[]
              return (
                <LocationPicker
                  label="Zone center"
                  value={field.state.value}
                  onChange={field.handleChange}
                  initialView={initialView}
                  invalid={errors.length > 0}
                  error={errors.length > 0 && <FieldError errors={errors} />}
                  overlays={(point) => (
                    <>
                      <ZoneCircles zones={zones} />
                      {point && radius && radius > 0 && (
                        <PreviewCircle center={point} radiusMeters={radius} />
                      )}
                    </>
                  )}
                />
              )
            }}
          </form.Field>
        )}
      </form.Subscribe>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <form.AppForm>
          <form.SubmitButton pendingLabel="Saving…">Save Zone</form.SubmitButton>
        </form.AppForm>
      </DialogFooter>
    </form>
  )
}
