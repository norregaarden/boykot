// "use client"; // also works, but better without

import { csvStringBoykot } from "~/dataBoykot";
import { isServer } from "solid-js/web";

/**
 * template
 * inserthere
 * xyz
 **/
/// template ///
const nowxyz = performance.now();
const inserthere = [];
// console.log({inserthere})
console.log(inserthere.length);
const fhenxyz = performance.now();
const diffxyz = fhenxyz - nowxyz;
console.log("template inserthere", diffxyz);
/**
 *
 **/
console.log(csvStringBoykot.length);
const logStuffAboutImportedCsvStringFromToDotTsModifiedCsvFile = async () => {
	/// noting ///
	const nowt = performance.now();
	// console.log({csvStringBoykot})
	console.log(csvStringBoykot.length);
	const fhent = performance.now();
	const difft = fhent - nowt;

	/// splitting ///
	const nowtt = performance.now();
	const splat = csvStringBoykot.split("\n");
	// console.log({splat})
	console.log(splat.length);
	const fhentt = performance.now();
	const difftt = fhentt - nowtt;
	console.log({ difft, difftt });
	console.log(isServer);
};
//// without "use client";
/// it whether called here or inside function MyTable, it is logged once on server, once on client.
//logStuffAboutImportedCsvStringFromToDotTsModifiedCsvFile();

// const parseCSV = (strcsv: string) => {};

// export function MyTable() {
// 	return <div>lol</div>;
// }
