import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@zoniva/ui/components/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@zoniva/ui/components/sidebar'
import { ChevronsUpDownIcon, LogOutIcon } from 'lucide-react'
import type { SessionUser } from '#/lib/session'
import { useLogout } from './use-logout'

export function UserIdentity({ user }: { user: SessionUser }) {
  return (
    <div className="grid min-w-0 flex-1 text-start leading-tight">
      <span className="truncate text-sm font-medium">{user.name}</span>
      <span className="text-muted-foreground truncate text-xs">{user.email}</span>
    </div>
  )
}

export function NavUser({ user }: { user: SessionUser }) {
  const logout = useLogout()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" aria-label={`Account menu for ${user.name}`}>
              <UserIdentity user={user} />
              <ChevronsUpDownIcon className="ms-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="start"
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
          >
            <DropdownMenuLabel className="font-normal">
              <UserIdentity user={user} />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => void logout()}>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
