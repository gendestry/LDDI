import * as Rete from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import conn from "rete-connection-plugin";

// @ts-ignore
import ReactRenderPlugin from "rete-react-render-plugin";
import { MyNode } from "./Node";

class NumComponent extends Rete.Component {
  constructor() {
    super("Number");
  }

  builder(node: Rete.Node) {
    let out = new Rete.Output("num", "Number", new Rete.Socket("Number value"));

    node.addOutput(out);
    return new Promise<void>((resolve, reject) => {});
  }

  worker(
    node: NodeData,
    inputs: WorkerInputs,
    outputs: WorkerOutputs,
    ...args: unknown[]
  ): void {
    outputs["num"] = node.data.num;
  }
}

export class ReteGraph {
  socket: Rete.Socket;
  container: HTMLElement;
  editor: Rete.NodeEditor | null = null;

  constructor(elem: HTMLElement) {
    this.socket = new Rete.Socket("Number value");
    this.container = elem;
    console.log(this.container);

    if (this.container != null) {
      console.log("making a new component pizda");

      this.editor = new Rete.NodeEditor("demo@0.1.0", this.container);

      this.editor.use(conn);
      this.editor.use(ReactRenderPlugin, {
        component: elem,
      });

      // random component
      const numComponent = new NumComponent();
      this.editor.register(numComponent);

      this.editor.view.resize();
      this.editor.trigger("process");
    }
  }
}
