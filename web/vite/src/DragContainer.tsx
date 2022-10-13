import { Node } from "reactflow";
import { genLedNodeFactory } from "./graph/nodes/GenerateLed";

interface INode {
  description: string;
  construct: (arg0: any) => Node<any>;
}

const data: INode[] = [
  { description: "🔧 Generate LED", construct: genLedNodeFactory },
  { description: "🌈 Generate Color", construct: genLedNodeFactory },
];

export const DragContainer = () => {
  return (
    <div className="mb-2 w-full bg-slate-100 overflow-x-scroll flex flex-col">
      {data.map((node) => {
        return (
          <div
            className="p-2 rounded border border-slate-600 bg-slate-100 px-8 opacity-80 m-2"
            draggable="true"
          >
            <h1>{node.description}</h1>
          </div>
        );
      })}
    </div>
  );
};
