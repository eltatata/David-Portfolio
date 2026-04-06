import { MongoDBAtlasVectorSearch } from '@langchain/mongodb';
import { OpenAIEmbeddings } from '@langchain/openai';
import { MongoClient } from 'mongodb';

if (
  !process.env.MONGODB_ATLAS_URI ||
  !process.env.DATABASE_NAME ||
  !process.env.COLLECTION_NAME
) {
  throw new Error(
    'Missing MONGODB_ATLAS_URI, DATABASE_NAME or COLLECTION_NAME environment variable',
  );
}

export const client = new MongoClient(process.env.MONGODB_ATLAS_URI);
export const collection = client
  .db(process.env.DATABASE_NAME)
  .collection(process.env.COLLECTION_NAME || 'data');

export const vectorStore = new MongoDBAtlasVectorSearch(
  new OpenAIEmbeddings(),
  {
    collection,
    indexName: 'vector_index',
    textKey: 'text',
    embeddingKey: 'embedding',
  },
);
