import { PostCrewsBody } from '@/types/api-request.types';

// crews
export function getCrews() {
  // GET /crews
}

export function postCrews(body: any) {
  // POST /crews
}

export function getCrewById(crewId: string) {
  // GET /crews/:crewId
}

export function getCrewLeadersById(crewId: string) {
  // GET /crews/:crewId/members/leaders
}
export function getCrewStaffsById(crewId: string) {
  // GET /crews/:crewId/members/staffs
}
export function getCrewMembersById(crewId: string) {
  // GET /crews/:crewId/members/general
}

export function updateCrewDetail(crewId: string, body: PostCrewsBody) {
  // PATCH /crews/:crewId
}

export function deleteCrew(crewId: string) {
  // DELETE /crews/:crewId
}

export function getSessionsByCrewId(
  crewId: string,
  page: number,
  limit: number
) {
  // 무한 스크롤
  // GET /crews/:crewId/sessions
}
