import { NextResponse } from 'next/server';
import { proxyUrl } from '@/lib/api';
import { getRefreshToken } from '@/lib/auth';

export async function POST() {
  const apiUrl = proxyUrl('/auth/refresh');

  const refreshToken = await getRefreshToken();

  try {
    const proxyResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        ...(refreshToken && { Cookie: `refreshToken=${refreshToken}` }),
      },
      cache: 'no-cache',
    });

    if (!proxyResponse.ok) {
      if (proxyResponse.status >= 400 && proxyResponse.status < 500) {
        const errorData = await proxyResponse.json();
        return NextResponse.json(
          { ...errorData },
          {
            status: proxyResponse.status,
          }
        );
      }
      throw new Error('서버에 연결할 수 없습니다.');
    }

    const { message, data } = await proxyResponse.json();
    if (!data?.token) {
      return NextResponse.json(
        { code: 'INVALID_RESPONSE', message: '서버 응답에 토큰이 없습니다.' },
        { status: 500 }
      );
    }
    const { token } = data;

    const response = NextResponse.json({ message, data });

    response.cookies.set('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      path: '/',
      maxAge: 60 * 60, // 1 hour (3600 seconds)
    });

    const proxySetCookies = proxyResponse.headers.getSetCookie();
    proxySetCookies.forEach((cookie) => {
      response.headers.append('Set-Cookie', cookie);
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        code: 'SERVER_ERROR',
        message:
          error instanceof Error ? error.message : '서버에 연결할 수 없습니다.',
      },
      { status: 500 }
    );
  }
}
