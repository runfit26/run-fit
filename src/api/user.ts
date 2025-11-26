// user
export function getUserProfileById(userId: string) {
  // GET /user/:userId
}

export function leaveCrew(crewId: string) {
  // PUT /user/leave/
  // body: { crewId }
}

export function expelMember(crewId: string, userId: string) {
  // PUT /user/expel/
  // body: { crewId, userId }
}

export function updateMember(crewId: string, userId: string, role: string) {
  // PATCH /user/update/
  // body: { crewId, userId, role }
  // user가 crew의 leader일 때만 가능
}
