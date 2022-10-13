import React, { ChangeEventHandler, InputHTMLAttributes, memo } from "react";
import { Handle, Position, Node } from "reactflow";

interface IProps {
  // data: {
  //   color: string;
  //   onChange: ChangeEventHandler<HTMLInputElement>;
  // };
  isConnectable: boolean;
}

export const TimerNode = ({ isConnectable }: IProps) => {
  return (
    <div className="p-2 rounded border border-slate-600 bg-slate-100 px-8 opacity-80">
      <h1>⌛ Timer</h1>
      <span className="text-sm"> time ms</span>
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

export function timerNodeFactory(id: string): Node {
  return {
    id: id,
    type: "timerNode",
    data: {},
    style: {},
    position: { x: 650, y: 100 },
    targetPosition: Position.Right,
  };
}
