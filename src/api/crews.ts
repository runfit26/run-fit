import {
  Crew,
  PaginationQueryParams,
  ResponseData,
  ResponseError,
} from '@/types';

export async function createCrew(
  body: Pick<Crew, 'name' | 'description' | 'city' | 'image'>
) {
  const response = await fetch('/api/crews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data: ResponseData<Crew, ResponseError> = await response.json();
  return data;
}

export async function getCrews(
  queryParams?: {
    sort?: string;
    city?: string;
    district?: string;
  } & PaginationQueryParams
) {
  const response = await fetch(
    `/api/crews?${new URLSearchParams(queryParams as any)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data: ResponseData<Crew[], ResponseError> = await response.json();
  return data;
}

export async function getCrewById(crewId: string) {
  // GET /crews/:crewId
  const response = await fetch(`/api/crews/${crewId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: ResponseData<Crew, ResponseError> = await response.json();

  return data;
}

export async function getCrewMembersById(
  crewId: string,
  queryParams?: { role?: 'leader' | 'staff' | 'member' }
) {
  // GET /crews/:crewId/members?role=leader|staff|member
  // queryParams: {
  //   role?: 'leader' | 'staff' | 'member',
  //   page?: number,
  //   limit?: number
  // }
  // 성공시
  // response: 200 OK
  // body: Member[] <- leader라도 배열로 반환 // TODO: 이 부분 확인 필요
}

export async function updateCrewDetail(
  crewId: string,
  body: Pick<Crew, 'name' | 'description' | 'city' | 'image'>
) {
  // PATCH /crews/:crewId
  // 성공시
  // body: Crew
}

export async function expelMember(crewId: string, userId: string) {
  // DELETE /crews/expel/:crewId/:userId
  const response = await fetch(`/api/crews/expel/${crewId}/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  type ExpelMemberData = { message: '멤버를 추방했습니다.' };
  type ExpelMemberError = {
    code: 'CREW_LEADER_ONLY';
    message: '크루장만 멤버를 추방할 수 있습니다.';
  };
  const data: ResponseData<ExpelMemberData, ExpelMemberError> =
    await response.json();

  return data;
}

export async function leaveCrew(crewId: string, userId: string) {
  // DELETE /crews/:crewId/:userId
  const response = await fetch(`/api/crews/leave/${crewId}/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  type LeaveCrewData = { message: '크루를 탈퇴했습니다.' };
  type LeaveCrewError = {
    code: 'CREW_ROLE_FORBIDDEN';
    message: '크루장은 탈퇴 전에 리더 권한을 위임해야 합니다.';
  };
  const data: ResponseData<LeaveCrewData, LeaveCrewError> =
    await response.json();

  return data;
}

export async function deleteCrew(crewId: string) {
  // DELETE /crews/:crewId
  // 성공시
  // body: { message: "Crew deleted successfully" }
}

// export async function updateMemberRole(body: {
//   crewId: string;
//   userId: string;
//   role: string;
// }) {
//   // PATCH /crew/role/
//   // body: { crewId, userId, role }
// }
