import { Outlet } from '@tanstack/react-router'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@zoniva/ui/components/sidebar'
import type { SessionUser } from '#/lib/session'
import { AppSidebar } from './app-sidebar'
import { MobileNav } from './mobile-nav'

/**
 * 100dvh grid: header row, independently scrolling content row, and (on phones) a
 * bottom-navigation row, so navigation never overlaps content.
 */
export function AppShell({ user }: { user: SessionUser }) {
  return (
    <SidebarProvider className="h-dvh min-h-0 overflow-hidden">
      <AppSidebar user={user} />
      <SidebarInset className="min-h-0 min-w-0">
        <header className="bg-background flex h-14 shrink-0 items-center gap-2 border-b px-4 pt-[env(safe-area-inset-top)] sm:px-6">
          <SidebarTrigger className="-ms-1 max-sm:hidden" />
          <img
            src="/zoniva-logo.svg"
            alt="Zoniva"
            width={104}
            height={32}
            className="h-8 w-auto sm:hidden"
          />
        </header>
        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
          data-scroll-restoration-id="app-main"
        >
          <div className="mx-auto w-full max-w-[1440px] p-4 sm:p-6">
            <Outlet />
          </div>
        </div>
        <MobileNav user={user} />
      </SidebarInset>
    </SidebarProvider>
  )
}
