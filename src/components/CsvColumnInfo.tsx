import { For, JSX, Match, ParentProps, Show, Switch, createMemo } from "solid-js";
import { MyReturnTypeFromCsvParse } from "~/util/parse";
import { VisualizeAny } from "./SearchTable";
import NotFound from "~/routes/[...404]";

export type CsvProps = { rows: MyReturnTypeFromCsvParse; columnNameOrIndex: string | number };
export default function CsvColumnInfo(props: CsvProps) {
	const makeGetter = <T, I>(f: (i: I) => T) => ({ get: (a) => f(a) }) as { get: typeof f };
	const makeGetter0 = <T,>(f: () => T) => ({ get: () => f() }) as { get: typeof f };
	console.log(props.rows);

	const resolveColumnNameOrIndex = <T,>(ni: number | string, ah: Array<T> | Boxed<T>) => {
		if (Array.isArray(ah) && typeof ni == "number") {
			const got = ah[ni];
			if (got == null) console.error("IS NULLL");
			return got;
		}
		if (typeof ah == "object" && typeof ni == "string") {
			const got = (ah as any)[ni];
			if (got == null) console.error("OHIS NULLL");
			return got;
		}
	};
	const getListOfAllInColumn =
		// () => props,
		// (props: Props) =>
		props.rows.map((r) => r[props.columnNameOrIndex]);

	// );
	const getListOfAllUniqueInColumn = makeGetter((col: string) =>
		props.rows.reduce(
			(s, r, _i) =>
				r[col] == null
					? s
					: Array.isArray(r[col])
						? ((r[col] as string[]).forEach((v, _j) => s.add(v)), s)
						: s.add(r[col] as string),
			new Set<string>(),
		),
	);

	const getListOfXYZInColumn = { getListOfAllInColumn, getListOfAllUniqueInColumn };
	// <For each={[...getListOfAllColumns()]}>
	// 	{(colname, no) => {
	// return (
			// {JSON.stringify([...Object.entries(props).map(lort=>JSON.stringify(lort))])}
	return (
		<>
			{props.columnNameOrIndex}
			<ShowBasic basic={props.columnNameOrIndex} />
			<For each={getEntriesAsBoxed(getListOfXYZInColumn)}>
				{({ key, val }) => {
					// const got = val.get(colname);
					// const sample = getSample(got);
					// const size = getSizeOfAny(got);
					// return ShowBasic({ basic: key });
					return JSON.stringify({ key, val });
				}}
			</For>
		</>
	);
}
// 		}}
// 	</For>
// );

const getSizeOfAny = <T,>(an: string | T[] | Set<T>): number => {
	if (an instanceof Set) {
		return an.size;
	}
	if (typeof an == "string") {
		return an.length;
	}
	if (Array.isArray(an)) {
		return an.length;
	}
	return an;
};

const getBoxedValue = <const K extends string, const T>(box: { [k in K]: T }, n: number = 0): T => {
	const keys = Object.keys(box) as (keyof typeof box)[];
	const thekey = keys[n];
	console.log(box, "has these keys in order", ...keys, "you chose val", n);
	return box[thekey];
};

const getBoxedKey = <K extends string, T>(box: { [k in K]: T }, n: number = 0): K => {
	const keys = Object.keys(box) as (keyof typeof box)[];
	const thekey = keys[n];
	console.log(box, "has these keys in order", ...keys, "you chose key", n);
	return thekey;
};

// singular K
const getBoxedEntry = <const K extends string, T>(
	box: { [k in K]: T },
	n: number = 0,
): { key: K; val: T } => {
	const [key, val] = [getBoxedKey(box, n), getBoxedValue(box, n)];
	return { key, val };
};

// plural K
const getEntriesAsBoxed = <K extends string, T>(boxyz: { [k in K]: T }): { key: K; val: T }[] => {
	return (Object.entries(boxyz) as [K, T][]).map(([key, val]) => ({ key, val }));
};

// const getNoOfAny = <T,>(theany:Set<T>|)

type BasicBees = {
	string: string;
	number: number;
	boolean: boolean;
};
const mydef = true;
const DuhBees: BasicBees = {
	string: "_nah_string",
	boolean: mydef,
	number: -24,
} as const;
type Bees = (keyof BasicBees)[];
const bees: Bees = Object.keys(DuhBees) as (keyof typeof DuhBees)[];
type Basic = BasicBees[Bees[number]];
const isBasic = (an: unknown): an is Basic => {
	const typeofan = typeof an;
	return bees.includes(typeofan as any);
};

type Listy<T> = T[] | Set<T>;
type Boxed<T, K extends string = string> = { [k in K]: T };

const assertNarrow = <T, N extends T>(a: T, narrowTo: N): asserts a is N => {};
const conditionNarrow = <T, N extends T>(
	a: T,
	narrowTo: N,
	ifCondition: (a: T) => boolean,
): a is N => ifCondition(a);

const getAt = <T,>(ofthe: Basic | Listy<T>, ad: number): Basic | T => {
	if (ofthe instanceof Set) {
		return getAt([...ofthe], ad) ?? NaN;
	}
	if (isBasic(ofthe)) {
		if (typeof ofthe == "boolean") return NaN;
		if (typeof ofthe == "number") return NaN;
		return ofthe.at(ad) ?? NaN;
	}
	if (Array.isArray(ofthe)) {
		return ofthe.at(ad) ?? NaN;
	}
	return ofthe satisfies never;
};

const getSample = <T,>(oflist: Basic | Listy<T>, specific?: number): Basic | T => {
	if (isBasic(oflist)) return oflist;
	let no = specific == null ? Math.floor(Math.random() * getSizeOfAny(oflist)) : specific;
	return getAt(oflist, no);
};

const strtypeofany = typeof (null as any);
const maptypeofany = {
	...DuhBees,
} satisfies { [k in typeof strtypeofany]?: any };
const typeofIs = <const T extends keyof typeof maptypeofany>(
	an: unknown,
	t: T,
): an is (typeof maptypeofany)[T] => typeof an == t;
const curried =
	<A, const B, C extends A>(fun: (an: A, but: B) => an is C, but: B): ((an: A) => an is C) =>
	(a): a is C =>
		fun(a, but);

export const MyShowBoxWithHeadline = (props: ParentProps<{ headline: Boxed<string> }>) => {
	console.log("MyShowBoxWithHeadline", props.headline);
	return (
		<>
			<VisualizeAny data={getBoxedEntry(props.headline)} />
			<div
				style={{
					border: "1px solid black",
					padding: "16px",
					margin: "16px",
				}}
			>
				headline key:<b>{getBoxedKey(props.headline)}</b>
				headline val:<b>{getBoxedValue(props.headline)}</b>
				<br />
				{props.children}
			</div>
		</>
	);
};

const ShowBasic = (props: ParentProps<{ basic: Basic }>) => {
	console.log("showing basic", props.basic);
	return SwitchMatch<Basic, string, number, boolean>({
		onthe: props.basic,
		doif: [
			{
				cond: curried(typeofIs, "string"),
				then: (an) => MyShowBoxWithHeadline({ headline: { stringIs: an }, ...props }),
			},
			{
				cond: curried(typeofIs, "number"),
				then: (an) =>
					MyShowBoxWithHeadline({ headline: { numberIs: an.toString() }, ...props }),
			},
			{
				cond: curried(typeofIs, "boolean"),
				then: (an) =>
					MyShowBoxWithHeadline({
						headline: { booleanIs: an ? "Sandt" : "Falsk" },
						...props,
					}),
			},
		] as const,
	});
};
export const SwitchMatch = <T, A extends T, B extends T = T, C extends T = T>(props: {
	onthe: T;
	doif: [
		{ cond: (a: T) => a is A; then: (an: A) => JSX.Element },
		{ cond: (a: T) => a is B; then: (an: B) => JSX.Element },
		{ cond: (a: T) => a is C; then: (an: C) => JSX.Element },
	];
}) => {
	return (
		<Switch fallback={"switchmatchnotfound"}>
			<For each={props.doif}>
				{({ cond, then }) => (
					<Match when={cond(props.onthe)}>{then(props.onthe as T as A & B & C)}</Match>
				)}
			</For>
		</Switch>
	);
};
