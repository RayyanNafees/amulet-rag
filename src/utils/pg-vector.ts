import {
  PGVectorStore,
  type DistanceStrategy,
} from "@langchain/community/vectorstores/pgvector";

import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import type { PoolConfig } from "pg";

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "models/embedding-001",
  apiKey: import.meta.env.GOOGLE_API_KEY,
});

// Sample config
  export const config = {
  postgresConnectionOptions: {
    connectionString: `postgresql://8k2pl9:${import.meta.env.XATA_API_KEY}@us-west-2.sql.xata.sh/ragistani:main?sslmode=require`
  } as PoolConfig,
  tableName: "ragistable",
  columns: {
    idColumnName: "id",
    vectorColumnName: "vector",
    contentColumnName: "content",
    metadataColumnName: "metadata",
  },
  // supported distance strategies: cosine (default), innerProduct, or euclidean
  distanceStrategy: "cosine" as DistanceStrategy,
  
};

export const pgvector = await PGVectorStore.initialize(embeddings, config);

