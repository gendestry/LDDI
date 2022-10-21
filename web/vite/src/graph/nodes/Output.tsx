import React, { ChangeEventHandler, InputHTMLAttributes, memo } from "react";
import { Handle, Position, Node } from "reactflow";
import * as Color from "color";

interface IData {
  leds: Color[][];
}
interface IProps {
  data: IData;
  isConnectable: boolean;
}

export const OutNode = ({ isConnectable, data }: IProps) => {
  const x = data.leds[0].length;
  const y = data.leds.length;

  return (
    <div className="p-2 rounded border border-slate-600 bg-slate-100 px-8 opacity-80">
      <h1>💡 Led out</h1>

      <span className="text-sm mt-4">Preview: </span>
      {data.leds.map((row, i) => (
        <div className="flex  bg-slate-300 rounded p-2" key={i}>
          {row.map((led, j) => (
            <div
              key={j + i}
              className="rounded h-4 w-4 "
              style={{ backgroundColor: led.hex() }}
            />
          ))}
        </div>
      ))}

      <Handle
        type="target"
        id="led_in"
        style={{ backgroundColor: "indigo", padding: "4px" }}
        isConnectable={isConnectable}
        position={Position.Left}
      />
    </div>
  );
};

export function outNodeFactory(id: string, leds: IData): Node<IData> {
  return {
    id: id,
    type: "outNode",
    data: {
      leds: leds.leds,
      // leds: [
      //   [
      //     Color("red"),
      //     Color("blue"),
      //     Color("green"),
      //     Color("yellow"),
      //     Color("orange"),
      //     Color("purple"),
      //     Color("green"),
      //     Color("yellow"),
      //     Color("orange"),
      //     Color("purple"),
      //     Color("red"),
      //     Color("blue"),
      //     Color("green"),
      //     Color("yellow"),
      //     Color("orange"),
      //     Color("purple"),
      //     Color("green"),
      //     Color("yellow"),
      //     Color("orange"),
      //     Color("purple"),
      //     Color("red"),
      //     Color("blue"),
      //     Color("green"),
      //     Color("yellow"),
      //     Color("orange"),
      //     Color("purple"),
      //     Color("green"),
      //     Color("yellow"),
      //     Color("orange"),
      //     Color("purple"),
      //     Color("red"),
      //     Color("blue"),
      //     Color("green"),
      //     Color("yellow"),
      //     Color("orange"),
      //     Color("purple"),
      //     Color("green"),
      //     Color("yellow"),
      //     Color("orange"),
      //     Color("purple"),
      //     Color("red"),
      //     Color("blue"),
      //     Color("green"),
      //     Color("yellow"),
      //     Color("orange"),
      //     Color("purple"),
      //     Color("green"),
      //     Color("yellow"),
      //     Color("orange"),
      //     Color("purple"),
      //     Color("red"),
      //     Color("blue"),
      //     Color("green"),
      //     Color("yellow"),
      //     Color("orange"),
      //     Color("purple"),
      //     Color("green"),
      //     Color("yellow"),
      //     Color("orange"),
      //     Color("purple"),
      //     Color("red"),
      //     Color("blue"),
      //     Color("green"),
      //     Color("yellow"),
      //     Color("orange"),
      //     Color("purple"),
      //     Color("green"),
      //     Color("yellow"),
      //   ],
      // ],
    },
    position: { x: 450, y: 500 },
    targetPosition: Position.Right,
  };
}
