'use server';
import { parse } from 'csv-parse';
import { normalizeAndValidateHeader, toNumber, toBool } from './check';

export async function parseCSV(stream) {
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
    })
  );

  const rows = [];
  for await (const r of parser) {
    rows.push({
      article: `${Date.now()}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      title: r.title,
      description: r.description,
      weight: r.weight,
      unit: r.unit,
      price: r.price,
      available: r.available,
      rating: r.rating,
      image: r.image,
      date: r.date ? new Date(r.date) : new Date(),
    });
  }

  return rows;
}
