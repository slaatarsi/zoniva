import type { ComponentProps } from 'react'
import { Input } from '@zoniva/ui/components/input'
import { FormBase, type FormBaseProps } from './form-base'
import { useFieldContext } from './hooks'

type InputProps = Omit<ComponentProps<'input'>, 'value' | 'onChange' | 'onBlur' | 'id' | 'name'>

export function FormInput({ label, description, ...props }: FormBaseProps & InputProps) {
  const field = useFieldContext<string>()
  return (
    <FormBase label={label} description={description}>
      {(control) => (
        <Input
          {...props}
          {...control}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
        />
      )}
    </FormBase>
  )
}

/** Empty input is `null` (not 0) so "required" is reported instead of a silent zero. */
export function FormNumberInput({ label, description, ...props }: FormBaseProps & InputProps) {
  const field = useFieldContext<number | null>()
  return (
    <FormBase label={label} description={description}>
      {(control) => (
        <Input
          type="number"
          {...props}
          {...control}
          value={field.state.value ?? ''}
          onChange={(e) =>
            field.handleChange(e.target.value === '' ? null : e.target.valueAsNumber)
          }
          onBlur={field.handleBlur}
        />
      )}
    </FormBase>
  )
}
