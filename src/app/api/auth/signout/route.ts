import { NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/auth';
import { proxyUrl } from '@/lib/constants';

export async function POST() {
  const apiUrl = proxyUrl('/auth/signout');

  const accessToken = getAccessToken();

  try {
    const proxyResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${accessToken}`,
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

    // Get Set-Cookie headers from backend (includes refreshToken)
    const proxySetCookies = proxyResponse.headers.getSetCookie();

    const response = NextResponse.json({ message, data });

    // Forward refreshToken cookie from backend to client
    proxySetCookies.forEach((cookie) => {
      response.headers.append('Set-Cookie', cookie);
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { code: 'SERVER_ERROR', message: error },
      { status: 500 }
    );
  }
}
