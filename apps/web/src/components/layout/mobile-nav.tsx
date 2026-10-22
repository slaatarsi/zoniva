import { Link } from '@tanstack/react-router'
import { Button } from '@zoniva/ui/components/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@zoniva/ui/components/drawer'
import { LogOutIcon, UserRoundIcon } from 'lucide-react'
import type { SessionUser } from '#/lib/session'
import { navItems } from './nav-items'
import { UserIdentity } from './nav-user'
import { useLogout } from './use-logout'

const itemClass =
  'flex min-h-14 min-w-11 flex-1 flex-col items-center justify-center gap-1 rounded-md px-1 text-[11px] font-medium text-muted-foreground transition-colors active:bg-muted aria-[current=page]:text-primary aria-expanded:text-primary'

/** Bottom navigation row for <640px. Lives in its own shell row, never over content. */
export function MobileNav({ user }: { user: SessionUser }) {
  const logout = useLogout()
  return (
    <nav
      aria-label="Main"
      className="bg-card flex shrink-0 border-t px-2 pb-[env(safe-area-inset-bottom)] sm:hidden"
    >
      {navItems.map((item) => (
        <Link key={item.to} to={item.to} className={itemClass}>
          <item.icon className="size-5" aria-hidden />
          <span className="max-w-full truncate">
            {'shortLabel' in item ? item.shortLabel : item.label}
          </span>
        </Link>
      ))}
      {/* No nav item has children, so account/footer content lives behind this utility button. */}
      <Drawer>
        <DrawerTrigger className={itemClass} aria-label="Account">
          <UserRoundIcon className="size-5" aria-hidden />
          <span>Account</span>
        </DrawerTrigger>
        <DrawerContent className="pb-[env(safe-area-inset-bottom)]">
          <DrawerHeader className="text-start">
            <DrawerTitle>Account</DrawerTitle>
            <DrawerDescription className="sr-only">Your account and sign-out</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="border-t">
            <div className="flex items-center gap-3 py-1">
              <UserIdentity user={user} />
            </div>
            <Button variant="outline" className="h-11" onClick={() => void logout()}>
              <LogOutIcon />
              Log out
            </Button>
            <DrawerClose asChild>
              <Button variant="ghost" className="h-11">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </nav>
  )
}
