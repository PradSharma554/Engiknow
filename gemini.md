1. Implementation Plan
   This document outlines the proposed architecture, technology stack, and phase-by-phase approach for building the application.

markdown

# Engiknow: AI Autonomous Knowledge Engineer

This document outlines the proposed architecture, technology stack, and implementation plan for building the Enterprise AI Brain that automatically ingests, understands, structures, and maintains company knowledge.

## Technology Stack

- **Frontend**: Next.js (React, App Router), Tailwind CSS, Shadcn UI for a modern, responsive, and premium enterprise feel.
- **Backend (API, AI & Search)**: Express.js (Node.js) using LangChain.js or Vercel AI SDK.
- **Database (NoSQL)**: MongoDB with Mongoose (for users, document metadata, workspaces, access control).
- **Vector Database**: Pinecone (Free Tier) or Qdrant Cloud (for storing document embeddings and enabling semantic search).
- **LLM Provider**: OpenAI (GPT-4o / text-embedding-ada-002) or Anthropic.
- **Ingestion Pipelines**: Custom workers/cron jobs to regularly sync data from Slack, GitHub, Notion, etc.

## Proposed Features & Capabilities

1. **Omni-Search Interface**: A "ChatGPT-like" interface that searches across all connected integrations to answer company-specific questions securely.
2. **Auto-Documentation & Wiki**: Automatically generating and updating "living" wiki pages based on recent PRs, Slack decisions, and Notion updates.
3. **Integration Hub**: Connectors for:
   - GitHub (code, PRs, issues)
   - Slack (threads, public channels, decision-making)
   - Notion/Google Drive (documents)
   - Jira (tickets)
4. **Knowledge Graph & Lineage**: Showing _where_ an answer came from (source attribution/citations) and _who_ the domain expert is.

## Implementation Phases

### Phase 1: Foundation (MVP)

- Set up Next.js 14+ project with Tailwind and Shadcn UI.
- Implement database schema (Prisma/Mongoose) for Users, Documents, and Integrations.
- Setup Vector DB connection and basic embedding pipeline.
- Build a generic text-ingestion API and simple chat interface.

### Phase 2: First Integrations

- Implement the **GitHub Integration** to ingest markdown files, issues, and PR summaries.
- Implement the **Slack Integration** to ingest specific channels.
- Enhance the Chat UI to display citations pointing to the ingested sources.

### Phase 3: Auto-Structuring & Wiki

- Build background jobs to periodically summarize topics into "Wiki Pages".
- Create the dashboard for exploring structured knowledge (Projects, Teams, Decisions).

### Phase 4: Enterprise Features

- Add roles and permissions (Access Control).
- Connect Jira and Notion.
- Advanced memory management (cleaning up outdated knowledge).

2. Task Breakdown (Checklist)
   This is what we've accomplished so far and what is still left to do.

markdown

# Task Breakdown: Engiknow (AI Autonomous Knowledge Engineer)

## Phase 1: Foundation (MVP)

- [x] Initialize Frontend project (Next.js, Tailwind, Shadcn UI)
- [x] Initialize Backend project (Express.js, Node.js)
- [x] Set up MongoDB connection (Mongoose)
- [x] Implement User Authentication (JWT)
- [ ] Set up Vector Database (Pinecone or Qdrant)

## Phase 2: Core Engineering

- [ ] Create basic Chat UI on Frontend
- [x] Implement Vercel AI SDK / Langchain.js on Backend for Gemini integration (Using @google/generative-ai natively)
- [x] Build basic Document Ingestion API (text to embeddings)
- [x] Implement semantic search (Query to Vector DB)

## Phase 3: Integrations

- [ ] GitHub Integration: Ingest code repositories, PRs, Issues
- [ ] Slack Integration: Ingest public channels and threads
- [ ] Notion Integration: Ingest workspace documents

## Phase 4: Auto-Structuring

- [ ] Set up background workers for periodic data syncing
- [ ] Build auto-summarization of ingested content into Wiki pages
- [ ] Build dashboard to view projects, teams, and generated wiki pages
      Whenever you're ready to pick things back up, we can move forward with one of the unchecked items like Setting up the Vector Database or building out the Chat UI!
