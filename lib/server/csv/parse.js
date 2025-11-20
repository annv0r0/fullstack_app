'use server';
import { parse } from 'csv-parse';
import { normalizeAndValidateHeader, toNumber, toBool } from './check';
import { formatKey, formatName } from '@/lib/client/identifiers';

const S3_URL = process.env.NEXT_PUBLIC_S3_BUCKET;

export async function parseCSV(stream, bucketIMGlist) {
  const parser = stream.pipe(
    parse({
      columns: (header) => {
        try {
          return normalizeAndValidateHeader(header);
        } catch (e) {
          throw e;
        }
      },
      skip_empty_lines: true,
      trim: true,
      cast: (value, ctx) => {
        if (ctx.header) return value;
        if (value === '') return null;
        const k = ctx.column?.toLowerCase();

        if (['available'].includes(k)) return toBool(value);
        if (['weight', 'price', 'rating'].includes(k)) return toNumber(value);
        return value;
      },
    }),
  );

  const rows = [];
  for await (const r of parser) {
    const img = bucketIMGlist.find((p) => formatKey(p.key) == formatName(r?.image));
    rows.push({
      article: `${Date.now()}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      title:
        r.title ||
        (() => {
          throw new Error('Title field is required');
        })(),
      description: r.description,
      weight: r.weight,
      unit: r.unit,
      price: r.price,
      available: r.available,
      rating: r.rating,
      image: img?.key ? `${S3_URL}/${img.key}` : `${S3_URL}/images/placeholder.png`,
    });
  }

  return rows;
}
