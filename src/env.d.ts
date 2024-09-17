/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
  readonly DB_PASSWORD: string;
  readonly PUBLIC_POKEAPI: string;
  readonly GOOGLE_API_KEY: string; 
  readonly PINECONE_API_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}