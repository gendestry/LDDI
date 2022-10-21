import React, { ChangeEventHandler, InputHTMLAttributes, memo } from "react";
import { Handle, Position, Node } from "reactflow";

interface IProps {
  // data: {
  //   color: string;
  //   onChange: ChangeEventHandler<HTMLInputElement>;
  // };
  isConnectable: boolean;
}

export const rgbToHsl = ({ isConnectable }: IProps) => {
  return (
    <div className="p-4 rounded border border-slate-600 bg-slate-100 px-8 opacity-80">
      <Handle
        type="target"
        id="vec_in"
        style={{ backgroundColor: "orange", padding: "4px", marginBottom: -30 }}
        isConnectable={isConnectable}
        position={Position.Left}
      />
      <h1>🎉 RGB to HSL</h1>
      <span className="text-sm">RGB to Hue Sat Light</span>
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

export function rgbToHslNodeFactory(id: string): Node {
  return {
    id: id,
    type: "rgbToHslNode",
    data: {},
    position: { x: 650, y: 100 },
    targetPosition: Position.Right,
  };
}
