import { getDB } from './get_db';

export async function insertItems(docs) {
  try {
    const db = await getDB();

    if (!db) throw new Error('Database connection failed');

    const collection = await db.collection('Items');

    const records = collection.insertMany(docs);

    return records;
  } catch (e) {
    throw new Error('insertItems failed');
  }
}

export async function getItems() {
  const db = await getDB();
  const collection = await db.collection('Items');

  if (!db) throw new Error('Database connection failed');
  const items = await collection.find({}).sort({ date: -1 }).toArray();

  return items;
}

export async function getItemById(id) {
  const db = await getDB();
  if (db) {
    const collection = await db.collection('Items');
    const item = await collection.findOne({ article: id });

    return item;
  }
}
