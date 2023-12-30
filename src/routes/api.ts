import { cachedcsv } from "~/util/parse";

export async function GET() {
	const waited = await cachedcsv();
	return new Response(JSON.stringify((waited)));
	return "hello world";
}

export function DELETE() {
	console.log("Deleted");
}
