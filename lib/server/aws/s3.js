// import 'server-only';

import { NextResponse } from 'next/server';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

const config = { region: process.env.AWS_REGION };
// create S3 client
const s3 = new S3Client(config);
const PUBLIC = process.env.S3_PUBLIC_READ === 'true';

function safeFilename(name) {
  return name.replace(/\s+/g, '_').replace(/[^\w.\-()]/g, '');
}

function keyFor(kind, filename) {
  const prefix = kind === 'image' ? 'images' : 'csv';
  // const name = safeFilename(filename);
  return `${prefix}/${Date.now()}-${filename}`;
}

export async function getPresignedURL(req) {
  try {
    const { files } = await req.json();
    if (!Array.isArray(files) || files.length === 0) {
      return NextResponse.json({ error: 'No files' }, { status: 400 });
    }

    const out = [];
    for (const f of files) {
      if (!f?.filename || !f?.contentType || !f?.kind) {
        return NextResponse.json({ error: 'Bad file descriptor' }, { status: 400 });
      }

      const key = keyFor(f.kind, f.filename);

      const input = {
        Bucket: process.env.S3_BUCKET,
        Key: key,
        ContentType: f.contentType,
      };
      // request: PUT
      const command = new PutObjectCommand(input);
      // response: presigned URL
      const url = await getSignedUrl(s3, command, { expiresIn: 60 });
      out.push({ kind: f.kind, name: f.filename, key, url });
    }

    return NextResponse.json({ files: out });
  } catch (err) {
    console.error('\nS3 Presign error:', err);
    return NextResponse.json({ error: '\nS3 Presign failed\n' }, { status: 500 });
  }
}

export async function getObjectStream(key) {
  const response = await s3.send(
    new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
    }),
  );
  // stream
  return response.Body;
}
