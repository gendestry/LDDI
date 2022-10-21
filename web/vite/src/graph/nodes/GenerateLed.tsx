import { Handle, Position, Node } from "reactflow";

interface IProps {
  isConnectable: boolean;
}

export const GenLedNode = ({ isConnectable }: IProps) => {
  return (
    <div className="p-2 rounded border border-slate-600 bg-slate-100 px-8 opacity-80">
      <h1>🔧 Generate LED</h1>
      <span className="text-sm">generates a set number of leds</span>
      <div className="flex mt-4"></div>

      <input
        className="p-1 px-3 rounded border-b-2 border-slate-900 "
        max={144}
        min={0}
        placeholder="144"
        type="number"
      />

      <Handle
        type="source"
        id="led_generated_out"
        style={{ backgroundColor: "indigo", marginTop: -30 }}
        isConnectable={isConnectable}
        position={Position.Right}
      />
      <Handle
        type="source"
        id="ind_indeces_out"
        style={{ marginBottom: 30, backgroundColor: "seagreen" }}
        isConnectable={isConnectable}
        position={Position.Right}
      />
    </div>
  );
};

type pos = {
  x: number;
  y: number;
};
export function genLedNodeFactory(id: string, position?: pos): Node<any> {
  return {
    id: id,
    type: "genLedNode",
    data: {},
    position: position || { x: 450, y: 500 },
    targetPosition: Position.Right,
  };
}
