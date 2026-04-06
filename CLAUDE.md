# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev        # Dev server (Turbopack) at localhost:3000
bun build      # Production build
bun lint       # ESLint + Prettier
bun run ingest # Embed resume PDF into MongoDB Atlas vector store
```

> Always use **bun**, never npm/yarn/pnpm.

## Environment

Copy `.env.template` → `.env.local`:
- `MONGODB_ATLAS_URI`, `DATABASE_NAME` (`portfolio-rag`), `COLLECTION_NAME` (`data`)
- `OPENAI_API_KEY`

## Architecture

**Single-page portfolio** — `src/app/page.tsx` composes: `Navbar → AboutMe → Experience → Projects → Contact → Footer` (all in `src/components/sections/`).

**AI Chat (RAG):**
- Ingest: `src/scripts/ingest-data.ts` reads `src/docs/david-resume.pdf` → chunks → OpenAI embeddings → MongoDB Atlas (`vector_index`)
- Inference: `src/app/api/chat/route.ts` — LangGraph `StateGraph` with nodes `queryOrRespond → tools (similarity search) → generate`. GPT-4o, in-memory history via `MemorySaver`, streamed via `@ai-sdk/langchain`
- Frontend: `src/components/sections/chat-window.tsx` uses `useChat` from `@ai-sdk/react`

**Content data:** `src/lib/info/` (experience, projects, logos). **Translations (EN/ES):** `src/lib/translations/translations.ts`. **i18n:** `src/lib/translations/i18n.ts` + `i18next-browser-languagedetector`, persisted in `localStorage`.

**Stack:** Next.js 15 App Router · Tailwind CSS v4 · shadcn/ui (`src/components/ui/`) · Framer Motion (`src/components/animated/`) · `next-themes`

---

## Skills — When to Use Them

Skills live in `.agents/skills/` (symlinked from `.claude/skills/`). Invoke with `/skill-name`.

| Skill | Use when… |
|---|---|
| `/ai-sdk` | Working with `useChat`, `streamText`, `generateText`, tool calling, embeddings, or AI SDK streaming patterns |
| `/commit` | You need to create commits with clear, granular history (saving progress, preparing PR-ready commits, or enforcing conventional commit style) |
| `/emil-design-eng` | Polishing UI details, interaction feel, visual hierarchy, motion, and overall product craftsmanship |
| `/langchain-fundamentals` | Building or updating LangChain agents/tools/middleware (agent orchestration, tool definitions, HITL/error-handling middleware) |
| `/langchain-rag` | Modifying the RAG pipeline: document loaders, text splitters, vector stores, LangChain retrievers |
| `/next-best-practices` | Writing/reviewing Next.js code: RSC vs client boundaries, route handlers, metadata, image/font optimization |
| `/streamdown` | Implementing or customizing Streamdown for markdown streaming, syntax highlighting, Mermaid/math rendering, security, and chat UI integration |
| `/ui-ux-pro-max` | Making design decisions: layout, color, typography, spacing, animations, component visual design |
| `/vercel-composition-patterns` | Refactoring components: compound components, render props, avoiding boolean-prop proliferation |
| `/web-design-guidelines` | Auditing UI for accessibility, UX best practices, or design compliance |
