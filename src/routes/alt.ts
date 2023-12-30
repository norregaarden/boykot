import { cachedcsvAlt } from "~/util/parse";

export async function GET() {
	const waited = await cachedcsvAlt();
	return new Response(JSON.stringify((waited)));
	return "hello world";
}

export function DELETE() {
	console.log("Deleted");
}
