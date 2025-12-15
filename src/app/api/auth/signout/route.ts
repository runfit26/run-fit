import { NextResponse } from 'next/server';
import { proxyUrl } from '@/api/utils';
import { getAccessToken } from '@/lib/auth';

export async function POST() {
  const apiUrl = proxyUrl('/auth/signout');

  const accessToken = await getAccessToken();

  try {
    const proxyResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
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

    const response = NextResponse.json({ message, data });

    response.cookies.set('accessToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      path: '/api/auth',
      maxAge: 0,
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
