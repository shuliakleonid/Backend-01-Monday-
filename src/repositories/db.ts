import { MongoClient } from 'mongodb';

const mongoUri = process.env.mongoURI || 'mongodb+srv://Zeleny:Zeleny3416240@cluster0.gt3qw.mongodb.net/?retryWrites=true&w=majority';

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
