import React, { ChangeEventHandler, InputHTMLAttributes, memo } from "react";
import { Handle, Position, Node } from "reactflow";

interface IProps {
  // data: {
  //   color: string;
  //   onChange: ChangeEventHandler<HTMLInputElement>;
  // };
  isConnectable: boolean;
}

export const hslToRgb = ({ isConnectable }: IProps) => {
  return (
    <div className="p-4 rounded border border-slate-600 bg-slate-100 px-8 opacity-80">
      <Handle
        type="target"
        id="vec_in"
        style={{ backgroundColor: "orange", padding: "4px", marginBottom: -30 }}
        isConnectable={isConnectable}
        position={Position.Left}
      />
      <h1>🎉 HSL to RGB</h1>
      <span className="text-sm">HSL to red green blue</span>
      <Handle
        type="source"
        id="vec_out"
        style={{ backgroundColor: "orange", padding: "4px", marginBottom: 30 }}
        isConnectable={isConnectable}
        position={Position.Right}
      />
    </div>
  );
};

export function hslToRgbNodeFactory(id: string): Node {
  return {
    id: id,
    type: "hslToRgbNode",
    data: {},
    position: { x: 650, y: 100 },
    targetPosition: Position.Right,
  };
}
