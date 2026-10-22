import { Link, createFileRoute, redirect } from '@tanstack/react-router'
import { AuthForm } from '#/components/features/auth/auth-form'
import { AuthLayout } from '#/components/features/auth/auth-layout'
import { sessionQuery } from '#/lib/session'

export const Route = createFileRoute('/login')({
  beforeLoad: async ({ context }) => {
    if (await context.queryClient.fetchQuery(sessionQuery)) throw redirect({ to: '/dashboard' })
  },
  head: () => ({ meta: [{ title: 'Log in — Zoniva' }] }),
  component: () => (
    <AuthLayout
      title="Log in"
      description="Smarter delivery zones. Simpler operations."
      footer={
        <>
          No account?{' '}
          <Link to="/signup" className="text-primary underline underline-offset-4">
            Create one
          </Link>
        </>
      }
    >
      <AuthForm mode="login" />
    </AuthLayout>
  ),
})
