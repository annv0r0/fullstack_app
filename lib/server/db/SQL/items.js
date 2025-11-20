import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function insertItems(docs, userId) {
  try {
    const records = await prisma.item.createMany({
      data: docs.map((doc) => ({ ...doc, userId })),
    });
    if (!records) throw new Error('Database connection failed');
    return records;
  } catch (e) {
    throw new Error('Darabase inserting items failed');
  }
}

export async function getItems(userId) {
  const items = await prisma.item.findMany({
    orderBy: { date: 'desc' },
    where: { userId },
  });

  if (!items) throw new Error('Database connection failed');

  return items;
}

export async function getItemById(id) {
  const item = await prisma.item.findUnique({
    where: { article: id },
  });
  if (!item) throw new Error('Database connection failed');

  return item;
}
