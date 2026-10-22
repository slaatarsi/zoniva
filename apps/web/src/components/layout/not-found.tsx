import { Link } from '@tanstack/react-router'
import { Button } from '@zoniva/ui/components/button'

export function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="text-muted-foreground text-sm font-medium">404</p>
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground max-w-sm">
        The page you are looking for does not exist or has moved.
      </p>
      <Button asChild>
        <Link to="/">Go to Zoniva</Link>
      </Button>
    </main>
  )
}
