import { useId } from 'react'
import type { Zone } from '@zoniva/contracts'
import { Checkbox } from '@zoniva/ui/components/checkbox'
import { FieldDescription, FieldLegend, FieldSet } from '@zoniva/ui/components/field'
import { Label } from '@zoniva/ui/components/label'
import { formatRadius } from '#/lib/format'

/** Multi-select of the user's own zones. */
export function ZoneCheckboxList({
  zones,
  value,
  onChange,
}: {
  zones: Zone[]
  value: string[]
  onChange: (ids: string[]) => void
}) {
  const id = useId()
  return (
    <FieldSet>
      <FieldLegend variant="label">Delivery zones</FieldLegend>
      {zones.length === 0 ? (
        <FieldDescription>
          No delivery zones yet. Create zones first; products without zones cannot be ordered.
        </FieldDescription>
      ) : (
        <div className="flex max-h-48 flex-col gap-1 overflow-y-auto rounded-md border p-2">
          {zones.map((zone) => {
            const checked = value.includes(zone.id)
            return (
              <Label
                key={zone.id}
                htmlFor={`${id}-${zone.id}`}
                className="hover:bg-muted flex min-h-11 items-center gap-3 rounded-md px-2 font-normal"
              >
                <Checkbox
                  id={`${id}-${zone.id}`}
                  checked={checked}
                  onCheckedChange={(next) =>
                    onChange(next ? [...value, zone.id] : value.filter((z) => z !== zone.id))
                  }
                />
                <span className="min-w-0 flex-1 truncate">{zone.name}</span>
                <span className="text-muted-foreground text-xs tabular-nums">
                  {formatRadius(zone.radiusMeters)}
                </span>
              </Label>
            )
          })}
        </div>
      )}
    </FieldSet>
  )
}
