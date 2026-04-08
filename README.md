<img width="1920" height="992" alt="Screenshot 2026-04-08 at 5 47 51 PM" src="https://github.com/user-attachments/assets/24bac408-30de-41dd-b939-c713bc9f7066" />

# David Tabares – Portfolio

Modern portfolio built with Next.js 16 + React 19 (Bun). Ask “David AI” about my experience, enjoy smooth interactive animations, and switch between English/Spanish.

## Features

- AI chat (RAG): LangChain + LangGraph + MongoDB Atlas Vector Search + OpenAI, streaming replies in the UI.
- Interactive UI: GPU particle background (OGL), motion transitions, custom animated components.
- EN/ES i18n: i18next with browser detection and a language switcher.
- Dark/Light theme and Vercel Analytics.

## Quick start (Bun)

1) Install

```bash
bun install
```

2) Env vars (`.env.local`)

```bash
OPENAI_API_KEY=your_openai_api_key
MONGODB_ATLAS_URI=your_mongodb_connection_string
DATABASE_NAME=your_db_name
COLLECTION_NAME=your_collection_name
```

3) (Optional) Ingest resume PDF for RAG

Place your PDF at `src/docs/david-resume.pdf` and run:

```bash
bun run src/scripts/ingest-data.ts
```

4) Dev server

```bash
bun dev
```

Open http://localhost:3000.

## Code pointers

- Chat API: `src/app/api/chat/route.ts`
- Vector store: `src/database/db-connection.ts`
- Ingest script: `src/scripts/ingest-data.ts`
- i18n config: `src/lib/translations/i18n.ts`

## Deploy

Deploy on Vercel and set the env vars above.
