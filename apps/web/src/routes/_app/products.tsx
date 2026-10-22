import { createFileRoute } from '@tanstack/react-router'
import { ProductsView, productsQuery } from '#/components/features/products'
import { zonesQuery } from '#/components/features/zones'

export const Route = createFileRoute('/_app/products')({
  head: () => ({ meta: [{ title: 'Products — Zoniva' }] }),
  // Awaited so SSR and hydration render the same data. prefetchQuery never throws,
  // so failures surface as the inline error with Retry.
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.prefetchQuery(productsQuery),
      context.queryClient.prefetchQuery(zonesQuery),
    ]),
  component: ProductsView,
})
