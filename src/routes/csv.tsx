import { createAsync } from "@solidjs/router";
import { For } from "solid-js";
import CsvColumnInfo, { CsvProps } from "~/components/CsvColumnInfo";
import TAbleshit, { MyShowBoxWithHeadline, SwitchMatch } from "~/components/CsvColumnInfo";
import { MyReturnTypeFromCsvParse, cachedcsv } from "~/util/parse";

export const route = {
	load: () => cachedcsv(),
};
export default function () {
	const mydata = createAsync(cachedcsv);
	const dat = () => mydata() ?? null;

	const getListOfAllColumns = //(props: { rows: MyReturnTypeFromCsvParse }) =>
		(rows: CsvProps["rows"]) =>
			rows.reduce(
				(s, r, _i) => (Object.keys(r).reduce((s, k) => s.add(k), s), s),
				new Set<string>(),
			);

	return SwitchMatch<MyReturnTypeFromCsvParse | null, null, MyReturnTypeFromCsvParse, null>({
		onthe: dat(),
		doif: [
			{
				cond: (shit): shit is null => shit == null || shit.length == 0,
				then: (an) => "dat is null", //MyShowBoxWithHeadline({ headline: { stringIs: an } }),
			},
			{
				cond: (a): a is MyReturnTypeFromCsvParse => true,
				then: (p) => (
					<For each={[...getListOfAllColumns(p)]}>
						{(column) => CsvColumnInfo({ rows: p, columnNameOrIndex: column })
}
					</For>
				),
			},
			{
				cond: (shit): shit is null => shit == null,
				then: (an) => "dat is null", //MyShowBoxWithHeadline({ headline: { stringIs: an } }),
			},
		] as const,
	});
	// return TAbleshit({ rows: dat, columnNameOrIndex: 0 });
}
