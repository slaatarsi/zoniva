import { createServerFn } from '@tanstack/react-start'
import { createOrderInput, locationInput } from '@zoniva/contracts'
import { createOrder, listOrders, validateOrderLocation } from './orders.server'

export const listOrdersFn = createServerFn({ method: 'GET' }).handler(() => listOrders())

// GET: a read-only eligibility check (cacheable per product+point inside the query client).
export const validateOrderLocationFn = createServerFn({ method: 'GET' })
  .validator(locationInput)
  .handler(({ data }) => validateOrderLocation(data))

export const createOrderFn = createServerFn({ method: 'POST' })
  .validator(createOrderInput)
  .handler(({ data }) => createOrder(data))
