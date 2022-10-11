import { useEffect, useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import { wasmCompute } from "./wasm/compute";
import { SenderModule } from "./SenderModule";
import { WasmComp } from "./components/wasm/WasmStatus";
import { WSStatus } from "./components/websocket/WSConnector";
import { WsInput } from "./components/websocket/wsInputs";
import { ReteGraph } from "./graph/graph";
import { ReteComp } from "./graph/ReteComponent";
import { HSLToRGB, RGBToHSL } from "./utils";

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

    // init websocket
    const ws = new WebSocket(wsInput);
  }, []);

  return (
    <div class="m-3 ">
      <h1 class="text-yellow-500 text-5xl p-3">
        Led Driver Driver Interface 💡
      </h1>

      <div class="bg-gray-100 p-2 my-3 rounded">
        <WasmComp wasmStatus={comp != null ? "ready" : "load"} />
      </div>

      <div class="bg-gray-100 p-2 my-3 rounded">
        <WsInput
          loading={false}
          onSubmit={() => {
            wsInst?.close();
            // const ws = new WebSocket(wsInput);
            const ws = new WebSocket(wsInput);
            setLockedHost(wsInput);
            setWsMsg("connecting");
            setWsInst(ws);
            console.log("connecting to", wsInput);

            ws.onopen = () => {
              setWsMsg("connected");
              // const a = comp?.wave(0, 4) || [];
              // const b = comp?.noise1D(0, 5, 144);
              // console.log({ b });

              //TODO set nicely as constant r smthing on top of code...
              const BRIGHTNESS = 5;
              let offset = 0;
              let araar: number[] = [];

              var r = Math.round(Math.random() * BRIGHTNESS);
              var g = Math.round(Math.random() * BRIGHTNESS);
              var b = Math.round(Math.random() * BRIGHTNESS);

              for (let i = 0; i < 144; i++) {
                // r = Math.round(Math.random() * BRIGHTNESS);
                // g = Math.round(Math.random() * BRIGHTNESS);
                // b = Math.round(Math.random() * (BRIGHTNESS / 2));
                const [rr, gg, bb] = HSLToRGB(
                  //i % 255,
                  // (i ^ 2 % 255) + 10,
                  Math.sin((i / 144) * Math.PI) * 255,
                  90,
                  i % 2 == 0 ? 10 : 0
                  //i % 360,
                  // Math.sin((i / 144) * Math.PI) * 90,
                );

                r = Math.round(Math.round(rr));
                g = Math.round(Math.round(gg));
                b = Math.round(Math.round(bb / 8.8));

                araar.push(i);
                araar.push(r);
                araar.push(g);
                araar.push(b);
              }

              ws.send(new Uint8Array(araar).buffer);
              setInterval(() => {
                for (let i = 0; i < 144; i++) {
                  araar[(i * 8) % 144] = i + offset;
                }
                offset++;

                ws.send(Uint8Array.from(araar).buffer);
              }, 40);

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

      <ReteComp />
    </div>
  );

  // const [stat, setStat] = useState<"Loading" | "Ready">("Loading");

  // useEffect(() => {
  //   // set wasm
  //   const compute = new wasmCompute();
  //   compute.init().then(() => {
  //     setComp(compute);
  //   });
  //   // websocket
  //   setWsInst(new WebSocket("ws:192.168.57.71/ws"));
  // }, []);
  // useEffect(() => {
  //   if (!wsInst) return;
  //   wsInst.onopen = function (e) {
  //     // alert("[open] Connection established");
  //     // alert("Sending to server");
  //     setWsMsg("Ready");
  //     //byte aray
  //     // const a = new Uint8Array([0, 255, 0, 0, 1, 0, 255, 0, 2, 0, 0, 255]);
  //     // wsInst?.send(a);
  //   };
  //   wsInst.onmessage = function (event) {
  //     alert(`[message] Data received from server: ${event.data}`);
  //   };
  //   wsInst.onclose = function (event) {
  //     if (event.wasClean) {
  //       setWsMsg("Closed");
  //     } else {
  //       // e.g. server process killed or network down
  //       setWsMsg("Died");
  //     }
  //   };
  //   wsInst.onerror = function (error) {
  //     setWsMsg("Error");
  //   };
  // }, [wsInst]);
  // if (!comp?.instance) {
  //   return (
  //     <>
  //       <h2>Wasm:</h2>
  //       <p class="read-the-docs">{comp?.instance ? "Ready" : "Loading"}</p>
  //     </>
  //   );
  // }
  // return (
  //   <>
  //     <h2>Wasm:</h2>
  //     <p class="read-the-docs">Ready</p>
  //     {/* <p class="read-the-docs"> {comp.hash("123").length}</p> */}
  //     <h2>Websocket:</h2>
  //     <p class="read-the-docs"> {wsMsg}</p>
  //     {comp?.instance && wsInst?.OPEN && <SenderModule ws={wsInst} wc={comp} />}
  //   </>
  // );
}
