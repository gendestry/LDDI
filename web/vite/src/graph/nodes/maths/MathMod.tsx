import React, { ChangeEventHandler, InputHTMLAttributes, memo } from "react";
import { Handle, Position, Node } from "reactflow";

interface IProps {
  isConnectable: boolean;
}

export const ModNode = ({ isConnectable }: IProps) => {
  return (
    <div className="p-2 rounded border border-slate-600 bg-slate-100 px-8 opacity-80">
      <Handle
        type="target"
        id="scl_x"
        style={{ backgroundColor: "teal", marginTop: -10 }}
        isConnectable={isConnectable}
        position={Position.Left}
      />
      <Handle
        type="target"
        id="scl_y"
        style={{ backgroundColor: "teal", marginTop: 10 }}
        isConnectable={isConnectable}
        position={Position.Left}
      />

      <h1>⚫ Mod</h1>
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

export function modNodeFactory(id: string): Node {
  return {
    id: id,
    type: "modNode",
    data: {},
    position: { x: 350, y: 300 },
    targetPosition: Position.Right,
  };
}
