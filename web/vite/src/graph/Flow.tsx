import {
  useCallback,
  useEffect,
  useRef,
  useState,
  DragEvent,
  Dispatch,
  SetStateAction,
} from "react";
import * as Color from "color";
import ReactFlow, {
  Node,
  addEdge,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Position,
  updateEdge,
  ReactFlowInstance,
  OnNodesChange,
} from "reactflow";

import "reactflow/dist/style.css";
import { ColorNode } from "./nodes/color/colorNode";
import { OutNode, outNodeFactory } from "./nodes/Output";
import { TimerNode, timerNodeFactory } from "./nodes/TimeNode";
import { VSplitNode, vsplitNodeFactory } from "./nodes/VectorSplit";
import { VecMergeNode, vecMergeNodeFactory } from "./nodes/VectorMerge";
import { GenLedNode, genLedNodeFactory } from "./nodes/GenerateLed";
import {
  GenColorNode,
  genColorNodeFactory,
} from "./nodes/color/GenerateColorNode";
import { AddNode, addNodeFactory } from "./nodes/maths/MathAdd";
import { SubNode, subNodeFactory } from "./nodes/maths/MathSub";
import { MulNode, mulNodeFactory } from "./nodes/maths/MathMul";
import { DivNode, divNodeFactory } from "./nodes/maths/MathDiv";
import { SinNode, sinNodeFactory } from "./nodes/maths/MathSin";
import { ModNode, modNodeFactory } from "./nodes/maths/MathMod";
import { GenScalarNode, genScalarNodeFactory } from "./nodes/GenerateScalar";
import { rgbToHsl, rgbToHslNodeFactory } from "./nodes/color/rgbToHsl";
import { hslToRgb, hslToRgbNodeFactory } from "./nodes/color/hslToRgb";
import { NodeData } from "rete/types/core/data";

const nodeTypes = {
  colorNode: ColorNode,
  timerNode: TimerNode,
  vsplitNode: VSplitNode,
  vecMergeNode: VecMergeNode,
  outNode: OutNode,
  genLedNode: GenLedNode,
  genColorNode: GenColorNode,
  genScalarNode: GenScalarNode,
  addNode: AddNode,
  subNode: SubNode,
  mulNode: MulNode,
  divNode: DivNode,
  sinNode: SinNode,
  modNode: ModNode,
  rgbToHslNode: rgbToHsl,
  hslToRgbNode: hslToRgb,
};

// let id = 0;
// const getId = () => `dndnode_${id++}`;

interface IProps {
  cb: (arg0: string) => void;
  nodes: Node[];
  setNodes: Dispatch<SetStateAction<Node<NodeData>[]>>;
  onNodesChange: OnNodesChange;
  setReactflowInstance: Dispatch<SetStateAction<ReactFlowInstance | null>>;
}
export const CustomNodeFlow = ({
  cb,
  nodes,
  onNodesChange,
  setNodes,
  setReactflowInstance,
}: IProps) => {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [bgColor, setBgColor] = useState("#ffffff");

  useEffect(() => {
    console.log({ edges });
    console.log({ nodes });
    // serialize data and send to WASM
  }, [edges]);

  useEffect(() => {
    const onChange = (event: any) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== "2") {
            return node;
          }

          const color = event?.target?.value;

          cb(color);
          setBgColor(color);

          return {
            ...node,
            data: {
              ...node.data,
              color,
            },
          };
        })
      );
    };

    setNodes([
      {
        id: "2",
        type: "colorNode",
        data: { onChange: onChange, color: bgColor },
        style: { border: "1px solid #777", padding: 10 },
        position: { x: 300, y: 50 },
      },
      timerNodeFactory("4"),
      vsplitNodeFactory("5"),
      outNodeFactory("6", {
        leds: [[Color("red"), Color("red"), Color("red")]],
      }),
      vecMergeNodeFactory("7"),
      genLedNodeFactory("8"),
      genColorNodeFactory("9"),
      addNodeFactory("10"),
      subNodeFactory("11"),
      mulNodeFactory("12"),
      divNodeFactory("13"),
      sinNodeFactory("14"),
      modNodeFactory("15"),
      genScalarNodeFactory("16"),
      rgbToHslNodeFactory("17"),
      hslToRgbNodeFactory("18"),
    ]);

    // setEdges([
    //   {
    //     id: "e1-2",
    //     source: "1",
    //     target: "2",
    //     animated: true,
    //     style: { stroke: "#fff" },
    //   },
    //   {
    //     id: "e2a-3",
    //     source: "2",
    //     target: "3",
    //     sourceHandle: "a",
    //     animated: true,
    //     style: { stroke: "#fff" },
    //   },
    //   {
    //     id: "e2b-4",
    //     source: "2",
    //     target: "4",
    //     sourceHandle: "b",
    //     animated: true,
    //     style: { stroke: "#fff" },
    //   },
    // ]);
  }, []);

  const typeToCOl = (tp: string) => {
    if (tp === "vec") {
      return "orange";
    }
    if (tp === "scl") {
      return "teal";
    }
    if (tp === "led") {
      return "indigo";
    }
    if (tp === "ind") {
      return "forestgreen";
    }
    return "black";
  };

  const edgeUpdateSuccessful = useRef(true);
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeUpdateSuccessful.current = true;

      setEdges((els) => updateEdge(oldEdge, newConnection, els));
    },
    []
  );

  const onEdgeUpdateEnd = useCallback((_: any, edge: Edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const onConnect = useCallback((col: string, params: any) => {
    setEdges((eds: any) => {
      console.log(eds);
      console.log("SREDI TIPIZIRANE EDGE MONAAA");

      return addEdge(
        {
          ...params,
          animated: true,
          style: { stroke: typeToCOl(col), strokeWidth: "4px" },
        },
        eds
      );
    });
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={(e) => {
        const a = e.sourceHandle?.substring(0, 3);
        onConnect(a || "", e);
      }}
      nodeTypes={nodeTypes}
      snapToGrid={true}
      fitView
      attributionPosition="bottom-left"
      className="touchdevice-flow"
      // dragable edges
      onEdgeUpdate={onEdgeUpdate}
      onEdgeUpdateStart={onEdgeUpdateStart}
      onEdgeUpdateEnd={onEdgeUpdateEnd}
      // adding nodes on drag
      onInit={setReactflowInstance}
    >
      <Controls />
    </ReactFlow>
  );
};
