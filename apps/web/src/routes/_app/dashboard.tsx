import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { DashboardView, dashboardOverviewQuery } from '#/components/features/dashboard'

export const Route = createFileRoute('/_app/dashboard')({
  // Selected zone lives in the URL so Back/Forward and refresh keep it.
  validateSearch: z.object({ zone: z.string().optional() }),
  head: () => ({ meta: [{ title: 'Dashboard — Zoniva' }] }),
  loader: ({ context }) => context.queryClient.prefetchQuery(dashboardOverviewQuery),
  component: function Dashboard() {
    const { zone } = Route.useSearch()
    const navigate = Route.useNavigate()
    return (
      <DashboardView
        selectedZoneId={zone}
        onSelectZone={(id) =>
          void navigate({ search: { zone: id }, replace: true, resetScroll: false })
        }
      />
    )
  },
})
