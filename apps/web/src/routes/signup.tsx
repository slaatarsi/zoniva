import { Link, createFileRoute, redirect } from '@tanstack/react-router'
import { AuthForm } from '#/components/features/auth/auth-form'
import { AuthLayout } from '#/components/features/auth/auth-layout'
import { sessionQuery } from '#/lib/session'

export const Route = createFileRoute('/signup')({
  beforeLoad: async ({ context }) => {
    if (await context.queryClient.fetchQuery(sessionQuery)) throw redirect({ to: '/dashboard' })
  },
  head: () => ({ meta: [{ title: 'Create account — Zoniva' }] }),
  component: () => (
    <AuthLayout
      title="Create your account"
      description="Start managing products, zones and orders."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="text-primary underline underline-offset-4">
            Log in
          </Link>
        </>
      }
    >
      <AuthForm mode="signup" />
    </AuthLayout>
  ),
})
