import { PaginationQueryParams, Session } from '@/types';

export async function getSessions(
  queryParams?: {
    city?: string;
    district?: string;
    dateRange?: { from: string; to: string };
    timeRange?: { from: string; to: string };
    level?: 'beginner' | 'intermediate' | 'advanced';
    status?: string;
  } & PaginationQueryParams
) {
  // 전체 세션 목록 페이지에서 필터링 및 페이징 처리된 세션 목록을 위한 API
  // GET /sessions?queryParams
  // queryParams: {
  //   page?: number,
  //   limit?: number,
  //   city?: string,
  //   district?: string
  //   dateRange?: { from: string; to: string };
  //   timeRange?: { from: string; to: string };
  //   level?: '초급' | '중급' | '고급';
  //   status?: TODO: 이 부분은 잘 정의해야 할 듯
  // }
  // 성공시
  // body: Session[]
}

export async function getSessionsByCrewId(
  crewId: string,
  queryParams?: PaginationQueryParams
) {
  // 크루 상세 페이지에서
  // GET /sessions/:crewId/
  // queryParams: {
  //   page?: number,
  //   limit?: number
  // }
  // 성공시
  // body: Omit<Session, "participants" | "likedUsers" | "reviews">[]
  // // participants, likedUsers, reviews 제외 해도 되지 않을까?
}

export async function getSessionsByUserId(userId: string) {
  // (마이페이지) 사용자가 생성한 세션 목록을 위한 API
  // GET /sessions/user/:userId
  // 성공시
  // body: Omit<Session, "participants" | "likedUsers" | "reviews">[]
}

export async function createSession(
  body: Pick<
    Session,
    | 'crewId'
    | 'userId'
    | 'name'
    | 'description'
    | 'image'
    | 'city'
    | 'district'
    | 'sessionAt'
    | 'registerBy'
    | 'level'
    | 'maxParticipantCount'
  >
) {
  // POST /sessions
  // body: {
  //   crewId: number;
  //   userId: number;
  //   name: string;
  //   description: string;
  //   image?: string;
  //   city: string; // 지역(시)
  //   district: string; // 지역(구)
  //   sessionAt: string; // ISO 8601 - 세션 시간
  //   registerBy: string; // ISO 8601 - 신청 마감
  //   level: '초급' | '중급' | '고급';
  //   maxParticipantCount: number;
  // }
  // 성공시
  // body: Session
}

export async function getSessionDetail(sessionId: string) {
  // GET /sessions/:sessionId
  // 성공시
  // response: 200 OK
  // body: Omit<Session, 'reviews'>;
  // 실패시
  // response: 404 Not Found
  // body: { error.message: "<에러 메시지>" }
}

type UpdateSessionDetailBody = Pick<
  Session,
  | 'name'
  | 'description'
  | 'image'
  | 'city'
  | 'district'
  | 'sessionAt'
  | 'registerBy'
  | 'level'
>;
export async function updateSessionDetail(
  sessionId: string,
  body: UpdateSessionDetailBody
) {
  // PATCH /sessions/:sessionId
  // body: {
  //  name?: string;
  //  description?: string;
  //  image?: string;
  //  city?: string; // 지역(시)
  //  district?: string; // 지역(구)
  //  sessionAt?: string; // ISO 8601 - 세션 시간
  //  registerBy?: string; // ISO 8601 - 신청 마감
  //  level?: '초급' | '중급' | '고급';
  // }
  // 권한: 크루장 또는 관리자 권한 필요 <- 또는 생성한 크루장/관리자만?
  // 성공시
  // body: Session
}

export async function deleteSession(sessionId: string) {
  // DELETE /sessions/:sessionId
  // 권한: 크루장 또는 관리자 권한 필요
  // 성공시
  // response: 204 No Content
}

export async function registerForSession(sessionId: string) {
  // POST /sessions/:sessionId/register
  // 권한: 크루에 가입한 사용자
}

export async function unregisterFromSession(sessionId: string) {
  // DELETE /sessions/:sessionId/register
  // 권한: 크루에 가입한 사용자
}
