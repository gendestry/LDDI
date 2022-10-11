import { render } from "preact";
import { App } from "./app";
import { ReteGraph } from "./graph/graph";
import "./index.css";

render(<App />, document.getElementById("app") as HTMLElement);
