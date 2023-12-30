// 'use server';
import { cache } from "@solidjs/router";
import { parse } from "csv-parse/sync";
import { csvStringBoykot } from "~/dataBoykot2";

type PleaseUseTheseSettingsThankYouForCsvParseSync = {
	columns: true;
	skip_empty_lines: true;
	group_columns_by_name: true;
};
const theseAreTheParseSettings: PleaseUseTheseSettingsThankYouForCsvParseSync = {
	columns: true,
	skip_empty_lines: true,
	group_columns_by_name: true,
};
export type MyReturnTypeFromCsvParse = Array<{ [key: string]: string | Array<string> }>;
const soThisBecomesByParseFunction = (strcsv: string): MyReturnTypeFromCsvParse => {
	// "use server";
	const records = parse(strcsv, theseAreTheParseSettings) as Array<any>;
	const names = { records };
	const wowjsvarnameshmm = Object.keys(names).join();
	console.log(`yes i parsed ${wowjsvarnameshmm} of length`, records.length);
	console.log(
		`all rows had`,
		Object.keys(
			records.reduce((acc, reco, i) => {
				const keys = Object.keys(reco);
				const diff = keys.filter((k) => !acc.includes(k));
				// const result = diff.length ? `error row ${i} has key ${diff[0]}` : acc;
				// if (typeof result == "string" && result.startsWith("error")) {
				// console.error(result);
				// console.log(result);
				// }
				return [...acc, ...diff];
			}, []),
		),
	);
	return records;
};
export const parseCSVwithLogging = (strcsv: string = csvStringBoykot) => {
	// "use server";
	const nows = [] as number[];
	nows.push(performance.now());
	console.log("parsing csv of length", strcsv.length);
	const records = soThisBecomesByParseFunction(strcsv);
	// console.log(
	// 	records.map((r: any, i: number) =>
	// 		i < records.length - 2
	// 			? [typeof r.Alternativer, typeof r.Kategori]
	// 			: // [r.Alternativer.length, r.Kategori.length ]
	// 				{ a: r.Alternatievr, k: r.Kategori },
	// 	),
	// );
	// console.log(records.info);
	console.log(Object.keys(records).length);
	console.log(
		Object.fromEntries(
			Object.entries(records[0]).map(([_, sh]) =>
				typeof sh == "string" ? [_, sh] : [_, sh.length],
			),
		),
		":0,",
		`${records.length}:`,
		Object.values(records[records.length - 1]).map((sh) =>
			typeof sh == "string" ? sh : sh.length,
		),
	);
	console.log();
	return records;
};

// const parsedBoykot = parseCSVwithLogging(csvStringBoykot);
// console.log("in file parse.ts parsedBoykot", parsedBoykot.length);
// export {parsedBoykot}

export const cachedcsv = cache(async () => {
	"use server";
	return parseCSVwithLogging();
}, "mykey");
