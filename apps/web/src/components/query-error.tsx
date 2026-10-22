import { Alert, AlertAction, AlertDescription } from '@zoniva/ui/components/alert'
import { Button } from '@zoniva/ui/components/button'
import { CircleAlertIcon } from 'lucide-react'

export function QueryError({ error, onRetry }: { error: Error; onRetry: () => void }) {
  return (
    <Alert variant="destructive" role="alert">
      <CircleAlertIcon />
      <AlertDescription>{error.message}</AlertDescription>
      <AlertAction>
        <Button variant="outline" size="sm" onClick={onRetry}>
          Retry
        </Button>
      </AlertAction>
    </Alert>
  )
}
