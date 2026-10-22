import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { authClient } from '#/lib/auth-client'

export function useLogout() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return async () => {
    const { error } = await authClient.signOut()
    if (error) {
      toast.error('Could not log out. Please try again.')
      return
    }
    // Drop every cached private record before leaving the protected area.
    queryClient.clear()
    await navigate({ to: '/login', replace: true })
  }
}
