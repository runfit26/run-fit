import { ResponseData, ResponseErrorData, User } from '@/types';

type UserCredentials = {
  email: string;
  password: string;
};

export async function postSignup(body: UserCredentials & { name: string }) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData: ResponseErrorData = await response.json();
    return errorData.error;
  }

  const { data }: ResponseData<User> = await response.json();

  return data;
}

export async function postSignin(body: UserCredentials) {
  const response = await fetch('/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData: ResponseErrorData = await response.json();
    return errorData.error;
  }

  type SigninData = { token: string };
  const { data }: ResponseData<SigninData> = await response.json();

  return data;
}

export async function postRefresh() {
  const refreshToken = '';
  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `refreshToken=${refreshToken}`,
    },
  });

  if (!response.ok) {
    const errorData: ResponseErrorData = await response.json();
    return errorData.error;
  }

  type RefreshData = { token: string };
  const { data }: ResponseData<RefreshData> = await response.json();

  return data;
}

export async function postSignout() {
  const accessToken = '';
  const response = await fetch('/api/auth/signout', {
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
