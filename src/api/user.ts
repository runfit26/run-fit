import {
  Profile,
  ResponseData,
  ResponseErrorData,
} from '@/types';

export async function getCurrentUserProfile() {
  const accessToken = '';
  const response = await fetch('/api/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData: ResponseErrorData = await response.json();
    return errorData.error;
  }

  const { data }: ResponseData<Profile> = await response.json();
  return data;
}

export async function updateUserProfile(
  body: Partial<
    Pick<
      Profile,
      'name' | 'image' | 'introduction' | 'city' | 'pace' | 'styles'
    >
  >
) {
  const accessToken = '';
  const response = await fetch('/api/user', {
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

  const { data }: ResponseData<Profile> = await response.json();

  return data;
}

export async function getUserProfileById(userId: string) {
  const accessToken = '';
  const response = await fetch(`/api/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData: ResponseErrorData = await response.json();
    return errorData.error;
  }

  type UserProfileResponseData = Omit<Profile, 'updatedAt'>;
  const { data }: ResponseData<UserProfileResponseData> = await response.json();

  return data;
}

export async function leaveCrew(crewId: string) {
  const accessToken = '';
  const response = await fetch(`/api/user/${crewId}/leave`, {
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
