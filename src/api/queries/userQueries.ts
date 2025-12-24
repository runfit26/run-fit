import { queryOptions } from '@tanstack/react-query';
import {
  getMyCreatedSessions,
  getMyJoinedCrews,
  getMyLikedSessions,
  getMyOwnedCrews,
  getMyParticipatingSessions,
  getMyProfile,
  getMyReviews,
  getUserProfile,
} from '@/api/fetch/user';
import { normalizeParams } from '@/lib/utils';
import {
  Crew,
  InfiniteQueryPageParam,
  PaginationQueryParams,
  Review,
  Session,
  SliceData,
} from '@/types';

export const userQueries = {
  all: () => ['users'],

  details: () => [...userQueries.all(), 'detail'],
  me: {
    all: () => [...userQueries.details(), 'me'],

    // 내 정보 조회
    info: () =>
      queryOptions({
        queryKey: [...userQueries.me.all(), 'info'],
        queryFn: getMyProfile,
        staleTime: 1000 * 60 * 30, // 내 정보는 자주 변하지 않으므로 30분동안 fresh 상태
      }),

    // 내가 작성한 리뷰 목록(무한 스크롤)
    reviews: () => {
      return {
        queryKey: [...userQueries.me.all(), 'reviews', 'infinite'],
        queryFn: ({ pageParam }: InfiniteQueryPageParam) =>
          getMyReviews({ page: pageParam, size: 10 }),
        getNextPageParam: (
          lastPage: SliceData<Review>,
          allPages: SliceData<Review>[]
        ) => {
          if (!lastPage.hasNext) return undefined;
          return allPages.length;
        },
        initialPageParam: 0,
        staleTime: 1000 * 60,
      };
    },

    // 찜한 세션 목록(무한 스크롤)
    likeAll: () => [...userQueries.me.all(), 'likes'],
    likes: () => {
      return {
        queryKey: [...userQueries.me.all(), 'likes', 'infinite'],
        queryFn: ({ pageParam }: InfiniteQueryPageParam) =>
          getMyLikedSessions({
            page: pageParam,
            size: 18,
          }),
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

    // 크루 관련 (Owned / Joined)
    crews: {
      owned: (params: PaginationQueryParams) => {
        const cleanParams = normalizeParams(params);
        return queryOptions({
          queryKey: [...userQueries.me.all(), 'crews', 'owned', cleanParams],
          queryFn: () => getMyOwnedCrews(cleanParams),
          placeholderData: (previousData) => previousData,
        });
      },
      // 무한 스크롤
      joined: () => {
        return {
          queryKey: [...userQueries.me.all(), 'crews', 'joined', 'infinite'],
          queryFn: ({ pageParam }: InfiniteQueryPageParam) =>
            getMyJoinedCrews({ page: pageParam, size: 10 }),
          getNextPageParam: (
            lastPage: SliceData<Crew>,
            allPages: SliceData<Crew>[]
          ) => {
            if (!lastPage.hasNext) return undefined;
            return allPages.length;
          },
          initialPageParam: 0,
          staleTime: 1000 * 60,
        };
      },
    },

    // 세션 관련 (Created / Participating) (무한 스크롤)
    sessions: {
      created: () => {
        return {
          queryKey: [
            ...userQueries.me.all(),
            'sessions',
            'created',
            'infinite',
          ],
          queryFn: ({ pageParam }: InfiniteQueryPageParam) =>
            getMyCreatedSessions({
              page: pageParam,
              size: 18,
            }),
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
      participating: (status: 'SCHEDULED' | 'COMPLETED') => {
        return {
          queryKey: [
            ...userQueries.me.all(),
            'sessions',
            'participating',
            'infinite',
          ],
          queryFn: ({ pageParam }: InfiniteQueryPageParam) =>
            getMyParticipatingSessions({
              page: pageParam,
              size: 18,
              status,
            }),
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
    },
  },

  // 특정 유저 정보 조회
  profile: (userId: number) =>
    queryOptions({
      queryKey: [...userQueries.details(), userId],
      queryFn: () => getUserProfile(userId),
      enabled: !!userId, // userId가 유효할때만 실행
    }),
};
