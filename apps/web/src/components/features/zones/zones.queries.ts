import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import type { CreateZoneInput } from '@zoniva/contracts'
import { createZoneFn, listZonesFn } from './server/zones.functions'

export const zonesQuery = queryOptions({ queryKey: ['zones'], queryFn: () => listZonesFn() })

export function useCreateZone() {
  const create = useServerFn(createZoneFn)
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateZoneInput) => create({ data }),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: zonesQuery.queryKey }),
        queryClient.invalidateQueries({ queryKey: ['dashboard'] }),
      ]),
  })
}
