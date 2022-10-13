import { Handle, Position, Node } from "reactflow";

interface IProps {
  isConnectable: boolean;
}

export const GenScalarNode = ({ isConnectable }: IProps) => {
  return (
    <div className="p-2 rounded border border-slate-600 bg-slate-100 px-8 opacity-80">
      <h1>🍪 Generate scalar</h1>
      <div className="flex mt-4"></div>

      <input
        className="p-1 px-1 rounded border-b-2 border-slate-900"
        style={{
          width: "10rem",
        }}
        placeholder="0.5"
        type="number"
      />
      <Handle
        type="source"
        id="scl_out"
        style={{ backgroundColor: "teal", padding: "4px" }}
        isConnectable={isConnectable}
        position={Position.Right}
      />
    </div>
  );
};

export function genScalarNodeFactory(id: string): Node<any> {
  return {
    id: id,
    type: "genScalarNode",
    data: {},
    position: { x: 450, y: 500 },
    targetPosition: Position.Right,
  };
}
