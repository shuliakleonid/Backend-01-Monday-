import { MongoClient } from 'mongodb';

const mongoUri = process.env.mongoURI || 'mongodb://localhost:27017';

console.log('mongoUri', mongoUri);

export const client = new MongoClient(mongoUri);

export const runDb = async () => {
  try {
    await client.connect();
    await client.db('products').command({ ping: 1 });
    console.log('Connected successfully to mongo server');
  } catch {
    console.log('Connected discard to db');
    await client.close();
  }
};
