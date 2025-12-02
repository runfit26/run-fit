import {
  Crew,
  PaginationQueryParams,
  Profile,
  ResponseData,
  ResponseError,
} from '@/types';

export async function createCrew(
  body: Pick<Crew, 'name' | 'description' | 'city' | 'image'>
) {
  const accessToken = '';
  const response = await fetch('/api/crews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  const data: ResponseData<Crew, ResponseError> = await response.json();

  return data;
}

export async function getCrews(
  queryParams?: {
    city?: string;
    keyword?: string;
    sort?: 'createdAtDesc' | 'memberCountDesc';
    // district?: string;
  } & PaginationQueryParams
) {
  const query = new URLSearchParams(
    queryParams as Record<string, string>
  ).toString();
  const response = await fetch(`/api/crews?${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data: ResponseData<Crew[], ResponseError> = await response.json();
  return data;
}

export async function getCrewDetail(crewId: string) {
  const response = await fetch(`/api/crews/${crewId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  type CrewDetailResponseError = ResponseError & {
    code: 'CREW_NOT_FOUND';
    message: '크루를 찾을 수 없습니다.';
  };
  const data: ResponseData<Crew, CrewDetailResponseError> =
    await response.json();

  return data;
}

export async function getCrewMembers(
  crewId: string,
  queryParams?: { role?: 'leader' | 'staff' | 'member' }
) {
  const query = new URLSearchParams(
    queryParams as Record<string, string>
  ).toString();
  const response = await fetch(`/api/crews/${crewId}/members?${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  type CrewMembersResponseData = {
    leader: Profile;
    staff: Profile[];
    member: Profile[];
  };
  type CrewMembersResponseError = ResponseError & {
    code: 'CREW_NOT_FOUND';
    message: '크루를 찾을 수 없습니다.';
  };
  const data: ResponseData<CrewMembersResponseData, CrewMembersResponseError> =
    await response.json();

  return data;
}

export async function getCrewMemberCount(crewId: string) {
  const response = await fetch(`/api/crews/${crewId}/members/count`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  type CrewMemberCountResponseData = {
    leaderCount: number;
    staffCount: number;
    memberCount: number;
  };
  const data: ResponseData<CrewMemberCountResponseData, ResponseError> =
    await response.json();

  return data;
}

export async function getCrewMemberDetailById(crewId: string, userId: string) {
  const response = await fetch(`/api/crews/${crewId}/members/${userId}/role`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data: ResponseData<Profile, ResponseError> = await response.json();

  return data;
}

export async function delegateCrewLeader(
  crewId: string,
  userId: string,
  body: { newLeaderId: number }
) {
  const accessToken = '';
  const response = await fetch(`/api/crews/delegate/${crewId}/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  type DelegateCrewLeaderData = {
    message: '크루장이 변경되었습니다.';
    oldLeaderId: number;
    newLeaderId: number;
  };
  const data: ResponseData<DelegateCrewLeaderData, ResponseError> =
    await response.json();

  return data;
}

export async function updateMemberRole(
  crewId: string,
  userId: string,
  body: { role: 'STAFF' | 'MEMBER' }
) {
  const accessToken = '';
  const response = await fetch(`/api/crews/role/${crewId}/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  type UpdateMemberRoleData =
    | {
        userId: string;
        previousRole: 'MEMBER';
        newRole: 'STAFF';
        message: '운영진으로 등록되었습니다.';
      }
    | {
        userId: string;
        previousRole: 'STAFF';
        newRole: 'MEMBER';
        message: '운영진에서 해제되었습니다.';
      };
  // 이 부분은 Frontend에서 크루장 역할 변경 인터페이스를 없애서 사실상 발생하지 않음
  // 일단 백엔드 API 문서에 맞춰서 작성
  type UpdateMemberRoleError = ResponseError & {
    code: 'CREW_ROLE_FORBIDDEN';
    message: '크루장의 역할은 변경할 수 없습니다. 리더 위임을 이용해주세요.';
  };
  const data: ResponseData<UpdateMemberRoleData, UpdateMemberRoleError> =
    await response.json();

  return data;
}

export async function expelMember(crewId: string, userId: string) {
  const accessToken = '';
  const response = await fetch(`/api/crews/${crewId}/members/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function updateCrewDetail(
  crewId: string,
  body: Pick<Crew, 'name' | 'description' | 'city' | 'image'>
) {
  const accessToken = '';
  const response = await fetch(`/api/crews/${crewId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  const data: ResponseData<Crew, ResponseError> = await response.json();

  return data;
}

export async function deleteCrew(crewId: string) {
  const accessToken = '';
  const response = await fetch(`/api/crews/${crewId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  type DeleteCrewData = { message: '크루가 삭제되었습니다.' };
  const data: ResponseData<DeleteCrewData, ResponseError> =
    await response.json();

  return data;
}
