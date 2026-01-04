// api/mutations/reviewMutations.ts
import { useMutation } from '@tanstack/react-query';
import {
  createSessionReview,
  deleteSessionReview,
  type CreateSessionReviewRequestBody,
} from '@/api/fetch/reviews';
import { reviewQueries } from '@/api/queries/reviewQueries';
import { sessionQueries } from '../queries/sessionQueries';
import { userQueries } from '../queries/userQueries';

// 세션 리뷰 작성
export const useCreateSessionReview = (sessionId: number) => {
  return useMutation({
    // throw new Error('sessionId 알 수 없음');
    mutationFn: (body: CreateSessionReviewRequestBody) =>
      createSessionReview(sessionId, body),
    onSuccess: (_data, _variables, _onMutateResult, context) => {
      if (!sessionId) return;

      context.client.invalidateQueries({
        queryKey: reviewQueries.session(sessionId).lists(), // 해당 세션 리뷰 목록 캐시 무효화
      });
      context.client.invalidateQueries({
        queryKey: userQueries.me.all(), // 내 정보 캐시 무효화
      });
      context.client.invalidateQueries({
        queryKey: sessionQueries.detail(sessionId).queryKey, // 세션 상세 캐시 무효화
      });
    },
  });
};

// 세션 리뷰 삭제
export const useDeleteReview = (sessionId?: number) => {
  return useMutation({
    mutationFn: (reviewId: number) => deleteSessionReview(reviewId),
    onSuccess: (_data, _variables, _onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: userQueries.me.all(), // 내 정보 캐시 무효화
      });
      if (sessionId) {
        context.client.invalidateQueries({
          queryKey: reviewQueries.session(sessionId).lists(), // 해당 세션 리뷰 목록 캐시 무효화
        });
      } else {
        context.client.invalidateQueries({ queryKey: reviewQueries.all() }); // 전체 세션 리뷰 캐시 무효화
      }
    },
  });
};
