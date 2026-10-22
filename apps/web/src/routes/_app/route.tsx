import { createFileRoute, redirect } from '@tanstack/react-router'
import { AppShell } from '#/components/layout/app-shell'
import { sessionQuery } from '#/lib/session'

export const Route = createFileRoute('/_app')({
  // UX guard only; every API procedure verifies the session itself.
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.fetchQuery(sessionQuery)
    if (!user) throw redirect({ to: '/login' })
    return { user }
  },
  component: function AppLayout() {
    const { user } = Route.useRouteContext()
    return <AppShell user={user} />
  },
})
