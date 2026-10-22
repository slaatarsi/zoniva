import type { UseQueryResult } from '@tanstack/react-query'
import type { ValidateLocationResult } from '@zoniva/contracts'
import { Spinner } from '@zoniva/ui/components/spinner'
import { CircleCheckIcon, CircleXIcon } from 'lucide-react'

/** Persistent text result of the eligibility check (never color alone). */
export function EligibilityStatus({
  enabled,
  check,
}: {
  enabled: boolean
  check: UseQueryResult<ValidateLocationResult>
}) {
  let body
  if (!enabled) {
    body = (
      <p className="text-muted-foreground text-sm">
        Choose a product and customer location to check delivery.
      </p>
    )
  } else if (check.isFetching) {
    body = (
      <p className="text-muted-foreground flex items-center gap-2 text-sm">
        <Spinner /> Checking delivery availability…
      </p>
    )
  } else if (check.error) {
    body = <p className="text-destructive text-sm">{check.error.message}</p>
  } else if (check.data?.available) {
    body = (
      <p className="bg-success-soft text-success flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium">
        <CircleCheckIcon className="size-4 shrink-0" aria-hidden />
        {check.data.message}
      </p>
    )
  } else if (check.data) {
    body = (
      <p className="bg-destructive-soft text-destructive flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium">
        <CircleXIcon className="size-4 shrink-0" aria-hidden />
        {check.data.message}
      </p>
    )
  }
  return (
    <div role="status" aria-live="polite">
      {body}
    </div>
  )
}
