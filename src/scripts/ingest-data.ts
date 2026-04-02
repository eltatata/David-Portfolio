import { MongoDBAtlasVectorSearch } from '@langchain/mongodb';
import { OpenAIEmbeddings } from '@langchain/openai';
import { MongoClient } from 'mongodb';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

const embeddings = new OpenAIEmbeddings();

function cleanText(text: string): string {
  return text
    .replace(/[•●◦▪▸–—]/g, '-')
    .replace(/[^\x20-\x7E\n\táéíóúüñÁÉÍÓÚÜÑ]/g, ' ')
    .replace(/ {2,}/g, ' ')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 2)
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

(async () => {
  if (
    !process.env.MONGODB_ATLAS_URI ||
    !process.env.DATABASE_NAME ||
    !process.env.COLLECTION_NAME
  ) {
    throw new Error(
      'Missing MONGODB_ATLAS_URI, DATABASE_NAME or COLLECTION_NAME environment variable',
    );
  }

  const client = new MongoClient(process.env.MONGODB_ATLAS_URI);
  const collection = client
    .db(process.env.DATABASE_NAME)
    .collection(process.env.COLLECTION_NAME || 'data');

  const loader = new PDFLoader('./src/docs/david-resume.pdf');
  const doc = await loader.load();

  const rawText = doc.map((page) => page.pageContent).join('\n');
  const cleanedText = cleanText(rawText);

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 800,
    chunkOverlap: 150,
    separators: ['\n\n', '\n', '. ', ' '],
  });

  const docs = await splitter.createDocuments([cleanedText]);
  console.log(`Documents created: ${docs.length}`);

  await MongoDBAtlasVectorSearch.fromDocuments(docs, embeddings, {
    collection,
    indexName: 'vector_index',
    textKey: 'text',
    embeddingKey: 'embedding',
  });
  await client.close();
})();
