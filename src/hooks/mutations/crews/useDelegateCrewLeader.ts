import { useMutation, useQueryClient } from '@tanstack/react-query';
import { delegateCrewLeader } from '@/api/crews';
import { QUERY_KEYS } from '@/lib/constants';

// 크루 리더 위임
export default function useDelegateCrewLeader(crewId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { newLeaderId: number }) =>
      delegateCrewLeader(crewId, body),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.crews.byId(crewId), // 크루 상세 정보 캐시 무효화
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.crews.members.all(crewId), // 크루 멤버 목록 캐시 무효화
      });
    },
  });
}
