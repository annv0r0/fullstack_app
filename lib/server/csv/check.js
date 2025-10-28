export function normalizeAndValidateHeader(header) {
  const expected = ['title', 'description', 'weight', 'unit', 'price', 'currency', 'available', 'rating', 'image'];

  const normalized = header.map((h) => {
    const name = h.trim().toLowerCase();
    return name;
  });

  const missing = expected.filter((col) => !normalized.includes(col));
  if (missing.length > 0) {
    throw new Error(`Missing required columns: ${missing.join(', ')}. Check header spelling`);
  }

  return normalized;
}

export function toNumber(v) {
  if (v == null) return null;
  const s = String(v).trim().replace(',', '.');
  if (s === '') return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

export function toBool(v) {
  if (v == null) return null;
  const s = String(v).trim().toLowerCase();
  if (['true', '1', 'yes', 'y'].includes(s)) return true;
  if (['false', '0', 'no', 'n'].includes(s)) return false;
  return null;
}
