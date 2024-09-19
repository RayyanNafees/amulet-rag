/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
	readonly GOOGLE_API_KEY: string;
	readonly PINECONE_API_KEY: string;
	readonly XATA_API_KEY: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
