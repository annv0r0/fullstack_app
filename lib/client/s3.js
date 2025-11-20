import { formatKey, formatName } from './identifiers';

async function uploadToS3(file, url) {
  const put = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });
  if (!put.ok) throw new Error('Failed S3 file upload');
}

async function getS3presignedURL(csv, images) {
  const body = {
    files: [
      { kind: 'csv', filename: csv.name, contentType: 'text/csv' },
      ...Array.from(images).map((f) => ({
        kind: 'image',
        filename: f.name,
        contentType: f.type,
      })),
    ],
  };

  const res = await fetch('/api/s3/presign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error('Failed to get S3 presigned URL');

  return res.json();
}

export async function uploadFileToS3(csv, images) {
  //  files = [{ kind: f.kind, name: f.filename, key, url }]
  const { files } = await getS3presignedURL(csv, images);
  const csvPresign = files.find((f) => f.kind === 'csv');
  const imgPresign = files.filter((f) => f.kind === 'image');

  // upload csv
  await uploadToS3(csv, csvPresign.url);
  // upload images
  for (const img of images) {
    const presign = imgPresign.find((p) => formatKey(p.key) === formatName(img?.name || ''));
    if (!presign) throw new Error(`No presigned URL for ${img.name}`);
    await uploadToS3(img, presign.url);
  }

  return { bucketCSV: csvPresign, bucketIMGlist: imgPresign };
}
