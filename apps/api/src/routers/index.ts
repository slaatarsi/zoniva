import { api } from '../context'
import { dashboardRouter } from '../features/dashboard/dashboard.router'
import { ordersRouter } from '../features/orders/orders.router'
import { productsRouter } from '../features/products/products.router'
import { zonesRouter } from '../features/zones/zones.router'

export const router = api.router({
  products: productsRouter,
  zones: zonesRouter,
  orders: ordersRouter,
  dashboard: dashboardRouter,
})
