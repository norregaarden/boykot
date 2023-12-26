import { Title } from "@solidjs/meta";
import { cache, createAsync } from "@solidjs/router";
// import { clientOnly } from "@solidjs/start";
import Counter from "~/components/Counter";
import { Table } from "~/components/SearchTable";
import { cachedcsv } from "~/util/parse";
// const BreaksOnServer = clientOnly(() => import("~/components/BreaksOnServer"));

export const route = {
	load: () => cachedcsv(),
};

export default function Home() {
	const mydata = createAsync(cachedcsv);
	return (
		<main>
			<Title>Hello World</Title>
			<h1>Hello world!</h1>
			<Counter />
			<Table rows={mydata() ?? []} />
			<p>
				Visit{" "}
				<a href="https://start.solidjs.com" target="_blank">
					start.solidjs.com
				</a>{" "}
				to learn how to build SolidStart apps.
			</p>
		</main>
	);
}
// <BreaksOnServer />
