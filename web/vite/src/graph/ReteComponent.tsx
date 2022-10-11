import { createRef } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { ReteGraph } from "./graph";

export const ReteComp = () => {
  const editorRef = createRef();

  useEffect(() => {
    const gr = new ReteGraph(editorRef.current);
  }, []);

  return (
    <div
      style={{
        width: "70vw",
        height: "50vh",
        border: "1px solid black",
      }}
    >
      <div id="rete" ref={editorRef}></div>
    </div>
  );
};
