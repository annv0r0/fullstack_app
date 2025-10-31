export function formatName(name) {
  const image_name = name.replace(/\s+/g, '_');
  return image_name;
}

export function formatKey(key) {
  const s3_key = key.split('-').slice(1).join('-');
  return s3_key;
}
