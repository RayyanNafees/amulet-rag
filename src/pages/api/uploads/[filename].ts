import path from "node:path";
import type { APIRoute } from "astro";
import fs from "node:fs";

export const GET: APIRoute = async ({
	request,
	params: { filename },
	url,
	redirect,
}) => {
	if (!filename) {
		console.log("No File name", filename);
		return new Response(JSON.stringify({ error: "Filename not given" }), {
			status: 400,
		});
	}
	const filePath = path.join(process.cwd(), "uploads", filename);
	console.log({ filePath });
	if (!fs.existsSync(filePath)) {
		console.log("File do not exist on", filePath);
		return new Response(JSON.stringify({ error: "File not found" }), {
			status: 404,
		});
	}

	const file = fs.readFileSync(filePath);
	return new Response(file.buffer);
};
