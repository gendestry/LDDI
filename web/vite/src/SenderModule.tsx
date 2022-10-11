import { useEffect, useState } from "preact/hooks";
import { wasmCompute } from "./wasm/compute";

const LoadBar = ({ percent }: { percent: number }) => {
  return (
    <div
      style={{
        width: "100%",
        minWidth: "1000px",
        height: "4px",
        backgroundColor: "gray",
      }}
    >
      <div
        style={{
          width: { percent } + "%",
          height: "100%",
          backgroundColor: "orange",
        }}
      ></div>
    </div>
  );
};

interface ILedProps {
  numLeds: number;
  leds: Uint8Array;
}
const Leds = ({ numLeds, leds }: ILedProps) => {
  return (
    <div
      style={{
        margin: "2rem",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div
        style={{
          margin: "2rem",
          display: "flex",
        }}
      >
        {Array(numLeds)
          .fill(0)
          .map(() => {
            return (
              <div
                style={{
                  margin: "1px",
                  width: "10px",
                  height: "10px",
                  backgroundColor: "red",
                }}
              ></div>
            );
          })}
      </div>
    </div>
  );
};

interface SenderModuleProps {
  ws: WebSocket;
  wc: wasmCompute;
}
let utf8Encode = new TextEncoder();
export const SenderModule = ({ ws, wc }: SenderModuleProps) => {
  const numLeds = 144;

  const [i, setI] = useState(0);

  // ws.send(String.fromCharCode(...wc.wave(i, numLeds, 1)));
  const a = wc.wave(i, numLeds);
  // console.log(a);

  // ws.send(new Uint8Array(a).buffer);

  // uint8array  to arrayBuffer

  useEffect(() => {
    const interval = setInterval(() => {
      setI((i) => i + 1);
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "rgba(100,100,100,0.1)",
        padding: "3rem",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <h4>
          interval:{i}/{numLeds}
        </h4>
        {/* <div>
          <LoadBar percent={i / numLeds} />
        </div> */}
      </div>
      {/* <div>
        <Leds numLeds={numLeds} arr={a} />
      </div> */}
    </div>
  );
};
