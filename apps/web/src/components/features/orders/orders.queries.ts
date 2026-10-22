import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import type { CreateOrderInput } from '@zoniva/contracts'
import { createOrderFn, listOrdersFn, validateOrderLocationFn } from './server/orders.functions'

export const ordersQuery = queryOptions({ queryKey: ['orders'], queryFn: () => listOrdersFn() })

export const locationCheckQuery = (input: {
  productId: string
  latitude: number
  longitude: number
}) =>
  queryOptions({
    queryKey: ['orders', 'location-check', input],
    queryFn: () => validateOrderLocationFn({ data: input }),
    staleTime: 0,
    retry: false,
  })

export function useCreateOrder() {
  const create = useServerFn(createOrderFn)
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateOrderInput) => create({ data }),
    // Stock, order lists and dashboard counts all change.
    onSuccess: () =>
      Promise.all(
        [['orders'], ['products'], ['dashboard']].map((queryKey) =>
          queryClient.invalidateQueries({ queryKey }),
        ),
      ),
  })
}
