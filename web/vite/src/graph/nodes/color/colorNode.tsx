import React, { ChangeEventHandler, InputHTMLAttributes, memo } from "react";
import { Handle, Position } from "reactflow";

interface IProps {
  data: {
    color: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
  };
  isConnectable: boolean;
}

export const ColorNodeStuff = ({ data, isConnectable }: IProps) => {
  return (
    <>
      <div>
        Custom Color Picker Node: <strong>{data.color}</strong>
      </div>
      <input type="color" onChange={data.onChange} defaultValue={data.color} />
    </>
  );
};

export const ColorNode = ({ data, isConnectable }: IProps) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />

      <ColorNodeStuff data={data} isConnectable={isConnectable} />

      <Handle
        type="source"
        id="vec_out"
        style={{ top: 10, background: "#555" }}
        isConnectable={isConnectable}
        position={Position.Right}
      />
    </>
  );
};
