import {
	Accessor,
	Setter,
	Show,
	createContext,
	createEffect,
	createSignal,
	useContext,
} from "solid-js";

export type AGetter<T> = {
	get: Accessor<T>;
};
export type ASetter<T> = {
	set: Setter<T>;
};
export type ASignal<T> = AGetter<T> & ASetter<T>;
export const newSignal = <T,>(defaultValue: T): ASignal<T> => {
	const [get, set] = createSignal(defaultValue);
	return { get, set };
};
