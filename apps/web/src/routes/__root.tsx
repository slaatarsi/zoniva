import type { QueryClient } from '@tanstack/react-query'
import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import appCss from '@zoniva/ui/globals.css?url'
import { Toaster } from '@zoniva/ui/components/sonner'
import { TooltipProvider } from '@zoniva/ui/components/tooltip'
import type { ReactNode } from 'react'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      // viewport-fit=cover enables safe-area insets; zoom stays enabled.
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { name: 'theme-color', content: '#ffffff' },
      { title: 'Zoniva — Smarter delivery zones' },
      { name: 'description', content: 'Smarter delivery zones. Simpler operations.' },
      { property: 'og:image', content: '/zoniva-og.png' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster position="top-center" />
        <Scripts />
      </body>
    </html>
  )
}
