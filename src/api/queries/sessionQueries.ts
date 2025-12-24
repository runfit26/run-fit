import { queryOptions } from '@tanstack/react-query';
import {
  getSessionDetail,
  getSessionParticipants,
  getSessions,
} from '@/api/fetch/sessions';
import { normalizeParams } from '@/lib/utils';
import {
  InfiniteQueryPageParam,
  Session,
  SessionListFilters,
  SliceData,
} from '@/types';

export const sessionQueries = {
  all: () => ['sessions'],

  // 세션 목록 조회
  lists: () => [...sessionQueries.all(), 'list'],
  // 세션 목록 조회(무한 스크롤)
  list: (filters: Omit<SessionListFilters, 'page' | 'size'>) => {
    const cleanFilters = normalizeParams(filters);
    return {
      queryKey: [...sessionQueries.lists(), 'infinite', cleanFilters],
      queryFn: ({ pageParam }: InfiniteQueryPageParam) =>
        getSessions({ ...cleanFilters, page: pageParam, size: 18 }),
      getNextPageParam: (
        lastPage: SliceData<Session>,
        allPages: SliceData<Session>[]
      ) => {
        if (!lastPage.hasNext) return undefined;
        return allPages.length;
      },
      initialPageParam: 0,
      staleTime: 1000 * 60,
    };
  },

  // 세션 상세 정보 조회
  details: () => [...sessionQueries.all(), 'detail'],
  detail: (sessionId: number) =>
    queryOptions({
      queryKey: [...sessionQueries.details(), sessionId],
      queryFn: () => getSessionDetail(sessionId),
      enabled: !!sessionId, // sessionId가 유효할 때만 실행
    }),

  // 세션 참가자 조회
  participants: (sessionId: number) =>
    queryOptions({
      queryKey: [...sessionQueries.details(), sessionId, 'participants'],
      queryFn: () => getSessionParticipants(sessionId),
      enabled: !!sessionId, // sessionId가 유효할 때만 실행
    }),
};
