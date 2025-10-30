import { MongoClient, ServerApiVersion } from 'mongodb';

const URI = process.env.DB_URI;
if (!URI) {
  throw new Error('DB URI not found');
}
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tls: true,
});

export async function getDB() {
  try {
    console.log('\n=====  Connecting DB  =====\n');
    await client.connect();
    console.log('\n=====  Connected DB  =====\n');
    return client.db(process.env.DB_NAME);
  } catch (err) {
    console.log('\nDB Error\n', err);
  } finally {
    // Ensures that the client will close when finish/error
    // await client.close();
  }
}
