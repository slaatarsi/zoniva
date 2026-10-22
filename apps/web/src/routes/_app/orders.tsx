import { createFileRoute } from '@tanstack/react-router'
import { OrdersView, ordersQuery } from '#/components/features/orders'
import { productsQuery } from '#/components/features/products'
import { zonesQuery } from '#/components/features/zones'

export const Route = createFileRoute('/_app/orders')({
  head: () => ({ meta: [{ title: 'Orders — Zoniva' }] }),
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.prefetchQuery(ordersQuery),
      context.queryClient.prefetchQuery(productsQuery),
      context.queryClient.prefetchQuery(zonesQuery),
    ]),
  component: OrdersView,
})
