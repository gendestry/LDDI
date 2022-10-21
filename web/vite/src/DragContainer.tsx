import { Dispatch, SetStateAction } from "react";
import { Node, ReactFlowInstance } from "reactflow";
import { NodeData } from "rete/types/core/data";
import { genLedNodeFactory } from "./graph/nodes/GenerateLed";

interface INode {
  description: string;
  construct: (arg0: any, arg1?: any) => Node<any>;
}

const data: INode[] = [
  { description: "🔧 Generate LED", construct: genLedNodeFactory },
  { description: "🌈 Generate Color", construct: genLedNodeFactory },
  { description: "🎉 RGB to HSL", construct: genLedNodeFactory },
];

interface IProps {
  nodes: Node[];
  setNodes: Dispatch<SetStateAction<Node<NodeData>[]>>;
  reactFlowInstance: ReactFlowInstance;
  wrapperRef: React.RefObject<HTMLDivElement>;
}
export const DragContainer = ({
  nodes,
  setNodes,
  reactFlowInstance,
  wrapperRef,
}: IProps) => {
  return (
    <div className="h-full mb-2 w-full overflow-y-scroll flex flex-col">
      {data.map((node) => {
        return (
          <div
            key={node.description}
            className="p-2 rounded border border-slate-600 bg-slate-100 px-8 opacity-80 m-2"
            draggable="true"
            onDragEnd={(e) => {
              const reactFlowBounds =
                wrapperRef?.current?.getBoundingClientRect();

              if (!reactFlowBounds) return;

              const position = reactFlowInstance.project({
                x: e.clientX - reactFlowBounds.left,
                y: e.clientY - reactFlowBounds.top,
              });
              const n = node.construct(e.timeStamp.toString(), position);
              setNodes([...nodes, n]);
            }}
          >
            <h1>{node.description}</h1>
          </div>
        );
      })}
    </div>
  );
};
