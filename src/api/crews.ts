import {
  Crew,
  PageData,
  PaginationQueryParams,
  Profile,
  ResponseData,
  ResponseErrorData,
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

  if (!response.ok) {
    const errorData: ResponseErrorData = await response.json();
    return errorData.error;
  }

  const { data }: ResponseData<Crew> = await response.json();

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

  if (!response.ok) {
    const errorData: ResponseErrorData = await response.json();
    return errorData.error;
  }

  const { data }: ResponseData<PageData<Crew>> = await response.json();
  return data;
}

export async function getCrewDetail(crewId: string) {
  const response = await fetch(`/api/crews/${crewId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData: ResponseErrorData = await response.json();
    return errorData.error;
  }
  const { data }: ResponseData<Crew> = await response.json();

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

  if (!response.ok) {
    const errorData: ResponseErrorData = await response.json();
    return errorData.error;
  }

  type CrewMembersResponseData = {
    leader: Profile;
    staff: Profile[];
    member: Profile[];
  };
  const { data }: ResponseData<CrewMembersResponseData> = await response.json();

  return data;
}

export async function getCrewMemberCount(crewId: string) {
  const response = await fetch(`/api/crews/${crewId}/members/count`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData: ResponseErrorData = await response.json();
    return errorData.error;
  }

  type CrewMemberCountResponseData = {
    leaderCount: number;
    staffCount: number;
    memberCount: number;
  };
  const { data }: ResponseData<CrewMemberCountResponseData> =
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

  if (!response.ok) {
    const errorData: ResponseErrorData = await response.json();
    return errorData.error;
  }
  const { data }: ResponseData<Profile> = await response.json();

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

  if (!response.ok) {
    const errorData: ResponseErrorData = await response.json();
    return errorData.error;
  }

  type DelegateCrewLeaderData = {
    message: '크루장이 변경되었습니다.';
    oldLeaderId: number;
    newLeaderId: number;
  };
  const { data }: ResponseData<DelegateCrewLeaderData> = await response.json();

  return data;
}

export async function updateMemberRole(
  crewId: string,
  userId: string,
  body: { role: 'STAFF' | 'MEMBER' }
) {
  const accessToken = '';
  const response = await fetch(`/api/crews/${crewId}/${userId}/role`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  // 이 부분은 Frontend에서 크루장 역할 변경 인터페이스를 없애서 사실상 발생하지 않음
  // 일단 백엔드 API 문서에 맞춰서 작성
  if (!response.ok) {
    const errorData: ResponseErrorData = await response.json();
    return errorData.error;
  }

  const data: ResponseData<{ role: 'STAFF' | 'MEMBER' }> =
    await response.json();

  return data;
}

export async function expelMember(crewId: string, userId: string) {
  const accessToken = '';
  const response = await fetch(`/api/crews/${crewId}/members/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data: ResponseData<null> = await response.json();

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

  if (!response.ok) {
    const errorData: ResponseErrorData = await response.json();
    return errorData.error;
  }
  const { data }: ResponseData<Crew> = await response.json();

  return data;
}

export async function deleteCrew(crewId: string) {
  const accessToken = '';
  const response = await fetch(`/api/crews/${crewId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData: ResponseErrorData = await response.json();
    return errorData.error;
  }

  const { data }: ResponseData<null> = await response.json();

  return data;
}
