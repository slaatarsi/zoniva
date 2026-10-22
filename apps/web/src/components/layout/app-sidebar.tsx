import { Link, useLocation } from '@tanstack/react-router'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@zoniva/ui/components/sidebar'
import type { SessionUser } from '#/lib/session'
import { navItems } from './nav-items'
import { NavUser } from './nav-user'

export function AppSidebar({ user }: { user: SessionUser }) {
  const { setOpenMobile } = useSidebar()
  const pathname = useLocation({ select: (l) => l.pathname })
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link
          to="/dashboard"
          className="flex h-12 items-center px-2 group-data-[collapsible=icon]:px-0"
          aria-label="Zoniva dashboard"
        >
          <img
            src="/zoniva-logo.svg"
            alt=""
            width={130}
            height={40}
            className="h-9 w-auto group-data-[collapsible=icon]:hidden"
          />
          <img
            src="/favicon.svg"
            alt=""
            width={32}
            height={32}
            className="hidden size-8 group-data-[collapsible=icon]:block"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.to)}
                    tooltip={item.label}
                  >
                    <Link to={item.to} onClick={() => setOpenMobile(false)}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
