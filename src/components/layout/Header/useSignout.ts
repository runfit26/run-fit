import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { userQueries } from '@/api/queries/userQueries';

export function useSignout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleSignout = async () => {
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
      });

      if (response.ok) {
        queryClient.invalidateQueries({ queryKey: userQueries.me().queryKey });
        router.push('/signin');
      }
    } catch (error) {
      console.error('Signout failed:', error);
    }
  };

  return handleSignout;
}
