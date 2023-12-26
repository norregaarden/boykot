import { Title } from "@solidjs/meta";
import { clientOnly } from "@solidjs/start";
import Counter from "~/components/Counter";
import { MyTable } from "~/components/SearchTable";
const BreaksOnServer = clientOnly(() => import("~/components/BreaksOnServer"));

export default function Home() {
  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <Counter />
      <MyTable />
      <BreaksOnServer />
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
