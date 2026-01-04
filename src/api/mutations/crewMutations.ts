import { useMutation } from '@tanstack/react-query';
import {
  createCrew,
  delegateCrewLeader,
  deleteCrew,
  expelMember,
  joinCrew,
  leaveCrew,
  updateCrewDetail,
  UpdateCrewDetailRequestBody,
  updateMemberRole,
  UpdateMemberRoleRequestBody,
} from '@/api/fetch/crews';
import { crewQueries } from '@/api/queries/crewQueries';

// 크루 생성
export function useCreateCrew() {
  return useMutation({
    mutationFn: createCrew,
    onSuccess: (_data, _variables, _onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: crewQueries.all() }); // 크루 목록 캐시 무효화 (새 크루 목록에 반영)
    },
  });
}

// 크루 리더 위임
export function useDelegateCrewLeader(crewId: number) {
  return useMutation({
    mutationFn: (body: { newLeaderId: number }) =>
      delegateCrewLeader(crewId, body),
    onSuccess: (_data, _variables, _onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: crewQueries.detail(crewId).queryKey, // 크루 상세 정보 캐시 무효화
      });
    },
  });
}

// 크루 삭제
export function useDeleteCrew(crewId: number) {
  return useMutation({
    mutationFn: () => deleteCrew(crewId),
    onSuccess: (_data, _variables, _onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: crewQueries.all() }); // 크루 목록 캐시 무효화
    },
    onError: (error, _variables, _onMutateResult, _context) => {
      console.error('크루 삭제 실패:', error);
    },
  });
}

// 크루 멤버 추방
export function useExpelMember(crewId: number) {
  return useMutation({
    mutationFn: (userId: number) => expelMember(crewId, userId),
    onSuccess: (_data, _variables, _onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: crewQueries.members(crewId).all(), // 크루 멤버 목록 캐시 무효화
      });
    },
  });
}

// 크루 가입
export function useJoinCrew(crewId: number) {
  return useMutation({
    mutationFn: () => joinCrew(crewId),
    onSuccess: (_data, _variables, _onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: crewQueries.members(crewId).all(), // 크루 멤버 목록 캐시 무효화
      });
    },
  });
}

// 크루 탈퇴
export function useLeaveCrew(crewId: number) {
  return useMutation({
    mutationFn: () => leaveCrew(crewId),
    onSuccess: (_data, _variables, _onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: crewQueries.members(crewId).all(), // 크루 멤버 목록 캐시 무효화
      });
    },
    onError: (error, _variables, _onMutateResult, _context) => {
      console.error('크루 탈퇴 실패:', error);
    },
  });
}

// 크루 상세 정보 수정
export function useUpdateCrewDetail(crewId: number) {
  return useMutation({
    mutationFn: (body: UpdateCrewDetailRequestBody) =>
      updateCrewDetail(crewId, body),
    onSuccess: (_data, _variables, _onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: crewQueries.detail(crewId).queryKey,
      });
      context.client.invalidateQueries({ queryKey: crewQueries.lists() });
    },
  });
}

// 멤버 역할 변경 (운영진 <-> 멤버)
export function useUpdateMemberRole(crewId: number) {
  return useMutation({
    mutationFn: ({
      userId,
      body,
    }: {
      userId: number;
      body: UpdateMemberRoleRequestBody;
    }) => updateMemberRole(crewId, userId, body),
    onSuccess: (_data, _variables, _onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: crewQueries.members(crewId).all(), // 크루 멤버 관련 캐시 초기화
      });
    },
  });
}
