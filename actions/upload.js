'use server';

import { getObjectStream } from '@/lib/server/aws/s3';
import { parseCSV } from '@/lib/server/csv/parse';
// import { insertItems } from '@/lib/server/db/MongoDB/items';
import { insertItems } from '@/lib/server/db/SQL/items';
import getUserId from '@/lib/utils/userId';

export async function upload(content) {
  //   bucketCSV: { kind: f.kind, name: f.filename, key, url }
  //  bucketIMG: [{ kind: f.kind, name: f.filename, key, url }]
  const { bucketCSV, bucketIMGlist } = content;
  const stream = await getObjectStream(bucketCSV.key);

  try {
    const docs = await parseCSV(stream, bucketIMGlist);
    const userId = await getUserId();
    await insertItems(docs, userId);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message || 'Upload failed' };
  }
}
