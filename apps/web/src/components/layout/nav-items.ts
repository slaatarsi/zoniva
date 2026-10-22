import { ClipboardListIcon, LayoutDashboardIcon, MapPinnedIcon, PackageIcon } from 'lucide-react'

// Single navigation definition shared by the desktop sidebar and mobile bottom bar.
export const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboardIcon },
  { to: '/products', label: 'Products', icon: PackageIcon },
  { to: '/zones', label: 'Delivery Zones', shortLabel: 'Zones', icon: MapPinnedIcon },
  { to: '/orders', label: 'Orders', icon: ClipboardListIcon },
] as const
