import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postSignin, postSignout, postSignup } from '@/lib/api/fetch/auth';
import { userQueries } from '@/lib/api/queries/userQueries';
import { sessionQueries } from '../queries/sessionQueries';

export interface UseAuthFormOptions {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

// 회원가입
export function useSignup(options?: UseAuthFormOptions) {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => {
      options?.onSuccess?.();
    },
    onError: (error) => {
      options?.onError?.(error.message);
    },
  });
}

// 로그인
export function useSignin(options?: UseAuthFormOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSignin,
    onSuccess: () => {
      // 1. 내 정보 관련 캐시 삭제
      queryClient.removeQueries({ queryKey: userQueries.me.all() });
      // 2. 세션 관련 캐시 전체 삭제
      queryClient.removeQueries({ queryKey: sessionQueries.all() });
      options?.onSuccess?.();
    },
    onError: (error) => {
      options?.onError?.(error.message);
    },
  });
}

// 로그아웃
export function useSignout(options?: UseAuthFormOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSignout,
    onSuccess: () => {
      queryClient.clear();
      options?.onSuccess?.();
    },
  });
}
