import { useState } from "react";

interface IProps {
  loading: boolean;
  value: string;
  setVal: (arg0: string) => void;
  onSubmit: () => void;
}

export const WsInput = ({ loading, setVal, value, onSubmit }: IProps) => {
  function handleInput(ev: any) {
    setVal(ev.target.value);
  }

  const disabled = value === "" || loading;

  return (
    <div className="flex font-medium p-2">
      <input
        className="p-1 rounded"
        placeholder={"ws://..."}
        value={value}
        onInput={handleInput}
      />
      <button
        onClick={() => {
          onSubmit();
        }}
        className="p-1 px-4 bg-yellow-400 mx-3 rounded disabled:opacity-25"
        disabled={disabled}
      >
        {loading ? "loading..." : "connect"}
      </button>
    </div>
  );
};
