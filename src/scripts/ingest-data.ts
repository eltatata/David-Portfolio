import { MongoDBAtlasVectorSearch } from '@langchain/mongodb';
import { OpenAIEmbeddings } from '@langchain/openai';
import { MongoClient } from 'mongodb';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { CharacterTextSplitter } from '@langchain/textsplitters';

const embeddings = new OpenAIEmbeddings();

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

  let text = '';
  doc.forEach((page) => {
    text += page.pageContent;
  });

  const splitter = new CharacterTextSplitter({
    separator: '\n',
    chunkSize: 800,
    chunkOverlap: 200,
  });

  const docs = await splitter.createDocuments([text]);
  console.log(`Cantidad de documentos creados: ${docs.length}`);

  await MongoDBAtlasVectorSearch.fromDocuments(docs, embeddings, {
    collection,
    indexName: 'vector_index',
    textKey: 'text',
    embeddingKey: 'embedding',
  });

  await client.close();
})();
