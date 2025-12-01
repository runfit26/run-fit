import { Profile, Response, ResponseError } from '@/types';

export async function getCurrentUserProfile() {
  const response = await fetch('/api/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data: Response<Profile, ResponseError> = await response.json();
  return data;
}

export async function updateUserProfile(
  body: Pick<
    Profile,
    'name' | 'image' | 'introduction' | 'city' | 'pace' | 'styles'
  >
) {
  const response = await fetch('/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data: Response<Profile, ResponseError> = await response.json();
  return data;
}

type UserProfileResponseError = ResponseError & {
  code: 'USER_NOT_FOUND';
  message: '사용자를 찾을 수 없습니다.';
};
export async function getUserProfileById(userId: string) {
  const response = await fetch(`/api/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data: Response<
    Omit<Profile, 'updatedAt'>,
    UserProfileResponseError
  > = await response.json();
  return data;
}

// export async function leaveCrew(crewId: string) {
//   // PUT /crew/:crewId/leave/
// }

// export async function expelMember(body: { crewId: string; userId: string }) {
//   // PUT /crew/member/
//   // body: { crewId, userId }
// }

// export async function updateMemberRole(body: {
//   crewId: string;
//   userId: string;
//   role: string;
// }) {
//   // PATCH /crew/role/
//   // body: { crewId, userId, role }
// }
