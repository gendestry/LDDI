import { Handle, Position, Node } from "reactflow";

interface IProps {
  isConnectable: boolean;
}

export const GenColorNode = ({ isConnectable }: IProps) => {
  return (
    <div className="p-2 rounded border border-slate-600 bg-slate-100 px-8 opacity-80">
      <h1>🌈 Generate Color</h1>
      <span className="text-sm">generates a vector3 color</span>
      <div className="flex mt-3"></div>

      <input type="color" />

      <Handle
        type="source"
        id="vec_out"
        style={{ backgroundColor: "orange", padding: "4px" }}
        isConnectable={isConnectable}
        position={Position.Right}
      />
    </div>
  );
};

export function genColorNodeFactory(id: string): Node<any> {
  return {
    id: id,
    type: "genColorNode",
    data: {},
    position: { x: 850, y: 500 },
    targetPosition: Position.Right,
  };
}
