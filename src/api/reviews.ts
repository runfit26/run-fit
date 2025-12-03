import {
  PageData,
  PaginationQueryParams,
  ResponseData,
  ResponseErrorData,
  Review,
} from '@/types';

export async function createSessionReview(
  sessionId: string,
  body: Pick<Review, 'description' | 'ranks' | 'image'>
) {
  const accessToken = '';
  const response = await fetch(`/api/sessions/${sessionId}/reviews`, {
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

  const { data }: ResponseData<Review> = await response.json();

  return data;
}

export async function deleteSessionReview(reviewId: string) {
  const accessToken = '';
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData: ResponseErrorData = await response.json();
    return errorData.error;
  }

  type DeleteData = { message: '리뷰가 삭제되었습니다.' };
  const { data }: ResponseData<DeleteData> = await response.json();

  return data;
}

export async function getReviewsBySessionId(
  sessionId: string,
  queryParams: PaginationQueryParams
) {
  const query = new URLSearchParams(
    queryParams as Record<string, string>
  ).toString();
  const response = await fetch(`/api/sessions/${sessionId}/reviews?${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData: ResponseErrorData = await response.json();
    return errorData.error;
  }

  const { data }: ResponseData<PageData<Review>> = await response.json();
  return data;
}

export async function getReviewsByCrewId(
  crewId: string,
  queryParams: PaginationQueryParams
) {
  const query = new URLSearchParams(
    queryParams as Record<string, string>
  ).toString();
  const response = await fetch(`/api/crews/${crewId}/reviews?${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData: ResponseErrorData = await response.json();
    return errorData.error;
  }

  const { data }: ResponseData<PageData<Review>> = await response.json();
  return data;
}

export async function getMyReviews(queryParams: PaginationQueryParams) {
  const query = new URLSearchParams(
    queryParams as Record<string, string>
  ).toString();
  const response = await fetch(`/api/user/me/reviews?${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData: ResponseErrorData = await response.json();
    return errorData.error;
  }

  const { data }: ResponseData<PageData<Review>> = await response.json();
  return data;
}
