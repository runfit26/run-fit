import { useMutation } from '@tanstack/react-query';
import { postSignin, postSignout, postSignup } from '@/api/fetch/auth';
import { userQueries } from '@/api/queries/userQueries';
import { sessionQueries } from '../queries/sessionQueries';

// 회원가입
export function useSignup() {
  return useMutation({
    mutationFn: postSignup,
  });
}

// 로그인
export function useSignin() {
  return useMutation({
    mutationFn: postSignin,
    onSuccess: (_data, _variables, _onMutateResult, context) => {
      // 1. 내 정보 관련 캐시 삭제
      context.client.removeQueries({ queryKey: userQueries.me.all() });
      // 2. 세션 관련 캐시 전체 삭제
      context.client.removeQueries({ queryKey: sessionQueries.all() });
    },
  });
}

// 로그아웃
export function useSignout() {
  return useMutation({
    mutationFn: postSignout,
    onSuccess: (_data, _variables, _onMutateResult, context) => {
      context.client.clear();
    },
  });
}
