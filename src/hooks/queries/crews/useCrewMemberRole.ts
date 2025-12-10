import { useQuery } from '@tanstack/react-query';
import { getCrewMemberDetailById } from '@/api/crews';
import { QUERY_KEYS } from '@/lib/constants';

/**
 * 특정 크루 내 사용자의 역할을 조회
 * @param crewId
 * @param userId
 */
export default function useCrewMemberRole(crewId: number, userId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.crews.members.role(crewId, userId),
    queryFn: () => getCrewMemberDetailById(crewId, userId),
    staleTime: 0, // 권한 조회 기능이므로 즉시 만료
    enabled: !!crewId && !!userId, // crewId 및 userId가 유효할 때만 쿼리가 자동으로 실행
  });
}
