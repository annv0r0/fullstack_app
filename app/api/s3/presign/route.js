import { auth } from '@/auth';

import { getPresignedURL } from '@/lib/server/aws/s3';

export const runtime = 'nodejs';

export async function POST(req) {
  const session = await auth();
  if (!session) return new Response('Unauthorized', { status: 401 });

  const res = await getPresignedURL(req);

  return res;
}
