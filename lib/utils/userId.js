import { auth } from '@/auth';

// TODO: maybe move to auth() helper function
export default async function getUserId() {
  const session = await auth();
  const userId = session?.user?.id;

  return userId || null;
}
