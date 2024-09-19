import { process_pdf } from "@/utils/rag";
import type { APIRoute } from "astro";
import path from "node:path";
import fs from "node:fs";

export const POST: APIRoute = async ({ request, redirect, url }) => {
	const fd = await request.formData();
	const file = fd.get("file") as File;
	if (!file?.name) {
		console.log(`file not found: ${file}`);
		return redirect(url.toString());
	}
	const file_name = file.name;
	const file_path = path.resolve("uploads", file_name);
	fs.writeFileSync(file_path, Buffer.from(await file.arrayBuffer()));
	console.log({ file_path });
// 	const file_path_url = `/uploads/${file_name}`;
// console.log({file_path_url})
	await process_pdf(file_path);
	return new Response(JSON.stringify({ filePath: file.name }));
};
