import { appendCorsHeaders, createMiddleware } from "@solidjs/start/server";

export default createMiddleware({
	onRequest: [
		(event) => {
			console.log("GLOBAL", event.request.url);
			// console.log(event)
		},
		(event) => {
			appendCorsHeaders(event, {});
			// return new Response("Hello World!");
			// console.log(event)
		},
	],
});
