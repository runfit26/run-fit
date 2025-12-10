import { useMutation, useQueryClient } from '@tanstack/react-query';
import { expelMember } from '@/api/crews';
import { QUERY_KEY, QUERY_KEYS } from '@/lib/constants';

// 크루 멤버 추방
export default function useExpelMember(crewId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => expelMember(crewId, userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.crews, crewId, QUERY_KEY.members], // 크루 멤버 목록 캐시 무효화
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.crews.members.count(crewId), // 멤버 수 캐시 무효화
      });
    },
  });
}
