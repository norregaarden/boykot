import { For } from "solid-js";
import './testes.css'
import '~/css/style.scss'

export default function TestingRoute() {
	const myarray = [1, 2, 3];
	return (
		<div>
			thid isvs
			<div class="">qwfpqwfp
				qwfpq
				qwfpqwfp</div>
			<For each={myarray}>{(item, index) => <div
				class="lort"
				>item</div>}</For>
		</div>
	);
}
