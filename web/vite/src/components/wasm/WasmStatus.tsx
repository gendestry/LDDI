// interface IProps {
//   wasmStatus: "connecting" | "connected" | "error" | "closed" | "died";
// }
interface IProps {
  wasmStatus: "load" | "ready" | "error";
}

export const WasmComp = ({ wasmStatus }: IProps) => {
  return (
    <div className="flex font-medium">
      <div className="px-2">
        <b>💻 WASM status:</b>
      </div>
      {wasmStatus === "load" && <div className="text-yellow-600">Loading</div>}
      {wasmStatus === "error" && <div className="text-red-600">Error</div>}
      {wasmStatus === "ready" && <div className="text-green-600">Ready</div>}
    </div>
  );
};
