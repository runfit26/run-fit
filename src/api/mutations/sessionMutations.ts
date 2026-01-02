import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createSession,
  deleteSession,
  registerForSession,
  unregisterFromSession,
  updateSessionDetail,
  UpdateSessionDetailRequestBody,
} from '@/api/fetch/sessions';
import { sessionQueries } from '@/api/queries/sessionQueries';

// 세션 생성
export function useCreateSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSession,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionQueries.lists(), // 세션 목록 캐시 무효화
      });
    },
  });
}

// 세션 정보 수정
export function useUpdateSession(sessionId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateSessionDetailRequestBody) =>
      updateSessionDetail(sessionId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionQueries.detail(sessionId).queryKey, // 세션 상세 캐시 무효화
      });
      queryClient.invalidateQueries({
        queryKey: sessionQueries.lists(), // 세션 목록 캐시 무효화
      });
    },
  });
}

// 세션 참여
export function useRegisterSession(
  sessionId: number,
  options?: UseMutationOptions
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => registerForSession(sessionId),
    ...options, // 외부에서 전달한 onError, onSuccess 등을 전개
    onSuccess: (data, variables, onMutateResult, context) => {
      // 1. 내부 로직: 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: sessionQueries.participants(sessionId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: sessionQueries.detail(sessionId).queryKey,
      });

      // 2. 외부에서 전달한 onSuccess가 있다면 실행
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
// 세션 참여 취소
export function useUnregisterSession(sessionId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => unregisterFromSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionQueries.participants(sessionId).queryKey, // 세션 참여자 목록 캐시 무효화
      });
      queryClient.invalidateQueries({
        queryKey: sessionQueries.detail(sessionId).queryKey, // 세션 상세 캐시 무효화
      });
    },
  });
}

// 세션 삭제
export function useDeleteSession(sessionId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionQueries.lists() });
    },
  });
}
