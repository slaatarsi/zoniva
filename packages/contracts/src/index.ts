import type { ContractRouterClient } from '@orpc/contract'
import { dashboardContract } from './dashboard'
import { ordersContract } from './orders'
import { productsContract } from './products'
import { zonesContract } from './zones'

export * from './common'
export * from './dashboard'
export * from './orders'
export * from './products'
export * from './zones'

export const contract = {
  products: productsContract,
  zones: zonesContract,
  orders: ordersContract,
  dashboard: dashboardContract,
}

export type ApiClient = ContractRouterClient<typeof contract>
