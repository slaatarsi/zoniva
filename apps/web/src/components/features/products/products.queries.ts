import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import type { CreateProductInput } from '@zoniva/contracts'
import { assignProductZonesFn, createProductFn, listProductsFn } from './server/products.functions'

export const productsQuery = queryOptions({
  queryKey: ['products'],
  queryFn: () => listProductsFn(),
})

function useInvalidateProducts() {
  const queryClient = useQueryClient()
  return () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: productsQuery.queryKey }),
      queryClient.invalidateQueries({ queryKey: ['dashboard'] }),
    ])
}

export function useCreateProduct() {
  const create = useServerFn(createProductFn)
  const invalidate = useInvalidateProducts()
  return useMutation({
    mutationFn: (data: CreateProductInput) => create({ data }),
    onSuccess: invalidate,
  })
}

export function useAssignProductZones() {
  const assign = useServerFn(assignProductZonesFn)
  const invalidate = useInvalidateProducts()
  return useMutation({
    mutationFn: (data: { productId: string; zoneIds: string[] }) => assign({ data }),
    onSuccess: invalidate,
  })
}
