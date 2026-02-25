import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";
dotenv.config();

const pineconeApiKey = process.env.PINECONE_API_KEY;

if (!pineconeApiKey) {
  console.warn("Pinecone API Key is missing. Vector DB will fail.");
}

export const pinecone = new Pinecone({
  apiKey: pineconeApiKey || "",
});

export const indexName = "engiknow-index";

export const initPinecone = async () => {
  try {
    const existingIndexes = await pinecone.listIndexes();
    const indexExists = existingIndexes.indexes?.some(
      (idx) => idx.name === indexName,
    );

    if (!indexExists) {
      console.log(
        `Creating Pinecone index: ${indexName} (3072 dimensions for Gemini Embeddings)...`,
      );
      await pinecone.createIndex({
        name: indexName,
        dimension: 3072, // gemini-embedding-001 has 3072 dimensions
        metric: "cosine",
        spec: {
          serverless: {
            cloud: "aws",
            region: "us-east-1", // free tier region
          },
        },
      });
      console.log(`Pinecone index created!`);
    } else {
      console.log(`Pinecone Index ${indexName} already exists and is ready.`);
    }
  } catch (error) {
    console.error(`Failed to initialize Pinecone: ${error.message}`);
  }
};
