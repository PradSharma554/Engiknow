import { pinecone, indexName } from "../config/pinecone.js";

/**
 * Upsert embeddings vector into Pinecone
 * @param {string} id - Unique identifier, typically `${documentId}_chunk_${index}`
 * @param {Array<number>} values - 768-dimensional embedding from Gemini
 * @param {Object} metadata - Metadata representing the chunk { workspaceId, documentId, text }
 */
export const upsertEmbedding = async (id, values, metadata) => {
  try {
    const index = pinecone.index(indexName);

    await index.upsert([
      {
        id,
        values,
        metadata,
      },
    ]);

    console.log(`Upserted vector ${id} successfully!`);
    return true;
  } catch (error) {
    console.error("Pinecone Upsert Error:", error);
    throw new Error("Failed to insert into Vector DB");
  }
};

/**
 * Query similar vectors using vector similarity search
 * @param {Array<number>} queryVector - The embedding of the user's question
 * @param {string} workspaceId - Crucial for access control.
 * @param {number} topK - How many chunks to return
 */
export const querySimilarity = async (queryVector, workspaceId, topK = 5) => {
  try {
    const index = pinecone.index(indexName);

    const queryResponse = await index.query({
      vector: queryVector,
      topK,
      includeMetadata: true,
      filter: workspaceId ? { workspaceId: { $eq: workspaceId } } : undefined,
    });

    return queryResponse.matches; // Returns array of matched vectors sorted by distance/score
  } catch (error) {
    console.error("Pinecone Query Error:", error);
    throw new Error("Failed to search Vector DB");
  }
};
