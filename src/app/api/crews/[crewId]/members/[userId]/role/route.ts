import { NextRequest } from 'next/server';
import handleRequest from '@/lib/api/handleRequest';

export async function GET(request: NextRequest) {
  return handleRequest(request, false);
}
export async function PATCH(request: NextRequest) {
  return handleRequest(request, true);
}
