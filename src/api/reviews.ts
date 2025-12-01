export async function createSessionReview(sessionId: string, body: any) {
  // POST /reviews/:sessionId
  // body: { description, rating, image? }
  // 성공시
  // body: Review
}

export async function getReviewsByCrewId(crewId: string) {
  // GET /reviews/:crewId
  // 성공시
  // response: 200 OK
  // body: Review[]
}

export async function getReviewsBySessionId(sessionId: string) {
  // GET /reviews/:sessionId
  // 성공시
  // body: Review[]
}

export async function getReviewsByUserId(userId: string) {
  // GET /reviews/:userId
  // 성공시
  // body: Review[]
}
