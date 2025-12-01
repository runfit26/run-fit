import { Crew, PaginationQueryParams, Response, ResponseError } from '@/types';

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

  const data: Response<Crew, ResponseError> = await response.json();
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

  const data: Response<Crew[], ResponseError> = await response.json();
  return data;
}

export async function getCrewById(crewId: string) {
  // GET /crews/:crewId
  // 성공시
  // body: Crew
}

type GetCrewMembersQueryParams = {
  role?: 'leader' | 'staff' | 'general';
} & PaginationQueryParams;
export async function getCrewMembersById(
  crewId: string,
  queryParams?: GetCrewMembersQueryParams
) {
  // GET /crews/:crewId/members?queryParams
  // queryParams: {
  //   role?: 'leader' | 'staff' | 'member',
  //   page?: number,
  //   limit?: number
  // }
  // 성공시
  // response: 200 OK
  // body: Member[] <- leader라도 배열로 반환 // TODO: 이 부분 확인 필요
}

/**
 * 아래 함수들은 getCrewMembersById로 대체 가능
export async function getCrewLeadersById(crewId: string) {
  // GET /crews/:crewId/members/leaders
}
export async function getCrewStaffsById(crewId: string) {
  // GET /crews/:crewId/members/staffs
}
export async function getCrewMembersById(crewId: string) {
  // GET /crews/:crewId/members/general
}
*/

type PostCrewsBody = Pick<Crew, 'name' | 'description' | 'city' | 'image'>;
export async function updateCrewDetail(crewId: string, body: PostCrewsBody) {
  // PATCH /crews/:crewId
  // 성공시
  // body: Crew
}

export async function deleteCrew(crewId: string) {
  // DELETE /crews/:crewId
  // 성공시
  // body: { message: "Crew deleted successfully" }
}
