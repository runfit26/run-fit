import { NextRequest } from 'next/server';
import handleRequest from '@/server/api/handleRequest';

export async function GET(request: NextRequest) {
  return handleRequest(request, false);
}

export async function PATCH(
  request: NextRequest,
  ctx: RouteContext<'/api/crews/[crewId]/members/[userId]/role'>
) {
  const { crewId, userId } = await ctx.params;
  return handleRequest(
    request,
    `/crews/${crewId}/members/${userId}/role`,
    true
  );
}
