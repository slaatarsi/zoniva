import { createFileRoute } from '@tanstack/react-router'
import { ZonesView, zonesQuery } from '#/components/features/zones'

export const Route = createFileRoute('/_app/zones')({
  head: () => ({ meta: [{ title: 'Delivery Zones — Zoniva' }] }),
  loader: ({ context }) => context.queryClient.prefetchQuery(zonesQuery),
  component: ZonesView,
})
