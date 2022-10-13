import { useEffect, useState } from "react";
import { wasmCompute } from "./wasm/compute";
// import { SenderModule } from "./SenderModule";
import { WasmComp } from "./components/wasm/WasmStatus";
import { WSStatus } from "./components/websocket/WSConnector";
import { WsInput } from "./components/websocket/wsInputs";
import { CustomNodeFlow } from "./graph/Flow";

import * as Color from "color";
import { DragContainer } from "./DragContainer";

export function App() {
  const [wsInput, setWsInput] = useState("ws:192.168.57.71/ws");
  const [comp, setComp] = useState<wasmCompute | null>(null);
  const [lockedHost, setLockedHost] = useState("");
  const [wsMsg, setWsMsg] = useState<
    "error" | "connected" | "connecting" | "died" | "closed"
  >("connecting");
  const [wsInst, setWsInst] = useState<WebSocket | null>(null);

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
            wsInst?.close();
            const ws = new WebSocket(wsInput);
            setLockedHost(wsInput);
            setWsMsg("connecting");
            setWsInst(ws);
            console.log("connecting to", wsInput);

            ws.onopen = () => {
              setWsMsg("connected");
              // setWsInst();
              // const a = comp?.wave(0, 4) || [];
              // const b = comp?.noise1D(0, 5, 144);
              // console.log({ b });
              // ws?.send(a.buffer);
            };
            ws.onclose = () => {
              setWsMsg("closed");
            };
            ws.onerror = () => {
              setWsMsg("error");
            };
            ws.onmessage = (msg) => {
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
        <div className="w-2/12 h-full bg-red-50">
          <DragContainer />
        </div>
        <div className="w-10/12">
          <div
            style={{
              width: "100%",
              height: "70vh",
              border: "solid 1px black",
              margin: "auto",
            }}
          >
            <CustomNodeFlow
              cb={(col: string) => {
                const color = Color(col);
                console.log([0, ...color.rgb().array()]);
                // wsInst.send(new Uint8Array([0, ...color.rgb().array()]).buffer);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
