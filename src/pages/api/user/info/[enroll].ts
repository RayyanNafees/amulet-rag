import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import type { APIRoute } from "astro";
import * as v from "valibot";

export const GET: APIRoute = async ({ params: { enroll } }) => {
	const enrollment_no = v.parse(v.pipe(v.string(), v.length(6)), enroll);

	const file = await fetch("https://ctengg.amu.ac.in/web/reg_record.php", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			fac: enrollment_no,
			sem: new Date().getMonth() > 6 ? "odd" : "even",
			submit: "Download",
		}),
	}).then((r) => r.blob());

	const pdf_loader = new PDFLoader(file, { splitPages: true });
	const pages = await pdf_loader.load();
	console.log("Page length:", pages.length);

	console.log("Page Content: ", pages[0].pageContent);
	return new Response(pages[0].pageContent);
};
