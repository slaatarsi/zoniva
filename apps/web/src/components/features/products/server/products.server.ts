import type { CreateProductInput } from '@zoniva/contracts'
import { callApi } from '#/lib/api.server'

export const listProducts = () => callApi((api) => api.products.list())
export const createProduct = (input: CreateProductInput) =>
  callApi((api) => api.products.create(input))
export const assignProductZones = (input: { productId: string; zoneIds: string[] }) =>
  callApi((api) => api.products.assignZones(input))
