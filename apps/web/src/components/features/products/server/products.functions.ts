import { createServerFn } from '@tanstack/react-start'
import { assignZonesInput, createProductInput } from '@zoniva/contracts'
import { assignProductZones, createProduct, listProducts } from './products.server'

export const listProductsFn = createServerFn({ method: 'GET' }).handler(() => listProducts())

export const createProductFn = createServerFn({ method: 'POST' })
  .validator(createProductInput)
  .handler(({ data }) => createProduct(data))

export const assignProductZonesFn = createServerFn({ method: 'POST' })
  .validator(assignZonesInput)
  .handler(({ data }) => assignProductZones(data))
