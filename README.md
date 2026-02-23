# Engiknow: AI Autonomous Knowledge Engineer

🧠 **Enterprise AI Brain**

## The Problem

Every company has:

- Slack messages
- GitHub repos
- Notion docs
- Google Drive
- Jira tickets
- Meeting transcripts

And nobody knows:

- Where knowledge lives
- What’s outdated
- Who owns what
- Why decisions were made

Companies waste millions because knowledge is fragmented.

## 🚀 The Project

Build an AI system that automatically ingests, understands, structures, and maintains company knowledge.

Think: “ChatGPT + Internal Wikipedia + Decision Memory + Auto-Documentation”

---

## Proposed Features & Capabilities

1. **Omni-Search Interface**: A "ChatGPT-like" interface that searches across all connected integrations to answer company-specific questions securely.
2. **Auto-Documentation & Wiki**: Automatically generating and updating "living" wiki pages based on recent PRs, Slack decisions, and Notion updates.
3. **Integration Hub**: Connectors for:
   - GitHub (code, PRs, issues)
   - Slack (threads, public channels, decision-making)
   - Notion/Google Drive (documents)
   - Jira (tickets)
4. **Knowledge Graph & Lineage**: Showing _where_ an answer came from (source attribution/citations) and _who_ the domain expert is.

---

## Technology Stack (100% Free & Cloud-Hosted)

- **Frontend**: Next.js (React, App Router), Tailwind CSS, Shadcn UI for a modern, responsive, and premium enterprise feel.
- **Backend (API, AI & Search)**: Express.js (Node.js) using LangChain.js or Vercel AI SDK.
- **Database (NoSQL)**: MongoDB Atlas Free Tier (for users, document metadata, workspaces, access control).
- **Vector Database**: Pinecone Free Tier (for storing document embeddings and enabling semantic search).
- **LLM Provider**: Google Gemini (Free Tier) or Groq (Free Tier) to avoid running inference on local hardware while keeping the project 100% free.
- **Embeddings**: Google Gemini Embedding Model or HuggingFace API.
- **Ingestion Pipelines**: Custom workers/cron jobs to regularly sync data from Slack, GitHub, Notion, etc.

---

## Implementation Phases & Tasks

### Phase 1: Foundation (MVP)

- [x] Initialize Frontend project (Next.js, Tailwind, Shadcn UI)
- [x] Initialize Backend project (Express.js, Node.js)
- [x] Set up MongoDB connection (Mongoose/MongoDB Atlas Free Tier)
- [x] Implement User Authentication (JWT)
- [x] Set up Vector Database (Pinecone Free Tier)
- [x] Build a generic text-ingestion API and simple chat interface

### Phase 2: Core Engineering & AI

- [x] Create basic Chat UI on Frontend
- [x] Implement Vercel AI SDK / Langchain.js on Backend for Gemini/Groq integration
- [x] Build basic Document Ingestion API (text to embeddings)
- [x] Implement semantic search (Query to Vector DB)
- [x] Enhance Chat UI to display citations pointing to ingested sources

### Phase 3: First Integrations

- [ ] GitHub Integration: Ingest code repositories, markdown files, PR summaries, Issues
- [ ] Slack Integration: Ingest public channels, threads, and decision-making discussions
- [ ] Notion Integration: Ingest workspace documents

### Phase 4: Auto-Structuring & Enterprise Features

- [ ] Set up background workers for periodic data syncing
- [ ] Build auto-summarization of ingested content into Wiki pages
- [ ] Build dashboard to view projects, teams, and generated wiki pages
- [ ] Add roles and permissions (Access Control)
- [ ] Connect Jira and Google Drive
- [ ] Advanced memory management (cleaning up outdated knowledge)
