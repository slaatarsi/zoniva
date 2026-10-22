import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { FormInput, FormNumberInput } from './form-input'
import { SubmitButton } from './form-base'

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { FormInput, FormNumberInput },
  formComponents: { SubmitButton },
})
