import { pgvector } from './pg-vector';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import {
	GoogleGenerativeAIEmbeddings,
	ChatGoogleGenerativeAI,
} from "@langchain/google-genai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { atom } from "nanostores";
import type { BaseRetrieverInterface } from "@langchain/core/retrievers";

export const vector_index = atom<
	// biome-ignore lint/suspicious/noExplicitAny: required by @langchain/google-gen-ai
	BaseRetrieverInterface<Record<string, any>> | undefined
>();
export const context = atom<string>("");

export const model = new ChatGoogleGenerativeAI({
	model: "gemini-pro",
	temperature: 0.2,
	apiKey: import.meta.env.GOOGLE_API_KEY,
});

export const process_pdf = async (file_path: string) => {
	const pdf_loader = new PDFLoader(file_path, { splitPages: true });
	const pages = await pdf_loader.load();
	console.log("Page length:", pages.length);

	console.log("Page Content: ", pages[0].pageContent);

	const text_splitter = new RecursiveCharacterTextSplitter({
		chunkSize: 10_000,
		chunkOverlap: 1000,
	});

	context.set(pages.map((p) => p.pageContent).join("\n\n"));
	const texts = await text_splitter.splitText(context.get());

	pgvector.addDocuments(pages)

	vector_index.set(
		pgvector.asRetriever({ k: 6 })
	);

	return [vector_index.get(), context.get()];
};
