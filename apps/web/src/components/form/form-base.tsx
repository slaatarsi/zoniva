import { useId, type ReactNode } from 'react'
import { Alert, AlertDescription } from '@zoniva/ui/components/alert'
import { Button } from '@zoniva/ui/components/button'
import { Field, FieldDescription, FieldError, FieldLabel } from '@zoniva/ui/components/field'
import { Spinner } from '@zoniva/ui/components/spinner'
import { CircleAlertIcon } from 'lucide-react'
import { useFieldContext, useFormContext } from './hooks'

export type FormBaseProps = { label: string; description?: string }

type ControlProps = {
  id: string
  name: string
  'aria-invalid': boolean
  'aria-describedby'?: string
}

/** Label, description and errors for one field. Errors show after blur or a submit attempt. */
export function FormBase({
  label,
  description,
  children,
}: FormBaseProps & { children: (control: ControlProps) => ReactNode }) {
  const field = useFieldContext()
  const id = useId()
  const { errors, isTouched } = field.state.meta
  const submitted = field.form.state.submissionAttempts > 0
  const invalid = (isTouched || submitted) && errors.length > 0
  const describedBy = [description && `${id}-desc`, invalid && `${id}-err`]
    .filter(Boolean)
    .join(' ')

  return (
    <Field data-invalid={invalid || undefined}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {children({
        id,
        name: field.name,
        'aria-invalid': invalid,
        'aria-describedby': describedBy || undefined,
      })}
      {description && <FieldDescription id={`${id}-desc`}>{description}</FieldDescription>}
      {invalid && <FieldError id={`${id}-err`} errors={errors} />}
    </Field>
  )
}

export function SubmitButton({
  children,
  pendingLabel,
}: {
  children: ReactNode
  pendingLabel?: string
}) {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(s) => s.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting && <Spinner />}
          {isSubmitting ? (pendingLabel ?? children) : children}
        </Button>
      )}
    </form.Subscribe>
  )
}

/** Request-level failure, kept separate from field errors. */
export function FormErrorAlert({ error }: { error: unknown }) {
  if (!error) return null
  return (
    <Alert variant="destructive" role="alert">
      <CircleAlertIcon />
      <AlertDescription>
        {error instanceof Error ? error.message : 'Something went wrong. Please try again.'}
      </AlertDescription>
    </Alert>
  )
}
