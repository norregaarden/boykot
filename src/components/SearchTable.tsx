// 'use client';
import { Show, createContext, createEffect, createResource, useContext } from "solid-js";
import type { MyReturnTypeFromCsvParse } from "~/util/parse";
// import { MyReturnTypeFromCsvParse, parsedBoykot } from "~/util/parse";

import { newSignal } from "~/util/signal";

const TableContext = createContext({
	searchValue: "" as string,
	columnNames: [] as string[],
	data: [] as string[][],
});

export function Table(props: { rows: MyReturnTypeFromCsvParse }) {
	createEffect(() => {
		console.log("effect logging");
		console.log();
	});
	// const [yayz] = createResource(() => parsedBoykot);
	// const parsedBoykotGetter = () => yayz() == null ? []: yayz();

	return <h1>{props.rows.length}</h1>;
}
// <TableContext.Provider value={{ data: parsedBoykotGetter } as any}>
// 	<pre>{parsedBoykotGetter.length}</pre>
// 	<h1>{parsedBoykotGetter.length}</h1>
// </TableContext.Provider>

export function TableRow(props: { index: number }) {
	// const context = useContext(TableContext);
	// const data = context.data[props.index];
	// const show = newSignal(false);
	// createEffect(() => {
	// 	console.log(context.searchValue);
	// });

	return (
		<Show
			// when={show.get()}
			when={true}
		>
			yooouuuu
		</Show>
	);
}
// {props.index}
// {data}
// {context.searchValue}
