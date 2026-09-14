// Experiment 22 — refs to DOM nodes
// Used by LESSON 49.
//
// Three things you cannot do with state: focus a node, measure it, scroll to it.
//
// Watch the console on the first render: ref.current is null DURING render and only
// holds the node afterwards, because React fills refs in during the commit.
//
// SearchBox shows the React 19 way to let a parent reach a child's node: `ref` is
// an ordinary prop. No forwardRef.

import { useRef, useState } from "react";

function SearchBox({ ref, label }) {
  return (
    <label>
      {label}: <input ref={ref} id="child-input" />
    </label>
  );
}

export default function Experiment22() {
  const inputRef = useRef(null);
  const boxRef = useRef(null);
  const childRef = useRef(null);
  const [measured, setMeasured] = useState("(not measured)");

  console.log(`   render — inputRef.current is ${inputRef.current === null ? "null" : "the <input>"}`);

  function focusIt() {
    inputRef.current.focus();
    console.log("   focus — called on", inputRef.current.tagName);
  }

  function measureIt() {
    const rect = boxRef.current.getBoundingClientRect();
    const text = `${Math.round(rect.width)} x ${Math.round(rect.height)}`;
    console.log("   measure —", text);
    setMeasured(text);
  }

  function focusChild() {
    childRef.current.focus();
    console.log("   focus — child input, id:", childRef.current.id);
  }

  return (
    <div>
      <h1>Refs</h1>

      <p>
        <input ref={inputRef} id="own-input" placeholder="focus me" />{" "}
        <button id="focus" onClick={focusIt}>focus the input</button>
      </p>

      <div
        ref={boxRef}
        id="box"
        style={{ border: "1px solid #999", padding: "1rem", width: "60%" }}
      >
        A box whose size only the DOM knows.
      </div>
      <p>
        measured: <b id="measured">{measured}</b>{" "}
        <button id="measure" onClick={measureIt}>measure the box</button>
      </p>

      <p>
        <SearchBox ref={childRef} label="a child's input" />{" "}
        <button id="focus-child" onClick={focusChild}>focus the child</button>
      </p>
    </div>
  );
}
