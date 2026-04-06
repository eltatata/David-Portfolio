import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { Document } from '@langchain/core/documents';
import { collection, client, vectorStore } from '../database/db-connection';

const SECTION_HEADERS = [
  'PROFESSIONAL SUMMARY',
  'TECHNICAL SKILLS',
  'LANGUAGES',
  'PROFESSIONAL EXPERIENCE',
  'EDUCATION',
];

function cleanText(text: string): string {
  return text
    .replace(/-\n/g, '')
    .replace(
      /([a-z])(January|February|March|April|May|June|July|August|September|October|November|December)/g,
      '$1 $2',
    )
    .replace(/[•●◦▪]/g, ' - ')
    .replace(/[▸–—]/g, '-')
    .replace(/[^\x20-\x7E\n\táéíóúüñÁÉÍÓÚÜÑ]/g, ' ')
    .replace(/ {2,}/g, ' ')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 2)
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const MONTH_PATTERN =
  /January|February|March|April|May|June|July|August|September|October|November|December/;

function splitExperienceByCompany(experienceDoc: Document): Document[] {
  const lines = experienceDoc.pageContent.split('\n');
  const companies: Document[] = [];
  let currentLines: string[] = [];

  for (const line of lines) {
    const isCompanyEntry = MONTH_PATTERN.test(line) && /\d{4}/.test(line);
    if (isCompanyEntry && currentLines.length > 0) {
      const content = currentLines.join('\n').trim();
      if (!SECTION_HEADERS.includes(content.toUpperCase())) {
        companies.push(
          new Document({
            pageContent: content,
            metadata: { section: 'PROFESSIONAL EXPERIENCE' },
          }),
        );
      }
      currentLines = [line];
    } else {
      currentLines.push(line);
    }
  }

  if (currentLines.length > 0) {
    companies.push(
      new Document({
        pageContent: currentLines.join('\n').trim(),
        metadata: { section: 'PROFESSIONAL EXPERIENCE' },
      }),
    );
  }

  return companies;
}

function splitBySections(rawText: string): Document[] {
  const lines = rawText.split('\n');
  const sections: Document[] = [];
  let currentSection = 'Header';
  let currentLines: string[] = [];

  for (const line of lines) {
    const normalized = line.trim().toUpperCase();
    const matchedHeader = SECTION_HEADERS.find((h) => normalized === h);

    if (matchedHeader) {
      if (currentLines.length > 0) {
        sections.push(
          new Document({
            pageContent: cleanText(currentLines.join('\n')),
            metadata: { section: currentSection },
          }),
        );
      }
      currentSection = matchedHeader;
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }

  if (currentLines.length > 0) {
    sections.push(
      new Document({
        pageContent: cleanText(currentLines.join('\n')),
        metadata: { section: currentSection },
      }),
    );
  }

  return sections;
}

(async () => {
  await collection.deleteMany({});

  const loader = new PDFLoader('./src/docs/david-resume.pdf', {
    splitPages: false,
  });

  const docs = await loader.load();
  const rawText = docs.map((d) => d.pageContent).join('\n');

  const rawSections = splitBySections(rawText);

  const sections: Document[] = [];
  for (const section of rawSections) {
    if (section.metadata.section === 'PROFESSIONAL EXPERIENCE') {
      sections.push(...splitExperienceByCompany(section));
    } else {
      sections.push(section);
    }
  }

  await vectorStore.addDocuments(sections);

  await client.close();
  console.log(`${sections.length} documents added to the database.`);
  process.exit(0);
})();
