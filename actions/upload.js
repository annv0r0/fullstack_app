'use server';

import { getObjectStream } from '@/lib/server/aws/s3';
import { parseCSV } from '@/lib/server/csv/parse';
import { insertItems } from '@/lib/server/db/items.js';

export async function upload(key) {
  const stream = await getObjectStream(key);

  try {
    const docs = await parseCSV(stream);

    await insertItems(docs);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message || 'Upload failed' };
  }
}
