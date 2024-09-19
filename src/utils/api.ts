export const post = (
	url: string,
	data: Record<string, string>,
	options?: RequestInit,
) =>
	fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
		...options,
	})
		.then((r) => {
			if (!r.ok) throw new Error(`Network response was not ok ${r.statusText}`);
			return r;
		})
		.catch((r) => {
			console.error(r);
			return r;
		});

export const getPromptResponse = (prompt: string) =>
	post("/api/ask", { question: prompt }).then((r) => r.text());
