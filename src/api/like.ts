import {
  PaginationQueryParams,
  ResponseData,
  ResponseErrorData,
  Session,
  SliceData,
} from '@/types';

export async function getLikedSessions(queryParams: PaginationQueryParams) {
  const query = new URLSearchParams(
    queryParams as Record<string, string>
  ).toString();
  const accessToken = '';
  const response = await fetch(`/api/user/me/likes/sessions?${query}`, {
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

  const { data }: ResponseData<SliceData<Session>> = await response.json();
  return data;
}

export async function likeSession(sessionId: string) {
  const accessToken = '';
  const response = await fetch(`/api/sessions/${sessionId}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData: ResponseErrorData = await response.json();
    return errorData.error;
  }

  const { data }: ResponseData<null> = await response.json();
  return data;
}

export async function unlikeSession(sessionId: string) {
  const accessToken = '';
  const response = await fetch(`/api/sessions/${sessionId}/like`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData: ResponseErrorData = await response.json();
    return errorData.error;
  }

  const { data }: ResponseData<null> = await response.json();
  return data;
}
