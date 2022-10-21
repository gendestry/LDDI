import { useEffect, useState, DragEvent, useRef } from "react";
import { wasmCompute } from "./wasm/compute";
// import { SenderModule } from "./SenderModule";
import { WasmComp } from "./components/wasm/WasmStatus";
import { WSStatus } from "./components/websocket/WSConnector";
import { WsInput } from "./components/websocket/wsInputs";
import { CustomNodeFlow } from "./graph/Flow";

import * as Color from "color";
import { DragContainer } from "./DragContainer";
import { ReactFlowInstance, useNodesState } from "reactflow";

let wsGlobal: WebSocket | null = null;

export function App() {
  const [wsInput, setWsInput] = useState("ws:192.168.57.71/ws");
  const [comp, setComp] = useState<wasmCompute | null>(null);
  const [lockedHost, setLockedHost] = useState("");
  const [wsMsg, setWsMsg] = useState<
    "error" | "connected" | "connecting" | "died" | "closed"
  >("connecting");
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [rfi, setRfi] = useState<ReactFlowInstance | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const compute = new wasmCompute();
    compute.init().then(() => {
      setComp(compute);
    });
  }, []);

  return (
    <div className="m-3">
      <h1 className="text-yellow-500 text-5xl p-3">
        Led Driver Driver Interface 💡
      </h1>
      <div className="bg-gray-100 p-2 my-3 rounded">
        <WasmComp wasmStatus={comp != null ? "ready" : "load"} />
      </div>
      <div className="bg-gray-100 p-2 my-3 rounded">
        <WsInput
          loading={false}
          onSubmit={() => {
            wsGlobal?.close();
            wsGlobal = new WebSocket(wsInput);
            setLockedHost(wsInput);
            setWsMsg("connecting");
            console.log("connecting to", wsInput);

            wsGlobal.onopen = () => {
              setWsMsg("connected");
              wsGlobal?.send(new Uint8Array([0, 255, 255, 0]).buffer);
            };
            wsGlobal.onclose = () => {
              setWsMsg("closed");
              wsGlobal = null;
            };
            wsGlobal.onerror = () => {
              setWsMsg("error");
            };
            wsGlobal.onmessage = (msg) => {
              console.log(msg);
            };
          }}
          setVal={(str) => {
            setWsInput(str);
          }}
          value={wsInput}
        />
        <WSStatus wsStatus={wsMsg} host={lockedHost} />
      </div>
      <div className="flex h-full">
        <div className="w-10/12">
          <div
            ref={wrapperRef}
            style={{
              border: "solid 1px black",
              margin: "auto",
              width: "100%",
              height: "70vh",
            }}
          >
            <CustomNodeFlow
              nodes={nodes}
              setReactflowInstance={setRfi}
              onNodesChange={onNodesChange}
              setNodes={setNodes}
              cb={(col: string) => {
                const color = Color(col);
                console.log([0, ...color.rgb().array()]);
              }}
            />
          </div>
        </div>
        <div className="flex-1">
          {rfi && (
            <DragContainer
              nodes={nodes}
              setNodes={setNodes}
              wrapperRef={wrapperRef}
              reactFlowInstance={rfi}
            />
          )}
        </div>
      </div>
    </div>
  );
}
