import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const proxyUrl = (pathname: string) =>
  new URL(`/api${pathname}`, process.env.NEXT_PUBLIC_API_URL);

export async function getAccessToken() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  return accessToken;
}

export async function handleRequest(
  request: NextRequest,
  pathname: string,
  requiresAuth: boolean = true
) {
  const searchParams = request.nextUrl.searchParams.toString();
  const accessToken = requiresAuth ? getAccessToken() : undefined;
  if (requiresAuth && !accessToken) {
    // 1. 요청 보내기 전 private API 인 경우 accessToken 의 유효성 검증 로직 추가하기
    //     - accessToken이 유효하지 않다면,
    //         - refreshToken이 있다면 → refreshToken으로 accessToken 갱신 후, 원래 하려던 요청 진행 (사용자 입장에서는 자연스럽게 새로 로그인 되면서 처리되므로 UX ⬆️)
    //         - refreshToken이 없다면 → logout 처리 및 UI 로 안내
    //     - 유효하다면 → 요청 보내기 (현재 로직)
  }

  // 2. `handleRequest` 함수에서 `requiresAuth` 여부에 따라 헤더에 토큰 여부 다르게 처리하고 있기 때문에 굳이 Route Handler를 나눌 필요가 없음.
  // - public API Route Handler 만들었던 것들 삭제
  // - 모든 API는 `/app/api/[...slug]/route.ts` 를 통해 요청나가게 통일
  // - +BE 엔드포인트 은닉

  if (!process.env.NEXT_PUBLIC_API_URL) {
    return new Response(
      'NEXT_PUBLIC_API_URL 환경 변수를 불러오지 못했습니다.',
      { status: 500 }
    );
  }

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const proxyURL = new URL(`api/${pathname}?${searchParams}`, baseURL);

  const proxyRequest = new Request(proxyURL, {
    method: request.method,
    headers: {
      ...request.headers,
      ...(requiresAuth && { Authorization: `Bearer ${accessToken}` }),
    },
    body:
      request.method !== 'GET' && request.method !== 'HEAD'
        ? request.body
        : undefined,
  });

  try {
    return fetch(proxyRequest);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unexpected exception';

    return new Response(message, { status: 500 });
  }
}
