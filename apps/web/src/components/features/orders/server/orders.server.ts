import type { CreateOrderInput } from '@zoniva/contracts'
import { callApi } from '#/lib/api.server'

export const listOrders = () => callApi((api) => api.orders.list())
export const validateOrderLocation = (input: {
  productId: string
  latitude: number
  longitude: number
}) => callApi((api) => api.orders.validateLocation(input))
export const createOrder = (input: CreateOrderInput) => callApi((api) => api.orders.create(input))
