import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCrew } from '@/api/crews';
import { QUERY_KEYS } from '@/lib/constants';

// 크루 삭제
export default function useDeleteCrew() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (crewId: number) => deleteCrew(crewId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.crews.all }); // 크루 목록 캐시 무효화
    },
  });
}
