import React, { ChangeEventHandler, InputHTMLAttributes, memo } from "react";
import { Handle, Position, Node } from "reactflow";

interface IProps {
  isConnectable: boolean;
}

export const VecMergeNode = ({ isConnectable }: IProps) => {
  return (
    <div className="p-4 rounded border border-slate-600 bg-slate-100 px-8 opacity-80">
      <Handle
        type="target"
        id="x_in"
        style={{ backgroundColor: "teal", marginTop: -20 }}
        isConnectable={isConnectable}
        position={Position.Left}
      />
      <Handle
        type="target"
        id="y_in"
        style={{ backgroundColor: "teal", marginTop: 0 }}
        isConnectable={isConnectable}
        position={Position.Left}
      />
      <Handle
        type="target"
        id="z_in"
        style={{ backgroundColor: "teal", marginTop: 20 }}
        isConnectable={isConnectable}
        position={Position.Left}
      />

      <h1>🩹 Vector merge</h1>
      <span className="text-sm">splits a vector in x,y,z</span>

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

export function vecMergeNodeFactory(id: string): Node {
  return {
    id: id,
    type: "vecMergeNode",
    data: {},
    position: { x: 650, y: 100 },
    targetPosition: Position.Right,
  };
}
