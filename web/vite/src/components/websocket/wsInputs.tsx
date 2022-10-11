import { JSX } from "preact";
import { useState } from "preact/hooks";

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
        class="p-1 rounded"
        placeholder={"ws://..."}
        value={value}
        onInput={handleInput}
      />
      <button
        onClick={() => {
          onSubmit();
        }}
        class="p-1 px-4 bg-yellow-400 mx-3 rounded disabled:opacity-25"
        disabled={disabled}
      >
        {loading ? "loading..." : "connect"}
      </button>
    </div>
  );
};
