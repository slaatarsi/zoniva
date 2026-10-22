import { createFileRoute, redirect } from '@tanstack/react-router'
import { sessionQuery } from '#/lib/session'

export const Route = createFileRoute('/')({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.fetchQuery(sessionQuery)
    throw redirect({ to: user ? '/dashboard' : '/login' })
  },
})
