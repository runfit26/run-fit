import 'server-only';
import request from '@/lib/request';
import { getBackendUrl } from './utils';

type refreshResponse = {
  token: string;
};

export async function postRefresh(refreshToken: string) {
  return request<refreshResponse>(getBackendUrl('/api/auth/refresh'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `refreshToken=${refreshToken}`,
    },
    cache: 'no-store',
  });
}
