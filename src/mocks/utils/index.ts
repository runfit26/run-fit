import type { ErrorResponse, SuccessResponse } from '@/lib/api/types';

export function parseIdParam(
  id: string | readonly string[] | undefined
): number | null {
  if (!id || typeof id !== 'string') {
    return null;
  }

  const parsed = parseInt(id, 10);
  return isNaN(parsed) ? null : parsed;
}

export function successResponse<T>(data: T): SuccessResponse<T> {
  return {
    success: true,
    data,
    error: null,
  };
}

export function errorResponse({
  code,
  message,
}: {
  code: string;
  message: string;
}): ErrorResponse {
  return {
    success: false,
    data: null,
    error: {
      code,
      message,
    },
  };
}
