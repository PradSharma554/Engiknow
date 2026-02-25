import { getEmbeddings } from "../services/aiService.js";
import { upsertEmbedding } from "../services/pineconeService.js";
import DocumentMetadata from "../models/Document.js";
import { extractTextFromHtml } from "../utils/htmlParser.js";
import crypto from "crypto";

// Basic text chunking function (splits by double newline or rough character count)
const chunkText = (text, maxChars = 1000) => {
  const chunks = [];
  const paragraphs = text.split("\n\n");
  let currentChunk = "";

  for (const para of paragraphs) {
    if (currentChunk.length + para.length > maxChars) {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = para;
    } else {
      currentChunk += (currentChunk ? "\n\n" : "") + para;
    }
  }
  if (currentChunk) chunks.push(currentChunk.trim());
  return chunks;
};

// @desc    Ingest raw text into Knowledge Base
// @route   POST /api/ingest/text
// @access  Private
export const ingestRawText = async (req, res) => {
  try {
    let {
      title,
      text,
      type = "manual_text",
      sourceUrl = "",
      workspaceId,
    } = req.body;

    if (!title || (!text && !sourceUrl) || !workspaceId) {
      return res.status(400).json({
        message:
          "Title, workspaceId, and either text or source URL are required.",
      });
    }

    // Try to fetch HTML content if sourceUrl is provided
    if (sourceUrl) {
      try {
        const response = await fetch(sourceUrl);
        const html = await response.text();
        const scrapedText = extractTextFromHtml(html);
        if (scrapedText) {
          text = text ? `${text}\n\n${scrapedText}` : scrapedText;
          type = "url_scraper";
          console.log(
            `Scraped ${scrapedText.length} characters from ${sourceUrl}`,
          );
        }
      } catch (err) {
        console.error("Failed to scrape URL:", err.message);
        if (!text) {
          return res.status(400).json({
            message:
              "Failed to scrape content from provided URL and no raw text was provided.",
          });
        }
      }
    }

    // Step 1: Hash the content to prevent duplicate ingestion if content hasn't changed
    const contentHash = crypto.createHash("sha256").update(text).digest("hex");

    // Check if we already have this exact document
    const existingDoc = await DocumentMetadata.findOne({
      workspaceId,
      title,
      contentHash,
    });
    if (existingDoc) {
      return res.status(200).json({
        message: "Document already exists and is up to date.",
        document: existingDoc,
      });
    }

    // Step 2: Chunk the text
    const chunks = chunkText(text);
    console.log(`Document split into ${chunks.length} chunks.`);

    // Check if modifying an existing doc with same title/url
    let docId;
    const existingByTitle = await DocumentMetadata.findOne({
      workspaceId,
      title,
    });

    if (existingByTitle) {
      docId = existingByTitle._id;
      // We should ideally delete old vectors from pinecone here. For MVP, we will just overwrite similar chunk IDs.
    } else {
      const newDoc = await DocumentMetadata.create({
        workspaceId,
        type,
        title,
        sourceUrl,
        contentHash,
        content: text,
        chunkIds: [],
      });
      docId = newDoc._id;
    }

    // Step 3: Embed and Upsert chunks into Pinecone
    const storedChunkIds = [];

    for (let i = 0; i < chunks.length; i++) {
      const chunkText = chunks[i];
      const chunkId = `${docId}_chunk_${i}`;

      // Get AI Embeddings
      const vectorValues = await getEmbeddings(chunkText);

      // Upsert to Pinecone
      await upsertEmbedding(chunkId, vectorValues, {
        workspaceId,
        documentId: docId.toString(),
        text: chunkText,
        title: title,
      });

      storedChunkIds.push(chunkId);
    }

    // Step 4: Update Document Metadata in Mongo with the new hash and chunk IDs
    await DocumentMetadata.findByIdAndUpdate(docId, {
      contentHash,
      content: text,
      chunkIds: storedChunkIds,
      updatedAt: new Date(),
    });

    res.status(201).json({
      message: "Document ingested successfully",
      chunksProcessed: chunks.length,
      documentId: docId,
    });
  } catch (error) {
    console.error("Ingestion Error:", error);
    res
      .status(500)
      .json({ message: "Failed to ingest document", error: error.message });
  }
};

// @desc    Get all ingested documents for a workspace
// @route   GET /api/ingest/:workspaceId
// @access  Private
export const getIngestions = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const documents = await DocumentMetadata.find({ workspaceId })
      .select("-content")
      .sort({ createdAt: -1 });
    res.status(200).json(documents);
  } catch (error) {
    console.error("Fetch Ingestions Error:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch ingestions", error: error.message });
  }
};

// @desc    Get details of a specific ingested document
// @route   GET /api/ingest/detail/:documentId
// @access  Private
export const getIngestionById = async (req, res) => {
  try {
    const { documentId } = req.params;
    const document = await DocumentMetadata.findById(documentId);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json(document);
  } catch (error) {
    console.error("Fetch Ingestion Detail Error:", error);
    res
      .status(500)
      .json({
        message: "Failed to fetch document details",
        error: error.message,
      });
  }
};
