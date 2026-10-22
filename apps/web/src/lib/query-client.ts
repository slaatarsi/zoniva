import { QueryClient } from '@tanstack/react-query'

// Created per router, so SSR query state stays request-scoped.
export function createQueryClient() {
  return new QueryClient({ defaultOptions: { queries: { staleTime: 30_000 } } })
}
