interface IProps {
  wsStatus: "connecting" | "connected" | "error" | "closed" | "died";
  host: string;
}

export const WSStatus = ({ wsStatus, host }: IProps) => {
  return (
    <div className="flex font-medium">
      <div className="px-2">
        <b>📡 Websocket status </b>
      </div>
      {wsStatus === "connecting" && (
        <div className="text-yellow-600">Connecting to {host}</div>
      )}
      {wsStatus === "error" ||
        wsStatus === "closed" ||
        (wsStatus === "died" && <div className="text-red-600">{wsStatus}</div>)}

      {wsStatus === "connected" && (
        <div className="text-green-600">Connected to {host}</div>
      )}
    </div>
  );
};
