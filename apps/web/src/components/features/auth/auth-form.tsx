import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { z } from 'zod'
import { FormErrorAlert } from '#/components/form/form-base'
import { useAppForm } from '#/components/form/hooks'
import { authClient } from '#/lib/auth-client'
import { sessionQuery } from '#/lib/session'

const email = z.string().trim().toLowerCase().email('Enter a valid email address.')
const loginSchema = z.object({ email, password: z.string().min(1, 'Password is required.') })
const signupSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.').max(100, 'Name is too long.'),
  email,
  password: z.string().min(8, 'Use at least 8 characters.').max(128, 'Password is too long.'),
})

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [error, setError] = useState<Error | null>(null)
  const isSignup = mode === 'signup'

  const form = useAppForm({
    defaultValues: { name: '', email: '', password: '' },
    validators: { onSubmit: isSignup ? signupSchema : loginSchema.extend({ name: z.string() }) },
    onSubmit: async ({ value }) => {
      setError(null)
      const email = value.email.trim().toLowerCase()
      const result = isSignup
        ? await authClient.signUp.email({
            name: value.name.trim(),
            email,
            password: value.password,
          })
        : await authClient.signIn.email({ email, password: value.password })
      if (result.error) {
        // Login stays generic to avoid revealing which part of the credentials was wrong.
        setError(
          new Error(
            isSignup
              ? (result.error.message ?? 'Could not create your account.')
              : 'Invalid email or password.',
          ),
        )
        return
      }
      await queryClient.invalidateQueries({ queryKey: sessionQuery.queryKey })
      await navigate({ to: '/dashboard', replace: true })
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
      <FormErrorAlert error={error} />
      {isSignup && (
        <form.AppField name="name">
          {(field) => <field.FormInput label="Name" autoComplete="name" />}
        </form.AppField>
      )}
      <form.AppField name="email">
        {(field) => (
          <field.FormInput label="Email" type="email" inputMode="email" autoComplete="email" />
        )}
      </form.AppField>
      <form.AppField name="password">
        {(field) => (
          <field.FormInput
            label="Password"
            type="password"
            autoComplete={isSignup ? 'new-password' : 'current-password'}
            description={isSignup ? 'At least 8 characters.' : undefined}
          />
        )}
      </form.AppField>
      <form.AppForm>
        <form.SubmitButton pendingLabel={isSignup ? 'Creating account…' : 'Logging in…'}>
          {isSignup ? 'Create account' : 'Log in'}
        </form.SubmitButton>
      </form.AppForm>
    </form>
  )
}
