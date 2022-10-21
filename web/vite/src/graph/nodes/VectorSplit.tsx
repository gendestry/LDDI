import React, { ChangeEventHandler, InputHTMLAttributes, memo } from "react";
import { Handle, Position, Node } from "reactflow";

interface IProps {
  // data: {
  //   color: string;
  //   onChange: ChangeEventHandler<HTMLInputElement>;
  // };
  isConnectable: boolean;
}

export const VSplitNode = ({ isConnectable }: IProps) => {
  return (
    <div className="p-4 rounded border border-slate-600 bg-slate-100 px-8 opacity-80">
      {/* <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      /> */}
      {/* <div>
        Custom Color Picker Node: <strong>{data.color}</strong>
      </div> */}
      {/* <input
        className="nodrag"
        type="color"
        onChange={data.onChange}
        defaultValue={data.color}
      /> */}
      <Handle
        type="target"
        id="vec_in"
        style={{ backgroundColor: "orange", padding: "4px" }}
        isConnectable={isConnectable}
        position={Position.Left}
      />
      <h1>✂️ Vector split</h1>
      <span className="text-sm">splits a vector in x,y,z</span>
      <div className="flex justify-between">
        <Handle
          type="source"
          id="scl_out"
          style={{ backgroundColor: "teal", marginTop: -20 }}
          isConnectable={isConnectable}
          position={Position.Right}
        />
        <Handle
          type="source"
          id="scl_in"
          style={{ backgroundColor: "teal", marginTop: 0 }}
          isConnectable={isConnectable}
          position={Position.Right}
        />
        <Handle
          type="source"
          id="scl_in_1"
          style={{ backgroundColor: "teal", marginTop: 20 }}
          isConnectable={isConnectable}
          position={Position.Right}
        />
      </div>
    </div>
  );
};

export function vsplitNodeFactory(id: string): Node {
  return {
    id: id,
    type: "vsplitNode",
    data: {},
    position: { x: 650, y: 100 },
    targetPosition: Position.Right,
  };
}
