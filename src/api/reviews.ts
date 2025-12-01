import { ResponseData, ResponseError } from '@/types/api';

// sessions/{sessionId}/reviews
export async function createSessionReview(sessionId: string, body: any) {
  // POST /reviews/:sessionId
  // body: { description, rating, image? }
  // 성공시
  // body: Review
}

// TODO: 백엔드 API 상에는 없는 상태
// api/crews/{crewId}/reviews?page=0&size=10
export async function getReviewsByCrewId(crewId: string) {
  // GET /reviews/:crewId
  // 성공시
  // response: 200 OK
  // body: Review[]
}

// api/sessions/{sessionId}/reviews?page=0&size=10
export async function getReviewsBySessionId(sessionId: string) {
  // GET /reviews/:sessionId
}

// /api/user/me/reviews?page=0&size=4
export async function getReviewsByUserId(userId: string) {}
